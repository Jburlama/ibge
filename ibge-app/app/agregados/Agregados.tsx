import agregadosData from '@/data/agregacao.json';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import Link from 'next/link';
import Header from "../Header/Header";

interface Agregado {
    id: string;
    nome: string;
    agregados: Array<{
        id: string;
        nome: string;
    }>;
}

export default function Agregados() {
  const agregados = agregadosData as Agregado[];

  return (
    <div className="container mx-auto py-8  justify-center">
        <Header />

        <div className="flex flex-wrap gap-4 justify-center">
            {agregados.map((agregado) => (
                <Link
                    key={agregado.id}
                    href={`/agregados/${agregado.id}`}
                >
                    <Card className="hover:shadow-lg transition-shadow h-full block w-64">
                        <CardHeader>
                            <CardTitle className="text-lg">{agregado.id}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                {agregado.nome}
                            </p>
                            <p className="text-sm">
                                agregados: <span className="font-medium">{agregado.agregados.length}</span>
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    </div>
  );
}
