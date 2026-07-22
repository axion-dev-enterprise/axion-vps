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
  Search
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);
  const [vpsStatus, setVpsStatus] = useState('ONLINE');
  const [isRebooting, setIsRebooting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState([
    { text: 'AXION VPS Cloud OS v4.19.2 (Debian GNU/Linux 12 bookworm x86_64)', type: 'system' },
    { text: 'Conectado em root@104.207.81.41 via SSH seguro (Porta 22)', type: 'system' },
    { text: 'Digite "help" ou selecione um comando rápido abaixo.', type: 'info' }
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalEndRef = useRef(null);

  // Auto scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('IP copiado para a área de transferência!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReboot = () => {
    setIsRebooting(true);
    setVpsStatus('REBOOTING');
    showToast('Iniciando reinicialização da VPS Debian Primary...');
    
    setTimeout(() => {
      setIsRebooting(false);
      setVpsStatus('ONLINE');
      showToast('VPS reinicializada com sucesso! Todos os serviços estão UP.');
    }, 4000);
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    executeCommand(terminalInput.trim());
    setTerminalInput('');
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
        { text: 'c102a99182bb   wireguard:latest      Up 14 days     0.0.0.0:51820->51820/udp', type: 'output' },
        { text: '992a01f92e10   axion-core-api:1.4    Up 3 days      0.0.0.0:3000->3000/tcp', type: 'output' }
      ];
    } else if (cleanCmd === 'htop') {
      responseLines = [
        { text: '  CPU[||||||||||||.............. 28.4%]    Tasks: 42 total, 1 running', type: 'output' },
        { text: '  Mem[||||||||||||||||.......... 819M/2.00G] Swp[0K/0K]', type: 'output' },
        { text: '  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND', type: 'output' },
        { text: ' 1042 root      20   0  712400  18200  12400 S   4.2   0.9  18:42.10 traefik', type: 'output' },
        { text: ' 2109 root      20   0  982100  34200  21000 S   2.1   1.7  09:12.44 uptime-kuma', type: 'output' },
        { text: ' 3180 axion     20   0  412000  51200  28100 S   1.8   2.5  44:01.12 node server.js', type: 'output' }
      ];
    } else if (cleanCmd === 'netstat' || cleanCmd === 'netstat -tulpn') {
      responseLines = [
        { text: 'Active Internet connections (only servers)', type: 'output' },
        { text: 'Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name', type: 'output' },
        { text: 'tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      1042/traefik', type: 'output' },
        { text: 'tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN      1042/traefik', type: 'output' },
        { text: 'tcp        0      0 0.0.0.0:3000            0.0.0.0:*               LISTEN      3180/node', type: 'output' },
        { text: 'tcp        0      0 0.0.0.0:3002            0.0.0.0:*               LISTEN      2109/node', type: 'output' },
        { text: 'udp        0      0 0.0.0.0:51820           0.0.0.0:*                           1102/wireguard', type: 'output' }
      ];
    } else if (cleanCmd === 'df -h') {
      responseLines = [
        { text: 'Filesystem      Size  Used Avail Use% Mounted on', type: 'output' },
        { text: '/dev/nvme0n1p1   25G  6.8G   17G  29% /', type: 'output' },
        { text: 'tmpfs           990M     0  990M   0% /dev/shm', type: 'output' },
        { text: '/dev/nvme0n1p15 105M  6.1M   99M   6% /boot/efi', type: 'output' }
      ];
    } else if (cleanCmd === 'ufw status') {
      responseLines = [
        { text: 'Status: active', type: 'output' },
        { text: 'To                         Action      From', type: 'output' },
        { text: '--                         ------      ----', type: 'output' },
        { text: '22/tcp (SSH)               ALLOW       Anywhere', type: 'output' },
        { text: '80/tcp (HTTP)              ALLOW       Anywhere', type: 'output' },
        { text: '443/tcp (HTTPS)            ALLOW       Anywhere', type: 'output' },
        { text: '51820/udp (WireGuard)      ALLOW       Anywhere', type: 'output' }
      ];
    } else if (cleanCmd === 'uptime') {
      responseLines = [
        { text: ' 05:47:32 up 42 days, 18:14,  1 user,  load average: 0.03, 0.03, 0.06', type: 'output' }
      ];
    } else {
      responseLines = [
        { text: `bash: ${cmd}: command not found. Digite "help" para ver os comandos.`, type: 'error' }
      ];
    }

    setTimeout(() => {
      setTerminalHistory(prev => [...prev, ...responseLines]);
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#030508] text-[#F1F5F9] font-sans flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] border border-cyan-500/40 text-cyan-200 px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-bounce">
          <Zap className="w-5 h-5 text-cyan-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="border-b border-[#151D2A] bg-[#080C14]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Server className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                  AXION VPS
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold">
                  Enterprise Cloud
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <span>us-east-1 (N. Virginia)</span>
                <span>•</span>
                <span className="font-mono text-slate-300">104.207.81.41</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Server Status Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D1525] border border-[#1E293B]">
              <span className={`w-2.5 h-2.5 rounded-full ${
                vpsStatus === 'ONLINE' ? 'bg-emerald-500 animate-pulse' :
                vpsStatus === 'REBOOTING' ? 'bg-amber-500 animate-ping' : 'bg-rose-500'
              }`} />
              <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                {vpsStatus}
              </span>
            </div>

            {/* IP Quick Copy Button */}
            <button
              onClick={() => copyToClipboard('104.207.81.41')}
              className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-[#0F172A] border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 transition"
              title="Copiar IP da VPS"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>104.207.81.41</span>
            </button>

            {/* Reboot Action */}
            <button
              onClick={handleReboot}
              disabled={isRebooting}
              className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 transition disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRebooting ? 'animate-spin' : ''}`} />
              <span>{isRebooting ? 'Reiniciando...' : 'Reboot VPS'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-4 rounded-xl border border-slate-800/80 flex items-center justify-between">
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

          <div className="glass-panel p-4 rounded-xl border border-slate-800/80 flex items-center justify-between">
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

          <div className="glass-panel p-4 rounded-xl border border-slate-800/80 flex items-center justify-between">
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

          <div className="glass-panel p-4 rounded-xl border border-slate-800/80 flex items-center justify-between">
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

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#151D2A] pb-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Visão Geral & Serviços', icon: Server },
            { id: 'instances', label: 'Instâncias & Hardware', icon: Cpu },
            { id: 'terminal', label: 'Terminal SSH Web', icon: Terminal },
            { id: 'security', label: 'Segurança & WireGuard', icon: Shield },
            { id: 'backups', label: 'Backups & Snapshots', icon: HardDrive },
            { id: 'apikeys', label: 'Chaves SSH & API', icon: Key },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#0F172A]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Primary Instance Highlight Card */}
            <div className="glass-panel-glow p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Server className="w-64 h-64 text-cyan-400" />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
                      DEBIAN 12 BOOKWORM
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Uptime: 42d 18h 14m</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Debian Primary VPS Node</h2>
                  <p className="text-sm text-slate-400 max-w-xl">
                    Servidor mestre de infraestrutura cloud executando Traefik, monitores de alta disponibilidade, túnel seguro WireGuard e microsserviços AXION.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab('terminal')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-semibold text-sm hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/25"
                  >
                    <Terminal className="w-4 h-4" />
                    <span>Abrir Web Console</span>
                  </button>
                  <button
                    onClick={() => showToast('Atualizando métricas de telemetria...')}
                    className="p-2.5 rounded-lg bg-[#0F172A] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Microservices Matrix */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan-400" />
                  <span>Matriz de Serviços & Ingress Proxy</span>
                </h3>
                <span className="text-xs font-mono text-slate-400">4 de 4 serviços rodando normalmente</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Traefik Proxy', port: '443 / 80', status: 'RUNNING', desc: 'Ingress & SSL Auto Certs', color: 'cyan' },
                  { name: 'Uptime Kuma', port: '3002', status: 'RUNNING', desc: 'Monitoramento de SLA', color: 'emerald' },
                  { name: 'Wireguard VPN', port: '51820', status: 'RUNNING', desc: 'Túnel UDP Encriptado', color: 'violet' },
                  { name: 'AXION Core Services', port: '3000', status: 'RUNNING', desc: 'API Gateway & Backends', color: 'indigo' },
                ].map((svc, i) => (
                  <div key={i} className="glass-panel p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-white text-sm">{svc.name}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{svc.desc}</p>
                      </div>
                      <span className="flex h-2.5 w-2.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80 font-mono">
                      <span className="text-slate-400">Porta: {svc.port}</span>
                      <span className="text-emerald-400 font-bold">{svc.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit & System Telemetry Log Stream */}
            <div className="glass-panel p-5 rounded-xl border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Log de Eventos do Kernel & Sistema Autônomo</span>
              </h3>
              <div className="font-mono text-xs space-y-1.5 text-slate-300 bg-[#04070D] p-3.5 rounded-lg border border-slate-900 overflow-x-auto">
                <p className="text-emerald-400">[2026-07-22 05:47:30] [SYSTEM] Backup automático de dados executado com sucesso (SHA256: 8f92a10c...)</p>
                <p className="text-cyan-400">[2026-07-22 05:30:12] [TRAEFIK] Renovação de certificado Let's Encrypt para *.axionenterprise.cloud completa.</p>
                <p className="text-slate-400">[2026-07-22 05:15:00] [FIREWALL] Bloqueadas 14 tentativas desautorizadas de scan de porta na porta 22 (SSH).</p>
                <p className="text-slate-400">[2026-07-22 04:00:05] [HEARTBEAT] Healthcheck respondido com 200 OK (0.002s response time).</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INSTANCES */}
        {activeTab === 'instances' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Instâncias VPS Cloud</h3>
                <p className="text-xs text-slate-400">Gerencie a capacidade computacional, sistemas operacionais e escala de hardware.</p>
              </div>
              <button
                onClick={() => showToast('Abertura de provisionamento instantâneo de novas instâncias...')}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 text-xs font-semibold transition"
              >
                <Plus className="w-4 h-4" />
                <span>Provisionar Nova VPS</span>
              </button>
            </div>

            <div className="glass-panel rounded-xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0D1525] text-slate-400 uppercase font-mono border-b border-slate-800">
                  <tr>
                    <th className="p-4">Instância</th>
                    <th className="p-4">IP Público</th>
                    <th className="p-4">vCPU / RAM</th>
                    <th className="p-4">Armazenamento</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                  <tr className="hover:bg-slate-900/50 transition">
                    <td className="p-4 font-sans font-semibold text-white">
                      <div>Debian Primary VPS</div>
                      <span className="text-[10px] text-slate-500 font-mono">ID: vps-us-east-1</span>
                    </td>
                    <td className="p-4 text-cyan-400">104.207.81.41</td>
                    <td className="p-4">1 vCPU AMD / 2 GB</td>
                    <td className="p-4">25 GB NVMe SSD</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                        ONLINE
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={handleReboot}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-sans text-xs"
                      >
                        Reboot
                      </button>
                      <button
                        onClick={() => setActiveTab('terminal')}
                        className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition font-sans text-xs"
                      >
                        Console
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Scale Hardware Simulator Card */}
            <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Simulador de Upgrade de Recursos em Tempo Real</span>
              </h4>
              <p className="text-xs text-slate-400">Dimensione vCPUs e Memória RAM sem interrupção de serviço (Hot-plugging RAM & vCPU).</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-[#0A0F1D] rounded-lg border border-slate-800 text-center space-y-2">
                  <p className="text-xs text-slate-400 uppercase font-mono">Configuração Atual</p>
                  <p className="text-lg font-bold text-white">1 vCPU / 2 GB RAM</p>
                  <p className="text-xs text-cyan-400 font-mono">Incluso na assinatura</p>
                </div>
                <div className="p-4 bg-[#0A0F1D] rounded-lg border border-slate-800 text-center space-y-2">
                  <p className="text-xs text-slate-400 uppercase font-mono">Pro Node (Recomendado)</p>
                  <p className="text-lg font-bold text-white">2 vCPU / 4 GB RAM</p>
                  <button
                    onClick={() => showToast('Solicitação de upgrade para Pro Node enviada!')}
                    className="w-full py-1.5 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
                  >
                    Upgrade Instantâneo
                  </button>
                </div>
                <div className="p-4 bg-[#0A0F1D] rounded-lg border border-slate-800 text-center space-y-2">
                  <p className="text-xs text-slate-400 uppercase font-mono">Enterprise Node</p>
                  <p className="text-lg font-bold text-white">4 vCPU / 8 GB RAM</p>
                  <button
                    onClick={() => showToast('Solicitação de upgrade para Enterprise Node enviada!')}
                    className="w-full py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
                  >
                    Solicitar Upgrade
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TERMINAL */}
        {activeTab === 'terminal' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-cyan-400" />
                  <span>Terminal Web SSH Interativo</span>
                </h3>
                <p className="text-xs text-slate-400">Sessão SSH criptografada diretamente na VPS via WebSocket seguro.</p>
              </div>

              {/* Quick Macro Buttons */}
              <div className="flex items-center gap-2 overflow-x-auto">
                {['htop', 'docker ps', 'netstat', 'df -h', 'ufw status', 'uptime'].map(cmd => (
                  <button
                    key={cmd}
                    onClick={() => executeCommand(cmd)}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-[#0D1525] border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition text-slate-300"
                  >
                    {cmd}
                  </button>
                ))}
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

              <div className="p-4 font-mono text-xs h-96 overflow-y-auto space-y-2 terminal-scanline">
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

              <form onSubmit={handleTerminalSubmit} className="p-2 bg-[#080C14] border-t border-slate-800 flex items-center gap-2">
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
          </div>
        )}

        {/* TAB 4: SECURITY */}
        {activeTab === 'security' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Firewall Rules Card */}
              <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>Firewall UFW (Regras de Entrada)</span>
                  </h3>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">ATIVO</span>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  {[
                    { port: '22 / TCP', service: 'SSH Management', action: 'ALLOW' },
                    { port: '80 / TCP', service: 'HTTP Web Traffic', action: 'ALLOW' },
                    { port: '443 / TCP', service: 'HTTPS Traefik SSL', action: 'ALLOW' },
                    { port: '51820 / UDP', service: 'WireGuard VPN Tunnel', action: 'ALLOW' },
                  ].map((rule, idx) => (
                    <div key={idx} className="p-3 bg-[#0A0F1D] rounded border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-white font-bold">{rule.port}</span>
                        <p className="text-[11px] text-slate-400 font-sans">{rule.service}</p>
                      </div>
                      <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">{rule.action}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => showToast('Formulário de criação de regras UFW simulado.')}
                  className="w-full py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                >
                  + Adicionar Regra de Porta
                </button>
              </div>

              {/* WireGuard VPN Configuration Generator */}
              <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-violet-400" />
                    <span>WireGuard VPN Tunnel</span>
                  </h3>
                  <span className="text-xs font-mono text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">READY</span>
                </div>

                <p className="text-xs text-slate-400">
                  Conecte-se com segurança à rede privada da VPS sem expor portas administrativas na internet pública.
                </p>

                <div className="p-4 bg-[#0A0F1D] rounded border border-slate-800 flex items-center gap-4">
                  <div className="p-3 bg-white rounded-lg flex items-center justify-center">
                    <QrCode className="w-14 h-14 text-slate-950" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-white">Client Config (axion-vps-vpn.conf)</p>
                    <p className="text-[11px] font-mono text-slate-400">IP Interno: 10.8.0.2/32</p>
                    <button
                      onClick={() => showToast('Download do arquivo de configuração .conf iniciado!')}
                      className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 pt-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Baixar arquivo .conf</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: BACKUPS */}
        {activeTab === 'backups' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Backups & Snapshots de Disco</h3>
                <p className="text-xs text-slate-400">Snapshots incrementais do volume NVMe de 25 GB para restauração imediata em caso de emergência.</p>
              </div>

              <button
                onClick={() => showToast('Criando novo Snapshot instantâneo do sistema...')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition shadow-lg shadow-cyan-500/20"
              >
                <HardDrive className="w-4 h-4" />
                <span>Criar Snapshot Agora</span>
              </button>
            </div>

            <div className="glass-panel rounded-xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0D1525] text-slate-400 uppercase font-mono border-b border-slate-800">
                  <tr>
                    <th className="p-4">Identificador</th>
                    <th className="p-4">Tipo</th>
                    <th className="p-4">Tamanho</th>
                    <th className="p-4">Data de Criação</th>
                    <th className="p-4 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                  <tr className="hover:bg-slate-900/50 transition">
                    <td className="p-4 font-sans font-bold text-white">snap-2026-07-22-auto</td>
                    <td className="p-4 text-cyan-400">Automático (Diário)</td>
                    <td className="p-4">6.8 GB</td>
                    <td className="p-4">Hoje às 05:00:00</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => showToast('Iniciando restauração do snapshot snap-2026-07-22-auto...')}
                        className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-sans text-xs transition"
                      >
                        Restaurar
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-900/50 transition">
                    <td className="p-4 font-sans font-bold text-white">snap-2026-07-15-pre-deploy</td>
                    <td className="p-4 text-amber-400">Manual</td>
                    <td className="p-4">6.5 GB</td>
                    <td className="p-4">15 de Julho, 2026</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => showToast('Iniciando restauração do snapshot snap-2026-07-15-pre-deploy...')}
                        className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-sans text-xs transition"
                      >
                        Restaurar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: API KEYS */}
        {activeTab === 'apikeys' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Key className="w-5 h-5 text-cyan-400" />
                    <span>Chaves SSH Registradas (`authorized_keys`)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Chaves públicas autorizadas a acessar o usuário `root` via SSH.</p>
                </div>

                <button
                  onClick={() => showToast('Adição de nova chave SSH simulada.')}
                  className="px-3 py-1.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 text-xs font-semibold transition"
                >
                  + Adicionar Chave SSH
                </button>
              </div>

              <div className="p-4 bg-[#0A0F1D] rounded-lg border border-slate-800 font-mono text-xs flex items-center justify-between">
                <div>
                  <p className="text-white font-bold">axion-dev-ed25519-master</p>
                  <p className="text-slate-400 text-[11px] truncate max-w-lg mt-0.5">ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIG... axion-enterprise-dev</p>
                </div>
                <span className="text-emerald-400 text-xs font-bold">ACTIVE</span>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                <span>Tokens da API REST AXION VPS</span>
              </h3>
              <p className="text-xs text-slate-400">Tokens Bearer para automação CI/CD do GitHub Actions e scripts externos de provisionamento.</p>

              <div className="p-4 bg-[#0A0F1D] rounded-lg border border-slate-800 font-mono text-xs flex items-center justify-between">
                <div>
                  <p className="text-white font-bold">Vercel & GitHub Actions Deploy Token</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">axion_vps_tok_8f91a...991</p>
                </div>
                <button
                  onClick={() => showToast('Token copiado com sucesso!')}
                  className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-sans text-xs transition"
                >
                  Copiar Token
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-[#151D2A] bg-[#050811] py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 font-mono">
          AXION VPS Cloud Management Platform v1.0 • SLA Guaranteed 99.98% • Powered by AXION Enterprise Architecture
        </div>
      </footer>
    </div>
  );
}
