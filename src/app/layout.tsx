import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


//Definimos las fuentes de la página:
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

//Definimos la fuente monospace:
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



//Definimos y exportamos los metadatos de la página:
export const metadata: Metadata = {
  title: "Billing Ops Console",
  description: "Panel operativo de cobros y suscripciones (Stripe Test Mode)",
};


//Esta función usa las fuentes definidas arriba
//Esta función, es el marco HTML de toda la app
//Lo que se ponga en esta función (idiomas, fuentes, CSS), 
//se aplicará a todas las rutas hijas.
export default function RootLayout({ 
  children, //Cuando "children" está en props, es como si se dijera "props", sirve para desestructurar los props que vengan, poder recibir cualquiera.
}: Readonly<{ //Readonly es tipado estático TS: Las props entrantes son de sólo lectura, no se pueden mutar
  children: React.ReactNode;  //React.ReactNode es el tipo de dato que se usa para los nodos de React.
}>) { //(No hay retorno especificado antes del contenido de la función, se asume)
  return ( 
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
