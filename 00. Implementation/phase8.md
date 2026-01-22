# PHASE-8: Docs Glue (Indexes + Standards + ADR Scaffold)

- Phase ID: PHASE-8

## Files
### `/.repo/docs/DOCS_INDEX.md` (markdown)
```markdown
# /.repo/docs/DOCS_INDEX.md
Textbook Codebase v2.2 Documentation Index.

## Start Here
- /.repo/GOVERNANCE.md
- /.repo/policy/CONSTITUTION.md
- /.repo/policy/PRINCIPLES.md
- /.repo/policy/QUALITY_GATES.md
- /.repo/policy/SECURITY_BASELINE.md
- /.repo/policy/BOUNDARIES.md
- /.repo/policy/HITL.md

## Standards
- /.repo/docs/standards/documentation.md
- /.repo/docs/standards/adr.md
- /.repo/docs/standards/api.md
- /.repo/docs/standards/style.md

## ADR History
- /.repo/docs/adr/README.md
```

### `/.repo/docs/standards/documentation.md` (markdown)
```markdown
# /.repo/docs/standards/documentation.md
- Docs must update when code updates.
- Filepaths required.
- Examples are contracts.
```

### `/.repo/docs/standards/adr.md` (markdown)
```markdown
# /.repo/docs/standards/adr.md
- ADR required for: dependencies, api-contract, schema, security, boundaries, architecture.
- Follow template in /.repo/templates/ADR_TEMPLATE.md.
```

### `/.repo/docs/standards/api.md` (markdown)
```markdown
# /.repo/docs/standards/api.md
- Document API shape, input, output, and edge cases.
- Changes require api-contract change type.
```

### `/.repo/docs/standards/style.md` (markdown)
```markdown
# /.repo/docs/standards/style.md
- Keep naming clear.
- No duplication.
- Functions do one thing.
- Comments explain WHY, not WHAT.
```

### `/.repo/docs/adr/README.md` (markdown)
```markdown
# /.repo/docs/adr/README.md
Contains all ADRs. Use sequential numbering.
```

### `/.repo/docs/adr/0001-example.md` (markdown)
```markdown
# /.repo/docs/adr/0001-example.md
Example ADR using template.
```