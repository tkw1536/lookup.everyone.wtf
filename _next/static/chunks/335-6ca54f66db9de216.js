(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[335],{1304:(e,s,t)=>{"use strict";t.d(s,{NS:()=>n,kt:()=>r});var r=function(e){return e.A="A",e.NS="NS",e.CNAME="CNAME",e.SOA="SOA",e.PTR="PTR",e.HINFO="HINFO",e.MX="MX",e.TXT="TXT",e.RP="RP",e.AFSDB="AFSDB",e.SIG="SIG",e.KEY="KEY",e.AAAA="AAAA",e.LOC="LOC",e.SRV="SRV",e.NAPTR="NAPTR",e.KX="KX",e.CERT="CERT",e.DNAME="DNAME",e.APL="APL",e.DS="DS",e.SSHFP="SSHFP",e.IPSECKEY="IPSECKEY",e.RRSIG="RRSIG",e.NSEC="NSEC",e.DNSKEY="DNSKEY",e.DHCID="DHCID",e.NSEC3="NSEC3",e.NSEC3PARAM="NSEC3PARAM",e.TLSA="TLSA",e.SMIMEA="SMIMEA",e.HIP="HIP",e.CDS="CDS",e.CDNSKEY="CDNSKEY",e.OPENPGPKEY="OPENPGPKEY",e.CSYNC="CSYNC",e.ZONEMD="ZONEMD",e.SVCB="SVCB",e.HTTPS="HTTPS",e.EUI48="EUI48",e.EUI64="EUI64",e.TKEY="TKEY",e.TSIG="TSIG",e.URI="URI",e.CAA="CAA",e.TA="TA",e.DLV="DLV",e.MD="MD",e.MF="MF",e.MB="MB",e.MG="MG",e.MR="MR",e.NULL="NULL",e.WKS="WKS",e.MINFO="MINFO",e.X25="X25",e.ISDN="ISDN",e.RT="RT",e.NSAP="NSAP",e.NSAP_PTR="NSAP-PTR",e.PX="PX",e.GPOS="GPOS",e.NXT="NXT",e.EID="EID",e.NB="NB",e.NIMLOC="NIMLOC",e.NBSTAT="NBSTAT",e.ATMA="ATMA",e.A6="A6",e.SINK="SINK",e.NINFO="NINFO",e.RKEY="RKEY",e.TALINK="TALINK",e.SPF="SPF",e.UINFO="UINFO",e.UID="UID",e.GID="GID",e.UNSPEC="UNSPEC",e.NID="NID",e.L32="L32",e.L64="L64",e.LP="LP",e.MAILB="MAILB",e.MAILA="MAILA",e.DOA="DOA",e}({});let n=Object.freeze(Object.keys(r).sort())},3057:e=>{e.exports={queryBox:"____type__queryBox__uwbzO",answerBox:"____type__answerBox__DEo_4"}},6294:e=>{e.exports={overlay:"Copyable_overlay__1_Xhg"}},6335:(e,s,t)=>{"use strict";t.r(s),t.d(s,{__N_SSG:()=>K,default:()=>k});var r=t(7876),n=t(4232),i=t(9099),l=t(7328),a=t.n(l),o=t(9703);class d extends n.Component{render(){let{style:e,value:s,animate:t,marquee:n}=this.props,i=[];void 0!==e&&""!==e&&i.push(e),t&&i.push("animate"),n&&i.push("marquee");let l=void 0!==s;return(0,r.jsx)("div",{role:"progressbar",className:i.join(" "),"aria-valuemin":l?0:void 0,"aria-valuemax":l?100:void 0,"aria-valuenow":l?s:void 0,children:l&&(0,r.jsx)("div",{style:{width:"".concat(s,"%")}})})}}class h extends n.Component{render(){let{activeIndex:e,children:s,onChange:t}=this.props;return(0,r.jsxs)("section",{className:"tabs",children:[(0,r.jsx)("menu",{role:"tablist",children:s.map((s,n)=>{let{title:i,child:l}=s;return(0,r.jsx)("button",{"aria-selected":e===n?"true":void 0,disabled:void 0===l,onClick:t.bind(this,n),children:i},n)})}),s.map((s,t)=>{let{child:n}=s;return(0,r.jsx)("article",{role:"tabpanel",hidden:e!==t,style:{overflow:"auto"},children:n},t)})]})}}class c extends n.Component{render(){let{children:e}=this.props;return(0,r.jsx)("code",{style:{whiteSpace:"pre-wrap"},children:e.split("\n").map((e,s)=>(0,r.jsxs)(n.Fragment,{children:[e,(0,r.jsx)("br",{})]},s))})}}var p=t(8447),x=t.n(p),u=t(6294),j=t.n(u);class m extends n.Component{clearTimeout(){void 0!==this.copyTimeout&&(clearTimeout(this.copyTimeout),this.copyTimeout=void 0)}render(){let{children:e}=this.props,{copied:s}=this.state;return(0,r.jsxs)("span",{children:[(0,r.jsx)("code",{children:e}),(0,r.jsx)(x(),{text:e,onCopy:this.setCopy,children:(0,r.jsx)("a",{className:j().overlay,children:s?"Copied":"Copy"})})]})}constructor(...e){super(...e),this.state={copied:!1},this.setCopy=()=>{this.setState({copied:!0},()=>{this.clearTimeout(),setTimeout(()=>{this.copyTimeout=void 0,this.setState({copied:!1})},1e3)})}}}var S=t(7851),N=t.n(S),C=t(2909).Buffer;class v extends n.Component{componentDidMount(){this.runQuery()}componentDidUpdate(e){let{nameserver:s,domain:t,type:r,forceReload:n}=this.props,{nameserver:i,domain:l,type:a,forceReload:o}=e;(s!==i||t!==l||r!==a||n!==o)&&this.runQuery()}componentWillUnmount(){this.unmounted=!0}render(){let{loading:e,result:s,error:t}=this.state;return e?(0,r.jsx)(d,{marquee:!0}):void 0!==t||void 0===s?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(d,{animate:!0,style:"error",value:100}),(0,r.jsxs)("p",{children:["Something went wrong: ",null!=t?t:"Unexpected error"]})]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(d,{value:100}),(0,r.jsx)("p",{}),(0,r.jsx)(A,{packet:s})]})}constructor(...e){super(...e),this.state={loading:!0},this.runQuery=async()=>{let e,s;this.setState({loading:!0,error:void 0,result:void 0});let{nameserver:t,domain:r,type:n}=this.props;try{s=await new o.DohResolver(t).query(r,n)}catch(s){e=s.toString()}this.unmounted||this.setState({loading:!1,result:s,error:e})},this.unmounted=!1}}class y extends n.Component{render(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(d,{value:0}),(0,r.jsx)("p",{children:"Make a query to get started"})]})}}class A extends n.Component{render(){let{packet:e}=this.props,{questions:s,answers:t,additionals:n,authorities:i,...l}=e,{activeIndex:a}=this.state,o=[{title:"Answers",child:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("p",{children:["Status: ",(0,r.jsx)("code",{children:T(l,"rcode")?l.rcode:"UNKNOWN"})]}),(0,r.jsx)(b,{answers:t||[]})]})},{title:"Additionals",child:n&&n.length>0?(0,r.jsx)(b,{answers:n}):void 0},{title:"Authorities",child:i&&i.length>0?(0,r.jsx)(b,{answers:i}):void 0},{title:"Questions",child:s&&s.length>0?(0,r.jsx)(g,{questions:s}):void 0},{title:"Raw",child:(0,r.jsx)(c,{children:JSON.stringify(e,null,"  ")})}];return(0,r.jsx)(h,{onChange:this.onChangeIndex,activeIndex:a,children:o})}constructor(...e){super(...e),this.state={activeIndex:0},this.onChangeIndex=e=>{this.setState({activeIndex:e})}}}class g extends n.Component{render(){let{questions:e}=this.props;return(0,r.jsxs)("table",{className:N().table,children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"Type"}),(0,r.jsx)("th",{children:"Name"})]})}),(0,r.jsx)("tbody",{children:e.map((e,s)=>(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:e.type}),(0,r.jsx)("td",{children:(0,r.jsx)(m,{children:e.name})})]},s))})]})}}class b extends n.Component{render(){let{answers:e}=this.props;return(0,r.jsxs)("table",{className:N().table,children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"Type"}),(0,r.jsx)("th",{children:"Class"}),(0,r.jsx)("th",{children:"Name"}),(0,r.jsx)("th",{children:"TTL"}),(0,r.jsx)("th",{children:"Data"})]})}),(0,r.jsx)("tbody",{children:e.map((e,s)=>(0,r.jsx)(D,{answer:e},s))})]})}}function T(e,s){return e.hasOwnProperty(s)}class D extends n.Component{render(){let{answer:{type:e,name:s,ttl:t,data:n,...i}}=this.props,l=T(i,"class")?i.class:"";return(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:e}),(0,r.jsx)("td",{children:l}),(0,r.jsx)("td",{children:(0,r.jsx)(m,{children:s})}),(0,r.jsx)("td",{children:void 0!==t&&(0,r.jsx)(f,{ttl:t})}),(0,r.jsx)("td",{children:(0,r.jsx)(I,{data:n})})]})}}class f extends n.Component{render(){let{ttl:e}=this.props,s=e,t=Math.floor(s/60),n=Math.floor(t/60);t%=60;let i=Math.floor(n/24),l=(i%=48)>0,a=l||n>0,o=a||t>0,d=(s%=60)>0;return(0,r.jsxs)("p",{children:[(0,r.jsx)("code",{children:e})," "," = "," ",(0,r.jsxs)("code",{children:[l&&(0,r.jsxs)(r.Fragment,{children:[i," Day",1!=i&&"s"," "]}),a&&(0,r.jsxs)(r.Fragment,{children:[n," Hour",1!=n&&"s"," "]}),o&&(0,r.jsxs)(r.Fragment,{children:[t," Minute",1!=t&&"s"," "]}),d&&(0,r.jsxs)(r.Fragment,{children:[s," Second",1!=s&&"s"," "]})]})]})}}class I extends n.Component{render(){let{data:e}=this.props;switch(!0){case Array.isArray(e):return e.map((e,s)=>(0,r.jsx)("p",{children:(0,r.jsx)(I,{data:e})},s));case e instanceof Uint8Array||e instanceof C:let s=String.fromCharCode.apply(String,Array.from(e));return(0,r.jsx)(m,{children:s});case"string"==typeof e:return(0,r.jsx)(m,{children:e});case T(e,"exchange")&&T(e,"preference"):let{exchange:t,preference:n}=e;return(0,r.jsxs)("table",{className:N().table,children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"Exchange"}),(0,r.jsx)("th",{className:N().preference,children:"Preference"})]})}),(0,r.jsx)("tbody",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(m,{children:t})}),(0,r.jsx)("td",{className:N().preference,children:n})]})})]})}return(0,r.jsx)("code",{children:JSON.stringify(e)})}}class E extends n.Component{render(){let{title:e,children:s,glass:t,className:n}=this.props,i=["window"];return t&&i.push("glass"),n&&i.push(n),(0,r.jsxs)("div",{className:i.join(" "),children:[(0,r.jsxs)("div",{className:"title-bar",children:[(0,r.jsx)("div",{className:"title-bar-text",children:e}),(0,r.jsx)("div",{className:"title-bar-controls",children:(0,r.jsx)("button",{"aria-label":"Close"})})]}),(0,r.jsx)("div",{className:"window-body",children:s})]})}}var P=t(1304);class M extends n.Component{render(){let{value:e,values:s,id:t,onChange:n}=this.props;return(0,r.jsx)("select",{value:e,id:t,onChange:n,children:s.map(e=>(0,r.jsx)("option",{value:e,children:e},e))})}}let w={Cloudflare:"https://1.1.1.1/dns-query"};class _ extends n.Component{render(){let{nameserver:e,domain:s,type:t}=this.props.query;return(0,r.jsxs)("form",{onSubmit:this.onSubmit,children:[(0,r.jsxs)("p",{children:["Make a DNS-over-HTTPS (DOH) Query using this page. All data is sent only to the selected server, and not stored by this website. ",(0,r.jsx)("br",{}),"Usage of the external server might be subject to the servers' Privacy Policy and/or Terms of Service."]}),(0,r.jsxs)("fieldset",{children:[(0,r.jsx)("legend",{children:"Query Settings"}),(0,r.jsxs)("div",{className:"field-row-stacked",children:[(0,r.jsx)("label",{"html-for":"domain",children:"Domain Name"}),(0,r.jsx)("input",{id:"domain",type:"text",onChange:this.handleChangeDomain,value:s})]}),(0,r.jsxs)("div",{className:"field-row-stacked",children:[(0,r.jsx)("label",{"html-for":"record",children:"Record Type"}),(0,r.jsx)(M,{id:"record-type",onChange:this.handleChangeType,value:t,values:P.NS})]})]}),(0,r.jsxs)("fieldset",{children:[(0,r.jsx)("legend",{children:"Server Settings"}),(0,r.jsxs)("div",{className:"field-row-stacked",children:[(0,r.jsx)("label",{"html-for":"nameserver",children:"DNS over HTTPS Server"}),(0,r.jsx)("input",{id:"nameserver",type:"text",onChange:this.handleChangeNameserver,value:e})]}),(0,r.jsxs)("div",{className:"field-row",children:["Common Servers:\xa0",Object.entries(w).map(e=>{let[s,t]=e;return(0,r.jsx)("button",{onClick:this.handleExampleNameserverClick.bind(this,t),children:s},s)})]})]}),(0,r.jsxs)("section",{className:"field-row",children:[(0,r.jsx)("button",{type:"submit",children:"Lookup"}),(0,r.jsx)("label",{children:"Press this button to submit the query"})]})]})}constructor(...e){super(...e),this.onSubmit=e=>{e.preventDefault(),this.props.onSubmit()},this.handleChangeNameserver=e=>{e.preventDefault();let{query:s,onChange:t}=this.props;t({...s,nameserver:e.target.value},s)},this.handleChangeDomain=e=>{e.preventDefault();let{query:s,onChange:t}=this.props;t({...s,domain:e.target.value},s)},this.handleChangeType=e=>{e.preventDefault();let{query:s,onChange:t}=this.props;t({...s,type:e.target.value},s)},this.handleExampleNameserverClick=(e,s)=>{s.preventDefault();let{query:t,onChange:r}=this.props;r({...t,nameserver:e},t)}}}var R=t(3057),O=t.n(R);class L extends n.Component{render(){let{href:e,...s}=this.props;return(0,r.jsx)("form",{action:e,method:"GET",target:"_blank",rel:"external noreferrer noopener",children:(0,r.jsx)("button",{role:"link",...s})})}}class F extends n.Component{componentDidUpdate(e){let{qtype:s}=this.props;e.qtype!=this.props.qtype&&this.onChange({type:s})}render(){let{queryState:e,answerState:s,counter:t}=this.state;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a(),{children:(0,r.jsx)("title",{children:"DNS Lookup"})}),(0,r.jsx)(E,{glass:!0,title:"DNS Query",className:O().queryBox,children:(0,r.jsx)(_,{onChange:this.onChange,onSubmit:this.onSubmit,query:e})}),(0,r.jsx)(E,{glass:!0,title:"Answer",className:O().answerBox,children:s?(0,r.jsx)(v,{...s,forceReload:t}):(0,r.jsx)(y,{})}),(0,r.jsx)(E,{glass:!0,title:"Public Cache Purger Links",className:O().queryBox,children:(0,r.jsxs)("section",{className:"field-row",children:[(0,r.jsx)(L,{href:"https://cloudflare-dns.com/purge-cache/",children:"CloudFlare"}),(0,r.jsx)(L,{href:"https://developers.google.com/speed/public-dns/cache",children:"Google DNS"}),(0,r.jsx)(L,{href:"https://cachecheck.opendns.com/",children:"OpenDNS"})]})})]})}constructor(...e){super(...e),this.state={counter:0,queryState:{nameserver:"https://1.1.1.1/dns-query",domain:"example.com",type:this.props.qtype}},this.onSubmit=()=>{this.setState(e=>{let{counter:s,queryState:t}=e;return{answerState:t,counter:1-s}})},this.onChange=(e,s)=>{let t=null!=s?s:this.state.queryState,r={...t,...e};this.setState({queryState:r},()=>{r.type!=t.type&&this.props.router.push("/rr/".concat(r.type))})}}}var K=!0;let k=(0,i.withRouter)(F)},7851:e=>{e.exports={table:"AnswerBox_table__kNtUS",preference:"AnswerBox_preference__R7KHJ"}}}]);