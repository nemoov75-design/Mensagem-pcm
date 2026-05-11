'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'

interface PedidoCompra {
  id: string
  numeroPedido: string
  material: string
  quantidade: number
  fornecedor: string
  dataEmissao: string
  dataPrevista: string
  status: 'aberto' | 'confirmado' | 'enviado' | 'recebido' | 'cancelado'
  valorUnitario: number
  valorTotal: number
}

export default function PedidosCompraPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('todos')

  const mockPedidos: PedidoCompra[] = [
    {
      id: '1',
      numeroPedido: 'PC-2024-0001',
      material: 'Parafuso M8x50',
      quantidade: 500,
      fornecedor: 'Parafusos Brasil',
      dataEmissao: '2024-05-10',
      dataPrevista: '2024-05-20',
      status: 'confirmado',
      valorUnitario: 0.15,
      valorTotal: 75.00
    },
    {
      id: '2',
      numeroPedido: 'PC-2024-0002',
      material: 'Correia Dentada',
      quantidade: 50,
      fornecedor: 'Transmissões HDL',
      dataEmissao: '2024-05-08',
      dataPrevista: '2024-05-18',
      status: 'enviado',
      valorUnitario: 45.00,
      valorTotal: 2250.00
    },
    {
      id: '3',
      numeroPedido: 'PC-2024-0003',
      material: 'Mancal Bronze',
      quantidade: 100,
      fornecedor: 'Metalúrgica Nobre',
      dataEmissao: '2024-05-11',
      dataPrevista: '2024-05-25',
      status: 'aberto',
      valorUnitario: 25.00,
      valorTotal: 2500.00
    },
    {
      id: '4',
      numeroPedido: 'PC-2024-0004',
      material: 'Corrente 10mm',
      quantidade: 200,
      fornecedor: 'Correntes Industriais',
      dataEmissao: '2024-05-01',
      dataPrevista: '2024-05-15',
      status: 'recebido',
      valorUnitario: 18.50,
      valorTotal: 3700.00
    },
  ]

  const filtered = mockPedidos.filter(p => {
    const matchesSearch = p.numeroPedido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.fornecedor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'todos' || p.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aberto':
        return 'secondary'
      case 'confirmado':
        return 'default'
      case 'enviado':
        return 'default'
      case 'recebido':
        return 'default'
      case 'cancelado':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'aberto':
        return 'Aberto'
      case 'confirmado':
        return 'Confirmado'
      case 'enviado':
        return 'Enviado'
      case 'recebido':
        return 'Recebido'
      case 'cancelado':
        return 'Cancelado'
      default:
        return status
    }
  }

  const valorTotalPendente = filtered
    .filter(p => p.status !== 'recebido' && p.status !== 'cancelado')
    .reduce((sum, p) => sum + p.valorTotal, 0)

  const valorTotalRecebido = filtered
    .filter(p => p.status === 'recebido')
    .reduce((sum, p) => sum + p.valorTotal, 0)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pedidos de Compra</h1>
        <p className="text-muted-foreground mt-2">Acompanhe pedidos de compra de materiais</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pedidos em Aberto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filtered.filter(p => p.status === 'aberto' || p.status === 'confirmado').length}</div>
            <p className="text-xs text-muted-foreground mt-1">Aguardando confirmação/envio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Valor Pendente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {valorTotalPendente.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Não recebido</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Valor Recebido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {valorTotalRecebido.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Já entregue</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros de Pesquisa</CardTitle>
          <CardDescription>Busque pedidos por número, material ou fornecedor</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="text-sm font-medium">Pedido, Material ou Fornecedor</label>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Digite número, material ou fornecedor..."
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
                <SelectItem value="aberto">Aberto</SelectItem>
                <SelectItem value="confirmado">Confirmado</SelectItem>
                <SelectItem value="enviado">Enviado</SelectItem>
                <SelectItem value="recebido">Recebido</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pedidos de Compra ({filtered.length})</CardTitle>
          <CardDescription>Total: {filtered.length} pedidos encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pedido</TableHead>
                  <TableHead>Material</TableHead>
                  <TableHead className="text-right">Qtd</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Data Emissão</TableHead>
                  <TableHead>Data Prevista</TableHead>
                  <TableHead className="text-right">Valor Unitário</TableHead>
                  <TableHead className="text-right">Valor Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((pedido) => (
                  <TableRow key={pedido.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{pedido.numeroPedido}</TableCell>
                    <TableCell>{pedido.material}</TableCell>
                    <TableCell className="text-right">{pedido.quantidade}</TableCell>
                    <TableCell>{pedido.fornecedor}</TableCell>
                    <TableCell className="text-sm">{new Date(pedido.dataEmissao).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell className="text-sm">{new Date(pedido.dataPrevista).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell className="text-right">R$ {pedido.valorUnitario.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-medium">R$ {pedido.valorTotal.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(pedido.status) as any}>
                        {getStatusLabel(pedido.status)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum pedido encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
