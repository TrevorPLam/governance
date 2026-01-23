import { Request, Response } from 'express';

/**
 * 404 handler for undefined routes
 */
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path
  });
};
