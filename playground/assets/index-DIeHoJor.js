/*!
 * @guitar-chords/demo version 0.0.1
 * Author: undefined
 * Homepage: undefined
 * Released on: 2024-11-10 23:34:44 (GMT+0900)
 */
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();/*!
 * @guitar-chords/canvas version 0.0.10
 * Author: Capricorncd <capricorncd@qq.com>
 * Homepage: https://github.com/capricorncd/guitar-chords#readme
 * Released on: 2024-11-10 23:33:31 (GMT+0900)
 */var pt=i=>{throw TypeError(i)},Z=(i,t,e)=>t.has(i)||pt("Cannot "+e),g=(i,t,e)=>(Z(i,t,"read from private field"),e?e.call(i):t.get(i)),B=(i,t,e)=>t.has(i)?pt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(i):t.set(i,e),E=(i,t,e,n)=>(Z(i,t,"write to private field"),t.set(i,e),e),T=(i,t,e)=>(Z(i,t,"access private method"),e);const yt={autoRender:!0,defaultColor:"#000",defaultLineWidth:4,transpose:0,fontFamily:"Arial",name:"",nameFontSize:60,spacing:20,fretsSpacing:50,stringSpacing:30,fingerRadius:15,showFingerNumber:!0,fingerNumberTextColor:"#fff",startFrets:0,matrix:[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]],mergeFingerCircle:!1,showNotesOutsideOfChords:!1,devicePixelRatio:window.devicePixelRatio||1};var N,A,R,W,U,O,Q,nt,st,rt,ot,at,ht,lt,j;class tt{constructor(t){B(this,O),B(this,N),B(this,A),B(this,R),B(this,W),B(this,U,"0.0.10"),E(this,N,{...yt,...t});const{devicePixelRatio:e,autoRender:n}=g(this,N);E(this,A,document.createElement("canvas")),E(this,R,g(this,A).getContext("2d")),E(this,W,e),n&&T(this,O,Q).call(this)}get element(){return g(this,A)}get width(){const{stringCount:t,stringSpacing:e,stringLineWidth:n}=this.data;return(e*(t+1)+n*t)*g(this,W)}get height(){const{nutLineWidth:t,fretsLineWidth:e,fretsSpacing:n,matrix:r,spacing:s,nameFontSize:o}=this.data;return(n*r.length+t+e*r.length+o+s)*g(this,W)}get gridRect(){const{stringLineWidth:t,stringSpacing:e,nutLineWidth:n,fretsSpacing:r,fretsLineWidth:s,stringCount:o,matrix:a,spacing:c,nameFontSize:l}=this.data;return{width:(e*(o-1)+t*o)*g(this,W),height:(r*a.length+n+s*a.length)*g(this,W),left:e*g(this,W),top:(l+c)*g(this,W),right:(this.width-e)*g(this,W),bottom:this.height*g(this,W)}}get version(){return g(this,U)}get data(){const{defaultColor:t,defaultLineWidth:e,fingerRadius:n,matrix:r}=g(this,N),{nameTextColor:s=t,nutLineWidth:o=e,nutColor:a=t,fretsColor:c=t,fretsLineWidth:l=e,stringColor:d=t,stringLineWidth:f=e,fingerCircleColor:u=t,startFretsTextColor:h=t,transposeTextColor:w=s,showNotesOutsideOfChords:S,notesOutsideOfChords:C={},crossLineWidth:m=Math.min(f,l),crossLineColor:x=t,crossRadius:p=n*.75,nameLetterSpacing:L=0}=g(this,N);return{...g(this,N),nameTextColor:s,nutLineWidth:o,nutColor:a,fretsColor:c,fretsLineWidth:l,stringColor:d,stringLineWidth:f,fingerCircleColor:u,startFretsTextColor:h,transposeTextColor:w,notesOutsideOfChords:C,showNotesOutsideOfChords:S||Object.keys(C).length>0,crossLineWidth:m,crossLineColor:x,crossRadius:p,nameLetterSpacing:L,stringCount:r[0].length??6}}render(t){return t&&E(this,N,{...g(this,N),...t}),T(this,O,Q).call(this),this}}N=new WeakMap,A=new WeakMap,R=new WeakMap,W=new WeakMap,U=new WeakMap,O=new WeakSet,Q=function(){const i=this.data,{width:t,height:e}=this;return g(this,A).width=t,g(this,A).height=e,g(this,A).style.width=`${t/g(this,W)}px`,g(this,A).style.height=`${e/g(this,W)}px`,g(this,R).scale(g(this,W),g(this,W)),g(this,R).clearRect(0,0,t,e),T(this,O,ot).call(this,i),T(this,O,rt).call(this,i),T(this,O,st).call(this,i),T(this,O,nt).call(this,i),i.showNotesOutsideOfChords&&T(this,O,at).call(this,i),this},nt=function(i){const{name:t,nameTextColor:e,nameFontSize:n,transpose:r,transposeTextColor:s,fontFamily:o,nameLetterSpacing:a}=i,{width:c}=this.gridRect,l=c/g(this,W),d=g(this,R);d.fillStyle=e,d.font=`${n}px ${o}`,d.textAlign="center",d.textBaseline="middle",d.letterSpacing=`${a}px`,d.fillText(t,this.width/(2*g(this,W)),n/2,l);const f=d.measureText(t);if(d.letterSpacing="0px",r!==0){const u=n/2;d.font=`${u}px ${o}`,d.fillStyle=s,d.textAlign="right",d.fillText(r===1?"♯":"♭",this.width/(2*g(this,W))-Math.min(f.width/2,l/2),u/2)}},st=function(i){const{stringSpacing:t,fretsSpacing:e,stringLineWidth:n,fretsLineWidth:r,fingerRadius:s,matrix:o,nutLineWidth:a,fingerNumberTextColor:c,fingerCircleColor:l,fontFamily:d,showFingerNumber:f,mergeFingerCircle:u}=i,h=g(this,R);h.fillStyle=l;const w=s*1.5,{top:S}=this.gridRect,C=new Map;let m=0;for(let x=0;x<o.length;x++)for(let p=0;p<o[x].length;p++)if(m=o[x][p],m>0){const L=p*(t+n)+n/2+t,F=S/g(this,W)+a+(e+r)*x+e/2;if(h.fillStyle=l,h.beginPath(),h.arc(L,F,s,0,Math.PI*2),h.fill(),u){C.has(m)||C.set(m,[]);const I=C.get(m);I.push({x:L,y:F}),I.length>1&&p===o[x].lastIndexOf(m)&&(h.beginPath(),h.moveTo(I[0].x,I[0].y),h.lineTo(L,F),h.strokeStyle=l,h.lineWidth=s*2,h.stroke())}if(!f||u&&p!==o[x].lastIndexOf(m))continue;h.fillStyle=c,h.font=`${w}px ${d}`,h.textAlign="center",h.textBaseline="middle";const v=String(m),{actualBoundingBoxAscent:G,actualBoundingBoxDescent:D}=h.measureText(v);h.fillText(v,L,F+Math.abs(G-D)/2)}},rt=function(i){const{nutLineWidth:t,fretsSpacing:e,startFrets:n,nameFontSize:r,startFretsTextColor:s,fontFamily:o}=i;if(n<=1)return;const{top:a}=this.gridRect,c=g(this,R),l=r/2;c.fillStyle=s,c.font=`italic ${l}px ${o}`,c.textAlign="left",c.textBaseline="middle",c.fillText(n.toString(),0,a/g(this,W)+t+e/2)},ot=function(i){const{matrix:t,nutLineWidth:e,stringLineWidth:n,fretsLineWidth:r,stringSpacing:s,fretsSpacing:o,nutColor:a,stringColor:c,fretsColor:l,stringCount:d,spacing:f,nameFontSize:u}=i,h=g(this,R),w=u+f,S=t.length;for(let C=0;C<d;C++){const m=C*(s+n)+n/2+s;h.beginPath(),h.moveTo(m,w+Math.abs(e-r)),h.lineTo(m,this.height),h.strokeStyle=c,h.lineWidth=n,h.stroke()}for(let C=0;C<=S;C++){const m=C===0?w+e/2:w+e+C*(o+r)-r/2;h.beginPath(),h.moveTo(s,m),h.lineTo(this.width/g(this,W)-s,m),h.strokeStyle=C===0?a:l,h.lineWidth=C===0?e:r,h.stroke()}},at=function(i){const{stringLineWidth:t,stringSpacing:e,stringCount:n,notesOutsideOfChords:r,devicePixelRatio:s,crossLineColor:o,crossLineWidth:a,crossRadius:c}=i,l=g(this,R),d=this.gridRect.top/s;for(let f=0;f<n;f++){if(!T(this,O,ht).call(this,f,i))continue;const u=f*(e+t)+e+t/2;if(r[n-f]){const h=T(this,O,lt).call(this,i),w=h.width/s,S=h.height/s;l.drawImage(h,u-w/2,d-S,w,S)}else l.fillStyle=o,l.beginPath(),l.arc(u,d-c-a/2,c,0,Math.PI*2),l.lineWidth=a,l.strokeStyle=o,l.stroke()}},ht=function(i,t){const{matrix:e}=t;for(let n=0;n<e.length;n++)if(e[n][i]>0)return!1;return!0},lt=function(i){const{crossLineColor:t,crossLineWidth:e,crossRadius:n,devicePixelRatio:r}=i,s=n*2*r,o=document.createElement("canvas"),a=o.getContext("2d");o.width=o.height=s,a.beginPath();const c=T(this,O,j).call(this,n,-Math.PI/4,r),l=T(this,O,j).call(this,n,3*Math.PI/4,r);a.moveTo(c.x,c.y),a.lineTo(l.x,l.y);const d=T(this,O,j).call(this,n,Math.PI/4,r),f=T(this,O,j).call(this,n,-3*Math.PI/4,r);return a.moveTo(d.x,d.y),a.lineTo(f.x,f.y),a.strokeStyle=t,a.lineJoin="round",a.lineWidth=e*r,a.stroke(),[c,l,d,f].forEach(({x:u,y:h})=>{a.fillStyle=t,a.beginPath(),a.arc(u,h,e*r/2,0,Math.PI*2),a.fill()}),o},j=function(i,t,e){const n=i*Math.cos(t),r=i*Math.sin(t);return{x:(n+i)*e,y:(r+i)*e}};/*!
 * @guitar-chords/svg version 0.0.9
 * Author: Capricorncd<capricorncd@qq.com>
 * Homepage: https://github.com/capricorncd/guitar-chords
 * Released on: 2024-11-10 23:33:31 (GMT+0900)
 */var Ct=i=>{throw TypeError(i)},et=(i,t,e)=>t.has(i)||Ct("Cannot "+e),$=(i,t,e)=>(et(i,t,"read from private field"),e?e.call(i):t.get(i)),q=(i,t,e)=>t.has(i)?Ct("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(i):t.set(i,e),V=(i,t,e,n)=>(et(i,t,"write to private field"),t.set(i,e),e),M=(i,t,e)=>(et(i,t,"access private method"),e);const $t={autoRender:!0,defaultColor:"#000",defaultLineWidth:4,transpose:0,name:"",nameFontSize:60,spacing:20,fretsSpacing:50,stringSpacing:30,fingerRadius:15,fingerNumberTextColor:"#fff",showFingerNumber:!0,startFrets:0,matrix:[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]],mergeFingerCircle:!1,showNotesOutsideOfChords:!1},y=(i,t={},e)=>{const n=document.createElementNS("http://www.w3.org/2000/svg",i);for(const[r,s]of Object.entries(t))!s&&s!==0||n.setAttribute(r,String(s));return e&&(n.textContent=String(e)),n};var P,b,X,k,Y,ct,dt,_,gt,ft,ut,mt;class it{constructor(t={}){q(this,k),q(this,P),q(this,b),q(this,X,"0.0.9"),V(this,P,{...$t,...t});const{autoRender:e}=$(this,P);V(this,b,y("svg")),e&&M(this,k,Y).call(this)}get element(){return $(this,b)}get width(){const{stringCount:t,stringSpacing:e,stringLineWidth:n}=this.data;return e*(t+1)+n*t}get height(){const{nutLineWidth:t,fretsSpacing:e,fretsLineWidth:n,matrix:r,spacing:s,nameFontSize:o}=this.data;return t+(e+n)*r.length+o+s}get gridRect(){const{nutLineWidth:t,stringSpacing:e,stringLineWidth:n,stringCount:r,matrix:s,spacing:o,fretsSpacing:a,fretsLineWidth:c,nameFontSize:l}=this.data;return{width:e*(r-1)+n*r,height:t+(a+c)*s.length,left:e,top:l+o,right:this.width-e,bottom:this.height}}get version(){return $(this,X)}get data(){const{defaultColor:t,defaultLineWidth:e,fingerRadius:n,matrix:r}=$(this,P),{nameTextColor:s=t,nutLineWidth:o=e,nutColor:a=t,fretsColor:c=t,fretsLineWidth:l=e,stringColor:d=t,stringLineWidth:f=e,fingerCircleColor:u=t,startFretsTextColor:h=t,transposeTextColor:w=s,notesOutsideOfChords:S={},showNotesOutsideOfChords:C,crossLineWidth:m=Math.min(f,l),crossLineColor:x=t,crossRadius:p=n*.75,nameLetterSpacing:L=0}=$(this,P);return{...$(this,P),nameTextColor:s,nutLineWidth:o,nutColor:a,fretsColor:c,fretsLineWidth:l,stringColor:d,stringLineWidth:f,fingerCircleColor:u,startFretsTextColor:h,transposeTextColor:w,notesOutsideOfChords:S,showNotesOutsideOfChords:C||Object.keys(S).length>0,crossLineWidth:m,crossLineColor:x,crossRadius:p,nameLetterSpacing:L,stringCount:r[0].length??6}}render(t){return t&&V(this,P,{...$(this,P),...t}),$(this,b).innerHTML="",M(this,k,Y).call(this),this}}P=new WeakMap,b=new WeakMap,X=new WeakMap,k=new WeakSet,Y=function(){const i=this.data,{width:t,height:e}=this;$(this,b).setAttribute("width",`${t}`),$(this,b).setAttribute("height",`${e}`),$(this,b).setAttribute("viewBox",`0 0 ${t} ${e}`),M(this,k,ft).call(this,i),M(this,k,gt).call(this,i),M(this,k,dt).call(this,i),M(this,k,ct).call(this,i),i.showNotesOutsideOfChords&&M(this,k,ut).call(this,i)},ct=function(i){const{name:t,nameTextColor:e,nameFontSize:n,transposeTextColor:r,transpose:s,nameLetterSpacing:o}=i,a=!!s,c=n/2,l=y("text",{id:"gc-name",x:this.width/2-(a?c/2:0),y:n/2+c*.2,fill:e,"font-size":n,"text-anchor":"middle","dominant-baseline":"middle"});$(this,b).appendChild(l),a&&l.append(y("tspan",{fill:r,style:`font-size: ${c}px;`,"alignment-baseline":"middle","baseline-shift":"super"},s===1?"♯":"♭"));const d=y("tspan",{style:`letter-spacing:${o}px;`,"alignment-baseline":"middle"},t);l.append(d),setTimeout(()=>{const f=this.gridRect.width,{width:u}=d.getBBox();u>f&&(d.setAttribute("textLength",String(f)),d.setAttribute("lengthAdjust","spacingAndGlyphs"))},0)},dt=function(i){const{stringSpacing:t,fingerCircleColor:e,stringLineWidth:n,fingerRadius:r,spacing:s,matrix:o,fretsSpacing:a,fretsLineWidth:c,nameFontSize:l,nutLineWidth:d,fingerNumberTextColor:f,showFingerNumber:u,mergeFingerCircle:h}=i,w=r*1.5,S=y("g",{id:"gc-finger"}),C=new Map;for(let m=0;m<o.length;m++)for(let x=0;x<o[m].length;x++){const p=o[m][x];if(p>0){const L=x*(t+n)+n/2+t,F=(m+.5)*(a+c)+c/2+l+s+d-c;if(h){C.has(p)||C.set(p,[]);const v=C.get(p);if(v.push({x:L,y:F}),v.length>1&&x===o[m].lastIndexOf(p)){const G=v[0],D={x:L,y:F},I=y("line",{x1:`${G.x}`,y1:`${G.y}`,x2:`${D.x}`,y2:`${D.y}`,stroke:e,"stroke-width":`${r*2}`,"stroke-linecap":"round"});S.appendChild(I),u&&S.appendChild(M(this,k,_).call(this,L,F,p,f,w));continue}}if(!h||o[m].filter(v=>v===p).length===1){const v=y("circle",{cx:`${L}`,cy:`${F}`,r:`${r}`,fill:e});S.appendChild(v)}u&&(!h||x===o[m].lastIndexOf(p))&&S.appendChild(M(this,k,_).call(this,L,F,p,f,w))}}$(this,b).appendChild(S)},_=function(i,t,e,n,r){return y("text",{x:`${i}`,y:`${t}`,fill:n,"font-size":`${r}`,"text-anchor":"middle","dominant-baseline":"central"},e)},gt=function(i){const{startFretsTextColor:t,startFrets:e,nameFontSize:n,nutLineWidth:r,fretsLineWidth:s,fretsSpacing:o}=i;if(e<=1)return;const a=n/2,c=y("text",{id:"gc-fret-number",x:"0",y:`${this.gridRect.top+r+o/2+s*2}`,fill:t,"font-size":`${a}`,"font-style":"italic"},e);$(this,b).appendChild(c)},ft=function(i){const{matrix:t,stringLineWidth:e,stringSpacing:n,stringColor:r,stringCount:s,fretsSpacing:o,fretsLineWidth:a,fretsColor:c,nutLineWidth:l,nutColor:d}=i,f=t.length,{top:u,bottom:h,right:w,left:S}=this.gridRect,C=y("g",{id:"gc-grid"}),m=y("g",{id:"gc-grid-string",stroke:r,"stroke-width":e});for(let p=0;p<s;p++){const L=p*(n+e)+e/2+n,F=y("line",{x1:`${L}`,y1:`${u+l}`,x2:`${L}`,y2:`${h}`});m.appendChild(F)}const x=y("g",{id:"gc-grid-fret",stroke:c,"stroke-width":a});for(let p=0;p<=f;p++){const L=p===0,F=L?u+l/2:p*(o+a)+u+l-a/2,v=y("line",{x1:`${S}`,y1:`${F}`,x2:`${w}`,y2:`${F}`,stroke:L&&d!==c?d:null,"stroke-width":L&&l!==a?l:null});x.appendChild(v)}C.append(m,x),$(this,b).appendChild(C)},ut=function(i){const{stringLineWidth:t,stringSpacing:e,stringCount:n,notesOutsideOfChords:r,crossRadius:s,crossLineColor:o,crossLineWidth:a}=i,c=y("g",{id:"gc-chord-tone",stroke:o,"stroke-width":a}),l=this.gridRect.top;for(let d=0;d<n;d++){if(!M(this,k,mt).call(this,d,i))continue;const f=d*(e+t)+t/2+e;if(r[n-d]){const u=y("g",{transform:`translate(${f-s}, ${l-s*2}) rotate(45 ${s} ${s})`}),h=y("line",{x1:0,y1:s,x2:s*2,y2:s,"stroke-linecap":"round"});u.appendChild(h);const w=y("line",{x1:s,y1:0,x2:s,y2:s*2,"stroke-linecap":"round"});u.appendChild(w),c.appendChild(u)}else{const u=y("circle",{cx:`${f}`,cy:`${l-s-a/2}`,r:`${s}`,fill:"transparent"});c.appendChild(u)}}$(this,b).appendChild(c)},mt=function(i,t){const{matrix:e}=t;for(let n=0;n<e.length;n++)if(e[n][i]>0)return!1;return!0};const H=[{name:"C",matrix:[[0,0,0,0,1,0],[0,0,2,0,0,0],[3,4,0,0,0,0]]},{name:"Dm",nutLineWidth:10,fingerNumberTextColor:"#f30",matrix:[[0,0,0,0,0,1],[0,0,0,2,0,0],[0,0,0,0,3,0]]},{name:"Em",fretsLineWidth:8,nameTextColor:"#080",nutColor:"#f30",fingerCircleColor:"#f30",stringColor:"#078",fretsColor:"#f88",matrix:[[0,0,0,0,0,0],[0,2,3,0,0,0],[0,0,0,0,0,0]]},{name:"F",stringLineWidth:12,fingerCircleColor:"#f30",matrix:[[1,0,0,0,1,1],[0,0,0,2,0,0],[0,3,4,0,0,0]]},{name:"G",nutLineWidth:10,matrix:[[0,0,0,0,0,0],[0,2,0,0,0,0],[3,0,0,0,0,4]],showNotesOutsideOfChords:!0},{name:"Am",matrix:[[0,0,0,0,1,0],[0,0,2,3,0,0],[0,0,0,0,0,0]],notesOutsideOfChords:{6:!0},crossLineWidth:2},{name:"G7",matrix:[[0,0,0,0,0,1],[0,2,0,0,0,0],[3,0,0,0,0,0]]},{name:"C3",startFrets:3,startFretsTextColor:"#f30",nutLineWidth:10,matrix:[[1,1,0,0,0,1],[0,0,0,0,0,0],[0,0,2,3,4,0]]},{name:"F",transpose:1,startFrets:2,matrix:[[1,1,0,0,0,1],[0,0,0,2,0,0],[0,3,4,0,0,0]]},{name:"Am",transpose:1,transposeTextColor:"#f30",matrix:[[1,1,0,0,0,1],[0,0,0,0,2,0],[0,0,3,4,0,0]]},{name:"C3",startFrets:2,transpose:-1,startFretsTextColor:"#f30",showFingerNumber:!1,mergeFingerCircle:!0,matrix:[[1,1,0,0,0,1],[0,0,0,0,0,0],[0,0,2,3,4,0]]},{name:"C3",startFrets:3,startFretsTextColor:"#f30",nutLineWidth:10,mergeFingerCircle:!0,matrix:[[1,1,0,0,0,1],[0,0,0,0,0,0],[0,0,3,3,3,0]]},{name:"Fmaj7",startFrets:5,startFretsTextColor:"#f30",nutLineWidth:10,mergeFingerCircle:!0,matrix:[[0,0,0,1,1,1],[0,0,2,0,0,0],[0,3,0,0,0,0]]},{name:"Cm7-5",startFrets:3,transpose:1,nutLineWidth:10,mergeFingerCircle:!0,nameLetterSpacing:-5,matrix:[[0,0,0,0,0,0],[0,1,0,2,0,0],[0,0,3,0,4,0]],notesOutsideOfChords:{6:!0}}],xt={name:"C",transpose:1,matrix:[[0,0,0,1,0,1],[0,0,0,0,2,0],[0,0,3,0,0,0],[0,4,0,0,0,0]],notesOutsideOfChords:{6:!0},mergeFingerCircle:!0},z=document.getElementById("app"),K=new tt({...H[0],autoRender:!1});console.log(K.data);const Lt=document.createElement("h1");Lt.textContent="@guitar-chords/canvas "+K.version;z.append(Lt);z.append(...H.map(i=>new tt(i).element));K.render();z.append(K.render(xt).element);const Wt={nutLineWidth:10,showFingerNumber:!1,fretsSpacing:36,spacing:0,nameFontSize:50},wt=[{name:"C",matrix:[[0,0,0,0],[0,0,0,0],[0,0,0,1],[0,0,0,0]]},{name:"Dm",matrix:[[0,0,1,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]]},{name:"Em",matrix:[[0,0,0,0],[0,0,0,1],[0,0,1,0],[0,1,0,0]]},{name:"F",matrix:[[0,0,1,0],[1,0,0,0],[0,0,0,0],[0,0,0,0]]},{name:"G",matrix:[[0,0,0,0],[0,1,0,1],[0,0,1,0],[0,0,0,0]]},{name:"Am",matrix:[[0,0,0,0],[1,0,0,0],[0,0,0,0],[0,0,0,0]]},{name:"G7",matrix:[[0,0,1,0],[0,2,0,3],[0,0,0,0],[0,0,0,0]]}];z.append(...wt.map(i=>new tt({...Wt,...i}).element));const J=new it({...H[0],autoRender:!1});console.log(J.data);const St=document.createElement("h1");St.textContent="@guitar-chords/svg "+J.version;z.append(St);z.append(...H.map(i=>new it(i).element));J.render();z.append(J.render({...xt,name:"Test"}).element);z.append(...wt.map(i=>new it({...Wt,...i}).element));
