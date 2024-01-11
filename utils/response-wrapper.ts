import { NextResponse } from 'next/server'

export const NextResponseWrapper = <T>(data: T): NextResponse<{ data: T }> => {
  return NextResponse.json({ data })
}
