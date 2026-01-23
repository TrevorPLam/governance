const https = require('https');

const token = process.env.GITHUB_TOKEN;
const repo = process.env.GITHUB_REPO; // format: owner/repo
const title = process.argv[2];
const body = process.argv[3] || '';

if (!token || !repo || !title) {
  console.error('GITHUB_TOKEN, GITHUB_REPO, and title are required.');
  process.exit(1);
}

const payload = JSON.stringify({ title, body });

const request = https.request(
  {
    hostname: 'api.github.com',
    path: `/repos/${repo}/issues`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': 'governance-cli',
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
    },
  },
  (res) => {
    res.on('data', () => {});
    res.on('end', () => {
      console.log('GitHub issue created.');
    });
  },
);

request.on('error', (error) => {
  console.error('GitHub API error:', error.message);
  process.exit(1);
});

request.write(payload);
request.end();
