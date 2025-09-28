
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, Bed, Bath, MapPin, Calendar } from 'lucide-react';
import { properties } from '@/data/properties';
import { Button } from '@/components/ui/button';

const PropertyDetails = () => {
  const { id } = useParams();
  const property = properties.find(p => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(0);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">العقار غير موجود</h2>
          <Link to="/">
            <Button>العودة للرئيسية</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center text-emerald-600 hover:text-emerald-700">
            <ArrowRight className="w-5 h-5 ml-2" />
            العودة للرئيسية
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="relative h-96 rounded-2xl overflow-hidden mb-4">
                <img
                  src={property.images[selectedImage]}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-4 ring-emerald-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${property.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Property Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{property.name}</h1>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 ml-2" />
                <span>{property.location}</span>
              </div>

              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-semibold text-gray-800 mr-2">{property.rating}</span>
                  <span className="text-gray-600">({property.reviews} تقييم)</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-800">{property.capacity}</div>
                  <div className="text-sm text-gray-600">ضيف</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bed className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-800">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">غرفة نوم</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bath className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-800">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">حمام</div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">الوصف</h3>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">المرافق والخدمات</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center p-3 bg-emerald-50 rounded-lg">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full ml-3"></div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg sticky top-8"
            >
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  {property.price} ر.س
                </div>
                <div className="text-gray-600">لكل ليلة</div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تاريخ الوصول
                  </label>
                  <div className="relative">
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تاريخ المغادرة
                  </label>
                  <div className="relative">
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عدد الضيوف
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    {Array.from({ length: property.capacity }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'ضيف' : 'ضيوف'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">السعر لليلة الواحدة</span>
                  <span className="font-semibold">{property.price} ر.س</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">رسوم الخدمة</span>
                  <span className="font-semibold">50 ر.س</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                  <span>المجموع</span>
                  <span className="text-emerald-600">{property.price + 50} ر.س</span>
                </div>
              </div>

              <Link to={`/booking/${property.id}`}>
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-lg py-3">
                  احجز الآن
                </Button>
              </Link>

              <p className="text-sm text-gray-500 text-center mt-4">
                لن يتم خصم أي مبلغ حتى تأكيد الحجز
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
