// Problem - valueByPath
// first arg - any object
// second arg - string - e.g. 'key.key.key'
// if cannot find value - return undefined

// We have an array of e.g. 
// const input = {
//     'one': {
//         'two': 'three'
//     },
//     'four': 'five'
// }
// const path = 'one.two'
// const expected = 'three'

// In the case above, 'searchKeys' will be ['one', 'two']
// Going through the keys, if the first one exists in at the root level,
// e.g. 'one', then see if the value of 'one' is a object
// if it is an object, see if 'two' exists
// and then we've reached the end of the searchKeys array, so return the 
// the value of 'two'

const valueByPathFor = (input = {}, path) => {
    if (!!!input || !!!path) {
        return undefined
    }
    // split the path by the .
    const searchKeys = path.split('.')

    let currentObject = input

    for(let i = 0; i < searchKeys.length; i++) {
        const currentSk = searchKeys[i]
        const lastSearchKey = i === searchKeys.length-1
        const found = currentObject[currentSk]
        if (lastSearchKey && found) return found 
        if (!lastSearchKey) currentObject = found   
    }

    return undefined
}

const valueByPathReduce = (input = {}, path = "") => {
    if (!!!input || !!!path) {
        return undefined
    }
    return path.split('.').reduce((accObject, searchKey) => {
        return accObject[searchKey] 
    }, input)
}

const valueByPath = valueByPathReduce

module.exports = {
    valueByPath
}
