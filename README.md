# StackVM

JavaScript code obfuscator based on stack virtual machine virtualization. Transforms your JavaScript code into a virtualized stack-based representation, making it harder to understand while maintaining functionality.

# Features

- Converts JavaScript code to stack-based virtual machine instructions
- Preserves original program functionality
- Lightweight obfuscation solution
- Focus on core JavaScript features

# Installation
```bash
git clone https://github.com/x676w/StackVM

cd StackVM

npm install
```

Edit `obfuscate.js`
```js
const obfuscate = require("./dist").default;
const confuser = require("js-confuser");

obfuscate(`
  console.log('Hello, World!');
`).then(async (interpreter) => {
  interpreter = (await confuser.obfuscate(interpreter, {
    target: 'browser',
    identifierGenerator: 'mangled',
    renameVariables: true,
    renameGlobals: true,
    movedDeclarations: true,

    stringCompression: false,
    stringConcealing: true,
    stringEncoding: false,
    stringSplitting: false,

    calculator: true,
    objectExtraction: true,
    globalConcealing: false,
    shuffle: false,
    duplicateLiteralsRemoval: 0.2,

    controlFlowFlattening: false,
    dispatcher: 0.2,
    opaquePredicates: 0.1,
    deadCode: false,

    flatten: false,
    rgf: false,
    pack: false,

    compact: true,
    minify: true
  })).code;

  console.log(interpreter);
});
```

```bash
npm start
```

```js
/* output */
var a,b,c,d,e,f,g,h,i;const j=[0,1,8,255,"length","undefined",63,6,"fromCodePoint",7,12,"push",91,8191,88,13,14,68,38,89,90,94,55,95,92,97];function k(a){var c="ABb}59|O*_T=fi#\"F3PuJ`oEXwH[z]WM?qIaCt4yGZVn<h:8Ux.s!c&^dL+(;0NerYvpSR$kmlgjKD@/6{7>2,1~)Q%",d,e,f,g,h,k,l;d=""+(a||"");e=d.length;f=[];g=j[0];h=j[0];k=-j[1];for(l=j[0];l<e;l++){var m=c.indexOf(d[l]);if(m===-j[1])continue;if(k<j[0]){k=m}else{k+=m*j[12];g|=k<<h;h+=(k&j[13])>j[14]?j[15]:j[16];do{f.push(g&j[3]);g>>=j[2];h-=j[2]}while(h>j[9]);k=-j[1]}}if(k>-j[1]){f.push((g|k<<h)&j[3])}return n(f)}function l(c){if(typeof a[c]===j[5]){return a[c]=k(b[c])}return a[c]}a={};b=["#n@OQq`iZ#l:YXGMnHpc]k]8Feyz5\"=JSA",";(&xYCB~#vA&40EZ)YoMvIAC8\"@{j$?Xwng?N2ya9","`]Oq8y,E:dT&7R1zdI{&jNq]LNj6>HDy)A","DhE@<d3]u&.lK\"vC~$iOq&vP?L>D,Xa3UJ}","w;tO7CjB@=$DXU@H6N[]cDOw:*jpA\"GtdULs0In8Z3P/=[f","aL_&e/yO,i{P\"HEahkHs64!P}_`MB","qEEzRm|rRu33qFVw[Y!goLA","tU9MD{&!SLOjJ\";VhHig1@Ys?\">$A","~N9!NDvWK3sv,C?Cch?_W","M_A_ey.Wl+:^S\"tXt&>Hp{Ib:`J|A}VweEyz/{&!FvFXw5","SU*sX>]ci`uIk$(EnI^z>h$!9&fIK>;VULB","bvZs2.//0=D6LX3y4|u]=1DO8dURB","F&Ij6^vS8\"4^z>uIvU<^wKzf[#TT${%];(]^/KJb;=PNVwozsIKH}U&Gx_y!B","YEE_IaOcQ3k64i1Zasi^|UA","z_/lqa5r]`z[kHhyaSVsBUpBBfo|U[dZ!sEz(y*P9","M|X&0+,E((FIF8HV2z.[#R=ej3otP{zVdhkz:$ieP&/{c;6[!hYs5/_u<3H","II1KLcm1z#","z];TrCv|,&r*QX5t,A","\"kq[}:*:+#^ecF1[!YbspI%SC&d$\"[n4{sDzrISS7;!5)ae3)IM_","hs;D^:#Xl#9+{mNCb_bjL:3c.&M(d\"4uwGpcsx,i3;JILF[ZUA","(H*|Q>&P.f3/&+eW~$Aq_Kci|","1wj9FNqZx\"$`Ym}W:tD.TLSP+Yo/R{3GBe!]878,FPh^Q5uZEY}","OH6xUSQB","ldF@#RbV*+oMvi|P)ss]b1A","XkS9c72X_NlB&t=w",":s]O+myOh`URGm(E}&B|CdiwH#Rv8+]C0Iz]}1~OO",",s+?|UeZtixR7HAncSRz=>o!b_9S+{zC_tZsDCauALTJS\"(E]_5D(sMO}","`](?BcWPN(T+C[[]gSAs]8A","fS?&9R#X/*2=L5j4cfKDq0AXdiM+Ck[ZysFj1h4b","\"\"m_c2C+|u7=<kk4EYC]$^A","cstK@KZe8ed6)U4PC;*s)8orq_M#H9","Un[Dht4+!&=j[7tX|xI?u","y}p*w@Q3A`q`qF2GL#kl6k(8b&Rv92at]GCD7hYZ<#pzs#4XWB","csRz|U1G=JKDJ\"3GPB","<IKg8+S|Crkz\"HA3uG%?0;_cee<!B","5LSc!d:fyrcR`m&Z5;$5@R@+XihMB","rSNKBcuZ?\"A@B{W]W:)&~@|W*J/=ot|PBGn?m;!b","<kN!?GzCw3Y(d\"3I.Ub[[4dW&ujcE4pP!G~x]GX*Uc%$e4pwAevcX8}j,u","ps.s@.nO\"\"/=j49XoshK=g8j\"\"%$7b9M)#umH&_Z_NH","2zGliU?Pj*h","Hge5,KDiIeI/xU8H]tScjU}Z>LHR[[SXFPe_",":fE5xjr|Uc:N/4=y","`YDg,.>OTYt^&t$4I;}mDgA","lN|OfRI!v_Gzz8(39\"zTVSRRBL[^;}?PkY&z8yS1BL<K5\"kPIt%?mKBa)i","[\"(?6!nLnN_+V0zV,$>?${|CJ_Y=~HbXL&*qJ","`&M&IG)IYeSlXm%Cr|[?6>~3:cG!DCpw[SG|M0~LnY)pYXT","6d0KpmIWJr>$a(w]|]$k+$+W:PrvLXbP$scK.D;g=Yg6P9","R}]O7@WX&i<","mYAWQK5*6f","~UrxV7fb","z&tOy,lLW`)?j4aMJ]exnd+P%Y{=E#v36#Y|D.q8TN][?(uZ>l8x[","vt.?!ti8]`","4H$KR{Ds\";B[1RpWqUf]0Iau_3`T<(fHIn(?ql{B",".&o![4zP[YhR92zC%(}","F\"Kc/kzb\";r$YtBE{UTmyldWOJ","W:NzDU4PZ3}b}H1z^I~xI,::>fBmo7fH!_sm]GS:Or[i;(SM,z?W7R,LP\"~BB","jMv*/^jRh={{s7.I","Wt,.F.^E#efS*>E][I.[1@gGu_9bo9MWBaf]EKv+<31D{U>[#?zg[","&hWz7>Bcr;~CB","Wt9Oa0KG?L=+i;rVlh;D?&A","(N=]fU^ElJGOG8T","=E5TH4Eu!in63;6GRSpTH@V!(Y%DotHCx}hTi^E8z3uUW9_","bv%sy8)GUL}+RXLz{Y@xQL<PmiVO>H|P<E<Dkg\"i<#}F#9Hzms!D?G^a|","0&/|xdYi/\"bjM}rtu?M!z,<!\"e6:W9",";(~|k{LZnJ9E#t$4E\"cO2k2:9&_YLXXZO:FjXK1N|T2w<}}3/$]^Wk1!]`","2U$M!eAPedAjs#WX&J@zTL]Z^+w+@wr3_e|q~q[u2ijB6\"f","SlXxct=O]NL6r}0V5x8_US&PT({p0w?POkm&[@m:=(A[B","sYag*KmPX+$BWt~oKhDHFL=i;3\"Sb{Ku~NU[Usp]crCI,X*4]JXl)LA","hsczOc0]dig6<}OP.Y_|zGOBAeo^b{AE","|nfT5cw{w397H{HZ&UF_F!A","6J*WN+^B)3SdQ5","M:~_uNL,9u","tfRT^$J!w3n#\"4!GXs451KjON*z","}nG|6.zX?\"!","5_]^[aV:{LAmUFItZYB","nnrS+ulRq0V}/)4],m","Tnlu8_)R","qJBCCv{",")P05V;Q,p0C3Rzp","~5V7ALb]","`+Vd^=.<","Jb,Rj\"ZhLid@D","7bpJaKX<<<CMD","IhhVNzd$0UZrD","W=^K[@`V5lE{R","v_bAzoS;|",")_xR","o0yRMo\"HXq_QQeW.","v2|f=w)O","*E[#gXbj","/Ku?m9WBH_gcj","oBBJA+g#C;Wlj","03_OpRVmnDG4j","%vws","w&YZ","]S{r@","QLYZ*ae","5B!NjnQ94DW","(EiUHY[m[Pd2Jb"];function m(){var a=[function(){return globalThis},function(){return global},function(){return 
window},function(){return new Function("return this")()}],b,c,d;b=void 0;c=[];try{b=Object;c[j[11]]("".__proto__.constructor.name)}catch(f){}a:for(d=j[0];d<a[j[4]];d++)try{var g;b=a[d]();for(g=j[0];g<c[j[4]];g++)if(typeof b[c[g]]===j[5])continue a;return b}catch(f){}return b||this}c=m()||{};d=c.TextDecoder;e=c.Uint8Array;f=c.Buffer;g=c.String||String;h=c.Array||Array;i=function(){var a=new h(128),b,c;b=g[j[8]]||g.fromCharCode;c=[];return function(d){var e,f,h,k;f=void 0;h=d[j[4]];c[j[4]]=j[0];for(k=j[0];k<h;){f=d[k++];f<=127?e=f:f<=223?e=(f&31)<<j[7]|d[k++]&j[6]:f<=239?e=(f&15)<<j[10]|(d[k++]&j[6])<<j[7]|d[k++]&j[6]:g[j[8]]?e=(f&j[9])<<18|(d[k++]&j[6])<<j[10]|(d[k++]&j[6])<<j[7]|d[k++]&j[6]:(e=j[6],k+=3);c[j[11]](a[e]||(a[e]=b(e)))}return c.join("")}}();function n(a){return typeof d!==j[5]&&d?new d().decode(new e(a)):typeof 
f!==j[5]&&f?f.from(a).toString("utf-8"):i(a)}function o(c,d=j[1]){function e(c){var d="{mRBJohAjLqVpYOnKbiklNWTcE)xMF,SC*~GQI@.]asP2dr(3=y>!#5769&+[zw?%0t$}Hev:<;Ugu8D1_X\"|Z4/`f^",e,f,a,g,h,k,l;e=""+(c||"");f=e.length;a=[];g=j[0];h=j[0];k=-j[1];for(l=j[0];l<f;l++){var m=d.indexOf(e[l]);if(m===-j[1])continue;if(k<j[0]){k=m}else{k+=m*j[12];g|=k<<h;h+=(k&j[13])>j[14]?j[15]:j[16];do{a.push(g&j[3]);g>>=j[2];h-=j[2]}while(h>j[9]);k=-j[1]}}if(k>-j[1]){a.push((g|k<<h)&j[3])}return n(a)}function f(c){if(typeof a[c]===j[5]){return a[c]=e(b[c])}return a[c]}Object[f(75)](c,f(76),{[f(77)]:d,[f(78)]:!1});return c}!function(){var c,d;function f(c){var d="H<]%2.|gxRGFPh0+Xs/9b*ErefvDtj;7iMz)`>VYun3_}!S,ymN5d?=8a$l:#C4B6p~1OwT{IJ(qKAoWQL[U&Zck\"@^",f,g,h,k,l,m,a;f=""+(c||"");g=f.length;h=[];k=j[0];l=j[0];m=-j[1];for(a=j[0];a<g;a++){var e=d.indexOf(f[a]);if(e===-j[1])continue;if(m<j[0]){m=e}else{m+=e*j[12];k|=m<<l;l+=(m&j[13])>j[14]?j[15]:j[16];do{h.push(k&j[3]);k>>=j[2];l-=j[2]}while(l>j[9]);m=-j[1]}}if(m>-j[1]){h.push((k|m<<l)&j[3])}return n(h)}function g(c){if(typeof a[c]===j[5]){return a[c]=f(b[c])}return a[c]}c=Object[g(79)](null);d=void 0;function h(f,h,l,m={},e,p,q,r){if(!p){p=function(f){if(typeof a[f]===j[5]){return a[f]=e(b[f])}return a[f]}}if(!e){e=function(f){var h="ODjb49V/u_vt=T^}{)k@3Asyr+x2Fq~]c0IMQnGlhoW5`L8p6PZ#$ia:NUCe*Bg<7mSH?E[R.J>X&KYzf\"!;|(,w1%d",l,m,e,q,r,s,t;l=""+(f||"");m=l.length;e=[];q=j[0];r=j[0];s=-j[1];for(t=j[0];t<m;t++){var u=h.indexOf(l[t]);if(u===-j[1])continue;if(s<j[0]){s=u}else{s+=u*j[12];q|=s<<r;r+=(s&j[13])>j[14]?j[15]:j[16];do{e.push(q&j[3]);q>>=j[2];r-=j[2]}while(r>j[9]);s=-j[1]}}if(s>-j[1]){e.push((q|s<<r)&j[3])}return n(e)}}q=void 0;r={[g(80)]:function(){return k[i++]}};if(h===p(81)){d=[]}if(h===p(82)){function s(){var h=function(...h){d=h;return r[f].apply(this)},l;l=m[f];if(l){o(h,l)}return h}q=c[f]||(c[f]=s())}else{q=r[f]()}if(l===p(83)){function t(f){var h="HRVDKPOZpXCBgTn,`lEbYkM?rGw2c7eftJ<QmIy+qLaxh~(S=:d8F^j#3i4WAosN_0\"*;9v%5)|{u}@z$1/.[&]>6!U",l,m,e,q,r,s,t;l=""+(f||"");m=l.length;e=[];q=j[0];r=j[0];s=-j[1];for(t=j[0];t<m;t++){var u=h.indexOf(l[t]);if(u===-j[1])continue;if(s<j[0]){s=u}else{s+=u*j[12];q|=s<<r;r+=(s&j[13])>j[14]?j[15]:j[16];do{e.push(q&j[3]);q>>=j[2];r-=j[2]}while(r>j[9]);s=-j[1]}}if(s>-j[1]){e.push((q|s<<r)&j[3])}return n(e)}function u(f){if(typeof a[f]===j[5]){return a[f]=t(b[f])}return a[f]}return{[u(84)]:q}}else{return q}}let i=j[0];const k=[j[22],g(85),j[17],g(86),j[17],g(87),j[18],j[1]],l=[];function m(c,d){if(!d){d=function(d){if(typeof a[d]===j[5]){return a[d]=c(b[d])}return a[d]}}if(!c){c=function(c){var d="aGO!XPKT~/YCu[t2Fb$_|E}v\">)m480@,RDdq]^Vos;(#*kcgZ9S7H{e`B:M%hlUANzIQ15W<LpJ.f=yiwnx6j3r?+&",f,g,h,k,l,m,a;f=""+(c||"");g=f.length;h=[];k=j[0];l=j[0];m=-j[1];for(a=j[0];a<g;a++){var e=d.indexOf(f[a]);if(e===-j[1])continue;if(m<j[0]){m=e}else{m+=e*j[12];k|=m<<l;l+=(m&j[13])>j[14]?j[15]:j[16];do{h.push(k&j[3]);k>>=j[2];l-=j[2]}while(l>j[9]);m=-j[1]}}if(m>-j[1]){h.push((k|m<<l)&j[3])}return n(h)}}if(!(i>=k[d(j[14])])){return function(){var d,f;function g(f){var g="ejmKObJQMZry:{<EVDGcPtd8l1@=](!NUCo)*|[wB}`&zHLf3kW^#_XvA;20S5sq>F6iT%I?n/\"4hxR+Y9,.pau$7~g",o,w,x,y,z,c,h;o=""+(f||"");w=o.length;x=[];y=j[0];z=j[0];c=-j[1];for(h=j[0];h<w;h++){var k=g.indexOf(o[h]);if(k===-j[1])continue;if(c<j[0]){c=k}else{c+=k*j[12];y|=c<<z;z+=(c&j[13])>j[14]?j[15]:j[16];do{x.push(y&j[3]);y>>=j[2];z-=j[2]}while(z>j[9]);c=-j[1]}}if(c>-j[1]){x.push((y|c<<z)&j[3])}return n(x)}function o(d){if(typeof a[d]===j[5]){return a[d]=g(b[d])}return a[d]}switch(h(o(j[19]),o(j[20]),o(j[12]))[o(j[24])]){case j[18]:for(var v=h(o(j[19]),o(j[20])),w=new Array(v),x=j[0];x<v;x++){function y(f){var g="JXokApmRtsCdlnSeZPgFiBabOGLNDVUQqWET=2x%_19v0<?(7]6[>\"/5YjcKrfI,H:yMhz!|~&{$;)*@w^u`.348#+}",o,w,x,y,z,c,h;o=""+(f||"");w=o.length;x=[];y=j[0];z=j[0];c=-j[1];for(h=j[0];h<w;h++){var k=g.indexOf(o[h]);if(k===-j[1])continue;if(c<j[0]){c=k}else{c+=k*j[12];y|=c<<z;z+=(c&j[13])>j[14]?j[15]:j[16];do{x.push(y&j[3]);y>>=j[2];z-=j[2]}while(z>j[9]);c=-j[1]}}if(c>-j[1]){x.push((y|c<<z)&j[3])}return n(x)}function z(d){if(typeof a[d]===j[5]){return a[d]=y(b[d])}return a[d]}w[x]=l[z(93)]()}d=l[o(j[21])]();f=l[o(j[21])]();l[o(j[23])](f[d][o(96)](f,w));break;case j[22]:l[o(j[23])](o(j[25])!=typeof window?window[new h(o(j[19]),o(j[20]),o(j[12]))[o(j[24])]]:o(j[25])!=typeof global?global[h(o(j[19]),o(j[20]))]:new Function(o(98))()[h(o(j[19]),o(j[20]),o(j[12]))[o(j[24])]]);break;case j[17]:l[o(j[23])](h(o(j[19]),o(j[20])))}}(),!j[0]}}for(;m();){}}();
```

# Supported Features
- Arithmetic	          ✅
- Variables	            ✅
- Logical Expressions	  ✅
- Unary Expressions	    ✅
- Call Expressions	    ✅
- Arrays	              ✅
- Objects	              ❌​
- Functions	            ❌​
- Loops	                ❌​
- Conditionals	        ❌​

# How It Works
StackVM transforms your JavaScript code into a series of stack operations executed by a virtual machine. The original code structure is replaced with:

A stack-based instruction set

A virtual machine interpreter

Obfuscated data storage

This approach makes reverse engineering more difficult while keeping the runtime behavior identical.

# Limitations
Currently only supports a subset of JavaScript features

Not a strong obfuscation solution for security-critical applications

May impact performance for complex operations

# License
[![License](https://img.shields.io/badge/license-UNLICENSED-lightgray.svg)]()