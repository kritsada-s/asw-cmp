import logger from '@/app/utils/logger'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  try {
    logger.info('START API REQUEST: ' + JSON.stringify(body))
    const response = await fetch(`${process.env.NEXT_PUBLIC_N8N_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${process.env.NEXT_CIS_AUTH}`,
        // Add any other headers required by the AssetWise API
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()    
    logger.info('RESPONSE: ', data)

    return NextResponse.json(data)
  } catch (error) {
    logger.error('Error:', error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}