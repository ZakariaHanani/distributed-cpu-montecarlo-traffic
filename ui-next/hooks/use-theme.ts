'use client'

import { useCallback } from 'react'
import { useTheme as useNextTheme } from 'next-themes'

type ThemeMode = 'light' | 'dark'

export function useTheme() {
  const { resolvedTheme, setTheme } = useNextTheme()

  const theme: ThemeMode = resolvedTheme === 'dark' ? 'dark' : 'light'

  const toggleTheme = useCallback(() => {
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
  }, [theme, setTheme])

  return { theme, toggleTheme }
}

