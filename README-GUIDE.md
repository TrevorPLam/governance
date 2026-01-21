# Textbook Codebase v2.2 — Full Handoff Bundle (Phases 1–9)

Each `phaseN.md` is a markdown file that contains JSON. The JSON includes a list of files with their target filepaths and contents.

## How to apply to a repo (plain English)
1) Unzip.
2) Apply phases in order (1 → 9).
3) For each phase:
   - Open `phaseN.md`
   - Copy the JSON
   - Create/overwrite files at each `path` with the given `content`
4) After Phase 3, resolve manifest command placeholders using:
   - `/.repo/docs/standards/manifest.md`
5) Run the manifest verification profiles once commands are resolved.

## Notes
- Phase 1 and Phase 2 are authoritative governance decisions and policy docs.
- Phase 3–9 provide scaffolds for manifest, agents, templates, automation stubs, docs glue, and root scaffolds.
- See ACCURACY_REPORT.md for what was verified/fixed.