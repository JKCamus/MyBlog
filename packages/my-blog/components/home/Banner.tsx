import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { renderCanvas } from './renderCanvas'
export default function Banner() {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    renderCanvas()
    ref.current?.classList.add('transition-in')
  }, [])

  return (
    <div>
      <canvas
        className="bg-skin-base pointer-events-none absolute inset-0 z-10 "
        id="canvas"
      ></canvas>
      <div
        className="relative min-h-screen w-screen bg-cover bg-fixed bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/static/images/DSC07241.jpg')",
        }}
      >
        <div
          className="absolute left-1/2 top-1/4 inline-block w-11/12 max-w-6xl -translate-x-1/2 rounded bg-white bg-opacity-90
        p-8  text-gray-500 shadow-md sm:top-1/3  sm:p-12
        "
        >
          <Blockquote>
            <p className="text-[1.5rem] font-medium leading-relaxed  before:relative  before:-left-4 before:-top-0 before:text-6xl  before:content-['“'] sm:text-4xl sm:leading-relaxed">
              There are two types of people who will tell you that you cannot make a difference in
              this world: those who are afraid to try and those who are afraid you will succeed.
            </p>
            <footer className="mt-4 font-medium  text-gray-600">— Ray Goforth</footer>
          </Blockquote>
        </div>
      </div>
    </div>
  )
}

const Blockquote = styled.blockquote`
  text-align: center;
  position: relative;
  cursor: pointer;
`
