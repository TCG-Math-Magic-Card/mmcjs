!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var i=t();for(var s in i)("object"==typeof exports?exports:e)[s]=i[s]}}(this,(function(){return function(e){var t={};function i(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=e,i.c=t,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(s,r,function(t){return e[t]}.bind(null,r));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";i.r(t),i.d(t,"Card",(function(){return n}));class s{constructor(e){this.admin=e,this.canvas=this.admin.canvas.getContext("2d")}}const r=()=>null;class n{constructor({data:e,canvas:t,config:i,size:s,moldPath:n="./mold",fontLoaded:a=r,imageLoaded:o=r,fontsLoaded:h=r,imagesLoaded:d=r,picLoaded:c=r,loaded:u=r,autoResize:l=!0,verbose:f=!1}){this.RATE=1185/813,this.data=e,this.config=i,this.key=e._id,"/"===n[n.length-1]&&(n=n.substring(0,n.length-1)),this.moldPath=n,this.fontLoaded=a,this.imageLoaded=o,this.fontsLoaded=h,this.imagesLoaded=d,this.picLoaded=c,this.loaded=u,this.verbose=f,this.autoResize=l,this.renderState=!1,this.data=e,this.size=s,t&&this.bind(t,s)}bind(e,t){this.canvas=e;let i=this.getPixelRatio;t?this.size=[t[0]*i,t[1]*i]:this.size?this.size=[this.size[0]*i,this.size[1]*i]:(this.size=this.ansysSize(),this.autoResize&&(this.sizeObserver=new ResizeObserver(()=>{this.resize()}),this.sizeObserver.observe(this.canvas),this.attriObserver=new MutationObserver(()=>{this.resizer&&(clearTimeout(this.resizer),this.resizer=null)}),this.attriObserver.observe(this.canvas,{attributes:!0,attributeFilter:["width","height"]}))),this.cardDrawer=new s(this)}rounded(e){let t=.5+e|0;return t=~~(.5+e),t=.5+e<<0,t}render(){}resize(e=500){this.resizer&&clearTimeout(this.resizer),this.resizer=setTimeout(()=>{this._resize_()},e)}_resize_(){this.size=this.ansysSize(),this.draw(this.size)}ansysSize(){let e=this.getPixelRatio,t=e*this.canvas.clientWidth,i=e*this.canvas.clientHeight,s=i/t;return s>this.RATE?i=t*this.RATE:this.RATE>s&&(t=i/this.RATE),t=this.rounded(t),i=this.rounded(i),Math.abs(t-this.canvas.width)/this.canvas.width<=.01||Math.abs(i-this.canvas.height)/this.canvas.height<=.01?[this.canvas.width,this.canvas.height]:[t,i]}get getPixelRatio(){let e=this.canvas.getContext("2d"),t=e.backingStorePixelRatio||e.webkitBackingStorePixelRatio||e.mozBackingStorePixelRatio||e.msBackingStorePixelRatio||e.oBackingStorePixelRatio||e.backingStorePixelRatio||1;return(window.devicePixelRatio||1)/t}}}])}));