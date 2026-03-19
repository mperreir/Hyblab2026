import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { lenisScrollTo } from '../lib/lenis';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    lenisScrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
