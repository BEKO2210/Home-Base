import { Inter, Source_Code_Pro } from 'next/font/google'

// Open-source UI font (Inter, SIL OFL) — replaces the proprietary 'CustomFont'.
export const customFont = Inter({
  subsets: ['latin'],
  variable: '--font-custom',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  fallback: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
})

export const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  fallback: ['Source Code Pro', 'Office Code Pro', 'Menlo', 'monospace'],
  variable: '--font-source-code-pro',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})
