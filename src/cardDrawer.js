export default class CardDrawer {
    constructor(admin) {
      this.admin = admin;
      this.canvas = this.admin.canvas.getContext("2d");
    }
}