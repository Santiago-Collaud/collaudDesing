"use client";
import { useRouter } from "next/navigation";

export default function BtnContact() {
const router = useRouter();

     const handleClick = () => {
            router.push("/contacto");
     }

    return (
       <div>
            <button 
               className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
               onClick={handleClick}>
               
                 Contáctanos
            </button>
       </div>         
    )
}