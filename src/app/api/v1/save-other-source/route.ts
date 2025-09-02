import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  let CIS_ENDPOINT = '';

  if (window.location.hostname === 'localhost') {
    CIS_ENDPOINT = 'https://aswinno.assetwise.co.th/CISUAT/api/Customer/SaveOtherSource'
    console.log('UAT')
  } else {
    CIS_ENDPOINT = 'https://api.assetwise.co.th/cis/api/Customer/SaveOtherSource'
    console.log('PROD')
  }

  try {
    const response = await fetch(CIS_ENDPOINT, {
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