import { Cloud } from "./ajax";

const YGOCARDDATA = "__MATHMAGICCARDDATA__";
export default class CardFile {
    constructor(admin) {
        this.admin = admin;
        if (!window[YGOCARDDATA]) {
            window[YGOCARDDATA] = {};
        }
        if (!window[YGOCARDDATA].cardPicCache) {
            window[YGOCARDDATA].cardPicCache = {};
        }
        if (!window[YGOCARDDATA].fontMap) {
            let fontBox = document.createElement("div");
            fontBox.style.width = "0";
            fontBox.style.height = "0";
            fontBox.style.overflow = "hidden";
            document.body.appendChild(fontBox);
            window[YGOCARDDATA].fontMap = {
                fontBox,
            };
        }
    }

    draw(...arg) {
        this.admin.draw(...arg);
    }

    async loadCardPic() {
        // 如果指定了地址的话就不进行加载？
        let url = this.admin.getPic(this.admin.data._id);
        if (this.admin.data.pic) {
            url = this.admin.data.pic;
        }
        const cardPicCache = window[YGOCARDDATA].cardPicCache;
        if (cardPicCache.hasOwnProperty(url)) {
            let res = cardPicCache[url];
            if (res instanceof Promise) {
                await res.then((pic) => {
                    this.fileContent.pic = pic;
                });
            } else {
                this.fileContent.pic = res;
            }
        } else {
            cardPicCache[url] = new Promise((resolve) => {
                this.getCorsPic(url)
                    .then((pic) => {
                        this.fileContent.pic = pic;
                        cardPicCache[url] = pic;
                    })
                    .finally(() => {
                        resolve();
                    });
            });

            await cardPicCache[url];
        }

        this.admin.picLoaded();

        return true;
    }

    // 加载数据
    async loadFormulaPic() {
        // 如果指定了地址的话就不进行加载？
        // fixme没有公式时的修复？
        let url = this.admin.getPic(this.admin.data._id);
        if (this.admin.data.formulaPic) {
            url = this.admin.data.formulaPic;
        }
        const cardPicCache = window[YGOCARDDATA].cardPicCache;
        if (cardPicCache.hasOwnProperty(url)) {
            let res = cardPicCache[url];
            if (res instanceof Promise) {
                console.log('数据来自查询')
                await res.then((pic) => {
                    this.fileContent.formulaPic = pic;
                });
            } else {
                console.log('数据来自缓存')
                this.fileContent.formulaPic = res;
            }
        } else {
            cardPicCache[url] = new Promise((resolve) => {
                this.getCorsPic(url)
                    .then((pic) => {
                        console.log('设置查询内容')
                        this.fileContent.formulaPic = pic;
                        cardPicCache[url] = pic;
                    })
                    .finally(() => {
                        resolve();
                    });
            });

            await cardPicCache[url];
        }

        this.admin.picLoaded();

        return true;
    }


    getCorsPic(url) {
        return Cloud({
            method: "GET",
            path: url,
            responseType: "blob",
        })
            .then((blob) => {
                let base64 = URL.createObjectURL(blob);
                return this.download(base64);
            })
            .catch((e) => console.log(e));
    }


    async loadAll() {
        this.fileContent = await this.getFiles(this.fileList);
        this.admin.renderState = true;
        this.draw();
        // 加载全部的图片
        // 加载背景
        await this.loadCardPic().then(() => {
            console.log('图片加载成功');
            this.draw();
        }).catch(err => {
            console.info('图片加载失败');
            console.error(err);
        })

        // 加载公式图片
        await this.loadFormulaPic().then(() => {
            console.log('公式加载成功');
            this.draw();
        }).catch(err => {
            console.info('公式加载成功加载失败');
            console.error(err);
        })
        // 获取要加载的图片的列表
        // 加载字体文件
        await this.loadFonts(this.admin.config.fonts).then(() => {
            setTimeout(() => {
                this.draw();
            }, 1000);
        });
    }

    async getFiles(files) {
        let res = {};
        for (let key in files) {
            res[key] = await this.getFile(files[key]);
        }

        return res;
    }

    async fileExist(name) {
        return new Promise((resolve, reject) => {
            let res = localStorage.getItem(name);
            if (res) {
                console.log(name, "load localstorage");
                let img = document.createElement("img");
                img.src = res;
                img.setAttribute("crossOrigin", "anonymous");
                img.onload = function () {
                    resolve(img);
                };
                img.onerror = function (err) {
                    reject(err);
                };
            } else {
                resolve(false);
            }
        });
    }

    download(file) {
        return new Promise((resolve, reject) => {
            let img = document.createElement("img");
            img.src = file;
            img.setAttribute("crossOrigin", "anonymous");
            img.onload = function () {
                console.log('图像加载完成')
                resolve(img);
            };
            img.onerror = function (err) {
                reject(err);
            };
        });
    }

    async getFile(file, save = true) {
        let fileContent = await this.fileExist(file);
        if (!fileContent) {
            fileContent = await this.download(file);
            if (save) {
                this.saveImage(file, fileContent);
            }
        }
        return fileContent;
    }

    saveImage(key, image) {
        let canvas = document.createElement("canvas");
        let c = canvas.getContext("2d");

        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        c.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);

        let data = canvas.toDataURL("image/png");
        try {
            localStorage.setItem(key, data);
            // 记录模板版本
            console.log(key, "successful save the image");
        } catch (e) {
            console.log("Storage failed: " + e);
        }
    }

    get fileList() {
        const path = this.admin.moldPath + "/";
        const data = this.admin.data;
        let res = {};
        res.mold = path + "frame/mold_frame.png";
        // TODO 这里要配置生成 Type的图片
        let typeUrl = path + "type/value.png";
        if (data.type) {
            switch (data.type) {
                case 'value':
                    // 值
                    break;
                case 'value-assertion':
                    // 值-断言
                    typeUrl = path + "type/value-assertion.png";
                    break;
                case 'assertion':
                    typeUrl = path + "type/assertion.png";
                    // 断言
                    break;
                case 'operator':
                    typeUrl = path + "type/operator.png";
                    // 算子
                    break;
                case 'operator-value':
                    // 算子值
                    typeUrl = path + "type/operator-value";
                    break;
                case 'function':
                    // 函数
                    typeUrl = path + "type/function";
                    break;
                case 'legend':
                    // 传奇卡
                    typeUrl = path + "type/legend.png";
                    break;
                case 'rainbow':
                    // 🌈彩虹传奇
                    typeUrl = path + "type/rainbow.png";
                    break;
                default:
            }
            res.type = typeUrl;
        }
        return res;
    }

    async loadFont(url, name) {
        if (window[YGOCARDDATA].fontMap[name] === 1) {
            var css = document.createElement("style");
            css.setAttribute("type", "text/css");
            css.setAttribute("crossOrigin", "anonymous");
            css.setAttribute("class", name);
            let data =
                `
          @font-face {
            font-family: '` +
                name +
                `';
            src: url('` +
                url +
                `');
          }`;
            css.appendChild(document.createTextNode(data));
            document.head.appendChild(css);

            let p = document.createElement("p");
            p.innerText = "MMC";
            p.style.fontFamily = name;
            window[YGOCARDDATA].fontMap.fontBox.appendChild(p);

            window[YGOCARDDATA].fontMap[name] = 2;

            let font = await Cloud({
                method: "GET",
                path: url,
            });

            window[YGOCARDDATA].fontMap[name] = 3;
            return font;
        } else if (window[YGOCARDDATA].fontMap[name] === 2) {
            let font = await Cloud({
                method: "GET",
                path: url,
            });

            window[YGOCARDDATA].fontMap[name] = 3;
            return font;
        }
    }



    loadFonts(fonts) {
        for (let fontName in this.admin.config.fonts) {
            if (!window[YGOCARDDATA].fontMap.hasOwnProperty(fontName)) {
                window[YGOCARDDATA].fontMap[fontName] = 1;
            }
        }

        let fontslist = [];
        for (let fontName in fonts) {
            if (window[YGOCARDDATA].fontMap[fontName] !== 3) {
                let path;
                if (fonts[fontName]["type"] === "relative") {
                    path = this.admin.moldPath + "/font/" + fonts[fontName]["name"];
                } else {
                    path = fonts[fontName]["name"];
                }

                this.admin.fontLoaded({
                    type: "font",
                    status: true,
                    content: fontName,
                });

                fontslist.push(this.loadFont(path, fontName));
            }
        }

        return Promise.all(fontslist).then(() => {
            this.admin.fontsLoaded({
                type: "end",
            });
        });
    }
}