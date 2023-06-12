const fractionFormatter = (decimal) => {
    decimal = Math.round(decimal * 1000) / 1000
    const fractions = [
        { decimal: 0.25, fraction: '1/4', unicode: '¼' },
        { decimal: 0.5, fraction: '1/2', unicode: '½' },
        { decimal: 0.75, fraction: '3/4', unicode: '¾' },
        { decimal: 0.125, fraction: '1/8', unicode: '⅛' },
        { decimal: 0.375, fraction: '3/8', unicode: '⅜' },
        { decimal: 0.625, fraction: '5/8', unicode: '⅝' },
        { decimal: 0.875, fraction: '7/8', unicode: '⅞' },
        { decimal: 0.20, fraction: '1/5', unicode: '⅕' },
        { decimal: 0.40, fraction: '2/5', unicode: '⅖' },
        { decimal: 0.60, fraction: '3/5', unicode: '⅗' },
        { decimal: 0.80, fraction: '4/5', unicode: '⅘' },
        { decimal: 0.166, fraction: '1/6', unicode: '⅙' },
        { decimal: 0.333, fraction: '1/3', unicode: '⅓' },
        { decimal: 0.667, fraction: '2/3', unicode: '⅔' },
        { decimal: 0.090, fraction: '1/11', unicode: '⅒' },
        { decimal: 0.833, fraction: '5/6', unicode: '⅚' },
    ]
    if (
        fractions.find(fraction => fraction.decimal === decimal)
    ){
        return fractions.find(fraction => fraction.decimal === decimal).unicode
    } else if (decimal > 0){
        const whole = Math.floor(decimal)
        const remainder = decimal - whole
        if (fractions.find(fraction => fraction.decimal === remainder)){
            return `${whole} ${fractions.find(fraction => fraction.decimal === remainder).unicode}`
        } else {
            return decimal
        }
    }
     else {
        return decimal
    }
}

export default fractionFormatter