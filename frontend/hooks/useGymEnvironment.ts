import { useState } from 'react'

// Define types for our data
type LeaderboardEntry = {
  rank: number
  name: string
  score: number
  environment: string
}

export function useGymEnvironment() {
  const [gifUrl, setGifUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadFile = async (file: File) => {
    setIsLoading(true)
    setError(null)
    setGifUrl(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/visualize', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to process the file')
      }

      const data = await response.json()
      setGifUrl(data.gifUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchLeaderboard = async (): Promise<LeaderboardEntry[]> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/leaderboard')
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard data')
      }
      const data = await response.json()
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
      return []
    } finally {
      setIsLoading(false)
    }
  }

  return { uploadFile, gifUrl, isLoading, error, fetchLeaderboard }
}

