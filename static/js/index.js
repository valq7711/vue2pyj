(function(){
"use strict";
var ՐՏ_1;
function ՐՏ_extends(child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.__base__ = parent;
    child.prototype.constructor = child;
}
function ՐՏ_Iterable(iterable) {
    var tmp;
    if (iterable.constructor === [].constructor || iterable.constructor === "".constructor || (tmp = Array.prototype.slice.call(iterable)).length) {
        return tmp || iterable;
    }
    if (Set && iterable.constructor === Set) {
        return Array.from(iterable);
    }
    return Object.keys(iterable);
}
function ՐՏ_print() {
    if (typeof console === "object") {
        console.log.apply(console, arguments);
    }
}
function range(start, stop, step) {
    var length, idx, range;
    if (arguments.length <= 1) {
        stop = start || 0;
        start = 0;
    }
    step = arguments[2] || 1;
    length = Math.max(Math.ceil((stop - start) / step), 0);
    idx = 0;
    range = new Array(length);
    while (idx < length) {
        range[idx++] = start;
        start += step;
    }
    return range;
}
function ՐՏ_type(obj) {
    return obj && obj.constructor && obj.constructor.name ? obj.constructor.name : Object.prototype.toString.call(obj).slice(8, -1);
}
function ՐՏ_eq(a, b) {
    var ՐՏitr6, ՐՏidx6;
    var i;
    if (a === b) {
        return true;
    }
    if (a === void 0 || b === void 0 || a === null || b === null) {
        return false;
    }
    if (a.constructor !== b.constructor) {
        return false;
    }
    if (Array.isArray(a)) {
        if (a.length !== b.length) {
            return false;
        }
        for (i = 0; i < a.length; i++) {
            if (!ՐՏ_eq(a[i], b[i])) {
                return false;
            }
        }
        return true;
    } else if (a.constructor === Object) {
        if (Object.keys(a).length !== Object.keys(b).length) {
            return false;
        }
        ՐՏitr6 = ՐՏ_Iterable(a);
        for (ՐՏidx6 = 0; ՐՏidx6 < ՐՏitr6.length; ՐՏidx6++) {
            i = ՐՏitr6[ՐՏidx6];
            if (!ՐՏ_eq(a[i], b[i])) {
                return false;
            }
        }
        return true;
    } else if (Set && a.constructor === Set || Map && a.constructor === Map) {
        if (a.size !== b.size) {
            return false;
        }
        for (i of a) {
            if (!b.has(i)) {
                return false;
            }
        }
        return true;
    } else if (a.constructor === Date) {
        return a.getTime() === b.getTime();
    } else if (typeof a.__eq__ === "function") {
        return a.__eq__(b);
    }
    return false;
}
var ՐՏ_modules = {};
ՐՏ_modules["asset.fs_path"] = {};
ՐՏ_modules["asset.common"] = {};
ՐՏ_modules["asset.rs_require"] = {};
ՐՏ_modules["asset"] = {};
ՐՏ_modules["load_js"] = {};

(function(){
    var __name__ = "asset.fs_path";
    var RE_FP_INFO;
    RE_FP_INFO = /^((.*?\/)?([^\/]+?))(\.([^\.]+))?$/;
    function is_valid_name(name) {
        return /^(\.\w|\w)(\w|\.)*/.test(name);
    }
    function to_arr(path) {
        var ՐՏitr1, ՐՏidx1;
        var dirs, beg, d;
        if (path === "" || path === "/") {
            return [ "" ];
        }
        dirs = path.split("/");
        if (dirs[dirs.length-1] === "") {
            dirs = dirs.slice(0, -1);
        }
        beg = dirs[0] === "" ? 1 : 0;
        ՐՏitr1 = ՐՏ_Iterable(dirs.slice(beg));
        for (ՐՏidx1 = 0; ՐՏidx1 < ՐՏitr1.length; ՐՏidx1++) {
            d = ՐՏitr1[ՐՏidx1];
            if (!(d === ".." || is_valid_name(d))) {
                throw new Error("Bad path: " + path);
            }
        }
        return dirs;
    }
    function path_arr_resolve(arr, allow_out_root) {
        var ՐՏitr2, ՐՏidx2;
        var i, ret, path_start, it;
        i = 0;
        ret = [];
        path_start = 0;
        ՐՏitr2 = ՐՏ_Iterable(arr);
        for (ՐՏidx2 = 0; ՐՏidx2 < ՐՏitr2.length; ՐՏidx2++) {
            it = ՐՏitr2[ՐՏidx2];
            if (it === "") {
                ret[0] = "";
                i = 1;
                path_start = 1;
                continue;
            } else if (it === "..") {
                --i;
                if (i >= path_start) {
                    continue;
                } else if (!allow_out_root) {
                    throw new Error("Out of root dir");
                } else {
                    ret.unshift("..");
                    ++path_start;
                    i += 2;
                    continue;
                }
            }
            ret[i] = it;
            ++i;
        }
        return ret.slice(0, i);
    }
    function path_join() {
        var ՐՏitr3, ՐՏidx3;
        var arr, p_str;
        arr = [];
        ՐՏitr3 = ՐՏ_Iterable(arguments);
        for (ՐՏidx3 = 0; ՐՏidx3 < ՐՏitr3.length; ՐՏidx3++) {
            p_str = ՐՏitr3[ՐՏidx3];
            if (p_str) {
                Array.prototype.push.apply(arr, to_arr(p_str));
            }
        }
        return path_arr_resolve(arr).join("/");
    }
    function rel_path_join() {
        var ՐՏitr4, ՐՏidx4;
        var arr, p_str;
        arr = [];
        ՐՏitr4 = ՐՏ_Iterable(arguments);
        for (ՐՏidx4 = 0; ՐՏidx4 < ՐՏitr4.length; ՐՏidx4++) {
            p_str = ՐՏitr4[ՐՏidx4];
            if (p_str) {
                Array.prototype.push.apply(arr, to_arr(p_str));
            }
        }
        return path_arr_resolve(arr, true).join("/");
    }
    function path_split(pth) {
        var fp_info, ret;
        fp_info = RE_FP_INFO.exec(pth);
        ret = {
            fpath_no_ext: fp_info[1],
            dir: fp_info[2],
            fname_no_ext: fp_info[3],
            ext: fp_info[5]
        };
        ret.tail = ret.fname = ret.ext ? ret.fname_no_ext + "." + ret.ext : ret.fname_no_ext;
        return ret;
    }
    ՐՏ_modules["asset.fs_path"]["RE_FP_INFO"] = RE_FP_INFO;

    ՐՏ_modules["asset.fs_path"]["is_valid_name"] = is_valid_name;

    ՐՏ_modules["asset.fs_path"]["to_arr"] = to_arr;

    ՐՏ_modules["asset.fs_path"]["path_arr_resolve"] = path_arr_resolve;

    ՐՏ_modules["asset.fs_path"]["path_join"] = path_join;

    ՐՏ_modules["asset.fs_path"]["rel_path_join"] = rel_path_join;

    ՐՏ_modules["asset.fs_path"]["path_split"] = path_split;
})();

(function(){
    var __name__ = "asset.common";
    class Merge_call {
        set_key (a) {
            var self = this;
            self.cmd = "set_key";
            self.args = a;
            return self;
        }
        merge (a) {
            var self = this;
            self.cmd = "merge";
            self.args = a;
            return self;
        }
    }
    function asyncer(fun) {
        var merge_call, ret;
        merge_call = {};
        function wrap(ctx) {
            function pret(ok, err) {
                function inner(f, opt) {
                    var ret_v, ret_throw, merge_key, v, p;
                    if (opt) {
                        ret_v = opt.ret_v;
                        ret_throw = opt.ret_throw;
                        merge_key = opt.merge_key;
                    }
                    function _err(e, merge_key) {
                        err(e);
                        if (merge_key) {
                            merge_call[merge_key].map(function(cb) {
                                cb.err(e);
                            });
                            delete merge_call[merge_key];
                        }
                    }
                    if (ret_throw) {
                        v = ret_throw;
                    } else {
                        try {
                            f = f || fun.apply(ctx.self, ctx.args);
                            v = f.next(ret_v);
                        } catch (ՐՏ_Exception) {
                            var e = ՐՏ_Exception;
                            _err(e, merge_key);
                            return;
                        }
                    }
                    if (v.value instanceof Merge_call) {
                        if (v.value.cmd === "get_keys") {
                            Promise.resolve(Object.keys(merge_call)).then(function(ret_v) {
                                inner(f, {
                                    ret_v: ret_v,
                                    merge_key: merge_key
                                });
                            });
                        } else if (v.value.cmd === "merge") {
                            if (p = merge_call[v.value.args]) {
                                p.push({
                                    ok: function(v) {
                                        ok(v);
                                    },
                                    err: function(v) {
                                        err(v);
                                    }
                                });
                                return;
                            } else {
                                merge_key = v.value.args;
                                merge_call[merge_key] = [];
                                Promise.resolve(null).then(function(ret_v) {
                                    inner(f, {
                                        ret_v: ret_v,
                                        merge_key: merge_key
                                    });
                                });
                            }
                        } else {
                            Promise.resolve(null).then(function(ret_v) {
                                inner(f, {
                                    ret_v: ret_v,
                                    merge_key: merge_key
                                });
                            });
                        }
                    } else if (!v.done) {
                        if (v.value instanceof Promise) {
                            v.value.then(function(ret_v) {
                                inner(f, {
                                    ret_v: ret_v,
                                    merge_key: merge_key
                                });
                            }, function(e) {
                                var v;
                                try {
                                    v = f.throw(e);
                                } catch (ՐՏ_Exception) {
                                    var e = ՐՏ_Exception;
                                    _err(e, merge_key);
                                    return;
                                }
                                inner(f, {
                                    ret_throw: v,
                                    merge_key: merge_key
                                });
                            });
                        } else {
                            Promise.resolve(v.value).then(function(ret_v) {
                                inner(f, {
                                    ret_v: ret_v,
                                    merge_key: merge_key
                                });
                            });
                        }
                    } else {
                        ok(v.value);
                        if (merge_key) {
                            merge_call[merge_key].map(function(cb) {
                                cb.ok(v.value);
                            });
                            delete merge_call[merge_key];
                        }
                    }
                }
                inner();
            }
            return pret;
        }
        ret = function() {
            var ctx, p;
            ctx = {
                self: this,
                args: arguments
            };
            p = new Promise(wrap(ctx));
            return p;
        };
        ret.__name__ = fun.__name__ || fun.name;
        return ret;
    }
    function upload_text() {
        function prom(ok, err) {
            var el, ret;
            el = document.createElement("input");
            el.setAttribute("type", "file");
            el.setAttribute("multiple", true);
            el.style.display = "none";
            document.body.appendChild(el);
            ret = [];
            el.onchange = function() {
                var done, i, fr;
                done = el.files.length;
                for (i = 0; i < el.files.length; i++) {
                    fr = new FileReader();
                    fr._filename_ = el.files[i].name;
                    fr.onloadend = function(s) {
                        ret.push({
                            name: s.target._filename_,
                            value: s.target.result
                        });
                        --done;
                        if (done === 0) {
                            ok(ret);
                        }
                    };
                    fr.readAsText(el.files[i]);
                }
            };
            el.click();
            document.body.removeChild(el);
        }
        return new Promise(prom);
    }
    function download(s, filename, mime) {
        var blob, el_data, el;
        blob = new Blob([ s ], {
            type: mime || "text/plain;charset=utf-8;"
        });
        el_data = window.URL.createObjectURL(blob);
        el = document.createElement("a");
        el.setAttribute("href", el_data);
        el.setAttribute("download", filename);
        el.style.display = "none";
        document.body.appendChild(el);
        el.click();
        document.body.removeChild(el);
        window.URL.revokeObjectURL(blob);
    }
    function SF(text, props) {
        function replacer(str_, p) {
            var t, p_chain;
            if (t = /^("|')(.+?)("|')$/.exec(p)) {
                return props[t[2]];
            }
            if ((p_chain = p.split(".")) && p_chain.length > 1) {
                return p_chain.reduce(function(it, p) {
                    return it[p];
                }, props);
            }
            return props[p];
        }
        return text.replace(/\$\{ *(.+?) *\}/g, replacer);
    }
    function make_drag_listener(catcher, debounce) {
        var ctx;
        ctx = {
            catcher: catcher,
            x0: 0,
            y0: 0,
            dx: 0,
            dy: 0,
            vc: null,
            debounce: debounce || 50,
            move_done: null
        };
        function mousemove(e) {
            function process_move() {
                ctx.dx = e.clientX - ctx.x0;
                ctx.dy = e.clientY - ctx.y0;
                ctx.catcher.call(null, "drag_move", e, {
                    dx: ctx.dx,
                    dy: ctx.dy,
                    vc: ctx.vc
                });
                ctx.move_done = true;
            }
            e.stopPropagation();
            e.preventDefault();
            if (ctx.move_done === null) {
                process_move();
            } else if (ctx.move_done) {
                ctx.move_done = false;
                setTimeout(process_move, ctx.debounce);
            }
        }
        function mouseup(e) {
            document.removeEventListener("mousemove", mousemove);
            document.removeEventListener("mouseup", mouseup);
            e.stopPropagation();
            e.preventDefault();
            ctx.catcher.call(null, "drag_stop", e, {
                dx: ctx.dx,
                dy: ctx.dy,
                vc: ctx.vc
            });
        }
        function mousedn(e) {
            ctx.vc = this;
            ctx.x0 = e.clientX;
            ctx.y0 = e.clientY;
            if (!ctx.catcher) {
                ctx.catcher = function(what, e, args) {
                    ctx.vc.$emit(what, e, args);
                };
            }
            document.addEventListener("mousemove", mousemove, false);
            document.addEventListener("mouseup", mouseup, false);
            e.stopPropagation();
            e.preventDefault();
            ctx.catcher.call(null, "drag_start", e, {
                x0: ctx.x0,
                y0: ctx.y0,
                vc: ctx.vc
            });
        }
        return mousedn;
    }
    function blur_click_listener(el, cb) {
        var ret, blur, last_id, listen;
        ret = {};
        blur = {};
        last_id = 0;
        listen = false;
        function doc_click_cap(e) {
            var id;
            ++last_id;
            id = last_id;
            blur[last_id] = true;
            setTimeout(function() {
                var _blur;
                _blur = blur[id];
                delete blur[id];
                _blur && cb(e);
            }, 0);
        }
        function el_click(e) {
            blur[last_id] = false;
        }
        ret.start = function() {
            if (listen) {
                return;
            }
            document.addEventListener("click", doc_click_cap, true);
            el.addEventListener("click", el_click, true);
            listen = true;
        };
        ret.stop = function() {
            if (!listen) {
                return;
            }
            document.removeEventListener("click", doc_click_cap, true);
            el.removeEventListener("click", el_click, true);
            listen = false;
        };
        return ret;
    }
    ՐՏ_modules["asset.common"]["Merge_call"] = Merge_call;

    ՐՏ_modules["asset.common"]["asyncer"] = asyncer;

    ՐՏ_modules["asset.common"]["upload_text"] = upload_text;

    ՐՏ_modules["asset.common"]["download"] = download;

    ՐՏ_modules["asset.common"]["SF"] = SF;

    ՐՏ_modules["asset.common"]["make_drag_listener"] = make_drag_listener;

    ՐՏ_modules["asset.common"]["blur_click_listener"] = blur_click_listener;
})();

(function(){
    var __name__ = "asset.rs_require";
    var fs_path = ՐՏ_modules["asset.fs_path"];
    
    var asyncer = ՐՏ_modules["asset.common"].asyncer;
    
    function doc_ready(arg_to_pass) {
        var p;
        p = function(ok, err) {
            document.addEventListener("readystatechange", function() {
                if (document.readyState === "complete") {
                    ok(arg_to_pass);
                }
            });
        };
        if (document.readyState === "complete") {
            return Promise.resolve(arg_to_pass);
        }
        return new Promise(p);
    }
    function prom(f) {
        var ret;
        ret = function() {
            var self, args, p;
            self = this;
            args = Array.prototype.slice.call(arguments);
            p = function(ok, err) {
                args.push(ok, err);
                f.apply(self, args);
            };
            return new Promise(p);
        };
        return ret;
    }
    var RS_require = (ՐՏ_1 = class RS_require {
        constructor (cfg) {
            var self = this;
            var define;
            self.cfg = cfg;
            self.modules = {};
            self.load_stack = [];
            define = window.define = function(req_list, mod) {
                self.define(req_list, mod);
            };
            define.amd = true;
            self.fs_path = fs_path;
        }
        mount_module (as_name, mod) {
            var self = this;
            self.modules[as_name] = mod;
        }
        define (req_list, mod) {
            var self = this;
            var mod_name, ok;
            if (ՐՏ_type(req_list) === "Function") {
                mod = req_list;
                req_list = [];
            }
            mod_name = self.load_stack[self.load_stack.length-1].name;
            ok = self.load_stack[self.load_stack.length-1].ok;
            function mount_mod(req_mods) {
                self.load_stack.pop();
                self.mount_module(mod_name, mod.apply(null, req_mods));
                ok(self.modules[mod_name]);
            }
            if (req_list && req_list.length) {
                self.load_amd_list(req_list, mod_name).then(mount_mod);
            } else {
                mount_mod([]);
            }
        }
        load_amd (name, requester, ok, err) {
            var self = this;
            var is_url, ret, s, src, js_root_dir;
            is_url = /https?:\/{2}.*/.test(name);
            if (!is_url) {
                if (name.startsWith("./")) {
                    name = name.slice(2);
                }
                if (requester) {
                    name = fs_path.rel_path_join(requester.split("/").slice(0, -1).join("/"), name);
                }
            }
            if (self.load_stack.find(function(it) {
                var ՐՏ_2;
                return ((ՐՏ_2 = it.name) === name || typeof ՐՏ_2 === "object" && ՐՏ_eq(ՐՏ_2, name));
            })) {
                throw new Error("Circular dependency: " + name + " and " + requester);
            }
            ret = self.modules[name];
            if (ret) {
                ok(ret);
            } else {
                s = document.createElement("script");
                src = name;
                if (!is_url) {
                    js_root_dir = self.cfg && self.cfg.js_root_dir || "";
                    src = fs_path.rel_path_join(js_root_dir, src);
                }
                s.src = src + ".js";
                s.async = true;
                s.onerror = function() {
                    err(name);
                };
                self.load_stack.push({
                    name: name,
                    ok: ok
                });
                document.head.appendChild(s);
            }
        }
        *load_amd_list (mod_lst, requester) {
            var ՐՏitr5, ՐՏidx5;
            var self = this;
            var ret, mod;
            ret = [];
            ՐՏitr5 = ՐՏ_Iterable(mod_lst);
            for (ՐՏidx5 = 0; ՐՏidx5 < ՐՏitr5.length; ՐՏidx5++) {
                mod = ՐՏitr5[ՐՏidx5];
                ret.push(yield self.load_amd(mod, requester));
            }
            return ret;
        }
        get (name) {
            var self = this;
            var mod;
            mod = self.modules[name];
            if (!mod) {
                throw new Error("Module `" + name + "` is not loaded");
            }
            return self.modules[name];
        }
    }, (function(){
        Object.defineProperties(ՐՏ_1.prototype, {
            load_amd: {
                enumerable: false, 
                writable: true, 
                value: prom(ՐՏ_1.prototype.load_amd)
            },
            load_amd_list: {
                enumerable: false, 
                writable: true, 
                value: asyncer(ՐՏ_1.prototype.load_amd_list)
            }
        });
        ;
    })(), ՐՏ_1);
    ՐՏ_modules["asset.rs_require"]["doc_ready"] = doc_ready;

    ՐՏ_modules["asset.rs_require"]["prom"] = prom;

    ՐՏ_modules["asset.rs_require"]["RS_require"] = RS_require;
})();

(function(){
    var __name__ = "asset";

    ՐՏ_modules["asset"]["fs_path"] = ՐՏ_modules["asset.fs_path"];

    ՐՏ_modules["asset"]["common"] = ՐՏ_modules["asset.common"];

    ՐՏ_modules["asset"]["rs_require"] = ՐՏ_modules["asset.rs_require"];
})();

(function(){
    var __name__ = "load_js";
    function load(rs_req) {
        function get_mods() {
            var mods;
            mods = [ "codemirror/lib/codemirror.js", "codemirror/mode/python/python.js", "codemirror/mode/javascript/javascript.js", "codemirror/mode/css/css.js", "codemirror/mode/xml/xml.js", "codemirror/mode/htmlmixed/htmlmixed.js", "codemirror/addon/hint/show-hint.js", "codemirror/addon/hint/javascript-hint.js", "codemirror/addon/hint/anyword-hint.js", "codemirror/addon/mode/simple.js", "codemirror/addon/edit/matchbrackets.js", "codemirror/addon/dialog/dialog.js", "codemirror/addon/search/searchcursor.js", "codemirror/addon/search/search.js", "codemirror/keymap/vim.js", "axios.min.js" ];
            mods = mods.map(function(it) {
                var ret;
                ret = it.split(".js")[0];
                return ret;
            });
            return mods;
        }
        return rs_req.load_amd_list(get_mods(), "");
    }
    ՐՏ_modules["load_js"]["load"] = load;
})();

(function(){

    var __name__ = "__main__";

    var rs_require = ՐՏ_modules["asset.rs_require"];
    
    var load_js = ՐՏ_modules["load_js"];
    
    window.onbeforeunload = function() {
        return "hi!";
    };
    function init() {
        var static_ver, js_root_dir, rs_req;
        static_ver = document.getElementsByTagName("meta")[0].dataset.static_ver;
        static_ver = static_ver && "/_" + static_ver || "";
        js_root_dir = window.location.pathname.split("/", 2).join("/") + "/static" + static_ver + "/js/";
        window.rs_req = rs_req = new rs_require.RS_require({
            js_root_dir: js_root_dir
        });
        load_js.load(rs_req).then(function() {
            rs_req.load_amd("app", "").then(function(app) {
                app.start("#app");
                ՐՏ_print("Done!!!");
            });
        });
    }
    init();
})();
})();
