
const context = require.context('@/docs', true, /\.md$/);

const impComp = (path) => require('@/docs/'+ path)

const getName = ( path ) => path.substring(path.lastIndexOf('/') ,  path.lastIndexOf('.md'))

const isHome = path => path === 'README.md' || path === 'markdown.md'

const getPath = ( path ) => {
    const isSubHome = isHome(path.substring(path.lastIndexOf('/') + 1))
    const p = isSubHome ? path.substring(0 , path.lastIndexOf('/')) : path.substring(0 ,  path.lastIndexOf('.md'))
    return p
}

const isRoot =  path => path.indexOf('/') === -1

const toRoute = ( path , componentPath  ) => ({
    path : '/' +path ,
    component : () => impComp(componentPath)
})

const treeData = []

export function generate (){
    const files = context.keys().sort();
    const result = []
    for (let i = 0 ; i < files.length ; i ++) {
        const path = files[i].substr(2)
        if(isHome(path)){
            result.splice(0,0,toRoute('' , path))
        }else {
            result.push(toRoute(getPath(path) , path))
        }
    }
    return result
}
