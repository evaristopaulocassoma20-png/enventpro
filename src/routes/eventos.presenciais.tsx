import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Building,
  Calendar,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  FileCheck,
  Fingerprint,
  GraduationCap,
  Handshake,
  Layers,
  MapPin,
  Megaphone,
  MonitorCheck,
  Printer,
  QrCode,
  ScanLine,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Ticket,
  TrendingUp,
  UserCheck,
  UserRound,
  Users,
  Zap,
} from "lucide-react";

import inPersonHero from "@/assets/event-presencial.jpg";
import stageImage from "@/assets/sobre-stage.jpg";
import carlosImage from "@/assets/team-carlos.jpg";
import martaImage from "@/assets/team-marta.jpg";

export const Route = createFileRoute("/eventos/presenciais")({
  head: () => ({
    meta: [
      { title: "Eventos Presenciais — EventPro" },
      {
        name: "description",
        content:
          "Organize eventos no local com controlo de acesso rápido por QR Code, credenciamento instantâneo, gestão de lotação e pagamento físico.",
      },
      { property: "og:title", content: "Eventos Presenciais — Soluções Completas EventPro" },
      {
        property: "og:description",
        content: "Tecnologia de ponta para auditórios, feiras, congressos e galas presenciais.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: EventosPresenciaisPage,
});

function BrandMark() {
  return (
    <span className="brand-mark inline-flex items-center gap-1" aria-hidden="true">
      <span className="h-4 w-1.5 -skew-x-12 rounded-sm bg-[#0084FF]" />
      <span className="h-5 w-1.5 -skew-x-12 rounded-sm bg-[#0084FF]" />
      <span className="h-4 w-1.5 -skew-x-12 rounded-sm bg-[#0084FF]" />
    </span>
  );
}

export function EventosPresenciaisPage() {
  const publicoAlvo = [
    {
      icon: Building,
      title: "Empresas Corporativas",
      desc: "Conferências anuais, cimeiras empresariais, reuniões de acionistas e convenções de vendas com credenciamento VIP seguro.",
    },
    {
      icon: Megaphone,
      title: "Produtoras & Agências",
      desc: "Gestão impecável de grandes audiências, feiras de negócios, festivais e galas com controlo de bilhetes antifraude.",
    },
    {
      icon: UserCheck,
      title: "Gestores de Eventos",
      desc: "Autonomia total para criar setores, bilhetes com lotação controlada, gerir equipas de receção e acompanhar métricas em tempo real.",
    },
    {
      icon: GraduationCap,
      title: "Universidades & Congressos",
      desc: "Seminários científicos, jornadas académicas e formações com emissão e validação imediata de certificados no local.",
    },
  ];

  const funcionalidades = [
    {
      icon: QrCode,
      title: "Check-in Ultra-Rápido por QR Code",
      desc: "Validação em menos de 1,5 segundos por participante com leitura rápida pelo smartphone ou leitor dedicado, eliminando filas na receção.",
      badge: "Zero Filas",
    },
    {
      icon: Printer,
      title: "Credenciamento & Impressão no Local",
      desc: "Emissão e impressão térmica instantânea de crachás, credenciais personalizadas e pulseiras de acesso por setor no momento da entrada.",
      badge: "Instantâneo",
    },
    {
      icon: ShieldCheck,
      title: "Controlo de Acesso por Setores (Zonas)",
      desc: "Controle permissões para áreas VIP, salas técnicas, auditórios principais, bastidores e área de catering com bloqueio automático.",
      badge: "Alta Segurança",
    },
    {
      icon: CreditCard,
      title: "Bilhética Física & Pagamentos no Local",
      desc: "Venda de bilhetes de última hora na bilheteira física com integração Multicaixa (TPA), dinheiro e fatura imediata.",
      badge: "MultiCaixa",
    },
    {
      icon: ScanLine,
      title: "Lotação em Tempo Real & Alertas",
      desc: "Painel dinâmico que monitoriza a capacidade em tempo real dos auditórios para garantir o cumprimento das normas de segurança.",
      badge: "Tempo Real",
    },
    {
      icon: Handshake,
      title: "Lead Retrieval para Expositores",
      desc: "Expositores e patrocinadores escaneiam o QR code dos participantes para guardar contactos comerciais qualificados diretamente no app.",
      badge: "Networking",
    },
  ];

  const passos = [
    {
      step: "01",
      title: "Configure o Espaço e os Bilhetes",
      desc: "Cadastre o seu auditório, defina setores (VIP, Geral, Imprensa), determine a capacidade máxima e ative a venda online ou física.",
    },
    {
      step: "02",
      title: "Emissão de Ingressos com QR Criptografado",
      desc: "Os participantes recebem os seus ingressos por e-mail e SMS com QR code único, intransferível e à prova de falsificações.",
    },
    {
      step: "03",
      title: "No Dia do Evento: Credenciamento Fluido",
      desc: "A sua equipa de receção usa o aplicativo EventPro Check-in em múltiplos dispositivos sincronizados em nuvem para validar as entradas.",
    },
    {
      step: "04",
      title: "Relatórios de Afluência e Picos de Entrada",
      desc: "Aceda instantaneamente a estatísticas detalhadas de horários de pico, taxa de comparecimento e consumo por setor.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#01040f] text-slate-100 font-sans selection:bg-[#0080FF] selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#020614]/90 backdrop-blur-md">
        <div className="site-container flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5" aria-label="EventPro — início">
            <BrandMark />
            <span className="text-xl font-black text-white">
              Event<span className="text-[#0084FF]">Pro</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-xs font-semibold text-slate-300 lg:flex">
            <Link to="/" className="hover:text-white transition-colors">
              Início
            </Link>
            <div className="relative py-1">
              <span className="text-[#0084FF] font-bold">Presenciais</span>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0084FF] rounded-full" />
            </div>
            <Link to="/eventos/virtuais" className="hover:text-white transition-colors">
              Virtuais
            </Link>
            <Link to="/eventos/hibridos" className="hover:text-white transition-colors">
              Híbridos
            </Link>
            <Link to="/planos" className="hover:text-white transition-colors">
              Planos
            </Link>
            <Link to="/exemplos" className="hover:text-white transition-colors">
              Exemplos
            </Link>
            <Link to="/contactos" className="hover:text-white transition-colors">
              Contactos
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/login"
              className="rounded-lg border border-slate-700/80 px-4 py-2 text-xs font-semibold text-white hover:border-slate-500 hover:bg-slate-800/50 transition-colors"
            >
              Entrar
            </Link>
            <Link
              to="/planos"
              className="rounded-lg bg-[#0080FF] px-5 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-[#0070e0] transition-all"
            >
              Criar Evento
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
        <div className="pointer-events-none absolute -top-20 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[140px]" />

        <div className="site-container relative z-10 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-950/70 px-3.5 py-1 text-xs font-bold text-[#0084FF]">
              <UserRound size={14} />
              <span>SOLUÇÃO PARA EVENTOS PRESENCIAIS</span>
            </div>

            <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[3.5rem] tracking-tight">
              Organize eventos no local, com <br />
              <span className="text-[#0084FF]">controlo e elegância total.</span>
            </h1>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-300 max-w-xl">
              Do credenciamento ultra-rápido sem filas ao controlo de acessos por setor, fornecemos
              a infraestrutura tecnológica completa para fazer do seu congresso, feira ou gala um
              sucesso inquestionável.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/planos"
                className="flex items-center gap-2 rounded-xl bg-[#0080FF] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-[#0070e0] active:scale-95"
              >
                Começar Agora <ArrowRight size={16} />
              </Link>
              <Link
                to="/evento"
                className="rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:border-slate-500 hover:text-white transition-colors"
              >
                Ver Exemplo Real
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-800/80 pt-6">
              <div>
                <div className="text-2xl font-extrabold text-white">&lt; 1,5s</div>
                <div className="text-xs text-slate-400">Tempo de check-in</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#0084FF]">100%</div>
                <div className="text-xs text-slate-400">Antifraude QR Code</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-emerald-400">Off-line</div>
                <div className="text-xs text-slate-400">Modo de contingência</div>
              </div>
            </div>
          </div>

          {/* Right: Visual Showcase */}
          <div className="relative">
            <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border-2 border-blue-500/40 shadow-[0_0_50px_rgba(0,112,243,0.3)]">
              <img
                src={inPersonHero}
                alt="Evento presencial com plateia em auditório"
                className="h-full w-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#01040f] via-transparent to-transparent" />

              {/* Floating check-in status card */}
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-slate-700/80 bg-[#040e24]/90 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Check-in Concluído</div>
                      <div className="text-[11px] text-slate-400">Auditório Principal · Passe VIP</div>
                    </div>
                  </div>
                  <span className="rounded bg-emerald-500/20 px-2 py-1 text-[10px] font-bold text-emerald-300">
                    Acesso Permitido
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Para Quem é Indicado */}
      <section className="border-t border-slate-800/80 py-16 lg:py-24 bg-[#020716]/60">
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0084FF]">
              PERFIL DE UTILIZADORES
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Para quem foi desenvolvido?
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Ferramentas sob medida para garantir organização impecável em qualquer escala de evento no local.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {publicoAlvo.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-800 bg-[#040c1e] p-6 transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/40 bg-blue-950/70 text-[#0084FF]">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Funcionalidades Exclusivas */}
      <section className="border-t border-slate-800/80 py-16 lg:py-24">
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0084FF]">
              RECURSOS ESPECÍFICOS
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Tudo o que precisa no local do evento
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Elimine o stress do dia do evento com tecnologia ágil, robusta e pronta para contingência.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {funcionalidades.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="relative rounded-2xl border border-slate-800 bg-[#040e22] p-6 transition-all hover:border-blue-500/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/40 bg-blue-950/70 text-[#0084FF]">
                      <Icon size={22} />
                    </div>
                    <span className="rounded-full bg-blue-600/20 px-2.5 py-0.5 text-[10px] font-bold text-[#0084FF] border border-blue-500/30">
                      {f.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-bold text-white">{f.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Como Utilizar na Prática (Passo a Passo) */}
      <section className="border-t border-slate-800/80 py-16 lg:py-24 bg-[#020614]">
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0084FF]">
              COMO FUNCIONA NA PRÁTICA
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Do planeamento à porta de entrada
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Um fluxo de trabalho desenhado para a sua equipa operar com tranquilidade absoluta.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {passos.map((p) => (
              <div
                key={p.step}
                className="relative rounded-2xl border border-slate-800 bg-[#040c1e] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-black text-[#0084FF]/60 font-mono">{p.step}</div>
                  <h3 className="mt-3 text-sm font-bold text-white">{p.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{p.desc}</p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-[11px] font-semibold text-[#0084FF]">
                  <span>Fase {p.step}</span>
                  <ChevronRight size={13} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimento em Destaque */}
      <section className="border-t border-slate-800/80 py-16">
        <div className="site-container max-w-4xl mx-auto">
          <div className="rounded-2xl border border-blue-900/60 bg-gradient-to-r from-[#040e26] via-[#071536] to-[#05112a] p-8 sm:p-10 shadow-2xl">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-blue-600/30 text-[#0084FF] text-2xl font-serif font-black">
                “
              </div>
              <div>
                <p className="text-base sm:text-lg leading-relaxed text-slate-200">
                  “No nosso congresso presencial com mais de 3.000 participantes em Luanda, o
                  credenciamento foi feito em tempo recorde sem uma única fila no átrio. A
                  impressão imediata dos crachás com o nome e setor de cada convidado elevou a
                  perceção de qualidade da nossa organização.”
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={carlosImage}
                    alt="Dr. Carlos Mendes"
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-blue-500/40"
                  />
                  <div>
                    <div className="text-sm font-bold text-white">Dr. Carlos Mendes</div>
                    <div className="text-xs text-slate-400">
                      Diretor Executivo — Fórum Económico e de Investimentos
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="pb-16 lg:pb-24">
        <div className="site-container">
          <div className="rounded-2xl border border-blue-500/40 bg-[#040e24] p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-40 w-80 rounded-full bg-blue-600/20 blur-[80px]" />

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Pronto para elevar o nível do seu evento presencial?
            </h2>
            <p className="mt-3 text-sm text-slate-300 max-w-xl mx-auto">
              Crie a sua conta no EventPro, configure o seu evento em minutos e ofereça uma
              experiência inesquecível ao seu público.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/planos"
                className="flex items-center gap-2 rounded-xl bg-[#0080FF] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-[#0070e0] transition-all"
              >
                Escolher Meu Plano <ArrowRight size={16} />
              </Link>
              <Link
                to="/contactos"
                className="rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white"
              >
                Falar com Especialista
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
