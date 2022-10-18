!function(){"use strict";var e={n:function(t){var l=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(l,{a:l}),l},d:function(t,l){for(var o in l)e.o(l,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:l[o]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.element,l=window.wp.blocks,o=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"simpletoc/toc","version":"5.0.33","title":"SimpleTOC","category":"layout","icon":"<svg clip-rule=\'evenodd\' fill-rule=\'evenodd\' stroke-linejoin=\'round\' stroke-miterlimit=\'2\' viewBox=\'0 0 500 500\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'m365.983 78.248c2.72-32.415 29.921-57.908 63.029-57.908 34.91 0 63.253 28.342 63.253 63.252s-28.343 63.252-63.253 63.252v269.582c0 25.232-20.485 45.718-45.718 45.718h-313.62c-25.233 0-45.719-20.486-45.719-45.718v-292.46c0-25.233 20.486-45.718 45.719-45.718zm-245.943 324.857c-16.883 0-30.511-13.719-30.511-30.714 0-16.79 13.628-30.714 30.511-30.714 16.679 0 30.511 13.924 30.511 30.714 0 16.995-13.832 30.714-30.511 30.714zm50.851-40.952h183.063v20.476h-183.063zm-50.851-61.428c-16.883 0-30.511-13.719-30.511-30.714 0-16.79 13.628-30.714 30.511-30.714 16.679 0 30.511 13.924 30.511 30.714 0 16.995-13.832 30.714-30.511 30.714zm50.851-40.952h183.063v20.476h-183.063zm-50.851-61.428c-16.883 0-30.511-13.719-30.511-30.714 0-16.791 13.628-30.714 30.511-30.714 16.679 0 30.511 13.923 30.511 30.714 0 16.995-13.832 30.714-30.511 30.714zm50.851-40.952h183.063v20.476h-183.063zm253.007-44.649v-24.188h-24.008v-10.108h24.008v-24.008h10.229v24.008h24.008v10.108h-24.008v24.188z\' fill=\'#070d0d\'/></svg>","keywords":["TOC","Table of Contents","SimpleTOC","Index"],"supports":{"align":["wide","full"]},"description":"Adds a Table of Contents.","attributes":{"no_title":{"type":"boolean","default":false},"title_text":{"type":"string"},"use_ol":{"type":"boolean","default":false},"remove_indent":{"type":"boolean","default":false},"add_smooth":{"type":"boolean","default":false},"use_absolute_urls":{"type":"boolean","default":false},"max_level":{"type":"integer","default":6},"min_level":{"type":"integer","default":1},"autorefresh":{"type":"boolean","default":true},"updated":{"type":"integer"}},"textdomain":"simpletoc","editorScript":"file:index.js","editorStyle":"file:editor.css"}'),n=window.wp.i18n,i=window.wp.blockEditor,a=window.wp.serverSideRender,s=e.n(a),c=window.wp.primitives,r=(0,t.createElement)(c.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,t.createElement)(c.Path,{d:"M11.1 15.8H20v-1.5h-8.9v1.5zm0-8.6v1.5H20V7.2h-8.9zM6 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"})),m=(0,t.createElement)(c.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,t.createElement)(c.Path,{d:"M11.1 15.8H20v-1.5h-8.9v1.5zm0-8.6v1.5H20V7.2h-8.9zM5 6.7V10h1V5.3L3.8 6l.4 1 .8-.3zm-.4 5.7c-.3.1-.5.2-.7.3l.1 1.1c.2-.2.5-.4.8-.5.3-.1.6 0 .7.1.2.3 0 .8-.2 1.1-.5.8-.9 1.6-1.4 2.5h2.7v-1h-1c.3-.6.8-1.4.9-2.1.1-.3 0-.8-.2-1.1-.5-.6-1.3-.5-1.7-.4z"})),u=(0,t.createElement)(c.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,t.createElement)(c.Path,{d:"M4 7.2v1.5h16V7.2H4zm8 8.6h8v-1.5h-8v1.5zm-4-4.6l-4 4 4 4 1-1-3-3 3-3-1-1z"})),d=(0,t.createElement)(c.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,t.createElement)(c.Path,{d:"M4 7.2v1.5h16V7.2H4zm8 8.6h8v-1.5h-8v1.5zm-8-3.5l3 3-3 3 1 1 4-4-4-4-1 1z"})),_=window.wp.components,p=window.wp.data,h=window.React;const v=(0,t.createElement)("svg",{clipRule:"evenodd",fillRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:"2",viewBox:"0 0 500 500",xmlns:"http://www.w3.org/2000/svg"},(0,t.createElement)("path",{d:"m365.983 78.248c2.72-32.415 29.921-57.908 63.029-57.908 34.91 0 63.253 28.342 63.253 63.252s-28.343 63.252-63.253 63.252v269.582c0 25.232-20.485 45.718-45.718 45.718h-313.62c-25.233 0-45.719-20.486-45.719-45.718v-292.46c0-25.233 20.486-45.718 45.719-45.718zm-245.943 324.857c-16.883 0-30.511-13.719-30.511-30.714 0-16.79 13.628-30.714 30.511-30.714 16.679 0 30.511 13.924 30.511 30.714 0 16.995-13.832 30.714-30.511 30.714zm50.851-40.952h183.063v20.476h-183.063zm-50.851-61.428c-16.883 0-30.511-13.719-30.511-30.714 0-16.79 13.628-30.714 30.511-30.714 16.679 0 30.511 13.924 30.511 30.714 0 16.995-13.832 30.714-30.511 30.714zm50.851-40.952h183.063v20.476h-183.063zm-50.851-61.428c-16.883 0-30.511-13.719-30.511-30.714 0-16.791 13.628-30.714 30.511-30.714 16.679 0 30.511 13.923 30.511 30.714 0 16.995-13.832 30.714-30.511 30.714zm50.851-40.952h183.063v20.476h-183.063zm253.007-44.649v-24.188h-24.008v-10.108h24.008v-24.008h10.229v24.008h24.008v10.108h-24.008v24.188z"}));(0,l.registerBlockType)(o,{icon:v,edit:function(e){let{attributes:l,setAttributes:o}=e;const a=(0,i.useBlockProps)(),{isSavingPost:c}=(0,p.select)("core/editor"),[v,g]=(0,h.useState)(!1),w=(0,t.createElement)(i.BlockControls,{group:"block"},(0,t.createElement)(_.ToolbarButton,{icon:r,title:(0,n.__)("Convert to unordered list","simpletoc"),describedBy:(0,n.__)("Convert to unordered list","simpletoc"),isActive:!1===l.use_ol,onClick:()=>{o({use_ol:!1})}}),(0,t.createElement)(_.ToolbarButton,{icon:m,title:(0,n.__)("Convert to ordered list","simpletoc"),describedBy:(0,n.__)("Convert to ordered list","simpletoc"),isActive:!0===l.use_ol,onClick:()=>{o({use_ol:!0})}}),(0,t.createElement)(_.ToolbarButton,{icon:u,title:(0,n.__)("Indent list","simpletoc"),describedBy:(0,n.__)("Indent list","simpletoc"),isActive:!0===l.remove_indent,onClick:()=>{o({remove_indent:!0})}}),(0,t.createElement)(_.ToolbarButton,{icon:d,title:(0,n.__)("Outdent list","simpletoc"),describedBy:(0,n.__)("Outdent list","simpletoc"),isActive:!1===l.remove_indent,onClick:()=>{o({remove_indent:!1})}})),b=(0,t.createElement)(i.InspectorControls,null,(0,t.createElement)(_.Panel,null,(0,t.createElement)(_.PanelBody,null,!l.no_title&&(0,t.createElement)(_.PanelRow,null,(0,t.createElement)(_.TextControl,{label:(0,n.__)("Heading Text","simpletoc"),help:(0,n.__)("Set the heading text of the block.","simpletoc")+" "+(0,n.__)("Default value","simpletoc")+": "+(0,n.__)("Table of Contents","simpletoc"),value:l.title_text,onChange:e=>o({title_text:e||(0,n.__)("Table of Contents","simpletoc")})})),(0,t.createElement)(_.PanelRow,null,(0,t.createElement)(_.ToggleControl,{label:(0,n.__)("Remove heading","simpletoc"),checked:l.no_title,onChange:()=>o({no_title:!l.no_title})})),(0,t.createElement)(_.PanelRow,null,(0,t.createElement)(_.SelectControl,{label:(0,n.__)("Minimum level","simpletoc"),help:(0,n.__)("Minimum depth of the headings.","simpletoc"),value:l.min_level,options:[{label:(0,n.__)("Including","simpletoc")+" H6",value:"6"},{label:(0,n.__)("Including","simpletoc")+" H5",value:"5"},{label:(0,n.__)("Including","simpletoc")+" H4",value:"4"},{label:(0,n.__)("Including","simpletoc")+" H3",value:"3"},{label:(0,n.__)("Including","simpletoc")+" H2",value:"2"},{label:(0,n.__)("Including","simpletoc")+" H1 ("+(0,n.__)("default","simpletoc")+")",value:"1"}],onChange:e=>o({min_level:Number(e)})})),(0,t.createElement)(_.PanelRow,null,(0,t.createElement)(_.SelectControl,{label:(0,n.__)("Maximum level","simpletoc"),help:(0,n.__)("Maximum depth of the headings.","simpletoc"),value:l.max_level,options:[{label:(0,n.__)("Including","simpletoc")+" H6 ("+(0,n.__)("default","simpletoc")+")",value:"6"},{label:(0,n.__)("Including","simpletoc")+" H5",value:"5"},{label:(0,n.__)("Including","simpletoc")+" H4",value:"4"},{label:(0,n.__)("Including","simpletoc")+" H3",value:"3"},{label:(0,n.__)("Including","simpletoc")+" H2",value:"2"},{label:(0,n.__)("Including","simpletoc")+" H1",value:"1"}],onChange:e=>o({max_level:Number(e)})})))),(0,t.createElement)(_.Panel,null,(0,t.createElement)(_.PanelBody,{title:(0,n.__)("Advanced Features","simpletoc"),icon:"settings",initialOpen:!1},(0,t.createElement)(_.PanelRow,null,(0,t.createElement)("div",{style:{marginBottom:"1em",border:"1px solid rgba(0, 0, 0, 0.05)",padding:"0.5em",backgroundColor:"#f7f7f7"}},(0,t.createElement)("p",null,(0,t.createElement)("strong",null,(0,n.__)("Think about making a donation if you use any of these features.","simpletoc"))),(0,t.createElement)(_.ExternalLink,{href:"https://marc.tv/out/donate"},(0,n.__)("Donate here!","simpletoc")))),(0,t.createElement)(_.PanelRow,null,(0,t.createElement)(_.ToggleControl,{label:(0,n.__)("Smooth scrolling support","simpletoc"),help:(0,n.__)('Add the css class "smooth-scroll" to the links. This enables smooth scrolling in some themes like GeneratePress.',"simpletoc"),checked:l.add_smooth,onChange:()=>o({add_smooth:!l.add_smooth})})),(0,t.createElement)(_.PanelRow,null,(0,t.createElement)(_.ToggleControl,{label:(0,n.__)("Use absolute urls","simpletoc"),help:(0,n.__)("Adds the permalink url to the fragment.","simpletoc"),checked:l.use_absolute_urls,onChange:()=>o({use_absolute_urls:!l.use_absolute_urls})})),(0,t.createElement)(_.PanelRow,null,(0,t.createElement)(_.ToggleControl,{label:(0,n.__)("Automatically refresh TOC","simpletoc"),help:(0,n.__)("Disable this to remove redundant changed content warning in editor.","simpletoc"),checked:l.autorefresh,onChange:()=>o({autorefresh:!l.autorefresh})})))));return(0,p.subscribe)((()=>{c()?g(!0):g(!1)})),(0,h.useEffect)((()=>{v&&!0===l.autorefresh&&o({updated:(new Date).getTime()})}),[v]),(0,t.createElement)("div",a,w,b,(0,t.createElement)(s(),{block:"simpletoc/toc",attributes:l}))},save:function(){return null}})}();