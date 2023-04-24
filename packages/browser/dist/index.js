!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var i=e();for(var s in i)("object"==typeof exports?exports:t)[s]=i[s]}}(this,(function(){return function(t){var e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}return i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(s,n,function(e){return t[e]}.bind(null,n));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e),i.d(e,"Card",(function(){return d})),i.d(e,"configs",(function(){return l}));class s{constructor(t){this.admin=t,this.canvas=this.admin.canvas.getContext("2d")}draw(t,e,i=this.admin.size,s=this.admin.config.style,n){this.admin.canvas.width=i[0],this.admin.canvas.height=i[1];i[0],s.moldSize[0];const a=this.canvas;try{e.mold&&a.drawImage(e.mold,0,0,s.moldSize[0],s.moldSize[1],0,0,i[0],i[1])}catch(t){return}this.admin.loaded instanceof Function&&this.admin.loaded(),n instanceof Function&&n()}}class n{constructor(t){this.admin=t}draw(...t){this.admin.draw(...t)}async loadAll(){this.fileContent=await this.getFiles(this.fileList),this.admin.renderState=!0,this.draw()}async getFiles(t){let e={};for(let i in t)e[i]=await this.getFile(t[i]);return e}async fileExist(t){return new Promise((e,i)=>{let s=localStorage.getItem(t);if(s){console.log(t,"load localstorage");let n=document.createElement("img");n.src=s,n.setAttribute("crossOrigin","anonymous"),n.onload=function(){e(n)},n.onerror=function(t){i(t)}}else e(!1)})}download(t){return new Promise((e,i)=>{let s=document.createElement("img");s.src=t,s.setAttribute("crossOrigin","anonymous"),s.onload=function(){e(s)},s.onerror=function(t){i(t)}})}async getFile(t,e=!0){let i=await this.fileExist(t);return i||(i=await this.download(t),e&&this.saveImage(t,i)),i}saveImage(t,e){let i=document.createElement("canvas"),s=i.getContext("2d");i.width=e.naturalWidth,i.height=e.naturalHeight,s.drawImage(e,0,0,e.naturalWidth,e.naturalHeight);let n=i.toDataURL("image/png");try{localStorage.setItem(t,n),console.log(t,"successful save the image")}catch(t){console.log("Storage failed: "+t)}}get fileList(){const t=this.admin.moldPath+"/";this.admin.data;let e={};return e.mold=t+"frame/mold_frame.png",e}}var a=JSON.stringify({moldSize:[813,1185],pic:[33,33,747,1119],name:{font:"name",fontSize:65,maxWidth:610,position:[65,96]},formula:{font:"name",fontSize:100,maxWidth:710,position:[33,176,747,178]},desc:{font:"desc",position:[92,863,629,185],maxWidth:629,fontSize:24,maxLines:6},type:[363,1033,87,87]}),o={moldName:"default",fonts:{en_name:{name:"en_name.ttf",type:"relative"},en:{name:"en.ttf",type:"relative"},cn:{name:"cn.ttf",type:"relative"},number:{name:"number.ttf",type:"relative"}},style:Object.assign(JSON.parse(a),{fontMap:{name:"cn",desc:"cn",vp:"en",dp:"en"}})};const r=()=>null;class d{constructor({data:t,canvas:e,size:i,config:s=o,moldPath:n="./mold",fontLoaded:a=r,imageLoaded:d=r,fontsLoaded:l=r,imagesLoaded:h=r,picLoaded:c=r,loaded:u=r,autoResize:m=!0,verbose:f=!1}){this.RATE=1185/813,this.data=t,this.config=s,this.key=t._id,console.log(s),"/"===n[n.length-1]&&(n=n.substring(0,n.length-1)),this.moldPath=n,this.fontLoaded=a,this.imageLoaded=d,this.fontsLoaded=l,this.imagesLoaded=h,this.picLoaded=c,this.loaded=u,this.verbose=f,this.autoResize=m,this.renderState=!1,this.data=t,this.size=i,e&&this.bind(e,i)}bind(t,e){this.canvas=t;let i=this.getPixelRatio;e?this.size=[e[0]*i,e[1]*i]:this.size?this.size=[this.size[0]*i,this.size[1]*i]:(this.size=this.ansysSize(),this.autoResize&&(this.sizeObserver=new ResizeObserver(()=>{this.resize()}),this.sizeObserver.observe(this.canvas),this.attriObserver=new MutationObserver(()=>{this.resizer&&(clearTimeout(this.resizer),this.resizer=null)}),this.attriObserver.observe(this.canvas,{attributes:!0,attributeFilter:["width","height"]}))),this.cardDrawer=new s(this),this.cardFile=new n(this)}rounded(t){let e=.5+t|0;return e=~~(.5+t),e=.5+t<<0,e}render(){this.cardFile.loadAll()}draw(t,e){console.log("test"),this.renderState&&this.cardDrawer.draw(this.data,this.cardFile.fileContent,t,e)}resize(t=500){this.resizer&&clearTimeout(this.resizer),this.resizer=setTimeout(()=>{this._resize_()},t)}_resize_(){this.size=this.ansysSize(),this.draw(this.size)}ansysSize(){let t=this.getPixelRatio,e=t*this.canvas.clientWidth,i=t*this.canvas.clientHeight,s=i/e;return s>this.RATE?i=e*this.RATE:this.RATE>s&&(e=i/this.RATE),e=this.rounded(e),i=this.rounded(i),Math.abs(e-this.canvas.width)/this.canvas.width<=.01||Math.abs(i-this.canvas.height)/this.canvas.height<=.01?[this.canvas.width,this.canvas.height]:[e,i]}get getPixelRatio(){let t=this.canvas.getContext("2d"),e=t.backingStorePixelRatio||t.webkitBackingStorePixelRatio||t.mozBackingStorePixelRatio||t.msBackingStorePixelRatio||t.oBackingStorePixelRatio||t.backingStorePixelRatio||1;return(window.devicePixelRatio||1)/e}}const l={defualt:o}}])}));