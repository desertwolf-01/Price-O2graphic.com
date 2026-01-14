
import React, { useState } from 'react';
import { VALID_COUPONS } from '../constants';
import { Translation } from '../i18n';

interface CouponSectionProps {
  t: Translation;
  language: 'ar' | 'en';
  onApply: (coupon: { code: string; discount: number } | null) => void;
  appliedCoupon: { code: string; discount: number } | null;
}

const CouponSection: React.FC<CouponSectionProps> = ({ t, language, onApply, appliedCoupon }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleApply = () => {
    const coupon = VALID_COUPONS.find(c => c.code.toUpperCase() === code.toUpperCase().trim());
    if (coupon) {
      onApply(coupon);
      setError(false);
      setCode('');
    } else {
      setError(true);
    }
  };

  const handleRemove = () => {
    onApply(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 p-6">
      <div className={`flex flex-col gap-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <label htmlFor="coupon" className="text-lg font-bold text-slate-800">
          {t.couponLabel}
        </label>
        
        {appliedCoupon ? (
          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-blue-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A1.001 1.001 0 013 9V5a2 2 0 012-2h4c.266 0 .52.105.707.293l7 7zM10 11.293L4.707 6H4v.707L9.293 12 10 11.293z" clipRule="evenodd" />
                </svg>
              </span>
              <p className="text-sm font-medium text-blue-800">
                {t.couponApplied(appliedCoupon.code, appliedCoupon.discount)}
              </p>
            </div>
            <button
              onClick={handleRemove}
              className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors"
            >
              {t.removeCoupon}
            </button>
          </div>
        ) : (
          <div className={`flex gap-2 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
            <input
              type="text"
              id="coupon"
              value={code}
              onChange={(e) => { setCode(e.target.value); if(error) setError(false); }}
              placeholder={t.couponPlaceholder}
              className={`flex-1 px-4 py-2 border ${error ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-white'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 uppercase`}
            />
            <button
              onClick={handleApply}
              className="bg-slate-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-900 transition-colors active:scale-95"
            >
              {t.applyBtn}
            </button>
          </div>
        )}
        {error && <p className="text-sm text-red-600 font-medium">{t.invalidCoupon}</p>}
      </div>
    </div>
  );
};

export default CouponSection;
