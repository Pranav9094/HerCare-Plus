# Health Risk Screening Limitations

- The current implementation is a deterministic ruleset, not a trained ML
  model. It must not be described as clinically validated.
- No approved public labeled dataset was present in the repository, so no
  sensitivity, specificity, calibration, subgroup, or confidence metrics are
  reported.
- The rules are not a substitute for history, examination, testing, or
  clinician judgment and may miss serious illness or produce unnecessary
  concern.
- The result is a screening risk indicator, not a diagnosis. A qualified
  clinician should review persistent, severe, or worrying symptoms.
- The endpoint does not store screening results and has no longitudinal drift
  monitoring because there is no approved production model or training
  distribution.
- Clinical claims would require a governed dataset, prespecified protocol,
  ethics/privacy review, external validation, calibration, subgroup analysis,
  and prospective clinician-reviewed evidence.
