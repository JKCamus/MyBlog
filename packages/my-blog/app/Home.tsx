
export default function Banner() {
  return (
    <div className="absolute w-full h-screen bg-no-repeat bg-cover bg-fixed bg-center flex justify-center items-center left-0" style={{ backgroundImage: "url('/static/images/DSC07241.jpg')" }}>
      <div className="inline-block w-11/12 max-w-6xl bg-white bg-opacity-90 p-12 text-xs text-gray-500 rounded shadow-md" style={{ top: '25%' }}>
        <blockquote className="text-center relative">
          <p className="text-4xl leading-relaxed font-serif before:content-['“'] before:relative before:text-6xl  before:-top-0 before:-left-4">
            There are two types of people who will tell you that you
            cannot make a difference in this world: those who are afraid
            to try and those who are afraid you will succeed.
          </p>
          <footer className="text-gray-600 mt-4">
            — Ray Goforth
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
