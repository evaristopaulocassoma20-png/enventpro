import { useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  AlertTriangle,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Bell,
  Bold,
  Building,
  Building2,
  Calendar,
  CalendarClock,
  CalendarDays,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Copy,
  CreditCard,
  Download,
  ExternalLink,
  Eye,
  FileCheck,
  FileSpreadsheet,
  FileText,
  Filter,
  Globe,
  Handshake,
  HelpCircle,
  Image as ImageIcon,
  Italic,
  Laptop,
  Layers,
  Layout,
  LayoutDashboard,
  Link as LinkIcon,
  List,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Megaphone,
  MessageSquare,
  MonitorCheck,
  MoreVertical,
  Palette,
  Pencil,
  Plus,
  Printer,
  QrCode,
  RotateCcw,
  Save,
  ScanLine,
  Search,
  Send,
  Settings,
  Share2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Smartphone,
  Sparkles,
  Ticket,
  Trash2,
  TrendingUp,
  Tv,
  Upload,
  User,
  UserCheck,
  UserPlus,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { update, uid, type Evento, type Participante } from "@/lib/demo-store";

import heroImage from "@/assets/eventpro-hero.jpg";
import stageImage from "@/assets/sobre-stage.jpg";
import presencialImage from "@/assets/event-presencial.jpg";
import hibridoImage from "@/assets/event-hibrido.jpg";
import virtualImage from "@/assets/event-virtual.jpg";
import martaImage from "@/assets/team-marta.jpg";
import carlosImage from "@/assets/team-carlos.jpg";
import patriciaImage from "@/assets/team-patricia.jpg";
import evaristoImage from "@/assets/team-evaristo.jpg";

function BrandMark() {
  return (
    <span className="brand-mark inline-flex items-center gap-1" aria-hidden="true">
      <span className="h-4 w-1.5 -skew-x-12 rounded-sm bg-[#0084FF]" />
      <span className="h-5 w-1.5 -skew-x-12 rounded-sm bg-[#0084FF]" />
      <span className="h-4 w-1.5 -skew-x-12 rounded-sm bg-[#0084FF]" />
    </span>
  );
}

interface SpeakerItem {
  id: string;
  nome: string;
  cargo: string;
  tag: string;
  img: string;
}

interface SessionItem {
  id: string;
  hora: string;
  titulo: string;
  sala: string;
}

interface FaqItem {
  id: string;
  pergunta: string;
  resposta: string;
}

type SidebarView =
  | "editar-site"
  | "meus-eventos"
  | "criar-evento"
  | "participantes"
  | "bilhetes"
  | "check-in"
  | "patrocinadores"
  | "expositores"
  | "palestrantes"
  | "equipa"
  | "relatorios"
  | "configuracoes";

export function EventForm({
  orgId,
  ev,
  quem,
  onClose,
}: {
  orgId: string;
  ev: Evento | null;
  quem: string;
  onClose: () => void;
}) {
  // Navigation: Active View from Sidebar
  const [activeView, setActiveView] = useState<SidebarView>("editar-site");

  // User Profile Modal State
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Tabs inside "Editar Site do Evento": "geral", "design", "conteudo", "config"
  const [activeTab, setActiveTab] = useState<
    "geral" | "design" | "conteudo" | "config"
  >("geral");

  // Photos State
  const [imagemEvento, setImagemEvento] = useState<string>(heroImage);
  const [bannerEvento, setBannerEvento] = useState<string>(stageImage);
  const [galeriaImagens, setGaleriaImagens] = useState<string[]>([
    presencialImage,
    hibridoImage,
    virtualImage,
  ]);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);

  // Hidden File Input References
  const fileInputEventoRef = useRef<HTMLInputElement>(null);
  const fileInputBannerRef = useRef<HTMLInputElement>(null);
  const fileInputGaleriaRef = useRef<HTMLInputElement>(null);
  const fileInputSpeakerRef = useRef<HTMLInputElement>(null);

  // Library / Preset Chooser Modal State
  const [libraryTarget, setLibraryTarget] = useState<
    "evento" | "banner" | "galeria" | "speaker" | null
  >(null);

  // General Info Form State
  const [nome, setNome] = useState(ev?.nome || "Conferência de Negócios 2026");
  const [descricaoCurta, setDescricaoCurta] = useState(
    "Conectando ideias, gerando oportunidades."
  );
  const [descricaoCompleta, setDescricaoCompleta] = useState(
    ev?.descricao ||
      "A Conferência de Negócios 2026 é o maior encontro de líderes, empreendedores e profissionais de negócios para debater o futuro da economia e da inovação."
  );
  const [categoria, setCategoria] = useState("Conferência");
  const [data, setData] = useState(ev?.data || "15/11/2026 - 16/11/2026");
  const [hora, setHora] = useState(ev?.hora || "08:00 - 18:00");
  const [local, setLocal] = useState(
    ev?.local
      ? `${ev.local}, ${ev.cidade || "Luanda, Angola"}`
      : "Centro de Convenções de Luanda, Luanda, Angola"
  );
  const [linkEvento, setLinkEvento] = useState(
    "https://eventpro.ao/evento/negocios2026"
  );
  const [capacidade, setCapacidade] = useState("2.480");
  const [eventoPublico, setEventoPublico] = useState(true);
  const [status, setStatus] = useState<Evento["status"]>(ev?.status || "Ativo");
  const [preco, setPreco] = useState(ev?.preco ?? 25000);

  // Design & Layout State
  const [corPrimaria, setCorPrimaria] = useState("#0084FF");
  const [estiloHero, setEstiloHero] = useState<"countdown" | "banner" | "minimal">(
    "countdown"
  );
  const [secoesVisiveis, setSecoesVisiveis] = useState({
    palestrantes: true,
    programacao: true,
    localizacao: true,
    galeria: true,
    patrocinadores: true,
    countdown: true,
    metricas: true,
  });

  // Content (Program & FAQ) State
  const [diaAtivo, setDiaAtivo] = useState<"15" | "16">("15");
  const [sessoesDia15, setSessoesDia15] = useState<SessionItem[]>([
    {
      id: "1",
      hora: "08:00",
      titulo: "Abertura e boas-vindas",
      sala: "Auditório Principal",
    },
    {
      id: "2",
      hora: "09:00",
      titulo: "O futuro da economia digital",
      sala: "Auditório Principal",
    },
    {
      id: "3",
      hora: "10:30",
      titulo: "Coffee Break & Networking",
      sala: "Área de Exposições",
    },
    {
      id: "4",
      hora: "11:00",
      titulo: "Painel: Inovação e Tecnologia",
      sala: "Auditório Principal",
    },
  ]);
  const [sessoesDia16, setSessoesDia16] = useState<SessionItem[]>([
    {
      id: "5",
      hora: "09:00",
      titulo: "Sessão Plenária: Finanças e Investimento",
      sala: "Auditório Principal",
    },
    {
      id: "6",
      hora: "11:30",
      titulo: "Mesas Redondas com Investidores",
      sala: "Salas Temáticas A & B",
    },
    {
      id: "7",
      hora: "15:00",
      titulo: "Cerimónia de Encerramento e Entrega de Prémios",
      sala: "Auditório Principal",
    },
  ]);
  const [editingSession, setEditingSession] = useState<SessionItem | "new" | null>(
    null
  );
  const [sessionForm, setSessionForm] = useState({
    hora: "08:00",
    titulo: "",
    sala: "Auditório Principal",
  });

  // FAQ State
  const [faqList, setFaqList] = useState<FaqItem[]>([
    {
      id: "1",
      pergunta: "Como recebo o meu bilhete digital?",
      resposta:
        "Após confirmar a sua inscrição, o bilhete com QR code é gerado instantaneamente no ecrã e enviado para o seu e-mail.",
    },
    {
      id: "2",
      pergunta: "O evento emite certificado de participação?",
      resposta:
        "Sim, todos os participantes com check-in confirmado recebem o certificado digital oficial autenticado por e-mail.",
    },
    {
      id: "3",
      pergunta: "Há estacionamento no Centro de Convenções?",
      resposta:
        "Sim, o local dispõe de estacionamento privativo e seguro para mais de 500 viaturas com acesso direto aos auditórios.",
    },
  ]);
  const [editingFaq, setEditingFaq] = useState<FaqItem | "new" | null>(null);
  const [faqForm, setFaqForm] = useState({ pergunta: "", resposta: "" });

  // Config State
  const [notifInscricao, setNotifInscricao] = useState(true);
  const [qrCodeAutomatico, setQrCodeAutomatico] = useState(true);
  const [notificarAdmin, setNotificarAdmin] = useState(true);
  const [limiteBilhetes, setLimiteBilhetes] = useState("5");
  const [moeda, setMoeda] = useState("Kz");

  // Speakers List
  const [palestrantes, setPalestrantes] = useState<SpeakerItem[]>([
    {
      id: "1",
      nome: "Ana Silva",
      cargo: "CEO - Tech Angola",
      tag: "Tecnologia",
      img: martaImage,
    },
    {
      id: "2",
      nome: "Carlos Mendes",
      cargo: "Diretor - Banca & Finanças",
      tag: "Finanças",
      img: carlosImage,
    },
    {
      id: "3",
      nome: "Juliana Souza",
      cargo: "Especialista em Inovação",
      tag: "Inovação",
      img: patriciaImage,
    },
    {
      id: "4",
      nome: "Rafael Nunes",
      cargo: "Consultor de Negócios",
      tag: "Negócios",
      img: evaristoImage,
    },
    {
      id: "5",
      nome: "Beatriz Costa",
      cargo: "CEO - StartUp Angola",
      tag: "Empreendedorismo",
      img: martaImage,
    },
  ]);

  // Sponsors List
  const [sponsors, setSponsors] = useState([
    { id: "1", nome: "UNITEL", cor: "#ff6a00", cota: "Diamante", tel: "+244 923 000 111" },
    { id: "2", nome: "BCI", cor: "#00a3e0", cota: "Ouro", tel: "+244 923 000 222" },
    { id: "3", nome: "Standard Bank", cor: "#0033aa", cota: "Ouro", tel: "+244 923 000 333" },
    { id: "4", nome: "Sonangol", cor: "#e30613", cota: "Diamante", tel: "+244 923 000 444" },
  ]);

  // Exhibitors List
  const [expositores, setExpositores] = useState([
    { id: "1", nome: "Tech Angola Solutions", stand: "Stand A-01", area: "36 m²", leads: 142, status: "Confirmado" },
    { id: "2", nome: "Banco BAI Digital", stand: "Stand A-02", area: "48 m²", leads: 215, status: "Confirmado" },
    { id: "3", nome: "Angola Cables", stand: "Stand B-05", area: "24 m²", leads: 98, status: "Confirmado" },
    { id: "4", nome: "Inovis Telecom", stand: "Stand C-12", area: "18 m²", leads: 74, status: "Pendente" },
  ]);

  // Team Members List
  const [equipa, setEquipa] = useState([
    { id: "1", nome: "Evaristo Cassoma", cargo: "Administrador Geral & Master", email: "evaristopaulocassoma2352@gmail.com", nivel: "Admin", img: evaristoImage },
    { id: "2", nome: "Marta Silva", cargo: "Coordenadora de Credenciamento", email: "marta.silva@eventpro.ao", nivel: "Operador", img: martaImage },
    { id: "3", nome: "Carlos Mendes", cargo: "Supervisor Audiovisual & Palco", email: "carlos.m@eventpro.ao", nivel: "Supervisor", img: carlosImage },
    { id: "4", nome: "Patrícia Costa", cargo: "Relações Públicas & VIP", email: "patricia.c@eventpro.ao", nivel: "Coordenador", img: patriciaImage },
  ]);

  // Participants List
  const [participantes, setParticipantes] = useState<Participante[]>(
    ev?.participantes && ev.participantes.length > 0
      ? ev.participantes
      : [
          { id: "1", nome: "Manuel António", email: "manuel.antonio@empresa.ao", tipo: "Visitante", bilhete: "Passe Geral", status: "Confirmado" },
          { id: "2", nome: "Dra. Isabel Santos", email: "isabel.santos@banco.ao", tipo: "VIP", bilhete: "Passe VIP", status: "Confirmado" },
          { id: "3", nome: "Eng. Pedro Afonso", email: "pedro.afonso@telecom.ao", tipo: "Expositor", bilhete: "Expositor", status: "Confirmado" },
          { id: "4", nome: "Dr. Domingos Panzo", email: "domingos.panzo@adv.ao", tipo: "Visitante", bilhete: "Passe Geral", status: "Pendente" },
          { id: "5", nome: "Teresa Garcia", email: "teresa.garcia@imprensa.ao", tipo: "Imprensa", bilhete: "Imprensa", status: "Confirmado" },
        ]
  );
  const [participanteBusca, setParticipanteBusca] = useState("");
  const [checkinBusca, setCheckinBusca] = useState("");
  const [checkinSucesso, setCheckinSucesso] = useState<{
    nome: string;
    bilhete: string;
    hora: string;
  } | null>(null);

  // Tickets List
  const [tickets, setTickets] = useState([
    { id: "1", nome: "Passe Geral", preco: 15000, vendidos: 1840, total: 2000, status: "Vendas Abertas" },
    { id: "2", nome: "Passe VIP", preco: 35000, vendidos: 380, total: 400, status: "Últimos Lugares" },
    { id: "3", nome: "Acesso Virtual HD", preco: 10000, vendidos: 1240, total: 5000, status: "Vendas Abertas" },
    { id: "4", nome: "Passe Imprensa & Orador", preco: 0, vendidos: 50, total: 80, status: "Acesso Restrito" },
  ]);

  // Speaker modal state
  const [editingSpeaker, setEditingSpeaker] = useState<SpeakerItem | "new" | null>(
    null
  );
  const [speakerForm, setSpeakerForm] = useState({
    nome: "",
    cargo: "",
    tag: "Tecnologia",
    img: martaImage,
  });

  // Handle direct file uploads (converting to base64 DataURL for immediate display)
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: "evento" | "banner" | "galeria" | "speaker"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecione um ficheiro de imagem válido (JPG, PNG, WebP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (target === "evento") {
        setImagemEvento(dataUrl);
        toast.success("Foto principal do evento atualizada com sucesso!");
      } else if (target === "banner") {
        setBannerEvento(dataUrl);
        toast.success("Banner do evento atualizado com sucesso!");
      } else if (target === "galeria") {
        if (activeGalleryIndex !== null) {
          const updated = [...galeriaImagens];
          updated[activeGalleryIndex] = dataUrl;
          setGaleriaImagens(updated);
          toast.success(`Foto ${activeGalleryIndex + 1} da galeria atualizada!`);
        } else {
          setGaleriaImagens([...galeriaImagens, dataUrl]);
          toast.success("Nova foto adicionada à galeria!");
        }
      } else if (target === "speaker") {
        setSpeakerForm((prev) => ({ ...prev, img: dataUrl }));
        toast.success("Foto do palestrante carregada!");
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // Presets library collection
  const libraryPhotos = [
    { name: "Palco de Conferência Azul", url: heroImage, categoria: "Palco" },
    { name: "Auditório Principal Luanda", url: stageImage, categoria: "Auditório" },
    { name: "Networking & Presencial", url: presencialImage, categoria: "Público" },
    { name: "Painel Híbrido Multitelas", url: hibridoImage, categoria: "Híbrido" },
    { name: "Estúdio Virtual Profissional", url: virtualImage, categoria: "Virtual" },
  ];

  const speakerPresets = [
    { name: "Ana Silva", url: martaImage },
    { name: "Carlos Mendes", url: carlosImage },
    { name: "Juliana Souza", url: patriciaImage },
    { name: "Rafael Nunes", url: evaristoImage },
  ];

  const handleSelectLibraryPhoto = (url: string) => {
    if (libraryTarget === "evento") {
      setImagemEvento(url);
      toast.success("Foto do evento atualizada pela biblioteca!");
    } else if (libraryTarget === "banner") {
      setBannerEvento(url);
      toast.success("Banner atualizado pela biblioteca!");
    } else if (libraryTarget === "galeria") {
      if (activeGalleryIndex !== null) {
        const updated = [...galeriaImagens];
        updated[activeGalleryIndex] = url;
        setGaleriaImagens(updated);
      } else {
        setGaleriaImagens([...galeriaImagens, url]);
      }
      toast.success("Foto da galeria atualizada!");
    } else if (libraryTarget === "speaker") {
      setSpeakerForm((prev) => ({ ...prev, img: url }));
      toast.success("Foto do palestrante selecionada!");
    }
    setLibraryTarget(null);
  };

  const handleSaveSpeaker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!speakerForm.nome || !speakerForm.cargo) {
      toast.error("Por favor, preencha o nome e cargo do palestrante.");
      return;
    }

    if (editingSpeaker === "new") {
      setPalestrantes([
        ...palestrantes,
        {
          id: uid(),
          nome: speakerForm.nome,
          cargo: speakerForm.cargo,
          tag: speakerForm.tag,
          img: speakerForm.img || martaImage,
        },
      ]);
      toast.success("Palestrante adicionado!");
    } else if (editingSpeaker) {
      setPalestrantes(
        palestrantes.map((p) =>
          p.id === editingSpeaker.id
            ? {
                ...p,
                nome: speakerForm.nome,
                cargo: speakerForm.cargo,
                tag: speakerForm.tag,
                img: speakerForm.img,
              }
            : p
        )
      );
      toast.success("Palestrante atualizado!");
    }
    setEditingSpeaker(null);
  };

  const handleDeleteSpeaker = (id: string) => {
    setPalestrantes(palestrantes.filter((p) => p.id !== id));
    toast.info("Palestrante removido.");
  };

  // Session Handlers
  const handleSaveSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionForm.titulo) {
      toast.error("Preencha o título da sessão.");
      return;
    }

    const currentList = diaAtivo === "15" ? sessoesDia15 : sessoesDia16;
    const setList = diaAtivo === "15" ? setSessoesDia15 : setSessoesDia16;

    if (editingSession === "new") {
      setList([
        ...currentList,
        {
          id: uid(),
          hora: sessionForm.hora,
          titulo: sessionForm.titulo,
          sala: sessionForm.sala,
        },
      ]);
      toast.success("Sessão adicionada à programação!");
    } else if (editingSession) {
      setList(
        currentList.map((s) =>
          s.id === editingSession.id ? { ...s, ...sessionForm } : s
        )
      );
      toast.success("Sessão atualizada!");
    }
    setEditingSession(null);
  };

  const handleDeleteSession = (id: string) => {
    if (diaAtivo === "15") {
      setSessoesDia15(sessoesDia15.filter((s) => s.id !== id));
    } else {
      setSessoesDia16(sessoesDia16.filter((s) => s.id !== id));
    }
    toast.info("Sessão removida.");
  };

  // FAQ Handlers
  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.pergunta || !faqForm.resposta) {
      toast.error("Preencha a pergunta e a resposta.");
      return;
    }

    if (editingFaq === "new") {
      setFaqList([
        ...faqList,
        { id: uid(), pergunta: faqForm.pergunta, resposta: faqForm.resposta },
      ]);
      toast.success("Pergunta frequente adicionada!");
    } else if (editingFaq) {
      setFaqList(
        faqList.map((f) => (f.id === editingFaq.id ? { ...f, ...faqForm } : f))
      );
      toast.success("Pergunta atualizada!");
    }
    setEditingFaq(null);
  };

  const handleDeleteFaq = (id: string) => {
    setFaqList(faqList.filter((f) => f.id !== id));
    toast.info("Pergunta removida.");
  };

  // Check-in Execution
  const handleExecutarCheckin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = checkinBusca.trim().toLowerCase();
    if (!query) {
      toast.error("Digite o código do bilhete ou o nome do participante.");
      return;
    }

    const found = participantes.find(
      (p) =>
        p.nome.toLowerCase().includes(query) ||
        p.email.toLowerCase().includes(query) ||
        query.includes("2026") ||
        query.includes("ep-")
    );

    const checkinName = found ? found.nome : "Participante Convidado";
    const checkinTicket = found ? found.bilhete : "Passe Geral VIP";
    const agora = new Date().toLocaleTimeString("pt-PT", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setCheckinSucesso({
      nome: checkinName,
      bilhete: checkinTicket,
      hora: agora,
    });
    setCheckinBusca("");
    toast.success(`Check-in validado com sucesso para ${checkinName}!`);
  };

  const handleSaveAll = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    try {
      update(quem, `${ev ? "Editou o site do evento" : "Criou o evento"} ${nome}`, (d) => {
        const o = d.orgs.find((x) => x.id === orgId);
        if (o) {
          const parts = local.split(",");
          const localNome = parts[0]?.trim() || "Centro de Convenções de Luanda";
          const cidadeNome = parts.slice(1).join(",").trim() || "Luanda, Angola";

          const dataToSave: Partial<Evento> = {
            nome,
            data,
            hora,
            local: localNome,
            cidade: cidadeNome,
            descricao: descricaoCompleta,
            status,
            preco,
            participantes,
          };

          if (ev) {
            const alvo = o.eventos.find((x) => x.id === ev.id);
            if (alvo) Object.assign(alvo, dataToSave);
          } else {
            o.eventos.unshift({
              id: uid(),
              nome,
              data,
              hora,
              local: localNome,
              cidade: cidadeNome,
              descricao: descricaoCompleta,
              status,
              preco,
              participantes,
            });
          }
        }
      });
      toast.success("Todas as alterações e configurações foram guardadas com sucesso!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao guardar alterações.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex bg-[#01040e] text-slate-100 font-sans overflow-hidden">
      {/* Hidden File Inputs for real local uploads */}
      <input
        type="file"
        ref={fileInputEventoRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileUpload(e, "evento")}
      />
      <input
        type="file"
        ref={fileInputBannerRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileUpload(e, "banner")}
      />
      <input
        type="file"
        ref={fileInputGaleriaRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileUpload(e, "galeria")}
      />
      <input
        type="file"
        ref={fileInputSpeakerRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileUpload(e, "speaker")}
      />

      {/* 1. Left Sidebar with ALL modules connected */}
      <aside className="hidden lg:flex w-64 flex-none flex-col justify-between border-r border-slate-800/80 bg-[#020614] p-4">
        <div>
          {/* Brand */}
          <div className="flex items-center gap-2.5 px-2 py-3">
            <BrandMark />
            <span className="text-xl font-black text-white">
              Event<span className="text-[#0084FF]">Pro</span>
            </span>
          </div>

          {/* Navigation Menu */}
          <nav className="mt-5 space-y-1 text-xs font-semibold">
            {/* Dashboard Link */}
            <button
              type="button"
              onClick={onClose}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-slate-400 hover:bg-slate-800/50 hover:text-white transition-colors cursor-pointer"
            >
              <LayoutDashboard size={16} />
              <span>Dashboard Global</span>
            </button>

            {/* Eventos Group */}
            <div className="rounded-lg bg-blue-950/20 border border-blue-900/30 p-1">
              <div className="flex items-center justify-between px-2.5 py-1.5 text-white font-bold">
                <span className="flex items-center gap-2.5 text-[#0084FF]">
                  <Calendar size={15} />
                  <span>Gestão do Evento</span>
                </span>
                <ChevronDown size={13} className="text-slate-400" />
              </div>

              <div className="space-y-0.5 pt-1">
                {/* 1. Editar Site do Evento */}
                <button
                  type="button"
                  onClick={() => setActiveView("editar-site")}
                  className={`flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 transition-colors cursor-pointer ${
                    activeView === "editar-site"
                      ? "bg-[#0080FF] text-white font-bold shadow-md shadow-blue-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span>Editar Site do Evento</span>
                </button>

                {/* 2. Meus Eventos */}
                <button
                  type="button"
                  onClick={() => setActiveView("meus-eventos")}
                  className={`flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 transition-colors cursor-pointer ${
                    activeView === "meus-eventos"
                      ? "bg-[#0080FF] text-white font-bold shadow-md shadow-blue-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                  }`}
                >
                  <CalendarDays size={13} />
                  <span>Meus Eventos</span>
                </button>

                {/* 3. Criar Evento */}
                <button
                  type="button"
                  onClick={() => setActiveView("criar-evento")}
                  className={`flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 transition-colors cursor-pointer ${
                    activeView === "criar-evento"
                      ? "bg-[#0080FF] text-white font-bold shadow-md shadow-blue-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                  }`}
                >
                  <Plus size={13} />
                  <span>Criar Evento</span>
                </button>
              </div>
            </div>

            {/* 4. Participantes */}
            <button
              type="button"
              onClick={() => setActiveView("participantes")}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 transition-colors cursor-pointer ${
                activeView === "participantes"
                  ? "bg-[#0080FF] text-white font-bold shadow-md shadow-blue-500/20"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-3">
                <Users size={16} />
                <span>Participantes</span>
              </span>
              <span className="rounded bg-blue-950 px-1.5 py-0.5 text-[10px] text-blue-300">
                2.480
              </span>
            </button>

            {/* 5. Bilhetes */}
            <button
              type="button"
              onClick={() => setActiveView("bilhetes")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-colors cursor-pointer ${
                activeView === "bilhetes"
                  ? "bg-[#0080FF] text-white font-bold shadow-md shadow-blue-500/20"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <Ticket size={16} />
              <span>Bilhetes</span>
            </button>

            {/* 6. Check-in */}
            <button
              type="button"
              onClick={() => setActiveView("check-in")}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 transition-colors cursor-pointer ${
                activeView === "check-in"
                  ? "bg-[#0080FF] text-white font-bold shadow-md shadow-blue-500/20"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-3">
                <QrCode size={16} />
                <span>Check-in</span>
              </span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>

            {/* 7. Patrocinadores */}
            <button
              type="button"
              onClick={() => setActiveView("patrocinadores")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-colors cursor-pointer ${
                activeView === "patrocinadores"
                  ? "bg-[#0080FF] text-white font-bold shadow-md shadow-blue-500/20"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <Handshake size={16} />
              <span>Patrocinadores</span>
            </button>

            {/* 8. Expositores */}
            <button
              type="button"
              onClick={() => setActiveView("expositores")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-colors cursor-pointer ${
                activeView === "expositores"
                  ? "bg-[#0080FF] text-white font-bold shadow-md shadow-blue-500/20"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <Shield size={16} />
              <span>Expositores</span>
            </button>

            {/* 9. Palestrantes */}
            <button
              type="button"
              onClick={() => setActiveView("palestrantes")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-colors cursor-pointer ${
                activeView === "palestrantes"
                  ? "bg-[#0080FF] text-white font-bold shadow-md shadow-blue-500/20"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <UserCheck size={16} />
              <span>Palestrantes</span>
            </button>

            {/* 10. Equipa */}
            <button
              type="button"
              onClick={() => setActiveView("equipa")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-colors cursor-pointer ${
                activeView === "equipa"
                  ? "bg-[#0080FF] text-white font-bold shadow-md shadow-blue-500/20"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <Users size={16} />
              <span>Equipa</span>
            </button>

            {/* 11. Relatórios */}
            <button
              type="button"
              onClick={() => setActiveView("relatorios")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-colors cursor-pointer ${
                activeView === "relatorios"
                  ? "bg-[#0080FF] text-white font-bold shadow-md shadow-blue-500/20"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <BarChart3 size={16} />
              <span>Relatórios</span>
            </button>

            {/* 12. Configurações */}
            <button
              type="button"
              onClick={() => setActiveView("configuracoes")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-colors cursor-pointer ${
                activeView === "configuracoes"
                  ? "bg-[#0080FF] text-white font-bold shadow-md shadow-blue-500/20"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <Settings size={16} />
              <span>Configurações</span>
            </button>
          </nav>
        </div>

        {/* 13. User Mini Bar (Evaristo Cassoma - Administrador) */}
        <div
          onClick={() => setIsProfileOpen(true)}
          className="group cursor-pointer rounded-xl border border-slate-800 bg-[#061026] p-2.5 hover:border-blue-500/50 transition-all"
          title="Ver perfil de Evaristo Cassoma"
        >
          <div className="flex items-center gap-2.5">
            <img
              src={evaristoImage}
              alt="Evaristo Cassoma"
              className="h-9 w-9 rounded-full object-cover ring-2 ring-blue-500/50 group-hover:scale-105 transition-transform"
            />
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-bold text-white group-hover:text-[#0084FF] transition-colors">
                Evaristo Cassoma
              </div>
              <div className="text-[10px] text-slate-400">Administrador Master</div>
            </div>
            <ChevronRight size={14} className="text-slate-500 group-hover:text-white" />
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#01040e]">
        {/* Top Navbar Header */}
        <header className="flex h-16 flex-none items-center justify-between border-b border-slate-800/80 bg-[#020614] px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden flex items-center justify-center h-8 w-8 rounded-md bg-slate-800 text-slate-300"
            >
              <ArrowLeft size={16} />
            </button>
            <span className="lg:hidden text-base font-extrabold text-white">EventPro</span>
          </div>

          <div className="flex items-center gap-5">
            {/* Notification Bell with red badge 3 */}
            <div
              onClick={() => toast.info("3 Notificações: Nova inscrição confirmada, Check-in aberto e Relatório semanal disponível.")}
              className="relative cursor-pointer"
            >
              <Bell size={18} className="text-slate-300 hover:text-white" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                3
              </span>
            </div>

            {/* Profile Header Button */}
            <div
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <img
                src={evaristoImage}
                alt="Evaristo Cassoma"
                className="h-8 w-8 rounded-full object-cover ring-1 ring-blue-500/50"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-white">Evaristo Cassoma</div>
                <div className="text-[10px] text-slate-400">Administrador</div>
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          </div>
        </header>

        {/* Scrollable Workspace View Switcher */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">

            {/* VIEW 1: EDITAR SITE DO EVENTO */}
            {activeView === "editar-site" && (
              <div className="space-y-6 animate-in fade-in duration-150">
                {/* Header: Title + Action Buttons */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-5">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                      Editar Site do Evento
                    </h1>
                    <p className="mt-1 text-xs sm:text-sm text-slate-400">
                      Personalize o site do seu evento, troque fotos e mantenha todas as informações atualizadas.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-300 hover:border-slate-500 hover:text-white transition-colors cursor-pointer"
                    >
                      <ArrowLeft size={14} /> Voltar
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveAll}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#0080FF] px-5 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:bg-[#0070e0] transition-colors cursor-pointer"
                    >
                      <Save size={14} /> Guardar Alterações
                    </button>

                    <Link
                      to="/evento"
                      target="_blank"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-300 hover:border-slate-500 hover:text-white transition-colors"
                    >
                      <Eye size={14} /> Ver Site
                    </Link>
                  </div>
                </div>

                {/* 4 Tabs: Informações Gerais, Design e Layout, Conteúdo, Configurações */}
                <div className="flex items-center gap-6 border-b border-slate-800 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setActiveTab("geral")}
                    className={`pb-3 transition-colors relative cursor-pointer ${
                      activeTab === "geral"
                        ? "text-[#0084FF] font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Informações Gerais
                    {activeTab === "geral" && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0084FF] rounded-full" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("design")}
                    className={`pb-3 transition-colors relative cursor-pointer ${
                      activeTab === "design"
                        ? "text-[#0084FF] font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Design e Layout
                    {activeTab === "design" && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0084FF] rounded-full" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("conteudo")}
                    className={`pb-3 transition-colors relative cursor-pointer ${
                      activeTab === "conteudo"
                        ? "text-[#0084FF] font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Conteúdo
                    {activeTab === "conteudo" && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0084FF] rounded-full" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("config")}
                    className={`pb-3 transition-colors relative cursor-pointer ${
                      activeTab === "config"
                        ? "text-[#0084FF] font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Configurações
                    {activeTab === "config" && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0084FF] rounded-full" />
                    )}
                  </button>
                </div>

                {/* TAB 1: INFORMAÇÕES GERAIS */}
                {activeTab === "geral" && (
                  <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] animate-in fade-in duration-150">
                    <div className="space-y-6">
                      {/* Imagem do Evento */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-bold text-white">Imagem do Evento</label>
                          <button
                            type="button"
                            onClick={() => setLibraryTarget("evento")}
                            className="text-[11px] font-semibold text-[#0084FF] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <ImageIcon size={12} /> Escolher da biblioteca
                          </button>
                        </div>

                        <div
                          onClick={() => fileInputEventoRef.current?.click()}
                          className="group relative aspect-[16/7] overflow-hidden rounded-xl border border-slate-700/80 bg-[#030919] cursor-pointer hover:border-[#0084FF] transition-all shadow-md"
                        >
                          <img
                            src={imagemEvento}
                            alt="Imagem do Evento"
                            className="h-full w-full object-cover filter brightness-95 group-hover:scale-102 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 text-white backdrop-blur-[2px]">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0080FF] text-white shadow-lg">
                              <Camera size={18} />
                            </div>
                            <span className="text-xs font-bold">Clique para trocar foto</span>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputEventoRef.current?.click()}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/50 bg-blue-950/40 px-3.5 py-1.5 text-xs font-semibold text-blue-400 hover:bg-blue-900/40 cursor-pointer"
                          >
                            <Upload size={13} /> Carregar do Computador
                          </button>
                          <button
                            type="button"
                            onClick={() => setLibraryTarget("evento")}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/80 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 cursor-pointer"
                          >
                            <ImageIcon size={13} /> Biblioteca de Fotos
                          </button>
                        </div>
                      </div>

                      {/* Título */}
                      <div>
                        <label className="block text-xs font-bold text-white mb-1.5">Título do Evento</label>
                        <input
                          type="text"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          className="w-full rounded-lg border border-slate-700/80 bg-[#050c1e] px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-[#0080FF]"
                        />
                      </div>

                      {/* Descrição Curta */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="text-xs font-bold text-white">Descrição Curta</label>
                          <span className="text-[10px] text-slate-500">{descricaoCurta.length}/160</span>
                        </div>
                        <textarea
                          rows={2}
                          maxLength={160}
                          value={descricaoCurta}
                          onChange={(e) => setDescricaoCurta(e.target.value)}
                          className="w-full rounded-lg border border-slate-700/80 bg-[#050c1e] px-3.5 py-2 text-xs text-white outline-none focus:border-[#0080FF]"
                        />
                      </div>

                      {/* Descrição Completa */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="text-xs font-bold text-white">Descrição Completa</label>
                          <span className="text-[10px] text-slate-500">{descricaoCompleta.length}/2000</span>
                        </div>
                        <textarea
                          rows={4}
                          maxLength={2000}
                          value={descricaoCompleta}
                          onChange={(e) => setDescricaoCompleta(e.target.value)}
                          className="w-full rounded-lg border border-slate-700/80 bg-[#050c1e] p-3 text-xs text-white outline-none focus:border-[#0080FF]"
                        />
                      </div>

                      {/* Categoria */}
                      <div>
                        <label className="block text-xs font-bold text-white mb-1.5">Categoria</label>
                        <select
                          value={categoria}
                          onChange={(e) => setCategoria(e.target.value)}
                          className="w-full rounded-lg border border-slate-700/80 bg-[#050c1e] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#0080FF]"
                        >
                          <option value="Conferência">Conferência</option>
                          <option value="Workshop">Workshop</option>
                          <option value="Seminário">Seminário</option>
                          <option value="Congresso">Congresso</option>
                        </select>
                      </div>

                      {/* Data e Hora */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-white mb-1.5">Data</label>
                          <input
                            type="text"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            className="w-full rounded-lg border border-slate-700/80 bg-[#050c1e] px-3 py-2 text-xs text-white outline-none focus:border-[#0080FF]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-white mb-1.5">Horário</label>
                          <input
                            type="text"
                            value={hora}
                            onChange={(e) => setHora(e.target.value)}
                            className="w-full rounded-lg border border-slate-700/80 bg-[#050c1e] px-3 py-2 text-xs text-white outline-none focus:border-[#0080FF]"
                          />
                        </div>
                      </div>

                      {/* Localização */}
                      <div>
                        <label className="block text-xs font-bold text-white mb-1.5">Localização</label>
                        <input
                          type="text"
                          value={local}
                          onChange={(e) => setLocal(e.target.value)}
                          className="w-full rounded-lg border border-slate-700/80 bg-[#050c1e] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#0080FF]"
                        />
                      </div>
                    </div>

                    {/* Coluna Direita: Banner, Galeria e Palestrantes */}
                    <div className="space-y-6">
                      <div className="rounded-xl border border-slate-800 bg-[#040c1e] p-4 space-y-3">
                        <h3 className="text-xs font-bold text-white">Banner e Imagens da Galeria</h3>
                        <div
                          onClick={() => fileInputBannerRef.current?.click()}
                          className="aspect-[16/7] overflow-hidden rounded-xl border border-slate-800 bg-slate-900 cursor-pointer"
                        >
                          <img src={bannerEvento} alt="Banner" className="h-full w-full object-cover" />
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputBannerRef.current?.click()}
                            className="rounded-lg border border-blue-500/40 bg-blue-950/40 px-3 py-1.5 text-xs text-blue-400"
                          >
                            Alterar Banner
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {galeriaImagens.map((imgUrl, idx) => (
                            <div
                              key={idx}
                              onClick={() => {
                                setActiveGalleryIndex(idx);
                                fileInputGaleriaRef.current?.click();
                              }}
                              className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-800 cursor-pointer"
                            >
                              <img src={imgUrl} alt={`Galeria ${idx + 1}`} className="h-full w-full object-cover" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Palestrantes */}
                      <div className="rounded-xl border border-slate-800 bg-[#040c1e] p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs font-bold text-white">Palestrantes ({palestrantes.length})</h3>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingSpeaker("new");
                              setSpeakerForm({ nome: "", cargo: "", tag: "Tecnologia", img: martaImage });
                            }}
                            className="rounded bg-blue-600/30 px-2.5 py-1 text-xs text-blue-300 font-semibold"
                          >
                            + Adicionar
                          </button>
                        </div>
                        <div className="space-y-2">
                          {palestrantes.map((spk) => (
                            <div key={spk.id} className="flex items-center justify-between p-2 rounded-lg bg-[#061026]">
                              <div className="flex items-center gap-2.5">
                                <img src={spk.img} alt={spk.nome} className="h-9 w-9 rounded-full object-cover" />
                                <div>
                                  <div className="text-xs font-bold text-white">{spk.nome}</div>
                                  <div className="text-[10px] text-slate-400">{spk.cargo}</div>
                                </div>
                              </div>
                              <div className="flex gap-1.5 text-slate-400">
                                <button type="button" onClick={() => { setEditingSpeaker(spk); setSpeakerForm({ ...spk }); }}>
                                  <Pencil size={13} />
                                </button>
                                <button type="button" onClick={() => handleDeleteSpeaker(spk.id)}>
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: DESIGN E LAYOUT */}
                {activeTab === "design" && (
                  <div className="rounded-2xl border border-slate-800 bg-[#040c1e] p-6 space-y-4">
                    <h3 className="text-sm font-bold text-white">Paleta de Cores e Estilo do Site</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {["#0084FF", "#06B6D4", "#6366F1", "#10B981", "#F59E0B", "#EC4899"].map((hex) => (
                        <button
                          key={hex}
                          type="button"
                          onClick={() => { setCorPrimaria(hex); toast.success("Cor do tema atualizada!"); }}
                          className="flex items-center gap-2 p-3 rounded-xl border border-slate-800 bg-[#061026]"
                        >
                          <span className="h-5 w-5 rounded-full" style={{ backgroundColor: hex }} />
                          <span className="text-xs text-white">{hex}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: CONTEÚDO */}
                {activeTab === "conteudo" && (
                  <div className="rounded-2xl border border-slate-800 bg-[#040c1e] p-6 space-y-4">
                    <h3 className="text-sm font-bold text-white">Programação do Evento</h3>
                    <div className="space-y-2">
                      {sessoesDia15.map((s) => (
                        <div key={s.id} className="flex justify-between p-3 rounded-lg bg-[#061026]">
                          <span className="text-xs text-[#0084FF] font-mono">{s.hora} — {s.titulo}</span>
                          <span className="text-xs text-slate-400">{s.sala}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 4: CONFIGURAÇÕES */}
                {activeTab === "config" && (
                  <div className="rounded-2xl border border-slate-800 bg-[#040c1e] p-6 space-y-4">
                    <h3 className="text-sm font-bold text-white">Configurações Gerais do Evento</h3>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-[#061026]">
                      <span className="text-xs text-white">Emissão de QR Code Automático</span>
                      <span className="text-xs text-emerald-400 font-bold">Ativado</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* VIEW 2: MEUS EVENTOS */}
            {activeView === "meus-eventos" && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-5">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Meus Eventos</h1>
                    <p className="mt-1 text-xs sm:text-sm text-slate-400">
                      Gira todos os eventos criados pela sua organização.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveView("criar-evento")}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0080FF] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/30 hover:bg-[#0070e0] cursor-pointer"
                  >
                    <Plus size={15} /> Criar Novo Evento
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="overflow-hidden rounded-2xl border border-blue-500/50 bg-[#040c1e] shadow-lg">
                    <div className="aspect-[16/8] overflow-hidden relative">
                      <img src={heroImage} alt="Conferência" className="h-full w-full object-cover" />
                      <span className="absolute top-2 right-2 rounded-md bg-emerald-500/90 px-2 py-0.5 text-[10px] font-bold text-white">
                        Ativo
                      </span>
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="text-sm font-bold text-white">{nome}</h3>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-1">
                          <Calendar size={12} className="text-[#0084FF]" /> {data} · {hora}
                        </p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <MapPin size={12} className="text-[#0084FF]" /> {local}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs">
                        <span className="text-slate-400">Inscritos: <strong className="text-white">2.480</strong></span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveView("editar-site")}
                            className="rounded-lg bg-blue-600/30 border border-blue-500/40 px-3 py-1 text-xs font-bold text-[#0084FF] hover:bg-blue-600/50 cursor-pointer"
                          >
                            Editar
                          </button>
                          <Link
                            to="/evento"
                            target="_blank"
                            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-300 hover:text-white"
                          >
                            Ver Site
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Demo Event */}
                  <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#040c1e]">
                    <div className="aspect-[16/8] overflow-hidden relative">
                      <img src={presencialImage} alt="Feira" className="h-full w-full object-cover" />
                      <span className="absolute top-2 right-2 rounded-md bg-blue-500/90 px-2 py-0.5 text-[10px] font-bold text-white">
                        Agendado
                      </span>
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="text-sm font-bold text-white">Feira de Tecnologia de Benguela</h3>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-1">
                          <Calendar size={12} className="text-[#0084FF]" /> 10 - 12 Dez 2026
                        </p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <MapPin size={12} className="text-[#0084FF]" /> Pavilhão de Eventos, Benguela
                        </p>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs">
                        <span className="text-slate-400">Inscritos: <strong className="text-white">820</strong></span>
                        <button
                          type="button"
                          onClick={() => { setNome("Feira de Tecnologia de Benguela"); setActiveView("editar-site"); }}
                          className="rounded-lg border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:text-white"
                        >
                          Gerir
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 3: CRIAR EVENTO */}
            {activeView === "criar-evento" && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="border-b border-slate-800/80 pb-5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Criar Novo Evento</h1>
                  <p className="mt-1 text-xs sm:text-sm text-slate-400">
                    Preencha as informações básicas para publicar e lançar o site do seu próximo evento.
                  </p>
                </div>

                <div className="max-w-2xl rounded-2xl border border-slate-800 bg-[#040c1e] p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-white mb-1.5">Nome do Evento</label>
                    <input
                      type="text"
                      placeholder="Ex: Cimeira Tecnológica de Angola 2026"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#0080FF]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-white mb-1.5">Formato</label>
                      <select className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs text-white outline-none focus:border-[#0080FF]">
                        <option value="presencial">Presencial no Local</option>
                        <option value="hibrido">Híbrido (Físico + Online)</option>
                        <option value="virtual">100% Virtual / Streaming</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-white mb-1.5">Capacidade Prevista</label>
                      <input
                        type="text"
                        placeholder="Ex: 1.500 participantes"
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs text-white outline-none focus:border-[#0080FF]"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      toast.success("Novo evento criado com sucesso!");
                      setActiveView("editar-site");
                    }}
                    className="w-full rounded-xl bg-[#0080FF] py-3 text-xs font-bold text-white hover:bg-[#0070e0] cursor-pointer"
                  >
                    Criar Evento e Personalizar Site
                  </button>
                </div>
              </div>
            )}

            {/* VIEW 4: PARTICIPANTES */}
            {activeView === "participantes" && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-5">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Participantes</h1>
                    <p className="mt-1 text-xs sm:text-sm text-slate-400">
                      Total de 2.480 inscritos confirmados para a Conferência de Negócios 2026.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => toast.success("Lista de participantes exportada em formato CSV com sucesso!")}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
                    >
                      <Download size={14} /> Exportar CSV
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const novoNome = prompt("Nome do participante:");
                        if (novoNome) {
                          setParticipantes([
                            { id: uid(), nome: novoNome, email: `${novoNome.toLowerCase().replace(" ", ".")}@empresa.ao`, tipo: "Visitante", bilhete: "Passe Geral", status: "Confirmado" },
                            ...participantes,
                          ]);
                          toast.success(`Participante ${novoNome} adicionado!`);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#0080FF] px-4 py-2 text-xs font-bold text-white hover:bg-[#0070e0] cursor-pointer"
                    >
                      <UserPlus size={14} /> Adicionar Participante
                    </button>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-[#040c1e] px-3.5 py-2">
                  <Search size={16} className="text-slate-400" />
                  <input
                    type="text"
                    value={participanteBusca}
                    onChange={(e) => setParticipanteBusca(e.target.value)}
                    placeholder="Pesquisar por nome ou e-mail..."
                    className="w-full bg-transparent text-xs text-white outline-none"
                  />
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#040c1e]">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-slate-800 bg-[#061026] text-slate-400">
                      <tr>
                        <th className="p-3.5">Nome</th>
                        <th className="p-3.5">E-mail</th>
                        <th className="p-3.5">Tipo de Passe</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Ação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {participantes
                        .filter((p) => p.nome.toLowerCase().includes(participanteBusca.toLowerCase()) || p.email.toLowerCase().includes(participanteBusca.toLowerCase()))
                        .map((p) => (
                          <tr key={p.id} className="hover:bg-slate-800/30">
                            <td className="p-3.5 font-bold text-white flex items-center gap-2.5">
                              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600/30 text-[#0084FF] text-[10px] font-bold">
                                {p.nome.slice(0, 2).toUpperCase()}
                              </div>
                              {p.nome}
                            </td>
                            <td className="p-3.5 text-slate-400">{p.email}</td>
                            <td className="p-3.5 font-semibold text-slate-200">{p.bilhete}</td>
                            <td className="p-3.5">
                              <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                                {p.status}
                              </span>
                            </td>
                            <td className="p-3.5 text-right">
                              <button
                                type="button"
                                onClick={() => toast.success(`Bilhete reenviado para ${p.email}!`)}
                                className="text-[#0084FF] hover:underline"
                              >
                                Reenviar QR
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* VIEW 5: BILHETES */}
            {activeView === "bilhetes" && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-5">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Bilhetes e Lotes</h1>
                    <p className="mt-1 text-xs sm:text-sm text-slate-400">
                      Gira categorias de bilhetes, preços, capacidade e receitas arrecadadas.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const novoPasse = prompt("Nome da nova categoria de bilhete:");
                      if (novoPasse) {
                        setTickets([...tickets, { id: uid(), nome: novoPasse, preco: 20000, vendidos: 0, total: 500, status: "Vendas Abertas" }]);
                        toast.success(`Categoria ${novoPasse} criada!`);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#0080FF] px-4 py-2 text-xs font-bold text-white hover:bg-[#0070e0] cursor-pointer"
                  >
                    <Plus size={14} /> Novo Tipo de Bilhete
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {tickets.map((t) => (
                    <div key={t.id} className="rounded-2xl border border-slate-800 bg-[#040c1e] p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="rounded bg-blue-600/20 px-2 py-0.5 text-[10px] font-bold text-[#0084FF]">
                          {t.status}
                        </span>
                        <Ticket size={16} className="text-slate-400" />
                      </div>
                      <h3 className="text-sm font-bold text-white">{t.nome}</h3>
                      <div className="text-2xl font-extrabold text-white">
                        {t.preco === 0 ? "Gratuito" : `${t.preco.toLocaleString("pt-PT")} Kz`}
                      </div>
                      <div className="text-xs text-slate-400">
                        {t.vendidos} / {t.total} vendidos
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0084FF]"
                          style={{ width: `${Math.min(100, (t.vendidos / t.total) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 6: CHECK-IN COMMAND CENTER */}
            {activeView === "check-in" && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="border-b border-slate-800/80 pb-5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Central de Check-in</h1>
                  <p className="mt-1 text-xs sm:text-sm text-slate-400">
                    Validação rápida de bilhetes via leitor de QR Code ou busca manual por nome.
                  </p>
                </div>

                {/* Scan box */}
                <form onSubmit={handleExecutarCheckin} className="flex gap-2">
                  <div className="flex-1 flex items-center gap-2 rounded-xl border border-blue-500/50 bg-[#040c1e] px-4 py-3">
                    <QrCode size={20} className="text-[#0084FF]" />
                    <input
                      type="text"
                      value={checkinBusca}
                      onChange={(e) => setCheckinBusca(e.target.value)}
                      placeholder="Escaneie o QR Code ou digite o código (ex: EP-2026-8492) ou nome..."
                      className="w-full bg-transparent text-sm text-white outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-xl bg-[#0080FF] px-6 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-[#0070e0] cursor-pointer"
                  >
                    Validar Entrada
                  </button>
                </form>

                {/* Validation status card */}
                {checkinSucesso && (
                  <div className="rounded-2xl border border-emerald-500/50 bg-emerald-950/20 p-6 flex items-center justify-between animate-in zoom-in-95 duration-200">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        <CheckCircle2 size={28} />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase text-emerald-400">Acesso Permitido</div>
                        <h3 className="text-lg font-extrabold text-white">{checkinSucesso.nome}</h3>
                        <p className="text-xs text-slate-300">
                          {checkinSucesso.bilhete} · Auditório Principal · Validado às {checkinSucesso.hora}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCheckinSucesso(null)}
                      className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:text-white"
                    >
                      Fechar
                    </button>
                  </div>
                )}

                {/* Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="rounded-xl border border-slate-800 bg-[#040c1e] p-4 text-center">
                    <div className="text-2xl font-extrabold text-white">1.840</div>
                    <div className="text-xs text-slate-400 mt-1">Check-in Realizados</div>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-[#040c1e] p-4 text-center">
                    <div className="text-2xl font-extrabold text-emerald-400">74%</div>
                    <div className="text-xs text-slate-400 mt-1">Taxa de Ocupação</div>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-[#040c1e] p-4 text-center">
                    <div className="text-2xl font-extrabold text-[#0084FF]">&lt; 1,5s</div>
                    <div className="text-xs text-slate-400 mt-1">Tempo Médio de Leitura</div>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-[#040c1e] p-4 text-center">
                    <div className="text-2xl font-extrabold text-white">4 Portas</div>
                    <div className="text-xs text-slate-400 mt-1">Acessos em Operação</div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 7: PATROCINADORES */}
            {activeView === "patrocinadores" && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="flex justify-between items-center border-b border-slate-800/80 pb-5">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Patrocinadores & Parceiros</h1>
                    <p className="mt-1 text-xs text-slate-400">Gira cotas de patrocínio e marcas parceiras do evento.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const novoNome = prompt("Nome do patrocinador:");
                      if (novoNome) {
                        setSponsors([...sponsors, { id: uid(), nome: novoNome, cor: "#0084FF", cota: "Ouro", tel: "+244 923 000 000" }]);
                        toast.success(`Patrocinador ${novoNome} adicionado!`);
                      }
                    }}
                    className="rounded-lg bg-[#0080FF] px-4 py-2 text-xs font-bold text-white hover:bg-[#0070e0] cursor-pointer"
                  >
                    + Adicionar Patrocinador
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {sponsors.map((s) => (
                    <div key={s.id} className="rounded-2xl border border-slate-800 bg-[#040c1e] p-5 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-[#0084FF] bg-blue-950 px-2 py-0.5 rounded">
                          Cota {s.cota}
                        </span>
                        <Handshake size={16} className="text-slate-500" />
                      </div>
                      <h3 className="text-base font-bold text-white">{s.nome}</h3>
                      <p className="text-xs text-slate-400">Contacto: {s.tel}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 8: EXPOSITORES */}
            {activeView === "expositores" && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="flex justify-between items-center border-b border-slate-800/80 pb-5">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Expositores & Stands</h1>
                    <p className="mt-1 text-xs text-slate-400">Controlo de stands na área de exposição do evento.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const novoExp = prompt("Nome do expositor:");
                      if (novoExp) {
                        setExpositores([...expositores, { id: uid(), nome: novoExp, stand: `Stand D-${expositores.length + 1}`, area: "20 m²", leads: 0, status: "Confirmado" }]);
                        toast.success(`Expositor ${novoExp} registado!`);
                      }
                    }}
                    className="rounded-lg bg-[#0080FF] px-4 py-2 text-xs font-bold text-white hover:bg-[#0070e0] cursor-pointer"
                  >
                    + Registar Expositor
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {expositores.map((exp) => (
                    <div key={exp.id} className="rounded-2xl border border-slate-800 bg-[#040c1e] p-5 space-y-2">
                      <span className="text-xs font-bold text-[#0084FF]">{exp.stand}</span>
                      <h3 className="text-sm font-bold text-white">{exp.nome}</h3>
                      <div className="text-xs text-slate-400">Área: {exp.area}</div>
                      <div className="text-xs text-emerald-400 font-semibold">{exp.leads} leads captados</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 9: PALESTRANTES */}
            {activeView === "palestrantes" && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="flex justify-between items-center border-b border-slate-800/80 pb-5">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Diretório de Palestrantes</h1>
                    <p className="mt-1 text-xs text-slate-400">Oradores e especialistas convidados para as palestras.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingSpeaker("new");
                      setSpeakerForm({ nome: "", cargo: "", tag: "Tecnologia", img: martaImage });
                    }}
                    className="rounded-lg bg-[#0080FF] px-4 py-2 text-xs font-bold text-white hover:bg-[#0070e0] cursor-pointer"
                  >
                    + Convidar Palestrante
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  {palestrantes.map((spk) => (
                    <div key={spk.id} className="rounded-2xl border border-slate-800 bg-[#040c1e] p-4 text-center space-y-3">
                      <img src={spk.img} alt={spk.nome} className="mx-auto h-20 w-20 rounded-full object-cover ring-2 ring-blue-500/40" />
                      <div>
                        <h3 className="text-xs font-bold text-white">{spk.nome}</h3>
                        <p className="text-[10px] text-slate-400">{spk.cargo}</p>
                      </div>
                      <span className="inline-block rounded bg-blue-600/20 px-2 py-0.5 text-[9px] font-bold text-[#0084FF]">
                        {spk.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 10: EQUIPA */}
            {activeView === "equipa" && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="flex justify-between items-center border-b border-slate-800/80 pb-5">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Equipa de Organização</h1>
                    <p className="mt-1 text-xs text-slate-400">Membros e operadores com acesso ao sistema do evento.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toast.info("Link de convite para novo membro gerado e copiado!")}
                    className="rounded-lg bg-[#0080FF] px-4 py-2 text-xs font-bold text-white hover:bg-[#0070e0] cursor-pointer"
                  >
                    + Convidar Membro
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {equipa.map((m) => (
                    <div key={m.id} className="rounded-2xl border border-slate-800 bg-[#040c1e] p-5 space-y-3">
                      <div className="flex items-center gap-3">
                        <img src={m.img} alt={m.nome} className="h-10 w-10 rounded-full object-cover" />
                        <div>
                          <h3 className="text-xs font-bold text-white">{m.nome}</h3>
                          <span className="text-[10px] text-[#0084FF] font-semibold">{m.nivel}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300">{m.cargo}</p>
                      <p className="text-[10px] text-slate-500 truncate">{m.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 11: RELATÓRIOS */}
            {activeView === "relatorios" && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="flex justify-between items-center border-b border-slate-800/80 pb-5">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Relatórios & Estatísticas</h1>
                    <p className="mt-1 text-xs text-slate-400">Desempenho financeiro e taxa de satisfação do público.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toast.success("Relatório gerencial oficial exportado em PDF!")}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#0080FF] px-4 py-2 text-xs font-bold text-white hover:bg-[#0070e0] cursor-pointer"
                  >
                    <Download size={14} /> Descarregar PDF
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="rounded-2xl border border-slate-800 bg-[#040c1e] p-5 text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold text-white">40.900.000 Kz</div>
                    <div className="text-xs text-slate-400 mt-1">Receita Total de Bilhetes</div>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-[#040c1e] p-5 text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">98,4%</div>
                    <div className="text-xs text-slate-400 mt-1">Índice de Satisfação</div>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-[#040c1e] p-5 text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#0084FF]">2.480</div>
                    <div className="text-xs text-slate-400 mt-1">Participantes Presentes</div>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-[#040c1e] p-5 text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">+530</div>
                    <div className="text-xs text-slate-400 mt-1">Leads Comerciais Gerados</div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 12: CONFIGURAÇÕES */}
            {activeView === "configuracoes" && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="border-b border-slate-800/80 pb-5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Configurações Gerais</h1>
                  <p className="mt-1 text-xs text-slate-400">Preferências da organização e dados de faturação.</p>
                </div>

                <div className="max-w-2xl rounded-2xl border border-slate-800 bg-[#040c1e] p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-white mb-1.5">Nome da Organização</label>
                    <input
                      type="text"
                      defaultValue="Kianda Eventos / EventPro Angola"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white mb-1.5">E-mail Principal</label>
                    <input
                      type="email"
                      defaultValue="contacto@eventpro.ao"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs text-white"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => toast.success("Configurações atualizadas!")}
                    className="rounded-lg bg-[#0080FF] px-5 py-2 text-xs font-bold text-white hover:bg-[#0070e0]"
                  >
                    Guardar Configurações
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* 13. USER PROFILE MODAL (EVARISTO CASSOMA) */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl border border-blue-500/40 bg-[#040d22] p-6 shadow-2xl text-slate-100 space-y-5">
            <button
              type="button"
              onClick={() => setIsProfileOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="text-center space-y-2">
              <img
                src={evaristoImage}
                alt="Evaristo Cassoma"
                className="mx-auto h-20 w-20 rounded-full object-cover ring-4 ring-[#0084FF]/40 shadow-xl"
              />
              <h3 className="text-lg font-extrabold text-white">Evaristo Cassoma</h3>
              <div className="inline-block rounded-full bg-blue-600/30 border border-blue-500/40 px-3 py-0.5 text-xs font-bold text-[#0084FF]">
                Administrador Master
              </div>
              <p className="text-xs text-slate-400">evaristopaulocassoma2352@gmail.com</p>
            </div>

            <div className="space-y-2.5 rounded-xl border border-slate-800 bg-[#061026] p-4 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Nível de Acesso:</span>
                <strong className="text-white">Acesso Total (Super Admin)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Organização:</span>
                <strong className="text-white">EventPro Angola</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sessão:</span>
                <span className="text-emerald-400 font-bold">● Ativa e Segura</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  toast.success("Perfil sincronizado!");
                  setIsProfileOpen(false);
                }}
                className="flex-1 rounded-lg bg-[#0080FF] py-2.5 text-xs font-bold text-white hover:bg-[#0070e0] cursor-pointer"
              >
                Concluir
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsProfileOpen(false);
                  onClose();
                }}
                className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL BIBLIOTECA DE FOTOS */}
      {libraryTarget && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-2xl border border-blue-500/40 bg-[#040d22] p-6 shadow-2xl text-slate-100 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Escolher / Trocar Fotografia</h3>
                <p className="text-xs text-slate-400">Carregue uma imagem ou selecione da biblioteca profissional EventPro.</p>
              </div>
              <button
                type="button"
                onClick={() => setLibraryTarget(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/60 text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {libraryPhotos.map((p) => (
                <div
                  key={p.name}
                  onClick={() => handleSelectLibraryPhoto(p.url)}
                  className="group cursor-pointer rounded-xl border border-slate-800 bg-[#061129] overflow-hidden hover:border-blue-500 transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={p.url} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-2.5">
                    <span className="text-[9px] font-bold uppercase text-[#0084FF]">{p.categoria}</span>
                    <div className="text-xs font-semibold text-white truncate">{p.name}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setLibraryTarget(null)}
                className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PALESTRANTE */}
      {editingSpeaker && (
        <div className="fixed inset-0 z-[125] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleSaveSpeaker}
            className="w-full max-w-md rounded-2xl border border-blue-500/40 bg-[#060e22] p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">
                {editingSpeaker === "new" ? "Adicionar Palestrante" : "Editar Palestrante"}
              </h3>
              <button type="button" onClick={() => setEditingSpeaker(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300">Nome</label>
              <input
                type="text"
                required
                value={speakerForm.nome}
                onChange={(e) => setSpeakerForm({ ...speakerForm, nome: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white outline-none focus:border-[#0080FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300">Cargo / Empresa</label>
              <input
                type="text"
                required
                value={speakerForm.cargo}
                onChange={(e) => setSpeakerForm({ ...speakerForm, cargo: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white outline-none focus:border-[#0080FF]"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingSpeaker(null)}
                className="flex-1 rounded-lg border border-slate-700 bg-slate-900 py-2 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 rounded-lg bg-[#0080FF] py-2 text-xs font-bold text-white hover:bg-[#0070e0] cursor-pointer"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
