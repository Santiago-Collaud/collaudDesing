"use client";
import Image from 'next/image';

const BtnMail = () => {

    const handleMail = () => {
        const email = "consultas@santiagocollaud.com.ar";
        const subject = encodeURIComponent("Consulta desde la web");
        const body = encodeURIComponent("Hola, quisiera realizar una consulta...");
        
        const url = `mailto:${email}?subject=${subject}&body=${body}`;
        window.location.href = url;
    }

    return (
        <div>
            <button onClick={handleMail}>
                <Image 
                    src="/icon/mail_icon.png" 
                    alt="Email icon" 
                    width={35} 
                    height={35} 
                    className="rounded-full p-2 shadow-lg hover:scale-110 transition-transform duration-300"
                    priority
                />
            </button>
        </div>
    );
};

export default BtnMail;
