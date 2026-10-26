import { describe, expect, it } from "vitest";
import {
  HEALTH_RISK_MODEL_VERSION,
  screenHealthRisk,
  validateScreeningInput,
} from "../src/lib/healthRiskScreening";

const validInput = {
  age: 28,
  symptomDurationDays: 2,
  painSeverity: 2,
  heavyBleeding: false,
  faintingOrSevereDizziness: false,
  pregnancyPossible: false,
};

describe("health risk screening", () => {
  it("rejects unknown fields and invalid ranges", () => {
    expect(() => validateScreeningInput({ ...validInput, role: "admin" })).toThrow(
      "Unknown field",
    );
    expect(() => validateScreeningInput({ ...validInput, painSeverity: 11 })).toThrow(
      "painSeverity",
    );
  });

  it("returns an abstaining lower indicator for low-signal input", () => {
    const result = screenHealthRisk(validateScreeningInput(validInput));
    expect(result.riskBand).toBe("lower indicator");
    expect(result.abstained).toBe(true);
    expect(result.confidence).toBe("uncertain");
    expect(result.modelVersion).toBe(HEALTH_RISK_MODEL_VERSION);
    expect(result.limitation).toContain("not a diagnosis");
  });

  it("elevates urgent red flags without presenting a diagnosis", () => {
    const result = screenHealthRisk(
      validateScreeningInput({
        ...validInput,
        painSeverity: 9,
        faintingOrSevereDizziness: true,
      }),
    );
    expect(result.riskBand).toBe("higher indicator");
    expect(result.nextSteps[0]).toContain("urgent medical care");
    expect(result.limitation).toContain("not clinically validated");
  });
});
