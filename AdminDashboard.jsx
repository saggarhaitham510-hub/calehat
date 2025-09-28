import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Calendar, 
  DollarSign, 
  Home,
  Search,
  Filter,
  MoreVertical,
  Eye,
  MapPin,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { properties } from '@/data/properties';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [propertyForm, setPropertyForm] = useState({
    name: '',
    location: '',
    price: '',
    capacity: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    amenities: []
  });

  useEffect(() => {
    // Load bookings from localStorage
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(savedBookings);
  }, []);

  const stats = {
    totalProperties: properties.length,
    totalBookings: bookings.length,
    totalRevenue: bookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0),
    occupancyRate: Math.round((bookings.length / properties.length) * 100)
  };

  const handleAddProperty = () => {
    toast({
      title: "🚧 هذه الميزة قيد التطوير",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleEditProperty = (property) => {
    toast({
      title: "🚧 هذه الميزة قيد التطوير",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleDeleteProperty = (propertyId) => {
    toast({
      title: "🚧 هذه الميزة قيد التطوير",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleViewBooking = (booking) => {
    toast({
      title: "📋 تفاصيل الحجز",
      description: `حجز ${booking.propertyName} - ${booking.firstName} ${booking.lastName}`
    });
  };

  const filteredProperties = properties.filter(property =>
    property.name.includes(searchTerm) ||
    property.location.includes(searchTerm)
  );

  const filteredBookings = bookings.filter(booking =>
    booking.propertyName?.includes(searchTerm) ||
    booking.firstName?.includes(searchTerm) ||
    booking.lastName?.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">لوحة إدارة الاستراحات</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="البحث..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-right px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'overview' 
                      ? 'bg-emerald-100 text-emerald-700 font-semibold' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  نظرة عامة
                </button>
                <button
                  onClick={() => setActiveTab('properties')}
                  className={`w-full text-right px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'properties' 
                      ? 'bg-emerald-100 text-emerald-700 font-semibold' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  إدارة العقارات
                </button>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full text-right px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'bookings' 
                      ? 'bg-emerald-100 text-emerald-700 font-semibold' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  الحجوزات
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full text-right px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'analytics' 
                      ? 'bg-emerald-100 text-emerald-700 font-semibold' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  التقارير
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">إجمالي العقارات</p>
                        <p className="text-2xl font-bold text-gray-800">{stats.totalProperties}</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Home className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">إجمالي الحجوزات</p>
                        <p className="text-2xl font-bold text-gray-800">{stats.totalBookings}</p>
                      </div>
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-emerald-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">إجمالي الإيرادات</p>
                        <p className="text-2xl font-bold text-gray-800">{stats.totalRevenue.toLocaleString()} ر.س</p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-yellow-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">معدل الإشغال</p>
                        <p className="text-2xl font-bold text-gray-800">{stats.occupancyRate}%</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">أحدث الحجوزات</h3>
                  {bookings.length > 0 ? (
                    <div className="space-y-4">
                      {bookings.slice(-5).reverse().map((booking, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-semibold text-gray-800">{booking.propertyName}</h4>
                            <p className="text-sm text-gray-600">{booking.firstName} {booking.lastName}</p>
                            <p className="text-sm text-gray-500">{booking.checkIn} - {booking.checkOut}</p>
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-emerald-600">{booking.totalPrice} ر.س</p>
                            <p className="text-sm text-gray-500">{booking.guests} ضيوف</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">لا توجد حجوزات حتى الآن</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Properties Tab */}
            {activeTab === 'properties' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">إدارة العقارات</h2>
                  <Button
                    onClick={handleAddProperty}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                  >
                    <Plus className="w-5 h-5 ml-2" />
                    إضافة عقار جديد
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <div key={property.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                      <div className="relative h-48">
                        <img
                          src={property.images[0]}
                          alt={property.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                          <span className="text-emerald-600 font-bold">{property.price} ر.س</span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{property.name}</h3>
                        <div className="flex items-center text-gray-600 mb-3">
                          <MapPin className="w-4 h-4 ml-1" />
                          <span className="text-sm">{property.location}</span>
                        </div>

                        <div className="flex items-center mb-4">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 mr-1">{property.rating}</span>
                          <span className="text-sm text-gray-500">({property.reviews} تقييم)</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditProperty(property)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteProperty(property.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <span className="text-sm text-gray-500">ID: {property.id}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800">إدارة الحجوزات</h2>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  {filteredBookings.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">رقم الحجز</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">العقار</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">العميل</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">التواريخ</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">المبلغ</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">الحالة</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">الإجراءات</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {filteredBookings.map((booking, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-6 py-4 text-sm text-gray-800">#{booking.bookingId}</td>
                              <td className="px-6 py-4 text-sm text-gray-800">{booking.propertyName}</td>
                              <td className="px-6 py-4 text-sm text-gray-800">
                                {booking.firstName} {booking.lastName}
                                <div className="text-xs text-gray-500">{booking.phone}</div>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800">
                                {booking.checkIn} - {booking.checkOut}
                                <div className="text-xs text-gray-500">{booking.guests} ضيوف</div>
                              </td>
                              <td className="px-6 py-4 text-sm font-semibold text-emerald-600">
                                {booking.totalPrice} ر.س
                              </td>
                              <td className="px-6 py-4">
                                <span className="px-3 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-full">
                                  مؤكد
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleViewBooking(booking)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-12 text-center">
                      <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد حجوزات</h3>
                      <p className="text-gray-500">لم يتم إجراء أي حجوزات حتى الآن</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800">التقارير والإحصائيات</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">أداء العقارات</h3>
                    <div className="space-y-4">
                      {properties.slice(0, 5).map((property) => {
                        const propertyBookings = bookings.filter(b => b.propertyName === property.name);
                        const revenue = propertyBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
                        
                        return (
                          <div key={property.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <h4 className="font-semibold text-gray-800">{property.name}</h4>
                              <p className="text-sm text-gray-600">{propertyBookings.length} حجز</p>
                            </div>
                            <div className="text-left">
                              <p className="font-bold text-emerald-600">{revenue.toLocaleString()} ر.س</p>
                              <p className="text-sm text-gray-500">{property.rating} ⭐</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">إحصائيات شهرية</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-gray-700">الحجوزات هذا الشهر</span>
                        <span className="font-bold text-blue-600">{bookings.length}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                        <span className="text-gray-700">الإيرادات هذا الشهر</span>
                        <span className="font-bold text-emerald-600">{stats.totalRevenue.toLocaleString()} ر.س</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <span className="text-gray-700">متوسط قيمة الحجز</span>
                        <span className="font-bold text-yellow-600">
                          {bookings.length > 0 ? Math.round(stats.totalRevenue / bookings.length) : 0} ر.س
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="text-gray-700">معدل الإشغال</span>
                        <span className="font-bold text-purple-600">{stats.occupancyRate}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;