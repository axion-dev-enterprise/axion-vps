import React, { useState, useEffect, useRef } from 'react';
import {
  Server,
  Activity,
  Terminal,
  Shield,
  HardDrive,
  Key,
  Cpu,
  MemoryStick,
  Wifi,
  Power,
  RotateCw,
  Play,
  Square,
  Copy,
  Check,
  Plus,
  RefreshCw,
  Lock,
  Globe,
  Radio,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Database,
  Sliders,
  AlertTriangle,
  FileText,
  Download,
  QrCode,
  Zap,
  Clock,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Search,
  ShoppingCart,
  DollarSign,
  UserCheck,
  Sparkles,
  CreditCard,
  Building2,
  SlidersHorizontal,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [viewMode, setViewMode] = useState('store'); // 'store' | 'my-servers' | 'monitor'
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'
  const [selectedEngine, setSelectedEngine] = useState('hostinger'); // 'hostinger' | 'serverspace'
  const [selectedOS, setSelectedOS] = useState('debian');
  const [selectedRegion, setSelectedRegion] = useState('br');
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  // Checkout & Provisioning Modals
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisionStep, setProvisionStep] = useState(1);
  const [provisionedCredentials, setProvisionedCredentials] = useState(null);

  // General State
  const [copiedText, setCopiedText] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Purchased Servers List (Client Portal)
  const [myServers, setMyServers] = useState([
    {
      id: 'vps-us-east-1',
      name: 'Debian Primary Node (Produção)',
      ip: '104.207.81.41',
      plan: 'VPS Performance (2 vCPU / 4 GB)',
      os: 'Debian 12 Bookworm',
      engine: 'Hostinger Cloud',
      region: 'EUA (US-East)',
      status: 'ONLINE',
      uptime: '99.98%',
      rootPass: 'AxionCloud2026!Sec'
    }
  ]);

  // Terminal state (for Monitor Mode)
  const [terminalHistory, setTerminalHistory] = useState([
    { text: 'AXION VPS Cloud OS v4.19.2 (Debian GNU/Linux 12 bookworm x86_64)', type: 'system' },
    { text: 'Conectado em root@104.207.81.41 via SSH seguro (Porta 22)', type: 'system' },
    { text: 'Digite "help" ou selecione um comando rápido abaixo.', type: 'info' }
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalEndRef = useRef(null);

  // Auto scroll terminal
  useEffect(() => {
    if (viewMode === 'monitor') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory, viewMode]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    showToast(`${label} copiado para a área de transferência!`);
    setTimeout(() => setCopiedText(null), 2500);
  };

  // Plans Config
  const PLANS = [
    {
      id: 'starter',
      name: 'VPS Starter',
      badge: 'Ideal para MVPs & Bots',
      cpu: '1 vCPU AMD',
      ram: '2 GB RAM NVMe',
      disk: '50 GB SSD',
      bandwidth: '2 TB Tráfego',
      monthlyPrice: 39,
      annualPrice: 31,
      popular: false,
      icon: Cpu,
      features: ['IPv4 Dedicado incluso', 'Firewall UFW Ativo', 'Snapshots semanais', 'Suporte AXION 24/7']
    },
    {
      id: 'performance',
      name: 'VPS Performance',
      badge: 'MAIS VENDIDO',
      cpu: '2 vCPU AMD EPYC',
      ram: '4 GB RAM NVMe',
      disk: '80 GB SSD',
      bandwidth: '4 TB Tráfego',
      monthlyPrice: 79,
      annualPrice: 63,
      popular: true,
      icon: Zap,
      features: ['DDoS Protection 100 Gbps', 'WireGuard VPN nativa', 'Backup diário automatizado', 'Painel de Reboot em 1-clique']
    },
    {
      id: 'enterprise',
      name: 'VPS Enterprise Pro',
      badge: 'Alta Performance',
      cpu: '4 vCPU AMD EPYC',
      ram: '8 GB RAM NVMe',
      disk: '160 GB SSD',
      bandwidth: '8 TB Tráfego',
      monthlyPrice: 159,
      annualPrice: 127,
      popular: false,
      icon: Shield,
      features: ['Recursos 100% Dedicados', 'SLA Garantido de 99.98%', 'Suporte Telefônico Prioritário', 'Migração de Dados Gratuita']
    },
    {
      id: 'dedicated',
      name: 'VPS Dedicated Max',
      badge: 'Máxima Capacidade',
      cpu: '8 vCPU AMD EPYC',
      ram: '16 GB RAM NVMe',
      disk: '320 GB SSD',
      bandwidth: '16 TB Tráfego',
      monthlyPrice: 299,
      annualPrice: 239,
      popular: false,
      icon: Server,
      features: ['Hardware Bare-Metal Isulados', 'Arquiteto de Nuvem Dedicado', 'Redundância Multi-Region', 'Relatório mensal de auditoria']
    }
  ];

  // Initiate Purchase Flow
  const handleOpenCheckout = (plan) => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
  };

  // Start Provisioning Sequence
  const handleConfirmPayment = () => {
    setIsCheckoutOpen(false);
    setIsProvisioning(true);
    setProvisionStep(1);

    // Simulate Step-by-Step Auto-Provisioning Pipeline
    setTimeout(() => setProvisionStep(2), 2000);
    setTimeout(() => setProvisionStep(3), 4000);
    setTimeout(() => {
      setProvisionStep(4);
      const newIp = `151.244.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 250)}`;
      const newCreds = {
        id: `vps-auto-${Date.now().toString().slice(-4)}`,
        name: `AXION VPS ${selectedPlan.name}`,
        ip: newIp,
        plan: selectedPlan.name,
        os: selectedOS === 'debian' ? 'Debian 12 Bookworm' : selectedOS === 'ubuntu' ? 'Ubuntu 24.04 LTS' : 'AlmaLinux 9',
        engine: selectedEngine === 'hostinger' ? 'Hostinger Cloud' : 'ServerSpace Enterprise',
        region: selectedRegion === 'br' ? 'Brasil (São Paulo)' : selectedRegion === 'us' ? 'EUA (Virginia)' : 'Alemanha (Frankfurt)',
        status: 'ONLINE',
        uptime: '100%',
        rootPass: `AxionCloud#${Math.random().toString(36).slice(-6)}`
      };
      setProvisionedCredentials(newCreds);
      setMyServers(prev => [newCreds, ...prev]);
    }, 6500);
  };

  const executeCommand = (cmd) => {
    const cleanCmd = cmd.toLowerCase();
    let responseLines = [];

    setTerminalHistory(prev => [...prev, { text: `root@axion-vps:~# ${cmd}`, type: 'input' }]);

    if (cleanCmd === 'help') {
      responseLines = [
        { text: 'Comandos disponíveis no AXION VPS Console:', type: 'output' },
        { text: '  docker ps         - Lista contêineres Docker em execução', type: 'output' },
        { text: '  htop              - Exibe uso de CPU/RAM em tempo real', type: 'output' },
        { text: '  netstat           - Exibe portas e conexões ativas', type: 'output' },
        { text: '  df -h             - Exibe uso de disco NVMe', type: 'output' },
        { text: '  ufw status        - Exibe regras do Firewall', type: 'output' },
        { text: '  uptime            - Exibe tempo de atividade da instância', type: 'output' },
        { text: '  clear             - Limpa o terminal', type: 'output' }
      ];
    } else if (cleanCmd === 'clear') {
      setTerminalHistory([]);
      return;
    } else if (cleanCmd === 'docker ps') {
      responseLines = [
        { text: 'CONTAINER ID   IMAGE                 STATUS         PORTS', type: 'output' },
        { text: 'a8f912c019d4   traefik:v2.10         Up 14 days     0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp', type: 'output' },
        { text: 'f391b4910e11   louislam/uptime-kuma  Up 14 days     0.0.0.0:3002->3001/tcp', type: 'output' },
        { text: 'c102a99182bb   wireguard:latest      Up 14 days     0.0.0.0:51820->51820/udp', type: 'output' }
      ];
    } else if (cleanCmd === 'htop') {
      responseLines = [
        { text: '  CPU[||||||||||||.............. 28.4%]    Tasks: 42 total, 1 running', type: 'output' },
        { text: '  Mem[||||||||||||||||.......... 819M/2.00G] Swp[0K/0K]', type: 'output' },
        { text: '  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND', type: 'output' },
        { text: ' 1042 root      20   0  712400  18200  12400 S   4.2   0.9  18:42.10 traefik', type: 'output' }
      ];
    } else {
      responseLines = [
        { text: `bash: ${cmd}: command not found. Digite "help" para ver a lista de comandos.`, type: 'error' }
      ];
    }

    setTimeout(() => {
      setTerminalHistory(prev => [...prev, ...responseLines]);
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#030508] text-[#F1F5F9] font-sans flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] border border-cyan-500/40 text-cyan-200 px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-bounce">
          <Zap className="w-5 h-5 text-cyan-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Navigation */}
      <header className="border-b border-[#151D2A] bg-[#080C14]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setViewMode('store')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Server className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                  AXION VPS
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold">
                  Cloud Platform
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Infraestrutura Hostinger & ServerSpace Enterprise</p>
            </div>
          </div>

          {/* Center Mode Switcher Tabs */}
          <div className="hidden md:flex items-center gap-1 p-1 bg-[#0D1525] border border-slate-800 rounded-xl">
            <button
              onClick={() => setViewMode('store')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'store'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Loja & Planos VPS</span>
            </button>

            <button
              onClick={() => setViewMode('my-servers')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'my-servers'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Meus Servidores ({myServers.length})</span>
            </button>

            <button
              onClick={() => setViewMode('monitor')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'monitor'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Monitor de Nós (vps1)</span>
            </button>
          </div>

          {/* Right Action & WhatsApp Button */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/5511924765169?text=Ol%C3%A1!%20Gostaria%20de%20d%C3%BAvidas%20sobre%20os%20planos%20VPS%20AXION."
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Suporte 24/7</span>
            </a>

            <button
              onClick={() => showToast('Login AXION Auth ativo. Bem-vindo(a)!')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0F172A] border border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-white transition text-xs font-medium"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>AXION Account</span>
            </button>
          </div>

        </div>
      </header>

      {/* VIEW MODE 1: VPS STORE & CONFIGURATOR */}
      {viewMode === 'store' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fadeIn">
          
          {/* Hero Banner */}
          <div className="glass-panel-glow p-8 sm:p-12 rounded-3xl relative overflow-hidden text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>PROVISIONAMENTO CLOUD AUTÔNOMO EM &lt; 60 SEGUNDOS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Servidores Cloud VPS de Alta Performance com <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">SSD NVMe & Proteção DDoS</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Desenvolvido para escalar aplicações, bancos de dados, microsserviços e contêineres Docker na infraestrutura robusta da **Hostinger** e **ServerSpace**.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono pt-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>99.98% SLA Garantido</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Endereço IP Dedicado IPv4</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Pagamento via PIX & Cartão</span>
              </div>
            </div>
          </div>

          {/* Interactive Infrastructure Engine & OS Selector Banner */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                  <span>Configurador Personalizado da VPS</span>
                </h3>
                <p className="text-xs text-slate-400">Escolha o motor de nuvem, sistema operacional e região do datacenter.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Option 1: Infrastructure Engine */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Provedor Cloud</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedEngine('hostinger')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition ${
                      selectedEngine === 'hostinger'
                        ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10'
                        : 'bg-[#0A0F1D] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-cyan-400" />
                    <span>Hostinger Cloud</span>
                  </button>

                  <button
                    onClick={() => setSelectedEngine('serverspace')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition ${
                      selectedEngine === 'serverspace'
                        ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300 shadow-md shadow-indigo-500/10'
                        : 'bg-[#0A0F1D] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Server className="w-5 h-5 text-indigo-400" />
                    <span>ServerSpace NVMe</span>
                  </button>
                </div>
              </div>

              {/* Option 2: Operating System */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Sistema Operacional (SO)</label>
                <select
                  value={selectedOS}
                  onChange={(e) => setSelectedOS(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#0A0F1D] border border-slate-800 text-slate-200 text-xs font-mono focus:border-cyan-500 focus:outline-none"
                >
                  <option value="debian">Debian 12 Bookworm (Recomendado)</option>
                  <option value="ubuntu">Ubuntu 24.04 LTS Server</option>
                  <option value="almalinux">AlmaLinux 9 (RedHat Enterprise)</option>
                  <option value="docker">Docker Stack pre-installed</option>
                  <option value="windows">Windows Server 2022 (+R$ 40/mês)</option>
                </select>
              </div>

              {/* Option 3: Datacenter Region */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Região do Datacenter</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'br', flag: '🇧🇷', name: 'Brasil' },
                    { id: 'us', flag: '🇺🇸', name: 'EUA East' },
                    { id: 'eu', flag: '🇩🇪', name: 'Alemanha' },
                  ].map(reg => (
                    <button
                      key={reg.id}
                      onClick={() => setSelectedRegion(reg.id)}
                      className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition ${
                        selectedRegion === reg.id
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300'
                          : 'bg-[#0A0F1D] border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span>{reg.flag}</span>
                      <span>{reg.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Toggle (Monthly vs Annual) */}
          <div className="flex flex-col items-center space-y-4">
            <div className="inline-flex items-center gap-3 p-1.5 bg-[#0D1525] border border-slate-800 rounded-full">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-full text-xs font-bold transition ${
                  billingCycle === 'monthly'
                    ? 'bg-slate-800 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Cobrança Mensal
              </button>

              <button
                onClick={() => setBillingCycle('annual')}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition ${
                  billingCycle === 'annual'
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 shadow-lg shadow-cyan-500/25'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Cobrança Anual</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-950 text-cyan-300 text-[10px] uppercase font-mono font-extrabold">
                  20% OFF
                </span>
              </button>
            </div>

            <p className="text-xs font-mono text-slate-400">
              {billingCycle === 'annual' ? '🎉 Plano anual inclui IP Fixo Dedicado IPv4 grátis + Snapshots semanais.' : 'Cobrança mensal recorrente sem fidelidade. Cancele quando quiser.'}
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANS.map((plan) => {
              const Icon = plan.icon;
              const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;

              return (
                <div
                  key={plan.id}
                  className={`glass-panel p-6 rounded-2xl border flex flex-col justify-between relative transition duration-300 hover:scale-[1.02] ${
                    plan.popular
                      ? 'border-cyan-500/60 shadow-2xl shadow-cyan-500/10 bg-[#080E1A]'
                      : 'border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-mono text-[10px] uppercase font-extrabold rounded-full shadow-lg">
                      {plan.badge}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                        <Icon className="w-6 h-6" />
                      </div>
                      {!plan.popular && (
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded">
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-xs font-mono text-slate-400">R$</span>
                        <span className="text-3xl font-extrabold text-white tracking-tight">{price}</span>
                        <span className="text-xs text-slate-400 font-mono">/mês</span>
                      </div>
                      {billingCycle === 'annual' && (
                        <p className="text-[11px] text-emerald-400 font-mono mt-1">Economia de R$ {(plan.monthlyPrice - plan.annualPrice) * 12}/ano</p>
                      )}
                    </div>

                    {/* Specs Matrix */}
                    <div className="p-3 rounded-xl bg-[#04070D] border border-slate-900 font-mono text-xs space-y-1.5">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-500">vCPU:</span>
                        <span className="font-bold text-cyan-400">{plan.cpu}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-500">RAM:</span>
                        <span className="font-bold text-emerald-400">{plan.ram}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-500">Disco SSD:</span>
                        <span className="font-bold text-indigo-400">{plan.disk}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-500">Tráfego:</span>
                        <span className="font-bold text-violet-400">{plan.bandwidth}</span>
                      </div>
                    </div>

                    {/* Features list */}
                    <ul className="space-y-2 text-xs text-slate-300 pt-2">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleOpenCheckout(plan)}
                    className={`mt-6 w-full py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
                      plan.popular
                        ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    <span>Contratar {plan.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto space-y-4 pt-8">
            <h3 className="text-lg font-bold text-white text-center flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-cyan-400" />
              <span>Perguntas Frequentes sobre a VPS Cloud AXION</span>
            </h3>

            <div className="space-y-3 font-sans text-xs">
              {[
                { q: 'Quanto tempo leva para a VPS ser ativada após o pagamento?', a: 'A ativação é 100% autônoma! Após a confirmação do PIX ou Cartão no AXION Pay, a VPS é provisionada em menos de 60 segundos com IP dedicado e chave SSH de acesso root.' },
                { q: 'Posso alterar os recursos de vCPU e Memória RAM depois?', a: 'Sim! Você pode realizar upgrades instantâneos (Hot-plugging RAM e vCPU) no painel de controle sem perda de dados.' },
                { q: 'Qual a diferença entre a infraestrutura Hostinger e ServerSpace?', a: 'A infraestrutura Hostinger Cloud possui excelente custo-benefício e rotas globais. A infraestrutura ServerSpace Enterprise utiliza volumes NVMe dedicados ideais para bancos de dados de altíssimo tráfego.' }
              ].map((faq, i) => (
                <div key={i} className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <p className="font-bold text-white text-sm">{faq.q}</p>
                  <p className="text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* VIEW MODE 2: MY SERVERS (CLIENT PORTAL) */}
      {viewMode === 'my-servers' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Meus Servidores Cloud ({myServers.length})</h2>
              <p className="text-xs text-slate-400">Gerencie suas instâncias contratadas, reinicie serviços e visualize credenciais de root.</p>
            </div>
            <button
              onClick={() => setViewMode('store')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 text-xs font-semibold transition"
            >
              <Plus className="w-4 h-4" />
              <span>Contratar Nova VPS</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {myServers.map((server) => (
              <div key={server.id} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-white">{server.name}</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold">
                        {server.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-2 font-mono">
                      <span>IP: <strong className="text-cyan-400">{server.ip}</strong></span>
                      <span>•</span>
                      <span>Engine: {server.engine}</span>
                      <span>•</span>
                      <span>Região: {server.region}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(`ssh root@${server.ip}`, 'Comando SSH')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F172A] border border-slate-800 text-slate-300 hover:text-cyan-400 text-xs font-mono transition"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>ssh root@{server.ip}</span>
                    </button>
                    <button
                      onClick={() => showToast(`Reiniciando VPS ${server.name}...`)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
                    >
                      Reboot
                    </button>
                    <button
                      onClick={() => setViewMode('monitor')}
                      className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition shadow"
                    >
                      Painel Monitor
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                  <div className="p-3 bg-[#0A0F1D] rounded-xl border border-slate-800/80">
                    <span className="text-slate-500 block text-[10px] uppercase">Plano Contratado</span>
                    <span className="text-white font-bold">{server.plan}</span>
                  </div>
                  <div className="p-3 bg-[#0A0F1D] rounded-xl border border-slate-800/80">
                    <span className="text-slate-500 block text-[10px] uppercase">Sistema Operacional</span>
                    <span className="text-cyan-400 font-bold">{server.os}</span>
                  </div>
                  <div className="p-3 bg-[#0A0F1D] rounded-xl border border-slate-800/80">
                    <span className="text-slate-500 block text-[10px] uppercase">Senha Root Temporária</span>
                    <span className="text-slate-300 font-bold">{server.rootPass}</span>
                  </div>
                  <div className="p-3 bg-[#0A0F1D] rounded-xl border border-slate-800/80">
                    <span className="text-slate-500 block text-[10px] uppercase">Uptime Registrado</span>
                    <span className="text-emerald-400 font-bold">{server.uptime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* VIEW MODE 3: ADMIN NODE MONITOR (`vps1.axionenterprise.cloud`) */}
      {viewMode === 'monitor' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fadeIn">
          {/* Header Banner for Monitor Mode */}
          <div className="glass-panel p-4 rounded-xl border border-indigo-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-indigo-400" />
              <div>
                <span className="text-sm font-bold text-white">Monitor de Nós & Infraestrutura (`vps1.axionenterprise.cloud`)</span>
                <p className="text-xs text-slate-400">Telemetria de kernel, terminal SSH e serviços ativos do nó Debian Primary.</p>
              </div>
            </div>
            <button
              onClick={() => setViewMode('store')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
            >
              <span>Voltar para Loja VPS</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Metric Cards Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Processador vCPU</p>
                <p className="text-xl font-mono font-bold text-white mt-1">1 Core <span className="text-xs font-normal text-slate-400">(AMD EPYC)</span></p>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-cyan-500 h-full w-[28%]" />
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Cpu className="w-6 h-6" />
              </div>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Memória RAM</p>
                <p className="text-xl font-mono font-bold text-white mt-1">819 MB / <span className="text-sm font-normal text-slate-400">2.0 GB</span></p>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[41%]" />
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Radio className="w-6 h-6" />
              </div>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Disco NVMe SSD</p>
                <p className="text-xl font-mono font-bold text-white mt-1">6.8 GB / <span className="text-sm font-normal text-slate-400">25 GB</span></p>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[29%]" />
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                <HardDrive className="w-6 h-6" />
              </div>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Tráfego de Rede</p>
                <p className="text-xl font-mono font-bold text-white mt-1">142.5 GB / <span className="text-sm font-normal text-slate-400">2.0 TB</span></p>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-violet-500 h-full w-[7%]" />
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-violet-500/10 text-violet-400">
                <Wifi className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Terminal Window Box */}
          <div className="bg-[#04070D] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-[#0D1424] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-xs text-slate-400">root@axion-vps:~# ssh 104.207.81.41</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">
                AES-256 SSH CONNECTED
              </span>
            </div>

            <div className="p-4 font-mono text-xs h-80 overflow-y-auto space-y-2 terminal-scanline">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className={
                  item.type === 'system' ? 'text-slate-500' :
                  item.type === 'info' ? 'text-cyan-400 font-semibold' :
                  item.type === 'input' ? 'text-emerald-400 font-bold' :
                  item.type === 'error' ? 'text-rose-400' : 'text-slate-300'
                }>
                  {item.text}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            <form onSubmit={(e) => { e.preventDefault(); if (terminalInput.trim()) { executeCommand(terminalInput.trim()); setTerminalInput(''); } }} className="p-2 bg-[#080C14] border-t border-slate-800 flex items-center gap-2">
              <span className="font-mono text-xs text-emerald-400 pl-2">root@axion-vps:~#</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Digite um comando bash..."
                className="flex-1 bg-transparent text-xs font-mono text-white focus:outline-none placeholder-slate-600"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded transition"
              >
                Enviar
              </button>
            </form>
          </div>
        </main>
      )}

      {/* CHECKOUT MODAL (AXION PAY INTEGRATION) */}
      {isCheckoutOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700 max-w-lg w-full space-y-6 shadow-2xl relative">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/50"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold">
                AXION PAY CHECKOUT
              </span>
              <h3 className="text-xl font-bold text-white">Contratar {selectedPlan.name}</h3>
              <p className="text-xs text-slate-400 font-mono">
                {selectedEngine === 'hostinger' ? 'Hostinger Cloud Infra' : 'ServerSpace NVMe'} • {selectedOS.toUpperCase()} • {selectedRegion.toUpperCase()}
              </p>
            </div>

            <div className="p-4 bg-[#04070D] rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Plano Escolhido:</span>
                <span className="font-bold text-white">{selectedPlan.name}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Ciclo de Cobrança:</span>
                <span className="text-cyan-400">{billingCycle === 'annual' ? 'Anual (20% OFF)' : 'Mensal'}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300 border-t border-slate-900 pt-2 text-sm font-bold">
                <span>Total a pagar:</span>
                <span className="text-emerald-400">R$ {billingCycle === 'annual' ? selectedPlan.annualPrice : selectedPlan.monthlyPrice}/mês</span>
              </div>
            </div>

            {/* Simulated PIX QR Code */}
            <div className="p-4 bg-white rounded-2xl flex flex-col items-center justify-center space-y-2 text-slate-950">
              <QrCode className="w-32 h-32" />
              <span className="font-mono text-[10px] font-bold tracking-wider">PIX INSTANTÂNEO AXION PAY</span>
            </div>

            <button
              onClick={handleConfirmPayment}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm hover:from-emerald-400 hover:to-cyan-400 transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Simular Pagamento & Iniciar Provisionamento</span>
            </button>
          </div>
        </div>
      )}

      {/* AUTO-PROVISIONING MODAL */}
      {isProvisioning && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-lg flex items-center justify-center p-4 animate-fadeIn">
          <div className="glass-panel p-8 rounded-3xl border border-cyan-500/40 max-w-xl w-full space-y-6 text-center shadow-2xl">
            
            {provisionStep < 4 ? (
              <div className="space-y-6 py-4">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto animate-spin">
                  <RotateCw className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Provisionando sua VPS Cloud...</h3>
                  <p className="text-xs font-mono text-cyan-300">Etapa {provisionStep} de 3 — Por favor aguarde alguns segundos.</p>
                </div>

                {/* Progress Steps */}
                <div className="space-y-2 text-xs font-mono text-left bg-[#04070D] p-4 rounded-2xl border border-slate-900">
                  <div className={`flex items-center gap-2 ${provisionStep >= 1 ? 'text-emerald-400' : 'text-slate-600'}`}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>[1/3] Pagamento confirmado & Autenticando na API Hostinger/ServerSpace</span>
                  </div>
                  <div className={`flex items-center gap-2 ${provisionStep >= 2 ? 'text-emerald-400' : 'text-slate-600'}`}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>[2/3] Alocando sub-rede IPv4 dedicada e rotas BGP</span>
                  </div>
                  <div className={`flex items-center gap-2 ${provisionStep >= 3 ? 'text-emerald-400' : 'text-slate-600'}`}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>[3/3] Instalando imagem do SO e injetando chaves SSH `root`</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Step 4: SUCCESS */
              <div className="space-y-6 py-2 animate-fadeIn">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-extrabold text-white">VPS Provisionada com Sucesso! 🎉</h3>
                  <p className="text-xs text-slate-400">Sua instância está online e pronta para receber tráfego.</p>
                </div>

                {provisionedCredentials && (
                  <div className="p-4 bg-[#04070D] rounded-2xl border border-slate-800 text-left font-mono text-xs space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                      <span className="text-slate-500">Endereço IP:</span>
                      <span className="text-cyan-400 font-bold">{provisionedCredentials.ip}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                      <span className="text-slate-500">Usuário SSH:</span>
                      <span className="text-white font-bold">root</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                      <span className="text-slate-500">Senha Root:</span>
                      <span className="text-emerald-400 font-bold">{provisionedCredentials.rootPass}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-slate-500">Comando de Acesso:</span>
                      <button
                        onClick={() => handleCopy(`ssh root@${provisionedCredentials.ip}`, 'Comando SSH')}
                        className="text-cyan-300 font-bold hover:underline flex items-center gap-1"
                      >
                        <span>ssh root@{provisionedCredentials.ip}</span>
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => { setIsProvisioning(false); setViewMode('my-servers'); }}
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
                >
                  Ir para Meus Servidores
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#151D2A] bg-[#050811] py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p className="text-xs text-slate-400 font-mono">
            AXION VPS Cloud Platform v2.0 • Powered by Hostinger & ServerSpace Infrastructure
          </p>
          <p className="text-[11px] text-slate-600 font-sans">
            © 2026 AXION Enterprise. Todos os direitos reservados.
          </p>
        </div>
      </footer>

    </div>
  );
}
