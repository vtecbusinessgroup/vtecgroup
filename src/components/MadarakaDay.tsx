import { useEffect, useState } from "react";

export function MadarakaDay() {
  const [isVisible, setIsVisible] = useState(false);
  const DISMISS_KEY = "vtec_madaraka_2026_dismissed";

  useEffect(() => {
    const isDismissed = localStorage.getItem(DISMISS_KEY) === "true";
    if (isDismissed) return;
    const now = new Date();
    const isJune1 = now.getMonth() === 5 && now.getDate() === 1 && now.getFullYear() === 2026;
    if (!isJune1) return;
    setIsVisible(true);
    // Auto-dismiss after 5 seconds
    const autoTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    // Also dismiss at midnight
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const midnightTimer = setTimeout(() => {
      setIsVisible(false);
    }, midnight.getTime() - now.getTime());
    return () => {
      clearTimeout(autoTimer);
      clearTimeout(midnightTimer);
    };
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .confetti {
          position: fixed;
          width: 10px;
          height: 10px;
          pointer-events: none;
          animation: fall linear forwards;
        }

        .madaraka-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(187, 0, 0, 0.95) 0%, rgba(0, 102, 0, 0.95) 50%, rgba(10, 22, 40, 0.95) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          overflow: hidden;
        }

        .madaraka-content {
          position: relative;
          z-index: 10;
          text-align: center;
          color: white;
          max-width: 600px;
          padding: 40px 20px;
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .madaraka-title {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 16px;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
        }

        .madaraka-subtitle {
          font-size: 1.5rem;
          margin-bottom: 24px;
          font-weight: 600;
          text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
        }

        .madaraka-letter {
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          padding: 24px;
          margin: 24px 0;
          font-size: 1rem;
          line-height: 1.6;
          text-align: left;
          backdrop-filter: blur(10px);
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }

        .madaraka-button {
          background: white;
          color: #BB0000;
          border: none;
          padding: 14px 32px;
          font-size: 1.1rem;
          font-weight: bold;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          margin-top: 24px;
        }

        .madaraka-button:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }

        .madaraka-button:active {
          transform: scale(0.98);
        }
      `}</style>

      <div className="madaraka-overlay">
        <div className="madaraka-content">
          <div className="madaraka-title">Happy Madaraka Day! 🇰🇪</div>
          <div className="madaraka-subtitle">Celebrating 62 Years of Self-Governance</div>

          <div className="madaraka-letter">
            <p style={{ marginBottom: "12px", fontWeight: "600" }}>Dear Valued Partner,</p>
            <p>
              Today, we celebrate Madaraka Day—a momentous occasion marking Kenya's independence and self-governance. 
              At VTEC Business Group, we are proud to be part of Kenya's entrepreneurial journey, empowering businesses 
              to thrive and reach their full potential.
            </p>
            <p style={{ marginTop: "12px" }}>
              As we honor this day of freedom and progress, we commit to supporting Kenya's business community 
              with innovative solutions and expert guidance.
            </p>
            <p style={{ marginTop: "12px", fontWeight: "600" }}>With pride and purpose,</p>
            <p style={{ marginTop: "8px" }}>The VTEC Business Group Team 🇰🇪</p>
          </div>

          <button className="madaraka-button" onClick={handleDismiss}>
            Celebrate with Us →
          </button>
        </div>
      </div>

      <ConfettiGenerator />
    </>
  );
}

function ConfettiGenerator() {
  useEffect(() => {
    const colors = ["#BB0000", "#006600", "#0A1628"];

    const createConfetti = () => {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDuration = (Math.random() * 3 + 2) + "s";
      confetti.style.animationDelay = Math.random() * 0.5 + "s";
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 5000);
    };

    const interval = setInterval(createConfetti, 100);
    return () => clearInterval(interval);
  }, []);

  return null;
}
