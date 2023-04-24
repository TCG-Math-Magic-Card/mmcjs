import commonStyle from './common.js';

export default {
    moldName: "default",
    fonts: {
        en_name: {
            name: "en_name.ttf",
            type: "relative",
        },
        en: {
            name: "en.ttf",
            type: "relative",
        },
        cn: {
            name: "cn.ttf",
            type: "relative",
        },
    },
    style: Object.assign(JSON.parse(commonStyle), {
        fontMap: {
            name: "cn",
            desc: "cn",
            vp: "en",
            dp: "en"
        },
    }),
}