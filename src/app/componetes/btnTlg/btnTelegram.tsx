"use client";
import Image from 'next/image';

const BtnTelegram = () => {

  const handleTelegram = () => {
    // Opción 1: por username
    //const username = "TuUsuarioTelegram";
    //const url = `https://t.me/${username}`;

    // Opción 2: por número (solo si está vinculado)
     const phoneNumber = "5493435133060";
     const url = `https://t.me/+${phoneNumber}`;

    window.open(url, "_blank");
  }

  return (
    <div>
      <button onClick={handleTelegram}>
        <Image 
          src="/icon/telegram_icon.png" 
          alt="Telegram icon" 
          width={35} 
          height={35} 
          className=" rounded-full p-2 shadow-lg hover:scale-110 transition-transform duration-300"
          priority 
        />
      </button>
    </div>
  );
};

export default BtnTelegram;
