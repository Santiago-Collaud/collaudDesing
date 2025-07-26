"use client";
import Image from "next/image";
import Footer from "./componetes/footer/footer";
import React, { useState } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
    
  }
  

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="colse flex-col items-center justify-center mb-10">
          <div className="group hover:bg-gray-700 transition duration-900 p-10 rounded-lg shadow-lg text-center ">
            <h1 className="text-5xl font-mono text-blue-600">Estamos llegando</h1>
            <h1 className="titulo-personalizado text-5xl text-blue-600 group-hover:text-red-100 transition duration-900">Preparate</h1>
          </div>
        <div className="hero bg-base-200 min-h-screen mt-4">
          <div className="hero-content flex-col lg:flex-row rounded-lg shadow-2xl">
            <Image
              src="/icon/CollaudDesing_2.png"
              alt="Hero Image"
              width={500}
              height={500}
              className="max-w-sm rounded-xl shadow-2xl bg-linear-65 from-cyan-500 to-blue-500 pt-4 pb-2"
            />
            <div>
              <p className="text-lg flex justify-center font-mono">
                <strong>Hacemos que tus ideas cobren vida.</strong> 
              </p>
              <p>¿Está listo para llevar tu presencia en línea al siguiente nivel?</p>
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

        {/* CAROUSEL */}
        <div className="flex flex-col items-center justify-center mt-10 border-t-2 border-b-2 border-gray-700 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="carousel max-w-sm flex">
              <div id="item1" className="carousel-item w-full ">
                <img
                  src="/icon/Lux.png"
                  className="w-full" />
              </div>
              <div id="item2" className="carousel-item w-full">
                <img
                  src="/icon/Nexo.png"
                  className="w-full" />
              </div>
              <div id="item3" className="carousel-item w-full">
                <img
                  src="/icon/Vox.png"
                  className="w-full" />
              </div>
            </div>
            <div className="grid-cols-1 md:grid-cols-3 flex flex-col items-center justify-center justify-content-center p-4 rounded-lg shadow-lg bg-gray-800 text-white">
              <a href="#item1" className="btn m-4">Convertimos tu imaginacion en imagenes</a>
              <a href="#item2" className="btn m-4">Conectamos tu mente y negocios con el mundo</a>
              <a href="#item3" className="btn m-4">Hacemos que tu voz llegue lejos</a>
            </div>
          </div>
        </div>
        {/*FOOTER*/}
        <div className="mt-10">
          <Footer />
        </div>
    </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-red-800 bg-opacity-100">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-mono text-blue-600/100 mb-4">PARAAAA... Emocion...</h2>
            <p className="text-blue-600/100">Estamos trabajando arduamente para ofrecerte la mejor experiencia. </p>
            <p className="mb-4 text-blue-600/100"><strong>Por eso demoramos tanto</strong></p>
            <button 
              className="btn btn-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
  </main> 
  )
}
