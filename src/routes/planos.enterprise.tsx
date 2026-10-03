import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Building,
  Building2,
  Calendar,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Crown,
  Globe,
  Handshake,
  Headset,
  Layers,
  MapPin,
  MonitorCheck,
  Phone,
  Puzzle,
  Radio,
  Send,
  Server,
  Settings2,
  Shield,
  ShieldCheck,
  Sliders,
  Sparkles,
  UserCheck,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { update, uid } from "@/lib/demo-store";

import heroImage from "@/assets/eventpro-hero.jpg";
import stageImage from "@/assets/sobre-stage.jpg";
import presencialImage from "@/assets/event-presencial.jpg";
import hibridoImage from "@/assets/event-hibrido.jpg";
import virtualImage from "@/assets/event-virtual.jpg";
import carlosImage from "@/assets/team-carlos.jpg";
import evaristoImage from "@/assets/team-evaristo.jpg";

export const Route = createFileRoute("/planos/enterprise")({
  head: () => ({
    meta: [
      { title: "Plano Enterprise — EventPro" },
      {
        name: "description",
        content:
          "Soluções completas para grandes eventos. O plano Enterprise foi criado para empresas e organizações que precisam de máxima flexibilidade e personalização.",
      },
      { property: "og:title", content: "Plano Enterprise — EventPro" },
      {
        property: "og:description",
        content: "Preço sob consulta. Domínio próprio, integrações personalizadas e suporte dedicado 24/7.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PlanoEnterprisePage,
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

export function PlanoEnterprisePage() {
  // Modal state for Enterprise consultation / proposal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    email: "",
    telefone: "",
    participantes: "Mais de 2.000",
    mensagem: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome.trim() || !formData.email.trim() || !formData.telefone.trim()) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const novaOrgId = uid();
        update(
          formData.nome,
          `Solicitou proposta para o plano Enterprise (${formData.empresa || "Grande Organização"})`,
          (d) => {
            d.orgs.unshift({
              id: novaOrgId,
              nome: (formData.empresa || formData.nome) + " [Enterprise]",
              admin: formData.nome,
              email: formData.email,
              senha: "1234",
              plano: "Enterprise",
              data: new Date().toLocaleDateString("pt-PT"),
              status: "Pendente",
              eventos: [
                {
                  id: uid(),
                  nome: "Grande Cimeira Internacional",
                  data: "10 - 14 Março 2026",
                  hora: "08:00 - 19:00",
                  local: "Centro de Conferências de Luanda",
                  cidade: "Luanda, Angola",
                  descricao:
                    "Evento de grande escala com domínio próprio, suporte 24/7 e consultoria especializada.",
                  status: "Rascunho",
                  preco: 50000,
                  participantes: [],
                },
              ],
            });
          }
        );
      } catch (err) {
        console.error("Erro ao registar na demo store:", err);
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Solicitação Enterprise enviada com sucesso!");
    }, 600);
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        nome: "",
        empresa: "",
        email: "",
        telefone: "",
        participantes: "Mais de 2.000",
        mensagem: "",
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
        {/* Ambient glow */}
        <div className="pointer-events-none absolute top-10 right-10 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[140px]" />
        <div className="pointer-events-none absolute -top-20 left-10 h-[400px] w-[400px] rounded-full bg-blue-500/15 blur-[120px]" />

        <div className="site-container relative z-10 grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          {/* Left Column */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0084FF]">
              <Crown size={15} className="text-[#0084FF]" />
              <span>PLANO ENTERPRISE</span>
            </div>

            <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]">
              Soluções completas <br />
              <span className="text-[#0084FF]">para grandes eventos.</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              O plano Enterprise foi criado para empresas e organizações que precisam de máxima
              flexibilidade, personalização e suporte especializado. Transforme os seus eventos em
              experiências únicas, com a nossa plataforma de nível empresarial.
            </p>

            {/* 4 Feature Badges */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:items-center sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                  <Wrench size={19} />
                </div>
                <span className="text-xs font-semibold text-slate-200">
                  Personalização total <br />
                  do evento
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                  <Cloud size={19} />
                </div>
                <span className="text-xs font-semibold text-slate-200">
                  Escalabilidade <br />
                  ilimitada
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                  <Headset size={19} />
                </div>
                <span className="text-xs font-semibold text-slate-200">
                  Suporte dedicado <br />
                  24/7
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                  <Users size={19} />
                </div>
                <span className="text-xs font-semibold text-slate-200">
                  Consultoria <br />
                  especializada
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Price Card */}
          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="relative rounded-2xl border-2 border-[#0070F3] bg-[#061023]/95 p-7 sm:p-8 shadow-[0_0_70px_rgba(0,112,243,0.4)] backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <Crown size={22} className="text-[#0084FF]" />
                <h2 className="text-2xl font-bold text-white">Enterprise</h2>
              </div>

              <div className="mt-4">
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  Preço sob consulta
                </div>
              </div>

              {/* Checklist */}
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2.5 text-xs text-slate-200">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Check size={11} strokeWidth={3} />
                  </div>
                  <span>Tudo do plano Profissional +</span>
                </li>
                <li className="flex items-center gap-2.5 text-xs text-slate-200">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Check size={11} strokeWidth={3} />
                  </div>
                  <span>Domínio próprio (ex.: seuevento.com)</span>
                </li>
                <li className="flex items-center gap-2.5 text-xs text-slate-200">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Check size={11} strokeWidth={3} />
                  </div>
                  <span>Mais participantes</span>
                </li>
                <li className="flex items-center gap-2.5 text-xs text-slate-200">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Check size={11} strokeWidth={3} />
                  </div>
                  <span>Integrações personalizadas</span>
                </li>
                <li className="flex items-center gap-2.5 text-xs text-slate-200">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Check size={11} strokeWidth={3} />
                  </div>
                  <span>Suporte dedicado 24/7</span>
                </li>
                <li className="flex items-center gap-2.5 text-xs text-slate-200">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Check size={11} strokeWidth={3} />
                  </div>
                  <span>Consultoria especializada</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0080FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-[#0070e0] active:scale-[0.99] cursor-pointer"
              >
                <Send size={16} /> Falar com a equipa <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: "O QUE TORNA O ENTERPRISE ÚNICO" */}
      <section className="relative border-t border-slate-800/80 py-16 lg:py-24">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Left info */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0084FF]">
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#0084FF]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0084FF]" />
              </span>
              <span>O QUE TORNA O ENTERPRISE ÚNICO</span>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl leading-[1.15]">
              Funcionalidades avançadas <br />
              para o <span className="text-[#0084FF]">seu evento.</span>
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-slate-300 sm:text-base">
              Mais do que uma plataforma, o plano Enterprise é uma parceria estratégica para o
              sucesso do seu evento.
            </p>
          </div>

          {/* Right items - 6 cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* 1. Domínio próprio */}
            <div className="rounded-xl border border-slate-800/70 bg-[#060e20] p-4 transition-all hover:border-blue-500/40">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                <Globe size={19} />
              </div>
              <h3 className="mt-3.5 text-sm font-bold text-white">Domínio próprio</h3>
              <p className="mt-1 text-xs text-slate-400">
                Use o seu próprio domínio (ex.: seuevento.com).
              </p>
            </div>

            {/* 2. Mais participantes */}
            <div className="rounded-xl border border-slate-800/70 bg-[#060e20] p-4 transition-all hover:border-blue-500/40">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                <Users size={19} />
              </div>
              <h3 className="mt-3.5 text-sm font-bold text-white">Mais participantes</h3>
              <p className="mt-1 text-xs text-slate-400">
                Capacidade ampliada para grandes audiências.
              </p>
            </div>

            {/* 3. Integrações personalizadas */}
            <div className="rounded-xl border border-slate-800/70 bg-[#060e20] p-4 transition-all hover:border-blue-500/40">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                <Puzzle size={19} />
              </div>
              <h3 className="mt-3.5 text-sm font-bold text-white">Integrações personalizadas</h3>
              <p className="mt-1 text-xs text-slate-400">
                Conecte com os seus sistemas e ferramentas.
              </p>
            </div>

            {/* 4. Suporte dedicado 24/7 */}
            <div className="rounded-xl border border-slate-800/70 bg-[#060e20] p-4 transition-all hover:border-blue-500/40">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                <Headset size={19} />
              </div>
              <h3 className="mt-3.5 text-sm font-bold text-white">Suporte dedicado 24/7</h3>
              <p className="mt-1 text-xs text-slate-400">
                Acompanhamento contínuo em todas as fases.
              </p>
            </div>

            {/* 5. Consultoria especializada */}
            <div className="rounded-xl border border-slate-800/70 bg-[#060e20] p-4 transition-all hover:border-blue-500/40">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                <UserCheck size={19} />
              </div>
              <h3 className="mt-3.5 text-sm font-bold text-white">Consultoria especializada</h3>
              <p className="mt-1 text-xs text-slate-400">
                Planeamento e orientação com especialistas.
              </p>
            </div>

            {/* 6. Relatórios e análises avançadas */}
            <div className="rounded-xl border border-slate-800/70 bg-[#060e20] p-4 transition-all hover:border-blue-500/40">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/70 text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                <BarChart3 size={19} />
              </div>
              <h3 className="mt-3.5 text-sm font-bold text-white">
                Relatórios e análises avançadas
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Dados completos para tomar melhores decisões.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: "EVENTOS DE SUCESSO COM O ENTERPRISE" */}
      <section className="relative border-t border-slate-800/80 py-16 lg:py-24 bg-[#030816]/50">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-14">
          {/* Left Intro */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0084FF]">
              <Sparkles size={14} className="text-[#0084FF]" />
              <span>EVENTOS DE SUCESSO COM O ENTERPRISE</span>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl leading-[1.15]">
              Grandes ideias, <br />
              grandes <span className="text-[#0084FF]">resultados.</span>
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-slate-300">
              Empresas, governos e organizações de referência já confiam no EventPro para realizar
              eventos de grande escala, com total personalização e suporte especializado.
            </p>

            <Link
              to="/exemplos"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#0080FF] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[#0070e0]"
            >
              Ver mais exemplos <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right Grid of 4 Events */}
          <div>
            <div className="flex justify-end mb-4">
              <Link
                to="/exemplos"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0084FF] hover:text-blue-300 transition-colors"
              >
                Ver mais exemplos <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Event 1 */}
              <div className="group overflow-hidden rounded-xl border border-slate-800 bg-[#060e20] transition-all hover:border-blue-500/50">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={stageImage}
                    alt="Congresso Internacional 2026"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] via-transparent to-transparent" />
                </div>
                <div className="p-3.5">
                  <h3 className="text-xs font-bold text-white line-clamp-1">
                    Congresso Internacional 2026
                  </h3>
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                    <MapPin size={10} /> Luanda, Angola
                  </div>
                  <div className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-400">
                    <Calendar size={10} /> 10 – 14 Março 2026
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    <span className="rounded bg-blue-950/80 border border-blue-800/50 px-1.5 py-0.5 text-[8px] font-semibold text-blue-300">
                      Corporativo
                    </span>
                    <span className="rounded bg-blue-950/80 border border-blue-800/50 px-1.5 py-0.5 text-[8px] font-semibold text-blue-300">
                      Internacional
                    </span>
                    <span className="rounded bg-blue-950/80 border border-blue-800/50 px-1.5 py-0.5 text-[8px] font-semibold text-blue-300">
                      +1
                    </span>
                  </div>
                </div>
              </div>

              {/* Event 2 */}
              <div className="group overflow-hidden rounded-xl border border-slate-800 bg-[#060e20] transition-all hover:border-blue-500/50">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={heroImage}
                    alt="Fórum de Investimentos"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] via-transparent to-transparent" />
                </div>
                <div className="p-3.5">
                  <h3 className="text-xs font-bold text-white line-clamp-1">
                    Fórum de Investimentos
                  </h3>
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                    <MapPin size={10} /> Luanda, Angola
                  </div>
                  <div className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-400">
                    <Calendar size={10} /> 20 – 22 Maio 2026
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    <span className="rounded bg-blue-950/80 border border-blue-800/50 px-1.5 py-0.5 text-[8px] font-semibold text-blue-300">
                      Negócios
                    </span>
                    <span className="rounded bg-blue-950/80 border border-blue-800/50 px-1.5 py-0.5 text-[8px] font-semibold text-blue-300">
                      Financeiro
                    </span>
                    <span className="rounded bg-blue-950/80 border border-blue-800/50 px-1.5 py-0.5 text-[8px] font-semibold text-blue-300">
                      +1
                    </span>
                  </div>
                </div>
              </div>

              {/* Event 3 */}
              <div className="group overflow-hidden rounded-xl border border-slate-800 bg-[#060e20] transition-all hover:border-blue-500/50">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={presencialImage}
                    alt="Feira de Negócios e Exposições"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] via-transparent to-transparent" />
                </div>
                <div className="p-3.5">
                  <h3 className="text-xs font-bold text-white line-clamp-1">
                    Feira de Negócios e Exposições
                  </h3>
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                    <MapPin size={10} /> Talatona, Luanda
                  </div>
                  <div className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-400">
                    <Calendar size={10} /> 05 – 08 Setembro 2026
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    <span className="rounded bg-blue-950/80 border border-blue-800/50 px-1.5 py-0.5 text-[8px] font-semibold text-blue-300">
                      Exposição
                    </span>
                    <span className="rounded bg-blue-950/80 border border-blue-800/50 px-1.5 py-0.5 text-[8px] font-semibold text-blue-300">
                      Networking
                    </span>
                    <span className="rounded bg-blue-950/80 border border-blue-800/50 px-1.5 py-0.5 text-[8px] font-semibold text-blue-300">
                      +1
                    </span>
                  </div>
                </div>
              </div>

              {/* Event 4 */}
              <div className="group overflow-hidden rounded-xl border border-slate-800 bg-[#060e20] transition-all hover:border-blue-500/50">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={virtualImage}
                    alt="Gala Empresarial"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] via-transparent to-transparent" />
                </div>
                <div className="p-3.5">
                  <h3 className="text-xs font-bold text-white line-clamp-1">Gala Empresarial</h3>
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                    <MapPin size={10} /> Luanda, Angola
                  </div>
                  <div className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-400">
                    <Calendar size={10} /> 15 Novembro 2026
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    <span className="rounded bg-blue-950/80 border border-blue-800/50 px-1.5 py-0.5 text-[8px] font-semibold text-blue-300">
                      Gala
                    </span>
                    <span className="rounded bg-blue-950/80 border border-blue-800/50 px-1.5 py-0.5 text-[8px] font-semibold text-blue-300">
                      Networking
                    </span>
                    <span className="rounded bg-blue-950/80 border border-blue-800/50 px-1.5 py-0.5 text-[8px] font-semibold text-blue-300">
                      +1
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: "POR QUE ESCOLHER O ENTERPRISE" */}
      <section className="relative border-t border-slate-800/80 py-16 lg:py-24">
        <div className="site-container grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-14 items-center">
          {/* Left: Operations Center Photo */}
          <div className="relative overflow-hidden rounded-2xl border border-blue-900/50 shadow-2xl">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#030a1c]">
              <img
                src={hibridoImage}
                alt="Centro de Operações EventPro"
                className="h-full w-full object-cover filter brightness-[0.6] contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#020612]/90 via-blue-950/30 to-transparent" />

              {/* Data overlay badge simulating 24/7 command center */}
              <div className="absolute top-4 left-4 flex items-center gap-2 rounded-lg border border-blue-500/40 bg-slate-900/80 px-3 py-1.5 text-[11px] font-semibold text-blue-400 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>NOC & Monitorização 24/7 Ativa</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-slate-800/80 bg-[#050e24]/90 p-3.5 backdrop-blur-md">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-base font-extrabold text-white">99.99%</div>
                    <div className="text-[10px] text-slate-400">SLA de Uptime</div>
                  </div>
                  <div className="border-x border-slate-700/60">
                    <div className="text-base font-extrabold text-[#0084FF]">24/7</div>
                    <div className="text-[10px] text-slate-400">Suporte Dedicado</div>
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-emerald-400">&lt; 15 min</div>
                    <div className="text-[10px] text-slate-400">Tempo de Resposta</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Info */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0084FF]">
              <ShieldCheck size={15} className="text-[#0084FF]" />
              <span>POR QUE ESCOLHER O ENTERPRISE</span>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-[2.6rem] leading-[1.12]">
              A plataforma ideal <br />
              para os <span className="text-[#0084FF]">seus maiores desafios.</span>
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-slate-300">
              Com o plano Enterprise, você tem liberdade para criar, personalizar e escalar eventos
              de qualquer tamanho, com o suporte de uma equipa especializada e tecnologia de ponta.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-blue-500/40 bg-blue-950/70 text-[#0084FF]">
                  <Sliders size={18} />
                </div>
                <span className="text-xs font-semibold text-slate-200">
                  Flexibilidade total na personalização
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-blue-500/40 bg-blue-950/70 text-[#0084FF]">
                  <UserCheck size={18} />
                </div>
                <span className="text-xs font-semibold text-slate-200">
                  Suporte e consultoria especializada
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-blue-500/40 bg-blue-950/70 text-[#0084FF]">
                  <Puzzle size={18} />
                </div>
                <span className="text-xs font-semibold text-slate-200">
                  Integrações com sistemas externos
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-blue-500/40 bg-blue-950/70 text-[#0084FF]">
                  <ShieldCheck size={18} />
                </div>
                <span className="text-xs font-semibold text-slate-200">
                  Segurança e confiabilidade
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Section: Testimonial (Left) + CTA (Right) */}
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
                  “O EventPro superou todas as nossas expectativas. A plataforma é robusta, o
                  suporte é incrível e a personalização do nosso evento foi exatamente como
                  precisávamos.”
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 pl-16">
                <img
                  src={carlosImage}
                  alt="Rafael Mendes"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500/40"
                />
                <div>
                  <div className="font-bold text-white text-xs sm:text-sm">Rafael Mendes</div>
                  <div className="text-[11px] text-slate-400">
                    Diretor de Eventos — Grupo Empresarial
                  </div>
                </div>
              </div>
            </div>

            {/* Right: CTA Box */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-blue-900/50 bg-gradient-to-r from-[#040e26] via-[#071536] to-[#05112a] p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-blue-500/40 bg-blue-950/80 text-[#0084FF]">
                  <Handshake size={24} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white">
                    Pronto para criar um evento à altura da sua marca?
                  </h3>
                  <p className="mt-1 text-xs text-slate-300">
                    Fale com a nossa equipa e descubra como o plano Enterprise pode transformar o
                    seu próximo evento.
                  </p>
                </div>
              </div>

              <div className="mt-6 pl-16">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 rounded-lg bg-[#0080FF] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-[#0070e0] cursor-pointer active:scale-95"
                >
                  Falar com a equipa <ArrowRight size={15} />
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

      {/* ENTERPRISE PROPOSAL / CONTACT MODAL */}
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
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Product Header */}
                <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                  <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-none overflow-hidden rounded-xl border border-blue-500/40 shadow-md">
                    <img
                      src={stageImage}
                      alt="EXTENSÃO LOVEABLE PRO - Enterprise"
                      className="h-full w-full object-cover filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-blue-600/10" />
                  </div>
                  <div>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#0084FF]">
                      Solução Corporativa
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-white">
                      EXTENSÃO LOVEABLE PRO (Enterprise)
                    </h3>
                    <div className="mt-0.5 text-sm sm:text-base font-black text-[#0084FF]">
                      Preço sob consulta
                    </div>
                  </div>
                </div>

                {/* Form Header */}
                <div>
                  <h4 className="text-sm font-bold text-white">Falar com a equipa Enterprise</h4>
                  <p className="text-xs text-slate-400">
                    Preencha os seus dados para receber uma proposta personalizada.
                  </p>
                </div>

                {/* Fields */}
                <div className="space-y-3">
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
                      className="mt-1 w-full rounded-lg border border-slate-700/80 bg-slate-900/90 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all focus:border-[#0080FF] focus:ring-1 focus:ring-[#0080FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300">
                      Nome da Empresa / Organização
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Grupo Sonangol, Banco BAI, etc."
                      value={formData.empresa}
                      onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-700/80 bg-slate-900/90 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all focus:border-[#0080FF] focus:ring-1 focus:ring-[#0080FF]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300">
                        E-mail corporativo
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="seu.email@empresa.ao"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-slate-700/80 bg-slate-900/90 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all focus:border-[#0080FF] focus:ring-1 focus:ring-[#0080FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300">
                        Número de telefone
                      </label>
                      <div className="mt-1 flex rounded-lg border border-slate-700/80 bg-slate-900/90 overflow-hidden focus-within:border-[#0080FF]">
                        <div className="flex items-center border-r border-slate-700 bg-slate-800/70 px-2 py-2 text-xs font-bold text-slate-200">
                          +244
                        </div>
                        <input
                          type="tel"
                          required
                          placeholder="923 000 000"
                          value={formData.telefone}
                          onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                          className="w-full bg-transparent px-2.5 py-2 text-xs text-white placeholder-slate-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300">
                      Estimativa de participantes
                    </label>
                    <select
                      value={formData.participantes}
                      onChange={(e) => setFormData({ ...formData, participantes: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-700/80 bg-slate-900/90 px-3.5 py-2 text-xs text-white outline-none focus:border-[#0080FF]"
                    >
                      <option value="1.000 a 3.000 participantes">1.000 a 3.000 participantes</option>
                      <option value="3.000 a 10.000 participantes">3.000 a 10.000 participantes</option>
                      <option value="Mais de 10.000 participantes">Mais de 10.000 participantes</option>
                      <option value="Múltiplos eventos contínuos">Múltiplos eventos contínuos</option>
                    </select>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-[#0080FF] py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-[#0070e0] active:scale-[0.99] cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
                >
                  {isSubmitting ? (
                    <span>Enviando solicitação...</span>
                  ) : (
                    <>
                      <span>Solicitar Proposta Enterprise</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <p className="text-center text-[10.5px] leading-relaxed text-slate-400">
                  Após o envio, a nossa equipa de consultores Enterprise entrará em contacto de
                  imediato por e-mail e telefone para apresentar a proposta e ativar os acessos do
                  admin do EventPro.
                </p>
              </form>
            ) : (
              /* Success state */
              <div className="py-4 text-center space-y-5 animate-in fade-in duration-300">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/15 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.25)]">
                  <CheckCircle2 size={36} />
                </div>

                <div>
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    Solicitação Registada
                  </span>
                  <h3 className="mt-1 text-xl sm:text-2xl font-black text-white">
                    Proposta Solicitada com Sucesso!
                  </h3>
                  <p className="mt-2 text-xs text-slate-300">
                    Obrigado, <strong>{formData.nome}</strong>. A sua solicitação para o plano{" "}
                    <strong>Enterprise ({formData.empresa})</strong> foi registada com prioridade
                    máxima.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-[#040914] p-4 text-left space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Empresa:</span>
                    <span className="font-bold text-white">{formData.empresa}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Plano:</span>
                    <span className="font-bold text-[#0084FF]">Enterprise (Personalizado)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Estimativa:</span>
                    <span className="text-white">{formData.participantes}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-400">E-mail corporativo:</span>
                    <span className="font-bold text-white">{formData.email}</span>
                  </div>
                </div>

                <div className="rounded-xl border border-blue-500/30 bg-blue-950/30 p-4 text-xs leading-relaxed text-slate-200">
                  <p className="font-medium">
                    📌 <strong>Próximo passo:</strong> Um consultor Enterprise sênior entrará em
                    contacto nas próximas horas para validar o escopo técnico (domínio próprio, SLA
                    24/7 e integrações) e encaminhar as credenciais de acesso para a sua equipa.
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
