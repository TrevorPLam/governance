import { Request, Response, NextFunction } from 'express';

interface User {
  id: number;
  name: string;
  email: string;
}

// In-memory data store (replace with database in production)
const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

let nextId = 3;

/**
 * Get API root information
 */
export const getRoot = (_req: Request, res: Response) => {
  res.json({
    message: 'Express API with Governance',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      users: '/api/users'
    }
  });
};

/**
 * Get all users
 */
export const getUsers = (_req: Request, res: Response) => {
  res.json(users);
};

/**
 * Get user by ID
 */
export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
};

/**
 * Create new user
 */
export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  
  const newUser: User = {
    id: nextId++,
    name,
    email
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
};
