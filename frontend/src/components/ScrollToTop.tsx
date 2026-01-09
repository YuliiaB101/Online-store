import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash, search } = useLocation();

  useEffect(() => {
    // If there's a hash, don't scroll to top
    if (hash) {
      return;
    }
    
    // Scroll all possible containers
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, hash, search]);

  return null;
};

export default ScrollToTop;
