import { useState, useEffect } from 'react';
import './LoadingScreen.css';

export const LoadingScreen = ({ onComplete }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showIcons, setShowIcons] = useState({
    code: false,
    profile: false,
    globe: false,
  });
  const [showWelcome, setShowWelcome] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [exitAnimation, setExitAnimation] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Sequence of animations
    const timer1 = setTimeout(() => setShowLogo(true), 100);
    const timer2 = setTimeout(() => setShowIcons(prev => ({ ...prev, code: true })), 400);
    const timer3 = setTimeout(() => setShowIcons(prev => ({ ...prev, profile: true })), 550);
    const timer4 = setTimeout(() => setShowIcons(prev => ({ ...prev, globe: true })), 700);
    const timer5 = setTimeout(() => setShowWelcome(true), 900);
    const timer6 = setTimeout(() => setShowPortfolio(true), 1100);
    const timer7 = setTimeout(() => setShowSubtitle(true), 1300);

    // Wait a bit then start exit animation
    const timer8 = setTimeout(() => {
      setExitAnimation(true);
    }, 2500);

    // Remove from DOM after exit animation completes
    const timer9 = setTimeout(() => {
      setIsLoaded(true);
      onComplete();
    }, 3500); // 2500 + 1000 for exit animation

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
      clearTimeout(timer7);
      clearTimeout(timer8);
      clearTimeout(timer9);
    };
  }, [onComplete]);

  if (isLoaded) return null;

  return (
    <div
      className={`loading-screen ${exitAnimation ? 'exit' : ''}`}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="loading-content">
        {/* Logo */}
        <div className={`logo-wrapper ${showLogo ? 'visible' : ''}`}>
          <div className="logo-circle">
            <svg className="logo-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            <div className="logo-glow"></div>
          </div>
        </div>

        {/* Icons */}
        <div className="icons-container">
          <div className={`icon-wrapper ${showIcons.code ? 'visible' : ''}`}>
            <div className="icon-circle">
              <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
          </div>
          <div className={`icon-wrapper ${showIcons.profile ? 'visible' : ''}`}>
            <div className="icon-circle">
              <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
          <div className={`icon-wrapper ${showIcons.globe ? 'visible' : ''}`}>
            <div className="icon-circle">
              <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Main Text */}
        <div className={`text-wrapper ${showWelcome ? 'visible' : ''}`}>
          <p className="welcome-text">Welcome to my</p>
        </div>

        <div className={`text-wrapper ${showPortfolio ? 'visible' : ''}`}>
          <h1 className="portfolio-text">Portfolio Website</h1>
        </div>

        {/* Subtitle */}
        <div className={`subtitle-wrapper ${showSubtitle ? 'visible' : ''}`}>
          <p className="subtitle-text">www.namaportfolio.com</p>
        </div>
      </div>
    </div>
  );
};