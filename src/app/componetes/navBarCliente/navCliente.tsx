"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import LogOut from "../logout/logout";

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
                        <LogOut />
                </div>
            </div>
        </div>
    </div>
    );
}