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

    it('should return undefined if a key is not found', () => {
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

    it.only('should return undefined if a key is not found', () => {
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
})
