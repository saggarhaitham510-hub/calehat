
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import PropertyDetails from '@/pages/PropertyDetails';
import BookingPage from '@/pages/BookingPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <Helmet>
          <title>إيجار الاستراحات والشاليهات - السعودية</title>
          <meta name="description" content="أفضل موقع لإيجار الاستراحات والشاليهات في المملكة العربية السعودية. احجز الآن واستمتع بأجمل الأوقات" />
        </Helmet>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/booking/:id" element={<BookingPage />} />
        </Routes>
        
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
