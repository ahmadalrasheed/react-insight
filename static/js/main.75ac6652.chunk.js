(this["webpackJsonpreact-optics-example"]=this["webpackJsonpreact-optics-example"]||[]).push([[0],[function(e,a,o){e.exports={container:"PerformanceMonitor_container__1gPAe",analyzeButton:"PerformanceMonitor_analyzeButton__2-E4Z",buttonIcon:"PerformanceMonitor_buttonIcon__11hW1",buttonText:"PerformanceMonitor_buttonText__k3FSe",popover:"PerformanceMonitor_popover__3VKq3",slideUp:"PerformanceMonitor_slideUp__1uot7",popoverHeader:"PerformanceMonitor_popoverHeader__1CeGM",popoverTitle:"PerformanceMonitor_popoverTitle__1APe4",closeButton:"PerformanceMonitor_closeButton__3yM_r",scoreContainer:"PerformanceMonitor_scoreContainer__2lRU3",scoreCircle:"PerformanceMonitor_scoreCircle__pXbIU",scoreInner:"PerformanceMonitor_scoreInner__13dhl",scoreValue:"PerformanceMonitor_scoreValue__DXbsY",scoreLabel:"PerformanceMonitor_scoreLabel__3IKme",resultsContainer:"PerformanceMonitor_resultsContainer__2TTrv",goodResult:"PerformanceMonitor_goodResult__1uV2m",resultsTitle:"PerformanceMonitor_resultsTitle__vXwIj",issueItem:"PerformanceMonitor_issueItem__1KBbx",issueHeader:"PerformanceMonitor_issueHeader__3LTzk",issueIcon:"PerformanceMonitor_issueIcon__dk9cP",suggestion:"PerformanceMonitor_suggestion__2jPjT"}},,,,function(e,a,o){e.exports=o(10)},function(e,a,o){},,,,,function(e,a,o){"use strict";o.r(a);o(5);var t,l,n=o(1),i=o.n(n),r=o(3),s=o.n(r),d=o(0),c=o.n(d);const u=function(e){var a;let o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return(null===e||void 0===e?void 0:e.children)&&0!==(null===e||void 0===e||null===(a=e.children)||void 0===a?void 0:a.length)?Math.max(...Array.from((null===e||void 0===e?void 0:e.children)||[]).map(e=>u(e,o+1))):o};let v=0;const m=null===(t=EventTarget)||void 0===t||null===(l=t.prototype)||void 0===l?void 0:l.addEventListener;m&&(EventTarget.prototype.addEventListener=function(){v++;for(var e=arguments.length,a=new Array(e),o=0;o<e;o++)a[o]=arguments[o];return m.apply(this,a)});const p=async()=>{const e=(()=>{var e,a,o,t,l,n,i;const r=(null===(e=document)||void 0===e||null===(a=e.body)||void 0===a||null===(o=a.getElementsByTagName("*"))||void 0===o?void 0:o.length)||0,s=(null===(t=document)||void 0===t||null===(l=t.head)||void 0===l||null===(n=l.getElementsByTagName("*"))||void 0===n?void 0:n.length)||0,d=r+s,c=u(null===(i=document)||void 0===i?void 0:i.body);return console.log(`DOM Size: ${d} elements (${r} in body, ${s} in head)`),{totalElements:d,depth:c}})(),a=(()=>{const e=document.querySelectorAll("img"),a=Array.from(e).filter(e=>!(null===e||void 0===e?void 0:e.hasAttribute("alt")));return{total:(null===e||void 0===e?void 0:e.length)||0,withoutAlt:(null===a||void 0===a?void 0:a.length)||0,elements:a||[]}})(),o=(()=>{const e=document.querySelectorAll("*");let a=[];return e&&Array.from(e).forEach(e=>{var o;const t=null===(o=window)||void 0===o?void 0:o.getComputedStyle(e);"absolute"!==(null===t||void 0===t?void 0:t.position)&&"fixed"!==(null===t||void 0===t?void 0:t.position)||a.push(e)}),{total:(null===a||void 0===a?void 0:a.length)||0,elements:a||[]}})(),t=(()=>{if("memory"in performance){var e;const a=null===(e=performance)||void 0===e?void 0:e.memory;return{usedMB:+(((null===a||void 0===a?void 0:a.usedJSHeapSize)||0)/1024/1024).toFixed(2),totalMB:+(((null===a||void 0===a?void 0:a.totalJSHeapSize)||0)/1024/1024).toFixed(2),limitMB:+(((null===a||void 0===a?void 0:a.jsHeapSizeLimit)||0)/1024/1024).toFixed(2)}}return null})(),l=(()=>{const e=Object.getOwnPropertyNames(window||{}).filter(e=>(null===e||void 0===e?void 0:e.startsWith("setInterval"))||(null===e||void 0===e?void 0:e.startsWith("setTimeout")));return(null===e||void 0===e?void 0:e.length)||0})(),n={totalListeners:v||0},i=(()=>{var e,a,o;const t=(null===(e=window)||void 0===e||null===(a=e.performance)||void 0===a||null===(o=a.getEntriesByType("resource"))||void 0===o?void 0:o.filter(e=>(null===e||void 0===e?void 0:e.duration)>0&&0===(null===e||void 0===e?void 0:e.responseEnd)))||[];return{total:(null===t||void 0===t?void 0:t.length)||0,requests:t||[]}})(),r=await(()=>{var e;const a=(null===(e=performance)||void 0===e?void 0:e.now())||0;return new Promise(e=>{requestAnimationFrame(()=>{var o;const t=((null===(o=performance)||void 0===o?void 0:o.now())||0)-a;e(t)})})})();let s=100;(null===e||void 0===e?void 0:e.totalElements)>3e3?s=50:(null===e||void 0===e?void 0:e.totalElements)>2e3?s=65:(null===e||void 0===e?void 0:e.totalElements)>1e3&&(s=75);let d=s;return(null===e||void 0===e?void 0:e.depth)>10&&(d-=Math.min(10,(null===e||void 0===e?void 0:e.depth)-10)),(null===a||void 0===a?void 0:a.withoutAlt)>0&&(d-=Math.min(15,2*(null===a||void 0===a?void 0:a.withoutAlt))),(null===o||void 0===o?void 0:o.total)>0&&(d-=Math.min(10,null===o||void 0===o?void 0:o.total)),t&&(null===t||void 0===t?void 0:t.usedMB)>100&&(d-=Math.min(15,((null===t||void 0===t?void 0:t.usedMB)-100)/10)),l>10&&(d-=Math.min(10,l-10)),(null===n||void 0===n?void 0:n.totalListeners)>500&&(d-=Math.min(15,((null===n||void 0===n?void 0:n.totalListeners)-500)/50)),r>100&&(d-=Math.min(20,(r-100)/10)),(null===i||void 0===i?void 0:i.total)>5&&(d-=Math.min(10,(null===i||void 0===i?void 0:i.total)-5)),d=Math.max(0,d),console.log(`DOM size: ${(null===e||void 0===e?void 0:e.totalElements)||0}, max score: ${s}, final score: ${d}`),console.log("Memory usage: "+(t?(null===t||void 0===t?void 0:t.usedMB)+"MB":"N/A")),console.log("Active timers: "+(l||0)),console.log("Event listeners: "+((null===n||void 0===n?void 0:n.totalListeners)||0)),console.log(`Interaction delay: ${r||0}ms`),console.log("Pending requests: "+((null===i||void 0===i?void 0:i.total)||0)),{score:d,domSize:e,imagesAlt:a,layoutShift:o,memoryUsage:t,activeTimers:l,eventListeners:n,interactionDelay:r,pendingRequests:i}};var h=e=>{var a,o,t,l,r,s,d,u,v,m,h,E,g,f;let{children:y}=e;const[N,_]=Object(n.useState)(!1),[M,b]=Object(n.useState)(null),[I,w]=Object(n.useState)(!1),A=Object(n.useRef)(null);return Object(n.useEffect)(()=>{const e=e=>{var a;(null===A||void 0===A?void 0:A.current)&&!(null===A||void 0===A||null===(a=A.current)||void 0===a?void 0:a.contains(null===e||void 0===e?void 0:e.target))&&_(!1)},a=document;if(a)return a.addEventListener("mousedown",e),()=>{a.removeEventListener("mousedown",e)}},[]),i.a.createElement(i.a.Fragment,null,y,i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.container},i.a.createElement("button",{className:null===c.a||void 0===c.a?void 0:c.a.analyzeButton,onClick:async()=>{w(!0);try{const e=await p();console.log("Performance data:",e),b(e),_(!0)}catch(e){console.error("Error analyzing performance:",e)}finally{w(!1)}},disabled:I,"aria-label":"Analyze Performance"},i.a.createElement("span",{className:null===c.a||void 0===c.a?void 0:c.a.buttonIcon},I?"\u23f3":"\ud83d\udd0d"),i.a.createElement("span",{className:null===c.a||void 0===c.a?void 0:c.a.buttonText},I?"Analyzing...":"Analyze Performance")),N&&M&&i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.popover,ref:A},i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.popoverHeader},i.a.createElement("h2",{className:null===c.a||void 0===c.a?void 0:c.a.popoverTitle},"Performance Analysis"),i.a.createElement("button",{className:null===c.a||void 0===c.a?void 0:c.a.closeButton,onClick:()=>{_(!1)},"aria-label":"Close"},"\xd7")),i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.scoreContainer},i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.scoreCircle,style:{background:`conic-gradient(\n                  ${P=(null===M||void 0===M?void 0:M.score)||0,P>=90?"#4CAF50":P>=70?"#FFC107":P>=50?"#FF9800":"#F44336"} ${(null===M||void 0===M?void 0:M.score)||0}%,\n                  #f0f0f0 ${(null===M||void 0===M?void 0:M.score)||0}% 100%\n                )`}},i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.scoreInner},i.a.createElement("span",{className:null===c.a||void 0===c.a?void 0:c.a.scoreValue},Math.round((null===M||void 0===M?void 0:M.score)||0)),i.a.createElement("span",{className:null===c.a||void 0===c.a?void 0:c.a.scoreLabel},"Score")))),i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.resultsContainer},(null===M||void 0===M?void 0:M.score)>=90?i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.goodResult},i.a.createElement("h3",null,"Great job! Your application is performing well."),i.a.createElement("p",null,"Keep up the good work and continue to monitor performance as your application grows.")):i.a.createElement(i.a.Fragment,null,i.a.createElement("h3",{className:null===c.a||void 0===c.a?void 0:c.a.resultsTitle},"Areas for Improvement:"),(null===M||void 0===M||null===(a=M.domSize)||void 0===a?void 0:a.totalElements)>1e3&&i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.issueItem},i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.issueHeader},i.a.createElement("span",{className:null===c.a||void 0===c.a?void 0:c.a.issueIcon},"\u26a0\ufe0f"),i.a.createElement("h4",null,"Large DOM Size")),i.a.createElement("p",null,"Your DOM contains ",(null===M||void 0===M||null===(o=M.domSize)||void 0===o?void 0:o.totalElements)||0," elements, which is above the recommended limit of 1000."),i.a.createElement("p",{className:null===c.a||void 0===c.a?void 0:c.a.suggestion},"Consider reducing the number of DOM elements by simplifying your component structure.")),(null===M||void 0===M||null===(t=M.domSize)||void 0===t?void 0:t.depth)>10&&i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.issueItem},i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.issueHeader},i.a.createElement("span",{className:null===c.a||void 0===c.a?void 0:c.a.issueIcon},"\u26a0\ufe0f"),i.a.createElement("h4",null,"Deep DOM Structure")),i.a.createElement("p",null,"Your DOM has a depth of ",(null===M||void 0===M||null===(l=M.domSize)||void 0===l?void 0:l.depth)||0," levels, which is above the recommended limit of 10."),i.a.createElement("p",{className:null===c.a||void 0===c.a?void 0:c.a.suggestion},"Consider flattening your component hierarchy to improve rendering performance.")),(null===M||void 0===M||null===(r=M.imagesAlt)||void 0===r?void 0:r.withoutAlt)>0&&i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.issueItem},i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.issueHeader},i.a.createElement("span",{className:null===c.a||void 0===c.a?void 0:c.a.issueIcon},"\u26a0\ufe0f"),i.a.createElement("h4",null,"Images Without Alt Text")),i.a.createElement("p",null,"Found ",(null===M||void 0===M||null===(s=M.imagesAlt)||void 0===s?void 0:s.withoutAlt)||0," images without alt attributes."),i.a.createElement("p",{className:null===c.a||void 0===c.a?void 0:c.a.suggestion},"Add descriptive alt text to all images for accessibility and SEO benefits.")),(null===M||void 0===M||null===(d=M.layoutShift)||void 0===d?void 0:d.total)>0&&i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.issueItem},i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.issueHeader},i.a.createElement("span",{className:null===c.a||void 0===c.a?void 0:c.a.issueIcon},"\u26a0\ufe0f"),i.a.createElement("h4",null,"Potential Layout Shifts")),i.a.createElement("p",null,"Detected ",(null===M||void 0===M||null===(u=M.layoutShift)||void 0===u?void 0:u.total)||0," elements that might cause layout shifts."),i.a.createElement("p",{className:null===c.a||void 0===c.a?void 0:c.a.suggestion},"Ensure elements have defined dimensions and avoid inserting content above existing content.")),(null===M||void 0===M?void 0:M.memoryUsage)&&(null===M||void 0===M||null===(v=M.memoryUsage)||void 0===v?void 0:v.usedMB)>100&&i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.issueItem},i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.issueHeader},i.a.createElement("span",{className:null===c.a||void 0===c.a?void 0:c.a.issueIcon},"\u26a0\ufe0f"),i.a.createElement("h4",null,"High Memory Usage")),i.a.createElement("p",null,"Your application is using ",(null===M||void 0===M||null===(m=M.memoryUsage)||void 0===m?void 0:m.usedMB)||0,"MB of memory, which is above the recommended limit of 100MB."),i.a.createElement("p",{className:null===c.a||void 0===c.a?void 0:c.a.suggestion},"Optimize memory usage by reducing object allocations, implementing proper cleanup, and avoiding memory leaks.")),(null===M||void 0===M?void 0:M.activeTimers)>10&&i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.issueItem},i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.issueHeader},i.a.createElement("span",{className:null===c.a||void 0===c.a?void 0:c.a.issueIcon},"\u26a0\ufe0f"),i.a.createElement("h4",null,"Too Many Active Timers")),i.a.createElement("p",null,"Your application has ",(null===M||void 0===M?void 0:M.activeTimers)||0," active timers, which is above the recommended limit of 10."),i.a.createElement("p",{className:null===c.a||void 0===c.a?void 0:c.a.suggestion},"Ensure all setInterval and setTimeout calls are properly cleared when components unmount.")),(null===M||void 0===M||null===(h=M.eventListeners)||void 0===h?void 0:h.totalListeners)>500&&i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.issueItem},i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.issueHeader},i.a.createElement("span",{className:null===c.a||void 0===c.a?void 0:c.a.issueIcon},"\u26a0\ufe0f"),i.a.createElement("h4",null,"Too Many Event Listeners")),i.a.createElement("p",null,"Your application has ",(null===M||void 0===M||null===(E=M.eventListeners)||void 0===E?void 0:E.totalListeners)||0," event listeners, which is above the recommended limit of 500."),i.a.createElement("p",{className:null===c.a||void 0===c.a?void 0:c.a.suggestion},"Ensure all event listeners are properly removed when components unmount to prevent memory leaks.")),(null===M||void 0===M?void 0:M.interactionDelay)>100&&i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.issueItem},i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.issueHeader},i.a.createElement("span",{className:null===c.a||void 0===c.a?void 0:c.a.issueIcon},"\u26a0\ufe0f"),i.a.createElement("h4",null,"Slow Interaction Response")),i.a.createElement("p",null,"Your application has an interaction delay of ",Math.round((null===M||void 0===M?void 0:M.interactionDelay)||0),"ms, which is above the recommended limit of 100ms."),i.a.createElement("p",{className:null===c.a||void 0===c.a?void 0:c.a.suggestion},"Optimize JavaScript execution, reduce main thread work, and consider using web workers for heavy computations.")),(null===M||void 0===M||null===(g=M.pendingRequests)||void 0===g?void 0:g.total)>5&&i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.issueItem},i.a.createElement("div",{className:null===c.a||void 0===c.a?void 0:c.a.issueHeader},i.a.createElement("span",{className:null===c.a||void 0===c.a?void 0:c.a.issueIcon},"\u26a0\ufe0f"),i.a.createElement("h4",null,"Too Many Pending Network Requests")),i.a.createElement("p",null,"Your application has ",(null===M||void 0===M||null===(f=M.pendingRequests)||void 0===f?void 0:f.total)||0," pending network requests, which is above the recommended limit of 5."),i.a.createElement("p",{className:null===c.a||void 0===c.a?void 0:c.a.suggestion},"Implement proper request cancellation, use request batching, and consider using a request queue to limit concurrent requests.")))))));var P};var E=()=>{const[e,a]=Object(n.useState)([]),[o,t]=Object(n.useState)(!1);return i.a.createElement(h,null,i.a.createElement("div",{className:"app"},i.a.createElement("header",null,i.a.createElement("h1",null,"React Optics Demo"),i.a.createElement("p",null,"A demonstration of the React Optics performance monitoring library")),i.a.createElement("div",{className:"controls"},i.a.createElement("button",{onClick:()=>{const e=Array.from({length:1e3},(e,a)=>({id:a,text:"Item "+a}));a(e)}},"Add 1000 DOM Elements (Performance Issue)"),i.a.createElement("button",{onClick:()=>{t(!o)}},o?"Hide Images":"Show Images Without Alt")),i.a.createElement("div",{className:"content"},e.length>0&&i.a.createElement("div",{className:"items-container"},i.a.createElement("h2",null,"DOM Elements: ",e.length),i.a.createElement("div",{className:"items-grid"},e.map(e=>i.a.createElement("div",{key:e.id,className:"item"},e.text)))),o&&i.a.createElement("div",{className:"images-container"},i.a.createElement("h2",null,"Images Without Alt Attributes"),i.a.createElement("div",{className:"images-grid"},i.a.createElement("img",{src:"https://via.placeholder.com/150"}),i.a.createElement("img",{src:"https://via.placeholder.com/150"}),i.a.createElement("img",{src:"https://via.placeholder.com/150"}),i.a.createElement("img",{src:"https://via.placeholder.com/150"}),i.a.createElement("img",{src:"https://via.placeholder.com/150"}),i.a.createElement("img",{src:"https://via.placeholder.com/150"}))))))};s.a.render(i.a.createElement(E,null),document.getElementById("root"))}],[[4,1,2]]]);
//# sourceMappingURL=main.75ac6652.chunk.js.map