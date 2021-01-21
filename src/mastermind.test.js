const colors = require('./colors')
const hints = require('./hints')
const {pickColor, generateCode, checkCode} = require("./mastermind");

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

    describe('generateCode', () => {
        it('should return four colors based on the randomfunction', () => {
            let count = 0;
            const fakeRandom = () => {
                count += 1;
                return (0.125 - 0.001) * count
            };
            expect(generateCode(fakeRandom)).toEqual([colors.RED, colors.GREEN, colors.YELLOW, colors.BLUE])
        })
    })

    describe('checkCode', () => {
        it('should turn code and guess into hints when all colors are diverge', () => {
            expect(checkCode(
                [colors.RED, colors.GREEN, colors.YELLOW, colors.BLUE],
                [colors.PURPLE, colors.ORANGE, colors.PINK, colors.BROWN]
            )).toEqual([hints.NOT_AT_ALL, hints.NOT_AT_ALL, hints.NOT_AT_ALL, hints.NOT_AT_ALL])
        })

        it('should turn code and guess into hints when all colors are equal', () => {
            expect(checkCode(
                [colors.RED, colors.GREEN, colors.YELLOW, colors.BLUE],
                [colors.RED, colors.GREEN, colors.YELLOW, colors.BLUE]
            )).toEqual([hints.FITS, hints.FITS, hints.FITS, hints.FITS])
        })

        it('should turn code and guess into hints when the right colors are incorrectly placed', () => {
            expect(checkCode(
                [colors.RED, colors.GREEN, colors.YELLOW, colors.BLUE],
                [colors.GREEN, colors.RED, colors.BLUE, colors.YELLOW]
            )).toEqual([hints.PARTIALLY, hints.PARTIALLY, hints.PARTIALLY, hints.PARTIALLY])
        })

        it('should turn code and guess into hints when some colors are diverge and some correct', () => {
            expect(checkCode(
                [colors.RED, colors.GREEN, colors.YELLOW, colors.BLUE],
                [colors.RED, colors.GREEN, colors.PINK, colors.BROWN]
            )).toEqual([hints.FITS, hints.FITS, hints.NOT_AT_ALL, hints.NOT_AT_ALL])
        })

        it('should turn code and guess into hints when some colors are diverge, some correct and some partially', () => {
            expect(checkCode(
                [colors.RED, colors.GREEN, colors.YELLOW, colors.BLUE],
                [colors.BROWN, colors.GREEN, colors.BLUE, colors.PINK]
            )).toEqual([hints.NOT_AT_ALL, hints.FITS, hints.PARTIALLY, hints.NOT_AT_ALL])
        })
        
        it('should turn code and guess into hints when some colors are diverge, some correct and some partially', () => {
            expect(checkCode(
                [colors.RED, colors.GREEN, colors.YELLOW, colors.BLUE],
                [colors.RED, colors.YELLOW, colors.BLUE, colors.GREEN]
            )).toEqual([hints.FITS, hints.PARTIALLY, hints.PARTIALLY, hints.PARTIALLY])
        })
    
    })

   
})