import{W as n,b as i,f as c}from"./world-8aeda606.js";import"./three-b6bfeeee.js";import{c as l}from"./light-b9170a66.js";import{a5 as d,ag as m}from"./three.module-3e64dab6.js";import{r as u,b as p,n as f,l as h,d as _,o as b,c as v,a as g}from"./index-27e8f055.js";import"./runtime-60cf2155.js";import"./OrbitControls-dfe0b90a.js";import"./p5-1003a71f.js";class a extends n{constructor(e){super(e)}appendRender(e){this.renderer=i(e.clientWidth,e.clientHeight),e.append(this.renderer.domElement)}addProject(){var s;const e=l();this.cube=c({material:"MeshStandardMaterial",color:"rgb(20,20,255)",cubeRotate:new d(1,1,1)});let r=new m;const o=[1,2,0,0,0,.866,.5,0,0,-.5,.866,0,0,0,0,1];r=r.fromArray(o),this.cube.setRotationFromMatrix(r),this.cube.updateMatrix(),(s=this.scene)==null||s.add(e,this.cube)}}const x=()=>{const t=u();let e=p({});const r=()=>{e instanceof a&&e.render(t.value)};return f(()=>{t.value&&(e=new a(t.value),r())}),h(()=>{e instanceof a&&e.beforeDestroy()}),{container:t,world:e}},R={class:"view"},C=_({__name:"reactiveWorld",setup(t){let{container:e}=x();return(r,o)=>(b(),v("div",R,[g("div",{class:"container",ref_key:"container",ref:e},null,512)]))}});export{C as default};
