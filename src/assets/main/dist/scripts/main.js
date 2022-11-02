(()=>{"use strict";var t={538:(t,e,i)=>{i.r(e)},281:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0});const s=i(311);e.default=class{constructor(t){this.$element=s('<div class="embedded-assets_button btn" data-icon="globe"></div>'),this.setLabel(t)}destroy(){var t;null===(t=this.$element)||void 0===t||t.remove(),this.$element=null}setLabel(t){var e;null===(e=this.$element)||void 0===e||e.text(Craft.t("embeddedassets",t))}show(){var t;null===(t=this.$element)||void 0===t||t.show()}hide(){var t;null===(t=this.$element)||void 0===t||t.hide()}setActive(t=!0){var e;null===(e=this.$element)||void 0===e||e.toggleClass("active",t)}}},322:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0});const s=i(946),n=i(746);class o extends s.default{constructor(){super(),this._currentGetActionTarget=()=>-1,this.modal=new n.default((()=>this._getActionTarget())),this.buttons=[],this.modal.on("hide",(()=>this.buttons.forEach((t=>t.setActive(!1))))),this.modal.on("save",(t=>this.trigger("save",t)))}destroy(){null!==this.modal&&(this.modal.destroy(),this.modal=null,this.trigger("destroy"))}setReplaceAssetId(t){this._replaceAssetId=t}addButton(t,e=["bottom","top","left","right"],i=(()=>{}),s=!1){var n;this.buttons.push(t),null===(n=t.$element)||void 0===n||n.on("click",(()=>{var n;null!==this.modal&&(this._currentGetActionTarget=i,this.buttons.forEach((e=>e.setActive(e===t))),this.modal.show(t.$element,{orientations:e},s),null===(n=this.modal.form)||void 0===n||n.setReplace(s,this._replaceAssetId))})),this.trigger("addButton",{button:t})}removeButton(t){this.buttons=this.buttons.filter((e=>e!==t)),this.trigger("removeButton",{button:t})}_getActionTarget(){return this._currentGetActionTarget()}}e.default=o},946:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(){this._events=new Map}on(t,e){var i;this._events.has(t)||this._events.set(t,[]),null===(i=this._events.get(t))||void 0===i||i.push(e)}off(t,e){var i;if(this._events.size>0)if(void 0!==e&&this._events.has(t)){const s=null===(i=this._events.get(t))||void 0===i?void 0:i.filter((t=>t!==e));s.length>0?this._events.set(t,s):this._events.delete(t)}else this._events.delete(t)}trigger(t,e={}){var i;this._events.size>0&&this._events.has(t)&&(e=Object.assign(e,{type:t}),null===(i=this._events.get(t))||void 0===i||i.forEach((t=>t.call(this,e))))}}},550:function(t,e,i){var s=this&&this.__awaiter||function(t,e,i,s){return new(i||(i=Promise))((function(n,o){function r(t){try{h(s.next(t))}catch(t){o(t)}}function d(t){try{h(s.throw(t))}catch(t){o(t)}}function h(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(r,d)}h((s=s.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0});const n=i(311),o=i(946),r=i(302),d=i(513);class h extends o.default{constructor(t=(()=>{})){super(),this._getActionTarget=t,this._state="idle",this._url="";const e=(0,d.uniqueId)(),i=(0,d.uniqueId)(),s=Craft.getActionUrl("embeddedassets/actions/save");this.$element=n(`\n      <form class="embedded-assets_form" action="${s}" method="post">\n        <div class="embedded-assets_form_field">\n          <label for="${e}">URL</label>\n          <input type="text" placeholder="http://" id="${e}" name="url" autocomplete="off" spellcheck="false">\n        </div>\n        <div id="${i}" class="embedded-assets_form_body">\n          <div class="spinner"></div>\n        </div>\n      </form>\n    `),this.$input=this.$element.find(`#${e}`),this.$body=this.$element.find(`#${i}`),this.preview=new r.default,this.$body.prepend(this.preview.$element),this.preview.on("load",(t=>{t.url===this._url&&"requesting"===this._state&&this.setState("requested")})),this.preview.on("timeout",(t=>{t.url===this._url&&"requesting"===this._state&&(Craft.cp.displayError(Craft.t("embeddedassets","Could not retrieve embed information.")),this.setState("idle"))})),this.preview.on("resize",(t=>{var e;return null===(e=this.$body)||void 0===e?void 0:e.css("height",`${t.height}px`)})),this.$element.on("submit",(t=>{var e;t.preventDefault();const i=this._url===(null===(e=this.$input)||void 0===e?void 0:e.val());"idle"===this._state||"saving"!==this._state&&!i?this.request():"requested"===this._state&&i&&this.save()})),this.$input.on("change blur",(()=>this.request())),this.$input.on("paste",(t=>{const e=t.originalEvent.clipboardData,i=null==e?void 0:e.getData("text");this.request(i)})),this._setupHeightMonitor()}destroy(){var t;this.preview.destroy(),null===(t=this.$element)||void 0===t||t.remove(),this.$element=null,this.$input=null,this.$body=null,window.cancelAnimationFrame(this._heightMonitor),this.trigger("destroy")}request(t){var e;void 0===t&&(t=null===(e=this.$input)||void 0===e?void 0:e.val()),"saving"!==this._state&&this._url!==t&&(this._url=t,(0,d.isUrl)(t)?(this.setState("requesting"),this.preview.request({url:t})):this.setState("idle"))}focus(){if(null!==this.$input){const t=this.$input;t[0].select(),t[0].focus()}}clear(){var t;null===(t=this.$input)||void 0===t||t.val(""),this.trigger("clear"),this.setState("idle")}setReplace(t,e){this._replace=t,this._replaceAssetId=e}save(t,e){var i;void 0===t&&(t=null===(i=this.$input)||void 0===i?void 0:i.val()),void 0===e&&(e=this._getActionTarget());const n=Object.assign(Object.assign({},e),{url:t,assetId:this._replaceAssetId});Craft.queue.push((()=>s(this,void 0,void 0,(function*(){return yield new Promise(((t,e)=>{Craft.sendActionRequest("POST","embeddedassets/actions/"+(this._replace?"replace":"save"),{data:n}).then((i=>{var s,n,o;"saving"===this._state&&void 0!==(null===(s=i.data)||void 0===s?void 0:s.success)?(this.clear(),this.trigger("save",i.data.payload),t(void 0)):(void 0!==(null===(n=i.data)||void 0===n?void 0:n.error)&&Craft.cp.displayError(i.data.error),this.setState("requested"),e(new Error(null===(o=i.data)||void 0===o?void 0:o.error)))})).catch(e)}))})))),this.setState("saving")}setState(t){var e;switch(this._state=t,null===(e=this.$element)||void 0===e||e.attr("data-state",t),t){case"idle":this._url="",this.trigger("idle");break;case"requesting":this.trigger("requesting");break;case"requested":this.trigger("requested");break;case"saving":this.trigger("saving")}}_setupHeightMonitor(){this._height=0;const t=()=>{var e,i;const s=null!==(i=null===(e=this.$element)||void 0===e?void 0:e.height())&&void 0!==i?i:0;this._height!==s&&(this.trigger("resize",{prevHeight:this._height,height:s}),this._height=s),this._heightMonitor=window.requestAnimationFrame(t)};t()}}e.default=h},746:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0});const s=i(311),n=i(946),o=i(550),r=i(513);class d extends n.default{constructor(t=(()=>{})){super(),this._getActionTarget=t,this.form=null,this.hud=null}create(t,e={}){var i;e=Object.assign({hudClass:"hud embedded-assets_hud",mainClass:"embedded-assets_hud_main",minBodyWidth:400},e);const n=(0,r.uniqueId)(),d=(0,r.uniqueId)(),h=(0,r.uniqueId)(),l=Craft.t("app","Cancel"),a=Craft.t("app","Save");this.$footer=s(`\n      <div class="hud-footer embedded-assets_hud_footer">\n        <div class="buttons right">\n          <div id="${n}" class="btn">${l}</div>\n          <div id="${d}" class="btn submit">${a}</div>\n          <div id="${h}" class="spinner hidden"></div>\n        </div>\n      </div>\n    `),this.$cancel=this.$footer.find(`#${n}`),this.$save=this.$footer.find(`#${d}`),this.$spinner=this.$footer.find(`#${h}`),this.form=new o.default(this._getActionTarget),this.hud=new Garnish.HUD(t,null===(i=this.form.$element)||void 0===i?void 0:i.add(this.$footer),e),this.trigger("create"),this.$save.on("click",(t=>this.$save.hasClass("disabled")&&t.stopImmediatePropagation())),this.$cancel.on("click",(()=>{var t;return null===(t=this.form)||void 0===t?void 0:t.clear()})),this.$save.on("click",(()=>{var t;return null===(t=this.form)||void 0===t?void 0:t.save()})),this.form.on("submit",(()=>{var t;return null===(t=this.form)||void 0===t?void 0:t.save()})),this.form.on("save",(t=>this.trigger("save",t))),this.hud.on("show",(()=>this.trigger("show"))),this.hud.on("hide",(()=>this.trigger("hide"))),this.form.on("clear",(()=>this.hide())),this.form.on("save",(()=>this.hide())),this.hud.on("show",(()=>{var t;return null===(t=this.form)||void 0===t?void 0:t.request()})),this.hud.on("show",(()=>{var t;return null===(t=this.form)||void 0===t?void 0:t.focus()})),this.hud.on("hide",(()=>{var t;return null===(t=this.form)||void 0===t?void 0:t.setState("idle")})),this.hideFooter(),this.form.on("idle",(()=>this.hideFooter())),this.form.on("requesting",(()=>this.hideFooter())),this.form.on("requested",(()=>this.showFooter())),this.form.on("idle",(()=>this.setSaving(!1))),this.form.on("requesting",(()=>this.setSaving(!1))),this.form.on("requested",(()=>this.setSaving(!1))),this.form.on("saving",(()=>this.setSaving())),this.form.on("resize",(()=>{var t;return null===(t=this.hud)||void 0===t?void 0:t.updateSizeAndPosition()}))}destroy(){null!==this.$footer&&(this.$footer.remove(),this.$footer=null),null!==this.form&&(this.form.destroy(),this.form=null),null!==this.hud&&(this.hud.hide(),this.hud.$hud.remove(),this.hud.$shade.remove(),this.hud=null),window.cancelAnimationFrame(this._monitor),this.trigger("destroy")}show(t,e={},i){var n;null!==this.hud?(this.hud.setSettings(e),this.hud.$trigger=s(t),this.hud.showing?this.hud.queueUpdateSizeAndPosition():this.hud.show()):(this.create(t,e),null===(n=this.form)||void 0===n||n.focus()),this.trigger("show")}hide(){var t;null===(t=this.hud)||void 0===t||t.hide(),this.trigger("hide")}hideFooter(){var t;null===(t=this.hud)||void 0===t||t.$hud.removeClass("show-footer")}showFooter(){var t;null===(t=this.hud)||void 0===t||t.$hud.addClass("show-footer")}setSaving(t=!0){this.$save.toggleClass("disabled",t),this.$spinner.toggleClass("hidden",!t)}}e.default=d},302:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0});const s=i(311),n=i(946),o=i(513);class r extends n.default{constructor(){super(),void 0===window.EmbeddedAssetsPreviewMap&&(window.EmbeddedAssetsPreviewMap=new Map);const t=(0,o.uniqueId)();this.$element=s(`\n      <div class="embedded-assets_preview">\n        <iframe id="${t}" src="about:blank"></iframe>\n      </div>\n    `),this.$iframe=this.$element.find(`#${t}`),this._setupHeightMonitor()}destroy(){var t;null===(t=this.$element)||void 0===t||t.remove(),this.$element=null,null!==this._$warningTrigger&&(this._$warningTrigger.remove(),this._$warningTrigger=null),null!==this._warningHud&&(this._warningHud.hide(),this._warningHud.$hud.remove(),this._warningHud.$shade.remove(),this._warningHud=null),window.cancelAnimationFrame(this._heightMonitor),clearTimeout(this._requestTimeout),this.trigger("destroy")}getWindow(){return this.$iframe[0].contentWindow}getDocument(){var t,e;return null!==(e=null===(t=this.getWindow())||void 0===t?void 0:t.document)&&void 0!==e?e:null}getBody(){var t,e;return null!==(e=null===(t=this.getDocument())||void 0===t?void 0:t.body)&&void 0!==e?e:null}showWarning(){const t=s(this.getWindow()),e=s(this.getDocument()).find("#warning");if(e.length>0){const{top:i,left:n}=this.$iframe.offset(),o=t.scrollTop(),{top:r,left:d}=e.offset(),h=i-o+r,l=n+d,a=e.outerWidth(),u=e.outerHeight();if(null===this._$warningTrigger&&(this._$warningTrigger=s("<div>").css({position:"absolute",display:"none"}),Garnish.$bod.append(this._$warningTrigger)),this._$warningTrigger.css({display:"block",top:`${h}px`,left:`${l}px`,width:`${a}px`,height:`${u}px`}),null===this._warningHud){const t=Craft.t("embeddedassets","This information is coming from an untrusted source."),e=Craft.t("embeddedassets","As a security measure embed codes will not be shown."),i=s(`\n          <p><strong>${t}</strong></p>\n          <p>${e}</p>\n        `);this._warningHud=new Garnish.HUD(this._$warningTrigger,i,{hudClass:"hud info-hud",closeOtherHUDs:!1,onHide:()=>{var t;return null===(t=this._$warningTrigger)||void 0===t?void 0:t.css("display","none")}})}else this._warningHud.show()}}request(t,e=15e3){var i,s,n,r;const d=Object.assign({showContent:!0,callback:(0,o.uniqueId)("embeddedassets")},null!=t?t:{}),h=this.getWindow();if(null!==h){clearTimeout(this._requestTimeout);let t="about:blank";if(Boolean(null!==(i=d.url)&&void 0!==i?i:d.assetId)){const i=t=>{var e,i,s;clearTimeout(this._requestTimeout),null!==(i=null===(e=window.EmbeddedAssetsPreviewMap)||void 0===e?void 0:e.has(d.callback))&&void 0!==i&&i&&(null===(s=window.EmbeddedAssetsPreviewMap)||void 0===s||s.delete(d.callback)),this.trigger(t,o)};null===(s=window.EmbeddedAssetsPreviewMap)||void 0===s||s.set(d.callback,(()=>{this._setupWarning(),i("load")})),this._requestTimeout=setTimeout((()=>i("timeout")),e);const o={showContent:null===(n=d.showContent)||void 0===n||n?1:0,callback:d.callback};void 0!==d.url?o.url=d.url:void 0!==d.assetId&&(o.assetId=d.assetId),t=Craft.getActionUrl("embeddedassets/actions/preview",Object.assign(Object.assign({},o),{url:null!==(r=null==o?void 0:o.url)&&void 0!==r?r:null}))}h.location.replace(t)}}_setupHeightMonitor(){this._height=0;const t=()=>{var e,i;const n=null!==(i=s(null!==(e=this.getBody())&&void 0!==e?e:s()).height())&&void 0!==i?i:0;this._height!==n&&(this.trigger("resize",{prevHeight:this._height,height:n}),this._height=n),this._heightMonitor=window.requestAnimationFrame(t)};t()}_setupWarning(){var t;const e=s(null!==(t=this.getDocument())&&void 0!==t?t:s()).find("#warning");e.length>0&&(e.off(".embeddedassets"),e.on("click.embeddedassets",(()=>this.showWarning())))}}e.default=r},513:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.isUrl=e.uniqueId=e.monkeypatch=void 0,e.monkeypatch=function(t,e,i){const s=t.prototype[e];t.prototype[e]=function(){s.apply(this,arguments),i.call(this)}};let i=0;e.uniqueId=function(t="uid"){return`${t}${Math.random().toString(36).substr(2)}${i++}`},e.isUrl=function(t){return/^https?:\/\//.test(t)}},311:t=>{t.exports=jQuery}},e={};function i(s){var n=e[s];if(void 0!==n)return n.exports;var o=e[s]={exports:{}};return t[s].call(o.exports,o,o.exports,i),o.exports}i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};(()=>{i(538);const t=i(311),e=i(322),s=i(281),n=i(513),o=new e.default;(0,n.monkeypatch)(Craft.AssetIndex,"init",(function(){var e,i;const n=new s.default("Embed"),r=new s.default("Replace"),d=this.$uploadButton,h=d.closest("#header").length>0,l=d.closest(".modal").length>0,a=null!==(i=null===(e=this.settings.criteria)||void 0===e?void 0:e.kind)&&void 0!==i?i:[];let u;h?(this.$uploadButton.before(n.$element),this.$uploadButton.before(r.$element),u=["bottom","left","right","top"]):l&&(this.$uploadButton.after(n.$element),this.$uploadButton.after(r.$element),u=["top","right","bottom","left"]);const v=(t,e=[])=>{"string"==typeof e&&(e=[e]),e.length>0&&!e.includes("json")?t.hide():t.show()};v(n,a),r.hide();const c=()=>{const t=this.sourceKey.split(":");return void 0!==t[t.length-2]?{targetType:t[t.length-2],targetUid:t[t.length-1]}:{}};o.addButton(n,u,c),o.addButton(r,u,c,!0);let g=[];o.on("save",(t=>{g.push(t.assetId),this.updateElements()})),this.on("updateElements",(()=>{g.forEach((t=>this.view.selectElementById(t))),g=[],v(n,a),r.hide()})),this.on("selectionChange",(e=>{const i=e.target.view.elementSelect.$selectedItems;if(1===i.length){t(i[0]).find("[data-embedded-asset]").length>0?(n.hide(),r.show(),o.setReplaceAssetId(i[0].attributes["data-id"].value)):(v(n,a),r.hide())}else v(n,a),r.hide()}))})),window.EmbeddedAssets=o})()})();
//# sourceMappingURL=main.js.map