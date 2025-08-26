import React, { useEffect } from 'react';

export default function SplashScreen({ onContinue }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onContinue) onContinue();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onContinue]);
  return (
    <div className="splash-bg">
      <div className="splash-content">
        <img src="/hf-mini.png" alt="Logo" className="splash-logo fade-logo" />
      </div>
      <style>{`
        .splash-bg {
          background: #fff;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .splash-content {
          text-align: center;
        }
        .splash-logo {
          width: 72px;
          height: 72px;
          object-fit: contain;
          margin-bottom: 1.2rem;
        }
        .fade-logo {
          animation: fadeinout 2.5s ease-in-out infinite alternate;
        }
        @keyframes fadeinout {
          0% { opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
