// useFetch.js
import { useState, useEffect } from "react"

const useFetch = (url, options = {}, token = null) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchData = async () => {
      setLoading(true)

      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      }

      try {
        const response = await fetch(url, {
          ...options,
          headers,
          signal,
        })

        if (!response.ok) {
          throw new Error(`Erreur ${response.status} : ${response.statusText}`)
        }

        const result = await response.json()
        setData(result)
        setError(null)
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message)
          setData(null)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [url, JSON.stringify(options), token])

  return { data, loading, error }
}

export default useFetch
