import Image from "next/image";
export default function Lux(){
     return (
    <section className="min-h-screen bg-black text-white px-6 py-12">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center border  rounded-lg shadow-lg p-8"
        style={{ backgroundImage: "url('/img/bg-nexo.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        
        <div className="text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">
            NEXO: Unimos tu mente con el mundo
          </h2>
          <p className="text-lg text-sky-900 mb-4">
            Conectamos tus ideas con el mundo digital. Desde desarrollo web hasta soluciones de software, creamos puentes entre tu visión y la tecnología.
          </p>
        </div>

        <div className="flex justify-center">
          <Image
            src="/icon/Nexo.png"
            alt="Lux Logo"
            width={400}
            height={400}
            className="rounded-xl shadow-2xl"
          />
        </div>
        
      </div>
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-semibold mb-4">Servicios destacados</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h4 className="text-xl font-bold mb-2">Frontend - Backend</h4>
            <p>Mostramos tu producto al mas alto nivel visual y eficiencia</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h4 className="text-xl font-bold mb-2">Sistemas personalizados</h4>
            <p>Ponemos tus ideas en marcha</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h4 className="text-xl font-bold mb-2">Redes fisicas</h4>
            <p>Te conectamos con el mundo</p>
          </div>
        </div>  
      </div>
    </section>
     );
}