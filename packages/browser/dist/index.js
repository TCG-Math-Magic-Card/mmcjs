!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var i=e();for(var n in i)("object"==typeof exports?exports:t)[n]=i[n]}}(this,(function(){return function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e),i.d(e,"getPicFromGitee",(function(){return c})),i.d(e,"getPICFromTest",(function(){return h})),i.d(e,"Card",(function(){return f})),i.d(e,"configs",(function(){return u}));class n{constructor(t){this.admin=t,this.canvas=this.admin.canvas.getContext("2d")}draw(t,e,i=this.admin.size,n=this.admin.config.style,s){this.admin.canvas.width=i[0],this.admin.canvas.height=i[1];const a=i[0]/n.moldSize[0],o=this.canvas;try{e.pic&&o.drawImage(e.pic,n.pic[0]*a,n.pic[1]*a,n.pic[2]*a,n.pic[3]*a)}catch(t){return void console.error(t)}try{e.mold&&o.drawImage(e.mold,0,0,n.moldSize[0],n.moldSize[1],0,0,i[0],i[1])}catch(t){return}if(data.name){const e="en"===data.lang?"en_name":"cn_simplify";o.save(),o.fillStyle=t.color,o.textBaseline="middle",o.font=n.name.fontSize*a+"px "+e,o.fillText(t.name,n.name.position[0]*a,n.name.position[1]*a,n.name.maxWidth*a)}if(data.vp&&(o.save(),o.fillStyle=t.color,o.textBaseline="middle",o.font=26*a+"px en_name",o.fillText("VP: "+data.vp,n.vp[0]*a,n.vp[1]*a,300*a)),data.dp&&(o.save(),o.fillStyle=t.color,o.textBaseline="middle",o.font=26*a+"px en_name",o.fillText("DP: "+data.dp,n.dp[0]*a,n.dp[1]*a,300*a)),data.desc){let e=n.desc;const i="en"===data.lang?"en":"cn";let s;s="en"!==t.lang?this.descSplit(t.desc,e.fontSize,i,e.maxLines):this.descSplitEn(t.desc,e.fontSize,i,e.maxLines),console.log(s),o.fillStyle="#000";const r=e.style?e.style+" ":"";o.font=r+e.fontSize*a+"px "+i,"en"!==t.lang?(console.log("中文版"),this.drawDesc(s,e,a)):(console.log("英文版"),this.drawEnDesc(s,e,a))}this.admin.loaded instanceof Function&&this.admin.loaded(),s instanceof Function&&s()}descSplit(t,e,i,n=6,s=683){if(!t)return[];const a=this.canvas;a.font=e+"px "+i;const o=t.split("\n");for(;o.length>n;){const t=o.pop();o[n-1]+=t}const r=t=>o.reduce((e,i)=>e+=Math.ceil(t*a.measureText(i).width/s),0);let l=1;for(;r(l)>n&&l>0;)l-=.01;let d=[];for(let t of o){const e=l*a.measureText(t).width,i=Math.ceil(e/s),n=Math.max(l*s,e/i);let o=[],r="";for(let e of t)""===r&&o.length>0&&this.isPunctuation(e)?o[o.length-1]+=e:(r+=e,l*a.measureText(r).width>=n&&(o.push(r),r=""));r&&o.push(r),d=d.concat(o)}return d}isPunctuation(t){const e=new RegExp("[\0-ÿ]"),i=new RegExp("[＀-￿]");return e.test(t)||i.test(t)||["。","，","：","【","】","「","」"].includes(t)}descSplitEn(t,e,i,n=6,s=683){if(!t)return[];const a=this.canvas;a.font=e+"px "+i;const o=t.split("\n");for(;o.length>n;){const t=o.pop();o[n-1]+=t}const r=t=>o.reduce((e,i)=>e+=Math.ceil(t*a.measureText(i).width/s),0);let l=1;for(;r(l)>n&&l>0;)l-=.01;let d=[];for(const t of o){const e=l*a.measureText(t).width,i=Math.ceil(e/s),n=Math.max(l*s,e/i),o=[];let r=[];for(const e of t.split(" ")){r.push(e);const t=a.measureText(r.join(" ")).width;l*t>=n&&(l*t-n>a.measureText(" "+e).width/2?(r.pop(),o.push(r),r=[e]):(o.push(r),r=[]))}r.length&&o.push(r),d=d.concat(o)}return d}drawDesc(t,e,i){const n=this.canvas,{maxWidth:s,maxLines:a,lineHeight:o,position:r}=e;for(let e in t){let l=t[e],d=r[0],c=r[1]+e*o;if(e===a-1){n.measureText(l).width<s*i?n.fillText(l,d*i,c*i,n.measureText(l.slice(0,-1)).width):n.fillText(l,d*i,c*i,s*i)}else n.fillText(l,d*i,c*i,s*i)}}drawEnDesc(t,e,i){const n=this.canvas;for(let s in t){let a=t[s],o=e.position[0],r=e.position[1]+s*e.lineHeight;n.fillText(a.join(" "),o*i,r*i,e.maxWidth*i)}}}const s=function({method:t="GET",path:e,data:i,responseType:n}){return new Promise((s,a)=>{let o=new XMLHttpRequest;if(n&&(o.responseType=n),"GET"!==t&&"get"!==t||!i)o.open(t,e,!0),o.send(i);else{let n=[];for(let t in i)n.push(t+"="+i[t]);let s=e+"?"+n.join("&");o.open(t,s,!0),o.send()}o.onreadystatechange=function(){4===o.readyState&&(o.status>=200&&o.status<300||304===o.status?s("blob"===n?o.response:o.responseText):a(new Error("ajax send failed")))}})},a="__MATHMAGICCARDDATA__";class o{constructor(t){if(this.admin=t,window[a]||(window[a]={}),window[a].cardPicCache||(window[a].cardPicCache={}),!window[a].fontMap){let t=document.createElement("div");t.style.width="0",t.style.height="0",t.style.overflow="hidden",document.body.appendChild(t),window[a].fontMap={fontBox:t}}}draw(...t){this.admin.draw(...t)}async loadCardPic(){let t=this.admin.getPic(this.admin.data._id);const e=window[a].cardPicCache;if(e.hasOwnProperty(t)){let i=e[t];i instanceof Promise?await i.then(t=>{this.fileContent.pic=t}):this.fileContent.pic=i}else e[t]=new Promise(i=>{this.getCorsPic(t).then(i=>{this.fileContent.pic=i,e[t]=i}).finally(()=>{i()})}),await e[t];return this.admin.picLoaded(),!0}getCorsPic(t){return s({method:"GET",path:t,responseType:"blob"}).then(t=>{let e=URL.createObjectURL(t);return this.download(e)}).catch(t=>console.log(t))}async loadAll(){this.fileContent=await this.getFiles(this.fileList),this.admin.renderState=!0,this.draw(),this.loadCardPic().then(()=>{this.draw()}),await this.loadFonts(this.admin.config.fonts).then(()=>{setTimeout(()=>{this.draw()},1e3)})}async getFiles(t){let e={};for(let i in t)e[i]=await this.getFile(t[i]);return e}async fileExist(t){return new Promise((e,i)=>{let n=localStorage.getItem(t);if(n){console.log(t,"load localstorage");let s=document.createElement("img");s.src=n,s.setAttribute("crossOrigin","anonymous"),s.onload=function(){e(s)},s.onerror=function(t){i(t)}}else e(!1)})}download(t){return new Promise((e,i)=>{let n=document.createElement("img");n.src=t,n.setAttribute("crossOrigin","anonymous"),n.onload=function(){e(n)},n.onerror=function(t){i(t)}})}async getFile(t,e=!0){let i=await this.fileExist(t);return i||(i=await this.download(t),e&&this.saveImage(t,i)),i}saveImage(t,e){let i=document.createElement("canvas"),n=i.getContext("2d");i.width=e.naturalWidth,i.height=e.naturalHeight,n.drawImage(e,0,0,e.naturalWidth,e.naturalHeight);let s=i.toDataURL("image/png");try{localStorage.setItem(t,s),console.log(t,"successful save the image")}catch(t){console.log("Storage failed: "+t)}}get fileList(){const t=this.admin.moldPath+"/";this.admin.data;let e={};return e.mold=t+"frame/mold_frame.png",e}async loadFont(t,e){if(1===window[a].fontMap[e]){var i=document.createElement("style");i.setAttribute("type","text/css"),i.setAttribute("crossOrigin","anonymous"),i.setAttribute("class",e);let n="\n          @font-face {\n            font-family: '"+e+"';\n            src: url('"+t+"');\n          }";i.appendChild(document.createTextNode(n)),document.head.appendChild(i);let o=document.createElement("p");o.innerText="MMC",o.style.fontFamily=e,window[a].fontMap.fontBox.appendChild(o),window[a].fontMap[e]=2;let r=await s({method:"GET",path:t});return window[a].fontMap[e]=3,r}if(2===window[a].fontMap[e]){let i=await s({method:"GET",path:t});return window[a].fontMap[e]=3,i}}loadFonts(t){for(let t in this.admin.config.fonts)window[a].fontMap.hasOwnProperty(t)||(window[a].fontMap[t]=1);let e=[];for(let i in t)if(3!==window[a].fontMap[i]){let n;n="relative"===t[i].type?this.admin.moldPath+"/font/"+t[i].name:t[i].name,this.admin.fontLoaded({type:"font",status:!0,content:i}),e.push(this.loadFont(n,i))}return Promise.all(e).then(()=>{this.admin.fontsLoaded({type:"end"})})}}var r=JSON.stringify({moldSize:[813,1185],pic:[33,33,747,1119],name:{font:"name",fontSize:65,maxWidth:610,position:[92,114]},formula:{font:"name",fontSize:100,maxWidth:710,position:[33,176,747,178]},desc:{font:"desc",position:[92,872,629,185],maxWidth:629,fontSize:24,maxLines:6,lineHeight:26},type:[363,1033,87,87],vp:[92,1084],dp:[475,1084]}),l={moldName:"default",fonts:{en_name:{name:"en_name.ttf",type:"relative"},en:{name:"en.ttf",type:"relative"},cn:{name:"cn.ttf",type:"relative"}},style:Object.assign(JSON.parse(r),{fontMap:{name:"cn",desc:"cn",vp:"en",dp:"en"}})};const d=()=>null,c=t=>`https://ymssx.gitee.io/pics/500/${t}.jpg`,h=t=>`http://localhost:8080/pic/${t}.jpg`;class f{constructor({data:t,canvas:e,size:i,config:n=l,moldPath:s="./mold",getPic:a=h,fontLoaded:o=d,imageLoaded:r=d,fontsLoaded:c=d,imagesLoaded:f=d,picLoaded:u=d,loaded:m=d,autoResize:p=!0,verbose:g=!1}){this.RATE=1185/813,this.data=t,this.config=n,this.key=t._id,this.getPic=a,"/"===s[s.length-1]&&(s=s.substring(0,s.length-1)),this.moldPath=s,this.fontLoaded=o,this.imageLoaded=r,this.fontsLoaded=c,this.imagesLoaded=f,this.picLoaded=u,this.loaded=m,this.verbose=g,this.autoResize=p,this.renderState=!1,this.data=t,this.size=i,e&&this.bind(e,i)}bind(t,e){this.canvas=t;let i=this.getPixelRatio;e?this.size=[e[0]*i,e[1]*i]:this.size?this.size=[this.size[0]*i,this.size[1]*i]:(this.size=this.ansysSize(),this.autoResize&&(this.sizeObserver=new ResizeObserver(()=>{this.resize()}),this.sizeObserver.observe(this.canvas),this.attriObserver=new MutationObserver(()=>{this.resizer&&(clearTimeout(this.resizer),this.resizer=null)}),this.attriObserver.observe(this.canvas,{attributes:!0,attributeFilter:["width","height"]}))),this.cardDrawer=new n(this),this.cardFile=new o(this)}rounded(t){let e=.5+t|0;return e=~~(.5+t),e=.5+t<<0,e}render(){this.cardFile.loadAll()}draw(t,e){console.log("test"),this.renderState&&this.cardDrawer.draw(this.data,this.cardFile.fileContent,t,e)}resize(t=500){this.resizer&&clearTimeout(this.resizer),this.resizer=setTimeout(()=>{this._resize_()},t)}_resize_(){this.size=this.ansysSize(),this.draw(this.size)}ansysSize(){let t=this.getPixelRatio,e=t*this.canvas.clientWidth,i=t*this.canvas.clientHeight,n=i/e;return n>this.RATE?i=e*this.RATE:this.RATE>n&&(e=i/this.RATE),e=this.rounded(e),i=this.rounded(i),Math.abs(e-this.canvas.width)/this.canvas.width<=.01||Math.abs(i-this.canvas.height)/this.canvas.height<=.01?[this.canvas.width,this.canvas.height]:[e,i]}get getPixelRatio(){let t=this.canvas.getContext("2d"),e=t.backingStorePixelRatio||t.webkitBackingStorePixelRatio||t.mozBackingStorePixelRatio||t.msBackingStorePixelRatio||t.oBackingStorePixelRatio||t.backingStorePixelRatio||1;return(window.devicePixelRatio||1)/e}}const u={defualt:l}}])}));