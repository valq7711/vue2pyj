(function(){
"use strict";
var ՐՏ_1;
function enumerate(item) {
    var arr, iter, i;
    arr = [];
    iter = ՐՏ_Iterable(item);
    for (i = 0; i < iter.length; i++) {
        arr[arr.length] = [ i, item[i] ];
    }
    return arr;
}
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
function ՐՏ_print() {
    if (typeof console === "object") {
        console.log.apply(console, arguments);
    }
}
function ՐՏ_type(obj) {
    return obj && obj.constructor && obj.constructor.name ? obj.constructor.name : Object.prototype.toString.call(obj).slice(8, -1);
}
function ՐՏ_eq(a, b) {
    var ՐՏitr24, ՐՏidx24;
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
        ՐՏitr24 = ՐՏ_Iterable(a);
        for (ՐՏidx24 = 0; ՐՏidx24 < ՐՏitr24.length; ՐՏidx24++) {
            i = ՐՏitr24[ՐՏidx24];
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
    var __name__ = "asset.rs_require";

    var fs_path = ՐՏ_modules["asset.fs_path"];
    
    class Module {
        static __init_class__ (load_amd) {
            this.prototype.load_amd = load_amd;
        }
        constructor (def_args, path) {
            var self = this;
            self.loaded = false;
            self.ok_err = null;
            self.path = path || "";
            self.deps = [];
            self.dep_mods = {};
            if (Array.isArray(def_args[0])) {
                self.deps = def_args.shift();
                self.dep_count = self.deps.length;
            }
            self.init = def_args[0];
            self.load_deps().then(self.run.bind(self));
        }
        on_load_script (ok_err) {
            var self = this;
            self.ok_err = ok_err;
            if (self.loaded) {
                ok_err.ok(self.exports);
            }
        }
        run (deps) {
            var ՐՏitr21, ՐՏidx21;
            var self = this;
            var i, p;
            ՐՏitr21 = ՐՏ_Iterable(enumerate(self.deps));
            for (ՐՏidx21 = 0; ՐՏidx21 < ՐՏitr21.length; ՐՏidx21++) {
                [i, p] = ՐՏitr21[ՐՏidx21];
                self.dep_mods[p] = deps[i];
            }
            self.exports = self.init.apply(null, deps);
            self.loaded = true;
            if (self.ok_err) {
                self.ok_err.ok(self.exports);
            }
        }
        load_deps () {
            var ՐՏitr22, ՐՏidx22;
            var self = this;
            var p, mod_path;
            p = [];
            ՐՏitr22 = ՐՏ_Iterable(self.deps);
            for (ՐՏidx22 = 0; ՐՏidx22 < ՐՏitr22.length; ՐՏidx22++) {
                mod_path = ՐՏitr22[ՐՏidx22];
                p.push(self.load_amd(mod_path, self.path));
            }
            return Promise.all(p);
        }
    }
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
    class RS_require {
        constructor (cfg) {
            var self = this;
            var define;
            self.cfg = cfg;
            self.modules = {};
            self._modules = [];
            define = window.define = function(req_list, mod) {
                self.define(req_list, mod);
            };
            define.amd = {};
            self.fs_path = fs_path;
            Module.__init_class__(self.load_amd.bind(self));
        }
        mount_module (as_name, mod) {
            var self = this;
            self.modules[as_name] = {
                exports: mod,
                loaded: true,
                req_chain: []
            };
        }
        define (req_list, cb) {
            var self = this;
            var cs;
            function make_mod(path) {
                var mod;
                mod = new Module([ req_list, cb ], path);
                self._modules.push(mod);
                return mod;
            }
            if ((cs = document.currentScript) && cs.dataset.rs_req) {
                self.make_mod = make_mod;
            } else {
                make_mod();
            }
        }
        on_load_script (path, ok_err) {
            var self = this;
            var mod;
            if (self.make_mod) {
                mod = self.make_mod(path);
                self.make_mod = null;
                mod.on_load_script(ok_err);
            }
        }
        on_error (name) {
            var self = this;
            console.log("error on load: ", name);
        }
        load_amd (name, requester) {
            var self = this;
            var is_url, src, js_root_dir, mod, exp, s, ok_err, p, req_chain;
            is_url = /https?:\/{2}.*/.test(name);
            src = name;
            if (!is_url) {
                if (name.startsWith("./")) {
                    name = name.slice(2);
                }
                if (requester) {
                    name = fs_path.rel_path_join(requester.split("/").slice(0, -1).join("/"), name);
                }
                js_root_dir = self.cfg && self.cfg.js_root_dir || "";
                src = fs_path.rel_path_join(js_root_dir, name);
            }
            if (mod = self.modules[name]) {
                if (!mod.loaded) {
                    if (mod.req_chain.find(function(it) {
                        return it === name;
                    })) {
                        throw new Error("Circular dependency: " + name + " and " + requester);
                    }
                    mod.req_chain.push(requester);
                }
                exp = mod.exports;
                return exp instanceof Promise ? exp : Promise.resolve(exp);
            }
            s = document.createElement("script");
            s.src = src + ".js";
            s.async = true;
            s.onerror = function() {
                self.on_error(name);
            };
            s.dataset.rs_req = true;
            ok_err = {};
            p = new Promise(function(ok, err) {
                ok_err = {
                    ok: ok,
                    err: err
                };
            });
            s.onload = function() {
                self.on_load_script(name, ok_err);
            };
            document.head.appendChild(s);
            p.then(function(exports) {
                var mod;
                if (mod = self.modules[name]) {
                    mod.loaded = true;
                    mod.exports = exports;
                } else {
                    throw new Error("load_stack seems corrupted");
                }
            });
            req_chain = requester ? [ requester ] : [];
            self.modules[name] = {
                req_chain: req_chain,
                exports: p,
                loaded: false
            };
            return p;
        }
        load_amd_list (mod_lst, requester) {
            var ՐՏitr23, ՐՏidx23;
            var self = this;
            var ret, mod;
            ret = [];
            ՐՏitr23 = ՐՏ_Iterable(mod_lst);
            for (ՐՏidx23 = 0; ՐՏidx23 < ՐՏitr23.length; ՐՏidx23++) {
                mod = ՐՏitr23[ՐՏidx23];
                ret.push(self.load_amd(mod, requester));
            }
            return Promise.all(ret);
        }
        get (name) {
            var self = this;
            var mod;
            mod = self.modules[name];
            if (!mod) {
                throw new Error("Module `" + name + "` is not loaded");
            }
            return self.modules[name].exports;
        }
    }
    ՐՏ_modules["asset.rs_require"]["Module"] = Module;
    ՐՏ_modules["asset.rs_require"]["doc_ready"] = doc_ready;
    ՐՏ_modules["asset.rs_require"]["RS_require"] = RS_require;
})();

(function(){
    var __name__ = "asset";

    ՐՏ_modules["asset"]["fs_path"] = ՐՏ_modules["asset.fs_path"];
    ՐՏ_modules["asset"]["fs"] = ՐՏ_modules["asset.fs"];
    ՐՏ_modules["asset"]["rs_require"] = ՐՏ_modules["asset.rs_require"];
    var fs = ՐՏ_modules["asset.fs"];
    var fs_path = ՐՏ_modules["asset.fs_path"];
    
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
        var params, static_ver, app_root, js_root_dir, rs_req;
        params = document.getElementsByTagName("meta")[0].dataset;
        static_ver = params.static_ver;
        static_ver = static_ver && "/_" + static_ver || "";
        app_root = params.app_root || "";
        if (app_root[app_root.length-1] === "/") {
            app_root = app_root.slice(0, -1);
        }
        js_root_dir = app_root + "/static" + static_ver + "/js/";
        window.rs_req = rs_req = new rs_require.RS_require({
            js_root_dir: js_root_dir
        });
        load_js.load(rs_req).then(function() {
            rs_req.load_amd("app", "").then(function(app) {
                app.start("#app", params);
                ՐՏ_print("Done!!!");
            });
        });
    }
    init();
})();
})();
