(this["webpackJsonpgithub-ui"]=this["webpackJsonpgithub-ui"]||[]).push([[0],{11:function(e,a,t){e.exports=t(27)},16:function(e,a,t){},17:function(e,a,t){},24:function(e,a,t){},25:function(e,a,t){},26:function(e,a,t){},27:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),l=t(4),i=t.n(l),o=(t(16),t(17),t(2));t(24);function c(e){return fetch("".concat("https://api.github.com/").concat(e))}var s=Object(o.b)((function(e){return{userData:e.profile.userData}}),(function(e){return{setProfile:function(a){e(function(e){return{payload:e,type:"SET_PROFILE"}}(a))}}}))((function(e){return Object(r.useEffect)((function(){c("users/Rpratik13").then((function(e){return e.json()})).then((function(a){return e.setProfile(a)}))}),[]),n.a.createElement("div",{className:"profile"},n.a.createElement("div",{className:"avatar"},n.a.createElement("img",{alt:"Avatar",src:e.userData.avatar_url})),n.a.createElement("div",{className:"name"},e.userData.name),n.a.createElement("div",{className:"user-name"},e.userData.login),function(e){if(e.userData.bio)return n.a.createElement("div",{className:"user-bio"},e.userData.bio)}(e),n.a.createElement("button",{className:"profile-edit"},"Edit Profile"),n.a.createElement("br",null),function(e){return n.a.createElement("div",{className:"follow-data clearfix"},n.a.createElement("div",{className:"followers"},n.a.createElement("div",{className:"icon"},n.a.createElement("svg",{text:"gray-light",height:"16",viewBox:"0 0 16 16",version:"1.1",width:"16","aria-hidden":"true"},n.a.createElement("path",{fillRule:"evenodd",d:"M5.5 3.5a2 2 0 100 4 2 2 0 \r 000-4zM2 5.5a3.5 3.5 0 115.898 \r 2.549 5.507 5.507 0 013.034 \r 4.084.75.75 0 11-1.482.235 \r 4.001 4.001 0 00-7.9 0 .75.75 \r 0 01-1.482-.236A5.507 5.507 0 \r 013.102 8.05 3.49 3.49 0 012 \r 5.5zM11 4a.75.75 0 100 1.5 1.5 \r 1.5 0 01.666 2.844.75.75 0 \r 00-.416.672v.352a.75.75 0 \r 00.574.73c1.2.289 2.162 1.2 2.522 \r 2.372a.75.75 0 101.434-.44 5.01 \r 5.01 0 00-2.56-3.012A3 3 0 0011 4z"}))),n.a.createElement("div",{className:"data"},n.a.createElement("strong",null," "+e.userData.followers)," followers")),n.a.createElement("div",{className:"dot"},"\xb7"),n.a.createElement("div",{className:"following data"},n.a.createElement("strong",null,e.userData.following)," following"),n.a.createElement("div",{className:"dot"},"\xb7"),n.a.createElement("div",{className:"stars"},n.a.createElement("div",{className:"icon"},n.a.createElement("svg",{text:"gray-light",height:"16",viewBox:"0 0 16 16",version:"1.1",width:"16","aria-hidden":"true"},n.a.createElement("path",{fillRule:"evenodd",d:"M8 .25a.75.75 0 01.673.418l1.882 \r 3.815 4.21.612a.75.75 0 01.416 \r 1.279l-3.046 2.97.719 4.192a.75.75 \r 0 01-1.088.791L8 12.347l-3.766 \r 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 \r 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 \r 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 \r 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 \r 01.216.664l-.528 3.084 2.769-1.456a.75.75 \r 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 \r 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 \r 01-.564-.41L8 2.694v.001z"})))))}(e),function(e){if(e.userData.company)return n.a.createElement("div",{className:"link clearfix"},n.a.createElement("div",{className:"link-icon"},n.a.createElement("svg",{viewBox:"0 0 16 16",version:"1.1",width:"16",height:"16","aria-hidden":"true"},n.a.createElement("path",{fillRule:"evenodd",d:"M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 \r 0 01.75-.75h2.5a.75.75 0 01.75.75v1.25h2.25a.25.25 \r 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 \r 00-.25.25v12.5zM1.75 16A1.75 1.75 0 010 14.25V1.75C0 \r .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 \r .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 \r 0 00-.111-.208l-1.055-.703a.75.75 0 \r 11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 \r 1.75 0 0114.25 16h-3.5a.75.75 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 \r 0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75h-3zM3 3.75A.75.75 0 013.75 3h.5a.75.75 \r 0 010 1.5h-.5A.75.75 0 013 3.75zM3.75 6a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM3 \r 9.75A.75.75 0 013.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 9.75zM7.75 9a.75.75 \r 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM7 6.75A.75.75 0 017.75 6h.5a.75.75 0 010 \r 1.5h-.5A.75.75 0 017 6.75zM7.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"}))),n.a.createElement("div",{className:"link-text"},e.userData.company))}(e),function(e){if(e.userData.location)return n.a.createElement("div",{className:"link clearfix"},n.a.createElement("div",{className:"link-icon"},n.a.createElement("svg",{viewBox:"0 0 16 16",version:"1.1",width:"16",height:"16","aria-hidden":"true"},n.a.createElement("path",{fillRule:"evenodd",d:"M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 \r 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 \r 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"}))),n.a.createElement("div",{className:"link-text"},e.userData.location))}(e),function(e){if(e.userData.blog)return n.a.createElement("div",{className:"link clearfix"},n.a.createElement("div",{className:"link-icon"},n.a.createElement("svg",{viewBox:"0 0 16 16",version:"1.1",width:"16",height:"16","aria-hidden":"true"},n.a.createElement("path",{fillRule:"evenodd",d:"M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 \r 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 \r 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 \r 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 \r .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 \r 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 \r 1.25a2 2 0 01-2.83 0z"}))),n.a.createElement("div",{className:"blog link-text"},e.userData.blog))}(e),function(e){if(e.userData.twitter_username)return n.a.createElement("div",{className:"link"},n.a.createElement("div",{className:"link-icon"},n.a.createElement("svg",{viewBox:"0 0 273.5 222.3",className:"twitter-icon"},n.a.createElement("path",{fillRule:"evenodd",d:"M273.5 26.3a109.77 109.77 0 0 1-32.2 8.8 56.07 56.07 0 0 0 24.7-31 113.39 113.39 0 0 1-35.7 13.6 56.1 56.1 0 0 0-97 38.4 54 54 0 0 0 1.5 12.8A159.68 159.68 0 0 1 19.1 10.3a56.12 56.12 0 0 0 17.4 74.9 56.06 56.06 0 0 1-25.4-7v.7a56.11 56.11 0 0 0 45 55 55.65 55.65 0 0 1-14.8 2 62.39 62.39 0 0 1-10.6-1 56.24 56.24 0 0 0 52.4 39 112.87 112.87 0 0 1-69.7 24 119 119 0 0 1-13.4-.8 158.83 158.83 0 0 0 86 25.2c103.2 0 159.6-85.5 159.6-159.6 0-2.4-.1-4.9-.2-7.3a114.25 114.25 0 0 0 28.1-29.1"}))),n.a.createElement("div",{className:"twitter link-text"},"@"+e.userData.twitter_username))}(e))})),u=t(3),m=t(10),d=t(1),f={filter_language:"",languages:[],search:"",type:""};var v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"SET_LANGUAGE":return Object(d.a)({},e,{filter_language:a.payload});case"SET_SEARCH":return Object(d.a)({},e,{search:a.payload});case"SET_TYPE":return Object(d.a)({},e,{type:a.payload});case"ADD_LANGAUGE":return Object(d.a)({},e,{languages:[].concat(Object(m.a)(e.languages),[a.payload])});default:return e}},p={userData:{}};var h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"SET_PROFILE":return Object(d.a)({},e,{userData:a.payload});default:return e}},E={filter_language:"",repositories:[],search:"",forked_repos:{}};var g=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"SET_REPOSITORIES":return Object(d.a)({},e,{repositories:a.payload});case"ADD_FORKED_REPOS":return Object(d.a)({},e,{forked_repos:Object(d.a)({},e.forked_repos,{},a.payload)});default:return e}},k=Object(u.b)({filter:v,profile:h,repository:g}),N=Object(u.c)(k,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()),y=(t(25),[]);var _=Object(o.b)((function(e){return{languages:e.filter.languages,repositories:e.repository.repositories}}),(function(e){return{setSearch:function(a){e(function(e){return{payload:e,type:"SET_SEARCH"}}(a))},setType:function(a){e(function(e){return{payload:e,type:"SET_TYPE"}}(a))},addLanguage:function(a){e(function(e){return{payload:e,type:"ADD_LANGAUGE"}}(a))},setLanguage:function(a){e(function(e){return{payload:e,type:"SET_LANGUAGE"}}(a))}}}))((function(e){return Object(r.useEffect)((function(){e.repositories.map((function(a){!e.languages.includes(a.language)&&a.language&&e.addLanguage(a.language)}))})),n.a.createElement("div",null,n.a.createElement("input",{className:"search",onChange:function(a){return e.setSearch(a.target.value)},placeholder:"Find a repository...",type:"text",value:e.search}),n.a.createElement("select",{className:"type",id:"type",name:"type",onChange:function(a){return e.setType(a.target.value)}},n.a.createElement("option",{key:"all",value:""},"All"),n.a.createElement("option",{key:"public",value:"public"},"Public"),n.a.createElement("option",{key:"private",value:"private"},"Private"),n.a.createElement("option",{key:"sources",value:"sources"},"Sources"),n.a.createElement("option",{key:"forks",value:"forks"},"Forks"),n.a.createElement("option",{key:"archived",value:"archived"},"Archived"),n.a.createElement("option",{key:"mirrors",value:"mirrors"},"Mirrors")),n.a.createElement("select",{className:"language",id:"language",name:"language",onChange:function(a){return e.setLanguage(a.target.value)}},n.a.createElement("option",{key:"all",value:""},"All"),e.languages.map((function(e){return function(e){if(!y.includes(e))return y.push(e),n.a.createElement("option",{key:e,value:e.toLowerCase()},e)}(e)})),y=[]))}));t(26);function w(e,a){var t=N.getState().filter,r=t.search,l=t.filter_language,i=t.type;if((""===r||-1!==e.name.toLowerCase().indexOf(r.toLowerCase()))&&(""===l||e.language&&e.language.toLowerCase()===l.toLowerCase())&&function(e,a){return!!(""===a||"private"===a&&e.private||"public"===a&&!e.private||"forks"===a&&e.fork||"sources"===a&&!e.fork||"archived"===a&&e.archived||"mirrors"===a&&e.mirror_url)}(e,i))return n.a.createElement("li",{key:e.id,className:"repo"},n.a.createElement("div",{className:"repo-name"},n.a.createElement("a",{href:e.html_url,title:e.name},e.name)),function(e,a){if(e.fork&&a.forked_repos[e.name])return n.a.createElement("div",{className:"forked-owner"},"Forked from "+a.forked_repos[e.name].parent.full_name)}(e,a),function(e){if(e.description)return n.a.createElement("div",{className:"repo-desc"},e.description)}(e),n.a.createElement("div",{className:"repo-details clearfix"},function(e,a){var t={Python:"python","Jupyter Notebook":"jupyter","C++":"c",HTML:"html",JavaScript:"js",CSS:"css"};return e.fork?a.forked_repos[e.name]&&a.forked_repos[e.name].parent.language?n.a.createElement("div",{className:"repo-language clearfix"},n.a.createElement("div",{className:"circle "+t[a.forked_repos[e.name].parent.language]}),n.a.createElement("div",{className:"repo-language-text"},a.forked_repos[e.name].parent.language)):void 0:n.a.createElement("div",{className:"repo-language clearfix"},n.a.createElement("div",{className:"circle "+t[e.language]}),n.a.createElement("div",{className:"repo-language-text"},e.language))}(e,a),function(e,a){return!e.fork&&e.forks?n.a.createElement("div",{className:"repo-forks clearfix"},n.a.createElement("svg",{"aria-label":"fork",className:"forks-icon",viewBox:"0 0 16 16",version:"1.1",width:"16",height:"16",role:"img"},n.a.createElement("path",{fillRule:"evenodd",d:"M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 \r 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 \r 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25\r 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 \r 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 \r 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 \r 0 000 1.5z"})),n.a.createElement("div",{className:"repo-forks-text"},e.forks)):e.fork&&a.forked_repos[e.name]&&a.forked_repos[e.name].parent.forks?n.a.createElement("div",{className:"repo-forks clearfix"},n.a.createElement("svg",{"aria-label":"fork",className:"forks-icon",viewBox:"0 0 16 16",version:"1.1",width:"16",height:"16",role:"img"},n.a.createElement("path",{fillRule:"evenodd",d:"M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 \r 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 \r 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25\r 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 \r 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 \r 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 \r 0 000 1.5z"})),n.a.createElement("div",{className:"repo-forks-text"},a.forked_repos[e.name].parent.forks)):void 0}(e,a),function(e,a){if(e.license)return n.a.createElement("div",{className:"repo-license clearfix"},n.a.createElement("div",{className:"license-icon"},n.a.createElement("svg",{viewBox:"0 0 16 16",version:"1.1",width:"16",height:"16","aria-hidden":"true"},n.a.createElement("path",{fillRule:"evenodd",d:"M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"}))),n.a.createElement("div",{className:"repo-license-text"},e.license.name))}(e),function(e){return n.a.createElement("div",{className:"repo-updated"},"Updated on "+e.updated_at.slice(0,10))}(e)),n.a.createElement("div",{className:"star-button"},n.a.createElement("svg",{className:"star-button-icon",viewBox:"0 0 16 16",version:"1.1",width:"16",height:"16","aria-hidden":"true"},n.a.createElement("path",{fillRule:"evenodd",d:"M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"})),n.a.createElement("div",{className:"star-button-text"},"Star")))}var b=Object(o.b)((function(e){return{filter_language:e.filter.filter_language,repositories:e.repository.repositories,search:e.filter.search,type:e.filter.type,forked_repos:e.repository.forked_repos}}),(function(e){return{setRepositories:function(a){e(function(e){return{payload:e,type:"SET_REPOSITORIES"}}(a))},addForkedRepos:function(a){e(function(e){return{payload:e,type:"ADD_FORKED_REPOS"}}(a))}}}))((function(e){return Object(r.useEffect)((function(){c("users/Rpratik13/repos").then((function(e){return e.json()})).then((function(a){e.setRepositories(a),a.map((function(a){a.fork&&fetch("repos/Rpratik13/"+a.name).then((function(e){return e.json()})).then((function(t){var r={};r[a.name]=t,e.addForkedRepos(r)}))}))}))}),[]),n.a.createElement("div",{className:"repos"},n.a.createElement(_,null),n.a.createElement("ul",null,e.repositories.map((function(a){return w(a,e)}))))}));var A=function(){return n.a.createElement(o.a,{store:N},n.a.createElement("div",{className:"App"},n.a.createElement(s,null),n.a.createElement(b,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(A,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[11,1,2]]]);
//# sourceMappingURL=main.86ff9731.chunk.js.map