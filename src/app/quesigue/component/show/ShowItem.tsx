"use client";

interface Props {
  nombre: string;
  tono: string;
  tempo: number;
}

export default function ShowItem({
  nombre,
  tono,
  tempo,
}: Props) {

  return (
    <div className="border rounded-lg p-4 flex justify-between items-center">

      <div>

        <h3 className="font-semibold">
          {nombre}
        </h3>

        <p className="text-sm opacity-60">
          Tono: {tono}
        </p>

      </div>

      <div className="badge badge-primary">

        {tempo}

      </div>

    </div>
  );
}