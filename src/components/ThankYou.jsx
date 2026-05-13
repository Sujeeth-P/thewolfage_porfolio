export default function ThankYou({ onReturn }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#080808',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '3rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        backgroundImage:
          'linear-gradient(rgba(232,240,32,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(232,240,32,0.035) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(ellipse, rgba(232,240,32,0.06) 0%, transparent 68%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>

        {/* Check icon */}
        <div style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          border: '1px solid rgba(232,240,32,0.3)',
          background: 'rgba(232,240,32,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          fontSize: '1.8rem',
          color: '#E8F020',
          animation: 'pop-in 0.5s cubic-bezier(0.175,0.885,0.32,1.275) both',
        }}>
          ✓
        </div>

        {/* Label */}
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#E8F020',
          marginBottom: 16,
        }}>
          Request Received
        </div>

        {/* Heading */}
        <h1 style={{
          fontFamily: "'Bebas Neue', 'Anton', sans-serif",
          fontSize: 'clamp(3.5rem, 10vw, 7rem)',
          color: '#FAFAF7',
          letterSpacing: '-0.01em',
          lineHeight: 0.92,
          margin: '0 0 1.5rem',
        }}>
          THANK<br />
          <span style={{ color: '#E8F020' }}>YOU.</span>
        </h1>

        {/* Body text */}
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '1rem',
          color: '#555',
          maxWidth: 420,
          lineHeight: 1.75,
          margin: '0 auto 1.75rem',
        }}>
          We've received your request. Our team will review it and get back to you within 24 hours.
        </p>

        {/* Response time badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.78rem',
          fontWeight: 600,
          letterSpacing: '0.06em',
          color: '#E8F020',
          background: 'rgba(232,240,32,0.07)',
          border: '1px solid rgba(232,240,32,0.18)',
          padding: '8px 18px',
          borderRadius: 100,
          marginBottom: '2.5rem',
        }}>
          <span style={{ fontSize: '0.7rem' }}>⏱</span>
          Expected response: 24–48 hours
        </div>

        {/* Return button */}
        <div>
          <button
            onClick={onReturn}
            style={{
              background: '#E8F020',
              color: '#080808',
              border: 'none',
              padding: '14px 36px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            ← Return to Homepage
          </button>
        </div>

      </div>
    </div>
  )
}
