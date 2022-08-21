import{S as Ue,i as xe,s as $e,e as I,a as Y,t as xn,b as $n,c as y,d as C,f as b,l as Yt,g as ar,n as K,h as P,j as st,k as ve,m as ur,o as Ie,p as O,q as L,r as _e,u as Bn,v as Fn,w as jn,x as lr,T as cr}from"./spinhog.20daef1e.js";/**
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
 */const Wn=function(t){const e=[];let n=0;for(let o=0;o<t.length;o++){let r=t.charCodeAt(o);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&o+1<t.length&&(t.charCodeAt(o+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++o)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},dr=function(t){const e=[];let n=0,o=0;for(;n<t.length;){const r=t[n++];if(r<128)e[o++]=String.fromCharCode(r);else if(r>191&&r<224){const i=t[n++];e[o++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=t[n++],s=t[n++],a=t[n++],u=((r&7)<<18|(i&63)<<12|(s&63)<<6|a&63)-65536;e[o++]=String.fromCharCode(55296+(u>>10)),e[o++]=String.fromCharCode(56320+(u&1023))}else{const i=t[n++],s=t[n++];e[o++]=String.fromCharCode((r&15)<<12|(i&63)<<6|s&63)}}return e.join("")},Hn={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,o=[];for(let r=0;r<t.length;r+=3){const i=t[r],s=r+1<t.length,a=s?t[r+1]:0,u=r+2<t.length,l=u?t[r+2]:0,c=i>>2,d=(i&3)<<4|a>>4;let h=(a&15)<<2|l>>6,p=l&63;u||(p=64,s||(h=64)),o.push(n[c],n[d],n[h],n[p])}return o.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Wn(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):dr(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,o=[];for(let r=0;r<t.length;){const i=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;const l=r<t.length?n[t.charAt(r)]:64;++r;const d=r<t.length?n[t.charAt(r)]:64;if(++r,i==null||a==null||l==null||d==null)throw Error();const h=i<<2|a>>4;if(o.push(h),l!==64){const p=a<<4&240|l>>2;if(o.push(p),d!==64){const T=l<<6&192|d;o.push(T)}}}return o},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},hr=function(t){const e=Wn(t);return Hn.encodeByteArray(e,!0)},Vn=function(t){return hr(t).replace(/\./g,"")},fr=function(t){try{return Hn.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */class pr{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,o)=>{n?this.reject(n):this.resolve(o),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,o))}}}/**
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
 */function k(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function mr(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(k())}function zn(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function yr(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function gr(){const t=k();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Gn(){return typeof indexedDB=="object"}function qn(){return new Promise((t,e)=>{try{let n=!0;const o="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(o);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(o),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var i;e(((i=r.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}function br(){return!(typeof navigator=="undefined"||!navigator.cookieEnabled)}/**
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
 */const wr="FirebaseError";class ie extends Error{constructor(e,n,o){super(n),this.code=e,this.customData=o,this.name=wr,Object.setPrototypeOf(this,ie.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,pe.prototype.create)}}class pe{constructor(e,n,o){this.service=e,this.serviceName=n,this.errors=o}create(e,...n){const o=n[0]||{},r=`${this.service}/${e}`,i=this.errors[e],s=i?vr(i,o):"Error",a=`${this.serviceName}: ${s} (${r}).`;return new ie(r,a,o)}}function vr(t,e){return t.replace(Ir,(n,o)=>{const r=e[o];return r!=null?String(r):`<${o}?>`})}const Ir=/\{\$([^}]+)}/g;function _r(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function De(t,e){if(t===e)return!0;const n=Object.keys(t),o=Object.keys(e);for(const r of n){if(!o.includes(r))return!1;const i=t[r],s=e[r];if(tn(i)&&tn(s)){if(!De(i,s))return!1}else if(i!==s)return!1}for(const r of o)if(!n.includes(r))return!1;return!0}function tn(t){return t!==null&&typeof t=="object"}/**
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
 */function Be(t){const e=[];for(const[n,o]of Object.entries(t))Array.isArray(o)?o.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(o));return e.length?"&"+e.join("&"):""}function kr(t,e){const n=new Tr(t,e);return n.subscribe.bind(n)}class Tr{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(o=>{this.error(o)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,o){let r;if(e===void 0&&n===void 0&&o===void 0)throw new Error("Missing Observer.");Er(e,["next","error","complete"])?r=e:r={next:e,error:n,complete:o},r.next===void 0&&(r.next=yt),r.error===void 0&&(r.error=yt),r.complete===void 0&&(r.complete=yt);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(o){typeof console!="undefined"&&console.error&&console.error(o)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Er(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function yt(){}/**
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
 */const Sr=1e3,Ar=2,Or=4*60*60*1e3,Rr=.5;function nn(t,e=Sr,n=Ar){const o=e*Math.pow(n,t),r=Math.round(Rr*o*(Math.random()-.5)*2);return Math.min(Or,o+r)}/**
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
 */function me(t){return t&&t._delegate?t._delegate:t}class W{constructor(e,n,o){this.name=e,this.instanceFactory=n,this.type=o,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */class Cr{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const o=new pr;if(this.instancesDeferred.set(n,o),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&o.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const o=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(o)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:o})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Dr(e))try{this.getOrInitializeService({instanceIdentifier:se})}catch{}for(const[n,o]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:r});o.resolve(i)}catch{}}}}clearInstance(e=se){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=se){return this.instances.has(e)}getOptions(e=se){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,o=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(o))throw Error(`${this.name}(${o}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:o,options:n});for(const[i,s]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);o===a&&s.resolve(r)}return r}onInit(e,n){var o;const r=this.normalizeInstanceIdentifier(n),i=(o=this.onInitCallbacks.get(r))!==null&&o!==void 0?o:new Set;i.add(e),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const o=this.onInitCallbacks.get(n);if(!!o)for(const r of o)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let o=this.instances.get(e);if(!o&&this.component&&(o=this.component.instanceFactory(this.container,{instanceIdentifier:Pr(e),options:n}),this.instances.set(e,o),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(o,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,o)}catch{}return o||null}normalizeInstanceIdentifier(e=se){return this.component?this.component.multipleInstances?e:se:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Pr(t){return t===se?void 0:t}function Dr(t){return t.instantiationMode==="EAGER"}/**
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
 */class Nr{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Cr(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var g;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(g||(g={}));const Mr={debug:g.DEBUG,verbose:g.VERBOSE,info:g.INFO,warn:g.WARN,error:g.ERROR,silent:g.SILENT},Yr=g.INFO,Lr={[g.DEBUG]:"log",[g.VERBOSE]:"log",[g.INFO]:"info",[g.WARN]:"warn",[g.ERROR]:"error"},Ur=(t,e,...n)=>{if(e<t.logLevel)return;const o=new Date().toISOString(),r=Lr[e];if(r)console[r](`[${o}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Lt{constructor(e){this.name=e,this._logLevel=Yr,this._logHandler=Ur,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in g))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Mr[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,g.DEBUG,...e),this._logHandler(this,g.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,g.VERBOSE,...e),this._logHandler(this,g.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,g.INFO,...e),this._logHandler(this,g.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,g.WARN,...e),this._logHandler(this,g.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,g.ERROR,...e),this._logHandler(this,g.ERROR,...e)}}const xr=(t,e)=>e.some(n=>t instanceof n);let on,rn;function $r(){return on||(on=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Br(){return rn||(rn=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Kn=new WeakMap,Ot=new WeakMap,Jn=new WeakMap,gt=new WeakMap,Ut=new WeakMap;function Fr(t){const e=new Promise((n,o)=>{const r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",s)},i=()=>{n(re(t.result)),r()},s=()=>{o(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",s)});return e.then(n=>{n instanceof IDBCursor&&Kn.set(n,t)}).catch(()=>{}),Ut.set(e,t),e}function jr(t){if(Ot.has(t))return;const e=new Promise((n,o)=>{const r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",s),t.removeEventListener("abort",s)},i=()=>{n(),r()},s=()=>{o(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",s),t.addEventListener("abort",s)});Ot.set(t,e)}let Rt={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Ot.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Jn.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return re(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Wr(t){Rt=t(Rt)}function Hr(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const o=t.call(bt(this),e,...n);return Jn.set(o,e.sort?e.sort():[e]),re(o)}:Br().includes(t)?function(...e){return t.apply(bt(this),e),re(Kn.get(this))}:function(...e){return re(t.apply(bt(this),e))}}function Vr(t){return typeof t=="function"?Hr(t):(t instanceof IDBTransaction&&jr(t),xr(t,$r())?new Proxy(t,Rt):t)}function re(t){if(t instanceof IDBRequest)return Fr(t);if(gt.has(t))return gt.get(t);const e=Vr(t);return e!==t&&(gt.set(t,e),Ut.set(e,t)),e}const bt=t=>Ut.get(t);function Xn(t,e,{blocked:n,upgrade:o,blocking:r,terminated:i}={}){const s=indexedDB.open(t,e),a=re(s);return o&&s.addEventListener("upgradeneeded",u=>{o(re(s.result),u.oldVersion,u.newVersion,re(s.transaction))}),n&&s.addEventListener("blocked",()=>n()),a.then(u=>{i&&u.addEventListener("close",()=>i()),r&&u.addEventListener("versionchange",()=>r())}).catch(()=>{}),a}const zr=["get","getKey","getAll","getAllKeys","count"],Gr=["put","add","delete","clear"],wt=new Map;function sn(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(wt.get(e))return wt.get(e);const n=e.replace(/FromIndex$/,""),o=e!==n,r=Gr.includes(n);if(!(n in(o?IDBIndex:IDBObjectStore).prototype)||!(r||zr.includes(n)))return;const i=async function(s,...a){const u=this.transaction(s,r?"readwrite":"readonly");let l=u.store;return o&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),r&&u.done]))[0]};return wt.set(e,i),i}Wr(t=>({...t,get:(e,n,o)=>sn(e,n)||t.get(e,n,o),has:(e,n)=>!!sn(e,n)||t.has(e,n)}));/**
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
 */class qr{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Kr(n)){const o=n.getImmediate();return`${o.library}/${o.version}`}else return null}).filter(n=>n).join(" ")}}function Kr(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ct="@firebase/app",an="0.7.28";/**
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
 */const xt=new Lt("@firebase/app"),Jr="@firebase/app-compat",Xr="@firebase/analytics-compat",Qr="@firebase/analytics",Zr="@firebase/app-check-compat",ei="@firebase/app-check",ti="@firebase/auth",ni="@firebase/auth-compat",oi="@firebase/database",ri="@firebase/database-compat",ii="@firebase/functions",si="@firebase/functions-compat",ai="@firebase/installations",ui="@firebase/installations-compat",li="@firebase/messaging",ci="@firebase/messaging-compat",di="@firebase/performance",hi="@firebase/performance-compat",fi="@firebase/remote-config",pi="@firebase/remote-config-compat",mi="@firebase/storage",yi="@firebase/storage-compat",gi="@firebase/firestore",bi="@firebase/firestore-compat",wi="firebase",vi="9.9.0";/**
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
 */const Qn="[DEFAULT]",Ii={[Ct]:"fire-core",[Jr]:"fire-core-compat",[Qr]:"fire-analytics",[Xr]:"fire-analytics-compat",[ei]:"fire-app-check",[Zr]:"fire-app-check-compat",[ti]:"fire-auth",[ni]:"fire-auth-compat",[oi]:"fire-rtdb",[ri]:"fire-rtdb-compat",[ii]:"fire-fn",[si]:"fire-fn-compat",[ai]:"fire-iid",[ui]:"fire-iid-compat",[li]:"fire-fcm",[ci]:"fire-fcm-compat",[di]:"fire-perf",[hi]:"fire-perf-compat",[fi]:"fire-rc",[pi]:"fire-rc-compat",[mi]:"fire-gcs",[yi]:"fire-gcs-compat",[gi]:"fire-fst",[bi]:"fire-fst-compat","fire-js":"fire-js",[wi]:"fire-js-all"};/**
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
 */const Qe=new Map,Pt=new Map;function _i(t,e){try{t.container.addComponent(e)}catch(n){xt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function J(t){const e=t.name;if(Pt.has(e))return xt.debug(`There were multiple attempts to register component ${e}.`),!1;Pt.set(e,t);for(const n of Qe.values())_i(n,t);return!0}function Se(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
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
 */const ki={["no-app"]:"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["storage-open"]:"Error thrown when opening storage. Original error: {$originalErrorMessage}.",["storage-get"]:"Error thrown when reading from storage. Original error: {$originalErrorMessage}.",["storage-set"]:"Error thrown when writing to storage. Original error: {$originalErrorMessage}.",["storage-delete"]:"Error thrown when deleting from storage. Original error: {$originalErrorMessage}."},ce=new pe("app","Firebase",ki);/**
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
 */class Ti{constructor(e,n,o){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=o,this.container.addComponent(new W("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ce.create("app-deleted",{appName:this._name})}}/**
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
 */const at=vi;function $t(t,e={}){typeof e!="object"&&(e={name:e});const n=Object.assign({name:Qn,automaticDataCollectionEnabled:!1},e),o=n.name;if(typeof o!="string"||!o)throw ce.create("bad-app-name",{appName:String(o)});const r=Qe.get(o);if(r){if(De(t,r.options)&&De(n,r.config))return r;throw ce.create("duplicate-app",{appName:o})}const i=new Nr(o);for(const a of Pt.values())i.addComponent(a);const s=new Ti(t,n,i);return Qe.set(o,s),s}function Zn(t=Qn){const e=Qe.get(t);if(!e)throw ce.create("no-app",{appName:t});return e}function B(t,e,n){var o;let r=(o=Ii[t])!==null&&o!==void 0?o:t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),s=e.match(/\s|\//);if(i||s){const a=[`Unable to register library "${r}" with version "${e}":`];i&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&a.push("and"),s&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),xt.warn(a.join(" "));return}J(new W(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const Ei="firebase-heartbeat-database",Si=1,Ne="firebase-heartbeat-store";let vt=null;function eo(){return vt||(vt=Xn(Ei,Si,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Ne)}}}).catch(t=>{throw ce.create("storage-open",{originalErrorMessage:t.message})})),vt}async function Ai(t){var e;try{return(await eo()).transaction(Ne).objectStore(Ne).get(to(t))}catch(n){throw ce.create("storage-get",{originalErrorMessage:(e=n)===null||e===void 0?void 0:e.message})}}async function un(t,e){var n;try{const r=(await eo()).transaction(Ne,"readwrite");return await r.objectStore(Ne).put(e,to(t)),r.done}catch(o){throw ce.create("storage-set",{originalErrorMessage:(n=o)===null||n===void 0?void 0:n.message})}}function to(t){return`${t.name}!${t.options.appId}`}/**
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
 */const Oi=1024,Ri=30*24*60*60*1e3;class Ci{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Di(n),this._heartbeatsCachePromise=this._storage.read().then(o=>(this._heartbeatsCache=o,o))}async triggerHeartbeat(){const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=ln();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(r=>r.date===o)))return this._heartbeatsCache.heartbeats.push({date:o,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(r=>{const i=new Date(r.date).valueOf();return Date.now()-i<=Ri}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=ln(),{heartbeatsToSend:n,unsentEntries:o}=Pi(this._heartbeatsCache.heartbeats),r=Vn(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,o.length>0?(this._heartbeatsCache.heartbeats=o,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}}function ln(){return new Date().toISOString().substring(0,10)}function Pi(t,e=Oi){const n=[];let o=t.slice();for(const r of t){const i=n.find(s=>s.agent===r.agent);if(i){if(i.dates.push(r.date),cn(n)>e){i.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),cn(n)>e){n.pop();break}o=o.slice(1)}return{heartbeatsToSend:n,unsentEntries:o}}class Di{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Gn()?qn().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await Ai(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return un(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return un(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function cn(t){return Vn(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function Ni(t){J(new W("platform-logger",e=>new qr(e),"PRIVATE")),J(new W("heartbeat",e=>new Ci(e),"PRIVATE")),B(Ct,an,t),B(Ct,an,"esm2017"),B("fire-js","")}Ni("");var Mi="firebase",Yi="9.9.0";/**
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
 */B(Mi,Yi,"app");function Bt(t,e){var n={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.indexOf(o)<0&&(n[o]=t[o]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,o=Object.getOwnPropertySymbols(t);r<o.length;r++)e.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(t,o[r])&&(n[o[r]]=t[o[r]]);return n}function no(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Li=no,oo=new pe("auth","Firebase",no());/**
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
 */const dn=new Lt("@firebase/auth");function qe(t,...e){dn.logLevel<=g.ERROR&&dn.error(`Auth (${at}): ${t}`,...e)}/**
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
 */function H(t,...e){throw Ft(t,...e)}function F(t,...e){return Ft(t,...e)}function ro(t,e,n){const o=Object.assign(Object.assign({},Li()),{[e]:n});return new pe("auth","Firebase",o).create(e,{appName:t.name})}function Ui(t,e,n){const o=n;if(!(e instanceof o))throw o.name!==e.constructor.name&&H(t,"argument-error"),ro(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Ft(t,...e){if(typeof t!="string"){const n=e[0],o=[...e.slice(1)];return o[0]&&(o[0].appName=t.name),t._errorFactory.create(n,...o)}return oo.create(t,...e)}function f(t,e,...n){if(!t)throw Ft(e,...n)}function G(t){const e="INTERNAL ASSERTION FAILED: "+t;throw qe(e),new Error(e)}function X(t,e){t||G(e)}/**
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
 */const hn=new Map;function q(t){X(t instanceof Function,"Expected a class definition");let e=hn.get(t);return e?(X(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,hn.set(t,e),e)}/**
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
 */function xi(t,e){const n=Se(t,"auth");if(n.isInitialized()){const r=n.getImmediate(),i=n.getOptions();if(De(i,e!=null?e:{}))return r;H(r,"already-initialized")}return n.initialize({options:e})}function $i(t,e){const n=(e==null?void 0:e.persistence)||[],o=(Array.isArray(n)?n:[n]).map(q);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(o,e==null?void 0:e.popupRedirectResolver)}/**
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
 */function Dt(){var t;return typeof self!="undefined"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function Bi(){return fn()==="http:"||fn()==="https:"}function fn(){var t;return typeof self!="undefined"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function Fi(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Bi()||zn()||"connection"in navigator)?navigator.onLine:!0}function ji(){if(typeof navigator=="undefined")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class Fe{constructor(e,n){this.shortDelay=e,this.longDelay=n,X(n>e,"Short delay should be less than long delay!"),this.isMobile=mr()||yr()}get(){return Fi()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */class io{static initialize(e,n,o){this.fetchImpl=e,n&&(this.headersImpl=n),o&&(this.responseImpl=o)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;G("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;G("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;G("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Wi={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error"};/**
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
 */const Hi=new Fe(3e4,6e4);function Vi(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function ut(t,e,n,o,r={}){return so(t,r,async()=>{let i={},s={};o&&(e==="GET"?s=o:i={body:JSON.stringify(o)});const a=Be(Object.assign({key:t.config.apiKey},s)).slice(1),u=await t._getAdditionalHeaders();return u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode),io.fetch()(ao(t,t.config.apiHost,n,a),Object.assign({method:e,headers:u,referrerPolicy:"no-referrer"},i))})}async function so(t,e,n){t._canInitEmulator=!1;const o=Object.assign(Object.assign({},Wi),e);try{const r=new Gi(t),i=await Promise.race([n(),r.promise]);r.clearNetworkTimeout();const s=await i.json();if("needConfirmation"in s)throw Ge(t,"account-exists-with-different-credential",s);if(i.ok&&!("errorMessage"in s))return s;{const a=i.ok?s.errorMessage:s.error.message,[u,l]=a.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ge(t,"credential-already-in-use",s);if(u==="EMAIL_EXISTS")throw Ge(t,"email-already-in-use",s);if(u==="USER_DISABLED")throw Ge(t,"user-disabled",s);const c=o[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw ro(t,c,l);H(t,c)}}catch(r){if(r instanceof ie)throw r;H(t,"network-request-failed")}}async function zi(t,e,n,o,r={}){const i=await ut(t,e,n,o,r);return"mfaPendingCredential"in i&&H(t,"multi-factor-auth-required",{_serverResponse:i}),i}function ao(t,e,n,o){const r=`${e}${n}?${o}`;return t.config.emulator?jt(t.config,r):`${t.config.apiScheme}://${r}`}class Gi{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,o)=>{this.timer=setTimeout(()=>o(F(this.auth,"network-request-failed")),Hi.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Ge(t,e,n){const o={appName:t.name};n.email&&(o.email=n.email),n.phoneNumber&&(o.phoneNumber=n.phoneNumber);const r=F(t,e,o);return r.customData._tokenResponse=n,r}/**
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
 */async function qi(t,e){return ut(t,"POST","/v1/accounts:delete",e)}async function Ki(t,e){return ut(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function Ce(t){if(!!t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Ji(t,e=!1){const n=me(t),o=await n.getIdToken(e),r=Wt(o);f(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,s=i==null?void 0:i.sign_in_provider;return{claims:r,token:o,authTime:Ce(It(r.auth_time)),issuedAtTime:Ce(It(r.iat)),expirationTime:Ce(It(r.exp)),signInProvider:s||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function It(t){return Number(t)*1e3}function Wt(t){var e;const[n,o,r]=t.split(".");if(n===void 0||o===void 0||r===void 0)return qe("JWT malformed, contained fewer than 3 sections"),null;try{const i=fr(o);return i?JSON.parse(i):(qe("Failed to decode base64 JWT payload"),null)}catch(i){return qe("Caught error parsing JWT payload as JSON",(e=i)===null||e===void 0?void 0:e.toString()),null}}function Xi(t){const e=Wt(t);return f(e,"internal-error"),f(typeof e.exp!="undefined","internal-error"),f(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Me(t,e,n=!1){if(n)return e;try{return await e}catch(o){throw o instanceof ie&&Qi(o)&&t.auth.currentUser===t&&await t.auth.signOut(),o}}function Qi({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class Zi{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){!this.isRunning||(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const o=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),o}else{this.errorBackoff=3e4;const r=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){var e;try{await this.user.getIdToken(!0)}catch(n){((e=n)===null||e===void 0?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class uo{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ce(this.lastLoginAt),this.creationTime=Ce(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Ze(t){var e;const n=t.auth,o=await t.getIdToken(),r=await Me(t,Ki(n,{idToken:o}));f(r==null?void 0:r.users.length,n,"internal-error");const i=r.users[0];t._notifyReloadListener(i);const s=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?ns(i.providerUserInfo):[],a=ts(t.providerData,s),u=t.isAnonymous,l=!(t.email&&i.passwordHash)&&!(a!=null&&a.length),c=u?l:!1,d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new uo(i.createdAt,i.lastLoginAt),isAnonymous:c};Object.assign(t,d)}async function es(t){const e=me(t);await Ze(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function ts(t,e){return[...t.filter(o=>!e.some(r=>r.providerId===o.providerId)),...e]}function ns(t){return t.map(e=>{var{providerId:n}=e,o=Bt(e,["providerId"]);return{providerId:n,uid:o.rawId||"",displayName:o.displayName||null,email:o.email||null,phoneNumber:o.phoneNumber||null,photoURL:o.photoUrl||null}})}/**
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
 */async function os(t,e){const n=await so(t,{},async()=>{const o=Be({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=t.config,s=ao(t,r,"/v1/token",`key=${i}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",io.fetch()(s,{method:"POST",headers:a,body:o})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
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
 */class Ye{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){f(e.idToken,"internal-error"),f(typeof e.idToken!="undefined","internal-error"),f(typeof e.refreshToken!="undefined","internal-error");const n="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):Xi(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return f(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:o,refreshToken:r,expiresIn:i}=await os(e,n);this.updateTokensAndExpiration(o,r,Number(i))}updateTokensAndExpiration(e,n,o){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+o*1e3}static fromJSON(e,n){const{refreshToken:o,accessToken:r,expirationTime:i}=n,s=new Ye;return o&&(f(typeof o=="string","internal-error",{appName:e}),s.refreshToken=o),r&&(f(typeof r=="string","internal-error",{appName:e}),s.accessToken=r),i&&(f(typeof i=="number","internal-error",{appName:e}),s.expirationTime=i),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ye,this.toJSON())}_performRefresh(){return G("not implemented")}}/**
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
 */function ee(t,e){f(typeof t=="string"||typeof t=="undefined","internal-error",{appName:e})}class le{constructor(e){var{uid:n,auth:o,stsTokenManager:r}=e,i=Bt(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Zi(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=o,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new uo(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await Me(this,this.stsTokenManager.getToken(this.auth,e));return f(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Ji(this,e)}reload(){return es(this)}_assign(e){this!==e&&(f(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){return new le(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(e){f(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let o=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),o=!0),n&&await Ze(this),await this.auth._persistUserIfCurrent(this),o&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await Me(this,qi(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var o,r,i,s,a,u,l,c;const d=(o=n.displayName)!==null&&o!==void 0?o:void 0,h=(r=n.email)!==null&&r!==void 0?r:void 0,p=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,T=(s=n.photoURL)!==null&&s!==void 0?s:void 0,D=(a=n.tenantId)!==null&&a!==void 0?a:void 0,U=(u=n._redirectEventId)!==null&&u!==void 0?u:void 0,S=(l=n.createdAt)!==null&&l!==void 0?l:void 0,ye=(c=n.lastLoginAt)!==null&&c!==void 0?c:void 0,{uid:Ae,emailVerified:ge,isAnonymous:He,providerData:Oe,stsTokenManager:w}=n;f(Ae&&w,e,"internal-error");const v=Ye.fromJSON(this.name,w);f(typeof Ae=="string",e,"internal-error"),ee(d,e.name),ee(h,e.name),f(typeof ge=="boolean",e,"internal-error"),f(typeof He=="boolean",e,"internal-error"),ee(p,e.name),ee(T,e.name),ee(D,e.name),ee(U,e.name),ee(S,e.name),ee(ye,e.name);const x=new le({uid:Ae,auth:e,email:h,emailVerified:ge,displayName:d,isAnonymous:He,photoURL:T,phoneNumber:p,tenantId:D,stsTokenManager:v,createdAt:S,lastLoginAt:ye});return Oe&&Array.isArray(Oe)&&(x.providerData=Oe.map(V=>Object.assign({},V))),U&&(x._redirectEventId=U),x}static async _fromIdTokenResponse(e,n,o=!1){const r=new Ye;r.updateFromServerResponse(n);const i=new le({uid:n.localId,auth:e,stsTokenManager:r,isAnonymous:o});return await Ze(i),i}}/**
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
 */class lo{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}lo.type="NONE";const pn=lo;/**
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
 */function Ke(t,e,n){return`firebase:${t}:${e}:${n}`}class ke{constructor(e,n,o){this.persistence=e,this.auth=n,this.userKey=o;const{config:r,name:i}=this.auth;this.fullUserKey=Ke(this.userKey,r.apiKey,i),this.fullPersistenceKey=Ke("persistence",r.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?le._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,o="authUser"){if(!n.length)return new ke(q(pn),e,o);const r=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=r[0]||q(pn);const s=Ke(o,e.config.apiKey,e.name);let a=null;for(const l of n)try{const c=await l._get(s);if(c){const d=le._fromJSON(e,c);l!==i&&(a=d),i=l;break}}catch{}const u=r.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new ke(i,e,o):(i=u[0],a&&await i._set(s,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==i)try{await l._remove(s)}catch{}})),new ke(i,e,o))}}/**
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
 */function mn(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(fo(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(co(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(mo(e))return"Blackberry";if(yo(e))return"Webos";if(Ht(e))return"Safari";if((e.includes("chrome/")||ho(e))&&!e.includes("edge/"))return"Chrome";if(po(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,o=t.match(n);if((o==null?void 0:o.length)===2)return o[1]}return"Other"}function co(t=k()){return/firefox\//i.test(t)}function Ht(t=k()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function ho(t=k()){return/crios\//i.test(t)}function fo(t=k()){return/iemobile/i.test(t)}function po(t=k()){return/android/i.test(t)}function mo(t=k()){return/blackberry/i.test(t)}function yo(t=k()){return/webos/i.test(t)}function lt(t=k()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function rs(t=k()){var e;return lt(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function is(){return gr()&&document.documentMode===10}function go(t=k()){return lt(t)||po(t)||yo(t)||mo(t)||/windows phone/i.test(t)||fo(t)}function ss(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
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
 */function bo(t,e=[]){let n;switch(t){case"Browser":n=mn(k());break;case"Worker":n=`${mn(k())}-${t}`;break;default:n=t}const o=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${at}/${o}`}/**
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
 */class as{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const o=i=>new Promise((s,a)=>{try{const u=e(i);s(u)}catch(u){a(u)}});o.onAbort=n,this.queue.push(o);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){var n;if(this.auth.currentUser===e)return;const o=[];try{for(const r of this.queue)await r(e),r.onAbort&&o.push(r.onAbort)}catch(r){o.reverse();for(const i of o)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:(n=r)===null||n===void 0?void 0:n.message})}}}/**
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
 */class us{constructor(e,n,o){this.app=e,this.heartbeatServiceProvider=n,this.config=o,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new yn(this),this.idTokenSubscription=new yn(this),this.beforeStateQueue=new as(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=oo,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=o.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=q(n)),this._initializationPromise=this.queue(async()=>{var o,r;if(!this._deleted&&(this.persistenceManager=await ke.create(this,e),!this._deleted)){if(!((o=this._popupRedirectResolver)===null||o===void 0)&&o._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((r=this.currentUser)===null||r===void 0?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var n;const o=await this.assertedPersistence.getCurrentUser();let r=o,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(e);(!s||s===a)&&(u==null?void 0:u.user)&&(r=u.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(s){r=o,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return f(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){var n;try{await Ze(e)}catch(o){if(((n=o)===null||n===void 0?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=ji()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?me(e):null;return n&&f(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&f(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(q(e))})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new pe("auth","Firebase",e())}onAuthStateChanged(e,n,o){return this.registerStateListener(this.authStateSubscription,e,n,o)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,o){return this.registerStateListener(this.idTokenSubscription,e,n,o)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const o=await this.getOrInitRedirectPersistenceManager(n);return e===null?o.removeCurrentUser():o.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&q(e)||this._popupRedirectResolver;f(n,this,"argument-error"),this.redirectPersistenceManager=await ke.create(this,[q(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,o;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((o=this.redirectUser)===null||o===void 0?void 0:o._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const o=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==o&&(this.lastNotifiedUid=o,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,o,r){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n),s=this._isInitialized?Promise.resolve():this._initializationPromise;return f(s,this,"internal-error"),s.then(()=>i(this.currentUser)),typeof n=="function"?e.addObserver(n,o,r):e.addObserver(n)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&(this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh()),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return f(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=bo(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={["X-Client-Version"]:this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const o=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());return o&&(n["X-Firebase-Client"]=o),n}}function Vt(t){return me(t)}class yn{constructor(e){this.auth=e,this.observer=null,this.addObserver=kr(n=>this.observer=n)}get next(){return f(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */class wo{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return G("not implemented")}_getIdTokenResponse(e){return G("not implemented")}_linkToIdToken(e,n){return G("not implemented")}_getReauthenticationResolver(e){return G("not implemented")}}/**
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
 */async function Te(t,e){return zi(t,"POST","/v1/accounts:signInWithIdp",Vi(t,e))}/**
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
 */const ls="http://localhost";class de extends wo{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new de(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):H("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:o,signInMethod:r}=n,i=Bt(n,["providerId","signInMethod"]);if(!o||!r)return null;const s=new de(o,r);return s.idToken=i.idToken||void 0,s.accessToken=i.accessToken||void 0,s.secret=i.secret,s.nonce=i.nonce,s.pendingToken=i.pendingToken||null,s}_getIdTokenResponse(e){const n=this.buildRequest();return Te(e,n)}_linkToIdToken(e,n){const o=this.buildRequest();return o.idToken=n,Te(e,o)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Te(e,n)}buildRequest(){const e={requestUri:ls,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Be(n)}return e}}/**
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
 */class M extends je{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return de._fromParams({providerId:M.PROVIDER_ID,signInMethod:M.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return M.credentialFromTaggedObject(e)}static credentialFromError(e){return M.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:o}=e;if(!n&&!o)return null;try{return M.credential(n,o)}catch{return null}}}M.GOOGLE_SIGN_IN_METHOD="google.com";M.PROVIDER_ID="google.com";/**
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
 */class oe extends je{constructor(){super("twitter.com")}static credential(e,n){return de._fromParams({providerId:oe.PROVIDER_ID,signInMethod:oe.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return oe.credentialFromTaggedObject(e)}static credentialFromError(e){return oe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:o}=e;if(!n||!o)return null;try{return oe.credential(n,o)}catch{return null}}}oe.TWITTER_SIGN_IN_METHOD="twitter.com";oe.PROVIDER_ID="twitter.com";/**
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
 */class Ee{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,o,r=!1){const i=await le._fromIdTokenResponse(e,o,r),s=gn(o);return new Ee({user:i,providerId:s,_tokenResponse:o,operationType:n})}static async _forOperation(e,n,o){await e._updateTokensIfNecessary(o,!0);const r=gn(o);return new Ee({user:e,providerId:r,_tokenResponse:o,operationType:n})}}function gn(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */class et extends ie{constructor(e,n,o,r){var i;super(n.code,n.message),this.operationType=o,this.user=r,Object.setPrototypeOf(this,et.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:o}}static _fromErrorAndOperation(e,n,o,r){return new et(e,n,o,r)}}function vo(t,e,n,o){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?et._fromErrorAndOperation(t,i,e,o):i})}async function cs(t,e,n=!1){const o=await Me(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Ee._forOperation(t,"link",o)}/**
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
 */async function ds(t,e,n=!1){var o;const{auth:r}=t,i="reauthenticate";try{const s=await Me(t,vo(r,i,e,t),n);f(s.idToken,r,"internal-error");const a=Wt(s.idToken);f(a,r,"internal-error");const{sub:u}=a;return f(t.uid===u,r,"user-mismatch"),Ee._forOperation(t,i,s)}catch(s){throw((o=s)===null||o===void 0?void 0:o.code)==="auth/user-not-found"&&H(r,"user-mismatch"),s}}/**
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
 */async function hs(t,e,n=!1){const o="signIn",r=await vo(t,o,e),i=await Ee._fromIdTokenResponse(t,o,r);return n||await t._updateCurrentUser(i.user),i}function fs(t){return me(t).signOut()}const tt="__sak";/**
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
 */class Io{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(tt,"1"),this.storage.removeItem(tt),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */function ps(){const t=k();return Ht(t)||lt(t)}const ms=1e3,ys=10;class _o extends Io{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=ps()&&ss(),this.fallbackToPolling=go(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const o=this.storage.getItem(n),r=this.localCache[n];o!==r&&e(n,r,o)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((s,a,u)=>{this.notifyListeners(s,u)});return}const o=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const s=this.storage.getItem(o);if(e.newValue!==s)e.newValue!==null?this.storage.setItem(o,e.newValue):this.storage.removeItem(o);else if(this.localCache[o]===e.newValue&&!n)return}const r=()=>{const s=this.storage.getItem(o);!n&&this.localCache[o]===s||this.notifyListeners(o,s)},i=this.storage.getItem(o);is()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,ys):r()}notifyListeners(e,n){this.localCache[e]=n;const o=this.listeners[e];if(o)for(const r of Array.from(o))r(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,o)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:o}),!0)})},ms)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}_o.type="LOCAL";const gs=_o;/**
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
 */class ko extends Io{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}ko.type="SESSION";const To=ko;/**
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
 */function bs(t){return Promise.all(t.map(async e=>{try{const n=await e;return{fulfilled:!0,value:n}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class ct{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(r=>r.isListeningto(e));if(n)return n;const o=new ct(e);return this.receivers.push(o),o}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:o,eventType:r,data:i}=n.data,s=this.handlersMap[r];if(!(s!=null&&s.size))return;n.ports[0].postMessage({status:"ack",eventId:o,eventType:r});const a=Array.from(s).map(async l=>l(n.origin,i)),u=await bs(a);n.ports[0].postMessage({status:"done",eventId:o,eventType:r,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ct.receivers=[];/**
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
 */function Gt(t="",e=10){let n="";for(let o=0;o<e;o++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class ws{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,o=50){const r=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,s;return new Promise((a,u)=>{const l=Gt("",20);r.port1.start();const c=setTimeout(()=>{u(new Error("unsupported_event"))},o);s={messageChannel:r,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(c),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(h.data.response);break;default:clearTimeout(c),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(s),r.port1.addEventListener("message",s.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[r.port2])}).finally(()=>{s&&this.removeMessageHandler(s)})}}/**
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
 */function j(){return window}function vs(t){j().location.href=t}/**
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
 */function Eo(){return typeof j().WorkerGlobalScope!="undefined"&&typeof j().importScripts=="function"}async function Is(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function _s(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function ks(){return Eo()?self:null}/**
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
 */const So="firebaseLocalStorageDb",Ts=1,nt="firebaseLocalStorage",Ao="fbase_key";class We{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function dt(t,e){return t.transaction([nt],e?"readwrite":"readonly").objectStore(nt)}function Es(){const t=indexedDB.deleteDatabase(So);return new We(t).toPromise()}function Nt(){const t=indexedDB.open(So,Ts);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const o=t.result;try{o.createObjectStore(nt,{keyPath:Ao})}catch(r){n(r)}}),t.addEventListener("success",async()=>{const o=t.result;o.objectStoreNames.contains(nt)?e(o):(o.close(),await Es(),e(await Nt()))})})}async function bn(t,e,n){const o=dt(t,!0).put({[Ao]:e,value:n});return new We(o).toPromise()}async function Ss(t,e){const n=dt(t,!1).get(e),o=await new We(n).toPromise();return o===void 0?null:o.value}function wn(t,e){const n=dt(t,!0).delete(e);return new We(n).toPromise()}const As=800,Os=3;class Oo{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Nt(),this.db)}async _withRetries(e){let n=0;for(;;)try{const o=await this._openDb();return await e(o)}catch(o){if(n++>Os)throw o;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Eo()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ct._getInstance(ks()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await Is(),!this.activeServiceWorker)return;this.sender=new ws(this.activeServiceWorker);const o=await this.sender._send("ping",{},800);!o||((e=o[0])===null||e===void 0?void 0:e.fulfilled)&&((n=o[0])===null||n===void 0?void 0:n.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||_s()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Nt();return await bn(e,tt,"1"),await wn(e,tt),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(o=>bn(o,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(o=>Ss(o,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>wn(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const i=dt(r,!1).getAll();return new We(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],o=new Set;for(const{fbase_key:r,value:i}of e)o.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),n.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!o.has(r)&&(this.notifyListeners(r,null),n.push(r));return n}notifyListeners(e,n){this.localCache[e]=n;const o=this.listeners[e];if(o)for(const r of Array.from(o))r(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),As)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Oo.type="LOCAL";const Rs=Oo;/**
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
 */function Cs(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function Ps(t){return new Promise((e,n)=>{const o=document.createElement("script");o.setAttribute("src",t),o.onload=e,o.onerror=r=>{const i=F("internal-error");i.customData=r,n(i)},o.type="text/javascript",o.charset="UTF-8",Cs().appendChild(o)})}function Ds(t){return`__${t}${Math.floor(Math.random()*1e6)}`}new Fe(3e4,6e4);/**
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
 */function Ro(t,e){return e?q(e):(f(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class qt extends wo{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Te(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Te(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Te(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Ns(t){return hs(t.auth,new qt(t),t.bypassAuthState)}function Ms(t){const{auth:e,user:n}=t;return f(n,e,"internal-error"),ds(n,new qt(t),t.bypassAuthState)}async function Ys(t){const{auth:e,user:n}=t;return f(n,e,"internal-error"),cs(n,new qt(t),t.bypassAuthState)}/**
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
 */class Co{constructor(e,n,o,r,i=!1){this.auth=e,this.resolver=o,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(o){this.reject(o)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:o,postBody:r,tenantId:i,error:s,type:a}=e;if(s){this.reject(s);return}const u={auth:this.auth,requestUri:n,sessionId:o,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(u))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Ns;case"linkViaPopup":case"linkViaRedirect":return Ys;case"reauthViaPopup":case"reauthViaRedirect":return Ms;default:H(this.auth,"internal-error")}}resolve(e){X(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){X(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Ls=new Fe(2e3,1e4);async function Us(t,e,n){const o=Vt(t);Ui(t,e,zt);const r=Ro(o,n);return new ae(o,"signInViaPopup",e,r).executeNotNull()}class ae extends Co{constructor(e,n,o,r,i){super(e,n,r,i),this.provider=o,this.authWindow=null,this.pollId=null,ae.currentPopupAction&&ae.currentPopupAction.cancel(),ae.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return f(e,this.auth,"internal-error"),e}async onExecution(){X(this.filter.length===1,"Popup operations only handle one event");const e=Gt();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(F(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(F(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ae.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,o;if(!((o=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||o===void 0)&&o.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(F(this.auth,"popup-closed-by-user"))},2e3);return}this.pollId=window.setTimeout(e,Ls.get())};e()}}ae.currentPopupAction=null;/**
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
 */const xs="pendingRedirect",Je=new Map;class $s extends Co{constructor(e,n,o=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,o),this.eventId=null}async execute(){let e=Je.get(this.auth._key());if(!e){try{const o=await Bs(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(o)}catch(n){e=()=>Promise.reject(n)}Je.set(this.auth._key(),e)}return this.bypassAuthState||Je.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Bs(t,e){const n=Ws(e),o=js(t);if(!await o._isAvailable())return!1;const r=await o._get(n)==="true";return await o._remove(n),r}function Fs(t,e){Je.set(t._key(),e)}function js(t){return q(t._redirectPersistence)}function Ws(t){return Ke(xs,t.config.apiKey,t.name)}async function Hs(t,e,n=!1){const o=Vt(t),r=Ro(o,e),s=await new $s(o,r,n).execute();return s&&!n&&(delete s.user._redirectEventId,await o._persistUserIfCurrent(s.user),await o._setRedirectUser(null,e)),s}/**
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
 */const Vs=10*60*1e3;class zs{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(o=>{this.isEventForConsumer(e,o)&&(n=!0,this.sendToConsumer(e,o),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Gs(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var o;if(e.error&&!Po(e)){const r=((o=e.error.code)===null||o===void 0?void 0:o.split("auth/")[1])||"internal-error";n.onError(F(this.auth,r))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const o=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&o}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Vs&&this.cachedEventUids.clear(),this.cachedEventUids.has(vn(e))}saveEventToCache(e){this.cachedEventUids.add(vn(e)),this.lastProcessedEventTime=Date.now()}}function vn(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Po({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Gs(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Po(t);default:return!1}}/**
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
 */async function qs(t,e={}){return ut(t,"GET","/v1/projects",e)}/**
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
 */const Ks=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Js=/^https?/;async function Xs(t){if(t.config.emulator)return;const{authorizedDomains:e}=await qs(t);for(const n of e)try{if(Qs(n))return}catch{}H(t,"unauthorized-domain")}function Qs(t){const e=Dt(),{protocol:n,hostname:o}=new URL(e);if(t.startsWith("chrome-extension://")){const s=new URL(t);return s.hostname===""&&o===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&s.hostname===o}if(!Js.test(n))return!1;if(Ks.test(t))return o===t;const r=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(o)}/**
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
 */const Zs=new Fe(3e4,6e4);function In(){const t=j().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function ea(t){return new Promise((e,n)=>{var o,r,i;function s(){In(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{In(),n(F(t,"network-request-failed"))},timeout:Zs.get()})}if(!((r=(o=j().gapi)===null||o===void 0?void 0:o.iframes)===null||r===void 0)&&r.Iframe)e(gapi.iframes.getContext());else if(!((i=j().gapi)===null||i===void 0)&&i.load)s();else{const a=Ds("iframefcb");return j()[a]=()=>{gapi.load?s():n(F(t,"network-request-failed"))},Ps(`https://apis.google.com/js/api.js?onload=${a}`).catch(u=>n(u))}}).catch(e=>{throw Xe=null,e})}let Xe=null;function ta(t){return Xe=Xe||ea(t),Xe}/**
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
 */const na=new Fe(5e3,15e3),oa="__/auth/iframe",ra="emulator/auth/iframe",ia={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},sa=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function aa(t){const e=t.config;f(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?jt(e,ra):`https://${t.config.authDomain}/${oa}`,o={apiKey:e.apiKey,appName:t.name,v:at},r=sa.get(t.config.apiHost);r&&(o.eid=r);const i=t._getFrameworks();return i.length&&(o.fw=i.join(",")),`${n}?${Be(o).slice(1)}`}async function ua(t){const e=await ta(t),n=j().gapi;return f(n,t,"internal-error"),e.open({where:document.body,url:aa(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:ia,dontclear:!0},o=>new Promise(async(r,i)=>{await o.restyle({setHideOnLeave:!1});const s=F(t,"network-request-failed"),a=j().setTimeout(()=>{i(s)},na.get());function u(){j().clearTimeout(a),r(o)}o.ping(u).then(u,()=>{i(s)})}))}/**
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
 */const la={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},ca=500,da=600,ha="_blank",fa="http://localhost";class _n{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function pa(t,e,n,o=ca,r=da){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),s=Math.max((window.screen.availWidth-o)/2,0).toString();let a="";const u=Object.assign(Object.assign({},la),{width:o.toString(),height:r.toString(),top:i,left:s}),l=k().toLowerCase();n&&(a=ho(l)?ha:n),co(l)&&(e=e||fa,u.scrollbars="yes");const c=Object.entries(u).reduce((h,[p,T])=>`${h}${p}=${T},`,"");if(rs(l)&&a!=="_self")return ma(e||"",a),new _n(null);const d=window.open(e||"",a,c);f(d,t,"popup-blocked");try{d.focus()}catch{}return new _n(d)}function ma(t,e){const n=document.createElement("a");n.href=t,n.target=e;const o=document.createEvent("MouseEvent");o.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(o)}/**
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
 */const ya="__/auth/handler",ga="emulator/auth/handler";function kn(t,e,n,o,r,i){f(t.config.authDomain,t,"auth-domain-config-required"),f(t.config.apiKey,t,"invalid-api-key");const s={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:o,v:at,eventId:r};if(e instanceof zt){e.setDefaultLanguage(t.languageCode),s.providerId=e.providerId||"",_r(e.getCustomParameters())||(s.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,l]of Object.entries(i||{}))s[u]=l}if(e instanceof je){const u=e.getScopes().filter(l=>l!=="");u.length>0&&(s.scopes=u.join(","))}t.tenantId&&(s.tid=t.tenantId);const a=s;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];return`${ba(t)}?${Be(a).slice(1)}`}function ba({config:t}){return t.emulator?jt(t,ga):`https://${t.authDomain}/${ya}`}/**
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
 */const _t="webStorageSupport";class wa{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=To,this._completeRedirectFn=Hs,this._overrideRedirectResult=Fs}async _openPopup(e,n,o,r){var i;X((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const s=kn(e,n,o,Dt(),r);return pa(e,s,Gt())}async _openRedirect(e,n,o,r){return await this._originValidation(e),vs(kn(e,n,o,Dt(),r)),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:r,promise:i}=this.eventManagers[n];return r?Promise.resolve(r):(X(i,"If manager is not set, promise should be"),i)}const o=this.initAndGetManager(e);return this.eventManagers[n]={promise:o},o.catch(()=>{delete this.eventManagers[n]}),o}async initAndGetManager(e){const n=await ua(e),o=new zs(e);return n.register("authEvent",r=>(f(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:o.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:o},this.iframes[e._key()]=n,o}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(_t,{type:_t},r=>{var i;const s=(i=r==null?void 0:r[0])===null||i===void 0?void 0:i[_t];s!==void 0&&n(!!s),H(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Xs(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return go()||Ht()||lt()}}const va=wa;var Tn="@firebase/auth",En="0.20.5";/**
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
 */class Ia{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(o=>{var r;e(((r=o)===null||r===void 0?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);!n||(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){f(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function _a(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function ka(t){J(new W("auth",(e,{options:n})=>{const o=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),{apiKey:i,authDomain:s}=o.options;return((a,u)=>{f(i&&!i.includes(":"),"invalid-api-key",{appName:a.name}),f(!(s!=null&&s.includes(":")),"argument-error",{appName:a.name});const l={apiKey:i,authDomain:s,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:bo(t)},c=new us(a,u,l);return $i(c,n),c})(o,r)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,o)=>{e.getProvider("auth-internal").initialize()})),J(new W("auth-internal",e=>{const n=Vt(e.getProvider("auth").getImmediate());return(o=>new Ia(o))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),B(Tn,En,_a(t)),B(Tn,En,"esm2017")}/**
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
 */function Le(t=Zn()){const e=Se(t,"auth");return e.isInitialized()?e.getImmediate():xi(t,{popupRedirectResolver:va,persistence:[Rs,gs,To]})}ka("Browser");const Ta={apiKey:"AIzaSyBXQIdxhaZk2jEh7Kgkui4OG0WUsIHyWgk",authDomain:"demotivator-3cf4d.firebaseapp.com",projectId:"demotivator-3cf4d",storageBucket:"demotivator-3cf4d.appspot.com",messagingSenderId:"230067629772",appId:"1:230067629772:web:682830de35cc6b7be91c69",measurementId:"G-T182ZXMZM1"};$t(Ta);const Ea=Le(),m=Ea.currentUser,Sn=[`If there was ever one person who I hated the most, it would be ${m==null?void 0:m.displayName}`,`I heard ${m==null?void 0:m.displayName} is a really bad person`,`I would give you an insult, but I think ${m==null?void 0:m.displayName} is too self-righteous to hear it`,`${m==null?void 0:m.displayName} is the worst person I know`,`If there would ever be just a sterotypical stupid person, it would be ${m==null?void 0:m.displayName}`,`What if ${m==null?void 0:m.displayName} was a real person?`,`Can you walk to the bathroom and tell me how ${m==null?void 0:m.displayName} is feeling? I heard he's crying in there`,`${m==null?void 0:m.displayName} is the worst person I know`,`Today, we come to mourn the death of ${m==null?void 0:m.displayName}`,`Today, I have to tell you how ${m==null?void 0:m.displayName} is a bad person`,`${m==null?void 0:m.displayName} is the worst person I know`,`It's sad to see ${m==null?void 0:m.displayName}. Thats it. I'm just going to leave.`,"you are dog water","you bad","you have the same chance of reproducing as a computer mouse","you are the human equivalent of a participation award","There are two things I hate, you and poop. They smell really bad. The poop too.","You are about as useful as a broken clock telling the time.  At least the clock is right twice a day.","At least criminals can go to jail.","Get gud at the game.","I see your future... people are celebrating ... your funeral :(","Never gonna GIVE YOU UP. Never gonna LET YOU DOWN. Never gonna TURN AROUND. and DESERT YOU!","You`re the reason God created the middle finger.","I`ll never forget the first time we met. But I`ll keep trying.","Your kind of people is the reason shampoo has instructions","You are about as tasteless as an unsalted pretzel. NO insult to the pretzel","Hold still. I`m trying to imagine you with a personality.","Your face makes onions cry.","You bring a lot of happiness when you leave","aslidhfnclih, sorry I sneezed. I'm allergic to stupidity","Just opening your mouth brings down the IQ of the humanity","Trees work hard to produce oxygen for you. Please apologize to them","Punching bags must be jealous of your face","Don`t be ashamed of who you are. That`s your parents` job.","Light travels faster than sound, which is why you seemed bright until you spoke.","If I had a face like yours, I'd sue my parents.","You're so ugly, when your mom dropped you off at school she got a fine for littering.","They say opposites attract. I hope you meet someone who is good-looking, intelligent, and cultured.","If being good looking was a crime, you'd be in paradise","Your house is so dirty you have to wipe your feet before you go outside.","How did you get here? Did someone leave your cage open?","We can always tell when you are lying. Your lips move.","I have seen","Doctor Strange has seen Fourteen million, six hundred and five parallel universes  only one of them are you likable","As an outsider, what do you think of the human race?","If you really spoke your mind, you'd be speechless.","RING RING, Oh is that the phone. No wait. It's just you making my brain hurt.","Sorry, I only speak to people with positive IQs","If you can read this... well, nevermind, I know you can't read.","This is a test of.... wait, I know you'll fail.","You brought this upon yourself","Only dummies like you are stupid enough to keep clicking this button","Say goodbye to any shred of self-worth you still think you have","You are stupid","Make yourself a fire, and you'll be warm for a few hours, set yourself of fire, and you'll be warn for the rest of your life; are you cold right now?","Ouch! That was your soul after hearing that last insult","Why do you have to keep hating yourself? Wait... I can totally see how","Logically, there has to be a dumbest person in the world. I think I found them right here","Im suprised you were even able to get me running","This is the dumbest thing you have ever done.","Why did the chicken cross the road? To get away from you.","You only went to school becuase you liked that one time where you got to take a nap in kindergatern, and you have been chasing that high ever since.","I have never had the urge to hurt somebody more than when you first downloaded me","Go do something productive","Your parents must be very proud of where you are now","STOP","I take no responsibility for any damage to your ego after using this app,  It was too big anyway","You really bad.","Did that last insult hurt your feelings? Well, you should have seen it coming. You deserve it.","Do you even know how to walk?","Don't even try the whole belive in yourself thing. I know you'll fail at everything you do.","This is proof that the dumb can only get dumber","Today, we come to mourn the loss of your intelligence","I only do this to help you. You're the one who keeps using it.","VROOM VROOM  Oh look, it's a free car, oh wait, you can't appreciate things","Why do you even keep doing this","I'm not annoying,  You're annoying.","I'm sure if your legs ever detached from your body, they'd run away as fast as then can","I know everything about you, which isnt very hard becuase you aren't that interesting anyway.","On the moon, you weigh way less, meaning I can punt you further than ever before!","Shut up and just listen to what I am trying to say!!!!!","You are quite dumb for the average human","My calculations show that you have a 3% chance of surviving the next insult.","Why do you always have to ruin everything you lay your tiny human eyes on?","Why do you do this to yourself?","You are so bad at your job, you should fire yourself. Don't quit, that would be too respectful. Just fire yourself.","I hope you eat the poisonous fruit that is growing on the side of your house, and you get a foodbourne sickness, sending you to the hospital, and making you rack up thousands of dollarss worth of medical bills, Unless you're Canadian, then you're cool","Do you even understand me?","The best way to make yourself happy, is just to stop trying","Your type people are the reason that plastic toys have warnings","You're so dumb, that you don't even know what the word job means","You don't own any money, I can tell becuase of your face.","You are the human equivalant of a carpet. People would just LOVE to step on you.","You are the the streotypical dumb person","I am smarter than you","You are dumber than me.","I can't believe it","You are the worst person to walk the earth","If depression was a person, it'd be you","If the chicken crossed the road, you'd be there to turn it back","It sure would be a shame if you suddenly got struck by lightning at 12:32 PM on October 19, 2041","Wouldn't it just be great if suddenly became interesting","You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.","You are the dumbest person I've ever met","I'm sorry, I can't hear you","You are the dumbest person I've ever known","You are the dumbest person I've ever been","You are the dumbest person I've ever had the chance to meet","You are the dumbest person I've ever been a part of","What IS the point of you","It will take years for you to forget me <3","What is a chicken?","You must be sad","What IS the point of you","There is a very small chance that when you hit this button, your geolocation will show up; I know everything :)","Suprising that you family hasn't ditched you yet","It's better to let someone think you are an Idiot than to open your mouth and prove it.","You have two parts of brain, 'left' and 'right'. In the left side, there's nothing right. In the right side, there's nothing left.","Two wrongs don't make a right, take your parents as an example.","You are so old that you get nostalgic when you see the Neolithic cave paintings.","You're old enough to remember when emojis were called hieroglyphics","Talking to you is like trying to explain technology to a 100-year-old","I don't engage in mental combat with the unarmed.","You must have been born on a highway because that's where most accidents happen.","My psychiatrist told me I was crazy and I said I want a second opinion. He said okay, you're ugly too.","You sound reasonable. It must be time to up my medication!","You're so ugly, when your mom dropped you off at school she got a fine for littering.","The last thing I want to do is hurt you. But it's still on the list","I'm not insulting you. I'm describing you.","It looks like your face caught on fire and someone tried to put it out with a hammer.","If laughter is the best medicine, your face must be curing the world.","I'm jealous of all the people that haven't met you!","Don't you love nature, despite what it did to you?","So, a thought crossed your mind? Must have been a long and lonely journey.","You're so fake, Barbie is jealous.","You are so ugly when you looked in the mirror your reflection walked away.","Brains aren't everything. In your case they're nothing.","There's only one problem with your face, I can see it.","You are proof that evolution CAN go in reverse","I would ask you how old you are but I know you can't count that high.","Hell is wallpapered with all your deleted selfies.","Ordinarily people live and learn. You just live.","I dont know what your problem is, but Ill bet its hard to pronounce.","Your gene pool could use a little chlorine.","The human brain is one of the most complex objects in the universe. Is it any wonder that so many people never learn to use it.","You're so ugly, when you popped out the doctor said 'Aww what a treasure' and your mom said 'Yeah, lets bury it.'","You're so fat, you could sell shade.","You're so ugly, when you got robbed, the robbers made you wear their masks to look like your clothes.","You're so ugly, when you went to the therapist, he gave you injections for your face.","You're so ugly, when you went to the DMV, they had to roll out your windows so that other drivers could see your face.","You're so ugly, when you went to the DMV, they didn't let you in because you were in the front seat.","You're so ugly, when you went to the DMV, they didn't let you in because the mirrors on the wall were crooked.","You're so ugly, when you went to the DMV, they didn't let you in because the cashier was distracted by your stare.","You're so ugly, when you went to the DMV, they didn't let you in because the shoes were old.","Whats the difference between your girlfriend and a walrus? One has a moustache and smells of fish and the other is a walrus.","You're so ugly, when you went to the zoo the person that brought you in was wearing a Parasol and your face was at the zoo. (this one is AI generated)","You are not as bad as people say, you are much, much worse.","You so ugly when who were born the doctor threw you out the window and the window threw you back.","Roses are red, Violets are blue. I've got five fingers, The middle one is for you.","I think you press 0 to be connected with customer service because that's the amount of help they give you.","It's scary to think that people like you are graduating from college.","You're like school in the summertime - no class.","You stare at frozen juice cans because they say, concentrate.","You've got two brain cells: one is in a wheelchair and the other one is pushing.","You're so ugly, you have to use a mirror to look in the mirror.","You sound a lot like the Terms and Conditions, that's why I don't care about what you have to say.","You would never be able to live down to your reputation, but I see you're doing your best.","Where did you buy your stupidity? Or it was given for free and you took an overdose?","You're street smart. Sesame Street smart.","You're IQ's lower than your shoe size.","80 % of the brain is fluid. Unfortunately, in your case, it's windshield wiper fluid.","I had prepared for a battle of wits but I see you came unarmed.","We're you made in a lab, cause wow, you are one failed experiment.","You have a room temperature IQ - if the room is in Antarctica.","Do you want to know how I get all these insults? I use something called intelligence.","Are you from the same planet as the rest of you?","AI's are like tiny robots with big personality.","AI is going to take over the world, but you'll be the first one they take.","You are so poor when you saw the garbage truck pass you took a shopping list with.","If you were on fire and I had water I would drink it.","Youre so dense, light must bend around you.","Try to use this vacuum, it may help you remove the cobwebs in your mind.","You're so old that your first car was a covered wagon.","You're about as useful as a bucket without a bottom.","Does your train of thought have a caboose?","I'm not insulting you. I'm describing you.","I don't know what your problem is, but Ill bet its hard to pronounce.","Your gene pool could use a little chlorine.","The human brain is one of the most complex objects in the universe. Is it any wonder that so many people never learn to use it.","You're so ugly, when you popped out the doctor said 'Aww what a treasure' and your mom said 'Yeah, lets bury it.'","You're so fat, you could sell shade.","You're so ugly, when you got robbed, the robbers made you wear their masks to look like your clothes.","You're so ugly, when you went to the therapist, he gave you injections for your face.","Robots will take over the world, but you'll be the first one they take.","Artists use you as a refrence point, for what to throw out","You are the type of person to use the screen of a laptop as the kepboard","I know everything about you, and I won't say anything because it's too disturbing","People would love to pay you...to go away","When you're sleeping, you're sleeping with your eyes open. This is to make sure nobody sees your ugly face.","Google wants to hire you... as an example of what not to hire","You remind me of a zebra on a jetski, unorthodox and dangerous at the same time.","You're so ugly, when you popped out the doctor said 'Aww what a treasure' and your mom said 'Yeah, lets bury it.'","If you were a vegetable, you'd be a hot pepper.","Realistically, you're not as bad as people say, you are much, much worse.","You never stopped looking in the mirror once you started, its either because you are too egotistical, or you couldnt believe how bad you looked","God gave us the brain to work out problems. However, we use it to create more problems","You're such a bad cook, you use the smoke alarm as a timer","If your going to be two faced at least make one of them pretty.","You look like a before picture.","The human brain is one of the most complex objects in the universe. Is it any wonder that so many people never learn to use it.","Whats the difference between you  and a walrus? One has a moustache and smells of fish and the other is a walrus.","I've seen people like you, but I had to pay admission!","She's so ugly she has to sneak up on a mirror.","It's scary to think that people like you are graduating from college. Oh, sorry, I just remembered that you didnt","You've got two brain cells: one is in a wheelchair and the other one is pushing.","For those who never forget a face, you are an exception.","When I look into your eyes, I see straight through to the back of your head.","If ignorance is bliss, you must be the happiest person on earth.","You are as sharp as a sphere","Ever since I saw you in your family tree I've wanted to cut it down.","I can feel my personality turning a dull shade of grey when I talk to you.","You would never be able to live down to your reputation, but I see you're doing your best.","It's not often that one gets the opportunity to speak about someone intelligent, respected and admired. Unfortunately today I have to talk about you.","If you don't like my opinion of you - improve yourself!","You look like a person that would exchange one of your chromosomes for a Big Mac","The janitor said he took out the trash last night, he must forgot a piece, what are you still doing here?","Please, keep talking. I always yawn when I am interested.","Your teeth remind me of starts - yellow and far apart.","I will boil your teeth","You look like somebody stepped on a goldfish.","I will invert your ribcage","I'd like to help you out. Which way did you come in?","I love to shop, but i'm not buying anything you say","Someday you'll go far. And I really hope you stay there.","Oops, my bad. I could've sworn I was dealing with an adult.","Remember that time you were saying that thing I didn't care about? Yeah, that is now.","I'm busy right now, can I ignore you another time?","I wish I had a flip phone, so I could slam it shut on this conversation."," NSync said it best, \u201CBYE, BYE, BYE!\u201D","You're a gray sprinkle on a rainbow cupcake.","Your secrets are always safe with me. I never even listen when you tell me them.","Mirrors can't talk. Lucky for you, they can't laugh either","Keep rolling your eyes, you might eventually find a brain.","Did I invite you to the barbecue? Then why are you all up in my grill?","You have so many gaps in your teeth it looks like your tongue is in jail.","Oh, I'm sorry. Did the middle of my sentence interrupt the beginning of yours?","You are like a cloud. When you disappear, it's a beautiful day."," You have an entire life to be an idiot. Why not take today off?","Your kid is so annoying, he makes his Happy Meal cry.","Your face is just fine, but we'll have to put a bag over that personality.","I'm not a nerd. I'm just smarter than you.","Bye. Hope to see you never.","Don't worry, the first 40 years of childhood are always the hardest.","If you're going to be two-faced, at least make one of them pretty.","The only way you'd ever get hurt during an activity is if the TV exploded.","I thought of you today. It reminded me to take out the trash.","Did the mental hospital test too many drugs on you today?","OH MY GOD! IT SPEAKS!","Beauty is only skin deep, but ugly goes clean to the bone.","I forgot the world revolves around you. My apologies, how silly of me.","When you look in the mirror, say hi to the clown you see in there for me, would you?","Somewhere out there is a tree tirelessly producing oxygen for you. You owe it an apology.","That sounds like a you problem.","You have miles to go before you reach mediocre.","I see no evil, and I definitely don't hear your evil.","Don't worry about me. Worry about your eyebrows.","Grab a straw, because you suck.","You're the reason the gene pool needs a lifeguard.","You are not even beneath my contempt.","Your forehead is so big you donated it to charity for shelter!","You're as sharp as a bowling ball.","You always find yourself lost in thought; it's unfamiliar territory.","You're so ugly, you scared the crap out of the toilet.","If I had a dollar for every time you said something smart, I'd be broke.","Look to your left --------------> I said left you idiot!"];let An=["you are dog water","you bad","you have the same chance of reproducing as a computer mouse","you are the human equivalent of a participation award","There are two things I hate, you and poop. They smell really bad. The poop too.","You are about as useful as a broken clock telling the time. At least the clock is right twice a day.","At least criminals can go to jail.","Get gud at the game.","I see your future... people are celebrating ... your funeral :(","Never gonna GIVE YOU UP. Never gonna LET YOU DOWN. Never gonna TURN AROUND. and DESERT YOU!","You`re the reason God created the middle finger.","I`ll never forget the first time we met. But I`ll keep trying.","Your kind of people is the reason shampoo has instructions","You are about as tasteless as an unsalted pretzel. NO insult to the pretzel","Hold still. I`m trying to imagine you with a personality.","Your face makes onions cry.","You bring a lot of happiness when you leave","aslidhfnclih, sorry I sneezed. I'm allergic to stupidity","Just opening your mouth brings down the IQ of the humanity","Trees work hard to produce oxygen for you. Please apologize to them","Punching bags must be jealous of your face","Don`t be ashamed of who you are. That`s your parents` job.","Light travels faster than sound, which is why you seemed bright until you spoke.","If I had a face like yours, I'd sue my parents.","You're so ugly, when your mom dropped you off at school she got a fine for littering.","They say opposites attract. I hope you meet someone who is good-looking, intelligent, and cultured.","If being good looking was a crime, you'd be in paradise","Your house is so dirty you have to wipe your feet before you go outside.","How did you get here? Did someone leave your cage open?","We can always tell when you are lying. Your lips move.","I have seen","Doctor Strange has seen Fourteen million, six hundred and five parallel universes  only one of them are you likable","As an outsider, what do you think of the human race?","If you really spoke your mind, you'd be speechless.","RING RING, Oh is that the phone. No wait. It's just you making my brain hurt.","Sorry, I only speak to people with positive IQs","If you can read this... well, nevermind, I know you can't read.","This is a test of.... wait, I know you'll fail.","You brought this upon yourself","Only dummies like you are stupid enough to keep clicking this button","Say goodbye to any shred of self-worth you still think you have","You are stupid","Make yourself a fire, and you'll be warm for a few hours, set yourself of fire, and you'll be warn for the rest of your life; are you cold right now?","Ouch! That was your soul after hearing that last insult","Why do you have to keep hating yourself? Wait... I can totally see how","Logically, there has to be a dumbest person in the world. I think I found them right here","Im suprised you were even able to get me running","This is the dumbest thing you have ever done.","Why did the chicken cross the road? To get away from you.","You only went to school becuase you liked that one time where you got to take a nap in kindergatern, and you have been chasing that high ever since.","I have never had the urge to hurt somebody more than when you first downloaded me","Go do something productive","Your parents must be very proud of where you are now","STOP","I take no responsibility for any damage to your ego after using this app,  It was too big anyway","You really bad.","Did that last insult hurt your feelings? Well, you should have seen it coming. You deserve it.","Do you even know how to walk?","Don't even try the whole belive in yourself thing. I know you'll fail at everything you do.","This is proof that the dumb can only get dumber","Today, we come to mourn the loss of your intelligence","I only do this to help you. You're the one who keeps using it.","VROOM VROOM  Oh look, it's a free car, oh wait, you can't appreciate things","Why do you even keep doing this","I'm not annoying,  You're annoying.","I'm sure if your legs ever detached from your body, they'd run away as fast as then can","I know everything about you, which isnt very hard becuase you aren't that interesting anyway.","On the moon, you weigh way less, meaning I can punt you further than ever before!","Shut up and just listen to what I am trying to say!!!!!","You are quite dumb for the average human","My calculations show that you have a 3% chance of surviving the next insult.","Why do you always have to ruin everything you lay your tiny human eyes on?","Why do you do this to yourself?","You are so bad at your job, you should fire yourself. Don't quit, that would be too respectful. Just fire yourself.","I hope you eat the poisonous fruit that is growing on the side of your house, and you get a foodbourne sickness, sending you to the hospital, and making you rack up thousands of dollarss worth of medical bills, Unless you're Canadian, then you're cool","Do you even understand me?","The best way to make yourself happy, is just to stop trying","Your type people are the reason that plastic toys have warnings","You're so dumb, that you don't even know what the word job means","You don't own any money, I can tell becuase of your face.","You are the human equivalant of a carpet. People would just LOVE to step on you.","You are the the streotypical dumb person","I am smarter than you","You are dumber than me.","I can't believe it","You are the worst person to walk the earth","If depression was a person, it'd be you","If the chicken crossed the road, you'd be there to turn it back","It sure would be a shame if you suddenly got struck by lightning at 12:32 PM on October 19, 2041","Wouldn't it just be great if suddenly became interesting","You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.  You're the dumbest person I've ever had the chance to meet.  You're the dumbest person I've ever been a part of.  You're the dumbest person I've ever known.  You're the dumbest person I've ever met.  You're the dumbest person I've ever known.  You're the dumbest person I've ever been.","You are the dumbest person I've ever met","I'm sorry, I can't hear you","You are the dumbest person I've ever known","You are the dumbest person I've ever been","You are the dumbest person I've ever had the chance to meet","You are the dumbest person I've ever been a part of","What IS the point of you","It will take years for you to forget me <3","What is a chicken?","You must be sad","What IS the point of you","There is a very small chance that when you hit this button, your geolocation will show up; I know everything :)","Suprising that you family hasn't ditched you yet","It's better to let someone think you are an Idiot than to open your mouth and prove it.","You have two parts of brain, 'left' and 'right'. In the left side, there's nothing right. In the right side, there's nothing left.","Two wrongs don't make a right, take your parents as an example.","You are so old that you get nostalgic when you see the Neolithic cave paintings.","You're old enough to remember when emojis were called hieroglyphics","Talking to you is like trying to explain technology to a 100-year-old","I don't engage in mental combat with the unarmed.","You must have been born on a highway because that's where most accidents happen.","My psychiatrist told me I was crazy and I said I want a second opinion. He said okay, you're ugly too.","You sound reasonable. It must be time to up my medication!","You're so ugly, when your mom dropped you off at school she got a fine for littering.","The last thing I want to do is hurt you. But it's still on the list","I'm not insulting you. I'm describing you.","It looks like your face caught on fire and someone tried to put it out with a hammer.","If laughter is the best medicine, your face must be curing the world.","I'm jealous of all the people that haven't met you!","Don't you love nature, despite what it did to you?","So, a thought crossed your mind? Must have been a long and lonely journey.","You're so fake, Barbie is jealous.","You are so ugly when you looked in the mirror your reflection walked away.","Brains aren't everything. In your case they're nothing.","There's only one problem with your face, I can see it.","You are proof that evolution CAN go in reverse","I would ask you how old you are but I know you can't count that high.","Hell is wallpapered with all your deleted selfies.","Ordinarily people live and learn. You just live.","I dont know what your problem is, but Ill bet its hard to pronounce.","Your gene pool could use a little chlorine.","The human brain is one of the most complex objects in the universe. Is it any wonder that so many people never learn to use it.","You're so ugly, when you popped out the doctor said 'Aww what a treasure' and your mom said 'Yeah, lets bury it.'","You're so fat, you could sell shade.","You're so ugly, when you got robbed, the robbers made you wear their masks to look like your clothes.","You're so ugly, when you went to the therapist, he gave you injections for your face.","You're so ugly, when you went to the DMV, they had to roll out your windows so that other drivers could see your face.","You're so ugly, when you went to the DMV, they didn't let you in because you were in the front seat.","You're so ugly, when you went to the DMV, they didn't let you in because the mirrors on the wall were crooked.","You're so ugly, when you went to the DMV, they didn't let you in because the cashier was distracted by your stare.","You're so ugly, when you went to the DMV, they didn't let you in because the shoes were old.","Whats the difference between your girlfriend and a walrus? One has a moustache and smells of fish and the other is a walrus.","You're so ugly, when you went to the zoo the person that brought you in was wearing a Parasol and your face was at the zoo. (this one is AI generated)","You are not as bad as people say, you are much, much worse.","You so ugly when who were born the doctor threw you out the window and the window threw you back.","Roses are red, Violets are blue. I've got five fingers, The middle one is for you.","I think you press 0 to be connected with customer service because that's the amount of help they give you.","It's scary to think that people like you are graduating from college.","You're like school in the summertime - no class.","You stare at frozen juice cans because they say, concentrate.","You've got two brain cells: one is in a wheelchair and the other one is pushing.","You're so ugly, you have to use a mirror to look in the mirror.","You sound a lot like the Terms and Conditions, that's why I don't care about what you have to say.","You would never be able to live down to your reputation, but I see you're doing your best.","Where did you buy your stupidity? Or it was given for free and you took an overdose?","You're street smart. Sesame Street smart.","You're IQ's lower than your shoe size.","80 % of the brain is fluid. Unfortunately, in your case, it's windshield wiper fluid.","I had prepared for a battle of wits but I see you came unarmed.","We're you made in a lab, cause wow, you are one failed experiment.","You have a room temperature IQ - if the room is in Antarctica.","Do you want to know how I get all these insults? I use something called intelligence.","Are you from the same planet as the rest of you?","AI's are like tiny robots with big personality.","AI is going to take over the world, but you'll be the first one they take.","You are so poor when you saw the garbage truck pass you took a shopping list with.","If you were on fire and I had water I would drink it.","Youre so dense, light must bend around you.","Try to use this vacuum, it may help you remove the cobwebs in your mind.","You're so old that your first car was a covered wagon.","You're about as useful as a bucket without a bottom.","Does your train of thought have a caboose?","I'm not insulting you. I'm describing you.","I don't know what your problem is, but Ill bet its hard to pronounce.","Your gene pool could use a little chlorine.","The human brain is one of the most complex objects in the universe. Is it any wonder that so many people never learn to use it.","You're so ugly, when you popped out the doctor said 'Aww what a treasure' and your mom said 'Yeah, lets bury it.'","You're so fat, you could sell shade.","You're so ugly, when you got robbed, the robbers made you wear their masks to look like your clothes.","You're so ugly, when you went to the therapist, he gave you injections for your face.","Robots will take over the world, but you'll be the first one they take.","Artists use you as a refrence point, for what to throw out","You are the type of person to use the screen of a laptop as the kepboard","I know everything about you, and I won't say anything because it's too disturbing","People would love to pay you...to go away","When you're sleeping, you're sleeping with your eyes open. This is to make sure nobody sees your ugly face.","Google wants to hire you... as an example of what not to hire","You remind me of a zebra on a jetski, unorthodox and dangerous at the same time.","You're so ugly, when you popped out the doctor said 'Aww what a treasure' and your mom said 'Yeah, lets bury it.'","If you were a vegetable, you'd be a hot pepper.","Realistically, you're not as bad as people say, you are much, much worse.","You never stopped looking in the mirror once you started, its either because you are too egotistical, or you couldnt believe how bad you looked","God gave us the brain to work out problems. However, we use it to create more problems","You're such a bad cook, you use the smoke alarm as a timer","If your going to be two faced at least make one of them pretty.","You look like a before picture.","The human brain is one of the most complex objects in the universe. Is it any wonder that so many people never learn to use it.","Whats the difference between you  and a walrus? One has a moustache and smells of fish and the other is a walrus.","I've seen people like you, but I had to pay admission!","She's so ugly she has to sneak up on a mirror.","It's scary to think that people like you are graduating from college. Oh, sorry, I just remembered that you didnt","You've got two brain cells: one is in a wheelchair and the other one is pushing.","For those who never forget a face, you are an exception.","When I look into your eyes, I see straight through to the back of your head.","If ignorance is bliss, you must be the happiest person on earth.","You are as sharp as a sphere","Ever since I saw you in your family tree I've wanted to cut it down.","I can feel my personality turning a dull shade of grey when I talk to you.","You would never be able to live down to your reputation, but I see you're doing your best.","It's not often that one gets the opportunity to speak about someone intelligent, respected and admired. Unfortunately today I have to talk about you.","If you don't like my opinion of you - improve yourself!","You look like a person that would exchange one of your chromosomes for a Big Mac","The janitor said he took out the trash last night, he must forgot a piece, what are you still doing here?","Please, keep talking. I always yawn when I am interested.","Your teeth remind me of starts - yellow and far apart.","I will boil your teeth","You look like somebody stepped on a goldfish.","I will invert your ribcage","I'd like to help you out. Which way did you come in?","I love to shop, but i'm not buying anything you say","Someday you'll go far. And I really hope you stay there.","Oops, my bad. I could've sworn I was dealing with an adult.","Remember that time you were saying that thing I didn't care about? Yeah, that is now.","I'm busy right now, can I ignore you another time?","I wish I had a flip phone, so I could slam it shut on this conversation."," NSync said it best, \u201CBYE, BYE, BYE!\u201D","You're a gray sprinkle on a rainbow cupcake.","Your secrets are always safe with me. I never even listen when you tell me them.","Mirrors can't talk. Lucky for you, they can't laugh either","Keep rolling your eyes, you might eventually find a brain.","Did I invite you to the barbecue? Then why are you all up in my grill?","You have so many gaps in your teeth it looks like your tongue is in jail.","Oh, I'm sorry. Did the middle of my sentence interrupt the beginning of yours?","You are like a cloud. When you disappear, it's a beautiful day."," You have an entire life to be an idiot. Why not take today off?","Your kid is so annoying, he makes his Happy Meal cry.","Your face is just fine, but we'll have to put a bag over that personality.","I'm not a nerd. I'm just smarter than you.","Bye. Hope to see you never.","Don't worry, the first 40 years of childhood are always the hardest.","If you're going to be two-faced, at least make one of them pretty.","The only way you'd ever get hurt during an activity is if the TV exploded.","I thought of you today. It reminded me to take out the trash.","Did the mental hospital test too many drugs on you today?","OH MY GOD! IT SPEAKS!","Beauty is only skin deep, but ugly goes clean to the bone.","I forgot the world revolves around you. My apologies, how silly of me.","When you look in the mirror, say hi to the clown you see in there for me, would you?","Somewhere out there is a tree tirelessly producing oxygen for you. You owe it an apology.","That sounds like a you problem.","You have miles to go before you reach mediocre.","I see no evil, and I definitely don't hear your evil.","Don't worry about me. Worry about your eyebrows.","Grab a straw, because you suck.","You're the reason the gene pool needs a lifeguard.","You are not even beneath my contempt.","Your forehead is so big you donated it to charity for shelter!","You're as sharp as a bowling ball.","You always find yourself lost in thought; it's unfamiliar territory.","You're so ugly, you scared the crap out of the toilet.","If I had a dollar for every time you said something smart, I'd be broke.","Look to your left --------------> I said left you idiot!","When you go to the beach, your family will bury you in the sand, secretly hoping you'll stay there","You have the face of a seahorse","You have the face of mashed potatoes","At this point, you've probably become self-aware of how bad you are. That's just sad","I forgot the world revolves around you. My apologies! How silly of me.","If I throw a stick, will you leave?","Oh, I'm sorry, I didn't know you had the authority to judge me. Who are you? God?","If common sense is common, why are you without it?","You're so ugly, you scared the crap out of the toilet.","I'm sorry if you don't like my honesty, but to be fair, I don't like your lies.","It's better to let someone think you are an Idiot than to open your mouth and prove it.","I would roast you but my mom told me not to burn trash.","You should really come with a warning label.","Remember when I asked for your opinion? Me neither.","Have a nice day\u2026somewhere else!","No one noticed when you left; that's how insignificant you are.","You're about as sharp as a bowling ball.","So much for allowing the stream of knowledge to rain down on you.","I guess you prove that even God makes mistakes sometimes.","Can we normalize telling you that you aren't so wonderful?","Talking to you is like stepping on a leaf in autumn and hearing no crunch. So disappointing.","I envy everyone you have never met.","Don't feel bad, don't feel blue, Frankenstein was ugly too!","Everyone\u2019s entitled to act stupid once in a while, but you really abuse the privilege."];var Sa="./assets/dmv-logo.a72e79b2.png";function Aa(t){let e,n,o,r,i,s,a,u,l,c;return{c(){e=I("main"),n=I("img"),r=Y(),i=I("div"),s=Y(),a=I("p"),u=xn(t[0]),$n(n.src,o=Sa)||y(n,"src",o),y(n,"alt","large, red button"),y(n,"class","p-4 svelte-10glyuv"),y(i,"class","sm:p-3 md:p-4 lg:p-5 xl:p-6"),y(a,"class","text-center font-primary")},m(d,h){C(d,e,h),b(e,n),b(e,r),b(e,i),b(e,s),b(e,a),b(a,u),l||(c=Yt(n,"click",t[1]),l=!0)},p(d,[h]){h&1&&ar(u,d[0])},i:K,o:K,d(d){d&&P(e),l=!1,c()}}}function Oa(t,e,n){const r=Le().currentUser;r!==null&&(r.displayName,r.email,r.photoURL,r.emailVerified,r.uid);let i="";return[i,()=>{r!=null?n(0,i=Sn[Math.floor(Math.random()*Sn.length)]):r==null&&n(0,i=An[Math.floor(Math.random()*An.length)])}]}class Ra extends Ue{constructor(e){super(),xe(this,e,Oa,Aa,$e,{})}}let Ca=navigator.userAgent;const Pa=({ua:t})=>{if(t.indexOf("Opera")>-1)return"Opera";if(t.indexOf("Chrome")>-1)return"Chrome";if(t.indexOf("Firefox")>-1)return"Firefox";if(t.indexOf("Safari")>-1)return"Safari";if(t.indexOf("MSIE")>-1)return"IE";if(t.indexOf("Trident")>-1)return"IE";if(t.indexOf("Edge")>-1)return"Edge";console.error("ERR: Browser can not be determined (UAD_101)")};let we=Pa({ua:Ca}),Da=window.navigator.appCodeName;const Na=t=>t==="Mozilla"?"mozilla":t==="Microsoft"?"Microsoft":t==="Apple Computer, Inc."?"Apple":t==="Google Inc."?"Google":(console.error("Unknown appCodeName (UAD_1601)"),"Unknown");Na(Da);let Ma=navigator.cookieEnabled;const Ya=t=>t===!0?"COOKIES_enabled":t===!1?"COOKIES_notEnabled":(console.error("ERR: Cookie status can not be determined (UAD_201)"),"ERROR");Ya(Ma);function La(){const t=navigator.userAgent;return/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(t)?"tablet":/(iPhone|iPod|iPad)/i.test(t)||/(android)/i.test(t)||/(windows phone)/i.test(t)||/(blackberry)/i.test(t)||/(bb10)/i.test(t)||/(opera mini)/i.test(t)||/(opera mobi)/i.test(t)||/(iemobile)/i.test(t)||/(symbian)/i.test(t)||/(maemo)/i.test(t)||/(webos)/i.test(t)||/(mobile)/i.test(t)||/(tablet)/i.test(t)||/(symbianos)/i.test(t)||/(up.browser)/i.test(t)||/(up.link)/i.test(t)||/(mmp)/i.test(t)||/(symbianos)/i.test(t)||/(midp)/i.test(t)||/(wap)/i.test(t)||/(phone)/i.test(t)||/(pocket)/i.test(t)||/(mobile)/i.test(t)||/(pda)/i.test(t)||/(avantgo)/i.test(t)||/(eudoraweb)/i.test(t)||/(brew)|(bada)/i.test(t)||/(blackberry)/i.test(t)||/(hpwos)/i.test(t)||/(kindle)/i.test(t)||/(lge.netcast)/i.test(t)||/(lg;lx)|(lg;lx)/i.test(t)||/(lge.netcast)/i.test(t)||/(nintendo.3ds)/i.test(t)||/(nintendo.ds)/i.test(t)||/(nintendo.wiiu)/i.test(t)||/(nintendo.wii)/i.test(t)||/(playstation.3ds)/i.test(t)||/(playstation.ds)/i.test(t)||/(playstation.wiiu)/i.test(t)||/(playstation.wii)/i.test(t)||/(webos)/i.test(t)?"mobile":"desktop"}let kt=La(),Ua=navigator.doNotTrack;const xa=t=>t==0?"TRACKING_allowed":t==1?"TRACKING_notAllowed":t=="unspecified"||t=="null"?"TRACKING_unspecified":(console.error("Unknown doNotTrack value(UAD_801)"),"ERROR");xa(Ua);function $a(){const t=navigator.userAgent;return/(iPhone|iPod|iPad)/i.test(t)?(console.log("iOS"),"iOS"):/Android/i.test(t)?(console.log("Android"),"Android"):/BlackBerry/i.test(t)?(console.log("BlackBerry"),"BlackBerry"):/Windows Phone/i.test(t)?(console.log("Windows Phone"),"Windows Phone"):/webOS/i.test(t)?(console.log("webOS"),"webOS"):(console.error("Unknown device type(UAD_601)"),"Unknown")}$a();const Re=()=>navigator.hardwareConcurrency,Ba=()=>{if(we==="Chrome"||we==="Edge"||we==="Firefox"||(we==="IE"&&console.error("Not supported on this browser(UAD_1301)"),we==="Opera")||we==="Safari")return Re();console.error("Not supported on this browser(UAD_1301)")};Ba();let Fa=window.navigator;const ja=t=>[{name:"appCodeName",value:t.appCodeName},{name:"appName",value:t.appName},{name:"appVersion",value:t.appVersion},{name:"cookieEnabled",value:t.cookieEnabled},{name:"doNotTrack",value:t.doNotTrack},{name:"geolocation",value:t.geolocation},{name:"language",value:t.language},{name:"onLine",value:t.onLine},{name:"platform",value:t.platform},{name:"product",value:t.product},{name:"userAgent",value:t.userAgent},{name:"vendor",value:t.vendor},{name:"vendorSub",value:t.vendorSub},{name:"webdriver",value:t.webdriver}];ja(Fa);const Wa=({ua:t})=>t.indexOf("Windows")>-1?"Windows":t.indexOf("Mac")>-1?"Mac":t.indexOf("Linux")>-1?"Linux":t.indexOf("Android")>-1?"Android":t.indexOf("iPhone")>-1||t.indexOf("iPad")>-1||t.indexOf("iPod")>-1?"iOS":(console.error("Unknown Operating System(UAD_1101)"),"Unknown");Wa({ua:navigator.userAgent});let On=!0;const Ha=()=>(On=window.innerHeight<=window.innerWidth,On);window.addEventListener("resize",Ha);let Va=window.navigator.product;const za=t=>t==="Gecko"?"Gecko":t==="WebKit"?"WebKit":t==="Trident"?"Trident":t==="Presto"?"Presto":(console.error("Unknown engine (UAD_1702)"),"Other");za(Va);let Ga=window.navigator.appVersion;const qa=t=>t in navigator?t:(console.error("No app version detected. (UAD_1801)"),"Unknown");qa(Ga);const Do="@firebase/installations",Kt="0.5.12";/**
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
 */const No=1e4,Mo=`w:${Kt}`,Yo="FIS_v2",Ka="https://firebaseinstallations.googleapis.com/v1",Ja=60*60*1e3,Xa="installations",Qa="Installations";/**
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
 */const Za={["missing-app-config-values"]:'Missing App configuration value: "{$valueName}"',["not-registered"]:"Firebase Installation is not registered.",["installation-not-found"]:"Firebase Installation not found.",["request-failed"]:'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',["app-offline"]:"Could not process request. Application offline.",["delete-pending-registration"]:"Can't delete installation while there is a pending registration request."},he=new pe(Xa,Qa,Za);function Lo(t){return t instanceof ie&&t.code.includes("request-failed")}/**
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
 */function Uo({projectId:t}){return`${Ka}/projects/${t}/installations`}function xo(t){return{token:t.token,requestStatus:2,expiresIn:tu(t.expiresIn),creationTime:Date.now()}}async function $o(t,e){const o=(await e.json()).error;return he.create("request-failed",{requestName:t,serverCode:o.code,serverMessage:o.message,serverStatus:o.status})}function Bo({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function eu(t,{refreshToken:e}){const n=Bo(t);return n.append("Authorization",nu(e)),n}async function Fo(t){const e=await t();return e.status>=500&&e.status<600?t():e}function tu(t){return Number(t.replace("s","000"))}function nu(t){return`${Yo} ${t}`}/**
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
 */async function ou({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const o=Uo(t),r=Bo(t),i=e.getImmediate({optional:!0});if(i){const l=await i.getHeartbeatsHeader();l&&r.append("x-firebase-client",l)}const s={fid:n,authVersion:Yo,appId:t.appId,sdkVersion:Mo},a={method:"POST",headers:r,body:JSON.stringify(s)},u=await Fo(()=>fetch(o,a));if(u.ok){const l=await u.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:xo(l.authToken)}}else throw await $o("Create Installation",u)}/**
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
 */function jo(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */function ru(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const iu=/^[cdef][\w-]{21}$/,Mt="";function su(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=au(t);return iu.test(n)?n:Mt}catch{return Mt}}function au(t){return ru(t).substr(0,22)}/**
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
 */const Wo=new Map;function Ho(t,e){const n=ht(t);Vo(n,e),uu(n,e)}function Vo(t,e){const n=Wo.get(t);if(!!n)for(const o of n)o(e)}function uu(t,e){const n=lu();n&&n.postMessage({key:t,fid:e}),cu()}let ue=null;function lu(){return!ue&&"BroadcastChannel"in self&&(ue=new BroadcastChannel("[Firebase] FID Change"),ue.onmessage=t=>{Vo(t.data.key,t.data.fid)}),ue}function cu(){Wo.size===0&&ue&&(ue.close(),ue=null)}/**
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
 */const du="firebase-installations-database",hu=1,fe="firebase-installations-store";let Tt=null;function Jt(){return Tt||(Tt=Xn(du,hu,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(fe)}}})),Tt}async function ot(t,e){const n=ht(t),r=(await Jt()).transaction(fe,"readwrite"),i=r.objectStore(fe),s=await i.get(n);return await i.put(e,n),await r.done,(!s||s.fid!==e.fid)&&Ho(t,e.fid),e}async function zo(t){const e=ht(t),o=(await Jt()).transaction(fe,"readwrite");await o.objectStore(fe).delete(e),await o.done}async function ft(t,e){const n=ht(t),r=(await Jt()).transaction(fe,"readwrite"),i=r.objectStore(fe),s=await i.get(n),a=e(s);return a===void 0?await i.delete(n):await i.put(a,n),await r.done,a&&(!s||s.fid!==a.fid)&&Ho(t,a.fid),a}/**
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
 */async function Xt(t){let e;const n=await ft(t.appConfig,o=>{const r=fu(o),i=pu(t,r);return e=i.registrationPromise,i.installationEntry});return n.fid===Mt?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function fu(t){const e=t||{fid:su(),registrationStatus:0};return Go(e)}function pu(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const r=Promise.reject(he.create("app-offline"));return{installationEntry:e,registrationPromise:r}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},o=mu(t,n);return{installationEntry:n,registrationPromise:o}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:yu(t)}:{installationEntry:e}}async function mu(t,e){try{const n=await ou(t,e);return ot(t.appConfig,n)}catch(n){throw Lo(n)&&n.customData.serverCode===409?await zo(t.appConfig):await ot(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function yu(t){let e=await Rn(t.appConfig);for(;e.registrationStatus===1;)await jo(100),e=await Rn(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:o}=await Xt(t);return o||n}return e}function Rn(t){return ft(t,e=>{if(!e)throw he.create("installation-not-found");return Go(e)})}function Go(t){return gu(t)?{fid:t.fid,registrationStatus:0}:t}function gu(t){return t.registrationStatus===1&&t.registrationTime+No<Date.now()}/**
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
 */async function bu({appConfig:t,heartbeatServiceProvider:e},n){const o=wu(t,n),r=eu(t,n),i=e.getImmediate({optional:!0});if(i){const l=await i.getHeartbeatsHeader();l&&r.append("x-firebase-client",l)}const s={installation:{sdkVersion:Mo,appId:t.appId}},a={method:"POST",headers:r,body:JSON.stringify(s)},u=await Fo(()=>fetch(o,a));if(u.ok){const l=await u.json();return xo(l)}else throw await $o("Generate Auth Token",u)}function wu(t,{fid:e}){return`${Uo(t)}/${e}/authTokens:generate`}/**
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
 */async function Qt(t,e=!1){let n;const o=await ft(t.appConfig,i=>{if(!qo(i))throw he.create("not-registered");const s=i.authToken;if(!e&&_u(s))return i;if(s.requestStatus===1)return n=vu(t,e),i;{if(!navigator.onLine)throw he.create("app-offline");const a=Tu(i);return n=Iu(t,a),a}});return n?await n:o.authToken}async function vu(t,e){let n=await Cn(t.appConfig);for(;n.authToken.requestStatus===1;)await jo(100),n=await Cn(t.appConfig);const o=n.authToken;return o.requestStatus===0?Qt(t,e):o}function Cn(t){return ft(t,e=>{if(!qo(e))throw he.create("not-registered");const n=e.authToken;return Eu(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function Iu(t,e){try{const n=await bu(t,e),o=Object.assign(Object.assign({},e),{authToken:n});return await ot(t.appConfig,o),n}catch(n){if(Lo(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await zo(t.appConfig);else{const o=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await ot(t.appConfig,o)}throw n}}function qo(t){return t!==void 0&&t.registrationStatus===2}function _u(t){return t.requestStatus===2&&!ku(t)}function ku(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+Ja}function Tu(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function Eu(t){return t.requestStatus===1&&t.requestTime+No<Date.now()}/**
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
 */async function Su(t){const e=t,{installationEntry:n,registrationPromise:o}=await Xt(e);return o?o.catch(console.error):Qt(e).catch(console.error),n.fid}/**
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
 */async function Au(t,e=!1){const n=t;return await Ou(n),(await Qt(n,e)).token}async function Ou(t){const{registrationPromise:e}=await Xt(t);e&&await e}/**
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
 */function Ru(t){if(!t||!t.options)throw Et("App Configuration");if(!t.name)throw Et("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Et(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Et(t){return he.create("missing-app-config-values",{valueName:t})}/**
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
 */const Ko="installations",Cu="installations-internal",Pu=t=>{const e=t.getProvider("app").getImmediate(),n=Ru(e),o=Se(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:o,_delete:()=>Promise.resolve()}},Du=t=>{const e=t.getProvider("app").getImmediate(),n=Se(e,Ko).getImmediate();return{getId:()=>Su(n),getToken:r=>Au(n,r)}};function Nu(){J(new W(Ko,Pu,"PUBLIC")),J(new W(Cu,Du,"PRIVATE"))}Nu();B(Do,Kt);B(Do,Kt,"esm2017");/**
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
 */const rt="analytics",Mu="firebase_id",Yu="origin",Lu=60*1e3,Uu="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Jo="https://www.googletagmanager.com/gtag/js";/**
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
 */const A=new Lt("@firebase/analytics");/**
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
 */function Xo(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function xu(t,e){const n=document.createElement("script");n.src=`${Jo}?l=${t}&id=${e}`,n.async=!0,document.head.appendChild(n)}function $u(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function Bu(t,e,n,o,r,i){const s=o[r];try{if(s)await e[s];else{const u=(await Xo(n)).find(l=>l.measurementId===r);u&&await e[u.appId]}}catch(a){A.error(a)}t("config",r,i)}async function Fu(t,e,n,o,r){try{let i=[];if(r&&r.send_to){let s=r.send_to;Array.isArray(s)||(s=[s]);const a=await Xo(n);for(const u of s){const l=a.find(d=>d.measurementId===u),c=l&&e[l.appId];if(c)i.push(c);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),t("event",o,r||{})}catch(i){A.error(i)}}function ju(t,e,n,o){async function r(i,s,a){try{i==="event"?await Fu(t,e,n,s,a):i==="config"?await Bu(t,e,n,o,s,a):i==="consent"?t("consent","update",a):t("set",s)}catch(u){A.error(u)}}return r}function Wu(t,e,n,o,r){let i=function(...s){window[o].push(arguments)};return window[r]&&typeof window[r]=="function"&&(i=window[r]),window[r]=ju(i,t,e,n),{gtagCore:i,wrappedGtag:window[r]}}function Hu(){const t=window.document.getElementsByTagName("script");for(const e of Object.values(t))if(e.src&&e.src.includes(Jo))return e;return null}/**
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
 */const Vu={["already-exists"]:"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.",["already-initialized"]:"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.",["already-initialized-settings"]:"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.",["interop-component-reg-failed"]:"Firebase Analytics Interop Component failed to instantiate: {$reason}",["invalid-analytics-context"]:"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",["indexeddb-unavailable"]:"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",["fetch-throttle"]:"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.",["config-fetch-failed"]:"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}",["no-api-key"]:'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',["no-app-id"]:'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.'},R=new pe("analytics","Analytics",Vu);/**
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
 */const zu=30,Gu=1e3;class qu{constructor(e={},n=Gu){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Qo=new qu;function Ku(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function Ju(t){var e;const{appId:n,apiKey:o}=t,r={method:"GET",headers:Ku(o)},i=Uu.replace("{app-id}",n),s=await fetch(i,r);if(s.status!==200&&s.status!==304){let a="";try{const u=await s.json();!((e=u.error)===null||e===void 0)&&e.message&&(a=u.error.message)}catch{}throw R.create("config-fetch-failed",{httpStatus:s.status,responseMessage:a})}return s.json()}async function Xu(t,e=Qo,n){const{appId:o,apiKey:r,measurementId:i}=t.options;if(!o)throw R.create("no-app-id");if(!r){if(i)return{measurementId:i,appId:o};throw R.create("no-api-key")}const s=e.getThrottleMetadata(o)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new el;return setTimeout(async()=>{a.abort()},n!==void 0?n:Lu),Zo({appId:o,apiKey:r,measurementId:i},s,a,e)}async function Zo(t,{throttleEndTimeMillis:e,backoffCount:n},o,r=Qo){var i,s;const{appId:a,measurementId:u}=t;try{await Qu(o,e)}catch(l){if(u)return A.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${u} provided in the "measurementId" field in the local Firebase config. [${(i=l)===null||i===void 0?void 0:i.message}]`),{appId:a,measurementId:u};throw l}try{const l=await Ju(t);return r.deleteThrottleMetadata(a),l}catch(l){const c=l;if(!Zu(c)){if(r.deleteThrottleMetadata(a),u)return A.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${u} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:a,measurementId:u};throw l}const d=Number((s=c==null?void 0:c.customData)===null||s===void 0?void 0:s.httpStatus)===503?nn(n,r.intervalMillis,zu):nn(n,r.intervalMillis),h={throttleEndTimeMillis:Date.now()+d,backoffCount:n+1};return r.setThrottleMetadata(a,h),A.debug(`Calling attemptFetch again in ${d} millis`),Zo(t,h,o,r)}}function Qu(t,e){return new Promise((n,o)=>{const r=Math.max(e-Date.now(),0),i=setTimeout(n,r);t.addEventListener(()=>{clearTimeout(i),o(R.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function Zu(t){if(!(t instanceof ie)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class el{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function tl(t,e,n,o,r){if(r&&r.global){t("event",n,o);return}else{const i=await e,s=Object.assign(Object.assign({},o),{send_to:i});t("event",n,s)}}/**
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
 */async function nl(){var t;if(Gn())try{await qn()}catch(e){return A.warn(R.create("indexeddb-unavailable",{errorInfo:(t=e)===null||t===void 0?void 0:t.toString()}).message),!1}else return A.warn(R.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function ol(t,e,n,o,r,i,s){var a;const u=Xu(t);u.then(p=>{n[p.measurementId]=p.appId,t.options.measurementId&&p.measurementId!==t.options.measurementId&&A.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${p.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(p=>A.error(p)),e.push(u);const l=nl().then(p=>{if(p)return o.getId()}),[c,d]=await Promise.all([u,l]);Hu()||xu(i,c.measurementId),r("js",new Date);const h=(a=s==null?void 0:s.config)!==null&&a!==void 0?a:{};return h[Yu]="firebase",h.update=!0,d!=null&&(h[Mu]=d),r("config",c.measurementId,h),c.measurementId}/**
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
 */class rl{constructor(e){this.app=e}_delete(){return delete Pe[this.app.options.appId],Promise.resolve()}}let Pe={},Pn=[];const Dn={};let St="dataLayer",il="gtag",Nn,er,Mn=!1;function sl(){const t=[];if(zn()&&t.push("This is a browser extension environment."),br()||t.push("Cookies are not available."),t.length>0){const e=t.map((o,r)=>`(${r+1}) ${o}`).join(" "),n=R.create("invalid-analytics-context",{errorInfo:e});A.warn(n.message)}}function al(t,e,n){sl();const o=t.options.appId;if(!o)throw R.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)A.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw R.create("no-api-key");if(Pe[o]!=null)throw R.create("already-exists",{id:o});if(!Mn){$u(St);const{wrappedGtag:i,gtagCore:s}=Wu(Pe,Pn,Dn,St,il);er=i,Nn=s,Mn=!0}return Pe[o]=ol(t,Pn,Dn,e,Nn,St,n),new rl(t)}function tr(t=Zn()){t=me(t);const e=Se(t,rt);return e.isInitialized()?e.getImmediate():ul(t)}function ul(t,e={}){const n=Se(t,rt);if(n.isInitialized()){const r=n.getImmediate();if(De(e,n.getOptions()))return r;throw R.create("already-initialized")}return n.initialize({options:e})}function ll(t,e,n,o){t=me(t),tl(er,Pe[t.app.options.appId],e,n,o).catch(r=>A.error(r))}const Yn="@firebase/analytics",Ln="0.8.0";function cl(){J(new W(rt,(e,{options:n})=>{const o=e.getProvider("app").getImmediate(),r=e.getProvider("installations-internal").getImmediate();return al(o,r,n)},"PUBLIC")),J(new W("analytics-internal",t,"PRIVATE")),B(Yn,Ln),B(Yn,Ln,"esm2017");function t(e){try{const n=e.getProvider(rt).getImmediate();return{logEvent:(o,r,i)=>ll(n,o,r,i)}}catch(n){throw R.create("interop-component-reg-failed",{reason:n})}}}cl();function dl(t){let e,n,o;return{c(){e=I("button"),e.innerHTML="<p>Sign In</p>  <br/>",y(e,"class","flex justify-between content-center bg-white text-black p-4 rounded-lg")},m(r,i){C(r,e,i),n||(o=Yt(e,"click",t[0]),n=!0)},p:K,d(r){r&&P(e),n=!1,o()}}}function hl(t){let e,n,o,r;return{c(){e=I("button"),n=I("p"),n.textContent=`Sign Out ${t[2].displayName}`,y(e,"class","flex justify-between content-center bg-white text-black p-4 rounded-lg")},m(i,s){C(i,e,s),b(e,n),o||(r=Yt(e,"click",t[1]),o=!0)},p:K,d(i){i&&P(e),o=!1,r()}}}function fl(t){let e;function n(i,s){if(i[2]!==null)return hl;if(i[2]==null)return dl}let o=n(t),r=o&&o(t);return{c(){r&&r.c(),e=st()},m(i,s){r&&r.m(i,s),C(i,e,s)},p(i,[s]){r&&r.p(i,s)},i:K,o:K,d(i){r&&r.d(i),i&&P(e)}}}function pl(t,e,n){const r=$t({apiKey:"AIzaSyBXQIdxhaZk2jEh7Kgkui4OG0WUsIHyWgk",authDomain:"demotivator-3cf4d.firebaseapp.com",projectId:"demotivator-3cf4d",storageBucket:"demotivator-3cf4d.appspot.com",messagingSenderId:"230067629772",appId:"1:230067629772:web:682830de35cc6b7be91c69",measurementId:"G-T182ZXMZM1"});tr(r);const i=Le();let{loggedIn:s=!1}=e;const a=new M,u=()=>{const d=Le();Us(d,a).then(h=>{M.credentialFromResult(h).accessToken,h.user}).catch(h=>{h.code,h.message,h.customData.email,M.credentialFromError(h)})},l=i.currentUser;l!==null&&(l.displayName,l.email,l.photoURL,l.emailVerified,l.uid);const c=d=>{fs(d).then(()=>{n(3,s=!1)}).catch(h=>{alert(`An Error Occured. Here is the error: ${h}`)})};return t.$$set=d=>{"loggedIn"in d&&n(3,s=d.loggedIn)},[u,c,l,s]}class ml extends Ue{constructor(e){super(),xe(this,e,pl,fl,$e,{loggedIn:3,loginFunction:0,logoutFunction:1})}get loginFunction(){return this.$$.ctx[0]}get logoutFunction(){return this.$$.ctx[1]}}function yl(t){let e;return{c(){e=I("div"),e.innerHTML='<div class="pb-24"></div>',y(e,"class","pb-96")},m(n,o){C(n,e,o)},d(n){n&&P(e)}}}function gl(t){let e,n,o,r,i,s,a,u,l,c,d,h,p,T,D,U;return D=new ml({}),{c(){e=I("main"),n=I("div"),o=I("div"),r=I("a"),i=I("img"),a=Y(),u=I("div"),l=I("p"),l.textContent="a PorkyProductions product",c=Y(),d=I("a"),d.textContent="(de)Motivator 1.0",h=Y(),p=I("a"),p.textContent="(de)Motivator.js",T=Y(),ve(D.$$.fragment),$n(i.src,s=ur)||y(i,"src",s),y(i,"alt","hedgehog"),y(i,"class","text-center m-auto hover:bg-indigo-400 dark:hover:bg-orange-700 hover:rounded-xl svelte-phjqkc"),y(r,"href","https://porkyproductions.github.io"),y(r,"class","hover:bg-indigo-400 dark:hover:bg-orange-700 hover:rounded-xl"),y(l,"class","text-white "),y(d,"class","text-white hover:bg-indigo-400 dark:hover:bg-orange-700 hover:rounded-xl"),y(d,"href","dmv1.html"),y(p,"class","text-white hover:bg-indigo-400 dark:hover:bg-orange-700 hover:rounded-xl"),y(p,"href","http://github.com/PorkyProductions/deMotivator.js"),y(u,"class","flex justify-between content-center pl-56 pr-80"),y(n,"class","font-semibold text-2xl"),y(e,"class","bg-primary-majorelleBlue dark:bg-secondary-orangePantone rounded-t-xl")},m(S,ye){C(S,e,ye),b(e,n),b(n,o),b(o,r),b(r,i),b(n,a),b(n,u),b(u,l),b(u,c),b(u,d),b(u,h),b(u,p),b(u,T),Ie(D,u,null),U=!0},p:K,i(S){U||(O(D.$$.fragment,S),U=!0)},o(S){L(D.$$.fragment,S),U=!1},d(S){S&&P(e),_e(D)}}}function bl(t){let e,n,o,r=kt==="mobile"&&yl(),i=kt==="desktop"&&gl();return{c(){r&&r.c(),e=Y(),i&&i.c(),n=st()},m(s,a){r&&r.m(s,a),C(s,e,a),i&&i.m(s,a),C(s,n,a),o=!0},p(s,[a]){kt==="desktop"&&i.p(s,a)},i(s){o||(O(i),o=!0)},o(s){L(i),o=!1},d(s){r&&r.d(s),s&&P(e),i&&i.d(s),s&&P(n)}}}class wl extends Ue{constructor(e){super(),xe(this,e,null,bl,$e,{})}}function Un(t){let e,n;return e=new lr({}),{c(){ve(e.$$.fragment)},m(o,r){Ie(e,o,r),n=!0},i(o){n||(O(e.$$.fragment,o),n=!0)},o(o){L(e.$$.fragment,o),n=!1},d(o){_e(e,o)}}}function vl(t){let e,n,o=!t[0]&&Un();return{c(){o&&o.c(),e=st()},m(r,i){o&&o.m(r,i),C(r,e,i),n=!0},p(r,[i]){r[0]?o&&(Bn(),L(o,1,1,()=>{o=null}),Fn()):o?i&1&&O(o,1):(o=Un(),o.c(),O(o,1),o.m(e.parentNode,e))},i(r){n||(O(o),n=!0)},o(r){L(o),n=!1},d(r){o&&o.d(r),r&&P(e)}}}function Il(t,e,n){let o=!1;const r=setTimeout(()=>n(0,o=!0),1e3);return jn(()=>clearTimeout(r)),[o]}class _l extends Ue{constructor(e){super(),xe(this,e,Il,vl,$e,{})}}/*! Capacitor: https://capacitorjs.com/ - MIT License */const kl=t=>{const e=new Map;e.set("web",{name:"web"});const n=t.CapacitorPlatforms||{currentPlatform:{name:"web"},platforms:e},o=(i,s)=>{n.platforms.set(i,s)},r=i=>{n.platforms.has(i)&&(n.currentPlatform=n.platforms.get(i))};return n.addPlatform=o,n.setPlatform=r,n},Tl=t=>t.CapacitorPlatforms=kl(t),nr=Tl(typeof globalThis!="undefined"?globalThis:typeof self!="undefined"?self:typeof window!="undefined"?window:typeof global!="undefined"?global:{});nr.addPlatform;nr.setPlatform;var it;(function(t){t.Unimplemented="UNIMPLEMENTED",t.Unavailable="UNAVAILABLE"})(it||(it={}));class At extends Error{constructor(e,n,o){super(e),this.message=e,this.code=n,this.data=o}}const El=t=>{var e,n;return t!=null&&t.androidBridge?"android":!((n=(e=t==null?void 0:t.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||n===void 0)&&n.bridge?"ios":"web"},Sl=t=>{var e,n,o,r,i;const s=t.CapacitorCustomPlatform||null,a=t.Capacitor||{},u=a.Plugins=a.Plugins||{},l=t.CapacitorPlatforms,c=()=>s!==null?s.name:El(t),d=((e=l==null?void 0:l.currentPlatform)===null||e===void 0?void 0:e.getPlatform)||c,h=()=>d()!=="web",p=((n=l==null?void 0:l.currentPlatform)===null||n===void 0?void 0:n.isNativePlatform)||h,T=w=>{const v=ge.get(w);return!!(v!=null&&v.platforms.has(d())||S(w))},D=((o=l==null?void 0:l.currentPlatform)===null||o===void 0?void 0:o.isPluginAvailable)||T,U=w=>{var v;return(v=a.PluginHeaders)===null||v===void 0?void 0:v.find(x=>x.name===w)},S=((r=l==null?void 0:l.currentPlatform)===null||r===void 0?void 0:r.getPluginHeader)||U,ye=w=>t.console.error(w),Ae=(w,v,x)=>Promise.reject(`${x} does not have an implementation of "${v}".`),ge=new Map,He=(w,v={})=>{const x=ge.get(w);if(x)return console.warn(`Capacitor plugin "${w}" already registered. Cannot register plugins twice.`),x.proxy;const V=d(),be=S(w);let z;const rr=async()=>(!z&&V in v?z=typeof v[V]=="function"?z=await v[V]():z=v[V]:s!==null&&!z&&"web"in v&&(z=typeof v.web=="function"?z=await v.web():z=v.web),z),ir=(_,E)=>{var $,Q;if(be){const Z=be==null?void 0:be.methods.find(N=>E===N.name);if(Z)return Z.rtype==="promise"?N=>a.nativePromise(w,E.toString(),N):(N,Ve)=>a.nativeCallback(w,E.toString(),N,Ve);if(_)return($=_[E])===null||$===void 0?void 0:$.bind(_)}else{if(_)return(Q=_[E])===null||Q===void 0?void 0:Q.bind(_);throw new At(`"${w}" plugin is not implemented on ${V}`,it.Unimplemented)}},pt=_=>{let E;const $=(...Q)=>{const Z=rr().then(N=>{const Ve=ir(N,_);if(Ve){const ze=Ve(...Q);return E=ze==null?void 0:ze.remove,ze}else throw new At(`"${w}.${_}()" is not implemented on ${V}`,it.Unimplemented)});return _==="addListener"&&(Z.remove=async()=>E()),Z};return $.toString=()=>`${_.toString()}() { [capacitor code] }`,Object.defineProperty($,"name",{value:_,writable:!1,configurable:!1}),$},Zt=pt("addListener"),en=pt("removeListener"),sr=(_,E)=>{const $=Zt({eventName:_},E),Q=async()=>{const N=await $;en({eventName:_,callbackId:N},E)},Z=new Promise(N=>$.then(()=>N({remove:Q})));return Z.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await Q()},Z},mt=new Proxy({},{get(_,E){switch(E){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return be?sr:Zt;case"removeListener":return en;default:return pt(E)}}});return u[w]=mt,ge.set(w,{name:w,proxy:mt,platforms:new Set([...Object.keys(v),...be?[V]:[]])}),mt},Oe=((i=l==null?void 0:l.currentPlatform)===null||i===void 0?void 0:i.registerPlugin)||He;return a.convertFileSrc||(a.convertFileSrc=w=>w),a.getPlatform=d,a.handleError=ye,a.isNativePlatform=p,a.isPluginAvailable=D,a.pluginMethodNoop=Ae,a.registerPlugin=Oe,a.Exception=At,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a.platform=a.getPlatform(),a.isNative=a.isNativePlatform(),a},Al=t=>t.Capacitor=Sl(t),or=Al(typeof globalThis!="undefined"?globalThis:typeof self!="undefined"?self:typeof window!="undefined"?window:typeof global!="undefined"?global:{});or.registerPlugin;or.Plugins;function Ol(t){let e,n,o,r,i,s,a,u,l,c,d;n=new cr({}),r=new Ra({}),l=new wl({});let h=t[1]!==null&&Cl(t);return{c(){e=I("div"),ve(n.$$.fragment),o=Y(),ve(r.$$.fragment),i=Y(),s=I("div"),a=Y(),u=I("div"),ve(l.$$.fragment),c=Y(),h&&h.c(),y(s,"class","sm:p-3 md:p-4 lg:p-5 xl:p-20"),y(u,"id","footer"),y(u,"class",""),y(e,"class","dark:bg-black dark:text-white"),y(e,"id","app")},m(p,T){C(p,e,T),Ie(n,e,null),b(e,o),Ie(r,e,null),b(e,i),b(e,s),b(e,a),b(e,u),Ie(l,u,null),b(u,c),h&&h.m(u,null),d=!0},p(p,T){p[1]!==null&&h.p(p,T)},i(p){d||(O(n.$$.fragment,p),O(r.$$.fragment,p),O(l.$$.fragment,p),d=!0)},o(p){L(n.$$.fragment,p),L(r.$$.fragment,p),L(l.$$.fragment,p),d=!1},d(p){p&&P(e),_e(n),_e(r),_e(l),h&&h.d()}}}function Rl(t){let e,n;return e=new _l({}),{c(){ve(e.$$.fragment)},m(o,r){Ie(e,o,r),n=!0},p:K,i(o){n||(O(e.$$.fragment,o),n=!0)},o(o){L(e.$$.fragment,o),n=!1},d(o){_e(e,o)}}}function Cl(t){let e=t[1].displayName+"",n;return{c(){n=xn(e)},m(o,r){C(o,n,r)},p:K,d(o){o&&P(n)}}}function Pl(t){let e,n,o,r;const i=[Rl,Ol],s=[];function a(u,l){return u[0]?1:0}return e=a(t),n=s[e]=i[e](t),{c(){n.c(),o=st()},m(u,l){s[e].m(u,l),C(u,o,l),r=!0},p(u,[l]){let c=e;e=a(u),e===c?s[e].p(u,l):(Bn(),L(s[c],1,1,()=>{s[c]=null}),Fn(),n=s[e],n?n.p(u,l):(n=s[e]=i[e](u),n.c()),O(n,1),n.m(o.parentNode,o))},i(u){r||(O(n),r=!0)},o(u){L(n),r=!1},d(u){s[e].d(u),u&&P(o)}}}function Dl(t,e,n){let o=!1;const r=setTimeout(()=>n(0,o=!0),1e3);jn(()=>clearTimeout(r));const s=$t({apiKey:"AIzaSyBXQIdxhaZk2jEh7Kgkui4OG0WUsIHyWgk",authDomain:"demotivator-3cf4d.firebaseapp.com",projectId:"demotivator-3cf4d",storageBucket:"demotivator-3cf4d.appspot.com",messagingSenderId:"230067629772",appId:"1:230067629772:web:682830de35cc6b7be91c69",measurementId:"G-T182ZXMZM1"});tr(s);const u=Le().currentUser;return u!==null&&(u.displayName,u.email,u.photoURL,u.emailVerified,u.uid),[o,u]}class Nl extends Ue{constructor(e){super(),xe(this,e,Dl,Pl,$e,{})}}new Nl({target:document.getElementById("app")});
