# -*- coding: utf-8 -*-
import os, re
import sys
import hashlib
from .storage import Storage

def to_bytes(obj, charset='utf-8', errors='strict'):
        if obj is None:
            return None
        if isinstance(obj, (bytes, bytearray)):
            return bytes(obj)
        if isinstance(obj, str):
            return obj.encode(charset, errors)
        raise TypeError('Expected bytes')

def md5_hash(text):
    """Generate an md5 hash with the given text."""
    return hashlib.md5(to_bytes(text)).hexdigest()


LAST_ID = None
FILE_MASK_REX = re.compile('(.(?!\.min))+.\.(js|py|css|html|vuepy|pyj)$', flags= re.I)

def get_id():
    global LAST_ID
    LAST_ID += 1
    return '0' if LAST_ID == 0 else  'ID%s' % LAST_ID

def safe_read(fp):
    with open(fp, 'r', encoding = 'utf-8') as f:
        ret = f.read()
    return ret

def get_file(fp, parent_id ):
    stat = os.stat(fp)
    content = safe_read(fp)
    ret = dict( id = get_id(),
                name = os.path.split(fp)[1],
                parent = parent_id,
                content = content,
                ctime = int(stat.st_ctime * 1000),
                mtime = int(stat.st_mtime * 1000),
                md5_hash = md5_hash(content)
    )
    return ret

def get_dir(pth_to_dir,  parent_id, files, dirs, dir_list = None,  file_mask = FILE_MASK_REX ):
    # {id:0,  name: '', parent: None,  content: []}
    dir_list = dir_list
    ret = dict(id = get_id(),
                name = os.path.split(pth_to_dir)[1],
                parent = parent_id,
                content = [])
    for it in os.listdir(pth_to_dir):
        fp = os.path.join(pth_to_dir, it)
        if os.path.isfile(fp):
            if file_mask.match(it):
                fl = get_file(fp, ret['id'])
                files[fl['id']] = fl
                ret['content'].append(fl['id'])
            else:
                continue
        elif not dir_list or it in dir_list.keys():
            d = get_dir(fp,  ret['id'], files, dirs, dir_list and dir_list[it], file_mask)
            dirs[d['id']] = d
            ret['content'].append(d['id'])
    return ret

def dir_to_fs(root_d, dir_list = None,file_mask = FILE_MASK_REX):
    global LAST_ID
    LAST_ID = -1
    dirs = {}
    files = {}
    root = get_dir(root_d, None, files, dirs, dir_list, file_mask)
    root['name'] = ''
    dirs[root['id']] = root
    return dict(files = files, dirs = dirs, last_id = LAST_ID)


def validate_fdata(fdata, app_folder, must_exist = False):
    fdata = Storage(fdata)
    ret = Storage(md5_hash = None, error = '', os_path = None)
    pth = fdata.path.strip()
    sanitize_pth_re = re.compile(r'\s*(\\|/)*([^\s]*)\s*$')
    pth = sanitize_pth_re.match(pth).groups()[1]
    ret.os_path = os_path = os.path.join(app_folder, pth)
    if must_exist and not os.path.exists(os_path):
        ret.error = 'it seems that path does not exist: %s' % os_path
    elif os.path.isdir(os_path):
        ret.error = 'path to a file was expected: %s [%s]' % (os_path, fdata.path)
    elif os.path.isfile(os_path):
        if not fdata.md5_hash:
            ret.error = 'md5_hash is required'
        elif md5_hash(safe_read(os_path)) != fdata.md5_hash:
            ret.error = 'file was changed on disk'
    elif os.path.exists(os_path):
        ret.error = 'path exists but it`s to never : %s' % os_path
    return ret

def write_file(fdata, app_folder):
    ret = validate_fdata(fdata, app_folder)
    if ret.error:
        return ret
    content =  fdata.get('content', '').encode('utf8')
    with open(ret.os_path, 'wb') as fl:
        fl.write(content or '')
    ret.md5_hash = md5_hash(content)
    return ret

def del_file(fdata, app_folder):
    ret = validate_fdata(fdata, app_folder, must_exist = True)
    if ret.error:
        return ret
    os.unlink(ret.os_path)
    ret.msg = 'done'
    return ret

def  main():
    pass

if __name__ == '__main__':
    main()
