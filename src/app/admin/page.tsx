"use client";
import React from 'react';
import { useClientes } from "../admin/components/hook/useClientes";
import { useRouter } from "next/navigation";

import LogOut from '../componetes/logout/logout';
import ClienteCard from "../admin/components/cliente_card";
import NavBar from '../componetes/navbar/nav';

export default function Page() {
    const { clientes, loading, error } = useClientes();
     const router = useRouter();

    return (
        <main >
            <NavBar />
            <div className='text-xl font-bold m-4 border-b-2 pb-2 flex justify-between items-center'>
                <h1>Bienvenido Administrador</h1>
            </div>
            <LogOut />
       
        <section >
            <h2 className='text-xl mt-4 mb-4 ml-2 border-b-2'>Lista de clientes y eventos</h2>
            <button
                onClick={() => router.push("/admin/clientes/new")}
                className="bg-blue-600 text-white px-4 py-2 rounded mb-2"
                >
                Crear cliente
            </button>
        <div className='m-4'>
            {loading && <span className="loading loading-dots loading-xl"></span>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            
            {clientes.length === 0 && !loading && <p>No hay clientes.</p>}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {clientes.map((cliente) => (
                    <ClienteCard key={cliente.id} cliente={cliente} />
                 ))}
            </div>
        </div>
           
        </section>
        </main>
    );  
}