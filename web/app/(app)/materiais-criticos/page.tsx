'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AlertTriangle, TrendingDown } from 'lucide-react'

interface MateriaisCriticos {
  id: string
  codigo: string
  descricao: string
  estoque: number
  pontoReposicao: number
  estoqueMinimo: number
  diasParaZerar: number
  opAferadas: string[]
  prioridade: 'crítica' | 'alta' | 'média'
}

export default function MateriaisCriticosPage() {
  const mockCriticos: MateriaisCriticos[] = [
    {
      id: '1',
      codigo: 'MAT001',
      descricao: 'Parafuso M8x50',
      estoque: 45,
      pontoReposicao: 100,
      estoqueMinimo: 50,
      diasParaZerar: 3,
      opAferadas: ['OP-2024-001', 'OP-2024-004'],
      prioridade: 'crítica'
    },
    {
      id: '2',
      codigo: 'MAT005',
      descricao: 'Correia Dentada',
      estoque: 75,
      pontoReposicao: 100,
      estoqueMinimo: 60,
      diasParaZerar: 5,
      opAferadas: ['OP-2024-002'],
      prioridade: 'alta'
    },
    {
      id: '3',
      codigo: 'MAT007',
      descricao: 'Mancal Bronze',
      estoque: 8,
      pontoReposicao: 20,
      estoqueMinimo: 10,
      diasParaZerar: 2,
      opAferadas: ['OP-2024-001', 'OP-2024-003'],
      prioridade: 'crítica'
    },
    {
      id: '4',
      codigo: 'MAT009',
      descricao: 'Óleo de Máquina 5L',
      estoque: 120,
      pontoReposicao: 150,
      estoqueMinimo: 100,
      diasParaZerar: 7,
      opAferadas: ['OP-2024-004'],
      prioridade: 'média'
    },
  ]

  const getPriorityColor = (prioridade: string) => {
    switch (prioridade) {
      case 'crítica':
        return 'destructive'
      case 'alta':
        return 'secondary'
      case 'média':
        return 'default'
      default:
        return 'outline'
    }
  }

  const getPriorityLabel = (prioridade: string) => {
    switch (prioridade) {
      case 'crítica':
        return 'Crítica'
      case 'alta':
        return 'Alta'
      case 'média':
        return 'Média'
      default:
        return prioridade
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Materiais Críticos</h1>
        <p className="text-muted-foreground mt-2">Acompanhe materiais com risco de falta</p>
      </div>

      <Alert className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800 dark:text-amber-200">
          {mockCriticos.filter(m => m.prioridade === 'crítica').length} materiais em condição crítica requerem ação imediata
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Materiais Críticos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCriticos.filter(m => m.prioridade === 'crítica').length}</div>
            <p className="text-xs text-muted-foreground mt-1">Risco imediato de falta</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Dias Médios para Zetar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(mockCriticos.reduce((sum, m) => sum + m.diasParaZerar, 0) / mockCriticos.length)}</div>
            <p className="text-xs text-muted-foreground mt-1">Baseado em consumo atual</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">OPs Afetadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(mockCriticos.flatMap(m => m.opAferadas)).size}</div>
            <p className="text-xs text-muted-foreground mt-1">Ordens em risco</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Materiais Críticos</CardTitle>
          <CardDescription>Materiais que necessitam reposição urgente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-right">Estoque Atual</TableHead>
                  <TableHead className="text-right">Ponto Reposição</TableHead>
                  <TableHead className="text-right">Dias para Zetar</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>OPs Afetadas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCriticos.map((material) => (
                  <TableRow key={material.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{material.codigo}</TableCell>
                    <TableCell>{material.descricao}</TableCell>
                    <TableCell className="text-right font-medium text-destructive">{material.estoque}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{material.pontoReposicao}</TableCell>
                    <TableCell className="text-right">
                      <span className={material.diasParaZerar <= 3 ? 'text-destructive font-medium' : ''}>
                        {material.diasParaZerar}d
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPriorityColor(material.prioridade) as any}>
                        {getPriorityLabel(material.prioridade)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div className="flex gap-1 flex-wrap">
                        {material.opAferadas.map((op) => (
                          <Badge key={op} variant="outline" className="text-xs">
                            {op}
                          </Badge>
                        ))}
                      </div>
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
