import { useState, useEffect, useRef, useMemo } from 'react';
import {
  Plus, X, Instagram, TrendingUp, Users, CheckCircle2,
  Banknote, Trash2, Search, ArrowUpRight, Calendar,
  GripVertical, Calculator, Layout, Zap, Droplet, Wifi,
  Wrench, Car, Coffee, Camera, Clock, Percent, Info,
  Check, Minus, FileDown, FolderPlus, Target, Sparkles,
  Grid3x3, Film, Scissors, Palette, Sun, Mic,
  FileText, BookOpen, BarChart3, Receipt, Wallet,
  TrendingDown, AlertCircle, Briefcase, Truck,
  ScrollText, FileSignature, KeyRound, Package,
  ClipboardCheck, ArrowRight
} from 'lucide-react';

/* ============================================================
   BRAND
============================================================ */

const ClaquiLogo = ({ size = 32, idPrefix = 'cl' }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id={`${idPrefix}-bg`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1e293b"/>
        <stop offset="100%" stopColor="#0f172a"/>
      </linearGradient>
    </defs>
    <rect width="200" height="200" rx="44" fill={`url(#${idPrefix}-bg)`}/>
    <ellipse cx="100" cy="-10" rx="120" ry="50" fill="white" opacity="0.06"/>
    <g transform="translate(54 116) rotate(-11)">
      <rect x="0"  y="-18" width="14" height="18" rx="2.5" fill="#fafaf9"/>
      <rect x="20" y="-30" width="14" height="30" rx="2.5" fill="#fafaf9"/>
      <rect x="40" y="-44" width="14" height="44" rx="2.5" fill="#fafaf9"/>
      <rect x="60" y="-62" width="14" height="62" rx="2.5" fill="#10b981"/>
    </g>
    <rect x="38" y="124" width="124" height="40" rx="9" fill="#fafaf9"/>
    <line x1="78"  y1="124" x2="78"  y2="164" stroke="#cbd5e1" strokeWidth="1.5"/>
    <line x1="122" y1="124" x2="122" y2="164" stroke="#cbd5e1" strokeWidth="1.5"/>
    <line x1="38"  y1="144" x2="162" y2="144" stroke="#cbd5e1" strokeWidth="1.5"/>
  </svg>
);

/* ============================================================
   PIPELINE DATA
============================================================ */

const COLUMNS = [
  { id: 'prospect',   title: 'Prospect',          dot: 'bg-stone-400'   },
  { id: 'contato',    title: 'Primeiro Contato',  dot: 'bg-sky-400'     },
  { id: 'negociacao', title: 'Em Negociação',     dot: 'bg-amber-400'   },
  { id: 'proposta',   title: 'Proposta Enviada',  dot: 'bg-violet-400'  },
  { id: 'fechado',    title: 'Fechado',           dot: 'bg-emerald-400' },
];

const SEGMENTS = {
  atelier:     { label: 'Ateliê de Noivas', tone: 'bg-rose-50 text-rose-700 ring-rose-200' },
  joalheria:   { label: 'Joalheria',        tone: 'bg-amber-50 text-amber-800 ring-amber-200' },
  moda:        { label: 'Moda Autoral',     tone: 'bg-indigo-50 text-indigo-700 ring-indigo-200' },
  fragrancia:  { label: 'Fragrância',       tone: 'bg-violet-50 text-violet-700 ring-violet-200' },
  acessorios:  { label: 'Acessórios',       tone: 'bg-teal-50 text-teal-700 ring-teal-200' },
  outro:       { label: 'Outro',            tone: 'bg-stone-100 text-stone-700 ring-stone-200' },
};

const seed = [
  { id: 'l1', name: 'Atelier Lumi Noivas', segment: 'atelier',    instagram: '@atelierlumi',    value: 4500, status: 'prospect',   notes: 'Posts caseiros, alto potencial pra editorial.', updated: Date.now() - 86400000*2 },
  { id: 'l2', name: 'Casa Verani',         segment: 'atelier',    instagram: '@casaverani',     value: 6800, status: 'prospect',   notes: 'Atendimento high-end, pede catálogo de inverno.', updated: Date.now() - 86400000*5 },
  { id: 'l3', name: 'Joalheria Aurum',     segment: 'joalheria',  instagram: '@joalheriaaurum', value: 5200, status: 'contato',    notes: 'Respondeu DM, aguarda envio de portfólio.',     updated: Date.now() - 86400000 },
  { id: 'l4', name: 'Marca M.A.',          segment: 'moda',       instagram: '@marca.ma',       value: 3200, status: 'negociacao', notes: 'Conversa sobre lookbook outono/inverno.',       updated: Date.now() - 3600000*6 },
  { id: 'l5', name: 'Studio Folha',        segment: 'acessorios', instagram: '@studio.folha',   value: 2400, status: 'negociacao', notes: 'Quer pacote mensal de still.',                  updated: Date.now() - 3600000*30 },
  { id: 'l6', name: 'AVAR Collection',     segment: 'fragrancia', instagram: '@avarcollection', value: 9800, status: 'proposta',   notes: 'Proposta enviada na sexta. Follow-up segunda.', updated: Date.now() - 86400000*3 },
  { id: 'l7', name: 'Belluci Joias',       segment: 'joalheria',  instagram: '@bellucijoias',   value: 7200, status: 'fechado',    notes: 'Sessão agendada pra 15/05. Sinal recebido.',    updated: Date.now() - 86400000*4 },
];

/* ============================================================
   CALCULATOR DEFAULTS — with Operacional Terceirizado
============================================================ */

const calcDefaults = {
  fixos: {
    aluguel: 0, luz: 200, agua: 80, internet: 120,
    telefone: 50, contadorMei: 0, dasMei: 75, softwares: 150,
  },
  equipamento: { valorTotal: 25000, vidaUtilMeses: 60 },
  trabalho: {
    diasMes: 20,
    horasDia: 8,
    direcaoCriativa: 30, // % sobre execução total
  },
  projeto: {
    deslocamentoKm: 0, custoKm: 1.20, alimentacao: 50,
    locacao: 0, materiais: 0,
  },
  // NOVO: equipe terceirizada
  operacional: {
    fotografo: 0,
    videomaker: 0,
    editor: 0,
    maquiador: 0,
    iluminador: 0,
    outros: 0,
  },
  duracaoHoras: 4,
  metaMensal: 8000,
};

/* ============================================================
   FEATURES (Recursos tab) — categorized roadmap
============================================================ */

const FEATURE_CATS = {
  vendas:   { label: 'Vendas',         color: 'emerald', icon: TrendingUp },
  financas: { label: 'Finanças',       color: 'sky',     icon: BarChart3  },
  admin:    { label: 'Administração',  color: 'rose',    icon: Briefcase  },
};

const STATUS_BADGE = {
  live:    { label: 'Disponível', tone: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
  soon:    { label: 'Em breve',   tone: 'bg-amber-50 text-amber-700 ring-amber-200' },
  planned: { label: 'Roadmap',    tone: 'bg-stone-100 text-stone-600 ring-stone-200' },
};

const FEATURES = [
  // VENDAS
  { id: 'kanban',     cat: 'vendas',   icon: Layout,         title: 'Pipeline Kanban',        desc: 'Drag-and-drop por etapa de venda, do prospect ao fechado.', status: 'live' },
  { id: 'orcamento',  cat: 'vendas',   icon: Calculator,     title: 'Orçamento profissional', desc: 'Calculadora audiovisual completa, exportável em PDF.',     status: 'live' },
  { id: 'clientes',   cat: 'vendas',   icon: Users,          title: 'Banco de clientes',       desc: 'Histórico, segmentação por nicho e busca rápida.',          status: 'live' },
  { id: 'contratos',  cat: 'vendas',   icon: ScrollText,     title: 'Contratos digitais',      desc: 'Templates por tipo de trabalho com campos automáticos.',     status: 'soon' },
  { id: 'agenda',     cat: 'vendas',   icon: Calendar,       title: 'Agenda integrada',        desc: 'Sessões, follow-ups e prazos sincronizados ao Google.',     status: 'soon' },
  { id: 'pacotes',    cat: 'vendas',   icon: Package,        title: 'Pacotes pré-definidos',   desc: 'Salve combinações recorrentes e orce em segundos.',         status: 'soon' },
  { id: 'historico',  cat: 'vendas',   icon: Clock,          title: 'Histórico do cliente',    desc: 'Tudo que rolou com cada cliente num só lugar.',             status: 'live' },

  // FINANÇAS
  { id: 'calc',       cat: 'financas', icon: Calculator,     title: 'Calculadora audiovisual', desc: 'Custo-hora real, equipe terceirizada e direção criativa.', status: 'live' },
  { id: 'das',        cat: 'financas', icon: Receipt,        title: 'DAS MEI automático',      desc: 'Lembrete e cálculo do imposto MEI todo mês.',                status: 'soon' },
  { id: 'dre',        cat: 'financas', icon: BookOpen,       title: 'DRE simplificada',        desc: 'Demonstrativo de resultado em linguagem de produtor.',      status: 'soon' },
  { id: 'dashboard',  cat: 'financas', icon: BarChart3,      title: 'Dashboard financeiro',    desc: 'Receita, custo e lucro do mês em tempo real.',              status: 'soon' },
  { id: 'despesas',   cat: 'financas', icon: Wallet,         title: 'Categorização de despesas', desc: 'Locação, equipe, deslocamento — tudo categorizado.',      status: 'soon' },
  { id: 'projeto',    cat: 'financas', icon: TrendingUp,     title: 'P&L por projeto',         desc: 'Veja quanto cada trabalho gerou de lucro real.',            status: 'soon' },
  { id: 'inadimp',    cat: 'financas', icon: AlertCircle,    title: 'Gestão de inadimplência', desc: 'Cobranças automáticas por Pix e WhatsApp.',                 status: 'soon' },
  { id: 'pix-split',  cat: 'financas', icon: Banknote,       title: 'Pix-Split para equipe',   desc: 'Pague freelancers direto do app, com split automático.',    status: 'planned' },

  // ADMINISTRAÇÃO
  { id: 'equipe',     cat: 'admin',    icon: Users,          title: 'Cadastro de freelancers', desc: 'Diárias, especialidade e disponibilidade dos parceiros.',   status: 'soon' },
  { id: 'entregas',   cat: 'admin',    icon: ClipboardCheck, title: 'Status de entregas',      desc: 'Acompanhe edições, revisões e arquivos finais.',            status: 'soon' },
  { id: 'templates',  cat: 'admin',    icon: FileText,       title: 'Templates de proposta',   desc: 'Reutilize e customize propostas em poucos cliques.',        status: 'soon' },
  { id: 'assinatura', cat: 'admin',    icon: FileSignature,  title: 'Assinatura digital',      desc: 'Cliente assina contrato pelo celular, sem impressão.',      status: 'planned' },
  { id: 'acessos',    cat: 'admin',    icon: KeyRound,       title: 'Acessos da equipe',       desc: 'Convide colaboradores com permissões granulares.',          status: 'planned' },
  { id: 'relatorios', cat: 'admin',    icon: FileDown,       title: 'Relatórios exportáveis',  desc: 'PDF e CSV pra contador, sócio ou banco.',                   status: 'soon' },
  { id: 'nfe',        cat: 'admin',    icon: Receipt,        title: 'NF-e via parceiro',       desc: 'Emissão integrada com emissor licenciado.',                 status: 'planned' },
];

/* ============================================================
   UTILS
============================================================ */

const fmtBRL = (n) => (n || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const fmtBRLDec = (n) => (n || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 });

const fmtDate = (ts) => {
  const diff = Date.now() - ts;
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(h / 24);
  if (h < 1) return 'agora';
  if (h < 24) return `${h}h atrás`;
  if (d === 1) return 'ontem';
  if (d < 7) return `${d}d atrás`;
  return new Date(ts).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
};

const todayBR = () => new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
const validUntilBR = (days = 15) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
};

/* ============================================================
   APP ROOT
============================================================ */

export default function App() {
  const [tab, setTab] = useState('pipeline');
  const [leads, setLeads] = useState(seed);
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const v = localStorage.getItem('claqui:leads');
        const r = v ? { value: v } : null;
        if (r && r.value) {
          const parsed = JSON.parse(r.value);
          if (Array.isArray(parsed) && parsed.length) setLeads(parsed);
        }
      } catch (e) {}
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem('claqui:leads', JSON.stringify(leads)); } catch (e) {}
  }, [leads, loaded]);

  const showToast = (message) => {
    setToast({ message });
    setTimeout(() => setToast(null), 3500);
  };

  const addLead = (lead) => {
    setLeads(prev => [...prev, { ...lead, id: 'l' + Date.now(), updated: Date.now() }]);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 antialiased" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif' }}>
      <Header tab={tab} setTab={setTab} />
      {tab === 'pipeline'    && <PipelineView leads={leads} setLeads={setLeads} />}
      {tab === 'calculadora' && <CalculatorView addLead={addLead} setTab={setTab} showToast={showToast} />}
      {tab === 'recursos'    && <RecursosView setTab={setTab} />}
      {toast && <Toast {...toast} />}

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   HEADER + TABS
============================================================ */

function Header({ tab, setTab }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/70 border-b border-stone-200/60 no-print">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center gap-6">
        <button onClick={() => setTab('pipeline')} className="flex items-center gap-2.5">
          <ClaquiLogo size={32} idPrefix="hd" />
          <div className="text-left">
            <h1 className="text-[15px] font-semibold tracking-tight leading-none">Claqui</h1>
            <p className="text-[11px] text-stone-500 leading-none mt-1">Sistema operacional do produtor</p>
          </div>
        </button>

        <nav className="flex items-center gap-1 bg-stone-100/80 rounded-full p-1">
          <TabBtn active={tab === 'pipeline'}    onClick={() => setTab('pipeline')}>    <Layout className="w-3.5 h-3.5" /> Pipeline    </TabBtn>
          <TabBtn active={tab === 'calculadora'} onClick={() => setTab('calculadora')}> <Calculator className="w-3.5 h-3.5" /> Calculadora </TabBtn>
          <TabBtn active={tab === 'recursos'}    onClick={() => setTab('recursos')}>    <Grid3x3 className="w-3.5 h-3.5" /> Recursos    </TabBtn>
        </nav>

        <div className="flex-1" />
      </div>
    </header>
  );
}

function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3.5 py-1.5 text-[12.5px] font-medium rounded-full transition-all ${
        active ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
      }`}
    >
      {children}
    </button>
  );
}

/* ============================================================
   TOAST
============================================================ */

function Toast({ message }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 no-print" style={{ animation: 'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)' }}>
      <div className="bg-stone-900 text-white px-5 py-3 rounded-full shadow-2xl text-[13.5px] font-medium flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4" />
        {message}
      </div>
      <style>{`@keyframes slideUp { from { opacity: 0; transform: translate(-50%, 16px); } to { opacity: 1; transform: translate(-50%, 0); } }`}</style>
    </div>
  );
}

/* ============================================================
   PIPELINE VIEW
============================================================ */

function PipelineView({ leads, setLeads }) {
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [query, setQuery] = useState('');
  const [draggingId, setDraggingId] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);

  const filtered = query.trim()
    ? leads.filter(l =>
        l.name.toLowerCase().includes(query.toLowerCase()) ||
        l.instagram.toLowerCase().includes(query.toLowerCase()) ||
        (l.notes || '').toLowerCase().includes(query.toLowerCase()))
    : leads;

  const stats = {
    total: leads.length,
    ativo: leads.filter(l => ['contato','negociacao','proposta'].includes(l.status)).length,
    fechado: leads.filter(l => l.status === 'fechado').length,
    valor: leads.filter(l => l.status !== 'fechado').reduce((s, l) => s + (l.value || 0), 0),
    fechadoValor: leads.filter(l => l.status === 'fechado').reduce((s, l) => s + (l.value || 0), 0),
  };

  const moveCard = (id, status) =>
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status, updated: Date.now() } : l));

  const upsert = (lead) => {
    setLeads(prev => {
      const exists = prev.find(l => l.id === lead.id);
      const next = { ...lead, updated: Date.now() };
      return exists ? prev.map(l => l.id === lead.id ? next : l) : [...prev, next];
    });
    setEditing(null); setAdding(false);
  };

  const remove = (id) => { setLeads(prev => prev.filter(l => l.id !== id)); setEditing(null); };

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 max-w-md relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar leads, @ ou notas"
              className="w-full pl-10 pr-4 py-2 text-[13.5px] bg-stone-100/80 hover:bg-stone-100 focus:bg-white rounded-full border border-transparent focus:border-stone-300 focus:outline-none transition-all placeholder:text-stone-400"
            />
          </div>
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-[13.5px] font-medium text-white bg-stone-900 hover:bg-stone-800 active:scale-[0.97] rounded-full transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} /> Novo lead
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard icon={<Users className="w-4 h-4" />}        label="Leads ativos"       value={stats.total}             hint={`${stats.ativo} em movimento`} />
          <StatCard icon={<TrendingUp className="w-4 h-4" />}    label="Em negociação"      value={stats.ativo}             hint="contato, negociação, proposta" />
          <StatCard icon={<CheckCircle2 className="w-4 h-4" />}  label="Fechados"           value={stats.fechado}           hint={fmtBRL(stats.fechadoValor) + ' faturado'} accent />
          <StatCard icon={<Banknote className="w-4 h-4" />}      label="Pipeline em aberto" value={fmtBRL(stats.valor)}     hint="valor potencial" big />
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {COLUMNS.map(col => {
            const cards = filtered.filter(l => l.status === col.id);
            const total = cards.reduce((s, l) => s + (l.value || 0), 0);
            const isOver = dragOverCol === col.id;
            return (
              <div
                key={col.id}
                onDragOver={(e) => { e.preventDefault(); setDragOverCol(col.id); }}
                onDragLeave={() => setDragOverCol(null)}
                onDrop={() => { if (draggingId) moveCard(draggingId, col.id); setDraggingId(null); setDragOverCol(null); }}
                className={`rounded-2xl p-3 transition-all ${isOver ? 'bg-stone-200/70 ring-2 ring-stone-400/40' : 'bg-stone-100/60'}`}
              >
                <div className="flex items-center justify-between px-2 pt-1 pb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                    <h2 className="text-[13px] font-semibold tracking-tight">{col.title}</h2>
                    <span className="text-[11px] text-stone-500 tabular-nums">{cards.length}</span>
                  </div>
                  {total > 0 && <span className="text-[10.5px] text-stone-500 tabular-nums">{fmtBRL(total)}</span>}
                </div>
                <div className="space-y-2 min-h-[60px]">
                  {cards.length === 0 && (
                    <div className="text-center py-8 px-3"><p className="text-[12px] text-stone-400">Arraste leads aqui</p></div>
                  )}
                  {cards.map(lead => (
                    <Card
                      key={lead.id}
                      lead={lead}
                      onClick={() => setEditing(lead)}
                      onDragStart={() => setDraggingId(lead.id)}
                      onDragEnd={() => { setDraggingId(null); setDragOverCol(null); }}
                      isDragging={draggingId === lead.id}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {(adding || editing) && (
        <LeadModal lead={editing} onClose={() => { setAdding(false); setEditing(null); }} onSave={upsert} onDelete={editing ? () => remove(editing.id) : null} />
      )}
    </>
  );
}

function StatCard({ icon, label, value, hint, accent, big }) {
  return (
    <div className={`rounded-2xl p-4 border ${accent ? 'bg-gradient-to-br from-emerald-50 to-white border-emerald-100' : 'bg-white border-stone-200/70'}`} style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
      <div className="flex items-center gap-1.5 text-stone-500">
        <span className={accent ? 'text-emerald-600' : 'text-stone-400'}>{icon}</span>
        <span className="text-[11.5px] font-medium tracking-tight uppercase">{label}</span>
      </div>
      <div className={`mt-2.5 font-semibold tracking-tight tabular-nums ${big ? 'text-[22px]' : 'text-[26px]'} ${accent ? 'text-emerald-700' : 'text-stone-900'}`}>{value}</div>
      <p className="text-[11.5px] text-stone-500 mt-0.5">{hint}</p>
    </div>
  );
}

function Card({ lead, onClick, onDragStart, onDragEnd, isDragging }) {
  const seg = SEGMENTS[lead.segment] || SEGMENTS.outro;
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className={`group bg-white rounded-xl p-3 border border-stone-200/80 cursor-grab active:cursor-grabbing hover:shadow-md hover:-translate-y-px hover:border-stone-300 transition-all duration-200 ${isDragging ? 'opacity-40 rotate-1 scale-95' : ''}`}
      style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[13.5px] font-semibold tracking-tight leading-tight flex-1">{lead.name}</h3>
        <GripVertical className="w-3.5 h-3.5 text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <span className={`text-[10.5px] font-medium px-2 py-0.5 rounded-full ring-1 ring-inset ${seg.tone}`}>{seg.label}</span>
      </div>
      {lead.notes && <p className="mt-2.5 text-[12px] text-stone-600 leading-snug line-clamp-2">{lead.notes}</p>}
      <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
        <a href={`https://instagram.com/${lead.instagram.replace('@','')}`} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 text-[11px] text-stone-500 hover:text-stone-900 transition-colors">
          <Instagram className="w-3 h-3" /> {lead.instagram}
        </a>
        <span className="text-[12px] font-semibold tabular-nums text-stone-900">{fmtBRL(lead.value || 0)}</span>
      </div>
      <div className="mt-1.5 flex items-center gap-1 text-[10.5px] text-stone-400">
        <Calendar className="w-3 h-3" /> {fmtDate(lead.updated)}
      </div>
    </div>
  );
}

function LeadModal({ lead, onClose, onSave, onDelete }) {
  const [form, setForm] = useState(lead || {
    id: 'l' + Date.now(),
    name: '', segment: 'atelier', instagram: '@',
    value: 0, status: 'prospect', notes: '', updated: Date.now(),
  });
  const firstFieldRef = useRef(null);

  useEffect(() => { firstFieldRef.current?.focus(); }, []);
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [onClose]);

  const valid = form.name.trim().length > 0;

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 bg-stone-900/30 backdrop-blur-md flex items-center justify-center p-4 animate-in no-print">
      <div onClick={e => e.stopPropagation()} className="bg-white rounded-3xl w-full max-w-md border border-stone-200/60 overflow-hidden" style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
        <div className="flex items-center justify-between px-6 pt-5 pb-2">
          <div>
            <h2 className="text-[17px] font-semibold tracking-tight">{lead ? 'Editar lead' : 'Novo lead'}</h2>
            <p className="text-[12px] text-stone-500 mt-0.5">Detalhes do prospect</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-stone-500" />
          </button>
        </div>

        <div className="px-6 py-4 space-y-4">
          <Field label="Nome do cliente">
            <input ref={firstFieldRef} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Atelier Lumi Noivas" className="w-full px-3.5 py-2.5 text-[14px] bg-stone-100 hover:bg-stone-50 focus:bg-white rounded-xl border border-transparent focus:border-stone-300 focus:outline-none transition-all" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Segmento">
              <select value={form.segment} onChange={e => setForm({ ...form, segment: e.target.value })} className="w-full px-3.5 py-2.5 text-[14px] bg-stone-100 hover:bg-stone-50 focus:bg-white rounded-xl border border-transparent focus:border-stone-300 focus:outline-none transition-all appearance-none">
                {Object.entries(SEGMENTS).map(([k, v]) => (<option key={k} value={k}>{v.label}</option>))}
              </select>
            </Field>
            <Field label="Etapa">
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full px-3.5 py-2.5 text-[14px] bg-stone-100 hover:bg-stone-50 focus:bg-white rounded-xl border border-transparent focus:border-stone-300 focus:outline-none transition-all appearance-none">
                {COLUMNS.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Instagram">
              <input value={form.instagram} onChange={e => setForm({ ...form, instagram: e.target.value.startsWith('@') ? e.target.value : '@' + e.target.value })} placeholder="@usuario" className="w-full px-3.5 py-2.5 text-[14px] bg-stone-100 hover:bg-stone-50 focus:bg-white rounded-xl border border-transparent focus:border-stone-300 focus:outline-none transition-all" />
            </Field>
            <Field label="Valor (R$)">
              <input type="number" value={form.value} onChange={e => setForm({ ...form, value: parseFloat(e.target.value) || 0 })} placeholder="0" className="w-full px-3.5 py-2.5 text-[14px] bg-stone-100 hover:bg-stone-50 focus:bg-white rounded-xl border border-transparent focus:border-stone-300 focus:outline-none transition-all tabular-nums" />
            </Field>
          </div>
          <Field label="Notas">
            <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3} placeholder="Contexto, próximos passos, observações…" className="w-full px-3.5 py-2.5 text-[14px] bg-stone-100 hover:bg-stone-50 focus:bg-white rounded-xl border border-transparent focus:border-stone-300 focus:outline-none transition-all resize-none leading-snug" />
          </Field>
        </div>

        <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
          {onDelete ? (
            <button onClick={() => { if (confirm('Excluir este lead?')) onDelete(); }} className="flex items-center gap-1.5 px-3 py-2 text-[13px] text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 className="w-3.5 h-3.5" /> Excluir
            </button>
          ) : <span />}
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-4 py-2 text-[13.5px] font-medium text-stone-700 hover:bg-stone-200/60 rounded-full transition-colors">Cancelar</button>
            <button onClick={() => valid && onSave(form)} disabled={!valid} className="flex items-center gap-1 px-4 py-2 text-[13.5px] font-medium text-white bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 disabled:cursor-not-allowed rounded-full transition-all active:scale-[0.97]">
              Salvar <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes modalIn { from { opacity: 0; transform: scale(0.96) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } } .animate-in > div { animation: modalIn 0.2s cubic-bezier(0.16, 1, 0.3, 1); }`}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-[11.5px] font-medium text-stone-500 tracking-tight uppercase block mb-1.5 ml-0.5">{label}</span>
      {children}
    </label>
  );
}

/* ============================================================
   CALCULATOR VIEW
============================================================ */

function CalculatorView({ addLead, setTab, showToast }) {
  const [calc, setCalc] = useState(calcDefaults);
  const [loaded, setLoaded] = useState(false);
  const [savingAsLead, setSavingAsLead] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const v = localStorage.getItem('claqui:calc');
        const r = v ? { value: v } : null;
        if (r && r.value) {
          const parsed = JSON.parse(r.value);
          // Deep-merge with defaults to support new fields
          setCalc({
            ...calcDefaults,
            ...parsed,
            fixos:        { ...calcDefaults.fixos,        ...(parsed.fixos        || {}) },
            equipamento:  { ...calcDefaults.equipamento,  ...(parsed.equipamento  || {}) },
            trabalho:     { ...calcDefaults.trabalho,     ...(parsed.trabalho     || {}) },
            projeto:      { ...calcDefaults.projeto,      ...(parsed.projeto      || {}) },
            operacional:  { ...calcDefaults.operacional,  ...(parsed.operacional  || {}) },
          });
        }
      } catch (e) {}
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem('claqui:calc', JSON.stringify(calc)); } catch (e) {}
  }, [calc, loaded]);

  const calculo = useMemo(() => {
    const fixosMensais = Object.values(calc.fixos).reduce((s, v) => s + (parseFloat(v) || 0), 0);
    const depreciacaoMensal = (calc.equipamento.valorTotal || 0) / (calc.equipamento.vidaUtilMeses || 60);
    const totalCustoMensal = fixosMensais + depreciacaoMensal;

    const horasMes = (calc.trabalho.diasMes || 1) * (calc.trabalho.horasDia || 1);
    const custoHora = totalCustoMensal / horasMes;

    const custoMinhaHora = custoHora * (calc.duracaoHoras || 1);

    const deslocamento = (calc.projeto.deslocamentoKm || 0) * (calc.projeto.custoKm || 0);
    const variaveis = deslocamento +
                      (parseFloat(calc.projeto.alimentacao) || 0) +
                      (parseFloat(calc.projeto.locacao) || 0) +
                      (parseFloat(calc.projeto.materiais) || 0);

    // Operacional terceirizado (equipe contratada)
    const operacionalTerceirizado = Object.values(calc.operacional).reduce((s, v) => s + (parseFloat(v) || 0), 0);

    // EXECUÇÃO = sua hora + variáveis do projeto + equipe terceirizada
    const custoExecucao = custoMinhaHora + variaveis + operacionalTerceirizado;

    // DIREÇÃO CRIATIVA = sua margem sobre TUDO que foi executado
    const direcaoCriativa = (custoExecucao * (calc.trabalho.direcaoCriativa || 0)) / 100;

    const precoCliente = custoExecucao + direcaoCriativa;

    return {
      fixosMensais, depreciacaoMensal, totalCustoMensal,
      horasMes, custoHora, custoMinhaHora,
      deslocamento, variaveis, operacionalTerceirizado,
      custoExecucao, direcaoCriativa, precoCliente,
    };
  }, [calc]);

  const updateField = (section, key, value) => {
    setCalc(prev => ({ ...prev, [section]: { ...prev[section], [key]: parseFloat(value) || 0 } }));
  };
  const updateRoot = (key, value) => {
    setCalc(prev => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };
  const reset = () => setCalc(calcDefaults);

  const handleSaveAsLead = (clientName, segment) => {
    addLead({
      name: clientName, segment, instagram: '@',
      value: Math.round(calculo.precoCliente), status: 'proposta',
      notes: `Orçamento gerado pela calculadora.\nDuração: ${calc.duracaoHoras}h\nExecução: ${fmtBRL(calculo.custoExecucao)}\nDireção criativa: ${calc.trabalho.direcaoCriativa}%`,
    });
    setSavingAsLead(false);
    showToast(`${clientName} salvo no Pipeline!`);
    setTimeout(() => setTab('pipeline'), 600);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 pb-20 space-y-12 no-print">

      {/* HERO */}
      <section>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-stone-900 to-stone-700 flex items-center justify-center shadow-sm flex-shrink-0">
            <Calculator className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-[28px] font-semibold tracking-tight leading-tight">Simulador de Orçamento</h1>
            <p className="text-[14px] text-stone-500 mt-1 max-w-xl leading-snug">
              Calcula custos fixos, depreciação, equipe terceirizada e direção criativa — separadas, sem misturar sua margem com a da equipe.
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-start gap-2.5 px-4 py-3 bg-amber-50/70 border border-amber-200/60 rounded-2xl">
          <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-[12.5px] text-amber-900 leading-snug">
            Os valores iniciais são <strong>referências de mercado brasileiro</strong> (ordens de grandeza típicas). Ajuste todos os campos com seus números reais.
          </p>
        </div>
      </section>

      <ComparisonTable />

      {/* CALC */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">

        <div className="space-y-5">
          <CalcSection title="Custos Fixos Mensais" subtitle="Conta tudo que você paga todo mês, com ou sem trabalho" icon={<Zap className="w-4 h-4" />} total={calculo.fixosMensais}>
            <CalcRow icon={<Camera className="w-4 h-4" />}  label="Aluguel / Estúdio"      value={calc.fixos.aluguel}   onChange={v => updateField('fixos','aluguel', v)} />
            <CalcRow icon={<Zap className="w-4 h-4" />}     label="Energia elétrica"       value={calc.fixos.luz}       onChange={v => updateField('fixos','luz', v)} hint="média BR ~ R$ 200" />
            <CalcRow icon={<Droplet className="w-4 h-4" />} label="Água"                   value={calc.fixos.agua}      onChange={v => updateField('fixos','agua', v)} hint="média BR ~ R$ 80" />
            <CalcRow icon={<Wifi className="w-4 h-4" />}    label="Internet"               value={calc.fixos.internet}  onChange={v => updateField('fixos','internet', v)} hint="banda larga ~ R$ 120" />
            <CalcRow icon={<Wifi className="w-4 h-4" />}    label="Telefone / Celular"     value={calc.fixos.telefone}  onChange={v => updateField('fixos','telefone', v)} />
            <CalcRow icon={<Camera className="w-4 h-4" />}  label="Softwares (Adobe, etc)" value={calc.fixos.softwares} onChange={v => updateField('fixos','softwares', v)} hint="Adobe CC ~ R$ 150" />
            <CalcRow icon={<Banknote className="w-4 h-4" />} label="DAS MEI"               value={calc.fixos.dasMei}    onChange={v => updateField('fixos','dasMei', v)} hint="2026 ~ R$ 75" />
            <CalcRow icon={<Banknote className="w-4 h-4" />} label="Contador"              value={calc.fixos.contadorMei} onChange={v => updateField('fixos','contadorMei', v)} />
          </CalcSection>

          <CalcSection title="Depreciação de Equipamento" subtitle="Custo mensal pra repor seu kit quando ele vencer" icon={<Camera className="w-4 h-4" />} total={calculo.depreciacaoMensal}>
            <CalcRow icon={<Camera className="w-4 h-4" />} label="Valor total do equipamento" value={calc.equipamento.valorTotal}     onChange={v => updateField('equipamento','valorTotal', v)} hint="câmera + lentes + acessórios" />
            <CalcRow icon={<Clock className="w-4 h-4" />}  label="Vida útil em meses"          value={calc.equipamento.vidaUtilMeses}  onChange={v => updateField('equipamento','vidaUtilMeses', v)} hint="60 = 5 anos" suffix="meses" noCurrency />
          </CalcSection>

          <CalcSection title="Sua jornada de trabalho" subtitle="Quantas horas produtivas você consegue por mês" icon={<Clock className="w-4 h-4" />}>
            <CalcRow icon={<Calendar className="w-4 h-4" />} label="Dias trabalhados por mês" value={calc.trabalho.diasMes}  onChange={v => updateField('trabalho','diasMes', v)} hint="20 dias úteis padrão" suffix="dias" noCurrency />
            <CalcRow icon={<Clock className="w-4 h-4" />}    label="Horas produtivas por dia" value={calc.trabalho.horasDia} onChange={v => updateField('trabalho','horasDia', v)} hint="6-8h é realista"     suffix="horas" noCurrency />
          </CalcSection>

          <CalcSection title="Custos do projeto" subtitle="Variáveis específicas deste trabalho" icon={<Wrench className="w-4 h-4" />} total={calculo.variaveis + calculo.custoMinhaHora}>
            <CalcRow icon={<Clock className="w-4 h-4" />}  label="Duração do trabalho"   value={calc.duracaoHoras}            onChange={v => updateRoot('duracaoHoras', v)} hint={`× custo-hora = ${fmtBRL(calculo.custoMinhaHora)}`} suffix="horas" noCurrency />
            <CalcRow icon={<Car className="w-4 h-4" />}    label="Deslocamento"          value={calc.projeto.deslocamentoKm}  onChange={v => updateField('projeto','deslocamentoKm', v)} hint={`× R$ ${calc.projeto.custoKm}/km = ${fmtBRL(calculo.deslocamento)}`} suffix="km" noCurrency />
            <CalcRow icon={<Coffee className="w-4 h-4" />} label="Alimentação"           value={calc.projeto.alimentacao}     onChange={v => updateField('projeto','alimentacao', v)} />
            <CalcRow icon={<Camera className="w-4 h-4" />} label="Locação extra"         value={calc.projeto.locacao}         onChange={v => updateField('projeto','locacao', v)} hint="estúdio, drone, etc" />
            <CalcRow icon={<Wrench className="w-4 h-4" />} label="Materiais"             value={calc.projeto.materiais}       onChange={v => updateField('projeto','materiais', v)} hint="figurino, fundo, props" />
          </CalcSection>

          {/* NOVO: Operacional Terceirizado */}
          <CalcSection
            title="Operacional Terceirizado"
            subtitle="Equipe contratada para este projeto. Embute no preço, não sai do seu lucro."
            icon={<Users className="w-4 h-4" />}
            total={calculo.operacionalTerceirizado}
            highlight
          >
            <CalcRow icon={<Camera className="w-4 h-4" />}  label="Fotógrafo"   value={calc.operacional.fotografo}  onChange={v => updateField('operacional','fotografo', v)}  hint="diária ~ R$ 800-2.000" />
            <CalcRow icon={<Film className="w-4 h-4" />}    label="Videomaker"  value={calc.operacional.videomaker} onChange={v => updateField('operacional','videomaker', v)} hint="diária ~ R$ 1.000-2.500" />
            <CalcRow icon={<Scissors className="w-4 h-4" />} label="Editor"     value={calc.operacional.editor}     onChange={v => updateField('operacional','editor', v)}     hint="por entrega ~ R$ 400-1.500" />
            <CalcRow icon={<Palette className="w-4 h-4" />} label="Maquiador"   value={calc.operacional.maquiador}  onChange={v => updateField('operacional','maquiador', v)}  hint="diária ~ R$ 350-800" />
            <CalcRow icon={<Sun className="w-4 h-4" />}     label="Iluminador"  value={calc.operacional.iluminador} onChange={v => updateField('operacional','iluminador', v)} hint="diária ~ R$ 400-900" />
            <CalcRow icon={<Mic className="w-4 h-4" />}     label="Outros"      value={calc.operacional.outros}     onChange={v => updateField('operacional','outros', v)}     hint="locutor, drone, técnico" />
          </CalcSection>

          {/* DIREÇÃO CRIATIVA */}
          <div className="bg-gradient-to-br from-violet-50 to-white border border-violet-200/60 rounded-2xl p-5" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-700 flex-shrink-0">
                <Sparkles className="w-4.5 h-4.5" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <h3 className="text-[15px] font-semibold tracking-tight text-violet-900">Direção Criativa</h3>
                <p className="text-[12px] text-violet-700/80 leading-snug mt-0.5">Sua margem por dirigir o projeto. Aplicada sobre toda a execução.</p>

                <div className="mt-4 flex items-center gap-3">
                  <input
                    type="number"
                    value={calc.trabalho.direcaoCriativa}
                    onChange={e => updateField('trabalho','direcaoCriativa', e.target.value)}
                    className="w-24 px-3 py-2 text-[18px] font-bold text-violet-900 text-center tabular-nums bg-white rounded-xl border border-violet-200 focus:border-violet-400 focus:outline-none transition-all"
                  />
                  <span className="text-[14px] font-semibold text-violet-700">%</span>
                  <span className="text-[11.5px] text-violet-700/70">sobre {fmtBRL(calculo.custoExecucao)} de execução</span>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-violet-700/80">
                  <Info className="w-3 h-3" />
                  30-50% é saudável · acima disso é trabalho premium ou exclusivo
                </div>
              </div>
            </div>
          </div>

          <GoalAnalysis
            metaMensal={calc.metaMensal}
            onChangeMeta={v => updateRoot('metaMensal', v)}
            precoCliente={calculo.precoCliente}
            duracao={calc.duracaoHoras}
            horasMes={calculo.horasMes}
            custoFixoMensal={calculo.totalCustoMensal}
          />

          <button onClick={reset} className="text-[12px] text-stone-500 hover:text-stone-900 transition-colors">
            ↺ Restaurar valores de referência
          </button>
        </div>

        <ResultPanel
          calculo={calculo}
          direcaoCriativaPct={calc.trabalho.direcaoCriativa}
          duracao={calc.duracaoHoras}
          onSaveAsLead={() => setSavingAsLead(true)}
          onExportPDF={() => window.print()}
        />
      </section>

      {savingAsLead && (
        <SaveAsLeadModal
          orcamento={calculo.precoCliente}
          onClose={() => setSavingAsLead(false)}
          onConfirm={handleSaveAsLead}
        />
      )}

      <PrintableProposal calc={calc} calculo={calculo} />
    </main>
  );
}

/* ============================================================
   COMPARISON TABLE
============================================================ */

function ComparisonTable() {
  const competitors = [
    { name: 'RD Station / Pipedrive',    values: [true,  false, false, true ] },
    { name: 'Conta Azul / Nibo',         values: [false, true,  false, true ] },
    { name: 'HoneyBook / Dubsado',       values: [true,  true,  true,  false] },
    { name: 'Notion + Excel + WhatsApp', values: ['half', 'half', false, true] },
  ];
  const headers = ['CRM', 'Finanças', 'AV-Native', 'Brasileiro'];

  const Cell = ({ v }) => {
    if (v === true)  return <Check className="w-4 h-4 text-emerald-600 mx-auto" strokeWidth={2.5} />;
    if (v === false) return <Minus className="w-4 h-4 text-stone-300 mx-auto" />;
    return <span className="text-amber-600 text-[11px] font-semibold">PARCIAL</span>;
  };

  return (
    <section>
      <div className="mb-5">
        <p className="text-[10.5px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-1.5">Por que Claqui</p>
        <h2 className="text-[22px] font-semibold tracking-tight leading-tight">Ninguém junta os quatro vértices.</h2>
        <p className="text-[13px] text-stone-500 mt-1.5 max-w-xl leading-snug">Existem ferramentas pra cada parte. Nenhuma fala a língua do produtor brasileiro inteiro.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200/70 overflow-hidden" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div className="grid grid-cols-[1.5fr_repeat(4,1fr)] gap-2 px-5 py-3 border-b border-stone-100 bg-stone-50/50">
          <div className="text-[10.5px] font-semibold tracking-[0.16em] uppercase text-stone-500">Player</div>
          {headers.map(h => (<div key={h} className="text-[10.5px] font-semibold tracking-[0.16em] uppercase text-stone-500 text-center">{h}</div>))}
        </div>
        {competitors.map((c, i) => (
          <div key={i} className="grid grid-cols-[1.5fr_repeat(4,1fr)] gap-2 px-5 py-3.5 border-b border-stone-50 items-center">
            <div className="text-[13px] font-medium text-stone-700">{c.name}</div>
            {c.values.map((v, j) => (<div key={j} className="text-center"><Cell v={v} /></div>))}
          </div>
        ))}
        <div className="grid grid-cols-[1.5fr_repeat(4,1fr)] gap-2 px-5 py-4 items-center bg-gradient-to-r from-emerald-50 to-emerald-50/30">
          <div className="flex items-center gap-2">
            <ClaquiLogo size={20} idPrefix="ct" />
            <span className="text-[14px] font-semibold tracking-tight text-emerald-800">Claqui</span>
          </div>
          {[true, true, true, true].map((v, j) => (<div key={j} className="text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" strokeWidth={3} /></div>))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CALCULATOR COMPONENTS
============================================================ */

function CalcSection({ title, subtitle, icon, total, children, highlight }) {
  const headerBg = highlight ? 'bg-violet-50/40' : '';
  return (
    <div className={`bg-white rounded-2xl border ${highlight ? 'border-violet-200/60' : 'border-stone-200/70'} overflow-hidden`} style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
      <div className={`px-5 pt-4 pb-3 border-b ${highlight ? 'border-violet-100' : 'border-stone-100'} ${headerBg} flex items-center justify-between`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${highlight ? 'bg-violet-100 text-violet-700' : 'bg-stone-100 text-stone-600'}`}>{icon}</div>
          <div>
            <h3 className={`text-[14px] font-semibold tracking-tight ${highlight ? 'text-violet-900' : 'text-stone-900'}`}>{title}</h3>
            <p className={`text-[11px] leading-tight ${highlight ? 'text-violet-700/70' : 'text-stone-500'}`}>{subtitle}</p>
          </div>
        </div>
        {total !== undefined && (
          <div className="text-right">
            <div className="text-[10px] text-stone-400 uppercase tracking-wider">Subtotal</div>
            <div className={`text-[15px] font-semibold tabular-nums ${highlight ? 'text-violet-900' : 'text-stone-900'}`}>{fmtBRL(total)}</div>
          </div>
        )}
      </div>
      <div className="divide-y divide-stone-100">{children}</div>
    </div>
  );
}

function CalcRow({ icon, label, value, onChange, hint, suffix, noCurrency }) {
  return (
    <div className="px-5 py-3 flex items-center gap-3 hover:bg-stone-50/50 transition-colors">
      <div className="text-stone-400 flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium text-stone-800 leading-tight">{label}</div>
        {hint && <div className="text-[11px] text-stone-400 leading-tight mt-0.5">{hint}</div>}
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {!noCurrency && <span className="text-[12px] text-stone-400">R$</span>}
        <input type="number" value={value} onChange={e => onChange(e.target.value)} className="w-24 px-2.5 py-1.5 text-[13px] text-right tabular-nums bg-stone-100 hover:bg-stone-50 focus:bg-white rounded-lg border border-transparent focus:border-stone-300 focus:outline-none transition-all font-medium" />
        {suffix && <span className="text-[11px] text-stone-400 w-10">{suffix}</span>}
      </div>
    </div>
  );
}

/* ============================================================
   GOAL ANALYSIS
============================================================ */

function GoalAnalysis({ metaMensal, onChangeMeta, precoCliente, duracao, horasMes, custoFixoMensal }) {
  const projetosNecessarios = precoCliente > 0 ? metaMensal / precoCliente : 0;
  const horasNecessarias = projetosNecessarios * duracao;
  const ocupacao = horasMes > 0 ? (horasNecessarias / horasMes) * 100 : 0;
  const lucroLiquidoMensal = metaMensal - custoFixoMensal;

  let viability = 'good';
  if (ocupacao > 90)  viability = 'tight';
  if (ocupacao > 110) viability = 'impossible';

  const vibe = {
    good:       { text: 'Meta saudável', desc: 'Sobra tempo pra captar clientes, descansar e crescer.' },
    tight:      { text: 'Meta apertada', desc: 'Próximo do seu limite. Considere subir o preço ou aceitar menos trabalhos.' },
    impossible: { text: 'Meta impossível', desc: 'Mais horas do que existem no mês. Sobe o preço ou ajusta a meta.' },
  }[viability];

  return (
    <div className="bg-white rounded-2xl border border-stone-200/70 overflow-hidden" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
      <div className="px-5 pt-4 pb-3 border-b border-stone-100 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600"><Target className="w-4 h-4" /></div>
        <div>
          <h3 className="text-[14px] font-semibold tracking-tight">Meta mensal</h3>
          <p className="text-[11px] text-stone-500 leading-tight">Quanto você precisa fechar pra atingir sua meta de receita</p>
        </div>
      </div>

      <div className="px-5 py-4 space-y-4">
        <div>
          <label className="text-[11.5px] font-medium text-stone-500 tracking-tight uppercase block mb-2 ml-0.5">Quanto você quer faturar por mês?</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] text-stone-400">R$</span>
            <input type="number" value={metaMensal} onChange={e => onChangeMeta(e.target.value)} className="w-full pl-10 pr-4 py-3 text-[18px] font-semibold tabular-nums bg-stone-100 hover:bg-stone-50 focus:bg-white rounded-xl border border-transparent focus:border-stone-300 focus:outline-none transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-stone-50 rounded-xl p-3.5">
            <div className="text-[10.5px] font-medium text-stone-500 uppercase tracking-wider">Projetos no mês</div>
            <div className="text-[22px] font-bold tabular-nums text-stone-900 mt-1">{projetosNecessarios.toFixed(1)}</div>
            <div className="text-[11px] text-stone-500 mt-0.5">a {fmtBRL(precoCliente)} cada</div>
          </div>
          <div className="bg-stone-50 rounded-xl p-3.5">
            <div className="text-[10.5px] font-medium text-stone-500 uppercase tracking-wider">Horas trabalhadas</div>
            <div className="text-[22px] font-bold tabular-nums text-stone-900 mt-1">{Math.round(horasNecessarias)}h</div>
            <div className="text-[11px] text-stone-500 mt-0.5">de {horasMes}h disponíveis</div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11.5px] font-medium text-stone-600">Ocupação do mês</span>
            <span className="text-[12px] font-semibold tabular-nums text-stone-900">{Math.round(ocupacao)}%</span>
          </div>
          <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${ viability === 'good' ? 'bg-emerald-500' : viability === 'tight' ? 'bg-amber-500' : 'bg-red-500' }`} style={{ width: `${Math.min(ocupacao, 100)}%` }} />
          </div>
        </div>

        <div className={`flex items-start gap-2.5 px-3.5 py-3 rounded-xl border ${ viability === 'good' ? 'bg-emerald-50 border-emerald-100' : viability === 'tight' ? 'bg-amber-50 border-amber-100' : 'bg-red-50 border-red-100' }`}>
          <Sparkles className={`w-4 h-4 flex-shrink-0 mt-0.5 ${ viability === 'good' ? 'text-emerald-600' : viability === 'tight' ? 'text-amber-600' : 'text-red-600' }`} />
          <div className="flex-1">
            <div className={`text-[12.5px] font-semibold ${ viability === 'good' ? 'text-emerald-900' : viability === 'tight' ? 'text-amber-900' : 'text-red-900' }`}>{vibe.text}</div>
            <p className="text-[11.5px] text-stone-600 leading-snug mt-0.5">{vibe.desc}</p>
            {custoFixoMensal > 0 && (
              <p className="text-[11px] text-stone-500 mt-1.5">Lucro líquido estimado: <strong className="text-stone-700">{fmtBRL(lucroLiquidoMensal)}/mês</strong></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   RESULT PANEL
============================================================ */

function ResultPanel({ calculo, direcaoCriativaPct, duracao, onSaveAsLead, onExportPDF }) {
  return (
    <aside className="lg:sticky lg:top-24 self-start space-y-3">

      <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl p-6 text-white" style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
        <div className="flex items-center gap-2 text-stone-400 mb-3">
          <ClaquiLogo size={20} idPrefix="rp" />
          <span className="text-[11px] font-medium tracking-[0.16em] uppercase">Preço pro cliente</span>
        </div>
        <div className="text-[40px] font-bold tabular-nums tracking-tight leading-none">{fmtBRL(calculo.precoCliente)}</div>
        <div className="mt-1 text-[12px] text-stone-400">para um trabalho de {duracao}h</div>

        <div className="mt-5 pt-5 border-t border-white/10 space-y-2.5">
          <ResultRow label="Custo de execução"     value={fmtBRL(calculo.custoExecucao)} muted />
          <ResultRow label={`Direção Criativa (${direcaoCriativaPct}%)`} value={fmtBRL(calculo.direcaoCriativa)} accent />
        </div>

        <div className="mt-5 pt-5 border-t border-white/10 grid grid-cols-2 gap-2">
          <button onClick={onSaveAsLead} className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-[12.5px] font-medium text-stone-900 bg-white hover:bg-stone-100 rounded-full transition-all active:scale-[0.97]">
            <FolderPlus className="w-3.5 h-3.5" strokeWidth={2.2} /> Salvar
          </button>
          <button onClick={onExportPDF} className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-[12.5px] font-medium text-white bg-white/10 hover:bg-white/20 rounded-full transition-all active:scale-[0.97]">
            <FileDown className="w-3.5 h-3.5" strokeWidth={2.2} /> Exportar PDF
          </button>
        </div>
      </div>

      {/* DETAILED BREAKDOWN */}
      <div className="bg-white rounded-2xl border border-stone-200/70 p-5" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <h4 className="text-[11px] font-semibold tracking-[0.16em] uppercase text-stone-500 mb-3">Composição</h4>
        <div className="space-y-2.5">
          <BreakRow label="Sua hora × duração"      value={calculo.custoMinhaHora} />
          <BreakRow label="Variáveis do projeto"    value={calculo.variaveis} />
          <BreakRow label="Equipe terceirizada"     value={calculo.operacionalTerceirizado} />
          <div className="border-t border-stone-100 my-2" />
          <BreakRow label="Execução total"          value={calculo.custoExecucao} bold />
          <BreakRow label="+ Direção Criativa"      value={calculo.direcaoCriativa} accent />
          <div className="border-t border-stone-200 my-2" />
          <BreakRow label="Preço cliente"           value={calculo.precoCliente} bold big />
        </div>
      </div>

      <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4">
        <p className="text-[11.5px] text-violet-900 leading-snug">
          <strong>Por que separado?</strong> Quando você embute equipe e direção juntos, parece que está "dividindo a grana". Separados, você cobra a equipe pelo que ela custa e protege seu lucro criativo.
        </p>
      </div>
    </aside>
  );
}

function ResultRow({ label, value, muted, accent }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-[12px] ${muted ? 'text-stone-400' : 'text-stone-300'}`}>{label}</span>
      <span className={`text-[14px] font-semibold tabular-nums ${accent ? 'text-violet-300' : 'text-white'}`}>{value}</span>
    </div>
  );
}

function BreakRow({ label, value, bold, big, accent }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`${big ? 'text-[13px]' : 'text-[12.5px]'} ${bold ? 'text-stone-900 font-medium' : 'text-stone-600'} ${accent ? 'text-violet-700' : ''}`}>{label}</span>
      <span className={`${big ? 'text-[16px]' : 'text-[13px]'} tabular-nums ${bold ? 'text-stone-900 font-bold' : 'text-stone-700'} ${accent ? 'text-violet-700 font-semibold' : ''}`}>{fmtBRL(value)}</span>
    </div>
  );
}

/* ============================================================
   SAVE AS LEAD MODAL
============================================================ */

function SaveAsLeadModal({ orcamento, onClose, onConfirm }) {
  const [name, setName] = useState('');
  const [segment, setSegment] = useState('atelier');
  const firstFieldRef = useRef(null);

  useEffect(() => { firstFieldRef.current?.focus(); }, []);
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [onClose]);

  const valid = name.trim().length > 0;
  const handleConfirm = () => valid && onConfirm(name.trim(), segment);

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 bg-stone-900/30 backdrop-blur-md flex items-center justify-center p-4 animate-in no-print">
      <div onClick={e => e.stopPropagation()} className="bg-white rounded-3xl w-full max-w-md border border-stone-200/60 overflow-hidden" style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
        <div className="flex items-center justify-between px-6 pt-5 pb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center"><FolderPlus className="w-4 h-4 text-emerald-700" /></div>
            <div>
              <h2 className="text-[16px] font-semibold tracking-tight">Salvar no Pipeline</h2>
              <p className="text-[11.5px] text-stone-500 mt-0.5">Vai pra "Proposta enviada" com {fmtBRL(orcamento)}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center transition-colors"><X className="w-4 h-4 text-stone-500" /></button>
        </div>
        <div className="px-6 py-4 space-y-4">
          <Field label="Nome do cliente">
            <input ref={firstFieldRef} value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleConfirm()} placeholder="Ex: Casa Verani" className="w-full px-3.5 py-2.5 text-[14px] bg-stone-100 hover:bg-stone-50 focus:bg-white rounded-xl border border-transparent focus:border-stone-300 focus:outline-none transition-all" />
          </Field>
          <Field label="Segmento">
            <select value={segment} onChange={e => setSegment(e.target.value)} className="w-full px-3.5 py-2.5 text-[14px] bg-stone-100 hover:bg-stone-50 focus:bg-white rounded-xl border border-transparent focus:border-stone-300 focus:outline-none transition-all appearance-none">
              {Object.entries(SEGMENTS).map(([k, v]) => (<option key={k} value={k}>{v.label}</option>))}
            </select>
          </Field>
        </div>
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-[13.5px] font-medium text-stone-700 hover:bg-stone-200/60 rounded-full transition-colors">Cancelar</button>
          <button onClick={handleConfirm} disabled={!valid} className="flex items-center gap-1 px-4 py-2 text-[13.5px] font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-300 disabled:cursor-not-allowed rounded-full transition-all active:scale-[0.97]">
            Salvar lead <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PRINTABLE PROPOSAL
============================================================ */

function PrintableProposal({ calc, calculo }) {
  const items = [];
  if (calculo.custoMinhaHora > 0)          items.push({ label: `Direção e produção (${calc.duracaoHoras}h)`,            value: calculo.custoMinhaHora });
  if (calculo.deslocamento > 0)            items.push({ label: `Deslocamento (${calc.projeto.deslocamentoKm}km)`,        value: calculo.deslocamento });
  if (calc.projeto.alimentacao > 0)        items.push({ label: 'Alimentação',                                            value: parseFloat(calc.projeto.alimentacao) });
  if (calc.projeto.locacao > 0)            items.push({ label: 'Locação extra',                                          value: parseFloat(calc.projeto.locacao) });
  if (calc.projeto.materiais > 0)          items.push({ label: 'Materiais',                                              value: parseFloat(calc.projeto.materiais) });
  if (calculo.operacionalTerceirizado > 0) items.push({ label: 'Equipe operacional',                                     value: calculo.operacionalTerceirizado });

  return (
    <div className="print-area" style={{
      display: 'none',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
      color: '#0c0a09', background: 'white',
      padding: '60px 56px', maxWidth: '800px', margin: '0 auto',
    }}>
      <style>{`@media print { .print-area { display: block !important; } }`}</style>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 24, borderBottom: '2px solid #0c0a09' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <ClaquiLogo size={48} idPrefix="pp" />
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>Claqui</div>
            <div style={{ fontSize: 11, color: '#78716c', marginTop: 4, letterSpacing: '0.04em' }}>PROPOSTA COMERCIAL</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: '#78716c', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Emitido em</div>
          <div style={{ fontSize: 13, fontWeight: 500, marginTop: 4 }}>{todayBR()}</div>
        </div>
      </div>

      <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.04em', marginTop: 56, lineHeight: 1.1 }}>Orçamento de produção audiovisual</h1>
      <p style={{ fontSize: 14, color: '#78716c', marginTop: 8, lineHeight: 1.5 }}>Proposta válida até <strong style={{ color: '#0c0a09' }}>{validUntilBR(15)}</strong></p>

      <div style={{ marginTop: 48, padding: '32px 28px', background: '#fafaf9', borderRadius: 16, border: '1px solid #e7e5e4' }}>
        <div style={{ fontSize: 11, color: '#78716c', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>Investimento total</div>
        <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: '-0.04em', marginTop: 8, lineHeight: 1, color: '#0c0a09' }}>{fmtBRL(calculo.precoCliente)}</div>
        <div style={{ fontSize: 13, color: '#78716c', marginTop: 8 }}>para um trabalho de {calc.duracaoHoras}h</div>
      </div>

      <div style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 11, color: '#78716c', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 20 }}>Composição do investimento</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e7e5e4' }}>
                <td style={{ padding: '14px 0', fontSize: 13, color: '#44403c' }}>{item.label}</td>
                <td style={{ padding: '14px 0', fontSize: 13, fontWeight: 500, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmtBRL(item.value)}</td>
              </tr>
            ))}
            <tr style={{ borderBottom: '1px solid #e7e5e4' }}>
              <td style={{ padding: '14px 0', fontSize: 13, color: '#44403c' }}>Subtotal de execução</td>
              <td style={{ padding: '14px 0', fontSize: 13, fontWeight: 600, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmtBRL(calculo.custoExecucao)}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e7e5e4' }}>
              <td style={{ padding: '14px 0', fontSize: 13, color: '#44403c' }}>Direção criativa ({calc.trabalho.direcaoCriativa}%)</td>
              <td style={{ padding: '14px 0', fontSize: 13, fontWeight: 500, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmtBRL(calculo.direcaoCriativa)}</td>
            </tr>
            <tr>
              <td style={{ padding: '20px 0 0', fontSize: 16, fontWeight: 700, color: '#0c0a09' }}>Total</td>
              <td style={{ padding: '20px 0 0', fontSize: 20, fontWeight: 700, textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: '#0c0a09', letterSpacing: '-0.02em' }}>{fmtBRL(calculo.precoCliente)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 56, padding: '24px 28px', background: '#fafaf9', borderRadius: 12 }}>
        <h2 style={{ fontSize: 11, color: '#78716c', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 14 }}>Condições gerais</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, fontSize: 12, color: '#44403c', lineHeight: 1.6 }}>
          <div><strong style={{ color: '#0c0a09', fontWeight: 600 }}>Pagamento</strong><br/>50% no fechamento, 50% na entrega via Pix.</div>
          <div><strong style={{ color: '#0c0a09', fontWeight: 600 }}>Prazo</strong><br/>Conforme cronograma acordado em briefing.</div>
          <div><strong style={{ color: '#0c0a09', fontWeight: 600 }}>Entrega</strong><br/>Arquivos finais em alta resolução, via link.</div>
          <div><strong style={{ color: '#0c0a09', fontWeight: 600 }}>Validade</strong><br/>Esta proposta é válida por 15 dias.</div>
        </div>
      </div>

      <div style={{ marginTop: 80, paddingTop: 24, borderTop: '1px solid #e7e5e4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10.5, color: '#78716c', letterSpacing: '0.06em' }}>
        <span>GERADO POR CLAQUI · SIMULADOR DE ORÇAMENTO</span>
        <span>{todayBR()}</span>
      </div>
    </div>
  );
}

/* ============================================================
   RECURSOS VIEW — feature showcase
============================================================ */

function RecursosView({ setTab }) {
  const [filter, setFilter] = useState('todos');

  const visible = filter === 'todos' ? FEATURES : FEATURES.filter(f => f.cat === filter);

  // counts per status
  const counts = {
    live:    FEATURES.filter(f => f.status === 'live').length,
    soon:    FEATURES.filter(f => f.status === 'soon').length,
    planned: FEATURES.filter(f => f.status === 'planned').length,
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 pb-20 no-print">

      {/* HERO */}
      <section className="text-center max-w-3xl mx-auto mb-12">
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-stone-400 mb-3">RECURSOS</p>
        <h1 className="text-[42px] font-bold tracking-[-0.035em] leading-[1.05] text-stone-900">
          Tudo que o produtor precisa.<br/>
          <span className="text-stone-500">Num lugar só.</span>
        </h1>
        <p className="text-[15px] text-stone-500 mt-5 leading-relaxed max-w-xl mx-auto">
          {FEATURES.length} funcionalidades pensadas pra MEIs e pequenos produtores audiovisuais. Algumas já estão no ar, outras chegam em breve.
        </p>

        {/* Status pills */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <StatusPill count={counts.live}    label="Disponível" tone="emerald" />
          <StatusPill count={counts.soon}    label="Em breve"   tone="amber" />
          <StatusPill count={counts.planned} label="Roadmap"    tone="stone" />
        </div>
      </section>

      {/* FILTER PILLS */}
      <div className="flex items-center justify-center gap-2 mb-10">
        <FilterPill active={filter === 'todos'} onClick={() => setFilter('todos')}>Todos</FilterPill>
        {Object.entries(FEATURE_CATS).map(([key, cat]) => (
          <FilterPill key={key} active={filter === key} onClick={() => setFilter(key)} dotColor={cat.color}>
            {cat.label}
          </FilterPill>
        ))}
      </div>

      {/* FEATURES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map(f => <FeatureCard key={f.id} feature={f} />)}
      </div>

      {/* CTA bottom */}
      <section className="mt-16 bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl p-10 text-center" style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
        <ClaquiLogo size={56} idPrefix="cta" />
        <h2 className="text-[28px] font-bold tracking-tight text-white mt-5 leading-tight">Comece pelo que já tá no ar.</h2>
        <p className="text-[14px] text-stone-400 mt-3 max-w-md mx-auto leading-relaxed">
          Pipeline e Calculadora estão prontos pra usar. O resto chega na sequência, sem você precisar trocar de ferramenta.
        </p>
        <div className="mt-7 flex items-center justify-center gap-2.5">
          <button onClick={() => setTab('pipeline')} className="flex items-center gap-1.5 px-5 py-2.5 text-[13.5px] font-medium text-stone-900 bg-white hover:bg-stone-100 rounded-full transition-all active:scale-[0.97]">
            Abrir Pipeline <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={() => setTab('calculadora')} className="flex items-center gap-1.5 px-5 py-2.5 text-[13.5px] font-medium text-white bg-white/10 hover:bg-white/20 rounded-full transition-all active:scale-[0.97]">
            Calculadora <Calculator className="w-4 h-4" />
          </button>
        </div>
      </section>
    </main>
  );
}

function StatusPill({ count, label, tone }) {
  const tones = {
    emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    amber:   'bg-amber-50 text-amber-700 ring-amber-200',
    stone:   'bg-stone-100 text-stone-600 ring-stone-200',
  };
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ring-1 ring-inset ${tones[tone]}`}>
      <span className="text-[12.5px] font-bold tabular-nums">{count}</span>
      <span className="text-[11.5px] font-medium">{label}</span>
    </div>
  );
}

function FilterPill({ active, onClick, children, dotColor }) {
  const dot = {
    emerald: 'bg-emerald-500',
    sky:     'bg-sky-500',
    rose:    'bg-rose-500',
  }[dotColor];

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium rounded-full transition-all ${
        active
          ? 'bg-stone-900 text-white shadow-sm'
          : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
      }`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />}
      {children}
    </button>
  );
}

function FeatureCard({ feature }) {
  const cat = FEATURE_CATS[feature.cat];
  const status = STATUS_BADGE[feature.status];
  const Icon = feature.icon;

  const iconBg = {
    emerald: 'bg-emerald-50 text-emerald-600',
    sky:     'bg-sky-50 text-sky-600',
    rose:    'bg-rose-50 text-rose-600',
  }[cat.color];

  const isLive = feature.status === 'live';

  return (
    <div className={`bg-white rounded-2xl border ${isLive ? 'border-stone-200/70 hover:border-stone-300' : 'border-stone-200/50'} p-5 transition-all hover:shadow-md hover:-translate-y-0.5 group`} style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
      <div className="flex items-start justify-between gap-3">
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-4.5 h-4.5" strokeWidth={2} />
        </div>
        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ring-1 ring-inset ${status.tone}`}>
          {status.label}
        </span>
      </div>

      <h3 className="text-[14.5px] font-semibold tracking-tight text-stone-900 mt-3.5 leading-tight">{feature.title}</h3>
      <p className="text-[12.5px] text-stone-500 mt-1.5 leading-relaxed">{feature.desc}</p>

      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
        <span className="text-[10.5px] font-medium text-stone-400 uppercase tracking-wider">{cat.label}</span>
        {isLive && (
          <span className="text-[11px] text-emerald-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            Já posso usar <ArrowRight className="w-3 h-3" />
          </span>
        )}
      </div>
    </div>
  );
}
