# Integrations

Sample integrations for enterprise workflows. These scripts are optional and can be adapted to your environment.

## Slack (Webhook)
```bash
node tools/integrations/slack-webhook.js "Governance check failed"
```

## GitHub Issue
```bash
GITHUB_TOKEN=... node tools/integrations/github-issue.js "Governance violation" "Details here"
```

## Jira Issue
```bash
JIRA_BASE_URL=... JIRA_TOKEN=... node tools/integrations/jira-issue.js "Governance violation" "Details here"
```
