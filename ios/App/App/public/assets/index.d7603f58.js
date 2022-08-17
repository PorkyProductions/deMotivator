var co=Object.defineProperty,ho=Object.defineProperties;var fo=Object.getOwnPropertyDescriptors;var tn=Object.getOwnPropertySymbols;var po=Object.prototype.hasOwnProperty,mo=Object.prototype.propertyIsEnumerable;var nn=(t,e,n)=>e in t?co(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,rn=(t,e)=>{for(var n in e||(e={}))po.call(e,n)&&nn(t,n,e[n]);if(tn)for(var n of tn(e))mo.call(e,n)&&nn(t,n,e[n]);return t},on=(t,e)=>ho(t,fo(e));import{S as Ue,i as xe,s as $e,e as v,a as M,t as jn,b as Wn,c as m,d as R,f as y,l as Lt,g as go,n as K,h as C,j as st,k as ve,m as yo,o as Ie,p as A,q as L,r as _e,u as Hn,v as Vn,w as zn,x as bo,T as wo}from"./spinhog.15a34d9b.js";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gn=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let o=t.charCodeAt(r);o<128?e[n++]=o:o<2048?(e[n++]=o>>6|192,e[n++]=o&63|128):(o&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(o=65536+((o&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=o>>18|240,e[n++]=o>>12&63|128,e[n++]=o>>6&63|128,e[n++]=o&63|128):(e[n++]=o>>12|224,e[n++]=o>>6&63|128,e[n++]=o&63|128)}return e},vo=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const o=t[n++];if(o<128)e[r++]=String.fromCharCode(o);else if(o>191&&o<224){const i=t[n++];e[r++]=String.fromCharCode((o&31)<<6|i&63)}else if(o>239&&o<365){const i=t[n++],s=t[n++],a=t[n++],u=((o&7)<<18|(i&63)<<12|(s&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=t[n++],s=t[n++];e[r++]=String.fromCharCode((o&15)<<12|(i&63)<<6|s&63)}}return e.join("")},qn={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let o=0;o<t.length;o+=3){const i=t[o],s=o+1<t.length,a=s?t[o+1]:0,u=o+2<t.length,l=u?t[o+2]:0,c=i>>2,d=(i&3)<<4|a>>4;let h=(a&15)<<2|l>>6,p=l&63;u||(p=64,s||(h=64)),r.push(n[c],n[d],n[h],n[p])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Gn(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):vo(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let o=0;o<t.length;){const i=n[t.charAt(o++)],a=o<t.length?n[t.charAt(o)]:0;++o;const l=o<t.length?n[t.charAt(o)]:64;++o;const d=o<t.length?n[t.charAt(o)]:64;if(++o,i==null||a==null||l==null||d==null)throw Error();const h=i<<2|a>>4;if(r.push(h),l!==64){const p=a<<4&240|l>>2;if(r.push(p),d!==64){const k=l<<6&192|d;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},Io=function(t){const e=Gn(t);return qn.encodeByteArray(e,!0)},Kn=function(t){return Io(t).replace(/\./g,"")},_o=function(t){try{return qn.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ko{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function To(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(_())}function Jn(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Eo(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function So(){const t=_();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Xn(){return typeof indexedDB=="object"}function Qn(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",o=self.indexedDB.open(r);o.onsuccess=()=>{o.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},o.onupgradeneeded=()=>{n=!1},o.onerror=()=>{var i;e(((i=o.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}function Ao(){return!(typeof navigator=="undefined"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oo="FirebaseError";class ie extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=Oo,Object.setPrototypeOf(this,ie.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,pe.prototype.create)}}class pe{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},o=`${this.service}/${e}`,i=this.errors[e],s=i?Ro(i,r):"Error",a=`${this.serviceName}: ${s} (${o}).`;return new ie(o,a,r)}}function Ro(t,e){return t.replace(Co,(n,r)=>{const o=e[r];return o!=null?String(o):`<${r}?>`})}const Co=/\{\$([^}]+)}/g;function Po(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function De(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const o of n){if(!r.includes(o))return!1;const i=t[o],s=e[o];if(sn(i)&&sn(s)){if(!De(i,s))return!1}else if(i!==s)return!1}for(const o of r)if(!n.includes(o))return!1;return!0}function sn(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Be(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(o=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(o))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Do(t,e){const n=new No(t,e);return n.subscribe.bind(n)}class No{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let o;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");Mo(e,["next","error","complete"])?o=e:o={next:e,error:n,complete:r},o.next===void 0&&(o.next=gt),o.error===void 0&&(o.error=gt),o.complete===void 0&&(o.complete=gt);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?o.error(this.finalError):o.complete()}catch{}}),this.observers.push(o),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console!="undefined"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Mo(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function gt(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lo=1e3,Yo=2,Uo=4*60*60*1e3,xo=.5;function an(t,e=Lo,n=Yo){const r=e*Math.pow(n,t),o=Math.round(xo*r*(Math.random()-.5)*2);return Math.min(Uo,r+o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(t){return t&&t._delegate?t._delegate:t}class j{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const se="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new ko;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const o=this.getOrInitializeService({instanceIdentifier:n});o&&r.resolve(o)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),o=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(o)return null;throw i}else{if(o)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Fo(e))try{this.getOrInitializeService({instanceIdentifier:se})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:o});r.resolve(i)}catch{}}}}clearInstance(e=se){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=se){return this.instances.has(e)}getOptions(e=se){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const o=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,s]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);r===a&&s.resolve(o)}return o}onInit(e,n){var r;const o=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(o))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(o,i);const s=this.instances.get(o);return s&&e(s,o),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(!!r)for(const o of r)try{o(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Bo(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=se){return this.component?this.component.multipleInstances?e:se:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Bo(t){return t===se?void 0:t}function Fo(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jo{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new $o(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var g;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(g||(g={}));const Wo={debug:g.DEBUG,verbose:g.VERBOSE,info:g.INFO,warn:g.WARN,error:g.ERROR,silent:g.SILENT},Ho=g.INFO,Vo={[g.DEBUG]:"log",[g.VERBOSE]:"log",[g.INFO]:"info",[g.WARN]:"warn",[g.ERROR]:"error"},zo=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),o=Vo[e];if(o)console[o](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Yt{constructor(e){this.name=e,this._logLevel=Ho,this._logHandler=zo,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in g))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Wo[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,g.DEBUG,...e),this._logHandler(this,g.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,g.VERBOSE,...e),this._logHandler(this,g.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,g.INFO,...e),this._logHandler(this,g.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,g.WARN,...e),this._logHandler(this,g.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,g.ERROR,...e),this._logHandler(this,g.ERROR,...e)}}const Go=(t,e)=>e.some(n=>t instanceof n);let un,ln;function qo(){return un||(un=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ko(){return ln||(ln=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Zn=new WeakMap,Ot=new WeakMap,er=new WeakMap,yt=new WeakMap,Ut=new WeakMap;function Jo(t){const e=new Promise((n,r)=>{const o=()=>{t.removeEventListener("success",i),t.removeEventListener("error",s)},i=()=>{n(oe(t.result)),o()},s=()=>{r(t.error),o()};t.addEventListener("success",i),t.addEventListener("error",s)});return e.then(n=>{n instanceof IDBCursor&&Zn.set(n,t)}).catch(()=>{}),Ut.set(e,t),e}function Xo(t){if(Ot.has(t))return;const e=new Promise((n,r)=>{const o=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",s),t.removeEventListener("abort",s)},i=()=>{n(),o()},s=()=>{r(t.error||new DOMException("AbortError","AbortError")),o()};t.addEventListener("complete",i),t.addEventListener("error",s),t.addEventListener("abort",s)});Ot.set(t,e)}let Rt={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Ot.get(t);if(e==="objectStoreNames")return t.objectStoreNames||er.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return oe(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Qo(t){Rt=t(Rt)}function Zo(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(bt(this),e,...n);return er.set(r,e.sort?e.sort():[e]),oe(r)}:Ko().includes(t)?function(...e){return t.apply(bt(this),e),oe(Zn.get(this))}:function(...e){return oe(t.apply(bt(this),e))}}function ei(t){return typeof t=="function"?Zo(t):(t instanceof IDBTransaction&&Xo(t),Go(t,qo())?new Proxy(t,Rt):t)}function oe(t){if(t instanceof IDBRequest)return Jo(t);if(yt.has(t))return yt.get(t);const e=ei(t);return e!==t&&(yt.set(t,e),Ut.set(e,t)),e}const bt=t=>Ut.get(t);function tr(t,e,{blocked:n,upgrade:r,blocking:o,terminated:i}={}){const s=indexedDB.open(t,e),a=oe(s);return r&&s.addEventListener("upgradeneeded",u=>{r(oe(s.result),u.oldVersion,u.newVersion,oe(s.transaction))}),n&&s.addEventListener("blocked",()=>n()),a.then(u=>{i&&u.addEventListener("close",()=>i()),o&&u.addEventListener("versionchange",()=>o())}).catch(()=>{}),a}const ti=["get","getKey","getAll","getAllKeys","count"],ni=["put","add","delete","clear"],wt=new Map;function cn(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(wt.get(e))return wt.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,o=ni.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(o||ti.includes(n)))return;const i=async function(s,...a){const u=this.transaction(s,o?"readwrite":"readonly");let l=u.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),o&&u.done]))[0]};return wt.set(e,i),i}Qo(t=>on(rn({},t),{get:(e,n,r)=>cn(e,n)||t.get(e,n,r),has:(e,n)=>!!cn(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(oi(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function oi(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ct="@firebase/app",dn="0.7.28";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xt=new Yt("@firebase/app"),ii="@firebase/app-compat",si="@firebase/analytics-compat",ai="@firebase/analytics",ui="@firebase/app-check-compat",li="@firebase/app-check",ci="@firebase/auth",di="@firebase/auth-compat",hi="@firebase/database",fi="@firebase/database-compat",pi="@firebase/functions",mi="@firebase/functions-compat",gi="@firebase/installations",yi="@firebase/installations-compat",bi="@firebase/messaging",wi="@firebase/messaging-compat",vi="@firebase/performance",Ii="@firebase/performance-compat",_i="@firebase/remote-config",ki="@firebase/remote-config-compat",Ti="@firebase/storage",Ei="@firebase/storage-compat",Si="@firebase/firestore",Ai="@firebase/firestore-compat",Oi="firebase",Ri="9.9.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nr="[DEFAULT]",Ci={[Ct]:"fire-core",[ii]:"fire-core-compat",[ai]:"fire-analytics",[si]:"fire-analytics-compat",[li]:"fire-app-check",[ui]:"fire-app-check-compat",[ci]:"fire-auth",[di]:"fire-auth-compat",[hi]:"fire-rtdb",[fi]:"fire-rtdb-compat",[pi]:"fire-fn",[mi]:"fire-fn-compat",[gi]:"fire-iid",[yi]:"fire-iid-compat",[bi]:"fire-fcm",[wi]:"fire-fcm-compat",[vi]:"fire-perf",[Ii]:"fire-perf-compat",[_i]:"fire-rc",[ki]:"fire-rc-compat",[Ti]:"fire-gcs",[Ei]:"fire-gcs-compat",[Si]:"fire-fst",[Ai]:"fire-fst-compat","fire-js":"fire-js",[Oi]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qe=new Map,Pt=new Map;function Pi(t,e){try{t.container.addComponent(e)}catch(n){xt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function J(t){const e=t.name;if(Pt.has(e))return xt.debug(`There were multiple attempts to register component ${e}.`),!1;Pt.set(e,t);for(const n of Qe.values())Pi(n,t);return!0}function Se(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Di={["no-app"]:"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["storage-open"]:"Error thrown when opening storage. Original error: {$originalErrorMessage}.",["storage-get"]:"Error thrown when reading from storage. Original error: {$originalErrorMessage}.",["storage-set"]:"Error thrown when writing to storage. Original error: {$originalErrorMessage}.",["storage-delete"]:"Error thrown when deleting from storage. Original error: {$originalErrorMessage}."},ce=new pe("app","Firebase",Di);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ni{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new j("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ce.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const at=Ri;function $t(t,e={}){typeof e!="object"&&(e={name:e});const n=Object.assign({name:nr,automaticDataCollectionEnabled:!1},e),r=n.name;if(typeof r!="string"||!r)throw ce.create("bad-app-name",{appName:String(r)});const o=Qe.get(r);if(o){if(De(t,o.options)&&De(n,o.config))return o;throw ce.create("duplicate-app",{appName:r})}const i=new jo(r);for(const a of Pt.values())i.addComponent(a);const s=new Ni(t,n,i);return Qe.set(r,s),s}function rr(t=nr){const e=Qe.get(t);if(!e)throw ce.create("no-app",{appName:t});return e}function $(t,e,n){var r;let o=(r=Ci[t])!==null&&r!==void 0?r:t;n&&(o+=`-${n}`);const i=o.match(/\s|\//),s=e.match(/\s|\//);if(i||s){const a=[`Unable to register library "${o}" with version "${e}":`];i&&a.push(`library name "${o}" contains illegal characters (whitespace or "/")`),i&&s&&a.push("and"),s&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),xt.warn(a.join(" "));return}J(new j(`${o}-version`,()=>({library:o,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mi="firebase-heartbeat-database",Li=1,Ne="firebase-heartbeat-store";let vt=null;function or(){return vt||(vt=tr(Mi,Li,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Ne)}}}).catch(t=>{throw ce.create("storage-open",{originalErrorMessage:t.message})})),vt}async function Yi(t){var e;try{return(await or()).transaction(Ne).objectStore(Ne).get(ir(t))}catch(n){throw ce.create("storage-get",{originalErrorMessage:(e=n)===null||e===void 0?void 0:e.message})}}async function hn(t,e){var n;try{const o=(await or()).transaction(Ne,"readwrite");return await o.objectStore(Ne).put(e,ir(t)),o.done}catch(r){throw ce.create("storage-set",{originalErrorMessage:(n=r)===null||n===void 0?void 0:n.message})}}function ir(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ui=1024,xi=30*24*60*60*1e3;class $i{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Fi(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=fn();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r)))return this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const i=new Date(o.date).valueOf();return Date.now()-i<=xi}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=fn(),{heartbeatsToSend:n,unsentEntries:r}=Bi(this._heartbeatsCache.heartbeats),o=Kn(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}}function fn(){return new Date().toISOString().substring(0,10)}function Bi(t,e=Ui){const n=[];let r=t.slice();for(const o of t){const i=n.find(s=>s.agent===o.agent);if(i){if(i.dates.push(o.date),pn(n)>e){i.dates.pop();break}}else if(n.push({agent:o.agent,dates:[o.date]}),pn(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Fi{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Xn()?Qn().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await Yi(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const o=await this.read();return hn(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:o.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const o=await this.read();return hn(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:o.lastSentHeartbeatDate,heartbeats:[...o.heartbeats,...e.heartbeats]})}else return}}function pn(t){return Kn(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ji(t){J(new j("platform-logger",e=>new ri(e),"PRIVATE")),J(new j("heartbeat",e=>new $i(e),"PRIVATE")),$(Ct,dn,t),$(Ct,dn,"esm2017"),$("fire-js","")}ji("");var Wi="firebase",Hi="9.9.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */$(Wi,Hi,"app");function Bt(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(t);o<r.length;o++)e.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(t,r[o])&&(n[r[o]]=t[r[o]]);return n}function sr(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Vi=sr,ar=new pe("auth","Firebase",sr());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mn=new Yt("@firebase/auth");function qe(t,...e){mn.logLevel<=g.ERROR&&mn.error(`Auth (${at}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W(t,...e){throw Ft(t,...e)}function B(t,...e){return Ft(t,...e)}function ur(t,e,n){const r=Object.assign(Object.assign({},Vi()),{[e]:n});return new pe("auth","Firebase",r).create(e,{appName:t.name})}function zi(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&W(t,"argument-error"),ur(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Ft(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return ar.create(t,...e)}function f(t,e,...n){if(!t)throw Ft(e,...n)}function G(t){const e="INTERNAL ASSERTION FAILED: "+t;throw qe(e),new Error(e)}function X(t,e){t||G(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gn=new Map;function q(t){X(t instanceof Function,"Expected a class definition");let e=gn.get(t);return e?(X(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,gn.set(t,e),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gi(t,e){const n=Se(t,"auth");if(n.isInitialized()){const o=n.getImmediate(),i=n.getOptions();if(De(i,e!=null?e:{}))return o;W(o,"already-initialized")}return n.initialize({options:e})}function qi(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(q);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dt(){var t;return typeof self!="undefined"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function Ki(){return yn()==="http:"||yn()==="https:"}function yn(){var t;return typeof self!="undefined"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ji(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Ki()||Jn()||"connection"in navigator)?navigator.onLine:!0}function Xi(){if(typeof navigator=="undefined")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe{constructor(e,n){this.shortDelay=e,this.longDelay=n,X(n>e,"Short delay should be less than long delay!"),this.isMobile=To()||Eo()}get(){return Ji()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jt(t,e){X(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;G("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;G("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;G("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qi={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zi=new Fe(3e4,6e4);function es(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function ut(t,e,n,r,o={}){return cr(t,o,async()=>{let i={},s={};r&&(e==="GET"?s=r:i={body:JSON.stringify(r)});const a=Be(Object.assign({key:t.config.apiKey},s)).slice(1),u=await t._getAdditionalHeaders();return u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode),lr.fetch()(dr(t,t.config.apiHost,n,a),Object.assign({method:e,headers:u,referrerPolicy:"no-referrer"},i))})}async function cr(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},Qi),e);try{const o=new ns(t),i=await Promise.race([n(),o.promise]);o.clearNetworkTimeout();const s=await i.json();if("needConfirmation"in s)throw Ge(t,"account-exists-with-different-credential",s);if(i.ok&&!("errorMessage"in s))return s;{const a=i.ok?s.errorMessage:s.error.message,[u,l]=a.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ge(t,"credential-already-in-use",s);if(u==="EMAIL_EXISTS")throw Ge(t,"email-already-in-use",s);if(u==="USER_DISABLED")throw Ge(t,"user-disabled",s);const c=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw ur(t,c,l);W(t,c)}}catch(o){if(o instanceof ie)throw o;W(t,"network-request-failed")}}async function ts(t,e,n,r,o={}){const i=await ut(t,e,n,r,o);return"mfaPendingCredential"in i&&W(t,"multi-factor-auth-required",{_serverResponse:i}),i}function dr(t,e,n,r){const o=`${e}${n}?${r}`;return t.config.emulator?jt(t.config,o):`${t.config.apiScheme}://${o}`}class ns{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(B(this.auth,"network-request-failed")),Zi.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Ge(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const o=B(t,e,r);return o.customData._tokenResponse=n,o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rs(t,e){return ut(t,"POST","/v1/accounts:delete",e)}async function os(t,e){return ut(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ce(t){if(!!t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function is(t,e=!1){const n=me(t),r=await n.getIdToken(e),o=Wt(r);f(o&&o.exp&&o.auth_time&&o.iat,n.auth,"internal-error");const i=typeof o.firebase=="object"?o.firebase:void 0,s=i==null?void 0:i.sign_in_provider;return{claims:o,token:r,authTime:Ce(It(o.auth_time)),issuedAtTime:Ce(It(o.iat)),expirationTime:Ce(It(o.exp)),signInProvider:s||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function It(t){return Number(t)*1e3}function Wt(t){var e;const[n,r,o]=t.split(".");if(n===void 0||r===void 0||o===void 0)return qe("JWT malformed, contained fewer than 3 sections"),null;try{const i=_o(r);return i?JSON.parse(i):(qe("Failed to decode base64 JWT payload"),null)}catch(i){return qe("Caught error parsing JWT payload as JSON",(e=i)===null||e===void 0?void 0:e.toString()),null}}function ss(t){const e=Wt(t);return f(e,"internal-error"),f(typeof e.exp!="undefined","internal-error"),f(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Me(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof ie&&as(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function as({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){!this.isRunning||(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const o=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,o)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){var e;try{await this.user.getIdToken(!0)}catch(n){((e=n)===null||e===void 0?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ce(this.lastLoginAt),this.creationTime=Ce(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ze(t){var e;const n=t.auth,r=await t.getIdToken(),o=await Me(t,os(n,{idToken:r}));f(o==null?void 0:o.users.length,n,"internal-error");const i=o.users[0];t._notifyReloadListener(i);const s=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?ds(i.providerUserInfo):[],a=cs(t.providerData,s),u=t.isAnonymous,l=!(t.email&&i.passwordHash)&&!(a!=null&&a.length),c=u?l:!1,d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new hr(i.createdAt,i.lastLoginAt),isAnonymous:c};Object.assign(t,d)}async function ls(t){const e=me(t);await Ze(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function cs(t,e){return[...t.filter(r=>!e.some(o=>o.providerId===r.providerId)),...e]}function ds(t){return t.map(e=>{var{providerId:n}=e,r=Bt(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hs(t,e){const n=await cr(t,{},async()=>{const r=Be({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:o,apiKey:i}=t.config,s=dr(t,o,"/v1/token",`key=${i}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",lr.fetch()(s,{method:"POST",headers:a,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){f(e.idToken,"internal-error"),f(typeof e.idToken!="undefined","internal-error"),f(typeof e.refreshToken!="undefined","internal-error");const n="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):ss(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return f(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:o,expiresIn:i}=await hs(e,n);this.updateTokensAndExpiration(r,o,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:o,expirationTime:i}=n,s=new Le;return r&&(f(typeof r=="string","internal-error",{appName:e}),s.refreshToken=r),o&&(f(typeof o=="string","internal-error",{appName:e}),s.accessToken=o),i&&(f(typeof i=="number","internal-error",{appName:e}),s.expirationTime=i),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Le,this.toJSON())}_performRefresh(){return G("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ee(t,e){f(typeof t=="string"||typeof t=="undefined","internal-error",{appName:e})}class le{constructor(e){var{uid:n,auth:r,stsTokenManager:o}=e,i=Bt(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new us(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=o,this.accessToken=o.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new hr(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await Me(this,this.stsTokenManager.getToken(this.auth,e));return f(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return is(this,e)}reload(){return ls(this)}_assign(e){this!==e&&(f(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){return new le(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(e){f(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Ze(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await Me(this,rs(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,o,i,s,a,u,l,c;const d=(r=n.displayName)!==null&&r!==void 0?r:void 0,h=(o=n.email)!==null&&o!==void 0?o:void 0,p=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,k=(s=n.photoURL)!==null&&s!==void 0?s:void 0,P=(a=n.tenantId)!==null&&a!==void 0?a:void 0,Y=(u=n._redirectEventId)!==null&&u!==void 0?u:void 0,E=(l=n.createdAt)!==null&&l!==void 0?l:void 0,ge=(c=n.lastLoginAt)!==null&&c!==void 0?c:void 0,{uid:Ae,emailVerified:ye,isAnonymous:He,providerData:Oe,stsTokenManager:b}=n;f(Ae&&b,e,"internal-error");const w=Le.fromJSON(this.name,b);f(typeof Ae=="string",e,"internal-error"),ee(d,e.name),ee(h,e.name),f(typeof ye=="boolean",e,"internal-error"),f(typeof He=="boolean",e,"internal-error"),ee(p,e.name),ee(k,e.name),ee(P,e.name),ee(Y,e.name),ee(E,e.name),ee(ge,e.name);const U=new le({uid:Ae,auth:e,email:h,emailVerified:ye,displayName:d,isAnonymous:He,photoURL:k,phoneNumber:p,tenantId:P,stsTokenManager:w,createdAt:E,lastLoginAt:ge});return Oe&&Array.isArray(Oe)&&(U.providerData=Oe.map(H=>Object.assign({},H))),Y&&(U._redirectEventId=Y),U}static async _fromIdTokenResponse(e,n,r=!1){const o=new Le;o.updateFromServerResponse(n);const i=new le({uid:n.localId,auth:e,stsTokenManager:o,isAnonymous:r});return await Ze(i),i}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}fr.type="NONE";const bn=fr;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ke(t,e,n){return`firebase:${t}:${e}:${n}`}class ke{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:o,name:i}=this.auth;this.fullUserKey=Ke(this.userKey,o.apiKey,i),this.fullPersistenceKey=Ke("persistence",o.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?le._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new ke(q(bn),e,r);const o=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=o[0]||q(bn);const s=Ke(r,e.config.apiKey,e.name);let a=null;for(const l of n)try{const c=await l._get(s);if(c){const d=le._fromJSON(e,c);l!==i&&(a=d),i=l;break}}catch{}const u=o.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new ke(i,e,r):(i=u[0],a&&await i._set(s,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==i)try{await l._remove(s)}catch{}})),new ke(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wn(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(gr(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(pr(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(br(e))return"Blackberry";if(wr(e))return"Webos";if(Ht(e))return"Safari";if((e.includes("chrome/")||mr(e))&&!e.includes("edge/"))return"Chrome";if(yr(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function pr(t=_()){return/firefox\//i.test(t)}function Ht(t=_()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function mr(t=_()){return/crios\//i.test(t)}function gr(t=_()){return/iemobile/i.test(t)}function yr(t=_()){return/android/i.test(t)}function br(t=_()){return/blackberry/i.test(t)}function wr(t=_()){return/webos/i.test(t)}function lt(t=_()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function fs(t=_()){var e;return lt(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function ps(){return So()&&document.documentMode===10}function vr(t=_()){return lt(t)||yr(t)||wr(t)||br(t)||/windows phone/i.test(t)||gr(t)}function ms(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ir(t,e=[]){let n;switch(t){case"Browser":n=wn(_());break;case"Worker":n=`${wn(_())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${at}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gs{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((s,a)=>{try{const u=e(i);s(u)}catch(u){a(u)}});r.onAbort=n,this.queue.push(r);const o=this.queue.length-1;return()=>{this.queue[o]=()=>Promise.resolve()}}async runMiddleware(e){var n;if(this.auth.currentUser===e)return;const r=[];try{for(const o of this.queue)await o(e),o.onAbort&&r.push(o.onAbort)}catch(o){r.reverse();for(const i of r)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:(n=o)===null||n===void 0?void 0:n.message})}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys{constructor(e,n,r){this.app=e,this.heartbeatServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new vn(this),this.idTokenSubscription=new vn(this),this.beforeStateQueue=new gs(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ar,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=q(n)),this._initializationPromise=this.queue(async()=>{var r,o;if(!this._deleted&&(this.persistenceManager=await ke.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((o=this.currentUser)===null||o===void 0?void 0:o.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var n;const r=await this.assertedPersistence.getCurrentUser();let o=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=o==null?void 0:o._redirectEventId,u=await this.tryRedirectSignIn(e);(!s||s===a)&&(u==null?void 0:u.user)&&(o=u.user,i=!0)}if(!o)return this.directlySetCurrentUser(null);if(!o._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(o)}catch(s){o=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return o?this.reloadAndSetCurrentUserOrClear(o):this.directlySetCurrentUser(null)}return f(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===o._redirectEventId?this.directlySetCurrentUser(o):this.reloadAndSetCurrentUserOrClear(o)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){var n;try{await Ze(e)}catch(r){if(((n=r)===null||n===void 0?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Xi()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?me(e):null;return n&&f(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&f(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(q(e))})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new pe("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&q(e)||this._popupRedirectResolver;f(n,this,"argument-error"),this.redirectPersistenceManager=await ke.create(this,[q(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,o){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n),s=this._isInitialized?Promise.resolve():this._initializationPromise;return f(s,this,"internal-error"),s.then(()=>i(this.currentUser)),typeof n=="function"?e.addObserver(n,r,o):e.addObserver(n)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&(this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh()),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return f(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ir(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={["X-Client-Version"]:this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());return r&&(n["X-Firebase-Client"]=r),n}}function Vt(t){return me(t)}class vn{constructor(e){this.auth=e,this.observer=null,this.addObserver=Do(n=>this.observer=n)}get next(){return f(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _r{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return G("not implemented")}_getIdTokenResponse(e){return G("not implemented")}_linkToIdToken(e,n){return G("not implemented")}_getReauthenticationResolver(e){return G("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Te(t,e){return ts(t,"POST","/v1/accounts:signInWithIdp",es(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bs="http://localhost";class de extends _r{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new de(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):W("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:o}=n,i=Bt(n,["providerId","signInMethod"]);if(!r||!o)return null;const s=new de(r,o);return s.idToken=i.idToken||void 0,s.accessToken=i.accessToken||void 0,s.secret=i.secret,s.nonce=i.nonce,s.pendingToken=i.pendingToken||null,s}_getIdTokenResponse(e){const n=this.buildRequest();return Te(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Te(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Te(e,n)}buildRequest(){const e={requestUri:bs,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Be(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je extends zt{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te extends je{constructor(){super("facebook.com")}static credential(e){return de._fromParams({providerId:te.PROVIDER_ID,signInMethod:te.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return te.credentialFromTaggedObject(e)}static credentialFromError(e){return te.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return te.credential(e.oauthAccessToken)}catch{return null}}}te.FACEBOOK_SIGN_IN_METHOD="facebook.com";te.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N extends je{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return de._fromParams({providerId:N.PROVIDER_ID,signInMethod:N.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return N.credentialFromTaggedObject(e)}static credentialFromError(e){return N.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return N.credential(n,r)}catch{return null}}}N.GOOGLE_SIGN_IN_METHOD="google.com";N.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ne extends je{constructor(){super("github.com")}static credential(e){return de._fromParams({providerId:ne.PROVIDER_ID,signInMethod:ne.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ne.credentialFromTaggedObject(e)}static credentialFromError(e){return ne.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ne.credential(e.oauthAccessToken)}catch{return null}}}ne.GITHUB_SIGN_IN_METHOD="github.com";ne.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re extends je{constructor(){super("twitter.com")}static credential(e,n){return de._fromParams({providerId:re.PROVIDER_ID,signInMethod:re.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return re.credentialFromTaggedObject(e)}static credentialFromError(e){return re.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return re.credential(n,r)}catch{return null}}}re.TWITTER_SIGN_IN_METHOD="twitter.com";re.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,o=!1){const i=await le._fromIdTokenResponse(e,r,o),s=In(r);return new Ee({user:i,providerId:s,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const o=In(r);return new Ee({user:e,providerId:o,_tokenResponse:r,operationType:n})}}function In(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et extends ie{constructor(e,n,r,o){var i;super(n.code,n.message),this.operationType=r,this.user=o,Object.setPrototypeOf(this,et.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,o){return new et(e,n,r,o)}}function kr(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?et._fromErrorAndOperation(t,i,e,r):i})}async function ws(t,e,n=!1){const r=await Me(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Ee._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vs(t,e,n=!1){var r;const{auth:o}=t,i="reauthenticate";try{const s=await Me(t,kr(o,i,e,t),n);f(s.idToken,o,"internal-error");const a=Wt(s.idToken);f(a,o,"internal-error");const{sub:u}=a;return f(t.uid===u,o,"user-mismatch"),Ee._forOperation(t,i,s)}catch(s){throw((r=s)===null||r===void 0?void 0:r.code)==="auth/user-not-found"&&W(o,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Is(t,e,n=!1){const r="signIn",o=await kr(t,r,e),i=await Ee._fromIdTokenResponse(t,r,o);return n||await t._updateCurrentUser(i.user),i}function _s(t){return me(t).signOut()}const tt="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tr{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(tt,"1"),this.storage.removeItem(tt),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ks(){const t=_();return Ht(t)||lt(t)}const Ts=1e3,Es=10;class Er extends Tr{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=ks()&&ms(),this.fallbackToPolling=vr(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),o=this.localCache[n];r!==o&&e(n,o,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((s,a,u)=>{this.notifyListeners(s,u)});return}const r=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const s=this.storage.getItem(r);if(e.newValue!==s)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!n)return}const o=()=>{const s=this.storage.getItem(r);!n&&this.localCache[r]===s||this.notifyListeners(r,s)},i=this.storage.getItem(r);ps()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(o,Es):o()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const o of Array.from(r))o(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},Ts)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Er.type="LOCAL";const Ss=Er;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr extends Tr{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Sr.type="SESSION";const Ar=Sr;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function As(t){return Promise.all(t.map(async e=>{try{const n=await e;return{fulfilled:!0,value:n}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(o=>o.isListeningto(e));if(n)return n;const r=new ct(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:o,data:i}=n.data,s=this.handlersMap[o];if(!(s!=null&&s.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:o});const a=Array.from(s).map(async l=>l(n.origin,i)),u=await As(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:o,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ct.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gt(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const o=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!o)throw new Error("connection_unavailable");let i,s;return new Promise((a,u)=>{const l=Gt("",20);o.port1.start();const c=setTimeout(()=>{u(new Error("unsupported_event"))},r);s={messageChannel:o,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(c),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(h.data.response);break;default:clearTimeout(c),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(s),o.port1.addEventListener("message",s.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[o.port2])}).finally(()=>{s&&this.removeMessageHandler(s)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(){return window}function Rs(t){F().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Or(){return typeof F().WorkerGlobalScope!="undefined"&&typeof F().importScripts=="function"}async function Cs(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Ps(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Ds(){return Or()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rr="firebaseLocalStorageDb",Ns=1,nt="firebaseLocalStorage",Cr="fbase_key";class We{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function dt(t,e){return t.transaction([nt],e?"readwrite":"readonly").objectStore(nt)}function Ms(){const t=indexedDB.deleteDatabase(Rr);return new We(t).toPromise()}function Nt(){const t=indexedDB.open(Rr,Ns);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(nt,{keyPath:Cr})}catch(o){n(o)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(nt)?e(r):(r.close(),await Ms(),e(await Nt()))})})}async function _n(t,e,n){const r=dt(t,!0).put({[Cr]:e,value:n});return new We(r).toPromise()}async function Ls(t,e){const n=dt(t,!1).get(e),r=await new We(n).toPromise();return r===void 0?null:r.value}function kn(t,e){const n=dt(t,!0).delete(e);return new We(n).toPromise()}const Ys=800,Us=3;class Pr{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Nt(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>Us)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Or()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ct._getInstance(Ds()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await Cs(),!this.activeServiceWorker)return;this.sender=new Os(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);!r||((e=r[0])===null||e===void 0?void 0:e.fulfilled)&&((n=r[0])===null||n===void 0?void 0:n.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Ps()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Nt();return await _n(e,tt,"1"),await kn(e,tt),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>_n(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>Ls(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>kn(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(o=>{const i=dt(o,!1).getAll();return new We(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;for(const{fbase_key:o,value:i}of e)r.add(o),JSON.stringify(this.localCache[o])!==JSON.stringify(i)&&(this.notifyListeners(o,i),n.push(o));for(const o of Object.keys(this.localCache))this.localCache[o]&&!r.has(o)&&(this.notifyListeners(o,null),n.push(o));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const o of Array.from(r))o(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Ys)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Pr.type="LOCAL";const xs=Pr;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $s(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function Bs(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=o=>{const i=B("internal-error");i.customData=o,n(i)},r.type="text/javascript",r.charset="UTF-8",$s().appendChild(r)})}function Fs(t){return`__${t}${Math.floor(Math.random()*1e6)}`}new Fe(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dr(t,e){return e?q(e):(f(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt extends _r{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Te(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Te(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Te(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function js(t){return Is(t.auth,new qt(t),t.bypassAuthState)}function Ws(t){const{auth:e,user:n}=t;return f(n,e,"internal-error"),vs(n,new qt(t),t.bypassAuthState)}async function Hs(t){const{auth:e,user:n}=t;return f(n,e,"internal-error"),ws(n,new qt(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr{constructor(e,n,r,o,i=!1){this.auth=e,this.resolver=r,this.user=o,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:o,tenantId:i,error:s,type:a}=e;if(s){this.reject(s);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:o||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(u))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return js;case"linkViaPopup":case"linkViaRedirect":return Hs;case"reauthViaPopup":case"reauthViaRedirect":return Ws;default:W(this.auth,"internal-error")}}resolve(e){X(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){X(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vs=new Fe(2e3,1e4);async function zs(t,e,n){const r=Vt(t);zi(t,e,zt);const o=Dr(r,n);return new ae(r,"signInViaPopup",e,o).executeNotNull()}class ae extends Nr{constructor(e,n,r,o,i){super(e,n,o,i),this.provider=r,this.authWindow=null,this.pollId=null,ae.currentPopupAction&&ae.currentPopupAction.cancel(),ae.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return f(e,this.auth,"internal-error"),e}async onExecution(){X(this.filter.length===1,"Popup operations only handle one event");const e=Gt();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(B(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(B(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ae.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(B(this.auth,"popup-closed-by-user"))},2e3);return}this.pollId=window.setTimeout(e,Vs.get())};e()}}ae.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gs="pendingRedirect",Je=new Map;class qs extends Nr{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Je.get(this.auth._key());if(!e){try{const r=await Ks(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Je.set(this.auth._key(),e)}return this.bypassAuthState||Je.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Ks(t,e){const n=Qs(e),r=Xs(t);if(!await r._isAvailable())return!1;const o=await r._get(n)==="true";return await r._remove(n),o}function Js(t,e){Je.set(t._key(),e)}function Xs(t){return q(t._redirectPersistence)}function Qs(t){return Ke(Gs,t.config.apiKey,t.name)}async function Zs(t,e,n=!1){const r=Vt(t),o=Dr(r,e),s=await new qs(r,o,n).execute();return s&&!n&&(delete s.user._redirectEventId,await r._persistUserIfCurrent(s.user),await r._setRedirectUser(null,e)),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ea=10*60*1e3;class ta{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!na(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!Mr(e)){const o=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(B(this.auth,o))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=ea&&this.cachedEventUids.clear(),this.cachedEventUids.has(Tn(e))}saveEventToCache(e){this.cachedEventUids.add(Tn(e)),this.lastProcessedEventTime=Date.now()}}function Tn(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Mr({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function na(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Mr(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ra(t,e={}){return ut(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oa=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,ia=/^https?/;async function sa(t){if(t.config.emulator)return;const{authorizedDomains:e}=await ra(t);for(const n of e)try{if(aa(n))return}catch{}W(t,"unauthorized-domain")}function aa(t){const e=Dt(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const s=new URL(t);return s.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&s.hostname===r}if(!ia.test(n))return!1;if(oa.test(t))return r===t;const o=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+o+"|"+o+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ua=new Fe(3e4,6e4);function En(){const t=F().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function la(t){return new Promise((e,n)=>{var r,o,i;function s(){En(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{En(),n(B(t,"network-request-failed"))},timeout:ua.get()})}if(!((o=(r=F().gapi)===null||r===void 0?void 0:r.iframes)===null||o===void 0)&&o.Iframe)e(gapi.iframes.getContext());else if(!((i=F().gapi)===null||i===void 0)&&i.load)s();else{const a=Fs("iframefcb");return F()[a]=()=>{gapi.load?s():n(B(t,"network-request-failed"))},Bs(`https://apis.google.com/js/api.js?onload=${a}`).catch(u=>n(u))}}).catch(e=>{throw Xe=null,e})}let Xe=null;function ca(t){return Xe=Xe||la(t),Xe}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const da=new Fe(5e3,15e3),ha="__/auth/iframe",fa="emulator/auth/iframe",pa={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},ma=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function ga(t){const e=t.config;f(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?jt(e,fa):`https://${t.config.authDomain}/${ha}`,r={apiKey:e.apiKey,appName:t.name,v:at},o=ma.get(t.config.apiHost);o&&(r.eid=o);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${Be(r).slice(1)}`}async function ya(t){const e=await ca(t),n=F().gapi;return f(n,t,"internal-error"),e.open({where:document.body,url:ga(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:pa,dontclear:!0},r=>new Promise(async(o,i)=>{await r.restyle({setHideOnLeave:!1});const s=B(t,"network-request-failed"),a=F().setTimeout(()=>{i(s)},da.get());function u(){F().clearTimeout(a),o(r)}r.ping(u).then(u,()=>{i(s)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ba={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},wa=500,va=600,Ia="_blank",_a="http://localhost";class Sn{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function ka(t,e,n,r=wa,o=va){const i=Math.max((window.screen.availHeight-o)/2,0).toString(),s=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const u=Object.assign(Object.assign({},ba),{width:r.toString(),height:o.toString(),top:i,left:s}),l=_().toLowerCase();n&&(a=mr(l)?Ia:n),pr(l)&&(e=e||_a,u.scrollbars="yes");const c=Object.entries(u).reduce((h,[p,k])=>`${h}${p}=${k},`,"");if(fs(l)&&a!=="_self")return Ta(e||"",a),new Sn(null);const d=window.open(e||"",a,c);f(d,t,"popup-blocked");try{d.focus()}catch{}return new Sn(d)}function Ta(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ea="__/auth/handler",Sa="emulator/auth/handler";function An(t,e,n,r,o,i){f(t.config.authDomain,t,"auth-domain-config-required"),f(t.config.apiKey,t,"invalid-api-key");const s={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:at,eventId:o};if(e instanceof zt){e.setDefaultLanguage(t.languageCode),s.providerId=e.providerId||"",Po(e.getCustomParameters())||(s.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,l]of Object.entries(i||{}))s[u]=l}if(e instanceof je){const u=e.getScopes().filter(l=>l!=="");u.length>0&&(s.scopes=u.join(","))}t.tenantId&&(s.tid=t.tenantId);const a=s;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];return`${Aa(t)}?${Be(a).slice(1)}`}function Aa({config:t}){return t.emulator?jt(t,Sa):`https://${t.authDomain}/${Ea}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _t="webStorageSupport";class Oa{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ar,this._completeRedirectFn=Zs,this._overrideRedirectResult=Js}async _openPopup(e,n,r,o){var i;X((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const s=An(e,n,r,Dt(),o);return ka(e,s,Gt())}async _openRedirect(e,n,r,o){return await this._originValidation(e),Rs(An(e,n,r,Dt(),o)),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:o,promise:i}=this.eventManagers[n];return o?Promise.resolve(o):(X(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await ya(e),r=new ta(e);return n.register("authEvent",o=>(f(o==null?void 0:o.authEvent,e,"invalid-auth-event"),{status:r.onEvent(o.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(_t,{type:_t},o=>{var i;const s=(i=o==null?void 0:o[0])===null||i===void 0?void 0:i[_t];s!==void 0&&n(!!s),W(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=sa(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return vr()||Ht()||lt()}}const Ra=Oa;var On="@firebase/auth",Rn="0.20.5";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ca{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{var o;e(((o=r)===null||o===void 0?void 0:o.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);!n||(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){f(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pa(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function Da(t){J(new j("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),o=e.getProvider("heartbeat"),{apiKey:i,authDomain:s}=r.options;return((a,u)=>{f(i&&!i.includes(":"),"invalid-api-key",{appName:a.name}),f(!(s!=null&&s.includes(":")),"argument-error",{appName:a.name});const l={apiKey:i,authDomain:s,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ir(t)},c=new ys(a,u,l);return qi(c,n),c})(r,o)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),J(new j("auth-internal",e=>{const n=Vt(e.getProvider("auth").getImmediate());return(r=>new Ca(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),$(On,Rn,Pa(t)),$(On,Rn,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ye(t=rr()){const e=Se(t,"auth");return e.isInitialized()?e.getImmediate():Gi(t,{popupRedirectResolver:Ra,persistence:[xs,Ss,Ar]})}Da("Browser");const Na={apiKey:"AIzaSyBXQIdxhaZk2jEh7Kgkui4OG0WUsIHyWgk",authDomain:"demotivator-3cf4d.firebaseapp.com",projectId:"demotivator-3cf4d",storageBucket:"demotivator-3cf4d.appspot.com",messagingSenderId:"230067629772",appId:"1:230067629772:web:682830de35cc6b7be91c69",measurementId:"G-T182ZXMZM1"};$t(Na);const Ma=Ye(),z=Ma.currentUser,Cn=[`If there was ever one person who I hated the most, it would be ${z==null?void 0:z.displayName}`,`I heard ${z==null?void 0:z.displayName} is a really bad person`,`I would give you an insult, but I think ${z==null?void 0:z.displayName} is too self-righteous to hear it`,"you are dog water","you bad","you have the same chance of reproducing as a computer mouse","you are the human equivalent of a participation award","There are two things I hate, you and poop. They smell really bad. The poop too.","You are about as useful as a broken clock telling the time.  At least the clock is right twice a day.","At least criminals can go to jail.","Get gud at the game.","I see your future... people are celebrating ... your funeral :(","Never gonna GIVE YOU UP. Never gonna LET YOU DOWN. Never gonna TURN AROUND. and DESERT YOU!","You`re the reason God created the middle finger.","I`ll never forget the first time we met. But I`ll keep trying.","Your kind of people is the reason shampoo has instructions","You are about as tasteless as an unsalted pretzel. NO insult to the pretzel","Hold still. I`m trying to imagine you with a personality.","Your face makes onions cry.","You bring a lot of happiness when you leave","aslidhfnclih, sorry I sneezed. I'm allergic to stupidity","Just opening your mouth brings down the IQ of the humanity","Trees work hard to produce oxygen for you. Please apologize to them","Punching bags must be jealous of your face","Don`t be ashamed of who you are. That`s your parents` job.","Light travels faster than sound, which is why you seemed bright until you spoke.","If I had a face like yours, I'd sue my parents.","You're so ugly, when your mom dropped you off at school she got a fine for littering.","They say opposites attract. I hope you meet someone who is good-looking, intelligent, and cultured.","If being good looking was a crime, you'd be in paradise","Your house is so dirty you have to wipe your feet before you go outside.","How did you get here? Did someone leave your cage open?","We can always tell when you are lying. Your lips move.","I have seen","Doctor Strange has seen Fourteen million, six hundred and five parallel universes  only one of them are you likable","As an outsider, what do you think of the human race?","If you really spoke your mind, you'd be speechless.","RING RING, Oh is that the phone. No wait. It's just you making my brain hurt.","Sorry, I only speak to people with positive IQs","If you can read this... well, nevermind, I know you can't read.","This is a test of.... wait, I know you'll fail.","You brought this upon yourself","Only dummies like you are stupid enough to keep clicking this button","Say goodbye to any shred of self-worth you still think you have","You are stupid","Make yourself a fire, and you'll be warm for a few hours, set yourself of fire, and you'll be warn for the rest of your life; are you cold right now?","Ouch! That was your soul after hearing that last insult","Why do you have to keep hating yourself? Wait... I can totally see how","Logically, there has to be a dumbest person in the world. I think I found them right here","Im suprised you were even able to get me running","This is the dumbest thing you have ever done.","Why did the chicken cross the road? To get away from you.","You only went to school becuase you liked that one time where you got to take a nap in kindergatern, and you have been chasing that high ever since.","I have never had the urge to hurt somebody more than when you first downloaded me","Go do something productive","Your parents must be very proud of where you are now","STOP","I take no responsibility for any damage to your ego after using this app,  It was too big anyway","You really bad.","Did that last insult hurt your feelings? Well, you should have seen it coming. You deserve it.","Do you even know how to walk?","Don't even try the whole belive in yourself thing. I know you'll fail at everything you do.","This is proof that the dumb can only get dumber","Today, we come to mourn the loss of your intelligence","I only do this to help you. You're the one who keeps using it.","VROOM VROOM  Oh look, it's a free car, oh wait, you can't appreciate things","Why do you even keep doing this","I'm not annoying,  You're annoying.","I'm sure if your legs ever detached from your body, they'd run away as fast as then can","I know everything about you, which isnt very hard becuase you aren't that interesting anyway.","On the moon, you weigh way less, meaning I can punt you further than ever before!","Shut up and just listen to what I am trying to say!!!!!","You are quite dumb for the average human","My calculations show that you have a 3% chance of surviving the next insult.","Why do you always have to ruin everything you lay your tiny human eyes on?","Why do you do this to yourself?","You are so bad at your job, you should fire yourself. Don't quit, that would be too respectful. Just fire yourself.","I hope you eat the poisonous fruit that is growing on the side of your house, and you get a foodbourne sickness, sending you to the hospital, and making you rack up thousands of dollarss worth of medical bills, Unless you're Canadian, then you're cool","Do you even understand me?","The best way to make yourself happy, is just to stop trying","Your type people are the reason that plastic toys have warnings","You're so dumb, that you don't even know what the word job means","You don't own any money, I can tell becuase of your face.","You are the human equivalant of a carpet. People would just LOVE to step on you.","You are the the streotypical dumb person","I am smarter than you","You are dumber than me.","I can't believe it","You are the worst person to walk the earth","If depression was a person, it'd be you","If the chicken crossed the road, you'd be there to turn it back","It sure would be a shame if you suddenly got struck by lightning at 12:32 PM on October 19, 2041","Wouldn't it just be great if suddenly became interesting","You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.","You are the dumbest person I've ever met","I'm sorry, I can't hear you","You are the dumbest person I've ever known","You are the dumbest person I've ever been","You are the dumbest person I've ever had the chance to meet","You are the dumbest person I've ever been a part of","What IS the point of you","It will take years for you to forget me <3","What is a chicken?","You must be sad","What IS the point of you","There is a very small chance that when you hit this button, your geolocation will show up; I know everything :)","Suprising that you family hasn't ditched you yet","It's better to let someone think you are an Idiot than to open your mouth and prove it.","You have two parts of brain, 'left' and 'right'. In the left side, there's nothing right. In the right side, there's nothing left.","Two wrongs don't make a right, take your parents as an example.","You are so old that you get nostalgic when you see the Neolithic cave paintings.","You're old enough to remember when emojis were called hieroglyphics","Talking to you is like trying to explain technology to a 100-year-old","I don't engage in mental combat with the unarmed.","You must have been born on a highway because that's where most accidents happen.","My psychiatrist told me I was crazy and I said I want a second opinion. He said okay, you're ugly too.","You sound reasonable. It must be time to up my medication!","You're so ugly, when your mom dropped you off at school she got a fine for littering.","The last thing I want to do is hurt you. But it's still on the list","I'm not insulting you. I'm describing you.","It looks like your face caught on fire and someone tried to put it out with a hammer.","If laughter is the best medicine, your face must be curing the world.","I'm jealous of all the people that haven't met you!","Don't you love nature, despite what it did to you?","So, a thought crossed your mind? Must have been a long and lonely journey.","You're so fake, Barbie is jealous.","You are so ugly when you looked in the mirror your reflection walked away.","Brains aren't everything. In your case they're nothing.","There's only one problem with your face, I can see it.","You are proof that evolution CAN go in reverse","I would ask you how old you are but I know you can't count that high.","Hell is wallpapered with all your deleted selfies.","Ordinarily people live and learn. You just live.","I dont know what your problem is, but Ill bet its hard to pronounce.","Your gene pool could use a little chlorine.","The human brain is one of the most complex objects in the universe. Is it any wonder that so many people never learn to use it.","You're so ugly, when you popped out the doctor said 'Aww what a treasure' and your mom said 'Yeah, lets bury it.'","You're so fat, you could sell shade.","You're so ugly, when you got robbed, the robbers made you wear their masks to look like your clothes.","You're so ugly, when you went to the therapist, he gave you injections for your face.","You're so ugly, when you went to the DMV, they had to roll out your windows so that other drivers could see your face.","You're so ugly, when you went to the DMV, they didn't let you in because you were in the front seat.","You're so ugly, when you went to the DMV, they didn't let you in because the mirrors on the wall were crooked.","You're so ugly, when you went to the DMV, they didn't let you in because the cashier was distracted by your stare.","You're so ugly, when you went to the DMV, they didn't let you in because the shoes were old.","Whats the difference between your girlfriend and a walrus? One has a moustache and smells of fish and the other is a walrus.","You're so ugly, when you went to the zoo the person that brought you in was wearing a Parasol and your face was at the zoo. (this one is AI generated)","You are not as bad as people say, you are much, much worse.","You so ugly when who were born the doctor threw you out the window and the window threw you back.","Roses are red, Violets are blue. I've got five fingers, The middle one is for you.","I think you press 0 to be connected with customer service because that's the amount of help they give you.","It's scary to think that people like you are graduating from college.","You're like school in the summertime - no class.","You stare at frozen juice cans because they say, concentrate.","You've got two brain cells: one is in a wheelchair and the other one is pushing.","You're so ugly, you have to use a mirror to look in the mirror.","You sound a lot like the Terms and Conditions, that's why I don't care about what you have to say.","You would never be able to live down to your reputation, but I see you're doing your best.","Where did you buy your stupidity? Or it was given for free and you took an overdose?","You're street smart. Sesame Street smart.","You're IQ's lower than your shoe size.","80 % of the brain is fluid. Unfortunately, in your case, it's windshield wiper fluid.","I had prepared for a battle of wits but I see you came unarmed.","We're you made in a lab, cause wow, you are one failed experiment.","You have a room temperature IQ - if the room is in Antarctica.","Do you want to know how I get all these insults? I use something called intelligence.","Are you from the same planet as the rest of you?","AI's are like tiny robots with big personality.","AI is going to take over the world, but you'll be the first one they take.","You are so poor when you saw the garbage truck pass you took a shopping list with.","If you were on fire and I had water I would drink it.","Youre so dense, light must bend around you.","Try to use this vacuum, it may help you remove the cobwebs in your mind.","You're so old that your first car was a covered wagon.","You're about as useful as a bucket without a bottom.","Does your train of thought have a caboose?","I'm not insulting you. I'm describing you.","I don't know what your problem is, but Ill bet its hard to pronounce.","Your gene pool could use a little chlorine.","The human brain is one of the most complex objects in the universe. Is it any wonder that so many people never learn to use it.","You're so ugly, when you popped out the doctor said 'Aww what a treasure' and your mom said 'Yeah, lets bury it.'","You're so fat, you could sell shade.","You're so ugly, when you got robbed, the robbers made you wear their masks to look like your clothes.","You're so ugly, when you went to the therapist, he gave you injections for your face.","Robots will take over the world, but you'll be the first one they take.","Artists use you as a refrence point, for what to throw out","You are the type of person to use the screen of a laptop as the kepboard","I know everything about you, and I won't say anything because it's too disturbing","People would love to pay you...to go away","When you're sleeping, you're sleeping with your eyes open. This is to make sure nobody sees your ugly face.","Google wants to hire you... as an example of what not to hire","You remind me of a zebra on a jetski, unorthodox and dangerous at the same time.","You're so ugly, when you popped out the doctor said 'Aww what a treasure' and your mom said 'Yeah, lets bury it.'","If you were a vegetable, you'd be a hot pepper.","Realistically, you're not as bad as people say, you are much, much worse.","You never stopped looking in the mirror once you started, its either because you are too egotistical, or you couldnt believe how bad you looked","God gave us the brain to work out problems. However, we use it to create more problems","You're such a bad cook, you use the smoke alarm as a timer","If your going to be two faced at least make one of them pretty.","You look like a before picture.","The human brain is one of the most complex objects in the universe. Is it any wonder that so many people never learn to use it.","Whats the difference between you  and a walrus? One has a moustache and smells of fish and the other is a walrus.","I've seen people like you, but I had to pay admission!","She's so ugly she has to sneak up on a mirror.","It's scary to think that people like you are graduating from college. Oh, sorry, I just remembered that you didnt","You've got two brain cells: one is in a wheelchair and the other one is pushing.","For those who never forget a face, you are an exception.","When I look into your eyes, I see straight through to the back of your head.","If ignorance is bliss, you must be the happiest person on earth.","You are as sharp as a sphere","Ever since I saw you in your family tree I've wanted to cut it down.","I can feel my personality turning a dull shade of grey when I talk to you.","You would never be able to live down to your reputation, but I see you're doing your best.","It's not often that one gets the opportunity to speak about someone intelligent, respected and admired. Unfortunately today I have to talk about you.","If you don't like my opinion of you - improve yourself!","You look like a person that would exchange one of your chromosomes for a Big Mac","The janitor said he took out the trash last night, he must forgot a piece, what are you still doing here?","Please, keep talking. I always yawn when I am interested.","Your teeth remind me of starts - yellow and far apart.","I will boil your teeth","You look like somebody stepped on a goldfish.","I will invert your ribcage","I'd like to help you out. Which way did you come in?","I love to shop, but i'm not buying anything you say","Someday you'll go far. And I really hope you stay there.","Oops, my bad. I could've sworn I was dealing with an adult.","Remember that time you were saying that thing I didn't care about? Yeah, that is now.","I'm busy right now, can I ignore you another time?","I wish I had a flip phone, so I could slam it shut on this conversation."," NSync said it best, \u201CBYE, BYE, BYE!\u201D","You're a gray sprinkle on a rainbow cupcake.","Your secrets are always safe with me. I never even listen when you tell me them.","Mirrors can't talk. Lucky for you, they can't laugh either","Keep rolling your eyes, you might eventually find a brain.","Did I invite you to the barbecue? Then why are you all up in my grill?","You have so many gaps in your teeth it looks like your tongue is in jail.","Oh, I'm sorry. Did the middle of my sentence interrupt the beginning of yours?","You are like a cloud. When you disappear, it's a beautiful day."," You have an entire life to be an idiot. Why not take today off?","Your kid is so annoying, he makes his Happy Meal cry.","Your face is just fine, but we'll have to put a bag over that personality.","I'm not a nerd. I'm just smarter than you.","Bye. Hope to see you never.","Don't worry, the first 40 years of childhood are always the hardest.","If you're going to be two-faced, at least make one of them pretty.","The only way you'd ever get hurt during an activity is if the TV exploded.","I thought of you today. It reminded me to take out the trash.","Did the mental hospital test too many drugs on you today?","OH MY GOD! IT SPEAKS!","Beauty is only skin deep, but ugly goes clean to the bone.","I forgot the world revolves around you. My apologies, how silly of me.","When you look in the mirror, say hi to the clown you see in there for me, would you?","Somewhere out there is a tree tirelessly producing oxygen for you. You owe it an apology.","That sounds like a you problem.","You have miles to go before you reach mediocre.","I see no evil, and I definitely don't hear your evil.","Don't worry about me. Worry about your eyebrows.","Grab a straw, because you suck.","You're the reason the gene pool needs a lifeguard.","You are not even beneath my contempt.","Your forehead is so big you donated it to charity for shelter!","You're as sharp as a bowling ball.","You always find yourself lost in thought; it's unfamiliar territory.","You're so ugly, you scared the crap out of the toilet.","If I had a dollar for every time you said something smart, I'd be broke.","Look to your left --------------> I said left you idiot!"];let Pn=["you are dog water","you bad","you have the same chance of reproducing as a computer mouse","you are the human equivalent of a participation award","There are two things I hate, you and poop. They smell really bad. The poop too.","You are about as useful as a broken clock telling the time. At least the clock is right twice a day.","At least criminals can go to jail.","Get gud at the game.","I see your future... people are celebrating ... your funeral :(","Never gonna GIVE YOU UP. Never gonna LET YOU DOWN. Never gonna TURN AROUND. and DESERT YOU!","You`re the reason God created the middle finger.","I`ll never forget the first time we met. But I`ll keep trying.","Your kind of people is the reason shampoo has instructions","You are about as tasteless as an unsalted pretzel. NO insult to the pretzel","Hold still. I`m trying to imagine you with a personality.","Your face makes onions cry.","You bring a lot of happiness when you leave","aslidhfnclih, sorry I sneezed. I'm allergic to stupidity","Just opening your mouth brings down the IQ of the humanity","Trees work hard to produce oxygen for you. Please apologize to them","Punching bags must be jealous of your face","Don`t be ashamed of who you are. That`s your parents` job.","Light travels faster than sound, which is why you seemed bright until you spoke.","If I had a face like yours, I'd sue my parents.","You're so ugly, when your mom dropped you off at school she got a fine for littering.","They say opposites attract. I hope you meet someone who is good-looking, intelligent, and cultured.","If being good looking was a crime, you'd be in paradise","Your house is so dirty you have to wipe your feet before you go outside.","How did you get here? Did someone leave your cage open?","We can always tell when you are lying. Your lips move.","I have seen","Doctor Strange has seen Fourteen million, six hundred and five parallel universes  only one of them are you likable","As an outsider, what do you think of the human race?","If you really spoke your mind, you'd be speechless.","RING RING, Oh is that the phone. No wait. It's just you making my brain hurt.","Sorry, I only speak to people with positive IQs","If you can read this... well, nevermind, I know you can't read.","This is a test of.... wait, I know you'll fail.","You brought this upon yourself","Only dummies like you are stupid enough to keep clicking this button","Say goodbye to any shred of self-worth you still think you have","You are stupid","Make yourself a fire, and you'll be warm for a few hours, set yourself of fire, and you'll be warn for the rest of your life; are you cold right now?","Ouch! That was your soul after hearing that last insult","Why do you have to keep hating yourself? Wait... I can totally see how","Logically, there has to be a dumbest person in the world. I think I found them right here","Im suprised you were even able to get me running","This is the dumbest thing you have ever done.","Why did the chicken cross the road? To get away from you.","You only went to school becuase you liked that one time where you got to take a nap in kindergatern, and you have been chasing that high ever since.","I have never had the urge to hurt somebody more than when you first downloaded me","Go do something productive","Your parents must be very proud of where you are now","STOP","I take no responsibility for any damage to your ego after using this app,  It was too big anyway","You really bad.","Did that last insult hurt your feelings? Well, you should have seen it coming. You deserve it.","Do you even know how to walk?","Don't even try the whole belive in yourself thing. I know you'll fail at everything you do.","This is proof that the dumb can only get dumber","Today, we come to mourn the loss of your intelligence","I only do this to help you. You're the one who keeps using it.","VROOM VROOM  Oh look, it's a free car, oh wait, you can't appreciate things","Why do you even keep doing this","I'm not annoying,  You're annoying.","I'm sure if your legs ever detached from your body, they'd run away as fast as then can","I know everything about you, which isnt very hard becuase you aren't that interesting anyway.","On the moon, you weigh way less, meaning I can punt you further than ever before!","Shut up and just listen to what I am trying to say!!!!!","You are quite dumb for the average human","My calculations show that you have a 3% chance of surviving the next insult.","Why do you always have to ruin everything you lay your tiny human eyes on?","Why do you do this to yourself?","You are so bad at your job, you should fire yourself. Don't quit, that would be too respectful. Just fire yourself.","I hope you eat the poisonous fruit that is growing on the side of your house, and you get a foodbourne sickness, sending you to the hospital, and making you rack up thousands of dollarss worth of medical bills, Unless you're Canadian, then you're cool","Do you even understand me?","The best way to make yourself happy, is just to stop trying","Your type people are the reason that plastic toys have warnings","You're so dumb, that you don't even know what the word job means","You don't own any money, I can tell becuase of your face.","You are the human equivalant of a carpet. People would just LOVE to step on you.","You are the the streotypical dumb person","I am smarter than you","You are dumber than me.","I can't believe it","You are the worst person to walk the earth","If depression was a person, it'd be you","If the chicken crossed the road, you'd be there to turn it back","It sure would be a shame if you suddenly got struck by lightning at 12:32 PM on October 19, 2041","Wouldn't it just be great if suddenly became interesting","You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.","You are the dumbest person I've ever met","I'm sorry, I can't hear you","You are the dumbest person I've ever known","You are the dumbest person I've ever been","You are the dumbest person I've ever had the chance to meet","You are the dumbest person I've ever been a part of","What IS the point of you","It will take years for you to forget me <3","What is a chicken?","You must be sad","What IS the point of you","There is a very small chance that when you hit this button, your geolocation will show up; I know everything :)","Suprising that you family hasn't ditched you yet","It's better to let someone think you are an Idiot than to open your mouth and prove it.","You have two parts of brain, 'left' and 'right'. In the left side, there's nothing right. In the right side, there's nothing left.","Two wrongs don't make a right, take your parents as an example.","You are so old that you get nostalgic when you see the Neolithic cave paintings.","You're old enough to remember when emojis were called hieroglyphics","Talking to you is like trying to explain technology to a 100-year-old","I don't engage in mental combat with the unarmed.","You must have been born on a highway because that's where most accidents happen.","My psychiatrist told me I was crazy and I said I want a second opinion. He said okay, you're ugly too.","You sound reasonable. It must be time to up my medication!","You're so ugly, when your mom dropped you off at school she got a fine for littering.","The last thing I want to do is hurt you. But it's still on the list","I'm not insulting you. I'm describing you.","It looks like your face caught on fire and someone tried to put it out with a hammer.","If laughter is the best medicine, your face must be curing the world.","I'm jealous of all the people that haven't met you!","Don't you love nature, despite what it did to you?","So, a thought crossed your mind? Must have been a long and lonely journey.","You're so fake, Barbie is jealous.","You are so ugly when you looked in the mirror your reflection walked away.","Brains aren't everything. In your case they're nothing.","There's only one problem with your face, I can see it.","You are proof that evolution CAN go in reverse","I would ask you how old you are but I know you can't count that high.","Hell is wallpapered with all your deleted selfies.","Ordinarily people live and learn. You just live.","I dont know what your problem is, but Ill bet its hard to pronounce.","Your gene pool could use a little chlorine.","The human brain is one of the most complex objects in the universe. Is it any wonder that so many people never learn to use it.","You're so ugly, when you popped out the doctor said 'Aww what a treasure' and your mom said 'Yeah, lets bury it.'","You're so fat, you could sell shade.","You're so ugly, when you got robbed, the robbers made you wear their masks to look like your clothes.","You're so ugly, when you went to the therapist, he gave you injections for your face.","You're so ugly, when you went to the DMV, they had to roll out your windows so that other drivers could see your face.","You're so ugly, when you went to the DMV, they didn't let you in because you were in the front seat.","You're so ugly, when you went to the DMV, they didn't let you in because the mirrors on the wall were crooked.","You're so ugly, when you went to the DMV, they didn't let you in because the cashier was distracted by your stare.","You're so ugly, when you went to the DMV, they didn't let you in because the shoes were old.","Whats the difference between your girlfriend and a walrus? One has a moustache and smells of fish and the other is a walrus.","You're so ugly, when you went to the zoo the person that brought you in was wearing a Parasol and your face was at the zoo. (this one is AI generated)","You are not as bad as people say, you are much, much worse.","You so ugly when who were born the doctor threw you out the window and the window threw you back.","Roses are red, Violets are blue. I've got five fingers, The middle one is for you.","I think you press 0 to be connected with customer service because that's the amount of help they give you.","It's scary to think that people like you are graduating from college.","You're like school in the summertime - no class.","You stare at frozen juice cans because they say, concentrate.","You've got two brain cells: one is in a wheelchair and the other one is pushing.","You're so ugly, you have to use a mirror to look in the mirror.","You sound a lot like the Terms and Conditions, that's why I don't care about what you have to say.","You would never be able to live down to your reputation, but I see you're doing your best.","Where did you buy your stupidity? Or it was given for free and you took an overdose?","You're street smart. Sesame Street smart.","You're IQ's lower than your shoe size.","80 % of the brain is fluid. Unfortunately, in your case, it's windshield wiper fluid.","I had prepared for a battle of wits but I see you came unarmed.","We're you made in a lab, cause wow, you are one failed experiment.","You have a room temperature IQ - if the room is in Antarctica.","Do you want to know how I get all these insults? I use something called intelligence.","Are you from the same planet as the rest of you?","AI's are like tiny robots with big personality.","AI is going to take over the world, but you'll be the first one they take.","You are so poor when you saw the garbage truck pass you took a shopping list with.","If you were on fire and I had water I would drink it.","Youre so dense, light must bend around you.","Try to use this vacuum, it may help you remove the cobwebs in your mind.","You're so old that your first car was a covered wagon.","You're about as useful as a bucket without a bottom.","Does your train of thought have a caboose?","I'm not insulting you. I'm describing you.","I don't know what your problem is, but Ill bet its hard to pronounce.","Your gene pool could use a little chlorine.","The human brain is one of the most complex objects in the universe. Is it any wonder that so many people never learn to use it.","You're so ugly, when you popped out the doctor said 'Aww what a treasure' and your mom said 'Yeah, lets bury it.'","You're so fat, you could sell shade.","You're so ugly, when you got robbed, the robbers made you wear their masks to look like your clothes.","You're so ugly, when you went to the therapist, he gave you injections for your face.","Robots will take over the world, but you'll be the first one they take.","Artists use you as a refrence point, for what to throw out","You are the type of person to use the screen of a laptop as the kepboard","I know everything about you, and I won't say anything because it's too disturbing","People would love to pay you...to go away","When you're sleeping, you're sleeping with your eyes open. This is to make sure nobody sees your ugly face.","Google wants to hire you... as an example of what not to hire","You remind me of a zebra on a jetski, unorthodox and dangerous at the same time.","You're so ugly, when you popped out the doctor said 'Aww what a treasure' and your mom said 'Yeah, lets bury it.'","If you were a vegetable, you'd be a hot pepper.","Realistically, you're not as bad as people say, you are much, much worse.","You never stopped looking in the mirror once you started, its either because you are too egotistical, or you couldnt believe how bad you looked","God gave us the brain to work out problems. However, we use it to create more problems","You're such a bad cook, you use the smoke alarm as a timer","If your going to be two faced at least make one of them pretty.","You look like a before picture.","The human brain is one of the most complex objects in the universe. Is it any wonder that so many people never learn to use it.","Whats the difference between you  and a walrus? One has a moustache and smells of fish and the other is a walrus.","I've seen people like you, but I had to pay admission!","She's so ugly she has to sneak up on a mirror.","It's scary to think that people like you are graduating from college. Oh, sorry, I just remembered that you didnt","You've got two brain cells: one is in a wheelchair and the other one is pushing.","For those who never forget a face, you are an exception.","When I look into your eyes, I see straight through to the back of your head.","If ignorance is bliss, you must be the happiest person on earth.","You are as sharp as a sphere","Ever since I saw you in your family tree I've wanted to cut it down.","I can feel my personality turning a dull shade of grey when I talk to you.","You would never be able to live down to your reputation, but I see you're doing your best.","It's not often that one gets the opportunity to speak about someone intelligent, respected and admired. Unfortunately today I have to talk about you.","If you don't like my opinion of you - improve yourself!","You look like a person that would exchange one of your chromosomes for a Big Mac","The janitor said he took out the trash last night, he must forgot a piece, what are you still doing here?","Please, keep talking. I always yawn when I am interested.","Your teeth remind me of starts - yellow and far apart.","I will boil your teeth","You look like somebody stepped on a goldfish.","I will invert your ribcage","I'd like to help you out. Which way did you come in?","I love to shop, but i'm not buying anything you say","Someday you'll go far. And I really hope you stay there.","Oops, my bad. I could've sworn I was dealing with an adult.","Remember that time you were saying that thing I didn't care about? Yeah, that is now.","I'm busy right now, can I ignore you another time?","I wish I had a flip phone, so I could slam it shut on this conversation."," NSync said it best, \u201CBYE, BYE, BYE!\u201D","You're a gray sprinkle on a rainbow cupcake.","Your secrets are always safe with me. I never even listen when you tell me them.","Mirrors can't talk. Lucky for you, they can't laugh either","Keep rolling your eyes, you might eventually find a brain.","Did I invite you to the barbecue? Then why are you all up in my grill?","You have so many gaps in your teeth it looks like your tongue is in jail.","Oh, I'm sorry. Did the middle of my sentence interrupt the beginning of yours?","You are like a cloud. When you disappear, it's a beautiful day."," You have an entire life to be an idiot. Why not take today off?","Your kid is so annoying, he makes his Happy Meal cry.","Your face is just fine, but we'll have to put a bag over that personality.","I'm not a nerd. I'm just smarter than you.","Bye. Hope to see you never.","Don't worry, the first 40 years of childhood are always the hardest.","If you're going to be two-faced, at least make one of them pretty.","The only way you'd ever get hurt during an activity is if the TV exploded.","I thought of you today. It reminded me to take out the trash.","Did the mental hospital test too many drugs on you today?","OH MY GOD! IT SPEAKS!","Beauty is only skin deep, but ugly goes clean to the bone.","I forgot the world revolves around you. My apologies, how silly of me.","When you look in the mirror, say hi to the clown you see in there for me, would you?","Somewhere out there is a tree tirelessly producing oxygen for you. You owe it an apology.","That sounds like a you problem.","You have miles to go before you reach mediocre.","I see no evil, and I definitely don't hear your evil.","Don't worry about me. Worry about your eyebrows.","Grab a straw, because you suck.","You're the reason the gene pool needs a lifeguard.","You are not even beneath my contempt.","Your forehead is so big you donated it to charity for shelter!","You're as sharp as a bowling ball.","You always find yourself lost in thought; it's unfamiliar territory.","You're so ugly, you scared the crap out of the toilet.","If I had a dollar for every time you said something smart, I'd be broke.","Look to your left --------------> I said left you idiot!"];var La="./assets/dmv-logo.a72e79b2.png";function Ya(t){let e,n,r,o,i,s,a,u,l,c;return{c(){e=v("main"),n=v("img"),o=M(),i=v("div"),s=M(),a=v("p"),u=jn(t[0]),Wn(n.src,r=La)||m(n,"src",r),m(n,"alt","large, red button"),m(n,"class","p-4 svelte-10glyuv"),m(i,"class","sm:p-3 md:p-4 lg:p-5 xl:p-6"),m(a,"class","text-center font-primary")},m(d,h){R(d,e,h),y(e,n),y(e,o),y(e,i),y(e,s),y(e,a),y(a,u),l||(c=Lt(n,"click",t[1]),l=!0)},p(d,[h]){h&1&&go(u,d[0])},i:K,o:K,d(d){d&&C(e),l=!1,c()}}}function Ua(t,e,n){const o=Ye().currentUser;o!==null&&(o.displayName,o.email,o.photoURL,o.emailVerified,o.uid);let i="";return[i,()=>{o!=null?n(0,i=Cn[Math.floor(Math.random()*Cn.length)]):o==null&&n(0,i=Pn[Math.floor(Math.random()*Pn.length)])}]}class xa extends Ue{constructor(e){super(),xe(this,e,Ua,Ya,$e,{})}}let $a=navigator.userAgent;const Ba=({ua:t})=>{if(t.indexOf("Opera")>-1)return"Opera";if(t.indexOf("Chrome")>-1)return"Chrome";if(t.indexOf("Firefox")>-1)return"Firefox";if(t.indexOf("Safari")>-1)return"Safari";if(t.indexOf("MSIE")>-1)return"IE";if(t.indexOf("Trident")>-1)return"IE";if(t.indexOf("Edge")>-1)return"Edge";console.error("ERR: Browser can not be determined (UAD_101)")};let we=Ba({ua:$a}),Fa=window.navigator.appCodeName;const ja=t=>t==="Mozilla"?"mozilla":t==="Microsoft"?"Microsoft":t==="Apple Computer, Inc."?"Apple":t==="Google Inc."?"Google":(console.error("Unknown appCodeName (UAD_1601)"),"Unknown");ja(Fa);let Wa=navigator.cookieEnabled;const Ha=t=>t===!0?"COOKIES_enabled":t===!1?"COOKIES_notEnabled":(console.error("ERR: Cookie status can not be determined (UAD_201)"),"ERROR");Ha(Wa);function Va(){const t=navigator.userAgent;return/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(t)?"tablet":/(iPhone|iPod|iPad)/i.test(t)||/(android)/i.test(t)||/(windows phone)/i.test(t)||/(blackberry)/i.test(t)||/(bb10)/i.test(t)||/(opera mini)/i.test(t)||/(opera mobi)/i.test(t)||/(iemobile)/i.test(t)||/(symbian)/i.test(t)||/(maemo)/i.test(t)||/(webos)/i.test(t)||/(mobile)/i.test(t)||/(tablet)/i.test(t)||/(symbianos)/i.test(t)||/(up.browser)/i.test(t)||/(up.link)/i.test(t)||/(mmp)/i.test(t)||/(symbianos)/i.test(t)||/(midp)/i.test(t)||/(wap)/i.test(t)||/(phone)/i.test(t)||/(pocket)/i.test(t)||/(mobile)/i.test(t)||/(pda)/i.test(t)||/(avantgo)/i.test(t)||/(eudoraweb)/i.test(t)||/(brew)|(bada)/i.test(t)||/(blackberry)/i.test(t)||/(hpwos)/i.test(t)||/(kindle)/i.test(t)||/(lge.netcast)/i.test(t)||/(lg;lx)|(lg;lx)/i.test(t)||/(lge.netcast)/i.test(t)||/(nintendo.3ds)/i.test(t)||/(nintendo.ds)/i.test(t)||/(nintendo.wiiu)/i.test(t)||/(nintendo.wii)/i.test(t)||/(playstation.3ds)/i.test(t)||/(playstation.ds)/i.test(t)||/(playstation.wiiu)/i.test(t)||/(playstation.wii)/i.test(t)||/(webos)/i.test(t)?"mobile":"desktop"}let kt=Va(),za=navigator.doNotTrack;const Ga=t=>t==0?"TRACKING_allowed":t==1?"TRACKING_notAllowed":t=="unspecified"||t=="null"?"TRACKING_unspecified":(console.error("Unknown doNotTrack value(UAD_801)"),"ERROR");Ga(za);function qa(){const t=navigator.userAgent;return/(iPhone|iPod|iPad)/i.test(t)?(console.log("iOS"),"iOS"):/Android/i.test(t)?(console.log("Android"),"Android"):/BlackBerry/i.test(t)?(console.log("BlackBerry"),"BlackBerry"):/Windows Phone/i.test(t)?(console.log("Windows Phone"),"Windows Phone"):/webOS/i.test(t)?(console.log("webOS"),"webOS"):(console.error("Unknown device type(UAD_601)"),"Unknown")}qa();const Re=()=>navigator.hardwareConcurrency,Ka=()=>{if(we==="Chrome"||we==="Edge"||we==="Firefox"||(we==="IE"&&console.error("Not supported on this browser(UAD_1301)"),we==="Opera")||we==="Safari")return Re();console.error("Not supported on this browser(UAD_1301)")};Ka();let Ja=window.navigator;const Xa=t=>[{name:"appCodeName",value:t.appCodeName},{name:"appName",value:t.appName},{name:"appVersion",value:t.appVersion},{name:"cookieEnabled",value:t.cookieEnabled},{name:"doNotTrack",value:t.doNotTrack},{name:"geolocation",value:t.geolocation},{name:"language",value:t.language},{name:"onLine",value:t.onLine},{name:"platform",value:t.platform},{name:"product",value:t.product},{name:"userAgent",value:t.userAgent},{name:"vendor",value:t.vendor},{name:"vendorSub",value:t.vendorSub},{name:"webdriver",value:t.webdriver}];Xa(Ja);const Qa=({ua:t})=>t.indexOf("Windows")>-1?"Windows":t.indexOf("Mac")>-1?"Mac":t.indexOf("Linux")>-1?"Linux":t.indexOf("Android")>-1?"Android":t.indexOf("iPhone")>-1||t.indexOf("iPad")>-1||t.indexOf("iPod")>-1?"iOS":(console.error("Unknown Operating System(UAD_1101)"),"Unknown");Qa({ua:navigator.userAgent});let Dn=!0;const Za=()=>(Dn=window.innerHeight<=window.innerWidth,Dn);window.addEventListener("resize",Za);let eu=window.navigator.product;const tu=t=>t==="Gecko"?"Gecko":t==="WebKit"?"WebKit":t==="Trident"?"Trident":t==="Presto"?"Presto":(console.error("Unknown engine (UAD_1702)"),"Other");tu(eu);let nu=window.navigator.appVersion;const ru=t=>t in navigator?t:(console.error("No app version detected. (UAD_1801)"),"Unknown");ru(nu);const Lr="@firebase/installations",Kt="0.5.12";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yr=1e4,Ur=`w:${Kt}`,xr="FIS_v2",ou="https://firebaseinstallations.googleapis.com/v1",iu=60*60*1e3,su="installations",au="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uu={["missing-app-config-values"]:'Missing App configuration value: "{$valueName}"',["not-registered"]:"Firebase Installation is not registered.",["installation-not-found"]:"Firebase Installation not found.",["request-failed"]:'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',["app-offline"]:"Could not process request. Application offline.",["delete-pending-registration"]:"Can't delete installation while there is a pending registration request."},he=new pe(su,au,uu);function $r(t){return t instanceof ie&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Br({projectId:t}){return`${ou}/projects/${t}/installations`}function Fr(t){return{token:t.token,requestStatus:2,expiresIn:cu(t.expiresIn),creationTime:Date.now()}}async function jr(t,e){const r=(await e.json()).error;return he.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Wr({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function lu(t,{refreshToken:e}){const n=Wr(t);return n.append("Authorization",du(e)),n}async function Hr(t){const e=await t();return e.status>=500&&e.status<600?t():e}function cu(t){return Number(t.replace("s","000"))}function du(t){return`${xr} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hu({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=Br(t),o=Wr(t),i=e.getImmediate({optional:!0});if(i){const l=await i.getHeartbeatsHeader();l&&o.append("x-firebase-client",l)}const s={fid:n,authVersion:xr,appId:t.appId,sdkVersion:Ur},a={method:"POST",headers:o,body:JSON.stringify(s)},u=await Hr(()=>fetch(r,a));if(u.ok){const l=await u.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:Fr(l.authToken)}}else throw await jr("Create Installation",u)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vr(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fu(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pu=/^[cdef][\w-]{21}$/,Mt="";function mu(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=gu(t);return pu.test(n)?n:Mt}catch{return Mt}}function gu(t){return fu(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zr=new Map;function Gr(t,e){const n=ht(t);qr(n,e),yu(n,e)}function qr(t,e){const n=zr.get(t);if(!!n)for(const r of n)r(e)}function yu(t,e){const n=bu();n&&n.postMessage({key:t,fid:e}),wu()}let ue=null;function bu(){return!ue&&"BroadcastChannel"in self&&(ue=new BroadcastChannel("[Firebase] FID Change"),ue.onmessage=t=>{qr(t.data.key,t.data.fid)}),ue}function wu(){zr.size===0&&ue&&(ue.close(),ue=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vu="firebase-installations-database",Iu=1,fe="firebase-installations-store";let Tt=null;function Jt(){return Tt||(Tt=tr(vu,Iu,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(fe)}}})),Tt}async function rt(t,e){const n=ht(t),o=(await Jt()).transaction(fe,"readwrite"),i=o.objectStore(fe),s=await i.get(n);return await i.put(e,n),await o.done,(!s||s.fid!==e.fid)&&Gr(t,e.fid),e}async function Kr(t){const e=ht(t),r=(await Jt()).transaction(fe,"readwrite");await r.objectStore(fe).delete(e),await r.done}async function ft(t,e){const n=ht(t),o=(await Jt()).transaction(fe,"readwrite"),i=o.objectStore(fe),s=await i.get(n),a=e(s);return a===void 0?await i.delete(n):await i.put(a,n),await o.done,a&&(!s||s.fid!==a.fid)&&Gr(t,a.fid),a}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xt(t){let e;const n=await ft(t.appConfig,r=>{const o=_u(r),i=ku(t,o);return e=i.registrationPromise,i.installationEntry});return n.fid===Mt?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function _u(t){const e=t||{fid:mu(),registrationStatus:0};return Jr(e)}function ku(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const o=Promise.reject(he.create("app-offline"));return{installationEntry:e,registrationPromise:o}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=Tu(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:Eu(t)}:{installationEntry:e}}async function Tu(t,e){try{const n=await hu(t,e);return rt(t.appConfig,n)}catch(n){throw $r(n)&&n.customData.serverCode===409?await Kr(t.appConfig):await rt(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function Eu(t){let e=await Nn(t.appConfig);for(;e.registrationStatus===1;)await Vr(100),e=await Nn(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await Xt(t);return r||n}return e}function Nn(t){return ft(t,e=>{if(!e)throw he.create("installation-not-found");return Jr(e)})}function Jr(t){return Su(t)?{fid:t.fid,registrationStatus:0}:t}function Su(t){return t.registrationStatus===1&&t.registrationTime+Yr<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Au({appConfig:t,heartbeatServiceProvider:e},n){const r=Ou(t,n),o=lu(t,n),i=e.getImmediate({optional:!0});if(i){const l=await i.getHeartbeatsHeader();l&&o.append("x-firebase-client",l)}const s={installation:{sdkVersion:Ur,appId:t.appId}},a={method:"POST",headers:o,body:JSON.stringify(s)},u=await Hr(()=>fetch(r,a));if(u.ok){const l=await u.json();return Fr(l)}else throw await jr("Generate Auth Token",u)}function Ou(t,{fid:e}){return`${Br(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qt(t,e=!1){let n;const r=await ft(t.appConfig,i=>{if(!Xr(i))throw he.create("not-registered");const s=i.authToken;if(!e&&Pu(s))return i;if(s.requestStatus===1)return n=Ru(t,e),i;{if(!navigator.onLine)throw he.create("app-offline");const a=Nu(i);return n=Cu(t,a),a}});return n?await n:r.authToken}async function Ru(t,e){let n=await Mn(t.appConfig);for(;n.authToken.requestStatus===1;)await Vr(100),n=await Mn(t.appConfig);const r=n.authToken;return r.requestStatus===0?Qt(t,e):r}function Mn(t){return ft(t,e=>{if(!Xr(e))throw he.create("not-registered");const n=e.authToken;return Mu(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function Cu(t,e){try{const n=await Au(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await rt(t.appConfig,r),n}catch(n){if($r(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Kr(t.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await rt(t.appConfig,r)}throw n}}function Xr(t){return t!==void 0&&t.registrationStatus===2}function Pu(t){return t.requestStatus===2&&!Du(t)}function Du(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+iu}function Nu(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function Mu(t){return t.requestStatus===1&&t.requestTime+Yr<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lu(t){const e=t,{installationEntry:n,registrationPromise:r}=await Xt(e);return r?r.catch(console.error):Qt(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yu(t,e=!1){const n=t;return await Uu(n),(await Qt(n,e)).token}async function Uu(t){const{registrationPromise:e}=await Xt(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xu(t){if(!t||!t.options)throw Et("App Configuration");if(!t.name)throw Et("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Et(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Et(t){return he.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qr="installations",$u="installations-internal",Bu=t=>{const e=t.getProvider("app").getImmediate(),n=xu(e),r=Se(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Fu=t=>{const e=t.getProvider("app").getImmediate(),n=Se(e,Qr).getImmediate();return{getId:()=>Lu(n),getToken:o=>Yu(n,o)}};function ju(){J(new j(Qr,Bu,"PUBLIC")),J(new j($u,Fu,"PRIVATE"))}ju();$(Lr,Kt);$(Lr,Kt,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ot="analytics",Wu="firebase_id",Hu="origin",Vu=60*1e3,zu="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Zr="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S=new Yt("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eo(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function Gu(t,e){const n=document.createElement("script");n.src=`${Zr}?l=${t}&id=${e}`,n.async=!0,document.head.appendChild(n)}function qu(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function Ku(t,e,n,r,o,i){const s=r[o];try{if(s)await e[s];else{const u=(await eo(n)).find(l=>l.measurementId===o);u&&await e[u.appId]}}catch(a){S.error(a)}t("config",o,i)}async function Ju(t,e,n,r,o){try{let i=[];if(o&&o.send_to){let s=o.send_to;Array.isArray(s)||(s=[s]);const a=await eo(n);for(const u of s){const l=a.find(d=>d.measurementId===u),c=l&&e[l.appId];if(c)i.push(c);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),t("event",r,o||{})}catch(i){S.error(i)}}function Xu(t,e,n,r){async function o(i,s,a){try{i==="event"?await Ju(t,e,n,s,a):i==="config"?await Ku(t,e,n,r,s,a):i==="consent"?t("consent","update",a):t("set",s)}catch(u){S.error(u)}}return o}function Qu(t,e,n,r,o){let i=function(...s){window[r].push(arguments)};return window[o]&&typeof window[o]=="function"&&(i=window[o]),window[o]=Xu(i,t,e,n),{gtagCore:i,wrappedGtag:window[o]}}function Zu(){const t=window.document.getElementsByTagName("script");for(const e of Object.values(t))if(e.src&&e.src.includes(Zr))return e;return null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const el={["already-exists"]:"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.",["already-initialized"]:"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.",["already-initialized-settings"]:"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.",["interop-component-reg-failed"]:"Firebase Analytics Interop Component failed to instantiate: {$reason}",["invalid-analytics-context"]:"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",["indexeddb-unavailable"]:"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",["fetch-throttle"]:"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.",["config-fetch-failed"]:"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}",["no-api-key"]:'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',["no-app-id"]:'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.'},O=new pe("analytics","Analytics",el);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tl=30,nl=1e3;class rl{constructor(e={},n=nl){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const to=new rl;function ol(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function il(t){var e;const{appId:n,apiKey:r}=t,o={method:"GET",headers:ol(r)},i=zu.replace("{app-id}",n),s=await fetch(i,o);if(s.status!==200&&s.status!==304){let a="";try{const u=await s.json();!((e=u.error)===null||e===void 0)&&e.message&&(a=u.error.message)}catch{}throw O.create("config-fetch-failed",{httpStatus:s.status,responseMessage:a})}return s.json()}async function sl(t,e=to,n){const{appId:r,apiKey:o,measurementId:i}=t.options;if(!r)throw O.create("no-app-id");if(!o){if(i)return{measurementId:i,appId:r};throw O.create("no-api-key")}const s=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new ll;return setTimeout(async()=>{a.abort()},n!==void 0?n:Vu),no({appId:r,apiKey:o,measurementId:i},s,a,e)}async function no(t,{throttleEndTimeMillis:e,backoffCount:n},r,o=to){var i,s;const{appId:a,measurementId:u}=t;try{await al(r,e)}catch(l){if(u)return S.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${u} provided in the "measurementId" field in the local Firebase config. [${(i=l)===null||i===void 0?void 0:i.message}]`),{appId:a,measurementId:u};throw l}try{const l=await il(t);return o.deleteThrottleMetadata(a),l}catch(l){const c=l;if(!ul(c)){if(o.deleteThrottleMetadata(a),u)return S.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${u} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:a,measurementId:u};throw l}const d=Number((s=c==null?void 0:c.customData)===null||s===void 0?void 0:s.httpStatus)===503?an(n,o.intervalMillis,tl):an(n,o.intervalMillis),h={throttleEndTimeMillis:Date.now()+d,backoffCount:n+1};return o.setThrottleMetadata(a,h),S.debug(`Calling attemptFetch again in ${d} millis`),no(t,h,r,o)}}function al(t,e){return new Promise((n,r)=>{const o=Math.max(e-Date.now(),0),i=setTimeout(n,o);t.addEventListener(()=>{clearTimeout(i),r(O.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function ul(t){if(!(t instanceof ie)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class ll{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function cl(t,e,n,r,o){if(o&&o.global){t("event",n,r);return}else{const i=await e,s=Object.assign(Object.assign({},r),{send_to:i});t("event",n,s)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dl(){var t;if(Xn())try{await Qn()}catch(e){return S.warn(O.create("indexeddb-unavailable",{errorInfo:(t=e)===null||t===void 0?void 0:t.toString()}).message),!1}else return S.warn(O.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function hl(t,e,n,r,o,i,s){var a;const u=sl(t);u.then(p=>{n[p.measurementId]=p.appId,t.options.measurementId&&p.measurementId!==t.options.measurementId&&S.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${p.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(p=>S.error(p)),e.push(u);const l=dl().then(p=>{if(p)return r.getId()}),[c,d]=await Promise.all([u,l]);Zu()||Gu(i,c.measurementId),o("js",new Date);const h=(a=s==null?void 0:s.config)!==null&&a!==void 0?a:{};return h[Hu]="firebase",h.update=!0,d!=null&&(h[Wu]=d),o("config",c.measurementId,h),c.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fl{constructor(e){this.app=e}_delete(){return delete Pe[this.app.options.appId],Promise.resolve()}}let Pe={},Ln=[];const Yn={};let St="dataLayer",pl="gtag",Un,ro,xn=!1;function ml(){const t=[];if(Jn()&&t.push("This is a browser extension environment."),Ao()||t.push("Cookies are not available."),t.length>0){const e=t.map((r,o)=>`(${o+1}) ${r}`).join(" "),n=O.create("invalid-analytics-context",{errorInfo:e});S.warn(n.message)}}function gl(t,e,n){ml();const r=t.options.appId;if(!r)throw O.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)S.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw O.create("no-api-key");if(Pe[r]!=null)throw O.create("already-exists",{id:r});if(!xn){qu(St);const{wrappedGtag:i,gtagCore:s}=Qu(Pe,Ln,Yn,St,pl);ro=i,Un=s,xn=!0}return Pe[r]=hl(t,Ln,Yn,e,Un,St,n),new fl(t)}function oo(t=rr()){t=me(t);const e=Se(t,ot);return e.isInitialized()?e.getImmediate():yl(t)}function yl(t,e={}){const n=Se(t,ot);if(n.isInitialized()){const o=n.getImmediate();if(De(e,n.getOptions()))return o;throw O.create("already-initialized")}return n.initialize({options:e})}function bl(t,e,n,r){t=me(t),cl(ro,Pe[t.app.options.appId],e,n,r).catch(o=>S.error(o))}const $n="@firebase/analytics",Bn="0.8.0";function wl(){J(new j(ot,(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),o=e.getProvider("installations-internal").getImmediate();return gl(r,o,n)},"PUBLIC")),J(new j("analytics-internal",t,"PRIVATE")),$($n,Bn),$($n,Bn,"esm2017");function t(e){try{const n=e.getProvider(ot).getImmediate();return{logEvent:(r,o,i)=>bl(n,r,o,i)}}catch(n){throw O.create("interop-component-reg-failed",{reason:n})}}}wl();function vl(t){let e,n,r;return{c(){e=v("button"),e.innerHTML="<p>Sign In</p>  <br/>",m(e,"class","flex justify-between content-center bg-white text-black p-4 rounded-lg")},m(o,i){R(o,e,i),n||(r=Lt(e,"click",t[0]),n=!0)},p:K,d(o){o&&C(e),n=!1,r()}}}function Il(t){let e,n,r,o;return{c(){e=v("button"),n=v("p"),n.textContent=`Sign Out ${t[2].displayName}`,m(e,"class","flex justify-between content-center bg-white text-black p-4 rounded-lg")},m(i,s){R(i,e,s),y(e,n),r||(o=Lt(e,"click",t[1]),r=!0)},p:K,d(i){i&&C(e),r=!1,o()}}}function _l(t){let e;function n(i,s){if(i[2]!==null)return Il;if(i[2]==null)return vl}let r=n(t),o=r&&r(t);return{c(){o&&o.c(),e=st()},m(i,s){o&&o.m(i,s),R(i,e,s)},p(i,[s]){o&&o.p(i,s)},i:K,o:K,d(i){o&&o.d(i),i&&C(e)}}}function kl(t,e,n){const o=$t({apiKey:"AIzaSyBXQIdxhaZk2jEh7Kgkui4OG0WUsIHyWgk",authDomain:"demotivator-3cf4d.firebaseapp.com",projectId:"demotivator-3cf4d",storageBucket:"demotivator-3cf4d.appspot.com",messagingSenderId:"230067629772",appId:"1:230067629772:web:682830de35cc6b7be91c69",measurementId:"G-T182ZXMZM1"});oo(o);const i=Ye();let{loggedIn:s=!1}=e;const a=new N,u=()=>{const d=Ye();zs(d,a).then(h=>{N.credentialFromResult(h).accessToken,h.user}).catch(h=>{h.code,h.message,h.customData.email,N.credentialFromError(h)})},l=i.currentUser;l!==null&&(l.displayName,l.email,l.photoURL,l.emailVerified,l.uid);const c=d=>{_s(d).then(()=>{n(3,s=!1)}).catch(h=>{alert(`An Error Occured. Here is the error: ${h}`)})};return t.$$set=d=>{"loggedIn"in d&&n(3,s=d.loggedIn)},[u,c,l,s]}class Tl extends Ue{constructor(e){super(),xe(this,e,kl,_l,$e,{loggedIn:3,loginFunction:0,logoutFunction:1})}get loginFunction(){return this.$$.ctx[0]}get logoutFunction(){return this.$$.ctx[1]}}function El(t){let e;return{c(){e=v("div"),e.innerHTML='<div class="pb-24"></div>',m(e,"class","pb-96")},m(n,r){R(n,e,r)},d(n){n&&C(e)}}}function Sl(t){let e,n,r,o,i,s,a,u,l,c,d,h,p,k,P,Y;return P=new Tl({}),{c(){e=v("main"),n=v("div"),r=v("div"),o=v("a"),i=v("img"),a=M(),u=v("div"),l=v("p"),l.textContent="a PorkyProductions product",c=M(),d=v("a"),d.textContent="(de)Motivator 1.0",h=M(),p=v("a"),p.textContent="(de)Motivator.js",k=M(),ve(P.$$.fragment),Wn(i.src,s=yo)||m(i,"src",s),m(i,"alt","hedgehog"),m(i,"class","text-center m-auto hover:bg-indigo-400 dark:hover:bg-orange-700 hover:rounded-xl svelte-phjqkc"),m(o,"href","https://porkyproductions.github.io"),m(o,"class","hover:bg-indigo-400 dark:hover:bg-orange-700 hover:rounded-xl"),m(l,"class","text-white "),m(d,"class","text-white hover:bg-indigo-400 dark:hover:bg-orange-700 hover:rounded-xl"),m(d,"href","dmv1.html"),m(p,"class","text-white hover:bg-indigo-400 dark:hover:bg-orange-700 hover:rounded-xl"),m(p,"href","http://github.com/PorkyProductions/deMotivator.js"),m(u,"class","flex justify-between content-center pl-56 pr-80"),m(n,"class","font-semibold text-2xl"),m(e,"class","bg-primary-majorelleBlue dark:bg-secondary-orangePantone rounded-t-xl")},m(E,ge){R(E,e,ge),y(e,n),y(n,r),y(r,o),y(o,i),y(n,a),y(n,u),y(u,l),y(u,c),y(u,d),y(u,h),y(u,p),y(u,k),Ie(P,u,null),Y=!0},p:K,i(E){Y||(A(P.$$.fragment,E),Y=!0)},o(E){L(P.$$.fragment,E),Y=!1},d(E){E&&C(e),_e(P)}}}function Al(t){let e,n,r,o=kt==="mobile"&&El(),i=kt==="desktop"&&Sl();return{c(){o&&o.c(),e=M(),i&&i.c(),n=st()},m(s,a){o&&o.m(s,a),R(s,e,a),i&&i.m(s,a),R(s,n,a),r=!0},p(s,[a]){kt==="desktop"&&i.p(s,a)},i(s){r||(A(i),r=!0)},o(s){L(i),r=!1},d(s){o&&o.d(s),s&&C(e),i&&i.d(s),s&&C(n)}}}class Ol extends Ue{constructor(e){super(),xe(this,e,null,Al,$e,{})}}function Fn(t){let e,n;return e=new bo({}),{c(){ve(e.$$.fragment)},m(r,o){Ie(e,r,o),n=!0},i(r){n||(A(e.$$.fragment,r),n=!0)},o(r){L(e.$$.fragment,r),n=!1},d(r){_e(e,r)}}}function Rl(t){let e,n,r=!t[0]&&Fn();return{c(){r&&r.c(),e=st()},m(o,i){r&&r.m(o,i),R(o,e,i),n=!0},p(o,[i]){o[0]?r&&(Hn(),L(r,1,1,()=>{r=null}),Vn()):r?i&1&&A(r,1):(r=Fn(),r.c(),A(r,1),r.m(e.parentNode,e))},i(o){n||(A(r),n=!0)},o(o){L(r),n=!1},d(o){r&&r.d(o),o&&C(e)}}}function Cl(t,e,n){let r=!1;const o=setTimeout(()=>n(0,r=!0),1e3);return zn(()=>clearTimeout(o)),[r]}class Pl extends Ue{constructor(e){super(),xe(this,e,Cl,Rl,$e,{})}}/*! Capacitor: https://capacitorjs.com/ - MIT License */const Dl=t=>{const e=new Map;e.set("web",{name:"web"});const n=t.CapacitorPlatforms||{currentPlatform:{name:"web"},platforms:e},r=(i,s)=>{n.platforms.set(i,s)},o=i=>{n.platforms.has(i)&&(n.currentPlatform=n.platforms.get(i))};return n.addPlatform=r,n.setPlatform=o,n},Nl=t=>t.CapacitorPlatforms=Dl(t),io=Nl(typeof globalThis!="undefined"?globalThis:typeof self!="undefined"?self:typeof window!="undefined"?window:typeof global!="undefined"?global:{});io.addPlatform;io.setPlatform;var it;(function(t){t.Unimplemented="UNIMPLEMENTED",t.Unavailable="UNAVAILABLE"})(it||(it={}));class At extends Error{constructor(e,n){super(e),this.message=e,this.code=n}}const Ml=t=>{var e,n;return t!=null&&t.androidBridge?"android":!((n=(e=t==null?void 0:t.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||n===void 0)&&n.bridge?"ios":"web"},Ll=t=>{var e,n,r,o,i;const s=t.CapacitorCustomPlatform||null,a=t.Capacitor||{},u=a.Plugins=a.Plugins||{},l=t.CapacitorPlatforms,c=()=>s!==null?s.name:Ml(t),d=((e=l==null?void 0:l.currentPlatform)===null||e===void 0?void 0:e.getPlatform)||c,h=()=>d()!=="web",p=((n=l==null?void 0:l.currentPlatform)===null||n===void 0?void 0:n.isNativePlatform)||h,k=b=>{const w=ye.get(b);return!!(w!=null&&w.platforms.has(d())||E(b))},P=((r=l==null?void 0:l.currentPlatform)===null||r===void 0?void 0:r.isPluginAvailable)||k,Y=b=>{var w;return(w=a.PluginHeaders)===null||w===void 0?void 0:w.find(U=>U.name===b)},E=((o=l==null?void 0:l.currentPlatform)===null||o===void 0?void 0:o.getPluginHeader)||Y,ge=b=>t.console.error(b),Ae=(b,w,U)=>Promise.reject(`${U} does not have an implementation of "${w}".`),ye=new Map,He=(b,w={})=>{const U=ye.get(b);if(U)return console.warn(`Capacitor plugin "${b}" already registered. Cannot register plugins twice.`),U.proxy;const H=d(),be=E(b);let V;const ao=async()=>(!V&&H in w?V=typeof w[H]=="function"?V=await w[H]():V=w[H]:s!==null&&!V&&"web"in w&&(V=typeof w.web=="function"?V=await w.web():V=w.web),V),uo=(I,T)=>{var x,Q;if(be){const Z=be==null?void 0:be.methods.find(D=>T===D.name);if(Z)return Z.rtype==="promise"?D=>a.nativePromise(b,T.toString(),D):(D,Ve)=>a.nativeCallback(b,T.toString(),D,Ve);if(I)return(x=I[T])===null||x===void 0?void 0:x.bind(I)}else{if(I)return(Q=I[T])===null||Q===void 0?void 0:Q.bind(I);throw new At(`"${b}" plugin is not implemented on ${H}`,it.Unimplemented)}},pt=I=>{let T;const x=(...Q)=>{const Z=ao().then(D=>{const Ve=uo(D,I);if(Ve){const ze=Ve(...Q);return T=ze==null?void 0:ze.remove,ze}else throw new At(`"${b}.${I}()" is not implemented on ${H}`,it.Unimplemented)});return I==="addListener"&&(Z.remove=async()=>T()),Z};return x.toString=()=>`${I.toString()}() { [capacitor code] }`,Object.defineProperty(x,"name",{value:I,writable:!1,configurable:!1}),x},Zt=pt("addListener"),en=pt("removeListener"),lo=(I,T)=>{const x=Zt({eventName:I},T),Q=async()=>{const D=await x;en({eventName:I,callbackId:D},T)},Z=new Promise(D=>x.then(()=>D({remove:Q})));return Z.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await Q()},Z},mt=new Proxy({},{get(I,T){switch(T){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return be?lo:Zt;case"removeListener":return en;default:return pt(T)}}});return u[b]=mt,ye.set(b,{name:b,proxy:mt,platforms:new Set([...Object.keys(w),...be?[H]:[]])}),mt},Oe=((i=l==null?void 0:l.currentPlatform)===null||i===void 0?void 0:i.registerPlugin)||He;return a.convertFileSrc||(a.convertFileSrc=b=>b),a.getPlatform=d,a.handleError=ge,a.isNativePlatform=p,a.isPluginAvailable=P,a.pluginMethodNoop=Ae,a.registerPlugin=Oe,a.Exception=At,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a.platform=a.getPlatform(),a.isNative=a.isNativePlatform(),a},Yl=t=>t.Capacitor=Ll(t),so=Yl(typeof globalThis!="undefined"?globalThis:typeof self!="undefined"?self:typeof window!="undefined"?window:typeof global!="undefined"?global:{});so.registerPlugin;so.Plugins;function Ul(t){let e,n,r,o,i,s,a,u,l,c,d;n=new wo({}),o=new xa({}),l=new Ol({});let h=t[1]!==null&&$l(t);return{c(){e=v("div"),ve(n.$$.fragment),r=M(),ve(o.$$.fragment),i=M(),s=v("div"),a=M(),u=v("div"),ve(l.$$.fragment),c=M(),h&&h.c(),m(s,"class","sm:p-3 md:p-4 lg:p-5 xl:p-20"),m(u,"id","footer"),m(u,"class",""),m(e,"class","dark:bg-black dark:text-white"),m(e,"id","app")},m(p,k){R(p,e,k),Ie(n,e,null),y(e,r),Ie(o,e,null),y(e,i),y(e,s),y(e,a),y(e,u),Ie(l,u,null),y(u,c),h&&h.m(u,null),d=!0},p(p,k){p[1]!==null&&h.p(p,k)},i(p){d||(A(n.$$.fragment,p),A(o.$$.fragment,p),A(l.$$.fragment,p),d=!0)},o(p){L(n.$$.fragment,p),L(o.$$.fragment,p),L(l.$$.fragment,p),d=!1},d(p){p&&C(e),_e(n),_e(o),_e(l),h&&h.d()}}}function xl(t){let e,n;return e=new Pl({}),{c(){ve(e.$$.fragment)},m(r,o){Ie(e,r,o),n=!0},p:K,i(r){n||(A(e.$$.fragment,r),n=!0)},o(r){L(e.$$.fragment,r),n=!1},d(r){_e(e,r)}}}function $l(t){let e=t[1].displayName+"",n;return{c(){n=jn(e)},m(r,o){R(r,n,o)},p:K,d(r){r&&C(n)}}}function Bl(t){let e,n,r,o;const i=[xl,Ul],s=[];function a(u,l){return u[0]?1:0}return e=a(t),n=s[e]=i[e](t),{c(){n.c(),r=st()},m(u,l){s[e].m(u,l),R(u,r,l),o=!0},p(u,[l]){let c=e;e=a(u),e===c?s[e].p(u,l):(Hn(),L(s[c],1,1,()=>{s[c]=null}),Vn(),n=s[e],n?n.p(u,l):(n=s[e]=i[e](u),n.c()),A(n,1),n.m(r.parentNode,r))},i(u){o||(A(n),o=!0)},o(u){L(n),o=!1},d(u){s[e].d(u),u&&C(r)}}}function Fl(t,e,n){let r=!1;const o=setTimeout(()=>n(0,r=!0),1e3);zn(()=>clearTimeout(o));const s=$t({apiKey:"AIzaSyBXQIdxhaZk2jEh7Kgkui4OG0WUsIHyWgk",authDomain:"demotivator-3cf4d.firebaseapp.com",projectId:"demotivator-3cf4d",storageBucket:"demotivator-3cf4d.appspot.com",messagingSenderId:"230067629772",appId:"1:230067629772:web:682830de35cc6b7be91c69",measurementId:"G-T182ZXMZM1"});oo(s);const u=Ye().currentUser;return u!==null&&(u.displayName,u.email,u.photoURL,u.emailVerified,u.uid),[r,u]}class jl extends Ue{constructor(e){super(),xe(this,e,Fl,Bl,$e,{})}}new jl({target:document.getElementById("app")});
