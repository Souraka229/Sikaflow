import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { hashApiKeySecret } from "@/lib/api/api-key-hash";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const postSchema = z.object({
  name: z.string().max(200).optional(),
  scopes: z.array(z.enum(["read:transactions", "write:transactions"])).min(1),
});

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map((i) => i.message).join("; ") },
      { status: 400 },
    );
  }

  const plain = `sfk_${randomBytes(24).toString("hex")}`;
  const secret_hash = hashApiKeySecret(plain);
  const key_prefix = plain.slice(0, 12);

  const { data, error } = await supabase
    .from("api_keys")
    .insert({
      user_id: user.id,
      name: parsed.data.name?.trim() || "Sans nom",
      key_prefix: `${key_prefix}…`,
      secret_hash,
      scopes: parsed.data.scopes,
      is_active: true,
    })
    .select("id")
    .single();

  if (error) {
    console.error("api_keys insert:", error);
    return NextResponse.json(
      {
        error:
          "Impossible d’enregistrer la clé. Appliquez la migration Supabase (table api_keys) ou vérifiez les droits RLS.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    id: data.id,
    secret: plain,
    key_prefix: `${key_prefix}…`,
  });
}

export async function DELETE(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Paramètre id requis" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { error } = await supabase
    .from("api_keys")
    .update({ is_active: false })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("api_keys revoke:", error);
    return NextResponse.json({ error: "Révocation impossible" }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}
