# -*- coding: utf-8 -*-
# this file is released under public domain and you can use without limitations

#########################################################################
## This is a sample controller
## - index is the default action of any application
## - user is required for authentication and authorization
## - download is for downloading files uploaded in the db (does streaming)
#########################################################################
import fs2json
import os

if not request.is_local:
    raise HTTP(403, 'insecure connection')

def index():
    response.view = 'index.html'
    return dict(a=1)

APPS_FOLDER = os.path.split(os.path.normpath(request.folder))[0]

@service.json
def list_apps():
    return next(os.walk(APPS_FOLDER))[1]

@service.json
def cm_themes():
    cm_themes_dir = os.path.join(request.folder, 'static/js/codemirror/theme')
    return [ fname for fname in os.listdir(cm_themes_dir) if fname.endswith('.css')]

@service.json
def get_fs(w2p_app = None):
    dir_list = {
        'controllers':None,
        'static': {
            'js': None,
            'css': None,
        },
        'modules':None,
        'models':None,
        'views':None,
        'vuepy':None,
    }
    app_folder = os.path.join(APPS_FOLDER, w2p_app) if w2p_app else os.path.normpath(request.folder)
    ret = fs2json.dir_to_fs(app_folder, dir_list)
    return ret

@service.json
def write_file(fdata):
    w2p_app = fdata.get('w2p_app')
    app_folder = os.path.join(APPS_FOLDER, w2p_app) if w2p_app else os.path.normpath(request.folder)
    ret = fs2json.write_file(fdata, app_folder)
    return dict(ret)


@service.json
def del_file(fdata):
    w2p_app = fdata.get('w2p_app')
    app_folder = os.path.join(APPS_FOLDER, w2p_app) if w2p_app else os.path.normpath(request.folder)
    ret = fs2json.del_file(fdata, app_folder)
    return dict(ret)



def user():
    """
    exposes:
    http://..../[app]/default/user/login
    http://..../[app]/default/user/logout
    http://..../[app]/default/user/register
    http://..../[app]/default/user/profile
    http://..../[app]/default/user/retrieve_password
    http://..../[app]/default/user/change_password
    http://..../[app]/default/user/manage_users (requires membership in
    http://..../[app]/default/user/bulk_register
    use @auth.requires_login()
        @auth.requires_membership('group name')
        @auth.requires_permission('read','table name',record_id)
    to decorate functions that need access control
    """
    return dict(form=auth())


def call():
    """
    exposes services. for example:
    http://..../[app]/default/call/jsonrpc
    decorate with @services.jsonrpc the functions to expose
    supports xml, json, xmlrpc, jsonrpc, amfrpc, rss, csv
    """
    return service()


