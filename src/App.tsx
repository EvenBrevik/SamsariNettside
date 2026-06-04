import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CookieBanner } from './components/shared/CookieBanner';
import { Layout } from './components/layout/Layout';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { CasesPage } from './pages/CasesPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ProductsPage } from './pages/ProductsPage';
import { ServicesPage } from './pages/ServicesPage';
import { useCookieConsent } from './providers/CookieConsentProvider';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
  return null;
}

function Analytics() {
  const location = useLocation();
  const { consent } = useCookieConsent();

  useEffect(() => {
    if (consent === 'accepted') {
      window.gtag?.('event', 'page_view', { page_path: location.pathname + location.search });
    }
  }, [location, consent]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Analytics />
      <CookieBanner />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
