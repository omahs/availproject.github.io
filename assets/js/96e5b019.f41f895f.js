"use strict";(self.webpackChunkavail_docs_wiki=self.webpackChunkavail_docs_wiki||[]).push([[929],{3905:(e,a,t)=>{t.d(a,{Zo:()=>p,kt:()=>h});var r=t(7294);function n(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function o(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?o(Object(t),!0).forEach((function(a){n(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function l(e,a){if(null==e)return{};var t,r,n=function(e,a){if(null==e)return{};var t,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],a.indexOf(t)>=0||(n[t]=e[t]);return n}(e,a);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var s=r.createContext({}),d=function(e){var a=r.useContext(s),t=a;return e&&(t="function"==typeof e?e(a):i(i({},a),e)),t},p=function(e){var a=d(e.components);return r.createElement(s.Provider,{value:a},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var a=e.children;return r.createElement(r.Fragment,{},a)}},v=r.forwardRef((function(e,a){var t=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=d(t),v=n,h=u["".concat(s,".").concat(v)]||u[v]||c[v]||o;return t?r.createElement(h,i(i({ref:a},p),{},{components:t})):r.createElement(h,i({ref:a},p))}));function h(e,a){var t=arguments,n=a&&a.mdxType;if("string"==typeof e||n){var o=t.length,i=new Array(o);i[0]=v;var l={};for(var s in a)hasOwnProperty.call(a,s)&&(l[s]=a[s]);l.originalType=e,l[u]="string"==typeof e?e:n,i[1]=l;for(var d=2;d<o;d++)i[d]=t[d];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}v.displayName="MDXCreateElement"},3410:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>d,contentTitle:()=>l,default:()=>v,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var r=t(7462),n=(t(7294),t(3905)),o=t(4996);const i={id:"avail-upgrade-validator-node",title:"How to Upgrade Your Avail Validator",sidebar_label:"Upgrade Your Validator",sidebar_position:3,description:"Learn about upgrading a validator",keywords:["docs","avail","node","validator"],image:"https://availproject.github.io/img/avail/AvailDocs.png",slug:"avail-upgrade-validator-node"},l=void 0,s={unversionedId:"validators/avail-upgrade-validator-node",id:"validators/avail-upgrade-validator-node",title:"How to Upgrade Your Avail Validator",description:"Learn about upgrading a validator",source:"@site/docs/validators/0030-avail-upgrade-validator-node.md",sourceDirName:"validators",slug:"/validators/avail-upgrade-validator-node",permalink:"/validators/avail-upgrade-validator-node",draft:!1,editUrl:"https://github.com/availproject/availproject.github.io/tree/main/docs/validators/0030-avail-upgrade-validator-node.md",tags:[],version:"current",lastUpdatedBy:"DSalman03",lastUpdatedAt:1693480437,formattedLastUpdatedAt:"Aug 31, 2023",sidebarPosition:3,frontMatter:{id:"avail-upgrade-validator-node",title:"How to Upgrade Your Avail Validator",sidebar_label:"Upgrade Your Validator",sidebar_position:3,description:"Learn about upgrading a validator",keywords:["docs","avail","node","validator"],image:"https://availproject.github.io/img/avail/AvailDocs.png",slug:"avail-upgrade-validator-node"},sidebar:"validatorsSidebar",previous:{title:"Backup Your Validator",permalink:"/validators/avail-backup-node"},next:{title:"Monitor Your Validator",permalink:"/validators/avail-monitoring-validator-node"}},d={},p=[{value:"Fast Upgrade",id:"fast-upgrade",level:2},{value:"Slow &amp; Safe Upgrade",id:"slow--safe-upgrade",level:2}],u={toc:p},c="wrapper";function v(e){let{components:a,...t}=e;return(0,n.kt)(c,(0,r.Z)({},u,t,{components:a,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"When upgrading Avail nodes there are two options, a faster method and a slower (but safer) method. Both are detailed below, but you only need to use one of them."),(0,n.kt)("h2",{id:"fast-upgrade"},"Fast Upgrade"),(0,n.kt)("p",null,"While a rapid upgrade is possible, it carries inherent risks if done on a validator node. For instance, if you proceed with the upgrade on a validator node and encounter issues such as database corruption, there's a chance of prolonged downtime. This could lead to your node being removed from the active validator set due to unresponsiveness."),(0,n.kt)("p",null,"This upgrade process is appropriate for non-validator nodes. However, this upgrade process is still possible on validator nodes with careful consideration."),(0,n.kt)("p",null,"The fast upgrade steps are:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Stop the Avail node.")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"sudo systemctl stop availd.service\n")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Locate your Avail binary, create a backup of the current binary, and then uninstall the existing binary by deleting the binary. Proceed to download the most recent binary announced in Discord, which will replace the previous binary version.\nTo provide an example, assuming your existing binary is located at ",(0,n.kt)("inlineCode",{parentName:"li"},"/home/avail/avail-node/")," and is named ",(0,n.kt)("inlineCode",{parentName:"li"},"data-avail"),", and you used the ",(0,n.kt)("a",{parentName:"li",href:"/validators/run-avail/validator-node-setup"},"validator")," setup guidelines while obtaining a pre-built binary from the Avail GitHub repository, proceed as outlined below.")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"cd /home/avail/avail-node/\nmv data-avail data-avail-backup\nwget https://github.com/availproject/avail/releases/download/v1.6.2-rc1/data-avail-linux-amd64.tar.gz\ntar -xvf data-avail-linux-amd64.tar.gz\nmv data-avail-linux-amd64 data-avail\nrm data-avail-linux-amd64.tar.gz\n")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Start the Avail node again.")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"sudo systemctl start availd.service\n")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Ensure your node starts syncing with the network, view the logs from the running service.")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"journalctl -f -u availd.service\n")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Also check that your node is visible on telemetry and the version matches the upgrade version.")),(0,n.kt)("h2",{id:"slow--safe-upgrade"},"Slow & Safe Upgrade"),(0,n.kt)("p",null,"This upgrade procedure is most appropriate for validator nodes exclusively and is unnecessary for other types of nodes, such as full, archive, rpc, and so forth. Upgrading a Avail node safely is a careful process to ensure a smooth transition without disruption to the network. Here's a step-by-step guide on how to upgrade a Avail node,\nincluding the process of switching nodes using rotated keys:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Preparing for the Upgrade:"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Ensure you have a backup of your node's data and keystore files. This ensures you can restore your node in case of any issues during the upgrade process.\nFamiliarize yourself with the release notes and documentation of the new Avail version to understand any specific instructions or requirements."))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Setting up Node B:"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Install and set up the new version of Avail on a separate server or machine. This will be Node B, which will eventually replace Node A. Configure Node B with the\nnecessary configuration files, including the customizations you had on Node A. Ensure that Node B is fully synchronized with the Avail network before proceeding."))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Generating Rotated Keys:"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Generate a new set of keys for Node B using ",(0,n.kt)("inlineCode",{parentName:"li"},"author_rotateKeys"),". "))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Updating Session Keys:"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Open Avail Apps and navigate to ",(0,n.kt)("a",{parentName:"p",href:"https://testnet.avail.tools/#/staking/actions"},(0,n.kt)("strong",{parentName:"a"},"Network ","\u2192"," Staking")),". You will be able to select from a hidden menu the option\nto change session keys."),(0,n.kt)("img",{src:(0,o.Z)("img/avail/validator-change-session-keys.png"),width:"100%",height:"100%"})),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Can enter the hex-encoded value obtained from ",(0,n.kt)("inlineCode",{parentName:"p"},"author_rotateKeys")," and click on ",(0,n.kt)("strong",{parentName:"p"},"Set Session Key"),"."),(0,n.kt)("img",{src:(0,o.Z)("img/avail/validator-change-session-keys-2.png"),width:"100%",height:"100%"})),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"You will now be able to see the new and old hex-encoded value. In the next epoch or two it will only show the new hex-encoded\nvalue."),(0,n.kt)("img",{src:(0,o.Z)("img/avail/validator-change-session-keys-3.png"),width:"100%",height:"100%"})),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"After a few epochs Node B will be performing the validator tasks. You must ensure this by looking in the logs for sealed blocks. You should see ",(0,n.kt)("inlineCode",{parentName:"p"},"\ud83c\udf81 Prepared block for proposing")," appear\nin the logs of Node B and stop appearing Node A."))))),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"You can now upgrade Node A. You can repeat the process to switch back to Node A.")),(0,n.kt)("admonition",{title:"Ensure the node has switched",type:"warning"},(0,n.kt)("p",{parentName:"admonition"},"Before turning Node A off you must ensure Node B has become the active validator. In Avail Apps it may show the switch, however there is an epoch delay before the node\nfully switches over. The best is to look in the logs and confirm the new node is sealing the blocks.")))}v.isMDXComponent=!0}}]);