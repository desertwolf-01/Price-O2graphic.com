import React, { useEffect, useState, useCallback } from 'react';
import { ShieldAlert, Lock, EyeOff, AlertTriangle } from 'lucide-react';
import WatermarkOverlay from './WatermarkOverlay';

interface SecurityGuardProps {
  language: 'ar' | 'en';
}

export const SecurityGuard: React.FC<SecurityGuardProps> = ({ language }) => {
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [isShieldActive, setIsShieldActive] = useState(false);
  const isArabic = language === 'ar';

  const showToast = useCallback((msg: string) => {
    setWarningMessage(msg);
    const timer = setTimeout(() => {
      setWarningMessage(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const triggerScreenshotShield = useCallback(() => {
    setIsShieldActive(true);
    showToast(
      isArabic
        ? '⚠️ تم رصد محاولة التقاط الشاشة. الأسعار والمعايير محمية بحقوق الملكية الفكرية لـ O2Graphic.'
        : '⚠️ Screenshot attempt detected. Pricing structures are proprietary to O2Graphic.'
    );

    // Attempt to clear or overwrite clipboard to prevent pasted screenshots
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(
        isArabic
          ? 'وثيقة تسعير سرية ومحمية قانونياً - O2Graphic © All Rights Reserved'
          : 'Confidential Proprietary Rate Card - O2Graphic © All Rights Reserved'
      ).catch(() => {});
    }

    // Shield remains for a brief moment then gracefully restores
    const shieldTimer = setTimeout(() => {
      setIsShieldActive(false);
    }, 1800);

    return () => clearTimeout(shieldTimer);
  }, [isArabic, showToast]);

  useEffect(() => {
    // 1. Disable Context Menu (Right Click)
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Allow right click ONLY inside inputs/textareas if needed for paste
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      e.preventDefault();
      showToast(
        isArabic
          ? '🔒 النقر بزر الفأرة الأيمن معطل لحماية حقوق الملكية والسرية التجارية.'
          : '🔒 Context menu is disabled to protect proprietary trade secrets.'
      );
    };

    // 2. Prevent Copy / Cut outside inputs
    const handleCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      e.preventDefault();
      if (e.clipboardData) {
        e.clipboardData.setData(
          'text/plain',
          isArabic
            ? 'محتوى محمي بحقوق الملكية الفكرية والسرية التجارية لـ O2Graphic - يُحظر النسخ'
            : 'Confidential & Proprietary to O2Graphic - Copying Prohibited'
        );
      }
      showToast(
        isArabic
          ? '🔒 نسخ النصوص وهياكل الأسعار معطل بموجب حقوق الملكية الفكرية.'
          : '🔒 Copying pricing details is restricted under intellectual property rights.'
      );
    };

    const handleCut = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      e.preventDefault();
    };

    // 3. Intercept Keyboard Shortcuts (PrintScreen, Mac screenshot, DevTools, Save)
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

      // PrintScreen key
      if (e.key === 'PrintScreen' || e.code === 'PrintScreen' || e.keyCode === 44) {
        e.preventDefault();
        triggerScreenshotShield();
        return;
      }

      // Windows Snipping Tool (Win + Shift + S) or Mac Screenshot (Cmd + Shift + 3 / 4 / 5)
      if (
        (e.shiftKey && (e.metaKey || e.ctrlKey) && (e.key === 's' || e.key === 'S' || e.key === '3' || e.key === '4' || e.key === '5'))
      ) {
        // Blur screen to protect content before capture initiates
        triggerScreenshotShield();
        return;
      }

      // Copy shortcut (Ctrl+C / Cmd+C) outside input
      if (!isInput && (e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        showToast(
          isArabic
            ? '🔒 نسخ النصوص وهياكل الأسعار معطل لحماية السرية التجارية.'
            : '🔒 Text copying is disabled to protect proprietary pricing.'
        );
        return;
      }

      // Save page shortcut (Ctrl+S / Cmd+S)
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S') && !e.shiftKey) {
        e.preventDefault();
        showToast(
          isArabic
            ? '🔒 حفظ الصفحة معطل لحماية حقوق الملكية والسرية التجارية.'
            : '🔒 Saving this rate proposal is restricted.'
        );
        return;
      }

      // View Source / DevTools shortcuts (F12, Ctrl+U, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C)
      if (
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'i' || e.key === 'I' || e.key === 'j' || e.key === 'J' || e.key === 'c' || e.key === 'C'))
      ) {
        e.preventDefault();
        showToast(
          isArabic
            ? '🔒 الوصول لرموز المصدر وأدوات المطورين محظور لحماية الملكية الفكرية.'
            : '🔒 Developer tools and source inspection are restricted.'
        );
        return;
      }

      // Print shortcut (Ctrl+P / Cmd+P)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        // Allow the user to know it's proprietary
        showToast(
          isArabic
            ? '📄 تنبيه: هذه الوثيقة سرية ومخصصة للعميل فقط ويُحظر تداولها خارجياً.'
            : '📄 Note: This is a confidential proposal intended strictly for the client.'
        );
      }
    };

    // 4. Detect Window Blur when taking external snips
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen' || e.code === 'PrintScreen' || e.keyCode === 44) {
        triggerScreenshotShield();
      }
    };

    // 5. Drag prevention for images
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    window.addEventListener('contextmenu', handleContextMenu, { capture: true });
    window.addEventListener('copy', handleCopy, { capture: true });
    window.addEventListener('cut', handleCut, { capture: true });
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    window.addEventListener('keyup', handleKeyUp, { capture: true });
    window.addEventListener('dragstart', handleDragStart, { capture: true });

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu, { capture: true });
      window.removeEventListener('copy', handleCopy, { capture: true });
      window.removeEventListener('cut', handleCut, { capture: true });
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      window.removeEventListener('keyup', handleKeyUp, { capture: true });
      window.removeEventListener('dragstart', handleDragStart, { capture: true });
    };
  }, [isArabic, showToast, triggerScreenshotShield]);

  return (
    <>
      {/* 1. Subtle 'O2Graphic' Transparent Watermark Pattern Layer (Anti-Capture / Anti-Copy) */}
      <WatermarkOverlay />

      {/* 2. Fullscreen Anti-Screenshot Privacy Shield */}
      {isShieldActive && (
        <div 
          className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center text-white select-none transition-all duration-300"
          style={{ direction: isArabic ? 'rtl' : 'ltr' }}
        >
          <div className="w-20 h-20 rounded-3xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-6 shadow-2xl animate-pulse">
            <EyeOff className="w-10 h-10 text-blue-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black mb-3 text-white tracking-tight">
            {isArabic ? 'حماية سرية الأسعار نشطة' : 'Proprietary Rate Protection Active'}
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-lg leading-relaxed mb-6">
            {isArabic
              ? 'تم حجب الشاشة مؤقتاً لمنع تصوير وتداول الأسعار والمعايير التشغيلية الحصرية لـ O2Graphic.'
              : 'Screen view temporarily shielded to prevent unauthorized capture and competitor scraping.'}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>O2GRAPHIC ANTI-SCRAPING SYSTEM • PROTECTED</span>
          </div>
        </div>
      )}

      {/* 3. Security Warning Floating Toast */}
      {warningMessage && (
        <div 
          className={`fixed bottom-20 ${isArabic ? 'right-4 sm:right-6' : 'left-4 sm:left-6'} z-[9998] max-w-md p-4 rounded-2xl bg-slate-900/95 text-white dark:bg-slate-800/95 border border-slate-700/80 shadow-2xl backdrop-blur-md flex items-start gap-3.5 transition-all duration-300 animate-fadeIn`}
          style={{ direction: isArabic ? 'rtl' : 'ltr' }}
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                {isArabic ? 'إشعار الحماية الأمنية' : 'Security Alert'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span className="text-[10px] text-slate-400">O2Graphic IP</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-200">
              {warningMessage}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SecurityGuard;
