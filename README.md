# React Locale (React, React-Native supported)

Highly customizable small size library for providing support for language localization!
- Supports fetching translated content from the server and update the content later


## Getting Started

```bash
$ yarn add react-locale-language
```

*or via

```bash
$ npm i react-locale-language
```

### Example of usage:

```js
import { LocalizeContextProvider, LocalizeContext, SetContent } from 'react-locale-language';

const RootApp = () => {
    const languageContent = {
        "en-US": {
            hello: "Hello ${name}, How are you feeling today?", 
            welcome: "Welcome aboard",
        }
    };

    return (
        // value && languageCode is optional here, SetContent can also be used to update the content later and changeLanguage can be used to update the language setting 
        <LocalizeContextProvider value={languageContent} languageCode="en-US" >
            <ThemeContextProvider value={uiTheme}>
                <Landing />
            </ThemeContextProvider>
        </LocalizeContextProvider>
    )
}

const Landing = () =>  {
    const { translate,  changeLanguage } = useContext(LocalizeContext);

    useEffect(() => {
        // using setTimeout just to mimic the pattern of fetching data for different languages from the server

        // its not necessary to load the translated texts in all the available languages at once

        setTimeout(() => {
            SetContent({
                'hi-IN': {
                    hello: "हैलो ${name}, आज आप कैसा महसूस कर रहे हैं?",
                    welcome: "स्वागत है",
                }
            })

            // as soon as content is set, can change the default language
            changeLanguage('hi-IN'); // this will reflect the change across the app
            // incase there is no translation for this language, first added langauge content would become default
        }, 2000);
    })
    return (
        // ${name} will be replaced by the value of object having key 'name' which is passed as second argument in translate
        <div>
            <h1> {translate('hello', { name: 'Rishu' })} </h1>
            <h3> {translate('welcome')} </h3>
        </div>
    )
}


// outputs:
<div>
    <h1> हैलो Rishu, आज आप कैसा महसूस कर रहे हैं? </h1>
    <h3> स्वागत है </h3>
</div>
```


## Special Note for React-Native Users

Since this library doesn't need to be linked in order to get the device's locale 

below method can be used to fetch the langauge set on the device

Source - [StackOverflow](https://stackoverflow.com/a/47349998/3293927)

```js
import { Platform, NativeModules } from 'react-native';

function getLocale() {
    const deviceLanguage =
        Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
            : NativeModules.I18nManager.localeIdentifier;

    return deviceLanguage.replace(/_/, '-');
}

changeLanguage(getLocale());
```