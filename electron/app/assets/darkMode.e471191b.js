import{S as it,i as at,s as ot,F as ct,e as lt,j as dt,G as ut,H as ft,I as gt,t as pt,a as ht,p as mt}from"./title.f2379721.js";import"./index.eedfbd67.js";import{r as U,_ as B,C as W,E as Ee,a as V,F as ke,o as wt,L as yt,b as _e,c as bt,d as vt,e as It,f as fe,h as Pt,v as At,j as Tt,i as Ct,g as Et}from"./index-0bb4da3b.c3565b46.js";const kt="modulepreload",_t=function(e){return"/"+e},ge={},ee=function(t,n,i){if(!n||n.length===0)return t();const s=document.getElementsByTagName("link");return Promise.all(n.map(r=>{if(r=_t(r),r in ge)return;ge[r]=!0;const a=r.endsWith(".css"),o=a?'[rel="stylesheet"]':"";if(!!i)for(let d=s.length-1;d>=0;d--){const u=s[d];if(u.href===r&&(!a||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${o}`))return;const c=document.createElement("link");if(c.rel=a?"stylesheet":kt,a||(c.as="script",c.crossOrigin=""),c.href=r,document.head.appendChild(c),a)return new Promise((d,u)=>{c.addEventListener("load",d),c.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>t())};/*! Capacitor: https://capacitorjs.com/ - MIT License */const St=e=>{const t=new Map;t.set("web",{name:"web"});const n=e.CapacitorPlatforms||{currentPlatform:{name:"web"},platforms:t},i=(r,a)=>{n.platforms.set(r,a)},s=r=>{n.platforms.has(r)&&(n.currentPlatform=n.platforms.get(r))};return n.addPlatform=i,n.setPlatform=s,n},Rt=e=>e.CapacitorPlatforms=St(e),Se=Rt(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});Se.addPlatform;Se.setPlatform;var D;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(D||(D={}));class te extends Error{constructor(t,n,i){super(t),this.message=t,this.code=n,this.data=i}}const Ot=e=>{var t,n;return e!=null&&e.androidBridge?"android":!((n=(t=e==null?void 0:e.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||n===void 0)&&n.bridge?"ios":"web"},Lt=e=>{var t,n,i,s,r;const a=e.CapacitorCustomPlatform||null,o=e.Capacitor||{},l=o.Plugins=o.Plugins||{},c=e.CapacitorPlatforms,d=()=>a!==null?a.name:Ot(e),u=((t=c==null?void 0:c.currentPlatform)===null||t===void 0?void 0:t.getPlatform)||d,w=()=>u()!=="web",b=((n=c==null?void 0:c.currentPlatform)===null||n===void 0?void 0:n.isNativePlatform)||w,Y=g=>{const p=M.get(g);return!!(p!=null&&p.platforms.has(u())||P(g))},J=((i=c==null?void 0:c.currentPlatform)===null||i===void 0?void 0:i.isPluginAvailable)||Y,f=g=>{var p;return(p=o.PluginHeaders)===null||p===void 0?void 0:p.find($=>$.name===g)},P=((s=c==null?void 0:c.currentPlatform)===null||s===void 0?void 0:s.getPluginHeader)||f,L=g=>e.console.error(g),T=(g,p,$)=>Promise.reject(`${$} does not have an implementation of "${p}".`),M=new Map,X=(g,p={})=>{const $=M.get(g);if($)return console.warn(`Capacitor plugin "${g}" already registered. Cannot register plugins twice.`),$.proxy;const _=u(),j=P(g);let C;const nt=async()=>(!C&&_ in p?C=typeof p[_]=="function"?C=await p[_]():C=p[_]:a!==null&&!C&&"web"in p&&(C=typeof p.web=="function"?C=await p.web():C=p.web),C),rt=(h,m)=>{var A,E;if(j){const k=j==null?void 0:j.methods.find(I=>m===I.name);if(k)return k.rtype==="promise"?I=>o.nativePromise(g,m.toString(),I):(I,F)=>o.nativeCallback(g,m.toString(),I,F);if(h)return(A=h[m])===null||A===void 0?void 0:A.bind(h)}else{if(h)return(E=h[m])===null||E===void 0?void 0:E.bind(h);throw new te(`"${g}" plugin is not implemented on ${_}`,D.Unimplemented)}},Z=h=>{let m;const A=(...E)=>{const k=nt().then(I=>{const F=rt(I,h);if(F){const q=F(...E);return m=q==null?void 0:q.remove,q}else throw new te(`"${g}.${h}()" is not implemented on ${_}`,D.Unimplemented)});return h==="addListener"&&(k.remove=async()=>m()),k};return A.toString=()=>`${h.toString()}() { [capacitor code] }`,Object.defineProperty(A,"name",{value:h,writable:!1,configurable:!1}),A},de=Z("addListener"),ue=Z("removeListener"),st=(h,m)=>{const A=de({eventName:h},m),E=async()=>{const I=await A;ue({eventName:h,callbackId:I},m)},k=new Promise(I=>A.then(()=>I({remove:E})));return k.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await E()},k},Q=new Proxy({},{get(h,m){switch(m){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return j?st:de;case"removeListener":return ue;default:return Z(m)}}});return l[g]=Q,M.set(g,{name:g,proxy:Q,platforms:new Set([...Object.keys(p),...j?[_]:[]])}),Q},tt=((r=c==null?void 0:c.currentPlatform)===null||r===void 0?void 0:r.registerPlugin)||X;return o.convertFileSrc||(o.convertFileSrc=g=>g),o.getPlatform=u,o.handleError=L,o.isNativePlatform=b,o.isPluginAvailable=J,o.pluginMethodNoop=T,o.registerPlugin=tt,o.Exception=te,o.DEBUG=!!o.DEBUG,o.isLoggingEnabled=!!o.isLoggingEnabled,o.platform=o.getPlatform(),o.isNative=o.isNativePlatform(),o},$t=e=>e.Capacitor=Lt(e),N=$t(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Re=N.registerPlugin;N.Plugins;class Oe{constructor(t){this.listeners={},this.windowListeners={},t&&(console.warn(`Capacitor WebPlugin "${t.name}" config object was deprecated in v3 and will be removed in v4.`),this.config=t)}addListener(t,n){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(n);const s=this.windowListeners[t];s&&!s.registered&&this.addWindowListener(s);const r=async()=>this.removeListener(t,n),a=Promise.resolve({remove:r});return Object.defineProperty(a,"remove",{value:async()=>{console.warn("Using addListener() without 'await' is deprecated."),await r()}}),a}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,n){const i=this.listeners[t];i&&i.forEach(s=>s(n))}hasListeners(t){return!!this.listeners[t].length}registerWindowListener(t,n){this.windowListeners[n]={registered:!1,windowEventName:t,pluginEventName:n,handler:i=>{this.notifyListeners(n,i)}}}unimplemented(t="not implemented"){return new N.Exception(t,D.Unimplemented)}unavailable(t="not available"){return new N.Exception(t,D.Unavailable)}async removeListener(t,n){const i=this.listeners[t];if(!i)return;const s=i.indexOf(n);this.listeners[t].splice(s,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){!t||(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}}const pe=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),he=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class jt extends Oe{async getCookies(){const t=document.cookie,n={};return t.split(";").forEach(i=>{if(i.length<=0)return;let[s,r]=i.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=he(s).trim(),r=he(r).trim(),n[s]=r}),n}async setCookie(t){try{const n=pe(t.key),i=pe(t.value),s=`; expires=${(t.expires||"").replace("expires=","")}`,r=(t.path||"/").replace("path=","");document.cookie=`${n}=${i||""}${s}; path=${r}`}catch(n){return Promise.reject(n)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(n){return Promise.reject(n)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const n of t)document.cookie=n.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}Re("CapacitorCookies",{web:()=>new jt});const Dt=async e=>new Promise((t,n)=>{const i=new FileReader;i.onload=()=>{const s=i.result;t(s.indexOf(",")>=0?s.split(",")[1]:s)},i.onerror=s=>n(s),i.readAsDataURL(e)}),Mt=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(s=>s.toLocaleLowerCase()).reduce((s,r,a)=>(s[r]=e[t[a]],s),{})},xt=(e,t=!0)=>e?Object.entries(e).reduce((i,s)=>{const[r,a]=s;let o,l;return Array.isArray(a)?(l="",a.forEach(c=>{o=t?encodeURIComponent(c):c,l+=`${r}=${o}&`}),l.slice(0,-1)):(o=t?encodeURIComponent(a):a,l=`${r}=${o}`),`${i}&${l}`},"").substr(1):null,Ft=(e,t={})=>{const n=Object.assign({method:e.method||"GET",headers:e.headers},t),s=Mt(e.headers)["content-type"]||"";if(typeof e.data=="string")n.body=e.data;else if(s.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[a,o]of Object.entries(e.data||{}))r.set(a,o);n.body=r.toString()}else if(s.includes("multipart/form-data")){const r=new FormData;if(e.data instanceof FormData)e.data.forEach((o,l)=>{r.append(l,o)});else for(const o of Object.keys(e.data))r.append(o,e.data[o]);n.body=r;const a=new Headers(n.headers);a.delete("content-type"),n.headers=a}else(s.includes("application/json")||typeof e.data=="object")&&(n.body=JSON.stringify(e.data));return n};class qt extends Oe{async request(t){const n=Ft(t,t.webFetchExtra),i=xt(t.params,t.shouldEncodeUrlParams),s=i?`${t.url}?${i}`:t.url,r=await fetch(s,n),a=r.headers.get("content-type")||"";let{responseType:o="text"}=r.ok?t:{};a.includes("application/json")&&(o="json");let l,c;switch(o){case"arraybuffer":case"blob":c=await r.blob(),l=await Dt(c);break;case"json":l=await r.json();break;case"document":case"text":default:l=await r.text()}const d={};return r.headers.forEach((u,w)=>{d[w]=u}),{data:l,headers:d,status:r.status,url:r.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}Re("CapacitorHttp",{web:()=>new qt});const Le="@firebase/installations",ae="0.5.16";/**
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
 */const $e=1e4,je=`w:${ae}`,De="FIS_v2",Ut="https://firebaseinstallations.googleapis.com/v1",Bt=60*60*1e3,Wt="installations",Nt="Installations";/**
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
 */const Gt={["missing-app-config-values"]:'Missing App configuration value: "{$valueName}"',["not-registered"]:"Firebase Installation is not registered.",["installation-not-found"]:"Firebase Installation not found.",["request-failed"]:'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',["app-offline"]:"Could not process request. Application offline.",["delete-pending-registration"]:"Can't delete installation while there is a pending registration request."},R=new Ee(Wt,Nt,Gt);function Me(e){return e instanceof ke&&e.code.includes("request-failed")}/**
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
 */function xe({projectId:e}){return`${Ut}/projects/${e}/installations`}function Fe(e){return{token:e.token,requestStatus:2,expiresIn:Vt(e.expiresIn),creationTime:Date.now()}}async function qe(e,t){const i=(await t.json()).error;return R.create("request-failed",{requestName:e,serverCode:i.code,serverMessage:i.message,serverStatus:i.status})}function Ue({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Ht(e,{refreshToken:t}){const n=Ue(e);return n.append("Authorization",zt(t)),n}async function Be(e){const t=await e();return t.status>=500&&t.status<600?e():t}function Vt(e){return Number(e.replace("s","000"))}function zt(e){return`${De} ${e}`}/**
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
 */async function Kt({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const i=xe(e),s=Ue(e),r=t.getImmediate({optional:!0});if(r){const c=await r.getHeartbeatsHeader();c&&s.append("x-firebase-client",c)}const a={fid:n,authVersion:De,appId:e.appId,sdkVersion:je},o={method:"POST",headers:s,body:JSON.stringify(a)},l=await Be(()=>fetch(i,o));if(l.ok){const c=await l.json();return{fid:c.fid||n,registrationStatus:2,refreshToken:c.refreshToken,authToken:Fe(c.authToken)}}else throw await qe("Create Installation",l)}/**
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
 */function We(e){return new Promise(t=>{setTimeout(t,e)})}/**
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
 */function Yt(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const Jt=/^[cdef][\w-]{21}$/,ie="";function Xt(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const n=Zt(e);return Jt.test(n)?n:ie}catch{return ie}}function Zt(e){return Yt(e).substr(0,22)}/**
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
 */function z(e){return`${e.appName}!${e.appId}`}/**
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
 */const Ne=new Map;function Ge(e,t){const n=z(e);He(n,t),Qt(n,t)}function He(e,t){const n=Ne.get(e);if(!!n)for(const i of n)i(t)}function Qt(e,t){const n=en();n&&n.postMessage({key:e,fid:t}),tn()}let S=null;function en(){return!S&&"BroadcastChannel"in self&&(S=new BroadcastChannel("[Firebase] FID Change"),S.onmessage=e=>{He(e.data.key,e.data.fid)}),S}function tn(){Ne.size===0&&S&&(S.close(),S=null)}/**
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
 */const nn="firebase-installations-database",rn=1,O="firebase-installations-store";let ne=null;function oe(){return ne||(ne=wt(nn,rn,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(O)}}})),ne}async function G(e,t){const n=z(e),s=(await oe()).transaction(O,"readwrite"),r=s.objectStore(O),a=await r.get(n);return await r.put(t,n),await s.done,(!a||a.fid!==t.fid)&&Ge(e,t.fid),t}async function Ve(e){const t=z(e),i=(await oe()).transaction(O,"readwrite");await i.objectStore(O).delete(t),await i.done}async function K(e,t){const n=z(e),s=(await oe()).transaction(O,"readwrite"),r=s.objectStore(O),a=await r.get(n),o=t(a);return o===void 0?await r.delete(n):await r.put(o,n),await s.done,o&&(!a||a.fid!==o.fid)&&Ge(e,o.fid),o}/**
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
 */async function ce(e){let t;const n=await K(e.appConfig,i=>{const s=sn(i),r=an(e,s);return t=r.registrationPromise,r.installationEntry});return n.fid===ie?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function sn(e){const t=e||{fid:Xt(),registrationStatus:0};return ze(t)}function an(e,t){if(t.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(R.create("app-offline"));return{installationEntry:t,registrationPromise:s}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},i=on(e,n);return{installationEntry:n,registrationPromise:i}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:cn(e)}:{installationEntry:t}}async function on(e,t){try{const n=await Kt(e,t);return G(e.appConfig,n)}catch(n){throw Me(n)&&n.customData.serverCode===409?await Ve(e.appConfig):await G(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function cn(e){let t=await me(e.appConfig);for(;t.registrationStatus===1;)await We(100),t=await me(e.appConfig);if(t.registrationStatus===0){const{installationEntry:n,registrationPromise:i}=await ce(e);return i||n}return t}function me(e){return K(e,t=>{if(!t)throw R.create("installation-not-found");return ze(t)})}function ze(e){return ln(e)?{fid:e.fid,registrationStatus:0}:e}function ln(e){return e.registrationStatus===1&&e.registrationTime+$e<Date.now()}/**
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
 */async function dn({appConfig:e,heartbeatServiceProvider:t},n){const i=un(e,n),s=Ht(e,n),r=t.getImmediate({optional:!0});if(r){const c=await r.getHeartbeatsHeader();c&&s.append("x-firebase-client",c)}const a={installation:{sdkVersion:je,appId:e.appId}},o={method:"POST",headers:s,body:JSON.stringify(a)},l=await Be(()=>fetch(i,o));if(l.ok){const c=await l.json();return Fe(c)}else throw await qe("Generate Auth Token",l)}function un(e,{fid:t}){return`${xe(e)}/${t}/authTokens:generate`}/**
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
 */async function le(e,t=!1){let n;const i=await K(e.appConfig,r=>{if(!Ke(r))throw R.create("not-registered");const a=r.authToken;if(!t&&pn(a))return r;if(a.requestStatus===1)return n=fn(e,t),r;{if(!navigator.onLine)throw R.create("app-offline");const o=mn(r);return n=gn(e,o),o}});return n?await n:i.authToken}async function fn(e,t){let n=await we(e.appConfig);for(;n.authToken.requestStatus===1;)await We(100),n=await we(e.appConfig);const i=n.authToken;return i.requestStatus===0?le(e,t):i}function we(e){return K(e,t=>{if(!Ke(t))throw R.create("not-registered");const n=t.authToken;return wn(n)?Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}):t})}async function gn(e,t){try{const n=await dn(e,t),i=Object.assign(Object.assign({},t),{authToken:n});return await G(e.appConfig,i),n}catch(n){if(Me(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Ve(e.appConfig);else{const i=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await G(e.appConfig,i)}throw n}}function Ke(e){return e!==void 0&&e.registrationStatus===2}function pn(e){return e.requestStatus===2&&!hn(e)}function hn(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+Bt}function mn(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}function wn(e){return e.requestStatus===1&&e.requestTime+$e<Date.now()}/**
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
 */async function yn(e){const t=e,{installationEntry:n,registrationPromise:i}=await ce(t);return i?i.catch(console.error):le(t).catch(console.error),n.fid}/**
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
 */async function bn(e,t=!1){const n=e;return await vn(n),(await le(n,t)).token}async function vn(e){const{registrationPromise:t}=await ce(e);t&&await t}/**
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
 */function In(e){if(!e||!e.options)throw re("App Configuration");if(!e.name)throw re("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw re(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function re(e){return R.create("missing-app-config-values",{valueName:e})}/**
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
 */const Ye="installations",Pn="installations-internal",An=e=>{const t=e.getProvider("app").getImmediate(),n=In(t),i=V(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:i,_delete:()=>Promise.resolve()}},Tn=e=>{const t=e.getProvider("app").getImmediate(),n=V(t,Ye).getImmediate();return{getId:()=>yn(n),getToken:s=>bn(n,s)}};function Cn(){B(new W(Ye,An,"PUBLIC")),B(new W(Pn,Tn,"PRIVATE"))}Cn();U(Le,ae);U(Le,ae,"esm2017");/**
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
 */const H="analytics",En="firebase_id",kn="origin",_n=60*1e3,Sn="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Je="https://www.googletagmanager.com/gtag/js";/**
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
 */const y=new yt("@firebase/analytics");/**
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
 */function Xe(e){return Promise.all(e.map(t=>t.catch(n=>n)))}function Rn(e,t){const n=document.createElement("script");n.src=`${Je}?l=${e}&id=${t}`,n.async=!0,document.head.appendChild(n)}function On(e){let t=[];return Array.isArray(window[e])?t=window[e]:window[e]=t,t}async function Ln(e,t,n,i,s,r){const a=i[s];try{if(a)await t[a];else{const l=(await Xe(n)).find(c=>c.measurementId===s);l&&await t[l.appId]}}catch(o){y.error(o)}e("config",s,r)}async function $n(e,t,n,i,s){try{let r=[];if(s&&s.send_to){let a=s.send_to;Array.isArray(a)||(a=[a]);const o=await Xe(n);for(const l of a){const c=o.find(u=>u.measurementId===l),d=c&&t[c.appId];if(d)r.push(d);else{r=[];break}}}r.length===0&&(r=Object.values(t)),await Promise.all(r),e("event",i,s||{})}catch(r){y.error(r)}}function jn(e,t,n,i){async function s(r,a,o){try{r==="event"?await $n(e,t,n,a,o):r==="config"?await Ln(e,t,n,i,a,o):r==="consent"?e("consent","update",o):e("set",a)}catch(l){y.error(l)}}return s}function Dn(e,t,n,i,s){let r=function(...a){window[i].push(arguments)};return window[s]&&typeof window[s]=="function"&&(r=window[s]),window[s]=jn(r,e,t,n),{gtagCore:r,wrappedGtag:window[s]}}function Mn(e){const t=window.document.getElementsByTagName("script");for(const n of Object.values(t))if(n.src&&n.src.includes(Je)&&n.src.includes(e))return n;return null}/**
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
 */const xn={["already-exists"]:"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.",["already-initialized"]:"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.",["already-initialized-settings"]:"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.",["interop-component-reg-failed"]:"Firebase Analytics Interop Component failed to instantiate: {$reason}",["invalid-analytics-context"]:"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",["indexeddb-unavailable"]:"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",["fetch-throttle"]:"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.",["config-fetch-failed"]:"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}",["no-api-key"]:'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',["no-app-id"]:'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.'},v=new Ee("analytics","Analytics",xn);/**
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
 */const Fn=30,qn=1e3;class Un{constructor(t={},n=qn){this.throttleMetadata=t,this.intervalMillis=n}getThrottleMetadata(t){return this.throttleMetadata[t]}setThrottleMetadata(t,n){this.throttleMetadata[t]=n}deleteThrottleMetadata(t){delete this.throttleMetadata[t]}}const Ze=new Un;function Bn(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function Wn(e){var t;const{appId:n,apiKey:i}=e,s={method:"GET",headers:Bn(i)},r=Sn.replace("{app-id}",n),a=await fetch(r,s);if(a.status!==200&&a.status!==304){let o="";try{const l=await a.json();!((t=l.error)===null||t===void 0)&&t.message&&(o=l.error.message)}catch{}throw v.create("config-fetch-failed",{httpStatus:a.status,responseMessage:o})}return a.json()}async function Nn(e,t=Ze,n){const{appId:i,apiKey:s,measurementId:r}=e.options;if(!i)throw v.create("no-app-id");if(!s){if(r)return{measurementId:r,appId:i};throw v.create("no-api-key")}const a=t.getThrottleMetadata(i)||{backoffCount:0,throttleEndTimeMillis:Date.now()},o=new Vn;return setTimeout(async()=>{o.abort()},n!==void 0?n:_n),Qe({appId:i,apiKey:s,measurementId:r},a,o,t)}async function Qe(e,{throttleEndTimeMillis:t,backoffCount:n},i,s=Ze){var r,a;const{appId:o,measurementId:l}=e;try{await Gn(i,t)}catch(c){if(l)return y.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${(r=c)===null||r===void 0?void 0:r.message}]`),{appId:o,measurementId:l};throw c}try{const c=await Wn(e);return s.deleteThrottleMetadata(o),c}catch(c){const d=c;if(!Hn(d)){if(s.deleteThrottleMetadata(o),l)return y.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${d==null?void 0:d.message}]`),{appId:o,measurementId:l};throw c}const u=Number((a=d==null?void 0:d.customData)===null||a===void 0?void 0:a.httpStatus)===503?fe(n,s.intervalMillis,Fn):fe(n,s.intervalMillis),w={throttleEndTimeMillis:Date.now()+u,backoffCount:n+1};return s.setThrottleMetadata(o,w),y.debug(`Calling attemptFetch again in ${u} millis`),Qe(e,w,i,s)}}function Gn(e,t){return new Promise((n,i)=>{const s=Math.max(t-Date.now(),0),r=setTimeout(n,s);e.addEventListener(()=>{clearTimeout(r),i(v.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function Hn(e){if(!(e instanceof ke)||!e.customData)return!1;const t=Number(e.customData.httpStatus);return t===429||t===500||t===503||t===504}class Vn{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}}async function zn(e,t,n,i,s){if(s&&s.global){e("event",n,i);return}else{const r=await t,a=Object.assign(Object.assign({},i),{send_to:r});e("event",n,a)}}/**
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
 */async function Kn(){var e;if(Pt())try{await At()}catch(t){return y.warn(v.create("indexeddb-unavailable",{errorInfo:(e=t)===null||e===void 0?void 0:e.toString()}).message),!1}else return y.warn(v.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function Yn(e,t,n,i,s,r,a){var o;const l=Nn(e);l.then(b=>{n[b.measurementId]=b.appId,e.options.measurementId&&b.measurementId!==e.options.measurementId&&y.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${b.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(b=>y.error(b)),t.push(l);const c=Kn().then(b=>{if(b)return i.getId()}),[d,u]=await Promise.all([l,c]);Mn(r)||Rn(r,d.measurementId),s("js",new Date);const w=(o=a==null?void 0:a.config)!==null&&o!==void 0?o:{};return w[kn]="firebase",w.update=!0,u!=null&&(w[En]=u),s("config",d.measurementId,w),d.measurementId}/**
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
 */class Jn{constructor(t){this.app=t}_delete(){return delete x[this.app.options.appId],Promise.resolve()}}let x={},ye=[];const be={};let se="dataLayer",Xn="gtag",ve,et,Ie=!1;function Zn(){const e=[];if(bt()&&e.push("This is a browser extension environment."),Tt()||e.push("Cookies are not available."),e.length>0){const t=e.map((i,s)=>`(${s+1}) ${i}`).join(" "),n=v.create("invalid-analytics-context",{errorInfo:t});y.warn(n.message)}}function Qn(e,t,n){Zn();const i=e.options.appId;if(!i)throw v.create("no-app-id");if(!e.options.apiKey)if(e.options.measurementId)y.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw v.create("no-api-key");if(x[i]!=null)throw v.create("already-exists",{id:i});if(!Ie){On(se);const{wrappedGtag:r,gtagCore:a}=Dn(x,ye,be,se,Xn);et=r,ve=a,Ie=!0}return x[i]=Yn(e,ye,be,t,ve,se,n),new Jn(e)}function er(e=vt()){e=_e(e);const t=V(e,H);return t.isInitialized()?t.getImmediate():tr(e)}function tr(e,t={}){const n=V(e,H);if(n.isInitialized()){const s=n.getImmediate();if(It(t,n.getOptions()))return s;throw v.create("already-initialized")}return n.initialize({options:t})}function nr(e,t,n,i){e=_e(e),zn(et,x[e.app.options.appId],t,n,i).catch(s=>y.error(s))}const Pe="@firebase/analytics",Ae="0.8.4";function rr(){B(new W(H,(t,{options:n})=>{const i=t.getProvider("app").getImmediate(),s=t.getProvider("installations-internal").getImmediate();return Qn(i,s,n)},"PUBLIC")),B(new W("analytics-internal",e,"PRIVATE")),U(Pe,Ae),U(Pe,Ae,"esm2017");function e(t){try{const n=t.getProvider(H).getImmediate();return{logEvent:(i,s,r)=>nr(n,i,s,r)}}catch(n){throw v.create("interop-component-reg-failed",{reason:n})}}}rr();const sr=e=>({user:e&16,loggedIn:e&32}),Te=e=>({user:e[4],loggedIn:e[5],loginWithGoogle:e[1],loginWithEmailPassword:e[0],signInAnonomous:e[2],logout:e[3]});function ir(e){let t,n;const i=e[8].default,s=ct(i,e,e[7],Te);return{c(){t=lt("div"),s&&s.c()},m(r,a){dt(r,t,a),s&&s.m(t,null),n=!0},p(r,[a]){s&&s.p&&(!n||a&176)&&ut(s,i,r,r[7],n?gt(i,r[7],a,sr):ft(r[7]),Te)},i(r){n||(pt(s,r),n=!0)},o(r){ht(s,r),n=!1},d(r){r&&mt(t),s&&s.d(r)}}}function ar(e,t,n){let i,{$$slots:s={},$$scope:r}=t;const o=Ct({apiKey:"AIzaSyBXQIdxhaZk2jEh7Kgkui4OG0WUsIHyWgk",authDomain:"demotivator-3cf4d.firebaseapp.com",projectId:"demotivator-3cf4d",storageBucket:"demotivator-3cf4d.appspot.com",messagingSenderId:"230067629772",appId:"1:230067629772:web:682830de35cc6b7be91c69",measurementId:"G-T182ZXMZM1"});er(o);const l=Et();let c=null,{useRedirect:d=!1}=t;const u=f=>({id:f.user_id,name:f.name,email:f.email,picture:f.picture}),w=async(f,P)=>{const{getAuth:L,signInWithEmailAndPassword:T}=await ee(()=>import("./index.esm.73cc40e5.js"),["assets/index.esm.73cc40e5.js","assets/index-0bb4da3b.c3565b46.js"]);T(l,f,P)},b=async()=>{const{signInWithPopup:f,signInWithRedirect:P,GoogleAuthProvider:L}=await ee(()=>import("./index.esm.73cc40e5.js"),["assets/index.esm.73cc40e5.js","assets/index-0bb4da3b.c3565b46.js"]),T=new L;return d?P(l,T):f(l,T)},Y=async()=>{const{getAuth:f,signInAnonymously:P}=await ee(()=>import("./index.esm.73cc40e5.js"),["assets/index.esm.73cc40e5.js","assets/index-0bb4da3b.c3565b46.js"]),L=f();P(L).then(()=>{console.log(`your anonomous user ID is ${c.user_id}`)}).catch(T=>{const M=T.code,X=T.message;console.error(`
      
        An error occured.
        Here are the detials:
        ${M}
        ${X}
      `)})},J=()=>l.signOut();return l.onAuthStateChanged(async f=>{if(f){const P=await f.getIdTokenResult();n(4,c=u(P.claims))}else n(4,c=null)}),e.$$set=f=>{"useRedirect"in f&&n(6,d=f.useRedirect),"$$scope"in f&&n(7,r=f.$$scope)},e.$$.update=()=>{e.$$.dirty&16&&n(5,i=c!==null)},[w,b,Y,J,c,i,d,r,s]}class dr extends it{constructor(t){super(),at(this,t,ar,ir,ot,{useRedirect:6,loginWithEmailPassword:0,loginWithGoogle:1,signInAnonomous:2,logout:3})}get loginWithEmailPassword(){return this.$$.ctx[0]}get loginWithGoogle(){return this.$$.ctx[1]}get signInAnonomous(){return this.$$.ctx[2]}get logout(){return this.$$.ctx[3]}}let Ce=!1;window.matchMedia("(prefers-color-scheme: dark)").matches?Ce=!0:Ce=!1;export{dr as A,Oe as W,ee as _,Ce as d,er as g,Re as r};
