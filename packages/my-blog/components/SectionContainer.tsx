import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return (
    <section className="mx-auto  px-4 sm:px-6 xl:max-w-[90vw] xl:px-0 root-container">{children}</section>
  )
}




