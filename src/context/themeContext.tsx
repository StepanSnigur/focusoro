import React, { useState } from 'react'

export interface ITheme {
  button: string,
  secondaryButton: string,
  background: string,
  secondaryBackground: string,
  color: string,
}
type ThemeName = 'light' | 'dark'
const initialValue = {
  theme: 'light' as ThemeName,
  toggle: () => {},
  themes: {
    dark: {
      color: 'rgba(255, 255, 255, 0.87)',
      background: '#242424',
      button: '#1a1a1a',
      secondaryButton: '#1C1C1E',
    },
    light: {
      color: '#213547',
      button: '#f5f5f5',
      secondaryButton: '#F5F5F5',
    },
  },
  currentTheme: {},
}
export const ThemeContext = React.createContext(initialValue)

interface IThemeProvider {
  children: React.ReactNode
}
export const ThemeProvider: React.FC<IThemeProvider> = (props) => {
  const [theme, setTheme] = useState<ThemeName>(initialValue.theme)

  const changeTheme = () => {
    setTheme(prevState => prevState === 'light' ? 'dark' : 'light')
    // TODO set to local storage
  }

  return (
    <ThemeContext.Provider value={{
      theme,
      themes: initialValue.themes,
      toggle: changeTheme,
      currentTheme: initialValue.themes[theme] as ITheme,
    }}>
      {props.children}
    </ThemeContext.Provider>
  )
}