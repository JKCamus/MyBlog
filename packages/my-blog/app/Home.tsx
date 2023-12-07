import styled from 'styled-components'
export default function Banner() {
  return (
    <div
      className="absolute left-0 flex h-screen w-full items-center justify-center bg-cover bg-fixed bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/static/images/DSC07241.jpg')" }}
    >
      <div
        className="inline-block w-11/12 max-w-6xl rounded bg-white bg-opacity-90 p-12 text-xs text-gray-500 shadow-md"
        style={{ top: '25%' }}
      >
        <Blockquote>
          <p className="text-4xl font-medium  leading-relaxed before:relative before:-left-4  before:-top-0 before:text-6xl before:content-['“']">
            There are two types of people who will tell you that you cannot make a difference in
            this world: those who are afraid to try and those who are afraid you will succeed.
          </p>
          <footer className="mt-4 font-medium  text-gray-600">— Ray Goforth</footer>
        </Blockquote>
      </div>
    </div>
  )
}

const Blockquote = styled.blockquote`
  text-align: center;
  position: relative;
`
