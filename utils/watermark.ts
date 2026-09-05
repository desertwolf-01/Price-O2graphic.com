/**
 * Watermark Pattern Generator
 * Generates subtle, transparent repeating 'O2Graphic' vector watermark patterns
 * over the application layout to discourage unauthorized screenshots, scrapers, and competitors.
 */

export interface WatermarkConfig {
  /** Main brand or watermark text */
  primaryText?: string;
  /** Secondary security / confidentiality line */
  secondaryText?: string;
  /** Base font size for primary text (px) */
  fontSize?: number;
  /** Horizontal repetition distance (px) */
  tileWidth?: number;
  /** Vertical repetition distance (px) */
  tileHeight?: number;
  /** Counter-clockwise rotation angle in degrees */
  rotationAngle?: number;
  /** Optional custom text color */
  color?: string;
}

/**
 * Generates an optimized SVG data URI containing the repeating 'O2Graphic' watermark pattern.
 *
 * @param config Customizable watermark attributes
 * @returns SVG Data URI string ready to be used in CSS `backgroundImage`
 */
export function generateWatermarkPattern(config: WatermarkConfig = {}): string {
  const {
    primaryText = 'O2Graphic',
    secondaryText = 'CONFIDENTIAL PROPOSAL • DO NOT DISTRIBUTE',
    fontSize = 20,
    tileWidth = 380,
    tileHeight = 220,
    rotationAngle = -25,
    color = '#475569',
  } = config;

  const currentYear = new Date().getFullYear();
  const fullSecondaryText = `${secondaryText} • © ${currentYear}`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${tileWidth}" height="${tileHeight}">
    <style>
      .brand-title {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-size: ${fontSize}px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        fill: ${color};
      }
      .security-sub {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: ${Math.round(fontSize * 0.45)}px;
        font-weight: 700;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        fill: ${color};
      }
    </style>
    <g transform="translate(${tileWidth / 2}, ${tileHeight / 2}) rotate(${rotationAngle})">
      <text x="0" y="-4" text-anchor="middle" class="brand-title">${primaryText}</text>
      <text x="0" y="${Math.round(fontSize * 0.85)}" text-anchor="middle" class="security-sub">${fullSecondaryText}</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export default generateWatermarkPattern;
