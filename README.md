# vue2pyj
Experimental webIDE with embedded [Rapydscript](https://github.com/atsepkov/RapydScript) for web2py (Node.js is not required)

## Installation
Just unpack vue2pyj.w2p (from [bin](https://github.com/valq7711/vue2pyj/tree/master/bin)) in your web2py/applications folder

There is also **todo** application as an example (that is ported from web3py).

To compile it do the following:

0. Unpack todo.w2p in your web2py/applications folder
1. Go to [vue2pyj/default/index](http://127.0.0.1:8000/vue2pyj/default/index)
2. Choose **todo** app to edit from the list that will appear
3. Click **todo** from the menu - you will see todo folder content
4. Go to **vuepy** folder and click on *layout.vuepy* to open it
5. Click compile from the menu - it will be compiled to views/layout.html   
6. Open and compile *index.vuepy* (as the previous one) - it will be compiled to 2 files: *views/index.html* and *static/js/index.js*
7. Now try [todo/default/index](http://127.0.0.1:8000/todo/default/index)


## Understanding veupy files
Vuepy file could consist of several parts (all parts are optional): 
```python
# vuepy/foo.vuepy

#This is the RapydML-like part - will be compiled to views/foo.html
html:
    head:
    ...
    body:
        div(id = 'app'):
    script(src = "{{=URL('static', 'js/foo.js')}}"):
    
# This is vue template part - will be compiled to html string 
# and injected into v-pyj part as foo_templ variable (see below)    
v-def foo_templ:
  div:
      vtitle(title = '...'):
      ul:
          li(v-for = 'it in items'): '${it}'
  ...
  
# This is v-pyj part (regular rapydscript) - will be compiled to static/js/foo.js    
v-pyj:
    # template will be injected here as variable:
    #foo_templ = '''
    #<div>
    #    <ul>
    #       ...
    #    </ul>
    #</div>
    #'''
    
    # it's also possible to import title.vuepy (if we have one) as regular pyj file!
    # it will be compiled to pyj on-the-fly and returned to rapydscript compiler  
    import title # - Note, that we just import title.vuepy, title.html/js files will not be created     
    vopt = {
        template: foo_templ, 
        delimiters:['${','}'],
        data:{items[...]},
        el:'#app',
        components:{'vtitle': title.vopt}
    }
    def main():
        app = new Vue(vopt)
    if __name__=='__main__':
        main()
```
