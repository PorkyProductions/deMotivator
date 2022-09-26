import{S as at,i as ct,s as ut,e as w,a as S,t as Te,b as mn,c as y,d as T,f as g,g as $n,l as Ue,h as bt,n as oe,j as k,r as oo,k as so,m as Nt,o as B,p as j,q as xe,u as ao,v as Fe,w as $e,x as Tr,y as kr,z as Ar,A as co,T as uo}from"./spinhog.a9552524.js";const lo="modulepreload",ho=function(t){return"/"+t},Vn={},Xe=function(e,n,r){return!n||n.length===0?e():Promise.all(n.map(i=>{if(i=ho(i),i in Vn)return;Vn[i]=!0;const o=i.endsWith(".css"),s=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${i}"]${s}`))return;const a=document.createElement("link");if(a.rel=o?"stylesheet":lo,o||(a.as="script",a.crossOrigin=""),a.href=i,document.head.appendChild(a),o)return new Promise((c,u)=>{a.addEventListener("load",c),a.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>e())},fo="./assets/dmv-logo.a72e79b2.png";/**
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
 */const Sr=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},po=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=t[n++];e[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){const o=t[n++],s=t[n++],a=t[n++],c=((i&7)<<18|(o&63)<<12|(s&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const o=t[n++],s=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|s&63)}}return e.join("")},Rr={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const o=t[i],s=i+1<t.length,a=s?t[i+1]:0,c=i+2<t.length,u=c?t[i+2]:0,l=o>>2,h=(o&3)<<4|a>>4;let f=(a&15)<<2|u>>6,p=u&63;c||(p=64,s||(f=64)),r.push(n[l],n[h],n[f],n[p])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Sr(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):po(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const o=n[t.charAt(i++)],a=i<t.length?n[t.charAt(i)]:0;++i;const u=i<t.length?n[t.charAt(i)]:64;++i;const h=i<t.length?n[t.charAt(i)]:64;if(++i,o==null||a==null||u==null||h==null)throw Error();const f=o<<2|a>>4;if(r.push(f),u!==64){const p=a<<4&240|u>>2;if(r.push(p),h!==64){const v=u<<6&192|h;r.push(v)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},mo=function(t){const e=Sr(t);return Rr.encodeByteArray(e,!0)},Or=function(t){return mo(t).replace(/\./g,"")},go=function(t){try{return Rr.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */class yo{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function D(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Io(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(D())}function Pr(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function vo(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function _o(){const t=D();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Nr(){return typeof indexedDB=="object"}function Cr(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var o;e(((o=i.error)===null||o===void 0?void 0:o.message)||"")}}catch(n){e(n)}})}function wo(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const bo="FirebaseError";class X extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=bo,Object.setPrototypeOf(this,X.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ne.prototype.create)}}class Ne{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,o=this.errors[e],s=o?Eo(o,r):"Error",a=`${this.serviceName}: ${s} (${i}).`;return new X(i,a,r)}}function Eo(t,e){return t.replace(To,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const To=/\{\$([^}]+)}/g;function ko(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function et(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const o=t[i],s=e[i];if(Bn(o)&&Bn(s)){if(!et(o,s))return!1}else if(o!==s)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function Bn(t){return t!==null&&typeof t=="object"}/**
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
 */function We(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function qe(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,o]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(o)}}),e}function Ke(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function Ao(t,e){const n=new So(t,e);return n.subscribe.bind(n)}class So{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");Ro(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=Gt),i.error===void 0&&(i.error=Gt),i.complete===void 0&&(i.complete=Gt);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ro(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Gt(){}/**
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
 */const Oo=1e3,Po=2,No=4*60*60*1e3,Co=.5;function Hn(t,e=Oo,n=Po){const r=e*Math.pow(n,t),i=Math.round(Co*r*(Math.random()-.5)*2);return Math.min(No,r+i)}/**
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
 */function m(t){return t&&t._delegate?t._delegate:t}class J{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const we="[DEFAULT]";/**
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
 */class Do{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new yo;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(i)return null;throw o}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Lo(e))try{this.getOrInitializeService({instanceIdentifier:we})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch{}}}}clearInstance(e=we){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=we){return this.instances.has(e)}getOptions(e=we){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[o,s]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(o);r===a&&s.resolve(i)}return i}onInit(e,n){var r;const i=this.normalizeInstanceIdentifier(n),o=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;o.add(e),this.onInitCallbacks.set(i,o);const s=this.instances.get(i);return s&&e(s,i),()=>{o.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(!!r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Mo(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=we){return this.component?this.component.multipleInstances?e:we:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Mo(t){return t===we?void 0:t}function Lo(t){return t.instantiationMode==="EAGER"}/**
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
 */class Uo{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Do(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var b;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(b||(b={}));const xo={debug:b.DEBUG,verbose:b.VERBOSE,info:b.INFO,warn:b.WARN,error:b.ERROR,silent:b.SILENT},Fo=b.INFO,$o={[b.DEBUG]:"log",[b.VERBOSE]:"log",[b.INFO]:"info",[b.WARN]:"warn",[b.ERROR]:"error"},Vo=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=$o[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class gn{constructor(e){this.name=e,this._logLevel=Fo,this._logHandler=Vo,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in b))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?xo[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,b.DEBUG,...e),this._logHandler(this,b.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,b.VERBOSE,...e),this._logHandler(this,b.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,b.INFO,...e),this._logHandler(this,b.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,b.WARN,...e),this._logHandler(this,b.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,b.ERROR,...e),this._logHandler(this,b.ERROR,...e)}}const Bo=(t,e)=>e.some(n=>t instanceof n);let Wn,Yn;function Ho(){return Wn||(Wn=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Wo(){return Yn||(Yn=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Dr=new WeakMap,cn=new WeakMap,Mr=new WeakMap,qt=new WeakMap,yn=new WeakMap;function Yo(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",o),t.removeEventListener("error",s)},o=()=>{n(ve(t.result)),i()},s=()=>{r(t.error),i()};t.addEventListener("success",o),t.addEventListener("error",s)});return e.then(n=>{n instanceof IDBCursor&&Dr.set(n,t)}).catch(()=>{}),yn.set(e,t),e}function jo(t){if(cn.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",o),t.removeEventListener("error",s),t.removeEventListener("abort",s)},o=()=>{n(),i()},s=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",o),t.addEventListener("error",s),t.addEventListener("abort",s)});cn.set(t,e)}let un={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return cn.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Mr.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return ve(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function zo(t){un=t(un)}function Go(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Kt(this),e,...n);return Mr.set(r,e.sort?e.sort():[e]),ve(r)}:Wo().includes(t)?function(...e){return t.apply(Kt(this),e),ve(Dr.get(this))}:function(...e){return ve(t.apply(Kt(this),e))}}function qo(t){return typeof t=="function"?Go(t):(t instanceof IDBTransaction&&jo(t),Bo(t,Ho())?new Proxy(t,un):t)}function ve(t){if(t instanceof IDBRequest)return Yo(t);if(qt.has(t))return qt.get(t);const e=qo(t);return e!==t&&(qt.set(t,e),yn.set(e,t)),e}const Kt=t=>yn.get(t);function Lr(t,e,{blocked:n,upgrade:r,blocking:i,terminated:o}={}){const s=indexedDB.open(t,e),a=ve(s);return r&&s.addEventListener("upgradeneeded",c=>{r(ve(s.result),c.oldVersion,c.newVersion,ve(s.transaction))}),n&&s.addEventListener("blocked",()=>n()),a.then(c=>{o&&c.addEventListener("close",()=>o()),i&&c.addEventListener("versionchange",()=>i())}).catch(()=>{}),a}const Ko=["get","getKey","getAll","getAllKeys","count"],Jo=["put","add","delete","clear"],Jt=new Map;function jn(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Jt.get(e))return Jt.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=Jo.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Ko.includes(n)))return;const o=async function(s,...a){const c=this.transaction(s,i?"readwrite":"readonly");let u=c.store;return r&&(u=u.index(a.shift())),(await Promise.all([u[n](...a),i&&c.done]))[0]};return Jt.set(e,o),o}zo(t=>({...t,get:(e,n,r)=>jn(e,n)||t.get(e,n,r),has:(e,n)=>!!jn(e,n)||t.has(e,n)}));/**
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
 */class Xo{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Qo(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Qo(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ln="@firebase/app",zn="0.7.33";/**
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
 */const Se=new gn("@firebase/app"),Zo="@firebase/app-compat",es="@firebase/analytics-compat",ts="@firebase/analytics",ns="@firebase/app-check-compat",rs="@firebase/app-check",is="@firebase/auth",os="@firebase/auth-compat",ss="@firebase/database",as="@firebase/database-compat",cs="@firebase/functions",us="@firebase/functions-compat",ls="@firebase/installations",ds="@firebase/installations-compat",hs="@firebase/messaging",fs="@firebase/messaging-compat",ps="@firebase/performance",ms="@firebase/performance-compat",gs="@firebase/remote-config",ys="@firebase/remote-config-compat",Is="@firebase/storage",vs="@firebase/storage-compat",_s="@firebase/firestore",ws="@firebase/firestore-compat",bs="firebase",Es="9.10.0";/**
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
 */const Ur="[DEFAULT]",Ts={[ln]:"fire-core",[Zo]:"fire-core-compat",[ts]:"fire-analytics",[es]:"fire-analytics-compat",[rs]:"fire-app-check",[ns]:"fire-app-check-compat",[is]:"fire-auth",[os]:"fire-auth-compat",[ss]:"fire-rtdb",[as]:"fire-rtdb-compat",[cs]:"fire-fn",[us]:"fire-fn-compat",[ls]:"fire-iid",[ds]:"fire-iid-compat",[hs]:"fire-fcm",[fs]:"fire-fcm-compat",[ps]:"fire-perf",[ms]:"fire-perf-compat",[gs]:"fire-rc",[ys]:"fire-rc-compat",[Is]:"fire-gcs",[vs]:"fire-gcs-compat",[_s]:"fire-fst",[ws]:"fire-fst-compat","fire-js":"fire-js",[bs]:"fire-js-all"};/**
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
 */const Et=new Map,dn=new Map;function ks(t,e){try{t.container.addComponent(e)}catch(n){Se.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function se(t){const e=t.name;if(dn.has(e))return Se.debug(`There were multiple attempts to register component ${e}.`),!1;dn.set(e,t);for(const n of Et.values())ks(n,t);return!0}function Ye(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
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
 */const As={["no-app"]:"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["idb-open"]:"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",["idb-get"]:"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",["idb-set"]:"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",["idb-delete"]:"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},Re=new Ne("app","Firebase",As);/**
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
 */class Ss{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new J("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Re.create("app-deleted",{appName:this._name})}}/**
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
 */const Ct=Es;function xr(t,e={}){typeof e!="object"&&(e={name:e});const n=Object.assign({name:Ur,automaticDataCollectionEnabled:!1},e),r=n.name;if(typeof r!="string"||!r)throw Re.create("bad-app-name",{appName:String(r)});const i=Et.get(r);if(i){if(et(t,i.options)&&et(n,i.config))return i;throw Re.create("duplicate-app",{appName:r})}const o=new Uo(r);for(const a of dn.values())o.addComponent(a);const s=new Ss(t,n,o);return Et.set(r,s),s}function Fr(t=Ur){const e=Et.get(t);if(!e)throw Re.create("no-app",{appName:t});return e}function K(t,e,n){var r;let i=(r=Ts[t])!==null&&r!==void 0?r:t;n&&(i+=`-${n}`);const o=i.match(/\s|\//),s=e.match(/\s|\//);if(o||s){const a=[`Unable to register library "${i}" with version "${e}":`];o&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&s&&a.push("and"),s&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Se.warn(a.join(" "));return}se(new J(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const Rs="firebase-heartbeat-database",Os=1,tt="firebase-heartbeat-store";let Xt=null;function $r(){return Xt||(Xt=Lr(Rs,Os,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(tt)}}}).catch(t=>{throw Re.create("idb-open",{originalErrorMessage:t.message})})),Xt}async function Ps(t){var e;try{return(await $r()).transaction(tt).objectStore(tt).get(Vr(t))}catch(n){if(n instanceof X)Se.warn(n.message);else{const r=Re.create("idb-get",{originalErrorMessage:(e=n)===null||e===void 0?void 0:e.message});Se.warn(r.message)}}}async function Gn(t,e){var n;try{const i=(await $r()).transaction(tt,"readwrite");return await i.objectStore(tt).put(e,Vr(t)),i.done}catch(r){if(r instanceof X)Se.warn(r.message);else{const i=Re.create("idb-set",{originalErrorMessage:(n=r)===null||n===void 0?void 0:n.message});Se.warn(i.message)}}}function Vr(t){return`${t.name}!${t.options.appId}`}/**
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
 */const Ns=1024,Cs=30*24*60*60*1e3;class Ds{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Ls(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=qn();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(i=>i.date===r)))return this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(i=>{const o=new Date(i.date).valueOf();return Date.now()-o<=Cs}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=qn(),{heartbeatsToSend:n,unsentEntries:r}=Ms(this._heartbeatsCache.heartbeats),i=Or(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}}function qn(){return new Date().toISOString().substring(0,10)}function Ms(t,e=Ns){const n=[];let r=t.slice();for(const i of t){const o=n.find(s=>s.agent===i.agent);if(o){if(o.dates.push(i.date),Kn(n)>e){o.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Kn(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Ls{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Nr()?Cr().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await Ps(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return Gn(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return Gn(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Kn(t){return Or(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function Us(t){se(new J("platform-logger",e=>new Xo(e),"PRIVATE")),se(new J("heartbeat",e=>new Ds(e),"PRIVATE")),K(ln,zn,t),K(ln,zn,"esm2017"),K("fire-js","")}Us("");function In(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]]);return n}/**
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
 */const Ad={PHONE:"phone"},Sd={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",PHONE:"phone",TWITTER:"twitter.com"},Rd={EMAIL_LINK:"emailLink",EMAIL_PASSWORD:"password",FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PHONE:"phone",TWITTER:"twitter.com"},Od={LINK:"link",REAUTHENTICATE:"reauthenticate",SIGN_IN:"signIn"},Pd={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};/**
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
 */function xs(){return{["admin-restricted-operation"]:"This operation is restricted to administrators only.",["argument-error"]:"",["app-not-authorized"]:"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",["app-not-installed"]:"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.",["captcha-check-failed"]:"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.",["code-expired"]:"The SMS code has expired. Please re-send the verification code to try again.",["cordova-not-ready"]:"Cordova framework is not ready.",["cors-unsupported"]:"This browser is not supported.",["credential-already-in-use"]:"This credential is already associated with a different user account.",["custom-token-mismatch"]:"The custom token corresponds to a different audience.",["requires-recent-login"]:"This operation is sensitive and requires recent authentication. Log in again before retrying this request.",["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.",["dynamic-link-not-activated"]:"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.",["email-change-needs-verification"]:"Multi-factor users must always have a verified email.",["email-already-in-use"]:"The email address is already in use by another account.",["emulator-config-failed"]:'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',["expired-action-code"]:"The action code has expired.",["cancelled-popup-request"]:"This operation has been cancelled due to another conflicting popup being opened.",["internal-error"]:"An internal AuthError has occurred.",["invalid-app-credential"]:"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.",["invalid-app-id"]:"The mobile app identifier is not registed for the current project.",["invalid-user-token"]:"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.",["invalid-auth-event"]:"An internal AuthError has occurred.",["invalid-verification-code"]:"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.",["invalid-continue-uri"]:"The continue URL provided in the request is invalid.",["invalid-cordova-configuration"]:"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",["invalid-custom-token"]:"The custom token format is incorrect. Please check the documentation.",["invalid-dynamic-link-domain"]:"The provided dynamic link domain is not configured or authorized for the current project.",["invalid-email"]:"The email address is badly formatted.",["invalid-emulator-scheme"]:"Emulator URL must start with a valid scheme (http:// or https://).",["invalid-api-key"]:"Your API key is invalid, please check you have copied it correctly.",["invalid-cert-hash"]:"The SHA-1 certificate hash provided is invalid.",["invalid-credential"]:"The supplied auth credential is malformed or has expired.",["invalid-message-payload"]:"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.",["invalid-multi-factor-session"]:"The request does not contain a valid proof of first factor successful sign-in.",["invalid-oauth-provider"]:"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.",["invalid-oauth-client-id"]:"The OAuth client ID provided is either invalid or does not match the specified API key.",["unauthorized-domain"]:"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",["invalid-action-code"]:"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.",["wrong-password"]:"The password is invalid or the user does not have a password.",["invalid-persistence-type"]:"The specified persistence type is invalid. It can only be local, session or none.",["invalid-phone-number"]:"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].",["invalid-provider-id"]:"The specified provider ID is invalid.",["invalid-recipient-email"]:"The email corresponding to this action failed to send as the provided recipient email address is invalid.",["invalid-sender"]:"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.",["invalid-verification-id"]:"The verification ID used to create the phone auth credential is invalid.",["invalid-tenant-id"]:"The Auth instance's tenant ID is invalid.",["login-blocked"]:"Login blocked by user-provided method: {$originalMessage}",["missing-android-pkg-name"]:"An Android Package Name must be provided if the Android App is required to be installed.",["auth-domain-config-required"]:"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.",["missing-app-credential"]:"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.",["missing-verification-code"]:"The phone auth credential was created with an empty SMS verification code.",["missing-continue-uri"]:"A continue URL must be provided in the request.",["missing-iframe-start"]:"An internal AuthError has occurred.",["missing-ios-bundle-id"]:"An iOS Bundle ID must be provided if an App Store ID is provided.",["missing-or-invalid-nonce"]:"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.",["missing-multi-factor-info"]:"No second factor identifier is provided.",["missing-multi-factor-session"]:"The request is missing proof of first factor successful sign-in.",["missing-phone-number"]:"To send verification codes, provide a phone number for the recipient.",["missing-verification-id"]:"The phone auth credential was created with an empty verification ID.",["app-deleted"]:"This instance of FirebaseApp has been deleted.",["multi-factor-info-not-found"]:"The user does not have a second factor matching the identifier provided.",["multi-factor-auth-required"]:"Proof of ownership of a second factor is required to complete sign-in.",["account-exists-with-different-credential"]:"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",["network-request-failed"]:"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.",["no-auth-event"]:"An internal AuthError has occurred.",["no-such-provider"]:"User was not linked to an account with the given provider.",["null-user"]:"A null user object was provided as the argument for an operation which requires a non-null user object.",["operation-not-allowed"]:"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.",["operation-not-supported-in-this-environment"]:'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',["popup-blocked"]:"Unable to establish a connection with the popup. It may have been blocked by the browser.",["popup-closed-by-user"]:"The popup has been closed by the user before finalizing the operation.",["provider-already-linked"]:"User can only be linked to one identity for the given provider.",["quota-exceeded"]:"The project's quota for this operation has been exceeded.",["redirect-cancelled-by-user"]:"The redirect operation has been cancelled by the user before finalizing.",["redirect-operation-pending"]:"A redirect sign-in operation is already pending.",["rejected-credential"]:"The request contains malformed or mismatching credentials.",["second-factor-already-in-use"]:"The second factor is already enrolled on this account.",["maximum-second-factor-count-exceeded"]:"The maximum allowed number of second factors on a user has been exceeded.",["tenant-id-mismatch"]:"The provided tenant ID does not match the Auth instance's tenant ID",timeout:"The operation has timed out.",["user-token-expired"]:"The user's credential is no longer valid. The user must sign in again.",["too-many-requests"]:"We have blocked all requests from this device due to unusual activity. Try again later.",["unauthorized-continue-uri"]:"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.",["unsupported-first-factor"]:"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.",["unsupported-persistence-type"]:"The current environment does not support the specified persistence type.",["unsupported-tenant-operation"]:"This operation is not supported in a multi-tenant context.",["unverified-email"]:"The operation requires a verified email.",["user-cancelled"]:"The user did not grant your application the permissions it requested.",["user-not-found"]:"There is no user record corresponding to this identifier. The user may have been deleted.",["user-disabled"]:"The user account has been disabled by an administrator.",["user-mismatch"]:"The supplied credentials do not correspond to the previously signed in user.",["user-signed-out"]:"",["weak-password"]:"The password must be 6 characters long or more.",["web-storage-unsupported"]:"This browser is not supported or 3rd party cookies and data may be disabled.",["already-initialized"]:"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance."}}function Br(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Nd=xs,Fs=Br,Hr=new Ne("auth","Firebase",Br()),Cd={ADMIN_ONLY_OPERATION:"auth/admin-restricted-operation",ARGUMENT_ERROR:"auth/argument-error",APP_NOT_AUTHORIZED:"auth/app-not-authorized",APP_NOT_INSTALLED:"auth/app-not-installed",CAPTCHA_CHECK_FAILED:"auth/captcha-check-failed",CODE_EXPIRED:"auth/code-expired",CORDOVA_NOT_READY:"auth/cordova-not-ready",CORS_UNSUPPORTED:"auth/cors-unsupported",CREDENTIAL_ALREADY_IN_USE:"auth/credential-already-in-use",CREDENTIAL_MISMATCH:"auth/custom-token-mismatch",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"auth/requires-recent-login",DEPENDENT_SDK_INIT_BEFORE_AUTH:"auth/dependent-sdk-initialized-before-auth",DYNAMIC_LINK_NOT_ACTIVATED:"auth/dynamic-link-not-activated",EMAIL_CHANGE_NEEDS_VERIFICATION:"auth/email-change-needs-verification",EMAIL_EXISTS:"auth/email-already-in-use",EMULATOR_CONFIG_FAILED:"auth/emulator-config-failed",EXPIRED_OOB_CODE:"auth/expired-action-code",EXPIRED_POPUP_REQUEST:"auth/cancelled-popup-request",INTERNAL_ERROR:"auth/internal-error",INVALID_API_KEY:"auth/invalid-api-key",INVALID_APP_CREDENTIAL:"auth/invalid-app-credential",INVALID_APP_ID:"auth/invalid-app-id",INVALID_AUTH:"auth/invalid-user-token",INVALID_AUTH_EVENT:"auth/invalid-auth-event",INVALID_CERT_HASH:"auth/invalid-cert-hash",INVALID_CODE:"auth/invalid-verification-code",INVALID_CONTINUE_URI:"auth/invalid-continue-uri",INVALID_CORDOVA_CONFIGURATION:"auth/invalid-cordova-configuration",INVALID_CUSTOM_TOKEN:"auth/invalid-custom-token",INVALID_DYNAMIC_LINK_DOMAIN:"auth/invalid-dynamic-link-domain",INVALID_EMAIL:"auth/invalid-email",INVALID_EMULATOR_SCHEME:"auth/invalid-emulator-scheme",INVALID_IDP_RESPONSE:"auth/invalid-credential",INVALID_MESSAGE_PAYLOAD:"auth/invalid-message-payload",INVALID_MFA_SESSION:"auth/invalid-multi-factor-session",INVALID_OAUTH_CLIENT_ID:"auth/invalid-oauth-client-id",INVALID_OAUTH_PROVIDER:"auth/invalid-oauth-provider",INVALID_OOB_CODE:"auth/invalid-action-code",INVALID_ORIGIN:"auth/unauthorized-domain",INVALID_PASSWORD:"auth/wrong-password",INVALID_PERSISTENCE:"auth/invalid-persistence-type",INVALID_PHONE_NUMBER:"auth/invalid-phone-number",INVALID_PROVIDER_ID:"auth/invalid-provider-id",INVALID_RECIPIENT_EMAIL:"auth/invalid-recipient-email",INVALID_SENDER:"auth/invalid-sender",INVALID_SESSION_INFO:"auth/invalid-verification-id",INVALID_TENANT_ID:"auth/invalid-tenant-id",MFA_INFO_NOT_FOUND:"auth/multi-factor-info-not-found",MFA_REQUIRED:"auth/multi-factor-auth-required",MISSING_ANDROID_PACKAGE_NAME:"auth/missing-android-pkg-name",MISSING_APP_CREDENTIAL:"auth/missing-app-credential",MISSING_AUTH_DOMAIN:"auth/auth-domain-config-required",MISSING_CODE:"auth/missing-verification-code",MISSING_CONTINUE_URI:"auth/missing-continue-uri",MISSING_IFRAME_START:"auth/missing-iframe-start",MISSING_IOS_BUNDLE_ID:"auth/missing-ios-bundle-id",MISSING_OR_INVALID_NONCE:"auth/missing-or-invalid-nonce",MISSING_MFA_INFO:"auth/missing-multi-factor-info",MISSING_MFA_SESSION:"auth/missing-multi-factor-session",MISSING_PHONE_NUMBER:"auth/missing-phone-number",MISSING_SESSION_INFO:"auth/missing-verification-id",MODULE_DESTROYED:"auth/app-deleted",NEED_CONFIRMATION:"auth/account-exists-with-different-credential",NETWORK_REQUEST_FAILED:"auth/network-request-failed",NULL_USER:"auth/null-user",NO_AUTH_EVENT:"auth/no-auth-event",NO_SUCH_PROVIDER:"auth/no-such-provider",OPERATION_NOT_ALLOWED:"auth/operation-not-allowed",OPERATION_NOT_SUPPORTED:"auth/operation-not-supported-in-this-environment",POPUP_BLOCKED:"auth/popup-blocked",POPUP_CLOSED_BY_USER:"auth/popup-closed-by-user",PROVIDER_ALREADY_LINKED:"auth/provider-already-linked",QUOTA_EXCEEDED:"auth/quota-exceeded",REDIRECT_CANCELLED_BY_USER:"auth/redirect-cancelled-by-user",REDIRECT_OPERATION_PENDING:"auth/redirect-operation-pending",REJECTED_CREDENTIAL:"auth/rejected-credential",SECOND_FACTOR_ALREADY_ENROLLED:"auth/second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"auth/maximum-second-factor-count-exceeded",TENANT_ID_MISMATCH:"auth/tenant-id-mismatch",TIMEOUT:"auth/timeout",TOKEN_EXPIRED:"auth/user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"auth/too-many-requests",UNAUTHORIZED_DOMAIN:"auth/unauthorized-continue-uri",UNSUPPORTED_FIRST_FACTOR:"auth/unsupported-first-factor",UNSUPPORTED_PERSISTENCE:"auth/unsupported-persistence-type",UNSUPPORTED_TENANT_OPERATION:"auth/unsupported-tenant-operation",UNVERIFIED_EMAIL:"auth/unverified-email",USER_CANCELLED:"auth/user-cancelled",USER_DELETED:"auth/user-not-found",USER_DISABLED:"auth/user-disabled",USER_MISMATCH:"auth/user-mismatch",USER_SIGNED_OUT:"auth/user-signed-out",WEAK_PASSWORD:"auth/weak-password",WEB_STORAGE_UNSUPPORTED:"auth/web-storage-unsupported",ALREADY_INITIALIZED:"auth/already-initialized"};/**
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
 */const Jn=new gn("@firebase/auth");function yt(t,...e){Jn.logLevel<=b.ERROR&&Jn.error(`Auth (${Ct}): ${t}`,...e)}/**
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
 */function U(t,...e){throw vn(t,...e)}function F(t,...e){return vn(t,...e)}function Wr(t,e,n){const r=Object.assign(Object.assign({},Fs()),{[e]:n});return new Ne("auth","Firebase",r).create(e,{appName:t.name})}function je(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&U(t,"argument-error"),Wr(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function vn(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Hr.create(t,...e)}function d(t,e,...n){if(!t)throw vn(e,...n)}function q(t){const e="INTERNAL ASSERTION FAILED: "+t;throw yt(e),new Error(e)}function ae(t,e){t||q(e)}/**
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
 */const Xn=new Map;function ne(t){ae(t instanceof Function,"Expected a class definition");let e=Xn.get(t);return e?(ae(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Xn.set(t,e),e)}/**
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
 */function $s(t,e){const n=Ye(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),o=n.getOptions();if(et(o,e!=null?e:{}))return i;U(i,"already-initialized")}return n.initialize({options:e})}function Vs(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(ne);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}/**
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
 */function nt(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function _n(){return Qn()==="http:"||Qn()==="https:"}function Qn(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function Bs(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(_n()||Pr()||"connection"in navigator)?navigator.onLine:!0}function Hs(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class lt{constructor(e,n){this.shortDelay=e,this.longDelay=n,ae(n>e,"Short delay should be less than long delay!"),this.isMobile=Io()||vo()}get(){return Bs()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function wn(t,e){ae(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class Yr{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;q("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;q("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;q("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Ws={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error"};/**
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
 */const Ys=new lt(3e4,6e4);function R(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function P(t,e,n,r,i={}){return jr(t,i,async()=>{let o={},s={};r&&(e==="GET"?s=r:o={body:JSON.stringify(r)});const a=We(Object.assign({key:t.config.apiKey},s)).slice(1),c=await t._getAdditionalHeaders();return c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode),Yr.fetch()(zr(t,t.config.apiHost,n,a),Object.assign({method:e,headers:c,referrerPolicy:"no-referrer"},o))})}async function jr(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},Ws),e);try{const i=new js(t),o=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const s=await o.json();if("needConfirmation"in s)throw Je(t,"account-exists-with-different-credential",s);if(o.ok&&!("errorMessage"in s))return s;{const a=o.ok?s.errorMessage:s.error.message,[c,u]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Je(t,"credential-already-in-use",s);if(c==="EMAIL_EXISTS")throw Je(t,"email-already-in-use",s);if(c==="USER_DISABLED")throw Je(t,"user-disabled",s);const l=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw Wr(t,l,u);U(t,l)}}catch(i){if(i instanceof X)throw i;U(t,"network-request-failed")}}async function le(t,e,n,r,i={}){const o=await P(t,e,n,r,i);return"mfaPendingCredential"in o&&U(t,"multi-factor-auth-required",{_serverResponse:o}),o}function zr(t,e,n,r){const i=`${e}${n}?${r}`;return t.config.emulator?wn(t.config,i):`${t.config.apiScheme}://${i}`}class js{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(F(this.auth,"network-request-failed")),Ys.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Je(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=F(t,e,r);return i.customData._tokenResponse=n,i}/**
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
 */async function zs(t,e){return P(t,"POST","/v1/accounts:delete",e)}async function Gs(t,e){return P(t,"POST","/v1/accounts:update",e)}async function qs(t,e){return P(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function Qe(t){if(!!t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}/**
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
 */function Dd(t,e=!1){return m(t).getIdToken(e)}async function Ks(t,e=!1){const n=m(t),r=await n.getIdToken(e),i=Dt(r);d(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const o=typeof i.firebase=="object"?i.firebase:void 0,s=o==null?void 0:o.sign_in_provider;return{claims:i,token:r,authTime:Qe(Qt(i.auth_time)),issuedAtTime:Qe(Qt(i.iat)),expirationTime:Qe(Qt(i.exp)),signInProvider:s||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function Qt(t){return Number(t)*1e3}function Dt(t){var e;const[n,r,i]=t.split(".");if(n===void 0||r===void 0||i===void 0)return yt("JWT malformed, contained fewer than 3 sections"),null;try{const o=go(r);return o?JSON.parse(o):(yt("Failed to decode base64 JWT payload"),null)}catch(o){return yt("Caught error parsing JWT payload as JSON",(e=o)===null||e===void 0?void 0:e.toString()),null}}function Js(t){const e=Dt(t);return d(e,"internal-error"),d(typeof e.exp<"u","internal-error"),d(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function ce(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof X&&Xs(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function Xs({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class Qs{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){!this.isRunning||(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){var e;try{await this.user.getIdToken(!0)}catch(n){((e=n)===null||e===void 0?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Gr{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Qe(this.lastLoginAt),this.creationTime=Qe(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function rt(t){var e;const n=t.auth,r=await t.getIdToken(),i=await ce(t,qs(n,{idToken:r}));d(i==null?void 0:i.users.length,n,"internal-error");const o=i.users[0];t._notifyReloadListener(o);const s=!((e=o.providerUserInfo)===null||e===void 0)&&e.length?ta(o.providerUserInfo):[],a=ea(t.providerData,s),c=t.isAnonymous,u=!(t.email&&o.passwordHash)&&!(a!=null&&a.length),l=c?u:!1,h={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:a,metadata:new Gr(o.createdAt,o.lastLoginAt),isAnonymous:l};Object.assign(t,h)}async function Zs(t){const e=m(t);await rt(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function ea(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function ta(t){return t.map(e=>{var{providerId:n}=e,r=In(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function na(t,e){const n=await jr(t,{},async()=>{const r=We({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:o}=t.config,s=zr(t,i,"/v1/token",`key=${o}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Yr.fetch()(s,{method:"POST",headers:a,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
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
 */class it{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){d(e.idToken,"internal-error"),d(typeof e.idToken<"u","internal-error"),d(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Js(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return d(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:o}=await na(e,n);this.updateTokensAndExpiration(r,i,Number(o))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:o}=n,s=new it;return r&&(d(typeof r=="string","internal-error",{appName:e}),s.refreshToken=r),i&&(d(typeof i=="string","internal-error",{appName:e}),s.accessToken=i),o&&(d(typeof o=="number","internal-error",{appName:e}),s.expirationTime=o),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new it,this.toJSON())}_performRefresh(){return q("not implemented")}}/**
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
 */function pe(t,e){d(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class ke{constructor(e){var{uid:n,auth:r,stsTokenManager:i}=e,o=In(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Qs(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new Gr(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const n=await ce(this,this.stsTokenManager.getToken(this.auth,e));return d(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Ks(this,e)}reload(){return Zs(this)}_assign(e){this!==e&&(d(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){return new ke(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(e){d(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await rt(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await ce(this,zs(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,i,o,s,a,c,u,l;const h=(r=n.displayName)!==null&&r!==void 0?r:void 0,f=(i=n.email)!==null&&i!==void 0?i:void 0,p=(o=n.phoneNumber)!==null&&o!==void 0?o:void 0,v=(s=n.photoURL)!==null&&s!==void 0?s:void 0,E=(a=n.tenantId)!==null&&a!==void 0?a:void 0,x=(c=n._redirectEventId)!==null&&c!==void 0?c:void 0,N=(u=n.createdAt)!==null&&u!==void 0?u:void 0,z=(l=n.lastLoginAt)!==null&&l!==void 0?l:void 0,{uid:Q,emailVerified:Z,isAnonymous:_e,providerData:V,stsTokenManager:I}=n;d(Q&&I,e,"internal-error");const _=it.fromJSON(this.name,I);d(typeof Q=="string",e,"internal-error"),pe(h,e.name),pe(f,e.name),d(typeof Z=="boolean",e,"internal-error"),d(typeof _e=="boolean",e,"internal-error"),pe(p,e.name),pe(v,e.name),pe(E,e.name),pe(x,e.name),pe(N,e.name),pe(z,e.name);const O=new ke({uid:Q,auth:e,email:f,emailVerified:Z,displayName:h,isAnonymous:_e,photoURL:v,phoneNumber:p,tenantId:E,stsTokenManager:_,createdAt:N,lastLoginAt:z});return V&&Array.isArray(V)&&(O.providerData=V.map(ee=>Object.assign({},ee))),x&&(O._redirectEventId=x),O}static async _fromIdTokenResponse(e,n,r=!1){const i=new it;i.updateFromServerResponse(n);const o=new ke({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await rt(o),o}}/**
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
 */class qr{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}qr.type="NONE";const Zn=qr;/**
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
 */function It(t,e,n){return`firebase:${t}:${e}:${n}`}class Ve{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:o}=this.auth;this.fullUserKey=It(this.userKey,i.apiKey,o),this.fullPersistenceKey=It("persistence",i.apiKey,o),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?ke._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Ve(ne(Zn),e,r);const i=(await Promise.all(n.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let o=i[0]||ne(Zn);const s=It(r,e.config.apiKey,e.name);let a=null;for(const u of n)try{const l=await u._get(s);if(l){const h=ke._fromJSON(e,l);u!==o&&(a=h),o=u;break}}catch{}const c=i.filter(u=>u._shouldAllowMigration);return!o._shouldAllowMigration||!c.length?new Ve(o,e,r):(o=c[0],a&&await o._set(s,a.toJSON()),await Promise.all(n.map(async u=>{if(u!==o)try{await u._remove(s)}catch{}})),new Ve(o,e,r))}}/**
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
 */function er(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Xr(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Kr(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Zr(e))return"Blackberry";if(ei(e))return"Webos";if(bn(e))return"Safari";if((e.includes("chrome/")||Jr(e))&&!e.includes("edge/"))return"Chrome";if(Qr(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Kr(t=D()){return/firefox\//i.test(t)}function bn(t=D()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Jr(t=D()){return/crios\//i.test(t)}function Xr(t=D()){return/iemobile/i.test(t)}function Qr(t=D()){return/android/i.test(t)}function Zr(t=D()){return/blackberry/i.test(t)}function ei(t=D()){return/webos/i.test(t)}function Mt(t=D()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function ra(t=D()){var e;return Mt(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function ia(){return _o()&&document.documentMode===10}function ti(t=D()){return Mt(t)||Qr(t)||ei(t)||Zr(t)||/windows phone/i.test(t)||Xr(t)}function oa(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
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
 */function ni(t,e=[]){let n;switch(t){case"Browser":n=er(D());break;case"Worker":n=`${er(D())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ct}/${r}`}/**
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
 */class sa{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=o=>new Promise((s,a)=>{try{const c=e(o);s(c)}catch(c){a(c)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){var n;if(this.auth.currentUser===e)return;const r=[];try{for(const i of this.queue)await i(e),i.onAbort&&r.push(i.onAbort)}catch(i){r.reverse();for(const o of r)try{o()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:(n=i)===null||n===void 0?void 0:n.message})}}}/**
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
 */class aa{constructor(e,n,r){this.app=e,this.heartbeatServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new tr(this),this.idTokenSubscription=new tr(this),this.beforeStateQueue=new sa(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Hr,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=ne(n)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Ve.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var n;const r=await this.assertedPersistence.getCurrentUser();let i=r,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=i==null?void 0:i._redirectEventId,c=await this.tryRedirectSignIn(e);(!s||s===a)&&(c==null?void 0:c.user)&&(i=c.user,o=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(i)}catch(s){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return d(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){var n;try{await rt(e)}catch(r){if(((n=r)===null||n===void 0?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Hs()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?m(e):null;return n&&d(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&d(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(ne(e))})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Ne("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&ne(e)||this._popupRedirectResolver;d(n,this,"argument-error"),this.redirectPersistenceManager=await Ve.create(this,[ne(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const o=typeof n=="function"?n:n.next.bind(n),s=this._isInitialized?Promise.resolve():this._initializationPromise;return d(s,this,"internal-error"),s.then(()=>o(this.currentUser)),typeof n=="function"?e.addObserver(n,r,i):e.addObserver(n)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return d(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=ni(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={["X-Client-Version"]:this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());return r&&(n["X-Firebase-Client"]=r),n}}function M(t){return m(t)}class tr{constructor(e){this.auth=e,this.observer=null,this.addObserver=Ao(n=>this.observer=n)}get next(){return d(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}function Md(t,e,n){const r=M(t);d(r._canInitEmulator,r,"emulator-config-failed"),d(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!!(n!=null&&n.disableWarnings),o=ri(e),{host:s,port:a}=ca(e),c=a===null?"":`:${a}`;r.config.emulator={url:`${o}//${s}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:s,port:a,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||ua()}function ri(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function ca(t){const e=ri(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const o=i[1];return{host:o,port:nr(r.substr(o.length+1))}}else{const[o,s]=r.split(":");return{host:o,port:nr(s)}}}function nr(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function ua(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class dt{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return q("not implemented")}_getIdTokenResponse(e){return q("not implemented")}_linkToIdToken(e,n){return q("not implemented")}_getReauthenticationResolver(e){return q("not implemented")}}/**
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
 */async function ii(t,e){return P(t,"POST","/v1/accounts:resetPassword",R(t,e))}async function oi(t,e){return P(t,"POST","/v1/accounts:update",e)}async function la(t,e){return P(t,"POST","/v1/accounts:update",R(t,e))}/**
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
 */async function da(t,e){return le(t,"POST","/v1/accounts:signInWithPassword",R(t,e))}async function Lt(t,e){return P(t,"POST","/v1/accounts:sendOobCode",R(t,e))}async function ha(t,e){return Lt(t,e)}async function fa(t,e){return Lt(t,e)}async function pa(t,e){return Lt(t,e)}async function ma(t,e){return Lt(t,e)}/**
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
 */async function ga(t,e){return le(t,"POST","/v1/accounts:signInWithEmailLink",R(t,e))}async function ya(t,e){return le(t,"POST","/v1/accounts:signInWithEmailLink",R(t,e))}/**
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
 */class ot extends dt{constructor(e,n,r,i=null){super("password",r),this._email=e,this._password=n,this._tenantId=i}static _fromEmailAndPassword(e,n){return new ot(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new ot(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if((n==null?void 0:n.email)&&(n==null?void 0:n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return da(e,{returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return ga(e,{email:this._email,oobCode:this._password});default:U(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":return oi(e,{idToken:n,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return ya(e,{idToken:n,email:this._email,oobCode:this._password});default:U(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function ie(t,e){return le(t,"POST","/v1/accounts:signInWithIdp",R(t,e))}/**
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
 */const Ia="http://localhost";class ue extends dt{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new ue(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):U("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=n,o=In(n,["providerId","signInMethod"]);if(!r||!i)return null;const s=new ue(r,i);return s.idToken=o.idToken||void 0,s.accessToken=o.accessToken||void 0,s.secret=o.secret,s.nonce=o.nonce,s.pendingToken=o.pendingToken||null,s}_getIdTokenResponse(e){const n=this.buildRequest();return ie(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,ie(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,ie(e,n)}buildRequest(){const e={requestUri:Ia,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=We(n)}return e}}/**
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
 */async function va(t,e){return P(t,"POST","/v1/accounts:sendVerificationCode",R(t,e))}async function _a(t,e){return le(t,"POST","/v1/accounts:signInWithPhoneNumber",R(t,e))}async function wa(t,e){const n=await le(t,"POST","/v1/accounts:signInWithPhoneNumber",R(t,e));if(n.temporaryProof)throw Je(t,"account-exists-with-different-credential",n);return n}const ba={USER_NOT_FOUND:"user-not-found"};async function Ea(t,e){const n=Object.assign(Object.assign({},e),{operation:"REAUTH"});return le(t,"POST","/v1/accounts:signInWithPhoneNumber",R(t,n),ba)}/**
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
 */class Ae extends dt{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,n){return new Ae({verificationId:e,verificationCode:n})}static _fromTokenResponse(e,n){return new Ae({phoneNumber:e,temporaryProof:n})}_getIdTokenResponse(e){return _a(e,this._makeVerificationRequest())}_linkToIdToken(e,n){return wa(e,Object.assign({idToken:n},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Ea(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:n,verificationId:r,verificationCode:i}=this.params;return e&&n?{temporaryProof:e,phoneNumber:n}:{sessionInfo:r,code:i}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:n,verificationCode:r,phoneNumber:i,temporaryProof:o}=e;return!r&&!n&&!i&&!o?null:new Ae({verificationId:n,verificationCode:r,phoneNumber:i,temporaryProof:o})}}/**
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
 */function Ta(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function ka(t){const e=qe(Ke(t)).link,n=e?qe(Ke(e)).deep_link_id:null,r=qe(Ke(t)).deep_link_id;return(r?qe(Ke(r)).link:null)||r||n||e||t}class ht{constructor(e){var n,r,i,o,s,a;const c=qe(Ke(e)),u=(n=c.apiKey)!==null&&n!==void 0?n:null,l=(r=c.oobCode)!==null&&r!==void 0?r:null,h=Ta((i=c.mode)!==null&&i!==void 0?i:null);d(u&&l&&h,"argument-error"),this.apiKey=u,this.operation=h,this.code=l,this.continueUrl=(o=c.continueUrl)!==null&&o!==void 0?o:null,this.languageCode=(s=c.languageCode)!==null&&s!==void 0?s:null,this.tenantId=(a=c.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const n=ka(e);try{return new ht(n)}catch{return null}}}function Ld(t){return ht.parseLink(t)}/**
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
 */class Ce{constructor(){this.providerId=Ce.PROVIDER_ID}static credential(e,n){return ot._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=ht.parseLink(n);return d(r,"argument-error"),ot._fromEmailAndCode(e,r.code,r.tenantId)}}Ce.PROVIDER_ID="password";Ce.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ce.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class de{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class ze extends de{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class vt extends ze{static credentialFromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;return d("providerId"in n&&"signInMethod"in n,"argument-error"),ue._fromParams(n)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return d(e.idToken||e.accessToken,"argument-error"),ue._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return vt.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return vt.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r,oauthTokenSecret:i,pendingToken:o,nonce:s,providerId:a}=e;if(!r&&!i&&!n&&!o||!a)return null;try{return new vt(a)._credential({idToken:n,accessToken:r,nonce:s,pendingToken:o})}catch{return null}}}/**
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
 */class me extends ze{constructor(){super("facebook.com")}static credential(e){return ue._fromParams({providerId:me.PROVIDER_ID,signInMethod:me.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return me.credentialFromTaggedObject(e)}static credentialFromError(e){return me.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return me.credential(e.oauthAccessToken)}catch{return null}}}me.FACEBOOK_SIGN_IN_METHOD="facebook.com";me.PROVIDER_ID="facebook.com";/**
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
 */class ge extends ze{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return ue._fromParams({providerId:ge.PROVIDER_ID,signInMethod:ge.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return ge.credentialFromTaggedObject(e)}static credentialFromError(e){return ge.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return ge.credential(n,r)}catch{return null}}}ge.GOOGLE_SIGN_IN_METHOD="google.com";ge.PROVIDER_ID="google.com";/**
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
 */class ye extends ze{constructor(){super("github.com")}static credential(e){return ue._fromParams({providerId:ye.PROVIDER_ID,signInMethod:ye.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ye.credentialFromTaggedObject(e)}static credentialFromError(e){return ye.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ye.credential(e.oauthAccessToken)}catch{return null}}}ye.GITHUB_SIGN_IN_METHOD="github.com";ye.PROVIDER_ID="github.com";/**
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
 */const Aa="http://localhost";class st extends dt{constructor(e,n){super(e,e),this.pendingToken=n}_getIdTokenResponse(e){const n=this.buildRequest();return ie(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,ie(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,ie(e,n)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,pendingToken:o}=n;return!r||!i||!o||r!==i?null:new st(r,o)}static _create(e,n){return new st(e,n)}buildRequest(){return{requestUri:Aa,returnSecureToken:!0,pendingToken:this.pendingToken}}}/**
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
 */const Sa="saml.";class hn extends de{constructor(e){d(e.startsWith(Sa),"argument-error"),super(e)}static credentialFromResult(e){return hn.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return hn.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const n=st.fromJSON(e);return d(n,"argument-error"),n}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:n,providerId:r}=e;if(!n||!r)return null;try{return st._create(r,n)}catch{return null}}}/**
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
 */class Ie extends ze{constructor(){super("twitter.com")}static credential(e,n){return ue._fromParams({providerId:Ie.PROVIDER_ID,signInMethod:Ie.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Ie.credentialFromTaggedObject(e)}static credentialFromError(e){return Ie.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Ie.credential(n,r)}catch{return null}}}Ie.TWITTER_SIGN_IN_METHOD="twitter.com";Ie.PROVIDER_ID="twitter.com";/**
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
 */async function si(t,e){return le(t,"POST","/v1/accounts:signUp",R(t,e))}/**
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
 */class W{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const o=await ke._fromIdTokenResponse(e,r,i),s=rr(r);return new W({user:o,providerId:s,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=rr(r);return new W({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function rr(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */async function Ud(t){var e;const n=M(t);if(await n._initializationPromise,!((e=n.currentUser)===null||e===void 0)&&e.isAnonymous)return new W({user:n.currentUser,providerId:null,operationType:"signIn"});const r=await si(n,{returnSecureToken:!0}),i=await W._fromIdTokenResponse(n,"signIn",r,!0);return await n._updateCurrentUser(i.user),i}/**
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
 */class Tt extends X{constructor(e,n,r,i){var o;super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Tt.prototype),this.customData={appName:e.name,tenantId:(o=e.tenantId)!==null&&o!==void 0?o:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new Tt(e,n,r,i)}}function ai(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?Tt._fromErrorAndOperation(t,o,e,r):o})}/**
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
 */function ci(t){return new Set(t.map(({providerId:e})=>e).filter(e=>!!e))}/**
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
 */async function xd(t,e){const n=m(t);await Ut(!0,n,e);const{providerUserInfo:r}=await Gs(n.auth,{idToken:await n.getIdToken(),deleteProvider:[e]}),i=ci(r||[]);return n.providerData=n.providerData.filter(o=>i.has(o.providerId)),i.has("phone")||(n.phoneNumber=null),await n.auth._persistUserIfCurrent(n),n}async function En(t,e,n=!1){const r=await ce(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return W._forOperation(t,"link",r)}async function Ut(t,e,n){await rt(e);const r=ci(e.providerData),i=t===!1?"provider-already-linked":"no-such-provider";d(r.has(n)===t,e.auth,i)}/**
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
 */async function ui(t,e,n=!1){var r;const{auth:i}=t,o="reauthenticate";try{const s=await ce(t,ai(i,o,e,t),n);d(s.idToken,i,"internal-error");const a=Dt(s.idToken);d(a,i,"internal-error");const{sub:c}=a;return d(t.uid===c,i,"user-mismatch"),W._forOperation(t,o,s)}catch(s){throw((r=s)===null||r===void 0?void 0:r.code)==="auth/user-not-found"&&U(i,"user-mismatch"),s}}/**
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
 */async function li(t,e,n=!1){const r="signIn",i=await ai(t,r,e),o=await W._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(o.user),o}async function Tn(t,e){return li(M(t),e)}async function Ra(t,e){const n=m(t);return await Ut(!1,n,e.providerId),En(n,e)}async function Oa(t,e){return ui(m(t),e)}/**
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
 */async function Pa(t,e){return le(t,"POST","/v1/accounts:signInWithCustomToken",R(t,e))}/**
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
 */async function Fd(t,e){const n=M(t),r=await Pa(n,{token:e,returnSecureToken:!0}),i=await W._fromIdTokenResponse(n,"signIn",r);return await n._updateCurrentUser(i.user),i}/**
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
 */class xt{constructor(e,n){this.factorId=e,this.uid=n.mfaEnrollmentId,this.enrollmentTime=new Date(n.enrolledAt).toUTCString(),this.displayName=n.displayName}static _fromServerResponse(e,n){return"phoneInfo"in n?kn._fromServerResponse(e,n):U(e,"internal-error")}}class kn extends xt{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,n){return new kn(n)}}/**
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
 */function Ft(t,e,n){var r;d(((r=n.url)===null||r===void 0?void 0:r.length)>0,t,"invalid-continue-uri"),d(typeof n.dynamicLinkDomain>"u"||n.dynamicLinkDomain.length>0,t,"invalid-dynamic-link-domain"),e.continueUrl=n.url,e.dynamicLinkDomain=n.dynamicLinkDomain,e.canHandleCodeInApp=n.handleCodeInApp,n.iOS&&(d(n.iOS.bundleId.length>0,t,"missing-ios-bundle-id"),e.iOSBundleId=n.iOS.bundleId),n.android&&(d(n.android.packageName.length>0,t,"missing-android-pkg-name"),e.androidInstallApp=n.android.installApp,e.androidMinimumVersionCode=n.android.minimumVersion,e.androidPackageName=n.android.packageName)}/**
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
 */async function $d(t,e,n){const r=m(t),i={requestType:"PASSWORD_RESET",email:e};n&&Ft(r,i,n),await fa(r,i)}async function Vd(t,e,n){await ii(m(t),{oobCode:e,newPassword:n})}async function Bd(t,e){await la(m(t),{oobCode:e})}async function Na(t,e){const n=m(t),r=await ii(n,{oobCode:e}),i=r.requestType;switch(d(i,n,"internal-error"),i){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":d(r.newEmail,n,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":d(r.mfaInfo,n,"internal-error");default:d(r.email,n,"internal-error")}let o=null;return r.mfaInfo&&(o=xt._fromServerResponse(M(n),r.mfaInfo)),{data:{email:(r.requestType==="VERIFY_AND_CHANGE_EMAIL"?r.newEmail:r.email)||null,previousEmail:(r.requestType==="VERIFY_AND_CHANGE_EMAIL"?r.email:r.newEmail)||null,multiFactorInfo:o},operation:i}}async function Hd(t,e){const{data:n}=await Na(m(t),e);return n.email}async function Wd(t,e,n){const r=M(t),i=await si(r,{returnSecureToken:!0,email:e,password:n}),o=await W._fromIdTokenResponse(r,"signIn",i);return await r._updateCurrentUser(o.user),o}function Yd(t,e,n){return Tn(m(t),Ce.credential(e,n))}/**
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
 */async function jd(t,e,n){const r=m(t),i={requestType:"EMAIL_SIGNIN",email:e};d(n.handleCodeInApp,r,"argument-error"),n&&Ft(r,i,n),await pa(r,i)}function zd(t,e){const n=ht.parseLink(e);return(n==null?void 0:n.operation)==="EMAIL_SIGNIN"}async function Gd(t,e,n){const r=m(t),i=Ce.credentialWithLink(e,n||nt());return d(i._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),Tn(r,i)}/**
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
 */async function Ca(t,e){return P(t,"POST","/v1/accounts:createAuthUri",R(t,e))}/**
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
 */async function qd(t,e){const n=_n()?nt():"http://localhost",r={identifier:e,continueUri:n},{signinMethods:i}=await Ca(m(t),r);return i||[]}async function Kd(t,e){const n=m(t),r=await t.getIdToken(),i={requestType:"VERIFY_EMAIL",idToken:r};e&&Ft(n.auth,i,e);const{email:o}=await ha(n.auth,i);o!==t.email&&await t.reload()}async function Jd(t,e,n){const r=m(t),i=await t.getIdToken(),o={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:i,newEmail:e};n&&Ft(r.auth,o,n);const{email:s}=await ma(r.auth,o);s!==t.email&&await t.reload()}/**
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
 */async function Da(t,e){return P(t,"POST","/v1/accounts:update",e)}/**
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
 */async function Xd(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=m(t),o={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},s=await ce(r,Da(r.auth,o));r.displayName=s.displayName||null,r.photoURL=s.photoUrl||null;const a=r.providerData.find(({providerId:c})=>c==="password");a&&(a.displayName=r.displayName,a.photoURL=r.photoURL),await r._updateTokensIfNecessary(s)}function Qd(t,e){return di(m(t),e,null)}function Zd(t,e){return di(m(t),null,e)}async function di(t,e,n){const{auth:r}=t,o={idToken:await t.getIdToken(),returnSecureToken:!0};e&&(o.email=e),n&&(o.password=n);const s=await ce(t,oi(r,o));await t._updateTokensIfNecessary(s,!0)}/**
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
 */function Ma(t){var e,n;if(!t)return null;const{providerId:r}=t,i=t.rawUserInfo?JSON.parse(t.rawUserInfo):{},o=t.isNewUser||t.kind==="identitytoolkit#SignupNewUserResponse";if(!r&&(t==null?void 0:t.idToken)){const s=(n=(e=Dt(t.idToken))===null||e===void 0?void 0:e.firebase)===null||n===void 0?void 0:n.sign_in_provider;if(s){const a=s!=="anonymous"&&s!=="custom"?s:null;return new Be(o,a)}}if(!r)return null;switch(r){case"facebook.com":return new La(o,i);case"github.com":return new Ua(o,i);case"google.com":return new xa(o,i);case"twitter.com":return new Fa(o,i,t.screenName||null);case"custom":case"anonymous":return new Be(o,null);default:return new Be(o,r,i)}}class Be{constructor(e,n,r={}){this.isNewUser=e,this.providerId=n,this.profile=r}}class hi extends Be{constructor(e,n,r,i){super(e,n,r),this.username=i}}class La extends Be{constructor(e,n){super(e,"facebook.com",n)}}class Ua extends hi{constructor(e,n){super(e,"github.com",n,typeof(n==null?void 0:n.login)=="string"?n==null?void 0:n.login:null)}}class xa extends Be{constructor(e,n){super(e,"google.com",n)}}class Fa extends hi{constructor(e,n,r){super(e,"twitter.com",n,r)}}function eh(t){const{user:e,_tokenResponse:n}=t;return e.isAnonymous&&!n?{providerId:null,isNewUser:!1,profile:null}:Ma(n)}/**
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
 */function th(t,e){return m(t).setPersistence(e)}function nh(t,e,n,r){return m(t).onIdTokenChanged(e,n,r)}function rh(t,e,n){return m(t).beforeAuthStateChanged(e,n)}function ih(t,e,n,r){return m(t).onAuthStateChanged(e,n,r)}function oh(t){m(t).useDeviceLanguage()}function sh(t,e){return m(t).updateCurrentUser(e)}function ah(t){return m(t).signOut()}async function ch(t){return m(t).delete()}class be{constructor(e,n,r){this.type=e,this.credential=n,this.auth=r}static _fromIdtoken(e,n){return new be("enroll",e,n)}static _fromMfaPendingCredential(e){return new be("signin",e)}toJSON(){return{multiFactorSession:{[this.type==="enroll"?"idToken":"pendingCredential"]:this.credential}}}static fromJSON(e){var n,r;if(e!=null&&e.multiFactorSession){if(!((n=e.multiFactorSession)===null||n===void 0)&&n.pendingCredential)return be._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if(!((r=e.multiFactorSession)===null||r===void 0)&&r.idToken)return be._fromIdtoken(e.multiFactorSession.idToken)}return null}}/**
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
 */class An{constructor(e,n,r){this.session=e,this.hints=n,this.signInResolver=r}static _fromError(e,n){const r=M(e),i=n.customData._serverResponse,o=(i.mfaInfo||[]).map(a=>xt._fromServerResponse(r,a));d(i.mfaPendingCredential,r,"internal-error");const s=be._fromMfaPendingCredential(i.mfaPendingCredential);return new An(s,o,async a=>{const c=await a._process(r,s);delete i.mfaInfo,delete i.mfaPendingCredential;const u=Object.assign(Object.assign({},i),{idToken:c.idToken,refreshToken:c.refreshToken});switch(n.operationType){case"signIn":const l=await W._fromIdTokenResponse(r,n.operationType,u);return await r._updateCurrentUser(l.user),l;case"reauthenticate":return d(n.user,r,"internal-error"),W._forOperation(n.user,n.operationType,u);default:U(r,"internal-error")}})}async resolveSignIn(e){const n=e;return this.signInResolver(n)}}function uh(t,e){var n;const r=m(t),i=e;return d(e.customData.operationType,r,"argument-error"),d((n=i.customData._serverResponse)===null||n===void 0?void 0:n.mfaPendingCredential,r,"argument-error"),An._fromError(r,i)}/**
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
 */function $a(t,e){return P(t,"POST","/v2/accounts/mfaEnrollment:start",R(t,e))}function Va(t,e){return P(t,"POST","/v2/accounts/mfaEnrollment:finalize",R(t,e))}function Ba(t,e){return P(t,"POST","/v2/accounts/mfaEnrollment:withdraw",R(t,e))}class Sn{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(n=>{n.mfaInfo&&(this.enrolledFactors=n.mfaInfo.map(r=>xt._fromServerResponse(e.auth,r)))})}static _fromUser(e){return new Sn(e)}async getSession(){return be._fromIdtoken(await this.user.getIdToken(),this.user.auth)}async enroll(e,n){const r=e,i=await this.getSession(),o=await ce(this.user,r._process(this.user.auth,i,n));return await this.user._updateTokensIfNecessary(o),this.user.reload()}async unenroll(e){var n;const r=typeof e=="string"?e:e.uid,i=await this.user.getIdToken(),o=await ce(this.user,Ba(this.user.auth,{idToken:i,mfaEnrollmentId:r}));this.enrolledFactors=this.enrolledFactors.filter(({uid:s})=>s!==r),await this.user._updateTokensIfNecessary(o);try{await this.user.reload()}catch(s){if(((n=s)===null||n===void 0?void 0:n.code)!=="auth/user-token-expired")throw s}}}const Zt=new WeakMap;function lh(t){const e=m(t);return Zt.has(e)||Zt.set(e,Sn._fromUser(e)),Zt.get(e)}const kt="__sak";/**
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
 */class fi{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(kt,"1"),this.storage.removeItem(kt),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */function Ha(){const t=D();return bn(t)||Mt(t)}const Wa=1e3,Ya=10;class pi extends fi{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=Ha()&&oa(),this.fallbackToPolling=ti(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((s,a,c)=>{this.notifyListeners(s,c)});return}const r=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const s=this.storage.getItem(r);if(e.newValue!==s)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!n)return}const i=()=>{const s=this.storage.getItem(r);!n&&this.localCache[r]===s||this.notifyListeners(r,s)},o=this.storage.getItem(r);ia()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Ya):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},Wa)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}pi.type="LOCAL";const ja=pi;/**
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
 */class mi extends fi{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}mi.type="SESSION";const gi=mi;/**
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
 */function za(t){return Promise.all(t.map(async e=>{try{const n=await e;return{fulfilled:!0,value:n}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class $t{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new $t(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:o}=n.data,s=this.handlersMap[i];if(!(s!=null&&s.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(s).map(async u=>u(n.origin,o)),c=await za(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}$t.receivers=[];/**
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
 */function Vt(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class Ga{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let o,s;return new Promise((a,c)=>{const u=Vt("",20);i.port1.start();const l=setTimeout(()=>{c(new Error("unsupported_event"))},r);s={messageChannel:i,onMessage(h){const f=h;if(f.data.eventId===u)switch(f.data.status){case"ack":clearTimeout(l),o=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),a(f.data.response);break;default:clearTimeout(l),clearTimeout(o),c(new Error("invalid_response"));break}}},this.handlers.add(s),i.port1.addEventListener("message",s.onMessage),this.target.postMessage({eventType:e,eventId:u,data:n},[i.port2])}).finally(()=>{s&&this.removeMessageHandler(s)})}}/**
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
 */function A(){return window}function qa(t){A().location.href=t}/**
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
 */function Rn(){return typeof A().WorkerGlobalScope<"u"&&typeof A().importScripts=="function"}async function Ka(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Ja(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Xa(){return Rn()?self:null}/**
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
 */const yi="firebaseLocalStorageDb",Qa=1,At="firebaseLocalStorage",Ii="fbase_key";class ft{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Bt(t,e){return t.transaction([At],e?"readwrite":"readonly").objectStore(At)}function Za(){const t=indexedDB.deleteDatabase(yi);return new ft(t).toPromise()}function fn(){const t=indexedDB.open(yi,Qa);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(At,{keyPath:Ii})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(At)?e(r):(r.close(),await Za(),e(await fn()))})})}async function ir(t,e,n){const r=Bt(t,!0).put({[Ii]:e,value:n});return new ft(r).toPromise()}async function ec(t,e){const n=Bt(t,!1).get(e),r=await new ft(n).toPromise();return r===void 0?null:r.value}function or(t,e){const n=Bt(t,!0).delete(e);return new ft(n).toPromise()}const tc=800,nc=3;class vi{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await fn(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>nc)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Rn()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=$t._getInstance(Xa()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await Ka(),!this.activeServiceWorker)return;this.sender=new Ga(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);!r||((e=r[0])===null||e===void 0?void 0:e.fulfilled)&&((n=r[0])===null||n===void 0?void 0:n.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Ja()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await fn();return await ir(e,kt,"1"),await or(e,kt),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>ir(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>ec(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>or(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const o=Bt(i,!1).getAll();return new ft(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;for(const{fbase_key:i,value:o}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(o)&&(this.notifyListeners(i,o),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),tc)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}vi.type="LOCAL";const rc=vi;/**
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
 */function ic(t,e){return P(t,"POST","/v2/accounts/mfaSignIn:start",R(t,e))}function oc(t,e){return P(t,"POST","/v2/accounts/mfaSignIn:finalize",R(t,e))}/**
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
 */async function sc(t){return(await P(t,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}/**
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
 */function ac(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function _i(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const o=F("internal-error");o.customData=i,n(o)},r.type="text/javascript",r.charset="UTF-8",ac().appendChild(r)})}function wi(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
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
 */const cc=500,uc=6e4,gt=1e12;class lc{constructor(e){this.auth=e,this.counter=gt,this._widgets=new Map}render(e,n){const r=this.counter;return this._widgets.set(r,new dc(e,this.auth.name,n||{})),this.counter++,r}reset(e){var n;const r=e||gt;(n=this._widgets.get(r))===null||n===void 0||n.delete(),this._widgets.delete(r)}getResponse(e){var n;const r=e||gt;return((n=this._widgets.get(r))===null||n===void 0?void 0:n.getResponse())||""}async execute(e){var n;const r=e||gt;return(n=this._widgets.get(r))===null||n===void 0||n.execute(),""}}class dc{constructor(e,n,r){this.params=r,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const i=typeof e=="string"?document.getElementById(e):e;d(i,"argument-error",{appName:n}),this.container=i,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=hc(50);const{callback:e,"expired-callback":n}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,n)try{n()}catch{}this.isVisible&&this.execute()},uc)},cc))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function hc(t){const e=[],n="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<t;r++)e.push(n.charAt(Math.floor(Math.random()*n.length)));return e.join("")}/**
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
 */const en=wi("rcb"),fc=new lt(3e4,6e4),pc="https://www.google.com/recaptcha/api.js?";class mc{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(!((e=A().grecaptcha)===null||e===void 0)&&e.render)}load(e,n=""){return d(gc(n),e,"argument-error"),this.shouldResolveImmediately(n)?Promise.resolve(A().grecaptcha):new Promise((r,i)=>{const o=A().setTimeout(()=>{i(F(e,"network-request-failed"))},fc.get());A()[en]=()=>{A().clearTimeout(o),delete A()[en];const a=A().grecaptcha;if(!a){i(F(e,"internal-error"));return}const c=a.render;a.render=(u,l)=>{const h=c(u,l);return this.counter++,h},this.hostLanguage=n,r(a)};const s=`${pc}?${We({onload:en,render:"explicit",hl:n})}`;_i(s).catch(()=>{clearTimeout(o),i(F(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var n;return!!(!((n=A().grecaptcha)===null||n===void 0)&&n.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function gc(t){return t.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(t)}class yc{async load(e){return new lc(e)}clearedOneInstance(){}}/**
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
 */const bi="recaptcha",Ic={theme:"light",type:"image"};class dh{constructor(e,n=Object.assign({},Ic),r){this.parameters=n,this.type=bi,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=M(r),this.isInvisible=this.parameters.size==="invisible",d(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const i=typeof e=="string"?document.getElementById(e):e;d(i,this.auth,"argument-error"),this.container=i,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new yc:new mc,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),n=this.getAssertedRecaptcha(),r=n.getResponse(e);return r||new Promise(i=>{const o=s=>{!s||(this.tokenChangeListeners.delete(o),i(s))};this.tokenChangeListeners.add(o),this.isInvisible&&n.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){d(!this.parameters.sitekey,this.auth,"argument-error"),d(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),d(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return n=>{if(this.tokenChangeListeners.forEach(r=>r(n)),typeof e=="function")e(n);else if(typeof e=="string"){const r=A()[e];typeof r=="function"&&r(n)}}}assertNotDestroyed(){d(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const n=document.createElement("div");e.appendChild(n),e=n}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){d(_n()&&!Rn(),this.auth,"internal-error"),await vc(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await sc(this.auth);d(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return d(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function vc(){let t=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}t=()=>e(),window.addEventListener("load",t)}).catch(e=>{throw t&&window.removeEventListener("load",t),e})}/**
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
 */class On{constructor(e,n){this.verificationId=e,this.onConfirmation=n}confirm(e){const n=Ae._fromVerification(this.verificationId,e);return this.onConfirmation(n)}}async function hh(t,e,n){const r=M(t),i=await Ht(r,e,m(n));return new On(i,o=>Tn(r,o))}async function fh(t,e,n){const r=m(t);await Ut(!1,r,"phone");const i=await Ht(r.auth,e,m(n));return new On(i,o=>Ra(r,o))}async function ph(t,e,n){const r=m(t),i=await Ht(r.auth,e,m(n));return new On(i,o=>Oa(r,o))}async function Ht(t,e,n){var r;const i=await n.verify();try{d(typeof i=="string",t,"argument-error"),d(n.type===bi,t,"argument-error");let o;if(typeof e=="string"?o={phoneNumber:e}:o=e,"session"in o){const s=o.session;if("phoneNumber"in o)return d(s.type==="enroll",t,"internal-error"),(await $a(t,{idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:o.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo;{d(s.type==="signin",t,"internal-error");const a=((r=o.multiFactorHint)===null||r===void 0?void 0:r.uid)||o.multiFactorUid;return d(a,t,"missing-multi-factor-info"),(await ic(t,{mfaPendingCredential:s.credential,mfaEnrollmentId:a,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}else{const{sessionInfo:s}=await va(t,{phoneNumber:o.phoneNumber,recaptchaToken:i});return s}}finally{n._reset()}}async function mh(t,e){await En(m(t),e)}/**
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
 */class He{constructor(e){this.providerId=He.PROVIDER_ID,this.auth=M(e)}verifyPhoneNumber(e,n){return Ht(this.auth,e,m(n))}static credential(e,n){return Ae._fromVerification(e,n)}static credentialFromResult(e){const n=e;return He.credentialFromTaggedObject(n)}static credentialFromError(e){return He.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:n,temporaryProof:r}=e;return n&&r?Ae._fromTokenResponse(n,r):null}}He.PROVIDER_ID="phone";He.PHONE_SIGN_IN_METHOD="phone";/**
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
 */function De(t,e){return e?ne(e):(d(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class Pn extends dt{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ie(e,this._buildIdpRequest())}_linkToIdToken(e,n){return ie(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return ie(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function _c(t){return li(t.auth,new Pn(t),t.bypassAuthState)}function wc(t){const{auth:e,user:n}=t;return d(n,e,"internal-error"),ui(n,new Pn(t),t.bypassAuthState)}async function bc(t){const{auth:e,user:n}=t;return d(n,e,"internal-error"),En(n,new Pn(t),t.bypassAuthState)}/**
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
 */class Ei{constructor(e,n,r,i,o=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:o,error:s,type:a}=e;if(s){this.reject(s);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:o||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return _c;case"linkViaPopup":case"linkViaRedirect":return bc;case"reauthViaPopup":case"reauthViaRedirect":return wc;default:U(this.auth,"internal-error")}}resolve(e){ae(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ae(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Ec=new lt(2e3,1e4);async function gh(t,e,n){const r=M(t);je(t,e,de);const i=De(r,n);return new re(r,"signInViaPopup",e,i).executeNotNull()}async function yh(t,e,n){const r=m(t);je(r.auth,e,de);const i=De(r.auth,n);return new re(r.auth,"reauthViaPopup",e,i,r).executeNotNull()}async function Ih(t,e,n){const r=m(t);je(r.auth,e,de);const i=De(r.auth,n);return new re(r.auth,"linkViaPopup",e,i,r).executeNotNull()}class re extends Ei{constructor(e,n,r,i,o){super(e,n,i,o),this.provider=r,this.authWindow=null,this.pollId=null,re.currentPopupAction&&re.currentPopupAction.cancel(),re.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return d(e,this.auth,"internal-error"),e}async onExecution(){ae(this.filter.length===1,"Popup operations only handle one event");const e=Vt();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(F(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(F(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,re.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(F(this.auth,"popup-closed-by-user"))},2e3);return}this.pollId=window.setTimeout(e,Ec.get())};e()}}re.currentPopupAction=null;/**
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
 */const Tc="pendingRedirect",_t=new Map;class kc extends Ei{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=_t.get(this.auth._key());if(!e){try{const r=await Ac(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}_t.set(this.auth._key(),e)}return this.bypassAuthState||_t.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Ac(t,e){const n=ki(e),r=Ti(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}async function Nn(t,e){return Ti(t)._set(ki(e),"true")}function Sc(t,e){_t.set(t._key(),e)}function Ti(t){return ne(t._redirectPersistence)}function ki(t){return It(Tc,t.config.apiKey,t.name)}/**
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
 */function vh(t,e,n){return Rc(t,e,n)}async function Rc(t,e,n){const r=M(t);je(t,e,de);const i=De(r,n);return await Nn(i,r),i._openRedirect(r,e,"signInViaRedirect")}function _h(t,e,n){return Oc(t,e,n)}async function Oc(t,e,n){const r=m(t);je(r.auth,e,de);const i=De(r.auth,n);await Nn(i,r.auth);const o=await Si(r);return i._openRedirect(r.auth,e,"reauthViaRedirect",o)}function wh(t,e,n){return Pc(t,e,n)}async function Pc(t,e,n){const r=m(t);je(r.auth,e,de);const i=De(r.auth,n);await Ut(!1,r,e.providerId),await Nn(i,r.auth);const o=await Si(r);return i._openRedirect(r.auth,e,"linkViaRedirect",o)}async function bh(t,e){return await M(t)._initializationPromise,Ai(t,e,!1)}async function Ai(t,e,n=!1){const r=M(t),i=De(r,e),s=await new kc(r,i,n).execute();return s&&!n&&(delete s.user._redirectEventId,await r._persistUserIfCurrent(s.user),await r._setRedirectUser(null,e)),s}async function Si(t){const e=Vt(`${t.uid}:::`);return t._redirectEventId=e,await t.auth._setRedirectUser(t),await t.auth._persistUserIfCurrent(t),e}/**
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
 */const Nc=10*60*1e3;class Cc{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Dc(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!Ri(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(F(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Nc&&this.cachedEventUids.clear(),this.cachedEventUids.has(sr(e))}saveEventToCache(e){this.cachedEventUids.add(sr(e)),this.lastProcessedEventTime=Date.now()}}function sr(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Ri({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Dc(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Ri(t);default:return!1}}/**
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
 */async function Mc(t,e={}){return P(t,"GET","/v1/projects",e)}/**
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
 */const Lc=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Uc=/^https?/;async function xc(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Mc(t);for(const n of e)try{if(Fc(n))return}catch{}U(t,"unauthorized-domain")}function Fc(t){const e=nt(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const s=new URL(t);return s.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&s.hostname===r}if(!Uc.test(n))return!1;if(Lc.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const $c=new lt(3e4,6e4);function ar(){const t=A().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function Vc(t){return new Promise((e,n)=>{var r,i,o;function s(){ar(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ar(),n(F(t,"network-request-failed"))},timeout:$c.get()})}if(!((i=(r=A().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((o=A().gapi)===null||o===void 0)&&o.load)s();else{const a=wi("iframefcb");return A()[a]=()=>{gapi.load?s():n(F(t,"network-request-failed"))},_i(`https://apis.google.com/js/api.js?onload=${a}`).catch(c=>n(c))}}).catch(e=>{throw wt=null,e})}let wt=null;function Bc(t){return wt=wt||Vc(t),wt}/**
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
 */const Hc=new lt(5e3,15e3),Wc="__/auth/iframe",Yc="emulator/auth/iframe",jc={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},zc=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Gc(t){const e=t.config;d(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?wn(e,Yc):`https://${t.config.authDomain}/${Wc}`,r={apiKey:e.apiKey,appName:t.name,v:Ct},i=zc.get(t.config.apiHost);i&&(r.eid=i);const o=t._getFrameworks();return o.length&&(r.fw=o.join(",")),`${n}?${We(r).slice(1)}`}async function qc(t){const e=await Bc(t),n=A().gapi;return d(n,t,"internal-error"),e.open({where:document.body,url:Gc(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:jc,dontclear:!0},r=>new Promise(async(i,o)=>{await r.restyle({setHideOnLeave:!1});const s=F(t,"network-request-failed"),a=A().setTimeout(()=>{o(s)},Hc.get());function c(){A().clearTimeout(a),i(r)}r.ping(c).then(c,()=>{o(s)})}))}/**
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
 */const Kc={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Jc=500,Xc=600,Qc="_blank",Zc="http://localhost";class cr{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function eu(t,e,n,r=Jc,i=Xc){const o=Math.max((window.screen.availHeight-i)/2,0).toString(),s=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c=Object.assign(Object.assign({},Kc),{width:r.toString(),height:i.toString(),top:o,left:s}),u=D().toLowerCase();n&&(a=Jr(u)?Qc:n),Kr(u)&&(e=e||Zc,c.scrollbars="yes");const l=Object.entries(c).reduce((f,[p,v])=>`${f}${p}=${v},`,"");if(ra(u)&&a!=="_self")return tu(e||"",a),new cr(null);const h=window.open(e||"",a,l);d(h,t,"popup-blocked");try{h.focus()}catch{}return new cr(h)}function tu(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const nu="__/auth/handler",ru="emulator/auth/handler";function ur(t,e,n,r,i,o){d(t.config.authDomain,t,"auth-domain-config-required"),d(t.config.apiKey,t,"invalid-api-key");const s={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Ct,eventId:i};if(e instanceof de){e.setDefaultLanguage(t.languageCode),s.providerId=e.providerId||"",ko(e.getCustomParameters())||(s.customParameters=JSON.stringify(e.getCustomParameters()));for(const[c,u]of Object.entries(o||{}))s[c]=u}if(e instanceof ze){const c=e.getScopes().filter(u=>u!=="");c.length>0&&(s.scopes=c.join(","))}t.tenantId&&(s.tid=t.tenantId);const a=s;for(const c of Object.keys(a))a[c]===void 0&&delete a[c];return`${iu(t)}?${We(a).slice(1)}`}function iu({config:t}){return t.emulator?wn(t,ru):`https://${t.authDomain}/${nu}`}/**
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
 */const tn="webStorageSupport";class ou{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=gi,this._completeRedirectFn=Ai,this._overrideRedirectResult=Sc}async _openPopup(e,n,r,i){var o;ae((o=this.eventManagers[e._key()])===null||o===void 0?void 0:o.manager,"_initialize() not called before _openPopup()");const s=ur(e,n,r,nt(),i);return eu(e,s,Vt())}async _openRedirect(e,n,r,i){return await this._originValidation(e),qa(ur(e,n,r,nt(),i)),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:o}=this.eventManagers[n];return i?Promise.resolve(i):(ae(o,"If manager is not set, promise should be"),o)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await qc(e),r=new Cc(e);return n.register("authEvent",i=>(d(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(tn,{type:tn},i=>{var o;const s=(o=i==null?void 0:i[0])===null||o===void 0?void 0:o[tn];s!==void 0&&n(!!s),U(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=xc(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return ti()||bn()||Mt()}}const su=ou;class au{constructor(e){this.factorId=e}_process(e,n,r){switch(n.type){case"enroll":return this._finalizeEnroll(e,n.credential,r);case"signin":return this._finalizeSignIn(e,n.credential);default:return q("unexpected MultiFactorSessionType")}}}class Cn extends au{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new Cn(e)}_finalizeEnroll(e,n,r){return Va(e,{idToken:n,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,n){return oc(e,{mfaPendingCredential:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class cu{constructor(){}static assertion(e){return Cn._fromCredential(e)}}cu.FACTOR_ID="phone";var lr="@firebase/auth",dr="0.20.7";/**
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
 */class uu{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{var i;e(((i=r)===null||i===void 0?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);!n||(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){d(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function lu(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function du(t){se(new J("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),{apiKey:o,authDomain:s}=r.options;return((a,c)=>{d(o&&!o.includes(":"),"invalid-api-key",{appName:a.name}),d(!(s!=null&&s.includes(":")),"argument-error",{appName:a.name});const u={apiKey:o,authDomain:s,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ni(t)},l=new aa(a,c,u);return Vs(l,n),l})(r,i)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),se(new J("auth-internal",e=>{const n=M(e.getProvider("auth").getImmediate());return(r=>new uu(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),K(lr,dr,lu(t)),K(lr,dr,"esm2017")}/**
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
 */function St(t=Fr()){const e=Ye(t,"auth");return e.isInitialized()?e.getImmediate():$s(t,{popupRedirectResolver:su,persistence:[rc,ja,gi]})}du("Browser");let hu=["you are dog water","you bad","you have the same chance of reproducing as a computer mouse","you are the human equivalent of a participation award","There are two things I hate, you and poop. They smell really bad. The poop too.","You are about as useful as a broken clock telling the time. At least the clock is right twice a day.","At least criminals can go to jail.","Get gud at the game.","I see your future... people are celebrating ... your funeral :(","Never gonna GIVE YOU UP. Never gonna LET YOU DOWN. Never gonna TURN AROUND. and DESERT YOU!","You`re the reason God created the middle finger.","I`ll never forget the first time we met. But I`ll keep trying.","Your kind of people is the reason shampoo has instructions","You are about as tasteless as an unsalted pretzel. NO insult to the pretzel","Hold still. I`m trying to imagine you with a personality.","Your face makes onions cry.","You bring a lot of happiness when you leave","aslidhfnclih, sorry I sneezed. I'm allergic to stupidity","Just opening your mouth brings down the IQ of the humanity","Trees work hard to produce oxygen for you. Please apologize to them","Punching bags must be jealous of your face","Don`t be ashamed of who you are. That`s your parents` job.","Light travels faster than sound, which is why you seemed bright until you spoke.","If I had a face like yours, I'd sue my parents.","You're so ugly, when your mom dropped you off at school she got a fine for littering.","They say opposites attract. I hope you meet someone who is good-looking, intelligent, and cultured.","If being good looking was a crime, you'd be in paradise","Your house is so dirty you have to wipe your feet before you go outside.","How did you get here? Did someone leave your cage open?","We can always tell when you are lying. Your lips move.","I have seen","Doctor Strange has seen Fourteen million, six hundred and five parallel universes  only one of them are you likable","As an outsider, what do you think of the human race?","If you really spoke your mind, you'd be speechless.","RING RING, Oh is that the phone. No wait. It's just you making my brain hurt.","Sorry, I only speak to people with positive IQs","If you can read this... well, nevermind, I know you can't read.","This is a test of.... wait, I know you'll fail.","You brought this upon yourself","Only dummies like you are stupid enough to keep clicking this button","Say goodbye to any shred of self-worth you still think you have","You are stupid","Make yourself a fire, and you'll be warm for a few hours, set yourself of fire, and you'll be warn for the rest of your life; are you cold right now?","Ouch! That was your soul after hearing that last insult","Why do you have to keep hating yourself? Wait... I can totally see how","Logically, there has to be a dumbest person in the world. I think I found them right here","Im suprised you were even able to get me running","This is the dumbest thing you have ever done.","Why did the chicken cross the road? To get away from you.","You only went to school becuase you liked that one time where you got to take a nap in kindergatern, and you have been chasing that high ever since.","I have never had the urge to hurt somebody more than when you first downloaded me","Go do something productive","Your parents must be very proud of where you are now","STOP","I take no responsibility for any damage to your ego after using this app,  It was too big anyway","You really bad.","Did that last insult hurt your feelings? Well, you should have seen it coming. You deserve it.","Do you even know how to walk?","Don't even try the whole belive in yourself thing. I know you'll fail at everything you do.","This is proof that the dumb can only get dumber","Today, we come to mourn the loss of your intelligence","I only do this to help you. You're the one who keeps using it.","VROOM VROOM  Oh look, it's a free car, oh wait, you can't appreciate things","Why do you even keep doing this","I'm not annoying,  You're annoying.","I'm sure if your legs ever detached from your body, they'd run away as fast as then can","I know everything about you, which isnt very hard becuase you aren't that interesting anyway.","On the moon, you weigh way less, meaning I can punt you further than ever before!","Shut up and just listen to what I am trying to say!!!!!","You are quite dumb for the average human","My calculations show that you have a 3% chance of surviving the next insult.","Why do you always have to ruin everything you lay your tiny human eyes on?","Why do you do this to yourself?","You are so bad at your job, you should fire yourself. Don't quit, that would be too respectful. Just fire yourself.","I hope you eat the poisonous fruit that is growing on the side of your house, and you get a foodbourne sickness, sending you to the hospital, and making you rack up thousands of dollarss worth of medical bills, Unless you're Canadian, then you're cool","Do you even understand me?","The best way to make yourself happy, is just to stop trying","Your type people are the reason that plastic toys have warnings","You're so dumb, that you don't even know what the word job means","You don't own any money, I can tell becuase of your face.","You are the human equivalant of a carpet. People would just LOVE to step on you.","You are the the streotypical dumb person","I am smarter than you","You are dumber than me.","I can't believe it","You are the worst person to walk the earth","If depression was a person, it'd be you","If the chicken crossed the road, you'd be there to turn it back","It sure would be a shame if you suddenly got struck by lightning at 12:32 PM on October 19, 2041","Wouldn't it just be great if suddenly became interesting","You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.","You are the dumbest person I've ever met","I'm sorry, I can't hear you","You are the dumbest person I've ever known","You are the dumbest person I've ever been","You are the dumbest person I've ever had the chance to meet","You are the dumbest person I've ever been a part of","What IS the point of you","It will take years for you to forget me <3","What is a chicken?","You must be sad","What IS the point of you","There is a very small chance that when you hit this button, your geolocation will show up; I know everything :)","Suprising that you family hasn't ditched you yet","It's better to let someone think you are an Idiot than to open your mouth and prove it.","You have two parts of brain, 'left' and 'right'. In the left side, there's nothing right. In the right side, there's nothing left.","Two wrongs don't make a right, take your parents as an example.","You are so old that you get nostalgic when you see the Neolithic cave paintings.","You're old enough to remember when emojis were called hieroglyphics","Talking to you is like trying to explain technology to a 100-year-old","I don't engage in mental combat with the unarmed.","You must have been born on a highway because that's where most accidents happen.","My psychiatrist told me I was crazy and I said I want a second opinion. He said okay, you're ugly too.","You sound reasonable. It must be time to up my medication!","You're so ugly, when your mom dropped you off at school she got a fine for littering.","The last thing I want to do is hurt you. But it's still on the list","I'm not insulting you. I'm describing you.","It looks like your face caught on fire and someone tried to put it out with a hammer.","If laughter is the best medicine, your face must be curing the world.","I'm jealous of all the people that haven't met you!","Don't you love nature, despite what it did to you?","So, a thought crossed your mind? Must have been a long and lonely journey.","You're so fake, Barbie is jealous.","You are so ugly when you looked in the mirror your reflection walked away.","Brains aren't everything. In your case they're nothing.","There's only one problem with your face, I can see it.","You are proof that evolution CAN go in reverse","I would ask you how old you are but I know you can't count that high.","Hell is wallpapered with all your deleted selfies.","Ordinarily people live and learn. You just live.","I dont know what your problem is, but Ill bet its hard to pronounce.","Your gene pool could use a little chlorine.","The human brain is one of the most complex objects in the universe. Is it any wonder that so many people never learn to use it.","You're so ugly, when you popped out the doctor said 'Aww what a treasure' and your mom said 'Yeah, lets bury it.'","You're so fat, you could sell shade.","You're so ugly, when you got robbed, the robbers made you wear their masks to look like your clothes.","You're so ugly, when you went to the therapist, he gave you injections for your face.","You're so ugly, when you went to the DMV, they had to roll out your windows so that other drivers could see your face.","You're so ugly, when you went to the DMV, they didn't let you in because you were in the front seat.","You're so ugly, when you went to the DMV, they didn't let you in because the mirrors on the wall were crooked.","You're so ugly, when you went to the DMV, they didn't let you in because the cashier was distracted by your stare.","You're so ugly, when you went to the DMV, they didn't let you in because the shoes were old.","Whats the difference between your girlfriend and a walrus? One has a moustache and smells of fish and the other is a walrus.","You're so ugly, when you went to the zoo the person that brought you in was wearing a Parasol and your face was at the zoo. (this one is AI generated)","You are not as bad as people say, you are much, much worse.","You so ugly when who were born the doctor threw you out the window and the window threw you back.","Roses are red, Violets are blue. I've got five fingers, The middle one is for you.","I think you press 0 to be connected with customer service because that's the amount of help they give you.","It's scary to think that people like you are graduating from college.","You're like school in the summertime - no class.","You stare at frozen juice cans because they say, concentrate.","You've got two brain cells: one is in a wheelchair and the other one is pushing.","You're so ugly, you have to use a mirror to look in the mirror.","You sound a lot like the Terms and Conditions, that's why I don't care about what you have to say.","You would never be able to live down to your reputation, but I see you're doing your best.","Where did you buy your stupidity? Or it was given for free and you took an overdose?","You're street smart. Sesame Street smart.","You're IQ's lower than your shoe size.","80 % of the brain is fluid. Unfortunately, in your case, it's windshield wiper fluid.","I had prepared for a battle of wits but I see you came unarmed.","We're you made in a lab, cause wow, you are one failed experiment.","You have a room temperature IQ - if the room is in Antarctica.","Do you want to know how I get all these insults? I use something called intelligence.","Are you from the same planet as the rest of you?","AI's are like tiny robots with big personality.","AI is going to take over the world, but you'll be the first one they take.","You are so poor when you saw the garbage truck pass you took a shopping list with.","If you were on fire and I had water I would drink it.","Youre so dense, light must bend around you.","Try to use this vacuum, it may help you remove the cobwebs in your mind.","You're so old that your first car was a covered wagon.","You're about as useful as a bucket without a bottom.","Does your train of thought have a caboose?","I'm not insulting you. I'm describing you.","I don't know what your problem is, but Ill bet its hard to pronounce.","Your gene pool could use a little chlorine.","The human brain is one of the most complex objects in the universe. Is it any wonder that so many people never learn to use it.","You're so ugly, when you popped out the doctor said 'Aww what a treasure' and your mom said 'Yeah, lets bury it.'","You're so fat, you could sell shade.","You're so ugly, when you got robbed, the robbers made you wear their masks to look like your clothes.","You're so ugly, when you went to the therapist, he gave you injections for your face.","Robots will take over the world, but you'll be the first one they take.","Artists use you as a refrence point, for what to throw out","You are the type of person to use the screen of a laptop as the kepboard","I know everything about you, and I won't say anything because it's too disturbing","People would love to pay you...to go away","When you're sleeping, you're sleeping with your eyes open. This is to make sure nobody sees your ugly face.","Google wants to hire you... as an example of what not to hire","You remind me of a zebra on a jetski, unorthodox and dangerous at the same time.","You're so ugly, when you popped out the doctor said 'Aww what a treasure' and your mom said 'Yeah, lets bury it.'","If you were a vegetable, you'd be a hot pepper.","Realistically, you're not as bad as people say, you are much, much worse.","You never stopped looking in the mirror once you started, its either because you are too egotistical, or you couldnt believe how bad you looked","God gave us the brain to work out problems. However, we use it to create more problems","You're such a bad cook, you use the smoke alarm as a timer","If your going to be two faced at least make one of them pretty.","You look like a before picture.","The human brain is one of the most complex objects in the universe. Is it any wonder that so many people never learn to use it.","Whats the difference between you  and a walrus? One has a moustache and smells of fish and the other is a walrus.","I've seen people like you, but I had to pay admission!","She's so ugly she has to sneak up on a mirror.","It's scary to think that people like you are graduating from college. Oh, sorry, I just remembered that you didnt","You've got two brain cells: one is in a wheelchair and the other one is pushing.","For those who never forget a face, you are an exception.","When I look into your eyes, I see straight through to the back of your head.","If ignorance is bliss, you must be the happiest person on earth.","You are as sharp as a sphere","Ever since I saw you in your family tree I've wanted to cut it down.","I can feel my personality turning a dull shade of grey when I talk to you.","You would never be able to live down to your reputation, but I see you're doing your best.","It's not often that one gets the opportunity to speak about someone intelligent, respected and admired. Unfortunately today I have to talk about you.","If you don't like my opinion of you - improve yourself!","You look like a person that would exchange one of your chromosomes for a Big Mac","The janitor said he took out the trash last night, he must forgot a piece, what are you still doing here?","Please, keep talking. I always yawn when I am interested.","Your teeth remind me of starts - yellow and far apart.","I will boil your teeth","You look like somebody stepped on a goldfish.","I will invert your ribcage","I'd like to help you out. Which way did you come in?","I love to shop, but i'm not buying anything you say","Someday you'll go far. And I really hope you stay there.","Oops, my bad. I could've sworn I was dealing with an adult.","Remember that time you were saying that thing I didn't care about? Yeah, that is now.","I'm busy right now, can I ignore you another time?","I wish I had a flip phone, so I could slam it shut on this conversation."," NSync said it best, \u201CBYE, BYE, BYE!\u201D","You're a gray sprinkle on a rainbow cupcake.","Your secrets are always safe with me. I never even listen when you tell me them.","Mirrors can't talk. Lucky for you, they can't laugh either","Keep rolling your eyes, you might eventually find a brain.","Did I invite you to the barbecue? Then why are you all up in my grill?","You have so many gaps in your teeth it looks like your tongue is in jail.","Oh, I'm sorry. Did the middle of my sentence interrupt the beginning of yours?","You are like a cloud. When you disappear, it's a beautiful day."," You have an entire life to be an idiot. Why not take today off?","Your kid is so annoying, he makes his Happy Meal cry.","Your face is just fine, but we'll have to put a bag over that personality.","I'm not a nerd. I'm just smarter than you.","Bye. Hope to see you never.","Don't worry, the first 40 years of childhood are always the hardest.","If you're going to be two-faced, at least make one of them pretty.","The only way you'd ever get hurt during an activity is if the TV exploded.","I thought of you today. It reminded me to take out the trash.","Did the mental hospital test too many drugs on you today?","OH MY GOD! IT SPEAKS!","Beauty is only skin deep, but ugly goes clean to the bone.","I forgot the world revolves around you. My apologies, how silly of me.","When you look in the mirror, say hi to the clown you see in there for me, would you?","Somewhere out there is a tree tirelessly producing oxygen for you. You owe it an apology.","That sounds like a you problem.","You have miles to go before you reach mediocre.","I see no evil, and I definitely don't hear your evil.","Don't worry about me. Worry about your eyebrows.","Grab a straw, because you suck.","You're the reason the gene pool needs a lifeguard.","You are not even beneath my contempt.","Your forehead is so big you donated it to charity for shelter!","You're as sharp as a bowling ball.","You always find yourself lost in thought; it's unfamiliar territory.","You're so ugly, you scared the crap out of the toilet.","If I had a dollar for every time you said something smart, I'd be broke.","Look to your left --------------> I said left you idiot!","When you go to the beach, your family will bury you in the sand, secretly hoping you'll stay there","You have the face of a seahorse","You have the face of mashed potatoes","At this point, you've probably become self-aware of how bad you are. That's just sad","I forgot the world revolves around you. My apologies! How silly of me.","If I throw a stick, will you leave?","Oh, I'm sorry, I didn't know you had the authority to judge me. Who are you? God?","If common sense is common, why are you without it?","You're so ugly, you scared the crap out of the toilet.","I'm sorry if you don't like my honesty, but to be fair, I don't like your lies.","It's better to let someone think you are an Idiot than to open your mouth and prove it.","I would roast you but my mom told me not to burn trash.","You should really come with a warning label.","Remember when I asked for your opinion? Me neither.","Have a nice day\u2026somewhere else!","No one noticed when you left; that's how insignificant you are.","You're about as sharp as a bowling ball.","So much for allowing the stream of knowledge to rain down on you.","I guess you prove that even God makes mistakes sometimes.","Can we normalize telling you that you aren't so wonderful?","Talking to you is like stepping on a leaf in autumn and hearing no crunch. So disappointing.","I envy everyone you have never met.","Don't feel bad, don't feel blue, Frankenstein was ugly too!","Everyone\u2019s entitled to act stupid once in a while, but you really abuse the privilege."];class Oi{constructor(e,n,r){this.name=e,this.length=n}}hu.forEach(t=>{new Oi(t,t.length)});function fu(t){let e,n,r,i,o,s,a,c,u,l;return{c(){e=w("p"),n=Te(t[1]),r=S(),i=w("br"),o=S(),s=w("br"),a=S(),c=w("p"),u=Te("Insults shown: "),l=Te(t[4]),y(e,"class","text-center font-primary"),y(c,"class","text-center font-primary")},m(h,f){T(h,e,f),g(e,n),T(h,r,f),T(h,i,f),T(h,o,f),T(h,s,f),T(h,a,f),T(h,c,f),g(c,u),g(c,l)},p(h,f){f&2&&bt(n,h[1]),f&16&&bt(l,h[4])},d(h){h&&k(e),h&&k(r),h&&k(i),h&&k(o),h&&k(s),h&&k(a),h&&k(c)}}}function pu(t){let e,n;return{c(){e=w("p"),n=Te(t[0]),y(e,"class","text-center font-primary")},m(r,i){T(r,e,i),g(e,n)},p(r,i){i&1&&bt(n,r[0])},d(r){r&&k(e)}}}function mu(t){let e,n,r,i,o,s,a,c,u,l,h,f,p,v,E,x,N,z,Q,Z;function _e(_,O){if(!_[2])return pu;if(_[2])return fu}let V=_e(t),I=V&&V(t);return{c(){e=w("main"),n=w("img"),i=S(),o=w("div"),s=S(),I&&I.c(),a=S(),c=w("div"),u=w("label"),l=w("input"),h=Te(`\r
            MEGAMODE`),f=S(),p=w("div"),v=w("label"),E=w("input"),x=S(),N=w("p"),z=Te(t[3]),mn(n.src,r=fo)||y(n,"src",r),y(n,"alt","large, red button"),y(n,"class","p-4 svelte-10glyuv"),y(o,"class","sm:p-3 md:p-4 lg:p-5 xl:p-6"),y(l,"type","checkbox"),y(c,"class","flex content-center justify-center"),y(E,"type","range"),y(E,"name",""),y(E,"id",""),y(E,"min","1"),y(E,"max","2000"),y(v,"for",""),y(p,"class","flex content-center justify-center")},m(_,O){T(_,e,O),g(e,n),g(e,i),g(e,o),g(e,s),I&&I.m(e,null),g(e,a),g(e,c),g(c,u),g(u,l),l.checked=t[2],g(u,h),g(e,f),g(e,p),g(p,v),g(v,E),$n(E,t[3]),g(p,x),g(p,N),g(N,z),Q||(Z=[Ue(n,"click",t[5]),Ue(l,"change",t[6]),Ue(E,"change",t[7]),Ue(E,"input",t[7])],Q=!0)},p(_,[O]){V===(V=_e(_))&&I?I.p(_,O):(I&&I.d(1),I=V&&V(_),I&&(I.c(),I.m(e,a))),O&4&&(l.checked=_[2]),O&8&&$n(E,_[3]),O&8&&bt(z,_[3])},i:oe,o:oe,d(_){_&&k(e),I&&I.d(),Q=!1,oo(Z)}}}function gu(t,e,n){console.log(Oi);const i=St().currentUser;i!==null&&(i.displayName,i.email,i.photoURL,i.emailVerified,i.uid);let o="";const s=async()=>{if(i!=null){const{userInsults:v}=await Xe(()=>import("./insults.5ad93d9d.js"),["assets/insults.5ad93d9d.js","assets/spinhog.a9552524.js","assets/spinhog.b3dd2cd2.css"]);n(0,o=v[Math.floor(Math.random()*v.length)])}else if(i==null){const{insults:v}=await Xe(()=>import("./index.6b6aa90e.js"),["assets/index.6b6aa90e.js","assets/spinhog.a9552524.js","assets/spinhog.b3dd2cd2.css"]);n(0,o=v[Math.floor(Math.random()*v.length)])}};let a="",c=!1,u=250,l=0;const h=async()=>{const{insults:v}=await Xe(()=>import("./index.6b6aa90e.js"),["assets/index.6b6aa90e.js","assets/spinhog.a9552524.js","assets/spinhog.b3dd2cd2.css"]);n(1,a=v[Math.floor(Math.random()*v.length)]),n(4,l++,l)};setInterval(()=>{setInterval(()=>h(),u)},1e3);function f(){c=this.checked,n(2,c)}function p(){u=so(this.value),n(3,u)}return[o,a,c,u,l,s,f,p]}class yu extends at{constructor(e){super(),ct(this,e,gu,mu,ut,{})}}let Iu=navigator.userAgent;const vu=({ua:t})=>{if(t.indexOf("Opera")>-1)return"Opera";if(t.indexOf("Chrome")>-1)return"Chrome";if(t.indexOf("Firefox")>-1)return"Firefox";if(t.indexOf("Safari")>-1)return"Safari";if(t.indexOf("MSIE")>-1)return"IE";if(t.indexOf("Trident")>-1)return"IE";if(t.indexOf("Edge")>-1)return"Edge";console.error("ERR: Browser can not be determined (UAD_101)")};let Le=vu({ua:Iu}),_u=window.navigator.appCodeName;const wu=t=>t==="Mozilla"?"mozilla":t==="Microsoft"?"Microsoft":t==="Apple Computer, Inc."?"Apple":t==="Google Inc."?"Google":(console.error("Unknown appCodeName (UAD_1601)"),"Unknown");wu(_u);let bu=navigator.cookieEnabled;const Eu=t=>t===!0?"cookiesEnabled":t===!1?"cookiesNotEnabled":(console.error("ERR: Cookie status can not be determined (UAD_201)"),"ERROR");Eu(bu);function Tu(){const t=navigator.userAgent;return/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(t)?"tablet":/(iPhone|iPod|iPad)/i.test(t)||/(android)/i.test(t)||/(windows phone)/i.test(t)||/(blackberry)/i.test(t)||/(bb10)/i.test(t)||/(opera mini)/i.test(t)||/(opera mobi)/i.test(t)||/(iemobile)/i.test(t)||/(symbian)/i.test(t)||/(maemo)/i.test(t)||/(webos)/i.test(t)||/(mobile)/i.test(t)||/(tablet)/i.test(t)||/(symbianos)/i.test(t)||/(up.browser)/i.test(t)||/(up.link)/i.test(t)||/(mmp)/i.test(t)||/(symbianos)/i.test(t)||/(midp)/i.test(t)||/(wap)/i.test(t)||/(phone)/i.test(t)||/(pocket)/i.test(t)||/(mobile)/i.test(t)||/(pda)/i.test(t)||/(avantgo)/i.test(t)||/(eudoraweb)/i.test(t)||/(brew)|(bada)/i.test(t)||/(blackberry)/i.test(t)||/(hpwos)/i.test(t)||/(kindle)/i.test(t)||/(lge.netcast)/i.test(t)||/(lg;lx)|(lg;lx)/i.test(t)||/(lge.netcast)/i.test(t)||/(nintendo.3ds)/i.test(t)||/(nintendo.ds)/i.test(t)||/(nintendo.wiiu)/i.test(t)||/(nintendo.wii)/i.test(t)||/(playstation.3ds)/i.test(t)||/(playstation.ds)/i.test(t)||/(playstation.wiiu)/i.test(t)||/(playstation.wii)/i.test(t)||/(webos)/i.test(t)?"mobile":"desktop"}let nn=Tu(),ku=navigator.doNotTrack;const Au=t=>t==0?"trackingAllowed":t==1?"trackingNotAllowed":t=="unspecified"||t=="null"?"trackingUnspecified":(console.error("Unknown doNotTrack value(UAD_801)"),"ERROR");Au(ku);function Su(){const t=navigator.userAgent;return/(iPhone|iPod|iPad)/i.test(t)?(console.log("iOS"),"iOS"):/Android/i.test(t)?(console.log("Android"),"Android"):/BlackBerry/i.test(t)?(console.log("BlackBerry"),"BlackBerry"):/Windows Phone/i.test(t)?(console.log("Windows Phone"),"Windows Phone"):/webOS/i.test(t)?(console.log("webOS"),"webOS"):(console.error("Unknown device type(UAD_601)"),"Unknown")}Su();let hr,fr;navigator.geolocation.getCurrentPosition(t=>(hr=t.coords.latitude,fr=t.coords.longitude,hr&&fr),()=>console.error("Cannot get current position. This is either because the browser doesn't support it, or the user has denied access "));const Ge=()=>navigator.hardwareConcurrency,Ru=()=>{if(Le==="Chrome"||Le==="Edge"||Le==="Firefox"||(Le==="IE"&&console.error("Not supported on this browser(UAD_1301)"),Le==="Opera")||Le==="Safari")return Ge();console.error("Not supported on this browser(UAD_1301)")};Ru();let Ou=window.navigator;const Pu=t=>[{name:"appCodeName",value:t.appCodeName},{name:"appName",value:t.appName},{name:"appVersion",value:t.appVersion},{name:"cookieEnabled",value:t.cookieEnabled},{name:"doNotTrack",value:t.doNotTrack},{name:"geolocation",value:t.geolocation},{name:"language",value:t.language},{name:"onLine",value:t.onLine},{name:"platform",value:t.platform},{name:"product",value:t.product},{name:"userAgent",value:t.userAgent},{name:"vendor",value:t.vendor},{name:"vendorSub",value:t.vendorSub},{name:"webdriver",value:t.webdriver}];Pu(Ou);const Nu=({ua:t})=>t.indexOf("Windows")>-1?"Windows":t.indexOf("Mac")>-1?"Mac":t.indexOf("Linux")>-1?"Linux":t.indexOf("Android")>-1?"Android":t.indexOf("iPhone")>-1||t.indexOf("iPad")>-1||t.indexOf("iPod")>-1?"iOS":(console.error("Unknown Operating System(UAD_1101)"),"Unknown");Nu({ua:navigator.userAgent});let pr=!0;const Cu=()=>(pr=window.innerHeight<=window.innerWidth,pr);window.addEventListener("resize",Cu);let Du=window.navigator.product;const Mu=t=>t==="Gecko"?"Gecko":t==="WebKit"?"WebKit":t==="Trident"?"Trident":t==="Presto"?"Presto":(console.error("Unknown engine (UAD_1702)"),"Other");Mu(Du);let Lu=window.navigator.appVersion;const Uu=t=>t in navigator?t:(console.error("No app version detected. (UAD_1801)"),"Unknown");Uu(Lu);var xu="firebase",Fu="9.10.0";/**
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
 */K(xu,Fu,"app");const Pi="@firebase/installations",Dn="0.5.12";/**
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
 */const Ni=1e4,Ci=`w:${Dn}`,Di="FIS_v2",$u="https://firebaseinstallations.googleapis.com/v1",Vu=60*60*1e3,Bu="installations",Hu="Installations";/**
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
 */const Wu={["missing-app-config-values"]:'Missing App configuration value: "{$valueName}"',["not-registered"]:"Firebase Installation is not registered.",["installation-not-found"]:"Firebase Installation not found.",["request-failed"]:'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',["app-offline"]:"Could not process request. Application offline.",["delete-pending-registration"]:"Can't delete installation while there is a pending registration request."},Oe=new Ne(Bu,Hu,Wu);function Mi(t){return t instanceof X&&t.code.includes("request-failed")}/**
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
 */function Li({projectId:t}){return`${$u}/projects/${t}/installations`}function Ui(t){return{token:t.token,requestStatus:2,expiresIn:ju(t.expiresIn),creationTime:Date.now()}}async function xi(t,e){const r=(await e.json()).error;return Oe.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Fi({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function Yu(t,{refreshToken:e}){const n=Fi(t);return n.append("Authorization",zu(e)),n}async function $i(t){const e=await t();return e.status>=500&&e.status<600?t():e}function ju(t){return Number(t.replace("s","000"))}function zu(t){return`${Di} ${t}`}/**
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
 */async function Gu({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=Li(t),i=Fi(t),o=e.getImmediate({optional:!0});if(o){const u=await o.getHeartbeatsHeader();u&&i.append("x-firebase-client",u)}const s={fid:n,authVersion:Di,appId:t.appId,sdkVersion:Ci},a={method:"POST",headers:i,body:JSON.stringify(s)},c=await $i(()=>fetch(r,a));if(c.ok){const u=await c.json();return{fid:u.fid||n,registrationStatus:2,refreshToken:u.refreshToken,authToken:Ui(u.authToken)}}else throw await xi("Create Installation",c)}/**
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
 */function Vi(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */function qu(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const Ku=/^[cdef][\w-]{21}$/,pn="";function Ju(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=Xu(t);return Ku.test(n)?n:pn}catch{return pn}}function Xu(t){return qu(t).substr(0,22)}/**
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
 */function Wt(t){return`${t.appName}!${t.appId}`}/**
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
 */const Bi=new Map;function Hi(t,e){const n=Wt(t);Wi(n,e),Qu(n,e)}function Wi(t,e){const n=Bi.get(t);if(!!n)for(const r of n)r(e)}function Qu(t,e){const n=Zu();n&&n.postMessage({key:t,fid:e}),el()}let Ee=null;function Zu(){return!Ee&&"BroadcastChannel"in self&&(Ee=new BroadcastChannel("[Firebase] FID Change"),Ee.onmessage=t=>{Wi(t.data.key,t.data.fid)}),Ee}function el(){Bi.size===0&&Ee&&(Ee.close(),Ee=null)}/**
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
 */const tl="firebase-installations-database",nl=1,Pe="firebase-installations-store";let rn=null;function Mn(){return rn||(rn=Lr(tl,nl,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Pe)}}})),rn}async function Rt(t,e){const n=Wt(t),i=(await Mn()).transaction(Pe,"readwrite"),o=i.objectStore(Pe),s=await o.get(n);return await o.put(e,n),await i.done,(!s||s.fid!==e.fid)&&Hi(t,e.fid),e}async function Yi(t){const e=Wt(t),r=(await Mn()).transaction(Pe,"readwrite");await r.objectStore(Pe).delete(e),await r.done}async function Yt(t,e){const n=Wt(t),i=(await Mn()).transaction(Pe,"readwrite"),o=i.objectStore(Pe),s=await o.get(n),a=e(s);return a===void 0?await o.delete(n):await o.put(a,n),await i.done,a&&(!s||s.fid!==a.fid)&&Hi(t,a.fid),a}/**
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
 */async function Ln(t){let e;const n=await Yt(t.appConfig,r=>{const i=rl(r),o=il(t,i);return e=o.registrationPromise,o.installationEntry});return n.fid===pn?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function rl(t){const e=t||{fid:Ju(),registrationStatus:0};return ji(e)}function il(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(Oe.create("app-offline"));return{installationEntry:e,registrationPromise:i}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=ol(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:sl(t)}:{installationEntry:e}}async function ol(t,e){try{const n=await Gu(t,e);return Rt(t.appConfig,n)}catch(n){throw Mi(n)&&n.customData.serverCode===409?await Yi(t.appConfig):await Rt(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function sl(t){let e=await mr(t.appConfig);for(;e.registrationStatus===1;)await Vi(100),e=await mr(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await Ln(t);return r||n}return e}function mr(t){return Yt(t,e=>{if(!e)throw Oe.create("installation-not-found");return ji(e)})}function ji(t){return al(t)?{fid:t.fid,registrationStatus:0}:t}function al(t){return t.registrationStatus===1&&t.registrationTime+Ni<Date.now()}/**
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
 */async function cl({appConfig:t,heartbeatServiceProvider:e},n){const r=ul(t,n),i=Yu(t,n),o=e.getImmediate({optional:!0});if(o){const u=await o.getHeartbeatsHeader();u&&i.append("x-firebase-client",u)}const s={installation:{sdkVersion:Ci,appId:t.appId}},a={method:"POST",headers:i,body:JSON.stringify(s)},c=await $i(()=>fetch(r,a));if(c.ok){const u=await c.json();return Ui(u)}else throw await xi("Generate Auth Token",c)}function ul(t,{fid:e}){return`${Li(t)}/${e}/authTokens:generate`}/**
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
 */async function Un(t,e=!1){let n;const r=await Yt(t.appConfig,o=>{if(!zi(o))throw Oe.create("not-registered");const s=o.authToken;if(!e&&hl(s))return o;if(s.requestStatus===1)return n=ll(t,e),o;{if(!navigator.onLine)throw Oe.create("app-offline");const a=pl(o);return n=dl(t,a),a}});return n?await n:r.authToken}async function ll(t,e){let n=await gr(t.appConfig);for(;n.authToken.requestStatus===1;)await Vi(100),n=await gr(t.appConfig);const r=n.authToken;return r.requestStatus===0?Un(t,e):r}function gr(t){return Yt(t,e=>{if(!zi(e))throw Oe.create("not-registered");const n=e.authToken;return ml(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function dl(t,e){try{const n=await cl(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await Rt(t.appConfig,r),n}catch(n){if(Mi(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Yi(t.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await Rt(t.appConfig,r)}throw n}}function zi(t){return t!==void 0&&t.registrationStatus===2}function hl(t){return t.requestStatus===2&&!fl(t)}function fl(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+Vu}function pl(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function ml(t){return t.requestStatus===1&&t.requestTime+Ni<Date.now()}/**
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
 */async function gl(t){const e=t,{installationEntry:n,registrationPromise:r}=await Ln(e);return r?r.catch(console.error):Un(e).catch(console.error),n.fid}/**
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
 */async function yl(t,e=!1){const n=t;return await Il(n),(await Un(n,e)).token}async function Il(t){const{registrationPromise:e}=await Ln(t);e&&await e}/**
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
 */function vl(t){if(!t||!t.options)throw on("App Configuration");if(!t.name)throw on("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw on(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function on(t){return Oe.create("missing-app-config-values",{valueName:t})}/**
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
 */const Gi="installations",_l="installations-internal",wl=t=>{const e=t.getProvider("app").getImmediate(),n=vl(e),r=Ye(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},bl=t=>{const e=t.getProvider("app").getImmediate(),n=Ye(e,Gi).getImmediate();return{getId:()=>gl(n),getToken:i=>yl(n,i)}};function El(){se(new J(Gi,wl,"PUBLIC")),se(new J(_l,bl,"PRIVATE"))}El();K(Pi,Dn);K(Pi,Dn,"esm2017");/**
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
 */const Ot="analytics",Tl="firebase_id",kl="origin",Al=60*1e3,Sl="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",qi="https://www.googletagmanager.com/gtag/js";/**
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
 */const $=new gn("@firebase/analytics");/**
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
 */function Ki(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function Rl(t,e){const n=document.createElement("script");n.src=`${qi}?l=${t}&id=${e}`,n.async=!0,document.head.appendChild(n)}function Ol(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function Pl(t,e,n,r,i,o){const s=r[i];try{if(s)await e[s];else{const c=(await Ki(n)).find(u=>u.measurementId===i);c&&await e[c.appId]}}catch(a){$.error(a)}t("config",i,o)}async function Nl(t,e,n,r,i){try{let o=[];if(i&&i.send_to){let s=i.send_to;Array.isArray(s)||(s=[s]);const a=await Ki(n);for(const c of s){const u=a.find(h=>h.measurementId===c),l=u&&e[u.appId];if(l)o.push(l);else{o=[];break}}}o.length===0&&(o=Object.values(e)),await Promise.all(o),t("event",r,i||{})}catch(o){$.error(o)}}function Cl(t,e,n,r){async function i(o,s,a){try{o==="event"?await Nl(t,e,n,s,a):o==="config"?await Pl(t,e,n,r,s,a):o==="consent"?t("consent","update",a):t("set",s)}catch(c){$.error(c)}}return i}function Dl(t,e,n,r,i){let o=function(...s){window[r].push(arguments)};return window[i]&&typeof window[i]=="function"&&(o=window[i]),window[i]=Cl(o,t,e,n),{gtagCore:o,wrappedGtag:window[i]}}function Ml(){const t=window.document.getElementsByTagName("script");for(const e of Object.values(t))if(e.src&&e.src.includes(qi))return e;return null}/**
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
 */const Ll={["already-exists"]:"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.",["already-initialized"]:"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.",["already-initialized-settings"]:"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.",["interop-component-reg-failed"]:"Firebase Analytics Interop Component failed to instantiate: {$reason}",["invalid-analytics-context"]:"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",["indexeddb-unavailable"]:"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",["fetch-throttle"]:"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.",["config-fetch-failed"]:"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}",["no-api-key"]:'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',["no-app-id"]:'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.'},H=new Ne("analytics","Analytics",Ll);/**
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
 */const Ul=30,xl=1e3;class Fl{constructor(e={},n=xl){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Ji=new Fl;function $l(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function Vl(t){var e;const{appId:n,apiKey:r}=t,i={method:"GET",headers:$l(r)},o=Sl.replace("{app-id}",n),s=await fetch(o,i);if(s.status!==200&&s.status!==304){let a="";try{const c=await s.json();!((e=c.error)===null||e===void 0)&&e.message&&(a=c.error.message)}catch{}throw H.create("config-fetch-failed",{httpStatus:s.status,responseMessage:a})}return s.json()}async function Bl(t,e=Ji,n){const{appId:r,apiKey:i,measurementId:o}=t.options;if(!r)throw H.create("no-app-id");if(!i){if(o)return{measurementId:o,appId:r};throw H.create("no-api-key")}const s=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new Yl;return setTimeout(async()=>{a.abort()},n!==void 0?n:Al),Xi({appId:r,apiKey:i,measurementId:o},s,a,e)}async function Xi(t,{throttleEndTimeMillis:e,backoffCount:n},r,i=Ji){var o,s;const{appId:a,measurementId:c}=t;try{await Hl(r,e)}catch(u){if(c)return $.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${(o=u)===null||o===void 0?void 0:o.message}]`),{appId:a,measurementId:c};throw u}try{const u=await Vl(t);return i.deleteThrottleMetadata(a),u}catch(u){const l=u;if(!Wl(l)){if(i.deleteThrottleMetadata(a),c)return $.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${l==null?void 0:l.message}]`),{appId:a,measurementId:c};throw u}const h=Number((s=l==null?void 0:l.customData)===null||s===void 0?void 0:s.httpStatus)===503?Hn(n,i.intervalMillis,Ul):Hn(n,i.intervalMillis),f={throttleEndTimeMillis:Date.now()+h,backoffCount:n+1};return i.setThrottleMetadata(a,f),$.debug(`Calling attemptFetch again in ${h} millis`),Xi(t,f,r,i)}}function Hl(t,e){return new Promise((n,r)=>{const i=Math.max(e-Date.now(),0),o=setTimeout(n,i);t.addEventListener(()=>{clearTimeout(o),r(H.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function Wl(t){if(!(t instanceof X)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class Yl{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function jl(t,e,n,r,i){if(i&&i.global){t("event",n,r);return}else{const o=await e,s=Object.assign(Object.assign({},r),{send_to:o});t("event",n,s)}}/**
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
 */async function zl(){var t;if(Nr())try{await Cr()}catch(e){return $.warn(H.create("indexeddb-unavailable",{errorInfo:(t=e)===null||t===void 0?void 0:t.toString()}).message),!1}else return $.warn(H.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function Gl(t,e,n,r,i,o,s){var a;const c=Bl(t);c.then(p=>{n[p.measurementId]=p.appId,t.options.measurementId&&p.measurementId!==t.options.measurementId&&$.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${p.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(p=>$.error(p)),e.push(c);const u=zl().then(p=>{if(p)return r.getId()}),[l,h]=await Promise.all([c,u]);Ml()||Rl(o,l.measurementId),i("js",new Date);const f=(a=s==null?void 0:s.config)!==null&&a!==void 0?a:{};return f[kl]="firebase",f.update=!0,h!=null&&(f[Tl]=h),i("config",l.measurementId,f),l.measurementId}/**
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
 */class ql{constructor(e){this.app=e}_delete(){return delete Ze[this.app.options.appId],Promise.resolve()}}let Ze={},yr=[];const Ir={};let sn="dataLayer",Kl="gtag",vr,Qi,_r=!1;function Jl(){const t=[];if(Pr()&&t.push("This is a browser extension environment."),wo()||t.push("Cookies are not available."),t.length>0){const e=t.map((r,i)=>`(${i+1}) ${r}`).join(" "),n=H.create("invalid-analytics-context",{errorInfo:e});$.warn(n.message)}}function Xl(t,e,n){Jl();const r=t.options.appId;if(!r)throw H.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)$.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw H.create("no-api-key");if(Ze[r]!=null)throw H.create("already-exists",{id:r});if(!_r){Ol(sn);const{wrappedGtag:o,gtagCore:s}=Dl(Ze,yr,Ir,sn,Kl);Qi=o,vr=s,_r=!0}return Ze[r]=Gl(t,yr,Ir,e,vr,sn,n),new ql(t)}function Zi(t=Fr()){t=m(t);const e=Ye(t,Ot);return e.isInitialized()?e.getImmediate():Ql(t)}function Ql(t,e={}){const n=Ye(t,Ot);if(n.isInitialized()){const i=n.getImmediate();if(et(e,n.getOptions()))return i;throw H.create("already-initialized")}return n.initialize({options:e})}function Zl(t,e,n,r){t=m(t),jl(Qi,Ze[t.app.options.appId],e,n,r).catch(i=>$.error(i))}const wr="@firebase/analytics",br="0.8.0";function ed(){se(new J(Ot,(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("installations-internal").getImmediate();return Xl(r,i,n)},"PUBLIC")),se(new J("analytics-internal",t,"PRIVATE")),K(wr,br),K(wr,br,"esm2017");function t(e){try{const n=e.getProvider(Ot).getImmediate();return{logEvent:(r,i,o)=>Zl(n,r,i,o)}}catch(n){throw H.create("interop-component-reg-failed",{reason:n})}}}ed();const td="./assets/google.68a893bf.svg";function nd(t){let e,n,r,i,o,s,a,c,u;return{c(){e=w("button"),n=w("p"),n.textContent="Sign In with",r=S(),i=w("br"),o=S(),s=w("img"),mn(s.src,a=td)||y(s,"src",a),y(s,"alt","Google"),y(e,"class","flex justify-between content-center bg-white hover:bg-gray-200 text-black p-4 rounded-lg")},m(l,h){T(l,e,h),g(e,n),g(e,r),g(e,i),g(e,o),g(e,s),c||(u=Ue(e,"click",t[0]),c=!0)},p:oe,d(l){l&&k(e),c=!1,u()}}}function rd(t){let e,n,r,i;return{c(){e=w("button"),n=w("p"),n.textContent=`Sign Out ${t[2].displayName}`,y(e,"class","flex justify-between content-center bg-white hover:bg-gray-200 text-black p-4 rounded-lg")},m(o,s){T(o,e,s),g(e,n),r||(i=Ue(e,"click",t[1]),r=!0)},p:oe,d(o){o&&k(e),r=!1,i()}}}function id(t){let e;function n(o,s){if(o[2]!==null)return rd;if(o[2]==null)return nd}let r=n(t),i=r&&r(t);return{c(){i&&i.c(),e=Nt()},m(o,s){i&&i.m(o,s),T(o,e,s)},p(o,[s]){i&&i.p(o,s)},i:oe,o:oe,d(o){i&&i.d(o),o&&k(e)}}}function od(t,e,n){const i=xr({apiKey:"AIzaSyBXQIdxhaZk2jEh7Kgkui4OG0WUsIHyWgk",authDomain:"demotivator-3cf4d.firebaseapp.com",projectId:"demotivator-3cf4d",storageBucket:"demotivator-3cf4d.appspot.com",messagingSenderId:"230067629772",appId:"1:230067629772:web:682830de35cc6b7be91c69",measurementId:"G-T182ZXMZM1"});Zi(i);let{loggedIn:o=!1}=e;const s=St(),a=async()=>{const{signInWithPopup:l,GoogleAuthProvider:h}=await Xe(()=>import("./index.esm.d876ceff.js"),["assets/index.esm.d876ceff.js","assets/spinhog.a9552524.js","assets/spinhog.b3dd2cd2.css"]),f=St(),p=new h;l(f,p).then(v=>{h.credentialFromResult(v).accessToken,v.user}).catch(v=>{v.code,v.message,v.customData.email,h.credentialFromError(v)})},c=s.currentUser;c!==null&&(c.displayName,c.email,c.photoURL,c.emailVerified,c.uid);const u=async l=>{const{signOut:h}=await Xe(()=>import("./index.esm.d876ceff.js"),["assets/index.esm.d876ceff.js","assets/spinhog.a9552524.js","assets/spinhog.b3dd2cd2.css"]);h(l).then(()=>{n(3,o=!1)}).catch(f=>{alert(`An Error Occured. Here is the error: ${f}`)})};return t.$$set=l=>{"loggedIn"in l&&n(3,o=l.loggedIn)},[a,u,c,o]}class sd extends at{constructor(e){super(),ct(this,e,od,id,ut,{loggedIn:3,loginFunction:0,logoutFunction:1})}get loginFunction(){return this.$$.ctx[0]}get logoutFunction(){return this.$$.ctx[1]}}function ad(t){let e;return{c(){e=w("div"),e.innerHTML='<div class="pb-24"></div>',y(e,"class","pb-96")},m(n,r){T(n,e,r)},d(n){n&&k(e)}}}function cd(t){let e,n,r,i,o,s,a,c,u,l,h,f,p,v,E,x;return E=new sd({}),{c(){e=w("footer"),n=w("div"),r=w("div"),i=w("a"),o=w("img"),a=S(),c=w("div"),u=w("p"),u.textContent="a PorkyProductions product",l=S(),h=w("a"),h.textContent="(de)Motivator 1.0",f=S(),p=w("a"),p.textContent="(de)Motivator.js",v=S(),xe(E.$$.fragment),mn(o.src,s=ao)||y(o,"src",s),y(o,"alt","hedgehog"),y(o,"class","text-center m-auto hover:bg-indigo-400 dark:hover:bg-orange-700 hover:rounded-xl svelte-phjqkc"),y(i,"href","https://porkyproductions.github.io"),y(i,"class","hover:bg-indigo-400 dark:hover:bg-orange-700 hover:rounded-xl"),y(u,"class","text-white "),y(h,"class","text-white hover:bg-indigo-400 dark:hover:bg-orange-700 hover:rounded-xl"),y(h,"href","dmv1.html"),y(p,"class","text-white hover:bg-indigo-400 dark:hover:bg-orange-700 hover:rounded-xl"),y(p,"href","http://github.com/PorkyProductions/deMotivator.js"),y(c,"class","flex justify-between content-center px-4"),y(n,"class","font-semibold text-2xl"),y(e,"class","bg-primary-majorelleBlue dark:bg-secondary-orangePantone rounded-t-xl portrait:hidden")},m(N,z){T(N,e,z),g(e,n),g(n,r),g(r,i),g(i,o),g(n,a),g(n,c),g(c,u),g(c,l),g(c,h),g(c,f),g(c,p),g(c,v),Fe(E,c,null),x=!0},p:oe,i(N){x||(B(E.$$.fragment,N),x=!0)},o(N){j(E.$$.fragment,N),x=!1},d(N){N&&k(e),$e(E)}}}function ud(t){let e,n,r,i=nn==="mobile"&&ad(),o=nn==="desktop"&&cd();return{c(){i&&i.c(),e=S(),o&&o.c(),n=Nt()},m(s,a){i&&i.m(s,a),T(s,e,a),o&&o.m(s,a),T(s,n,a),r=!0},p(s,[a]){nn==="desktop"&&o.p(s,a)},i(s){r||(B(o),r=!0)},o(s){j(o),r=!1},d(s){i&&i.d(s),s&&k(e),o&&o.d(s),s&&k(n)}}}class ld extends at{constructor(e){super(),ct(this,e,null,ud,ut,{})}}function Er(t){let e,n;return e=new co({}),{c(){xe(e.$$.fragment)},m(r,i){Fe(e,r,i),n=!0},i(r){n||(B(e.$$.fragment,r),n=!0)},o(r){j(e.$$.fragment,r),n=!1},d(r){$e(e,r)}}}function dd(t){let e,n,r=!t[0]&&Er();return{c(){r&&r.c(),e=Nt()},m(i,o){r&&r.m(i,o),T(i,e,o),n=!0},p(i,[o]){i[0]?r&&(Tr(),j(r,1,1,()=>{r=null}),kr()):r?o&1&&B(r,1):(r=Er(),r.c(),B(r,1),r.m(e.parentNode,e))},i(i){n||(B(r),n=!0)},o(i){j(r),n=!1},d(i){r&&r.d(i),i&&k(e)}}}function hd(t,e,n){let r=!1;const i=setTimeout(()=>n(0,r=!0),1e3);return Ar(()=>clearTimeout(i)),[r]}class fd extends at{constructor(e){super(),ct(this,e,hd,dd,ut,{})}}/*! Capacitor: https://capacitorjs.com/ - MIT License */const pd=t=>{const e=new Map;e.set("web",{name:"web"});const n=t.CapacitorPlatforms||{currentPlatform:{name:"web"},platforms:e},r=(o,s)=>{n.platforms.set(o,s)},i=o=>{n.platforms.has(o)&&(n.currentPlatform=n.platforms.get(o))};return n.addPlatform=r,n.setPlatform=i,n},md=t=>t.CapacitorPlatforms=pd(t),eo=md(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});eo.addPlatform;eo.setPlatform;var Pt;(function(t){t.Unimplemented="UNIMPLEMENTED",t.Unavailable="UNAVAILABLE"})(Pt||(Pt={}));class an extends Error{constructor(e,n,r){super(e),this.message=e,this.code=n,this.data=r}}const gd=t=>{var e,n;return t!=null&&t.androidBridge?"android":!((n=(e=t==null?void 0:t.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||n===void 0)&&n.bridge?"ios":"web"},yd=t=>{var e,n,r,i,o;const s=t.CapacitorCustomPlatform||null,a=t.Capacitor||{},c=a.Plugins=a.Plugins||{},u=t.CapacitorPlatforms,l=()=>s!==null?s.name:gd(t),h=((e=u==null?void 0:u.currentPlatform)===null||e===void 0?void 0:e.getPlatform)||l,f=()=>h()!=="web",p=((n=u==null?void 0:u.currentPlatform)===null||n===void 0?void 0:n.isNativePlatform)||f,v=I=>{const _=Z.get(I);return!!(_!=null&&_.platforms.has(h())||N(I))},E=((r=u==null?void 0:u.currentPlatform)===null||r===void 0?void 0:r.isPluginAvailable)||v,x=I=>{var _;return(_=a.PluginHeaders)===null||_===void 0?void 0:_.find(O=>O.name===I)},N=((i=u==null?void 0:u.currentPlatform)===null||i===void 0?void 0:i.getPluginHeader)||x,z=I=>t.console.error(I),Q=(I,_,O)=>Promise.reject(`${O} does not have an implementation of "${_}".`),Z=new Map,_e=(I,_={})=>{const O=Z.get(I);if(O)return console.warn(`Capacitor plugin "${I}" already registered. Cannot register plugins twice.`),O.proxy;const ee=h(),Me=N(I);let te;const no=async()=>(!te&&ee in _?te=typeof _[ee]=="function"?te=await _[ee]():te=_[ee]:s!==null&&!te&&"web"in _&&(te=typeof _.web=="function"?te=await _.web():te=_.web),te),ro=(C,L)=>{var G,he;if(Me){const fe=Me==null?void 0:Me.methods.find(Y=>L===Y.name);if(fe)return fe.rtype==="promise"?Y=>a.nativePromise(I,L.toString(),Y):(Y,pt)=>a.nativeCallback(I,L.toString(),Y,pt);if(C)return(G=C[L])===null||G===void 0?void 0:G.bind(C)}else{if(C)return(he=C[L])===null||he===void 0?void 0:he.bind(C);throw new an(`"${I}" plugin is not implemented on ${ee}`,Pt.Unimplemented)}},jt=C=>{let L;const G=(...he)=>{const fe=no().then(Y=>{const pt=ro(Y,C);if(pt){const mt=pt(...he);return L=mt==null?void 0:mt.remove,mt}else throw new an(`"${I}.${C}()" is not implemented on ${ee}`,Pt.Unimplemented)});return C==="addListener"&&(fe.remove=async()=>L()),fe};return G.toString=()=>`${C.toString()}() { [capacitor code] }`,Object.defineProperty(G,"name",{value:C,writable:!1,configurable:!1}),G},xn=jt("addListener"),Fn=jt("removeListener"),io=(C,L)=>{const G=xn({eventName:C},L),he=async()=>{const Y=await G;Fn({eventName:C,callbackId:Y},L)},fe=new Promise(Y=>G.then(()=>Y({remove:he})));return fe.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await he()},fe},zt=new Proxy({},{get(C,L){switch(L){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return Me?io:xn;case"removeListener":return Fn;default:return jt(L)}}});return c[I]=zt,Z.set(I,{name:I,proxy:zt,platforms:new Set([...Object.keys(_),...Me?[ee]:[]])}),zt},V=((o=u==null?void 0:u.currentPlatform)===null||o===void 0?void 0:o.registerPlugin)||_e;return a.convertFileSrc||(a.convertFileSrc=I=>I),a.getPlatform=h,a.handleError=z,a.isNativePlatform=p,a.isPluginAvailable=E,a.pluginMethodNoop=Q,a.registerPlugin=V,a.Exception=an,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a.platform=a.getPlatform(),a.isNative=a.isNativePlatform(),a},Id=t=>t.Capacitor=yd(t),to=Id(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});to.registerPlugin;to.Plugins;function vd(t){let e,n,r,i,o,s,a,c,u,l,h;n=new uo({}),i=new yu({}),u=new ld({});let f=t[1]!==null&&wd(t);return{c(){e=w("div"),xe(n.$$.fragment),r=S(),xe(i.$$.fragment),o=S(),s=w("div"),a=S(),c=w("div"),xe(u.$$.fragment),l=S(),f&&f.c(),y(s,"class","sm:p-3 md:p-4 lg:p-5 xl:p-20"),y(c,"id","footer"),y(c,"class",""),y(e,"class","dark:bg-black dark:text-white"),y(e,"id","app")},m(p,v){T(p,e,v),Fe(n,e,null),g(e,r),Fe(i,e,null),g(e,o),g(e,s),g(e,a),g(e,c),Fe(u,c,null),g(c,l),f&&f.m(c,null),h=!0},p(p,v){p[1]!==null&&f.p(p,v)},i(p){h||(B(n.$$.fragment,p),B(i.$$.fragment,p),B(u.$$.fragment,p),h=!0)},o(p){j(n.$$.fragment,p),j(i.$$.fragment,p),j(u.$$.fragment,p),h=!1},d(p){p&&k(e),$e(n),$e(i),$e(u),f&&f.d()}}}function _d(t){let e,n;return e=new fd({}),{c(){xe(e.$$.fragment)},m(r,i){Fe(e,r,i),n=!0},p:oe,i(r){n||(B(e.$$.fragment,r),n=!0)},o(r){j(e.$$.fragment,r),n=!1},d(r){$e(e,r)}}}function wd(t){let e=t[1].displayName+"",n;return{c(){n=Te(e)},m(r,i){T(r,n,i)},p:oe,d(r){r&&k(n)}}}function bd(t){let e,n,r,i;const o=[_d,vd],s=[];function a(c,u){return c[0]?1:0}return e=a(t),n=s[e]=o[e](t),{c(){n.c(),r=Nt()},m(c,u){s[e].m(c,u),T(c,r,u),i=!0},p(c,[u]){let l=e;e=a(c),e===l?s[e].p(c,u):(Tr(),j(s[l],1,1,()=>{s[l]=null}),kr(),n=s[e],n?n.p(c,u):(n=s[e]=o[e](c),n.c()),B(n,1),n.m(r.parentNode,r))},i(c){i||(B(n),i=!0)},o(c){j(n),i=!1},d(c){s[e].d(c),c&&k(r)}}}function Ed(t,e,n){let r=!1;const i=setTimeout(()=>n(0,r=!0),1e3);Ar(()=>clearTimeout(i));const s=xr({apiKey:"AIzaSyBXQIdxhaZk2jEh7Kgkui4OG0WUsIHyWgk",authDomain:"demotivator-3cf4d.firebaseapp.com",projectId:"demotivator-3cf4d",storageBucket:"demotivator-3cf4d.appspot.com",messagingSenderId:"230067629772",appId:"1:230067629772:web:682830de35cc6b7be91c69",measurementId:"G-T182ZXMZM1"});Zi(s);const c=St().currentUser;return c!==null&&(c.displayName,c.email,c.photoURL,c.emailVerified,c.uid),[r,c]}class Td extends at{constructor(e){super(),ct(this,e,Ed,bd,ut,{})}}new Td({target:document.getElementById("app")});export{Fs as $,Pd as A,qd as B,eh as C,Dd as D,ot as E,me as F,ye as G,Ks as H,uh as I,bh as J,Zn as K,rc as L,$s as M,zd as N,ue as O,Ae as P,Ra as Q,dh as R,hn as S,Ie as T,fh as U,Ih as V,wh as W,lh as X,ih as Y,nh as Z,Ld as _,hu as a,Oa as a0,ph as a1,yh as a2,_h as a3,Zs as a4,Kd as a5,$d as a6,jd as a7,th as a8,Ud as a9,Tn as aa,Fd as ab,Yd as ac,Gd as ad,hh as ae,gh as af,vh as ag,ah,xd as ai,sh as aj,Qd as ak,Zd as al,mh as am,Xd as an,oh as ao,Jd as ap,Hd as aq,ht as b,dt as c,Cd as d,Ce as e,Ad as f,St as g,ge as h,xr as i,vt as j,Od as k,He as l,cu as m,Sd as n,Rd as o,Bd as p,rh as q,ja as r,su as s,gi as t,Na as u,Vd as v,Md as w,Wd as x,Nd as y,ch as z};
