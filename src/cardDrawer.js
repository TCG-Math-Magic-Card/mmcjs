export default class CardDrawer {
    constructor(admin) {
        this.admin = admin;
        this.canvas = this.admin.canvas.getContext("2d");
    }

    draw(
        cardData,
        fileContent,
        size = this.admin.size,
        config = this.admin.config.style,
        callback
    ) {
        this.admin.canvas.width = size[0];
        this.admin.canvas.height = size[1];
        const r = size[0] / config.moldSize[0];
        const c = this.canvas;
        // 绘制基本骨架
        // draw card frame
        try {
            if (fileContent.mold) {
                c.drawImage(
                    fileContent.mold,
                    0,
                    0,
                    config.moldSize[0],
                    config.moldSize[1],
                    0,
                    0,
                    size[0],
                    size[1]
                );
            }
        } catch (e) {
            return;
        }
        // 这里是真实的绘制了！
        // callbacks
        if (this.admin.loaded instanceof Function) {
            this.admin.loaded();
        }
        if (callback instanceof Function) {
            callback();
        }
    }
}