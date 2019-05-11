# vue2pyj
Experimental webIDE with embedded Rapydscript for web2py (Node.js is not required)

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
