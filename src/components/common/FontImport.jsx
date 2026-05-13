const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #080808; color: #fff; cursor: none; overflow-x: clip; max-width: 100vw; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #080808; }
    ::-webkit-scrollbar-thumb { background: #E8F020; }
    a { cursor: none; }
    button { cursor: none; }
    @media (hover: none) {
      body { cursor: auto !important; }
      a { cursor: pointer !important; }
      button { cursor: pointer !important; }
    }
  `}</style>
);

export default FontImport;
