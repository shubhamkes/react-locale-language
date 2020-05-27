import React from 'react';
import LocalizedStrings from 'react-localization';
import { UpdateContent } from './langauges';


const contents = {};
function SetContent(content, override) {
    content = UpdateContent(content, override);
    strings.setContent(content);
}

let strings = new LocalizedStrings({ "en-US": {} });

const getTranslation = (key, ObjectValueResolver) => {
    if (ObjectValueResolver) {
        return strings.formatString(key, ObjectValueResolver)
    }
    return strings[key];
}

const initialState = {
    langCode: 'en',
    translate: getTranslation
}

const I18nContext = React.createContext(initialState);

const I18nContextProvider = ({ children, value }) => {
    let isRTL = false;

    if (value && typeof value == 'object' && Object.keys(value).length) {
        SetContent(value, true);
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'setlanguage':
                strings.setLanguage(action.payload);
                return {
                    langCode: action.payload,
                    translate: getTranslation
                }

            default:
                return { ...initialState };
        }
    }

    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <I18nContext.Provider value={{ ...state, isRTL, dispatch }} >
            {children}
        </I18nContext.Provider>
    )
}

export { I18nContext, I18nContextProvider, SetContent };
