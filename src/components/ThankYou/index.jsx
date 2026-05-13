export default function ThankYou({ onReturn }) {
  return (
    <div className="relative min-h-screen bg-wolf-dark flex flex-col items-center justify-center text-center overflow-hidden px-6 py-12">

      {/* Background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(232,240,32,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(232,240,32,0.035) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(232,240,32,0.06) 0%, transparent 68%)' }}
      />

      <div className="relative z-10 flex flex-col items-center">

        {/* Check icon */}
        <div className="w-[72px] h-[72px] rounded-full border border-[rgba(232,240,32,0.3)] bg-[rgba(232,240,32,0.08)] flex items-center justify-center mb-8 text-[1.8rem] text-wolf-yellow animate-pop-in">
          ✓
        </div>

        {/* Label */}
        <p className="font-body text-[0.65rem] font-bold tracking-[0.18em] uppercase text-wolf-yellow mb-4">
          Request Received
        </p>

        {/* Heading */}
        <h1 className="font-display text-[clamp(3.5rem,10vw,7rem)] text-wolf-white tracking-[-0.01em] leading-[0.92] mb-6">
          THANK<br />
          <span className="text-wolf-yellow">YOU.</span>
        </h1>

        {/* Body */}
        <p className="font-body text-base text-[#555] max-w-[420px] leading-[1.75] mb-7">
          We've received your request. Our team will review it and get back to you within 24 hours.
        </p>

        {/* Response time badge */}
        <div className="inline-flex items-center gap-2 font-body text-[0.78rem] font-semibold tracking-[0.06em] text-wolf-yellow bg-[rgba(232,240,32,0.07)] border border-[rgba(232,240,32,0.18)] px-[18px] py-2 rounded-full mb-10">
          <span className="text-[0.7rem]">⏱</span>
          Expected response: 24–48 hours
        </div>

        {/* Return button */}
        <button
          onClick={onReturn}
          className="bg-wolf-yellow text-wolf-dark px-9 py-[14px] font-body text-[0.82rem] font-bold tracking-[0.15em] uppercase transition-[opacity,transform] duration-200 hover:opacity-[0.88] hover:-translate-y-px [clip-path:polygon(10px_0,100%_0,calc(100%-10px)_100%,0_100%)]"
        >
          ← Return to Homepage
        </button>

      </div>
    </div>
  );
}
