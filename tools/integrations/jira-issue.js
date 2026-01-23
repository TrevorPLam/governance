const https = require('https');

const baseUrl = process.env.JIRA_BASE_URL;
const token = process.env.JIRA_TOKEN;
const email = process.env.JIRA_EMAIL;
const projectKey = process.env.JIRA_PROJECT_KEY;
const summary = process.argv[2];
const description = process.argv[3] || '';

if (!baseUrl || !token || !email || !projectKey || !summary) {
  console.error('JIRA_BASE_URL, JIRA_TOKEN, JIRA_EMAIL, JIRA_PROJECT_KEY, and summary are required.');
  process.exit(1);
}

const payload = JSON.stringify({
  fields: {
    project: { key: projectKey },
    summary,
    description,
    issuetype: { name: 'Task' },
  },
});

const auth = Buffer.from(`${email}:${token}`).toString('base64');
const url = new URL(baseUrl);

const request = https.request(
  {
    hostname: url.hostname,
    path: `${url.pathname.replace(/\/$/, '')}/rest/api/3/issue`,
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
    },
  },
  (res) => {
    res.on('data', () => {});
    res.on('end', () => {
      console.log('Jira issue created.');
    });
  },
);

request.on('error', (error) => {
  console.error('Jira API error:', error.message);
  process.exit(1);
});

request.write(payload);
request.end();
