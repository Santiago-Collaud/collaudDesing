"use client";

interface ShowHeaderProps {
  show: {
    name: string;
    date: string;
    data: {
      banda?: string;
    };
  };
}

export default function ShowHeader({
  show,
}: ShowHeaderProps) {

  return (
    <div className="card bg-base-100 shadow">

      <div className="card-body">

        <h1 className="text-3xl font-bold">
          {show.data.banda}
        </h1>

        <h2 className="text-xl">
          {show.name}
        </h2>

        <p className="opacity-70">
          {show.date}
        </p>

      </div>

    </div>
  );
}