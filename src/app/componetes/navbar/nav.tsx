"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

export default function NavBar(){
    const router = useRouter();
    return (
        <div>
                <div>
                    <div className="navbar bg-white shadow-sm">
                        <div className="navbar-start">
                            <button onClick={() => router.push("/home")} >
                                <Image
                                    src="/icon/CollaudDesing_Letras.png"
                                    alt="Logo"
                                    width={300}
                                    height={200}
                                    className="rounded-xl p-2"
                                />
                            </button>
                        </div>  
                    <div className="navbar-end mr-10">
                        <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle bg-gradient-to-r from-blue-300 to-sky-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-gray-900 rounded-box  shadow">
                            <li><a><button onClick={() => router.push("/home")}>Home</button></a></li>
                            <li><a><button onClick={() => router.push("/contacto")}>Contacto</button></a></li>
                            <li><a><button onClick={() => router.push("/galeria")}>Galeria</button></a></li>
                            <li><a><button onClick={() => router.push("/download")}>Descargas</button></a></li>
                            {/*<li><a><label htmlFor="my_modal_6">Sobre Mi</label></a></li>*/}
    
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}