(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{35:function(A,e,a){A.exports=a.p+"static/media/dp.304dfc3e.jpg"},42:function(A,e,a){"use strict";(function(A){var t=a(0),n=a.n(t),r=a(50),l=a(5),s=a(43),c=a(47);const o=(e,a)=>a?r.a.post(l.a.CORS_PROXY+"/?url="+A.from(e).toString("base64"),a).then(A=>A.data).catch(()=>{throw new Error(e)}):r.a.get(l.a.CORS_PROXY+"/?url="+A.from(e).toString("base64")).then(A=>A.data).catch(()=>{throw new Error(e)}),i=A=>{let e="";for(let a of A)(a>="a"&&a<="z"||a>="A"&&a<="Z")&&(e+=a.toLowerCase());return e in l.a.TAGS_TO_DISPLAY?l.a.TAGS_TO_DISPLAY[e]:l.a.TAGS_TO_DISPLAY.miscellaneous},m=(A,e,a)=>{const t=new Date(A);if(t<new Date("01-01-2020"))return;const n=t.getFullYear();var r;n in a||(a[n]=new Array(365).fill(0)),a[n][(r=t,Math.floor((r-new Date(r.getFullYear(),0,0))/1e3/60/60/24)-1)]+=e};e.a=()=>{const A={},e={query:"query getUserProfile($username: String!) { allQuestionsCount { difficulty count } matchedUser(username: $username) { contributions { points } profile { reputation ranking } submissionCalendar submitStats { acSubmissionNum { difficulty count submissions } totalSubmissionNum { difficulty count submissions } } } } ",variables:{username:"".concat(l.a.LEETCODE_USER)}},a={query:"\n    query skillStats($username: String!) {\n  matchedUser(username: $username) {\n    tagProblemCounts {\n      advanced {\n        tagName\n        tagSlug\n        problemsSolved\n      }\n      intermediate {\n        tagName\n        tagSlug\n        problemsSolved\n      }\n      fundamental {\n        tagName\n        tagSlug\n        problemsSolved\n      }\n    }\n  }\n}\n    ",variables:{username:"".concat(l.a.LEETCODE_USER)}},[r,g]=Object(t.useState)(!0),[u,E]=Object(t.useState)(0),[p,d]=Object(t.useState)({}),[C,v]=Object(t.useState)(new Array(365)),[B,f]=Object(t.useState)([]),[k,S]=Object(t.useState)(new Map),[h,Q]=Object(t.useState)(0);return Object(t.useEffect)(()=>{(async()=>{try{let n=0,r={LeetCode:0},s=new Map;n+=(await o(l.a.LEETCODE_GRAPHQL,e)).data.matchedUser.submitStats.acSubmissionNum[0].count,r.LeetCode=n;let c=await o(l.a.STOPSTALK.USER_STATS_URL);n+=c.solved_problems_count;for(const[A,e]of Object.entries(c.solved_counts))0!==e&&(r[A]=e);E(n),d(Object.fromEntries(Object.entries(r).sort((A,e)=>{let[,a]=A,[,t]=e;return t-a})));let u=await o(l.a.LEETCODE_GRAPHQL,a);u.data.matchedUser.tagProblemCounts.advanced.forEach(A=>{let e=i(A.tagName),a=s.get(e);a?s.set(e,a+A.problemsSolved):s.set(e,A.problemsSolved)}),u.data.matchedUser.tagProblemCounts.intermediate.forEach(A=>{let e=i(A.tagName),a=s.get(e);a?s.set(e,a+A.problemsSolved):s.set(e,A.problemsSolved)}),u.data.matchedUser.tagProblemCounts.fundamental.forEach(A=>{let e=i(A.tagName),a=s.get(e);a?s.set(e,a+A.problemsSolved):s.set(e,A.problemsSolved)});let p=await o(l.a.STOPSTALK.TAGS_URL);for(const A in p.solved_problems){let e=p.solved_problems[A],a=i(A),t=s.get(a);"Miscellaneous"===a&&(t?s.set(a,t+e.length):s.set(a,e.length))}for(const e in c.calendar_data)m(e,c.calendar_data[e].AC,A);let C=[],B="2020",k=(new Date).getFullYear().toString();for(let A=B;A<=k;A++)C.push(A);for(const e of C){let a=await o(l.a.LEETCODE_GRAPHQL,(t=e,{query:"\n    query userProfileCalendar($username: String!, $year: Int) {\n  matchedUser(username: $username) {\n    userCalendar(year: $year) {\n      activeYears\n      streak\n      totalActiveDays\n      dccBadges {\n        timestamp\n        badge {\n          name\n          icon\n        }\n      }\n      submissionCalendar\n    }\n  }\n}\n    ",variables:{username:"".concat(l.a.LEETCODE_USER),year:"".concat(t)}})),n=JSON.parse(a.data.matchedUser.userCalendar.submissionCalendar);for(const e in n)m(1e3*e,parseInt(n[e]),A)}let h=0,b=0;for(const e of C)for(const a of A[e])0===a?(b=Math.max(b,h),h=0):h++;Q(b),v({...A}),f([...C]),S(new Map(s)),g(!1)}catch(n){n===l.a.LEETCODE_GRAPHQL||l.a.LEETCODE_USER}var t})()},[]),n.a.createElement(n.a.Fragment,null,r?n.a.createElement(c.a,null):null,n.a.createElement("div",{className:"codingContainer"},n.a.createElement("div",{className:"prosummContainer"},n.a.createElement("div",{className:"totalContainer"},n.a.createElement("div",{className:"keyValueContainer"},n.a.createElement("div",{className:"keyHeading"},"Problems solved"),n.a.createElement("div",{className:"valueHeading"},u)),n.a.createElement("div",{className:"keyValueContainer"},n.a.createElement("div",{className:"keyHeading"},"Max Day Streak"),n.a.createElement("div",{className:"valueHeading"},h))),n.a.createElement("div",{className:"platContainer"},Object.keys(p).map(A=>n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"keyValueContainer",key:A,id:A},n.a.createElement("div",{className:"keyHeading"},A),n.a.createElement("div",{className:"valueHeading"},p[A]))))),n.a.createElement(s.a,{yearsToList:B,heatData:C})),n.a.createElement("div",{className:"tagsContainer"},[...k.keys()].map(A=>n.a.createElement("div",{className:"keyValueContainer"},n.a.createElement("div",{className:"keyHeading"},A," ",n.a.createElement("span",{className:"valueHeading"},"(",k.get(A),")")))))))}}).call(this,a(33).Buffer)},43:function(A,e,a){"use strict";var t=a(0),n=a.n(t),r=a(49);e.a=A=>{const{yearsToList:e,heatData:a}=A,l=new Date,[s,c]=Object(t.useState)(l.getFullYear().toString()),[o,i]=Object(t.useState)(365);return n.a.createElement("div",{className:"heatMapContainer"},n.a.createElement("label",{for:"years"},"Choose a year: "),n.a.createElement("select",{className:"dropDown",name:"yearsDD",id:"yearsDD",value:s,onChange:A=>{c(A.target.value)}},e.map(A=>n.a.createElement("option",{className:"dropDown",value:A},A))),n.a.createElement("div",{className:"heatmapDivWrapper"},n.a.createElement(r.a,{colour:["#232423","#2ec730","#179c19","#0b700d","#024d03","#013b01"],squareNumber:o,count:a[s],squareGap:"4px",squareSize:"15px"})))}},47:function(A,e,a){"use strict";var t=a(0),n=a.n(t),r=a(48),l=a.n(r);e.a=()=>n.a.createElement("div",{className:"loaderMain"},n.a.createElement("img",{src:l.a,alt:""}))},48:function(A,e,a){A.exports=a.p+"static/media/loadingGif.158162d1.gif"},5:function(A,e,a){"use strict";let t={USER_ID:"91752"};t.USER_STATS_URL="https://www.stopstalk.com/user/get_stopstalk_user_stats.json?user_id=".concat(t.USER_ID,"&custom=False"),t.TAGS_URL="https://www.stopstalk.com/user/get_solved_unsolved.json?user_id=".concat(t.USER_ID,"&custom=False"),e.a={CORS_PROXY:"https://cors-proxy-kyez.onrender.com",LEETCODE_USER:"manral",LEETCODE_GRAPHQL:"https://leetcode.com/graphql",STOPSTALK:t,TAGS_TO_DISPLAY:{array:"Array",dynamicprogramming:"Dynamic Programming",binarysearch:"Binary Search",greedy:"Greedy",tree:"Trees",trees:"Trees",graph:"Graphs",graphs:"Graphs",math:"Math",string:"Strings",strings:"Strings",bitmanipulation:"Bit Manipulation",miscellaneous:"Miscellaneous"},GITHUB_ALL:"https://api.github.com/users/manralhemant10/repos?sort=created",techTags:["Node.js","React.js","mern","php","javascript","Typescript","C++","Python","Bash"]}},53:function(A,e,a){A.exports=a(88)},78:function(A,e,a){A.exports=a.p+"static/media/google.2de36850.png"},79:function(A,e){A.exports="data:image/png;base64,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kgKAAkAACACSAoACQAAIAJICgAJAAAgAkgJAAAgACgCSAkAACAAKAJICQAAIAAoAkgJAAAgACgBSAAgAASAAKABIASAABIAAoAAgBYAAEAACQAAIAFIACAABIAAEgAAgBYAAEAACQAAIgKVxulp7YWb86aG1c9P/+Dv3mfP/nuiJJ576u+MrAASAABAAi9mMh5mIAH9nUgAIAAEgAAQASQEgAAQABQBJASAABIAAEAAkBYAAEAACQACQFAACQAAIAAFACgABYBEIAAEgAEgBIAAoAASAACAFgACgABAAAoAUAAKAAkAACABSAAgACgABIABIASAAKAAEgAAgBYAAoAAQAAKAFAACQAAIAAEgAEgBIAAEgAAQAAKAFAACQAAIAAEgAEgBIAAEgAAQAAKAFAACQAAIAAEgAEgBIAAEgAAQACQFgAAQABQAJAWAABAAAkAAkBQAAkAACAABQFIACAABMKxOV2sXhuRKOrv+HwKAFAACgAKgacaQFgCkABAAFAACQACQAkAACAABIAAEACkABIAAEAACQACQAkAACAABIAAEACkABIAAEAACQACQAkAACAABIAAEACkABIAAEAACgKQAEAACgAKApAAQAAKAAoCkABAAAoACgL3w1PZ/9cQfHl3v+AoAASAABIAAEAD9aq+IPcPxFQACQAAIAAEgAAQABYAAEAACQABQAFAACAAB4PgKAAoACgABIAAoACgAKAAEgACgAKAAoAAQAAKAAoACgAJAAAgACgAKAAEgACgAKAAoAASAAKAAoACgABAAAoACgAKAAkAACAAKAAoACgABIAAoACgABIAAEAACgAJAAAgAASAABIAAoAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQABQAAgAASAABAAFAAWAABAAAkAAUABQAAgAAUABQAFAASAABAAFAAUABYAAEAAUABQAFAACQABQAFAACAABQAFAAUABIAAEAAUABQAFgAAQABQAFAAUAAJAAFAAUABQAAgAAUABQAEgAASAABAAFAACQAAIAAEgAAQABYAAEAACQAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAoACQAAIAAEgABxjAUABIAAEgAAQABQAFAACQABQAFAAUAAIAAFAAUABQAEgAAQABQAFAAWAABAAFAAUAAJAAFgEAoACgAJAAAgACgAKAAoAASAAKAAoACgABIAAoACgAKAAEAACgAKAAkAACAABIAAoAASAABAAAkAACAAKAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABIAAEAAWAABAAAkAACAABQAEgAASAABAAFAAUAAJAAFAAUABQAAgAAUABQAFAASAABAAFAAUABYAAEAAUABQAFAACQABQAFAACAABQAFAAUABIAAEAAUABQAFgAAQABQAFAAUAAJAAFAAUAAIAAEgAAQABQAFgAAQAAJAAFAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAAKAAEgAAQAAJAAAgACgABIAAEgACgAKAAEAACgAKAAoACQAAIAAoACgAKAAEgACgAKAAoAASAAKAAoACgABAAAoACgAJAAAgACoCBdrpauzAkV9LZ9f/o2d86/m+v9P9/cYytNQEgAAQABUBfOf/viQvoLXGMrTUBIAAEAAWAABAAAkAACAABQAEgAASAABAAAkAAUAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABIAAoAASAABAAAkAACAAKAAEgAASAABAAAoACQAAIAAoAASAAKAAEgAAQABAAAoACQAAIAAEAASAAKAAEgAAQABAAAoACQAAIAAEAASAABIAAoAAQABAAAkAACAAKAAEAASAABIAAoAAQAAJAAAgAASAAKAAEgAAQAAJAAAgACgABIAAEgAAQAAKAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACoBdOV2svzIw/zR4ax9haEwACQABQAJACQAAIAAFAAUAKAAEgAAQABQApAASAABAAAkAAkAJAAAgAASAABAApAASAABAAAkAAkAJAAAgAASAABAApACgABIAAEACkAKAAEAACQACQAoACQAAIAJICgAJAAAgAkgKAAkAACACSAoACQAAIAJICgAJAAAgAkgJAAAgACgCSAkAACAAKAJICQAAIAAoAkgJAAAgACgBSAAgAASAAKABIASAABIAAoAAgBYAA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"},80:function(A,e,a){A.exports=a.p+"static/media/fastmail.cefd4bf9.png"},81:function(A,e,a){A.exports=a.p+"static/media/bizmerlin.dbbe9989.png"},82:function(A,e,a){A.exports=a.p+"static/media/vista.d5a88e67.png"},83:function(A,e,a){A.exports=a.p+"static/media/dutchgovt.c4d1918b.png"},86:function(A,e,a){},88:function(A,e,a){"use strict";a.r(e);var t=a(0),n=a.n(t),r=a(21),l=a.n(r),s=a(11),c=a(4);var o=()=>n.a.createElement("div",{className:"header"},n.a.createElement("nav",null,n.a.createElement(s.b,{activeClassName:"navActive",exact:!0,className:"nav-item",to:"/about"},"About"),n.a.createElement(s.b,{activeClassName:"navActive",className:"nav-item",to:"/skills"},"Skills"),n.a.createElement(s.b,{activeClassName:"navActive",className:"nav-item",to:"/experience"},"Experience"),n.a.createElement(s.b,{activeClassName:"navActive",className:"nav-item",to:"/projects"},"Projects"),n.a.createElement(s.b,{activeClassName:"navActive",className:"nav-item",to:"/codingprofile"},"Coding Profile"))),i=a(35),m=a.n(i),g=a(36),u=a.n(g),E=a(22),p=a.n(E),d=a(37),C=a.n(d);var v=()=>n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"socialLinks"},n.a.createElement("div",{className:"socialUpwards"},n.a.createElement("a",{href:"https://www.linkedin.com/in/hemant-singh-manral-7a33a6174/"},n.a.createElement(u.a,null)),n.a.createElement("a",{href:"https://github.com/manralhemant10"},n.a.createElement(p.a,null))),n.a.createElement(C.a,{className:"socialBtn",style:{width:50,height:50}})));var B=()=>n.a.createElement("div",{className:"aboutMain"},n.a.createElement("div",{className:"imgParaAbout"},n.a.createElement("div",{className:"aboutImg"},n.a.createElement("img",{src:m.a,alt:""}),n.a.createElement("p",null,n.a.createElement("q",null,"Develop as a Hacker.",n.a.createElement("br",null),"Hack as a Developer"))),n.a.createElement("div",{className:"aboutPara"},n.a.createElement("p",null,"Hello ",n.a.createElement("span",{className:"hiemoji"},"\ud83d\udc4b"),",",n.a.createElement("br",null),"I'm Hemant Singh Manral, a versatile Full Stack Developer with a passion for solving complex problems across diverse tech stacks. My ability to adapt to new technologies and tackle challenging projects sets me apart. From enhancing system resiliency to developing innovative applications, my work demonstrates my commitment to excellence."))),n.a.createElement(v,null));var f={"Programming Languages":[{name:"C++",percent:90},{name:"Javascript",percent:90},{name:"TypeScript",percent:80},{name:"Java",percent:90}],"Web Development":[{name:"React",percent:90},{name:"NodeJs",percent:90},{name:"Expressjs",percent:90},{name:"Spring Boot",percent:90},{name:"Angular",percent:90},{name:"MicroServices",percent:90}],Databases:[{name:"MySql",percent:80},{name:"MongoDb",percent:60},{name:"Oracle",percent:90}],miscellaneous:[{name:"Srping Batch",percent:80},{name:"Apache Spark",percent:80}]};var k=A=>n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"skillBarDiv"},n.a.createElement("h3",null,A.skillName)));var S=A=>{const e=Object.entries(f),a=e[A.ind][1];return n.a.createElement(n.a.Fragment,null,n.a.createElement("h1",{className:"SkillCatTitle"},e[A.ind][0]),n.a.createElement("div",{className:"SkillCategoryDiv"},a.map((A,e)=>n.a.createElement(k,{key:e,skillName:A.name,skillPercent:A.percent}))))};const h=Object.keys(f);var Q=()=>n.a.createElement("div",{className:"SkillsContainer"},n.a.createElement("div",null,h.map((A,e)=>n.a.createElement(n.a.Fragment,null,n.a.createElement(S,{key:e,ind:e}))))),b=a(38);var J=A=>{const{title:e,company:a,duration:t,desc:r}=A.dis;return n.a.createElement("div",{className:"ExperienceInner"},n.a.createElement("h1",null,e," at ",a),n.a.createElement("p",null,n.a.createElement("span",null,"Duration: "),n.a.createElement("br",null),t),n.a.createElement("p",{className:"expDesc"},n.a.createElement("span",null,"Description: "),n.a.createElement("br",null),Object(b.a)(r)),n.a.createElement("p",{id:"whichSlide"},"".concat(A.curCount+1,"/").concat(A.total)))};var I={exp:[{title:"Senior Full Stack Developer",company:"BNY",duration:"June 2023 - present",desc:"\n        <b>Tech stack: Spring Boot, Spring Batch, Spring JPA, Apache Spark, Angular, Oracle DB, MQ, Microservices</b><br>\n        - Developed and Optimized Spring Batch jobs to efficiently process millions of data lines from files and \n        message notifications, incorporating complex business logic for rapid execution.</br>\n        - Implemented robust tracking and replay of user activities using Spring Boot to enhance the system's \n        cyber resiliency.</br>\n        - Improved comparison scripts with Apache Spark and korn shell scripts to ensure readiness for \n        production releases, enhancing data validation and reliability.</br>\n        - Ensured the smooth operation of lower environment batches and servers by proactively monitoring \n        performance, diagnosing issues, and implementing effective resolutions to maintain optimal system \n        functionality.</br>\n        - Worked closely with summer interns as mentor, providing comprehensive technical and business \n        knowledge to facilitate their integration and professional growth alongside my daily responsibilities.</br>\n        "},{title:"Full Stack Developer",company:"Oracle Financial Services Software",duration:"Aug 2021 - present",desc:"\n        <b>Tech stack: Java, JAX-RS, Javascript, knockout.js, Velocity(apache), SQL/PLSQL</b><br>\n        <br><u><b>Client: Leading Bank in UK Region</b></u><br>\n        - Developed PLSQL Scripts for complete data migration of Retail/corporate Banking, Third party providers\n        data.<br>\n        - Developed Open Banking API\u2019s for Domestic Payment, reading corporate party Details along with\n        integration with SOAP Web Services.<br>\n        <br><u><b>Client: Leading Bank in UAE Region</b></u><br>\n        - Added new customized fields end to end in Fund transfers of retail banking, Liquidity Management.<br>\n        - Involved in optimization of data migration scripts of retail/corporate banking.<br>\n        - Developed complete new Transactions for Defining Mesh Sweep in Liquidity Management.<br>\n        "},{title:"Bug Hunter",company:"Bugcrowd",duration:"1+ Year",desc:'- Reported Web/Android Vulnerabilities on more than 50+ targets.<br>\n        - Secured more than 50+ Organizations including <a href="https://bughunters.google.com/profile/4c9277a0-5d33-4a9c-8221-ed4eec009e14" style="color:white;">Google</a>, \n        <a href="https://www.fastmail.com/bug-bounty/" style="color:white;">fastmail</a>, dutch goverment etc.<br><br>\n        <b>Bugcrowd profiles:</b><br>\n        1> <a href="https://bugcrowd.com/manralhemant10" style="color:white;">Bugcrowd Profile 1</a><br>\n        2> <a href="https://bugcrowd.com/definite" style="color:white;">Bugcrowd Profile 2</a><br>\n        '}]},y=a(27),w=a.n(y);var P=()=>{const[A,e]=Object(t.useState)(0),[a,r]=Object(t.useState)(I.exp[A]),l=I.exp.length;return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"ExperienceMain"},n.a.createElement("div",{className:"prevBtn"},n.a.createElement(w.a,{onClick:()=>{e((A-1+l)%l),r(I.exp[(A-1+l)%l])}})),n.a.createElement("div",{className:"ExperienceOuter"},n.a.createElement(J,{dis:a,total:I.exp.length,curCount:A})),n.a.createElement("div",{className:"nextBtn"},n.a.createElement(w.a,{onClick:()=>{e((A+1)%l),r(I.exp[(A+1)%l])}}))))},F=a(50),D=a(5);const N={smallsize:{height:35}};var M=A=>n.a.createElement("div",{className:"projCard"},n.a.createElement("h1",null,A.title),n.a.createElement("a",{href:A.link,title:"Click to visit the repo",target:"_blank"},n.a.createElement("div",{className:"Repo"},n.a.createElement(p.a,{style:N.smallsize}),n.a.createElement("span",null,"Repo"))),n.a.createElement("p",null,A.desc));var T=A=>n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"tagLookDiv"},n.a.createElement("strong",null,A.tagName," ",n.a.createElement("span",{onClick:e=>{A.handleFun(e.target.previousSibling.wholeText)}},"X"))));var x=A=>{const[e,a]=Object(t.useState)(""),[r,l]=Object(t.useState)(D.a.techTags),[s,c]=Object(t.useState)([]),o=(A,e)=>{let a=0;if(e.length>A.length)return!1;for(;a<e.length;){if(A[a]!==e[a])return!1;a++}return!0},i=e=>{a("");const t=e.target.textContent;c(A=>[...A,t]),A.handleFun([...s,t])},m=e=>{const a=s;let t=e.slice(0,-1),n=-1;for(let A=0,r=a.length;A<r;A++)if(a[A]===t){n=A;break}a.splice(n,1),c([...a]),A.handleFun([...a])};return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"searchntagsContainer"},n.a.createElement("h1",{className:"headFiltertag"},"Filter by Tech"),n.a.createElement("div",{className:"searchnsuggContainer"},n.a.createElement("input",{list:"tags",value:e,onChange:A=>{a(A.target.value)},placeholder:"Search tags..."}),e.length>0?n.a.createElement("ul",{className:"suggestionsContainer"},e?(()=>{let A=0;const a=[];for(let t of r){if(A>=5)break;o(t.toLowerCase(),e.toLowerCase())&&(A++,a.push(t))}return a})().map((A,e)=>n.a.createElement("li",{key:"val".concat(e),id:"dropDownSugg".concat(e),onClick:i,value:A},A)):null):null),s.length>0&&0===e.length?n.a.createElement("div",{className:"selectedTagsContainer"},s.map(A=>n.a.createElement(T,{tagName:A,handleFun:m}))):null))};var L=()=>{const[A,e]=Object(t.useState)([]),a=A=>{let e="";for(let a of A)a=a.toLowerCase(),a>="a"&&a<="z"&&(e+=a);return e};let r=async A=>{let t,n=A?A.length:0;n>0&&(t=new Set(A.map(A=>a(A))));let r=[];await F.a.get(D.a.GITHUB_ALL).then(A=>{A.data.forEach(A=>{if(n>0){for(const e of A.topics)if(t.has(a(e))){r.push({title:A.name,desc:A.description,link:A.html_url,tags:A.topics});break}}else r.push({title:A.name,desc:A.description,link:A.html_url,tags:A.topics})})}).catch(()=>{}).finally(()=>{e([...r])})};return Object(t.useEffect)(()=>{r()},[]),n.a.createElement(n.a.Fragment,null,n.a.createElement("div",null,n.a.createElement(x,{handleFun:r})),n.a.createElement("div",{className:"projectContainer"},A.map(A=>n.a.createElement(M,{link:A.link,title:A.title,desc:A.desc}))))};var U=A=>n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"AchievementChild"},n.a.createElement("h1",null,A.title),n.a.createElement("a",{href:A.link,target:"_blank"},n.a.createElement("img",{src:A.img,alt:""}))));var j={"Hall of fames/ Appreceations/ Rewards":[{company_name:"Google",logo:a(78),hoflink:"https://bughunter.withgoogle.com/rank/hm/1"},{company_name:"OnePlus",logo:a(79),hoflink:"https://security.oneplus.com/charts.html"},{company_name:"Fastmail",logo:a(80),hoflink:"https://www.fastmail.com/about/bugbounty/"},{company_name:"Bizmerlin",logo:a(81),hoflink:"https://www.bizmerlin.com/responsible-disclosure-policy/"},{company_name:"Vista",logo:a(82),hoflink:"https://www.vista.co/responsible-disclosure-policy/"},{company_name:"Dutch Goverment",logo:a(83),hoflink:""}]};var O=A=>{const e=Object.entries(j);var a=e[A.ind][1].length,r=[];if(a>3)r=[0,1,2,3,4,5],a=6;else for(var l=0;l<a;l++)r.push(l);const[s,c]=Object(t.useState)(r);return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"Achievementhead"},n.a.createElement("h1",null,e[A.ind][0])),n.a.createElement("div",{className:"AchievementCategoryParent"},n.a.createElement("div",{className:"AchievementCategory"},s.map((a,t)=>n.a.createElement(U,{link:e[A.ind][1][a].hoflink,title:e[A.ind][1][a].company_name,img:e[A.ind][1][a].logo}))),n.a.createElement("div",{className:"AchievementBtnDiv"},n.a.createElement("button",{className:"Achievementmorebtn",id:"more".concat(A.ind),onClick:A=>{const a=A.target.id.substr(4),t=e[a][1].length;if(s[s.length-1]!==t-1){var n,r=[];c(A=>{n=t-A.length<6?t-A.length:6;for(var e=0;e<n;e++)r.push(A.length+e);return[...A,...r]})}}},"More"),n.a.createElement("button",{className:"Achievementlessbtn",id:"less".concat(A.ind),onClick:A=>{var e;s.length<=6||c(A=>{const a=A.length;e=a%6===0?a-6:a-a%6;const t=[...A];return t.splice(e),t})}},"Less"))))};var K=()=>{const A=Object.keys(j);return n.a.createElement("div",{className:"AchievementContainer"},A.map((A,e)=>n.a.createElement(n.a.Fragment,null,n.a.createElement(O,{key:e,ind:e}))))},Y=a(42);var X=function(){return n.a.createElement("div",{className:"mainDiv"},n.a.createElement(o,null),n.a.createElement(c.c,null,n.a.createElement(c.a,{path:"/about",component:B}),n.a.createElement(c.a,{path:"/skills",component:Q}),n.a.createElement(c.a,{path:"/experience",component:P}),n.a.createElement(c.a,{path:"/projects",component:L}),n.a.createElement(c.a,{path:"/achievements",component:K}),n.a.createElement(c.a,{path:"/codingprofile",component:Y.a}),n.a.createElement(c.a,{path:"/",component:B})))};a(86);l.a.render(n.a.createElement(s.a,{basename:"/portfolio"},n.a.createElement(X,null)),document.getElementById("root"))}},[[53,1,2]]]);
//# sourceMappingURL=main.f1353787.chunk.js.map