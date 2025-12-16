import React from 'react';
import BtnTelegram from '../btnTlg/btnTelegram';
import BtnWsp from '../btnWsp/btnWsp';
import BtnMail from '../btnMail/btnMail';

const Footer: React.FC = () => {
    return (
        <footer className="footer sm:footer-horizontal text-base-content flex justify-between bg-gray-800 text-white p-4">
            <nav className='mt-4 ml-10'>
                <p>&copy; {new Date().getFullYear()} santiagocollaud.com.ar Todos los derechos reservados.</p>
                <p>consultas@santiagocollaud.com.ar</p>
            </nav>
            <nav className='mr-4'>
                <h6 className="footer-title">Contacto</h6>
                <div className="grid grid-flow-col gap-4">
                <a><BtnWsp/></a>
                <a><BtnTelegram/></a>
                <a><BtnMail/></a>
                </div>
                
            </nav>
        </footer>
    );
};

export default Footer;