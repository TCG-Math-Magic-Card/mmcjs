import CardDrawer from "./cardDrawer";
import CardFile from "./cardFile";

import defaultConfig from "./config/defualtConfig";

const defaultEvent = () => null;

export class Card {
    constructor({
        data,
        canvas,
        size,
        config = defaultConfig,
        moldPath = "./mold",
        fontLoaded = defaultEvent,
        imageLoaded = defaultEvent,
        fontsLoaded = defaultEvent,
        imagesLoaded = defaultEvent,
        picLoaded = defaultEvent,
        loaded = defaultEvent,
        autoResize = true,
        verbose = false,
    }) {
        this.RATE = 1185 / 813;
        this.data = data;
        this.config = config;
        this.key = data._id;// 这个值暂时不使用
        console.log(config);
        if (moldPath[moldPath.length - 1] === "/") {
            moldPath = moldPath.substring(0, moldPath.length - 1);
        }
        this.moldPath = moldPath;

        // 注册一批回调
        this.fontLoaded = fontLoaded;
        this.imageLoaded = imageLoaded;
        this.fontsLoaded = fontsLoaded;
        this.imagesLoaded = imagesLoaded;
        this.picLoaded = picLoaded;
        this.loaded = loaded;


        this.verbose = verbose;
        this.autoResize = autoResize;
        this.renderState = false;
        // 这里的数据暂时不做任何处理
        this.data = data;
        this.size = size;
        if (canvas) {
            this.bind(canvas, size);
        }
    }

    bind(canvas, size) {
        this.canvas = canvas;
        let ratio = this.getPixelRatio;
        if (size) {
            this.size = [size[0] * ratio, size[1] * ratio];
        } else {
            if (!this.size) {
                this.size = this.ansysSize();
                if (this.autoResize) {
                    // 当canvas实际尺寸发生变化时，提交一个canvas重绘的异步请求
                    this.sizeObserver = new ResizeObserver(() => {
                        this.resize();
                    });
                    this.sizeObserver.observe(this.canvas);
                    /*
                    重绘函数中会调整canvas尺寸属性，这会再次引起ResizeObserver的回调，从而无限迭代
                    使用MutationObserver监听canvas尺寸属性的变化，清空重绘的事件队列，切断迭代
                    */
                    this.attriObserver = new MutationObserver(() => {
                        if (this.resizer) {
                            clearTimeout(this.resizer);
                            this.resizer = null;
                        }
                    });
                    this.attriObserver.observe(this.canvas, {
                        attributes: true,
                        attributeFilter: ["width", "height"],
                    });
                }
            } else {
                this.size = [this.size[0] * ratio, this.size[1] * ratio];
            }
        }
        // 设置绘画类
        this.cardDrawer = new CardDrawer(this);
        // 设置要加载的文件类
        this.cardFile = new CardFile(this);
    }

    rounded(num) {
        let rounded = (0.5 + num) | 0;
        rounded = ~~(0.5 + num);
        rounded = (0.5 + num) << 0;
        return rounded;
    }

    render() {
        // 这里才进行绘制
        this.cardFile.loadAll();
    }

    draw(size, config) {
        console.log('test')
        if (this.renderState) {
            this.cardDrawer.draw(this.data, this.cardFile.fileContent, size, config);
        }
    }

    resize(delay = 500) {
        if (this.resizer) {
            clearTimeout(this.resizer);
        }

        this.resizer = setTimeout(() => {
            this._resize_();
        }, delay);
    }

    _resize_() {
        this.size = this.ansysSize();
        this.draw(this.size);
    }

    ansysSize() {
        let ratio = this.getPixelRatio;
        let w = ratio * this.canvas.clientWidth;
        let h = ratio * this.canvas.clientHeight;

        let currentRate = h / w;
        if (currentRate > this.RATE) {
            h = w * this.RATE;
        } else if (this.RATE > currentRate) {
            w = h / this.RATE;
        }

        w = this.rounded(w);
        h = this.rounded(h);

        if (
            Math.abs(w - this.canvas.width) / this.canvas.width <= 0.01 ||
            Math.abs(h - this.canvas.height) / this.canvas.height <= 0.01
        ) {
            return [this.canvas.width, this.canvas.height];
        } else {
            return [w, h];
        }
    }

    get getPixelRatio() {
        let context = this.canvas.getContext("2d");
        let backingStore =
            context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio ||
            1;

        return (window.devicePixelRatio || 1) / backingStore;
    }
}

export const configs = {
    defualt: defaultConfig
};