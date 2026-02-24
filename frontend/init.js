import i18next from 'i18next'
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import ru from './src/locales/ru'
import en from './src/locales/en'



i18next
.use(initReactI18next)
.use(LanguageDetector)
.init({
    resources: {en, ru}, // Where we're gonna put translations' files
    fallbackLng: 'ru',
    debug: true,
    interpolation: {
    escapeValue: false
    }
   });
   export default i18next