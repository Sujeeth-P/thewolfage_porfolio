import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from '../../utils/gsap';
import './PillNav.css';

const Navbar = ({
  logo,
  logoAlt = 'Logo',
  logoHref,
  items,
  activeHref,
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  pillColor = '#120F17',
  hoveredPillTextColor = '#120F17',
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true,
  openModal,
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const resolvedLogoHref = logoHref ?? items?.[0]?.href ?? '#';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [shrunk, setShrunk] = useState(false);
  const [hovered, setHovered] = useState(false);
  // Backdrop blur on a fixed bar is costly on phones: wide screens only.
  const [canBlur] = useState(() => window.matchMedia('(min-width: 768px)').matches);
  const hoverTimeoutRef = useRef(null);
  const logoImgRef = useRef(null);
  const logoTweenRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);
  const logoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setShrunk(window.scrollY > 300);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
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

  const setMenuOpen = useCallback((open) => {
    setIsMobileMenuOpen(open);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      gsap.to(lines[0], { rotation: open ? 45 : 0, y: open ? 4.5 : 0, duration: 0.3, ease });
      gsap.to(lines[1], { rotation: open ? -45 : 0, y: open ? -4.5 : 0, duration: 0.3, ease });
    }

    if (menu) {
      if (open) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(menu, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease });
      } else {
        gsap.to(menu, {
          opacity: 0, y: 10, duration: 0.2, ease,
          onComplete: () => gsap.set(menu, { visibility: 'hidden' }),
        });
      }
    }
  }, [ease]);

  const toggleMobileMenu = () => {
    setMenuOpen(!isMobileMenuOpen);
    onMobileMenuClick?.();
  };

  // Close the phone menu on Escape or a tap outside it.
  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    const onPointer = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [isMobileMenuOpen, setMenuOpen]);

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: resolvedPillTextColor,
  };

  const glass = {
    background: canBlur ? 'rgba(10,10,10,0.75)' : 'rgba(10,10,10,0.94)',
    backdropFilter: canBlur ? 'blur(14px)' : 'none',
    WebkitBackdropFilter: canBlur ? 'blur(14px)' : 'none',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.40)',
  };

  const glassTransition = 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease';

  const handleItemClick = (e, item) => {
    if (item.label.toLowerCase() === 'contact' && openModal) {
      e.preventDefault();
      openModal();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`pill-nav-container${isMobileMenuOpen ? ' is-menu-open' : ''}`}
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
          aria-label={`${logoAlt}, home`}
          onMouseEnter={handleLogoEnter}
          ref={(el) => { logoRef.current = el; }}
          style={{
            ...(isCollapsed ? glass : { background: 'transparent', border: 'none', boxShadow: 'none' }),
            transition: glassTransition,
          }}
        >
          <img src={logo} alt="" width="45" height="39" ref={logoImgRef} />
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
          <ul className="pill-list">
            {items.map((item, i) => (
              <li key={item.href || `item-${i}`}>
                <a
                  href={item.href}
                  className={`pill${activeHref === item.href ? ' is-active' : ''}`}
                  aria-label={item.ariaLabel || item.label}
                  aria-current={activeHref === item.href ? 'page' : undefined}
                  tabIndex={isCollapsed ? -1 : undefined}
                  onClick={(e) => handleItemClick(e, item)}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          ref={hamburgerRef}
          style={{ ...(isCollapsed ? glass : {}), transition: glassTransition }}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      <div id="mobile-menu" className="mobile-menu-popover mobile-only" ref={mobileMenuRef} style={cssVars}>
        <ul className="mobile-menu-list">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`mobile-menu-link${activeHref === item.href ? ' is-active' : ''}`}
                onClick={(e) => {
                  setMenuOpen(false);
                  handleItemClick(e, item);
                }}
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

export default Navbar;
