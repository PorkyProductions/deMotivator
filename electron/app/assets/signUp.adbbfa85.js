import{S,i as B,s as L,T as C,q,a as g,e as n,t as D,c as a,b as G,u as W,d as A,f as e,l as Z,I as z,o as M,p as U,v as K,j as H,y as O}from"./title.bd47c3a1.js";import{g as R,i as V,a as X,_ as N}from"./index.esm2017.a8195cc8.js";import{l as Q}from"./arrow-left.97c21ce9.js";function F(E){let i,d,o,m,r,l,t,u,_,p,y,c,b,w,h,f,v,T,$,x,P,j;i=new C({});let k=J;return{c(){q(i.$$.fragment),d=g(),o=n("div"),m=n("div"),r=n("div"),l=n("div"),t=n("form"),u=n("div"),u.innerHTML=`<label for="userEmail">Email</label> 
                <input class="hover:border-secondary-orangePantone focus:border-primary-majorelleBlue dark:focus:border-secondary-orangePantone" id="userEmail" type="email" placeholder="name@example.com"/>`,_=g(),p=n("div"),p.innerHTML=`<label for="userPassword">Password</label> 
                <input class="input-field" id="userPassword" type="password" placeholder="******************"/>`,y=g(),c=g(),b=n("div"),b.innerHTML='<button type="submit" class="btn btn-primary">Sign Up</button>',w=g(),h=n("div"),f=n("a"),v=n("img"),$=D(" Go Back Home"),a(u,"class","mb-4"),a(p,"class","mb-6"),a(t,"class","px-8 pt-6 pb-8 shadow-md"),a(l,"class","flex content-center justify-center"),a(r,"class","w-full max-w-xs"),a(m,"class","wrapper flex content-center justify-center "),G(v.src,T=Q)||a(v,"src",T),a(v,"alt",""),a(f,"href","index.html"),a(f,"class","btn btn-success"),a(h,"class","flex content-center justify-center p-4"),a(o,"class","")},m(s,I){W(i,s,I),A(s,d,I),A(s,o,I),e(o,m),e(m,r),e(r,l),e(l,t),e(t,u),e(t,_),e(t,p),e(t,y),e(t,c),e(t,b),e(o,w),e(o,h),e(h,f),e(f,v),e(f,$),x=!0,P||(j=Z(t,"submit",z(E[0])),P=!0)},p(s,[I]){},i(s){x||(M(i.$$.fragment,s),M(k),x=!0)},o(s){U(i.$$.fragment,s),U(k),x=!1},d(s){K(i,s),s&&H(d),s&&H(o),P=!1,j()}}}let J=null;function Y(E){const i=setTimeout(()=>!0,1e3);O(()=>clearTimeout(i));const d=R(),m=V({apiKey:"AIzaSyBXQIdxhaZk2jEh7Kgkui4OG0WUsIHyWgk",authDomain:"demotivator-3cf4d.firebaseapp.com",projectId:"demotivator-3cf4d",storageBucket:"demotivator-3cf4d.appspot.com",messagingSenderId:"230067629772",appId:"1:230067629772:web:682830de35cc6b7be91c69",measurementId:"G-T182ZXMZM1"});X(m);const r=d.currentUser;r!==null&&(r.displayName,r.email,r.photoURL,r.emailVerified,r.uid);const l=async u=>{const{createUserWithEmailAndPassword:_}=await N(()=>import("./index.esm.d321f5ff.js"),["assets/index.esm.d321f5ff.js","assets/index.esm2017.a8195cc8.js","assets/index.f40324fd.css"]),{userEmail:p,userPassword:y}=u.target.elements;_(d,p,y).then(c=>{c.user}).catch(c=>{const b=c.code,w=c.message;return{errorCode:b,errorMessage:w}}),window.location.href="login.html"},t=l();return[l,t]}class ee extends S{constructor(i){super(),B(this,i,Y,F,L,{})}}new ee({target:document.getElementById("app")});