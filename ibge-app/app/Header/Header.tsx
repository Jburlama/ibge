import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Header() {
    return (
        <header className="border-b mb-4">
            <div className="container flex items-center justify-between py-4 px-30">
                <h1 classname="text-xl font-bold">
                    Instituto Brasileiro de Geografia e Estatística (IBGE)
                </h1>
                <ThemeToggle />
            </div>
        </header>
    );
}
