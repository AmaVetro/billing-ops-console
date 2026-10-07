//Importamos el botón desde el archivo button.tsx de la carpeta components/ui
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";


export default function Home() { 
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-semibold tracking-tight">
        Billing Ops Console
      </h1> 
      <p className="text-muted-foreground text-sm">setup</p>
      <Button type="button">Continuar</Button> 
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <Button type="submit">Cerrar sesión</Button>
      </form>
      
    </main>
  );
}