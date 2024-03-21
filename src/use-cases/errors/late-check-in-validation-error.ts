export class LateCheckInValidationError extends Error {
  constructor() {
    super(
      'The check in can only be validated within 20 minutes after its creation.',
    )
    this.name = 'LateCheckInValidationError'
  }
}
