import Link from "next/link";

const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/events", label: "Eventos" },
    { href: "/cases", label: "Casos" },
    { href: "/subscriptions", label: "Suscripciones" },
    { href: "/settings/dunning", label: "Reglas de dunning" },
    { href: "/audit", label: "Auditoría" },
    ] as const;

    export function PanelNav() {
    return (
        <nav aria-label="Principal">
        <ul className="flex flex-col gap-1">
            {links.map((link) => (
            <li key={link.href}>
                <Link
                href={link.href}
                className="block rounded-md px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                {link.label}
                </Link>
            </li>
            ))}
        </ul>
        </nav>
    );
}