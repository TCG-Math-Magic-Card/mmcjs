# 数学魔法卡显示使用的前端包

![图片](demo/one.png)


# 使用方法
```html
<script>
  const canvas = document.getElementById('card');
  const data = {
    _id: '000001',
    name: '最初的数字 1',
    lang: 'cn',
    type: 'value',
    desc: '范畴:自然数/奇数\r\n' +
      '当使用此卡设置值并成功设置在【值区】时，你可以从卡组获取一张【自然数】范畴的断言',
    vp: 1,
    dp: 1,
    pic: 'https://raw.githubusercontent.com/TCG-Math-Magic-Card/mmcjs/math/pic/000001.jpg',
    formulaPic: 'https://raw.githubusercontent.com/TCG-Math-Magic-Card/mmcjs/main/pic/1.svg', 
  };

  const card = new Card({
    data, canvas,
    moldPath: './packages/browser/dist/mold',
  });
  
  card.render();
</script>
```
主要字段:
- name 卡名显示在最上方
- lang 语言 目前是 `cn` `en` 
- type 卡片类型：`value`,`value-assertion`,`assertion`,`operator`,`operator-value`,`function`,`legend`,`rainbow`
- desc 卡片效果描述
- vp 胜利点数
- dp 失败点数
- pic 卡图 要求大小  (747 x 1119)
- formulaPic 公式SVG.要求字体颜色为白色 

> 图片可以使用 texsvg cli生成