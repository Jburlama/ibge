import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Header() {
    return (
        <header className="border-b mb-4">
            <div className="container flex items-center justify-between py-4 px-30">
                <div>
                    <h1 className="text-xl font-bold">
                        IBGE
                    </h1>
                    <h2 className="text-xl font-medium">
                        Instituto Brasileiro de Geografia e Estatística
                    </h2>
                </div>
                <ThemeToggle />
            </div>
        </header>
    );
}
