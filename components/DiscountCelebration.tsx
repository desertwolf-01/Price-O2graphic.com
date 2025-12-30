import React, { useEffect } from 'react';
import { Translation } from '../i18n';
import { formatCurrency } from '../utils/format';

interface DiscountCelebrationProps {
  t: Translation;
  discountPercentage: number;
  savedAmount: number;
  onClose: () => void;
}

const DiscountCelebration: React.FC<DiscountCelebrationProps> = ({ t, discountPercentage, savedAmount, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000); // Auto close after 4s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none">
       {/* Backdrop */}
       <div className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"></div>

       {/* Modal */}
       <div 
         onClick={onClose}
         className="bg-white rounded-2xl shadow-2xl p-8 transform animate-bounce-in relative z-10 pointer-events-auto text-center border-4 border-yellow-400 max-w-sm w-full mx-4 cursor-pointer"
         title="Click to close"
       >
          {/* Confetti Elements (Simple CSS) */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
             {[...Array(20)].map((_, i) => (
                <div key={i} className="confetti-piece" style={{ 
                    left: `${Math.random() * 100}%`, 
                    animationDelay: `${Math.random() * 0.5}s`,
                    backgroundColor: ['#ff0', '#f00', '#0f0', '#00f', '#f0f'][Math.floor(Math.random() * 5)]
                }}></div>
             ))}
          </div>

          <div className="mb-4 relative z-10">
             <span className="text-6xl animate-pulse inline-block">🎉</span>
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-2 relative z-10">
            {t.discountUnlockedTitle}
          </h2>
          <p className="text-xl text-slate-600 font-bold mb-4 relative z-10">
            {t.discountUnlockedMessage(discountPercentage)}
          </p>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full inline-block font-bold text-lg animate-pulse relative z-10 border border-green-200 shadow-sm">
            {t.youSaved(formatCurrency(savedAmount))}
          </div>
       </div>

       <style>{`
         @keyframes popIn {
           0% { opacity: 0; transform: scale(0.5) translateY(20px); }
           60% { opacity: 1; transform: scale(1.1); }
           100% { opacity: 1; transform: scale(1); }
         }
         .animate-bounce-in {
           animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
         }
         .confetti-piece {
            position: absolute;
            width: 8px;
            height: 8px;
            top: -10px;
            opacity: 0;
            animation: fall 2.5s linear forwards;
         }
         @keyframes fall {
            0% { top: -10px; opacity: 1; transform: rotate(0deg); }
            100% { top: 110%; opacity: 0; transform: rotate(720deg); }
         }
       `}</style>
    </div>
  );
};
export default DiscountCelebration;
