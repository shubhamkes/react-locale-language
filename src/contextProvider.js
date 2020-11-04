import React, { useState } from 'react';
import LocalizedStrings from 'react-localization';

import { UpdateContent } from './langauges';

const LocalizeContext = React.createContext({});

let Translate = () => { };

const LocalizeContextProvider = ({ children, value = { "en-US": {} }, languageCode }) => {

    let i = 0;
    // const strings = new LocalizedStrings(value);
    let [strings, setStrings] = useState(new LocalizedStrings(value));


    const initialState = {
        langCode: "en-US",
        translate: getTranslation,
        setContent
    }

    function setContent(content, override) {
        content = UpdateContent(content, override);
        strings.setContent(content);
        setStrings(strings);
    }

    function getTranslation(key, ObjectValueResolver) {
        if (ObjectValueResolver) {
            return strings.formatString(strings[key], ObjectValueResolver)
        }
        return strings[key];
    }

    // @TODO add support for rtl
    let isRTL = false;

    const reducer = (state, action) => {
        if (!action) {
            return state;
        }

        strings.setLanguage(action);
        initialState.langCode = action;
        return {
            langCode: action,
            translate: getTranslation,
            setContent
        }
    }

    const [state, dispatch] = React.useReducer(reducer, initialState);

    Translate = getTranslation;

    React.useEffect(() => {
        if (languageCode && initialState.langCode != languageCode) {
            initialState.langCode = languageCode;
            dispatch(languageCode);
        }
    }, []);


    return (
        <LocalizeContext.Provider value={{ ...initialState, ...state, strings, isRTL, changeLanguage: dispatch }} >
            {children}
        </LocalizeContext.Provider>
    )
}

export { LocalizeContext, LocalizeContextProvider, Translate };
