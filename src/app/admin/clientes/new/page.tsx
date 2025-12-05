"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateCliente } from "../new/hook/useNewCliente"
import { generateGiftCard } from "../new/generateGiftCard";

export default function ClienteNewPage() {
  const router = useRouter();
  const { createCliente, loading, error, success } = useCreateCliente();

  const [form, setForm] = useState({
    username: "",
    pass: "",
    active: true,
    nombre: "",
    apellido: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await createCliente(form);

    if (ok) {
      // 1- Generar gift card
    const img = await generateGiftCard({
      username: form.username,
      pass: form.pass,
    });

    // 2- Descargar automáticamente
    const link = document.createElement("a");
    link.download = `giftcard-${form.username}.jpg`;
    link.href = img;
    link.click();
      setTimeout(() => {
        router.push("/admin");
      }, 1000);
    }
  };

  return (
    <main className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crear cliente</h1>

      <form onSubmit={handleSubmit} className="border p-4 rounded-lg space-y-4">
        <div>
          <label className="block font-medium">Username *</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Contraseña *</label>
          <input
            name="pass"
            type="text"
            value={form.pass}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Nombre</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Apellido</label>
          <input
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="active"
            name="active"
            type="checkbox"
            checked={form.active}
            onChange={handleChange}
          />
          <label htmlFor="active">Activo</label>
        </div>

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">Cliente creado ✓</p>}

    <button
      type="button"
      onClick={async () => {
        const { username, pass, } = form;

        if (!username || !pass) {
          alert("Necesitas usuario y contraseña para generar la tarjeta");
          return;
        }

        const dataUrl = await generateGiftCard({ username, pass});

        // Descargar
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `giftcard-${username}.png`;
        link.click();
      }}
      className="bg-purple-600 text-white w-full p-2 rounded"
    >
      Generar Gift Card
    </button>

        <button
          disabled={loading}
          className="bg-blue-600 text-white w-full p-2 rounded"
        >
          {loading ? "Guardando..." : "Crear cliente"}
        </button>
      </form>
    </main>
  );
}
