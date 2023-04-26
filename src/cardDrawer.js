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

        // 绘制图片
        try {
            if (fileContent.pic) {
                c.drawImage(
                    fileContent.pic,
                    config.pic[0] * r,
                    config.pic[1] * r,
                    config.pic[2] * r,
                    config.pic[3] * r
                );
            }
        } catch (err) {
            console.error(err)
            return;
        }

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
        try{
          if (cardData.svg){
            c.drawImage(
              cardData.svg,
              config.formula.position[0] * r,
              config.formula.position[1] * r,
              config.formula.position[2] * r,
              config.formula.position[3] * r,
            );
          }
        }catch(err){
          console.error(err);
          return;
        }

        // 这里是真实的绘制了！
        if (data.name) {
            const name_font = 'en' === data.lang ? 'en_name' : 'cn_simplify';
            c.save();
            c.fillStyle = cardData.color;
            c.textBaseline = "middle";
            c.font =
                config.name.fontSize * r +
                "px " +
                name_font;

            c.fillText(
                cardData.name,
                config.name.position[0] * r,
                config.name.position[1] * r,
                config.name.maxWidth * r
            );
            // let outlineColor = "#888";
            // let outlineWidth = 1.2;
            // if (outlineColor && outlineWidth) {
            //     c.strokeStyle = outlineColor;
            //     c.lineWidth = outlineWidth * r;
            //     c.strokeText(
            //         cardData.name,
            //         config.name.position[0] * r,
            //         config.name.position[1] * r,
            //         config.name.maxWidth * r
            //     );
            // }
        }
        // 设置胜利点数 或者失败点数
        let pv_font = 'en_name';
        if (data.vp) {
            c.save();
            c.fillStyle = cardData.color;
            c.textBaseline = "middle";
            c.font =
                26 * r +
                "px " +
                pv_font;

            c.fillText(
                `VP: ${data.vp}`,
                config.vp[0] * r,
                config.vp[1] * r,
                300 * r
            );
        }

        if (data.dp) {
            c.save();
            c.fillStyle = cardData.color;
            c.textBaseline = "middle";
            c.font =
                26 * r +
                "px " +
                pv_font;

            c.fillText(
                `DP: ${data.dp}`,
                config.dp[0] * r,
                config.dp[1] * r,
                300 * r
            );
        }

        // 这里显示 描述
        if (data.desc) {
            let descConfig = config.desc;
            const desc_font = 'en' === data.lang ? 'en' : 'cn';
            let descParts;
            if (cardData.lang !== "en") {
                descParts = this.descSplit(
                    cardData.desc,
                    descConfig.fontSize,
                    desc_font,
                    descConfig.maxLines
                );
            } else {
                descParts = this.descSplitEn(
                    cardData.desc,
                    descConfig.fontSize,
                    desc_font,
                    descConfig.maxLines
                );
            }
            console.log(descParts);
            c.fillStyle = "#000";
            const style = descConfig.style ? descConfig.style + " " : "";
            c.font =
                style +
                descConfig.fontSize * r +
                "px " +
                desc_font;

            if (cardData.lang !== "en") {
                console.log('中文版')
                this.drawDesc(descParts, descConfig, r);
            } else {
                console.log('英文版')
                this.drawEnDesc(descParts, descConfig, r);
            }
        }

        // callbacks
        if (this.admin.loaded instanceof Function) {
            this.admin.loaded();
        }
        if (callback instanceof Function) {
            callback();
        }
    }


    descSplit(desc, fontSize, font, maxLines = 6, maxWidth = 683) {
        if (!desc) return [];

        const c = this.canvas;
        c.font = fontSize + "px " + font;
        const descList = desc.split("\n");

        // 当初始分段数超过最大行数时，将多出部分直接压入最后一行
        while (descList.length > maxLines) {
            const resPara = descList.pop();
            descList[maxLines - 1] += resPara;
        }

        // 评估当前实际是否超出最大行数

        // 根据缩放比例获取实际行数
        const getCurrentLines = (scale) => {
            return descList.reduce((lines, para) => {
                lines += Math.ceil((scale * c.measureText(para).width) / maxWidth);
                return lines;
            }, 0);
        };

        // 缩放比例从1逐渐降为0
        let scale = 1;
        while (getCurrentLines(scale) > maxLines && scale > 0) {
            scale -= 0.01;
        }

        let res = [];
        for (let para of descList) {
            const oneLineWidth = scale * c.measureText(para).width;
            const needLines = Math.ceil(oneLineWidth / maxWidth);
            const oneLineMaxWidth = Math.max(
                scale * maxWidth,
                oneLineWidth / needLines
            );
            let currentRes = [];
            let currentLine = "";
            for (let word of para) {
                // 如果某行首字为标点符号，那么会将其压入上一行。
                if (
                    currentLine === "" &&
                    currentRes.length > 0 &&
                    this.isPunctuation(word)
                ) {
                    currentRes[currentRes.length - 1] += word;
                } else {
                    currentLine += word;
                    if (scale * c.measureText(currentLine).width >= oneLineMaxWidth) {
                        currentRes.push(currentLine);
                        currentLine = "";
                    }
                }
            }
            if (currentLine) {
                currentRes.push(currentLine);
            }
            res = res.concat(currentRes);
        }

        return res;
    }

    isPunctuation(char) {
        const reg = new RegExp("[\u0000-\u00ff]");
        const reg2 = new RegExp("[\uff00-\uffff]");
        const punctuationMap = ["。", "，", "：", "【", "】", "「", "」"];
        return reg.test(char) || reg2.test(char) || punctuationMap.includes(char);
    }

    descSplitEn(desc, fontSize, font, maxLines = 6, maxWidth = 683) {
        if (!desc) return [];

        const c = this.canvas;
        c.font = fontSize + "px " + font;
        const descList = desc.split("\n");

        // 当初始分段数超过最大行数时，将多出部分直接压入最后一行
        while (descList.length > maxLines) {
            const resPara = descList.pop();
            descList[maxLines - 1] += resPara;
        }

        // 评估当前实际是否超出最大行数

        // 根据缩放比例获取实际行数
        const getCurrentLines = (scale) => {
            return descList.reduce((lines, para) => {
                lines += Math.ceil((scale * c.measureText(para).width) / maxWidth);
                return lines;
            }, 0);
        };

        // 缩放比例从1逐渐降为0
        let scale = 1;
        while (getCurrentLines(scale) > maxLines && scale > 0) {
            scale -= 0.01;
        }

        let res = [];
        for (const para of descList) {
            const oneLineWidth = scale * c.measureText(para).width;
            const needLines = Math.ceil(oneLineWidth / maxWidth);
            const oneLineMaxWidth = Math.max(
                scale * maxWidth,
                oneLineWidth / needLines
            );

            const currentRes = [];
            let currentLine = [];
            for (const word of para.split(" ")) {
                currentLine.push(word);

                const currentLineWidth = c.measureText(currentLine.join(" ")).width;
                if (scale * currentLineWidth >= oneLineMaxWidth) {
                    if (
                        scale * currentLineWidth - oneLineMaxWidth >
                        c.measureText(" " + word).width / 2
                    ) {
                        currentLine.pop();
                        currentRes.push(currentLine);
                        currentLine = [word];
                    } else {
                        currentRes.push(currentLine);
                        currentLine = [];
                    }
                }
            }
            if (currentLine.length) {
                currentRes.push(currentLine);
            }
            res = res.concat(currentRes);
        }

        return res;
    }

    drawDesc(descParts, descConfig, r) {
        const c = this.canvas;
        const { maxWidth, maxLines, lineHeight, position } = descConfig;

        for (let index in descParts) {
            let descPart = descParts[index];
            let left = position[0];
            let top = position[1] + index * lineHeight;
            if (index === maxLines - 1) {
                let tempWidth = c.measureText(descPart).width;
                if (tempWidth < maxWidth * r) {
                    c.fillText(
                        descPart,
                        left * r,
                        top * r,
                        c.measureText(descPart.slice(0, -1)).width
                    );
                } else {
                    c.fillText(descPart, left * r, top * r, maxWidth * r);
                }
            } else {
                c.fillText(descPart, left * r, top * r, maxWidth * r);
            }
        }
    }

    drawEnDesc(descParts, descConfig, r) {
        const c = this.canvas;

        for (let index in descParts) {
            let descPart = descParts[index];
            let start = descConfig.position[0];
            let top = descConfig.position[1] + index * descConfig.lineHeight;

            c.fillText(
                descPart.join(" "),
                start * r,
                top * r,
                descConfig.maxWidth * r
            );
        }
    }
}