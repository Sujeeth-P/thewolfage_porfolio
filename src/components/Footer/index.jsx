import WolfLogo from '../common/WolfLogo';
import { CONTACT_EMAIL, NAV_ITEMS } from '../../data/constants';

const linkStyle = {
  display: 'inline-flex', alignItems: 'center', minHeight: 44,
  fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.75rem',
  letterSpacing: '0.15em', textTransform: 'uppercase',
  color: '#9a9a9a', textDecoration: 'none',
};

const Footer = () => (
  <footer style={{
    background: '#050505',
    borderTop: '1px solid rgba(232,240,32,0.08)',
    padding: '1.5rem clamp(1.25rem, 4vw, 2.5rem) calc(1.5rem + env(safe-area-inset-bottom))',
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem 2rem',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <WolfLogo size={24} />
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#8a8a8a', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
        © {new Date().getFullYear()} The Wolf Age. All rights reserved.
      </span>
    </div>

    <nav aria-label="Footer">
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: '0 1.5rem' }}>
        {NAV_ITEMS.map((item) => (
          <li key={item.href}><a href={item.href} style={linkStyle}>{item.label}</a></li>
        ))}
        <li><a href={`mailto:${CONTACT_EMAIL}`} style={{ ...linkStyle, color: '#E8F020' }}>Email</a></li>
      </ul>
    </nav>
  </footer>
);

export default Footer;
