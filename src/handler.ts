import { configRequestBody } from './types'
import { generateResponse, handleCors, isNumeric } from './utils'
import { getVersion, updateVersion } from './utils/kvUtils'
import { CURRENT } from './constants'

export async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url)
  const [, version] = pathname?.split('/')
  let response

  if (request.method === 'OPTIONS') {
    const corsHeaders = handleCors(request)
    return new Response('OK', {
      headers: {
        ...corsHeaders,
      },
    })
  }
  const corsHeaders = handleCors(request)
  const headers = {
    ...corsHeaders,
    'Content-Type': 'application/json',
  }
  if (request.method === 'GET') {
    if (!version || version === CURRENT || version === '/') {
      response = await getVersion(CURRENT)
      return generateResponse(response, 200, headers)
    } else if (isNumeric(version)) {
      response = await getVersion(version)
      return generateResponse(response, 200, headers)
    } else {
      return generateResponse('INVALID REQUEST', 400, headers)
    }
  }

  if (request.method === 'POST') {
    const requestBody: configRequestBody | undefined = await request.json()
    if (requestBody) {
      response = await updateVersion(requestBody)
      return generateResponse(JSON.stringify(response), 200, headers)
    }
    return generateResponse('Invalid Request Body', 400, headers)
  }

  return generateResponse('Bad Request', 400, headers)
}
