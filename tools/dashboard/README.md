# Metrics Dashboard (Local)

This is a lightweight, local-only dashboard served by `governance metrics dashboard`.

## Usage
```bash
governance metrics collect
governance metrics dashboard --port 3579
```

The dashboard reads `http://localhost:<port>/metrics.json` and renders a simple view.
