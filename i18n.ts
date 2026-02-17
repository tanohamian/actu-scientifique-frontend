import {getRequestConfig} from 'next-intl/server';
import {headers} from 'next/headers';

const locales = ['fr', 'en'];

export default getRequestConfig(async () => {
  const headerList = await headers();
  const localeHeader = headerList.get('X-NEXT-INTL-LOCALE');
  
  const locale = localeHeader || 'fr';

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});