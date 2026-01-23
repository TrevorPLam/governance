import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs-extra';
import { getMaturityCriteriaPath } from '../../src/utils/files';

describe('Maturity Criteria', () => {
  it('should load maturity criteria file', () => {
    const criteriaPath = getMaturityCriteriaPath();
    expect(fs.existsSync(criteriaPath)).toBe(true);
  });

  it('should define levels 0 through 4', () => {
    const criteriaPath = getMaturityCriteriaPath();
    const criteria = fs.readJsonSync(criteriaPath);
    const levels = criteria.levels.map((level: { level: number }) => level.level);
    expect(levels).toEqual([0, 1, 2, 3, 4]);
  });
});
