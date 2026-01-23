const https = require('https');
const { URL } = require('url');

const webhookUrl = process.env.SLACK_WEBHOOK_URL;
const message = process.argv.slice(2).join(' ') || 'Governance notification';

if (!webhookUrl) {
  console.error('SLACK_WEBHOOK_URL is required.');
  process.exit(1);
}

const payload = JSON.stringify({ text: message });
const url = new URL(webhookUrl);

const request = https.request(
  {
    hostname: url.hostname,
    path: url.pathname + url.search,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
    },
  },
  (res) => {
    res.on('data', () => {});
    res.on('end', () => {
      console.log('Slack notification sent.');
    });
  },
);

request.on('error', (error) => {
  console.error('Slack webhook error:', error.message);
  process.exit(1);
});

request.write(payload);
request.end();
