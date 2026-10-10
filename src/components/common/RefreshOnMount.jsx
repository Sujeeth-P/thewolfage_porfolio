import { useEffect } from 'react';
import { ScrollTrigger } from '../../utils/gsap';

// Sections below the fold mount after the hero paints. Once they exist,
// pinned sections need their scroll positions recalculated.
const RefreshOnMount = () => {
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(id);
  }, []);
  return null;
};

export default RefreshOnMount;
