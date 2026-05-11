'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Search, Filter } from 'lucide-react'

interface Material {
  id: string
  codigo: string
  descricao: string
  estoque: number
  pontoReposicao: number
  status: 'crítico' | 'baixo' | 'normal' | 'sem_estoque'
  ultimaAtualizacao: string
}

export default function MateriaisPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('todos')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Mock data - será substituído por API real
  const mockMaterials: Material[] = [
    { id: '1', codigo: 'MAT001', descricao: 'Parafuso M8x50', estoque: 45, pontoReposicao: 100, status: 'crítico', ultimaAtualizacao: '2024-05-10' },
    { id: '2', codigo: 'MAT002', descricao: 'Porca M8', estoque: 0, pontoReposicao: 50, status: 'sem_estoque', ultimaAtualizacao: '2024-05-09' },
    { id: '3', codigo: 'MAT003', descricao: 'Arruela Aço', estoque: 250, pontoReposicao: 100, status: 'normal', ultimaAtualizacao: '2024-05-11' },
    { id: '4', codigo: 'MAT004', descricao: 'Corrente 10mm', estoque: 15, pontoReposicao: 50, status: 'baixo', ultimaAtualizacao: '2024-05-11' },
    { id: '5', codigo: 'MAT005', descricao: 'Correia Dentada', estoque: 75, pontoReposicao: 100, status: 'crítico', ultimaAtualizacao: '2024-05-10' },
    { id: '6', codigo: 'MAT006', descricao: 'Rolamento 6203', estoque: 500, pontoReposicao: 200, status: 'normal', ultimaAtualizacao: '2024-05-11' },
    { id: '7', codigo: 'MAT007', descricao: 'Mancal Bronze', estoque: 8, pontoReposicao: 20, status: 'baixo', ultimaAtualizacao: '2024-05-11' },
    { id: '8', codigo: 'MAT008', descricao: 'Polia 100mm', estoque: 0, pontoReposicao: 10, status: 'sem_estoque', ultimaAtualizacao: '2024-05-08' },
  ]

  // Filtrar materiais
  let filtered = mockMaterials.filter(m => {
    const matchesSearch = m.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'todos' || m.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginatedMaterials = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'crítico':
        return 'destructive'
      case 'baixo':
        return 'secondary'
      case 'sem_estoque':
        return 'outline'
      default:
        return 'default'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'crítico':
        return 'Crítico'
      case 'baixo':
        return 'Baixo'
      case 'normal':
        return 'Normal'
      case 'sem_estoque':
        return 'Zerado'
      default:
        return status
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Consulta de Materiais</h1>
        <p className="text-muted-foreground mt-2">Pesquise e analise o status dos materiais em estoque</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros de Pesquisa</CardTitle>
          <CardDescription>Utilize os filtros para encontrar materiais específicos</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="text-sm font-medium">Código ou Descrição</label>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Digite código ou descrição..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="flex-1"
              />
              <Button variant="outline" size="icon">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="w-full md:w-48">
            <label className="text-sm font-medium">Status</label>
            <Select value={filterStatus} onValueChange={(value) => {
              setFilterStatus(value)
              setCurrentPage(1)
            }}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="crítico">Crítico</SelectItem>
                <SelectItem value="baixo">Baixo</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="sem_estoque">Zerado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Materiais ({filtered.length})</CardTitle>
          <CardDescription>Mostrando {paginatedMaterials.length} de {filtered.length} materiais</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-right">Estoque</TableHead>
                  <TableHead className="text-right">Ponto Reposição</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Última Atualização</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedMaterials.map((material) => (
                  <TableRow key={material.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{material.codigo}</TableCell>
                    <TableCell>{material.descricao}</TableCell>
                    <TableCell className="text-right">
                      <span className={material.estoque === 0 ? 'text-destructive font-medium' : ''}>
                        {material.estoque}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{material.pontoReposicao}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={getStatusColor(material.status) as any}>
                        {getStatusLabel(material.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {new Date(material.ultimaAtualizacao).toLocaleDateString('pt-BR')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum material encontrado</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(currentPage - 1)
                        }}
                      />
                    </PaginationItem>
                  )}

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            isActive={page === currentPage}
                            onClick={(e) => {
                              e.preventDefault()
                              setCurrentPage(page)
                            }}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <PaginationEllipsis key={page} />
                    }
                  })}

                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(currentPage + 1)
                        }}
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
