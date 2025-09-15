const memoize = (fn) => {
    return () => {
        return fn()
    }
}

module.exports  = {
    memoize
}