import type { AddressApiResponse } from './get-address-by-zipcode'

interface AddressUser {
  street: string
  neighborhood: string
  city: string
  zipCode: number
  latitude: number
  longitude: number
}

const errorMessage =
  'Os dados fornecidos não correspondem ao endereço retornado pela API.'

export function validateAddressFromApi(
  { latitude, longitude, street, neighborhood, city, zipCode }: AddressUser,
  {
    zipCodeApi,
    streetApi,
    neighborhoodApi,
    cityApi,
    latitudeApi,
    longitudeApi,
  }: AddressApiResponse,
) {
  if (
    zipCodeApi !== zipCode ||
    latitudeApi !== latitude ||
    longitudeApi !== longitude
  ) {
    throw new Error(errorMessage)
  }

  if (
    streetApi.toLowerCase() !== street.toLowerCase() ||
    neighborhoodApi.toLowerCase() !== neighborhood.toLowerCase() ||
    cityApi.toLowerCase() !== city.toLowerCase()
  ) {
    throw new Error(errorMessage)
  }
}
