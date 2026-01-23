import * as path from 'path';
import chalk from 'chalk';
import { writeJsonFile } from '../utils/files';
import { getMaturityCriteriaPath, getProjectRoot } from '../utils/files';
import { runMaturityAssessment } from '../utils/maturity';

interface MaturityCheckOptions {
  json?: boolean;
  report?: string;
  verbose?: boolean;
}

function formatCriterionFailures(failures: string[]): string {
  return failures.map((failure) => `    - ${failure}`).join('\n');
}

export async function maturityCheckCommand(options: MaturityCheckOptions): Promise<void> {
  console.log(chalk.blue('\n📊 Governance CLI - Maturity Check\n'));

  const projectRoot = (await getProjectRoot()) ?? process.cwd();
  const criteriaPath = getMaturityCriteriaPath();

  const report = await runMaturityAssessment(projectRoot, criteriaPath);

  console.log(`Project root: ${projectRoot}`);
  console.log(`Criteria version: ${report.criteriaVersion}`);
  console.log(`Current maturity: Level ${report.currentLevel.level} - ${report.currentLevel.name}`);

  if (report.nextLevel) {
    console.log(`Next target: Level ${report.nextLevel.level} - ${report.nextLevel.name}`);
  } else {
    console.log('Next target: None (highest maturity reached)');
  }

  const failed = report.criteriaResults.filter((result) => !result.passed);
  const passed = report.criteriaResults.filter((result) => result.passed);

  console.log(`\nSummary: ${passed.length} passed, ${failed.length} failed`);

  if (options.verbose && report.criteriaResults.length > 0) {
    console.log('\nDetails:');
    for (const result of report.criteriaResults) {
      const status = result.passed ? chalk.green('✓') : chalk.red('✗');
      console.log(`${status} ${result.description}`);
      if (!result.passed) {
        console.log(formatCriterionFailures(result.failures));
      }
    }
  }

  if (options.json) {
    console.log('\nJSON Report:');
    console.log(JSON.stringify(report, null, 2));
  }

  if (options.report) {
    const reportPath = path.resolve(options.report);
    await writeJsonFile(reportPath, report);
    console.log(`\nReport saved to: ${reportPath}`);
  }

  if (failed.length > 0 && report.nextLevel) {
    console.log(
      chalk.yellow(
        `\nNext level gaps: ${failed.length} criteria not met for Level ${report.nextLevel.level}.`,
      ),
    );
  }

  console.log('');
}
