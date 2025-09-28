import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Users, Phone, Mail, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SuccessPage = () => {
  const navigate = useNavigate();
  const [latestBooking, setLatestBooking] = useState(null);

  useEffect(() => {
    const latestBookingId = localStorage.getItem('latestBookingId');
    if (latestBookingId) {
      const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const booking = allBookings.find(b => b.bookingId === latestBookingId);
      setLatestBooking(booking);
    }

    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      
      if (window.confetti) {
        window.confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        window.confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }
    }, 250);

    return () => {
      clearInterval(interval);
      localStorage.removeItem('latestBookingId');
    };
  }, []);

  if (!latestBooking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">لا توجد بيانات حجز لعرضها</h2>
          <p className="text-gray-600 mb-6">ربما قمت بتحديث الصفحة. يمكنك العودة للرئيسية.</p>
          <Button onClick={() => navigate('/')}>العودة للرئيسية</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 shadow-2xl text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-12 h-12 text-emerald-600" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-3xl font-bold text-gray-800 mb-4"
            >
              🎉 تم تأكيد حجزك بنجاح!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-gray-600 mb-8 text-lg"
            >
              شكراً لك! تم تأكيد حجزك. تم إرسال نسخة من التفاصيل إلى بريدك الإداري.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-emerald-50 rounded-2xl p-6 mb-8 text-right"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">تفاصيل الحجز</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Home className="w-5 h-5 text-emerald-600 ml-3" />
                  <div>
                    <div className="font-semibold text-gray-800">{latestBooking.propertyName}</div>
                    <div className="text-sm text-gray-600">رقم الحجز: #{latestBooking.bookingId}</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-emerald-600 ml-3" />
                  <div>
                    <div className="font-semibold text-gray-800">
                      {latestBooking.checkIn} - {latestBooking.checkOut}
                    </div>
                    <div className="text-sm text-gray-600">تواريخ الإقامة</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Users className="w-5 h-5 text-emerald-600 ml-3" />
                  <div>
                    <div className="font-semibold text-gray-800">{latestBooking.guests} ضيوف</div>
                    <div className="text-sm text-gray-600">عدد الضيوف</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-emerald-600 ml-3" />
                  <div>
                    <div className="font-semibold text-gray-800">{latestBooking.firstName} {latestBooking.lastName}</div>
                    <div className="text-sm text-gray-600">{latestBooking.phone}</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-emerald-600 ml-3" />
                  <div>
                    <div className="font-semibold text-gray-800">{latestBooking.email}</div>
                    <div className="text-sm text-gray-600">البريد الإلكتروني</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-emerald-200 mt-6 pt-6">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>المبلغ الإجمالي</span>
                  <span className="text-emerald-600">{latestBooking.totalPrice} ر.س</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="space-y-4"
            >
              <Button
                onClick={() => navigate('/')}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-lg py-3"
              >
                العودة للرئيسية
              </Button>
              
              <Button
                onClick={() => window.print()}
                variant="outline"
                className="w-full"
              >
                طباعة تفاصيل الحجز
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;