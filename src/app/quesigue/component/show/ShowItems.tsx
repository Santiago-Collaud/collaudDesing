"use client";

interface SetListItem {
  tipo: string;
  color: string;
  nombre: string;
  tono?: string;
  tempo?: number;
  nota?: string;
}

interface ShowItemsProps {
  items: SetListItem[];
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onDelete: (index: number) => void;
}

export default function ShowItems({
  items,
  onMoveUp,
  onMoveDown,
  onDelete,
}: ShowItemsProps) {
  return (
    <div className="card bg-base-100 shadow">

      <div className="card-body">

        <h2 className="card-title">
          Canciones
        </h2>

        {items.length === 0 ? (

          <p className="opacity-60">
            Todavía no hay canciones cargadas.
          </p>

        ) : (

          <ul className="space-y-2">

            {items.map((item, index) => (

              <li
                key={index}
                className="border rounded-lg p-3 flex justify-between items-center"
              >

                <div>

                  <p className="font-bold">
                    {item.nombre}
                  </p>

                  <p className="text-sm opacity-60">
                    {item.tono}
                  </p>

                </div>
                <div>
                  <button
                    className="btn btn-xs"
                    onClick={() => onMoveUp(index)}
                  >
                    ↑
                  </button>

                  <button
                    className="btn btn-xs"
                    onClick={() => onMoveDown(index)}
                  >
                    ↓
                  </button>

                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => onDelete(index)}
                  >
                    ✕
                  </button>
                </div>
                  
              </li>

            ))}

          </ul>

        )}

      </div>

    </div>
  );
}