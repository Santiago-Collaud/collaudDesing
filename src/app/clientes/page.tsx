"use client";
import React from 'react';
import { useEventosCliente } from "./hook/useEventosCliente";
import EventoCard from '../clientes/componente/evento_card2';
import NavBar from '../componetes/navBarCliente/navCliente';

export default function Page() {
    const { eventos, loading, error } = useEventosCliente();
    return (
        <main>
            <NavBar />
            <h1>Bienvenidos</h1>
            
            <section>
                <div className='m-4'>
                            {loading && <span className="loading loading-dots loading-xl"></span>}
                            {error && <p style={{ color: "red" }}>{error}</p>}
                            
                            {eventos.length === 0 && !loading && <p>No hay clientes.</p>}
                            <div className='grid grid-cols-2 gap-4'>
                                {eventos.map((evento) => (
                                    <EventoCard key={evento.id} evento={evento} />
                                 ))}
                            </div>
                        </div>
            </section>
        </main>
    );
}