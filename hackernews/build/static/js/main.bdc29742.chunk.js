(this["webpackJsonpreact-js"]=this["webpackJsonpreact-js"]||[]).push([[0],{18:function(e,t,n){e.exports=n(32)},23:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),r=n(15),i=n.n(r),c=(n(23),n(4)),o=n(16),l=n(5),m=n(6),d=n(8);var u=function(e){var t=e.pad?"loading-pad":"",n=e.width;return s.a.createElement("div",{className:t},s.a.createElement("svg",{height:"20",width:n},s.a.createElement("path",{d:"M0,0 h"+n+"v20 h-"+n},s.a.createElement("animate",{attributeName:"fill",dur:"0.8s",repeatCount:"indefinite",values:"#987;#fff;#987;#987"}))))},f=function(e){Object(m.a)(n,e);var t=Object(l.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this)).componentDidMount=function(){window.addEventListener("resize",a.handleResize),a.fetchNews()},a.handleResize=function(){a.newsItemRef.current&&a.setState({width:a.newsItemRef.current.offsetWidth})},a.fetchNews=function(){a.setState({loading:!0,width:a.newsItemRef.current.offsetWidth}),fetch("https://hacker-news.firebaseio.com/v0/item/"+a.id+".json").then((function(e){return e.json()})).then((function(e){return a.setState({list:e,loading:!1})}))},a.render=function(){return s.a.createElement("div",{ref:a.newsItemRef,className:"news-item-container"},a.newsItemRef.current&&a.state.loading&&s.a.createElement(u,{width:a.state.width-60,pad:!0}),s.a.createElement(d.b,{to:"hackernews/build/news/"+a.id},!a.state.loading&&s.a.createElement("li",{className:"news-item",key:a.id},a.state.list.title)))},a.id=e.id,a.newsItemRef=s.a.createRef(),a.state={list:{},loading:!1},a}return n}(s.a.Component),h=function(e){Object(m.a)(n,e);var t=Object(l.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this)).render=function(){return s.a.createElement("div",{className:"nav-bar"},s.a.createElement("div",{className:"nav-bar-container clearfix"},s.a.createElement("div",{className:"title"},"HackerNews"),s.a.createElement("div",{className:"nav-btns"},s.a.createElement("div",{className:"arrow arrow-left",onClick:function(){return a.news.setPage(-1)}}),s.a.createElement("div",{className:"page-num"},a.news.state.page),s.a.createElement("div",{className:"arrow arrow-right",onClick:function(){return a.news.setPage(1)}}))))},a.news=e.news,a}return n}(s.a.Component),w=function(e){Object(m.a)(n,e);var t=Object(l.a)(n);function n(){var e;return Object(c.a)(this,n),(e=t.call(this)).componentDidMount=function(){e.fetchNewsList()},e.fetchNewsList=function(){e.setState({isLoading:!0}),fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty").then((function(e){return e.json()})).then((function(t){return e.setState({isLoading:!1,list:t})}))},e.setPage=function(t){var n=e.state.page+t;0<n&&n<parseInt(e.state.list.length/20+1)&&e.setState({page:n})},e.showNewsItem=function(e){return e.map((function(e){return s.a.createElement(f,{id:e})}))},e.state={detailsId:-1,isLoading:!1,list:[],page:1,showDetails:!1},e}return Object(o.a)(n,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(h,{news:this}),s.a.createElement("ul",{className:"news-list"},this.state.list.slice(20*(this.state.page-1),20*this.state.page).map((function(e){return s.a.createElement(f,{id:e,key:e})}))))}}]),n}(s.a.Component),p=function(e){Object(m.a)(n,e);var t=Object(l.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this)).componentDidMount=function(){window.addEventListener("resize",a.handleResize),a.fetchCommentsDetails()},a.fetchCommentsDetails=function(){a.setState({loading:!0,width:a.commentRef.current.offsetWidth}),fetch("https://hacker-news.firebaseio.com/v0/item/"+a.state.id+".json").then((function(e){return e.json()})).then((function(e){return a.setState({comment:e,loading:!1})}))},a.handleResize=function(){a.commentRef.current&&a.setState({width:a.commentRef.current.offsetWidth})},a.showSubComment=function(){if(a.state.comment.kids&&!a.state.comment.deleted)return a.state.comment.kids.map((function(e){return s.a.createElement(n,{key:e,commentId:e,type:"sub-comment"})}))},a.render=function(){return s.a.createElement("div",{ref:a.commentRef,className:a.state.type},a.state.loading&&s.a.createElement(u,{width:"100",pad:!1}),!a.state.loading&&s.a.createElement("div",{className:"comment-author"},a.state.comment.by),a.commentRef.current&&a.state.loading&&s.a.createElement(u,{width:a.state.width-60,pad:!1}),!a.state.loading&&s.a.createElement("p",{dangerouslySetInnerHTML:{__html:a.state.comment.text}}),a.showSubComment())},a.commentRef=s.a.createRef(),a.state={comment:{},id:e.commentId,kids:[],loading:!1,type:e.type},a}return n}(s.a.Component),v=function(e){Object(m.a)(n,e);var t=Object(l.a)(n);function n(){var e;return Object(c.a)(this,n),(e=t.call(this)).componentDidMount=function(){e.fetchNewsDetails()},e.componentWillMount=function(){document.addEventListener("keydown",e.handleKeyPress),document.addEventListener("mousedown",e.handleClickOutside),e.setState({display:!0})},e.handleClickOutside=function(t){e.state.display&&e.wrapperRef&&!e.wrapperRef.current.contains(t.target)&&(e.setState({display:!1}),e.props.history.goBack())},e.handleKeyPress=function(t){"Escape"===t.key&&e.state.display&&(e.setState({display:!1}),e.props.history.goBack())},e.handleCrossClick=function(){e.setState({display:!1}),e.props.history.goBack()},e.fetchNewsDetails=function(){var t=e.props.match.params.newsId;fetch("https://hacker-news.firebaseio.com/v0/item/"+t+".json").then((function(e){return e.json()})).then((function(t){return e.setState({news:t})}))},e.showComment=function(){if(e.state.news.kids&&!e.state.news.kids.deleted)return e.state.news.kids.map((function(e){return s.a.createElement(p,{key:e,commentId:e,type:"comment"})}))},e.render=function(){return s.a.createElement("div",{className:"news-details"},s.a.createElement("div",{ref:e.wrapperRef,className:"news-details-container"},s.a.createElement("div",{className:"cross-btn",onClick:function(){return e.handleCrossClick()}}),s.a.createElement("div",{className:"news-title"},s.a.createElement("a",{href:e.state.news.url,target:"_blank"},e.state.news.title)),e.showComment()))},e.state={display:!1,id:0,news:{}},e.wrapperRef=s.a.createRef(),e}return n}(s.a.Component),E=n(1);var g=function(){return s.a.createElement("div",{className:"App"},s.a.createElement(d.a,null,s.a.createElement(E.a,{path:"/",component:w}),s.a.createElement(E.a,{path:"/hackernews/build/news/:newsId",component:v})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(29),n(30),n(31);i.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(g,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[18,1,2]]]);
//# sourceMappingURL=main.bdc29742.chunk.js.map