import Image from "next/image";
export default function Lux(){
     return (
    <section className="min-h-screen bg-black text-white px-6 py-12">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center border  rounded-lg shadow-lg p-8"
        style={{ backgroundImage: "url('/img/bg-lux.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        
        <div className="text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white ">
            LUX: La luz de tus ideas
          </h2>
          <p className="text-lg text-gray-900 mb-4">
            Capturamos la luz que da vida a tus ideas. Desde fotografías hasta producciones audiovisuales, creamos imágenes que comunican y emocionan.
          </p>
        </div>

        <div className="flex justify-center">
          <Image
            src="/icon/Lux.png"
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
            <h4 className="text-xl font-bold mb-2">Fotografía Profesional</h4>
            <p>Capturamos momentos únicos con calidad excepcional.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h4 className="text-xl font-bold mb-2">Producción Audiovisual</h4>
            <p>Creamos videos que cuentan historias y conectan con tu audiencia.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h4 className="text-xl font-bold mb-2">Edición y Postproducción</h4>
            <p>Transformamos tus imágenes en obras maestras visuales.</p>
          </div>
        </div>  
      </div>
    </section>
     );
}