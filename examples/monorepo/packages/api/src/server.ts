import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { isValidEmail } from '@governance-example/utils';

/**
 * Express API Server
 * 
 * Layer: Domain/Data
 * Boundaries: Can import from @governance-example/utils only
 * Cannot import: @governance-example/ui, @governance-example/web-app
 */

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Example API endpoint
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Simulated subscription logic
  console.log('New subscription:', email);

  res.json({
    success: true,
    message: 'Successfully subscribed',
    email,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});

export default app;
