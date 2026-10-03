import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Cast,
  CheckCircle2,
  ChevronRight,
  Globe2,
  Headphones,
  Laptop,
  Lock,
  MessageSquare,
  MonitorCheck,
  MonitorPlay,
  Play,
  Radio,
  Share2,
  Shield,
  Sparkles,
  Tv,
  Users2,
  Video,
  Wifi,
  Zap,
} from "lucide-react";

import virtualHero from "@/assets/event-virtual.jpg";
import martaImage from "@/assets/team-marta.jpg";

export const Route = createFileRoute("/eventos/virtuais")({
  head: () => ({
    meta: [
      { title: "Eventos Virtuais — EventPro" },
      {
        name: "description",
        content:
          "Conecte pessoas de qualquer lugar do mundo com streaming HD/4K de baixa latência, salas de networking virtual, chat moderado e enquetes ao vivo.",
      },
      { property: "og:title", content: "Eventos Virtuais — Plataforma Global EventPro" },
      {
        property: "og:description",
        content: "Transmissões completas e seguras para webinars, conferências mundiais e academias digitais.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: EventosVirtuaisPage,
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

export function EventosVirtuaisPage() {
  const publicoAlvo = [
    {
      icon: Globe2,
      title: "Multinacionais & ONGs",
      desc: "Assembleias globais, convenções com tradução simultânea e encontros internacionais com delegações de vários países.",
    },
    {
      icon: Laptop,
      title: "Startups & Empresas Tech",
      desc: "Lançamento de produtos SaaS, hackathons mundiais, demo days com investidores e webinars de captação de clientes.",
    },
    {
      icon: Tv,
      title: "Academias & Treinamentos",
      desc: "Masterclasses, certificações corporativas e congressos digitais com controle individual de presença e emissão de certificados.",
    },
    {
      icon: Users2,
      title: "Comunidades & Associações",
      desc: "Encontros de membros dispersos geograficamente com salas temáticas (breakout rooms) e networking interativo.",
    },
  ];

  const funcionalidades = [
    {
      icon: Radio,
      title: "Streaming 4K / HD de Baixa Latência",
      desc: "Transmita com delay inferior a 1 segundo para milhares de pessoas simultaneamente com suporte a múltiplas faixas de áudio e tradução.",
      badge: "Ultra HD",
    },
    {
      icon: MessageSquare,
      title: "Chat Moderado, Q&A e Enquetes ao Vivo",
      desc: "Engajamento total com perguntas votadas pelo público, enquetes dinâmicas exibidas na tela e moderação ativa de comentários.",
      badge: "Interativo",
    },
    {
      icon: Users2,
      title: "Speed Networking & Breakout Rooms",
      desc: "Salas de bate-papo em vídeo de curta duração estilo matchmaking empresarial para conectar participantes com interesses em comum.",
      badge: "Networking",
    },
    {
      icon: Lock,
      title: "Segurança Antifraude & Link Único",
      desc: "Proteção DRM contra gravação ilegal e links de acesso criptografados de uso único, impedindo compartilhamento de login.",
      badge: "DRM Seguro",
    },
    {
      icon: MonitorPlay,
      title: "Gravação Automática na Nuvem (On-Demand)",
      desc: "Gere a gravação completa logo após o término do evento e disponibilize aos inscritos com controle de prazo de expiração.",
      badge: "On-Demand",
    },
    {
      icon: BarChart3,
      title: "Analytics de Retenção e Engajamento",
      desc: "Saiba exatamente quanto tempo cada participante assistiu, em quais palestras teve pico de audiência e as dúvidas mais frequentes.",
      badge: "Métricas Reais",
    },
  ];

  const passos = [
    {
      step: "01",
      title: "Configure o Seu Auditório Virtual",
      desc: "Defina os palestrantes, programe as sessões e escolha se a transmissão será via EventPro Studio, OBS, Zoom ou RTMP.",
    },
    {
      step: "02",
      title: "Inscrição com Link Pessoal e Intransferível",
      desc: "Cada participante recebe um link de acesso exclusivo direto no seu e-mail, sem necessidade de baixar softwares pesados.",
    },
    {
      step: "03",
      title: "Transmissão Interativa com Enquetes ao Vivo",
      desc: "Durante a transmissão, ative enquetes, receba perguntas em tempo real e incentive o networking nas salas virtuais.",
    },
    {
      step: "04",
      title: "Disponibilização On-Demand e Exportação de Leads",
      desc: "Finalize o evento, entregue o replay aos participantes e exporte a base de leads qualificados com tempo de visualização.",
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
            <Link to="/eventos/presenciais" className="hover:text-white transition-colors">
              Presenciais
            </Link>
            <div className="relative py-1">
              <span className="text-[#0084FF] font-bold">Virtuais</span>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0084FF] rounded-full" />
            </div>
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
        <div className="pointer-events-none absolute -top-20 right-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[140px]" />

        <div className="site-container relative z-10 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-950/70 px-3.5 py-1 text-xs font-bold text-[#0084FF]">
              <MonitorPlay size={14} />
              <span>SOLUÇÃO PARA EVENTOS VIRTUAIS</span>
            </div>

            <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[3.5rem] tracking-tight">
              Conecte pessoas de qualquer lugar <br />
              <span className="text-[#0084FF]">do mundo, sem limites.</span>
            </h1>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-300 max-w-xl">
              Crie transmissões ao vivo em alta definição com baixa latência, salas de networking
              interativas, chat moderado e total proteção antifraude para a sua audiência global.
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
                Ver Exemplo de Evento
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-800/80 pt-6">
              <div>
                <div className="text-2xl font-extrabold text-white">4K / HD</div>
                <div className="text-xs text-slate-400">Qualidade de vídeo</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#0084FF]">&lt; 1 seg</div>
                <div className="text-xs text-slate-400">Latência de streaming</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-emerald-400">+50.000</div>
                <div className="text-xs text-slate-400">Acessos simultâneos</div>
              </div>
            </div>
          </div>

          {/* Right: Visual Showcase */}
          <div className="relative">
            <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border-2 border-blue-500/40 shadow-[0_0_50px_rgba(0,112,243,0.3)]">
              <img
                src={virtualHero}
                alt="Transmissão de evento virtual ao vivo com múltiplos ecrãs"
                className="h-full w-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#01040f] via-transparent to-transparent" />

              {/* Floating live indicator card */}
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-slate-700/80 bg-[#040e24]/90 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-3 w-3 rounded-full bg-red-500 animate-ping" />
                    <div>
                      <div className="text-xs font-bold text-white">Transmissão em Direto</div>
                      <div className="text-[11px] text-slate-400">Cimeira Digital Internacional</div>
                    </div>
                  </div>
                  <span className="rounded bg-blue-600/30 px-2 py-1 text-[10px] font-bold text-[#0084FF] border border-blue-500/40">
                    2.840 online
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
              Perfeito para organizações que desejam expandir o seu alcance além das fronteiras físicas.
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
              TECNOLOGIA DE STREAMING
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Recursos de estúdio no seu navegador
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Muito além de uma chamada de vídeo comum: uma emissão de televisão profissional com a sua marca.
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
              FLUXO OPERACIONAL
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Como colocar no ar em 4 passos simples
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Sem necessidade de equipas gigantescas de engenharia: controlo centralizado e intuitivo.
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
                  “Transmitimos a nossa Cimeira Tecnológica para participantes em 14 países
                  simultaneamente com qualidade 4K cristalina e sem nenhuma instabilidade. O
                  sistema de perguntas moderadas e as salas de networking virtual foram os pontos
                  mais elogiados por todos os inscritos.”
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={martaImage}
                    alt="Marta Silva"
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-blue-500/40"
                  />
                  <div>
                    <div className="text-sm font-bold text-white">Marta Silva</div>
                    <div className="text-xs text-slate-400">
                      Chief Operating Officer — Global EdTech Summit
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
              Pronto para criar uma experiência virtual inesquecível?
            </h2>
            <p className="mt-3 text-sm text-slate-300 max-w-xl mx-auto">
              Descubra os nossos planos com streaming ilimitado, suporte técnico e relatórios
              completos de retenção.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/planos"
                className="flex items-center gap-2 rounded-xl bg-[#0080FF] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-[#0070e0] transition-all"
              >
                Ver Planos & Preços <ArrowRight size={16} />
              </Link>
              <Link
                to="/contactos"
                className="rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white"
              >
                Solicitar Demonstração
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
