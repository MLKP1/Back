interface BrazilApiResponse {
  cep: number
  state: string
  city: string
  neighborhood: string
  street: string
  service: string
  location: {
    type: string
    coordinates: {
      latitude: number
      longitude: number
    }
  }
}

export interface AddressApiResponse {
  latitudeApi: number
  longitudeApi: number
  streetApi: string
  neighborhoodApi: string
  cityApi: string
  zipCodeApi: number
}

export async function getAddressByZipCode(
  zipCode: number,
): Promise<AddressApiResponse> {
  let data: BrazilApiResponse
  try {
    const response = await fetch(
      `https://brasilapi.com.br/api/cep/v2/${zipCode}`,
      {
        signal: AbortSignal.timeout(5000),
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    data = await response.json()
  } catch (err) {
    throw new Error(
      `Erro ao buscar dados do endereço: ${(err as Error).message}`,
    )
  }

  const zipCodeApi = Number(data.cep)
  const streetApi = data.street
  const neighborhoodApi = data.neighborhood
  const cityApi = data.city
  const latitudeApi = Number(data.location.coordinates.latitude)
  const longitudeApi = Number(data.location.coordinates.longitude)

  if (!latitudeApi || !longitudeApi) {
    throw new Error(
      'Não foi possível obter as coordenadas para o CEP informado.',
    )
  }

  return {
    zipCodeApi,
    streetApi,
    neighborhoodApi,
    cityApi,
    latitudeApi,
    longitudeApi,
  }
}
