import{u as a}from"./useP5-e34c7c49.js";import{d as s,o as d,c as _,a as f}from"./index-27e8f055.js";import"./p5-1003a71f.js";const p=(e,o)=>{let l=0;const t=.01;e.setup=()=>{e.createCanvas((o==null?void 0:o.clientWidth)||400,(o==null?void 0:o.clientHeight)||400),e.background(0).noStroke()},e.draw=()=>{e.fill(0,10),e.rect(0,0,e.width,e.height);const n=e.noise(l)*e.width;l+=t;for(let i=1;i*100<e.height;i++){const r=i*100/e.height*255;e.fill(r,255-r,2*r%255),e.ellipse(n-50*(e.height/100-i),i*100-32,64,64),e.ellipse(n+50*(e.height/100-i),i*100-32,64,64)}}},m={class:"view"},w=s({__name:"noise1d",setup(e){const{container:o}=a(p);return(l,t)=>(d(),_("div",m,[f("div",{class:"container",ref_key:"container",ref:o},null,512)]))}});export{w as default};
