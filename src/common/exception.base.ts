import { ObjectLiteral } from '../utils';
import { ExceptionType } from './exception.types';

export interface SerializedException {
  statusCode: number;
  message: string;
  type: string;
  stack?: string;
  metadata?: ObjectLiteral;
}

export abstract class ExceptionBase extends Error {
  abstract statusCode: number;
  abstract type: ExceptionType;

  /**
   * @param {string} message
   * @param {ObjectLiteral} [metadata={}].
   */
  constructor(readonly message: string, readonly metadata?: ObjectLiteral) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON(): SerializedException {
    return {
      statusCode: this.statusCode,
      message: this.message,
      type: this.type,
      stack: this.stack,
      metadata: this.metadata,
    };
  }
}
