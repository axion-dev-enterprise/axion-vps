import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { initMetaPixel } from './lib/metaPixel';

try {
  initMetaPixel();
} catch (e) {
  console.warn('Meta pixel init notice:', e);
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('AXION VPS React ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', color: '#F1F5F9', backgroundColor: '#030508', fontFamily: 'sans-serif', textAlign: 'center' }}>
          <div style={{ maxWidth: '500px', padding: '32px', border: '1px solid #ef4444', borderRadius: '16px', backgroundColor: '#0F172A' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>Recuperação de Erro — AXION VPS</h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '16px' }}>Ocorreu uma exceção não tratada ao renderizar a interface.</p>
            <pre style={{ fontSize: '12px', color: '#f87171', background: '#04070D', padding: '12px', borderRadius: '8px', overflowX: 'auto', textAlign: 'left' }}>
              {this.state.error?.toString()}
            </pre>
            <button onClick={() => window.location.reload()} style={{ marginTop: '20px', padding: '12px 24px', background: '#06b6d4', color: '#030508', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              Recarregar Aplicação
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
