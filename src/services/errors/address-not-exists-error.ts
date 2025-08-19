export class AddressNotExistsError extends Error {
  constructor() {
    super('Address not exists.')
  }
}
