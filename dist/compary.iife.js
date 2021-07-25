var Compary = (() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, {get: all[name], enumerable: true});
  };

  // src/compary/index.js
  var compary_exports = {};
  __export(compary_exports, {
    Compary: () => Compary_default
  });

  // node_modules/.pnpm/svelte@3.37.0/node_modules/svelte/internal/index.mjs
  function noop() {
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function is_function(thing) {
    return typeof thing === "function";
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
  }
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }
  var tasks = new Set();
  function append(target, node) {
    target.appendChild(node);
  }
  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }
  function detach(node) {
    node.parentNode.removeChild(node);
  }
  function element(name) {
    return document.createElement(name);
  }
  function text(data) {
    return document.createTextNode(data);
  }
  function space() {
    return text(" ");
  }
  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
  }
  function attr(node, attribute, value) {
    if (value == null)
      node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
      node.setAttribute(attribute, value);
  }
  function children(element2) {
    return Array.from(element2.childNodes);
  }
  function set_style(node, key, value, important) {
    node.style.setProperty(key, value, important ? "important" : "");
  }
  function custom_event(type, detail) {
    const e = document.createEvent("CustomEvent");
    e.initCustomEvent(type, false, false, detail);
    return e;
  }
  var active_docs = new Set();
  var current_component;
  function set_current_component(component) {
    current_component = component;
  }
  function get_current_component() {
    if (!current_component)
      throw new Error("Function called outside component initialization");
    return current_component;
  }
  function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail) => {
      const callbacks = component.$$.callbacks[type];
      if (callbacks) {
        const event = custom_event(type, detail);
        callbacks.slice().forEach((fn) => {
          fn.call(component, event);
        });
      }
    };
  }
  var dirty_components = [];
  var binding_callbacks = [];
  var render_callbacks = [];
  var flush_callbacks = [];
  var resolved_promise = Promise.resolve();
  var update_scheduled = false;
  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }
  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }
  var flushing = false;
  var seen_callbacks = new Set();
  function flush() {
    if (flushing)
      return;
    flushing = true;
    do {
      for (let i = 0; i < dirty_components.length; i += 1) {
        const component = dirty_components[i];
        set_current_component(component);
        update(component.$$);
      }
      set_current_component(null);
      dirty_components.length = 0;
      while (binding_callbacks.length)
        binding_callbacks.pop()();
      for (let i = 0; i < render_callbacks.length; i += 1) {
        const callback = render_callbacks[i];
        if (!seen_callbacks.has(callback)) {
          seen_callbacks.add(callback);
          callback();
        }
      }
      render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
  }
  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      const dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }
  var outroing = new Set();
  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }
  var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
  var boolean_attributes = new Set([
    "allowfullscreen",
    "allowpaymentrequest",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "defer",
    "disabled",
    "formnovalidate",
    "hidden",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "selected"
  ]);
  function mount_component(component, target, anchor, customElement) {
    const {fragment, on_mount, on_destroy, after_update} = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
      add_render_callback(() => {
        const new_on_destroy = on_mount.map(run).filter(is_function);
        if (on_destroy) {
          on_destroy.push(...new_on_destroy);
        } else {
          run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
      });
    }
    after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }
    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }
  function init(component, options, instance2, create_fragment2, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
      fragment: null,
      ctx: null,
      props,
      update: noop,
      not_equal,
      bound: blank_object(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(parent_component ? parent_component.$$.context : options.context || []),
      callbacks: blank_object(),
      dirty,
      skip_bound: false
    };
    let ready = false;
    $$.ctx = instance2 ? instance2(component, options.props || {}, (i, ret, ...rest) => {
      const value = rest.length ? rest[0] : ret;
      if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i])
          $$.bound[i](value);
        if (ready)
          make_dirty(component, i);
      }
      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
    if (options.target) {
      if (options.hydrate) {
        const nodes = children(options.target);
        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach);
      } else {
        $$.fragment && $$.fragment.c();
      }
      if (options.intro)
        transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor, options.customElement);
      flush();
    }
    set_current_component(parent_component);
  }
  var SvelteElement;
  if (typeof HTMLElement === "function") {
    SvelteElement = class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({mode: "open"});
      }
      connectedCallback() {
        const {on_mount} = this.$$;
        this.$$.on_disconnect = on_mount.map(run).filter(is_function);
        for (const key in this.$$.slotted) {
          this.appendChild(this.$$.slotted[key]);
        }
      }
      attributeChangedCallback(attr2, _oldValue, newValue) {
        this[attr2] = newValue;
      }
      disconnectedCallback() {
        run_all(this.$$.on_disconnect);
      }
      $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
      }
      $on(type, callback) {
        const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
        callbacks.push(callback);
        return () => {
          const index = callbacks.indexOf(callback);
          if (index !== -1)
            callbacks.splice(index, 1);
        };
      }
      $set($$props) {
        if (this.$$set && !is_empty($$props)) {
          this.$$.skip_bound = true;
          this.$$set($$props);
          this.$$.skip_bound = false;
        }
      }
    };
  }
  var SvelteComponent = class {
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    $on(type, callback) {
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };

  // src/compary/Compary.svelte
  function add_css() {
    var style = element("style");
    style.id = "svelte-1a534zl-style";
    style.textContent = ".c-compare.svelte-1a534zl{--h:9;--m:1rem 0;--w:16;--thumb-bgc:#28ae60;--thumb-bgc-focus:hsla(0, 70%, 70%, 0.7);--thumb-w:2rem;margin:var(--m);position:relative}.c-compare.svelte-1a534zl::after{content:'';display:block;padding-bottom:calc((var(--h) / var(--w)) * 100%)}img.svelte-1a534zl{max-width:100%;height:100%;position:absolute;object-fit:cover}.c-compare__left.svelte-1a534zl{clip-path:polygon(0% 0%, var(--value) 0%, var(--value) 100%, 0% 100%)}.c-compare__right.svelte-1a534zl{clip-path:polygon(100% 0%, var(--value) 0%, var(--value) 100%, 100% 100%)}.c-compare__range.svelte-1a534zl{background-color:transparent;box-sizing:border-box;font-family:inherit;height:100%;margin:0;outline:none;position:absolute;top:0;width:100%;font-size:0;border:0}.c-compare__range.svelte-1a534zl::-webkit-slider-thumb{background-color:var(--thumb-bgc);box-sizing:border-box;width:var(--thumb-w);height:2rem;border-radius:100%;position:relative;top:50%;margin-top:-1rem;transform:translateX(calc(var(--value) - 50%));border:0}.c-compare__range.svelte-1a534zl:focus::-webkit-slider-thumb{background-color:var(--thumb-bgc-focus)}.c-compare__range.svelte-1a534zl::-webkit-slider-runnable-track{background:transparent;background-size:100%;box-sizing:border-box;height:100%}.c-compare__range.svelte-1a534zl::-moz-range-thumb{background-color:var(--thumb-bgc);box-sizing:border-box;width:var(--thumb-w);height:2rem;border-radius:100%;transform:translateX(calc(var(--value) - 50%))}.c-compare__range.svelte-1a534zl:focus::-moz-range-thumb{background-color:var(--thumb-bgc-focus)}.c-compare__range.svelte-1a534zl::-moz-range-track{background:transparent;background-size:100%;box-sizing:border-box;height:100%}.c-compare__range.svelte-1a534zl,.c-compare__range.svelte-1a534zl::-webkit-slider-runnable-track,.c-compare__range.svelte-1a534zl::-webkit-slider-thumb{-webkit-appearance:none;appearance:none}";
    append(document.head, style);
  }
  function create_fragment(ctx) {
    let section;
    let img0;
    let img0_src_value;
    let t0;
    let img1;
    let img1_src_value;
    let t1;
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        section = element("section");
        img0 = element("img");
        t0 = space();
        img1 = element("img");
        t1 = space();
        input = element("input");
        attr(img0, "class", "c-compare__left svelte-1a534zl");
        if (img0.src !== (img0_src_value = ctx[2].left))
          attr(img0, "src", img0_src_value);
        attr(img0, "alt", "Color");
        attr(img1, "class", "c-compare__right svelte-1a534zl");
        if (img1.src !== (img1_src_value = ctx[2].right))
          attr(img1, "src", img1_src_value);
        attr(img1, "alt", "B/W");
        attr(input, "type", "range");
        attr(input, "class", "c-compare__range svelte-1a534zl");
        attr(input, "min", "0");
        attr(input, "max", "100");
        input.value = ctx[0];
        attr(section, "class", "c-compare svelte-1a534zl");
        set_style(section, "--value", ctx[0] + "%");
        set_style(section, "--thumb-bgc", ctx[1]);
      },
      m(target, anchor) {
        insert(target, section, anchor);
        append(section, img0);
        append(section, t0);
        append(section, img1);
        append(section, t1);
        append(section, input);
        if (!mounted) {
          dispose = [
            listen(input, "input", ctx[4]),
            listen(input, "change", ctx[5])
          ];
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & 4 && img0.src !== (img0_src_value = ctx2[2].left)) {
          attr(img0, "src", img0_src_value);
        }
        if (dirty & 4 && img1.src !== (img1_src_value = ctx2[2].right)) {
          attr(img1, "src", img1_src_value);
        }
        if (dirty & 1) {
          input.value = ctx2[0];
        }
        if (dirty & 1) {
          set_style(section, "--value", ctx2[0] + "%");
        }
        if (dirty & 2) {
          set_style(section, "--thumb-bgc", ctx2[1]);
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(section);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function instance($$self, $$props, $$invalidate) {
    const dispatch = createEventDispatcher();
    let {value = 50} = $$props, {thumbcolor = "#28ae60"} = $$props, {img = {
      left: "https://assets.stoumann.dk/img/color.jpg",
      right: "https://assets.stoumann.dk/img/bw.jpg"
    }} = $$props;
    const input_handler = (e) => ($$invalidate(0, value = e.target.value), dispatch("input", e.target.value));
    const change_handler = (e) => dispatch("change", e.target.value);
    $$self.$$set = ($$props2) => {
      if ("value" in $$props2)
        $$invalidate(0, value = $$props2.value);
      if ("thumbcolor" in $$props2)
        $$invalidate(1, thumbcolor = $$props2.thumbcolor);
      if ("img" in $$props2)
        $$invalidate(2, img = $$props2.img);
    };
    return [value, thumbcolor, img, dispatch, input_handler, change_handler];
  }
  var Compary = class extends SvelteComponent {
    constructor(options) {
      super();
      if (!document.getElementById("svelte-1a534zl-style"))
        add_css();
      init(this, options, instance, create_fragment, safe_not_equal, {value: 0, thumbcolor: 1, img: 2});
    }
  };
  var Compary_default = Compary;
  return compary_exports;
})();
