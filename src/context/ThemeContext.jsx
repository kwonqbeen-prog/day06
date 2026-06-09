import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('dt-theme') || 'light')
  const [palette, setPaletteState] = useState(() => localStorage.getItem('dt-palette') || '1')

  useEffect(() => {
    const html = document.documentElement
    if (theme === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
    html.setAttribute('data-palette', palette)
    localStorage.setItem('dt-theme', theme)
    localStorage.setItem('dt-palette', palette)
  }, [theme, palette])

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))
  const setPalette = (id) => setPaletteState(id)

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, palette, setPalette }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
