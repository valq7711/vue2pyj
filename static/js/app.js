define(["vue","codemirror/lib/codemirror","rapydscript_web","axios.min"],function(Vue,CodeMirror,rapydscript,axios){
var exports = {};
(function(){
"use strict";
var ՐՏ_1, ՐՏ_13, ՐՏ_17, ՐՏ_40, ՐՏ_41, ՐՏ_42, ՐՏ_43, ՐՏ_44, ՐՏ_47, ՐՏ_48, ՐՏ_49, ՐՏ_50, ՐՏ_54, ՐՏ_57, ՐՏ_58, ՐՏ_59;
function ՐՏ_extends(child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.__base__ = parent;
    child.prototype.constructor = child;
}
function ՐՏ_in(val, arr) {
    if (typeof arr.indexOf === "function") {
        return arr.indexOf(val) !== -1;
    } else if (typeof arr.has === "function") {
        return arr.has(val);
    }
    return arr.hasOwnProperty(val);
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
function len(obj) {
    var tmp;
    if (obj.constructor === [].constructor || obj.constructor === "".constructor || (tmp = Array.prototype.slice.call(obj)).length) {
        return (tmp || obj).length;
    }
    if (Set && obj.constructor === Set) {
        return obj.size;
    }
    return Object.keys(obj).length;
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
    var ՐՏitr64, ՐՏidx64;
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
        ՐՏitr64 = ՐՏ_Iterable(a);
        for (ՐՏidx64 = 0; ՐՏidx64 < ՐՏitr64.length; ՐՏidx64++) {
            i = ՐՏitr64[ՐՏidx64];
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
ՐՏ_modules["asset.fs"] = {};
ՐՏ_modules["asset.rs_vue"] = {};
ՐՏ_modules["asset.common"] = {};
ՐՏ_modules["asset.html_ml"] = {};
ՐՏ_modules["asset.vuepy_parser"] = {};
ՐՏ_modules["asset.vuepy_compiler"] = {};
ՐՏ_modules["asset.vuepy_output"] = {};
ՐՏ_modules["asset.cm_vuepy"] = {};
ՐՏ_modules["asset.cm_rapydscript"] = {};
ՐՏ_modules["asset"] = {};
ՐՏ_modules["components.confirm"] = {};
ՐՏ_modules["components.error"] = {};
ՐՏ_modules["components.app_selector"] = {};
ՐՏ_modules["components.vform"] = {};
ՐՏ_modules["components.login"] = {};
ՐՏ_modules["components.folder_content"] = {};
ՐՏ_modules["components.editor"] = {};
ՐՏ_modules["components.menu"] = {};
ՐՏ_modules["components.flash"] = {};
ՐՏ_modules["components.base_layout"] = {};
ՐՏ_modules["components.modal"] = {};
ՐՏ_modules["components"] = {};
ՐՏ_modules["store.editor"] = {};
ՐՏ_modules["store.explorer"] = {};
ՐՏ_modules["server"] = {};
ՐՏ_modules["app_menu"] = {};
ՐՏ_modules["store.root"] = {};
ՐՏ_modules["store"] = {};

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
    var __name__ = "asset.fs";

    var fs_path = ՐՏ_modules["asset.fs_path"];
    
    class FS_local_keeper {
        constructor (name, zip) {
            var self = this;
            self.name = name;
            self.zip = zip;
        }
        save (fs_obj) {
            var self = this;
            function prom(ok, err) {
                function store_handler(data) {
                    window.localStorage.setItem(self.name, data);
                    ok("done");
                }
                self.zip.file("fs_store", fs_obj.dumps());
                self.zip.generateAsync({
                    type: "string",
                    compression: "DEFLATE",
                    compressionOptions: {
                        level: 9
                    }
                }).then(store_handler);
            }
            return new Promise(prom);
        }
        load (fs_obj) {
            var self = this;
            function prom(ok, err) {
                var fzip;
                function reader(zip) {
                    zip.file("fs_store").async("string").then(function(s) {
                        fs_obj.loads(s);
                        ok("done");
                    });
                }
                fzip = window.localStorage.getItem(self.name);
                if (fzip) {
                    self.zip.loadAsync(fzip).then(reader);
                } else {
                    err();
                }
            }
            return new Promise(prom);
        }
    }
    var FS = (ՐՏ_1 = class FS {
        clear_content () {
            var self = this;
            self.files = {};
            self.dirs = {};
            self.last_id = 0;
            self._reset_map_type_();
        }
        constructor () {
            var self = this;
            self.files = {};
            self.dirs = {};
            self.dirs[0] = {
                id: 0,
                name: "",
                parent: null,
                content: []
            };
            self.last_id = 0;
            self.cwd_id = 0;
            self.map_type = {};
            self._reset_map_type_();
            self._listeners = {
                write_file: [],
                del_file: []
            };
            self.fs_path = fs_path;
        }
        _doubles_in_dir_content () {
            var ՐՏitr5, ՐՏidx5, ՐՏitr6, ՐՏidx6;
            var self = this;
            var errors, dir_id, dir, tmp, it_id;
            errors = [];
            ՐՏitr5 = ՐՏ_Iterable(self.dirs);
            for (ՐՏidx5 = 0; ՐՏidx5 < ՐՏitr5.length; ՐՏidx5++) {
                dir_id = ՐՏitr5[ՐՏidx5];
                dir = self.dirs[dir_id];
                tmp = {};
                ՐՏitr6 = ՐՏ_Iterable(dir.content);
                for (ՐՏidx6 = 0; ՐՏidx6 < ՐՏitr6.length; ՐՏidx6++) {
                    it_id = ՐՏitr6[ՐՏidx6];
                    if (tmp[it_id]) {
                        errors.push({
                            dir_id: dir_id
                        });
                    }
                    tmp[it_id] = true;
                }
            }
            return errors.length ? errors : null;
        }
        _consistency_errors () {
            var ՐՏitr7, ՐՏidx7, ՐՏitr8, ՐՏidx8, ՐՏ_2, ՐՏitr9, ՐՏidx9;
            var self = this;
            var errors, dir_id, dir, it_id, it, f_id, f, parent_dir;
            errors = [];
            ՐՏitr7 = ՐՏ_Iterable(self.dirs);
            for (ՐՏidx7 = 0; ՐՏidx7 < ՐՏitr7.length; ՐՏidx7++) {
                dir_id = ՐՏitr7[ՐՏidx7];
                dir = self.dirs[dir_id];
                ՐՏitr8 = ՐՏ_Iterable(dir.content);
                for (ՐՏidx8 = 0; ՐՏidx8 < ՐՏitr8.length; ՐՏidx8++) {
                    it_id = ՐՏitr8[ՐՏidx8];
                    it = self.get_info(it_id);
                    if (((ՐՏ_2 = it.parent) !== dir_id && (typeof ՐՏ_2 !== "object" || !ՐՏ_eq(ՐՏ_2, dir_id)))) {
                        errors.push({
                            dir_id: dir_id,
                            it_id: it_id
                        });
                    }
                }
            }
            ՐՏitr9 = ՐՏ_Iterable(self.files);
            for (ՐՏidx9 = 0; ՐՏidx9 < ՐՏitr9.length; ՐՏidx9++) {
                f_id = ՐՏitr9[ՐՏidx9];
                f = self.files[f_id];
                parent_dir = self.dirs[f.parent];
                if (ՐՏ_in(!f_id, parent_dir.content)) {
                    errors.push({
                        dir_id: parent_dir.id,
                        f_id: f_id
                    });
                }
            }
            return errors.length ? errors : null;
        }
        _reset_map_type_ () {
            var self = this;
            self.map_type[self.FILE] = self.files;
            self.map_type[self.DIR] = self.dirs;
        }
        loads (s) {
            var self = this;
            var obj;
            obj = s;
            if (ՐՏ_type(obj) !== "String") {
                obj = JSON.stringify(obj);
            }
            obj = JSON.parse(obj);
            self.files = obj.files;
            self.dirs = obj.dirs;
            self.last_id = obj.last_id;
            self._reset_map_type_();
        }
        dumps () {
            var self = this;
            var data;
            data = {
                files: self.files,
                dirs: self.dirs,
                last_id: self.last_id
            };
            return JSON.stringify(data);
        }
        _create_id () {
            var self = this;
            var id;
            id = new Date().valueOf();
            while (id <= self.last_id) {
                id = new Date().valueOf();
            }
            self.last_id = id;
            return id.toString();
        }
        _name_to_id (name, parent_id, scope) {
            var ՐՏitr10, ՐՏidx10, ՐՏ_3;
            var self = this;
            var f_d, id;
            f_d = typeof scope === "string" ? self[scope] : scope;
            ՐՏitr10 = ՐՏ_Iterable(self.dirs[parent_id].content);
            for (ՐՏidx10 = 0; ՐՏidx10 < ՐՏitr10.length; ՐՏidx10++) {
                id = ՐՏitr10[ՐՏidx10];
                if (f_d[id] && ((ՐՏ_3 = f_d[id].name) === name || typeof ՐՏ_3 === "object" && ՐՏ_eq(ՐՏ_3, name))) {
                    return id;
                }
            }
            return false;
        }
        _create_zombie_dir (name, parent_id) {
            var self = this;
            var parent_dir, dir_id;
            parent_id = parent_id.toString();
            parent_dir = self.dirs[parent_id];
            if (!parent_dir) {
                throw new Error("Bad parent_id: " + parent_id);
            }
            if (self._name_to_id(name, parent_id, "dirs")) {
                throw new Error("Dir already exists: " + name);
            }
            dir_id = self._create_id();
            self.dirs[dir_id] = {
                id: dir_id,
                name: name,
                parent: parent_id,
                content: []
            };
            return dir_id;
        }
        is_valid_name (name) {
            var self = this;
            return fs_path.is_valid_name(name);
        }
        to_arr (path) {
            var self = this;
            return fs_path.to_arr(path);
        }
        get_type (id) {
            var self = this;
            if (self.files[id]) {
                return self.FILE;
            }
            if (self.dirs[id]) {
                return self.DIR;
            }
            throw new Error("Bad id: " + id);
        }
        create_dir (name, parent_id) {
            var self = this;
            var ps, dir_id, parent_dir;
            if (parent_id === void 0) {
                ps = fs_path.path_split(name);
                parent_id = self.id_by_path(ps.dir);
                name = ps.tail;
            } else {
                parent_id = parent_id.toString();
            }
            if (!self.dirs[parent_id]) {
                throw new Error("Bad dir_id: " + parent_id);
            }
            dir_id = self._create_zombie_dir(name, parent_id);
            parent_dir = self.dirs[parent_id];
            parent_dir.content.push(dir_id);
            return dir_id;
        }
        create_path (path) {
            var ՐՏitr11, ՐՏidx11;
            var self = this;
            var dirs, i, prnt_id, dir_name, dir_id;
            dirs = self.to_arr(path);
            if (!dirs || dirs[0] !== "") {
                throw new Error("bad path: " + path);
                return;
            }
            dirs = dirs.slice(1);
            i = 0;
            prnt_id = "0";
            ՐՏitr11 = ՐՏ_Iterable(dirs);
            for (ՐՏidx11 = 0; ՐՏidx11 < ՐՏitr11.length; ՐՏidx11++) {
                dir_name = ՐՏitr11[ՐՏidx11];
                dir_id = self._name_to_id(dir_name, prnt_id, "dirs");
                if (dir_id) {
                    ++i;
                    prnt_id = dir_id;
                } else {
                    break;
                }
            }
            while (dirs[i]) {
                dir_id = self._create_id();
                self.dirs[dir_id] = {
                    id: dir_id,
                    name: dirs[i],
                    parent: prnt_id,
                    content: []
                };
                self.dirs[prnt_id].content.push(dir_id);
                prnt_id = dir_id;
                ++i;
            }
            return dir_id;
        }
        create_file (name, dir_id, content) {
            var ՐՏ_4;
            var self = this;
            var ps, id, dt;
            if (dir_id === void 0) {
                ps = fs_path.path_split(name);
                dir_id = self.id_by_path(ps.dir);
                name = ps.fname;
            } else {
                dir_id = dir_id.toString();
            }
            if (!self.dirs[dir_id]) {
                throw new Error("Bad dir_id: " + dir_id);
            }
            if (self._name_to_id(name, dir_id, "files")) {
                throw new Error("File already exists: " + name);
            }
            id = self._create_id();
            dt = new Date().valueOf();
            self.files[id] = {
                id: id,
                name: name,
                parent: dir_id,
                content: "",
                ctime: dt,
                mtime: dt
            };
            self.dirs[dir_id].content.push(id);
            if ((content !== (ՐՏ_4 = void 0) && (typeof content !== "object" || !ՐՏ_eq(content, ՐՏ_4)))) {
                self.write_file(id, content);
            }
            return id;
        }
        del_any (id) {
            var self = this;
            if (self.dirs[id]) {
                self.del_dir(id);
            } else if (self.files[id]) {
                self.del_file(id);
            } else {
                throw new Error("Bad id: " + id);
            }
        }
        del_file (id) {
            var ՐՏitr12, ՐՏidx12;
            var self = this;
            var f, listener, pdir, idx;
            f = self.files[id];
            if (!f) {
                throw new Error("Bad file_id: " + id);
            }
            ՐՏitr12 = ՐՏ_Iterable(self._listeners["del_file"]);
            for (ՐՏidx12 = 0; ՐՏidx12 < ՐՏitr12.length; ՐՏidx12++) {
                listener = ՐՏitr12[ՐՏidx12];
                listener(id);
            }
            pdir = self.dirs[f.parent];
            idx = pdir.content.indexOf(id);
            pdir.content.splice(idx, 1);
            delete self.files[id];
        }
        del_dir (id, force_del) {
            var ՐՏitr13, ՐՏidx13;
            var self = this;
            var d, child_id, pdir, idx;
            d = self.dirs[id];
            if (!d) {
                throw new Error("Bad dir_id: " + id);
            } else if (d.content.length && !force_del) {
                throw new Error("Dir is not empty: " + id);
            }
            ՐՏitr13 = ՐՏ_Iterable(d.content.slice(0));
            for (ՐՏidx13 = 0; ՐՏidx13 < ՐՏitr13.length; ՐՏidx13++) {
                child_id = ՐՏitr13[ՐՏidx13];
                if (self.files[child_id]) {
                    self.del_file(child_id);
                } else {
                    self.del_dir(child_id, force_del);
                }
            }
            pdir = self.dirs[d.parent];
            idx = pdir.content.indexOf(id);
            pdir.content.splice(idx, 1);
            delete self.dirs[id];
        }
        copy_file (src, dst) {
            var ՐՏitr14, ՐՏidx14;
            var self = this;
            var d, f_id;
            src = self.files[src];
            dst = self.dirs[dst];
            ՐՏitr14 = ՐՏ_Iterable([ src, dst ]);
            for (ՐՏidx14 = 0; ՐՏidx14 < ՐՏitr14.length; ՐՏidx14++) {
                d = ՐՏitr14[ՐՏidx14];
                if (!d) {
                    throw new Error("Bad dir_id: " + id);
                }
            }
            f_id = self.create_file(src.name, dst.id);
            self.write_file(f_id, src.content, src.mtime);
            return f_id;
        }
        copy_dir (src, dst) {
            var ՐՏitr15, ՐՏidx15, ՐՏitr16, ՐՏidx16, ՐՏ_5, ՐՏ_6;
            var self = this;
            var d, src_content, dir_id, id;
            src = self.dirs[src];
            dst = self.dirs[dst];
            ՐՏitr15 = ՐՏ_Iterable([ src, dst ]);
            for (ՐՏidx15 = 0; ՐՏidx15 < ՐՏitr15.length; ՐՏidx15++) {
                d = ՐՏitr15[ՐՏidx15];
                if (!d) {
                    throw new Error("Bad dir_id: " + id);
                }
            }
            src_content = src.content.slice(0);
            dir_id = self._create_zombie_dir(src.name, dst.id);
            ՐՏitr16 = ՐՏ_Iterable(src_content);
            for (ՐՏidx16 = 0; ՐՏidx16 < ՐՏitr16.length; ՐՏidx16++) {
                id = ՐՏitr16[ՐՏidx16];
                if (((ՐՏ_5 = self.get_type(id)) === (ՐՏ_6 = self.DIR) || typeof ՐՏ_5 === "object" && ՐՏ_eq(ՐՏ_5, ՐՏ_6))) {
                    self.copy_dir(id, dir_id);
                } else {
                    self.copy_file(id, dir_id);
                }
            }
            dst.content.push(dir_id);
            return dir_id;
        }
        copy_any (src, dst) {
            var self = this;
            if (self.files[src]) {
                return self.copy_file(src, dst);
            } else if (self.dirs[src]) {
                return self.copy_dir(src, dst);
            }
            throw new Error("Bad src_id: " + id);
        }
        move (id, dst_dir_id) {
            var ՐՏ_7, ՐՏ_8, ՐՏ_9;
            var self = this;
            var dst_dir, it, up_dir_id, cur_parent_dir, idx;
            dst_dir = self.dirs[dst_dir_id];
            if (!dst_dir) {
                throw new Error("Bad dst_dir_id: " + dst_dir_id);
            }
            it = self.get_info(id, true);
            if (self._name_to_id(it.name, dst_dir_id, self.map_type[it.type])) {
                throw new Error("Dir or file already exists in dst_dir: " + it.name);
            }
            if (((ՐՏ_7 = it.type) === (ՐՏ_8 = self.DIR) || typeof ՐՏ_7 === "object" && ՐՏ_eq(ՐՏ_7, ՐՏ_8))) {
                up_dir_id = dst_dir.id;
                while (up_dir_id) {
                    if ((up_dir_id === id || typeof up_dir_id === "object" && ՐՏ_eq(up_dir_id, id))) {
                        throw new Error("Can`t move dir into its child");
                    }
                    up_dir_id = self.dirs[up_dir_id].parent;
                }
            }
            cur_parent_dir = self.dirs[it.parent];
            idx = cur_parent_dir.content.indexOf(it.id);
            if ((idx === (ՐՏ_9 = -1) || typeof idx === "object" && ՐՏ_eq(idx, ՐՏ_9))) {
                throw new Error("Unexpected error");
            }
            cur_parent_dir.content.splice(idx, 1);
            dst_dir.content.push(it.id);
            it.obj.parent = dst_dir.id;
        }
        rename (id, new_name) {
            var self = this;
            var it;
            it = self.get_info(id, true);
            if (self._name_to_id(new_name, it.parent, self.map_type[it.type])) {
                throw new Error("Dir or file already exists in dst_dir: " + it.name);
            }
            it.obj.name = new_name;
        }
        get_info (id, with_obj) {
            var ՐՏ_10;
            var self = this;
            var type, obj, ret;
            type = self.get_type(id);
            obj = self.map_type[type][id];
            if (!obj) {
                throw new Error("Bad id: " + id);
            }
            ret = {
                id: id,
                name: obj.name,
                parent: obj.parent,
                type: type,
                mtime: obj.mtime,
                ctime: obj.ctime
            };
            if ((type === (ՐՏ_10 = self.FILE) || typeof type === "object" && ՐՏ_eq(type, ՐՏ_10))) {
                ret.md5_hash = obj.md5_hash;
            }
            if (with_obj) {
                ret.obj = obj;
            }
            return ret;
        }
        write_file (fid, content, mtime) {
            var ՐՏitr17, ՐՏidx17;
            var self = this;
            var f, listener;
            if (!(f = self.files[fid])) {
                throw new Error("Bad id: " + fid);
            }
            f.content = content;
            f.mtime = mtime || new Date().valueOf();
            ՐՏitr17 = ՐՏ_Iterable(self._listeners["write_file"]);
            for (ՐՏidx17 = 0; ՐՏidx17 < ՐՏitr17.length; ՐՏidx17++) {
                listener = ՐՏitr17[ՐՏidx17];
                listener(fid);
            }
        }
        on (event, listener) {
            var self = this;
            if (!self._listeners[event]) {
                throw new Error("unknown event: " + event);
            }
            self._listeners[event].push(listener);
            return function() {
                self.off(event, listener);
            };
        }
        off (event, listener) {
            var ՐՏ_11;
            var self = this;
            var lst, idx;
            if (!(lst = self._listeners[event])) {
                throw new Error("unknown event: " + event);
            }
            idx = lst.indexOf(listener);
            if ((idx !== (ՐՏ_11 = -1) && (typeof idx !== "object" || !ՐՏ_eq(idx, ՐՏ_11)))) {
                lst.splice(idx, 1);
            }
        }
        get_file_path (fid) {
            var self = this;
            var f, parent, ret;
            f = self.files[fid];
            if (!f) {
                throw new Error("Bad file_id: " + fid);
            }
            parent = self.dirs[f.parent];
            ret = [];
            while (parent) {
                ret.push({
                    id: parent.id,
                    name: parent.name
                });
                parent = self.dirs[parent.parent];
            }
            ret.reverse();
            return ret;
        }
        list_dir (dir_id) {
            var ՐՏitr18, ՐՏidx18;
            var self = this;
            var ret, id;
            if (!self.dirs[dir_id]) {
                throw new Error("Bad dir_id: " + dir_id);
            }
            ret = [];
            ՐՏitr18 = ՐՏ_Iterable(self.dirs[dir_id].content);
            for (ՐՏidx18 = 0; ՐՏidx18 < ՐՏitr18.length; ՐՏidx18++) {
                id = ՐՏitr18[ՐՏidx18];
                ret.push(id);
            }
            return ret;
        }
        path_arr_resolve (arr) {
            var self = this;
            return fs_path.path_arr_resolve(arr);
        }
        path_join () {
            var self = this;
            return fs_path.path_join.apply(null, arguments);
        }
        id_by_path (path) {
            var ՐՏitr20, ՐՏidx20;
            var self = this;
            var arr_pth, prnt_id, dir_id, not_found, name, id;
            function find_id(name, parent_id) {
                var ՐՏitr19, ՐՏidx19, ՐՏ_12;
                var id, it;
                ՐՏitr19 = ՐՏ_Iterable(self.dirs[parent_id].content);
                for (ՐՏidx19 = 0; ՐՏidx19 < ՐՏitr19.length; ՐՏidx19++) {
                    id = ՐՏitr19[ՐՏidx19];
                    it = self.dirs[id] || self.files[id];
                    if (((ՐՏ_12 = it.name) === name || typeof ՐՏ_12 === "object" && ՐՏ_eq(ՐՏ_12, name))) {
                        return id;
                    }
                }
                return false;
            }
            if (!path) {
                throw new Error("Unexpected path " + path);
            }
            arr_pth = self.to_arr(path);
            if (!arr_pth || ՐՏ_in(!arr_pth[0], [ "", "root" ])) {
                throw new Error("bad path: " + path);
            }
            if (!arr_pth[1]) {
                return 0;
            }
            arr_pth = arr_pth.slice(1);
            prnt_id = 0;
            dir_id = 0;
            not_found = false;
            ՐՏitr20 = ՐՏ_Iterable(arr_pth);
            for (ՐՏidx20 = 0; ՐՏidx20 < ՐՏitr20.length; ՐՏidx20++) {
                name = ՐՏitr20[ՐՏidx20];
                id = find_id(name, prnt_id);
                if (id) {
                    prnt_id = id;
                } else {
                    not_found = true;
                    break;
                }
            }
            if (not_found) {
                return null;
            }
            return id;
        }
        path_by_id (id, root_alias) {
            var self = this;
            var ret, parent_id, parent_info;
            root_alias = root_alias || "";
            ret = {
                ids: [],
                infos: [],
                _path: [],
                path: ""
            };
            id = id.toString();
            ret.ids.push(id);
            ret.infos.push(self.get_info(id));
            ret._path.push(ret.infos[0].name);
            parent_id = ret.infos[0].parent;
            while (parent_id) {
                ret.ids.push(parent_id);
                parent_info = self.get_info(parent_id);
                ret.infos.push(parent_info);
                ret._path.push(parent_info.name);
                parent_id = self.dirs[parent_id].parent;
            }
            ret.ids.reverse();
            ret.infos.reverse();
            ret._path.reverse();
            if (root_alias) {
                ret.infos[0].name = root_alias;
                ret._path[0] = root_alias;
            }
            ret.path = ret._path.join("/");
            return ret;
        }
    }, (function(){
        var FILE = "file";
        var DIR = "dir";
        Object.defineProperties(ՐՏ_1.prototype, {
            FILE: {
                enumerable: true, 
                writable: true, 
                value: FILE

            },
            DIR: {
                enumerable: true, 
                writable: true, 
                value: DIR

            }
        });
    })(), ՐՏ_1);
    ՐՏ_modules["asset.fs"]["FS_local_keeper"] = FS_local_keeper;
    ՐՏ_modules["asset.fs"]["FS"] = FS;
})();

(function(){
    var __name__ = "asset.rs_vue";

    function print_log() {
        var args = [].slice.call(arguments, 0);
        if (window.ENV && window.ENV.debug) {
            console.log.apply(console, arguments);
        }
    }
    function find_recursive(obj, cb, max_iter) {
        var i, ctx, ret;
        max_iter = max_iter || 1e3;
        i = 0;
        ctx = {};
        ret = cb.call(ctx, obj, i);
        while (!ret[1] && i < max_iter) {
            ret = cb.call(ctx, ret[0], i);
            ++i;
        }
        if (i >= max_iter) {
            throw new Error("max iteration exceeded");
        }
        return ret[0];
    }
    function make_prop_chain(path, prefix, splitter) {
        prefix = prefix || "";
        splitter = splitter || ".";
        return path.split(splitter).filter(function(v) {
            return v;
        }).reduce(function(p, v) {
            return p + prefix + "." + v;
        }, "");
    }
    function make_prop_getter(prop_chain) {
        var me, ret;
        me = make_prop_getter;
        if (!(ret = me._memo[prop_chain])) {
            ret = me._memo[prop_chain] = new Function("obj", "{return obj" + prop_chain + "}");
        }
        return ret;
    }
    make_prop_getter._memo = {};
    function split_modgetter_rest(store, path) {
        var self, mod_rest, modgetter;
        self = store;
        mod_rest = /(^(\/[\w$]+)+)((\.[^.]+)+)$/.exec(path);
        if (!mod_rest) {
            return [ function() {
                return self;
            }, path ];
        } else {
            modgetter = make_prop_getter(make_prop_chain(mod_rest[1].slice(1), ".modules", "/"));
        }
        return [ modgetter, mod_rest[3].slice(1) ];
    }
    function unpack_name_fun_opt(f_reg_as) {
        function unpacker(reg_as, name_fun_opt, opt) {
            var self, arg1type, name;
            if (!name_fun_opt) {
                throw new Error("Attempt to call V_Collector @decorator with empty `()`");
            }
            self = this;
            arg1type = ՐՏ_type(name_fun_opt);
            if (arg1type.startsWith("Fun")) {
                name = name_fun_opt.__name__ || name_fun_opt.name;
                return f_reg_as.call(self, reg_as, name, name_fun_opt);
            } else {
                return function(f) {
                    var name;
                    if (arg1type.startsWith("Str")) {
                        name = name_fun_opt;
                        if (opt) {
                            opt.handler = f;
                        } else {
                            opt = f;
                        }
                    } else {
                        opt = name_fun_opt;
                        name = f.__name__ || f.name;
                        opt.handler = f;
                    }
                    return f_reg_as.call(self, reg_as, name, opt);
                };
            }
        }
        return unpacker;
    }
    var V_collector = (ՐՏ_13 = class V_collector {
        constructor () {
            var self = this;
            self._methods = null;
            self._computed = null;
            self._watch = null;
            self._filters = null;
            self._directives = null;
            self._getters = null;
            self._mutations = null;
            self._actions = null;
        }
        _reg_as (reg_as, name, fun_opt) {
            var self = this;
            print_log("reg " + reg_as + " " + name + " self: ", self);
            if (!self[reg_as]) {
                self[reg_as] = {};
            }
            self[reg_as][name] = fun_opt;
            return fun_opt.handler ? fun_opt.handler : fun_opt;
        }
        meth (name_or_fun) {
            var self = this;
            return self._reg_as("_methods", name_or_fun);
        }
        computed (name_or_fun) {
            var self = this;
            return self._reg_as("_computed", name_or_fun);
        }
        filter (name_or_fun) {
            var self = this;
            return self._reg_as("_filters", name_or_fun);
        }
        directive (name_or_fun) {
            var self = this;
            return self._reg_as("_directives", name_or_fun);
        }
        watch (name_or_fun, opt) {
            var self = this;
            return self._reg_as("_watch", name_or_fun, opt);
        }
        getter (name_or_fun) {
            var self = this;
            return self._reg_as("_getters", name_or_fun);
        }
        mutation (name_or_fun) {
            var self = this;
            return self._reg_as("_mutations", name_or_fun);
        }
        action (name_or_fun) {
            var self = this;
            return self._reg_as("_actions", name_or_fun);
        }
    }, (function(){
        Object.defineProperties(ՐՏ_13.prototype, {
            _reg_as: {
                enumerable: false, 
                writable: true, 
                value: unpack_name_fun_opt(ՐՏ_13.prototype._reg_as)
            }
        });
    })(), ՐՏ_13);
    class RS_vue {
        constructor (v_collector) {
            var ՐՏitr21, ՐՏidx21, ՐՏitr22, ՐՏidx22, ՐՏitr23, ՐՏidx23;
            var self = this;
            var it, sym, _name, k, self_keys, v_spec, tmp;
            self.props = {};
            self.data = self._init_data;
            self.delimiters = [ "{{", "}}" ];
            if (v_collector) {
                self.methods = v_collector._methods;
                self.computed = v_collector._computed;
                self.directives = v_collector._directives;
                self.filters = v_collector._filters;
                self.watch = v_collector._watch;
                ՐՏitr21 = ՐՏ_Iterable([ [ "~", "_mutations" ], [ "*", "_actions" ] ]);
                for (ՐՏidx21 = 0; ՐՏidx21 < ՐՏitr21.length; ՐՏidx21++) {
                    it = ՐՏitr21[ՐՏidx21];
                    [sym, _name] = it;
                    if (v_collector[_name]) {
                        if (!self.map_store) {
                            self.map_store = {};
                        }
                        ՐՏitr22 = ՐՏ_Iterable(v_collector[_name]);
                        for (ՐՏidx22 = 0; ՐՏidx22 < ՐՏitr22.length; ՐՏidx22++) {
                            k = ՐՏitr22[ՐՏidx22];
                            self.map_store[k] = sym;
                            self.methods[k] = v_collector[_name][k];
                        }
                    }
                }
            }
            self_keys = Object.keys(self);
            ՐՏitr23 = ՐՏ_Iterable([ "beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "activated", "deactivated", "beforeDestroy", "destroyed" ]);
            for (ՐՏidx23 = 0; ՐՏidx23 < ՐՏitr23.length; ՐՏidx23++) {
                v_spec = ՐՏitr23[ՐՏidx23];
                if (!(ՐՏ_in(v_spec, self_keys)) && (tmp = self.__proto__[v_spec])) {
                    self[v_spec] = tmp;
                }
            }
        }
        _init_data () {
            var self = this;
            throw ReferenceError("Not implemented");
        }
    }
    class RS_state_api {
        constructor (vc, vue, state, vm_opt) {
            var ՐՏitr24, ՐՏidx24;
            var self = this;
            var get_prop, getter_name;
            self.vue = vue;
            self.raw_getters = vc._getters;
            self.mutations = vc._mutations;
            vm_opt = Object.assign({}, vm_opt || {}, {
                data: {
                    state: state
                },
                computed: self.raw_getters,
                map_store: vc._map_store
            });
            self.vm = new vue(vm_opt);
            self.vm.rs_state_api = self;
            self.state = self.vm.state;
            self.getters = {};
            get_prop = Object.getOwnPropertyDescriptor;
            if (self.raw_getters) {
                ՐՏitr24 = ՐՏ_Iterable(self.raw_getters);
                for (ՐՏidx24 = 0; ՐՏidx24 < ՐՏitr24.length; ՐՏidx24++) {
                    getter_name = ՐՏitr24[ՐՏidx24];
                    self.getters[getter_name] = get_prop(self.vm, getter_name).get;
                }
            }
        }
        commit (mutation) {
            var self = this;
            var payload = [].slice.call(arguments, 1);
            var h;
            print_log("mutation: ", mutation);
            print_log("\tpayload: ", payload);
            if (h = self.mutations[mutation]) {
                return h.apply(self, payload);
            } else {
                throw new Error("unknown mutation: " + mutation);
            }
        }
        $del () {
            var self = this;
            self.vm.$delete.apply(self.vm, arguments);
        }
        $set () {
            var self = this;
            self.vm.$set.apply(self.vm, arguments);
        }
        check_path (path) {
            var self = this;
            var last_prnt;
            path = path.split(".");
            if (path.length === 1) {
                return self.state.hasOwnProperty(path[0]);
            }
            try {
                last_prnt = path.slice(0, -1).reduce(function(s, name) {
                    return s[name];
                }, self.state);
            } catch (ՐՏ_Exception) {
                if (ՐՏ_Exception instanceof TypeError) {
                    return false;
                } else {
                    throw ՐՏ_Exception;
                }
            }
            return last_prnt.hasOwnProperty(path[path.length-1]);
        }
        _get (path) {
            var self = this;
            return make_prop_getter(make_prop_chain(path))(self.vm.state);
        }
        get (path) {
            var self = this;
            if (self.getters.hasOwnProperty(path)) {
                return self.vm[path];
            } else {
                return self._get(path);
            }
        }
        set_getter (h, as_name) {
            var self = this;
            var v, getter;
            as_name = as_name || h.__name__ || h.name;
            if (!(as_name && ՐՏ_type(as_name).startsWith("Str"))) {
                throw new Error("can`t get the name of new getter: " + h);
            }
            if (as_name === "state") {
                throw new Error("`state` is bad name for new getter: " + h);
            }
            v = new self.vue({
                computed: {
                    [as_name]: function() {
                        return h.call(self.vm);
                    }
                }
            });
            getter = Object.getOwnPropertyDescriptor(v, as_name);
            Object.defineProperty(self.vm, as_name, getter);
            self.getters[as_name] = getter.get;
        }
        set_mutation (h, as_name) {
            var self = this;
            as_name = as_name || h.__name__ || h.name;
            if (!(as_name && ՐՏ_type(as_name).startsWith("Str"))) {
                throw new Error("can`t get the name of new mutation: " + h);
            }
            if (ՐՏ_in(as_name, self.mutations)) {
            } else if (self.hasOwnProperty(as_name)) {
                throw new Error("Bad mutation name: " + as_name);
            }
            self.mutations[as_name] = self[as_name] = h;
        }
    }
    class RS_store {
        constructor () {
            var self = this;
            if (!self.vue) {
                throw ReferenceError("You should first call Vue.use(Your_Store)");
            }
            self.dispatch_bound = function() {
                return self.dispatch.apply(self, arguments);
            };
            self.commit_bound = function() {
                return self.commit.apply(self, arguments);
            };
            self.$bus = {
                $on: function(e, cb) {
                    return self.$on(e, cb);
                },
                $off: function(e, cb) {
                    self.$off(e, cb);
                },
                $emit: function() {
                    var args = [].slice.call(arguments, 0);
                    self.$emit(...args);
                }
            };
        }
        mount_module (mod_obj, as_name) {
            var self = this;
            as_name = as_name || mod_obj.__name__ || mod_obj.constructor && mod_obj.constructor.name;
            if (!(as_name && ՐՏ_type(as_name).startsWith("Str"))) {
                throw new Error("can`t get the name of module: " + mod_obj);
            }
            if (self.state_api.state.hasOwnProperty(as_name)) {
                throw new Error("can`t mount module under name `" + as_name + "`,  name already exists");
            }
            if (!self.modules) {
                self.modules = {};
            }
            self.modules[as_name] = mod_obj;
            self.state_api.$set(self.state_api.state, as_name, mod_obj.state_api.state);
        }
        replace_state (new_state) {
            var ՐՏitr25, ՐՏidx25;
            var self = this;
            var _new_state, k, it, mod;
            _new_state = {};
            ՐՏitr25 = ՐՏ_Iterable(new_state);
            for (ՐՏidx25 = 0; ՐՏidx25 < ՐՏitr25.length; ՐՏidx25++) {
                k = ՐՏitr25[ՐՏidx25];
                it = new_state[k];
                if (self.modules && (mod = self.modules[k])) {
                    it = mod.replace_state(it);
                }
                _new_state[k] = it;
            }
            self.state_api.$set(self.state_api.vm, "state", _new_state);
            self.state_api.state = self.state_api.vm.state;
            return self.state_api.state;
        }
        _get (path) {
            var self = this;
            var mod, rest;
            [mod, rest] = split_modgetter_rest(self, path);
            return mod(self).state_api._get(rest);
        }
        get (path) {
            var self = this;
            var mod, rest;
            [mod, rest] = split_modgetter_rest(self, path);
            return mod(self).state_api.get(rest);
        }
        getter_factory (path) {
            var self = this;
            var argtype, modgetter, rest, getter;
            argtype = ՐՏ_type(path);
            if (argtype[0] === "S") {
                [modgetter, rest] = split_modgetter_rest(self, path);
            } else if (argtype[0] === "F") {
                modgetter = arguments[0];
                rest = arguments[1];
            } else {
                throw new Error("Wrong args: ", arguments);
            }
            getter = make_prop_getter(make_prop_chain(rest));
            return function() {
                var mod;
                mod = modgetter(self);
                if (mod.state_api.getters.hasOwnProperty(rest)) {
                    return mod.state_api.vm[rest];
                } else {
                    return getter(mod.state_api.vm.state);
                }
            };
        }
        handler_factory (path) {
            var self = this;
            var modgetter, rest, mutation, action;
            [modgetter, rest] = split_modgetter_rest(self, path);
            if (rest.endsWith("~")) {
                mutation = rest.slice(0, -1);
                return function() {
                    var args = [].slice.call(arguments, 0);
                    modgetter(self).state_api.commit(mutation, ...args);
                };
            } else if (rest.endsWith("*")) {
                action = rest.slice(0, -1);
                return function() {
                    var args = [].slice.call(arguments, 0);
                    return modgetter(self)._dispatch(action, ...args);
                };
            } else {
                return self.getter_factory(modgetter, rest);
            }
        }
        $on (e, cb) {
            var self = this;
            self.state_api.vm.$on(e, cb);
            return function() {
                self.$off(e, cb);
            };
        }
        $off (e, cb) {
            var self = this;
            self.state_api.vm.$off(e, cb);
        }
        $emit () {
            var self = this;
            self.state_api.vm.$emit.apply(self.state_api.vm, arguments);
        }
        commit (mutation) {
            var self = this;
            var payload = [].slice.call(arguments, 1);
            var modgetter;
            [modgetter, mutation] = split_modgetter_rest(self, mutation);
            return modgetter(self).state_api.commit(mutation, ...payload);
        }
        _dispatch (action) {
            var self = this;
            var payload = [].slice.call(arguments, 1);
            var p;
            print_log("action: ", action);
            print_log("\tpayload: ", payload);
            if (!self.actions || !(ՐՏ_in(action, self.actions))) {
                throw new Error("unknown action: " + action);
            }
            p = self[action].apply(self, payload);
            if (!(p instanceof Promise)) {
                p = Promise.resolve(p);
            }
            return p;
        }
        dispatch (action) {
            var self = this;
            var payload = [].slice.call(arguments, 1);
            var modgetter, mod;
            [modgetter, action] = split_modgetter_rest(self, action);
            mod = modgetter(self);
            return mod._dispatch(action, ...payload);
        }
        set_action (h, as_name) {
            var self = this;
            as_name = as_name || h.__name__ || h.name;
            if (!(as_name && ՐՏ_type(as_name).startsWith("Str"))) {
                throw new Error("can`t get the name of new action: " + h);
            }
            if (ՐՏ_in(as_name, self.actions)) {
            } else if (self.hasOwnProperty(as_name)) {
                throw new Error("Bad action name: " + as_name);
            }
            self.actions[as_name] = self[as_name] = h;
        }
        static before_create () {
            var ՐՏitr26, ՐՏidx26, ՐՏitr28, ՐՏidx28;
            var map_store, is_mutation_re, is_action_re, $opts, $map_opts, self, injectors, opt, k, map_to, map_from, map_to_split, map_to_meth, store_meth, modgetter, rest, store_mod, handler, action, mutation;
            map_store = "map_store";
            is_mutation_re = /(.+)~$/;
            is_action_re = /(.+)\*$/;
            $opts = this.$options;
            $map_opts = $opts[map_store] || $opts.propsData && $opts.propsData[map_store];
            if (!$map_opts) {
                return;
            }
            self = $opts.store || function(vm) {
                var tmp, store;
                tmp = find_recursive(vm, function(o) {
                    return [ o.$parent, !o.$parent || o.$parent.$options.store ];
                });
                store = tmp.$options.store;
                if (!store) {
                    throw ReferenceError("store not found");
                }
                return store;
            }(this);
            injectors = {
                "*": function(f) {
                    return function() {
                        f.call(this, self.dispatch_bound, ...arguments);
                    };
                },
                "~": function(f) {
                    return function() {
                        f.call(this, self.commit_bound, ...arguments);
                    };
                }
            };
            ՐՏitr26 = ՐՏ_Iterable([ "methods", "computed" ]);
            for (ՐՏidx26 = 0; ՐՏidx26 < ՐՏitr26.length; ՐՏidx26++) {
                opt = ՐՏitr26[ՐՏidx26];
                $opts[opt] = Object.assign({}, $opts[opt]);
            }
            if (Array.isArray($map_opts)) {
                $map_opts = (function() {
                    var ՐՏidx27, ՐՏitr27 = ՐՏ_Iterable($map_opts), ՐՏres = {}, k;
                    for (ՐՏidx27 = 0; ՐՏidx27 < ՐՏitr27.length; ՐՏidx27++) {
                        k = ՐՏitr27[ՐՏidx27];
                        ՐՏres[k] = k;
                    }
                    return ՐՏres;
                })();
            }
            ՐՏitr28 = ՐՏ_Iterable($map_opts);
            for (ՐՏidx28 = 0; ՐՏidx28 < ՐՏitr28.length; ՐՏidx28++) {
                map_to = ՐՏitr28[ՐՏidx28];
                map_from = $map_opts[map_to];
                if (ՐՏ_in(map_from, [ "*", "~" ])) {
                    if (!$opts.methods[map_to]) {
                        throw ReferenceError("Can`t map " + map_from + " to non-existing method: " + map_to);
                    }
                    $opts.methods[map_to] = injectors[map_from]($opts.methods[map_to]);
                } else if (ՐՏ_type(map_from).startsWith("Fun") && (map_to_split = /(.+?)(\*|~)$/.exec(map_to))) {
                    map_to_meth = map_to_split[1];
                    store_meth = map_to_split[2];
                    $opts.methods[map_to_meth] = injectors[store_meth](map_from);
                } else {
                    [modgetter, rest] = split_modgetter_rest(self, map_from);
                    store_mod = modgetter(self);
                    if (rest === "$bus") {
                        $opts["computed"][map_to] = function() {
                            return modgetter(self).$bus;
                        };
                        continue;
                    }
                    handler = self.handler_factory(map_from);
                    if (action = is_action_re.exec(rest)) {
                        action = action[1];
                        if (!(ՐՏ_in(action, store_mod.actions))) {
                            throw ReferenceError("unknown action in `map_store`: " + map_from);
                        }
                        if ($opts["methods"][map_to]) {
                            $opts["methods"][map_to] = function(h, store_h) {
                                return function() {
                                    return h.call(this, store_h, ...arguments);
                                };
                            }($opts["methods"][map_to], handler);
                        } else {
                            $opts["methods"][map_to] = handler;
                        }
                    } else if (mutation = is_mutation_re.exec(rest)) {
                        mutation = mutation[1];
                        if (!(ՐՏ_in(mutation, store_mod.state_api.mutations))) {
                            throw ReferenceError("unknown mutation in `map_store`: " + map_from);
                        }
                        if ($opts["methods"][map_to]) {
                            $opts["methods"][map_to] = function(h, store_h) {
                                return function() {
                                    return h.call(this, store_h, ...arguments);
                                };
                            }($opts["methods"][map_to], handler);
                        } else {
                            $opts["methods"][map_to] = handler;
                        }
                    } else if (ՐՏ_in(rest, store_mod.state_api.getters) || store_mod.state_api.check_path(rest)) {
                        $opts["computed"][map_to] = handler;
                    } else {
                        throw ReferenceError("Can`t map `" + map_from + "` to `" + map_to + "`");
                    }
                }
            }
        }
        static beforeDestroy () {
            var self;
            self = this;
            if (self.bus_cleanup && self.bus_cleanup.length) {
                print_log("bus_cleanup", self.bus_cleanup);
                self.bus_cleanup.forEach(function(off) {
                    off();
                });
            }
        }
        static install (Vue, opt) {
            RS_store.prototype.vue = Vue;
            Vue.mixin({
                beforeCreate: RS_store.before_create,
                beforeDestroy: RS_store.beforeDestroy
            });
        }
    }
    ՐՏ_modules["asset.rs_vue"]["print_log"] = print_log;
    ՐՏ_modules["asset.rs_vue"]["find_recursive"] = find_recursive;
    ՐՏ_modules["asset.rs_vue"]["make_prop_chain"] = make_prop_chain;
    ՐՏ_modules["asset.rs_vue"]["make_prop_getter"] = make_prop_getter;
    ՐՏ_modules["asset.rs_vue"]["split_modgetter_rest"] = split_modgetter_rest;
    ՐՏ_modules["asset.rs_vue"]["unpack_name_fun_opt"] = unpack_name_fun_opt;
    ՐՏ_modules["asset.rs_vue"]["V_collector"] = V_collector;
    ՐՏ_modules["asset.rs_vue"]["RS_vue"] = RS_vue;
    ՐՏ_modules["asset.rs_vue"]["RS_state_api"] = RS_state_api;
    ՐՏ_modules["asset.rs_vue"]["RS_store"] = RS_store;
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
    var __name__ = "asset.html_ml";

    function markup() {
        return "\n<!doctype>- *\n<!DOCTYPE>- *\n<a>+ *\n<abbr> *\n<acronym> *\n<address> *\n<applet> *\n<area> *\n<article> *\n<aside> *\n<audio> *\n<b> *\n<base> *\n<basefont> *\n<bdi> *\n<bdo> *\n<big> *\n<blockquote> *\n<body> *\n<br> *\n<button> *\n<canvas>+ *\n<caption> *\n<center> *\n<cite> *\n<code> *\n<col> *\n<colgroup> *\n<command> *\n<datalist> *\n<dd> *\n<del> *\n<details> *\n<dfn> *\n<div>+ *\n<dl> *\n<dt> *\n<em> *\n<embed> *\n<fieldset> *\n<figcaption> *\n<figure> *\n<font> *\n<footer> *\n<form> *\n<frame> *\n<frameset> *\n<h1> *\n<h2> *\n<h3> *\n<h4> *\n<h5> *\n<h6> *\n<head> *\n<header> *\n<hgroup> *\n<hr> *\n<html> *\n<i>+ *\n<iframe>+ *\n<img> *\n<input> *\n<ins> *\n<kbd> *\n<keygen> *\n<label>+ *\n<legend> *\n<li> *\n<link> *\n<map> *\n<mark> *\n<menu> *\n<meta> *\n<meter> *\n<nav> *\n<noscript> *\n<object> *\n<ol> *\n<optgroup> *\n<option> *\n<output> *\n<p> *\n<param> *\n<pre> *\n<progress> *\n<q> *\n<rp> *\n<rt> *\n<ruby> *\n<s> *\n<samp> *\n<script>+ *\n<section> *\n<select> *\n<small> *\n<source> *\n<span> *\n<strike> *\n<strong> *\n<style> *\n<sub> *\n<summary> *\n<sup> *\n<svg> *\n<table> *\n<tbody> *\n<td> *\n<textarea>+ *\n<tfoot> *\n<th> *\n<thead> *\n<time> *\n<title> *\n<tr> *\n<track> *\n<tt> *\n<u> *\n<ul>+ *\n<var> *\n<video> *\n<wbr> *\n<template>+ *\n<component>+ *\n<slot>+ *\n<collapser>+ *\n<rubber-wrapper>+ *\n<grip>+ *\n<link_hor_grip>+ *\n<grip_one>+ *\n<transition>+ *\n<input_option>+ *\n<option_select>+ *\n<input_bool>+ *\n<tree_view>+ *\n<vl_form>+ *\n<input_file>+ *\n<input_file_img>+ *\n<toolbar>+ *\n<*>+ *\n";
    }
    ՐՏ_modules["asset.html_ml"]["markup"] = markup;
})();

(function(){
    var __name__ = "asset.vuepy_parser";

    var _rml_test_str_;
    function strip_quotes(s) {
        if (s[0] === "'" || s[0] === '"') {
            return s.slice(1, -1);
        }
        return s;
    }
    function attrs2hash(attr_list) {
        var ret;
        ret = {};
        attr_list.forEach(function(it) {
            ret[it.name] = it;
        });
        return ret;
    }
    function attrs_assign(attrs_base, attrs_extra) {
        var ՐՏitr29, ՐՏidx29;
        var attrs_hash, ret, k;
        if (!(attrs_base && len(attrs_base))) {
            return attrs_extra.slice(0);
        } else if (!(attrs_extra && len(attrs_extra))) {
            return attrs_base.slice(0);
        }
        attrs_hash = Object.assign(attrs2hash(attrs_base), attrs2hash(attrs_extra));
        ret = [];
        ՐՏitr29 = ՐՏ_Iterable(attrs_hash);
        for (ՐՏidx29 = 0; ՐՏidx29 < ՐՏitr29.length; ՐՏidx29++) {
            k = ՐՏitr29[ՐՏidx29];
            ret.push(attrs_hash[k]);
        }
        return ret;
    }
    class ParserError extends Error {
        constructor (message, line, col, pos, is_eof) {
            super();
            var self = this;
            self.message = message;
            self.line = line;
            self.col = col;
            self.pos = pos;
            self.stack = new Error().stack;
            self.is_eof = is_eof;
        }
    }
    class OutputError extends Error {
        constructor (message, line, col, pos) {
            super();
            var self = this;
            var lcp;
            self.message = message;
            if (ՐՏ_type(line) === "Array") {
                lcp = line;
                line = lcp[0];
                col = lcp[1];
                pos = lcp[2];
            }
            self.line = line;
            self.col = col;
            self.pos = pos;
            self.stack = new Error().stack;
        }
    }
    class Stream {
        constructor (src) {
            var self = this;
            self.RE = /(( *).*)(\n|$)/g;
            self.src = src;
            self.line = 0;
            self.col = 0;
            self.string = null;
            self._string = "";
            self.indent = 0;
            self.is_last_line = false;
            self.start_line_pos = 0;
        }
        pos () {
            var self = this;
            return self.start_line_pos + self.col;
        }
        eof () {
            var self = this;
            return self.is_last_line && self.eol();
        }
        next_line () {
            var self = this;
            var ret;
            while (!((ret = self._next_line()) && ret.trim() || self.eof())) {
                self.eat_space();
            }
            return ret;
        }
        _next_line () {
            var self = this;
            var ret;
            if (self.is_last_line) {
                return null;
            }
            self.start_line_pos += self._string.length;
            ret = self.RE.exec(self.src);
            self._string = ret[0];
            self.indent = ret[2].length;
            self.string = ret[1];
            self.is_last_line = !ret[3];
            ++self.line;
            self.col = 0;
            return ret[1];
        }
        match (m, eat) {
            var self = this;
            var ret;
            if (ՐՏ_type(m) === "String") {
                m = new RegExp("^" + m);
            }
            ret = m.exec(self.string.slice(self.col));
            if (ret && eat) {
                self.col += ret[0].length;
            }
            return ret;
        }
        eol () {
            var self = this;
            return self.col >= self.string.length;
        }
        sol () {
            var self = this;
            return self.col === 0;
        }
        eat_space () {
            var self = this;
            var ret;
            ret = self.match(/^ */, true);
            return ret && ret[0];
        }
        peek () {
            var self = this;
            return self.string.charAt(self.col);
        }
        eat (ch) {
            var self = this;
            var _ch;
            if (!ch) {
                return false;
            }
            _ch = self.string.charAt(self.col);
            if ((_ch === ch || typeof _ch === "object" && ՐՏ_eq(_ch, ch))) {
                ++self.col;
                return true;
            }
            return false;
        }
        next () {
            var self = this;
            var _ch;
            _ch = self.string.charAt(self.col);
            if (_ch) {
                ++self.col;
                return _ch;
            }
            return null;
        }
        eat_to_end () {
            var self = this;
            var ret;
            ret = self.string.slice(self.col);
            self.col = self.string.length;
            return ret;
        }
        rest () {
            var self = this;
            return self.src.slice(self.pos());
        }
    }
    class Parser {
        constructor () {
            var self = this;
            self.src = null;
            self.indent_len = null;
            self.cur_level = 0;
            self.stream = null;
            self.chunk_tbl = null;
            self.templ_tbl = null;
            self.var_tbl = null;
            self.compile_requires = null;
        }
        raise_err (msg) {
            var self = this;
            var S;
            S = self.stream;
            throw new ParserError(msg, S.line, S.col, S.pos(), S.eof());
        }
        eol_or_comment_expect () {
            var self = this;
            if (!self.stream.match(/^\s*(#.*)?$/, true)) {
                self.raise_err("Expected end of the line");
            }
        }
        eol_expect () {
            var self = this;
            if (!self.stream.match(/^\s*$/, true)) {
                self.raise_err("Expected end of the line");
            }
        }
        expect (m, err) {
            var self = this;
            var ret;
            if (!(ret = self.stream.match(m, true))) {
                self.raise_err("Expected: " + (err || m));
            }
            return ret;
        }
        read_string (quote, force_strip) {
            var self = this;
            var S, q, quote_map, m, strip, ret, cur, ln, s;
            S = self.stream;
            if (q = S.match(/^(''''''|""""""|(''(?!')|""(?!")))/, true)) {
                return q[2] || "";
            }
            quote_map = {
                "'": new RegExp("^('''(?!')|'(?!'))"),
                '"': new RegExp('^("""(?!")|"(?!"))')
            };
            quote = S.match(quote_map[quote], true)[0];
            if (quote.length === 3) {
                m = /^([^\\']|\\('{1,3}|.)|'{1,2}(?!'))*/;
                strip = true;
            } else {
                strip = force_strip || false;
                m = /^([^\\']|\\('|.))*/;
            }
            if (quote[0] !== "'") {
                m = new RegExp(m.source.replace(/'/g, '"'));
            }
            ret = [];
            cur = "";
            while (true) {
                if (S.eol()) {
                    ln = S._next_line();
                    if (ln === null) {
                        break;
                    }
                    if (!ln.trim()) {
                        S.eat_space();
                        ret.push(ln);
                        continue;
                    }
                }
                s = S.match(m, true);
                ret.push(s[0]);
                if (!S.eol()) {
                    break;
                }
            }
            self.expect(quote);
            ret = ret.join("\n").replace(new RegExp("\\\\" + quote, "g"), quote).replace(new RegExp("\\\\\\\\" + quote, "g"), "\\" + quote);
            if (!strip) {
                ret = quote[0] + ret + quote[0];
            }
            return ret;
        }
        read_var_def () {
            var self = this;
            var S, q;
            S = self.stream;
            if (q = S.match(/^('|")/)) {
                return self.read_string(q[1]);
            } else {
                return S.eat_to_end();
            }
        }
        parse_tag () {
            var self = this;
            var ret, S, paren_or_colon, eof, attr, comma_or_paren;
            function read_attr() {
                var ret, q;
                ret = {
                    name: null,
                    value: null,
                    type: null
                };
                ret.name = self.expect(/^[\w:`~!@#$%^&*\.\-+{[\]}]+/, "Attr name was expected")[0];
                if (S.match(/^\s*=\s*/, true)) {
                    if (q = S.match(/^('|")/)) {
                        ret.value = self.read_string(q[1]);
                        ret.type = "string";
                    } else if (S.match(/^\$/, true)) {
                        ret.value = "$" + self.expect(/^\w+/, "variable name")[0];
                        ret.type = "var_ref";
                    } else {
                        self.raise_err("Unexpected attribute value (expected 'string' or $variable)");
                    }
                }
                return ret;
            }
            ret = {
                name: null,
                attrs: []
            };
            S = self.stream;
            S.eat_space();
            ret.name = self.expect(/^[\w\-]+/, "Invalid tag name")[0];
            S.eat_space();
            paren_or_colon = self.expect(/^(\(|:)/, "Paren or colon was expected")[1];
            if (paren_or_colon === ":") {
                return ret;
            }
            if (!S.match(/^\s*\)/, true)) {
                function eat_space_comment() {
                    S.eat_space();
                    while (!S.eof() && (S.eol() || S.match(/^(\\\s*|#.*)$/, true))) {
                        S.next_line();
                    }
                    S.eat_space();
                }
                while (!(eof = S.eof())) {
                    eat_space_comment();
                    attr = read_attr();
                    if (attr.name.startsWith("%")) {
                        ret[attr.name] = attr.value === null ? true : strip_quotes(attr.value);
                    } else {
                        ret.attrs.push(attr);
                    }
                    eat_space_comment();
                    comma_or_paren = self.expect(/^\s*(,\s*\)|\)|,)/, "Paren or comma was expected")[1];
                    if (comma_or_paren[comma_or_paren.length-1] === ")") {
                        break;
                    } else if (comma_or_paren[0] === ",") {
                        eat_space_comment();
                        if (S.match(/^\)/, true)) {
                            break;
                        }
                    }
                }
                if (eof) {
                    self.raise_err("Unexpected EOF");
                }
            }
            self.expect(/^\s*:/, "Colon was expected");
            if (!len(ret.attrs)) {
                ret.attrs = null;
            }
            return ret;
        }
        read_verbatim (re_stop) {
            var self = this;
            var S, barier_level, ret, re_indent, eof, empty_line;
            S = self.stream;
            barier_level = self.cur_level;
            ret = [];
            re_indent = new RegExp("^\\s{" + barier_level * self.indent_len + "}");
            while (!(eof = S.eof())) {
                if (empty_line = S.match(/^\s*$/, true)) {
                    ret.push(empty_line[0]);
                    S._next_line();
                    continue;
                }
                if (!S.match(re_indent, true) || re_stop && S.match(re_stop, true)) {
                    break;
                }
                ret.push(S.eat_to_end());
                S._next_line();
            }
            return ret.join("\n");
        }
        tokenize () {
            var self = this;
            var S, start_end, ret, q, var_name;
            S = self.stream;
            start_end = {
                s: [ S.line, S.col, S.pos() ],
                e: null
            };
            if (S.match(/^\s*#/, true)) {
                ret = {
                    _type: "comment",
                    value: S.eat_to_end()
                };
            } else if (q = S.match(/^('|")/)) {
                ret = {
                    _type: "string",
                    value: self.read_string(q[1])
                };
            } else if (S.match(/^\s*\$/, true)) {
                if (var_name = S.match(/^(\w+)\s*=\s*/, true)) {
                    ret = {
                        _type: "var_def",
                        name: "$" + var_name[1],
                        value: self.read_var_def()
                    };
                } else if (var_name = S.match(/^(\w+)/, true)) {
                    ret = {
                        _type: "var_ref",
                        name: "$" + var_name[1]
                    };
                } else {
                    self.raise_err("Unexpected syntax");
                }
            } else if (S.match(/^\s*def\s+/, true)) {
                ret = Object.assign({
                    _type: "def"
                }, self.parse_tag());
            } else if (S.match(/^\s*v-def\s+/, true)) {
                ret = Object.assign({
                    _type: "v-def"
                }, self.parse_tag());
            } else if (S.match(/^\s*\+{3}/, true)) {
                ret = {
                    _type: "beg",
                    value: "+++"
                };
            } else if (S.match(/^\s*---/, true)) {
                ret = {
                    _type: "end",
                    value: "---"
                };
            } else {
                ret = Object.assign({
                    _type: "tag"
                }, self.parse_tag());
            }
            start_end.e = [ S.line, S.col, S.pos() ];
            ret._pos = start_end;
            return ret;
        }
        dedent (node, to_level) {
            var self = this;
            while (true) {
                if (node.scope_level <= to_level) {
                    break;
                }
                node = node.parent;
            }
            return node;
        }
        walk_up (node, up_level) {
            var self = this;
            if (up_level === 0) {
                return node;
            }
            up_level = up_level < 0 ? -up_level : up_level;
            while (up_level) {
                node = node.parent;
                --up_level;
            }
            return node;
        }
        parse (rml) {
            var ՐՏ_14, ՐՏ_15;
            var self = this;
            var parent, main, child_nodes, S, sol, dlt, chunk, compiler, token, node;
            self.src = rml;
            self.stream = new Stream(rml);
            self._init_indent_len();
            self.chunk_tbl = {
                "v-pyj": {
                    "%tag": "script",
                    "%verbatim": true
                },
                "v-css": {
                    "%tag": "css",
                    "%verbatim": true
                }
            };
            self.templ_tbl = {};
            self.var_tbl = {};
            self.compile_requires = [];
            main = parent = {
                _type: "main",
                child_nodes: [],
                scope_level: 0,
                scoped_by: "indent"
            };
            child_nodes = parent.child_nodes;
            S = self.stream;
            S.next_line();
            function push_scope(node, scoped_by, scope_level) {
                if (self.allow_child(node)) {
                    if (!node.child_nodes) {
                        node.child_nodes = [];
                    }
                    child_nodes = node.child_nodes;
                    if (scoped_by) {
                        node.scoped_by = scoped_by;
                        node.scope_level = scope_level;
                    }
                    parent = node;
                } else {
                    self.raise_err("Element `" + (node.name || node._type) + "` couldn`t have a child");
                }
            }
            while (!S.eof()) {
                if (S.eol()) {
                    S.next_line();
                }
                sol = S.sol();
                if (sol) {
                    dlt = self.hold_indent();
                    if (dlt === 1) {
                        push_scope(node, "indent", self.cur_level);
                        chunk = self.chunk_tbl[node.name];
                        compiler = node["%compiler"] || chunk && chunk["%compiler"];
                        if (compiler) {
                            self.compile_requires.push({
                                node: node,
                                compiler: compiler
                            });
                        }
                        if (node["%verbatim"] || chunk && chunk["%verbatim"]) {
                            node.child_nodes = [ self.read_verbatim() ];
                            continue;
                        }
                    } else if (dlt < 0 || dlt === 0 && node && node._inline) {
                        parent = self.dedent(parent, self.cur_level);
                        child_nodes = parent.child_nodes;
                    }
                }
                S.eat_space();
                if (S.eol()) {
                    continue;
                }
                token = self.tokenize();
                token._inline = !sol;
                if (token._inline && token._type !== "comment") {
                    push_scope(node);
                }
                if (token._type === "beg") {
                    if (!sol) {
                        self.raise_err("Unexpected placement of `+++`");
                    }
                    self.eol_or_comment_expect();
                    chunk = self.chunk_tbl[node.name];
                    compiler = node["%compiler"] || chunk && chunk["%compiler"];
                    if (compiler) {
                        self.compile_requires.push({
                            node: node,
                            compiler: compiler
                        });
                    }
                    if (node["%verbatim"] || chunk && chunk["%verbatim"]) {
                        S._next_line();
                        node.child_nodes = [ self.read_verbatim(/^---\s*#*.*$/) ];
                        node.scoped_by = "beg_end";
                        node.scope_level = self.cur_level;
                    } else {
                        push_scope(node, "beg_end", self.cur_level);
                    }
                } else if (token._type === "end") {
                    if (!sol || ((ՐՏ_14 = parent.scope_level) !== (ՐՏ_15 = self.cur_level) && (typeof ՐՏ_14 !== "object" || !ՐՏ_eq(ՐՏ_14, ՐՏ_15)))) {
                        self.raise_err("Unexpected placement of `---`");
                    }
                    if (parent.scoped_by !== "beg_end") {
                        self.raise_err("Mismatched end block `---`");
                    }
                    parent = self.walk_up(parent, 1);
                    child_nodes = parent.child_nodes;
                } else if (token._type === "comment") {
                    token.parent = parent;
                    if (!token._inline) {
                        child_nodes.push(token);
                        node = token;
                    } else if (node._type === "tag") {
                        token.parent = node;
                        node.child_nodes = [ token ];
                    } else {
                        child_nodes.push(token);
                    }
                } else if (token._type === "string") {
                    token.parent = parent;
                    child_nodes.push(token);
                    node = token;
                } else if (token._type === "def") {
                    if (!sol) {
                        self.raise_err("`def` block should be at new line");
                    }
                    token.parent = parent;
                    node = self.chunk_tbl[token.name] = token;
                } else if (token._type === "v-def") {
                    if (!(sol && parent._type === "main")) {
                        self.raise_err("`v-def` block should be at new line and in the main scope");
                    }
                    token.parent = parent;
                    node = self.templ_tbl[token.name] = token;
                } else if (token._type === "var_def") {
                    if (!sol) {
                        self.raise_err("Variable definition should be at new line");
                    }
                    token.parent = parent;
                    node = self.var_tbl[token.name] = token.value;
                    node = token;
                } else if (token._type === "var_ref") {
                    token.parent = parent;
                    child_nodes.push(token);
                    node = token;
                } else if (token._type === "tag") {
                    token.parent = parent;
                    child_nodes.push(token);
                    node = token;
                } else {
                    self.raise_err("Unexpected syntax");
                }
            }
            return [main.child_nodes, self.var_tbl, self.chunk_tbl, self.compile_requires, self.templ_tbl];
        }
        _init_indent_len () {
            var self = this;
            self.indent_len = 4;
        }
        hold_indent () {
            var self = this;
            var ind_len, level, dlt_level;
            ind_len = self.stream.indent;
            if (ind_len % self.indent_len) {
                self.raise_err("Inconsistent indentation");
            }
            level = ind_len / self.indent_len || 0;
            dlt_level = level - self.cur_level;
            if (dlt_level > 1) {
                self.raise_err("Inconsistent indentation");
            }
            self.cur_level = level;
            return dlt_level;
        }
        allow_child (node) {
            var self = this;
            if (node._type === "main" || node._type === "v-def" || node._type === "def" && !node["%tag"]) {
                return true;
            }
            if (node._type === "tag" && (!self.chunk_tbl[node.name] || self.chunk_tbl[node.name]["%tag"])) {
                return true;
            }
            return false;
        }
    }
    class RML_compiler {
        constructor (markup, opt) {
            var self = this;
            self.markup = markup;
            self.compilers = opt.compilers || {};
            self.save_v_pyj = opt.save_v_pyj || function() {
                return;
            };
        }
        print_attrs (attrs, vars, tag_pos, ind) {
            var ՐՏitr30, ՐՏidx30;
            var self = this;
            var num_attrs, ret, pref, it, name, val;
            vars = vars || null;
            if (!(attrs && (num_attrs = len(attrs)))) {
                return "";
            }
            ret = [ " " ];
            pref = !ind || num_attrs <= 5 ? "" : "\n" + ind;
            ՐՏitr30 = ՐՏ_Iterable(attrs);
            for (ՐՏidx30 = 0; ՐՏidx30 < ՐՏitr30.length; ՐՏidx30++) {
                it = ՐՏitr30[ՐՏidx30];
                name = it.name;
                val = it.value;
                if (vars) {
                    name = self.mount_vars(name, vars, tag_pos);
                    val = self.mount_vars(val, vars, tag_pos);
                }
                ret.push(pref + name);
                if (ՐՏ_type(val) === "String") {
                    ret.push("= " + val);
                }
            }
            return ret.join(" ");
        }
        mount_vars (s, vars_rbl, tag_pos) {
            var self = this;
            var ret;
            function replacer(p0, p1, p2) {
                var v, s;
                v = vars_rbl[p2] || null;
                if (v === null) {
                    throw new OutputError("No var named `" + p2 + "`", tag_pos);
                }
                s = p1 + (vars_rbl[p2] || p2);
                return s;
            }
            if (!s) {
                return s;
            }
            ret = s.replace(/(^|(?!\\)\W)(\$\w+)/gm, replacer);
            return ret.replace(/\\\$/g, "$");
        }
        print_tag (tag, ind, vars, chunks, stack) {
            var ՐՏitr31, ՐՏidx31, ՐՏitr32, ՐՏidx32;
            var self = this;
            var ret, child_inline, name, close_tag, is_verbatim, is_alias, is_chunk, child_nodes, start_content, child_ind, tag_prop, close_meth, i, t, has_child, content;
            ind = ind || "";
            vars = vars && vars instanceof Object && Object.keys(vars).length && vars || null;
            chunks = chunks || null;
            stack = stack || [];
            ret = tag._inline ? "" : "\n" + ind;
            if (tag._type === "comment") {
                return "";
            }
            if (tag._type === "string") {
                ret += strip_quotes(tag.value);
                return ret;
            }
            if (tag._type === "var_ref") {
                ret += self.mount_vars(tag.name, vars, tag._pos.s);
                return ret;
            }
            child_inline = tag.child_nodes && tag.child_nodes[0] && tag.child_nodes[0]._inline;
            name = tag.name;
            if (vars) {
                name = self.mount_vars(name, vars, tag._pos.s);
            }
            close_tag = {};
            is_verbatim = tag["%verbatim"];
            if (chunks && chunks[name]) {
                if (chunks[name]["%tag"]) {
                    is_alias = true;
                    is_verbatim = is_verbatim || chunks[name]["%verbatim"];
                } else {
                    is_chunk = true;
                }
            }
            if (is_chunk) {
                if (ՐՏ_in(name, stack)) {
                    throw new OutputError("Circular reference detected in chunk `" + name + "`", tag._pos.s[0], tag._pos.s[1], tag._pos.s[2]);
                }
                stack.push(name);
                child_nodes = chunks[name].child_nodes;
                ret = [];
                start_content = "";
                child_ind = ind;
                close_tag[false] = "";
                close_tag[true] = "";
            } else {
                if (is_alias) {
                    name = chunks[name]["%tag"];
                    tag.attrs = attrs_assign(chunks[tag.name].attrs, tag.attrs);
                }
                child_nodes = tag.child_nodes;
                child_ind = ind + (child_inline ? "" : "    ");
                start_content = ">";
                ret = [ tag._inline ? "" : "\n" + ind, "<", name, self.print_attrs(tag.attrs, vars, tag._pos.s, tag._inline ? null : ind + "    ") ];
                tag_prop = self.markup[name] || self.markup["*"];
                close_meth = null;
                if (tag_prop) {
                    close_meth = tag_prop.close_meth;
                    if (!close_meth) {
                        close_tag[false] = "/>";
                        close_tag[true] = (child_inline ? "" : "\n" + ind) + "</" + name + ">";
                    } else if (close_meth === "+") {
                        close_tag[false] = "></" + name + ">";
                        close_tag[true] = (child_inline ? "" : "\n" + ind) + "</" + name + ">";
                    } else if (close_meth === "-") {
                        close_tag[false] = ">";
                        close_tag[true] = ">";
                    }
                } else {
                    throw new OutputError("Invalid tag: " + name);
                }
            }
            if (child_nodes) {
                i = 0;
                ՐՏitr31 = ՐՏ_Iterable(child_nodes);
                for (ՐՏidx31 = 0; ՐՏidx31 < ՐՏitr31.length; ՐՏidx31++) {
                    t = ՐՏitr31[ՐՏidx31];
                    if (t._type !== "comment") {
                        break;
                    }
                    ++i;
                }
                child_nodes = child_nodes.slice(i);
                has_child = !!len(child_nodes);
            } else {
                has_child = false;
            }
            if (has_child) {
                ret.push(start_content);
                if (is_verbatim) {
                    content = child_nodes[0].split("\n");
                    ret.push("\n" + child_ind);
                    ret.push(content.join("\n" + child_ind));
                } else {
                    ՐՏitr32 = ՐՏ_Iterable(child_nodes);
                    for (ՐՏidx32 = 0; ՐՏidx32 < ՐՏitr32.length; ՐՏidx32++) {
                        t = ՐՏitr32[ՐՏidx32];
                        ret.push(self.print_tag(t, child_ind, vars, chunks, stack));
                    }
                }
            }
            ret.push(close_tag[has_child]);
            if (is_chunk) {
                stack.pop();
            }
            return ret.join("");
        }
        pre_compile (src) {
            var ՐՏitr33, ՐՏidx33, ՐՏitr34, ՐՏidx34;
            var self = this;
            var p, content, vars, chunks, nodes_to_compile, templ_tbl, out_v_pyj, v_pyj_tag, v_pyj_script, templ_name, rml_templ, node, templ_str, templ_str_len, templ_str_lines_num, out_v_pyj_str, v_css_tag, out_v_css, v_css_str, store_in, ret;
            p = new Parser();
            [content, vars, chunks, nodes_to_compile, templ_tbl] = p.parse(src);
            out_v_pyj = [];
            v_pyj_tag = content.find(function(it) {
                return it.name === "v-pyj";
            });
            if (v_pyj_tag && v_pyj_tag.child_nodes && (v_pyj_script = v_pyj_tag.child_nodes[0])) {
                ՐՏitr33 = ՐՏ_Iterable(templ_tbl);
                for (ՐՏidx33 = 0; ՐՏidx33 < ՐՏitr33.length; ՐՏidx33++) {
                    templ_name = ՐՏitr33[ՐՏidx33];
                    rml_templ = templ_tbl[templ_name];
                    out_v_pyj.push(templ_name + '= """');
                    ՐՏitr34 = ՐՏ_Iterable(rml_templ.child_nodes);
                    for (ՐՏidx34 = 0; ՐՏidx34 < ՐՏitr34.length; ՐՏidx34++) {
                        node = ՐՏitr34[ՐՏidx34];
                        out_v_pyj.push(self.print_tag(node, null, vars, chunks));
                    }
                    out_v_pyj.push('\n"""\n\n');
                }
                templ_str = out_v_pyj.join("");
                templ_str_len = len(templ_str);
                templ_str_lines_num = len(templ_str.split("\n"));
                v_pyj_tag._lines_delta = -templ_str_lines_num + 1;
                v_pyj_tag._pos_delta = -templ_str_len;
                out_v_pyj_str = templ_str + v_pyj_script;
            }
            v_css_tag = content.find(function(it) {
                return it.name === "v-css";
            });
            out_v_css = null;
            if (v_css_tag && v_css_tag.child_nodes && (v_css_str = v_css_tag.child_nodes[0])) {
                store_in = null;
                if (v_css_tag.attrs && len(v_css_tag.attrs)) {
                    if (v_css_tag.attrs[0].name === "store_in") {
                        store_in = strip_quotes(v_css_tag.attrs[0].value);
                    } else {
                        throw new OutputError("v-css: expected `store_in` instead of " + v_css_tag.attrs[0].name, v_css_tag._pos.s);
                    }
                }
                out_v_css = {
                    css: v_css_str,
                    store_in: store_in
                };
            }
            ret = {
                v_css: out_v_css,
                v_pyj: out_v_pyj_str,
                nodes_to_compile: nodes_to_compile,
                raise_err_at: null,
                compile_v_pyj: null,
                make_html: null
            };
            ret.raise_err_at = function(node, compiler_err) {
                var err, node_line, indentation;
                err = ՐՏ_type(compiler_err) === "String" ? new Error(compiler_err) : compiler_err;
                node_line = node._pos.s[0] + (node.scoped_by === "beg_end" ? 1 : 0);
                indentation = node.scope_level * p.indent_len;
                err.line = err.line || 0;
                err.pos = (err.pos || 0) + indentation * err.line + node._pos.e[2] + (node._pos_delta || 0);
                err.line += node_line + (node._lines_delta || 0);
                err.col = indentation + (err.col || 0);
                throw err;
            };
            ret.compile_v_pyj = function(compiler) {
                if (!v_pyj_script) {
                    return;
                }
                try {
                    return compiler(ret.v_pyj);
                } catch (ՐՏ_Exception) {
                    var err = ՐՏ_Exception;
                    if (err.filename) {
                        throw err;
                    } else {
                        ret.raise_err_at(v_pyj_tag, err);
                    }
                }
            };
            ret.raise_v_pyj_err = function(err) {
                ret.raise_err_at(v_pyj_tag, err);
            };
            ret.make_html = function() {
                var ՐՏitr35, ՐՏidx35;
                var out_html, tag;
                out_html = [];
                ՐՏitr35 = ՐՏ_Iterable(content);
                for (ՐՏidx35 = 0; ՐՏidx35 < ՐՏitr35.length; ՐՏidx35++) {
                    tag = ՐՏitr35[ՐՏidx35];
                    if (ՐՏ_in(tag.name, [ "v-pyj", "v-css" ])) {
                        continue;
                    }
                    out_html.push(self.print_tag(tag, null, vars, chunks));
                }
                return out_html.join("");
            };
            return ret;
        }
        compile (src) {
            var ՐՏitr36, ՐՏidx36;
            var self = this;
            var prec, it, compiler;
            prec = self.pre_compile(src);
            if (prec.v_pyj) {
                self.save_v_pyj(prec.v_pyj);
            }
            if (prec.nodes_to_compile) {
                ՐՏitr36 = ՐՏ_Iterable(prec.nodes_to_compile);
                for (ՐՏidx36 = 0; ՐՏidx36 < ՐՏitr36.length; ՐՏidx36++) {
                    it = ՐՏitr36[ՐՏidx36];
                    if (compiler = self.compilers[it.compiler]) {
                        try {
                            it.node.child_nodes[0] = compiler(it.node.child_nodes[0]);
                        } catch (ՐՏ_Exception) {
                            var err = ՐՏ_Exception;
                            prec.raise_err_at(it.node, err);
                        }
                    } else {
                        prec.raise_err_at(it.node, new Error("Compiler `" + it.compiler + "` is not set"));
                    }
                }
            }
            return prec.make_html();
        }
    }
    _rml_test_str_ = "\ndef RS(%tag = script, %verbatim,  type = \"text/js\" ):\n$asd = DDDDDD\ndef tt():\n    div(d=\"df dfsdf\\\" g\"):\n        span(in_tt = 'qq'):\n            RS():\n                'sdfsdfsdsdfsdf sdf '\n                {function();\n                    dsfsdf;\n                    e = /\\$.+/.exec('sdfsdf')\n                }\n                 fsdfsd\n\n!DOCTYPE(html):\ndiv():\n    tt():\n    RS(some = 'wer1'):\n    span(as = '$asd', g= '\\$event'):\n        ul:\n            li:\n                i(class = 'sdsd'):\n            li:\n\ndef qq():\n    div():\n        qq1():\n        # dfsdf\n        'hi from qq-chunk'\ndef qq1():\n    #qq1():\n    div():\n        'hi from qq1-chunk'\n    span(name = 'qq1-chunk'):\n        'sdfsdf'\ndiv:\n    RS:\n        'adasd'\n        'sdasd'\nsvg:\n    qq1():\neditable(f = 'sdfsdf', @click = 'sdfdf()'):\nRS:\n\n";
    function load_markup(markup) {
        var ՐՏitr37, ՐՏidx37;
        var html_tags, line, tag;
        html_tags = {};
        function read_line(ln) {
            var r;
            r = /^<\s*([^\s]+)\s*>\s*([+-]?)/.exec(ln);
            return {
                "tag": r[1],
                "close_meth": r[2]
            };
        }
        ՐՏitr37 = ՐՏ_Iterable(markup.split("\n"));
        for (ՐՏidx37 = 0; ՐՏidx37 < ՐՏitr37.length; ՐՏidx37++) {
            line = ՐՏitr37[ՐՏidx37];
            line = line.split("#")[0].trimRight();
            if (!line.trim()) {
                continue;
            } else {
                tag = read_line(line);
                html_tags[tag.tag] = tag;
            }
        }
        return html_tags;
    }
    var html_ml = ՐՏ_modules["asset.html_ml"];
    
    function compile(rml_s, opt) {
        var markup, compiler, ret;
        markup = html_ml.markup();
        compiler = new RML_compiler(load_markup(markup), opt);
        ret = compiler.compile(rml_s);
        return ret;
    }
    function pre_compile(rml_s) {
        var markup, compiler, ret;
        markup = html_ml.markup();
        compiler = new RML_compiler(load_markup(markup), {});
        ret = compiler.pre_compile(rml_s);
        return ret;
    }
    function main() {
        return compile(_rml_test_str_);
    }
    if (__name__ === "__main__") {
        main();
    }
    ՐՏ_modules["asset.vuepy_parser"]["_rml_test_str_"] = _rml_test_str_;
    ՐՏ_modules["asset.vuepy_parser"]["strip_quotes"] = strip_quotes;
    ՐՏ_modules["asset.vuepy_parser"]["attrs2hash"] = attrs2hash;
    ՐՏ_modules["asset.vuepy_parser"]["attrs_assign"] = attrs_assign;
    ՐՏ_modules["asset.vuepy_parser"]["ParserError"] = ParserError;
    ՐՏ_modules["asset.vuepy_parser"]["OutputError"] = OutputError;
    ՐՏ_modules["asset.vuepy_parser"]["Stream"] = Stream;
    ՐՏ_modules["asset.vuepy_parser"]["Parser"] = Parser;
    ՐՏ_modules["asset.vuepy_parser"]["RML_compiler"] = RML_compiler;
    ՐՏ_modules["asset.vuepy_parser"]["load_markup"] = load_markup;
    ՐՏ_modules["asset.vuepy_parser"]["compile"] = compile;
    ՐՏ_modules["asset.vuepy_parser"]["pre_compile"] = pre_compile;
    ՐՏ_modules["asset.vuepy_parser"]["main"] = main;
})();

(function(){
    var __name__ = "asset.vuepy_compiler";

    var RS_IMPORT_DIRS, PYJ_CACHE, CSS_CACHE, re_split_ext, re_split_pth, LAST_VUEPY_PREC;
    var pre_compile = ՐՏ_modules["asset.vuepy_parser"].pre_compile;
    
    RS_IMPORT_DIRS = [ "root/vuepy" ];
    PYJ_CACHE = null;
    CSS_CACHE = null;
    re_split_ext = /^(.*)\.([^\.]+)$/;
    re_split_pth = /^(.*)\/([^\/]+)$/;
    LAST_VUEPY_PREC = {};
    function clear_cache() {
        PYJ_CACHE = {};
        CSS_CACHE = {};
        LAST_VUEPY_PREC = {};
    }
    function vuepy_precompile(s, fp_no_ext) {
        var prec;
        try {
            prec = pre_compile(s);
        } catch (ՐՏ_Exception) {
            var e = ՐՏ_Exception;
            e.filename = fp_no_ext + ".vuepy";
            throw e;
        }
        if (prec.v_pyj) {
            PYJ_CACHE[fp_no_ext + ".pyj"] = prec.v_pyj;
        }
        if (prec.v_css) {
            prec.v_css.store_in = prec.v_css.store_in || fp_no_ext.split("/")[fp_no_ext.split("/").length-1] + ".css";
            prec.v_css.stored_by = fp_no_ext.split("/").slice(2).join("/") + ".vuepy";
            if (!CSS_CACHE[prec.v_css.store_in]) {
                CSS_CACHE[prec.v_css.store_in] = {};
            }
            CSS_CACHE[prec.v_css.store_in][prec.v_css.stored_by] = prec.v_css.css;
        }
        LAST_VUEPY_PREC.prec = prec;
        LAST_VUEPY_PREC.fp_no_ext = fp_no_ext;
        return prec;
    }
    function make_file_reader(fs) {
        class Read_ex extends Error {
            constructor () {
                super();
                var self = this;
                self.code = "ENOENT";
            }
        }
        function read_file(fp) {
            var fp_no_ext, fp_vuepy, fid, prec, ret;
            if (PYJ_CACHE && PYJ_CACHE[fp]) {
                return PYJ_CACHE[fp];
            }
            fp_no_ext = re_split_ext.exec(fp)[1];
            fp_vuepy = fp_no_ext + ".vuepy";
            ՐՏ_print("try import vuepy: ", fp_vuepy);
            if (fid = fs.id_by_path(fp_vuepy)) {
                prec = vuepy_precompile(fs.files[fid].content, fp_no_ext);
                if (prec.v_pyj) {
                    ret = prec.v_pyj;
                } else {
                    throw new Error("Found `" + fp_vuepy + "`, but there is no `v-pyj` in it, so nothing to import!");
                }
            } else {
                fid = fs.id_by_path(fp);
                ՐՏ_print("try import: ", fp);
                if (!fid) {
                    throw new Read_ex();
                }
                ret = fs.files[fid].content;
            }
            return ret;
        }
        return read_file;
    }
    function vuepy_compile(s, fp, fs, opt) {
        var ՐՏitr38, ՐՏidx38;
        var defs, fid, fp_no_ext, prec, v_js, it, compiler, css_frags;
        clear_cache();
        defs = {
            compilers: {
                "rapydscript": function(s) {
                    return _rs_compile(s, fp, fs);
                }
            }
        };
        opt = Object.assign({}, defs, opt);
        if (!s) {
            fid = fs.id_by_path(fp);
            if (!fid) {
                throw new Error("File `" + fp + "` not found ");
            }
            s = fs.files[fid].content;
        }
        fp_no_ext = re_split_ext.exec(fp)[1];
        prec = vuepy_precompile(s, fp_no_ext);
        if (prec.v_pyj) {
            v_js = prec.compile_v_pyj(opt.compilers["rapydscript"]);
        }
        LAST_VUEPY_PREC = {};
        if (prec.nodes_to_compile) {
            ՐՏitr38 = ՐՏ_Iterable(prec.nodes_to_compile);
            for (ՐՏidx38 = 0; ՐՏidx38 < ՐՏitr38.length; ՐՏidx38++) {
                it = ՐՏitr38[ՐՏidx38];
                if (compiler = opt.compilers[it.compiler]) {
                    try {
                        it.node.child_nodes[0] = compiler(it.node.child_nodes[0]);
                    } catch (ՐՏ_Exception) {
                        var err = ՐՏ_Exception;
                        clear_cache();
                        prec.raise_err_at(it.node, err);
                    }
                } else {
                    prec.raise_err_at(it.node, new Error("Compiler `" + it.compiler + "` is not set"));
                }
            }
        }
        css_frags = len(Object.keys(CSS_CACHE)) && CSS_CACHE || null;
        clear_cache();
        return {
            src: fp,
            "html": prec.make_html(),
            "pyj": prec.v_pyj,
            "js": v_js,
            "css": css_frags
        };
    }
    function make_amd_wrapper(pyj_s) {
        var is_amd_mod, mod_as_names, out_pyj_s, wrapper;
        is_amd_mod = false;
        function get_amd_imports(pyj_s) {
            var out, out_pyj_s;
            out = [];
            function replacer(s, mod_as_names) {
                var ՐՏitr39, ՐՏidx39;
                var mod_as_name, mod, name;
                is_amd_mod = true;
                mod_as_names = mod_as_names.split(/ *, */);
                ՐՏitr39 = ՐՏ_Iterable(mod_as_names);
                for (ՐՏidx39 = 0; ՐՏidx39 < ՐՏitr39.length; ՐՏidx39++) {
                    mod_as_name = ՐՏitr39[ՐՏidx39];
                    mod_as_name = mod_as_name.split(/ +as +/);
                    mod = mod_as_name[0];
                    name = mod_as_name[1] || mod;
                    out.push({
                        mod: mod.trim(),
                        name: name.trim()
                    });
                }
                return "";
            }
            out_pyj_s = pyj_s.replace(/^import_amd +(.*?)(#.*)?\n/gm, replacer);
            return [ out, out_pyj_s ];
        }
        [mod_as_names, out_pyj_s] = get_amd_imports(pyj_s);
        function make_wrapper(mod_as_names) {
            function wrapper(js_s) {
                var ՐՏitr40, ՐՏidx40;
                var imports_arr, imports_as, mod_as_name;
                imports_arr = [];
                imports_as = [];
                ՐՏitr40 = ՐՏ_Iterable(mod_as_names);
                for (ՐՏidx40 = 0; ՐՏidx40 < ՐՏitr40.length; ՐՏidx40++) {
                    mod_as_name = ՐՏitr40[ՐՏidx40];
                    imports_arr.push('"' + mod_as_name.mod + "" + '"');
                    imports_as.push(mod_as_name.name);
                }
                return "define([" + imports_arr.join(",") + "]," + "function(" + imports_as.join(",") + "){\nvar exports = {};\n" + js_s + "\nreturn exports;})";
            }
            return wrapper;
        }
        wrapper = is_amd_mod ? make_wrapper(mod_as_names) : function(js_s) {
            return js_s;
        };
        return [ wrapper, out_pyj_s ];
    }
    function rs_compile(s, fp, fs, opt) {
        clear_cache();
        return {
            "js": _rs_compile(s, fp, fs, opt),
            src: fp
        };
    }
    function _rs_compile(s, fp, fs, opt) {
        var me, compiler, main_loop, defs, amd_wrapper, pyj_s, ret;
        me = _rs_compile;
        compiler = rs_req.get("rapydscript_web");
        if (me.running) {
            compiler = compiler.factory();
        } else {
            main_loop = me.running = true;
        }
        defs = {
            basedir: fp.split("/").slice(0, -1).join("/"),
            readfile: make_file_reader(fs),
            es6: true,
            beautify: true,
            import_dirs: RS_IMPORT_DIRS
        };
        opt = Object.assign({}, defs, opt);
        try {
            s = s || opt.readfile(fp);
            [amd_wrapper, pyj_s] = make_amd_wrapper(s);
            ret = compiler.compile(pyj_s, opt);
            ret = amd_wrapper(ret);
        } catch (ՐՏ_Exception) {
            var err = ՐՏ_Exception;
            if (!err.filename) {
                err.filename = fp;
            }
            me.running = false;
            maybe_vuepy_error(err);
            throw err;
        }
        if (main_loop) {
            me.running = false;
        }
        return ret;
    }
    function maybe_vuepy_error(err) {
        var ՐՏ_16;
        var err_fp_no_ext;
        err_fp_no_ext = err.filename && err.filename.split(/\.[^.]+$/)[0];
        if (err_fp_no_ext && LAST_VUEPY_PREC.fp_no_ext && ((ՐՏ_16 = LAST_VUEPY_PREC.fp_no_ext) === err_fp_no_ext || typeof ՐՏ_16 === "object" && ՐՏ_eq(ՐՏ_16, err_fp_no_ext))) {
            err.filename = err_fp_no_ext + ".vuepy";
            LAST_VUEPY_PREC.prec.raise_v_pyj_err(err);
        }
    }
    ՐՏ_modules["asset.vuepy_compiler"]["RS_IMPORT_DIRS"] = RS_IMPORT_DIRS;
    ՐՏ_modules["asset.vuepy_compiler"]["PYJ_CACHE"] = PYJ_CACHE;
    ՐՏ_modules["asset.vuepy_compiler"]["CSS_CACHE"] = CSS_CACHE;
    ՐՏ_modules["asset.vuepy_compiler"]["re_split_ext"] = re_split_ext;
    ՐՏ_modules["asset.vuepy_compiler"]["re_split_pth"] = re_split_pth;
    ՐՏ_modules["asset.vuepy_compiler"]["LAST_VUEPY_PREC"] = LAST_VUEPY_PREC;
    ՐՏ_modules["asset.vuepy_compiler"]["clear_cache"] = clear_cache;
    ՐՏ_modules["asset.vuepy_compiler"]["vuepy_precompile"] = vuepy_precompile;
    ՐՏ_modules["asset.vuepy_compiler"]["make_file_reader"] = make_file_reader;
    ՐՏ_modules["asset.vuepy_compiler"]["vuepy_compile"] = vuepy_compile;
    ՐՏ_modules["asset.vuepy_compiler"]["make_amd_wrapper"] = make_amd_wrapper;
    ՐՏ_modules["asset.vuepy_compiler"]["rs_compile"] = rs_compile;
    ՐՏ_modules["asset.vuepy_compiler"]["_rs_compile"] = _rs_compile;
    ՐՏ_modules["asset.vuepy_compiler"]["maybe_vuepy_error"] = maybe_vuepy_error;
})();

(function(){
    var __name__ = "asset.vuepy_output";

    var fs_path = ՐՏ_modules["asset.fs_path"];
    
    "\noutput_path_map = {\n    'html': def(pth): return '/templates/' +                 pth.split(///).filter(def(x): return x and x != 'root';)[1:].join('/') + '.html';,\n    'js': '/static/js/',\n    'css': '/static/css/',\n }\n";
    function update_css(css, frags_to_update) {
        var ՐՏitr41, ՐՏidx41;
        var stored_frags, css_head, updated_frags, out, stored_by, section;
        function parse_css(css) {
            var re_splitter, frags, stored_frags, i, stored_by, content;
            re_splitter = /(\n?^ *\/\* *-+ *< *([^\s>]+) *> *-+ *\*\/ *$\n?)/m;
            frags = css.split(re_splitter);
            stored_frags = {
                "_css_head_": frags[0] || ""
            };
            if (len(frags) > 1) {
                i = 2;
                while (i < len(frags)) {
                    stored_by = frags[i];
                    content = frags[i + 1];
                    stored_frags[stored_by] = content || "";
                    i += 3;
                }
            }
            return stored_frags;
        }
        stored_frags = parse_css(css);
        css_head = stored_frags._css_head_;
        delete stored_frags._css_head_;
        updated_frags = Object.assign({}, stored_frags, frags_to_update);
        out = [];
        ՐՏitr41 = ՐՏ_Iterable(updated_frags);
        for (ՐՏidx41 = 0; ՐՏidx41 < ՐՏitr41.length; ՐՏidx41++) {
            stored_by = ՐՏitr41[ՐՏidx41];
            section = "\n/*---------< " + stored_by + " >-------------*/\n";
            out.push(section + updated_frags[stored_by]);
        }
        return css_head + out.join("");
    }
    var store_css = (ՐՏ_17 = function store_css(css_to_store, opath, fs) {
        var ՐՏitr42, ՐՏidx42;
        var opath_id, css_file, fp, fid, css_s;
        opath_id = fs.id_by_path(opath);
        ՐՏitr42 = ՐՏ_Iterable(css_to_store);
        for (ՐՏidx42 = 0; ՐՏidx42 < ՐՏitr42.length; ՐՏidx42++) {
            css_file = ՐՏitr42[ՐՏidx42];
            fp = fs.path_join(opath, css_file);
            fid = fs.id_by_path(fp);
            if (!fid) {
                fid = fs.create_file(css_file, opath_id);
            }
            css_s = update_css(fs.files[fid].content, css_to_store[css_file]);
            fs.write_file(fid, css_s);
        }
    }, Object.defineProperty(ՐՏ_17, "__doc__", {
        value: "css_to_store is a hash:\n    'a.css' :\n        'foo.vuepy': \"a { color: black } ...\"\n        'bar.vuepy': \"div.error { color: red } ...\"\n        ...\n    ..."
    }), ՐՏ_17);
    function output(compiled, fs, output_path_map) {
        var ՐՏitr43, ՐՏidx43;
        var fp, ps, ext, ofp, opath, fid;
        fp = compiled.src;
        ps = fs_path.path_split(fp);
        ՐՏitr43 = ՐՏ_Iterable(compiled);
        for (ՐՏidx43 = 0; ՐՏidx43 < ՐՏitr43.length; ՐՏidx43++) {
            ext = ՐՏitr43[ՐՏidx43];
            if (ext === "src" || !compiled[ext]) {
                continue;
            }
            ofp = null;
            if (opath = output_path_map[ext]) {
                if (opath instanceof Function) {
                    ofp = opath = opath(ps.fpath_no_ext, ext);
                }
            }
            if (ext === "css") {
                store_css(compiled[ext], opath || ps.dir, fs);
            } else {
                if (!ofp) {
                    ofp = fs.path_join(opath || ps.dir, ps.fname_no_ext + "." + ext);
                }
                fid = fs.id_by_path(ofp);
                if (!fid) {
                    fid = fs.create_file(ofp);
                }
                fs.write_file(fid, compiled[ext]);
            }
        }
    }
    ՐՏ_modules["asset.vuepy_output"]["update_css"] = update_css;
    ՐՏ_modules["asset.vuepy_output"]["store_css"] = store_css;
    ՐՏ_modules["asset.vuepy_output"]["output"] = output;
})();

(function(){
    var __name__ = "asset.cm_vuepy";

    var MODE_NAME, CodeMirror;
    MODE_NAME = "vuepy";
    CodeMirror = null;
    function reg_mode(CM) {
        CodeMirror = CM;
        CM.defineMode(MODE_NAME, def_mode, "rapydscript");
    }
    function arr2hash(arr) {
        var ret;
        ret = {};
        arr.forEach(function(it) {
            ret[it] = true;
        });
        return ret;
    }
    function wordRegexp(words) {
        return new RegExp("^((" + words.join(")|(") + "))\\b");
    }
    function def_mode(conf, parserConf) {
        var ERRORCLASS, punc, stringPrefixes, tripleOperators, doubleOperators, singleOperators, wordOperators, identifiers, indentUnit, hangingIndent, _keywords, _builtins, keywords, builtins, rml_mode, external;
        ERRORCLASS = "error";
        punc = parserConf.punctuation || /^[\(\)\[\]\{\}@,:`;\.\\]/;
        stringPrefixes = /^'{3}|"{3}|['"]/i;
        tripleOperators = parserConf.tripleOperators || /^((\/\/=)|(>>=)|(<<=)|(\*\*=))/;
        doubleOperators = parserConf.doubleOperators || /^((==)|(!=)|(<=)|(>=)|(<>)|(<<)|(>>)|(\/\/)|(\*\*)|(\+=)|(\-=)|(\*=)|(%=)|(\/=)|(&=)|(\|=)|(\^=))/;
        singleOperators = parserConf.singleOperators || /^[\+\-\*\/%&|\^~<>!=\?]/;
        wordOperators = wordRegexp([ "in" ]);
        identifiers = parserConf.identifiers || new RegExp("^[_A-Za-z$][_A-Za-z0-9$-]*");
        indentUnit = conf.indentUnit;
        hangingIndent = parserConf.hangingIndent || indentUnit;
        _keywords = "def v-def v-for v-model v-show ref is key component v-if v-else v-else-if v-html v-text v-on v-bind template slot props".split(" ");
        _builtins = "$event arguments true false null undefined".split(" ");
        if (parserConf.extra_keywords) {
            _keywords = _keywords.concat(parserConf.extra_keywords);
        }
        if (parserConf.extra_builtins) {
            _builtins = _builtins.concat(parserConf.extra_builtins);
        }
        keywords = arr2hash(_keywords);
        builtins = arr2hash(_builtins);
        CodeMirror.registerHelper("hintWords", MODE_NAME, _keywords.concat(_builtins));
        class RML_mode {
            constructor () {
                var self = this;
                self.ST_KEYS = Object.keys(self.start_state());
            }
            start_state (basecolumn) {
                var self = this;
                return {
                    tokenize: self.token_base,
                    scopes: [ {
                        offset: basecolumn || 0,
                        type: "tag",
                        tag_props: null,
                        align: null,
                        sub_type: null,
                        tag_name: null,
                        tag_style: null
                    } ],
                    lastStyle: null,
                    lastToken: null,
                    dedent: 0,
                    indent: null,
                    js_str_expect: false,
                    js_str_type: null,
                    def_tags: null,
                    tag_name: null,
                    tag_spec_attrs: null,
                    tag_style: null,
                    local_state: null,
                    local_mode: null
                };
            }
            load_state (state) {
                var self = this;
                Object.assign(self, state);
            }
            update_state (state) {
                var self = this;
                self.ST_KEYS.forEach(function(k) {
                    state[k] = self[k];
                });
            }
            copy_state (state) {
                var self = this;
                var ret;
                ret = {};
                self.ST_KEYS.forEach(function(k) {
                    var v, _;
                    v = state[k];
                    if (Array.isArray(v)) {
                        ret[k] = v.slice(0);
                    } else if (v instanceof Object && !(v instanceof Function)) {
                        ret[k] = (function() {
                            var ՐՏidx44, ՐՏitr44 = ՐՏ_Iterable(v), ՐՏres = {}, _;
                            for (ՐՏidx44 = 0; ՐՏidx44 < ՐՏitr44.length; ՐՏidx44++) {
                                _ = ՐՏitr44[ՐՏidx44];
                                ՐՏres[_] = v[_];
                            }
                            return ՐՏres;
                        })();
                    } else {
                        ret[k] = v;
                    }
                });
                if (ret.local_mode) {
                    ret.local_state = CodeMirror.copyState(ret.local_mode, ret.local_state);
                }
                return ret;
            }
            dedent_process (stream) {
                var ՐՏ_18;
                var self = this;
                var indented;
                indented = stream.indentation();
                while (self.scopes[self.scopes.length-1].offset > indented) {
                    if (!/^tag(_inline)?$/.test(self.scopes[self.scopes.length-1].type)) {
                        return {
                            error: true
                        };
                    }
                    self.scopes.pop();
                    while (self.scopes[self.scopes.length-1].type === "tag_inline") {
                        self.scopes.pop();
                    }
                }
                return {
                    error: ((ՐՏ_18 = self.scopes[self.scopes.length-1].offset) !== indented && (typeof ՐՏ_18 !== "object" || !ՐՏ_eq(ՐՏ_18, indented)))
                };
            }
            token_re (stream) {
                var self = this;
                var escaped, inSet, next;
                escaped = false;
                inSet = false;
                while (next = stream.next()) {
                    if (!escaped) {
                        if (next === "/" && !inSet) {
                            return;
                        }
                        if (next === "[") {
                            inSet = true;
                        } else if (inSet && next === "]") {
                            inSet = false;
                        }
                    }
                    escaped = !escaped && next === "\\";
                }
            }
            token_base (stream) {
                var self = this;
                var sol, indent, scope_offset, line_offset, style;
                sol = stream.sol();
                if (sol) {
                    indent = self.indent = stream.indentation();
                    if (/^tag(_inline)?$/.test(self.scopes[self.scopes.length-1].type)) {
                        scope_offset = self.scopes[self.scopes.length-1].offset;
                        if (stream.eatSpace()) {
                            line_offset = indent;
                            if (line_offset > scope_offset) {
                                self.push_scope(stream, "tag");
                            } else if (line_offset < scope_offset && self.dedent_process(stream).error) {
                                stream.skipToEnd();
                                return ERRORCLASS;
                            } else if (self.scopes[self.scopes.length-1].type === "tag_inline") {
                                while (self.scopes[self.scopes.length-1].type === "tag_inline") {
                                    self.scopes.pop();
                                }
                            }
                            return null;
                        } else {
                            style = self.token_baseInner(stream);
                            if (scope_offset > 0 && self.dedent_process(stream).error) {
                                style += " " + ERRORCLASS;
                            }
                            return style;
                        }
                    }
                }
                return self.token_baseInner(stream);
            }
            token_baseInner (stream) {
                var self = this;
                var ch, quote, w;
                if (stream.eatSpace()) {
                    return null;
                }
                ch = stream.peek();
                if (ch === "#") {
                    stream.skipToEnd();
                    return "comment";
                }
                if (stream.match(/^[0-9\.]/, false)) {
                    if (stream.match(/^\d*\.\d+(e[\+\-]?\d+)?/i) || stream.match(/^\d+\.\d*/) || stream.match(/^\.\d+/)) {
                        stream.eat(/J/i);
                        return "number";
                    }
                    if (stream.match(/^0x[0-9a-f]+/i) || stream.match(/^0b[01]+L?/i) || stream.match(/^0o[0-7]+L?/i) || stream.match(/^[0-9]\d*(e[\+\-]?\d+)?(L|J)?/i)) {
                        return "number";
                    }
                }
                if (quote = stream.match(stringPrefixes)) {
                    quote = quote[0];
                    if (self.js_str_expect) {
                        self.js_str_expect = false;
                        if (self.lastToken !== "=") {
                            return ERRORCLASS;
                        }
                        self.js_str_type = quote;
                        self.push_scope(stream, quote);
                        return "punctuation js_string_qte";
                    } else if (self.scopes[self.scopes.length-1].type === quote) {
                        self.scopes.pop();
                        self.js_str_type = null;
                        return "punctuation js_string_qte";
                    } else {
                        if (self.js_str_type === quote) {
                            return ERRORCLASS;
                        }
                        self.tokenize = self.token_string_factory(stream.current());
                        return self.tokenize(stream);
                    }
                }
                if (stream.match(tripleOperators) || stream.match(doubleOperators) || stream.match(wordOperators)) {
                    return "operator";
                }
                if (stream.eat("/")) {
                    if (!self.lastToken || self.lastStyle === "operator" || /^([\[{\(:=,'"]|in)$/.test(self.lastToken)) {
                        self.token_re(stream);
                        stream.match(/^\b(([gimyu])(?![gimyu]*\2))+\b/);
                        return "string-2";
                    } else {
                        return "operator";
                    }
                }
                if (stream.match(singleOperators)) {
                    return "operator";
                }
                if (stream.match(punc)) {
                    return "punctuation";
                }
                if (w = stream.match(identifiers)) {
                    w = w[0];
                    if (keywords[w]) {
                        return "keyword";
                    }
                    if (builtins[w]) {
                        return "builtin";
                    }
                    if (/^(this)\b/.test(w)) {
                        return "variable-2";
                    } else {
                        if (self.scopes[self.scopes.length-1].type.startsWith("tag")) {
                            return self.lastToken === "def" ? "def" : "tag";
                        }
                        if (self.scopes[self.scopes.length-1].sub_type === "attr") {
                            return "attribute";
                        }
                        return "variable";
                    }
                }
                stream.next();
                return ERRORCLASS;
            }
            token_string_factory (delimiter) {
                var self = this;
                var singleline, OUTCLASS;
                singleline = delimiter.length === 1;
                OUTCLASS = "string";
                function token_string(stream) {
                    while (!stream.eol()) {
                        stream.eatWhile(/[^'"\\]/);
                        if (stream.eat("\\")) {
                            stream.next();
                            if (singleline && stream.eol()) {
                                return OUTCLASS;
                            }
                        } else if (stream.match(delimiter)) {
                            self.tokenize = self.token_base;
                            return OUTCLASS;
                        } else {
                            stream.eat(/['"]/);
                        }
                    }
                    if (singleline) {
                        if (parserConf.singleLineStringErrors) {
                            return ERRORCLASS;
                        } else {
                            self.tokenize = self.token_base;
                        }
                    }
                    return OUTCLASS;
                }
                token_string.isString = true;
                return token_string;
            }
            push_scope (stream, type) {
                var self = this;
                var offset, align, sub_type, tag_props, tag_name, tag_style;
                offset = 0;
                align = null;
                sub_type = null;
                tag_props = null;
                tag_name = null;
                tag_style = null;
                if (type === "tag") {
                    while (self.scopes[self.scopes.length-1].type !== "tag") {
                        self.scopes.pop();
                    }
                    offset = self.scopes[self.scopes.length-1].offset + indentUnit;
                    if (self.tag_spec_attrs) {
                        tag_props = self.tag_spec_attrs;
                        self.tag_spec_attrs = null;
                    }
                    tag_name = self.tag_name;
                    tag_style = self.tag_style;
                } else if (type === "tag_inline") {
                    while (!self.scopes[self.scopes.length-1].type.startsWith("tag")) {
                        self.scopes.pop();
                    }
                    offset = self.scopes[self.scopes.length-1].offset;
                } else if (/^('|")/.test(type)) {
                } else if (type.endsWith("---")) {
                    offset = self.scopes[self.scopes.length-1].offset;
                } else {
                    if (!stream.match(/^(\s|#.*)*$/, false)) {
                        align = stream.column() + 1;
                    }
                    offset = self.scopes[self.scopes.length-1].offset + hangingIndent;
                    sub_type = self.scopes[self.scopes.length-1].type.startsWith("tag") ? "attr" : null;
                }
                self.scopes.push({
                    offset: offset,
                    type: type,
                    align: align,
                    tag_props: tag_props,
                    sub_type: sub_type,
                    tag_name: tag_name,
                    tag_style: tag_style
                });
            }
            token_lexer (stream) {
                var ՐՏ_19, ՐՏ_20, ՐՏ_21, ՐՏ_22;
                var self = this;
                var style, current, scope, def_tag_attrs, re_attr, attr_value, delimiter_index;
                style = self.tokenize(stream);
                current = stream.current();
                if (current === ".") {
                    style = stream.match(identifiers, false) ? null : ERRORCLASS;
                    if ((style === (ՐՏ_19 = null) || typeof style === "object" && ՐՏ_eq(style, ՐՏ_19)) && self.lastStyle === "meta") {
                        style = "meta";
                    }
                    return style;
                }
                if (current === "@") {
                    self.js_str_expect = true;
                    return stream.match(identifiers, false) ? "meta" : ERRORCLASS;
                }
                if ((style === "variable" || style === "builtin") && self.lastStyle === "meta") {
                    style = "meta";
                }
                scope = self.scopes[self.scopes.length-1];
                if (scope.type.startsWith("tag")) {
                    if (style === "def" || style === "tag") {
                        self.tag_name = current;
                        self.tag_style = style;
                        if (style === "tag" && (def_tag_attrs = self.def_tags ? self.def_tags[current] : null)) {
                            self.tag_spec_attrs = Object.assign({}, def_tag_attrs);
                        }
                        if (ՐՏ_in(self.tag_name, [ "v-pyj", "v-css" ])) {
                            style = "keyword";
                        }
                    } else if (current === ":") {
                        if (stream.match(/^(\s|#.*)*$/, false)) {
                            self.push_scope(stream, "tag");
                        } else {
                            self.push_scope(stream, "tag_inline");
                        }
                    }
                } else if (scope.sub_type === "attr") {
                    if (current === ":" && /^(,|\(|v-bind)$/.test(self.lastToken) || /^(v-for|v-if|v-show|v-else-if)$/.test(self.lastToken)) {
                        self.js_str_expect = true;
                    } else if (style === "attribute" && (self.lastToken === "%" || current === "type")) {
                        re_attr = /^\s*=\s*('|")([^'"]+)\1/;
                        attr_value = stream.match(re_attr, false);
                        attr_value = attr_value ? attr_value[2] : true;
                        if (self.tag_style === "def") {
                            if (!self.def_tags) {
                                self.def_tags = {};
                            }
                            if (!self.def_tags[self.tag_name]) {
                                self.def_tags[self.tag_name] = {};
                            }
                            self.def_tags[self.tag_name][current] = attr_value;
                        } else {
                            self.tag_spec_attrs = self.tag_spec_attrs || {};
                            self.tag_spec_attrs[current] = attr_value;
                        }
                    }
                }
                if (style && style.startsWith("punctuation")) {
                    delimiter_index = current.length === 1 ? "[({".indexOf(current) : -1;
                    if ((delimiter_index !== (ՐՏ_20 = -1) && (typeof delimiter_index !== "object" || !ՐՏ_eq(delimiter_index, ՐՏ_20)))) {
                        self.push_scope(stream, "])}"[delimiter_index]);
                    } else {
                        delimiter_index = "])}".indexOf(current);
                        if ((delimiter_index !== (ՐՏ_21 = -1) && (typeof delimiter_index !== "object" || !ՐՏ_eq(delimiter_index, ՐՏ_21)))) {
                            if (((ՐՏ_22 = self.scopes[self.scopes.length-1].type) === current || typeof ՐՏ_22 === "object" && ՐՏ_eq(ՐՏ_22, current))) {
                                self.scopes.pop();
                            } else {
                                return ERRORCLASS;
                            }
                        }
                    }
                }
                return style;
            }
        }
        rml_mode = new RML_mode();
        function start_state(basecolumn) {
            return rml_mode.start_state(basecolumn);
        }
        function token(stream, state) {
            var ՐՏ_23, ՐՏ_24;
            var scope, r, local_state, mode_name, mode, style, current;
            scope = state.scopes[state.scopes.length-1];
            if (stream.sol()) {
                if (stream.match(/^\s*$/)) {
                    return null;
                }
                function get_mode() {
                    if (scope.tag_name === "v-pyj" || scope.type === "tag" && scope.tag_props && scope.tag_props.compiler) {
                        return "rapydscript";
                    }
                    if (ՐՏ_in(scope.tag_name, [ "v-css", "style" ])) {
                        return "css";
                    }
                    if (scope.tag_name === "script" || scope.type === "tag" && scope.tag_props && scope.tag_props.type === "text/javascript") {
                        return "javascript";
                    }
                }
                r = null;
                if (!(local_state = state.local_state) && (mode_name = get_mode())) {
                    if (stream.indentation() >= scope.offset || ((ՐՏ_23 = scope.offset - indentUnit) === (ՐՏ_24 = stream.indentation()) || typeof ՐՏ_23 === "object" && ՐՏ_eq(ՐՏ_23, ՐՏ_24)) && (r = stream.match(/^(\s*)\+{3}(\s|#.*)*$/))) {
                        mode = CodeMirror.getMode(conf, mode_name);
                        state.local_state = CodeMirror.startState(mode, stream.indentation());
                        state.local_mode = mode;
                    }
                    if (r) {
                        rml_mode.load_state(state);
                        rml_mode.push_scope(stream, r[1] + "---");
                        rml_mode.update_state(state);
                        return "operator";
                    }
                } else if (local_state && !(local_state.tokenize && local_state.tokenize.isString) && (scope.type === "tag" && stream.indentation() < scope.offset || scope.type.endsWith("---") && (r = stream.match(new RegExp("^" + scope.type + "(\\s*|#.*)*$"))))) {
                    state.local_state = null;
                    state.local_mode = null;
                    if (r) {
                        state.scopes.pop();
                        return "operator";
                    }
                }
            }
            if (state.local_mode) {
                return state.local_mode.token(stream, state.local_state);
            }
            rml_mode.load_state(state);
            style = rml_mode.token_lexer(stream);
            if (style) {
                rml_mode.lastStyle = style;
            }
            current = stream.current();
            if (current && style) {
                rml_mode.lastToken = current;
            }
            if (stream.eol() && ՐՏ_in(rml_mode.scopes[rml_mode.scopes.length-1].type, [ '"', "'" ])) {
                rml_mode.scopes.pop();
                style = ERRORCLASS;
            }
            rml_mode.update_state(state);
            return style;
        }
        function indent(state, textAfter) {
            var ՐՏ_25, ՐՏ_26, ՐՏ_27, ՐՏ_28, ՐՏ_29, ՐՏ_30;
            var scope, closing;
            if (state.local_mode) {
                if (state.local_mode.indent) {
                    return state.local_mode.indent(state.local_state, textAfter);
                } else {
                    return CodeMirror.Pass;
                }
            }
            if (((ՐՏ_25 = state.tokenize) !== (ՐՏ_26 = rml_mode.token_base) && (typeof ՐՏ_25 !== "object" || !ՐՏ_eq(ՐՏ_25, ՐՏ_26)))) {
                return state.tokenize && state.tokenize.isString ? CodeMirror.Pass : 0;
            }
            scope = state.scopes[state.scopes.length-1];
            if (scope.type === '"' || scope.type === "'") {
                return CodeMirror.Pass;
            }
            closing = textAfter && ((ՐՏ_27 = textAfter.charAt(0)) === (ՐՏ_28 = scope.type) || typeof ՐՏ_27 === "object" && ՐՏ_eq(ՐՏ_27, ՐՏ_28));
            if (((ՐՏ_29 = scope.align) !== (ՐՏ_30 = null) && (typeof ՐՏ_29 !== "object" || !ՐՏ_eq(ՐՏ_29, ՐՏ_30)))) {
                return scope.align - (closing && state.lastToken !== "," ? 1 : 0);
            } else if (closing && state.scopes.length > 1) {
                return state.scopes[state.scopes.length-2].offset;
            } else {
                return scope.offset;
            }
        }
        external = {
            startState: start_state,
            token: token,
            indent: indent,
            lineComment: "#",
            fold: "indent",
            electricInput: /^\s*[\}\]\)]$/,
            copyState: function(state) {
                return rml_mode.copy_state(state);
            },
            innerMode: function(state) {
                if (state.local_state) {
                    return {
                        state: state.local_state,
                        mode: state.local_mode
                    };
                } else {
                    return null;
                }
            }
        };
        return external;
    }
    ՐՏ_modules["asset.cm_vuepy"]["MODE_NAME"] = MODE_NAME;
    ՐՏ_modules["asset.cm_vuepy"]["CodeMirror"] = CodeMirror;
    ՐՏ_modules["asset.cm_vuepy"]["reg_mode"] = reg_mode;
    ՐՏ_modules["asset.cm_vuepy"]["arr2hash"] = arr2hash;
    ՐՏ_modules["asset.cm_vuepy"]["wordRegexp"] = wordRegexp;
    ՐՏ_modules["asset.cm_vuepy"]["def_mode"] = def_mode;
})();

(function(){
    var __name__ = "asset.cm_rapydscript";

    var MODE_NAME, CodeMirror;
    MODE_NAME = "rapydscript";
    CodeMirror = null;
    function reg_mode(CM) {
        CodeMirror = CM;
        CM.defineMode(MODE_NAME, def_mode);
    }
    function arr2hash(arr) {
        var ret;
        ret = {};
        arr.forEach(function(it) {
            ret[it] = true;
        });
        return ret;
    }
    function wordRegexp(words) {
        return new RegExp("^((" + words.join(")|(") + "))\\b");
    }
    function def_mode(conf, parserConf) {
        var ERRORCLASS, punc, tripleOperators, doubleOperators, singleOperators, wordOperators, identifiers, indentUnit, hangingIndent, stringPrefixes, commonKeywords, commonBuiltins, py2, py3, _keywords, _builtins, keywords, builtins, rs_mode, external;
        ERRORCLASS = "error";
        punc = parserConf.punctuation || /^[\(\)\[\]\{\}@,:`;\.\\]/;
        tripleOperators = parserConf.tripleOperators || /^((\/\/=)|(>>=)|(<<=)|(\*\*=))/;
        doubleOperators = parserConf.doubleOperators || /^((==)|(!=)|(<=)|(>=)|(<>)|(<<)|(>>)|(\/\/)|(\*\*)|(\+=)|(\-=)|(\*=)|(%=)|(\/=)|(&=)|(\|=)|(\^=))/;
        singleOperators = parserConf.singleOperators || /^[\+\-\*\/%&|\^~<>!=\?]/;
        wordOperators = wordRegexp([ "and", "or", "not", "is", "in", "del" ]);
        identifiers = parserConf.identifiers || new RegExp("^[_A-Za-z$][_A-Za-z0-9$]*");
        indentUnit = conf.indentUnit;
        hangingIndent = parserConf.hangingIndent || indentUnit;
        stringPrefixes = new RegExp("^(([rub]|(ur)|(br))?('{3}|\"{3}|['\"]))", "i");
        commonKeywords = [ "as", "assert", "break", "class", "continue", "def", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "lambda", "pass", "raise", "return", "try", "while", "with", "yield" ];
        commonBuiltins = [ "abs", "all", "any", "bin", "bool", "bytearray", "callable", "chr", "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", "eval", "filter", "float", "format", "frozenset", "getattr", "globals", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open", "ord", "pow", "property", "range", "repr", "reversed", "round", "set", "setattr", "slice", "sorted", "staticmethod", "str", "sum", "super", "tuple", "type", "vars", "zip", "__import__", "NotImplemented", "Ellipsis", "__debug__" ];
        py2 = {
            builtins: [ "apply", "basestring", "buffer", "cmp", "coerce", "execfile", "file", "intern", "long", "raw_input", "reduce", "reload", "unichr", "unicode", "xrange", "False", "True", "None" ],
            keywords: [ "exec", "print" ]
        };
        py3 = {
            builtins: [ "ascii", "bytes", "exec", "print" ],
            keywords: [ "nonlocal", "False", "True", "None" ]
        };
        _keywords = commonKeywords.concat(py2.keywords);
        _builtins = commonBuiltins.concat(py2.builtins);
        _keywords = _keywords.concat(py3.keywords);
        _builtins = _builtins.concat(py3.builtins);
        if (parserConf.extra_keywords) {
            _keywords = _keywords.concat(parserConf.extra_keywords);
        }
        if (parserConf.extra_builtins) {
            _builtins = _builtins.concat(parserConf.extra_builtins);
        }
        keywords = arr2hash(_keywords);
        builtins = arr2hash(_builtins);
        CodeMirror.registerHelper("hintWords", MODE_NAME, _keywords.concat(_builtins));
        class RS_mode {
            start_state (basecolumn) {
                var self = this;
                return {
                    tokenize: self.token_base,
                    scopes: [ {
                        offset: basecolumn || 0,
                        type: "py",
                        align: null,
                        inline: null
                    } ],
                    lastStyle: null,
                    lastToken: null,
                    lastPunc: null,
                    dedent: 0,
                    indent: null,
                    is_glueLine: false,
                    block_expect: false
                };
            }
            load_state (state) {
                var self = this;
                Object.assign(self, state);
            }
            update_state (state) {
                var self = this;
                var st_keys;
                st_keys = Object.keys(self.start_state());
                st_keys.forEach(function(k) {
                    state[k] = self[k];
                });
            }
            dedent_process (stream) {
                var ՐՏ_31;
                var self = this;
                var indented, scopes;
                indented = stream.indentation();
                scopes = self.scopes;
                while (scopes[scopes.length-1].offset > indented && scopes[scopes.length-1].type === "py") {
                    scopes.pop();
                }
                return {
                    error: scopes.type === "py" && ((ՐՏ_31 = scopes[scopes.length-1].offset) !== indented && (typeof ՐՏ_31 !== "object" || !ՐՏ_eq(ՐՏ_31, indented)))
                };
            }
            token_re (stream) {
                var self = this;
                var escaped, inSet, next;
                escaped = false;
                inSet = false;
                while (next = stream.next()) {
                    if (!escaped) {
                        if (next === "/" && !inSet) {
                            return;
                        }
                        if (next === "[") {
                            inSet = true;
                        } else if (inSet && next === "]") {
                            inSet = false;
                        }
                    }
                    escaped = !escaped && next === "\\";
                }
            }
            token_base (stream) {
                var self = this;
                var sol, block_expect, indent, scope_offset, line_offset;
                sol = stream.sol() && !self.is_glueLine;
                if (sol) {
                    block_expect = self.block_expect;
                    self.block_expect = false;
                    indent = self.indent = stream.indentation();
                    scope_offset = self.scopes[self.scopes.length-1].offset;
                    line_offset = indent;
                    if (line_offset > scope_offset && block_expect) {
                        self.push_scope(stream, "py", line_offset);
                    } else if (self.scopes[self.scopes.length-1].type === "py" && line_offset < scope_offset && self.dedent_process(stream).error) {
                        stream.skipToEnd();
                        return ERRORCLASS;
                    }
                }
                return self.token_baseInner(stream);
            }
            token_baseInner (stream) {
                var self = this;
                var ch, w, addClass;
                if (stream.eatSpace()) {
                    return null;
                }
                ch = stream.peek();
                if (ch === "#") {
                    stream.skipToEnd();
                    return "comment";
                }
                if (stream.match(/^[0-9\.]/, false)) {
                    if (stream.match(/^\d*\.\d+(e[\+\-]?\d+)?/i) || stream.match(/^\d+\.\d*/) || stream.match(/^\.\d+/)) {
                        stream.eat(/J/i);
                        return "number";
                    }
                    if (stream.match(/^0x[0-9a-f]+/i) || stream.match(/^0b[01]+L?/i) || stream.match(/^0o[0-7]+L?/i) || stream.match(/^[0-9]\d*(e[\+\-]?\d+)?(L|J)?/i)) {
                        return "number";
                    }
                }
                if (stream.match(stringPrefixes)) {
                    self.tokenize = self.token_string_factory(stream.current());
                    return self.tokenize(stream);
                }
                if (stream.match(tripleOperators) || stream.match(doubleOperators) || stream.match(wordOperators)) {
                    return "operator";
                }
                if (stream.eat("/")) {
                    if (!self.lastToken || self.lastStyle === "operator" || ՐՏ_in(self.lastToken, [ "return", "if", "elif", "while", "in" ]) || /^[\[{\(:=,]$/.test(self.lastToken)) {
                        self.token_re(stream);
                        stream.match(/^\b(([gimyu])(?![gimyu]*\2))+\b/);
                        return "string-2";
                    } else {
                        return "operator";
                    }
                }
                if (stream.match(singleOperators)) {
                    return "operator";
                }
                if (stream.match(punc)) {
                    return "punctuation";
                }
                if (w = stream.match(identifiers)) {
                    w = w[0];
                    if (keywords[w] || /^(get|set)$/.test(w) && stream.match(/ +[_A-Za-z$]/, false)) {
                        return "keyword";
                    }
                    if (builtins[w]) {
                        return "builtin";
                    }
                    if (/^(self|cls)\b/.test(w)) {
                        return "variable-2";
                    } else {
                        addClass = w.startsWith("$") ? " variable-buck" : "";
                        return (/^(def|class|get|set)$/.test(self.lastToken) ? "def" : "variable") + addClass;
                    }
                }
                stream.next();
                return ERRORCLASS;
            }
            token_string_factory (delimiter) {
                var self = this;
                var singleline, OUTCLASS;
                while ("rub".indexOf(delimiter.charAt(0).toLowerCase()) >= 0) {
                    delimiter = delimiter.substr(1);
                }
                singleline = delimiter.length === 1;
                OUTCLASS = "string";
                function token_string(stream) {
                    while (!stream.eol()) {
                        stream.eatWhile(/[^'"\\]/);
                        if (stream.eat("\\")) {
                            stream.next();
                            if (singleline && stream.eol()) {
                                return OUTCLASS;
                            }
                        } else if (stream.match(delimiter)) {
                            self.tokenize = self.token_base;
                            return OUTCLASS;
                        } else {
                            stream.eat(/['"]/);
                        }
                    }
                    if (singleline) {
                        if (parserConf.singleLineStringErrors) {
                            return ERRORCLASS;
                        } else {
                            self.tokenize = self.token_base;
                        }
                    }
                    return OUTCLASS;
                }
                token_string.isString = true;
                return token_string;
            }
            push_scope (stream, type, line_offset) {
                var self = this;
                var offset, align, inline, tmp;
                offset = 0;
                align = null;
                inline = false;
                if (type !== ")" && self.scopes[self.scopes.length-1].type === "def") {
                    self.scopes.pop();
                }
                if (type === "py") {
                    offset = line_offset;
                    self.block_expect = false;
                } else if (type === "def") {
                    tmp = self.scopes[self.scopes.length-1];
                    offset = tmp.offset || 0;
                    align = tmp.align;
                } else {
                    if (!stream.match(/^(\s|#.*)*$/, false)) {
                        offset = self.scopes[self.scopes.length-1].offset;
                        inline = true;
                    } else {
                        offset = self.scopes[self.scopes.length-1].offset + hangingIndent;
                    }
                }
                self.scopes.push({
                    offset: offset,
                    type: type,
                    align: align,
                    inline: inline
                });
            }
            token_lexer (stream) {
                var ՐՏ_32, ՐՏ_33, ՐՏ_34, ՐՏ_35;
                var self = this;
                var style, current, eol, delimiter_index;
                style = self.tokenize(stream);
                current = stream.current();
                self.is_glueLine = false;
                eol = stream.eol();
                if (!eol) {
                    if (current === "def" && self.scopes[self.scopes.length-1].type !== "py") {
                        self.push_scope(stream, "def");
                        return style;
                    }
                } else if (current !== "(" && self.scopes[self.scopes.length-1].type === "def") {
                    self.scopes.pop();
                    self.block_expect = false;
                }
                if (current === ".") {
                    style = stream.match(identifiers, false) ? null : ERRORCLASS;
                    if ((style === (ՐՏ_32 = null) || typeof style === "object" && ՐՏ_eq(style, ՐՏ_32)) && self.lastStyle === "meta") {
                        style = "meta";
                    }
                    return style;
                }
                if (current === "@") {
                    return stream.match(identifiers, false) ? "meta" : ERRORCLASS;
                }
                if ((style === "variable" || style === "builtin") && self.lastStyle === "meta") {
                    style = "meta";
                }
                if (self.scopes[self.scopes.length-1].type === "py" && (current === "pass" || current === "return")) {
                    ++self.dedent;
                }
                if (current === ":") {
                    if (stream.match(/^(\s|#.*)*$/, false)) {
                        self.block_expect = self.block_expect || self.scopes[self.scopes.length-1].type === "py";
                    }
                } else {
                    delimiter_index = current.length === 1 ? "[({".indexOf(current) : -1;
                    if ((delimiter_index !== (ՐՏ_33 = -1) && (typeof delimiter_index !== "object" || !ՐՏ_eq(delimiter_index, ՐՏ_33)))) {
                        self.push_scope(stream, "])}"[delimiter_index]);
                    } else {
                        delimiter_index = "])}".indexOf(current);
                        if ((delimiter_index !== (ՐՏ_34 = -1) && (typeof delimiter_index !== "object" || !ՐՏ_eq(delimiter_index, ՐՏ_34)))) {
                            if (((ՐՏ_35 = self.scopes[self.scopes.length-1].type) === current || typeof ՐՏ_35 === "object" && ՐՏ_eq(ՐՏ_35, current))) {
                                self.scopes.pop();
                                if (current === ")" && self.scopes[self.scopes.length-1].type === "def") {
                                    self.scopes.pop();
                                    if (!eol) {
                                        self.block_expect = true;
                                    }
                                }
                            } else {
                                return ERRORCLASS;
                            }
                        }
                    }
                }
                if (self.dedent > 0 && eol && !self.is_glueLine && self.scopes[self.scopes.length-1].type === "py") {
                    if (self.scopes.length > 1) {
                        self.scopes.pop();
                    }
                    --self.dedent;
                }
                if (style === "punctuation" && current === "\\") {
                    if (eol) {
                        self.is_glueLine = true;
                    } else {
                        stream.skipToEnd();
                        style = ERRORCLASS;
                    }
                }
                return style;
            }
        }
        rs_mode = new RS_mode();
        function start_state(basecol) {
            return rs_mode.start_state(basecol);
        }
        function token(stream, state) {
            var style, current;
            rs_mode.load_state(state);
            style = rs_mode.token_lexer(stream);
            if (!rs_mode.is_glueLine) {
                if (style) {
                    rs_mode.lastStyle = style;
                }
                current = stream.current();
                if (current && style) {
                    rs_mode.lastToken = current;
                }
                if (stream.eol() && rs_mode.scopes[rs_mode.scopes.length-1].type === ":") {
                    rs_mode.scopes.pop();
                    style = ERRORCLASS;
                }
            }
            rs_mode.update_state(state);
            return style;
        }
        function indent(state, textAfter) {
            var ՐՏ_36, ՐՏ_37, ՐՏ_38, ՐՏ_39;
            var scope, closing, n, add_offset, slen;
            rs_mode.load_state(state);
            if (rs_mode.tokenize && ((ՐՏ_36 = rs_mode.tokenize) !== (ՐՏ_37 = rs_mode.token_base) && (typeof ՐՏ_36 !== "object" || !ՐՏ_eq(ՐՏ_36, ՐՏ_37)))) {
                return rs_mode.tokenize.isString ? CodeMirror.Pass : 0;
            }
            scope = rs_mode.scopes[rs_mode.scopes.length-1];
            closing = textAfter && ((ՐՏ_38 = textAfter.charAt(0)) === (ՐՏ_39 = scope.type) || typeof ՐՏ_38 === "object" && ՐՏ_eq(ՐՏ_38, ՐՏ_39));
            if (rs_mode.block_expect) {
                if (!closing) {
                    n = 1;
                    add_offset = indentUnit;
                } else if (rs_mode.scopes.length > 1) {
                    n = 2;
                    add_offset = 0;
                }
                slen = rs_mode.scopes.length;
                while (n < slen && rs_mode.scopes[slen - n].inline) {
                    ++n;
                }
                return rs_mode.scopes[slen - n].offset + add_offset;
            } else if (closing && rs_mode.scopes.length > 1) {
                n = 2;
                slen = rs_mode.scopes.length;
                while (n < slen && rs_mode.scopes[slen - n].inline) {
                    ++n;
                }
                return rs_mode.scopes[slen - n].offset;
            } else {
                return scope.inline ? scope.offset + indentUnit : scope.offset;
            }
        }
        external = {
            startState: start_state,
            token: token,
            indent: indent,
            lineComment: "#",
            fold: "indent",
            electricInput: /^\s*[\}\]\)]$/
        };
        return external;
        '\n        words = def(str): return str.split(" ");\n\n\n        CodeMirror.defineMIME("text/x-cython", {\n            name: "python",\n            extra_keywords: words("by cdef cimport cpdef ctypedef enum except"+\n                              "extern gil include nogil property public"+\n                              "readonly struct union DEF IF ELIF ELSE")\n\n    ';
    }
    ՐՏ_modules["asset.cm_rapydscript"]["MODE_NAME"] = MODE_NAME;
    ՐՏ_modules["asset.cm_rapydscript"]["CodeMirror"] = CodeMirror;
    ՐՏ_modules["asset.cm_rapydscript"]["reg_mode"] = reg_mode;
    ՐՏ_modules["asset.cm_rapydscript"]["arr2hash"] = arr2hash;
    ՐՏ_modules["asset.cm_rapydscript"]["wordRegexp"] = wordRegexp;
    ՐՏ_modules["asset.cm_rapydscript"]["def_mode"] = def_mode;
})();

(function(){
    var __name__ = "asset";

    ՐՏ_modules["asset"]["fs_path"] = ՐՏ_modules["asset.fs_path"];
    ՐՏ_modules["asset"]["fs"] = ՐՏ_modules["asset.fs"];
    ՐՏ_modules["asset"]["rs_vue"] = ՐՏ_modules["asset.rs_vue"];
    ՐՏ_modules["asset"]["common"] = ՐՏ_modules["asset.common"];
    ՐՏ_modules["asset"]["html_ml"] = ՐՏ_modules["asset.html_ml"];
    ՐՏ_modules["asset"]["vuepy_parser"] = ՐՏ_modules["asset.vuepy_parser"];
    ՐՏ_modules["asset"]["vuepy_compiler"] = ՐՏ_modules["asset.vuepy_compiler"];
    ՐՏ_modules["asset"]["vuepy_output"] = ՐՏ_modules["asset.vuepy_output"];
    ՐՏ_modules["asset"]["cm_vuepy"] = ՐՏ_modules["asset.cm_vuepy"];
    ՐՏ_modules["asset"]["cm_rapydscript"] = ՐՏ_modules["asset.cm_rapydscript"];
    var fs = ՐՏ_modules["asset.fs"];
    var fs_path = ՐՏ_modules["asset.fs_path"];
    
})();

(function(){
    var __name__ = "components.confirm";

    var templ, vc;
    templ = "\n<div  class = 'confirm lifted'>\n    <div>{{message}}</div>\n    <div  style = 'text-align:right;padding-top:10px;'>\n        <button  type = 'button' @click = '$emit(\"close\", \"ok\")'>OK</button>\n        <button  type = 'button' @click = '$emit(\"close\", \"cancel\")'>Cancel</button>\n    </div>\n</div>\n";
    var RS_vue = ՐՏ_modules["asset.rs_vue"].RS_vue;
    var V_collector = ՐՏ_modules["asset.rs_vue"].V_collector;
    
    vc = new V_collector();
    class Confirm extends RS_vue {
        constructor () {
            super(vc);
            var self = this;
            self.template = templ;
            self.map_store = {};
            self.props = {
                message: String
            };
        }
        _init_data () {
            var self = this;
            var ret;
            ret = {};
            return ret;
        }
    }
    function make() {
        return new Confirm();
    }
    function main() {
    }
    if (__name__ === "__main__") {
        main();
    }
    ՐՏ_modules["components.confirm"]["templ"] = templ;
    ՐՏ_modules["components.confirm"]["vc"] = vc;
    ՐՏ_modules["components.confirm"]["Confirm"] = Confirm;
    ՐՏ_modules["components.confirm"]["make"] = make;
    ՐՏ_modules["components.confirm"]["main"] = main;
})();

(function(){
    var __name__ = "components.error";

    var templ, vc;
    templ = "\n<div  style = 'white-space:nowrap;'>\n    <template  v-if = 'err'>\n        <div>\n            {{err.message}}\n        </div>\n        <div  @click = 'open_file' style = 'cursor:pointer; text-align:right;' class = 'orange'>\n            {{err_lc.filename}}: [{{err_lc.line}}:{{err_lc.col}}]\n        </div>\n    </template>\n</div>\n";
    var V_collector = ՐՏ_modules["asset.rs_vue"].V_collector;
    var RS_vue = ՐՏ_modules["asset.rs_vue"].RS_vue;
    
    vc = new V_collector();
    var CError = (ՐՏ_40 = class CError extends RS_vue {
        constructor () {
            super(vc);
            var self = this;
            self.template = templ;
            self.map_store = {
                err: "compile_error",
                open: "/editor.open*",
                set_cursor: "/editor.set_cursor*"
            };
        }
        _init_data () {
            var self = this;
            var ret;
            ret = {};
            return ret;
        }
        err_lc () {
            var self = this;
            return self.err.readfile_error || self.err;
        }
        open_file () {
            var self = this;
            self.open(self.err_lc.filename, "w0");
            self.set_cursor(self.err_lc.line - 1, self.err_lc.col);
        }
    }, (function(){
        Object.defineProperties(ՐՏ_40.prototype, {
            err_lc: {
                enumerable: false, 
                writable: true, 
                value: vc.computed(ՐՏ_40.prototype.err_lc)
            },
            open_file: {
                enumerable: false, 
                writable: true, 
                value: vc.meth(ՐՏ_40.prototype.open_file)
            }
        });
    })(), ՐՏ_40);
    function make() {
        return new CError();
    }
    if (__name__ === "__main__") {
        main();
    }
    ՐՏ_modules["components.error"]["templ"] = templ;
    ՐՏ_modules["components.error"]["vc"] = vc;
    ՐՏ_modules["components.error"]["CError"] = CError;
    ՐՏ_modules["components.error"]["make"] = make;
})();

(function(){
    var __name__ = "components.app_selector";

    var templ, vc;
    templ = "\n<div  class = 'app_list lifted'>\n    <h5>Choose app to edit:</h5>\n    <ul>\n        <li  class = 'app_list-item' v-for = 'app in app_list'>\n            <a  :class = \"app == cur_app ? 'orange' : 'gray'\" class = 'btn' href = \"#\" @click = '$emit(\"close\", app)'>\n                {{app}}\n            </a>\n        </li>\n    </ul>\n    <div  style = 'text-align:right;'>\n        <button  type = 'button' class = 'blue' @click = '$emit(\"close\", \"cancel\")'>Cancel</button>\n    </div>\n</div>\n";
    var RS_vue = ՐՏ_modules["asset.rs_vue"].RS_vue;
    var V_collector = ՐՏ_modules["asset.rs_vue"].V_collector;
    
    vc = new V_collector();
    class App_selector extends RS_vue {
        constructor () {
            super(vc);
            var self = this;
            self.template = templ;
            self.map_store = {};
            self.props = {
                app_list: Array,
                cur_app: String
            };
        }
        _init_data () {
            var self = this;
            var ret;
            ret = {};
            return ret;
        }
    }
    function make() {
        return new App_selector();
    }
    function main() {
    }
    if (__name__ === "__main__") {
        main();
    }
    ՐՏ_modules["components.app_selector"]["templ"] = templ;
    ՐՏ_modules["components.app_selector"]["vc"] = vc;
    ՐՏ_modules["components.app_selector"]["App_selector"] = App_selector;
    ՐՏ_modules["components.app_selector"]["make"] = make;
    ՐՏ_modules["components.app_selector"]["main"] = main;
})();

(function(){
    var __name__ = "components.vform";

    var templ_form, vc;
    templ_form = "\n<div  class = 'container'>\n    <form  enctype = \"multipart/form-data\" ref = 'form' :name = 'form_name'>\n        <div  class = 'lifted rounded'>\n            <div  class = 'title center black '>\n                {{title}}\n            </div>\n            <div  class = 'padded'>\n                <div  v-for = 'field in fields' class = 'container'>\n                    <template  v-if = 'field.slot'>\n                        <slot  :field = 'field'></slot>\n                    </template>\n                    <template  v-else>\n                        <label  class = 'right' :class = 'label_w' v-html = 'field.label'></label>\n                        <div  :class = 'input_w'>\n                            <component  :is = 'map_component(field.type)' v-bind = 'field.cmp_args'></component>\n                        </div>\n                    </template>\n                </div>\n                <div  class = 'container'>\n                    <label  :class = 'label_w'>\n                        \n                    </label>\n                    <div  :class = 'input_w' style = 'padding:0.3em'>\n                        <button  v-for = 'action in actions' class = 'btn' type = 'button' @click = 'fire(action)'>\n                            {{action}}\n                        </button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>\n";
    var V_collector = ՐՏ_modules["asset.rs_vue"].V_collector;
    var RS_vue = ՐՏ_modules["asset.rs_vue"].RS_vue;
    
    vc = new V_collector();
    var vForm = (ՐՏ_41 = class vForm extends RS_vue {
        constructor () {
            super(vc);
            var self = this;
            self.template = templ_form;
            self.props = {
                title: {
                    type: String,
                    default: "Form"
                },
                record: Object,
                fields: Array,
                label_w: {
                    type: String,
                    default: "quarter"
                },
                input_w: {
                    type: String,
                    default: "threequarters"
                },
                actions: Array,
                form_name: String
            };
        }
        _init_data () {
            var self = this;
            var ret;
            ret = {};
            return ret;
        }
        fire (action) {
            var self = this;
            var formData;
            formData = new FormData(self.$refs.form);
            self.$emit("action", action, formData);
        }
        map_component (ftype) {
            var self = this;
            return "input";
        }
    }, (function(){
        Object.defineProperties(ՐՏ_41.prototype, {
            fire: {
                enumerable: false, 
                writable: true, 
                value: vc.meth(ՐՏ_41.prototype.fire)
            },
            map_component: {
                enumerable: false, 
                writable: true, 
                value: vc.meth(ՐՏ_41.prototype.map_component)
            }
        });
    })(), ՐՏ_41);
    function make() {
        return new vForm();
    }
    if (__name__ === "__main__") {
    }
    ՐՏ_modules["components.vform"]["templ_form"] = templ_form;
    ՐՏ_modules["components.vform"]["vc"] = vc;
    ՐՏ_modules["components.vform"]["vForm"] = vForm;
    ՐՏ_modules["components.vform"]["make"] = make;
})();

(function(){
    var __name__ = "components.login";

    var templ_login, vc;
    templ_login = "\n<div  class = 'login'>\n    <vform  \n        form_name = 'login' \n        :fields = 'fields' \n        :actions = 'actions' \n        @action = 'login_click' \n        title = 'Login' \n        label_w = 'quarter' \n        style = 'width:300px'></vform>\n</div>\n";
    var vform = ՐՏ_modules["components.vform"];
    
    var V_collector = ՐՏ_modules["asset.rs_vue"].V_collector;
    var RS_vue = ՐՏ_modules["asset.rs_vue"].RS_vue;
    
    var asyncer = ՐՏ_modules["asset.common"].asyncer;
    
    vc = new V_collector();
    var Login = (ՐՏ_42 = class Login extends RS_vue {
        constructor () {
            super(vc);
            var self = this;
            self.template = templ_login;
            self.components = {
                vform: vform.make()
            };
            self.map_store = {
                "login": "login*",
                "is_logged": "is_logged",
                "flash": "flash*"
            };
        }
        _init_data () {
            var self = this;
            var ret;
            ret = {
                fields: [ {
                    label: '<i class="fa fa-key"></i>',
                    type: "password",
                    cmp_args: {
                        name: "password",
                        type: "password",
                        placeholder: "pwd"
                    }
                } ],
                actions: [ "OK" ]
            };
            return ret;
        }
        mounted () {
            var self = this;
            self.$el.style.visibility = "visible";
            self.$el.style.opacity = 1;
        }
        *login_click (action, data) {
            var self = this;
            yield self.login(data);
            if (self.is_logged) {
                self.$emit("close", true);
                self.flash("Hi!", "ok");
            } else {
                self.flash("invalid password", "error");
            }
        }
    }, (function(){
        Object.defineProperties(ՐՏ_42.prototype, {
            login_click: {
                enumerable: false, 
                writable: true, 
                value: vc.meth(asyncer(ՐՏ_42.prototype.login_click))
            }
        });
    })(), ՐՏ_42);
    function make() {
        return new Login();
    }
    if (__name__ === "__main__") {
    }
    ՐՏ_modules["components.login"]["templ_login"] = templ_login;
    ՐՏ_modules["components.login"]["vc"] = vc;
    ՐՏ_modules["components.login"]["Login"] = Login;
    ՐՏ_modules["components.login"]["make"] = make;
})();

(function(){
    var __name__ = "components.folder_content";

    var templ_folder_content, vc;
    templ_folder_content = "\n<div>\n    <span>\n        <ul  class = 'bar path'>\n            <li  v-for = 'dir in path' @click = 'change_dir(dir.id)'>\n                <span>\n                    {{dir.name}}\n                </span>\n            </li>\n            <li  class = 'hover_off'>\n                <input  ref = 'new' style = 'width:180px;' :value = 'save_as && save_as.name' placeholder = 'newfile.py'/>\n                <template  v-if = 'save_as'>\n                    <button  type = 'button' class = 'v-btn' @click = \"(action('save_as', {name: $refs.new.value, content: save_as.content}),  $refs.new.value ='')\">\n                        Save\n                    </button>\n                </template>\n                <template  v-else>\n                    <button  type = 'button' class = 'v-btn' @click = \"(action('create', $refs.new.value),  $refs.new.value ='')\">\n                        Create\n                    </button>\n                    <button  type = 'button' class = 'v-btn' @click = \"action('upload')\">\n                        Upload\n                    </button>\n                </template>\n            </li>\n        </ul>\n    </span>\n    <ul  class = 'bar'>\n        <li  v-for = 'it in actions' @click = 'it.disabled || action(it.name)' class = 'inverse' :disabled = 'it.disabled'>\n            {{it.label}}\n            <span  v-if = 'selected_cnt(it.name)>0' style = 'color:red;background-color:white; padding: 0 5px; border-radius: 10px;'>{{selected_cnt(it.name)}}</span>\n        </li>\n    </ul>\n    <table  class = 'folder'>\n        <thead>\n            <tr>\n                <th  v-for = 'fld, idx in fields' :colspan = 'idx == 0 ? 2 : 1'>\n                    {{fld.label}}\n                </th>\n                <th  v-if = 'row_actions'>\n                    actions\n                </th>\n            </tr>\n            <tr  style = 'height: 0px'>\n                <th  style = 'width:20px;'/>\n                <th  v-for = 'fld in fields' :style = \"{width: (fld.width || 'initial')}\"/>\n                <th  v-if = 'row_actions' style = 'width:50px;'/>\n            </tr>\n        </thead>\n    </table>\n    <div  style = 'max-height: 65vh; overflow:auto;'>\n        <table  class = 'folder'>\n            <thead>\n                <tr  style = 'height: 0px'>\n                    <th  style = 'width:20px;'/>\n                    <th  v-for = 'fld in fields' :style = \"{width: (fld.width || 'initial')}\"/>\n                    <th  v-if = 'row_actions' style = 'width:50px;'/>\n                </tr>\n            </thead>\n            <tbody>\n                <tr  v-for = 'row in rows_c' @click = 'toggle_select(row.id)' :key = 'row.id' :class = '{selected: selected[row.id]}'>\n                    <td>\n                        <i  class = 'clickable' :class = 'row._icon_.class' :style = 'row._icon_.style' @click.stop = 'click(row.id)'></i>\n                    </td>\n                    <td  v-for = 'fld, idx in fields'>\n                        <template  v-if = 'idx==0'>\n                            <span  class = 'clickable' @click.stop = 'click(row.id)'>\n                                {{row[fld.name]}}\n                            </span>\n                        </template>\n                        <template  v-else>\n                            <span>\n                                {{row[fld.name]}}\n                            </span>\n                        </template>\n                    </td>\n                    <td  v-if = 'row_actions'>\n                        <span  v-for = 'ract in row_actions(row)' style = 'margin-right:3px;'>\n                            <i  class = 'clickable' :class = 'ract.icon.class' :style = 'ract.icon.style' @click.stop = 'action(ract.name, row.id)'></i>\n                        </span>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>\n";
    var RS_vue = ՐՏ_modules["asset.rs_vue"].RS_vue;
    var V_collector = ՐՏ_modules["asset.rs_vue"].V_collector;
    
    var blur_click_listener = ՐՏ_modules["asset.common"].blur_click_listener;
    
    function it_by_path(obj, path) {
        var cur;
        if (!(path instanceof Array)) {
            path = path.split(".");
        }
        cur = obj;
        path.forEach(function(p) {
            cur = cur[p];
        });
        return cur;
    }
    vc = new V_collector();
    var Folder_content = (ՐՏ_43 = class Folder_content extends RS_vue {
        constructor () {
            super(vc);
            var self = this;
            self.template = templ_folder_content;
            self.map_store = {
                type_field: "/explorer.type_field",
                fields: "/explorer.fields",
                rows: "/explorer.list_dir",
                sort_by: "/explorer.sort_by",
                selected: "/explorer.selected",
                path: "/explorer.path_arr",
                save_as: "/explorer.save_as",
                row_actions: "/explorer.row_actions",
                toggle_select: "/explorer.toggle_select~",
                change_dir: "/explorer.set_dir~",
                click: "/explorer.click_item*",
                action: "/explorer.doit*",
                basket: "/explorer.basket",
                shown: "show_explorer"
            };
        }
        _init_data () {
            var self = this;
            var ret;
            ret = {
                actions: [ {
                    name: "copy",
                    label: "Copy"
                }, {
                    name: "cut",
                    label: "Cut",
                    disabled: true
                }, {
                    name: "paste",
                    label: "Paste"
                }, {
                    name: "del",
                    label: "Del"
                } ]
            };
            return ret;
        }
        toggle_select (mut, rid) {
            var self = this;
            var r;
            r = self.rows.find(function(it) {
                return it.id === rid;
            });
            if (r[self.type_field] === "file") {
                mut(rid);
            }
        }
        selected_cnt (act) {
            var self = this;
            if (act === "del") {
                return Object.keys(self.selected).length;
            } else if (act === "paste") {
                return self.basket.length - 1;
            }
        }
        save_as (n, o) {
            var self = this;
            self.$refs.new.value = n && n.name;
        }
        rows_c () {
            var ՐՏitr45, ՐՏidx45, ՐՏitr46, ՐՏidx46;
            var self = this;
            var type_icon, type_field, rows_sorted, sort_by, ret, row, rec, fld;
            type_icon = {
                file: {
                    class: "fa fa-file-o",
                    style: "color: gray"
                },
                dir: {
                    class: "fa fa-folder",
                    style: "color: gray"
                }
            };
            type_field = self.type_field || "type";
            rows_sorted = self.rows.slice(0);
            sort_by = self.sort_by || self.fields[0].name;
            rows_sorted.sort(function(a, b) {
                var a_type, b_type, ret;
                a_type = it_by_path(a, type_field);
                b_type = it_by_path(b, type_field);
                ret = a_type > b_type ? 1 : a_type < b_type ? -1 : 0;
                if (!ret) {
                    a = a[sort_by];
                    b = b[sort_by];
                    ret = a > b ? 1 : a < b ? -1 : 0;
                }
                return ret;
            });
            ret = [];
            ՐՏitr45 = ՐՏ_Iterable(rows_sorted);
            for (ՐՏidx45 = 0; ՐՏidx45 < ՐՏitr45.length; ՐՏidx45++) {
                row = ՐՏitr45[ՐՏidx45];
                rec = {
                    id: row.id
                };
                ՐՏitr46 = ՐՏ_Iterable(self.fields);
                for (ՐՏidx46 = 0; ՐՏidx46 < ՐՏitr46.length; ՐՏidx46++) {
                    fld = ՐՏitr46[ՐՏidx46];
                    rec[fld.name] = it_by_path(row, fld.name);
                    if (fld.formatter) {
                        rec[fld.name] = fld.formatter(rec[fld.name], row);
                    }
                }
                rec._icon_ = type_icon[row[type_field]];
                ret.push(rec);
            }
            return ret;
        }
        shown (n) {
            var self = this;
            if (n) {
                self.listener.start();
            } else {
                self.listener.stop();
            }
        }
        mounted () {
            var self = this;
            self.listener = blur_click_listener(self.$el, function(e) {
                self.$emit("blur", e);
            });
        }
        beforeDestroy () {
            var self = this;
            self.listener.stop();
        }
    }, (function(){
        Object.defineProperties(ՐՏ_43.prototype, {
            toggle_select: {
                enumerable: false, 
                writable: true, 
                value: vc.meth(ՐՏ_43.prototype.toggle_select)
            },
            selected_cnt: {
                enumerable: false, 
                writable: true, 
                value: vc.meth(ՐՏ_43.prototype.selected_cnt)
            },
            save_as: {
                enumerable: false, 
                writable: true, 
                value: vc.watch(ՐՏ_43.prototype.save_as)
            },
            rows_c: {
                enumerable: false, 
                writable: true, 
                value: vc.computed(ՐՏ_43.prototype.rows_c)
            },
            shown: {
                enumerable: false, 
                writable: true, 
                value: vc.watch(ՐՏ_43.prototype.shown)
            }
        });
    })(), ՐՏ_43);
    function make() {
        return new Folder_content();
    }
    if (__name__ === "__main__") {
        main();
    }
    ՐՏ_modules["components.folder_content"]["templ_folder_content"] = templ_folder_content;
    ՐՏ_modules["components.folder_content"]["vc"] = vc;
    ՐՏ_modules["components.folder_content"]["it_by_path"] = it_by_path;
    ՐՏ_modules["components.folder_content"]["Folder_content"] = Folder_content;
    ՐՏ_modules["components.folder_content"]["make"] = make;
})();

(function(){
    var __name__ = "components.editor";

    var templ_editor, vc;
    templ_editor = "\n<div>\n    <ul  class = 'doc_tabs'>\n        <li  v-for = 'doc, doc_k in doc_infos' :key = 'doc_k' :class = \"{active: doc_num == doc_k}\">\n            <span  @click = '(swap_doc(doc_k), edit_focus())'>\n                {{doc.name}}\n            </span>\n            <i  class = 'fa fa-close' @click = 'close(doc_k)' :style = '{color: doc.is_saved ? null : \"red\"}' :title = 'doc.is_saved ? null : \"not saved\"'></i>\n        </li>\n    </ul>\n    <div  v-if = '!doc_num' class = 'editor_welcome'>\n        <div>\n            <h2  style = 'background-color: white'>\n                <span  style = 'color: #42b983;'>Vue</span>\n                <span  class = 'v2p_char' style = 'color: black;'>{{w23p_ver}}</span>\n                <span  class = 'v2p_char' style = 'color: #006ea5;'>p</span>\n                <span  class = 'v2p_char' style = 'color: #bfa03b;'>y</span>\n                <i  class = 'v2p_char' style = 'color: #b00;'>j</i>\n            </h2>\n        </div>\n    </div>\n    <div  v-show = 'doc_num' class = 'editor_up_bar'>\n        <div  class = 'left'>\n            <span  class = 'doc_title'>{{doc_num && doc_info.name || \"\"}}</span>\n            <span>ln: {{cursor.line+1}} col: {{cursor.ch}}</span>\n        </div>\n        <div  class = 'right'>\n            <span>{{doc_path}}</span>\n        </div>\n    </div>\n    <div  v-show = 'doc_num' style = 'position:fixed; left:0; top:140px; bottom:0px; width:100%;'>\n        <div  style = 'position: absolute; top:0px; bottom:50px; width:100%; padding: 0 10px;'>\n            <div  ref = 'cm_el' style = 'height:100%;'></div>\n        </div>\n        <div  style = 'position:fixed; bottom:0px; height:45px;'>\n            <div  v-if = 'error' @click = 'go_error' style = 'cursor:pointer;'>\n                <div>\n                    File: {{error.filename}}\n                </div>\n                <template  v-if = 'error.readfile_error'>\n                    {{error.message}} {{error.readfile_error.line}}:{{error.readfile_error.col}}\n                </template>\n                <template  v-else>\n                    {{error.message}} {{error.line}}:{{error.col}}\n                </template>\n                <div>{{error.stack}}</div>\n            </div>\n            <div  v-else>ok</div>\n        </div>\n    </div>\n</div>\n";
    var RS_vue = ՐՏ_modules["asset.rs_vue"].RS_vue;
    var V_collector = ՐՏ_modules["asset.rs_vue"].V_collector;
    
    vc = new V_collector();
    var Editor = (ՐՏ_44 = class Editor extends RS_vue {
        constructor () {
            super(vc);
            var self = this;
            self.template = templ_editor;
            self.map_store = {
                get_fs: "get_fs",
                windows: "/editor.windows",
                doc_infos: "/editor.doc_infos",
                set_active_window: "/editor.set_active_window~",
                mount_cm: "/editor.mount_cm*",
                swap_doc: "/editor.swap_doc*",
                close: "/editor.close*",
                web23py: "web23py"
            };
        }
        _init_data () {
            var self = this;
            var ret;
            ret = {
                cursor: {
                    line: 0,
                    ch: 0
                },
                error: null
            };
            return ret;
        }
        w23p_ver () {
            var self = this;
            return /^.+(\d)/.exec(self.web23py)[1];
        }
        doc_num () {
            var self = this;
            return self.windows.w0 && self.windows.w0.doc_num;
        }
        doc_info () {
            var self = this;
            return self.doc_num && self.doc_infos[self.doc_num];
        }
        doc_path () {
            var self = this;
            var fs;
            if (!self.doc_info) {
                return;
            }
            fs = self.get_fs();
            return fs.path_by_id(self.doc_info.id).path;
        }
        mounted () {
            var self = this;
            function clean_up(cm) {
                self.cm = cm;
                self.set_active_window("w0");
                self.$refs.cm_el.children[0].style.lineHeight = "1.5";
                cm.on("cursorActivity", function() {
                    self.cursor_move();
                });
                cm.setSize("100%", "100%");
            }
            self.mount_cm(self.$refs.cm_el, "w0").then(clean_up);
        }
        edit_focus () {
            var self = this;
            self.$nextTick(function() {
                self.cm && self.cm.focus();
            });
        }
        cursor_move () {
            var self = this;
            self.cursor = self.cm.getCursor();
        }
        doc_num_watch (to_doc, cur_doc) {
            var self = this;
            self.$nextTick(function() {
                self.cm.refresh();
                self.cursor_move();
                self.edit_focus();
            });
        }
        go_error () {
            var ՐՏ_45, ՐՏ_46;
            var self = this;
            var err;
            err = self.error.readfile_error || self.error;
            if (!err || ((ՐՏ_45 = err.line) === (ՐՏ_46 = void 0) || typeof ՐՏ_45 === "object" && ՐՏ_eq(ՐՏ_45, ՐՏ_46))) {
                return;
            }
            self.cm.focus();
            self.cm.doc.setCursor(err.line - 1, err.col);
        }
    }, (function(){
        Object.defineProperties(ՐՏ_44.prototype, {
            w23p_ver: {
                enumerable: false, 
                writable: true, 
                value: vc.computed(ՐՏ_44.prototype.w23p_ver)
            },
            doc_num: {
                enumerable: false, 
                writable: true, 
                value: vc.computed(ՐՏ_44.prototype.doc_num)
            },
            doc_info: {
                enumerable: false, 
                writable: true, 
                value: vc.computed(ՐՏ_44.prototype.doc_info)
            },
            doc_path: {
                enumerable: false, 
                writable: true, 
                value: vc.computed(ՐՏ_44.prototype.doc_path)
            },
            edit_focus: {
                enumerable: false, 
                writable: true, 
                value: vc.meth(ՐՏ_44.prototype.edit_focus)
            },
            cursor_move: {
                enumerable: false, 
                writable: true, 
                value: vc.meth(ՐՏ_44.prototype.cursor_move)
            },
            doc_num_watch: {
                enumerable: false, 
                writable: true, 
                value: vc.watch("doc_num")(ՐՏ_44.prototype.doc_num_watch)
            },
            go_error: {
                enumerable: false, 
                writable: true, 
                value: vc.meth(ՐՏ_44.prototype.go_error)
            }
        });
    })(), ՐՏ_44);
    function make() {
        return new Editor();
    }
    function main() {
    }
    if (__name__ === "__main__") {
        main();
    }
    ՐՏ_modules["components.editor"]["templ_editor"] = templ_editor;
    ՐՏ_modules["components.editor"]["vc"] = vc;
    ՐՏ_modules["components.editor"]["Editor"] = Editor;
    ՐՏ_modules["components.editor"]["make"] = make;
    ՐՏ_modules["components.editor"]["main"] = main;
})();

(function(){
    var __name__ = "components.menu";

    var templ_menu, vc;
    templ_menu = "\n<div>\n    <ul  v-for = \"side in ['left', 'right']\" class = \"menu\" :class = '{right: side == \"right\"}'>\n        <li  v-for = 'item in menus[side]' :class = '{disabled: is_disabled(item) }'>\n            <template  v-if = 'item.href != undefined'>\n                <a  class = \"black\" :href = \"mount_prop(item.href)\" @click = 'click(item, $event)' v-bind = \"item.attrs\">\n                    <strong  v-html = 'mount_prop(item.label)'/>\n                </a>\n            </template>\n            <template  v-else-if = 'item.subitems'>\n                <a  class = \"black\" v-html = 'mount_prop(item.label)'></a>\n                <ul><li  v-for = 'subitem in item.subitems' :class = '{disabled: is_disabled(subitem) }'>\n                    <a  :href = \"mount_prop(subitem.href)\" @click = 'click(subitem, $event)' v-html = 'mount_prop(subitem.label)' v-bind = \"subitem.attrs\"></a>\n                </li></ul>\n            </template>\n            <template  v-else>\n                <slot  v-if = 'item.slot' :slot_name = 'item.slot'></slot>\n            </template>\n        </li>\n    </ul>\n</div>\n";
    var RS_vue = ՐՏ_modules["asset.rs_vue"].RS_vue;
    var V_collector = ՐՏ_modules["asset.rs_vue"].V_collector;
    
    var SF = ՐՏ_modules["asset.common"].SF;
    
    vc = new V_collector();
    var Menu = (ՐՏ_47 = class Menu extends RS_vue {
        constructor () {
            super(vc);
            var self = this;
            self.map_store = {
                w23p_app: "w23p_app"
            };
            self.template = templ_menu;
            self.props = {
                menus: Object
            };
        }
        _init_data () {
            var self = this;
            var ret;
            ret = {};
            return ret;
        }
        mount_prop (label) {
            var self = this;
            return SF(label, self);
        }
        click (item, e) {
            var self = this;
            if (item.href && item.href.startsWith("#cmd:")) {
                e.preventDefault();
            }
            setTimeout(function() {
                self.$emit("click_item", item, e);
            }, 0);
        }
        is_disabled (it) {
            var self = this;
            return false;
        }
    }, (function(){
        Object.defineProperties(ՐՏ_47.prototype, {
            mount_prop: {
                enumerable: false, 
                writable: true, 
                value: vc.meth(ՐՏ_47.prototype.mount_prop)
            },
            click: {
                enumerable: false, 
                writable: true, 
                value: vc.meth(ՐՏ_47.prototype.click)
            },
            is_disabled: {
                enumerable: false, 
                writable: true, 
                value: vc.meth(ՐՏ_47.prototype.is_disabled)
            }
        });
    })(), ՐՏ_47);
    function make() {
        return new Menu();
    }
    if (__name__ === "__main__") {
        main();
    }
    ՐՏ_modules["components.menu"]["templ_menu"] = templ_menu;
    ՐՏ_modules["components.menu"]["vc"] = vc;
    ՐՏ_modules["components.menu"]["Menu"] = Menu;
    ՐՏ_modules["components.menu"]["make"] = make;
})();

(function(){
    var __name__ = "components.flash";

    var templ_flash, vc;
    templ_flash = "\n<div  id = 'flash' :class = 'cls'>\n    <template  v-if = 'component'>\n        <component  :is = 'component' v-bind = 'cargs'></component>\n    </template>\n    <template  v-else>\n        {{msg}}\n    </template>\n</div>\n";
    var V_collector = ՐՏ_modules["asset.rs_vue"].V_collector;
    var RS_vue = ՐՏ_modules["asset.rs_vue"].RS_vue;
    
    vc = new V_collector();
    var Flash = (ՐՏ_48 = class Flash extends RS_vue {
        constructor () {
            super(vc);
            var self = this;
            self.template = templ_flash;
            self.map_store = {
                bus: "$bus",
                msg: "flash.msg",
                component: "flash.component",
                cargs: "flash.cargs",
                status: "flash.status"
            };
        }
        _init_data () {
            var self = this;
            var ret;
            self.hider = null;
            ret = {
                cls: ""
            };
            return ret;
        }
        mounted () {
            var self = this;
            self.bus.$on("flash", function() {
                self.show();
            });
        }
        show () {
            var self = this;
            var t;
            if (self.show.hider) {
                clearTimeout(self.show.hider);
                self.hide();
                self.$nextTick(function() {
                    self.show();
                });
                return;
            }
            self.cls = "show " + (self.status || "");
            t = 1e3;
            if (self.msg) {
                t = self.msg.split(/\W+/).length * 900;
                if (t > 4e3) {
                    t = 4e3;
                }
            }
            self.hider = setTimeout(self.hide, t);
        }
        hide () {
            var self = this;
            self.cls = "hide " + (self.status || "");
            self.hider = null;
        }
    }, (function(){
        Object.defineProperties(ՐՏ_48.prototype, {
            show: {
                enumerable: false, 
                writable: true, 
                value: vc.meth(ՐՏ_48.prototype.show)
            },
            hide: {
                enumerable: false, 
                writable: true, 
                value: vc.meth(ՐՏ_48.prototype.hide)
            }
        });
    })(), ՐՏ_48);
    function make() {
        return new Flash();
    }
    if (__name__ === "__main__") {
        main();
    }
    ՐՏ_modules["components.flash"]["templ_flash"] = templ_flash;
    ՐՏ_modules["components.flash"]["vc"] = vc;
    ՐՏ_modules["components.flash"]["Flash"] = Flash;
    ՐՏ_modules["components.flash"]["make"] = make;
})();

(function(){
    var __name__ = "components.base_layout";

    var templ, vc;
    templ = "\n<div>\n    <div  v-if = 'is_busy' class = 'busy' style = 'position: fixed; top:0; left:0; right:0; bottom: 0; z-index:9999'></div>\n    <header  class = \"black padded lifted fill\" style = 'position:fixed; z-index:1000; top:0'>\n        <modal></modal>\n        <div  class = \"container\" id = 'top_menu'>\n            <top_menu  class = \"fill middle\" :menus = 'menus' @click_item = 'menu_click.apply(this, arguments)'>\n                <template  slot-scope = 'props'>\n                    <template  v-if = \"props.slot_name == 'search'\">\n                        <div  style = 'display:inline-block; margin-right: 5px'>\n                            <input  class = \"l_rounded barinput\" placeholder = \"Not implemented\" style = 'width:initial'/>\n                            <div  class = 'btn barinput gray r_rounded' style = 'float:right;'>\n                                <i  class = 'fa fa-search' style = 'line-height:1.5'></i>\n                            </div>\n                        </div>\n                    </template>\n                    <template  v-else-if = \"props.slot_name == 'flash'\">\n                        <div  style = 'position:relative;'>\n                            <a  class = 'black'>\n                                <i  class = 'fa fa-bullhorn fa-flip-horizontal'></i>\n                            </a>\n                            <flash  ref = 'flash' class = 'flash' style = 'z-index:10000;'></flash>\n                        </div>\n                        <ul>\n                            <li>\n                                <a  class = 'hidden'></a>\n                                <div  class = 'flash' :class = 'flash.status'>\n                                    <template  v-if = 'flash.component'>\n                                        <component  :is = 'flash.component' v-bind = 'flash.cargs'></component>\n                                    </template>\n                                    <template  v-else>\n                                        {{flash.msg}}\n                                    </template>\n                                </div>\n                            </li>\n                        </ul>\n                    </template>\n                </template>\n            </top_menu>\n        </div>\n    </header>\n    <main>\n        <div  class = 'main' style = 'margin-top: 50px; min-height:90vh;'>\n            <slot></slot>\n        </div>\n        <div  v-html = '\"&nbsp;\"'></div>\n    </main>\n</div>\n";
    var V_collector = ՐՏ_modules["asset.rs_vue"].V_collector;
    var RS_vue = ՐՏ_modules["asset.rs_vue"].RS_vue;
    
    var menu = ՐՏ_modules["components.menu"];
    
    var flash = ՐՏ_modules["components.flash"];
    
    function get_app_opt() {
        var ret;
        ret = {};
        ret.routes = {
            view: "grid_doc",
            "new": "span",
            login: "login"
        };
        return ret;
    }
    vc = new V_collector();
    class Layout extends RS_vue {
        constructor () {
            super(vc);
            var self = this;
            self.template = templ;
            self.components = {
                "top_menu": menu.make(),
                "flash": flash.make()
            };
            self.map_store = {
                flash: "flash",
                is_busy: "is_busy",
                menus: "menus",
                menu_click: "menu_click*"
            };
        }
        _init_data () {
            var self = this;
            var app_opt, ret;
            app_opt = get_app_opt();
            ret = {
                routes: app_opt.routes
            };
            return ret;
        }
    }
    function make() {
        return new Layout();
    }
    ՐՏ_modules["components.base_layout"]["templ"] = templ;
    ՐՏ_modules["components.base_layout"]["vc"] = vc;
    ՐՏ_modules["components.base_layout"]["get_app_opt"] = get_app_opt;
    ՐՏ_modules["components.base_layout"]["Layout"] = Layout;
    ՐՏ_modules["components.base_layout"]["make"] = make;
})();

(function(){
    var __name__ = "components.modal";

    var templ, vc;
    templ = "\n<div  class = 'modal-container' v-if = 'modal_state.is_active'>\n    <component  :is = 'modal_state.inner_component' v-bind = 'modal_state.inner_args' @close = 'close_modal'></component>\n</div>\n";
    var RS_vue = ՐՏ_modules["asset.rs_vue"].RS_vue;
    var V_collector = ՐՏ_modules["asset.rs_vue"].V_collector;
    
    vc = new V_collector();
    class Modal extends RS_vue {
        constructor () {
            super(vc);
            var self = this;
            self.template = templ;
            self.map_store = {
                modal_state: "modal_state",
                close_modal: "close_modal*"
            };
        }
        _init_data () {
            var self = this;
            var ret;
            ret = {};
            return ret;
        }
    }
    function make() {
        return new Modal();
    }
    function main() {
    }
    if (__name__ === "__main__") {
        main();
    }
    ՐՏ_modules["components.modal"]["templ"] = templ;
    ՐՏ_modules["components.modal"]["vc"] = vc;
    ՐՏ_modules["components.modal"]["Modal"] = Modal;
    ՐՏ_modules["components.modal"]["make"] = make;
    ՐՏ_modules["components.modal"]["main"] = main;
})();

(function(){
    var __name__ = "components";

    ՐՏ_modules["components"]["confirm"] = ՐՏ_modules["components.confirm"];
    ՐՏ_modules["components"]["error"] = ՐՏ_modules["components.error"];
    ՐՏ_modules["components"]["app_selector"] = ՐՏ_modules["components.app_selector"];
    ՐՏ_modules["components"]["vform"] = ՐՏ_modules["components.vform"];
    ՐՏ_modules["components"]["login"] = ՐՏ_modules["components.login"];
    ՐՏ_modules["components"]["folder_content"] = ՐՏ_modules["components.folder_content"];
    ՐՏ_modules["components"]["editor"] = ՐՏ_modules["components.editor"];
    ՐՏ_modules["components"]["menu"] = ՐՏ_modules["components.menu"];
    ՐՏ_modules["components"]["flash"] = ՐՏ_modules["components.flash"];
    ՐՏ_modules["components"]["base_layout"] = ՐՏ_modules["components.base_layout"];
    ՐՏ_modules["components"]["modal"] = ՐՏ_modules["components.modal"];

})();

(function(){
    var __name__ = "store.editor";

    var EDITOR_DEFSTATE, vc;
    var V_collector = ՐՏ_modules["asset.rs_vue"].V_collector;
    var RS_store = ՐՏ_modules["asset.rs_vue"].RS_store;
    var RS_state_api = ՐՏ_modules["asset.rs_vue"].RS_state_api;
    
    var asyncer = ՐՏ_modules["asset.common"].asyncer;
    
    var cm_vuepy = ՐՏ_modules["asset.cm_vuepy"];
    var cm_rapydscript = ՐՏ_modules["asset.cm_rapydscript"];
    
    function window_state() {
        var ret;
        ret = {
            doc_num: null,
            width: 960,
            get_cm: null
        };
        return ret;
    }
    EDITOR_DEFSTATE = {
        doc_infos: {},
        last_doc_num: 0,
        vim_mode: false,
        active_window: null,
        windows: {}
    };
    vc = new V_collector();
    var State = (ՐՏ_49 = class State extends RS_state_api {
        constructor (vue, state) {
            super(vc, vue, state || EDITOR_DEFSTATE);
            var self = this;
        }
        add_window (win_id, st) {
            var self = this;
            st = Object.assign(window_state(), st);
            self.$set(self.state.windows, win_id, st);
        }
        set_active_window (win_id) {
            var self = this;
            self.state.active_window = win_id;
        }
        open (doc_info) {
            var self = this;
            var doc_num;
            doc_num = "#" + (++self.state.last_doc_num);
            self.$set(self.state.doc_infos, doc_num, doc_info);
            return doc_num;
        }
        set_doc_info (doc_num, doc_info) {
            var self = this;
            self.$set(self.state.doc_infos, doc_num, doc_info);
        }
        set_doc_change_gen (doc_num, gen) {
            var self = this;
            self.state.doc_infos[doc_num].change_gen = gen;
        }
        toggle_doc_saved (doc_num, onoff) {
            var self = this;
            var is_saved, ret;
            is_saved = self.state.doc_infos[doc_num].is_saved;
            ret = self.state.doc_infos[doc_num].is_saved = onoff === void 0 ? !is_saved : onoff;
        }
        close (doc_num) {
            var self = this;
            self.$del(self.state.doc_infos, doc_num);
        }
        swap_doc (doc_num, win_id) {
            var self = this;
            var w, old;
            old = (w = self.state.windows[win_id]).doc_num;
            w.doc_num = doc_num;
            return old;
        }
        toggle_vim (onoff) {
            var self = this;
            var ret;
            ret = self.state.vim = onoff === void 0 ? !self.state.vim : onoff;
            return ret;
        }
        set_error (doc_num, error) {
            var self = this;
            self.$set(self.state.doc_infos[doc_num], "error", error || null);
        }
        clear_error (doc_num) {
            var self = this;
            self.$set(self.state.doc_infos[doc_num], "error", null);
        }
        active_doc_num () {
            var self = this;
            var aw;
            aw = self.state.windows[self.state.active_window];
            return aw && aw.doc_num;
        }
    }, (function(){
        Object.defineProperties(ՐՏ_49.prototype, {
            add_window: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_49.prototype.add_window)
            },
            set_active_window: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_49.prototype.set_active_window)
            },
            open: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_49.prototype.open)
            },
            set_doc_info: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_49.prototype.set_doc_info)
            },
            set_doc_change_gen: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_49.prototype.set_doc_change_gen)
            },
            toggle_doc_saved: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_49.prototype.toggle_doc_saved)
            },
            close: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_49.prototype.close)
            },
            swap_doc: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_49.prototype.swap_doc)
            },
            toggle_vim: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_49.prototype.toggle_vim)
            },
            set_error: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_49.prototype.set_error)
            },
            clear_error: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_49.prototype.clear_error)
            },
            active_doc_num: {
                enumerable: false, 
                writable: true, 
                value: vc.getter(ՐՏ_49.prototype.active_doc_num)
            }
        });
    })(), ՐՏ_49);
    var Store = (ՐՏ_50 = class Store extends RS_store {
        constructor (root) {
            super();
            var self = this;
            self.root = root;
            self.api = {
                CM: root.api.CM
            };
            self.state_api = new State(self.vue);
            self.actions = vc._actions;
            self.cm_docs = {};
            self.cm_windows = {};
            self.init_cm();
            function on_changed(doc_num, cm_doc) {
                if (!on_changed.handlers) {
                    on_changed.handlers = {};
                    on_changed.tm = {};
                }
                if (on_changed.handlers[doc_num]) {
                    clearTimeout(on_changed.tm[doc_num]);
                } else {
                    on_changed.handlers[doc_num] = function() {
                        var is_saved;
                        is_saved = cm_doc.isClean(self.get("doc_infos")[doc_num].change_gen);
                        self.commit("toggle_doc_saved", doc_num, is_saved);
                        delete on_changed.handlers[doc_num];
                    };
                }
                on_changed.tm[doc_num] = setTimeout(on_changed.handlers[doc_num], 250);
            }
            self.$on("doc_changed", on_changed);
            self.$on("save", function(cm) {
                var doc_num;
                doc_num = self.doc_num_by_cm_doc(cm.doc);
                self.dispatch("save", doc_num);
            });
            self.$on("save_as", function(cm) {
                var doc_num, content, save_as;
                doc_num = self.doc_num_by_cm_doc(cm.doc);
                content = cm.doc.getValue();
                save_as = {
                    name: self.get("doc_infos")[doc_num].name,
                    content: content
                };
                self.root.commit("/explorer.save_as", save_as);
                self.root.commit("toggle_explorer", true);
            });
            self.$on("compile", function() {
                self.dispatch("compile_active_doc", false);
            });
        }
        trim_space (doc_num) {
            var self = this;
            var cm_doc, do_replace, cm;
            cm_doc = self.cm_docs[doc_num];
            do_replace = function() {
                var cursor;
                cursor = cm_doc.getSearchCursor(/\s+?$/);
                while (cursor.findNext()) {
                    cursor.replace("");
                }
            };
            cm = cm_doc.getEditor();
            if (cm) {
                cm.operation(do_replace);
            } else {
                do_replace();
            }
        }
        reload (doc_num_or_fid) {
            var self = this;
            var fs, doc_num, fid, cm_doc, cursor;
            fs = self.root.api.fs;
            doc_num = doc_num_or_fid;
            if (doc_num[0] === "#") {
                fid = self.get("doc_infos")[doc_num].id;
            } else {
                fid = doc_num;
                doc_num = self.doc_num_by_fid(fid);
                if (!doc_num) {
                    return;
                }
            }
            cm_doc = self.cm_docs[doc_num];
            cursor = cm_doc.getCursor();
            cm_doc.setValue(fs.files[fid].content);
            cm_doc.setCursor(cursor);
            self.commit("set_doc_change_gen", doc_num, cm_doc.changeGeneration());
            self.commit("toggle_doc_saved", doc_num, true);
        }
        *save_all () {
            var ՐՏitr47, ՐՏidx47;
            var self = this;
            var k;
            ՐՏitr47 = ՐՏ_Iterable(self.get("doc_infos"));
            for (ՐՏidx47 = 0; ՐՏidx47 < ՐՏitr47.length; ՐՏidx47++) {
                k = ՐՏitr47[ՐՏidx47];
                yield self.dispatch("save", k);
            }
        }
        save (doc_num) {
            var self = this;
            var fs, cm_doc, content, fid;
            self.dispatch("trim_space", doc_num);
            fs = self.root.api.fs;
            cm_doc = self.cm_docs[doc_num];
            content = cm_doc.getValue();
            fid = self.get("doc_infos")[doc_num].id;
            fs.write_file(fid, content);
            self.commit("set_doc_change_gen", doc_num, cm_doc.changeGeneration());
            self.commit("toggle_doc_saved", doc_num, true);
        }
        init_cm () {
            var self = this;
            var CM, defkeys;
            CM = self.api.CM;
            CM.defaults.indentUnit = 4;
            defkeys = CM.defaults.extraKeys = {};
            defkeys["Ctrl-Space"] = "autocomplete";
            defkeys["Ctrl-Enter"] = function(cm) {
                cm.showHint({
                    hint: CM.hint.anyword
                });
            };
            defkeys["Tab"] = "indentMore";
            defkeys["Shift-Tab"] = "indentLess";
            defkeys["Ctrl-O"] = function(cm) {
                self.$emit("open");
            };
            defkeys["Ctrl-S"] = function(cm) {
                self.$emit("save", cm);
            };
            defkeys["Ctrl-Alt-S"] = function(cm) {
                self.$emit("save_as", cm);
            };
            defkeys["Ctrl-D"] = function(cm) {
                self.$emit("close");
            };
            defkeys["Shift-Ctrl-C"] = function(cm) {
                self.$emit("new");
            };
            defkeys["Ctrl-F9"] = function(cm) {
                self.$emit("compile");
            };
            defkeys["Alt-V"] = function(cm) {
                self.dispatch("toggle_vim");
            };
            CM.commands.save = function(cm) {
                self.$emit("save", cm);
            };
            cm_rapydscript.reg_mode(CM);
            cm_vuepy.reg_mode(CM);
        }
        mount_cm (el, win_id, opt) {
            var self = this;
            var def_opt, cm;
            def_opt = {
                mode: "python",
                lineNumbers: true,
                showCursorWhenSelecting: true,
                matchBrackets: true
            };
            opt = Object.assign(def_opt, opt || {});
            cm = self.cm_windows[win_id] = self.api.CM(el, opt);
            self.commit("add_window", win_id, {
                get_cm: function() {
                    return cm;
                }
            });
            return cm;
        }
        *close_all () {
            var ՐՏitr48, ՐՏidx48;
            var self = this;
            var all_closed, k, maybe_canceled;
            all_closed = true;
            ՐՏitr48 = ՐՏ_Iterable(self.get("doc_infos"));
            for (ՐՏidx48 = 0; ՐՏidx48 < ՐՏitr48.length; ՐՏidx48++) {
                k = ՐՏitr48[ՐՏidx48];
                maybe_canceled = yield self.dispatch("close", k);
                if (maybe_canceled === "cancel") {
                    all_closed = false;
                }
            }
            return all_closed;
        }
        *close (doc_num) {
            var ՐՏitr49, ՐՏidx49;
            var self = this;
            var doc_info, ok_cancel, aw, cur_doc_num, isfound, next_doc_k, prev_doc_k, _prev_doc_k, doc_k;
            doc_info = self.get("doc_infos")[doc_num];
            if (!doc_info.is_saved) {
                ok_cancel = yield self.root.start_modal("confirm", {
                    message: doc_info.name + " is not saved! Do you want to continue?"
                });
                if (ok_cancel === "cancel") {
                    return "cancel";
                }
            }
            aw = self.get("active_window");
            cur_doc_num = self.get("windows")[aw].doc_num;
            if ((cur_doc_num !== doc_num && (typeof cur_doc_num !== "object" || !ՐՏ_eq(cur_doc_num, doc_num)))) {
                delete self.cm_docs[doc_num];
                self.commit("close", doc_num);
                return;
            }
            isfound = false;
            next_doc_k = null;
            prev_doc_k = null;
            _prev_doc_k = null;
            ՐՏitr49 = ՐՏ_Iterable(self.cm_docs);
            for (ՐՏidx49 = 0; ՐՏidx49 < ՐՏitr49.length; ՐՏidx49++) {
                doc_k = ՐՏitr49[ՐՏidx49];
                if (isfound) {
                    next_doc_k = doc_k;
                    break;
                }
                if ((doc_k === cur_doc_num || typeof doc_k === "object" && ՐՏ_eq(doc_k, cur_doc_num))) {
                    isfound = true;
                    prev_doc_k = _prev_doc_k;
                }
                _prev_doc_k = doc_k;
            }
            self.dispatch("swap_doc", next_doc_k || prev_doc_k || null);
            delete self.cm_docs[doc_num];
            self.commit("close", doc_num);
        }
        open (fp, win_id) {
            var self = this;
            var fs, fid;
            fs = self.root.api.fs;
            fid = fs.id_by_path(fp);
            return self.dispatch("open_by_id", fid, win_id);
        }
        open_by_id (fid, win_id, as_doc_num) {
            var ՐՏ_51;
            var self = this;
            var fs, info, content, doc_num;
            fs = self.root.api.fs;
            info = fs.get_info(fid, true);
            content = info.obj.content;
            delete info.obj;
            info.is_saved = true;
            if (!(info.type === "file")) {
                throw new Error("bad path");
            }
            function create_cm_doc(doc_num, content, ftype) {
                var doc;
                doc = self.cm_docs[doc_num] = self.api.CM.Doc(content, ftype);
                doc.on("change", function(cm_doc, ch_obj) {
                    self.$emit("doc_changed", doc_num, cm_doc, ch_obj);
                });
                info.change_gen = doc.changeGeneration();
            }
            if (as_doc_num) {
                create_cm_doc(as_doc_num, content, self.map_ftype(info.name));
                doc_num = as_doc_num;
                self.commit("set_doc_info", doc_num, info);
            } else {
                doc_num = self.doc_num_by_fid(fid);
                if (!doc_num) {
                    doc_num = self.commit("open", info);
                    create_cm_doc(doc_num, content, self.map_ftype(info.name));
                }
            }
            if (win_id && (as_doc_num || ((ՐՏ_51 = self.get("windows")[win_id].doc_num) !== doc_num && (typeof ՐՏ_51 !== "object" || !ՐՏ_eq(ՐՏ_51, doc_num))))) {
                self.cm_windows[win_id].swapDoc(self.cm_docs[doc_num]);
                self.cm_windows[win_id].focus();
                self.commit("swap_doc", doc_num, win_id);
            }
            return doc_num;
        }
        swap_doc (doc_num, win_id) {
            var ՐՏ_52;
            var self = this;
            win_id = win_id || self.get("active_window");
            if (((ՐՏ_52 = self.get("windows")[win_id].doc_num) !== doc_num && (typeof ՐՏ_52 !== "object" || !ՐՏ_eq(ՐՏ_52, doc_num)))) {
                if (doc_num) {
                    self.cm_windows[win_id].swapDoc(self.cm_docs[doc_num]);
                    self.cm_windows[win_id].focus();
                }
                return self.commit("swap_doc", doc_num, win_id);
            }
            return doc_num;
        }
        toggle_vim (onoff) {
            var ՐՏitr50, ՐՏidx50;
            var self = this;
            var mode, k;
            onoff = self.commit("toggle_vim", onoff);
            mode = onoff ? "vim" : "default";
            ՐՏitr50 = ՐՏ_Iterable(self.cm_windows);
            for (ՐՏidx50 = 0; ՐՏidx50 < ՐՏitr50.length; ՐՏidx50++) {
                k = ՐՏitr50[ՐՏidx50];
                self.cm_windows[k].setOption("keyMap", mode);
            }
        }
        set_cursor (ln, col, doc_num) {
            var self = this;
            var dn;
            dn = doc_num || self.get("active_doc_num");
            self.cm_docs[dn].setCursor(ln, col);
            if (!doc_num) {
                self.cm_windows[self.get("active_window")].focus();
            }
        }
        compile_active_doc (compile_only) {
            var self = this;
            var doc_num, s, finfo, fp, ftype;
            doc_num = self.get("active_doc_num");
            if (!doc_num) {
                return;
            }
            s = self.cm_docs[doc_num].getValue();
            finfo = self.get("doc_infos")[doc_num];
            fp = self.root.api.fs.path_by_id(finfo.id).path;
            ftype = self.map_ftype(fp);
            function post_proc(r) {
                if (r.error) {
                    self.root.flash({
                        component: "error"
                    }, "error");
                } else {
                    self.root.flash("ok", "ok");
                }
            }
            self.root.dispatch("compile", ftype, s, fp, compile_only).then(post_proc);
        }
        map_ftype (fp) {
            var self = this;
            var map_type, ext;
            map_type = {};
            map_type["py"] = "python";
            map_type["pyj"] = "rapydscript";
            map_type["vuepy"] = "vuepy";
            map_type["js"] = "javascript";
            map_type["css"] = "css";
            map_type["html"] = {
                name: "htmlmixed",
                tags: {
                    script: [ [ "type", /^text\/(x-)?python$/, "text/x-python" ], [ null, null, "javascript" ] ]
                }
            };
            ext = fp.split(".")[fp.split(".").length-1];
            return map_type[ext];
        }
        doc_num_by_fid (file_id) {
            var ՐՏitr51, ՐՏidx51, ՐՏ_53;
            var self = this;
            var docs, doc_num;
            if (!file_id) {
                return false;
            }
            docs = self.get("doc_infos");
            ՐՏitr51 = ՐՏ_Iterable(docs);
            for (ՐՏidx51 = 0; ՐՏidx51 < ՐՏitr51.length; ՐՏidx51++) {
                doc_num = ՐՏitr51[ՐՏidx51];
                if (((ՐՏ_53 = docs[doc_num].id) === file_id || typeof ՐՏ_53 === "object" && ՐՏ_eq(ՐՏ_53, file_id))) {
                    return doc_num;
                }
            }
            return false;
        }
        doc_num_by_cm_doc (cm_doc) {
            var ՐՏitr52, ՐՏidx52;
            var self = this;
            var doc_num;
            ՐՏitr52 = ՐՏ_Iterable(self.cm_docs);
            for (ՐՏidx52 = 0; ՐՏidx52 < ՐՏitr52.length; ՐՏidx52++) {
                doc_num = ՐՏitr52[ՐՏidx52];
                if (self.cm_docs[doc_num] === cm_doc) {
                    return doc_num;
                }
            }
            return false;
        }
    }, (function(){
        Object.defineProperties(ՐՏ_50.prototype, {
            trim_space: {
                enumerable: false, 
                writable: true, 
                value: vc.action(ՐՏ_50.prototype.trim_space)
            },
            reload: {
                enumerable: false, 
                writable: true, 
                value: vc.action(ՐՏ_50.prototype.reload)
            },
            save_all: {
                enumerable: false, 
                writable: true, 
                value: vc.action(asyncer(ՐՏ_50.prototype.save_all))
            },
            save: {
                enumerable: false, 
                writable: true, 
                value: vc.action(ՐՏ_50.prototype.save)
            },
            mount_cm: {
                enumerable: false, 
                writable: true, 
                value: vc.action(ՐՏ_50.prototype.mount_cm)
            },
            close_all: {
                enumerable: false, 
                writable: true, 
                value: vc.action(asyncer(ՐՏ_50.prototype.close_all))
            },
            close: {
                enumerable: false, 
                writable: true, 
                value: vc.action(asyncer(ՐՏ_50.prototype.close))
            },
            open: {
                enumerable: false, 
                writable: true, 
                value: vc.action(ՐՏ_50.prototype.open)
            },
            open_by_id: {
                enumerable: false, 
                writable: true, 
                value: vc.action(ՐՏ_50.prototype.open_by_id)
            },
            swap_doc: {
                enumerable: false, 
                writable: true, 
                value: vc.action(ՐՏ_50.prototype.swap_doc)
            },
            toggle_vim: {
                enumerable: false, 
                writable: true, 
                value: vc.action(ՐՏ_50.prototype.toggle_vim)
            },
            set_cursor: {
                enumerable: false, 
                writable: true, 
                value: vc.action(ՐՏ_50.prototype.set_cursor)
            },
            compile_active_doc: {
                enumerable: false, 
                writable: true, 
                value: vc.action(ՐՏ_50.prototype.compile_active_doc)
            }
        });
    })(), ՐՏ_50);
    if (__name__ === "__main__") {
    }
    ՐՏ_modules["store.editor"]["EDITOR_DEFSTATE"] = EDITOR_DEFSTATE;
    ՐՏ_modules["store.editor"]["vc"] = vc;
    ՐՏ_modules["store.editor"]["window_state"] = window_state;
    ՐՏ_modules["store.editor"]["State"] = State;
    ՐՏ_modules["store.editor"]["Store"] = Store;
})();

(function(){
    var __name__ = "store.explorer";

    var DEFSTATE, vc;
    var V_collector = ՐՏ_modules["asset.rs_vue"].V_collector;
    var RS_store = ՐՏ_modules["asset.rs_vue"].RS_store;
    var RS_state_api = ՐՏ_modules["asset.rs_vue"].RS_state_api;
    
    var asyncer = ՐՏ_modules["asset.common"].asyncer;
    
    var common = ՐՏ_modules["asset.common"];
    
    DEFSTATE = {
        fields: [ {
            name: "name",
            label: "Name",
            width: "250px"
        }, {
            name: "type",
            label: "Type",
            width: "50px"
        }, {
            name: "mtime",
            label: "Last Changed",
            width: "200px",
            formatter: function(d) {
                return d ? new Date(d).toLocaleString() : "";
            }
        } ],
        dir_id: 0,
        selected: {},
        save_as: null,
        type_field: "type",
        sort_by: "name",
        toggle_refresh: false,
        basket: []
    };
    vc = new V_collector();
    var State = (ՐՏ_54 = class State extends RS_state_api {
        constructor (vue, getter_factory, state) {
            super(vc, vue, state || DEFSTATE);
            var self = this;
            self.vm.rs_imports = {
                get_fs: getter_factory("get_fs")
            };
        }
        save_as (save_as) {
            var self = this;
            self.state.save_as = save_as;
        }
        set_basket (basket) {
            var self = this;
            self.state.basket = basket;
        }
        set_dir (dir_id) {
            var self = this;
            self.state.dir_id = dir_id;
            self.commit("clear_selected");
        }
        path_arr () {
            var vm = this;
            var fs, ret;
            fs = vm.rs_imports.get_fs()();
            ret = fs.path_by_id(vm.state.dir_id).infos;
            ret[0].name = "root";
            return ret;
        }
        toggle_select (rid) {
            var self = this;
            var selected;
            selected = self.state.selected;
            self.$set(selected, rid, !selected[rid]);
            if (!selected[rid]) {
                self.$del(selected, rid);
            }
        }
        clear_selected () {
            var self = this;
            self.state.selected = {};
        }
        fix_basket () {
            var ՐՏ_55, ՐՏ_56;
            var self = this;
            var fs, basket, b;
            fs = self.vm.rs_imports.get_fs()();
            basket = self.state.basket;
            b = basket.slice(1).filter(function(it) {
                return fs.files[it] || fs.dirs[it];
            });
            if (((ՐՏ_55 = b.length) !== (ՐՏ_56 = basket.length - 1) && (typeof ՐՏ_55 !== "object" || !ՐՏ_eq(ՐՏ_55, ՐՏ_56)))) {
                b.unshift(basket[0]);
                self.commit("set_basket", b);
            }
        }
        path () {
            var vm = this;
            var it;
            return (function() {
                var ՐՏidx53, ՐՏitr53 = ՐՏ_Iterable(vm.path_arr), ՐՏres = [], it;
                for (ՐՏidx53 = 0; ՐՏidx53 < ՐՏitr53.length; ՐՏidx53++) {
                    it = ՐՏitr53[ՐՏidx53];
                    ՐՏres.push(it.name);
                }
                return ՐՏres;
            })().join("/");
        }
        list_dir () {
            var ՐՏitr54, ՐՏidx54;
            var vm = this;
            var fs, ret, ids, id;
            fs = vm.rs_imports.get_fs()();
            ret = [];
            ids = fs.list_dir(vm.state.dir_id);
            ՐՏitr54 = ՐՏ_Iterable(ids);
            for (ՐՏidx54 = 0; ՐՏidx54 < ՐՏitr54.length; ՐՏidx54++) {
                id = ՐՏitr54[ՐՏidx54];
                ret.push(fs.get_info(id));
            }
            return ret;
        }
        row_actions () {
            var vm = this;
            function inner(r) {
                var ret;
                ret = [];
                if (r.type === "file") {
                    ret.push({
                        name: "row_download",
                        icon: {
                            class: "fa fa-download",
                            style: "color: gray"
                        }
                    });
                }
                return ret;
            }
            return inner;
        }
    }, (function(){
        Object.defineProperties(ՐՏ_54.prototype, {
            save_as: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_54.prototype.save_as)
            },
            set_basket: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_54.prototype.set_basket)
            },
            set_dir: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_54.prototype.set_dir)
            },
            path_arr: {
                enumerable: false, 
                writable: true, 
                value: vc.getter(ՐՏ_54.prototype.path_arr)
            },
            toggle_select: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_54.prototype.toggle_select)
            },
            clear_selected: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_54.prototype.clear_selected)
            },
            fix_basket: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_54.prototype.fix_basket)
            },
            path: {
                enumerable: false, 
                writable: true, 
                value: vc.getter(ՐՏ_54.prototype.path)
            },
            list_dir: {
                enumerable: false, 
                writable: true, 
                value: vc.getter(ՐՏ_54.prototype.list_dir)
            },
            row_actions: {
                enumerable: false, 
                writable: true, 
                value: vc.getter(ՐՏ_54.prototype.row_actions)
            }
        });
    })(), ՐՏ_54);
    var Store = (ՐՏ_57 = class Store extends RS_store {
        constructor (root) {
            super();
            var self = this;
            self.root = root;
            self.state_api = new State(self.vue, root.getter_factory.bind(root));
            self.actions = vc._actions;
        }
        click_item (id) {
            var self = this;
            var fs, save_as, win_id;
            fs = self.root.api.fs;
            if (fs.dirs[id]) {
                self.commit("set_dir", id);
            } else if (save_as = self.get("save_as")) {
                save_as.name = fs.get_info(id).name;
                self.commit("save_as", save_as);
            } else {
                win_id = self.root.get("/editor.active_window");
                self.root.dispatch("/editor.open_by_id", id, win_id);
                self.root.commit("toggle_explorer", false);
            }
        }
        doit (a, payload) {
            var ՐՏitr56, ՐՏidx56, ՐՏitr57, ՐՏidx57, ՐՏitr58, ՐՏidx58, ՐՏitr59, ՐՏidx59;
            var self = this;
            var fs, cur_dir, selected, fl, fid, adoc, id, basket;
            fs = self.root.api.fs;
            cur_dir = self.get("dir_id");
            selected = self.get("selected");
            if (a === "row_download") {
                if (fl = fs.files[payload]) {
                    common.download(fl.content, fl.name);
                }
            } else if (a === "upload") {
                ՐՏ_print("upload");
                function save_files(files) {
                    var ՐՏitr55, ՐՏidx55;
                    var f, fid;
                    ՐՏitr55 = ՐՏ_Iterable(files);
                    for (ՐՏidx55 = 0; ՐՏidx55 < ՐՏitr55.length; ՐՏidx55++) {
                        f = ՐՏitr55[ՐՏidx55];
                        fid = fs.create_file(f.name, cur_dir);
                        fs.write_file(fid, f.value);
                    }
                    self.root.$emit("fs_changed");
                }
                common.upload_text().then(save_files);
            } else if (a === "save_as") {
                fid = fs.create_file(payload.name, cur_dir);
                fs.write_file(fid, payload.content);
                self.commit("save_as", null);
                adoc = self.root.get("/editor.active_doc_num");
                self.root.dispatch("/editor.open_by_id", fid, self.root.get("/editor.active_window"), adoc);
                self.root.$emit("fs_changed");
                self.root.commit("toggle_explorer", false);
            } else if (a === "create") {
                if (!payload) {
                    return;
                }
                if (payload.endsWith("/")) {
                } else {
                    fs.create_file(payload, cur_dir, "");
                }
                self.root.$emit("fs_changed");
            } else if (a === "del") {
                ՐՏitr56 = ՐՏ_Iterable(selected);
                for (ՐՏidx56 = 0; ՐՏidx56 < ՐՏitr56.length; ՐՏidx56++) {
                    id = ՐՏitr56[ՐՏidx56];
                    if (selected[id]) {
                        fs.del_any(id);
                    }
                }
                self.commit("clear_selected");
                self.commit("fix_basket");
                self.root.$emit("fs_changed");
            } else if (ՐՏ_in(a, [ "cut", "copy" ])) {
                basket = [ a ];
                ՐՏitr57 = ՐՏ_Iterable(selected);
                for (ՐՏidx57 = 0; ՐՏidx57 < ՐՏitr57.length; ՐՏidx57++) {
                    id = ՐՏitr57[ՐՏidx57];
                    if (selected[id]) {
                        basket.push(id);
                    }
                }
                self.commit("set_basket", basket);
            } else if (a === "paste") {
                basket = self.get("basket");
                if (basket[0] === "copy") {
                    ՐՏitr58 = ՐՏ_Iterable(basket.slice(1));
                    for (ՐՏidx58 = 0; ՐՏidx58 < ՐՏitr58.length; ՐՏidx58++) {
                        id = ՐՏitr58[ՐՏidx58];
                        fs.copy_any(id, cur_dir);
                    }
                } else if (basket[0] === "cut") {
                    ՐՏitr59 = ՐՏ_Iterable(basket.slice(1));
                    for (ՐՏidx59 = 0; ՐՏidx59 < ՐՏitr59.length; ՐՏidx59++) {
                        id = ՐՏitr59[ՐՏidx59];
                        fs.move(id, cur_dir);
                    }
                }
                self.commit("set_basket", []);
                self.root.$emit("fs_changed");
            }
            ՐՏ_print(a, payload);
        }
    }, (function(){
        Object.defineProperties(ՐՏ_57.prototype, {
            click_item: {
                enumerable: false, 
                writable: true, 
                value: vc.action(ՐՏ_57.prototype.click_item)
            },
            doit: {
                enumerable: false, 
                writable: true, 
                value: vc.action(ՐՏ_57.prototype.doit)
            }
        });
    })(), ՐՏ_57);
    if (__name__ === "__main__") {
    }
    ՐՏ_modules["store.explorer"]["DEFSTATE"] = DEFSTATE;
    ՐՏ_modules["store.explorer"]["vc"] = vc;
    ՐՏ_modules["store.explorer"]["State"] = State;
    ՐՏ_modules["store.explorer"]["Store"] = Store;
})();

(function(){
    var __name__ = "server";

    class API {
        constructor (axios, baseURL, bus, login) {
            var self = this;
            self.login = login;
            self.bus = bus;
            self.baseURL = baseURL;
            self.srv = axios.create({
                baseURL: baseURL,
                timeout: 6e4,
                withCredentials: true
            });
            self.last_resp = "";
            self.last_error = "";
        }
        call (meth, f, args, vars) {
            var self = this;
            var ret;
            args = args || [];
            if (meth === "get") {
                if (Array.isArray(args)) {
                    args.unshift(f);
                    f = args.join("/");
                    args = void 0;
                    if (vars && !vars.params) {
                        vars = {
                            params: vars
                        };
                    }
                } else if (!args.params) {
                    args = {
                        params: args
                    };
                }
            }
            ret = self.srv[meth](f, args).then(function(r) {
                self.done(r);
                return r;
            }, function(r) {
                return self.raise_error(r, {
                    meth: meth,
                    f: f,
                    args: args
                });
            });
            return ret;
        }
        get (f, args) {
            var self = this;
            return self.call("get", f, args);
        }
        post (f, args) {
            var self = this;
            return self.call("post", f, args);
        }
        done (resp) {
            var self = this;
            self.last_resp = resp;
            if (self.bus) {
                self.bus.$emit("server", {
                    event: "done",
                    emitter: self,
                    data: resp.data
                });
            }
        }
        raise_error (err, opt) {
            var self = this;
            if (err.response.status === 403 && self.login) {
                return self.login().then(function() {
                    return self.srv[opt.meth](opt.f, opt.args);
                });
            }
            self.last_error = err;
            if (self.bus) {
                self.bus.$emit("server", {
                    event: "error",
                    emitter: self,
                    data: err
                });
            }
            return Promise.reject(err);
        }
    }
    ՐՏ_modules["server"]["API"] = API;
})();

(function(){
    var __name__ = "app_menu";

    function get_menu(web23py) {
        var user, ret;
        user = {
            label: "Logout",
            href: "#cmd:logout",
            name: "logout"
        };
        ret = {
            left: [ {
                label: '<i class = "fa fa-power-off"></i>',
                href: "#cmd:select_app"
            }, {
                label: "${w23p_app}",
                href: "#cmd:toggle_explorer"
            }, {
                label: "Save",
                href: "#cmd:save"
            }, {
                label: "Compile",
                href: "#cmd:compile"
            }, {
                label: "Editor",
                subitems: [ {
                    label: "Close all",
                    href: "#cmd:close_all"
                }, {
                    label: "Save all & close",
                    href: "#cmd:save_all_close"
                } ]
            } ],
            right: [ {
                label: "ritem1",
                slot: "search"
            }, user, {
                label: "flash",
                slot: "flash"
            }, web23py === "web2py" ? {
                label: "Errors",
                href: "../../admin/default/errors/${w23p_app}",
                attrs: {
                    target: "_blank",
                    rel: "noopener"
                }
            } : {
                label: "Reload Apps",
                name: "reload_apps",
                href: "#cmd:reload_apps"
            } ]
        };
        return ret;
    }
    ՐՏ_modules["app_menu"]["get_menu"] = get_menu;
})();

(function(){
    var __name__ = "store.root";

    var vc;
    var V_collector = ՐՏ_modules["asset.rs_vue"].V_collector;
    var RS_store = ՐՏ_modules["asset.rs_vue"].RS_store;
    var RS_state_api = ՐՏ_modules["asset.rs_vue"].RS_state_api;
    
    var asyncer = ՐՏ_modules["asset.common"].asyncer;
    
    var FS = ՐՏ_modules["asset.fs"].FS;
    
    var vuepy_compile = ՐՏ_modules["asset.vuepy_compiler"].vuepy_compile;
    var rs_compile = ՐՏ_modules["asset.vuepy_compiler"].rs_compile;
    
    var vuepy_output = ՐՏ_modules["asset.vuepy_output"];
    
    var editor = ՐՏ_modules["store.editor"];
    var explorer = ՐՏ_modules["store.explorer"];
    
    var server = ՐՏ_modules["server"];
    
    var app_menu = ՐՏ_modules["app_menu"];
    
    function default_state() {
        var ret;
        ret = {
            is_logged: false,
            ctask: null,
            flash: {
                msg: "Hi",
                status: "",
                component: null,
                cargs: null
            },
            is_busy: true,
            menus: null,
            web23py: null,
            w23p_app: null,
            w23p_app_list: null,
            get_fs: null,
            get_CM: null,
            show_explorer: false,
            compile_error: null,
            modal_state: {
                is_active: false,
                inner_component: null,
                inner_args: null,
                promise: null,
                promise_ok: null
            }
        };
        return ret;
    }
    vc = new V_collector();
    var State = (ՐՏ_58 = class State extends RS_state_api {
        constructor (vue, getter_factory, state) {
            super(vc, vue, state || default_state());
            var self = this;
            self.vm.imports = {};
        }
        set_modal_inner (inner, args) {
            var self = this;
            self.state.modal_state.inner_component = inner;
            self.state.modal_state.inner_args = args;
        }
        compile_error (err) {
            var self = this;
            self.state.compile_error = err;
        }
        set_modal_promise (p) {
            var self = this;
            self.state.modal_state.promise = p;
        }
        set_modal_promise_ok (ok) {
            var self = this;
            self.state.modal_state.promise_ok = ok;
        }
        toggle_modal (onoff) {
            var self = this;
            onoff = onoff === void 0 ? !self.state.modal_state.is_active : onoff;
            self.state.modal_state.is_active = onoff;
        }
        toggle_busy (onoff) {
            var self = this;
            onoff = onoff === void 0 ? !self.state.is_busy : onoff;
            self.state.is_busy = onoff;
        }
        toggle_explorer (onoff) {
            var self = this;
            onoff = onoff === void 0 ? !self.state.show_explorer : onoff;
            self.state.show_explorer = onoff;
        }
        set_w23p_app (w23p_app) {
            var self = this;
            self.state.w23p_app = w23p_app;
        }
        flash (msg, status) {
            var self = this;
            if (ՐՏ_type(msg) === "String") {
                self.state.flash.msg = msg;
                self.state.flash.component = null;
                self.state.flash.cargs = null;
            } else {
                self.state.flash.component = msg.component;
                self.state.flash.cargs = msg.cargs;
                self.state.flash.msg = null;
            }
            self.state.flash.status = status;
        }
    }, (function(){
        Object.defineProperties(ՐՏ_58.prototype, {
            set_modal_inner: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_58.prototype.set_modal_inner)
            },
            compile_error: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_58.prototype.compile_error)
            },
            set_modal_promise: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_58.prototype.set_modal_promise)
            },
            set_modal_promise_ok: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_58.prototype.set_modal_promise_ok)
            },
            toggle_modal: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_58.prototype.toggle_modal)
            },
            toggle_busy: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_58.prototype.toggle_busy)
            },
            toggle_explorer: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_58.prototype.toggle_explorer)
            },
            set_w23p_app: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_58.prototype.set_w23p_app)
            },
            flash: {
                enumerable: false, 
                writable: true, 
                value: vc.mutation(ՐՏ_58.prototype.flash)
            }
        });
    })(), ՐՏ_58);
    var Store = (ՐՏ_59 = class Store extends RS_store {
        constructor (rs_req, params) {
            super();
            var self = this;
            var web23py, self_app, api_baseURL, html_dir, fs_refresher;
            web23py = params.web23py;
            self.state_api = new State(self.vue, self.getter_factory.bind(self));
            self.state_api.state.web23py = web23py;
            self.state_api.state.menus = app_menu.get_menu(web23py);
            self.actions = vc._actions;
            self_app = params.app_root;
            self.api = {};
            api_baseURL = web23py === "web3py" ? self_app : self_app + "/default/api";
            self.api.server = new server.API(rs_req.get("axios.min"), api_baseURL, self.$bus, function() {
                return self.dispatch("start_modal", "login");
            });
            self.api.fs = new FS();
            self.api.CM = rs_req.get("codemirror/lib/codemirror");
            self.state_api.state.get_fs = function() {
                return self.api.fs;
            };
            self.state_api.state.get_CM = function() {
                return self.api.CM;
            };
            html_dir = {
                "web2py": "/views",
                "web3py": "/templates"
            };
            self.output_path_map = {
                "html": function(pth) {
                    pth = pth.split("/");
                    pth[0] === "root" || !pth[0] && pth.shift();
                    pth[0] = html_dir[web23py];
                    return pth.join("/") + ".html";
                },
                "js": "/static/js/",
                "css": "/static/css/"
            };
            self.mount_module(new editor.Store(self), "editor");
            self.mount_module(new explorer.Store(self), "explorer");
            fs_refresher = function() {
                self.state_api.state.get_fs = function() {
                    return self.api.fs;
                };
            };
            self.$on("fs_restored", fs_refresher);
            self.$on("fs_changed", fs_refresher);
            self.state_api.vm.$watch("state.show_explorer", function(n, o) {
                if (!n) {
                    self.commit("/explorer.save_as", null);
                }
            });
            function on_server(a) {
                var r, w2p_err, msg;
                if (a.event === "error") {
                    w2p_err = (r = a.data.response) && r.headers.web2py_error || "";
                    self.flash(`server error: ${a.data.message} ${w2p_err}`, "error");
                } else {
                    msg = a.data.flash;
                    if (msg) {
                        self.flash(msg, "ok");
                    }
                }
            }
            self.$on("server", on_server);
            function process_file(cmd, fid) {
                var ՐՏitr60, ՐՏidx60;
                var fs, fdata, content, frm_data, k, post_data;
                fs = self.api.fs;
                fdata = fs.get_info(fid, true);
                fdata.path = fs.path_by_id(fid).path;
                content = fdata.obj.content;
                delete fdata.obj;
                fdata.w23p_app = self.get("w23p_app");
                if (cmd === "write_file") {
                    frm_data = new FormData();
                    ՐՏitr60 = ՐՏ_Iterable(Object.keys(fdata));
                    for (ՐՏidx60 = 0; ՐՏidx60 < ՐՏitr60.length; ՐՏidx60++) {
                        k = ՐՏitr60[ՐՏidx60];
                        frm_data.append(k, fdata[k]);
                    }
                    frm_data.append("content", new Blob([ content ], {
                        type: "text/plain"
                    }));
                    post_data = frm_data;
                } else if (cmd === "del_file") {
                    post_data = {
                        fdata: fdata
                    };
                } else {
                    throw new Error("unknown command: " + cmd);
                }
                self.api.server.post(cmd, post_data).then(function(resp) {
                    var e;
                    ՐՏ_print("server_resp: ", resp.data);
                    if (cmd === "write_file" && resp.data.md5_hash && !resp.data.error) {
                        fs.files[fid].md5_hash = resp.data.md5_hash;
                    }
                    if (e = resp.data.error) {
                        self.flash("Server error: " + e, "error");
                    }
                }, function(e) {
                    self.flash("Server error: " + e.message, "error");
                });
            }
            self.api.fs.on("write_file", function(fid) {
                process_file("write_file", fid);
            });
            self.api.fs.on("del_file", function(fid) {
                process_file("del_file", fid);
            });
        }
        search (r) {
            var ՐՏitr61, ՐՏidx61;
            var self = this;
            var fs, ret, fid, obj;
            fs = self.api.fs;
            ret = [];
            ՐՏitr61 = ՐՏ_Iterable(fs.files);
            for (ՐՏidx61 = 0; ՐՏidx61 < ՐՏitr61.length; ՐՏidx61++) {
                fid = ՐՏitr61[ՐՏidx61];
                obj = fs.files[fid];
                if (r.test(obj.content)) {
                    ret.push([ fid, fs.path_by_id(fid) ]);
                }
            }
            return ret;
        }
        *try_connect () {
            var self = this;
            self.state_api.state.is_logged = (yield self.api.server.get("try_connect")) && true;
        }
        *login (data) {
            var self = this;
            var pwd;
            pwd = data.get("password");
            self.state_api.state.is_logged = (yield self.api.server.post("login", {
                password: pwd
            })).data.user;
        }
        *logout () {
            var self = this;
            self.commit("toggle_busy", true);
            yield self.api.server.post("logout");
            self.commit("toggle_busy", false);
            self.state_api.state.is_logged = false;
            self.dispatch("start_modal", "login");
        }
        *w23p_app_list () {
            var self = this;
            self.state_api.state.w23p_app_list = (yield self.api.server.get("app_list")).data.app_list;
        }
        flash () {
            var self = this;
            var args = [].slice.call(arguments, 0);
            self.commit("flash", ...args);
            self.$emit("flash", ...args);
        }
        *menu_click (it) {
            var self = this;
            var is_cmd, cmd, adoc_num;
            is_cmd = /^#cmd:(.*)$/;
            if (!it.href || !(cmd = is_cmd.exec(it.href))) {
                return;
            }
            cmd = cmd[1];
            adoc_num = self.get("/editor.active_doc_num");
            if (cmd === "toggle_explorer") {
                self.commit("toggle_explorer");
            } else if (cmd === "select_app") {
                self.dispatch("select_app");
            } else if (cmd === "compile") {
                if (adoc_num) {
                    self.dispatch("/editor.compile_active_doc");
                }
            } else if (cmd === "save") {
                if (adoc_num) {
                    self.dispatch("/editor.save", adoc_num);
                    self.flash("Done!", "ok");
                }
            } else if (cmd === "save_all_close") {
                yield self.dispatch("/editor.save_all");
                yield self.dispatch("/editor.close_all");
            } else if (cmd === "close_all") {
                self.dispatch("/editor.close_all");
            } else if (cmd === "logout") {
                self.dispatch("logout");
            } else if (cmd === "reload_apps") {
                self.dispatch("reload_apps");
            }
        }
        *load_fs_from_srv (w23p_app) {
            var self = this;
            var fs, ret;
            fs = self.api.fs;
            self.commit("toggle_busy", true);
            try {
                ret = (yield self.api.server.get("get_fs", [ w23p_app ]));
            } catch (ՐՏ_Exception) {
                var err = ՐՏ_Exception;
            }
            self.dispatch("load_fs", ret.data, w23p_app);
            self.commit("toggle_busy", false);
            return ret;
        }
        load_fs (data, w23p_app) {
            var self = this;
            self.api.fs.loads(data);
            self.commit("set_w23p_app", w23p_app);
            self.$emit("fs_restored", w23p_app);
        }
        start_modal (inner, args) {
            var self = this;
            var resolver, ret;
            resolver = function(ok, err) {
                self.commit("set_modal_promise_ok", ok);
            };
            ret = new Promise(resolver);
            self.commit("set_modal_inner", inner, args);
            self.commit("set_modal_promise", ret);
            self.commit("toggle_modal", true);
            return ret;
        }
        close_modal () {
            var self = this;
            var args = [].slice.call(arguments, 0);
            var ok;
            ok = self.get("modal_state").promise_ok;
            self.commit("toggle_modal", false);
            self.commit("set_modal_inner", null, null);
            self.commit("set_modal_promise", null);
            self.commit("set_modal_promise_ok", null);
            ok.apply(null, args);
        }
        *select_app () {
            var self = this;
            var app;
            self.commit("toggle_busy", true);
            yield self.dispatch("w23p_app_list");
            self.commit("toggle_busy", false);
            app = yield self.dispatch("start_modal", "app_selector", {
                app_list: self.get("w23p_app_list")
            });
            if (app === "cancel") {
                return;
            }
            if (!(yield self.dispatch("/editor.close_all"))) {
                return;
            }
            self.commit("/explorer.set_dir", 0);
            return self.dispatch("load_fs_from_srv", app);
        }
        reload_apps () {
            var self = this;
            self.api.server.get("reload");
        }
        *compile_py (code, fp) {
            var self = this;
            var resp, data, err;
            resp = yield self.api.server.post("compile_py", {
                w23p_app: self.get("w23p_app"),
                code: code,
                fp: fp
            });
            data = resp.data;
            err = data.err && Object.assign(new Error(), data.err);
            if (err) {
                err.filename = fp;
                throw err;
            }
            return code;
        }
        *compile (compiler, s, fp, compile_only) {
            var self = this;
            var c_map, compiled, fs, off, fid;
            c_map = {
                "vuepy": vuepy_compile,
                "rs": rs_compile,
                "rapydscript": rs_compile,
                "python": function(s, fp) {
                    return self.compile_py(s, fp);
                }
            };
            if (!c_map[compiler]) {
                self.flash("Can`t compile " + fp, "warn");
                return;
            }
            try {
                compiled = yield c_map[compiler](s, fp, self.api.fs);
            } catch (ՐՏ_Exception) {
                var err = ՐՏ_Exception;
                if (err.response) {
                    throw err;
                }
                self.commit("compile_error", err);
                return {
                    error: err
                };
            }
            self.commit("compile_error", null);
            if (!compile_only) {
                fs = self.api.fs;
                off = fs.on("write_file", function(fid) {
                    self.dispatch("/editor.reload", fid);
                });
                if (compiler === "python") {
                    fid = fs.id_by_path(fp);
                    fs.write_file(fid, compiled);
                } else {
                    vuepy_output.output(compiled, self.api.fs, self.output_path_map);
                }
                off();
                self.$emit("fs_changed");
            }
            return compiled;
        }
    }, (function(){
        Object.defineProperties(ՐՏ_59.prototype, {
            try_connect: {
                enumerable: false, 
                writable: true, 
                value: vc.action(asyncer(ՐՏ_59.prototype.try_connect))
            },
            login: {
                enumerable: false, 
                writable: true, 
                value: vc.action(asyncer(ՐՏ_59.prototype.login))
            },
            logout: {
                enumerable: false, 
                writable: true, 
                value: vc.action(asyncer(ՐՏ_59.prototype.logout))
            },
            w23p_app_list: {
                enumerable: false, 
                writable: true, 
                value: vc.action(asyncer(ՐՏ_59.prototype.w23p_app_list))
            },
            flash: {
                enumerable: false, 
                writable: true, 
                value: vc.action(ՐՏ_59.prototype.flash)
            },
            menu_click: {
                enumerable: false, 
                writable: true, 
                value: vc.action(asyncer(ՐՏ_59.prototype.menu_click))
            },
            load_fs_from_srv: {
                enumerable: false, 
                writable: true, 
                value: vc.action(asyncer(ՐՏ_59.prototype.load_fs_from_srv))
            },
            load_fs: {
                enumerable: false, 
                writable: true, 
                value: vc.action(ՐՏ_59.prototype.load_fs)
            },
            start_modal: {
                enumerable: false, 
                writable: true, 
                value: vc.action(ՐՏ_59.prototype.start_modal)
            },
            close_modal: {
                enumerable: false, 
                writable: true, 
                value: vc.action(ՐՏ_59.prototype.close_modal)
            },
            select_app: {
                enumerable: false, 
                writable: true, 
                value: vc.action(asyncer(ՐՏ_59.prototype.select_app))
            },
            reload_apps: {
                enumerable: false, 
                writable: true, 
                value: vc.action(ՐՏ_59.prototype.reload_apps)
            },
            compile_py: {
                enumerable: false, 
                writable: true, 
                value: asyncer(ՐՏ_59.prototype.compile_py)
            },
            compile: {
                enumerable: false, 
                writable: true, 
                value: vc.action(asyncer(ՐՏ_59.prototype.compile))
            }
        });
    })(), ՐՏ_59);
    if (__name__ === "__main__") {
    }
    ՐՏ_modules["store.root"]["vc"] = vc;
    ՐՏ_modules["store.root"]["default_state"] = default_state;
    ՐՏ_modules["store.root"]["State"] = State;
    ՐՏ_modules["store.root"]["Store"] = Store;
})();

(function(){
    var __name__ = "store";

    ՐՏ_modules["store"]["editor"] = ՐՏ_modules["store.editor"];
    ՐՏ_modules["store"]["explorer"] = ՐՏ_modules["store.explorer"];
    ՐՏ_modules["store"]["root"] = ՐՏ_modules["store.root"];

})();

(function(){

    var __name__ = "__main__";

    var ՐՏ_60;
    var app_templ, vc;
    app_templ = "\n<div>\n    <layout>\n        <div  style = 'width:100%; padding: 0 10px;'>\n            <div  v-show = 'show_explorer' class = 'explorer'>\n                <folder_content  @blur = 'hide_explorer($event)'></folder_content>\n            </div>\n            <editor></editor>\n        </div>\n    </layout>\n</div>\n";
    var RS_vue = ՐՏ_modules["asset.rs_vue"].RS_vue;
    var V_collector = ՐՏ_modules["asset.rs_vue"].V_collector;
    
    var common = ՐՏ_modules["asset.common"];
    
    var components = ՐՏ_modules["components"];
    
    var Store = ՐՏ_modules["store.root"].Store;
    
    Vue.use(Store);
    function reg_components() {
        var comps, c;
        comps = "confirm error app_selector login modal".split(/ +/);
        Vue.options.components = (function() {
            var ՐՏidx62, ՐՏitr62 = ՐՏ_Iterable(comps), ՐՏres = {}, c;
            for (ՐՏidx62 = 0; ՐՏidx62 < ՐՏitr62.length; ՐՏidx62++) {
                c = ՐՏitr62[ՐՏidx62];
                ՐՏres[c] = components[c].make();
            }
            return ՐՏres;
        })();
    }
    reg_components();
    vc = new V_collector();
    var App = (ՐՏ_60 = class App extends RS_vue {
        constructor (params) {
            var store, comps, reg_as, c;
            store = window.store = new Store(rs_req, params);
            super(vc);
            var self = this;
            self.store = store;
            self.template = app_templ;
            self.map_store = {
                try_connect: "try_connect*",
                show_explorer: "show_explorer",
                w23p_app: "w23p_app",
                is_logged: "is_logged",
                toggle_explorer: "toggle_explorer~"
            };
            comps = "folder_content editor base_layout".split(/ +/);
            reg_as = {
                base_layout: "layout"
            };
            self.components = (function() {
                var ՐՏidx63, ՐՏitr63 = ՐՏ_Iterable(comps), ՐՏres = {}, c;
                for (ՐՏidx63 = 0; ՐՏidx63 < ՐՏitr63.length; ՐՏidx63++) {
                    c = ՐՏitr63[ՐՏidx63];
                    ՐՏres[reg_as[c] || c] = components[c].make();
                }
                return ՐՏres;
            })();
        }
        _init_data () {
            var self = this;
            return {};
        }
        hide_explorer (e) {
            var self = this;
            if (e.target.style.display !== "none") {
                setTimeout(function() {
                    self.toggle_explorer(false);
                }, 100);
            }
        }
        *mounted () {
            var self = this;
            var app2edit;
            store.commit("toggle_busy", false);
            while (!self.is_logged) {
                yield self.try_connect();
            }
            store.commit("toggle_busy", true);
            yield store.dispatch("w23p_app_list");
            store.commit("toggle_busy", false);
            while (!self.w23p_app) {
                app2edit = yield store.dispatch("start_modal", "app_selector", {
                    app_list: store.get("w23p_app_list")
                });
                if (app2edit !== "cancel") {
                    yield store.dispatch("load_fs_from_srv", app2edit);
                }
            }
        }
    }, (function(){
        Object.defineProperties(ՐՏ_60.prototype, {
            hide_explorer: {
                enumerable: false, 
                writable: true, 
                value: vc.meth(ՐՏ_60.prototype.hide_explorer)
            },
            mounted: {
                enumerable: false, 
                writable: true, 
                value: common.asyncer(ՐՏ_60.prototype.mounted)
            }
        });
    })(), ՐՏ_60);
    exports.start = function(el, params) {
        var app;
        app = new App(params);
        new Vue(app).$mount(el || "#app");
    };
})();
})();

return exports;})