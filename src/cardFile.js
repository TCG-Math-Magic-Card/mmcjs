export default class CardFile {
    constructor(admin) {
        this.admin = admin;
    }

    draw(...arg) {
        this.admin.draw(...arg);
    }

    async loadAll() {
        this.fileContent = await this.getFiles(this.fileList);
        this.admin.renderState = true;
        this.draw();
        // 加载全部的图片
        // 加载背景
        // 获取要加载的图片的列表
        // 加载字体文件
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
        return res;
    }
}