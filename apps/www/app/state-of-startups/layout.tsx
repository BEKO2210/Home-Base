import { Inter } from 'next/font/google'

// Open-source font (Inter, SIL OFL) — replaces the proprietary Suisse Int'l.
const suisseIntl = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-suisse-intl',
  display: 'swap',
})

export default function StateOfStartupsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={suisseIntl.variable} style={{ fontFamily: 'var(--font-suisse-intl)' }}>
      {children}
    </div>
  )
}
