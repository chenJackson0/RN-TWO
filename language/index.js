import I18n from 'react-native-i18n';

import en from './en';//en为en.js的路径

import zh from './zh';

setLanguage =  () => {
    if(I18n.locale == 'zh-Hans-US'){ 
        I18n.locale = 'zh'
    }else{
        I18n.locale = 'en'
    }
}
setLanguage()
// I18n.defaultLocale = 'ch'; //设置默认的语言

I18n.fallback = true;        //设置

// I18n.locale = 'ch';           //设置当前的语言

I18n.translations = {     //支持的语言列表
    en,
    zh
};

export function strings(name, params = {}) {//params默认为json类型

return I18n.t(name, params);

}
export default I18n;