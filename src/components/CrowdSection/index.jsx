import CrowdCanvas from './CrowdCanvas';

const CrowdSection = () => (
  <section style={{
    position: 'relative', height: '100vh',
    background: '#080808', overflow: 'hidden',
    borderTop: '1px solid rgba(232,240,32,0.06)',
  }}>
    {/* Heading */}
    <div style={{ textAlign: 'center', paddingTop: '5rem', position: 'relative', zIndex: 3 }}>
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#E8F020', fontSize: '0.72rem', letterSpacing: '0.38em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
        [ 06 ] The Pack
      </p>
      <h2 style={{ fontFamily: "'Bebas Neue', 'Anton', sans-serif", fontSize: 'clamp(2.8rem, 6vw, 6rem)', color: '#fff', margin: 0, lineHeight: 0.9 }}>
        WE MOVE<br /><span style={{ color: '#E8F020' }}>AS ONE</span>
      </h2>
    </div>

    {/* Crowd canvas — anchored to bottom */}
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '65%' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '10%',
        zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, #080808, transparent)',
      }} />
      <CrowdCanvas />
    </div>
  </section>
);

export default CrowdSection;
