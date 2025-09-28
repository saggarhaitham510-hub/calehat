import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CreditCard, Lock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    paymentMethod: 'card'
  });

  const bookingData = JSON.parse(localStorage.getItem('currentBooking') || '{}');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formatted.length <= 19) {
        setPaymentData(prev => ({ ...prev, [name]: formatted }));
      }
      return;
    }
    
    if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formatted.length <= 5) {
        setPaymentData(prev => ({ ...prev, [name]: formatted }));
      }
      return;
    }
    
    if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '');
      if (formatted.length <= 3) {
        setPaymentData(prev => ({ ...prev, [name]: formatted }));
      }
      return;
    }

    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const proceedToVerification = () => {
    const currentBooking = JSON.parse(localStorage.getItem('currentBooking') || '{}');
    const fullBookingData = {
      ...currentBooking,
      paymentDetails: paymentData.paymentMethod === 'card' ? paymentData : { paymentMethod: 'Pay Later' }
    };
    localStorage.setItem('currentBooking', JSON.stringify(fullBookingData));
    
    toast({
      title: "🔄 جاري معالجة الطلب...",
      description: "سيتم توجيهك لصفحة التحقق",
    });

    setTimeout(() => {
      navigate('/verification');
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.cardName) {
      toast({
        title: "⚠️ بيانات ناقصة",
        description: "يرجى ملء جميع بيانات البطاقة",
        variant: "destructive"
      });
      return;
    }
    proceedToVerification();
  };

  const handlePayLater = () => {
    proceedToVerification();
  };

  if (!bookingData.propertyName) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">لا توجد بيانات حجز</h2>
          <Button onClick={() => navigate('/')}>العودة للرئيسية</Button>
        </div>
      </div>
    );
  }

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
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-4">إتمام الدفع</h1>
            <p className="text-gray-600">اختر طريقة الدفع المناسبة لك</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <Shield className="w-6 h-6 text-emerald-600 ml-3" />
                  <h2 className="text-2xl font-bold text-gray-800">الدفع الآمن</h2>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">طريقة الدفع</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer ${paymentData.paymentMethod === 'card' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-emerald-300'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="ml-3"
                      />
                      <CreditCard className="w-5 h-5 text-emerald-600 ml-2" />
                      <span className="font-medium">بطاقة ائتمان</span>
                    </label>
                    
                    <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer ${paymentData.paymentMethod === 'later' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-emerald-300'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="later"
                        checked={paymentData.paymentMethod === 'later'}
                        onChange={handleInputChange}
                        className="ml-3"
                      />
                      <span className="font-medium">الدفع لاحقاً</span>
                    </label>
                  </div>
                </div>

                {paymentData.paymentMethod === 'card' && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        رقم البطاقة *
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="cardNumber"
                          value={paymentData.cardNumber}
                          onChange={handleInputChange}
                          className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          تاريخ الانتهاء *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={paymentData.expiryDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="MM/YY"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={paymentData.cvv}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        اسم حامل البطاقة *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={paymentData.cardName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="الاسم كما هو مكتوب على البطاقة"
                        required
                      />
                    </div>

                    <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                      <Lock className="w-5 h-5 text-blue-600 ml-3" />
                      <p className="text-sm text-blue-700">
                        جميع المعاملات محمية بتشفير SSL 256-bit
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-lg py-3"
                    >
                      دفع {bookingData.totalPrice} ر.س
                    </Button>
                  </form>
                )}

                {paymentData.paymentMethod === 'later' && (
                  <div className="space-y-6">
                    <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">الدفع عند الوصول</h4>
                      <p className="text-yellow-700 text-sm">
                        يمكنك الدفع نقداً أو بالبطاقة عند وصولك للاستراحة. 
                        سيتم حجز المكان لك لمدة 24 ساعة.
                      </p>
                    </div>

                    <Button
                      onClick={handlePayLater}
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-lg py-3"
                    >
                      تأكيد الحجز - الدفع لاحقاً
                    </Button>
                  </div>
                )}
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-lg sticky top-8"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">ملخص الطلب</h3>
                
                <div className="space-y-3 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-800">{bookingData.propertyName}</h4>
                    <p className="text-sm text-gray-600">
                      {bookingData.checkIn} - {bookingData.checkOut}
                    </p>
                    <p className="text-sm text-gray-600">
                      {bookingData.guests} ضيوف
                    </p>
                  </div>
                </div>

                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">السعر الأساسي</span>
                    <span className="font-semibold">{bookingData.price} ر.س</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">رسوم الخدمة</span>
                    <span className="font-semibold">50 ر.س</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الضرائب</span>
                    <span className="font-semibold">مشمولة</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-3">
                    <span>المجموع</span>
                    <span className="text-emerald-600">{bookingData.totalPrice} ر.س</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="w-4 h-4 ml-2" />
                    <span>دفع آمن ومحمي</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Lock className="w-4 h-4 ml-2" />
                    <span>تشفير SSL</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;