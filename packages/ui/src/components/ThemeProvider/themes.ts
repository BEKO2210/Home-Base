export interface Theme {
  name: string
  value: string
}

export const themes = [
  { name: 'System', value: 'system' }, // Switches between dark and light
  { name: 'Dark', value: 'dark' }, // Classic Savira dark
  { name: 'Classic dark', value: 'classic-dark' }, // Deep Dark Savira dark
  { name: 'Light', value: 'light' }, // Classic Savira light
]
