import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { PanelNav } from "@/components/panel-nav";

export default function PanelLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <div className="flex min-h-screen">
            <aside className="flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-4">
                <p className="mb-4 px-3 text-sm font-semibold text-sidebar-foreground">
                Billing Ops Console
                </p>
                <PanelNav />
                <form
                    className="mt-auto px-3 pt-4"
                    action={async () => {
                        "use server";
                        await signOut({ redirectTo: "/login" });
                    }}
                    >
                    <Button type="submit" variant="outline" className="w-full">
                        Cerrar sesión
                    </Button>
                </form>
            </aside>
            <div className="flex-1 p-6">{children}</div>
        </div>
    );
}

/* 
Explicación de cómo funciona el form que esta ahí arriba,
que hace que al usar al button Cerrar sesión, se ejecute 
la action que está arriba suyo:

"Dentro de un <form>, un botón type="submit" envía ese formulario, y React ejecuta la función 
que pusiste en action.
Es HTML estándar más una capa de React 19 y Next.js:
Al hacer clic en Cerrar sesión, el navegador envía el <form> que lo contiene, 
porque el botón es type="submit".
En React 19, action puede recibir una función en vez de una URL. Al enviarse el formulario, 
React llama esa función.
"use server" convierte esa función en una server action de Next.js. Corre en el servidor, 
no en el navegador. Ahí puede llamar a signOut, que necesita leer y escribir cookies.
El vínculo lo da que el botón esté dentro de ese <form>. Si el botón fuera type="button", 
no enviaría el formulario y signOut no se ejecutaría. 
El formulario del login funciona igual: su action llama a signIn con el correo y la contraseña."
*/