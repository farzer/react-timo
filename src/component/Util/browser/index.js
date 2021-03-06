import includes from 'lodash/includes';

function isMac() {
  return includes(window.navigator.userAgent, 'Mac');
}

function isFlexSupported() {
  if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
    const { documentElement } = window.document;
    return 'flex' in documentElement.style ||
      'webkitFlex' in documentElement.style ||
      'Flex' in documentElement.style ||
      'msFlex' in documentElement.style;
  }
  return false;
}

export {
  isMac,
  isFlexSupported
};