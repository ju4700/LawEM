/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'bn',
    locales: ['en', 'bn'],
    localeDetection: false,
  },
  fallbackLng: {
    default: ['bn'],
  },
  debug: process.env.NODE_ENV === 'development',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
