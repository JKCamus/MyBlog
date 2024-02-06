'use client'

import type Entity from '@ant-design/cssinjs/es/Cache'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs/lib'
import { useServerInsertedHTML } from 'next/navigation'
import React, { useState } from 'react'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'


export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  const cache = React.useMemo<Entity>(() => createCache(), [])

  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  // https://github.com/pavelee/next14-antd-reproduce-flickery/blob/main/app/_lib/AntdRegistry.tsx
  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return (
      <>
        <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
        {styles}
      </>
    )
  })

  if (typeof window !== 'undefined') return <>{children}</>

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <StyleProvider cache={cache}>{children as React.ReactChild}</StyleProvider>
    </StyleSheetManager>
  )
}
