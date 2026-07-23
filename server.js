import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3080;

app.use(cors({ origin: '*' }));
app.use(express.json());

const VPS_PLANS = [
  { id: 'starter', name: 'VPS Starter', cpu: '1 vCPU AMD', ram: '2 GB RAM', disk: '50 GB SSD', price: 39 },
  { id: 'performance', name: 'VPS Performance', cpu: '2 vCPU AMD EPYC', ram: '4 GB RAM', disk: '80 GB SSD', price: 79 },
  { id: 'enterprise', name: 'VPS Enterprise Pro', cpu: '4 vCPU AMD EPYC', ram: '8 GB RAM', disk: '160 GB SSD', price: 159 },
  { id: 'dedicated', name: 'VPS Dedicated Max', cpu: '8 vCPU AMD EPYC', ram: '16 GB RAM', disk: '320 GB SSD', price: 299 }
];

const MY_SERVERS = [
  {
    id: 'vps-us-east-1',
    name: 'Debian Primary Node (Produção)',
    ip: '104.207.81.41',
    plan: 'VPS Performance (2 vCPU / 4 GB)',
    os: 'Debian 12 Bookworm',
    engine: 'AXION NVMe Cloud',
    region: 'EUA (US-East)',
    status: 'ONLINE',
    uptime: '99.98%'
  }
];

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'axion-vps', timestamp: new Date().toISOString() });
});

// Plans List API
app.get('/api/vps/plans', (req, res) => {
  res.json({ success: true, plans: VPS_PLANS });
});

// My Servers List API
app.get('/api/vps/my-servers', (req, res) => {
  res.json({ success: true, servers: MY_SERVERS });
});

// Order & Auto-Provisioning API Simulation (AXION Cloud Engine)
app.post('/api/vps/order', (req, res) => {
  const { planId, engine, os, region, cycle } = req.body;
  const newIp = `151.244.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 250)}`;
  const newServer = {
    id: `vps-auto-${Date.now().toString().slice(-4)}`,
    name: `AXION VPS ${planId}`,
    ip: newIp,
    plan: planId,
    os: os || 'Debian 12',
    engine: engine || 'AXION NVMe Cloud',
    region: region || 'Brasil',
    status: 'ONLINE',
    uptime: '100%',
    rootPass: `AxionCloud#${Math.random().toString(36).slice(-6)}`
  };
  MY_SERVERS.unshift(newServer);

  res.json({
    success: true,
    message: 'VPS provisionada com sucesso.',
    server: newServer
  });
});

// Serve static frontend assets from dist in production
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 AXION VPS Platform & Auto-Provisioner running on http://localhost:${PORT}`);
  });
}

export default app;
