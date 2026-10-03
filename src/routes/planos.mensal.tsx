import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CalendarDays,
  CalendarRange,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleSlash,
  Clock,
  Cloud,
  Copy,
  Crown,
  Headset,
  Layers,
  LayoutDashboard,
  MapPin,
  PieChart,
  QrCode,
  Receipt,
  RefreshCw,
  Repeat,
  RotateCw,
  Settings,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Ticket,
  TrendingUp,
  User,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { update, uid } from "@/lib/demo-store";

import heroImage from "@/assets/eventpro-hero.jpg";
import stageImage from "@/assets/sobre-stage.jpg";
import presencialImage from "@/assets/event-presencial.jpg";
import hibridoImage from "@/assets/event-hibrido.jpg";
import virtualImage from "@/assets/event-virtual.jpg";
import martaImage from "@/assets/team-marta.jpg";
import carlosImage from "@/assets/team-carlos.jpg";

export const Route = createFileRoute("/planos/mensal")({
  head: () => ({
    meta: [
      { title: "Plano Mensal (SaaS) — EventPro" },
      {
        name: "description",
        content:
          "O seu evento, todos os meses, sem limites. A partir de 150.000 Kz/mês. Ideal para quem realiza vários eventos ao longo do ano.",
      },
      { property: "og:title", content: "Plano Mensal (SaaS) — EventPro" },
      {
        property: "og:description",
        content: "Solução completa na nuvem com até 3 eventos por mês, relatórios avançados e suporte incluído.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PlanoMensalPage,
});

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

export function PlanoMensalPage() {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"referencia" | "express">("referencia");
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    telefoneMcx: "",
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`${field} copiado para a área de transferência!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFinalizarPagamento = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome.trim() || !formData.email.trim() || !formData.telefone.trim()) {
      toast.error("Por favor, preencha todos os seus dados pessoais.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const novaOrgId = uid();
        update(
          formData.nome,
          `Assinou o Plano Mensal SaaS (150.000 KZ/mês) via ${
            paymentMethod === "referencia" ? "Referência Bancária" : "MultiCaixa Express"
          }`,
          (d) => {
            d.orgs.unshift({
              id: novaOrgId,
              nome: formData.nome + " Club SaaS",
              admin: formData.nome,
              email: formData.email,
              senha: "1234",
              plano: "Plano Mensal (SaaS)",
              data: new Date().toLocaleDateString("pt-PT"),
              status: "Pendente",
              eventos: [
                {
                  id: uid(),
                  nome: "Conferência Mensal de Membros",
                  data: "15 - 16 Novembro 2026",
                  hora: "09:00 - 18:00",
                  local: "Centro de Convenções de Luanda",
                  cidade: "Luanda, Angola",
                  descricao:
                    "Evento recorrente organizado através da subscrição do Plano Mensal SaaS.",
                  status: "Rascunho",
                  preco: 10000,
                  participantes: [],
                },
              ],
            });
          }
        );
      } catch (err) {
        console.error("Erro ao guardar na demo store:", err);
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Assinatura do Plano Mensal solicitada com sucesso!");
    }, 600);
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        telefoneMcx: "",
      });
    }, 300);
  };

  return (
    <main className="min-h-screen bg-[#020612] text-foreground font-sans selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#030816]/85 backdrop-blur-md">
        <div className="site-container flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3" aria-label="EventPro — início">
            <BrandMark />
            <span>
              <span className="block text-[1.35rem] font-extrabold leading-none text-white">
                Event<span className="text-[#0084FF]">Pro</span>
              </span>
              <span className="mt-1 block text-[0.57rem] text-slate-400">
                Eventos que conectam pessoas e negócios
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex" aria-label="Navegação principal">
            <Link className="text-slate-300 transition-colors hover:text-white" to="/">
              Início
            </Link>
            <Link className="text-slate-300 transition-colors hover:text-white" to="/funcionalidades">
              Funcionalidades
            </Link>
            <div className="relative py-2">
              <Link className="font-bold text-[#0084FF]" to="/planos">
                Planos
              </Link>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0084FF] rounded-full" />
            </div>
            <Link className="text-slate-300 transition-colors hover:text-white" to="/exemplos">
              Exemplos
            </Link>
            <Link className="text-slate-300 transition-colors hover:text-white" to="/sobre">
              Sobre
            </Link>
            <Link className="text-slate-300 transition-colors hover:text-white" to="/contactos">
              Contactos
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/login"
              className="rounded-lg border border-slate-700/80 bg-transparent px-5 py-2 text-sm font-semibold text-white transition-colors hover:border-slate-500 hover:bg-slate-800/40"
            >
              Entrar
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-lg bg-[#0080FF] px-5 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-[#0070e0] active:scale-95"
            >
              Criar Conta
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24">
        {/* Glow effects */}
        <div className="pointer-events-none absolute top-10 right-10 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[140px]" />
        <div className="pointer-events-none absolute -top-20 left-10 h-[400px] w-[400px] rounded-full bg-blue-500/15 blur-[120px]" />

        <div className="site-container relative z-10 grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          {/* Left Column */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0084FF]">
              <CalendarRange size={15} className="text-[#0084FF]" />
              <span>PLANO MENSAL (SAAS)</span>
            </div>

            <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]">
              O seu evento, todos <br />
              os meses, <span className="text-[#0084FF]">sem limites.</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              O Plano Mensal (SaaS) é ideal para quem realiza vários eventos ao longo do ano,
              oferecendo uma solução completa, prática e econômica para a gestão dos seus eventos.
            </p>

            {/* 3 Pills */}
            <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                  <CalendarDays size={19} />
                </div>
                <span className="text-xs font-semibold text-slate-200">
                  Ideal para <br />
                  múltiplos eventos
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                  <Cloud size={19} />
                </div>
                <span className="text-xs font-semibold text-slate-200">
                  Gestão na <br />
                  nuvem (SaaS)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                  <ShieldCheck size={19} />
                </div>
                <span className="text-xs font-semibold text-slate-200">
                  Solução <br />
                  escalável
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Price Card */}
          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="relative rounded-2xl border-2 border-[#0070F3] bg-[#061023]/95 p-7 sm:p-8 shadow-[0_0_70px_rgba(0,112,243,0.4)] backdrop-blur-xl">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/30 text-[#0084FF]">
                  <CalendarRange size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Plano Mensal (SaaS)</h2>
                  <p className="text-[11px] text-slate-400">
                    Ideal para quem realiza vários eventos ao longo do ano.
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <div className="text-xs font-semibold text-slate-400">A partir de</div>
                <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mt-0.5">
                  150.000 Kz
                </div>
                <div className="mt-1 text-sm text-slate-400">/ mês</div>
              </div>

              <a
                href="#adquirir-mensal"
                onClick={(e) => {
                  e.preventDefault();
                  setIsModalOpen(true);
                }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0080FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-[#0070e0] active:scale-[0.99] cursor-pointer"
              >
                Adquirir Plano <ArrowRight size={17} />
              </a>

              <div className="mt-6 flex items-center gap-2.5 text-xs text-slate-300">
                <Calendar size={16} className="flex-none text-[#0084FF]" />
                <span>Mais eventos. Mais controle. Mais resultados.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: "O QUE ESTÁ INCLUÍDO" */}
      <section className="relative border-t border-slate-800/80 py-16 lg:py-24">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Left info */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0084FF]">
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#0084FF]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0084FF]" />
              </span>
              <span>O QUE ESTÁ INCLUÍDO</span>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl leading-[1.15]">
              Tudo <span className="text-[#0084FF]">o que você precisa, por mês.</span>
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-slate-300 sm:text-base">
              Com o Plano Mensal, você tem acesso a uma plataforma completa e sempre atualizada,
              para gerir todos os seus eventos de forma simples, segura e profissional.
            </p>
          </div>

          {/* Right items - 5 cards */}
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Item 1 */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                  <CalendarDays size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Até 3 eventos por mês</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Realize até 3 eventos mensais, com total flexibilidade.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                  <Settings size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Gestão completa da plataforma</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Organize, acompanhe e controle tudo em um só lugar.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                  <RotateCw size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Atualizações e melhorias</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Tenha sempre as últimas novidades e funcionalidades.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-2">
              {/* Item 4 */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                  <Headset size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Suporte técnico incluído</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Conte com nossa equipa sempre que precisar.
                  </p>
                </div>
              </div>

              {/* Item 5 */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                  <BarChart3 size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Relatórios avançados</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Acompanhe resultados, métricas e o desempenho dos seus eventos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: "PLATAFORMA COMPLETA" */}
      <section className="relative border-t border-slate-800/80 py-16 lg:py-24 bg-[#030816]/40">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_1.8fr] lg:gap-14 items-center">
          {/* Left Description */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0084FF]">
              <Layers size={14} className="text-[#0084FF]" />
              <span>PLATAFORMA COMPLETA</span>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl leading-[1.15]">
              Mais controle, <br />
              <span className="text-[#0084FF]">mais resultados.</span>
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-slate-300">
              Com o Plano Mensal, você tem acesso a todas as funcionalidades da plataforma, com
              gestão centralizada, relatórios simples, seguros e suporte contínuo.
            </p>

            <Link
              to="/funcionalidades"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#0080FF] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[#0070e0]"
            >
              Ver todas as funcionalidades <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right: SaaS Dashboard Preview */}
          <div className="overflow-hidden rounded-2xl border border-blue-900/40 bg-[#030713] p-4 lg:p-5 shadow-2xl">
            <div className="grid gap-4 lg:grid-cols-[180px_1fr]">
              {/* Mini sidebar */}
              <div className="hidden flex-col justify-between rounded-xl border border-slate-800/60 bg-[#050b18] p-3 lg:flex text-xs">
                <div>
                  <div className="flex items-center gap-2 px-1 py-2">
                    <BrandMark />
                    <span className="font-extrabold text-white">EventPro</span>
                  </div>

                  <nav className="mt-2 space-y-1">
                    <div className="flex items-center gap-2 rounded-md bg-blue-600/30 px-2.5 py-1.5 font-semibold text-blue-400">
                      <LayoutDashboard size={13} /> Dashboard
                    </div>
                    <div className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-slate-400">
                      <Calendar size={13} /> Eventos
                    </div>
                    <div className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-slate-400">
                      <Users size={13} /> Participantes
                    </div>
                    <div className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-slate-400">
                      <Ticket size={13} /> Bilhetes
                    </div>
                    <div className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-slate-400">
                      <QrCode size={13} /> Check-in
                    </div>
                    <div className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-slate-400">
                      <Crown size={13} /> Patrocinadores
                    </div>
                    <div className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-slate-400">
                      <BarChart3 size={13} /> Relatórios
                    </div>
                    <div className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-slate-400">
                      <Settings size={13} /> Configurações
                    </div>
                  </nav>
                </div>
              </div>

              {/* Main panel with SaaS KPIs & Charts */}
              <div className="space-y-4">
                {/* 4 KPI cards */}
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  <div className="rounded-xl border border-slate-800/70 bg-[#060e1f] p-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 text-[#0084FF]">
                      <CalendarDays size={14} />
                    </div>
                    <div className="mt-2 text-[10px] text-slate-400">Total de eventos</div>
                    <div className="text-lg font-extrabold text-white">12</div>
                    <div className="text-[10px] font-semibold text-emerald-400">↑ +20%</div>
                  </div>

                  <div className="rounded-xl border border-slate-800/70 bg-[#060e1f] p-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 text-[#0084FF]">
                      <Users size={14} />
                    </div>
                    <div className="mt-2 text-[10px] text-slate-400">Participantes</div>
                    <div className="text-lg font-extrabold text-white">2.480</div>
                    <div className="text-[10px] font-semibold text-emerald-400">↑ +18%</div>
                  </div>

                  <div className="rounded-xl border border-slate-800/70 bg-[#060e1f] p-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 text-[#0084FF]">
                      <Ticket size={14} />
                    </div>
                    <div className="mt-2 text-[10px] text-slate-400">Vendas de bilhetes</div>
                    <div className="text-lg font-extrabold text-white">1.950</div>
                    <div className="text-[10px] font-semibold text-emerald-400">↑ +24%</div>
                  </div>

                  <div className="rounded-xl border border-slate-800/70 bg-[#060e1f] p-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 text-[#0084FF]">
                      <span className="font-bold text-xs">$</span>
                    </div>
                    <div className="mt-2 text-[10px] text-slate-400">Receita total</div>
                    <div className="text-sm sm:text-base font-extrabold text-white truncate">
                      1.245.000 Kz
                    </div>
                    <div className="text-[10px] font-semibold text-emerald-400">↑ +32%</div>
                  </div>
                </div>

                {/* Charts split: Desempenho dos eventos + Tipos de eventos */}
                <div className="grid gap-3 sm:grid-cols-[1.6fr_1fr]">
                  {/* Line Chart box */}
                  <div className="rounded-xl border border-slate-800 bg-[#050d1e] p-3.5">
                    <div className="text-xs font-bold text-white mb-2">Desempenho dos eventos</div>
                    <div className="h-28 flex items-end justify-between gap-1 pt-4 px-1 border-b border-slate-800/80">
                      {[40, 50, 45, 60, 55, 75, 70, 85, 80, 95, 90, 100].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            style={{ height: `${h}%` }}
                            className="w-full max-w-[12px] bg-gradient-to-t from-blue-600 to-[#0084FF] rounded-t-sm shadow-[0_0_8px_rgba(0,132,255,0.4)]"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-[8px] text-slate-500 mt-1.5 px-0.5">
                      <span>Jan</span>
                      <span>Fev</span>
                      <span>Mar</span>
                      <span>Abr</span>
                      <span>Mai</span>
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Ago</span>
                      <span>Set</span>
                      <span>Out</span>
                      <span>Nov</span>
                      <span>Dez</span>
                    </div>
                  </div>

                  {/* Donut chart box */}
                  <div className="rounded-xl border border-slate-800 bg-[#050d1e] p-3.5 flex flex-col justify-between">
                    <div className="text-xs font-bold text-white mb-2">Tipos de eventos</div>
                    <div className="flex items-center gap-3">
                      {/* CSS Donut chart */}
                      <div className="relative h-16 w-16 flex-none rounded-full border-4 border-[#0084FF] flex items-center justify-center bg-blue-950/40">
                        <div className="h-9 w-9 rounded-full bg-[#050d1e]" />
                      </div>
                      <div className="space-y-1 text-[10px]">
                        <div className="flex items-center justify-between gap-2 text-slate-300">
                          <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#0084FF]" />
                            Conferências
                          </span>
                          <span className="font-bold text-white">40%</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 text-slate-300">
                          <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                            Workshops
                          </span>
                          <span className="font-bold text-white">25%</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 text-slate-300">
                          <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                            Feiras
                          </span>
                          <span className="font-bold text-white">20%</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 text-slate-300">
                          <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                            Outros
                          </span>
                          <span className="font-bold text-white">15%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: "EXEMPLOS DE EVENTOS" */}
      <section className="relative border-t border-slate-800/80 py-16 lg:py-24">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-14">
          {/* Left Intro */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0084FF]">
              <Sparkles size={14} className="text-[#0084FF]" />
              <span>EXEMPLOS DE EVENTOS</span>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl leading-[1.15]">
              Realize diferentes tipos de eventos, <br />
              <span className="text-[#0084FF]">todos os meses.</span>
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-slate-300">
              O Plano Mensal é perfeito para empresas, instituições e organizações que realizam
              vários eventos ao longo do ano.
            </p>

            <Link
              to="/exemplos"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#0080FF] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[#0070e0]"
            >
              Ver exemplos de eventos <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right Grid of 4 Events */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Event 1 */}
            <div className="group overflow-hidden rounded-xl border border-slate-800 bg-[#060e20] transition-all hover:border-blue-500/50">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={stageImage}
                  alt="Conferência Empresarial"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] via-transparent to-transparent" />
              </div>
              <div className="p-3.5">
                <h3 className="text-xs font-bold text-white line-clamp-1">
                  Conferência Empresarial
                </h3>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                  <Calendar size={10} /> 15 - 16 Mar 2026
                </div>
                <div className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-400">
                  <MapPin size={10} /> Luanda, Angola
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1">
                  <span className="rounded bg-blue-950/80 border border-blue-800/50 px-1.5 py-0.5 text-[8px] font-semibold text-blue-300">
                    Corporativo
                  </span>
                  <span className="rounded bg-blue-950/80 border border-blue-800/50 px-1.5 py-0.5 text-[8px] font-semibold text-blue-300">
                    Networking
                  </span>
                </div>
              </div>
            </div>

            {/* Event 2 */}
            <div className="group overflow-hidden rounded-xl border border-slate-800 bg-[#060e20] transition-all hover:border-blue-500/50">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={presencialImage}
                  alt="Workshop de Inovação"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] via-transparent to-transparent" />
              </div>
              <div className="p-3.5">
                <h3 className="text-xs font-bold text-white line-clamp-1">
                  Workshop de Inovação
                </h3>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                  <Calendar size={10} /> 10 - 11 Abr 2026
                </div>
                <div className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-400">
                  <MapPin size={10} /> Luanda, Angola
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1">
                  <span className="rounded bg-blue-950/80 border border-blue-800/50 px-1.5 py-0.5 text-[8px] font-semibold text-blue-300">
                    Formação
                  </span>
                  <span className="rounded bg-blue-950/80 border border-blue-800/50 px-1.5 py-0.5 text-[8px] font-semibold text-blue-300">
                    Tecnologia
                  </span>
                </div>
              </div>
            </div>

            {/* Event 3 */}
            <div className="group overflow-hidden rounded-xl border border-slate-800 bg-[#060e20] transition-all hover:border-blue-500/50">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={hibridoImage}
                  alt="Feira de Negócios"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] via-transparent to-transparent" />
              </div>
              <div className="p-3.5">
                <h3 className="text-xs font-bold text-white line-clamp-1">Feira de Negócios</h3>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                  <Calendar size={10} /> 22 - 23 Mai 2026
                </div>
                <div className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-400">
                  <MapPin size={10} /> Talatona, Luanda
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1">
                  <span className="rounded bg-blue-950/80 border border-blue-800/50 px-1.5 py-0.5 text-[8px] font-semibold text-blue-300">
                    Exposição
                  </span>
                  <span className="rounded bg-blue-950/80 border border-blue-800/50 px-1.5 py-0.5 text-[8px] font-semibold text-blue-300">
                    Negócios
                  </span>
                </div>
              </div>
            </div>

            {/* Event 4 */}
            <div className="group overflow-hidden rounded-xl border border-slate-800 bg-[#060e20] transition-all hover:border-blue-500/50">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={virtualImage}
                  alt="Jantar de Gala"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] via-transparent to-transparent" />
              </div>
              <div className="p-3.5">
                <h3 className="text-xs font-bold text-white line-clamp-1">Jantar de Gala</h3>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                  <Calendar size={10} /> 12 Jun 2026
                </div>
                <div className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-400">
                  <MapPin size={10} /> Luanda, Angola
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1">
                  <span className="rounded bg-blue-950/80 border border-blue-800/50 px-1.5 py-0.5 text-[8px] font-semibold text-blue-300">
                    Social
                  </span>
                  <span className="rounded bg-blue-950/80 border border-blue-800/50 px-1.5 py-0.5 text-[8px] font-semibold text-blue-300">
                    Patrocínio
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Section: Testimonial + CTA */}
      <section className="pb-16 lg:pb-24 pt-4">
        <div className="site-container">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left: Testimonial */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-blue-900/50 bg-[#050e24]/90 p-6 sm:p-8">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-blue-600/30 text-[#0084FF]">
                  <span className="text-2xl font-serif font-black">“</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-slate-200">
                  “Com o Plano Mensal, conseguimos realizar mais eventos, com menos esforço e muito
                  mais resultados. A plataforma é completa, intuitiva e o suporte é sempre
                  excelente.”
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 pl-16">
                <img
                  src={martaImage}
                  alt="Ana Silva"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500/40"
                />
                <div>
                  <div className="font-bold text-white text-xs sm:text-sm">Ana Silva</div>
                  <div className="text-[11px] text-slate-400">
                    Diretora de Eventos — Empresa XYZ
                  </div>
                </div>
              </div>
            </div>

            {/* Right: CTA */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-blue-900/50 bg-gradient-to-r from-[#040e26] via-[#071536] to-[#05112a] p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-blue-500/40 bg-blue-950/80 text-[#0084FF]">
                  <CalendarDays size={24} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white">
                    Pronto para levar os seus eventos ao próximo nível?
                  </h3>
                  <p className="mt-1 text-xs text-slate-300">
                    Escolha o Plano Mensal e tenha tudo o que precisa para gerir os seus eventos
                    com eficiência.
                  </p>
                </div>
              </div>

              <div className="mt-6 pl-16">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 rounded-lg bg-[#0080FF] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-[#0070e0] cursor-pointer active:scale-95"
                >
                  Adquirir Plano <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#02050f] pt-14 pb-8">
        <div className="site-container grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo & description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3">
              <BrandMark />
              <span>
                <span className="block text-xl font-extrabold text-white">
                  Event<span className="text-[#0084FF]">Pro</span>
                </span>
                <span className="block text-[0.6rem] text-slate-400">
                  Eventos que conectam pessoas e negócios
                </span>
              </span>
            </Link>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Links rápidos</h4>
            <ul className="mt-3.5 space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/funcionalidades" className="hover:text-white transition-colors">
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link to="/planos" className="hover:text-white transition-colors">
                  Planos
                </Link>
              </li>
              <li>
                <Link to="/exemplos" className="hover:text-white transition-colors">
                  Exemplos
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/contactos" className="hover:text-white transition-colors">
                  Contactos
                </Link>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Suporte</h4>
            <ul className="mt-3.5 space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/contactos" className="hover:text-white transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link to="/contactos" className="hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/contactos" className="hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/contactos" className="hover:text-white transition-colors">
                  Fale Connosco
                </Link>
              </li>
            </ul>
          </div>

          {/* Siga-nos & Baixe o nosso app */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Siga-nos</h4>
            <div className="mt-3.5 flex items-center gap-3 text-slate-400">
              <a href="#facebook" className="hover:text-[#0084FF] transition-colors" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#instagram" className="hover:text-[#0084FF] transition-colors" aria-label="Instagram">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#linkedin" className="hover:text-[#0084FF] transition-colors" aria-label="LinkedIn">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#youtube" className="hover:text-[#0084FF] transition-colors" aria-label="YouTube">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="#x" className="hover:text-[#0084FF] transition-colors" aria-label="X">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>

            <div className="mt-5">
              <h5 className="text-[11px] font-bold text-white">Baixe o nosso app</h5>
              <div className="mt-2 flex flex-col gap-2">
                <a
                  href="#googleplay"
                  className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-[10px] text-slate-300 transition-colors hover:border-slate-500"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.61-.963V2.777c.18-.383.398-.71.609-.963zm11.238 11.241l2.42 2.42-12.784 7.37 10.364-9.79zm0-2.11L4.483 1.155l12.784 7.37-2.42 2.42zm1.055 1.055l3.225-1.859a1.5 1.5 0 0 0 0-2.6L15.902 12z" />
                  </svg>
                  <div>
                    <div className="text-[8px] text-slate-400">DISPONÍVEL NO</div>
                    <div className="font-bold text-white">Google Play</div>
                  </div>
                </a>

                <a
                  href="#appstore"
                  className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-[10px] text-slate-300 transition-colors hover:border-slate-500"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.89c.65-.79 1.1-1.9 1-3.01-.97.04-2.15.65-2.85 1.46-.61.7-.72 1.83-.98 2.95 1.08.08 2.18-.61 2.83-1.4z" />
                  </svg>
                  <div>
                    <div className="text-[8px] text-slate-400">Descarregar na</div>
                    <div className="font-bold text-white">App Store</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="site-container mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-6 text-[11px] text-slate-400 sm:flex-row">
          <div>© 2026 EventPro. Todos os direitos reservados.</div>
          <div className="flex items-center gap-4">
            <Link to="/contactos" className="hover:text-white transition-colors">
              Termos de Uso
            </Link>
            <span className="text-slate-600">|</span>
            <Link to="/contactos" className="hover:text-white transition-colors">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </footer>

      {/* CHECKOUT / ADQUIRIR PLANO MENSAL MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 sm:p-4 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
          <div className="relative my-8 w-full max-w-lg rounded-2xl border border-blue-500/30 bg-[#060d1e] p-6 sm:p-7 shadow-[0_0_70px_rgba(0,112,243,0.3)] text-foreground">
            {/* Close button */}
            <button
              type="button"
              onClick={resetModal}
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/60 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
            >
              <X size={18} />
            </button>

            {!isSuccess ? (
              <form onSubmit={handleFinalizarPagamento} className="space-y-5">
                {/* Product Header */}
                <div className="flex items-center gap-4 border-b border-slate-800 pb-5">
                  <div className="relative h-16 w-16 sm:h-18 sm:w-18 flex-none overflow-hidden rounded-xl border border-blue-500/40 shadow-md">
                    <img
                      src={heroImage}
                      alt="EXTENSÃO LOVEABLE PRO - Plano Mensal (SaaS)"
                      className="h-full w-full object-cover filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-blue-600/10" />
                  </div>
                  <div>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#0084FF]">
                      Subscrição Mensal
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-white">
                      EXTENSÃO LOVEABLE PRO (Mensal SaaS)
                    </h3>
                    <div className="mt-1 text-base sm:text-lg font-black text-[#0084FF]">
                      150.000 KZ <span className="text-xs font-normal text-slate-400">/ mês</span>
                    </div>
                  </div>
                </div>

                {/* Dados Pessoais Header */}
                <div>
                  <h4 className="text-sm font-bold text-white">Dados Pessoais</h4>
                  <p className="text-xs text-slate-400">
                    Preencha seus dados para ter acesso ao produto.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Digite seu nome completo"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="mt-1.5 w-full rounded-lg border border-slate-700/80 bg-slate-900/90 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all focus:border-[#0080FF] focus:ring-1 focus:ring-[#0080FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300">
                      Seu e-mail
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Digite seu e-mail"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1.5 w-full rounded-lg border border-slate-700/80 bg-slate-900/90 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all focus:border-[#0080FF] focus:ring-1 focus:ring-[#0080FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300">
                      Número de telefone
                    </label>
                    <div className="mt-1.5 flex rounded-lg border border-slate-700/80 bg-slate-900/90 overflow-hidden focus-within:border-[#0080FF] focus-within:ring-1 focus-within:ring-[#0080FF]">
                      <div className="flex items-center gap-1.5 border-r border-slate-700 bg-slate-800/70 px-3 py-2.5 text-xs font-bold text-slate-200">
                        <span>🇦🇴</span>
                        <span>+244</span>
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="Digite seu telefone"
                        value={formData.telefone}
                        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                        className="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between rounded-xl border border-blue-900/60 bg-blue-950/30 p-3.5">
                  <span className="text-xs font-bold text-slate-300">Total Mensal:</span>
                  <span className="text-lg font-black text-white">150.000 KZ</span>
                </div>

                {/* Forma de Pagamento */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-white">
                    Selecione a forma de pagamento desejada
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Opção Referência */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("referencia")}
                      className={`flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-all cursor-pointer ${
                        paymentMethod === "referencia"
                          ? "border-[#0080FF] bg-blue-600/15 shadow-[0_0_20px_rgba(0,128,255,0.2)]"
                          : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Receipt size={16} className="text-[#0084FF]" />
                          <span className="text-xs font-bold text-white">
                            Pagamento por Referência
                          </span>
                        </div>
                        <div
                          className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                            paymentMethod === "referencia"
                              ? "border-[#0080FF] bg-[#0080FF]"
                              : "border-slate-600"
                          }`}
                        >
                          {paymentMethod === "referencia" && (
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        Multicaixa / Internet Banking
                      </span>
                    </button>

                    {/* Opção MultiCaixa Express */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("express")}
                      className={`flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-all cursor-pointer ${
                        paymentMethod === "express"
                          ? "border-[#0080FF] bg-blue-600/15 shadow-[0_0_20px_rgba(0,128,255,0.2)]"
                          : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Smartphone size={16} className="text-[#0084FF]" />
                          <span className="text-xs font-bold text-white">MultiCaixa Express</span>
                        </div>
                        <div
                          className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                            paymentMethod === "express"
                              ? "border-[#0080FF] bg-[#0080FF]"
                              : "border-slate-600"
                          }`}
                        >
                          {paymentMethod === "express" && (
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400">Pagamento instantâneo</span>
                    </button>
                  </div>

                  {/* Informação adicional de acordo com a seleção */}
                  {paymentMethod === "referencia" && (
                    <div className="rounded-xl border border-slate-800 bg-[#040a16] p-3.5 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Entidade:</span>
                        <div className="flex items-center gap-1.5 font-mono font-bold text-white">
                          <span>00123</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard("00123", "Entidade")}
                            className="text-slate-400 hover:text-white"
                          >
                            <Copy size={12} />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Referência:</span>
                        <div className="flex items-center gap-1.5 font-mono font-bold text-[#0084FF]">
                          <span>942 810 994</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard("942810994", "Referência")}
                            className="text-slate-400 hover:text-white"
                          >
                            <Copy size={12} />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Valor:</span>
                        <span className="font-bold text-white">150.000,00 KZ</span>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "express" && (
                    <div className="rounded-xl border border-slate-800 bg-[#040a16] p-3.5 space-y-2.5 text-xs">
                      <label className="block text-slate-300 font-semibold">
                        Telefone associado ao MultiCaixa Express
                      </label>
                      <div className="flex rounded-lg border border-slate-700 bg-slate-900/90 overflow-hidden">
                        <div className="flex items-center border-r border-slate-700 bg-slate-800/70 px-2.5 py-1.5 text-xs font-bold text-slate-200">
                          +244
                        </div>
                        <input
                          type="tel"
                          placeholder={formData.telefone || "923 000 000"}
                          value={formData.telefoneMcx || formData.telefone}
                          onChange={(e) =>
                            setFormData({ ...formData, telefoneMcx: e.target.value })
                          }
                          className="w-full bg-transparent px-2.5 py-1.5 text-xs text-white placeholder-slate-500 outline-none"
                        />
                      </div>
                      <p className="text-[10px] text-slate-400">
                        Ao clicar em finalizar, receberá uma notificação no telemóvel para autorizar
                        o pagamento de <strong>150.000 KZ</strong>.
                      </p>
                    </div>
                  )}
                </div>

                {/* Finalizar Pagamento Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-[#0080FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-[#0070e0] active:scale-[0.99] cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Processando pagamento...</span>
                  ) : (
                    <>
                      <span>Finalizar Pagamento</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                {/* Bottom Notice */}
                <p className="text-center text-[11px] leading-relaxed text-slate-400">
                  Após o pagamento confirmado pelo admin, será enviado um e-mail com os dados de
                  acesso para o admin do EventPro para a sua empresa ou organização iniciar a
                  configuração do site e começar a realizar as vendas.
                </p>
              </form>
            ) : (
              /* Success confirmation state */
              <div className="py-3 text-center space-y-5 animate-in fade-in duration-300">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/15 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.25)]">
                  <CheckCircle2 size={36} />
                </div>

                <div>
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    Subscrição Solicitada
                  </span>
                  <h3 className="mt-1 text-xl sm:text-2xl font-black text-white">
                    Pedido de Assinatura Registado!
                  </h3>
                  <p className="mt-2 text-xs text-slate-300">
                    Obrigado, <strong>{formData.nome}</strong>. O seu pedido para o{" "}
                    <strong>Plano Mensal SaaS (150.000 KZ/mês)</strong> foi enviado para validação da
                    equipa de administração.
                  </p>
                </div>

                {/* Resumo da solicitação */}
                <div className="rounded-xl border border-slate-800 bg-[#040914] p-4 text-left space-y-2.5 text-xs">
                  <div className="flex justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Produto:</span>
                    <span className="font-bold text-white">
                      EXTENSÃO LOVEABLE PRO (Plano Mensal SaaS)
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Valor Mensal:</span>
                    <span className="font-black text-[#0084FF]">150.000 KZ / mês</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Forma de pagamento:</span>
                    <span className="font-semibold text-white">
                      {paymentMethod === "referencia" ? "Pagamento por Referência" : "MultiCaixa Express"}
                    </span>
                  </div>
                  {paymentMethod === "referencia" && (
                    <div className="rounded-lg bg-blue-950/40 p-2.5 text-[11px] space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Entidade:</span>
                        <strong className="text-white">00123</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Referência:</span>
                        <strong className="text-[#0084FF]">942 810 994</strong>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-400">E-mail para envio de acesso:</span>
                    <span className="font-bold text-white">{formData.email}</span>
                  </div>
                </div>

                {/* Card com o texto solicitado */}
                <div className="rounded-xl border border-blue-500/30 bg-blue-950/30 p-4 text-xs leading-relaxed text-slate-200">
                  <p className="font-medium">
                    📌 <strong>Próximo passo:</strong> Após o pagamento confirmado pelo admin, será
                    enviado um e-mail com os dados de acesso para o admin do EventPro para a sua
                    empresa ou organização iniciar a configuração dos dados do seu site e iniciar a
                    realização das vendas.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    to="/admin/login"
                    onClick={resetModal}
                    className="flex-1 rounded-xl bg-blue-600/20 border border-blue-500/40 py-3 text-xs font-bold text-blue-400 hover:bg-blue-600/30 transition-colors"
                  >
                    Ir para Login de Admin
                  </Link>
                  <button
                    type="button"
                    onClick={resetModal}
                    className="flex-1 rounded-xl bg-[#0080FF] py-3 text-xs font-bold text-white hover:bg-[#0070e0] transition-colors"
                  >
                    Concluir
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
