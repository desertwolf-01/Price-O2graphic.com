
import React from 'react';
import PricingOption from './PricingOption';
import type { ServiceCategory } from '../types';
import type { Translation } from '../i18n';
import { 
  Palette, 
  Award, 
  Globe, 
  Share2, 
  FileText, 
  Video, 
  Package, 
  Layers,
  LucideIcon 
} from 'lucide-react';

interface CategoryVisualConfig {
  icon: LucideIcon;
  emoji: string;
  iconBg: string;
  iconColor: string;
  badgeBg: string;
}

const CATEGORY_VISUALS: Record<string, CategoryVisualConfig> = {
  'graphic-design-services': {
    icon: Palette,
    emoji: '🎨',
    iconBg: 'bg-indigo-50 border-indigo-200/80',
    iconColor: 'text-indigo-600',
    badgeBg: 'bg-indigo-100/90 text-indigo-900 border-indigo-200',
  },
  'exhibition-branding': {
    icon: Award,
    emoji: '🎪',
    iconBg: 'bg-purple-50 border-purple-200/80',
    iconColor: 'text-purple-600',
    badgeBg: 'bg-purple-100/90 text-purple-900 border-purple-200',
  },
  'website-design': {
    icon: Globe,
    emoji: '🌐',
    iconBg: 'bg-teal-50 border-teal-200/80',
    iconColor: 'text-teal-600',
    badgeBg: 'bg-teal-100/90 text-teal-900 border-teal-200',
  },
  'social-media-design': {
    icon: Share2,
    emoji: '📱',
    iconBg: 'bg-blue-50 border-blue-200/80',
    iconColor: 'text-blue-600',
    badgeBg: 'bg-blue-100/90 text-blue-900 border-blue-200',
  },
  'corporate-materials': {
    icon: FileText,
    emoji: '📑',
    iconBg: 'bg-slate-100 border-slate-300/80',
    iconColor: 'text-slate-700',
    badgeBg: 'bg-slate-200/90 text-slate-900 border-slate-300',
  },
  'video-motion-graphics': {
    icon: Video,
    emoji: '🎬',
    iconBg: 'bg-rose-50 border-rose-200/80',
    iconColor: 'text-rose-600',
    badgeBg: 'bg-rose-100/90 text-rose-900 border-rose-200',
  },
  'packaging-design': {
    icon: Package,
    emoji: '📦',
    iconBg: 'bg-amber-50 border-amber-200/80',
    iconColor: 'text-amber-600',
    badgeBg: 'bg-amber-100/90 text-amber-900 border-amber-200',
  },
};

const DEFAULT_VISUAL: CategoryVisualConfig = {
  icon: Layers,
  emoji: '✨',
  iconBg: 'bg-blue-50 border-blue-200/80',
  iconColor: 'text-blue-600',
  badgeBg: 'bg-blue-100/90 text-blue-900 border-blue-200',
};

interface PricingCategoryProps {
  category: ServiceCategory;
  categoryIndex: number;
  selectedIds: string[];
  onServiceToggle: (optionId: string, category: ServiceCategory) => void;
  quantities: { [id: string]: number };
  onQuantityChange: (optionId: string, newQuantity: number) => void;
  language: 'ar' | 'en';
  t: Translation;
  isClientMode: boolean;
}

const PricingCategory: React.FC<PricingCategoryProps> = ({
  category,
  categoryIndex,
  selectedIds,
  onServiceToggle,
  quantities,
  onQuantityChange,
  language,
  t,
  isClientMode,
}) => {
  const visual = CATEGORY_VISUALS[category.id] || DEFAULT_VISUAL;
  const IconComponent = visual.icon;

  return (
    <div id={category.id} className="scroll-mt-8 bg-white rounded-2xl shadow-lg border border-slate-200/80 print:shadow-none print:border-0 overflow-hidden">
      <div className={`p-6 bg-slate-50/60 border-b border-slate-200/80 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <div className="flex items-center gap-3.5 mb-1">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs border ${visual.iconBg} ${visual.iconColor} transition-transform hover:scale-105`}>
            <IconComponent className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${visual.badgeBg}`}>
                <span>{visual.emoji}</span>
                <span>{language === 'ar' ? `القسم ${categoryIndex}` : `Category ${categoryIndex}`}</span>
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
              {category.name}
            </h3>
          </div>
        </div>
        {category.description && (
          <div 
            className="mt-3 text-sm md:text-base text-slate-600 leading-relaxed" 
            dangerouslySetInnerHTML={{ __html: category.description }} 
          />
        )}
      </div>

      <div className="p-6 space-y-4">
        {category.options.map((option, optIdx) => (
          <PricingOption
            key={option.id}
            option={option}
            displayNumber={`${categoryIndex}.${optIdx + 1}`}
            isSelected={selectedIds.includes(option.id)}
            onToggle={() => onServiceToggle(option.id, category)}
            quantity={quantities[option.id] || 1}
            onQuantityChange={(newQuantity) => onQuantityChange(option.id, newQuantity)}
            isRadio={category.isRadio}
            language={language}
            t={t}
            isClientMode={isClientMode}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingCategory;
