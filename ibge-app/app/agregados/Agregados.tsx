import agregadosData from '@/data/agregacao.json';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import Link from 'next/link';

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
    <div className="container mx-auto py-8">
        <header>
            <h1 className="text-3xl font-bold mb-6">
                Instituto Brasileiro de Geografia e Estatística (IBGE)
            </h1>
        </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {agregados.map((agregado) => (
          <Link
            key={agregado.id}
            href={`/agregados/${agregado.id}`}
            className="block"
          >
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <CardTitle className="text-lg">{agregado.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {agregado.nome}
                </p>
                <p className="text-sm">
                  Sub-agregados: <span className="font-medium">{agregado.agregados.length}</span>
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
