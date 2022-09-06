import { ExceptionBase } from './exception.base';
import { ExceptionType } from './exception.types';

/**
 * Used to indicate that an incorrect argument was provided to a method/function/class constructor
 *
 * @class ArgumentInvalidException
 * @extends {ExceptionBase}
 */
export class ArgumentInvalidException extends ExceptionBase {
  readonly statusCode = 400;
  readonly type = ExceptionType.ArgumentInvalid;
}
