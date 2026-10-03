import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Calendar,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleSlash,
  Copy,
  Crown,
  Handshake,
  Headset,
  LayoutDashboard,
  MapPin,
  QrCode,
  Receipt,
  Settings,
  Shield,
  ShieldCheck,
  Sliders,
  Smartphone,
  Sparkles,
  Ticket,
  TrendingUp,
  User,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { update, uid } from "@/lib/demo-store";

import heroImage from "@/assets/eventpro-hero.jpg";
import presencialImage from "@/assets/event-presencial.jpg";
import hibridoImage from "@/assets/event-hibrido.jpg";
import virtualImage from "@/assets/event-virtual.jpg";
import stageImage from "@/assets/sobre-stage.jpg";
import martaImage from "@/assets/team-marta.jpg";
import carlosImage from "@/assets/team-carlos.jpg";
import patriciaImage from "@/assets/team-patricia.jpg";
import evaristoImage from "@/assets/team-evaristo.jpg";

export const Route = createFileRoute("/planos/profissional")({
  head: () => ({
    meta: [
      { title: "Plano Profissional — EventPro" },
      {
        name: "description",
        content:
          "Profissional para ir mais longe. Perfeito para empresas e eventos de médio porte. 100.000 Kz por evento.",
      },
      { property: "og:title", content: "Plano Profissional — EventPro" },
      {
        property: "og:description",
        content: "100.000 Kz por evento. Mais recursos, maior controlo e suporte prioritário.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PlanoProfissionalPage,
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

export function PlanoProfissionalPage() {
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
          `Solicitou aquisição do plano Profissional (100.000 KZ) via ${
            paymentMethod === "referencia" ? "Referência Bancária" : "MultiCaixa Express"
          }`,
          (d) => {
            d.orgs.unshift({
              id: novaOrgId,
              nome: formData.nome + " Corporate",
              admin: formData.nome,
              email: formData.email,
              senha: "1234",
              plano: "Profissional",
              data: new Date().toLocaleDateString("pt-PT"),
              status: "Pendente",
              eventos: [
                {
                  id: uid(),
                  nome: "Conferência Empresarial",
                  data: "15 - 17 Novembro 2026",
                  hora: "08:30 - 18:00",
                  local: "Centro de Convenções de Luanda",
                  cidade: "Luanda, Angola",
                  descricao:
                    "Evento profissional de alto impacto com gestão de patrocinadores, palestrantes e equipa.",
                  status: "Rascunho",
                  preco: 25000,
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
      toast.success("Pedido do plano Profissional registado com sucesso!");
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
              Subscrever Plano
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24">
        {/* Glow effects */}
        <div className="pointer-events-none absolute top-10 right-10 h-[480px] w-[480px] rounded-full bg-blue-600/20 blur-[130px]" />
        <div className="pointer-events-none absolute -top-20 left-10 h-[400px] w-[400px] rounded-full bg-blue-500/15 blur-[110px]" />

        <div className="site-container relative z-10 grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          {/* Left Column */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0084FF]">
              <Crown size={15} className="text-[#0084FF]" />
              <span>PLANO PROFISSIONAL</span>
            </div>

            <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]">
              Profissional <br />
              <span className="text-[#0084FF]">para ir mais longe.</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Perfeito para empresas e eventos de médio porte que precisam de mais recursos, maior
              controlo e uma experiência completa para organizadores e participantes.
            </p>

            {/* 4 Feature Badges */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:items-center sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                  <Sliders size={19} />
                </div>
                <span className="text-xs font-semibold text-slate-200">
                  Mais controle <br />
                  e flexibilidade
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                  <Building2 size={19} />
                </div>
                <span className="text-xs font-semibold text-slate-200">
                  Ideal para <br />
                  médias empresas
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                  <ShieldCheck size={19} />
                </div>
                <span className="text-xs font-semibold text-slate-200">
                  Suporte <br />
                  prioritário
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                  <TrendingUp size={19} />
                </div>
                <span className="text-xs font-semibold text-slate-200">
                  Resultados <br />
                  comprovados
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Price Card */}
          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="relative rounded-2xl border-2 border-[#0070F3] bg-[#061023]/95 p-7 sm:p-8 shadow-[0_0_70px_rgba(0,112,243,0.4)] backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-white">Profissional</h2>

              <div className="mt-4">
                <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                  100.000 Kz
                </div>
                <div className="mt-1 text-sm text-slate-400">/ evento</div>
              </div>

              <a
                href="#adquirir-profissional"
                onClick={(e) => {
                  e.preventDefault();
                  setIsModalOpen(true);
                }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0080FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-[#0070e0] active:scale-[0.99] cursor-pointer"
              >
                Adquirir Plano <ArrowRight size={17} />
              </a>

              <div className="mt-6 flex items-start gap-2.5 text-xs text-slate-300">
                <Shield size={16} className="mt-0.5 flex-none text-[#0084FF]" />
                <span>Tudo o que precisa para um evento de sucesso, com o suporte da nossa equipa.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Platform Live Mockup for Profissional */}
      <section className="relative pb-20 lg:pb-24">
        <div className="site-container">
          <div className="relative overflow-hidden rounded-2xl border border-blue-900/40 bg-[#030713] p-3 sm:p-5 lg:p-6 shadow-[0_20px_70px_rgba(0,0,0,0.8)]">
            {/* Top Bar of Platform Window */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm text-slate-300">
                  Evento: <strong className="text-white">Conferência de Negócios</strong>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  + Ativo
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold text-white text-xs">
                  EA
                </div>
                <div className="text-left text-xs">
                  <div className="font-bold text-white">Empresa Alfa</div>
                  <div className="text-[10px] text-slate-400">Organizador</div>
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </div>
            </div>

            {/* Dashboard Inner Layout */}
            <div className="grid gap-4 lg:grid-cols-[210px_1fr]">
              {/* Sidebar */}
              <div className="hidden flex-col justify-between rounded-xl border border-slate-800/60 bg-[#050b18] p-3 lg:flex">
                <div>
                  <div className="flex items-center gap-2 px-2 py-3">
                    <BrandMark />
                    <span className="text-base font-extrabold text-white">
                      Event<span className="text-[#0084FF]">Pro</span>
                    </span>
                  </div>

                  <nav className="mt-2 space-y-1 text-xs">
                    <a
                      href="#dashboard"
                      className="flex items-center gap-2.5 rounded-lg bg-blue-600/25 px-3 py-1.5 font-semibold text-blue-400"
                    >
                      <LayoutDashboard size={14} />
                      Dashboard
                    </a>
                    <a
                      href="#evento"
                      className="flex items-center justify-between rounded-lg px-3 py-1.5 text-slate-400 transition-colors hover:bg-slate-800/40 hover:text-white"
                    >
                      <span className="flex items-center gap-2.5">
                        <Calendar size={14} />
                        Evento
                      </span>
                      <ChevronRight size={12} className="text-slate-500" />
                    </a>
                    <a
                      href="#participantes"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-slate-400 transition-colors hover:bg-slate-800/40 hover:text-white"
                    >
                      <Users size={14} />
                      Participantes
                    </a>
                    <a
                      href="#bilhetes"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-slate-400 transition-colors hover:bg-slate-800/40 hover:text-white"
                    >
                      <Ticket size={14} />
                      Bilhetes
                    </a>
                    <a
                      href="#checkin"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-slate-400 transition-colors hover:bg-slate-800/40 hover:text-white"
                    >
                      <QrCode size={14} />
                      Check-in
                    </a>
                    <a
                      href="#patrocinadores"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-slate-400 transition-colors hover:bg-slate-800/40 hover:text-white"
                    >
                      <Handshake size={14} />
                      Patrocinadores
                    </a>
                    <a
                      href="#expositores"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-slate-400 transition-colors hover:bg-slate-800/40 hover:text-white"
                    >
                      <Building2 size={14} />
                      Expositores
                    </a>
                    <a
                      href="#palestrantes"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-slate-400 transition-colors hover:bg-slate-800/40 hover:text-white"
                    >
                      <UserCheck size={14} />
                      Palestrantes
                    </a>
                    <a
                      href="#equipa"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-slate-400 transition-colors hover:bg-slate-800/40 hover:text-white"
                    >
                      <Users size={14} />
                      Equipa
                    </a>
                    <a
                      href="#relatorios"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-slate-400 transition-colors hover:bg-slate-800/40 hover:text-white"
                    >
                      <BarChart3 size={14} />
                      Relatórios
                    </a>
                    <a
                      href="#definicoes"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-slate-400 transition-colors hover:bg-slate-800/40 hover:text-white"
                    >
                      <Settings size={14} />
                      Definições
                    </a>
                  </nav>
                </div>

                {/* Bottom Event card in sidebar */}
                <div className="mt-4 flex items-center gap-2.5 rounded-lg border border-slate-800 bg-[#091224] p-2">
                  <img
                    src={stageImage}
                    alt="Conferência"
                    className="h-9 w-9 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[11px] font-bold text-white">
                      Conferência de Negócios
                    </div>
                    <div className="text-[9px] text-slate-400">15 - 16 Nov 2026</div>
                    <div className="flex items-center gap-1 text-[9px] text-slate-400">
                      <MapPin size={9} /> Luanda, Angola
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="space-y-4">
                {/* 4 Metric Cards - Profissional values: 1.248, 980, 870, 24.500 Kz */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                  {/* Metric 1 */}
                  <div className="rounded-xl border border-slate-800/70 bg-[#060e1f] p-3.5 sm:p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/20 text-[#0084FF]">
                        <User size={18} />
                      </div>
                    </div>
                    <div className="mt-3 text-[11px] text-slate-400">Total de inscritos</div>
                    <div className="mt-0.5 text-xl sm:text-2xl font-extrabold text-white">
                      1.248
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                      <span>↑ 12%</span>
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="rounded-xl border border-slate-800/70 bg-[#060e1f] p-3.5 sm:p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/20 text-[#0084FF]">
                        <Ticket size={18} />
                      </div>
                    </div>
                    <div className="mt-3 text-[11px] text-slate-400">Bilhetes vendidos</div>
                    <div className="mt-0.5 text-xl sm:text-2xl font-extrabold text-white">980</div>
                    <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                      <span>↑ 15%</span>
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="rounded-xl border border-slate-800/70 bg-[#060e1f] p-3.5 sm:p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/20 text-[#0084FF]">
                        <QrCode size={18} />
                      </div>
                    </div>
                    <div className="mt-3 text-[11px] text-slate-400">Check-ins</div>
                    <div className="mt-0.5 text-xl sm:text-2xl font-extrabold text-white">870</div>
                    <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                      <span>↑ 20%</span>
                    </div>
                  </div>

                  {/* Metric 4 */}
                  <div className="rounded-xl border border-slate-800/70 bg-[#060e1f] p-3.5 sm:p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/20 text-[#0084FF]">
                        <span className="font-bold text-sm">$</span>
                      </div>
                    </div>
                    <div className="mt-3 text-[11px] text-slate-400">Receita total</div>
                    <div className="mt-0.5 text-xl sm:text-2xl font-extrabold text-white">
                      24.500 Kz
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                      <span>↑ 18%</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Event Banner (Left) + Participantes Recentes (Right) */}
                <div className="grid gap-4 lg:grid-cols-[1.6fr_1.1fr]">
                  {/* Left: Event Banner Card */}
                  <div className="relative min-h-[260px] overflow-hidden rounded-xl border border-slate-800">
                    <img
                      src={heroImage}
                      alt="Conferência de Negócios 2026"
                      className="absolute inset-0 h-full w-full object-cover filter brightness-[0.45] saturate-[1.2]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030816] via-[#030816]/70 to-transparent" />

                    <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-6">
                      <span className="inline-block w-fit rounded-full bg-blue-600/60 px-3 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                        Conferência de Negócios
                      </span>

                      <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                        Conferência de Negócios 2026
                      </h3>

                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-[#0084FF]" />
                          <span>15 - 16 Novembro 2026</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-[#0084FF]" />
                          <span>Luanda, Angola</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Link
                          to="/exemplos"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#0080FF] px-4 py-2 text-xs font-semibold text-white shadow-md transition-colors hover:bg-[#0070e0]"
                        >
                          Ver detalhes do evento <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Right: Participantes Recentes Card */}
                  <div className="flex flex-col justify-between rounded-xl border border-slate-800/80 bg-[#060e20] p-4 sm:p-5">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        Participantes Recentes
                      </h4>

                      <div className="mt-3.5 space-y-3">
                        {/* Person 1 */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={martaImage}
                              alt="Ana Silva"
                              className="h-8 w-8 rounded-full object-cover ring-1 ring-blue-500/40"
                            />
                            <div>
                              <div className="font-semibold text-white">Ana Silva</div>
                              <div className="text-[10px] text-slate-400">Inscrição realizada</div>
                            </div>
                          </div>
                          <span className="text-[11px] text-slate-400">Hoje, 10:24</span>
                        </div>

                        {/* Person 2 */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={carlosImage}
                              alt="Carlos Mendes"
                              className="h-8 w-8 rounded-full object-cover ring-1 ring-blue-500/40"
                            />
                            <div>
                              <div className="font-semibold text-white">Carlos Mendes</div>
                              <div className="text-[10px] text-slate-400">Inscrição realizada</div>
                            </div>
                          </div>
                          <span className="text-[11px] text-slate-400">Hoje, 09:17</span>
                        </div>

                        {/* Person 3 */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={patriciaImage}
                              alt="Patrícia Costa"
                              className="h-8 w-8 rounded-full object-cover ring-1 ring-blue-500/40"
                            />
                            <div>
                              <div className="font-semibold text-white">Patrícia Costa</div>
                              <div className="text-[10px] text-slate-400">Check-in efetuado</div>
                            </div>
                          </div>
                          <span className="text-[11px] text-slate-400">Hoje, 08:45</span>
                        </div>

                        {/* Person 4 */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={evaristoImage}
                              alt="João Ferreira"
                              className="h-8 w-8 rounded-full object-cover ring-1 ring-blue-500/40"
                            />
                            <div>
                              <div className="font-semibold text-white">João Ferreira</div>
                              <div className="text-[10px] text-slate-400">Inscrição realizada</div>
                            </div>
                          </div>
                          <span className="text-[11px] text-slate-400">Hoje, 08:32</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      to="/empresa/dashboard"
                      className="mt-4 flex items-center justify-center gap-1 border-t border-slate-800 pt-3 text-xs font-semibold text-[#0084FF] transition-colors hover:text-blue-300"
                    >
                      Ver todos <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "O QUE ESTÁ INCLUÍDO" Section */}
      <section className="relative border-t border-slate-800/80 py-16 lg:py-24">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Left info */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0084FF]">
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#0084FF]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0084FF]" />
              </span>
              <span>QUE ESTÁ INCLUÍDO</span>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl leading-[1.15]">
              Tudo o que precisa <br />
              para o <span className="text-[#0084FF]">seu evento.</span>
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-slate-300 sm:text-base">
              Com o plano Profissional, tem acesso a todos os recursos do plano Básico, mais um
              conjunto de funcionalidades avançadas que tornam o seu evento ainda mais completo e
              profissional.
            </p>
          </div>

          {/* Right items */}
          <div className="space-y-6">
            {/* Row 1 */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Item 1 */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                  <Handshake size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Patrocinadores e expositores</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Divulgue e gerencie os seus patrocinadores e expositores.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                  <BarChart3 size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Relatórios e estatísticas</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Acompanhe os resultados em tempo real com relatórios completos.
                  </p>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid gap-6 sm:grid-cols-2 pt-2">
              {/* Item 3 */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                  <UserCheck size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Palestrantes e convidados</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Cadastre palestrantes, convidados e moderadores.
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                  <Headset size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Suporte prioritário</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Tenha atendimento prioritário da nossa equipa de suporte.
                  </p>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid gap-6 sm:grid-cols-2 pt-2">
              {/* Item 5 */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                  <Users size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Equipa do evento</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Crie e gerencie a equipa com diferentes permissões.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "Eventos de sucesso com o plano Profissional" */}
      <section className="relative border-t border-slate-800/80 py-16 lg:py-24 bg-[#030816]/40">
        <div className="site-container">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Eventos de sucesso com o plano Profissional
            </h2>
            <Link
              to="/exemplos"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0084FF] hover:text-blue-300 transition-colors"
            >
              Ver mais exemplos <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Event 1 */}
            <div className="group overflow-hidden rounded-xl border border-slate-800 bg-[#060e20] transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={heroImage}
                  alt="Conferência Empresarial Angola 2026"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] via-transparent to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-white line-clamp-1">
                  Conferência Empresarial Angola 2026
                </h3>
                <p className="mt-1 text-[11px] text-slate-400">Luanda, Angola | 15 - 17 Abr 2026</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded bg-blue-950/80 border border-blue-800/50 px-2 py-0.5 text-[9px] font-semibold text-blue-300">
                    Patrocinadores
                  </span>
                  <span className="rounded bg-blue-950/80 border border-blue-800/50 px-2 py-0.5 text-[9px] font-semibold text-blue-300">
                    Palestrantes
                  </span>
                  <span className="rounded bg-blue-950/80 border border-blue-800/50 px-2 py-0.5 text-[9px] font-semibold text-blue-300">
                    Equipa
                  </span>
                </div>
              </div>
            </div>

            {/* Event 2 */}
            <div className="group overflow-hidden rounded-xl border border-slate-800 bg-[#060e20] transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={presencialImage}
                  alt="Expo Angola Negócios 2026"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] via-transparent to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-white line-clamp-1">
                  Expo Angola Negócios 2026
                </h3>
                <p className="mt-1 text-[11px] text-slate-400">
                  Talatona, Luanda | 10 - 13 Set 2026
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded bg-blue-950/80 border border-blue-800/50 px-2 py-0.5 text-[9px] font-semibold text-blue-300">
                    Expositores
                  </span>
                  <span className="rounded bg-blue-950/80 border border-blue-800/50 px-2 py-0.5 text-[9px] font-semibold text-blue-300">
                    Networking
                  </span>
                  <span className="rounded bg-blue-950/80 border border-blue-800/50 px-2 py-0.5 text-[9px] font-semibold text-blue-300">
                    Relatórios
                  </span>
                </div>
              </div>
            </div>

            {/* Event 3 */}
            <div className="group overflow-hidden rounded-xl border border-slate-800 bg-[#060e20] transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={hibridoImage}
                  alt="Workshop de Marketing Digital"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] via-transparent to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-white line-clamp-1">
                  Workshop de Marketing Digital
                </h3>
                <p className="mt-1 text-[11px] text-slate-400">Luanda, Angola | 22 Fev 2026</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded bg-blue-950/80 border border-blue-800/50 px-2 py-0.5 text-[9px] font-semibold text-blue-300">
                    Palestrantes
                  </span>
                  <span className="rounded bg-blue-950/80 border border-blue-800/50 px-2 py-0.5 text-[9px] font-semibold text-blue-300">
                    Check-in
                  </span>
                  <span className="rounded bg-blue-950/80 border border-blue-800/50 px-2 py-0.5 text-[9px] font-semibold text-blue-300">
                    Estatísticas
                  </span>
                </div>
              </div>
            </div>

            {/* Event 4 */}
            <div className="group overflow-hidden rounded-xl border border-slate-800 bg-[#060e20] transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={virtualImage}
                  alt="Jantar de Gala Empresarial"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] via-transparent to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-white line-clamp-1">
                  Jantar de Gala Empresarial
                </h3>
                <p className="mt-1 text-[11px] text-slate-400">Luanda, Angola | 05 Dez 2026</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded bg-blue-950/80 border border-blue-800/50 px-2 py-0.5 text-[9px] font-semibold text-blue-300">
                    Bilhetes
                  </span>
                  <span className="rounded bg-blue-950/80 border border-blue-800/50 px-2 py-0.5 text-[9px] font-semibold text-blue-300">
                    Patrocinadores
                  </span>
                  <span className="rounded bg-blue-950/80 border border-blue-800/50 px-2 py-0.5 text-[9px] font-semibold text-blue-300">
                    Equipa
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Section: Testimonial (Left) + CTA (Right) */}
      <section className="pb-16 lg:pb-24 pt-8">
        <div className="site-container">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left: Testimonial */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-blue-900/50 bg-[#050e24]/90 p-6 sm:p-8">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-blue-600/30 text-[#0084FF]">
                  <span className="text-2xl font-serif font-black">“</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-slate-200">
                  “Com o plano Profissional, conseguimos organizar um evento de grande porte com
                  total controlo e apoio da equipa. A plataforma é completa e intuitiva.”
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 pl-16">
                <img
                  src={martaImage}
                  alt="Mariana Costa"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500/40"
                />
                <div>
                  <div className="font-bold text-white text-xs sm:text-sm">Mariana Costa</div>
                  <div className="text-[11px] text-slate-400">CEO - Business Angola</div>
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
                    Pronto para levar o seu evento para o próximo nível?
                  </h3>
                  <p className="mt-1 text-xs text-slate-300">
                    Escolha o plano Profissional e comece agora mesmo.
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

      {/* CHECKOUT / ADQUIRIR PLANO PROFISSIONAL MODAL */}
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
                      alt="EXTENSÃO LOVEABLE PRO - Profissional"
                      className="h-full w-full object-cover filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-blue-600/10" />
                  </div>
                  <div>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#0084FF]">
                      Produto Selecionado
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-white">
                      EXTENSÃO LOVEABLE PRO
                    </h3>
                    <div className="mt-1 text-base sm:text-lg font-black text-[#0084FF]">
                      100.000 KZ
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
                  <span className="text-xs font-bold text-slate-300">Total:</span>
                  <span className="text-lg font-black text-white">100.000 KZ</span>
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
                          <span>942 810 779</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard("942810779", "Referência")}
                            className="text-slate-400 hover:text-white"
                          >
                            <Copy size={12} />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Valor:</span>
                        <span className="font-bold text-white">100.000,00 KZ</span>
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
                        o pagamento de <strong>100.000 KZ</strong>.
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
                    Pagamento Solicitado
                  </span>
                  <h3 className="mt-1 text-xl sm:text-2xl font-black text-white">
                    Pedido de Pagamento Registado!
                  </h3>
                  <p className="mt-2 text-xs text-slate-300">
                    Obrigado, <strong>{formData.nome}</strong>. O seu pedido para o plano{" "}
                    <strong>Profissional (100.000 KZ)</strong> foi enviado para validação da equipa
                    de administração.
                  </p>
                </div>

                {/* Resumo da solicitação */}
                <div className="rounded-xl border border-slate-800 bg-[#040914] p-4 text-left space-y-2.5 text-xs">
                  <div className="flex justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Produto:</span>
                    <span className="font-bold text-white">
                      EXTENSÃO LOVEABLE PRO (Plano Profissional)
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Total:</span>
                    <span className="font-black text-[#0084FF]">100.000 KZ</span>
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
                        <strong className="text-[#0084FF]">942 810 779</strong>
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
