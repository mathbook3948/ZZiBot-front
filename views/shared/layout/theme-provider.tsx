'use client'

import {createContext, useContext, useEffect, useState} from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextProps {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'system'
    const saved = localStorage.getItem('theme') as Theme | null
    return saved || 'system'
}

export const ThemeProvider = ({children}: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(() => getInitialTheme())

    useEffect(() => {
        const root = document.documentElement
        const isDark =
            theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

        root.classList.remove('light', 'dark')
        root.classList.add(isDark ? 'dark' : 'light')

        if (theme === 'system') {
            localStorage.setItem('theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        } else {
            localStorage.setItem('theme', theme)
        }
    }, [theme])

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
    return ctx
}