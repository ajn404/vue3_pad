//读取obj.txt后再
//设置obj不存在的值依然会触发effect
{
  const bucket = new Set();
  const data = { txt: 'hello world' };
  const obj = new Proxy(data, {
    get(target, key) {
      if (activeEffect) bucket.add(activeEffect);

      return target[key];
    },

    set(target, key, newVal) {
      target[key] = newVal;
      bucket.forEach((fn) => fn());
      return true;
    },
  });

  //注册副作用函数
  let activeEffect;
  function effect(fn) {
    console.log('effect run');
    activeEffect = fn;
    fn();
  }

  effect(() => {
    //读取操作
    document.body.innerText = obj.txt;
  });
}

//使用WeakMap存储bucket
{
  const bucket = new WeakMap();
  const data = { txt: 'hello world' };
  const obj = new Proxy(data, {
    get(target, key) {
      if (!activeEffect) return target[key];
      let depsMap = bucket.get(target);
      if (!depsMap) {
        depsMap = new Map();
        bucket.set(target, depsMap);
      }
      let deps = depsMap.get(key);
      if (!deps) {
        deps = new Set();
        depsMap.set(key, deps);
      }
      deps.add(activeEffect);
      return target[key];
    },

    set(target, key, newVal) {
      target[key] = newVal;

      const depsMap = bucket.get(target);
      if (!depsMap) return true;
      const deps = depsMap.get(key);
      if (!deps) return true;
      deps.forEach((fn) => fn());
      return true;
    },
  });

  //注册副作用函数
  let activeEffect;
  function effect(fn) {
    console.log('effect run');
    activeEffect = fn;
    fn();
  }

  effect(() => {
    //读取操作
    document.body.innerText = obj.txt;
  });
}

//封装上述过程
//get读取时track追踪
//set设置时trigger触发
{
  const bucket = new WeakMap();
  const data = { txt: 'hello world' };
  const obj = new Proxy(data, {
    get(target, key) {
      if (!activeEffect) return target[key];
      track(target, key);
      return target[key];
    },
    set(target, key, newVal) {
      target[key] = newVal;
      trigger(target, key);
      return true;
    },
  });

  function track(target, key) {
    let depsMap = bucket.get(target);
    if (!depsMap) {
      depsMap = new Map();
      bucket.set(target, depsMap);
    }
    let deps = depsMap.get(key);
    if (!deps) {
      deps = new Set();
      depsMap.set(key, deps);
    }
    deps.add(activeEffect);
  }

  function trigger(target, key) {
    const depsMap = bucket.get(target);
    if (!depsMap) return;
    const deps = depsMap.get(key);
    if (!deps) return;
    deps.forEach((fn) => fn());
  }
  //注册副作用函数
  let activeEffect;
  function effect(fn) {
    console.log('effect run');
    activeEffect = fn;
    fn();
  }

  effect(() => {
    //读取操作
    document.body.innerText = obj.txt;
  });
}
