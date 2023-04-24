export default class CardFile{
    constructor(admin){
        this.admin = admin;
    }

    draw(...arg) {
        this.admin.draw(...arg);
    }

    async loadAll() {
        this.renderState = true;
        this.draw();
        // 加载全部的图片
        // 加载背景
        // 获取要加载的图片的列表
        // 加载字体文件
    }
}