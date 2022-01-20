interface corsHeaders {
  'Access-Control-Allow-Headers': string
  'Access-Control-Allow-Origin': string
  'Access-Control-Allow-Methods': string
}

interface getHeaders {
  allowedMethod: string
  allowedOrigin: string
}
