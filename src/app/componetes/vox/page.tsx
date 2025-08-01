import Image from "next/image";
export default function Lux(){
     return (
    <section className="min-h-screen bg-black text-white px-6 py-12">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center border  rounded-lg shadow-lg p-8"
        style={{ backgroundImage: "url('/img/bg-vox.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        
        <div className="text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white ">
            Vox: La voz de tus ideas
          </h2>
          <p className="text-lg text-grey-900 mb-4">
            Damos voz a tus ideas. creamos experiencias digitales que resuenan con tu audiencia.
          </p>
        </div>

        <div className="flex justify-center">
          <Image
            src="/icon/Vox.png"
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
            <h4 className="text-xl font-bold mb-2">Produccion musical</h4>
            <p>Ponemos tu creatividad en una cancion</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h4 className="text-xl font-bold mb-2">Spots personalizados</h4>
            <p>Tenemos las mejores voces para que tu marca se destaque</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h4 className="text-xl font-bold mb-2">Asesoramiento en audio</h4>
            <p>Te hacemos sonar mejor, eficienciente y con llegada</p>
          </div>
        </div>  
      </div>
    </section>
     );
}