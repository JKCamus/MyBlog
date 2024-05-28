'use client'

import siteMetadata from '@/data/siteMetadata'
import { ThemeProvider } from 'next-themes'
import ThemeAntdProviders from './theme-antd-provider'
export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem>
      <ThemeAntdProviders>{children}</ThemeAntdProviders>
    </ThemeProvider>
  )
}
