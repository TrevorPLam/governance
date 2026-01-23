import * as path from 'path';
import Ajv from 'ajv';
import * as yaml from 'js-yaml';
import { getPolicyValidatorsRoot, readFile } from './files';

export interface SchemaValidationResult {
  schemaName: string;
  filePath: string;
  valid: boolean;
  errors: string[];
}

const ajv = new Ajv({ allErrors: true, strict: false });

export async function validateJsonSchema(
  schemaPath: string,
  data: unknown,
  schemaName: string,
  targetPath: string,
): Promise<SchemaValidationResult> {
  const schemaContent = await readFile(schemaPath);
  const schema = JSON.parse(schemaContent);
  if (!ajv.getSchema(schemaPath)) {
    ajv.addSchema(schema, schemaPath);
  }
  const validate = ajv.getSchema(schemaPath) ?? ajv.compile(schema);
  const valid = validate(data) as boolean;
  const errors =
    validate.errors?.map((error) => `${error.instancePath || '/'} ${error.message ?? 'invalid'}`) ??
    [];

  return {
    schemaName,
    filePath: targetPath,
    valid,
    errors,
  };
}

export async function validateYamlWithSchema(
  schemaName: string,
  schemaFile: string,
  yamlFile: string,
): Promise<SchemaValidationResult> {
  const content = await readFile(yamlFile);
  const data = yaml.load(content) as unknown;
  return validateJsonSchema(schemaFile, data, schemaName, yamlFile);
}

export function getSchemaPath(schemaFileName: string): string {
  return path.join(getPolicyValidatorsRoot(), 'schemas', schemaFileName);
}
