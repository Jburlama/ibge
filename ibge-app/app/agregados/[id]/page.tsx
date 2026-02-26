import agregadosData from '@/data/agregacao.json';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface PageProps {
  params: {
    id: string;
  };
}

export default function AgregadoDetailPage({ params }: PageProps) {
  const agregados = agregadosData as any[];
  const agregado = agregados.find(a => a.id === params.id);

  if (!agregado) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <Link href="/agregados" className="text-blue-600 hover:underline mb-4 block">
        ← Voltar para lista de agregações
      </Link>
      
      <h1 className="text-3xl font-bold mb-2">{agregado.nome}</h1>
      <p className="text-muted-foreground mb-6">ID: {agregado.id}</p>
      
      <h2 className="text-2xl font-semibold mb-4">Sub-agregados disponíveis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agregado.agregados.map((sub: any) => (
          <Link
            key={sub.id}
            href={`/agregados/${agregado.id}/${sub.id}`}
            className="block"
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-base">{sub.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{sub.nome}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
