parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"heqz":[function(require,module,exports) {
"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function n(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var r={split_string:[","," "],join_string:"＿"},u=function(){function e(){t(this,e),this.$amount=document.querySelector("#amount"),this.$separaters=document.querySelectorAll('[name="separater"]'),this.$input=document.querySelector("#input"),this.$output=document.querySelector("#output"),this.$execute=document.querySelector("#execute"),this.$juuRen=document.querySelector("#juuRen"),this.defaultSlotAmount=3,this.splitString=r.split_string[0],this.joinString=r.join_string}return n(e,[{key:"isEqual",value:function(t){for(var e=0;e<this.slotAmount;e++)if(t[0]!==t[e])return!1;return!0}},{key:"setResult",value:function(t){this.$output.textContent=t.join(this.joinString)}},{key:"setJuuRenResult",value:function(t){var e=this;t.forEach(function(t,n,r){var u=document.createElement("p");u.textContent=String(n+1).padStart(2,"0")+": "+t.join(e.joinString),e.isEqual(t)&&u.classList.add("u-equal"),e.$output.appendChild(u)})}},{key:"dispatch",value:function(){var t=this;this.$execute.addEventListener("click",function(e){t.setResult(t.shuffledArray)}),this.$juuRen.addEventListener("click",function(e){t.$output.textContent="",t.setJuuRenResult(t.shuffled10Array)})}},{key:"isSameAmountOfItemToSlot",get:function(){return this.$amount.checked}},{key:"separater",get:function(){var t=0;return this.$separaters.forEach(function(e,n){e.checked&&(t=parseInt(e.value,10))}),t}},{key:"slotAmount",get:function(){return this.seedArray.length}},{key:"idx",get:function(){return Math.floor(Math.random()*this.slotAmount)}},{key:"seedArray",get:function(){return this.$input.value.split(r.split_string[this.separater])}},{key:"shuffledArray",get:function(){for(var t=[],e=0;e<this.slotAmount;e++)t.push(this.seedArray[this.idx]);return t}},{key:"shuffled10Array",get:function(){for(var t=[],e=0;e<10;e++){for(var n=[],r=0;r<this.slotAmount;r++)n.push(this.seedArray[this.idx]);t.push(n)}return t}}]),e}();exports.default=u;
},{}],"UCsW":[function(require,module,exports) {
"use strict";var e=t(require("./class/Slotarr"));function t(e){return e&&e.__esModule?e:{default:e}}document.addEventListener("DOMContentLoaded",function(){(new e.default).dispatch()});
},{"./class/Slotarr":"heqz"}]},{},["UCsW"], null)