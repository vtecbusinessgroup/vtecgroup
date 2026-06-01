'use client';

import { useEffect, useState } from 'react';

export const MadarakaDay = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Check if past midnight EAT (UTC+3)
    const now = new Date();
    const eatTime = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Nairobi' }));

    // Create midnight EAT timestamp for June 1, 2026
    const midnightEAT = new Date('2026-06-02T00:00:00+03:00');

    // If past midnight, don't show
    if (eatTime > midnightEAT) {
      setIsVisible(false);
      return;
    }

    // Check localStorage for dismissal
    const isDismissed = localStorage.getItem('vtec_madaraka_2026_dismissed');
    if (isDismissed) {
      setIsVisible(false);
      return;
    }

    // Show the overlay
    setIsVisible(true);

    // Calculate time until midnight and auto-disappear
    const timeUntilMidnight = midnightEAT.getTime() - eatTime.getTime();
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, timeUntilMidnight);

    return () => clearTimeout(timeout);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('vtec_madaraka_2026_dismissed', 'true');
    setIsVisible(false);
  };

  if (!isClient || !isVisible) return null;

  return (
    <>
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-10px) translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(var(--tx));
            opacity: 0;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(0, 102, 0, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(187, 0, 0, 0.8));
          }
        }

        @keyframes fade-in-slide-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-out {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .madaraka-overlay {
          position: fixed;
          inset: 0;
          background: linear-gradient(135deg, #0A1628 0%, #0F1F35 100%);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fade-in-slide-up 0.8s ease-out;
        }

        .madaraka-overlay.closing {
          animation: fade-out 0.6s ease-out forwards;
        }

        .confetti {
          position: fixed;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
        }

        .confetti-red {
          background: #BB0000;
          animation: confetti-fall linear forwards;
        }

        .confetti-green {
          background: #006600;
          animation: confetti-fall linear forwards;
        }

        .confetti-white {
          background: #FFFFFF;
          animation: confetti-fall linear forwards;
        }

        .madaraka-content {
          text-align: center;
          max-width: 600px;
          position: relative;
          z-index: 10000;
          animation: fade-in-slide-up 1s ease-out 0.2s backwards;
        }

        .madaraka-emoji {
          font-size: 80px;
          margin: 20px 0;
          animation: pulse-glow 2s ease-in-out infinite;
          display: inline-block;
        }

        .madaraka-headline {
          font-size: 48px;
          font-weight: 800;
          color: #FFFFFF;
          margin: 20px 0 10px;
          letter-spacing: -1px;
        }

        .madaraka-subheading {
          font-size: 20px;
          color: #BB0000;
          font-weight: 600;
          margin-bottom: 30px;
        }

        .madaraka-letter {
          background: rgba(255, 255, 255, 0.05);
          border-left: 4px solid #BB0000;
          padding: 24px;
          margin: 30px 0;
          border-radius: 4px;
          text-align: left;
          font-size: 16px;
          line-height: 1.8;
          color: #E0E0E0;
          font-weight: 300;
        }

        .madaraka-letter p {
          margin: 12px 0;
        }

        .madaraka-signature {
          font-weight: 600;
          color: #006600;
          margin-top: 16px;
        }

        .madaraka-button {
          background: linear-gradient(135deg, #BB0000 0%, #880000 100%);
          color: #FFFFFF;
          border: none;
          padding: 14px 32px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          margin-top: 20px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(187, 0, 0, 0.3);
        }

        .madaraka-button:hover {
          background: linear-gradient(135deg, #DD0000 0%, #BB0000 100%);
          box-shadow: 0 6px 24px rgba(187, 0, 0, 0.5);
          transform: translateY(-2px);
        }

        .madaraka-button:active {
          transform: translateY(0);
        }

        .madaraka-countdown {
          margin-top: 20px;
          font-size: 14px;
          color: #006600;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .madaraka-headline {
            font-size: 36px;
          }

          .madaraka-subheading {
            font-size: 16px;
          }

          .madaraka-emoji {
            font-size: 60px;
          }

          .madaraka-letter {
            font-size: 14px;
            padding: 16px;
          }

          .madaraka-button {
            padding: 12px 24px;
            font-size: 14px;
          }
        }
      `}</style>

      <div className="madaraka-overlay">
        {/* Confetti Generator */}
        {[...Array(50)].map((_, i) => {
          const colors = ['red', 'green', 'white'];
          const color = colors[Math.floor(Math.random() * colors.length)];
          const left = Math.random() * 100;
          const delay = Math.random() * 0.5;
          const duration = 3 + Math.random() * 2;
          const tx = (Math.random() - 0.5) * 100;

          return (
            <div
              key={i}
              className={`confetti confetti-${color}`}
              style={{
                left: `${left}%`,
                top: '-10px',
                animation: `confetti-fall ${duration}s linear ${delay}s infinite`,
                '--tx': `${tx}px`,
              } as React.CSSProperties}
            />
          );
        })}

        {/* Content */}
        <div className="madaraka-content">
          <div className="madaraka-emoji">🇰🇪</div>

          <h1 className="madaraka-headline">Happy Madaraka Day! 🎉</h1>

          <p className="madaraka-subheading">
            June 1st — Celebrating 62 Years of Self-Governance
          </p>

          <div className="madaraka-letter">
            <p>Dear Valued Client,</p>
            <p>
              On this Madaraka Day, we celebrate not just Kenya's freedom — but yours. The
              freedom to build, to grow, and to take control of your financial future. At VTEC
              Business Group, we are proud to walk this journey with you. Here's to building a
              wealthier, freer Kenya — one venture at a time.
            </p>
            <p>Happy Madaraka Day!</p>
            <p className="madaraka-signature">— The VTEC Team</p>
          </div>

          <button onClick={handleDismiss} className="madaraka-button">
            Celebrate with Us →
          </button>

          <div className="madaraka-countdown">⏰ This message disappears at midnight</div>
        </div>
      </div>
    </>
  );
};
