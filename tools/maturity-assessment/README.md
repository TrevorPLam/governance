# Maturity Assessment Tool

This tool powers the `governance maturity-check` command by providing the criteria
used to assess governance maturity in a target repository.

## What's Included
- `criteria.json`: Machine-readable maturity levels and criteria

## Usage
The CLI loads `criteria.json` and checks the current repo for required files and
configuration. The results are summarized as:
- Current maturity level
- Passed/failed criteria
- Next-level gaps

## Updating Criteria
Edit `criteria.json` to add or refine checks. Keep paths relative to the target
repository root (where `.repo/` lives).
