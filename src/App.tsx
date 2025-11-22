import { useState, useEffect } from 'react'

interface Quote {
  content: string
  author: string
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  )
}

function App() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [darkMode, setDarkMode] = useState(false)
  const [shareSuccess, setShareSuccess] = useState(false)

  useEffect(() => {
    try {
      const savedDarkMode = localStorage.getItem('darkMode')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const isDark = savedDarkMode === 'true' || (!savedDarkMode && prefersDark)
      setDarkMode(isDark)
      if (isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } catch (err) {
      // Handle localStorage errors (e.g., in private browsing)
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDarkMode(prefersDark)
      if (prefersDark) {
        document.documentElement.classList.add('dark')
      }
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', String(newDarkMode))
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const shareQuote = async () => {
    if (!quote) return

    const shareText = `"${quote.content}" — ${quote.author}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Random Quote',
          text: shareText,
        })
      } catch {
        copyToClipboard(shareText)
      }
    } else {
      copyToClipboard(shareText)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setShareSuccess(true)
      setTimeout(() => setShareSuccess(false), 2000)
    } catch {
      setError('Failed to copy quote to clipboard')
    }
  }

  const fetchRandomQuote = async () => {
    setLoading(true)
    setError(null)
    
    // Fallback quotes in case all APIs fail
    const fallbackQuotes: Quote[] = [
      { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { content: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
      { content: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
      { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
      { content: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
      { content: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
      { content: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
      { content: "You learn more from failure than from success.", author: "Unknown" },
    ]
    
    // List of quote APIs to try as fallbacks
    const quoteApis = [
      // Primary: Quotable API via Vite proxy
      async () => {
        const response = await fetch('/api/quotable/random')
        const data = await response.json()
        return { content: data.content, author: data.author }
      },
      // Fallback 1: Quotable API via CORS proxy
      async () => {
        const corsProxy = 'https://api.allorigins.win/raw?url='
        const url = encodeURIComponent('https://api.quotable.io/random')
        const response = await fetch(corsProxy + url)
        const data = await response.json()
        return { content: data.content, author: data.author }
      },
      // Fallback 2: Type.fit quotes API (CORS enabled)
      async () => {
        const response = await fetch('https://type.fit/api/quotes')
        const quotes = await response.json()
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
        return { content: randomQuote.text, author: randomQuote.author || 'Unknown' }
      },
    ]
    
    let lastError: Error | null = null
    
    // Try each API
    for (const apiCall of quoteApis) {
      try {
        const quote = await apiCall()
        
        if (!quote.content || !quote.author) {
          throw new Error('Invalid quote data received')
        }
        
        setQuote(quote)
        setLoading(false)
        return // Success, exit function
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err))
        console.warn('API attempt failed, trying next...', lastError.message)
        continue // Try next API
      }
    }
    
    // All APIs failed - use fallback quotes
    console.warn('All quote APIs failed. Using fallback quotes.')
    const randomFallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)]
    setQuote(randomFallback)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300" style={{ backgroundColor: '#f9fafb' }}>
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 shadow-lg z-50"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <svg
            className="w-6 h-6 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>

      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Random Quote Generator
      </h1>
      
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-8">
          <button
            onClick={fetchRandomQuote}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none"
          >
            {loading ? 'Fetching...' : 'Get Random Quote'}
          </button>
        </div>

        {loading && <LoadingSpinner />}

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-red-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-700 dark:text-red-400 font-medium">{error}</p>
            </div>
          </div>
        )}

        {shareSuccess && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-800 rounded-lg">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-green-700 dark:text-green-400 font-medium">Quote copied to clipboard!</p>
            </div>
          </div>
        )}

        {quote && !loading && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700 transform transition-all duration-300 hover:shadow-3xl relative">
            {/* Share Button */}
            <button
              onClick={shareQuote}
              className="absolute top-4 right-4 p-2 rounded-full bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-400 transition-colors duration-200 shadow-md"
              aria-label="Share quote"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </button>

            <div className="mb-6">
              <svg
                className="w-8 h-8 text-blue-500 mb-4 opacity-50"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-100 leading-relaxed italic pr-8">
                "{quote.content}"
              </p>
            </div>
            <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-200 font-bold text-right">
              — {quote.author}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
