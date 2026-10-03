import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Calendar,
  Cast,
  CheckCircle2,
  ChevronRight,
  Globe,
  Handshake,
  Layers,
  Laptop,
  Maximize2,
  MessageSquare,
  MonitorCheck,
  QrCode,
  Radio,
  Share2,
  ShieldCheck,
  Sparkles,
  Ticket,
  Tv,
  Users,
  Video,
  Zap,
} from "lucide-react";

import hybridHero from "@/assets/event-hibrido.jpg";
import patriciaImage from "@/assets/team-patricia.jpg";

export const Route = createFileRoute("/eventos/hibridos")({
  head: () => ({
    meta: [
      { title: "Eventos Híbridos — EventPro" },
      {
        name: "description",
        content:
          "Una o melhor dos dois mundos: presencial e virtual. Sincronização em tempo real, votações unificadas, bilhética dual e transmissão integrada.",
      },
      { property: "og:title", content: "Eventos Híbridos — EventPro" },
      {
        property: "og:description",
        content: "A solução completa para conectar o público no local aos participantes em qualquer parte do planeta.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: EventosHibridosPage,
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

export function EventosHibridosPage() {
  const publicoAlvo = [
    {
      icon: Building2,
      title: "Grandes Fóruns & Cúpulas",
      desc: "Eventos governamentais e fóruns económicos com líderes de Estado e oradores internacionais que participam física ou remotamente.",
    },
    {
      icon: Globe,
      title: "Congressos Médicos & Científicos",
      desc: "Simpósios com cirurgias ou demonstrações ao vivo onde médicos de várias províncias ou países debatem em tempo real com o auditório.",
    },
    {
      icon: Handshake,
      title: "Feiras de Negócios & Exposições",
      desc: "Espaços físicos de exposição com stands virtuais complementares, permitindo visitas no local e reuniões remotas com investidores.",
    },
    {
      icon: Users,
      title: "Grandes Produtoras de Eventos",
      desc: "Agências que precisam maximizar a receita vendendo ingressos presenciais VIP mais caros e ingressos digitais escaláveis em massa.",
    },
  ];

  const funcionalidades = [
    {
      icon: Layers,
      title: "Sincronização ao Vivo (Físico & Digital)",
      desc: "A transmissão do palco chega à plataforma virtual em milissegundos, permitindo que oradores e o público no local interajam com quem está em casa sem delay.",
      badge: "Delay Zero",
    },
    {
      icon: MessageSquare,
      title: "Q&A e Votações Unificadas",
      desc: "Perguntas de quem está na cadeira do auditório e de quem está assistindo online aparecem juntas na tela do mediador em tempo real.",
      badge: "Interação Total",
    },
    {
      icon: Ticket,
      title: "Bilhética Dual com Lotes Mistos",
      desc: "Venda ingressos presenciais com seleção de lugares numerados e ingressos virtuais com acesso ilimitado na mesma página de checkout.",
      badge: "Receita Dobrada",
    },
    {
      icon: Tv,
      title: "Palestrantes Remotos no Telão do Palco",
      desc: "Traga especialistas internacionais direto para os painéis de LED do seu palco com áudio de estúdio sem precisar pagar viagens dispendiosas.",
      badge: "Telepresença",
    },
    {
      icon: QrCode,
      title: "Networking Híbrido Físico-Digital",
      desc: "Participantes presenciais e virtuais podem agendar reuniões bilaterais de 15 minutos em salas virtuais ou mesas reservadas no local.",
      badge: "Matchmaking",
    },
    {
      icon: BarChart3,
      title: "Painel de Comando Integrado",
      desc: "Acompanhe numa única tela os acessos na catraca física e os espectadores simultâneos na transmissão virtual com gráficos unificados.",
      badge: "Controlo 360°",
    },
  ];

  const passos = [
    {
      step: "01",
      title: "Defina a Lotação Física e Abra o Streaming",
      desc: "Defina o número exato de assentos disponíveis no local e configure a transmissão em direto com vagas ilimitadas para o público remoto.",
    },
    {
      step: "02",
      title: "Checkout Único com Opções Presencial e Virtual",
      desc: "O participante escolhe se quer viver a experiência presencial com credencial física ou assistir online com o seu link de acesso seguro.",
    },
    {
      step: "03",
      title: "No Dia: Operação Sincronizada",
      desc: "O check-in funciona na porta via QR Code enquanto a transmissão ao vivo entrega a experiência de palco com perguntas e chat integrados.",
    },
    {
      step: "04",
      title: "Relatório de Resultados Híbridos",
      desc: "Analise a taxa de comparência presencial versus a permanência no streaming e entregue relatórios consolidados aos patrocinadores.",
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
            <Link to="/eventos/virtuais" className="hover:text-white transition-colors">
              Virtuais
            </Link>
            <div className="relative py-1">
              <span className="text-[#0084FF] font-bold">Híbridos</span>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0084FF] rounded-full" />
            </div>
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
        <div className="pointer-events-none absolute -top-20 left-1/3 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[140px]" />

        <div className="site-container relative z-10 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-950/70 px-3.5 py-1 text-xs font-bold text-[#0084FF]">
              <Layers size={14} />
              <span>SOLUÇÃO PARA EVENTOS HÍBRIDOS</span>
            </div>

            <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[3.5rem] tracking-tight">
              Una o melhor dos dois mundos: <br />
              <span className="text-[#0084FF]">presencial e virtual.</span>
            </h1>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-300 max-w-xl">
              Elimine as barreiras geográficas sem abrir mão do calor e do networking do contato
              físico. Proporcione uma experiência integrada e dinâmica onde todos os participantes se
              sentem no centro do evento.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/planos"
                className="flex items-center gap-2 rounded-xl bg-[#0080FF] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-[#0070e0] active:scale-95"
              >
                Criar Evento Híbrido <ArrowRight size={16} />
              </Link>
              <Link
                to="/evento"
                className="rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:border-slate-500 hover:text-white transition-colors"
              >
                Explorar Demonstração
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-800/80 pt-6">
              <div>
                <div className="text-2xl font-extrabold text-white">2x a 5x</div>
                <div className="text-xs text-slate-400">Aumento de audiência</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#0084FF]">100%</div>
                <div className="text-xs text-slate-400">Sincronizado</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-emerald-400">Central</div>
                <div className="text-xs text-slate-400">Comando único</div>
              </div>
            </div>
          </div>

          {/* Right: Visual Showcase */}
          <div className="relative">
            <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border-2 border-blue-500/40 shadow-[0_0_50px_rgba(0,112,243,0.3)]">
              <img
                src={hybridHero}
                alt="Evento híbrido conectando público presencial e transmissão internacional"
                className="h-full w-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#01040f] via-transparent to-transparent" />

              {/* Floating hybrid badge */}
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-slate-700/80 bg-[#040e24]/90 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/30 text-[#0084FF]">
                      <Layers size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Ecossistema Híbrido Ativo</div>
                      <div className="text-[11px] text-slate-400">1.200 no local · 3.450 online</div>
                    </div>
                  </div>
                  <span className="rounded bg-[#0080FF] px-2 py-1 text-[10px] font-bold text-white shadow-sm">
                    Sincronizado
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
              Para quem o modelo híbrido é essencial?
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              A melhor escolha para eventos que necessitam de presença física institucional aliada à escalabilidade do público remoto.
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
              RECURSOS HÍBRIDOS EXCLUSIVOS
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Engajamento unificado em tempo real
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Tecnologia desenvolvida especificamente para que o participante remoto nunca se sinta um mero espectador passivo.
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
              GUIA PRÁTICO DE EXECUÇÃO
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Como produzir o seu evento híbrido
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Passo a passo simplificado para conectar a infraestrutura física à nuvem do EventPro.
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
                  “A nossa Conferência de Energia em Luanda tinha um auditório limitado a 600
                  lugares VIP, mas alcançámos mais de 4.000 profissionais com a transmissão híbrida
                  da EventPro. As votações foram apresentadas no telão unificando os dois públicos,
                  gerando um impacto sem precedentes para os patrocinadores.”
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={patriciaImage}
                    alt="Eng.ª Patrícia Costa"
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-blue-500/40"
                  />
                  <div>
                    <div className="text-sm font-bold text-white">Eng.ª Patrícia Costa</div>
                    <div className="text-xs text-slate-400">
                      Coordenadora de Comunicação e Relações Institucionais — ExpoLuanda
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
              Pronto para multiplicar o alcance do seu evento?
            </h2>
            <p className="mt-3 text-sm text-slate-300 max-w-xl mx-auto">
              Realize eventos híbridos com tecnologia de padrão internacional e suporte dedicado da
              equipa EventPro.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/planos"
                className="flex items-center gap-2 rounded-xl bg-[#0080FF] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-[#0070e0] transition-all"
              >
                Conhecer Planos Híbridos <ArrowRight size={16} />
              </Link>
              <Link
                to="/contactos"
                className="rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white"
              >
                Falar com a Nossa Equipa
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
