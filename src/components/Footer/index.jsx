import WolfLogo from '../common/WolfLogo';

const Footer = () => (
  <footer style={{
    background: '#050505',
    borderTop: '1px solid rgba(232,240,32,0.08)',
    padding: '2rem 2.5rem',
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <WolfLogo size={24} />
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#333', fontSize: '0.75rem', letterSpacing: '0.15em' }}>
        © 2026 The Wolf Age. All Rights Reserved.
      </span>
    </div>
    <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#333', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
      BUILT WITH REACT + FRAMER MOTION
    </span>
  </footer>
);

export default Footer;
