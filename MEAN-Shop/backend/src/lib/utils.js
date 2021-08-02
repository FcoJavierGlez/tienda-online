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
        return {
            genHexa: genHexa,
        }
    }
)();

export default UTILS;