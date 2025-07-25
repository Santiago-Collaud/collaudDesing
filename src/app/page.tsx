"use client";
import Image from "next/image";

export default function Home() {
  const handleClick = () => {
    alert("TODAVIA NO HAY NADA AQUÍ, ESTAMOS TRABAJANDO EN ELLO");
  }
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="group hover:bg-gray-700 transition duration-900 p-10 rounded-lg shadow-lg text-center ">
        <h1 className="text-5xl font-mono text-blue-600">Estamos llegando</h1>
        <h1 className="titulo-personalizado text-5xl text-blue-600 group-hover:text-red-100 transition duration-900">Preparate</h1>
      </div>
      <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row rounded-lg shadow-2xl">
    <Image
      src="/icon/CollaudDesing_2.png"
      alt="Hero Image"
      width={500}
      height={500}
      className="max-w-sm rounded-xl shadow-2xl bg-linear-65 from-cyan-500 to-blue-500 pt-4 pb-2"></Image>
    <div>
      <p className="text-lg flex justify-center font-mono">
        <strong>Hacemos que tus ideas cobren vida.</strong> 
      </p>
      <p> Nuestro equipo de expertos está listo para llevar tu presencia en línea al siguiente nivel.</p>
      <div className="flex justify-end mt-4">
        <button 
          className="btn font-mono rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 transition duration-300"
          onClick={() => handleClick()}>
          Conoce mas
        </button>
      </div>
      
    </div>
  </div>
</div>
    </main>
  )
}
