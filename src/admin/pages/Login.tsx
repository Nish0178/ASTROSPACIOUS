import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { authApi } from '../auth/authApi';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setError(null);

    // Basic frontend validation
    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const response = await authApi.login(email, password);
      
      if (response.success && response.data) {
        login(response.data.token, response.data.admin);
        navigate('/admin/dashboard', { replace: true });
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', padding: '20px' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 8px 0', letterSpacing: '1px' }}>ASTROSPACIOUS</h1>
          <p style={{ color: '#64748b', margin: 0, fontSize: '14px' }}>Admin Portal Login</p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#ef4444', padding: '12px', borderRadius: '6px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} noValidate>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '8px' }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
              placeholder="admin@astrospacious.com"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '8px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                style={{ width: '100%', padding: '10px 40px 10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0, display: 'flex' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '12px', 
              backgroundColor: loading ? '#94a3b8' : '#0f172a', 
              color: '#ffffff', 
              border: 'none', 
              borderRadius: '6px', 
              fontWeight: '600', 
              cursor: loading ? 'not-allowed' : 'pointer', 
              marginTop: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background-color 0.2s'
            }}
          >
            {loading ? <Loader2 size={18} className="lucide-spin" /> : null}
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
      
      {/* Global style for spinning icon */}
      <style>{`
        .lucide-spin {
          animation: lucide-spin 2s linear infinite;
        }
        @keyframes lucide-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
