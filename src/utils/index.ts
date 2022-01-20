import { allowedOrigins, allowedMethods } from '../constants'

export const corsHeaders = (origin: string, method: string): corsHeaders => ({
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Origin': origin,
  'Access-Control-Allow-Methods': method,
})

export const checkOrigin = (request: Request): string => {
  const origin = request.headers.get('Origin') || ''
  const foundOrigin = allowedOrigins.find((allowedOrigin) => {
    return allowedOrigin.indexOf(origin) > -1
  })
  return foundOrigin ? origin : allowedOrigins[0]
}

const convertMethodsToString = () => allowedMethods.join(', ')

export const checkMethod = (request: Request): string => {
  const method = request.method
  const foundMethod = allowedMethods.find(
    (allowedMethod) => allowedMethod === method,
  )
  return foundMethod ? foundMethod : convertMethodsToString()
}

export const getHeaders = (request: Request): getHeaders => {
  const allowedOrigin = checkOrigin(request)
  const allowedMethod = checkMethod(request)
  return {
    allowedMethod,
    allowedOrigin,
  }
}

export const handleCors = (request: Request): corsHeaders => {
  const { allowedMethod, allowedOrigin } = getHeaders(request)
  return corsHeaders(allowedOrigin, allowedMethod)
}

export const isNumeric = (n: any): boolean =>
  !isNaN(parseFloat(n)) && isFinite(n)

export const generateResponse = (
  body = '',
  status = 200,
  headers = {},
): Response =>
  new Response(body, {
    status,
    headers,
  })
