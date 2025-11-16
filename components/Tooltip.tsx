
import React from 'react';
import type { ServiceOption } from '../types';
import type { Translation } from '../i18n';

interface TooltipProps {
  option: ServiceOption;
  language: 'ar' | 'en';
  t: Translation;
  isVisible: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ option, language, t, isVisible }) => {
  if (!isVisible || (!option.description && (!option.items || option.items.length === 0))) {
    return null;
  }

  const positionStyles: React.CSSProperties =
    language === 'ar'
      ? { right: '100%', marginRight: '1rem' }
      : { left: '100%', marginLeft: '1rem' };

  return (
    <div
      className={`
        absolute z-20 w-80 max-h-[90%] overflow-y-auto p-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl border border-slate-200/80
        transition-opacity duration-200 ease-in-out print:hidden
        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      style={{
        top: '50%',
        transform: 'translateY(-50%)',
        ...positionStyles,
      }}
      role="tooltip"
    >
      <h5 className="font-bold text-slate-900 mb-2">{option.name}</h5>
      
      {option.items && option.items.length > 0 && (
        <>
          <h6 className="font-semibold text-xs text-slate-500 uppercase tracking-wider mb-2">{t.tooltipIncludedTitle}</h6>
          <ul className={`text-sm text-slate-700 space-y-1 ${language === 'ar' ? 'pr-4' : 'pl-4'} list-disc list-inside`}>
            {option.items.map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: item.replace(/__(.*?)__/g, '<strong>$1</strong>') }} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Tooltip;
