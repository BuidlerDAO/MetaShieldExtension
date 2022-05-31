/* eslint-disable camelcase */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translation_en from './en';
import translation_zh from './zh';

const resources = {
    en: {
        translation: translation_en
    },
    zh: {
        translation: translation_zh
    }
};

let lang = 'en';
const type = navigator.appName;
if (type === 'Netscape') {
    lang = navigator.language;// 获取浏览器配置语言，支持非IE浏览器
} else {
    lang = navigator.userLanguage;// 获取浏览器配置语言，支持IE5+ == navigator.systemLanguage
}
lang = lang.substring(0, 2);

i18n.use(initReactI18next).init({
    resources,
    lng: lang,
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
