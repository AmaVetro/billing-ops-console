import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-semibold tracking-tight">
        Billing Ops Console
      </h1>
      <p className="text-muted-foreground text-sm">setup</p>
      <Button type="button">Continuar</Button>
    </main>
  );
}