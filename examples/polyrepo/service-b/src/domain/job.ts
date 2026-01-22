export interface Job {
  id: string;
  status: 'queued' | 'running' | 'done';
}
