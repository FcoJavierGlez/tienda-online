const UTILS = (
    () => {
        const genHexa = maxLength => {
            const CHARACTERS = '0123456789ABCDEF';
            const LENGTH_PASS = maxLength < 1 ? 1 : maxLength;
            let numHexadecimal = "";
            for (let i = 0; i < LENGTH_PASS; i++) 
                numHexadecimal += CHARACTERS[parseInt( Math.random() * CHARACTERS.length )];
            return numHexadecimal;
        }
        const normalizeSearchRegExp = input => input.replace( /\s+/g, " " )
                                        .replace( /[aá]/gi, "(a|á)" )
                                        .replace( /[eé]/gi, "(e|é)" )
                                        .replace( /[ií]/gi, "(i|í)" )
                                        .replace( /[oó]/gi, "(o|ó)" )
                                        .replace( /[uú]/gi, "(u|ú)" );
        return {
            genHexa: genHexa,
            normalizeSearchRegExp: normalizeSearchRegExp
        }
    }
)();

export default UTILS;