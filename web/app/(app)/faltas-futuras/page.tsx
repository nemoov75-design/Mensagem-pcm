'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AlertTriangle } from 'lucide-react'

interface FaltaFutura {
  id: string
  codigo: string
  descricao: string
  dataFalta: string
  semanaFalta: number
  estoqueAtual: number
  necessidade: number
  deficit: number
  opAferada: string
  perigoGrau: 'crítico' | 'alto' | 'médio'
}

export default function FaltasFuturasPage() {
  const mockFaltas: FaltaFutura[] = [
    {
      id: '1',
      codigo: 'MAT001',
      descricao: 'Parafuso M8x50',
      dataFalta: '2024-05-20',
      semanaFalta: 2,
      estoqueAtual: 45,
      necessidade: 200,
      deficit: 155,
      opAferada: 'OP-2024-001',
      perigoGrau: 'crítico'
    },
    {
      id: '2',
      codigo: 'MAT005',
      descricao: 'Correia Dentada',
      dataFalta: '2024-05-25',
      semanaFalta: 2,
      estoqueAtual: 75,
      necessidade: 100,
      deficit: 25,
      opAferada: 'OP-2024-002',
      perigoGrau: 'médio'
    },
    {
      id: '3',
      codigo: 'MAT007',
      descricao: 'Mancal Bronze',
      dataFalta: '2024-05-18',
      semanaFalta: 1,
      estoqueAtual: 8,
      necessidade: 30,
      deficit: 22,
      opAferada: 'OP-2024-004',
      perigoGrau: 'crítico'
    },
    {
      id: '4',
      codigo: 'MAT010',
      descricao: 'Corrente 10mm',
      dataFalta: '2024-06-01',
      semanaFalta: 3,
      estoqueAtual: 120,
      necessidade: 200,
      deficit: 80,
      opAferada: 'OP-2024-003',
      perigoGrau: 'alto'
    },
  ]

  const getGrauColor = (grau: string) => {
    switch (grau) {
      case 'crítico':
        return 'destructive'
      case 'alto':
        return 'secondary'
      case 'médio':
        return 'default'
      default:
        return 'outline'
    }
  }

  const getGrauLabel = (grau: string) => {
    switch (grau) {
      case 'crítico':
        return 'Crítico'
      case 'alto':
        return 'Alto'
      case 'médio':
        return 'Médio'
      default:
        return grau
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Faltas Futuras</h1>
        <p className="text-muted-foreground mt-2">Previsão de materiais que faltarão nas próximas semanas</p>
      </div>

      <Alert className="border-red-500/50 bg-red-50 dark:bg-red-950/20">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800 dark:text-red-200">
          {mockFaltas.filter(f => f.perigoGrau === 'crítico').length} materiais com previsão crítica de falta
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Faltas Críticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{mockFaltas.filter(f => f.perigoGrau === 'crítico').length}</div>
            <p className="text-xs text-muted-foreground mt-1">Próximas semanas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Deficit Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockFaltas.reduce((sum, f) => sum + f.deficit, 0)}</div>
            <p className="text-xs text-muted-foreground mt-1">Unidades em falta</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Materiais Afetados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockFaltas.length}</div>
            <p className="text-xs text-muted-foreground mt-1">No total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">OPs em Risco</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(mockFaltas.map(f => f.opAferada)).size}</div>
            <p className="text-xs text-muted-foreground mt-1">Ordens afetadas</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Previsão de Faltas por Semana</CardTitle>
          <CardDescription>Materiais com potencial falta identificados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-right">Estoque</TableHead>
                  <TableHead className="text-right">Necessidade</TableHead>
                  <TableHead className="text-right">Deficit</TableHead>
                  <TableHead>Data Falta</TableHead>
                  <TableHead>Semana</TableHead>
                  <TableHead>OP</TableHead>
                  <TableHead>Grau Perigo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockFaltas.map((falta) => (
                  <TableRow key={falta.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{falta.codigo}</TableCell>
                    <TableCell>{falta.descricao}</TableCell>
                    <TableCell className="text-right">{falta.estoqueAtual}</TableCell>
                    <TableCell className="text-right">{falta.necessidade}</TableCell>
                    <TableCell className="text-right font-medium text-destructive">{falta.deficit}</TableCell>
                    <TableCell className="text-sm">{new Date(falta.dataFalta).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">Semana {falta.semanaFalta}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{falta.opAferada}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getGrauColor(falta.perigoGrau) as any}>
                        {getGrauLabel(falta.perigoGrau)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
