"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { AlertCircle, Package, TrendingDown, ShoppingCart, Users, Zap } from "lucide-react";

// Mock data for charts
const materiaisData = [
  { nome: "Críticos", valor: 12 },
  { nome: "Sem estoque", valor: 8 },
  { nome: "Ponto de pedido", valor: 15 },
  { nome: "Normal", valor: 245 },
];

const materiaisColorMap: Record<string, string> = {
  "Críticos": "#dc2626",
  "Sem estoque": "#f97316",
  "Ponto de pedido": "#eab308",
  "Normal": "#22c55e",
};

const evolucaoEstoque = [
  { semana: "S1", materiais: 280, criticos: 12, zerados: 5 },
  { semana: "S2", materiais: 282, criticos: 10, zerados: 4 },
  { semana: "S3", materiais: 285, criticos: 8, zerados: 3 },
  { semana: "S4", materiais: 283, criticos: 11, zerados: 4 },
];

const operacoes = [
  { id: "OP001", status: "Ativa", materiais: 12 },
  { id: "OP002", status: "Ativa", materiais: 8 },
  { id: "OP003", status: "Concluída", materiais: 5 },
  { id: "OP004", status: "Planejada", materiais: 15 },
];

export default function Dashboard() {
  const totalMateriais = materiaisData.reduce((sum, item) => sum + item.valor, 0);
  const materiaisCriticos = materiaisData.find(item => item.nome === "Críticos")?.valor || 0;
  const materiazerados = materiaisData.find(item => item.nome === "Sem estoque")?.valor || 0;
  const materiaisAbaixoPonto = materiaisData.find(item => item.nome === "Ponto de pedido")?.valor || 0;
  const opsAbertas = operacoes.filter(op => op.status === "Ativa").length;

  return (
    <div className="flex-1 space-y-8 p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard MRP/PCP</h1>
        <p className="text-muted-foreground mt-2">
          Visão geral do sistema de planejamento e controle de produção
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Materiais</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMateriais}</div>
            <p className="text-xs text-muted-foreground">
              Materiais cadastrados no sistema
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Materiais Críticos</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{materiaisCriticos}</div>
            <p className="text-xs text-muted-foreground">
              Requerem ação imediata
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sem Estoque</CardTitle>
            <TrendingDown className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{materiazerados}</div>
            <p className="text-xs text-muted-foreground">
              Necessitam reposição urgente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ponto de Pedido</CardTitle>
            <ShoppingCart className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{materiaisAbaixoPonto}</div>
            <p className="text-xs text-muted-foreground">
              Abaixo do estoque mínimo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">OPs Abertas</CardTitle>
            <Zap className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{opsAbertas}</div>
            <p className="text-xs text-muted-foreground">
              Ordens em produção
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Saúde</CardTitle>
            <div className="text-2xl font-bold text-green-600">98%</div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Saúde geral do estoque
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Status de Materiais */}
        <Card>
          <CardHeader>
            <CardTitle>Status de Materiais</CardTitle>
            <CardDescription>
              Distribuição por categoria de risco
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={materiaisData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ nome, valor }) => `${nome}: ${valor}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="valor"
                >
                  {materiaisData.map((entry) => (
                    <Cell
                      key={`cell-${entry.nome}`}
                      fill={materiaisColorMap[entry.nome]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Evolução de Estoque */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução de Estoque</CardTitle>
            <CardDescription>
              Últimas 4 semanas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={evolucaoEstoque}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semana" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="materiais" stroke="#3b82f6" />
                <Line type="monotone" dataKey="criticos" stroke="#dc2626" />
                <Line type="monotone" dataKey="zerados" stroke="#f97316" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Operações Ativas */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Ordens de Produção Ativas</CardTitle>
            <CardDescription>
              Situação atual das operações
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {operacoes.filter(op => op.status === "Ativa").map((op) => (
                <div key={op.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">{op.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {op.materiais} materiais
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Ativa
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
