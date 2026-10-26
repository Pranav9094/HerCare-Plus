# Model Card: Health Risk Screening

## Status

No clinical model is shipped. `ruleset-2026-10-26` identifies a transparent
software ruleset so responses can be traced and rolled back.

## Intended use

Provide a conservative, educational screening risk indicator from six
user-reported signals and direct users toward appropriate care. The response
always abstains from claiming confidence and includes a plain-language
limitation.

## Out of scope

Diagnosis, triage replacement, treatment selection, emergency exclusion,
pregnancy assessment, population research, automated clinician decisions, and
any claim of clinical validation.

## Data and evaluation

No training data, model weights, performance metrics, calibration results, or
subgroup claims exist. Reporting invented metrics would be unsafe. A future
model requires a dataset card, locked test set, leakage checks, confidence
intervals, calibration, subgroup performance, and clinician-reviewed protocol
before consideration.

## Failure modes and retirement

Inputs can be incomplete, misunderstood, or outside the rules' scope. The
service uses strict ranges and an abstaining uncertainty state, but this does
not make the output clinically reliable. Any future version must retain this
version identifier and be retired if validation, safety, or privacy evidence
is inadequate.
