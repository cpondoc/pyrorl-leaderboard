'use client'

import { useState } from 'react'
import { useGymEnvironment } from '../hooks/useGymEnvironment'

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const { uploadFile, gifUrl, isLoading, error } = useGymEnvironment()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (file) {
      await uploadFile(file)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-2 p-2 border rounded"
        />
        <button
          type="submit"
          disabled={!file || isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Upload and Visualize
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {gifUrl && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Visualization Result:</h2>
          <img src={gifUrl || "/placeholder.svg"} alt="Gym Environment Visualization" className="max-w-full h-auto" />
        </div>
      )}
    </div>
  )
}

