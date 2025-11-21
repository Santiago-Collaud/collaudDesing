import React from 'react';

export default function Page() {
    return (
        <main style={{ padding: 24, fontFamily: 'Inter, sans-serif' }}>
            <h1>Clientes</h1>
            <p>Componente básico de React (TypeScript)</p>

            <section>
                <h2>Lista de ejemplo</h2>
                <ul>
                    <li>Cliente 1</li>
                    <li>Cliente 2</li>
                    <li>Cliente 3</li>
                </ul>
            </section>
        </main>
    );
}