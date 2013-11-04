define("wozllajs/var/isArray",[],function(){var e=Object.prototype.toString;return function(t){return e.call(t)==="[object Array]"}}),define("wozllajs/var/isImage",[],function(){var e=Object.prototype.toString;return function(t){var n=e.call(t);return n==="[object Image]"||n==="[object HTMLImageElement]"}}),define("wozllajs/var/inherits",[],function(){return function(e,t){return e._super=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}}),define("wozllajs/var/uniqueKey",[],function(){var e=1;return function(){return e++}}),define("wozllajs/var/slice",[],function(){return function(e){var t=Array.prototype.slice.apply(arguments,[1]);return Array.prototype.slice.apply(e,t)}}),define("wozllajs/var/createCanvas",[],function(){return function(e,t){var n=document.createElement("canvas");return n.width=e,n.height=t,n}}),define("wozllajs/var/support",[],function(){return{touch:"ontouchstart"in window}}),define("wozllajs/var/getSuperConstructor",[],function(){return function(e){return typeof e=="function"?e._super:null}}),define("wozllajs/globals",[],function(){return{METHOD_UPDATE:"update",METHOD_LATE_UPDATE:"lateUpdate",METHOD_DRAW:"draw",METHOD_INIT_COMPONENT:"initComponent",METHOD_DESTROY_COMPONENT:"destroyComponent"}}),define("wozllajs/var",["./var/isArray","./../wozllajs/var/isImage","./../wozllajs/var/inherits","./../wozllajs/var/uniqueKey","./../wozllajs/var/slice","./../wozllajs/var/createCanvas","./../wozllajs/var/support","./../wozllajs/var/getSuperConstructor","./globals"],function(e,t,n,r,i,s,o,u,a){var f={isArray:e,isImage:t,inherits:n,uniqueKey:r,slice:i,createCanvas:s,support:o,getSuperConstructor:u};for(var l in a)f[l]=a[l];return f}),define("wozllajs/promise",["./var"],function(e){var t=function(){this._thenQueue=[],this._errorQueue=[]};t.wait=function(n){var r,i,s=new t,o=0,u=[];arguments.length===1?e.isArray(n)||(n=[n]):n=e.slice(arguments);for(r=0,i=n.length;r<i;r++)(function(t,r){n[t].then(function(n){return o++,n=arguments.length>1?e.slice(arguments):n,u[t]=n,o===r&&s.done.apply(s,u),n})})(r,i);return s};var n=t.prototype;return n.then=function(e,t){return this._thenQueue.push({callback:e,context:t}),this},n.catchError=function(e,t){return this._errorQueue.push({callback:e,context:t}),this},n.done=function(){return this._nextThen.apply(this,arguments),this},n.sendError=function(e){return this._nextError(e),this},n._nextThen=function(){var t=this._thenQueue.shift();if(t){var n=t.callback.apply(t.context||this,arguments);n=e.isArray(n)?n:[n],this._nextThen.apply(this,n)}},n._nextError=function(){var t=this._errorQueue.shift();if(t){var n=t.callback.apply(t.context||this,arguments);n=e.isArray(n)?n:[n],this._nextError.apply(this,n)}},t}),define("wozllajs/math/Matrix2D",[],function(){var e=function(e,t,n,r,i,s){this.initialize(e,t,n,r,i,s)},t=e.prototype;return e.identity=null,e.DEG_TO_RAD=Math.PI/180,t.a=1,t.b=0,t.c=0,t.d=1,t.tx=0,t.ty=0,t.alpha=1,t.shadow=null,t.compositeOperation=null,t.initialize=function(e,t,n,r,i,s){return this.a=e==null?1:e,this.b=t||0,this.c=n||0,this.d=r==null?1:r,this.tx=i||0,this.ty=s||0,this},t.prepend=function(e,t,n,r,i,s){var o=this.tx;if(e!=1||t!=0||n!=0||r!=1){var u=this.a,a=this.c;this.a=u*e+this.b*n,this.b=u*t+this.b*r,this.c=a*e+this.d*n,this.d=a*t+this.d*r}return this.tx=o*e+this.ty*n+i,this.ty=o*t+this.ty*r+s,this},t.append=function(e,t,n,r,i,s){var o=this.a,u=this.b,a=this.c,f=this.d;return this.a=e*o+t*a,this.b=e*u+t*f,this.c=n*o+r*a,this.d=n*u+r*f,this.tx=i*o+s*a+this.tx,this.ty=i*u+s*f+this.ty,this},t.prependMatrix=function(e){return this.prepend(e.a,e.b,e.c,e.d,e.tx,e.ty),this.prependProperties(e.alpha,e.shadow,e.compositeOperation),this},t.appendMatrix=function(e){return this.append(e.a,e.b,e.c,e.d,e.tx,e.ty),this.appendProperties(e.alpha,e.shadow,e.compositeOperation),this},t.prependTransform=function(t,n,r,i,s,o,u,a,f){if(s%360)var l=s*e.DEG_TO_RAD,c=Math.cos(l),h=Math.sin(l);else c=1,h=0;if(a||f)this.tx-=a,this.ty-=f;return o||u?(o*=e.DEG_TO_RAD,u*=e.DEG_TO_RAD,this.prepend(c*r,h*r,-h*i,c*i,0,0),this.prepend(Math.cos(u),Math.sin(u),-Math.sin(o),Math.cos(o),t,n)):this.prepend(c*r,h*r,-h*i,c*i,t,n),this},t.appendTransform=function(t,n,r,i,s,o,u,a,f){if(s%360)var l=s*e.DEG_TO_RAD,c=Math.cos(l),h=Math.sin(l);else c=1,h=0;o||u?(o*=e.DEG_TO_RAD,u*=e.DEG_TO_RAD,this.append(Math.cos(u),Math.sin(u),-Math.sin(o),Math.cos(o),t,n),this.append(c*r,h*r,-h*i,c*i,0,0)):this.append(c*r,h*r,-h*i,c*i,t,n);if(a||f)this.tx-=a*this.a+f*this.c,this.ty-=a*this.b+f*this.d;return this},t.rotate=function(e){var t=Math.cos(e),n=Math.sin(e),r=this.a,i=this.c,s=this.tx;return this.a=r*t-this.b*n,this.b=r*n+this.b*t,this.c=i*t-this.d*n,this.d=i*n+this.d*t,this.tx=s*t-this.ty*n,this.ty=s*n+this.ty*t,this},t.skew=function(t,n){return t*=e.DEG_TO_RAD,n*=e.DEG_TO_RAD,this.append(Math.cos(n),Math.sin(n),-Math.sin(t),Math.cos(t),0,0),this},t.scale=function(e,t){return this.a*=e,this.d*=t,this.c*=e,this.b*=t,this.tx*=e,this.ty*=t,this},t.translate=function(e,t){return this.tx+=e,this.ty+=t,this},t.identity=function(){return this.alpha=this.a=this.d=1,this.b=this.c=this.tx=this.ty=0,this.shadow=this.compositeOperation=null,this},t.invert=function(){var e=this.a,t=this.b,n=this.c,r=this.d,i=this.tx,s=e*r-t*n;return this.a=r/s,this.b=-t/s,this.c=-n/s,this.d=e/s,this.tx=(n*this.ty-r*i)/s,this.ty=-(e*this.ty-t*i)/s,this},t.isIdentity=function(){return this.tx==0&&this.ty==0&&this.a==1&&this.b==0&&this.c==0&&this.d==1},t.transformPoint=function(e,t,n){return n=n||{},n.x=e*this.a+t*this.c+this.tx,n.y=e*this.b+t*this.d+this.ty,n},t.decompose=function(t){t==null&&(t={}),t.x=this.tx,t.y=this.ty,t.scaleX=Math.sqrt(this.a*this.a+this.b*this.b),t.scaleY=Math.sqrt(this.c*this.c+this.d*this.d);var n=Math.atan2(-this.c,this.d),r=Math.atan2(this.b,this.a);return n==r?(t.rotation=r/e.DEG_TO_RAD,this.a<0&&this.d>=0&&(t.rotation+=t.rotation<=0?180:-180),t.skewX=t.skewY=0):(t.skewX=n/e.DEG_TO_RAD,t.skewY=r/e.DEG_TO_RAD),t},t.reinitialize=function(e,t,n,r,i,s,o,u,a){return this.initialize(e,t,n,r,i,s),this.alpha=o==null?1:o,this.shadow=u,this.compositeOperation=a,this},t.copy=function(e){return this.reinitialize(e.a,e.b,e.c,e.d,e.tx,e.ty,e.alpha,e.shadow,e.compositeOperation)},t.appendProperties=function(e,t,n){return this.alpha*=e,this.shadow=t||this.shadow,this.compositeOperation=n||this.compositeOperation,this},t.prependProperties=function(e,t,n){return this.alpha*=e,this.shadow=this.shadow||t,this.compositeOperation=this.compositeOperation||n,this},t.clone=function(){return(new e).copy(this)},t.toString=function(){return"[Matrix2D (a="+this.a+" b="+this.b+" c="+this.c+" d="+this.d+" tx="+this.tx+" ty="+this.ty+")]"},e.identity=new e,e}),define("wozllajs/math/Point",[],function(){function e(e,t){this.x=e||0,this.y=t||0}return e}),define("wozllajs/math",["./math/Matrix2D","./../wozllajs/math/Point"],function(e,t){return{Matrix2D:e,Point:t}}),define("wozllajs/util/Tuple",[],function(){var e=function(){this.data={}};return e.prototype={push:function(e,t){this.data[e]=this.data[e]||[],this.data[e].push(t)},get:function(e){return e===undefined?this.data:this.data[e]||[]},sort:function(e,t){return this.data[e].sort(t),this},remove:function(e,t){var n,r,i,s=this.data[e];if(!s)return!1;for(r=0,i=s.length;r<i;r++)if(s[r]===t){n=r;break}return n!==undefined?(s.splice(n,1),!0):!1},clear:function(e){e?this.data[e]=undefined:this.data={}}},e}),define("wozllajs/annotation/AnnotationRegistry",["./../var/uniqueKey"],function(e){function n(){return"__module_annotation_"+e()}function r(){return"__module_annotation_key"}var t={};return{getAll:function(e){var n=[],r;for(var i in t)r=t[i],r&&(n=n.concat(r.getAnnotation(e)));return n},get:function(e){return t[e[r()]]},register:function(e,i){var s=n();t[s]=i,e[r()]=s},unregister:function(e){delete t[e[r()]]}}}),define("wozllajs/annotation/Annotation",["./../var","./../util/Tuple","./AnnotationRegistry"],function(e,t,n){function i(e,t,n,i){var s,o,u;for(s in t){if(!n[s])throw new Error('Undefined property "'+s+'" in '+e);o=t[s],u=n[s].type;if(!o)o=n[s].defaults;else if(typeof u=="string"){if(typeof o!==u)throw new Error('Type mismatch on property "'+s+'" of '+e)}else if(o instanceof Object&&!(o instanceof n[s].type))throw new Error('Type mismatch on property "'+s+'" of '+e);this[s]=o}r.addAnnotation(i,this)}var r,s=function(e){this._$annotationTuple=new t,this._empty=!0,r=this};s.forModule=function(t){var r,i,o=t,u=[];while(o)u.unshift(o),o=e.getSuperConstructor(o);var a=new s,f;for(r=0,i=u.length;r<i;r++)f=n.get(u[r]),f&&f.forEach(function(e,t){var n,r;e=window[e];for(n=0,r=t.length;n<r;n++)a.addAnnotation(e,t[n])});return a},s.define=function(e,t){var r=function(n){return typeof n!="object"&&(n={value:n}),new i(e,n,t,r)};return r.forModule=function(e){return s.forModule(e).getAnnotations(r)},r.isPresent=function(e){return s.forModule(e).isAnnotationPresent(r)},r.all=function(){return n.getAll(r)},r._annotation_name=e,window?window[e]=r:r};var o=s.prototype;return o.isEmpty=function(){return this._empty},o.isAnnotationPresent=function(e){return this._$annotationTuple.get(e._annotation_name).length>0},o.getAnnotation=function(e){return this._$annotationTuple.get(e._annotation_name)[0]},o.getAnnotations=function(e){return this._$annotationTuple.get(e._annotation_name)},o.addAnnotation=function(e,t){this._$annotationTuple.push(e._annotation_name,t),this._empty=!1},o.forEach=function(e){var t=this._$annotationTuple.data;for(var n in t)e(n,t[n])},s}),define("wozllajs/annotation",["./annotation/Annotation","./../wozllajs/annotation/AnnotationRegistry"],function(e,t){return{Annotation:e,AnnotationRegistry:t}}),define("wozllajs/factoryProxy",["./annotation/Annotation","./../wozllajs/annotation/AnnotationRegistry"],function(e,t){define.factoryProxy=function(n,r,i){var s=new e;return i=n.apply(i,r),s.isEmpty()||t.register(i,s),i}}),define("wozllajs/ajax/param",[],function(){return{toString:function(e){if(!e)return"";var t,n="";for(t in e)n+="&"+t+"="+e[t];return n&&(n=n.substr(1)),n},toQuery:function(e){}}}),define("wozllajs/ajax/xhr",[],function(){return function(){return new XMLHttpRequest}}),define("wozllajs/ajax/get",["./param"],function(e){return function(t,n,r,i,s,o){n+="?"+e.toString(r),t.open("GET",n,o),t.setRequestHeader("Content-Type",i),t.send()}}),define("wozllajs/ajax/post",[],function(){return function(){}}),define("wozllajs/ajax/transport",["./../promise","./xhr","./get","./post"],function(e,t,n,r){return function(i){var s=new e,o,u=Date.now(),a=i.url,f=i.method||"GET",l=i.data,c=i.dataType||"text",h=i.contentType||"application/x-www-form-urlencoded; charset=UTF-8",p=i.async,d="text/plain",v="responseText",m=function(e){return e};switch(c.toLowerCase()){case"json":d="application/json",m=JSON.parse;break;case"script":case"js":d="text/javascript";break;case"xml":d="text/xml",v="responseXML"}p=p===!1?p:!0,l&&(l.t?l._=u:l.t=u),o=t(),o.overrideMimeType(d);try{switch(f.toUpperCase()){case"GET":n(o,a,l,h,c,p);break;case"POST":r(o,a,l,h,c,p);break;default:s.sendError(new Error("Unknow request method: "+f))}}catch(g){s.sendError(g)}return o.onreadystatechange=function(){var e,t;if(o.readyState===4){try{t=m(o[v])}catch(n){s.sendError(n);return}s.done(t,o)}},s}}),define("wozllajs/ajax",["./promise","./../wozllajs/ajax/param","./../wozllajs/ajax/xhr","./../wozllajs/ajax/transport","./../wozllajs/ajax/get","./../wozllajs/ajax/post"],function(e,t,n,r,i,s){return{ajax:r,get:function(e,t){return r({url:e,method:"GET",data:t})},getJSON:function(e,t){return r({url:e,method:"GET",data:t,dataType:"json"})},post:function(e,t){return r({url:e,method:"POST",data:t})}}}),define("wozllajs/events/Event",["./../var"],function(e){var t=function(e){this.type=e.type,this.target=null,this.currentTarget=null,this.eventPhase=null,this.bubbles=e.bubbles,this._immediatePropagationStoped=!1,this._propagationStoped=!1,this._defaultPrevented=!1,this._listenerRemoved=!1};t.CAPTURING_PHASE=1,t.BUBBLING_PHASE=2,t.TARGET_PHASE=3;var n=t.prototype;return n.stopImmediatePropagation=function(){this._immediatePropagationStoped=!0,this._propagationStoped=!0},n.stopPropagation=function(){this._propagationStoped=!0},n.preventDefault=function(){this._defaultPrevented=!0},n.removeListener=function(){this._listenerRemoved=!0},t}),define("wozllajs/events/EventTarget",["./Event"],function(e){var t=function(){this._captureListeners={},this._listeners={}};t.DEFAULT_ACTION_MAP={touchstart:"onTouchStart",touchmove:"onTouchMove",touchend:"onTouchEnd",click:"onClick"};var n=t.prototype;return n.addEventListener=function(e,t,n){var r=n?this._captureListeners:this._listeners,i=r[e];return i&&this.removeEventListener(e,t,n),i=r[e],i?i.push(t):r[e]=[t],t},n.removeEventListener=function(e,t,n){var r=n?this._captureListeners:this._listeners;if(!r)return;var i=r[e];if(!i)return;for(var s=0,o=i.length;s<o;s++)if(i[s]==t){o==1?delete r[e]:i.splice(s,1);break}},n.hasEventListener=function(e){var t=this._listeners,n=this._captureListeners;return!!(t&&t[e]||n&&n[e])},n.dispatchEvent=function(n){var r,i,s,o,u;n.target=this;if(!1===n.bubbles){n.eventPhase=e.TARGET_PHASE,this._dispatchEvent(n)||(u=this[t.DEFAULT_ACTION_MAP[n.type]],u&&u(n));return}s=this._getAncients(),n.eventPhase=e.CAPTURING_PHASE;for(r=s.length-1;r>=0;r--){o=s[r],o._dispatchEvent(n)||(u=o[t.DEFAULT_ACTION_MAP[n.type]],u&&u(n));if(n._propagationStoped)return}n.eventPhase=e.TARGET_PHASE,this._dispatchEvent(n)||(u=this[t.DEFAULT_ACTION_MAP[n.type]],u&&u(n));if(n._propagationStoped)return;n.eventPhase=e.BUBBLING_PHASE;for(r=0,i=s.length;r<i;r++){o=s[r],o._dispatchEvent(n)||(u=o[t.DEFAULT_ACTION_MAP[n.type]],u&&u(n));if(n._propagationStoped)return}},n._getAncients=function(){var e=[],t=this;while(t._parent)t=t._parent,e.push(t);return e},n._dispatchEvent=function(t){var n,r,i,s,o;t.currentTarget=this,t._listenerRemoved=!1,s=t.eventPhase===e.CAPTURING_PHASE?this._captureListeners:this._listeners;if(s){i=s[t.type];if(!i||i.length===0)return t._defaultPrevented;i=i.slice();for(n=0,r=i.length;n<r;n++){t._listenerRemoved=!1,o=i[n],o(t),t._listenerRemoved&&this.removeEventListener(t.type,o,t.eventPhase===e.CAPTURING_PHASE);if(t._immediatePropagationStoped)break}}return t._defaultPrevented},t}),define("wozllajs/events",["./events/Event","./../wozllajs/events/EventTarget"],function(e,t){return{Event:e,EventTarget:t}}),define("wozllajs/preload/AsyncImage",["require","./../var"],function(e,t){var n=function(e){this.image=e,this.src=this.image.src},r=n.prototype;return r.draw=function(e){var n=t.slice(arguments,1),r=this.image;r&&(n.unshift(r),e.drawImage.apply(e,n))},r.drawAs9Grid=function(e,t,n,r,i){var s=t.x,o=t.y,u=t.w,a=t.h,f=n.left,l=n.right,c=n.top,h=n.bottom,p=e;this.draw(e,s,o,f,c,0,0,f,c),this.draw(e,s+f,o+0,u-f-l,c,f,0,r-f-l,c),this.draw(e,s+u-l,o+0,l,c,r-l,0,l,c),this.draw(e,s+0,o+c,f,a-c-h,0,c,f,i-c-h),this.draw(e,s+0,o+a-h,f,h,0,i-h,f,h),this.draw(e,s+f,o+a-h,u-f-l,h,f,i-h,r-f-l,h),this.draw(e,s+u-l,o+a-h,l,h,r-l,i-h,l,h),this.draw(e,s+u-l,o+c,l,a-c-h,r-l,c,l,i-c-h),this.draw(e,s+f,o+c,u-f-l,a-c-h,f,c,r-f-l,i-c-h)},r.dispose=function(){this.image&&this.image.dispose&&this.image.dispose(),this.image=null},r.reload=function(){var t=this,n=e("./ImageLoader");return n.loadSrc(this.src).then(function(e){return t.image=e})},n}),define("wozllajs/preload/Loader",["./../var"],function(e){var t=function(e){this._item=e},n=t.prototype;return n.load=function(){},t}),define("wozllajs/preload/ImageLoader",["require","./../var","./../promise","./Loader","./AsyncImage"],function(e,t,n,r,i){var s=function(){r.apply(this,arguments)};s.loadSrc=function(e){var t=new n,r=new Image;return r.src=e,r.onload=function(){t.done(r)},r.onerror=function(){t.sendError(new Error("Fail to load image, "+e))},t},s.loadAsyncImage=function(e){return s.loadSrc(e).then(function(e){return new i(e)})};var o=t.inherits(s,r);return o.load=function(){return s.loadAsyncImage(this._item.src)},s}),define("wozllajs/preload/StringLoader",["require","./../var","./../promise","./Loader"],function(e,t,n,r){var i=function(){r.apply(this,arguments)},s=t.inherits(i,r);return s.load=function(){return t.get(this._item.src)},i}),define("wozllajs/preload/JSONLoader",["require","./../var","./../promise","./Loader"],function(e,t,n,r){var i=function(){r.apply(this,arguments)},s=t.inherits(i,r);return s.load=function(){return t.getJSON(this._item.src)},i}),define("wozllajs/preload/LoadQueue",["require","./../var","./../promise","./ImageLoader","./StringLoader","./JSONLoader"],function(e,t,n,r,i,s){function h(e){var t=o[e.type]||i;return new t(e)}function p(){if(f||a.length===0)return;var e,t,r,i,s,o,l,c,d,v=[],m={};f=!0,e=a.shift(),t=e.promise,r=e.loads;for(c=0,d=r.length;c<d;c++)i=r[c],s=i.id,l=u[s],l?m[s]=l.result:(o=h(i),function(e,t,n){var r=t.load().then(function(t){n.result=t,u[e]=n,m[e]=t}).catchError(function(e){console.log(e)});v.push(r)}(s,o,i));v.length===0?setTimeout(function(){t.done(m),f=!1,p()},1):n.wait(v).then(function(){t.done(m),f=!1,p()})}var o={jpg:r,png:r,json:s},u={},a=[],f=!1,l={},c={};return{load:function(e){t.isArray(e)||(e=[e]);var r=new n,i=[],s={},o,u,f,l;for(o=0,u=e.length;o<u;o++)f=e[o],typeof f=="string"&&(l=f,f={id:l,src:l}),f.type||(f.type=l.substr(l.lastIndexOf(".")+1)),s[f.id]||(i.push(f),s[f.id]=!0);return a.push({promise:r,loads:i}),p(),r},get:function(e){var t=u[e];return t?t.result:null},remove:function(e){var n=u[e].result;n&&(t.isImage(n)&&n.dispose&&n.dispose(),delete u[e])},registerLoader:function(e,t){o[e]=t},unregisterLoader:function(e){delete o[e]}}}),define("wozllajs/preload",["./var","./../wozllajs/preload/AsyncImage","./../wozllajs/preload/Loader","./../wozllajs/preload/ImageLoader","./../wozllajs/preload/LoadQueue","./../wozllajs/preload/JSONLoader","./../wozllajs/preload/StringLoader"],function(e,t,n,r,i,s,o){return{AsyncImage:t,Loader:n,ImageLoader:r,LoadQueue:i,JSONLoader:s,StringLoader:o}}),define("wozllajs/assets/Texture",["./../var","./../preload/AsyncImage"],function(e,t){var n=function(e,n){t.apply(this,arguments),this.frames=n},r=e.inherits(n,t);return r.getFrame=function(e){var t;return(t=this.frames[e])&&t.frame||t},r.drawFrame=function(e,t,n,r,i,s){var o=this.getFrame(t);o&&this.draw(e,o.x,o.y,o.w,o.h,n||0,r||0,i||o.w,s||o.h)},r.drawFrameAs9Grid=function(e,t,n,r,i){var s=this.getFrame(t);s&&this.drawAs9Grid(e,s,n,r,i)},n}),define("wozllajs/assets/TextureLoader",["./../var","./../ajax","./../promise","./Texture","./../preload/Loader","./../preload/LoadQueue","./../preload/ImageLoader"],function(e,t,n,r,i,s,o){var u=function(){i.apply(this,arguments)},a=e.inherits(u,i);return a.load=function(){var e=this._item.src,i=e.replace(".tt",".json"),s=e.replace(".tt",".png");return n.wait(t.getJSON(i),o.loadSrc(s)).then(function(e,t){return new r(t,e[0].frames)})},s.registerLoader("tt",u),u}),define("wozllajs/assets",["./assets/Texture","./../wozllajs/assets/TextureLoader"],function(e,t){return{Texture:e,TextureLoader:t}}),define("wozllajs/core/Time",[],function(){return{delta:0,now:0,update:function(){var e=Date.now();this.now&&(this.delta=e-this.now),this.now=e},reset:function(){this.delta=0,this.now=0}}}),define("wozllajs/core/Transform",["./../math/Matrix2D"],function(e){var t=new e,n=function(e){this.x=0,this.y=0,this.regX=0,this.regY=0,this.rotation=0,this.scaleX=1,this.scaleY=1,this.skewX=0,this.skewY=0,this.alpha=1,this.gameObject=e.gameObject};return n.prototype={getRoot:function(){var e=this.gameObject;while(e&&e._parent)e=e._parent;return e.transform},localToGlobal:function(e,t){var n=this.getConcatenatedMatrix();return n==null?null:(n.append(1,0,0,1,e,t),{x:n.tx,y:n.ty})},globalToLocal:function(e,t){var n=this.getConcatenatedMatrix();return n==null?null:(n.invert(),n.append(1,0,0,1,e,t),{x:n.tx,y:n.ty})},getConcatenatedMatrix:function(){var e=this;t.identity();while(e!=null)t.prependTransform(e.x,e.y,e.scaleX,e.scaleY,e.rotation,e.skewX,e.skewY,e.regX,e.regY).prependProperties(e.alpha),e=e.parent;return t},getMatrix:function(){var e=this;return t.identity().appendTransform(e.x,e.y,e.scaleX,e.scaleY,e.rotation,e.skewX,e.skewY,e.regX,e.regY).appendProperties(e.alpha)},updateContext:function(e){var n,r=this;n=t.identity().appendTransform(r.x,r.y,r.scaleX,r.scaleY,r.rotation,r.skewX,r.skewY,r.regX,r.regY),e.transform(n.a,n.b,n.c,n.d,n.tx,n.ty),e.globalAlpha*=r.alpha},applyTransform:function(e){this.x=e.x,this.y=e.y,this.regX=e.regX,this.regY=e.regY,this.scaleX=e.scaleX,this.scaleY=e.scaleY,this.rotation=e.rotation,this.alpha=e.alpha,this.skewX=e.skewX,this.skewY=e.skewY}},n}),define("wozllajs/core/AbstractGameObject",["require","module","./../var","./../events/EventTarget","./Transform"],function(e,t,n,r,i){var s=function(e){r.apply(this,arguments),this.id=e.id,this.UID=n.uniqueKey(),this.transform=new i({gameObject:this}),this._parent=null,this._children=[],this._childrenMap={}},o=n.inherits(s,r);return o.setId=function(e){this._parent&&(delete this._parent._childrenMap[this.id],this._parent._childrenMap[e]=this),this.id=e},o.getParent=function(){return this._parent},o.getPath=function(e){var t=this,n=[];while(t)n.unshift(t.id),t=t._parent;return n.join(e||"/")},o.getStage=function(){return e("./Stage").root},o.getChildren=function(){return this._children.slice()},o.sortChildren=function(e){this._children.sort(e)},o.getObjectById=function(e){return this._childrenMap[e]},o.addObject=function(e){this._childrenMap[e.id]=e,this._children.push(e),e._parent=this},o.insertObject=function(e,t){this._childrenMap[e.id]=e,this._children.splice(t,0,e),e._parent=this},o.insertBefore=function(e,t){var n,r,i,s=0;for(n=0,r=this._children.length;n<r;n++){i=this._children[n];if(i===t||i.id===t){s=n;break}}this.insertObject(e,s)},o.insertAfter=function(e,t){var n,r,i,s=this._children.length;for(n=0,r=this._children.length;n<r;n++){i=this._children[n];if(i===t||i.id===t){s=n;break}}this.insertObject(e,s+1)},o.removeObject=function(e){var t=this._children,n=typeof e=="string"?this._childrenMap[e]:e,r=-1,i,s;for(i=0,s=t.length;i<s;i++)if(n===t[i]){r=i,t.splice(r,1);break}return r!==-1&&(delete this._childrenMap[n.id],n._parent=null,n.transform.parent=null),r},o.remove=function(e){this._parent&&this._parent.removeObject(this),this._parent=null},o.removeAll=function(e){this._children=[],this._childrenMap={}},o.findObjectById=function(e){var t,n,r,i=this.getObjectById(e);if(!i){r=this._children;for(t=0,n=r.length;t<n;t++){i=r[t].findObjectById(e);if(i)break}}return i},o.findObjectByPath=function(e,t){var n,r,i=e.split(t||"/"),s=this.findObjectById(i[0]);if(s)for(n=1,r=i.length;n<r;n++){s=s.getObjectById(i[n]);if(!s)return null}return s},s}),define("wozllajs/core/Component",["./../var"],function(e){function t(){this.UID=e.uniqueKey(),this.gameObject=null}var n=t.prototype;return n.alias=undefined,n.setGameObject=function(e){this.gameObject=e},n.initComponent=function(){},n.destroyComponent=function(){},n.on=function(){this.gameObject.addEventListener.apply(this.gameObject,arguments)},n.off=function(){this.gameObject.removeEventListener.apply(this.gameObject,arguments)},n.dispatchEvent=function(e){this.gameObject.dispatchEvent(e)},n.applyProperties=function(e){for(var t in e)this[t]=e[t]},n.isInstanceof=function(e){return this instanceof e},t}),define("wozllajs/core/Behaviour",["./../var","./Component"],function(e,t){function n(){t.apply(this,arguments),this.enabled=!1}var r=e.inherits(n,t);return r.update=function(){},r.lateUpdate=function(){},n}),define("wozllajs/core/Renderer",["./../var","./Component"],function(e,t){function n(){t.apply(this,arguments)}var r=e.inherits(n,t);return r.draw=function(e,t){},n}),define("wozllajs/core/Layout",["./../var","./Component"],function(e,t){function n(){t.apply(this,arguments)}var r=e.inherits(n,t);return r.doLayout=function(e,t){},n}),define("wozllajs/core/HitDelegate",["./../var","./Component"],function(e,t){function n(){t.apply(this,arguments)}var r=e.inherits(n,t);return r.testHit=function(e,t){},n}),define("wozllajs/core/Query",["require","./Component"],function(e,t){var n=/^((\.\/)|(\/))?(([a-zA-Z0-9]+?)|(([a-zA-Z0-9]+?\/)+?[a-zA-Z0-9]+?))(:([a-zA-Z0-9\.\-]+?))?$/,r=function(t,i){i=i||e("./Stage").root;if(!i)throw new Error("Cant found context for query");var s=n.exec(t),o=s[1]||"./",u=s[4],a=s[9],f;if(o==="./")f=i.findObjectByPath(u);else{while(i._parent)i=i._parent;f=i.findObjectByPath(u)}return f&&a&&(f=r.findComponent(f,a)),f};return r.findComponent=function(e,n){var r=typeof n=="string"&&n.indexOf("c-")===0||typeof n=="function"&&t.prototype.isPrototypeOf&&t.prototype.isPrototypeOf(n.prototype);return r&&e.getComponent(n)},r}),define("wozllajs/core/events/GameObjectEvent",["./../../var","./../../events/Event"],function(e,t){var n=function(e){t.apply(this,arguments)};return n.INIT="init",n.DESTROY="destroy",e.inherits(n,t),n}),define("wozllajs/core/UnityGameObject",["./../var","./../globals","./AbstractGameObject","./Component","./Behaviour","./Renderer","./Layout","./HitDelegate","./Query","./events/GameObjectEvent"],function(e,t,n,r,i,s,o,u,a,f){var l=e.createCanvas(1,1),c=l.getContext("2d"),h=function(e){n.apply(this,arguments),this._active=!0,this._visible=!0,this._initialized=!1,this._components=[],this._delayRemoves=[]},p=e.inherits(h,n);return p.isActive=function(e){if(e===!1)return this._active;var t=!0,n=this;while(n){t=t&&n._active;if(!t)return!1;n=n._parent}return t},p.setActive=function(e){this._active=e},p.isVisible=function(e){if(e===!1)return this._visible;var t=!0,n=this;while(n){t=t&&n._visible;if(!t)return!1;n=n._parent}return t},p.setVisible=function(e){this._visible=e},p.addComponent=function(e){this._components.push(e),e.setGameObject(this)},p.getComponent=function(e){var t,n,r,i=this._components,s;if(typeof e=="string"){s=e;for(t=0,n=i.length;t<n;t++){r=i[t];if(r.alias===s)return r}}else for(t=0,n=i.length;t<n;t++){r=i[t];if(r.isInstanceof(e))return r}return null},p.getComponents=function(e){var t,n,r,i,s=this._components,o=[];if(typeof e=="string"){i=e;for(t=0,n=s.length;t<n;t++)r=s[t],r.alias===i&&o.push(r)}else for(t=0,n=s.length;t<n;t++)r=s[t],r.isInstanceof(e)&&o.push(r);return o},p.removeComponent=function(e){var t,n,r,i=this._components;for(t=0,n=i.length;t<n;t++){r=i[t];if(r===e){i.splice(t,1),r.setGameObject(null);break}}},p.delayRemoveComponent=function(e){this._delayRemoves.push(e)},p.delayRemoveObject=function(e){this._delayRemoves.push(e)},p.delayRemove=function(){this._parent.delayRemoveObject(this)},p.query=function(e){return a(e,this)},p.sendMessage=function(e,t,n){var r,i,s,o,u=this._components;for(r=0,i=u.length;r<i;r++){s=u[r];if(!n||n&&s.isInstanceof(n))o=s[e],o&&o.apply(s,t)}},p.broadcastMessage=function(e,t){var n,r,i,s=this._children;for(n=0,r=s.length;n<r;n++)i=s[n],i.broadcastMessage(e,t);this.sendMessage(e,t)},p.init=function(){var e,n,r,i=this._children;this.sendMessage(t.METHOD_INIT_COMPONENT);for(e=0,n=i.length;e<n;e++)r=i[e],r.init();this.layout(),this._doDelayRemove(),this._initialized=!0,this.dispatchEvent(new f({type:f.INIT,bubbles:!0}))},p.destroy=function(){var e,n,r,i=this._children;for(e=0,n=i.length;e<n;e++)r=i[e],r.destroy();this._doDelayRemove(),this.sendMessage(t.METHOD_DESTROY_COMPONENT),this.dispatchEvent(new f({type:f.DESTROY,bubbles:!0}))},p.layout=function(){var e=this.getComponent(o),t=this._children,n,r,i;for(n=0,r=t.length;n<r;n++)i=t[n],i.layout();e&&e.doLayout()},p.update=function(){if(!this._initialized||!this._active)return;var e,n,r,s=this._children;for(e=0,n=s.length;e<n;e++)r=s[e],r.update();this.sendMessage(t.METHOD_UPDATE,null,i),this._doDelayRemove()},p.lateUpdate=function(){if(!this._initialized||!this._active)return;var e,n,r,s=this._children;for(e=0,n=s.length;e<n;e++)r=s[e],r.lateUpdate();this.sendMessage(t.METHOD_LATE_UPDATE,null,i),this._doDelayRemove()},p.draw=function(e,t){if(!this._initialized||!this._active||!this._visible)return;e.save(),this.transform.updateContext(e),this._draw(e,t),e.restore(),this._doDelayRemove()},p.testHit=function(e,t,n){var r=!1,i,o;return!this.isActive(!0)||!this.isVisible(!0)?!1:(i=this.getComponent(u),i?r=i.testHit(e,t):this._cacheCanvas&&this._cached?r=this._cacheContext.getImageData(-this._cacheOffsetX+e,-this._cacheOffsetY+t,1,1).data[3]>1:(c.setTransform(1,0,0,1,-e,-t),n?(o=this.getComponent(s),o?o.draw(c,this.getStage().getVisibleRect()):r=!1):this._draw(c,this.getStage().getVisibleRect()),r=c.getImageData(0,0,1,1).data[3]>1,c.setTransform(1,0,0,1,0,0),c.clearRect(0,0,2,2)),r)},p.getTopObjectUnderPoint=function(e,t){var n,r,i,s;for(n=this._children.length-1;n>=0;n--){r=this._children[n],i=r.getTopObjectUnderPoint(e,t);if(i)return i}return s=this.transform.globalToLocal(e,t),this.testHit(s.x,s.y,!0)?this:null},p._doDelayRemove=function(){var e,t,i;if(this._delayRemoves.length>0){for(e=0,t=this._delayRemoves.length;e<t;e++)i=this._delayRemoves[e],i instanceof n?this.removeObject(i):i instanceof r&&this.removeComponent(i);this._delayRemoves.length=0}},p._draw=function(e,n){var r,i,o,u=this._children;this.sendMessage(t.METHOD_DRAW,arguments,s);for(r=0,i=u.length;r<i;r++)o=u[r],o.draw(e,n)},h}),define("wozllajs/core/Filter",["./../var","./Component"],function(e,t){function n(){t.apply(this,arguments),this.enabled=!1}var r=e.inherits(n,t);return r.applyFilter=function(e,t,n,r,i){},n}),define("wozllajs/core/CachableGameObject",["module","./../var","./../globals","./UnityGameObject","./Filter"],function(e,t,n,r,i){var s=function(e){r.apply(this,arguments),this._cacheCanvas=null,this._cacheContext=null,this._cached=!1,this._cacheOffsetX=0,this._cacheOffsetY=0},o=t.inherits(s,r);return o.cache=function(e,n,r,i){this._cacheCanvas&&this.uncache(),this._cacheOffsetX=e,this._cacheOffsetY=n,this._cacheCanvas=t.createCanvas(r,i),this._cacheContext=this._cacheCanvas.getContext("2d"),this._cached=!1},o.updateCache=function(e,t){this._cached=!1,this._cacheOffsetX=e||this._cacheOffsetX,this._cacheOffsetY=t||this._cacheOffsetY},o.translateCache=function(e,t){this._cached=!1,this._cacheOffsetX+=e,this._cacheOffsetY+=t},o.uncache=function(){this._cacheCanvas&&(this._cacheContext.dispose&&this._cacheContext.dispose(),this._cacheCanvas.dispose&&this._cacheCanvas.dispose(),this._cacheCanvas=null),this._cached=!1},o._draw=function(e,t){this._cacheCanvas?(this._cached||(this._drawCache(),this._cached=!0),e.drawImage(this._cacheCanvas,0,0)):r.prototype._draw.apply(this,arguments)},o._drawCache=function(e,t){var n=this._cacheContext;n.clearRect(0,0,this._cacheCanvas.width,this._cacheCanvas.height),n=this._cacheContext,n.translate(-this._cacheOffsetX,-this._cacheOffsetY),this._draw(n,t),n.translate(this._cacheOffsetX,this._cacheOffsetY),this._applyFilters(n,0,0,this._cacheCanvas.width,this._cacheCanvas.height)},o._applyFilters=function(e,t,n,r,s){var o,u,a=this.getComponents(i);for(o in a)e.save(),u=a[o],u.applyFilter(e,t,n,r,s),e.restore()},s}),define("wozllajs/core/Stage",["./../var","./CachableGameObject"],function(e,t){var n={x:0,y:0,width:0,height:0},r=function(e){t.apply(this,arguments),this.autoClear=e.autoClear,this.width=e.width,this.height=e.height,this.stageCanvas=e.canvas,this.stageContext=this.stageCanvas.getContext("2d")};r.root=null;var i=e.inherits(r,t);return i.tick=function(){this.update(),this.lateUpdate(),this.draw()},i.draw=function(){this.autoClear&&this.stageContext.clearRect(0,0,this.width,this.height),t.prototype.draw.apply(this,[this.stageContext,this.getVisibleRect()])},i.resize=function(e,t){this.stageCanvas.width=e,this.stageCanvas.height=t,this.width=e,this.height=t},i.getVisibleRect=function(){return n.x=-this.transform.x,n.y=-this.transform.y,n.width=this.width,n.height=this.height,n},r}),define("wozllajs/core/Engine",["./Time","./../util/Tuple","./Stage"],function(e,t,n){function a(){if(!o){e.reset();return}e.update(),f(),n.root&&n.root.tick(),r(a,u)}function f(){var e,t,n,r,o=s.get(i);if(!o||o.length===0)return;o=[].concat(o);for(e=0,t=o.length;e<t;e++)n=o[e],n.apply(n,arguments)}var r=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||function(e,t){setTimeout(e,t)},i="Engine",s=new t,o=!0,u;return{addListener:function(e){var t;if(e.isStage){t=e;if(t.__engineTick)return;t.__engineTick=function(){t.update(),t.lateUpdate(),t.draw()},e=t.__engineTick}s.push(i,e)},removeListener:function(e){var t;if(e.isStage){t=e;if(!t.__engineTick)return;e=t.__engineTick,t.__engineTick=null}s.remove(i,e)},start:function(e){u=e||10,o=!0,r(a,u)},stop:function(){o=!1},runStep:function(){e.update(),e.delta=u,f()}}}),define("wozllajs/core/GameObject",["./CachableGameObject"],function(e){return e}),define("wozllajs/core/Collider",["./../var","./Component"],function(e,t){function n(){t.apply(this,arguments)}var r=e.inherits(n,t);return n}),define("wozllajs/core/events/TouchEvent",["./../../var","./../../events/Event"],function(e,t){var n=function(e){t.apply(this,arguments),this.x=e.x,this.y=e.y};return n.TOUCH_START="touchstart",n.TOUCH_END="touchend",n.TOUCH_MOVE="touchmove",n.CLICK="click",e.inherits(n,t),n}),define("wozllajs/core/Touch",["./../var/support","./events/TouchEvent"],function(e,t){function o(){var e=n.stageCanvas,t={x:e.offsetLeft,y:e.offsetTop};while(e=e.offsetParent)t.x+=e.offsetLeft,t.y+=e.offsetTop;return t}function u(e){if(!r)return;var u,a,f,l,c,h,p=e.type;f=o(),e.touches?e.changedTouches&&(h=e.changedTouches[0],l=h.pageX-f.x,c=h.pageY-f.y):(l=e.pageX-f.x,c=e.pageY-f.y),u=n.getTopObjectUnderPoint(l,c),p==="mousedown"?(p=t.TOUCH_START,i=u):p==="mouseup"?(p=t.TOUCH_END,s=u):p==="mousemove"&&(p=t.TOUCH_MOVE),a=new t({type:p,x:l,y:c}),u&&u.dispatchEvent(a),p===t.TOUCH_END&&s&&i===s&&(i=null,s=null,s.dispatchEvent(new t({type:t.CLICK,x:l,y:c})))}var n,r=!0,i,s;return{init:function(t){n=t;if(e.touch)canvas.addEventListener("touchstart",u,!1),canvas.addEventListener("touchend",u,!1),canvas.addEventListener("touchmove",u,!1);else{var r=!1;canvas.addEventListener("mousedown",function(e){r=!0,u(e)},!1),canvas.addEventListener("mouseup",function(e){r=!1,u(e)},!1),canvas.addEventListener("mousemove",function(e){r&&u(e)},!1)}},enable:function(){r=!0},disable:function(){r=!1}}}),define("wozllajs/core",["./core/Time","./../wozllajs/core/Engine","./../wozllajs/core/AbstractGameObject","./../wozllajs/core/UnityGameObject","./../wozllajs/core/CachableGameObject","./../wozllajs/core/GameObject","./../wozllajs/core/Transform","./../wozllajs/core/Component","./../wozllajs/core/Behaviour","./../wozllajs/core/Collider","./../wozllajs/core/Filter","./../wozllajs/core/HitDelegate","./../wozllajs/core/Renderer","./../wozllajs/core/Stage","./../wozllajs/core/Touch","./../wozllajs/core/Query","./../wozllajs/core/events/GameObjectEvent","./../wozllajs/core/events/TouchEvent"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g){var y,b=function(e){y=e},w=function(e){var n=new p({id:"wozllajs_Stage",canvas:y.canvas,width:y.width,height:y.height,autoClear:y.autoClear});y.canvas.width=y.width,y.canvas.height=y.height,n.addEventListener(m.INIT,function(t){t.removeListener(),setTimeout(function(){e&&e(n)},1)}),p.root=n,d.init(n),n.init(),t.start()};return{config:b,onStageInit:w,Time:e,Engine:t,AbstractGameObject:n,UnityGameObject:r,CachableGameObject:i,GameObject:s,Transform:o,Component:u,Behaviour:a,Filter:l,HitDelegate:c,Renderer:h,Stage:p,Touch:d,Query:v,events:{TouchEvent:g,GameObjectEvent:m}}}),define("wozllajs/build/annotation/$Resource",["./../../annotation/Annotation"],function(e){return e.define("$Resource",{property:{type:"string","default":null}})}),define("wozllajs/build/annotation/$Component",["./../../annotation/Annotation"],function(e){return e.define("$Component",{id:{type:"string","default":null},constructor:{type:"function","default":null}})}),define("wozllajs/build/annotation/$Query",["./../../annotation/Annotation"],function(e){return e.define("$Query",{property:{type:"string","default":null}})}),define("wozllajs/component/renderer/Image",["./../../var","./../../core/Renderer","./../../build/annotation/$Resource","./../../build/annotation/$Component","./../../build/annotation/$Query"],function(e,t,n,r,i){function s(){t.apply(this,arguments)}r({id:"renderer.Image",constructor:s});var o=e.inherits(s,t);return o.alias="c-image",n({property:"image"}),o.image=undefined,o.draw=function(e,t){this.image.draw(e,0,0)},s}),define("wozllajs/component",["./component/renderer/Image"],function(e){return{renderer:{Image:e}}}),define("wozllajs/build/buildComponent",["./annotation/$Component"],function(e){function t(t){var n,r=e.all(),i,s,o;for(i=0,s=r.length;i<s;i++){o=r[i],n=o.constructor;if(o.id===t)break}return n}return function(e){var n,r,i;return n=t(e.id),r=e.properties,i=new n,i.applyProperties(r),i}}),define("wozllajs/build/buildObject",["./buildComponent","./../core/GameObject"],function(e,t){function n(r){var i,s,o=r.children,u=r.components,a=new t({id:r.name});a.setActive(r.active),a.setActive(r.visible);for(i=0,s=o.length;i<s;i++)a.addObject(n(o[i]));for(i=0,s=u.length;i<s;i++)a.addComponent(e(u[i]));return a.transform.applyTransform(r.transform),a}return n}),define("wozllajs/build/traverseObject",["./../promise"],function(e){function t(e,n){var r,i,s,o;r=e.getChildren();for(i=0,s=r.length;i<s;i++)o=r[i],n&&n(o),t(o,n)}return t}),define("wozllajs/build/loadAndInitObjFile",["./../promise","./../core/Component","./../preload/LoadQueue","./buildObject","./traverseObject","./annotation/$Resource","./annotation/$Query"],function(e,t,n,r,i,s,o){return function(u,a){var f=new e;return n.load({id:u,src:u,type:"json"}).then(function(e){var l,c=[],h={};!a&&n.remove(u),l=r(e[u]);var d=Date.now();i(l,function(e){var n,r,i,u,a,f,l,p,d,v,m,g,y,b;f=e.getComponents(t);for(n=0,r=f.length;n<r;n++){a=f[n],l=o.forModule(a.constructor);for(i=0,u=l.length;i<u;i++){p=l[i],g=p.property;if(!a.hasOwnProperty(g)&&!a.constructor.prototype.hasOwnProperty(g))throw new Error('Cant found property "'+p.property+'" in component alias='+a.alias);d=a[g];if(!(a[g]=e.query(d)))throw new Error("Cant found by expression "+d)}b=s.forModule(a.constructor);for(i=0,u=b.length;i<u;i++)y=b[i],a.hasOwnProperty(y.property)&&(v=a[y.property],c.push(v),m=v.id||v.src||v,h[m]=h[m]||[],h[m].push({property:y.property,component:a}))}}),n.load(c).then(function(e){var t,n,r,i,s,o;for(t in e){o=e[t],i=h[t];if(i){for(n=0,r=i.length;n<r;n++)s=i[n],s.component[s.property]=o;delete h[t]}else console.log("[Warn] maybe some error here")}for(t in h)console.log('[Warn] Unable to inject property "'+h[t].property+'" in component alias='+h[t].component.alias);console.log("annotation inject cost "+(Date.now()-d)+"ms"),l.init(),f.done(l)})}),f}}),define("wozllajs/build",["./build/buildObject","./../wozllajs/build/buildComponent","./../wozllajs/build/traverseObject","./../wozllajs/build/loadAndInitObjFile"],function(e,t,n,r){return{buildObject:e,buildComponent:t,traverseObject:n,loadAndInitObjFile:r}}),define("wozlla",["./wozllajs/var","./wozllajs/promise","./wozllajs/math","./wozllajs/annotation","./wozllajs/factoryProxy","./wozllajs/ajax","./wozllajs/events","./wozllajs/preload","./wozllajs/assets","./wozllajs/core","./wozllajs/component","./wozllajs/build"],function(e,t){e.Promise=t;var n=e.slice(arguments,2),r,i,s,o;for(r=0,i=n.length;r<i;r++){s=n[r];for(o in s)e[o]=s[o]}return window.wozllajs=e});