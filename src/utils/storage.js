export const storage={

    get(key){
        const value=localStorage.getItem(key)
        
        if (!value) {
            return null
        } else {
            
            return value
            
        }
    },

    set(key,value) {
        localStorage.setItem(key,value)
    },

    remove(key) {
        localStorage.removeItem(key)
    },

    clearLocalStorage() {
        localStorage.clear()
    }



}