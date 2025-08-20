"use client";
import Image from 'next/image';


const BtnWsp = () => {

    const handleWSP = () => {
        //const message = encodeURIComponent("Hola, quería consultar sobre los horarios");
        const phoneNumber = "5493435133060"; // Número de WhatsApp
        const url = `https://wa.me/${phoneNumber}`;
        
        window.open(url, "_blank");
    }
    
  return (
    <div>
        <button onClick={handleWSP}>
            <Image 
                src="/icon/whatsapp_icon.png" 
                alt="Whatsapp icon" 
                width={35} 
                height={35} 
                className="rouded-full p-2 shadow-lg hover:scale-110 transition-transform duration-300" 
                priority 
                />
                {/*bg-sky-500 rounded-full p-2 shadow-lg hover:scale-110 transition-transform duration-300 */}
        </button>
    </div>
  );
};

export default BtnWsp;