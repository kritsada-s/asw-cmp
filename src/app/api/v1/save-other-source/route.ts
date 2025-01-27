import logger from '@/app/utils/logger'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_N8N_ENDPOINT_TEST}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic YXN3X2Npc19jdXN0b21lcjphc3dfY2lzX2N1c3RvbWVyQDIwMjMh'
        // Add any other headers required by the AssetWise API
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()    
    logger.info(data)

    return NextResponse.json(data)
  } catch (error) {
    logger.error('Error:', error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}