let LanguageArray = ['en'];
let Contents = {};

export function SetLangauges(languageArray) {
    if (!Array.isArray(languageArray)) return;
    LanguageArray = languageArray;
}

export function GetLangauges() {
    return LanguageArray;
}

export function UpdateContent(content, override) {
    let langaugeKeys = Object.keys(content);
    if (!override) {
        langaugeKeys = [...LanguageArray, ...langaugeKeys];
        Contents = { ...Contents, ...content };
    } else {
        Contents = { ...content };
    }
    SetLangauges(langaugeKeys);
    return Contents;
}

export function GetContent() {
    return Contents;
}