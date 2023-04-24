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