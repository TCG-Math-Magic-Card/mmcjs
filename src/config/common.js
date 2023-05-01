// 这里定义了 基础资源的位置和大小
const config = {
    // 骨架的大小
    moldSize: [813, 1185],
    // 卡图的位置 顶点 长 高
    pic: [33, 33, 747, 1119],
    // 卡名位置
    name: {
        font: "name",
        fontSize: 65,
        maxWidth: 610,
        position: [65 + 18 + 9, 96 + 18],
    },
    formula: {
        font: "name",
        fontSize: 100,
        maxWidth: 710,
        // 顶点 宽 高
        position: [33 + 200, 176 + 20, 747 - 400, 178 - 40]
    },
    desc: {
        font: "desc",
        position: [74 + 18, 845 + 18 + 9, 665 - 36, 262 - 57 - 20],
        maxWidth: 665 - 36,
        fontSize: 24,
        maxLines: 6,
        lineHeight: 26,
    },
    type: [363, 1033, 87, 87],
    vp: [74 + 18, 845 + 9 + 230],
    dp: [74 + 383 + 18, 845 + 9 + 230],
}

export default JSON.stringify(config);