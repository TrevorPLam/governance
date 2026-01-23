# Policy Validators

This folder contains policy-as-code validators used by the governance CLI.

## Contents
- `opa/`: OPA (Rego) policies
- `schemas/`: JSON schemas for manifest and governance artifacts
- `linters/`: Regex-based lint rules

## Usage
Run all validators:
```bash
governance lint --all
```

Run specific validators:
```bash
governance lint --schema
governance lint --opa
governance lint --regex
```
