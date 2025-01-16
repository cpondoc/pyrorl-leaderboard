import { NextRequest, NextResponse } from 'next/server'

const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000'

export async function GET(req: NextRequest) {
  try {
    const response = await fetch(`${FASTAPI_URL}/leaderboard`)

    if (!response.ok) {
      throw new Error('Failed to fetch leaderboard data')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'An error occurred while fetching the leaderboard' }, { status: 500 })
  }
}

