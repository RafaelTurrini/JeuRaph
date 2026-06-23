import React, { useState, useEffect } from 'react';

export default function BoiteAuxLettres() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [loginTime, setLoginTime] = useState(null);

  // ===== A PERSONNALISER =====
  const CORRECT_USERNAME = 'rafaelle';
  const CORRECT_PASSWORD = 'citron';
  const PASSWORD_HINT = 'Mon fruit préféré que j\'aime te faire en tarte 🍋';
  // ===========================

  // Vérifier si déjà connectée au chargement
  useEffect(() => {
    const stored = localStorage.getItem('boiteAuxLettres_login');
    if (stored) {
      const loginData = JSON.parse(stored);
      const timeDiff = Date.now() - loginData.timestamp;
      const remaining = Math.max(0, 86400000 - timeDiff); // 86400000 = 24h en ms
      
      if (remaining > 0) {
        setIsAuthenticated(true);
        setLoginTime(remaining);
      } else {
        localStorage.removeItem('boiteAuxLettres_login');
      }
    }
  }, []);

  // Compter les 24h
  useEffect(() => {
    if (!isAuthenticated || !loginTime) return;

    setTimeLeft(loginTime);
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1000) {
          setIsAuthenticated(false);
          localStorage.removeItem('boiteAuxLettres_login');
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated, loginTime]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (username !== CORRECT_USERNAME) {
      setError('Identifiant incorrect');
      return;
    }

    if (password !== CORRECT_PASSWORD) {
      setError('Mot de passe incorrect');
      return;
    }

    // Sauvegarder dans localStorage
    const loginData = {
      timestamp: Date.now()
    };
    localStorage.setItem('boiteAuxLettres_login', JSON.stringify(loginData));
    setIsAuthenticated(true);
    setLoginTime(86400000);
    setUsername('');
    setPassword('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('boiteAuxLettres_login');
    setUsername('');
    setPassword('');
    setError('');
  };

  // Formater le temps (HH:MM:SS)
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
  };

  // PAGE CONNECTÉE (avec compteur)
  if (isAuthenticated) {
    return (
      <div style={{
        padding: '2rem 1.5rem',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fce7f3 0%, #fce4ec 50%, #f3e5f5 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          border: '2px solid #ec4899',
          padding: '2.5rem 2rem',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: '#ec4899',
            margin: '0 0 1.5rem 0'
          }}>
            ✨ Bienvenue
          </h1>

          <p style={{
            color: '#6b7280',
            fontSize: '16px',
            margin: '0 0 2rem 0',
            lineHeight: 1.6
          }}>
            Reviens demain pour débloquer le prochain mini-jeu !
          </p>

          <div style={{
            background: '#fce7f3',
            borderRadius: '8px',
            padding: '2rem',
            margin: '0 0 2rem 0',
            border: '2px dashed #ec4899'
          }}>
            <p style={{
              color: '#6b7280',
              fontSize: '14px',
              margin: '0 0 0.8rem 0'
            }}>
              Temps avant le prochain déverrouillage
            </p>
            <div style={{
              fontSize: '36px',
              fontWeight: 600,
              color: '#ec4899',
              fontFamily: 'monospace',
              margin: 0
            }}>
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* ICI : Ajouter les mini-jeux conditionnel par jour */}
          {/* À implémenter : Jour 1, Jour 2, etc. */}

          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'transparent',
              border: '2px solid #ec4899',
              borderRadius: '8px',
              color: '#ec4899',
              fontSize: '16px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#fce7f3';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
            }}
          >
            Se déconnecter
          </button>
        </div>
      </div>
    );
  }

  // PAGE LOGIN
  return (
    <div style={{
      padding: '2rem 1.5rem',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fce7f3 0%, #fce4ec 50%, #f3e5f5 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        border: '2px solid #ec4899',
        padding: '2.5rem 2rem',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 600,
          color: '#ec4899',
          margin: '0 0 0.5rem 0',
          textAlign: 'center'
        }}>
          💌 Boîte aux Lettres
        </h1>

        <p style={{
          color: '#6b7280',
          fontSize: '14px',
          margin: '0 0 2rem 0',
          textAlign: 'center'
        }}>
          Découvre les surprises qui t'attendent
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: '#111827',
              marginBottom: '8px'
            }}>
              Identifiant
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entre ton identifiant"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #ec4899',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box',
                background: '#fce7f3',
                color: '#111827'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: '#111827',
              marginBottom: '8px'
            }}>
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entre ton mot de passe"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #ec4899',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box',
                background: '#fce7f3',
                color: '#111827'
              }}
            />
            <p style={{
              fontSize: '13px',
              color: '#db2777',
              fontStyle: 'italic',
              margin: '8px 0 0 0'
            }}>
              💡 Indice : {PASSWORD_HINT}
            </p>
          </div>

          {error && (
            <div style={{
              background: '#fecaca',
              border: '2px solid #dc2626',
              borderRadius: '8px',
              padding: '12px 16px',
              color: '#991b1b',
              fontSize: '14px',
              fontWeight: 500
            }}>
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px 16px',
              background: '#ec4899',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              marginTop: '1rem'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#db2777';
              e.target.style.transform = 'scale(1.02)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#ec4899';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Accéder 🔓
          </button>
        </form>
      </div>
    </div>
  );
}
