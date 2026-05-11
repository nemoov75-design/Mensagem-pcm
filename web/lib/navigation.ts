import {
  BarChart3,
  Upload,
  Package,
  Zap,
  AlertCircle,
  TrendingDown,
  ShoppingCart,
  Users,
  History,
} from "lucide-react";

export const navigationItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: BarChart3,
    description: "Visão geral do sistema",
  },
  {
    title: "Upload",
    href: "/upload",
    icon: Upload,
    description: "Importar planilha Excel",
  },
  {
    title: "Materiais",
    href: "/materiais",
    icon: Package,
    description: "Consulta de materiais",
  },
  {
    title: "OP",
    href: "/op",
    icon: Zap,
    description: "Ordens de produção",
  },
  {
    title: "Críticos",
    href: "/criticos",
    icon: AlertCircle,
    description: "Materiais críticos",
  },
  {
    title: "Faltas",
    href: "/faltas",
    icon: TrendingDown,
    description: "Semanas negativas",
  },
  {
    title: "Compras",
    href: "/compras",
    icon: ShoppingCart,
    description: "Pedidos de compra",
  },
  {
    title: "Compradoras",
    href: "/compradoras",
    icon: Users,
    description: "Gerenciar compradoras",
  },
  {
    title: "Histórico",
    href: "/historico",
    icon: History,
    description: "Histórico de consultas",
  },
];
