// PricingSection.tsx

import React, { useState } from 'react';
import { sendProposal } from '../email'; // <-- استيراد الدالة
import { Service } from '../App'; // <-- تأكد من استيراد نوع Service إذا كنت تستخدمه

interface PricingSectionProps {
  services: Service[];
  totalPrice: number;
}

const PricingSection: React.FC<PricingSectionProps> = ({ services, totalPrice }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    details: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // جمع الخدمات المحددة فقط
    const selectedServices = services
      .filter(service => service.selected)
      .map(service => service.name);

    // استدعاء دالة الإرسال
    sendProposal({
      clientName: formData.name,
      clientEmail: formData.email,
      selectedPlans: selectedServices,
      totalPrice: totalPrice,
    })
    .then(() => {
      // فقط إذا نجح الإرسال، اعرض الرسالة
      setMessage('تم إرسال عرض السعر إلى info@o2graphic.com بنجاح.');
      setFormData({ name: '', email: '', phone: '', company: '', details: '' }); // إعادة تعيين النموذج (اختياري)
    })
    .catch((error) => {
      // إذا فشل، أظهر رسالة خطأ
      setMessage('حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقًا.');
      console.error("Error sending proposal:", error);
    })
    .finally(() => {
      setLoading(false); // إزالة التحميل في كلتا الحالتين
    });
  };

  return (
    <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">احصل على عرض سعر مخصص</h2>
      <div className="text-center mb-4">
        <p className="text-lg font-semibold text-blue-600">السعر الإجمالي: {totalPrice} دولار</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">الاسم *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className
