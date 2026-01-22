/**
 * Main application
 */

import { Greeter, processData } from '@myorg/lib';
import { formatDate, sum } from '@myorg/utils';

function main() {
  console.log('🚀 Monorepo Application Starting...\n');

  const greeter = new Greeter('world');
  console.log(greeter.greet());

  const data = ['alice', 'bob', 'charlie'];
  const processed = processData(data);
  console.log('Processed data:', processed);

  const today = formatDate(new Date());
  console.log('Today:', today);

  const numbers = [1, 2, 3, 4, 5];
  const total = sum(numbers);
  console.log('Sum:', total);

  console.log('\n✅ Application completed successfully!');
}

if (require.main === module) {
  main();
}

export { main };
