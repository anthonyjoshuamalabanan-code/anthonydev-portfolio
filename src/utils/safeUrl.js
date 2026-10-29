export default function safeUrl(value) {
  if (typeof value !== 'string' || /[\u0000-\u0020\u007f]/.test(value)) {
    throw new TypeError('Expected an HTTPS or mailto URL.');
  }

  const url = new URL(value);
  if (url.protocol !== 'https:' && url.protocol !== 'mailto:') {
    throw new TypeError('Only HTTPS and mailto URLs are allowed.');
  }

  if (url.protocol === 'https:' && (url.username || url.password)) {
    throw new TypeError('HTTPS URLs must not contain embedded credentials.');
  }

  return url.href;
}
