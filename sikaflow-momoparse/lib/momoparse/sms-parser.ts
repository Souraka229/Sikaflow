/**
 * Heuristiques de lecture des SMS Mobile Money (Afrique de l’Ouest, FR).
 * Pas un remplacement d’un modèle ML : signaux utiles + score de risque fraude.
 */

export type ParsedOperator = "mtn" | "moov" | "celtiis" | "unknown";
export type ParsedType = "received" | "sent" | "payment" | "withdrawal" | "unknown";
export type FraudRisk = "low" | "medium" | "high";

export interface SmsParseResult {
  operator: ParsedOperator;
  type: ParsedType;
  amountCfa: number | null;
  reference: string | null;
  counterpartyHint: string | null;
  /** 0 = aucune info fiable, 1 = plusieurs signaux concordants */
  confidence: number;
  fraudRisk: FraudRisk;
  fraudReasons: readonly string[];
}

function normalize(s: string): string {
  return s
    .normalize("NFC")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function detectOperator(t: string): ParsedOperator {
  const x = t.toLowerCase();
  if (/\bmtn\b|momo|mobile money|momopay/i.test(x)) return "mtn";
  if (/\bmoov\b|flooz/i.test(x)) return "moov";
  if (/celtiis|celtis/i.test(x)) return "celtiis";
  return "unknown";
}

function detectType(t: string): ParsedType {
  const x = t.toLowerCase();
  if (/echec|échec|echou|failed|insuffisant|refus|annul/i.test(x)) return "unknown";
  if (/retrait|withdraw|agent|gab/i.test(x)) return "withdrawal";
  if (/paiement|marchand|payment|payez|payé/i.test(x)) return "payment";
  if (
    /recu|reçu|credit|crédit|vous avez recu|vous avez reçu|versement entrant/i.test(x)
  ) {
    return "received";
  }
  if (/envoy|envoyé|transfert vers|debite|débit|vous avez envoye/i.test(x)) return "sent";
  return "unknown";
}

/** Extrait un montant en FCFA / XOF (entier). */
function extractAmount(t: string): number | null {
  const patterns = [
    /(\d[\d\s.,]*)\s*(?:FCFA|F\s*CFA|XOF)/gi,
    /(?:^|\s)(\d[\d\s.,]{1,12})\s*F(?:CFA)?(?:\b|\s)/gi,
    /(\d[\d\s.,]*)\s*F\b/gi,
  ];
  for (const re of patterns) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(t)) !== null) {
      const raw = m[1].replace(/[\s.]/g, "").replace(",", "");
      const n = parseInt(raw, 10);
      if (!Number.isNaN(n) && n >= 0 && n < 1e12) return n;
    }
  }
  return null;
}

/** Référence type MP240324, MOOV-xxx, CEL-xxx, Ref: ... */
function extractReference(t: string): string | null {
  const ref =
    t.match(/\b(?:Ref\.?|Réf\.?|Reference)\s*:?\s*([A-Z0-9][A-Z0-9._-]{4,40})/i) ||
    t.match(/\b(MP\d{6}[\w.]*)\b/i) ||
    t.match(/\b(MOOV[-–]\d+)\b/i) ||
    t.match(/\b(CEL[-–]?\d+)\b/i) ||
    t.match(/\b([A-Z]{2,4}[-–]?\d{4,})\b/);
  return ref ? ref[1].trim() : null;
}

/** Indicatif béninois / numéro dans le texte */
function extractCounterparty(t: string): string | null {
  const m = t.match(/(?:\+?229|00229)?\s*(\d{10})\b/);
  return m ? m[1] : null;
}

function computeFraudReasons(raw: string, t: string, amount: number | null): string[] {
  const reasons: string[] = [];
  const x = t.toLowerCase();

  if (httpsOrHttp.test(raw)) {
    reasons.push("Lien HTTP(S) dans le SMS — souvent utilisé pour l’hameçonnage.");
  }
  if (/\burgent\b|immédiat|compte.{0,12}bloqu/i.test(x)) {
    reasons.push("Formulation d’urgence / compte bloqué — signal de fraude fréquent.");
  }
  if (/whatsapp|telegram|t\.me\/|bit\.ly|tinyurl/i.test(x)) {
    reasons.push("Redirection messagerie ou raccourcisseur d’URL.");
  }
  if (/confirmer.{0,30}(cliquez|lien|code)/i.test(raw)) {
    reasons.push("Demande de confirmation par clic — vérifier l’expéditeur.");
  }
  if (amount === 0 && /recu|reçu|credit|succes|réussi/i.test(x)) {
    reasons.push("Montant nul avec libellé de réception réussie — incohérent.");
  }
  if (t.length < 25 && (amount != null || /fcfa|f cfa/i.test(x))) {
    reasons.push("Message très court pour une transaction — risque de faux SMS.");
  }
  if (t.length > 1200) {
    reasons.push("Message anormalement long.");
  }
  if (/\b(pin|code secret|mot de passe|password)\b.{0,40}\b(envoy|envoyez|partage|donne|indique)/i.test(x)) {
    reasons.push("Demande de code PIN ou mot de passe — les opérateurs ne le demandent jamais par SMS.");
  }
  if (/cliquez ici|tapez ce code|tappez ce code|activez votre compte/i.test(x)) {
    reasons.push("Formulation type hameçonnage (clic / activation).");
  }
  if (/\b(gagnez|loterie|bonus|promo)\b.{0,50}\b(fcfa|f cfa|argent)/i.test(x)) {
    reasons.push("Promesse de gain / loterie liée à de l’argent — signal de fraude fréquent.");
  }

  return reasons;
}

const httpsOrHttp = /https?:\/\/[^\s]+/i;

function confidenceScore(
  op: ParsedOperator,
  ty: ParsedType,
  amount: number | null,
  ref: string | null,
): number {
  let s = 0;
  if (op !== "unknown") s += 0.25;
  if (ty !== "unknown") s += 0.25;
  if (amount != null) s += 0.3;
  if (ref) s += 0.2;
  return Math.min(1, s);
}

function riskFromReasons(reasons: string[]): FraudRisk {
  if (reasons.length >= 2) return "high";
  if (reasons.length === 1) return "medium";
  return "low";
}

/**
 * Analyse un SMS brut : opérateur, type, montant, référence, risque fraude.
 */
export function analyzeMobileMoneySms(rawSms: string): SmsParseResult {
  const text = normalize(rawSms);
  if (!text) {
    return {
      operator: "unknown",
      type: "unknown",
      amountCfa: null,
      reference: null,
      counterpartyHint: null,
      confidence: 0,
      fraudRisk: "medium",
      fraudReasons: ["Message vide."],
    };
  }

  const operator = detectOperator(text);
  const type = detectType(text);
  const amountCfa = extractAmount(text);
  const reference = extractReference(text);
  const counterpartyHint = extractCounterparty(text);
  const fraudReasons = computeFraudReasons(rawSms, text, amountCfa);
  const confidence = confidenceScore(operator, type, amountCfa, reference);
  const fraudRisk = riskFromReasons(fraudReasons);

  return {
    operator,
    type,
    amountCfa,
    reference,
    counterpartyHint,
    confidence,
    fraudRisk,
    fraudReasons,
  };
}
