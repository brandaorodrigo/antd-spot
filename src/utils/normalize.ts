/**
 * Class of types of normalizations to be used in normalize prop.
 */
class Normalize {
    mask = (value: string | number, mask: string): string => {
        if (!value) {
            return '';
        }
        const numeric = String(value).replace(/\D/g, '');
        let digit = 0;
        let output = '';
        if (!numeric.length) {
            return '';
        }
        for (let i = 0; i < mask.length; i += 1) {
            if (mask.charAt(i) === '_') {
                output += numeric.charAt(digit);
                if (!numeric.charAt(digit + 1)) {
                    break;
                }
                digit += 1;
            } else {
                output += mask.charAt(i);
            }
        }
        return output;
    };

    capitalize = (value: string): string => {
        if (!value) {
            return '';
        }
        return String(value).charAt(0).toUpperCase() + String(value).slice(1).toLowerCase();
    };

    cnpj = (value: string): string => this.mask(value, '__.___.___/____-__');

    cpf = (value: string): string => this.mask(value, '___.___.___-__');

    currency = (value: string | number): string => {
        if (!value && value !== '0' && value != '0,00' && value !== 0) {
            return '';
        }
        let integer = '';
        let decimal = '';
        if (typeof value === 'number') {
            const split = String(value.toFixed(2)).split('.');
            integer = String(Number(split[0]));
            decimal = split[1] ? String(split[1].slice(0, 2)) : '0';
        } else {
            const numeric = String(value).replace(/\D/g, '');
            decimal = numeric.slice(-2);
            integer = numeric.slice(0, -2);
        }
        if (decimal.length === 1) {
            decimal = `0${decimal}`;
        }
        if (integer.length) {
            integer = String(integer).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        } else {
            integer = '0';
        }
        if (integer.replaceAll('0', '') === '') {
            integer = '0';
        }
        return `${Number(integer)},${decimal}`;
    };

    currencyToNumber = (value: string): number | undefined => {
        if (!value && value != '0,00') {
            return undefined;
        }
        const numeric = value.replace(/\D/g, '');
        if (!numeric && numeric !== '0') {
            return undefined;
        }
        return Number(value.replaceAll('.', '').replaceAll(',', '.'));
    };

    date = (value: string): string => this.mask(value, '__/__/____');

    dateToIso = (value: string): string | undefined => {
        const s = value.split('/');
        if (s.length !== 3) {
            return undefined;
        }
        return `${s[2]}-${s[1]}-${s[0]}`;
    };

    email = (value: string): string => value.toLowerCase();

    lowercase = (value: string): string => {
        return value.toLowerCase();
    };

    numeric = (value: string): string => {
        return value ? value.replace(/\D/g, '') : '';
    };

    phone = (value: string): string => {
        if (!value) {
            return '';
        }
        const fix = value.replace(/\D/g, '');
        if (fix.slice(0, 1) === '0') {
            return this.mask(fix, '____-___-____');
        }
        return this.mask(fix, fix.length === 11 ? '(__) _____-____' : '(__) ____-____');
    };

    phoneToInternational = (value: string): string => {
        if (!value) {
            return '';
        }
        const numeric = value.replace(/\D/g, '');
        if (!numeric) {
            return '';
        }
        const ddi = value.slice(0, 3) === '+55' ? true : false;
        return ddi ? `+${numeric}` : `+55${numeric}`;
    };

    tag = (value: string): string => {
        if (!value) {
            return '';
        }
        const fix = value.normalize('NFD').replace(/\p{Diacritic}/gu, '');
        const number = fix.replaceAll(/[.\-/]/g, '');
        if (!isNaN(Number(number))) {
            return number;
        }
        return fix.toLowerCase();
    };

    time = (value: string): string => this.mask(value, '__:__');

    titlecase = (value: string): string => {
        if (!value) {
            return '';
        }
        const exclude = 'as,à,às,com,da,de,do,e,etc,na,no,o,dos'.split(',');
        const array = value.split(' ');
        const upper = array?.map((word) => {
            const w = word.toLowerCase();
            if (!exclude.includes(w)) {
                return w[0] ? w[0].toUpperCase() + w.slice(1).toLowerCase() : '';
            }
            return w;
        });
        if (upper) {
            value = upper.join(' ');
            value = value.replaceAll('S/a', 'S/A');
        }
        return value;
    };

    fullname = (value: string): string => {
        const fix = this.titlecase(value);
        return fix.replace(/[0-9]/g, '');
    };

    uppercase = (value: string): string => {
        return value.toUpperCase();
    };

    zipcode = (value: string): string => this.mask(value, '_____-___');
}

const normalize = new Normalize();

export default normalize;
