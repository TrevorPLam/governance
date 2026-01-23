/**
 * Shared library package
 */

import { capitalize } from '@myorg/utils';

export class Greeter {
  constructor(private name: string) {}

  greet(): string {
    return `Hello, ${capitalize(this.name)}!`;
  }
}

export function processData(data: string[]): string[] {
  return data.map(item => capitalize(item));
}
