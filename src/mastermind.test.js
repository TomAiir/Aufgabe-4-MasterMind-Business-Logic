const colors = require('./colors')
const {pickColor} = require("./mastermind");

describe('mastermind', () => {
    it ('it works', () => {
        console.log('it works')
    })

    describe('pickColor', () => {
        it ('should take a randomfn and return a color based on that', () => {
            expect(pickColor(() => 0.1)).toEqual(colors.RED)
            
        });

        [
            { valueRange: 0.125, color: colors.RED },
            { valueRange: 0.25, color: colors.GREEN },
            { valueRange: 0.375, color: colors.YELLOW },
            { valueRange: 0.5, color: colors.BLUE },
            { valueRange: 0.625, color: colors.PURPLE },
            { valueRange: 0.75, color: colors.ORANGE },
            { valueRange: 0.875, color: colors.PINK },
            { valueRange: 1.00, color: colors.BROWN },
            
        ].forEach(({valueRange, color})=> {
            it(`should return ${color} for value in Range of ${valueRange}`, () => {
                expect(pickColor(()=>{return valueRange - 0.001})).toEqual(color)
            })
        })

        it('should prevent exceptions for value >=1.0', () => {
            expect(pickColor(() => 1.000)).toEqual(colors.RED)
            expect(pickColor(() => 1.444)).toEqual(colors.BLUE)
            expect(pickColor(() => 999.8)).toEqual(colors.PINK)
        })
    });

   
});