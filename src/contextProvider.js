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
        return strings.formatString(strings[key], ObjectValueResolver)
    }
    return strings[key];
}

const initialState = {
    langCode: 'en',
    translate: getTranslation
}

const LocalizeContext = React.createContext(initialState);

const LocalizeContextProvider = ({ children, value, languageCode }) => {

    // @TODO add support for rtl
    let isRTL = false;

    if (value && typeof value == 'object' && Object.keys(value).length) {
        SetContent(value, true);
    }

    const reducer = (state, action) => {
        strings.setLanguage(action);
        return {
            langCode: action,
            translate: getTranslation
        }
    }

    const [state, dispatch] = React.useReducer(reducer, initialState);

    if (languageCode) {
        dispatch(languageCode);
    }

    return (
        <LocalizeContext.Provider value={{ ...state, isRTL, changeLanguage: dispatch }} >
            {children}
        </LocalizeContext.Provider>
    )
}

export { LocalizeContext, LocalizeContextProvider, SetContent };
