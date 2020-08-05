const { valueByPath } = require('../problem');

describe("valueByPath", () => {
    it('should find correct value at the first level', () => {
        const input = {
            'one': {
                'two': 'three'
            },
            'four': 'five'
        }
        const path = 'one'
        const expected = {
            'two': 'three'
        }
        expect(valueByPath(input,path)).toEqual(expected)
    })

    it('should find correct value at the second level', () => {
        const input = {
            'one': {
                'two': 'three'
            },
            'four': 'five'
        }
        const path = 'one.two'
        const expected = 'three'
        expect(valueByPath(input,path)).toEqual(expected)
    })

    it('should find correct value at the third level', () => {
        const input = {
            '1': {
                '2': {
                    '3': '4' 
                }
            },
            '5': '6'
        }
        const path = '1.2.3'
        const expected = '4'
        expect(valueByPath(input,path)).toEqual(expected)
    })

    it('should find correct value at the first level', () => {
        const input = {
            '1': {
                '2': {
                    '3': '4' 
                }
            },
            '5': '6'
        }
        const path = '5'
        const expected = '6'
        expect(valueByPath(input,path)).toEqual(expected)
    })

    it('should return undefined if a key is not found - key does not exist', () => {
        const input = {
            'one': {
                'two': 'three'
            },
            'four': 'five'
        }
        const path = 'six'
        const expected = undefined
        expect(valueByPath(input,path)).toEqual(expected)
    })

    it('should return undefined if a key is not found - key has no value', () => {
        const input = {
            'one': {
                'two': 'three'
            },
            'four': 'five'
        }
        const path = 'one.two.three'
        const expected = undefined
        expect(valueByPath(input,path)).toEqual(expected)
    })

    it('should return the correct element of an array', () => {
        const input = {
            'one': {
                'two': [3, 4, 5, 6]
            },
            'seven': 'eight'
        }
        const path = 'one.two.1'
        const expected = 4
        expect(valueByPath(input,path)).toEqual(expected)
    })

    it('should return a function as a value', () => {
        const func = (a) => console.log('I am anonymous')
        const input = {
            'one': {
                'two': func
            },
            'seven': 'eight'
        }
        const path = 'one.two'
        expect(valueByPath(input,path)).toEqual(func)
    })

    it('should return undefined for undefined or null input/path', () => {
        const expected = undefined
        expect(valueByPath(null,null)).toEqual(expected)
        expect(valueByPath(null,undefined)).toEqual(expected)
        expect(valueByPath(undefined,null)).toEqual(expected)
        expect(valueByPath(undefined,undefined)).toEqual(expected)
    })
})
