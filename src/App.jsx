import { useState, useEffect, useRef, useMemo, createContext, useContext } from 'react';
import {
  Plus, X, Instagram, TrendingUp, Users, CheckCircle2,
  Banknote, Trash2, Search, ArrowUpRight, Calendar,
  GripVertical, Calculator, Layout, Zap, Droplet, Wifi,
  Wrench, Car, Coffee, Camera, Clock, Percent, Info,
  Check, Minus, FileDown, FolderPlus, Target, Sparkles,
  Grid3x3, Film, Scissors, Palette, Sun, Mic,
  FileText, BookOpen, BarChart3, Receipt, Wallet,
  AlertCircle, Briefcase, Package,
  ScrollText, FileSignature, KeyRound, ClipboardCheck,
  ArrowRight, Moon, Trophy, ShoppingCart, Star, HardHat, Lock, PlayCircle, Building2, Sofa, Radio, Boxes, Paintbrush, MonitorPlay, Volume2, Smile, UserPlus, ChevronRight, RotateCcw
} from 'lucide-react';

/* ============================================================
   THEME + I18N CONTEXTS
============================================================ */

const ThemeContext = createContext({ theme: 'light', toggle: () => {} });
const I18nContext  = createContext({ lang: 'pt', t: (k) => k, switchLang: () => {} });

function useTheme() { return useContext(ThemeContext); }
function useI18n()  { return useContext(I18nContext); }

/* ============================================================
   I18N DICTIONARY
============================================================ */

const DICT = {
  pt: {
    // Brand
    'brand.tagline': 'Sistema operacional do produtor',
    // Tabs
    'tab.pipeline':    'Pipeline',
    'tab.calculadora': 'Calculadora',
    'tab.recursos':    'Recursos',
    'tab.jogo':        'Jogo',
    // Pipeline
    'pipeline.search':       'Buscar leads, @ ou notas',
    'pipeline.newLead':      'Novo lead',
    'pipeline.stat.active':  'Leads ativos',
    'pipeline.stat.activeHint': 'em movimento',
    'pipeline.stat.negotiation': 'Em negociação',
    'pipeline.stat.negotiationHint': 'contato, negociação, proposta',
    'pipeline.stat.closed':  'Fechados',
    'pipeline.stat.closedHint': 'faturado',
    'pipeline.stat.open':    'Pipeline em aberto',
    'pipeline.stat.openHint': 'valor potencial',
    'pipeline.col.prospect':    'Prospect',
    'pipeline.col.contato':     'Primeiro Contato',
    'pipeline.col.negociacao':  'Em Negociação',
    'pipeline.col.proposta':    'Proposta Enviada',
    'pipeline.col.fechado':     'Fechado',
    'pipeline.dropHere':        'Arraste leads aqui',
    // Lead modal
    'lead.title.edit':   'Editar lead',
    'lead.title.new':    'Novo lead',
    'lead.subtitle':     'Detalhes do prospect',
    'lead.field.name':   'Nome do cliente',
    'lead.field.segment': 'Segmento',
    'lead.field.stage':  'Etapa',
    'lead.field.instagram': 'Instagram',
    'lead.field.value':  'Valor',
    'lead.field.notes':  'Notas',
    'lead.notes.placeholder': 'Contexto, próximos passos, observações…',
    'lead.delete':       'Excluir',
    'lead.deleteConfirm': 'Excluir este lead?',
    'lead.cancel':       'Cancelar',
    'lead.save':         'Salvar',
    // Segments
    'seg.atelier':     'Ateliê de Noivas',
    'seg.joalheria':   'Joalheria',
    'seg.moda':        'Moda Autoral',
    'seg.fragrancia':  'Fragrância',
    'seg.acessorios':  'Acessórios',
    'seg.outro':       'Outro',
    // Calculator
    'calc.title':       'Simulador de Orçamento',
    'calc.subtitle':    'Calcula custos fixos, depreciação, equipe terceirizada e direção criativa — separadas, sem misturar sua margem com a da equipe.',
    'calc.disclaimer':  'Os valores iniciais são referências de mercado brasileiro (ordens de grandeza típicas). Ajuste todos os campos com seus números reais.',
    'calc.fixed.title': 'Custos Fixos Mensais',
    'calc.fixed.sub':   'Conta tudo que você paga todo mês, com ou sem trabalho',
    'calc.equip.title': 'Depreciação de Equipamento',
    'calc.equip.sub':   'Custo mensal pra repor seu kit quando ele vencer',
    'calc.work.title':  'Sua jornada de trabalho',
    'calc.work.sub':    'Quantas horas produtivas você consegue por mês',
    'calc.proj.title':  'Custos do projeto',
    'calc.proj.sub':    'Variáveis específicas deste trabalho',
    'calc.team.title':  'Operacional Terceirizado',
    'calc.team.sub':    'Equipe contratada para este projeto. Embute no preço, não sai do seu lucro.',
    'calc.direction.title': 'Direção Criativa',
    'calc.direction.sub':   'Sua margem por dirigir o projeto. Aplicada sobre toda a execução.',
    'calc.direction.hint':  '30-50% é saudável · acima disso é trabalho premium ou exclusivo',
    'calc.row.rent':    'Aluguel / Estúdio',
    'calc.row.energy':  'Energia elétrica',
    'calc.row.water':   'Água',
    'calc.row.internet': 'Internet',
    'calc.row.phone':   'Telefone / Celular',
    'calc.row.software': 'Softwares (Adobe, etc)',
    'calc.row.tax':     'DAS MEI',
    'calc.row.accountant': 'Contador',
    'calc.row.gearTotal': 'Valor total do equipamento',
    'calc.row.gearLife': 'Vida útil em meses',
    'calc.row.daysMonth': 'Dias trabalhados por mês',
    'calc.row.hoursDay': 'Horas produtivas por dia',
    'calc.row.duration': 'Duração do trabalho',
    'calc.row.transport': 'Deslocamento',
    'calc.row.food':    'Alimentação',
    'calc.row.location': 'Locação extra',
    'calc.row.materials': 'Materiais',
    'calc.row.photographer': 'Fotógrafo',
    'calc.row.videographer': 'Videomaker',
    'calc.row.editor':  'Editor',
    'calc.row.makeup':  'Maquiador',
    'calc.row.lighting': 'Iluminador',
    'calc.row.others':  'Outros',
    'calc.subtotal':    'Subtotal',
    'calc.suffix.months': 'meses',
    'calc.suffix.days':  'dias',
    'calc.suffix.hours': 'horas',
    'calc.reset':       '↺ Restaurar valores de referência',
    // Result
    'result.label':     'Preço pro cliente',
    'result.duration':  'para um trabalho de',
    'result.execution': 'Custo de execução',
    'result.direction': 'Direção Criativa',
    'result.save':      'Salvar',
    'result.exportPdf': 'Exportar PDF',
    'result.composition': 'Composição',
    'result.row.myHour': 'Sua hora × duração',
    'result.row.variables': 'Variáveis do projeto',
    'result.row.team':  'Equipe terceirizada',
    'result.row.execTotal': 'Execução total',
    'result.row.directionPlus': '+ Direção Criativa',
    'result.row.clientPrice': 'Preço cliente',
    'result.tip':       'Por que separado? Quando você embute equipe e direção juntos, parece que está "dividindo a grana". Separados, você cobra a equipe pelo que ela custa e protege seu lucro criativo.',
    // Goal
    'goal.title':       'Meta mensal',
    'goal.sub':         'Quanto você precisa fechar pra atingir sua meta de receita',
    'goal.howMuch':     'Quanto você quer faturar por mês?',
    'goal.projects':    'Projetos no mês',
    'goal.projectsAt':  'a',
    'goal.projectsEach': 'cada',
    'goal.hours':       'Horas trabalhadas',
    'goal.hoursOf':     'de',
    'goal.hoursAvail':  'disponíveis',
    'goal.occupation':  'Ocupação do mês',
    'goal.healthy':     'Meta saudável',
    'goal.healthyDesc': 'Sobra tempo pra captar clientes, descansar e crescer.',
    'goal.tight':       'Meta apertada',
    'goal.tightDesc':   'Próximo do seu limite. Considere subir o preço ou aceitar menos trabalhos.',
    'goal.impossible':  'Meta impossível',
    'goal.impossibleDesc': 'Mais horas do que existem no mês. Sobe o preço ou ajusta a meta.',
    'goal.netProfit':   'Lucro líquido estimado:',
    'goal.netProfitMonth': '/mês',
    // Save modal
    'save.title':       'Salvar no Pipeline',
    'save.sub':         'Vai pra "Proposta enviada" com',
    'save.field.name':  'Nome do cliente',
    'save.namePh':      'Ex: Casa Verani',
    'save.field.segment': 'Segmento',
    'save.cancel':      'Cancelar',
    'save.confirm':     'Salvar lead',
    'save.toastSaved':  'salvo no Pipeline!',
    'save.notes':       'Orçamento gerado pela calculadora.\nDuração: {dur}h\nExecução: {exec}\nDireção criativa: {dir}%',
    // Comparison
    'comp.eyebrow':     'Por que Claqui',
    'comp.title':       'Ninguém junta os quatro vértices.',
    'comp.desc':        'Existem ferramentas pra cada parte. Nenhuma fala a língua do produtor brasileiro inteiro.',
    'comp.col.player':  'Player',
    'comp.col.crm':     'CRM',
    'comp.col.finance': 'Finanças',
    'comp.col.av':      'AV-Native',
    'comp.col.br':      'Brasileiro',
    'comp.partial':     'PARCIAL',
    'comp.fosso':       'Fosso: contexto. Quando você fala "diária" no Claqui, ele entende: dia de filmagem, 6h, com deslocamento e meal break. Genérico não fala essa língua.',
    // Recursos
    'res.eyebrow':      'RECURSOS',
    'res.title':        'Tudo que o produtor precisa.',
    'res.titleSub':     'Num lugar só.',
    'res.desc':         'funcionalidades pensadas pra MEIs e pequenos produtores audiovisuais. Algumas já estão no ar, outras chegam em breve.',
    'res.status.live':  'Disponível',
    'res.status.soon':  'Em breve',
    'res.status.planned': 'Roadmap',
    'res.filter.all':   'Todos',
    'res.cat.sales':    'Vendas',
    'res.cat.finance':  'Finanças',
    'res.cat.admin':    'Administração',
    'res.canUse':       'Já posso usar',
    'res.cta.title':    'Comece pelo que já tá no ar.',
    'res.cta.desc':     'Pipeline e Calculadora estão prontos pra usar. O resto chega na sequência, sem você precisar trocar de ferramenta.',
    'res.cta.openPipeline': 'Abrir Pipeline',
    'res.cta.openCalc':     'Calculadora',
    // Date helpers
    'date.now':         'agora',
    'date.hAgo':        'h atrás',
    'date.yesterday':   'ontem',
    'date.dAgo':        'd atrás',
    // Theme
    'theme.toggleLight': 'Modo claro',
    'theme.toggleDark':  'Modo escuro',
    // PDF
    'pdf.title':        'Proposta comercial',
    'pdf.h1':           'Orçamento de produção audiovisual',
    'pdf.validUntil':   'Proposta válida até',
    'pdf.investment':   'Investimento total',
    'pdf.duration':     'para um trabalho de',
    'pdf.composition':  'Composição do investimento',
    'pdf.production':   'Direção e produção',
    'pdf.execSubtotal': 'Subtotal de execução',
    'pdf.directionPct': 'Direção criativa',
    'pdf.team':         'Equipe operacional',
    'pdf.total':        'Total',
    'pdf.terms':        'Condições gerais',
    'pdf.payment':      'Pagamento',
    'pdf.paymentDesc':  '50% no fechamento, 50% na entrega via Pix.',
    'pdf.deadline':     'Prazo',
    'pdf.deadlineDesc': 'Conforme cronograma acordado em briefing.',
    'pdf.delivery':     'Entrega',
    'pdf.deliveryDesc': 'Arquivos finais em alta resolução, via link.',
    'pdf.validity':     'Validade',
    'pdf.validityDesc': 'Esta proposta é válida por 15 dias.',
    'pdf.footer':       'GERADO POR CLAQUI · SIMULADOR DE ORÇAMENTO',
    'pdf.emittedAt':    'Emitido em',
  },
  en: {
    'brand.tagline': 'The producer\'s operating system',
    'tab.pipeline':    'Pipeline',
    'tab.calculadora': 'Calculator',
    'tab.recursos':    'Features',
    'tab.jogo':        'Game',
    'pipeline.search':       'Search leads, @ or notes',
    'pipeline.newLead':      'New lead',
    'pipeline.stat.active':  'Active leads',
    'pipeline.stat.activeHint': 'in motion',
    'pipeline.stat.negotiation': 'In negotiation',
    'pipeline.stat.negotiationHint': 'contacting, negotiating, proposal',
    'pipeline.stat.closed':  'Closed',
    'pipeline.stat.closedHint': 'in revenue',
    'pipeline.stat.open':    'Open pipeline',
    'pipeline.stat.openHint': 'potential value',
    'pipeline.col.prospect':    'Prospect',
    'pipeline.col.contato':     'First Contact',
    'pipeline.col.negociacao':  'Negotiating',
    'pipeline.col.proposta':    'Proposal Sent',
    'pipeline.col.fechado':     'Closed',
    'pipeline.dropHere':        'Drop leads here',
    'lead.title.edit':   'Edit lead',
    'lead.title.new':    'New lead',
    'lead.subtitle':     'Prospect details',
    'lead.field.name':   'Client name',
    'lead.field.segment': 'Segment',
    'lead.field.stage':  'Stage',
    'lead.field.instagram': 'Instagram',
    'lead.field.value':  'Value',
    'lead.field.notes':  'Notes',
    'lead.notes.placeholder': 'Context, next steps, notes…',
    'lead.delete':       'Delete',
    'lead.deleteConfirm': 'Delete this lead?',
    'lead.cancel':       'Cancel',
    'lead.save':         'Save',
    'seg.atelier':     'Bridal Atelier',
    'seg.joalheria':   'Jewelry',
    'seg.moda':        'Indie Fashion',
    'seg.fragrancia':  'Fragrance',
    'seg.acessorios':  'Accessories',
    'seg.outro':       'Other',
    'calc.title':       'Quote Simulator',
    'calc.subtitle':    'Calculates fixed costs, depreciation, outsourced crew and creative direction — separated, without mixing your margin with the crew\'s.',
    'calc.disclaimer':  'Initial values are Brazilian market references (typical orders of magnitude). Adjust all fields with your real numbers.',
    'calc.fixed.title': 'Monthly Fixed Costs',
    'calc.fixed.sub':   'Counts everything you pay every month, with or without work',
    'calc.equip.title': 'Equipment Depreciation',
    'calc.equip.sub':   'Monthly cost to replace your kit when it expires',
    'calc.work.title':  'Your work routine',
    'calc.work.sub':    'How many productive hours you get per month',
    'calc.proj.title':  'Project costs',
    'calc.proj.sub':    'Specific variables for this job',
    'calc.team.title':  'Outsourced Crew',
    'calc.team.sub':    'Crew hired for this project. Built into the price, not out of your profit.',
    'calc.direction.title': 'Creative Direction',
    'calc.direction.sub':   'Your margin for directing the project. Applied over the entire execution.',
    'calc.direction.hint':  '30-50% is healthy · above that is premium or exclusive work',
    'calc.row.rent':    'Rent / Studio',
    'calc.row.energy':  'Electricity',
    'calc.row.water':   'Water',
    'calc.row.internet': 'Internet',
    'calc.row.phone':   'Phone / Mobile',
    'calc.row.software': 'Software (Adobe, etc)',
    'calc.row.tax':     'Self-employment tax',
    'calc.row.accountant': 'Accountant',
    'calc.row.gearTotal': 'Total equipment value',
    'calc.row.gearLife': 'Useful life in months',
    'calc.row.daysMonth': 'Working days per month',
    'calc.row.hoursDay': 'Productive hours per day',
    'calc.row.duration': 'Job duration',
    'calc.row.transport': 'Transportation',
    'calc.row.food':    'Meals',
    'calc.row.location': 'Extra location',
    'calc.row.materials': 'Materials',
    'calc.row.photographer': 'Photographer',
    'calc.row.videographer': 'Videographer',
    'calc.row.editor':  'Editor',
    'calc.row.makeup':  'Makeup artist',
    'calc.row.lighting': 'Gaffer',
    'calc.row.others':  'Others',
    'calc.subtotal':    'Subtotal',
    'calc.suffix.months': 'months',
    'calc.suffix.days':  'days',
    'calc.suffix.hours': 'hours',
    'calc.reset':       '↺ Reset to reference values',
    'result.label':     'Client price',
    'result.duration':  'for a job of',
    'result.execution': 'Execution cost',
    'result.direction': 'Creative Direction',
    'result.save':      'Save',
    'result.exportPdf': 'Export PDF',
    'result.composition': 'Breakdown',
    'result.row.myHour': 'Your hour × duration',
    'result.row.variables': 'Project variables',
    'result.row.team':  'Outsourced crew',
    'result.row.execTotal': 'Total execution',
    'result.row.directionPlus': '+ Creative Direction',
    'result.row.clientPrice': 'Client price',
    'result.tip':       'Why separated? When you bundle crew and direction together, it feels like you\'re "splitting the cash". Separated, you charge crew for what they cost and protect your creative profit.',
    'goal.title':       'Monthly target',
    'goal.sub':         'How much you need to close to hit your revenue target',
    'goal.howMuch':     'How much do you want to bill per month?',
    'goal.projects':    'Projects per month',
    'goal.projectsAt':  'at',
    'goal.projectsEach': 'each',
    'goal.hours':       'Hours worked',
    'goal.hoursOf':     'of',
    'goal.hoursAvail':  'available',
    'goal.occupation':  'Month occupation',
    'goal.healthy':     'Healthy target',
    'goal.healthyDesc': 'Time left to find clients, rest and grow.',
    'goal.tight':       'Tight target',
    'goal.tightDesc':   'Close to your limit. Consider raising prices or taking fewer jobs.',
    'goal.impossible':  'Impossible target',
    'goal.impossibleDesc': 'More hours than exist in the month. Raise prices or adjust the target.',
    'goal.netProfit':   'Estimated net profit:',
    'goal.netProfitMonth': '/month',
    'save.title':       'Save to Pipeline',
    'save.sub':         'Going to "Proposal sent" at',
    'save.field.name':  'Client name',
    'save.namePh':      'E.g. Casa Verani',
    'save.field.segment': 'Segment',
    'save.cancel':      'Cancel',
    'save.confirm':     'Save lead',
    'save.toastSaved':  'saved to Pipeline!',
    'save.notes':       'Quote generated by calculator.\nDuration: {dur}h\nExecution: {exec}\nCreative direction: {dir}%',
    'comp.eyebrow':     'Why Claqui',
    'comp.title':       'No one connects all four corners.',
    'comp.desc':        'There are tools for each part. None speaks the full language of the indie producer.',
    'comp.col.player':  'Player',
    'comp.col.crm':     'CRM',
    'comp.col.finance': 'Finance',
    'comp.col.av':      'AV-Native',
    'comp.col.br':      'Local',
    'comp.partial':     'PARTIAL',
    'comp.fosso':       'Moat: context. When you say "day rate" in Claqui, it knows what that means: a shoot day, with travel and meal break built in. Generic tools don\'t speak this language.',
    'res.eyebrow':      'FEATURES',
    'res.title':        'Everything the producer needs.',
    'res.titleSub':     'In one place.',
    'res.desc':         'features built for indie producers and small audiovisual studios. Some are already live, others coming soon.',
    'res.status.live':  'Live',
    'res.status.soon':  'Coming soon',
    'res.status.planned': 'Roadmap',
    'res.filter.all':   'All',
    'res.cat.sales':    'Sales',
    'res.cat.finance':  'Finance',
    'res.cat.admin':    'Admin',
    'res.canUse':       'Available now',
    'res.cta.title':    'Start with what\'s live.',
    'res.cta.desc':     'Pipeline and Calculator are ready to use. The rest comes next, no need to switch tools.',
    'res.cta.openPipeline': 'Open Pipeline',
    'res.cta.openCalc':     'Calculator',
    'date.now':         'now',
    'date.hAgo':        'h ago',
    'date.yesterday':   'yesterday',
    'date.dAgo':        'd ago',
    'theme.toggleLight': 'Light mode',
    'theme.toggleDark':  'Dark mode',
    'pdf.title':        'Commercial proposal',
    'pdf.h1':           'Audiovisual production quote',
    'pdf.validUntil':   'Proposal valid until',
    'pdf.investment':   'Total investment',
    'pdf.duration':     'for a job of',
    'pdf.composition':  'Investment composition',
    'pdf.production':   'Direction and production',
    'pdf.execSubtotal': 'Execution subtotal',
    'pdf.directionPct': 'Creative direction',
    'pdf.team':         'Production crew',
    'pdf.total':        'Total',
    'pdf.terms':        'Terms',
    'pdf.payment':      'Payment',
    'pdf.paymentDesc':  '50% on signing, 50% on delivery via wire/PayPal.',
    'pdf.deadline':     'Deadline',
    'pdf.deadlineDesc': 'According to schedule agreed in briefing.',
    'pdf.delivery':     'Delivery',
    'pdf.deliveryDesc': 'Final files in high resolution, via link.',
    'pdf.validity':     'Validity',
    'pdf.validityDesc': 'This proposal is valid for 15 days.',
    'pdf.footer':       'GENERATED BY CLAQUI · QUOTE SIMULATOR',
    'pdf.emittedAt':    'Issued on',
  }
};

/* ============================================================
   PIPELINE DATA — labels translated via DICT
============================================================ */

const COLUMN_IDS = ['prospect', 'contato', 'negociacao', 'proposta', 'fechado'];
const COLUMN_DOTS = {
  prospect:   'bg-stone-400',
  contato:    'bg-sky-400',
  negociacao: 'bg-amber-400',
  proposta:   'bg-violet-400',
  fechado:    'bg-emerald-400',
};

const SEGMENT_IDS = ['atelier', 'joalheria', 'moda', 'fragrancia', 'acessorios', 'outro'];
const SEGMENT_TONES = {
  atelier:     { light: 'bg-rose-50 text-rose-700 ring-rose-200',         dark: 'bg-rose-500/10 text-rose-300 ring-rose-500/30' },
  joalheria:   { light: 'bg-amber-50 text-amber-800 ring-amber-200',      dark: 'bg-amber-500/10 text-amber-300 ring-amber-500/30' },
  moda:        { light: 'bg-indigo-50 text-indigo-700 ring-indigo-200',   dark: 'bg-indigo-500/10 text-indigo-300 ring-indigo-500/30' },
  fragrancia:  { light: 'bg-violet-50 text-violet-700 ring-violet-200',   dark: 'bg-violet-500/10 text-violet-300 ring-violet-500/30' },
  acessorios:  { light: 'bg-teal-50 text-teal-700 ring-teal-200',         dark: 'bg-teal-500/10 text-teal-300 ring-teal-500/30' },
  outro:       { light: 'bg-stone-100 text-stone-700 ring-stone-200',     dark: 'bg-stone-500/10 text-stone-300 ring-stone-500/30' },
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
   CALC DEFAULTS
============================================================ */

const calcDefaults = {
  fixos:       { aluguel: 0, luz: 200, agua: 80, internet: 120, telefone: 50, contadorMei: 0, dasMei: 75, softwares: 150 },
  equipamento: { valorTotal: 25000, vidaUtilMeses: 60 },
  trabalho:    { diasMes: 20, horasDia: 8, direcaoCriativa: 30 },
  projeto:     { deslocamentoKm: 0, custoKm: 1.20, alimentacao: 50, locacao: 0, materiais: 0 },
  operacional: { fotografo: 0, videomaker: 0, editor: 0, maquiador: 0, iluminador: 0, outros: 0 },
  duracaoHoras: 4,
  metaMensal:  8000,
};

/* ============================================================
   FEATURES
============================================================ */

const FEATURE_CATS = {
  vendas:   { i18nKey: 'res.cat.sales',   color: 'emerald' },
  financas: { i18nKey: 'res.cat.finance', color: 'sky'     },
  admin:    { i18nKey: 'res.cat.admin',   color: 'rose'    },
};

const STATUS_TONES = {
  live: {
    light: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    dark:  'bg-emerald-500/10 text-emerald-300 ring-emerald-500/30',
  },
  soon: {
    light: 'bg-amber-50 text-amber-700 ring-amber-200',
    dark:  'bg-amber-500/10 text-amber-300 ring-amber-500/30',
  },
  planned: {
    light: 'bg-stone-100 text-stone-600 ring-stone-200',
    dark:  'bg-stone-700/40 text-stone-300 ring-stone-600',
  },
};

const FEATURES = [
  { id: 'kanban',     cat: 'vendas',   icon: Layout,         titlePt: 'Pipeline Kanban',          titleEn: 'Kanban Pipeline',         descPt: 'Drag-and-drop por etapa de venda, do prospect ao fechado.', descEn: 'Drag-and-drop sales stages, from prospect to closed.', status: 'live' },
  { id: 'orcamento',  cat: 'vendas',   icon: Calculator,     titlePt: 'Orçamento profissional',   titleEn: 'Professional quote',      descPt: 'Calculadora audiovisual completa, exportável em PDF.',     descEn: 'Full AV calculator, exportable to PDF.', status: 'live' },
  { id: 'clientes',   cat: 'vendas',   icon: Users,          titlePt: 'Banco de clientes',         titleEn: 'Client database',         descPt: 'Histórico, segmentação por nicho e busca rápida.',          descEn: 'History, niche segmentation and fast search.', status: 'live' },
  { id: 'contratos',  cat: 'vendas',   icon: ScrollText,     titlePt: 'Contratos digitais',        titleEn: 'Digital contracts',       descPt: 'Templates por tipo de trabalho com campos automáticos.',     descEn: 'Templates per job type with automatic fields.', status: 'soon' },
  { id: 'agenda',     cat: 'vendas',   icon: Calendar,       titlePt: 'Agenda integrada',          titleEn: 'Synced calendar',         descPt: 'Sessões, follow-ups e prazos sincronizados ao Google.',     descEn: 'Sessions, follow-ups and deadlines synced to Google.', status: 'soon' },
  { id: 'pacotes',    cat: 'vendas',   icon: Package,        titlePt: 'Pacotes pré-definidos',     titleEn: 'Pre-defined packages',    descPt: 'Salve combinações recorrentes e orce em segundos.',         descEn: 'Save recurring combos and quote in seconds.', status: 'soon' },
  { id: 'historico',  cat: 'vendas',   icon: Clock,          titlePt: 'Histórico do cliente',      titleEn: 'Client history',          descPt: 'Tudo que rolou com cada cliente num só lugar.',             descEn: 'Everything that happened with each client in one place.', status: 'live' },
  { id: 'calc',       cat: 'financas', icon: Calculator,     titlePt: 'Calculadora audiovisual',   titleEn: 'AV calculator',           descPt: 'Custo-hora real, equipe terceirizada e direção criativa.', descEn: 'Real cost-per-hour, outsourced crew and creative direction.', status: 'live' },
  { id: 'das',        cat: 'financas', icon: Receipt,        titlePt: 'DAS MEI automático',         titleEn: 'Auto tax reminder',       descPt: 'Lembrete e cálculo do imposto MEI todo mês.',                descEn: 'Reminder and calc of monthly tax.', status: 'soon' },
  { id: 'dre',        cat: 'financas', icon: BookOpen,       titlePt: 'DRE simplificada',           titleEn: 'Simple P&L',              descPt: 'Demonstrativo de resultado em linguagem de produtor.',      descEn: 'Profit & loss statement in producer\'s language.', status: 'soon' },
  { id: 'dashboard',  cat: 'financas', icon: BarChart3,      titlePt: 'Dashboard financeiro',       titleEn: 'Financial dashboard',     descPt: 'Receita, custo e lucro do mês em tempo real.',              descEn: 'Real-time revenue, cost and profit.', status: 'soon' },
  { id: 'despesas',   cat: 'financas', icon: Wallet,         titlePt: 'Categorização de despesas',  titleEn: 'Expense categorization',  descPt: 'Locação, equipe, deslocamento — tudo categorizado.',        descEn: 'Location, crew, travel — all categorized.', status: 'soon' },
  { id: 'projeto',    cat: 'financas', icon: TrendingUp,     titlePt: 'P&L por projeto',            titleEn: 'P&L per project',         descPt: 'Veja quanto cada trabalho gerou de lucro real.',            descEn: 'See real profit per job.', status: 'soon' },
  { id: 'inadimp',    cat: 'financas', icon: AlertCircle,    titlePt: 'Gestão de inadimplência',    titleEn: 'Late payment tracking',   descPt: 'Cobranças automáticas por Pix e WhatsApp.',                  descEn: 'Auto reminders by message.', status: 'soon' },
  { id: 'pix-split',  cat: 'financas', icon: Banknote,       titlePt: 'Pix-Split para equipe',      titleEn: 'Crew payment split',      descPt: 'Pague freelancers direto do app, com split automático.',     descEn: 'Pay freelancers directly with auto-split.', status: 'planned' },
  { id: 'equipe',     cat: 'admin',    icon: Users,          titlePt: 'Cadastro de freelancers',    titleEn: 'Freelancer database',     descPt: 'Diárias, especialidade e disponibilidade dos parceiros.',   descEn: 'Day rates, specialty and availability.', status: 'soon' },
  { id: 'entregas',   cat: 'admin',    icon: ClipboardCheck, titlePt: 'Status de entregas',         titleEn: 'Delivery status',         descPt: 'Acompanhe edições, revisões e arquivos finais.',            descEn: 'Track edits, revisions and final files.', status: 'soon' },
  { id: 'templates',  cat: 'admin',    icon: FileText,       titlePt: 'Templates de proposta',      titleEn: 'Proposal templates',      descPt: 'Reutilize e customize propostas em poucos cliques.',        descEn: 'Reuse and customize proposals in clicks.', status: 'soon' },
  { id: 'assinatura', cat: 'admin',    icon: FileSignature,  titlePt: 'Assinatura digital',         titleEn: 'Digital signature',       descPt: 'Cliente assina contrato pelo celular, sem impressão.',      descEn: 'Clients sign on mobile, no printing.', status: 'planned' },
  { id: 'acessos',    cat: 'admin',    icon: KeyRound,       titlePt: 'Acessos da equipe',          titleEn: 'Team access',             descPt: 'Convide colaboradores com permissões granulares.',          descEn: 'Invite collaborators with granular permissions.', status: 'planned' },
  { id: 'relatorios', cat: 'admin',    icon: FileDown,       titlePt: 'Relatórios exportáveis',     titleEn: 'Exportable reports',      descPt: 'PDF e CSV pra contador, sócio ou banco.',                   descEn: 'PDF and CSV for accountant, partner or bank.', status: 'soon' },
  { id: 'nfe',        cat: 'admin',    icon: Receipt,        titlePt: 'NF-e via parceiro',          titleEn: 'Invoice via partner',     descPt: 'Emissão integrada com emissor licenciado.',                 descEn: 'Integrated invoicing with licensed partner.', status: 'planned' },
];

/* ============================================================
   BRAND LOGO
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
   FLAGS (SVG)
============================================================ */

const FlagBR = ({ size = 18 }) => (
  <svg width={size * 1.4} height={size} viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="20" fill="#009b3a"/>
    <path d="M14 3 L25 10 L14 17 L3 10 Z" fill="#fedf00"/>
    <circle cx="14" cy="10" r="3.5" fill="#002776"/>
    <path d="M10.7 9.3 Q14 8 17.3 9.3" stroke="white" strokeWidth="0.5" fill="none"/>
  </svg>
);

const FlagUS = ({ size = 18 }) => (
  <svg width={size * 1.4} height={size} viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="20" fill="#fff"/>
    {[0,2,4,6,8,10,12].map(y => (
      <rect key={y} y={y * (20/13)} width="28" height={20/13} fill="#b22234"/>
    ))}
    {[1,3,5,7,9,11].map(y => (
      <rect key={`w-${y}`} y={y * (20/13)} width="28" height={20/13} fill="#fff"/>
    ))}
    <rect width="11.2" height={20 * 7/13} fill="#3c3b6e"/>
  </svg>
);

/* ============================================================
   UTILS — currency-aware
============================================================ */

const fmtMoney = (n, lang) => {
  const v = n || 0;
  if (lang === 'en') return v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
};
const fmtMoneyDec = (n, lang) => {
  const v = n || 0;
  if (lang === 'en') return v.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const fmtDate = (ts, t, lang) => {
  const diff = Date.now() - ts;
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(h / 24);
  if (h < 1)  return t('date.now');
  if (h < 24) return `${h}${t('date.hAgo')}`;
  if (d === 1) return t('date.yesterday');
  if (d < 7)  return `${d}${t('date.dAgo')}`;
  const locale = lang === 'en' ? 'en-US' : 'pt-BR';
  return new Date(ts).toLocaleDateString(locale, { day: '2-digit', month: 'short' });
};

const todayLocale = (lang) =>
  new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

const validUntilLocale = (lang, days = 15) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString(lang === 'en' ? 'en-US' : 'pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
};

/* ============================================================
   APP ROOT — Theme + I18n providers
============================================================ */

export default function App() {
  // theme: 'light' | 'dark'
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('claqui:theme');
      if (stored === 'light' || stored === 'dark') return stored;
      // first visit: respect system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    } catch (e) {}
    return 'light';
  });

  // language: 'pt' | 'en'
  const [lang, setLang] = useState(() => {
    try {
      const stored = localStorage.getItem('claqui:lang');
      if (stored === 'pt' || stored === 'en') return stored;
      // first visit: detect browser language
      if (navigator.language && navigator.language.startsWith('en')) return 'en';
    } catch (e) {}
    return 'pt';
  });

  useEffect(() => {
    try { localStorage.setItem('claqui:theme', theme); } catch (e) {}
  }, [theme]);

  useEffect(() => {
    try { localStorage.setItem('claqui:lang', lang); } catch (e) {}
  }, [lang]);

  const themeCtx = useMemo(() => ({
    theme,
    toggle: () => setTheme(t => t === 'light' ? 'dark' : 'light'),
  }), [theme]);

  const i18nCtx = useMemo(() => ({
    lang,
    switchLang: (l) => setLang(l),
    t: (key, vars) => {
      let v = (DICT[lang] && DICT[lang][key]) || DICT.pt[key] || key;
      if (vars) Object.keys(vars).forEach(k => { v = v.replace(`{${k}}`, vars[k]); });
      return v;
    },
  }), [lang]);

  // App-level state
  const [tab, setTab] = useState('jogo');
  const [leads, setLeads] = useState(seed);
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      const v = localStorage.getItem('claqui:leads');
      if (v) {
        const parsed = JSON.parse(v);
        if (Array.isArray(parsed) && parsed.length) setLeads(parsed);
      }
    } catch (e) {}
    setLoaded(true);
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

  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={themeCtx}>
      <I18nContext.Provider value={i18nCtx}>
        <div
          className={`min-h-screen antialiased transition-colors duration-300 ${
            isDark
              ? 'bg-[#0a0a0b] text-stone-100'
              : 'bg-stone-50 text-stone-900'
          }`}
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif' }}
        >
          <Header tab={tab} setTab={setTab} />
          {tab === 'jogo'        && <GameView />}
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
      </I18nContext.Provider>
    </ThemeContext.Provider>
  );
}

/* ============================================================
   HEADER + TABS
============================================================ */

function Header({ tab, setTab }) {
  const { theme, toggle } = useTheme();
  const { lang, switchLang, t } = useI18n();
  const isDark = theme === 'dark';

  return (
    <header
      className={`sticky top-0 z-30 backdrop-blur-xl border-b transition-colors duration-300 no-print ${
        isDark
          ? 'bg-[#0a0a0b]/70 border-white/[0.06]'
          : 'bg-white/70 border-stone-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-3 sm:gap-6">
        <button onClick={() => setTab('pipeline')} className="flex items-center gap-2.5 flex-shrink-0">
          <ClaquiLogo size={32} idPrefix="hd" />
          <div className="text-left hidden sm:block">
            <h1 className={`text-[15px] font-semibold tracking-tight leading-none ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>Claqui</h1>
            <p className={`text-[11px] leading-none mt-1 ${isDark ? 'text-stone-500' : 'text-stone-500'}`}>{t('brand.tagline')}</p>
          </div>
        </button>

        <nav className={`flex items-center gap-1 rounded-full p-1 ${isDark ? 'bg-white/[0.04]' : 'bg-stone-100/80'}`}>
          <TabBtn active={tab === 'jogo'}        onClick={() => setTab('jogo')}>        <Building2 className="w-3.5 h-3.5" /> <span className="hidden sm:inline">{t('tab.jogo')}</span></TabBtn>
          <TabBtn active={tab === 'pipeline'}    onClick={() => setTab('pipeline')}>    <Layout className="w-3.5 h-3.5" /> <span className="hidden sm:inline">{t('tab.pipeline')}</span></TabBtn>
          <TabBtn active={tab === 'calculadora'} onClick={() => setTab('calculadora')}> <Calculator className="w-3.5 h-3.5" /> <span className="hidden sm:inline">{t('tab.calculadora')}</span></TabBtn>
          <TabBtn active={tab === 'recursos'}    onClick={() => setTab('recursos')}>    <Grid3x3 className="w-3.5 h-3.5" /> <span className="hidden sm:inline">{t('tab.recursos')}</span></TabBtn>
        </nav>

        <div className="flex-1" />

        {/* LANG SWITCHER */}
        <div className={`flex items-center gap-0.5 rounded-full p-0.5 ${isDark ? 'bg-white/[0.04]' : 'bg-stone-100/80'}`}>
          <LangBtn active={lang === 'pt'} onClick={() => switchLang('pt')}><FlagBR /></LangBtn>
          <LangBtn active={lang === 'en'} onClick={() => switchLang('en')}><FlagUS /></LangBtn>
        </div>

        {/* THEME TOGGLE */}
        <button
          onClick={toggle}
          aria-label={isDark ? t('theme.toggleLight') : t('theme.toggleDark')}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90 ${
            isDark
              ? 'bg-white/[0.06] hover:bg-white/[0.1] text-stone-300'
              : 'bg-stone-100/80 hover:bg-stone-200/80 text-stone-700'
          }`}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}

function TabBtn({ active, onClick, children }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-[12.5px] font-medium rounded-full transition-all ${
        active
          ? (isDark ? 'bg-white/10 text-white shadow-sm' : 'bg-white text-stone-900 shadow-sm')
          : (isDark ? 'text-stone-400 hover:text-white' : 'text-stone-600 hover:text-stone-900')
      }`}
    >
      {children}
    </button>
  );
}

function LangBtn({ active, onClick, children }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1.5 rounded-full transition-all flex items-center justify-center ${
        active
          ? (isDark ? 'bg-white/10' : 'bg-white shadow-sm')
          : 'opacity-50 hover:opacity-100'
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
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 no-print" style={{ animation: 'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)' }}>
      <div className={`px-5 py-3 rounded-full shadow-2xl text-[13.5px] font-medium flex items-center gap-2 ${
        isDark ? 'bg-white text-stone-900' : 'bg-stone-900 text-white'
      }`}>
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
  const { theme } = useTheme();
  const { t, lang } = useI18n();
  const isDark = theme === 'dark';

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
    total:   leads.length,
    ativo:   leads.filter(l => ['contato','negociacao','proposta'].includes(l.status)).length,
    fechado: leads.filter(l => l.status === 'fechado').length,
    valor:        leads.filter(l => l.status !== 'fechado').reduce((s, l) => s + (l.value || 0), 0),
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
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${isDark ? 'text-stone-500' : 'text-stone-400'}`} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t('pipeline.search')}
              className={`w-full pl-10 pr-4 py-2 text-[13.5px] rounded-full border focus:outline-none transition-all ${
                isDark
                  ? 'bg-white/[0.04] hover:bg-white/[0.06] focus:bg-white/[0.08] border-transparent focus:border-white/20 placeholder:text-stone-500 text-stone-100'
                  : 'bg-stone-100/80 hover:bg-stone-100 focus:bg-white border-transparent focus:border-stone-300 placeholder:text-stone-400'
              }`}
            />
          </div>
          <button
            onClick={() => setAdding(true)}
            className={`flex items-center gap-1.5 px-4 py-2 text-[13.5px] font-medium active:scale-[0.97] rounded-full transition-all shadow-sm ${
              isDark ? 'bg-white text-stone-900 hover:bg-stone-200' : 'text-white bg-stone-900 hover:bg-stone-800'
            }`}
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} /> {t('pipeline.newLead')}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard icon={<Users className="w-4 h-4" />}        label={t('pipeline.stat.active')}      value={stats.total}                hint={`${stats.ativo} ${t('pipeline.stat.activeHint')}`} />
          <StatCard icon={<TrendingUp className="w-4 h-4" />}    label={t('pipeline.stat.negotiation')} value={stats.ativo}                hint={t('pipeline.stat.negotiationHint')} />
          <StatCard icon={<CheckCircle2 className="w-4 h-4" />}  label={t('pipeline.stat.closed')}      value={stats.fechado}              hint={`${fmtMoney(stats.fechadoValor, lang)} ${t('pipeline.stat.closedHint')}`} accent />
          <StatCard icon={<Banknote className="w-4 h-4" />}      label={t('pipeline.stat.open')}        value={fmtMoney(stats.valor, lang)} hint={t('pipeline.stat.openHint')} big />
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {COLUMN_IDS.map(colId => {
            const cards = filtered.filter(l => l.status === colId);
            const total = cards.reduce((s, l) => s + (l.value || 0), 0);
            const isOver = dragOverCol === colId;
            return (
              <div
                key={colId}
                onDragOver={(e) => { e.preventDefault(); setDragOverCol(colId); }}
                onDragLeave={() => setDragOverCol(null)}
                onDrop={() => { if (draggingId) moveCard(draggingId, colId); setDraggingId(null); setDragOverCol(null); }}
                className={`rounded-2xl p-3 transition-all ${
                  isOver
                    ? (isDark ? 'bg-white/[0.08] ring-2 ring-white/20' : 'bg-stone-200/70 ring-2 ring-stone-400/40')
                    : (isDark ? 'bg-white/[0.03]' : 'bg-stone-100/60')
                }`}
              >
                <div className="flex items-center justify-between px-2 pt-1 pb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${COLUMN_DOTS[colId]}`} />
                    <h2 className={`text-[13px] font-semibold tracking-tight ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>{t(`pipeline.col.${colId}`)}</h2>
                    <span className={`text-[11px] tabular-nums ${isDark ? 'text-stone-500' : 'text-stone-500'}`}>{cards.length}</span>
                  </div>
                  {total > 0 && <span className={`text-[10.5px] tabular-nums ${isDark ? 'text-stone-500' : 'text-stone-500'}`}>{fmtMoney(total, lang)}</span>}
                </div>
                <div className="space-y-2 min-h-[60px]">
                  {cards.length === 0 && (
                    <div className="text-center py-8 px-3"><p className={`text-[12px] ${isDark ? 'text-stone-600' : 'text-stone-400'}`}>{t('pipeline.dropHere')}</p></div>
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
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <div
      className={`rounded-2xl p-4 border transition-colors duration-300 ${
        accent
          ? (isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-gradient-to-br from-emerald-50 to-white border-emerald-100')
          : (isDark ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-white border-stone-200/70')
      }`}
      style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}
    >
      <div className={`flex items-center gap-1.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
        <span className={accent ? (isDark ? 'text-emerald-400' : 'text-emerald-600') : (isDark ? 'text-stone-500' : 'text-stone-400')}>{icon}</span>
        <span className="text-[11.5px] font-medium tracking-tight uppercase">{label}</span>
      </div>
      <div className={`mt-2.5 font-semibold tracking-tight tabular-nums ${big ? 'text-[22px]' : 'text-[26px]'} ${
        accent
          ? (isDark ? 'text-emerald-300' : 'text-emerald-700')
          : (isDark ? 'text-stone-100' : 'text-stone-900')
      }`}>{value}</div>
      <p className={`text-[11.5px] mt-0.5 ${isDark ? 'text-stone-500' : 'text-stone-500'}`}>{hint}</p>
    </div>
  );
}

function Card({ lead, onClick, onDragStart, onDragEnd, isDragging }) {
  const { theme } = useTheme();
  const { t, lang } = useI18n();
  const isDark = theme === 'dark';
  const segTones = SEGMENT_TONES[lead.segment] || SEGMENT_TONES.outro;
  const segTone = isDark ? segTones.dark : segTones.light;

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className={`group rounded-xl p-3 border cursor-grab active:cursor-grabbing hover:-translate-y-px transition-all duration-200 ${
        isDragging ? 'opacity-40 rotate-1 scale-95' : ''
      } ${
        isDark
          ? 'bg-[#141416] border-white/[0.06] hover:border-white/[0.12] hover:shadow-lg hover:shadow-black/30'
          : 'bg-white border-stone-200/80 hover:shadow-md hover:border-stone-300'
      }`}
      style={{ boxShadow: isDark ? '0 1px 2px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className={`text-[13.5px] font-semibold tracking-tight leading-tight flex-1 ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>{lead.name}</h3>
        <GripVertical className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5 ${isDark ? 'text-stone-600' : 'text-stone-300'}`} />
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <span className={`text-[10.5px] font-medium px-2 py-0.5 rounded-full ring-1 ring-inset ${segTone}`}>{t(`seg.${lead.segment}`)}</span>
      </div>
      {lead.notes && <p className={`mt-2.5 text-[12px] leading-snug line-clamp-2 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>{lead.notes}</p>}
      <div className={`mt-3 pt-2.5 border-t flex items-center justify-between ${isDark ? 'border-white/[0.06]' : 'border-stone-100'}`}>
        <a href={`https://instagram.com/${lead.instagram.replace('@','')}`} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className={`flex items-center gap-1 text-[11px] transition-colors ${isDark ? 'text-stone-500 hover:text-stone-100' : 'text-stone-500 hover:text-stone-900'}`}>
          <Instagram className="w-3 h-3" /> {lead.instagram}
        </a>
        <span className={`text-[12px] font-semibold tabular-nums ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>{fmtMoney(lead.value || 0, lang)}</span>
      </div>
      <div className={`mt-1.5 flex items-center gap-1 text-[10.5px] ${isDark ? 'text-stone-600' : 'text-stone-400'}`}>
        <Calendar className="w-3 h-3" /> {fmtDate(lead.updated, t, lang)}
      </div>
    </div>
  );
}

function LeadModal({ lead, onClose, onSave, onDelete }) {
  const { theme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === 'dark';

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
  const inputCls = isDark
    ? 'w-full px-3.5 py-2.5 text-[14px] bg-white/[0.04] hover:bg-white/[0.06] focus:bg-white/[0.08] rounded-xl border border-transparent focus:border-white/20 focus:outline-none transition-all text-stone-100 placeholder:text-stone-500'
    : 'w-full px-3.5 py-2.5 text-[14px] bg-stone-100 hover:bg-stone-50 focus:bg-white rounded-xl border border-transparent focus:border-stone-300 focus:outline-none transition-all';

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in no-print" style={{ background: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(28,25,23,0.3)', backdropFilter: 'blur(12px)' }}>
      <div onClick={e => e.stopPropagation()} className={`rounded-3xl w-full max-w-md border overflow-hidden ${isDark ? 'bg-[#141416] border-white/[0.06]' : 'bg-white border-stone-200/60'}`} style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)' }}>
        <div className="flex items-center justify-between px-6 pt-5 pb-2">
          <div>
            <h2 className={`text-[17px] font-semibold tracking-tight ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>{lead ? t('lead.title.edit') : t('lead.title.new')}</h2>
            <p className={`text-[12px] mt-0.5 ${isDark ? 'text-stone-500' : 'text-stone-500'}`}>{t('lead.subtitle')}</p>
          </div>
          <button onClick={onClose} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isDark ? 'hover:bg-white/[0.06] text-stone-400' : 'hover:bg-stone-100 text-stone-500'}`}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-4 space-y-4">
          <Field label={t('lead.field.name')}>
            <input ref={firstFieldRef} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Atelier Lumi Noivas" className={inputCls} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t('lead.field.segment')}>
              <select value={form.segment} onChange={e => setForm({ ...form, segment: e.target.value })} className={`${inputCls} appearance-none`}>
                {SEGMENT_IDS.map(id => (<option key={id} value={id}>{t(`seg.${id}`)}</option>))}
              </select>
            </Field>
            <Field label={t('lead.field.stage')}>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className={`${inputCls} appearance-none`}>
                {COLUMN_IDS.map(id => <option key={id} value={id}>{t(`pipeline.col.${id}`)}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t('lead.field.instagram')}>
              <input value={form.instagram} onChange={e => setForm({ ...form, instagram: e.target.value.startsWith('@') ? e.target.value : '@' + e.target.value })} placeholder="@usuario" className={inputCls} />
            </Field>
            <Field label={t('lead.field.value')}>
              <input type="number" value={form.value} onChange={e => setForm({ ...form, value: parseFloat(e.target.value) || 0 })} placeholder="0" className={`${inputCls} tabular-nums`} />
            </Field>
          </div>
          <Field label={t('lead.field.notes')}>
            <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3} placeholder={t('lead.notes.placeholder')} className={`${inputCls} resize-none leading-snug`} />
          </Field>
        </div>

        <div className={`px-6 py-4 border-t flex items-center justify-between ${isDark ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-stone-50 border-stone-100'}`}>
          {onDelete ? (
            <button onClick={() => { if (confirm(t('lead.deleteConfirm'))) onDelete(); }} className={`flex items-center gap-1.5 px-3 py-2 text-[13px] rounded-lg transition-colors ${isDark ? 'text-red-400 hover:bg-red-500/10' : 'text-red-600 hover:bg-red-50'}`}>
              <Trash2 className="w-3.5 h-3.5" /> {t('lead.delete')}
            </button>
          ) : <span />}
          <div className="flex items-center gap-2">
            <button onClick={onClose} className={`px-4 py-2 text-[13.5px] font-medium rounded-full transition-colors ${isDark ? 'text-stone-300 hover:bg-white/[0.06]' : 'text-stone-700 hover:bg-stone-200/60'}`}>{t('lead.cancel')}</button>
            <button onClick={() => valid && onSave(form)} disabled={!valid} className={`flex items-center gap-1 px-4 py-2 text-[13.5px] font-medium rounded-full transition-all active:scale-[0.97] disabled:cursor-not-allowed ${
              isDark
                ? 'text-stone-900 bg-white hover:bg-stone-200 disabled:bg-white/20 disabled:text-stone-500'
                : 'text-white bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300'
            }`}>
              {t('lead.save')} <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes modalIn { from { opacity: 0; transform: scale(0.96) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } } .animate-in > div { animation: modalIn 0.2s cubic-bezier(0.16, 1, 0.3, 1); }`}</style>
    </div>
  );
}

function Field({ label, children }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <label className="block">
      <span className={`text-[11.5px] font-medium tracking-tight uppercase block mb-1.5 ml-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{label}</span>
      {children}
    </label>
  );
}

/* ============================================================
   CALCULATOR VIEW
============================================================ */

function CalculatorView({ addLead, setTab, showToast }) {
  const { theme } = useTheme();
  const { t, lang } = useI18n();
  const isDark = theme === 'dark';

  const [calc, setCalc] = useState(calcDefaults);
  const [loaded, setLoaded] = useState(false);
  const [savingAsLead, setSavingAsLead] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem('claqui:calc');
      if (v) {
        const parsed = JSON.parse(v);
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

    const operacionalTerceirizado = Object.values(calc.operacional).reduce((s, v) => s + (parseFloat(v) || 0), 0);
    const custoExecucao = custoMinhaHora + variaveis + operacionalTerceirizado;
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
      notes: t('save.notes', { dur: calc.duracaoHoras, exec: fmtMoney(calculo.custoExecucao, lang), dir: calc.trabalho.direcaoCriativa }),
    });
    setSavingAsLead(false);
    showToast(`${clientName} ${t('save.toastSaved')}`);
    setTimeout(() => setTab('pipeline'), 600);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 pb-20 space-y-12 no-print">

      {/* HERO */}
      <section>
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0 ${
            isDark
              ? 'bg-gradient-to-br from-stone-700 to-stone-900'
              : 'bg-gradient-to-br from-stone-900 to-stone-700'
          }`}>
            <Calculator className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <h1 className={`text-[28px] font-semibold tracking-tight leading-tight ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>{t('calc.title')}</h1>
            <p className={`text-[14px] mt-1 max-w-xl leading-snug ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{t('calc.subtitle')}</p>
          </div>
        </div>

        <div className={`mt-5 flex items-start gap-2.5 px-4 py-3 rounded-2xl border ${
          isDark
            ? 'bg-amber-500/[0.08] border-amber-500/20'
            : 'bg-amber-50/70 border-amber-200/60'
        }`}>
          <Info className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
          <p className={`text-[12.5px] leading-snug ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>{t('calc.disclaimer')}</p>
        </div>
      </section>

      <ComparisonTable />

      <section className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">

        <div className="space-y-5">
          <CalcSection title={t('calc.fixed.title')} subtitle={t('calc.fixed.sub')} icon={<Zap className="w-4 h-4" />} total={calculo.fixosMensais}>
            <CalcRow icon={<Camera className="w-4 h-4" />}  label={t('calc.row.rent')}      value={calc.fixos.aluguel}   onChange={v => updateField('fixos','aluguel', v)} />
            <CalcRow icon={<Zap className="w-4 h-4" />}     label={t('calc.row.energy')}    value={calc.fixos.luz}       onChange={v => updateField('fixos','luz', v)} hint="média BR ~ R$ 200" />
            <CalcRow icon={<Droplet className="w-4 h-4" />} label={t('calc.row.water')}     value={calc.fixos.agua}      onChange={v => updateField('fixos','agua', v)} hint="média BR ~ R$ 80" />
            <CalcRow icon={<Wifi className="w-4 h-4" />}    label={t('calc.row.internet')}  value={calc.fixos.internet}  onChange={v => updateField('fixos','internet', v)} hint="banda larga ~ R$ 120" />
            <CalcRow icon={<Wifi className="w-4 h-4" />}    label={t('calc.row.phone')}     value={calc.fixos.telefone}  onChange={v => updateField('fixos','telefone', v)} />
            <CalcRow icon={<Camera className="w-4 h-4" />}  label={t('calc.row.software')}  value={calc.fixos.softwares} onChange={v => updateField('fixos','softwares', v)} hint="Adobe CC ~ R$ 150" />
            <CalcRow icon={<Banknote className="w-4 h-4" />} label={t('calc.row.tax')}      value={calc.fixos.dasMei}    onChange={v => updateField('fixos','dasMei', v)} hint="2026 ~ R$ 75" />
            <CalcRow icon={<Banknote className="w-4 h-4" />} label={t('calc.row.accountant')} value={calc.fixos.contadorMei} onChange={v => updateField('fixos','contadorMei', v)} />
          </CalcSection>

          <CalcSection title={t('calc.equip.title')} subtitle={t('calc.equip.sub')} icon={<Camera className="w-4 h-4" />} total={calculo.depreciacaoMensal}>
            <CalcRow icon={<Camera className="w-4 h-4" />} label={t('calc.row.gearTotal')} value={calc.equipamento.valorTotal}     onChange={v => updateField('equipamento','valorTotal', v)} hint="câmera + lentes + acessórios" />
            <CalcRow icon={<Clock className="w-4 h-4" />}  label={t('calc.row.gearLife')}  value={calc.equipamento.vidaUtilMeses}  onChange={v => updateField('equipamento','vidaUtilMeses', v)} hint="60 = 5 anos" suffix={t('calc.suffix.months')} noCurrency />
          </CalcSection>

          <CalcSection title={t('calc.work.title')} subtitle={t('calc.work.sub')} icon={<Clock className="w-4 h-4" />}>
            <CalcRow icon={<Calendar className="w-4 h-4" />} label={t('calc.row.daysMonth')} value={calc.trabalho.diasMes}  onChange={v => updateField('trabalho','diasMes', v)} hint="20 dias úteis padrão" suffix={t('calc.suffix.days')} noCurrency />
            <CalcRow icon={<Clock className="w-4 h-4" />}    label={t('calc.row.hoursDay')}  value={calc.trabalho.horasDia} onChange={v => updateField('trabalho','horasDia', v)} hint="6-8h é realista"     suffix={t('calc.suffix.hours')} noCurrency />
          </CalcSection>

          <CalcSection title={t('calc.proj.title')} subtitle={t('calc.proj.sub')} icon={<Wrench className="w-4 h-4" />} total={calculo.variaveis + calculo.custoMinhaHora}>
            <CalcRow icon={<Clock className="w-4 h-4" />}  label={t('calc.row.duration')}   value={calc.duracaoHoras}            onChange={v => updateRoot('duracaoHoras', v)} hint={`× custo-hora = ${fmtMoney(calculo.custoMinhaHora, lang)}`} suffix={t('calc.suffix.hours')} noCurrency />
            <CalcRow icon={<Car className="w-4 h-4" />}    label={t('calc.row.transport')}  value={calc.projeto.deslocamentoKm}  onChange={v => updateField('projeto','deslocamentoKm', v)} hint={`× R$ ${calc.projeto.custoKm}/km = ${fmtMoney(calculo.deslocamento, lang)}`} suffix="km" noCurrency />
            <CalcRow icon={<Coffee className="w-4 h-4" />} label={t('calc.row.food')}       value={calc.projeto.alimentacao}     onChange={v => updateField('projeto','alimentacao', v)} />
            <CalcRow icon={<Camera className="w-4 h-4" />} label={t('calc.row.location')}   value={calc.projeto.locacao}         onChange={v => updateField('projeto','locacao', v)} hint="estúdio, drone, etc" />
            <CalcRow icon={<Wrench className="w-4 h-4" />} label={t('calc.row.materials')}  value={calc.projeto.materiais}       onChange={v => updateField('projeto','materiais', v)} hint="figurino, fundo, props" />
          </CalcSection>

          <CalcSection title={t('calc.team.title')} subtitle={t('calc.team.sub')} icon={<Users className="w-4 h-4" />} total={calculo.operacionalTerceirizado} highlight>
            <CalcRow icon={<Camera className="w-4 h-4" />}  label={t('calc.row.photographer')} value={calc.operacional.fotografo}  onChange={v => updateField('operacional','fotografo', v)}  hint="diária ~ R$ 800-2.000" />
            <CalcRow icon={<Film className="w-4 h-4" />}    label={t('calc.row.videographer')} value={calc.operacional.videomaker} onChange={v => updateField('operacional','videomaker', v)} hint="diária ~ R$ 1.000-2.500" />
            <CalcRow icon={<Scissors className="w-4 h-4" />} label={t('calc.row.editor')}      value={calc.operacional.editor}     onChange={v => updateField('operacional','editor', v)}     hint="por entrega ~ R$ 400-1.500" />
            <CalcRow icon={<Palette className="w-4 h-4" />} label={t('calc.row.makeup')}       value={calc.operacional.maquiador}  onChange={v => updateField('operacional','maquiador', v)}  hint="diária ~ R$ 350-800" />
            <CalcRow icon={<Sun className="w-4 h-4" />}     label={t('calc.row.lighting')}     value={calc.operacional.iluminador} onChange={v => updateField('operacional','iluminador', v)} hint="diária ~ R$ 400-900" />
            <CalcRow icon={<Mic className="w-4 h-4" />}     label={t('calc.row.others')}       value={calc.operacional.outros}     onChange={v => updateField('operacional','outros', v)}     hint="locutor, drone, técnico" />
          </CalcSection>

          {/* DIREÇÃO CRIATIVA */}
          <div className={`rounded-2xl p-5 border transition-colors duration-300 ${
            isDark
              ? 'bg-violet-500/[0.08] border-violet-500/20'
              : 'bg-gradient-to-br from-violet-50 to-white border-violet-200/60'
          }`} style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isDark ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-700'
              }`}>
                <Sparkles className="w-4.5 h-4.5" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <h3 className={`text-[15px] font-semibold tracking-tight ${isDark ? 'text-violet-200' : 'text-violet-900'}`}>{t('calc.direction.title')}</h3>
                <p className={`text-[12px] leading-snug mt-0.5 ${isDark ? 'text-violet-300/70' : 'text-violet-700/80'}`}>{t('calc.direction.sub')}</p>

                <div className="mt-4 flex items-center gap-3 flex-wrap">
                  <input
                    type="number"
                    value={calc.trabalho.direcaoCriativa}
                    onChange={e => updateField('trabalho','direcaoCriativa', e.target.value)}
                    className={`w-24 px-3 py-2 text-[18px] font-bold text-center tabular-nums rounded-xl border focus:outline-none transition-all ${
                      isDark
                        ? 'bg-[#141416] text-violet-200 border-violet-500/30 focus:border-violet-400'
                        : 'bg-white text-violet-900 border-violet-200 focus:border-violet-400'
                    }`}
                  />
                  <span className={`text-[14px] font-semibold ${isDark ? 'text-violet-300' : 'text-violet-700'}`}>%</span>
                  <span className={`text-[11.5px] ${isDark ? 'text-violet-300/70' : 'text-violet-700/70'}`}>sobre {fmtMoney(calculo.custoExecucao, lang)} de execução</span>
                </div>

                <div className={`mt-3 flex items-center gap-1.5 text-[11px] ${isDark ? 'text-violet-300/70' : 'text-violet-700/80'}`}>
                  <Info className="w-3 h-3" />
                  {t('calc.direction.hint')}
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

          <button onClick={reset} className={`text-[12px] transition-colors ${isDark ? 'text-stone-500 hover:text-stone-100' : 'text-stone-500 hover:text-stone-900'}`}>
            {t('calc.reset')}
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
  const { theme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === 'dark';

  const competitors = [
    { name: 'RD Station / Pipedrive',    values: [true,  false, false, true ] },
    { name: 'Conta Azul / Nibo',         values: [false, true,  false, true ] },
    { name: 'HoneyBook / Dubsado',       values: [true,  true,  true,  false] },
    { name: 'Notion + Excel + WhatsApp', values: ['half', 'half', false, true] },
  ];

  const Cell = ({ v }) => {
    if (v === true)  return <Check className={`w-4 h-4 mx-auto ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} strokeWidth={2.5} />;
    if (v === false) return <Minus className={`w-4 h-4 mx-auto ${isDark ? 'text-stone-600' : 'text-stone-300'}`} />;
    return <span className={`text-[11px] font-semibold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>{t('comp.partial')}</span>;
  };

  return (
    <section>
      <div className="mb-5">
        <p className={`text-[10.5px] font-semibold tracking-[0.2em] uppercase mb-1.5 ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>{t('comp.eyebrow')}</p>
        <h2 className={`text-[22px] font-semibold tracking-tight leading-tight ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>{t('comp.title')}</h2>
        <p className={`text-[13px] mt-1.5 max-w-xl leading-snug ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{t('comp.desc')}</p>
      </div>

      <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-[#141416] border-white/[0.06]' : 'bg-white border-stone-200/70'}`} style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div className={`grid grid-cols-[1.5fr_repeat(4,1fr)] gap-2 px-5 py-3 border-b ${isDark ? 'border-white/[0.06] bg-white/[0.02]' : 'border-stone-100 bg-stone-50/50'}`}>
          <div className={`text-[10.5px] font-semibold tracking-[0.16em] uppercase ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{t('comp.col.player')}</div>
          {[t('comp.col.crm'), t('comp.col.finance'), t('comp.col.av'), t('comp.col.br')].map(h => (
            <div key={h} className={`text-[10.5px] font-semibold tracking-[0.16em] uppercase text-center ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{h}</div>
          ))}
        </div>
        {competitors.map((c, i) => (
          <div key={i} className={`grid grid-cols-[1.5fr_repeat(4,1fr)] gap-2 px-5 py-3.5 border-b items-center ${isDark ? 'border-white/[0.04]' : 'border-stone-50'}`}>
            <div className={`text-[13px] font-medium ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>{c.name}</div>
            {c.values.map((v, j) => (<div key={j} className="text-center"><Cell v={v} /></div>))}
          </div>
        ))}
        <div className={`grid grid-cols-[1.5fr_repeat(4,1fr)] gap-2 px-5 py-4 items-center ${isDark ? 'bg-emerald-500/[0.08]' : 'bg-gradient-to-r from-emerald-50 to-emerald-50/30'}`}>
          <div className="flex items-center gap-2">
            <ClaquiLogo size={20} idPrefix="ct" />
            <span className={`text-[14px] font-semibold tracking-tight ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>Claqui</span>
          </div>
          {[true, true, true, true].map((v, j) => (<div key={j} className="text-center"><Check className={`w-4 h-4 mx-auto ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} strokeWidth={3} /></div>))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CALC COMPONENTS
============================================================ */

function CalcSection({ title, subtitle, icon, total, children, highlight }) {
  const { theme } = useTheme();
  const { t, lang } = useI18n();
  const isDark = theme === 'dark';

  let bgCls, borderCls, headerBg, iconBg, titleCls, subCls, totalCls, dividerCls;

  if (highlight) {
    bgCls      = isDark ? 'bg-[#141416]' : 'bg-white';
    borderCls  = isDark ? 'border-violet-500/20' : 'border-violet-200/60';
    headerBg   = isDark ? 'bg-violet-500/[0.08]' : 'bg-violet-50/40';
    iconBg     = isDark ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-700';
    titleCls   = isDark ? 'text-violet-200' : 'text-violet-900';
    subCls     = isDark ? 'text-violet-300/70' : 'text-violet-700/70';
    totalCls   = isDark ? 'text-violet-200' : 'text-violet-900';
    dividerCls = isDark ? 'divide-white/[0.06]' : 'divide-stone-100';
  } else {
    bgCls      = isDark ? 'bg-[#141416]' : 'bg-white';
    borderCls  = isDark ? 'border-white/[0.06]' : 'border-stone-200/70';
    headerBg   = '';
    iconBg     = isDark ? 'bg-white/[0.06] text-stone-300' : 'bg-stone-100 text-stone-600';
    titleCls   = isDark ? 'text-stone-100' : 'text-stone-900';
    subCls     = isDark ? 'text-stone-500' : 'text-stone-500';
    totalCls   = isDark ? 'text-stone-100' : 'text-stone-900';
    dividerCls = isDark ? 'divide-white/[0.06]' : 'divide-stone-100';
  }

  return (
    <div className={`rounded-2xl border overflow-hidden ${bgCls} ${borderCls}`} style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
      <div className={`px-5 pt-4 pb-3 border-b flex items-center justify-between ${highlight ? (isDark ? 'border-violet-500/20' : 'border-violet-100') : (isDark ? 'border-white/[0.06]' : 'border-stone-100')} ${headerBg}`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${iconBg}`}>{icon}</div>
          <div>
            <h3 className={`text-[14px] font-semibold tracking-tight ${titleCls}`}>{title}</h3>
            <p className={`text-[11px] leading-tight ${subCls}`}>{subtitle}</p>
          </div>
        </div>
        {total !== undefined && (
          <div className="text-right">
            <div className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>{t('calc.subtotal')}</div>
            <div className={`text-[15px] font-semibold tabular-nums ${totalCls}`}>{fmtMoney(total, lang)}</div>
          </div>
        )}
      </div>
      <div className={`divide-y ${dividerCls}`}>{children}</div>
    </div>
  );
}

function CalcRow({ icon, label, value, onChange, hint, suffix, noCurrency }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`px-5 py-3 flex items-center gap-3 transition-colors ${isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-stone-50/50'}`}>
      <div className={`flex-shrink-0 ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <div className={`text-[13px] font-medium leading-tight ${isDark ? 'text-stone-200' : 'text-stone-800'}`}>{label}</div>
        {hint && <div className={`text-[11px] leading-tight mt-0.5 ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>{hint}</div>}
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {!noCurrency && <span className={`text-[12px] ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>R$</span>}
        <input
          type="number"
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`w-24 px-2.5 py-1.5 text-[13px] text-right tabular-nums rounded-lg border focus:outline-none transition-all font-medium ${
            isDark
              ? 'bg-white/[0.04] hover:bg-white/[0.06] focus:bg-white/[0.08] border-transparent focus:border-white/20 text-stone-100'
              : 'bg-stone-100 hover:bg-stone-50 focus:bg-white border-transparent focus:border-stone-300'
          }`}
        />
        {suffix && <span className={`text-[11px] w-10 ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>{suffix}</span>}
      </div>
    </div>
  );
}

/* ============================================================
   GOAL ANALYSIS
============================================================ */

function GoalAnalysis({ metaMensal, onChangeMeta, precoCliente, duracao, horasMes, custoFixoMensal }) {
  const { theme } = useTheme();
  const { t, lang } = useI18n();
  const isDark = theme === 'dark';

  const projetosNecessarios = precoCliente > 0 ? metaMensal / precoCliente : 0;
  const horasNecessarias = projetosNecessarios * duracao;
  const ocupacao = horasMes > 0 ? (horasNecessarias / horasMes) * 100 : 0;
  const lucroLiquidoMensal = metaMensal - custoFixoMensal;

  let viability = 'good';
  if (ocupacao > 90)  viability = 'tight';
  if (ocupacao > 110) viability = 'impossible';

  const vibe = {
    good:       { text: t('goal.healthy'),      desc: t('goal.healthyDesc') },
    tight:      { text: t('goal.tight'),        desc: t('goal.tightDesc') },
    impossible: { text: t('goal.impossible'),   desc: t('goal.impossibleDesc') },
  }[viability];

  return (
    <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-[#141416] border-white/[0.06]' : 'bg-white border-stone-200/70'}`} style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
      <div className={`px-5 pt-4 pb-3 border-b flex items-center gap-2.5 ${isDark ? 'border-white/[0.06]' : 'border-stone-100'}`}>
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isDark ? 'bg-white/[0.06] text-stone-300' : 'bg-stone-100 text-stone-600'}`}><Target className="w-4 h-4" /></div>
        <div>
          <h3 className={`text-[14px] font-semibold tracking-tight ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>{t('goal.title')}</h3>
          <p className={`text-[11px] leading-tight ${isDark ? 'text-stone-500' : 'text-stone-500'}`}>{t('goal.sub')}</p>
        </div>
      </div>

      <div className="px-5 py-4 space-y-4">
        <div>
          <label className={`text-[11.5px] font-medium tracking-tight uppercase block mb-2 ml-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{t('goal.howMuch')}</label>
          <div className="relative">
            <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>R$</span>
            <input type="number" value={metaMensal} onChange={e => onChangeMeta(e.target.value)} className={`w-full pl-10 pr-4 py-3 text-[18px] font-semibold tabular-nums rounded-xl border focus:outline-none transition-all ${
              isDark
                ? 'bg-white/[0.04] hover:bg-white/[0.06] focus:bg-white/[0.08] border-transparent focus:border-white/20 text-stone-100'
                : 'bg-stone-100 hover:bg-stone-50 focus:bg-white border-transparent focus:border-stone-300'
            }`} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className={`rounded-xl p-3.5 ${isDark ? 'bg-white/[0.03]' : 'bg-stone-50'}`}>
            <div className={`text-[10.5px] font-medium uppercase tracking-wider ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{t('goal.projects')}</div>
            <div className={`text-[22px] font-bold tabular-nums mt-1 ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>{projetosNecessarios.toFixed(1)}</div>
            <div className={`text-[11px] mt-0.5 ${isDark ? 'text-stone-500' : 'text-stone-500'}`}>{t('goal.projectsAt')} {fmtMoney(precoCliente, lang)} {t('goal.projectsEach')}</div>
          </div>
          <div className={`rounded-xl p-3.5 ${isDark ? 'bg-white/[0.03]' : 'bg-stone-50'}`}>
            <div className={`text-[10.5px] font-medium uppercase tracking-wider ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{t('goal.hours')}</div>
            <div className={`text-[22px] font-bold tabular-nums mt-1 ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>{Math.round(horasNecessarias)}h</div>
            <div className={`text-[11px] mt-0.5 ${isDark ? 'text-stone-500' : 'text-stone-500'}`}>{t('goal.hoursOf')} {horasMes}h {t('goal.hoursAvail')}</div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[11.5px] font-medium ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>{t('goal.occupation')}</span>
            <span className={`text-[12px] font-semibold tabular-nums ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>{Math.round(ocupacao)}%</span>
          </div>
          <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/[0.06]' : 'bg-stone-100'}`}>
            <div className={`h-full rounded-full transition-all ${ viability === 'good' ? 'bg-emerald-500' : viability === 'tight' ? 'bg-amber-500' : 'bg-red-500' }`} style={{ width: `${Math.min(ocupacao, 100)}%` }} />
          </div>
        </div>

        <div className={`flex items-start gap-2.5 px-3.5 py-3 rounded-xl border ${
          viability === 'good'
            ? (isDark ? 'bg-emerald-500/[0.08] border-emerald-500/20' : 'bg-emerald-50 border-emerald-100')
            : viability === 'tight'
              ? (isDark ? 'bg-amber-500/[0.08] border-amber-500/20'   : 'bg-amber-50 border-amber-100')
              : (isDark ? 'bg-red-500/[0.08] border-red-500/20'       : 'bg-red-50 border-red-100')
        }`}>
          <Sparkles className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
            viability === 'good'
              ? (isDark ? 'text-emerald-400' : 'text-emerald-600')
              : viability === 'tight'
                ? (isDark ? 'text-amber-400' : 'text-amber-600')
                : (isDark ? 'text-red-400' : 'text-red-600')
          }`} />
          <div className="flex-1">
            <div className={`text-[12.5px] font-semibold ${
              viability === 'good'
                ? (isDark ? 'text-emerald-200' : 'text-emerald-900')
                : viability === 'tight'
                  ? (isDark ? 'text-amber-200' : 'text-amber-900')
                  : (isDark ? 'text-red-200' : 'text-red-900')
            }`}>{vibe.text}</div>
            <p className={`text-[11.5px] leading-snug mt-0.5 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>{vibe.desc}</p>
            {custoFixoMensal > 0 && (
              <p className={`text-[11px] mt-1.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{t('goal.netProfit')} <strong className={isDark ? 'text-stone-200' : 'text-stone-700'}>{fmtMoney(lucroLiquidoMensal, lang)}{t('goal.netProfitMonth')}</strong></p>
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
  const { theme } = useTheme();
  const { t, lang } = useI18n();
  const isDark = theme === 'dark';

  return (
    <aside className="lg:sticky lg:top-24 self-start space-y-3">

      <div className={`rounded-3xl p-6 text-white ${
        isDark
          ? 'bg-gradient-to-br from-[#1a1a1f] to-[#0a0a0b] border border-white/[0.06]'
          : 'bg-gradient-to-br from-stone-900 to-stone-800'
      }`} style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
        <div className="flex items-center gap-2 text-stone-400 mb-3">
          <ClaquiLogo size={20} idPrefix="rp" />
          <span className="text-[11px] font-medium tracking-[0.16em] uppercase">{t('result.label')}</span>
        </div>
        <div className="text-[40px] font-bold tabular-nums tracking-tight leading-none">{fmtMoney(calculo.precoCliente, lang)}</div>
        <div className="mt-1 text-[12px] text-stone-400">{t('result.duration')} {duracao}h</div>

        <div className="mt-5 pt-5 border-t border-white/10 space-y-2.5">
          <ResultRow label={t('result.execution')} value={fmtMoney(calculo.custoExecucao, lang)} muted />
          <ResultRow label={`${t('result.direction')} (${direcaoCriativaPct}%)`} value={fmtMoney(calculo.direcaoCriativa, lang)} accent />
        </div>

        <div className="mt-5 pt-5 border-t border-white/10 grid grid-cols-2 gap-2">
          <button onClick={onSaveAsLead} className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-[12.5px] font-medium text-stone-900 bg-white hover:bg-stone-100 rounded-full transition-all active:scale-[0.97]">
            <FolderPlus className="w-3.5 h-3.5" strokeWidth={2.2} /> {t('result.save')}
          </button>
          <button onClick={onExportPDF} className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-[12.5px] font-medium text-white bg-white/10 hover:bg-white/20 rounded-full transition-all active:scale-[0.97]">
            <FileDown className="w-3.5 h-3.5" strokeWidth={2.2} /> {t('result.exportPdf')}
          </button>
        </div>
      </div>

      <div className={`rounded-2xl border p-5 ${isDark ? 'bg-[#141416] border-white/[0.06]' : 'bg-white border-stone-200/70'}`} style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <h4 className={`text-[11px] font-semibold tracking-[0.16em] uppercase mb-3 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{t('result.composition')}</h4>
        <div className="space-y-2.5">
          <BreakRow label={t('result.row.myHour')}      value={calculo.custoMinhaHora} />
          <BreakRow label={t('result.row.variables')}    value={calculo.variaveis} />
          <BreakRow label={t('result.row.team')}         value={calculo.operacionalTerceirizado} />
          <div className={`border-t my-2 ${isDark ? 'border-white/[0.06]' : 'border-stone-100'}`} />
          <BreakRow label={t('result.row.execTotal')}    value={calculo.custoExecucao} bold />
          <BreakRow label={t('result.row.directionPlus')} value={calculo.direcaoCriativa} accent />
          <div className={`border-t my-2 ${isDark ? 'border-white/[0.1]' : 'border-stone-200'}`} />
          <BreakRow label={t('result.row.clientPrice')} value={calculo.precoCliente} bold big />
        </div>
      </div>

      <div className={`rounded-2xl p-4 border ${isDark ? 'bg-violet-500/[0.08] border-violet-500/20' : 'bg-violet-50 border-violet-100'}`}>
        <p className={`text-[11.5px] leading-snug ${isDark ? 'text-violet-200' : 'text-violet-900'}`}>
          {t('result.tip')}
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
  const { theme } = useTheme();
  const { lang } = useI18n();
  const isDark = theme === 'dark';
  return (
    <div className="flex items-center justify-between">
      <span className={`${big ? 'text-[13px]' : 'text-[12.5px]'} ${
        accent ? (isDark ? 'text-violet-300' : 'text-violet-700') : (bold ? (isDark ? 'text-stone-100 font-medium' : 'text-stone-900 font-medium') : (isDark ? 'text-stone-400' : 'text-stone-600'))
      }`}>{label}</span>
      <span className={`${big ? 'text-[16px]' : 'text-[13px]'} tabular-nums ${
        accent ? (isDark ? 'text-violet-300 font-semibold' : 'text-violet-700 font-semibold') : (bold ? (isDark ? 'text-stone-100 font-bold' : 'text-stone-900 font-bold') : (isDark ? 'text-stone-300' : 'text-stone-700'))
      }`}>{fmtMoney(value, lang)}</span>
    </div>
  );
}

/* ============================================================
   SAVE AS LEAD MODAL
============================================================ */

function SaveAsLeadModal({ orcamento, onClose, onConfirm }) {
  const { theme } = useTheme();
  const { t, lang } = useI18n();
  const isDark = theme === 'dark';

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
  const inputCls = isDark
    ? 'w-full px-3.5 py-2.5 text-[14px] bg-white/[0.04] hover:bg-white/[0.06] focus:bg-white/[0.08] rounded-xl border border-transparent focus:border-white/20 focus:outline-none transition-all text-stone-100'
    : 'w-full px-3.5 py-2.5 text-[14px] bg-stone-100 hover:bg-stone-50 focus:bg-white rounded-xl border border-transparent focus:border-stone-300 focus:outline-none transition-all';

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in no-print" style={{ background: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(28,25,23,0.3)', backdropFilter: 'blur(12px)' }}>
      <div onClick={e => e.stopPropagation()} className={`rounded-3xl w-full max-w-md border overflow-hidden ${isDark ? 'bg-[#141416] border-white/[0.06]' : 'bg-white border-stone-200/60'}`} style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)' }}>
        <div className="flex items-center justify-between px-6 pt-5 pb-2">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}><FolderPlus className={`w-4 h-4 ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`} /></div>
            <div>
              <h2 className={`text-[16px] font-semibold tracking-tight ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>{t('save.title')}</h2>
              <p className={`text-[11.5px] mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{t('save.sub')} {fmtMoney(orcamento, lang)}</p>
            </div>
          </div>
          <button onClick={onClose} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isDark ? 'hover:bg-white/[0.06] text-stone-400' : 'hover:bg-stone-100 text-stone-500'}`}><X className="w-4 h-4" /></button>
        </div>
        <div className="px-6 py-4 space-y-4">
          <Field label={t('save.field.name')}>
            <input ref={firstFieldRef} value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleConfirm()} placeholder={t('save.namePh')} className={inputCls} />
          </Field>
          <Field label={t('save.field.segment')}>
            <select value={segment} onChange={e => setSegment(e.target.value)} className={`${inputCls} appearance-none`}>
              {SEGMENT_IDS.map(id => (<option key={id} value={id}>{t(`seg.${id}`)}</option>))}
            </select>
          </Field>
        </div>
        <div className={`px-6 py-4 border-t flex items-center justify-end gap-2 ${isDark ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-stone-50 border-stone-100'}`}>
          <button onClick={onClose} className={`px-4 py-2 text-[13.5px] font-medium rounded-full transition-colors ${isDark ? 'text-stone-300 hover:bg-white/[0.06]' : 'text-stone-700 hover:bg-stone-200/60'}`}>{t('save.cancel')}</button>
          <button onClick={handleConfirm} disabled={!valid} className={`flex items-center gap-1 px-4 py-2 text-[13.5px] font-medium text-white rounded-full transition-all active:scale-[0.97] disabled:cursor-not-allowed ${
            isDark ? 'bg-emerald-500 hover:bg-emerald-400 disabled:bg-white/10 disabled:text-stone-500' : 'bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-300'
          }`}>
            {t('save.confirm')} <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PRINTABLE PROPOSAL — always light
============================================================ */

function PrintableProposal({ calc, calculo }) {
  const { t, lang } = useI18n();
  const items = [];
  if (calculo.custoMinhaHora > 0)          items.push({ label: `${t('pdf.production')} (${calc.duracaoHoras}h)`,                 value: calculo.custoMinhaHora });
  if (calculo.deslocamento > 0)            items.push({ label: `${t('calc.row.transport')} (${calc.projeto.deslocamentoKm}km)`,  value: calculo.deslocamento });
  if (calc.projeto.alimentacao > 0)        items.push({ label: t('calc.row.food'),                                                value: parseFloat(calc.projeto.alimentacao) });
  if (calc.projeto.locacao > 0)            items.push({ label: t('calc.row.location'),                                            value: parseFloat(calc.projeto.locacao) });
  if (calc.projeto.materiais > 0)          items.push({ label: t('calc.row.materials'),                                           value: parseFloat(calc.projeto.materiais) });
  if (calculo.operacionalTerceirizado > 0) items.push({ label: t('pdf.team'),                                                     value: calculo.operacionalTerceirizado });

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
            <div style={{ fontSize: 11, color: '#78716c', marginTop: 4, letterSpacing: '0.04em' }}>{t('pdf.title').toUpperCase()}</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: '#78716c', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t('pdf.emittedAt')}</div>
          <div style={{ fontSize: 13, fontWeight: 500, marginTop: 4 }}>{todayLocale(lang)}</div>
        </div>
      </div>

      <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.04em', marginTop: 56, lineHeight: 1.1 }}>{t('pdf.h1')}</h1>
      <p style={{ fontSize: 14, color: '#78716c', marginTop: 8, lineHeight: 1.5 }}>{t('pdf.validUntil')} <strong style={{ color: '#0c0a09' }}>{validUntilLocale(lang, 15)}</strong></p>

      <div style={{ marginTop: 48, padding: '32px 28px', background: '#fafaf9', borderRadius: 16, border: '1px solid #e7e5e4' }}>
        <div style={{ fontSize: 11, color: '#78716c', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>{t('pdf.investment')}</div>
        <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: '-0.04em', marginTop: 8, lineHeight: 1, color: '#0c0a09' }}>{fmtMoney(calculo.precoCliente, lang)}</div>
        <div style={{ fontSize: 13, color: '#78716c', marginTop: 8 }}>{t('pdf.duration')} {calc.duracaoHoras}h</div>
      </div>

      <div style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 11, color: '#78716c', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 20 }}>{t('pdf.composition')}</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e7e5e4' }}>
                <td style={{ padding: '14px 0', fontSize: 13, color: '#44403c' }}>{item.label}</td>
                <td style={{ padding: '14px 0', fontSize: 13, fontWeight: 500, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmtMoney(item.value, lang)}</td>
              </tr>
            ))}
            <tr style={{ borderBottom: '1px solid #e7e5e4' }}>
              <td style={{ padding: '14px 0', fontSize: 13, color: '#44403c' }}>{t('pdf.execSubtotal')}</td>
              <td style={{ padding: '14px 0', fontSize: 13, fontWeight: 600, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmtMoney(calculo.custoExecucao, lang)}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e7e5e4' }}>
              <td style={{ padding: '14px 0', fontSize: 13, color: '#44403c' }}>{t('pdf.directionPct')} ({calc.trabalho.direcaoCriativa}%)</td>
              <td style={{ padding: '14px 0', fontSize: 13, fontWeight: 500, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmtMoney(calculo.direcaoCriativa, lang)}</td>
            </tr>
            <tr>
              <td style={{ padding: '20px 0 0', fontSize: 16, fontWeight: 700, color: '#0c0a09' }}>{t('pdf.total')}</td>
              <td style={{ padding: '20px 0 0', fontSize: 20, fontWeight: 700, textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: '#0c0a09', letterSpacing: '-0.02em' }}>{fmtMoney(calculo.precoCliente, lang)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 56, padding: '24px 28px', background: '#fafaf9', borderRadius: 12 }}>
        <h2 style={{ fontSize: 11, color: '#78716c', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 14 }}>{t('pdf.terms')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, fontSize: 12, color: '#44403c', lineHeight: 1.6 }}>
          <div><strong style={{ color: '#0c0a09', fontWeight: 600 }}>{t('pdf.payment')}</strong><br/>{t('pdf.paymentDesc')}</div>
          <div><strong style={{ color: '#0c0a09', fontWeight: 600 }}>{t('pdf.deadline')}</strong><br/>{t('pdf.deadlineDesc')}</div>
          <div><strong style={{ color: '#0c0a09', fontWeight: 600 }}>{t('pdf.delivery')}</strong><br/>{t('pdf.deliveryDesc')}</div>
          <div><strong style={{ color: '#0c0a09', fontWeight: 600 }}>{t('pdf.validity')}</strong><br/>{t('pdf.validityDesc')}</div>
        </div>
      </div>

      <div style={{ marginTop: 80, paddingTop: 24, borderTop: '1px solid #e7e5e4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10.5, color: '#78716c', letterSpacing: '0.06em' }}>
        <span>{t('pdf.footer')}</span>
        <span>{todayLocale(lang)}</span>
      </div>
    </div>
  );
}


/* ============================================================
   FRAME UP TYCOON GAME VIEW
============================================================ */

const GAME_ROOMS = {
  recepcao: { name: 'Recepção', icon: Building2, color: 'from-amber-500 to-orange-600', revenue: 220, reputation: 0.1, clients: 1, buildCost: 0, floor: 1 },
  showroom: { name: 'Loja / Showroom', icon: ShoppingCart, color: 'from-yellow-500 to-amber-700', revenue: 260, reputation: 0.1, clients: 1, buildCost: 0, floor: 1 },
  foto: { name: 'Estúdio Fotográfico', icon: Camera, color: 'from-stone-300 to-stone-500', revenue: 430, reputation: 0.2, clients: 2, buildCost: 2400, floor: 2 },
  video: { name: 'Estúdio de Vídeo', icon: Film, color: 'from-emerald-500 to-green-800', revenue: 650, reputation: 0.25, clients: 2, buildCost: 3600, floor: 3 },
  edicao: { name: 'Edição / Color Grading', icon: Scissors, color: 'from-sky-500 to-violet-700', revenue: 820, reputation: 0.3, clients: 3, buildCost: 5200, floor: 4 },
  estoque: { name: 'Estoque de Equipamentos', icon: Boxes, color: 'from-zinc-500 to-stone-800', revenue: 760, reputation: 0.2, clients: 2, buildCost: 5800, floor: 5 },
  podcast: { name: 'Podcast / Live', icon: Mic, color: 'from-fuchsia-600 to-purple-900', revenue: 1050, reputation: 0.35, clients: 3, buildCost: 7800, floor: 6 },
  camarim: { name: 'Maquiagem / Camarim', icon: Smile, color: 'from-rose-400 to-orange-700', revenue: 980, reputation: 0.45, clients: 3, buildCost: 8200, floor: 7 },
  direcao: { name: 'Direção Criativa', icon: Palette, color: 'from-orange-300 to-stone-700', revenue: 1350, reputation: 0.55, clients: 4, buildCost: 12000, floor: 8 },
  expansao: { name: 'Expansão Premium', icon: Star, color: 'from-indigo-500 to-slate-900', revenue: 1700, reputation: 0.7, clients: 4, buildCost: 18000, floor: 9 },
  rooftop: { name: 'Rooftop de Produção', icon: Trophy, color: 'from-cyan-400 to-blue-900', revenue: 2300, reputation: 1, clients: 5, buildCost: 26000, floor: 10 },
};

const GAME_FLOORS = [
  { n: 10, room: 'rooftop', side: 'right' },
  { n: 9, room: 'expansao', side: 'left' },
  { n: 8, room: 'direcao', side: 'left' },
  { n: 7, room: 'camarim', side: 'right' },
  { n: 6, room: 'podcast', side: 'left' },
  { n: 5, room: 'estoque', side: 'right' },
  { n: 4, room: 'edicao', side: 'left' },
  { n: 3, room: 'video', side: 'left' },
  { n: 2, room: 'foto', side: 'left' },
  { n: 1, room: 'recepcao', secondary: 'showroom', side: 'both' },
];

const SHOP_ITEMS = [
  { id: 'sofa', name: 'Sofá Loft', icon: Sofa, cost: 1250, reputation: 0.2 },
  { id: 'neon', name: 'Pôster Neon', icon: Radio, cost: 350, reputation: 0.15 },
  { id: 'planta', name: 'Planta Grande', icon: Sparkles, cost: 450, reputation: 0.1 },
  { id: 'rack', name: 'Estante Industrial', icon: Boxes, cost: 950, reputation: 0.18 },
  { id: 'luz', name: 'Luminária de Chão', icon: Sun, cost: 420, reputation: 0.12 },
  { id: 'tapete', name: 'Tapete Estúdio', icon: Paintbrush, cost: 380, reputation: 0.1 },
  { id: 'monitor', name: 'Monitores de Edição', icon: MonitorPlay, cost: 1600, reputation: 0.25 },
  { id: 'audio', name: 'Kit Áudio Pro', icon: Volume2, cost: 2100, reputation: 0.3 },
];

const PROJECTS = [
  { name: 'Comercial bebida', payout: 1450, xp: 700, energy: 16, rep: 0.15 },
  { name: 'Clipe musical', payout: 2300, xp: 1100, energy: 24, rep: 0.25 },
  { name: 'Campanha fashion', payout: 3200, xp: 1500, energy: 32, rep: 0.35 },
];

const GAME_DAYS_PER_WEEK = 7;
const GAME_DAYS_PER_MONTH = 30;

const getGameCalendar = (gameDay = 1) => {
  const safeDay = Math.max(1, gameDay);
  const weekDay = ((safeDay - 1) % GAME_DAYS_PER_WEEK) + 1;
  const month = Math.floor((safeDay - 1) / GAME_DAYS_PER_WEEK) + 1;
  const monthDay = Math.round(((weekDay - 1) / (GAME_DAYS_PER_WEEK - 1)) * (GAME_DAYS_PER_MONTH - 1)) + 1;

  return { month, weekDay, monthDay };
};

const advanceGameDay = (state, logEntry) => ({
  ...state,
  gameDay: (state.gameDay || 1) + 1,
  log: [logEntry, ...state.log].slice(0, 4),
});

const freshGameState = () => ({
  cash: 128750,
  xp: 8250,
  level: 18,
  staff: 24,
  maxStaff: 30,
  energy: 86,
  maxEnergy: 100,
  reputation: 4.7,
  clients: 5,
  built: [],
  inventory: [],
  completedProjects: 0,
  missionClaims: [],
  activeProject: { index: 0, progress: 62 },
  gameDay: 1,
  log: ['Novo jogo pronto: cada semana de 7 dias de jogo equivale a 1 mês de 30 dias.'],
});

const GAME_MISSIONS = [
  { id: 'commercial', title: 'Grave um comercial', target: 1, reward: 1200, type: 'projects' },
  { id: 'stars', title: 'Alcance 5 estrelas de reputação', target: 5, reward: 800, type: 'reputation' },
  { id: 'editors', title: 'Contrate 2 editores', target: 26, reward: 600, type: 'staff' },
  { id: 'tower', title: 'Desbloqueie os andares 9 e 10', target: 11, reward: 3500, type: 'built' },
];

function GameView() {
  const [game, setGame] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('claqui:frame-up-game'));
      if (saved && Array.isArray(saved.built)) return { ...freshGameState(), ...saved };
    } catch (e) {}
    return freshGameState();
  });
  const [selected, setSelected] = useState('foto');
  const [shopTab, setShopTab] = useState('decor');

  useEffect(() => {
    try { localStorage.setItem('claqui:frame-up-game', JSON.stringify(game)); } catch (e) {}
  }, [game]);

  const stats = useMemo(() => {
    const rooms = game.built.map(id => GAME_ROOMS[id]).filter(Boolean);
    const hourly = rooms.reduce((sum, room) => sum + room.revenue, 0);
    return { hourly };
  }, [game.built]);


  const buildRoom = (roomId) => {
    const room = GAME_ROOMS[roomId];
    if (!room || game.built.includes(roomId) || game.cash < room.buildCost) return;
    setGame(g => ({
      ...g,
      cash: g.cash - room.buildCost,
      built: [...g.built, roomId],
      clients: Math.min(30, g.clients + room.clients),
      xp: g.xp + 450,
      log: [`${room.name} construído no andar ${room.floor}.`, ...g.log].slice(0, 4),
    }));
  };

  const buyItem = (item) => {
    if (game.inventory.includes(item.id) || game.cash < item.cost) return;
    setGame(g => ({
      ...g,
      cash: g.cash - item.cost,
      inventory: [...g.inventory, item.id],
      reputation: Math.min(5, +(g.reputation + item.reputation).toFixed(2)),
      log: [`${item.name} comprado para decorar o estúdio.`, ...g.log].slice(0, 4),
    }));
  };

  const runProject = () => {
    const project = PROJECTS[game.activeProject.index];
    if (game.energy < project.energy) return;
    setGame(g => {
      const nextProgress = Math.min(100, g.activeProject.progress + 19);
      const completed = nextProgress >= 100;
      const nextIndex = completed ? (g.activeProject.index + 1) % PROJECTS.length : g.activeProject.index;
      return advanceGameDay({
        ...g,
        cash: g.cash + (completed ? project.payout : Math.round(stats.hourly * 0.12)),
        xp: g.xp + (completed ? project.xp : 140),
        energy: g.energy - project.energy,
        reputation: Math.min(5, +(g.reputation + (completed ? project.rep : 0.03)).toFixed(2)),
        completedProjects: g.completedProjects + (completed ? 1 : 0),
        activeProject: { index: nextIndex, progress: completed ? 12 : nextProgress },
      }, completed ? `${project.name} entregue. +1 dia de jogo: 1 semana fecha 1 mês de 30 dias.` : `${project.name} avançou para ${nextProgress}%. +1 dia de jogo.`);
    });
  };

  const hireStaff = () => {
    if (game.staff >= game.maxStaff || game.cash < 900) return;
    setGame(g => ({ ...g, cash: g.cash - 900, staff: g.staff + 1, log: ['Novo editor contratado para a equipe.', ...g.log].slice(0, 4) }));
  };

  const recharge = () => setGame(g => advanceGameDay({ ...g, energy: g.maxEnergy }, 'Dia de descanso: energia recarregada. +1 dia de jogo.'));
  const reset = () => setGame(freshGameState());

  const claimMission = (mission) => {
    const value = missionProgress(mission, game);
    if (value < mission.target || game.missionClaims.includes(mission.id)) return;
    setGame(g => ({ ...g, cash: g.cash + mission.reward, missionClaims: [...g.missionClaims, mission.id], log: [`Missão concluída: ${mission.title}.`, ...g.log].slice(0, 4) }));
  };

  const currentProject = PROJECTS[game.activeProject.index];
  const calendar = getGameCalendar(game.gameDay);

  return (
    <main className="min-h-[calc(100vh-65px)] overflow-hidden bg-[#0f2744] text-white no-print">
      <div className="relative min-h-[calc(100vh-65px)] px-4 py-4 lg:px-6 bg-[radial-gradient(circle_at_50%_20%,rgba(91,166,255,0.35),transparent_35%),linear-gradient(180deg,#173e68_0%,#0f2744_58%,#17263c_100%)]">
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950/75 to-transparent" />
        <GameTopBar game={game} calendar={calendar} reset={reset} />

        <div className="relative z-10 grid grid-cols-1 xl:grid-cols-[190px_minmax(720px,1fr)_300px] gap-4 mt-3 items-start">
          <GameMissions game={game} claimMission={claimMission} />
          <section>
            <div className="rounded-[28px] border border-white/15 bg-slate-950/20 p-3 shadow-2xl backdrop-blur-sm">
              <div className="grid grid-cols-[1fr_64px_1fr] gap-2 max-w-5xl mx-auto">
                <div className="space-y-2">
                  {GAME_FLOORS.map(floor => <GameFloor key={floor.n} floor={floor} side="left" game={game} selected={selected} setSelected={setSelected} buildRoom={buildRoom} />)}
                </div>
                <div className="flex flex-col-reverse items-center rounded-2xl bg-slate-950/55 border border-white/10 overflow-hidden">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map(n => <div key={n} className="flex-1 w-full min-h-[54px] border-t border-white/10 first:border-t-0 flex items-center justify-center text-xs font-black text-slate-300 tabular-nums">{String(n).padStart(2, '0')}</div>)}
                </div>
                <div className="space-y-2">
                  {GAME_FLOORS.map(floor => <GameFloor key={floor.n} floor={floor} side="right" game={game} selected={selected} setSelected={setSelected} buildRoom={buildRoom} />)}
                </div>
              </div>
            </div>
            <GameBottomBar project={currentProject} game={game} runProject={runProject} hireStaff={hireStaff} recharge={recharge} />
          </section>
          <GameShop game={game} shopTab={shopTab} setShopTab={setShopTab} buyItem={buyItem} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto mt-3 grid gap-2 sm:grid-cols-4 text-xs text-slate-200">
          {game.log.map((entry, idx) => <div key={idx} className="rounded-xl border border-white/10 bg-slate-950/35 p-3">{entry}</div>)}
        </div>
      </div>
    </main>
  );
}

function missionProgress(mission, game) {
  if (mission.type === 'projects') return game.completedProjects;
  if (mission.type === 'reputation') return game.reputation;
  if (mission.type === 'staff') return game.staff;
  if (mission.type === 'built') return game.built.length;
  return 0;
}

function GameTopBar({ game, calendar, reset }) {
  return (
    <div className="relative z-10 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 shadow-xl">
      <div className="flex items-center gap-3 min-w-[170px]">
        <Film className="h-8 w-8" />
        <div><div className="text-sm font-black uppercase leading-none">Frame Up</div><div className="text-[10px] tracking-[0.2em] text-slate-400">Produções</div></div>
      </div>
      <GameStat icon={TrendingUp} value={`${game.level}`} label={`${game.xp.toLocaleString('pt-BR')} / 12.000 XP`} tone="cyan" />
      <GameStat icon={Banknote} value={game.cash.toLocaleString('pt-BR')} label="caixa" tone="green" />
      <GameStat icon={Users} value={`${game.staff} / ${game.maxStaff}`} label="equipe" tone="purple" />
      <GameStat icon={Zap} value={`${game.energy} / ${game.maxEnergy}`} label="energia" tone="amber" />
      <GameStat icon={Star} value={game.reputation.toFixed(1)} label="reputação" tone="pink" />
      <GameStat icon={UserPlus} value={game.clients} label="clientes ativos" tone="sky" />
      <GameStat icon={Calendar} value={`Mês ${calendar.month}`} label={`dia ${calendar.monthDay}/30 · semana ${calendar.weekDay}/7`} tone="cyan" />
      <button onClick={reset} className="ml-auto inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-bold hover:bg-white/15"><RotateCcw className="h-4 w-4" />Resetar teste</button>
    </div>
  );
}

function GameStat({ icon: Icon, value, label, tone }) {
  const tones = { cyan: 'text-cyan-300', green: 'text-green-300', purple: 'text-purple-300', amber: 'text-amber-300', pink: 'text-pink-300', sky: 'text-sky-300' };
  return <div className="flex min-w-[120px] items-center gap-2 border-l border-white/10 pl-3"><Icon className={`h-5 w-5 ${tones[tone]}`} /><div><div className="text-lg font-black leading-none">{value}</div><div className="text-[10px] uppercase tracking-wider text-slate-400">{label}</div></div></div>;
}

function GameMissions({ game, claimMission }) {
  return (
    <aside className="rounded-2xl border border-white/10 bg-slate-950/75 p-4 shadow-xl">
      <h2 className="mb-3 text-sm font-black uppercase tracking-wide">Missões</h2>
      <div className="space-y-3">
        {GAME_MISSIONS.map(mission => {
          const progress = missionProgress(mission, game);
          const done = progress >= mission.target;
          const claimed = game.missionClaims.includes(mission.id);
          return <button key={mission.id} onClick={() => claimMission(mission)} className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-left transition hover:bg-white/[0.08]"><div className="flex items-center justify-between gap-2"><span className="text-xs font-bold">{mission.title}</span><span className="text-purple-300 text-xs font-black">✦ {mission.reward}</span></div><div className="mt-2 h-1.5 rounded-full bg-slate-800"><div className="h-full rounded-full bg-purple-400" style={{ width: `${Math.min(100, progress / mission.target * 100)}%` }} /></div><div className="mt-1 text-[10px] text-slate-400">{claimed ? 'Recompensa coletada' : done ? 'Clique para coletar' : `${progress.toFixed(mission.type === 'reputation' ? 1 : 0)} / ${mission.target}`}</div></button>;
        })}
      </div>
    </aside>
  );
}

function GameFloor({ floor, side, game, selected, setSelected, buildRoom }) {
  const roomId = floor.side === 'both' ? (side === 'left' ? floor.room : floor.secondary) : (floor.side === side ? floor.room : null);
  const room = roomId ? GAME_ROOMS[roomId] : null;
  if (!room) return <div className="min-h-[66px] rounded-xl border border-white/5 bg-slate-950/25" />;
  return <RoomTile roomId={roomId} room={room} game={game} selected={selected} setSelected={setSelected} buildRoom={buildRoom} floor={floor.n} />;
}

function RoomTile({ roomId, room, game, selected, setSelected, buildRoom, floor }) {
  const built = game.built.includes(roomId);
  const canPay = game.cash >= room.buildCost;
  const isSelected = selected === roomId;
  const Icon = room.icon;
  return (
    <button onClick={() => { setSelected(roomId); if (!built && canPay) buildRoom(roomId); }} className={`relative min-h-[66px] overflow-hidden rounded-xl border text-left transition ${isSelected ? 'border-cyan-300 ring-2 ring-cyan-300/40' : 'border-white/10'} ${built ? `bg-gradient-to-br ${room.color}` : 'bg-slate-900/80 hover:bg-slate-800/90'}`}>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.11)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.11)_1px,transparent_1px)] bg-[size:28px_28px] opacity-30" />
      <div className="relative z-10 flex h-full items-center gap-3 p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/30"><Icon className="h-5 w-5" /></div>
        <div className="min-w-0"><div className="truncate text-xs font-black uppercase">{built ? room.name : floor <= 2 ? 'Espaço vazio' : 'Espaço disponível'}</div><div className="mt-1 text-[10px] text-white/75">{built ? `+${room.revenue}/ciclo · +${room.clients} clientes` : room.buildCost ? `Construir ${room.name}: $ ${room.buildCost.toLocaleString('pt-BR')}` : 'Clique para ativar'}</div></div>
        {!built && <div className="ml-auto rounded-lg bg-black/35 p-2">{canPay ? <HardHat className="h-4 w-4 text-amber-300" /> : <Lock className="h-4 w-4 text-slate-400" />}</div>}
      </div>
    </button>
  );
}

function GameShop({ game, shopTab, setShopTab, buyItem }) {
  const visible = shopTab === 'decor' ? SHOP_ITEMS.slice(0, 6) : SHOP_ITEMS.slice(6);
  return (
    <aside className="rounded-2xl border border-white/10 bg-slate-950/80 p-4 shadow-xl">
      <div className="mb-3 flex items-center justify-between"><h2 className="flex items-center gap-2 text-sm font-black uppercase"><ShoppingCart className="h-4 w-4" />Loja</h2><X className="h-4 w-4 text-slate-400" /></div>
      <div className="mb-3 grid grid-cols-2 rounded-xl bg-white/10 p-1 text-xs font-bold"><button onClick={() => setShopTab('decor')} className={`rounded-lg py-2 ${shopTab === 'decor' ? 'bg-purple-600' : ''}`}>Decoração</button><button onClick={() => setShopTab('equip')} className={`rounded-lg py-2 ${shopTab === 'equip' ? 'bg-purple-600' : ''}`}>Equipamentos</button></div>
      <div className="grid grid-cols-2 gap-3">
        {visible.map(item => {
          const Icon = item.icon;
          const owned = game.inventory.includes(item.id);
          const disabled = owned || game.cash < item.cost;
          return <button key={item.id} disabled={disabled} onClick={() => buyItem(item)} className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-left transition enabled:hover:bg-white/[0.08] disabled:opacity-55"><div className="text-xs font-bold">{item.name}</div><div className="my-4 flex h-14 items-center justify-center rounded-lg bg-slate-900/70"><Icon className="h-8 w-8 text-amber-300" /></div><div className="flex items-center justify-between text-[11px]"><span className="font-black text-green-300">$ {item.cost}</span><span>{owned ? 'Comprado' : `+${item.reputation}★`}</span></div></button>;
        })}
      </div>
    </aside>
  );
}

function GameBottomBar({ project, game, runProject, hireStaff, recharge }) {
  const canRun = game.energy >= project.energy;
  return (
    <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_1fr_1fr_1.25fr]">
      <button onClick={runProject} disabled={!canRun} className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 px-5 py-4 font-black text-slate-950 shadow-xl disabled:opacity-50"><PlayCircle className="h-6 w-6" />Produzir job</button>
      <button onClick={hireStaff} className="flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-5 py-4 font-black text-white shadow-xl"><Users className="h-6 w-6" />Contratar</button>
      <button onClick={recharge} className="flex items-center justify-center gap-3 rounded-2xl bg-teal-600 px-5 py-4 font-black text-white shadow-xl"><Zap className="h-6 w-6" />Recarregar</button>
      <div className="rounded-2xl border border-white/10 bg-slate-950/75 p-4"><div className="flex items-center justify-between gap-3"><div><div className="text-[10px] uppercase tracking-widest text-slate-400">Projeto ativo</div><div className="font-black">{project.name}</div></div><ChevronRight /></div><div className="mt-3 h-2 rounded-full bg-slate-800"><div className="h-full rounded-full bg-cyan-400" style={{ width: `${game.activeProject.progress}%` }} /></div><div className="mt-1 flex items-center justify-between text-xs text-slate-300"><span>1 ação = +1 dia · 7 dias = 30 dias</span><span>{game.activeProject.progress}%</span></div></div>
    </div>
  );
}

/* ============================================================
   RECURSOS VIEW
============================================================ */

function RecursosView({ setTab }) {
  const { theme } = useTheme();
  const { t, lang } = useI18n();
  const isDark = theme === 'dark';

  const [filter, setFilter] = useState('todos');
  const visible = filter === 'todos' ? FEATURES : FEATURES.filter(f => f.cat === filter);
  const counts = {
    live:    FEATURES.filter(f => f.status === 'live').length,
    soon:    FEATURES.filter(f => f.status === 'soon').length,
    planned: FEATURES.filter(f => f.status === 'planned').length,
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 pb-20 no-print">

      <section className="text-center max-w-3xl mx-auto mb-12">
        <p className={`text-[11px] font-semibold tracking-[0.22em] uppercase mb-3 ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>{t('res.eyebrow')}</p>
        <h1 className={`text-[42px] font-bold tracking-[-0.035em] leading-[1.05] ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>
          {t('res.title')}<br/>
          <span className={isDark ? 'text-stone-500' : 'text-stone-500'}>{t('res.titleSub')}</span>
        </h1>
        <p className={`text-[15px] mt-5 leading-relaxed max-w-xl mx-auto ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
          {FEATURES.length} {t('res.desc')}
        </p>

        <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
          <StatusPill count={counts.live}    label={t('res.status.live')}    tone="live" />
          <StatusPill count={counts.soon}    label={t('res.status.soon')}    tone="soon" />
          <StatusPill count={counts.planned} label={t('res.status.planned')} tone="planned" />
        </div>
      </section>

      <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
        <FilterPill active={filter === 'todos'} onClick={() => setFilter('todos')}>{t('res.filter.all')}</FilterPill>
        {Object.entries(FEATURE_CATS).map(([key, cat]) => (
          <FilterPill key={key} active={filter === key} onClick={() => setFilter(key)} dotColor={cat.color}>
            {t(cat.i18nKey)}
          </FilterPill>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map(f => <FeatureCard key={f.id} feature={f} />)}
      </div>

      <section className={`mt-16 rounded-3xl p-10 text-center ${
        isDark
          ? 'bg-gradient-to-br from-[#1a1a1f] to-[#0a0a0b] border border-white/[0.06]'
          : 'bg-gradient-to-br from-stone-900 to-stone-800'
      }`} style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
        <ClaquiLogo size={56} idPrefix="cta" />
        <h2 className="text-[28px] font-bold tracking-tight text-white mt-5 leading-tight">{t('res.cta.title')}</h2>
        <p className="text-[14px] text-stone-400 mt-3 max-w-md mx-auto leading-relaxed">{t('res.cta.desc')}</p>
        <div className="mt-7 flex items-center justify-center gap-2.5 flex-wrap">
          <button onClick={() => setTab('pipeline')} className="flex items-center gap-1.5 px-5 py-2.5 text-[13.5px] font-medium text-stone-900 bg-white hover:bg-stone-100 rounded-full transition-all active:scale-[0.97]">
            {t('res.cta.openPipeline')} <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={() => setTab('calculadora')} className="flex items-center gap-1.5 px-5 py-2.5 text-[13.5px] font-medium text-white bg-white/10 hover:bg-white/20 rounded-full transition-all active:scale-[0.97]">
            {t('res.cta.openCalc')} <Calculator className="w-4 h-4" />
          </button>
        </div>
      </section>
    </main>
  );
}

function StatusPill({ count, label, tone }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const cls = isDark ? STATUS_TONES[tone].dark : STATUS_TONES[tone].light;
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ring-1 ring-inset ${cls}`}>
      <span className="text-[12.5px] font-bold tabular-nums">{count}</span>
      <span className="text-[11.5px] font-medium">{label}</span>
    </div>
  );
}

function FilterPill({ active, onClick, children, dotColor }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const dot = { emerald: 'bg-emerald-500', sky: 'bg-sky-500', rose: 'bg-rose-500' }[dotColor];

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium rounded-full transition-all ${
        active
          ? (isDark ? 'bg-white text-stone-900 shadow-sm' : 'bg-stone-900 text-white shadow-sm')
          : (isDark ? 'bg-white/[0.04] text-stone-300 hover:text-white border border-white/[0.06]' : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200')
      }`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />}
      {children}
    </button>
  );
}

function FeatureCard({ feature }) {
  const { theme } = useTheme();
  const { t, lang } = useI18n();
  const isDark = theme === 'dark';

  const cat = FEATURE_CATS[feature.cat];
  const statusCls = isDark ? STATUS_TONES[feature.status].dark : STATUS_TONES[feature.status].light;
  const Icon = feature.icon;

  const iconBg = {
    emerald: isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600',
    sky:     isDark ? 'bg-sky-500/10 text-sky-400'         : 'bg-sky-50 text-sky-600',
    rose:    isDark ? 'bg-rose-500/10 text-rose-400'       : 'bg-rose-50 text-rose-600',
  }[cat.color];

  const isLive = feature.status === 'live';
  const title = lang === 'en' ? feature.titleEn : feature.titlePt;
  const desc  = lang === 'en' ? feature.descEn  : feature.descPt;

  return (
    <div className={`rounded-2xl border p-5 transition-all hover:shadow-md hover:-translate-y-0.5 group ${
      isDark
        ? `bg-[#141416] ${isLive ? 'border-white/[0.06] hover:border-white/[0.12]' : 'border-white/[0.04]'}`
        : `${isLive ? 'border-stone-200/70 hover:border-stone-300' : 'border-stone-200/50'} bg-white`
    }`} style={{ boxShadow: isDark ? '0 1px 2px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.03)' }}>
      <div className="flex items-start justify-between gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
          <Icon className="w-4.5 h-4.5" strokeWidth={2} />
        </div>
        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ring-1 ring-inset ${statusCls}`}>
          {t(`res.status.${feature.status}`)}
        </span>
      </div>

      <h3 className={`text-[14.5px] font-semibold tracking-tight mt-3.5 leading-tight ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>{title}</h3>
      <p className={`text-[12.5px] mt-1.5 leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{desc}</p>

      <div className={`mt-4 pt-3 border-t flex items-center justify-between ${isDark ? 'border-white/[0.06]' : 'border-stone-100'}`}>
        <span className={`text-[10.5px] font-medium uppercase tracking-wider ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>{t(cat.i18nKey)}</span>
        {isLive && (
          <span className={`text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
            {t('res.canUse')} <ArrowRight className="w-3 h-3" />
          </span>
        )}
      </div>
    </div>
  );
}
