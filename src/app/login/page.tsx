import { signIn } from "@/auth";

export default function LoginPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
        <h1 className="text-2xl font-semibold tracking-tight">Iniciar sesión</h1>
        <form
            className="flex w-full max-w-sm flex-col gap-4"
            action={async (formData) => {
                "use server";
                await signIn("credentials", {
                    email: formData.get("email"),
                    password: formData.get("password"),
                    redirectTo: "/",
                });
            }}
        >
            <label className="flex flex-col gap-1 text-sm">
            Correo
            <input
                name="email"
                type="email"
                required
                className="rounded-md border px-3 py-2"
            />
            </label>
            <label className="flex flex-col gap-1 text-sm">
            Contraseña
            <input
                name="password"
                type="password"
                required
                className="rounded-md border px-3 py-2"
            />
            </label>
            <button
            type="submit"
            className="rounded-md bg-black px-3 py-2 text-white"
            >
            Entrar
            </button>
        </form>
        </main>
    );
}