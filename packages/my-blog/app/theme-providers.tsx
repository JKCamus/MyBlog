'use client'

import siteMetadata from '@/data/siteMetadata'
import { ThemeProvider } from 'next-themes'
import ThemeAntdProviders from './theme-antd-provider'
import { NextUIProvider } from '@nextui-org/react'

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem>
      <NextUIProvider>
        <ThemeAntdProviders>{children}</ThemeAntdProviders>
      </NextUIProvider>
    </ThemeProvider>
  )
}
