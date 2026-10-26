# Task 5: Health Risk Screening & ML Intelligence

## Summary

- Added an authenticated, stateless `/api/health-risk` contract with strict
  input validation, request-size protection, versioned responses, explicit
  abstention, and urgent-care guidance.
- Added a transparent, deterministic screening ruleset. It is intentionally
  not represented as a trained ML model or clinical decision tool.
- Added unit tests and audit, model-card, limitations, API, dataset-status,
  clinician-review, progress, and test-report documentation.
- Updated the README with the evidence-limited scope.

## Scope and evidence

The repository had no legitimate labeled health-risk dataset, trained model,
model artifact, or validation evidence. No external data was downloaded and no
metrics were fabricated. The implementation therefore makes no sensitivity,
specificity, calibration, subgroup, or clinical-validation claims.

## Safety and privacy

Responses say “screening risk indicator, not a diagnosis,” identify uncertain
confidence, and recommend qualified clinical care. Authentication is required;
the endpoint is stateless and does not log or store submitted health values.
Unknown fields and out-of-range values are rejected.

## Verification

- `npm test`: 13 tests passed.
- `npm run build`: passed.
- `git diff --check`: passed.
- `npm run lint`: pre-existing repository configuration blocker (ESLint 8
  cannot resolve `eslint/config`).

## Partial/blockers

Training, evaluation, calibration, OOD detection, drift monitoring, persisted
screening records, clinician/admin views, and a result-screen UI remain
blocked or out of scope until the project provides an approved dataset,
clinical governance, and a persisted authenticated screening data model.
