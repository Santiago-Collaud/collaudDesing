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
        <main style={{ padding: 24, fontFamily: "Inter, sans-serif" }}>
        <NavBar />
        <h1>Administrador </h1>
        <h1>Bienvenido </h1>
        <LogOut />

        <section style={{ marginTop: 20 }}>
            <h2>Lista de clientes y eventos</h2>

            <button
                onClick={() => router.push("/admin/clientes/new")}
                className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                Crear cliente
            </button>

            {loading && <p>Cargando...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            
            {clientes.length === 0 && !loading && <p>No hay clientes.</p>}
            <div className='grid grid-cols-2 gap-4'>
                {clientes.map((cliente) => (
                    <ClienteCard key={cliente.id} cliente={cliente} />
                 ))}
            </div>
            
        </section>
        </main>
    );  
}