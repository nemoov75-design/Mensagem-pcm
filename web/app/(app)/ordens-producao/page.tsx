'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'

interface OrdemProducao {
  id: string
  numeroOP: string
  produto: string
  cliente: string
  quantidade: number
  dataInicio: string
  dataFim: string
  status: 'planejada' | 'em_producao' | 'concluida' | 'cancelada'
  progressoMateriais: number
}

export default function OrdensProducaoPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('todos')

  const mockOPs: OrdemProducao[] = [
    { id: '1', numeroOP: 'OP-2024-001', produto: 'Montagem Motor 5HP', cliente: 'Empresa A', quantidade: 10, dataInicio: '2024-05-01', dataFim: '2024-05-20', status: 'em_producao', progressoMateriais: 85 },
    { id: '2', numeroOP: 'OP-2024-002', produto: 'Caixa de Engrenagem', cliente: 'Empresa B', quantidade: 5, dataInicio: '2024-05-05', dataFim: '2024-05-25', status: 'planejada', progressoMateriais: 45 },
    { id: '3', numeroOP: 'OP-2024-003', produto: 'Eixo Principal', cliente: 'Empresa A', quantidade: 15, dataInicio: '2024-04-15', dataFim: '2024-05-05', status: 'concluida', progressoMateriais: 100 },
    { id: '4', numeroOP: 'OP-2024-004', produto: 'Acoplamento Elástico', cliente: 'Empresa C', quantidade: 20, dataInicio: '2024-05-10', dataFim: '2024-05-30', status: 'em_producao', progressoMateriais: 60 },
  ]

  const filtered = mockOPs.filter(op => {
    const matchesSearch = op.numeroOP.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.cliente.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'todos' || op.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planejada':
        return 'secondary'
      case 'em_producao':
        return 'default'
      case 'concluida':
        return 'default'
      case 'cancelada':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'planejada':
        return 'Planejada'
      case 'em_producao':
        return 'Em Produção'
      case 'concluida':
        return 'Concluída'
      case 'cancelada':
        return 'Cancelada'
      default:
        return status
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Consulta de Ordens de Produção</h1>
        <p className="text-muted-foreground mt-2">Acompanhe o status e progresso das OPs</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros de Pesquisa</CardTitle>
          <CardDescription>Pesquise OPs por número, produto ou cliente</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="text-sm font-medium">OP, Produto ou Cliente</label>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Digite número OP, produto ou cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" size="icon">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="w-full md:w-48">
            <label className="text-sm font-medium">Status</label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="planejada">Planejada</SelectItem>
                <SelectItem value="em_producao">Em Produção</SelectItem>
                <SelectItem value="concluida">Concluída</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ordens de Produção ({filtered.length})</CardTitle>
          <CardDescription>Total: {filtered.length} OPs encontradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>OP</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="text-right">Qtd</TableHead>
                  <TableHead>Data Início</TableHead>
                  <TableHead>Data Fim</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Progresso Materiais</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((op) => (
                  <TableRow key={op.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{op.numeroOP}</TableCell>
                    <TableCell>{op.produto}</TableCell>
                    <TableCell>{op.cliente}</TableCell>
                    <TableCell className="text-right">{op.quantidade}</TableCell>
                    <TableCell className="text-sm">{new Date(op.dataInicio).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell className="text-sm">{new Date(op.dataFim).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(op.status) as any}>
                        {getStatusLabel(op.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-sm font-medium">{op.progressoMateriais}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhuma ordem de produção encontrada</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
