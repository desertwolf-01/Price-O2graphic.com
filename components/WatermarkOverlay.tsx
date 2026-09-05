import React, { useMemo } from 'react';
import { generateWatermarkPattern, WatermarkConfig } from '../utils/watermark';

interface WatermarkOverlayProps {
  /** Optional custom text override */
  primaryText?: string;
  /** Optional secondary text override */
  secondaryText?: string;
  /** Opacity override (default: 0.10 / 10%) */
  opacity?: number;
  className?: string;
  /** Custom config */
  config?: Partial<WatermarkConfig>;
}

export const WatermarkOverlay: React.FC<WatermarkOverlayProps> = ({
  primaryText = 'O2Graphic',
  secondaryText = 'CONFIDENTIAL PROPOSAL • DO NOT DISTRIBUTE',
  opacity = 0.10,
  className = '',
  config = {},
}) => {
  // Generate light & dark pattern URLs using the watermark generator function
  const lightPatternUrl = useMemo(() => {
    return generateWatermarkPattern({
      primaryText,
      secondaryText,
      color: '#334155', // slate-700
      ...config,
    });
  }, [primaryText, secondaryText, config]);

  const darkPatternUrl = useMemo(() => {
    return generateWatermarkPattern({
      primaryText,
      secondaryText,
      color: '#94a3b8', // slate-400
      ...config,
    });
  }, [primaryText, secondaryText, config]);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-30 select-none overflow-hidden transition-opacity duration-300 ${className}`}
    >
      {/* Light Mode Watermark Tile */}
      <div
        className="w-full h-full dark:hidden"
        style={{
          backgroundImage: `url("${lightPatternUrl}")`,
          backgroundRepeat: 'repeat',
          backgroundPosition: '0 0',
          opacity: opacity,
        }}
      />
      {/* Dark Mode Watermark Tile */}
      <div
        className="w-full h-full hidden dark:block"
        style={{
          backgroundImage: `url("${darkPatternUrl}")`,
          backgroundRepeat: 'repeat',
          backgroundPosition: '0 0',
          opacity: opacity,
        }}
      />
    </div>
  );
};

export default WatermarkOverlay;
