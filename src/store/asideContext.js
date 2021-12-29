import {defineStore} from 'pinia'

export const useAsideContext = defineStore('asideContext', {
    state: () => {
        return {
            currentAsideTree: null
        }
    },

    actions: {
        setCurrentAsideTree(treeData) {
            this.currentAsideTree = treeData
        }
    }
})
