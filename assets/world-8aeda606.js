var f=Object.defineProperty;var b=(e,t,a)=>t in e?f(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var c=(e,t,a)=>(b(e,typeof t!="symbol"?t+"":t,a),a);import{i as p,a4 as x,a5 as M,B as o,d,c as i,a as u,T as g,a6 as w,S,W as l,s as v,a7 as C,a8 as R}from"./three.module-3e64dab6.js";import{H as P,A as W,n as y}from"./index-27e8f055.js";const z=()=>{const s=new p(35,1,.1,100);return s.position.set(0,0,20),s},_=e=>{const t=new x(e.clientWidth/-2,e.clientWidth/2,e.clientHeight/2,e.clientHeight/-2,-1e5,1e5);return t.position.set(-840.75,872.62,-204.75),t.quaternion.setFromEuler(new M(-2.22,-.98,-2.31)),t},L="/vue3_tauri_fun/assets/uv-test-bw-7104d562.png",B=e=>new u({color:e}),H=()=>{const t=new g().load(L);return t.offset=new w(0,0),new u({map:t})},T=e=>{const t=new o(2,2,2);let a;switch(e==null?void 0:e.material){case"MeshBasicMaterial":a=new d;break;case"MeshStandardMaterial":a=B(e==null?void 0:e.color);break;default:a=new d;break}const r=new i(t,a);if(e!=null&&e.cubeRotate){const{x:s,y:h,z:m}=e.cubeRotate;r.rotation.set(s,h,m)}return r},q=()=>{const e=new o(2,2,2);let t;return t=H(),new i(e,t)},j=()=>new S,k=(e,t,a)=>{const r=new l;return r.setSize(e,t,a),r},F=(e,t,a)=>{const r=new l({antialias:!0});return r.setSize(e,t,a),r},n=(e,t)=>{const a=t.clientWidth,r=t.clientHeight;e.camera.left=a/-2,e.camera.right=a/2,e.camera.top=r/2,e.camera.bottom=r/-2,e.renderer.setSize(a,r),e.camera.aspect=a/r,e.camera.updateProjectionMatrix(),e.renderer.setPixelRatio(window.devicePixelRatio),e.renderer.render(e.scene,e.camera)},E=P();class V{constructor(t){c(this,"camera");c(this,"scene");c(this,"renderer");c(this,"cube");this.camera=z(),this.scene=j(),this.renderer=k(t.clientWidth,t.clientHeight),this.appendRender(t),this.addProject(),W(()=>E.menu,()=>{y(()=>{n(this,t)})})}appendRender(t){t.append(this.renderer.domElement)}addProject(){this.cube=T({material:"MeshBasicMaterial"}),this.scene.add(this.cube)}render(t){n(this,t),addEventListener("resize",()=>{n(this,t)},!1)}beforeDestroy(){this.scene.traverse(t=>{G(t)}),v.clear(),this.scene.clear(),this.renderer.dispose(),this.renderer.forceContextLoss()}}const G=e=>{var t,a,r,s;e instanceof i&&((t=e.geometry)!=null&&t.dispose&&e.geometry.dispose(),(a=e.material)!=null&&a.dispose&&e.material.dispose(),(s=(r=e.material)==null?void 0:r.texture)!=null&&s.dispose&&e.material.texture.dispose()),e instanceof C&&e.clear(),e instanceof R&&e.clear()};export{V as W,j as a,F as b,_ as c,G as d,q as e,T as f,k as g,n as r};
