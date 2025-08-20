//envia un mail a mi casilla personal con el contenido del formulario de contacto
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    // Extraemos el objeto user y los detalles del pago del cuerpo de la solicitud
    const { nombre , email, mensaje} = await req.json();

    if (!email || !nombre || !mensaje) {
      return new Response(
        JSON.stringify({ error: 'Faltan datos obligatorios para enviar el correo' }),
        { status: 400 }
      );
    }
    console.log("mail: ",process.env.EMAIL_USER,"pass: ",process.env.EMAIL_PASS)

    console.log('Nombre:',nombre,'mail:',email, 'mensaje:',mensaje)
    
    // Configuración del transport de nodemailer 
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
      user: process.env.EMAIL_USER, // Tu correo de Gmail desde .env
      pass: process.env.EMAIL_PASS, // Contraseña o App Password desde .env
      },
      tls: {
      rejectUnauthorized: false, // Solo para desarrollo (deshabilitar en producción)
      },
    });

    //console.log(process.env.EMAIL_USER," ",process.env.EMAIL_PASS)
    // Opciones del correo
    const mailOptions = {
      from: process.env.EMAIL_USER, // Correo del usuario
      to: 'santicoll_00@yahoo.com.ar', // Correo del usuario
      subject: 'Mensajes en pagina',
      html: `
        <h2>Nombre: ${nombre}</h2>
        <h5>Nombre: ${email}</h2>
        <p>contenido: ${mensaje}</p>
      `,
    };

    // Enviar el correo
    await transport.sendMail(mailOptions);

    // Respuesta exitosa
    return new Response(
      JSON.stringify({ message: 'Correo enviado exitosamente' }),
      { status: 200 }
    );
  } catch (err) {
    console.error('Error al enviar el correo', err);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor al enviar el correo' }),
      { status: 500 }
    );
  }
}