import{S as Ce,i as Re,s as Pe,F as De,e as Oe,j as Fe,G as Me,H as $e,I as je,t as qe,a as Ne,p as xe,_ as O}from"./title.4bd6cf16.js";import"./index.5332a224.js";import"./index.4a1ce933.js";import{r as _,_ as S,C as E,E as Z,a as R,F as Q,o as Le,L as Be,b as ee,c as Ge,d as Ve,e as We,f as B,h as ze,v as He,j as Ke,i as Ue,g as Ye}from"./index-0bb4da3b.c3565b46.js";const te="@firebase/installations",q="0.5.16";/**
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
 */const ne=1e4,ae=`w:${q}`,ie="FIS_v2",Je="https://firebaseinstallations.googleapis.com/v1",Xe=60*60*1e3,Ze="installations",Qe="Installations";/**
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
 */const et={["missing-app-config-values"]:'Missing App configuration value: "{$valueName}"',["not-registered"]:"Firebase Installation is not registered.",["installation-not-found"]:"Firebase Installation not found.",["request-failed"]:'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',["app-offline"]:"Could not process request. Application offline.",["delete-pending-registration"]:"Can't delete installation while there is a pending registration request."},b=new Z(Ze,Qe,et);function se(e){return e instanceof Q&&e.code.includes("request-failed")}/**
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
 */function oe({projectId:e}){return`${Je}/projects/${e}/installations`}function re(e){return{token:e.token,requestStatus:2,expiresIn:nt(e.expiresIn),creationTime:Date.now()}}async function ce(e,t){const a=(await t.json()).error;return b.create("request-failed",{requestName:e,serverCode:a.code,serverMessage:a.message,serverStatus:a.status})}function le({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function tt(e,{refreshToken:t}){const n=le(e);return n.append("Authorization",at(t)),n}async function ue(e){const t=await e();return t.status>=500&&t.status<600?e():t}function nt(e){return Number(e.replace("s","000"))}function at(e){return`${ie} ${e}`}/**
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
 */async function it({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const a=oe(e),i=le(e),s=t.getImmediate({optional:!0});if(s){const l=await s.getHeartbeatsHeader();l&&i.append("x-firebase-client",l)}const o={fid:n,authVersion:ie,appId:e.appId,sdkVersion:ae},r={method:"POST",headers:i,body:JSON.stringify(o)},c=await ue(()=>fetch(a,r));if(c.ok){const l=await c.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:re(l.authToken)}}else throw await ce("Create Installation",c)}/**
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
 */function de(e){return new Promise(t=>{setTimeout(t,e)})}/**
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
 */function st(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const ot=/^[cdef][\w-]{21}$/,j="";function rt(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const n=ct(e);return ot.test(n)?n:j}catch{return j}}function ct(e){return st(e).substr(0,22)}/**
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
 */function P(e){return`${e.appName}!${e.appId}`}/**
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
 */const fe=new Map;function pe(e,t){const n=P(e);ge(n,t),lt(n,t)}function ge(e,t){const n=fe.get(e);if(!!n)for(const a of n)a(t)}function lt(e,t){const n=ut();n&&n.postMessage({key:e,fid:t}),dt()}let y=null;function ut(){return!y&&"BroadcastChannel"in self&&(y=new BroadcastChannel("[Firebase] FID Change"),y.onmessage=e=>{ge(e.data.key,e.data.fid)}),y}function dt(){fe.size===0&&y&&(y.close(),y=null)}/**
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
 */const ft="firebase-installations-database",pt=1,A="firebase-installations-store";let F=null;function N(){return F||(F=Le(ft,pt,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(A)}}})),F}async function k(e,t){const n=P(e),i=(await N()).transaction(A,"readwrite"),s=i.objectStore(A),o=await s.get(n);return await s.put(t,n),await i.done,(!o||o.fid!==t.fid)&&pe(e,t.fid),t}async function he(e){const t=P(e),a=(await N()).transaction(A,"readwrite");await a.objectStore(A).delete(t),await a.done}async function D(e,t){const n=P(e),i=(await N()).transaction(A,"readwrite"),s=i.objectStore(A),o=await s.get(n),r=t(o);return r===void 0?await s.delete(n):await s.put(r,n),await i.done,r&&(!o||o.fid!==r.fid)&&pe(e,r.fid),r}/**
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
 */async function x(e){let t;const n=await D(e.appConfig,a=>{const i=gt(a),s=ht(e,i);return t=s.registrationPromise,s.installationEntry});return n.fid===j?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function gt(e){const t=e||{fid:rt(),registrationStatus:0};return me(t)}function ht(e,t){if(t.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(b.create("app-offline"));return{installationEntry:t,registrationPromise:i}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},a=mt(e,n);return{installationEntry:n,registrationPromise:a}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:It(e)}:{installationEntry:t}}async function mt(e,t){try{const n=await it(e,t);return k(e.appConfig,n)}catch(n){throw se(n)&&n.customData.serverCode===409?await he(e.appConfig):await k(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function It(e){let t=await G(e.appConfig);for(;t.registrationStatus===1;)await de(100),t=await G(e.appConfig);if(t.registrationStatus===0){const{installationEntry:n,registrationPromise:a}=await x(e);return a||n}return t}function G(e){return D(e,t=>{if(!t)throw b.create("installation-not-found");return me(t)})}function me(e){return wt(e)?{fid:e.fid,registrationStatus:0}:e}function wt(e){return e.registrationStatus===1&&e.registrationTime+ne<Date.now()}/**
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
 */async function yt({appConfig:e,heartbeatServiceProvider:t},n){const a=bt(e,n),i=tt(e,n),s=t.getImmediate({optional:!0});if(s){const l=await s.getHeartbeatsHeader();l&&i.append("x-firebase-client",l)}const o={installation:{sdkVersion:ae,appId:e.appId}},r={method:"POST",headers:i,body:JSON.stringify(o)},c=await ue(()=>fetch(a,r));if(c.ok){const l=await c.json();return re(l)}else throw await ce("Generate Auth Token",c)}function bt(e,{fid:t}){return`${oe(e)}/${t}/authTokens:generate`}/**
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
 */async function L(e,t=!1){let n;const a=await D(e.appConfig,s=>{if(!Ie(s))throw b.create("not-registered");const o=s.authToken;if(!t&&vt(o))return s;if(o.requestStatus===1)return n=At(e,t),s;{if(!navigator.onLine)throw b.create("app-offline");const r=St(s);return n=Tt(e,r),r}});return n?await n:a.authToken}async function At(e,t){let n=await V(e.appConfig);for(;n.authToken.requestStatus===1;)await de(100),n=await V(e.appConfig);const a=n.authToken;return a.requestStatus===0?L(e,t):a}function V(e){return D(e,t=>{if(!Ie(t))throw b.create("not-registered");const n=t.authToken;return Et(n)?Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}):t})}async function Tt(e,t){try{const n=await yt(e,t),a=Object.assign(Object.assign({},t),{authToken:n});return await k(e.appConfig,a),n}catch(n){if(se(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await he(e.appConfig);else{const a=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await k(e.appConfig,a)}throw n}}function Ie(e){return e!==void 0&&e.registrationStatus===2}function vt(e){return e.requestStatus===2&&!_t(e)}function _t(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+Xe}function St(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}function Et(e){return e.requestStatus===1&&e.requestTime+ne<Date.now()}/**
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
 */async function kt(e){const t=e,{installationEntry:n,registrationPromise:a}=await x(t);return a?a.catch(console.error):L(t).catch(console.error),n.fid}/**
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
 */async function Ct(e,t=!1){const n=e;return await Rt(n),(await L(n,t)).token}async function Rt(e){const{registrationPromise:t}=await x(e);t&&await t}/**
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
 */function Pt(e){if(!e||!e.options)throw M("App Configuration");if(!e.name)throw M("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw M(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function M(e){return b.create("missing-app-config-values",{valueName:e})}/**
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
 */const we="installations",Dt="installations-internal",Ot=e=>{const t=e.getProvider("app").getImmediate(),n=Pt(t),a=R(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:a,_delete:()=>Promise.resolve()}},Ft=e=>{const t=e.getProvider("app").getImmediate(),n=R(t,we).getImmediate();return{getId:()=>kt(n),getToken:i=>Ct(n,i)}};function Mt(){S(new E(we,Ot,"PUBLIC")),S(new E(Dt,Ft,"PRIVATE"))}Mt();_(te,q);_(te,q,"esm2017");/**
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
 */const C="analytics",$t="firebase_id",jt="origin",qt=60*1e3,Nt="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",ye="https://www.googletagmanager.com/gtag/js";/**
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
 */const f=new Be("@firebase/analytics");/**
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
 */function be(e){return Promise.all(e.map(t=>t.catch(n=>n)))}function xt(e,t){const n=document.createElement("script");n.src=`${ye}?l=${e}&id=${t}`,n.async=!0,document.head.appendChild(n)}function Lt(e){let t=[];return Array.isArray(window[e])?t=window[e]:window[e]=t,t}async function Bt(e,t,n,a,i,s){const o=a[i];try{if(o)await t[o];else{const c=(await be(n)).find(l=>l.measurementId===i);c&&await t[c.appId]}}catch(r){f.error(r)}e("config",i,s)}async function Gt(e,t,n,a,i){try{let s=[];if(i&&i.send_to){let o=i.send_to;Array.isArray(o)||(o=[o]);const r=await be(n);for(const c of o){const l=r.find(h=>h.measurementId===c),u=l&&t[l.appId];if(u)s.push(u);else{s=[];break}}}s.length===0&&(s=Object.values(t)),await Promise.all(s),e("event",a,i||{})}catch(s){f.error(s)}}function Vt(e,t,n,a){async function i(s,o,r){try{s==="event"?await Gt(e,t,n,o,r):s==="config"?await Bt(e,t,n,a,o,r):s==="consent"?e("consent","update",r):e("set",o)}catch(c){f.error(c)}}return i}function Wt(e,t,n,a,i){let s=function(...o){window[a].push(arguments)};return window[i]&&typeof window[i]=="function"&&(s=window[i]),window[i]=Vt(s,e,t,n),{gtagCore:s,wrappedGtag:window[i]}}function zt(e){const t=window.document.getElementsByTagName("script");for(const n of Object.values(t))if(n.src&&n.src.includes(ye)&&n.src.includes(e))return n;return null}/**
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
 */const Ht={["already-exists"]:"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.",["already-initialized"]:"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.",["already-initialized-settings"]:"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.",["interop-component-reg-failed"]:"Firebase Analytics Interop Component failed to instantiate: {$reason}",["invalid-analytics-context"]:"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",["indexeddb-unavailable"]:"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",["fetch-throttle"]:"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.",["config-fetch-failed"]:"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}",["no-api-key"]:'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',["no-app-id"]:'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.'},p=new Z("analytics","Analytics",Ht);/**
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
 */const Kt=30,Ut=1e3;class Yt{constructor(t={},n=Ut){this.throttleMetadata=t,this.intervalMillis=n}getThrottleMetadata(t){return this.throttleMetadata[t]}setThrottleMetadata(t,n){this.throttleMetadata[t]=n}deleteThrottleMetadata(t){delete this.throttleMetadata[t]}}const Ae=new Yt;function Jt(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function Xt(e){var t;const{appId:n,apiKey:a}=e,i={method:"GET",headers:Jt(a)},s=Nt.replace("{app-id}",n),o=await fetch(s,i);if(o.status!==200&&o.status!==304){let r="";try{const c=await o.json();!((t=c.error)===null||t===void 0)&&t.message&&(r=c.error.message)}catch{}throw p.create("config-fetch-failed",{httpStatus:o.status,responseMessage:r})}return o.json()}async function Zt(e,t=Ae,n){const{appId:a,apiKey:i,measurementId:s}=e.options;if(!a)throw p.create("no-app-id");if(!i){if(s)return{measurementId:s,appId:a};throw p.create("no-api-key")}const o=t.getThrottleMetadata(a)||{backoffCount:0,throttleEndTimeMillis:Date.now()},r=new tn;return setTimeout(async()=>{r.abort()},n!==void 0?n:qt),Te({appId:a,apiKey:i,measurementId:s},o,r,t)}async function Te(e,{throttleEndTimeMillis:t,backoffCount:n},a,i=Ae){var s,o;const{appId:r,measurementId:c}=e;try{await Qt(a,t)}catch(l){if(c)return f.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${(s=l)===null||s===void 0?void 0:s.message}]`),{appId:r,measurementId:c};throw l}try{const l=await Xt(e);return i.deleteThrottleMetadata(r),l}catch(l){const u=l;if(!en(u)){if(i.deleteThrottleMetadata(r),c)return f.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:r,measurementId:c};throw l}const h=Number((o=u==null?void 0:u.customData)===null||o===void 0?void 0:o.httpStatus)===503?B(n,i.intervalMillis,Kt):B(n,i.intervalMillis),m={throttleEndTimeMillis:Date.now()+h,backoffCount:n+1};return i.setThrottleMetadata(r,m),f.debug(`Calling attemptFetch again in ${h} millis`),Te(e,m,a,i)}}function Qt(e,t){return new Promise((n,a)=>{const i=Math.max(t-Date.now(),0),s=setTimeout(n,i);e.addEventListener(()=>{clearTimeout(s),a(p.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function en(e){if(!(e instanceof Q)||!e.customData)return!1;const t=Number(e.customData.httpStatus);return t===429||t===500||t===503||t===504}class tn{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}}async function nn(e,t,n,a,i){if(i&&i.global){e("event",n,a);return}else{const s=await t,o=Object.assign(Object.assign({},a),{send_to:s});e("event",n,o)}}/**
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
 */async function an(){var e;if(ze())try{await He()}catch(t){return f.warn(p.create("indexeddb-unavailable",{errorInfo:(e=t)===null||e===void 0?void 0:e.toString()}).message),!1}else return f.warn(p.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function sn(e,t,n,a,i,s,o){var r;const c=Zt(e);c.then(g=>{n[g.measurementId]=g.appId,e.options.measurementId&&g.measurementId!==e.options.measurementId&&f.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${g.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(g=>f.error(g)),t.push(c);const l=an().then(g=>{if(g)return a.getId()}),[u,h]=await Promise.all([c,l]);zt(s)||xt(s,u.measurementId),i("js",new Date);const m=(r=o==null?void 0:o.config)!==null&&r!==void 0?r:{};return m[jt]="firebase",m.update=!0,h!=null&&(m[$t]=h),i("config",u.measurementId,m),u.measurementId}/**
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
 */class on{constructor(t){this.app=t}_delete(){return delete T[this.app.options.appId],Promise.resolve()}}let T={},W=[];const z={};let $="dataLayer",rn="gtag",H,ve,K=!1;function cn(){const e=[];if(Ge()&&e.push("This is a browser extension environment."),Ke()||e.push("Cookies are not available."),e.length>0){const t=e.map((a,i)=>`(${i+1}) ${a}`).join(" "),n=p.create("invalid-analytics-context",{errorInfo:t});f.warn(n.message)}}function ln(e,t,n){cn();const a=e.options.appId;if(!a)throw p.create("no-app-id");if(!e.options.apiKey)if(e.options.measurementId)f.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw p.create("no-api-key");if(T[a]!=null)throw p.create("already-exists",{id:a});if(!K){Lt($);const{wrappedGtag:s,gtagCore:o}=Wt(T,W,z,$,rn);ve=s,H=o,K=!0}return T[a]=sn(e,W,z,t,H,$,n),new on(e)}function un(e=Ve()){e=ee(e);const t=R(e,C);return t.isInitialized()?t.getImmediate():dn(e)}function dn(e,t={}){const n=R(e,C);if(n.isInitialized()){const i=n.getImmediate();if(We(t,n.getOptions()))return i;throw p.create("already-initialized")}return n.initialize({options:t})}function fn(e,t,n,a){e=ee(e),nn(ve,T[e.app.options.appId],t,n,a).catch(i=>f.error(i))}const U="@firebase/analytics",Y="0.8.4";function pn(){S(new E(C,(t,{options:n})=>{const a=t.getProvider("app").getImmediate(),i=t.getProvider("installations-internal").getImmediate();return ln(a,i,n)},"PUBLIC")),S(new E("analytics-internal",e,"PRIVATE")),_(U,Y),_(U,Y,"esm2017");function e(t){try{const n=t.getProvider(C).getImmediate();return{logEvent:(a,i,s)=>fn(n,a,i,s)}}catch(n){throw p.create("interop-component-reg-failed",{reason:n})}}}pn();const gn=e=>({user:e&16,loggedIn:e&32}),J=e=>({user:e[4],loggedIn:e[5],loginWithGoogle:e[1],loginWithEmailPassword:e[0],signInAnonomous:e[2],logout:e[3]});function hn(e){let t,n;const a=e[8].default,i=De(a,e,e[7],J);return{c(){t=Oe("div"),i&&i.c()},m(s,o){Fe(s,t,o),i&&i.m(t,null),n=!0},p(s,[o]){i&&i.p&&(!n||o&176)&&Me(i,a,s,s[7],n?je(a,s[7],o,gn):$e(s[7]),J)},i(s){n||(qe(i,s),n=!0)},o(s){Ne(i,s),n=!1},d(s){s&&xe(t),i&&i.d(s)}}}function mn(e,t,n){let a,{$$slots:i={},$$scope:s}=t;const r=Ue({apiKey:"AIzaSyBXQIdxhaZk2jEh7Kgkui4OG0WUsIHyWgk",authDomain:"demotivator-3cf4d.firebaseapp.com",projectId:"demotivator-3cf4d",storageBucket:"demotivator-3cf4d.appspot.com",messagingSenderId:"230067629772",appId:"1:230067629772:web:682830de35cc6b7be91c69",measurementId:"G-T182ZXMZM1"});un(r);const c=Ye();let l=null,{useRedirect:u=!1}=t;const h=d=>({id:d.user_id,name:d.name,email:d.email,picture:d.picture}),m=async(d,I)=>{const{getAuth:v,signInWithEmailAndPassword:w}=await O(()=>import("./index.esm.73cc40e5.js"),["assets/index.esm.73cc40e5.js","assets/index-0bb4da3b.c3565b46.js"]);w(c,d,I)},g=async()=>{const{signInWithPopup:d,signInWithRedirect:I,GoogleAuthProvider:v}=await O(()=>import("./index.esm.73cc40e5.js"),["assets/index.esm.73cc40e5.js","assets/index-0bb4da3b.c3565b46.js"]),w=new v;return u?I(c,w):d(c,w)},_e=async()=>{const{getAuth:d,signInAnonymously:I}=await O(()=>import("./index.esm.73cc40e5.js"),["assets/index.esm.73cc40e5.js","assets/index-0bb4da3b.c3565b46.js"]),v=d();I(v).then(()=>{console.log(`your anonomous user ID is ${l.user_id}`)}).catch(w=>{const Ee=w.code,ke=w.message;console.error(`
      
        An error occured.
        Here are the detials:
        ${Ee}
        ${ke}
      `)})},Se=()=>c.signOut();return c.onAuthStateChanged(async d=>{if(d){const I=await d.getIdTokenResult();n(4,l=h(I.claims))}else n(4,l=null)}),e.$$set=d=>{"useRedirect"in d&&n(6,u=d.useRedirect),"$$scope"in d&&n(7,s=d.$$scope)},e.$$.update=()=>{e.$$.dirty&16&&n(5,a=l!==null)},[m,g,_e,Se,l,a,u,s,i]}class An extends Ce{constructor(t){super(),Re(this,t,mn,hn,Pe,{useRedirect:6,loginWithEmailPassword:0,loginWithGoogle:1,signInAnonomous:2,logout:3})}get loginWithEmailPassword(){return this.$$.ctx[0]}get loginWithGoogle(){return this.$$.ctx[1]}get signInAnonomous(){return this.$$.ctx[2]}get logout(){return this.$$.ctx[3]}}let X=!1;window.matchMedia("(prefers-color-scheme: dark)").matches?X=!0:X=!1;export{An as A,X as d,un as g};
