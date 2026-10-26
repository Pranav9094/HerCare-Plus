export const HEALTH_RISK_MODEL_VERSION = "ruleset-2026-10-26";

export type RiskBand = "lower indicator" | "moderate indicator" | "higher indicator";

export interface ScreeningInput {
  age: number;
  symptomDurationDays: number;
  painSeverity: number;
  heavyBleeding: boolean;
  faintingOrSevereDizziness: boolean;
  pregnancyPossible: boolean;
}

export interface ScreeningResult {
  modelVersion: string;
  riskBand: RiskBand;
  confidence: "uncertain";
  abstained: boolean;
  factors: string[];
  nextSteps: string[];
  limitation: string;
}

const LIMITATION =
  "This is a screening risk indicator, not a diagnosis. It is not clinically validated and cannot replace a qualified clinician.";

export function validateScreeningInput(value: unknown): ScreeningInput {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Request body must be an object.");
  }

  const input = value as Record<string, unknown>;
  const requiredBooleans = [
    "heavyBleeding",
    "faintingOrSevereDizziness",
    "pregnancyPossible",
  ];
  for (const field of requiredBooleans) {
    if (typeof input[field] !== "boolean") {
      throw new Error(`${field} must be a boolean.`);
    }
  }

  const age = input.age;
  const symptomDurationDays = input.symptomDurationDays;
  const painSeverity = input.painSeverity;
  if (
    typeof age !== "number" ||
    !Number.isInteger(age) ||
    age < 13 ||
    age > 120
  ) {
    throw new Error("age must be an integer between 13 and 120.");
  }
  if (
    typeof symptomDurationDays !== "number" ||
    !Number.isInteger(symptomDurationDays) ||
    symptomDurationDays < 0 ||
    symptomDurationDays > 365
  ) {
    throw new Error("symptomDurationDays must be an integer between 0 and 365.");
  }
  if (
    typeof painSeverity !== "number" ||
    !Number.isInteger(painSeverity) ||
    painSeverity < 0 ||
    painSeverity > 10
  ) {
    throw new Error("painSeverity must be an integer between 0 and 10.");
  }

  const unknownFields = Object.keys(input).filter(
    (field) =>
      ![
        "age",
        "symptomDurationDays",
        "painSeverity",
        ...requiredBooleans,
      ].includes(field),
  );
  if (unknownFields.length > 0) {
    throw new Error(`Unknown field: ${unknownFields[0]}.`);
  }

  return {
    age,
    symptomDurationDays,
    painSeverity,
    heavyBleeding: input.heavyBleeding as boolean,
    faintingOrSevereDizziness: input.faintingOrSevereDizziness as boolean,
    pregnancyPossible: input.pregnancyPossible as boolean,
  };
}

export function screenHealthRisk(input: ScreeningInput): ScreeningResult {
  const factors: string[] = [];
  const urgent = input.faintingOrSevereDizziness || input.painSeverity >= 9;
  if (input.faintingOrSevereDizziness) {
    factors.push("fainting or severe dizziness was reported");
  }
  if (input.heavyBleeding) factors.push("heavy bleeding was reported");
  if (input.pregnancyPossible) factors.push("pregnancy may be possible");
  if (input.painSeverity >= 7) factors.push("high pain severity was reported");
  if (input.symptomDurationDays >= 7) factors.push("symptoms have persisted for a week or more");

  const riskBand: RiskBand = urgent
    ? "higher indicator"
    : factors.length >= 2 || input.painSeverity >= 5
      ? "moderate indicator"
      : "lower indicator";

  return {
    modelVersion: HEALTH_RISK_MODEL_VERSION,
    riskBand,
    confidence: "uncertain",
    abstained: true,
    factors,
    nextSteps: [
      urgent
        ? "Seek urgent medical care now, especially if symptoms are worsening."
        : "Arrange a conversation with a qualified clinician if symptoms persist or concern you.",
      "Call local emergency services for severe or rapidly worsening symptoms.",
    ],
    limitation: LIMITATION,
  };
}
