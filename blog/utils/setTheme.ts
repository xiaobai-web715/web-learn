export const setTheme = (theme: 'light' | 'dark') => { 
    document.documentElement.setAttribute('data-theme', theme)
}