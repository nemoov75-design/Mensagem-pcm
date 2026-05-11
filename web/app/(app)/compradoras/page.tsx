'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Search } from 'lucide-react'

interface Compradora {
  id: string
  nome: string
  email: string
  telefone: string
  departamento: string
  pedidosAbertos: number
  valorPendente: number
  ultimaAtividade: string
  status: 'ativo' | 'inativo'
}

export default function CompradorasPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const mockCompradoras: Compradora[] = [
    {
      id: '1',
      nome: 'Maria Silva',
      email: 'maria.silva@empresa.com',
      telefone: '(11) 98765-4321',
      departamento: 'Compras',
      pedidosAbertos: 5,
      valorPendente: 3500.00,
      ultimaAtividade: '2024-05-11',
      status: 'ativo'
    },
    {
      id: '2',
      nome: 'João Santos',
      email: 'joao.santos@empresa.com',
      telefone: '(11) 99876-5432',
      departamento: 'Compras',
      pedidosAbertos: 2,
      valorPendente: 1250.00,
      ultimaAtividade: '2024-05-10',
      status: 'ativo'
    },
    {
      id: '3',
      nome: 'Ana Costa',
      email: 'ana.costa@empresa.com',
      telefone: '(11) 97654-3210',
      departamento: 'Suprimentos',
      pedidosAbertos: 3,
      valorPendente: 2100.00,
      ultimaAtividade: '2024-05-11',
      status: 'ativo'
    },
    {
      id: '4',
      nome: 'Carlos Oliveira',
      email: 'carlos.oliveira@empresa.com',
      telefone: '(11) 96543-2109',
      departamento: 'Logística',
      pedidosAbertos: 0,
      valorPendente: 0.00,
      ultimaAtividade: '2024-05-05',
      status: 'inativo'
    },
  ]

  const filtered = mockCompradoras.filter(c =>
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.departamento.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPendente = filtered.reduce((sum, c) => sum + c.valorPendente, 0)
  const totalPedidosAbertos = filtered.reduce((sum, c) => sum + c.pedidosAbertos, 0)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Compradoras</h1>
        <p className="text-muted-foreground mt-2">Equipe de compras e suas atividades</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Compradoras Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filtered.filter(c => c.status === 'ativo').length}</div>
            <p className="text-xs text-muted-foreground mt-1">Com atividade recente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pedidos em Aberto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPedidosAbertos}</div>
            <p className="text-xs text-muted-foreground mt-1">No total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Valor Pendente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalPendente.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Não recebido</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pesquisa</CardTitle>
          <CardDescription>Busque compradoras por nome, email ou departamento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Digite nome, email ou departamento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" size="icon">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Equipe de Compras ({filtered.length})</CardTitle>
          <CardDescription>Compradoras e suas atividades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead className="text-right">Pedidos Abertos</TableHead>
                  <TableHead className="text-right">Valor Pendente</TableHead>
                  <TableHead>Última Atividade</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((compradora) => (
                  <TableRow key={compradora.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{compradora.nome}</TableCell>
                    <TableCell className="text-sm">{compradora.email}</TableCell>
                    <TableCell className="text-sm">{compradora.telefone}</TableCell>
                    <TableCell>{compradora.departamento}</TableCell>
                    <TableCell className="text-right font-medium">{compradora.pedidosAbertos}</TableCell>
                    <TableCell className="text-right">R$ {compradora.valorPendente.toFixed(2)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(compradora.ultimaAtividade).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <Badge variant={compradora.status === 'ativo' ? 'default' : 'secondary'}>
                        {compradora.status === 'ativo' ? 'Ativa' : 'Inativa'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhuma compradora encontrada</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
