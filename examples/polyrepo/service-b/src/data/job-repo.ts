import { Job } from '../domain/job';

export function loadJob(id: string): Job {
  return { id, status: 'queued' };
}
