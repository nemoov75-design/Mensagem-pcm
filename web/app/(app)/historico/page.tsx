'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'

interface ConsultaHistorico {
  id: string
  dataConsulta: string
  horaConsulta: string
  tipoConsulta: string
  parametroPesquisa: string
  usuario: string
  resultados: number
  origem: 'web' | 'telegram'
}

export default function HistoricoPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterOrigin, setFilterOrigin] = useState<string>('todos')
  const [filterType, setFilterType] = useState<string>('todos')

  const mockHistorico: ConsultaHistorico[] = [
    {
      id: '1',
      dataConsulta: '2024-05-11',
      horaConsulta: '14:35',
      tipoConsulta: 'Consulta Material',
      parametroPesquisa: 'MAT001',
      usuario: 'maria.silva@empresa.com',
      resultados: 1,
      origem: 'web'
    },
    {
      id: '2',
      dataConsulta: '2024-05-11',
      horaConsulta: '14:20',
      tipoConsulta: 'Consulta OP',
      parametroPesquisa: 'OP-2024-001',
      usuario: 'telegram:123456789',
      resultados: 1,
      origem: 'telegram'
    },
    {
      id: '3',
      dataConsulta: '2024-05-11',
      horaConsulta: '13:45',
      tipoConsulta: 'Materiais Críticos',
      parametroPesquisa: '',
      usuario: 'joao.santos@empresa.com',
      resultados: 5,
      origem: 'web'
    },
    {
      id: '4',
      dataConsulta: '2024-05-11',
      horaConsulta: '12:30',
      tipoConsulta: 'Faltas Futuras',
      parametroPesquisa: '',
      usuario: 'telegram:123456789',
      resultados: 4,
      origem: 'telegram'
    },
    {
      id: '5',
      dataConsulta: '2024-05-10',
      horaConsulta: '16:15',
      tipoConsulta: 'Pedidos de Compra',
      parametroPesquisa: 'PC-2024',
      usuario: 'ana.costa@empresa.com',
      resultados: 4,
      origem: 'web'
    },
    {
      id: '6',
      dataConsulta: '2024-05-10',
      horaConsulta: '10:00',
      tipoConsulta: 'Consulta Material',
      parametroPesquisa: 'Parafuso',
      usuario: 'maria.silva@empresa.com',
      resultados: 12,
      origem: 'web'
    },
    {
      id: '7',
      dataConsulta: '2024-05-09',
      horaConsulta: '15:45',
      tipoConsulta: 'Compradoras',
      parametroPesquisa: '',
      usuario: 'telegram:987654321',
      resultados: 4,
      origem: 'telegram'
    },
  ]

  let filtered = mockHistorico.filter(h => {
    const matchesSearch = h.parametroPesquisa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.tipoConsulta.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesOrigin = filterOrigin === 'todos' || h.origem === filterOrigin
    const matchesType = filterType === 'todos' || h.tipoConsulta === filterType
    return matchesSearch && matchesOrigin && matchesType
  })

  // Sort by date/time descending
  filtered = filtered.sort((a, b) => {
    const dateA = new Date(`${a.dataConsulta} ${a.horaConsulta}`)
    const dateB = new Date(`${b.dataConsulta} ${b.horaConsulta}`)
    return dateB.getTime() - dateA.getTime()
  })

  const totalConsultas = mockHistorico.length
  const consultasWeb = mockHistorico.filter(h => h.origem === 'web').length
  const consultasTelegram = mockHistorico.filter(h => h.origem === 'telegram').length

  const tiposUnicos = Array.from(new Set(mockHistorico.map(h => h.tipoConsulta)))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Histórico de Consultas</h1>
        <p className="text-muted-foreground mt-2">Todas as consultas realizadas no sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total de Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConsultas}</div>
            <p className="text-xs text-muted-foreground mt-1">Registradas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Consultas Web</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{consultasWeb}</div>
            <p className="text-xs text-muted-foreground mt-1">{((consultasWeb / totalConsultas) * 100).toFixed(0)}% do total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Consultas Telegram</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{consultasTelegram}</div>
            <p className="text-xs text-muted-foreground mt-1">{((consultasTelegram / totalConsultas) * 100).toFixed(0)}% do total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Tipos de Consulta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tiposUnicos.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Diferentes tipos</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Filtre o histórico por critérios específicos</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="text-sm font-medium">Busca</label>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Digite parâmetro, usuário ou tipo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" size="icon">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="w-full md:w-40">
            <label className="text-sm font-medium">Origem</label>
            <Select value={filterOrigin} onValueChange={setFilterOrigin}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="web">Web</SelectItem>
                <SelectItem value="telegram">Telegram</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-48">
            <label className="text-sm font-medium">Tipo de Consulta</label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                {tiposUnicos.map(tipo => (
                  <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Consultas ({filtered.length})</CardTitle>
          <CardDescription>Mostrando {filtered.length} de {totalConsultas} consultas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Tipo de Consulta</TableHead>
                  <TableHead>Parâmetro Pesquisa</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead className="text-right">Resultados</TableHead>
                  <TableHead>Origem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((consulta) => (
                  <TableRow key={consulta.id} className="hover:bg-muted/50">
                    <TableCell className="text-sm font-medium">
                      {new Date(consulta.dataConsulta).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell className="text-sm">{consulta.horaConsulta}</TableCell>
                    <TableCell>{consulta.tipoConsulta}</TableCell>
                    <TableCell className="text-sm font-mono">
                      {consulta.parametroPesquisa || '-'}
                    </TableCell>
                    <TableCell className="text-sm">
                      {consulta.usuario.includes('telegram') ? (
                        <span className="text-muted-foreground">Telegram ID</span>
                      ) : (
                        consulta.usuario
                      )}
                    </TableCell>
                    <TableCell className="text-right font-medium">{consulta.resultados}</TableCell>
                    <TableCell>
                      <Badge variant={consulta.origem === 'web' ? 'default' : 'secondary'}>
                        {consulta.origem === 'web' ? 'Web' : 'Telegram'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhuma consulta encontrada</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
