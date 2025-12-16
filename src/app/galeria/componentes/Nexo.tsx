
import { motion } from "framer-motion";
export default function Nexo(){
    return(
        <div>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0"
            />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                        { src: "https://res.cloudinary.com/ddvc5vscj/image/upload/v1756939956/WhatsApp_Image_2025-09-03_at_7.50.56_PM_jwgant.jpg"
                            , title: "Sistema de Gestión para gimnasio - año 2025"
                            , desc: "Gestión de pagos, clientes, rutinas y gastos." },
                        { src: "https://res.cloudinary.com/ddvc5vscj/image/upload/v1756939955/WhatsApp_Image_2025-09-01_at_6.10.33_PM_lja6hu.jpg"
                            , title: "Aplicación móvil para gimnasio - año 2025",
                              desc: "Rutinas personalizadas, visualización de pagos y notificaciones." },
                            
                    ].map((item, i) => (
                        <div key={i} className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg">
                        <img src={item.src} alt={item.title} 
                            className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500" />
                        <h3 className="absolute text-lg font-bold text-black m-3 md:hidden ">{item.title}</h3>
                        <p className=" relative text-sm text-black md:hidden m-3 pt-15">{item.desc}</p>
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <h3 className="text-lg font-bold m-2">{item.title}</h3>
                            <p className="text-sm m-2">{item.desc}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                <motion.div/>

        </div>
    )
}