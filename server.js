const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3080;

app.use(cors({ origin: '*' }));
app.use(express.json());

const VPS_INSTANCES = [
  {
    id: 'vps-us-east-1',
    name: 'Debian Primary VPS',
    ip: '104.207.81.41',
    status: 'ONLINE',
    cpu: '1 vCPU AMD',
    ram: '2 GB',
    disk: '25 GB SSD (6.8 GB Usados)',
    uptime: '99.98%',
    services: [
      { name: 'Traefik Proxy', port: 443, status: 'RUNNING' },
      { name: 'Uptime Kuma', port: 3002, status: 'RUNNING' },
      { name: 'Wireguard VPN', port: 51820, status: 'RUNNING' },
      { name: 'AXION Microservices', port: 3000, status: 'RUNNING' }
    ]
  }
];

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'axion-vps', timestamp: new Date().toISOString() });
});

// List VPS Instances
app.get('/api/vps/instances', (req, res) => {
  res.json({ success: true, instances: VPS_INSTANCES });
});

// Get Metrics
app.get('/api/vps/metrics', (req, res) => {
  res.json({
    success: true,
    metrics: {
      loadAverage: [0.03, 0.03, 0.06],
      diskUsagePercent: 29,
      activeConnections: 14,
      totalBandwidthGb: 142.5
    }
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 AXION VPS Provisioner & API rodando em http://localhost:${PORT}`);
  });
}

module.exports = app;
