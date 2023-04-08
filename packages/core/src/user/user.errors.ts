import { ExceptionBase } from '@egodb/domain'

export class InvalidUserIdError extends ExceptionBase {
  code = 'USER.INVALID_ID'

  constructor() {
    super('invalid user id')
  }
}
