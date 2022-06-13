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
lang = lang.substring(0, 2) === 'zh' ? 'zh' : 'en';

// If current webpage dose not support utf-8, then use 'en'
if (lang === 'zh') {
    const metaArr = document.querySelector('head').getElementsByTagName('meta');
    if (metaArr.length >= 1) {
        let metaString = '';
        metaArr.forEach((metaTag) => {
            metaString += metaTag.outerHTML;
        });
        if (!metaString.includes('charset="utf-8"')) {
            console.log('UTF-8 not supported');
            lang = 'en';
        }
    } else {
        lang = 'en';
        console.log('UTF-8 not supported');
    }
}

i18n.use(initReactI18next).init({
    resources,
    lng: lang,
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
