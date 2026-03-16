
export default function Turnit() {
    return (
        <div>
            <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-xs ">
                <img alt="" src="/icon/turnit-icon-512.png" 
                className="h-56 w-full object-cover" />

                <div className="p-4 sm:p-6">
                    
                    <h3 className="text-lg font-medium text-gray-900">
                            Que los turnos no te detengan,
                    <strong className="text-indigo-600">Mejora</strong> tu eficiencia con Turnit
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                        Turnit es la solución definitiva para gestionar tus turnos de manera eficiente y sin complicaciones. <br />
                        Con nuestra plataforma intuitiva, podrás organizar tus citas, 
                    </p>

                    <a 
                    href="https://www.canva.com/design/DAHBO9ZN-K4/Y5gJeDhH6nWNxnQmzBb_Ww/view?utlId=h704e0ab85c" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 shadow-sm"
                    >
                    Saber mas
                    </a>

                    <a 
                    href="https://turnitapp.vercel.app/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 ml-4"
                    >
                    Probar
                    </a>
                    
                </div>
            </article>
        </div>
    );
}