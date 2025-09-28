
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Users, Bed, Bath } from 'lucide-react';
import { Link } from 'react-router-dom';
import { properties } from '@/data/properties';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(properties);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredProperties(properties);
    } else {
      const filtered = properties.filter(property =>
        property.name.includes(term) ||
        property.location.includes(term) ||
        property.amenities.some(amenity => amenity.includes(term))
      );
      setFilteredProperties(filtered);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-center space-x-2"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">إيجار الاستراحات والشاليهات</h1>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-center pattern-bg">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-4"
          >
            اكتشف أجمل الاستراحات والشاليهات
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8"
          >
            في المملكة العربية السعودية
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ابحث عن استراحة أو شاليه..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-12 py-4 rounded-full text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-emerald-300"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center text-gray-800 mb-12"
          >
            أفضل الاستراحات والشاليهات
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
              >
                <div className="relative h-64">
                  <img
                    src={property.images[0]}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                    <span className="text-emerald-600 font-bold">{property.price} ر.س/ليلة</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{property.name}</h3>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 ml-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 mr-1">{property.rating}</span>
                      <span className="text-sm text-gray-500">({property.reviews} تقييم)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 ml-1" />
                      <span>{property.capacity} ضيف</span>
                    </div>
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 ml-1" />
                      <span>{property.bedrooms} غرفة</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 ml-1" />
                      <span>{property.bathrooms} حمام</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.amenities.slice(0, 3).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                    {property.amenities.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{property.amenities.length - 3} المزيد
                      </span>
                    )}
                  </div>

                  <Link to={`/property/${property.id}`}>
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                      عرض التفاصيل
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">لم يتم العثور على نتائج مطابقة لبحثك</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">إيجار الاستراحات</h3>
              <p className="text-gray-400">
                أفضل موقع لإيجار الاستراحات والشاليهات في المملكة العربية السعودية
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">المدن الرئيسية</h4>
              <ul className="space-y-2 text-gray-400">
                <li>الرياض</li>
                <li>جدة</li>
                <li>الدمام</li>
                <li>أبها</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">معلومات التواصل</h4>
              <ul className="space-y-2 text-gray-400">
                <li>هاتف: 920000000</li>
                <li>البريد: info@chalets.sa</li>
                <li>العنوان: الرياض، السعودية</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 إيجار الاستراحات. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
