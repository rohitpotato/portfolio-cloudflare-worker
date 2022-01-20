interface CorsOptions {
  origin?: string
  methods?: string
  headers?: string
  credentials?: boolean
}
export function withCors(options?: CorsOptions): Response
