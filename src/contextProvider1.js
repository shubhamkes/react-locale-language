import React from 'react';

const ES = {
    "edit_and_save": "Editar src/App.js y guardar para recargar.",
    "learn_react": "Aprender React"
}

const TR = {
    "edit_and_save": "Sayfayı yenilemek icin src/App.js dosyasında değişiklik yapın ve kaydedin.",
    "learn_react": "React Öğrenin"
}


const EN = {
    "edit_and_save": "Edit src/App.js and save to reload.",
    "learn_react": "Learn React"
}
// To make it easier to read from JSON files
const translations = {
    en: EN,
    tr: TR,
    es: ES,
};

const getTranslation = langCode => (key) => translations[langCode][key] || key;

const initialState = {
    langCode: 'en',
    translate: getTranslation('en')
}

const I18nContext = React.createContext(initialState);

const I18nContextProvider = ({ children }) => {
    const reducer = (state, action) => {
        switch (action.type) {
            case 'setlanguage':
                return {
                    langCode: action.payload,
                    translate: getTranslation(action.payload)
                }

            default:
                return { ...initialState };
        }
    }

    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <I18nContext.Provider value={{ ...state, dispatch }} >
            {children}
        </I18nContext.Provider>
    )
}

export { I18nContext, I18nContextProvider };



// import ReactNative from 'react-native';
// import I18n from 'react-native-i18n';

// // Import all locales
// import en from './en.json';
// import he from './he.json';

// // Should the app fallback to English if user locale doesn't exists
// I18n.fallbacks = true;

// // Define the supported translations
// I18n.translations = {
//   en,
//   he
// };

// const currentLocale = I18n.currentLocale();

// // Is it a RTL language?
// export const isRTL = currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0;

// // Allow RTL alignment in RTL languages
// ReactNative.I18nManager.allowRTL(isRTL);

// // The method we'll use instead of a regular string
// export function strings(name, params = {}) {
//   return I18n.t(name, params);
// };

// export default I18n;