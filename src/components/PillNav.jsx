import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './PillNav.css';

const PillNav = ({
  logo,
  logoAlt = 'Logo',
  logoHref,
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#fff',
  pillColor = '#120F17',
  hoveredPillTextColor = '#120F17',
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const resolvedLogoHref = logoHref ?? items?.[0]?.href ?? '#';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [shrunk, setShrunk] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const logoImgRef = useRef(null);
  const logoTweenRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (menu) gsap.set(menu, { visibility: 'hidden', opacity: 0 });

    if (initialLoadAnimation) {
      const logoEl = logoRef.current;
      const navItems = navItemsRef.current;
      if (logoEl) {
        gsap.set(logoEl, { scale: 0 });
        gsap.to(logoEl, { scale: 1, duration: 0.6, ease });
      }
      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: 'hidden' });
        gsap.to(navItems, { width: 'auto', duration: 0.6, ease });
      }
    }
  }, [ease, initialLoadAnimation]);

  const isCollapsed = shrunk && !hovered;

  const handleNavMouseEnter = () => {
    clearTimeout(hoverTimeoutRef.current);
    setHovered(true);
  };

  const handleNavMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => setHovered(false), 300);
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, { rotate: 360, duration: 0.2, ease, overwrite: 'auto' });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(menu, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease });
      } else {
        gsap.to(menu, {
          opacity: 0, y: 10, duration: 0.2, ease,
          onComplete: () => gsap.set(menu, { visibility: 'hidden' })
        });
      }
    }

    onMobileMenuClick?.();
  };

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: resolvedPillTextColor
  };

  const glass = {
    background: 'rgba(10,10,10,0.75)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.40)',
  };

  const glassTransition = 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease';

  return (
    <div
      className="pill-nav-container"
      onMouseEnter={handleNavMouseEnter}
      onMouseLeave={handleNavMouseLeave}
    >
      <nav
        className={`pill-nav ${className}`}
        aria-label="Primary"
        style={{
          ...cssVars,
          background: isCollapsed ? 'transparent' : glass.background,
          backdropFilter: isCollapsed ? 'none' : glass.backdropFilter,
          WebkitBackdropFilter: isCollapsed ? 'none' : glass.WebkitBackdropFilter,
          border: isCollapsed ? 'none' : glass.border,
          padding: isCollapsed ? '0' : '6px 16px 6px 8px',
          boxShadow: isCollapsed ? 'none' : glass.boxShadow,
          transition: `padding 0.4s cubic-bezier(0.4,0,0.2,1), ${glassTransition}`,
          gap: '4px',
        }}
      >
        <a
          className="pill-logo"
          href={resolvedLogoHref}
          aria-label="Home"
          onMouseEnter={handleLogoEnter}
          ref={el => { logoRef.current = el; }}
          style={{
            ...(isCollapsed ? glass : { background: 'transparent', border: 'none', boxShadow: 'none' }),
            transition: glassTransition,
          }}
        >
          <img src={logo} alt={logoAlt} ref={logoImgRef} />
        </a>

        <div
          className="pill-nav-items desktop-only"
          ref={navItemsRef}
          style={{
            maxWidth: isCollapsed ? '0px' : '700px',
            opacity: isCollapsed ? 0 : 1,
            overflow: 'hidden',
            pointerEvents: isCollapsed ? 'none' : 'auto',
            transition: 'max-width 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease',
          }}
        >
          <ul className="pill-list" role="menubar">
            {items.map((item, i) => (
              <li key={item.href || `item-${i}`} role="none">
                <a
                  role="menuitem"
                  href={item.href}
                  className={`pill${activeHref === item.href ? ' is-active' : ''}`}
                  aria-label={item.ariaLabel || item.label}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          ref={hamburgerRef}
          style={{
            ...(isCollapsed ? glass : {}),
            transition: glassTransition,
          }}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      <div className="mobile-menu-popover mobile-only" ref={mobileMenuRef} style={cssVars}>
        <ul className="mobile-menu-list">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`mobile-menu-link${activeHref === item.href ? ' is-active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
