import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 text-center border-t border-gray-700 rounded-t-lg">
            <p>&copy; {new Date().getFullYear()} santiagocollaud.com.ar Todos los derechos reservados.</p>
        </footer>
    );
};

export default Footer;