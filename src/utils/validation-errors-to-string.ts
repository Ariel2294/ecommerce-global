import { ValidationError } from 'class-validator';

export function validationErrorsToString(errors: ValidationError[]): string {
  return errors
    .reduce(
      (result: string[], error: ValidationError) => [
        ...result,
        Object.values(error.constraints),
      ],
      [],
    )
    .join(', ');
}
