"use client";
import React from 'react';
import LogOut from '../componetes/logout/logout';
import { useClientes } from "../admin/components/hook/useClientes";
import ClienteCard from "../admin/components/cliente_card";

export default function Page() {
    const { clientes, loading, error } = useClientes();
    return (
        <main style={{ padding: 24, fontFamily: "Inter, sans-serif" }}>
        <h1>Administrador</h1>
        <LogOut />

        <section style={{ marginTop: 20 }}>
            <h2>Clientes</h2>

            {loading && <p>Cargando...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {clientes.length === 0 && !loading && <p>No hay clientes.</p>}

            {clientes.map((cliente) => (
            <ClienteCard key={cliente.id} cliente={cliente} />
            ))}
        </section>
        </main>
    );  
}