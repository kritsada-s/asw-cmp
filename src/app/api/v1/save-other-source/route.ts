import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const UAT_API_URL = 'https://aswinno.assetwise.co.th/CISUAT/api/Customer/SaveOtherSource'
  const PROD_API_URL = 'https://api.assetwise.co.th/cis/api/Customer/SaveOtherSource'

  try {
    const response = await fetch(UAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic YXN3X2Npc19jdXN0b21lcjphc3dfY2lzX2N1c3RvbWVyQDIwMjMh'
        // Add any other headers required by the AssetWise API
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}