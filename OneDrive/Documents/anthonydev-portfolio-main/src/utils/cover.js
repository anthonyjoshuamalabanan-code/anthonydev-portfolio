// Generates lightweight abstract project covers as inline SVG (no image files to download).
const layouts = [
  // 0: landing page
  () =>
    `<rect x="60" y="90" width="270" height="22" rx="11" fill="#fff" fill-opacity=".9"/>
     <rect x="60" y="130" width="200" height="22" rx="11" fill="#fff" fill-opacity=".55"/>
     <rect x="60" y="190" width="160" height="14" rx="7" fill="#fff" fill-opacity=".35"/>
     <rect x="60" y="215" width="120" height="14" rx="7" fill="#fff" fill-opacity=".35"/>
     <rect x="60" y="262" width="112" height="38" rx="19" fill="#fff"/>
     <circle cx="470" cy="190" r="100" fill="#fff" fill-opacity=".16"/>
     <circle cx="500" cy="165" r="56" fill="#fff" fill-opacity=".26"/>`,
  // 1: dashboard
  () => {
    const bars = [120, 180, 95, 215, 150, 240]
      .map((h, i) => `<rect x="${70 + i * 72}" y="${320 - h}" width="44" height="${h}" rx="10" fill="#fff" fill-opacity="${0.35 + i * 0.1}"/>`)
      .join('');
    return `<rect x="60" y="50" width="200" height="22" rx="11" fill="#fff" fill-opacity=".85"/>${bars}`;
  },
  // 2: shop
  () =>
    [60, 230, 400]
      .map(
        (x) =>
          `<rect x="${x}" y="70" width="140" height="190" rx="18" fill="#fff" fill-opacity=".22"/>
           <rect x="${x + 16}" y="86" width="108" height="96" rx="12" fill="#fff" fill-opacity=".4"/>
           <rect x="${x + 16}" y="198" width="80" height="12" rx="6" fill="#fff" fill-opacity=".9"/>
           <rect x="${x + 16}" y="222" width="50" height="12" rx="6" fill="#fff" fill-opacity=".55"/>`,
      )
      .join('') + `<rect x="60" y="292" width="140" height="36" rx="18" fill="#fff"/>`,
  // 3: app list
  () =>
    [0, 1, 2, 3]
      .map(
        (i) =>
          `<rect x="60" y="${60 + i * 72}" width="480" height="56" rx="16" fill="#fff" fill-opacity="${0.28 - i * 0.04}"/>
           <circle cx="92" cy="${88 + i * 72}" r="14" fill="#fff" fill-opacity=".85"/>
           <rect x="124" y="${78 + i * 72}" width="${220 - i * 24}" height="12" rx="6" fill="#fff" fill-opacity=".9"/>
           <rect x="124" y="${98 + i * 72}" width="${140 - i * 12}" height="9" rx="4" fill="#fff" fill-opacity=".5"/>`,
      )
      .join(''),
];

export function makeCover({ from, to, variant = 0 }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="600" height="380" fill="url(#g)"/>${layouts[variant % layouts.length]()}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
