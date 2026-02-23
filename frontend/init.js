import i18next from 'i18next'
import { useTranslation, initReactI18next } from "react-i18next";
import ru from './src/locales/ru'
import en from './src/locales/en'



i18n.use(initReactI18next).init({
    resources: {en, ru}, // Where we're gonna put translations' files
    lng: "ru",     // Set the initial language of the App
   });