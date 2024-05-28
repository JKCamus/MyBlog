'use client'
import React, { useEffect, useState } from 'react'
import { ConfigProvider, theme } from 'antd'

import { useTheme } from 'next-themes'

export default function ThemeAntdProviders({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()

  const [antdTheme, setAntdTheme] = useState({
    algorithm: theme.defaultAlgorithm,
  })
  useEffect(() => {
    setAntdTheme({
      algorithm: resolvedTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    })
  }, [resolvedTheme])

  return <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
}
