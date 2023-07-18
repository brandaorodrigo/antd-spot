import dayjs, { Dayjs } from 'dayjs';

/**
 * Class of types of validations to be used together with rules.
 */
class Validate {
    cnpj = (value: string): boolean => {
        const mod11 = (clear: string, limit: number): number => {
            const value = String(clear).replace(/\D/g, '');
            let sum = 0;
            let mult = 2;
            for (let i = value.length - 1; i >= 0; i--) {
                sum += mult * +value[i];
                if (++mult > limit) {
                    mult = 2;
                }
            }
            const dv = ((sum * 10) % 11) % 10;
            return dv;
        };
        value = value.replace(/\D+/g, '');
        if (value.length !== 14 || value.match(/(\d)\1{13}/)) {
            return false;
        }
        const number = value.substring(0, value.length - 2);
        const dv1 = mod11(number, 9);
        const dv2 = mod11(number + dv1, 9);
        return number + dv1 + dv2 === value;
    };

    cpf = (value: string): boolean => {
        const mod11 = (clear: string, limit: number): number => {
            const value = String(clear).replace(/\D/g, '');
            let sum = 0;
            let mult = 2;
            for (let i = value.length - 1; i >= 0; i--) {
                sum += mult * +value[i];
                if (++mult > limit) {
                    mult = 2;
                }
            }
            const dv = ((sum * 10) % 11) % 10;
            return dv;
        };
        value = value.replace(/\D+/g, '');
        if (value.length !== 11 || value.match(/(\d)\1{10}/)) {
            return false;
        }
        const number = value.slice(0, 9);
        const dv1 = mod11(number, 12);
        const dv2 = mod11(number + dv1, 12);
        return number + dv1 + dv2 === value;
    };

    currency = (value: string): boolean => {
        return /^((?=.*[1-9]|0)(?:\d{1,3}))((?=.*\d)(?:.\d{3})?)*((?=.*\d)(?:,\d\d){1}?){0,1}$/gm.test(
            value,
        );
    };

    date = (value: string | Dayjs): boolean => {
        if (typeof value === 'object') {
            return dayjs(value).isValid();
        }
        if (value.length !== 10) {
            return false;
        }
        const split = value.split('/');
        if (split.length !== 3) {
            return false;
        }
        const original = `${split[2]}-${split[1]}-${split[0]}`;
        const format = dayjs(original).format('YYYY-MM-DD');
        return original === format ? true : false;
    };

    email = (value: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    fullname = (value: string): boolean | string => {
        const split = value.trim().split(' ');
        if (split.length) {
            if (split.length === 1) {
                return 'Digite o nome completo.';
            }
            if (split[0].length < 2 || split[split.length - 1].length < 2) {
                return 'Não utilize abreviações.';
            } else {
                return true;
            }
        } else {
            return false;
        }
    };

    password = (value: string): string | boolean => {
        if (value.search(/[a-z]/) === -1) {
            return 'Necessário pelo menos uma letra minúscula.';
        }
        if (value.search(/[A-Z]/) === -1) {
            return 'Necessário pelo menos uma letra maiúscula.';
        }
        if (value.search(/[0-9]/) === -1) {
            return 'Necessário pelo menos um número.';
        }
        if (value.search(/[#?!@$%^&*-]/) === -1) {
            return 'Necessário um caracter especial.';
        }
        return true;
    };

    phone = (value: string): boolean => {
        value = value.replace(/\D/g, '');
        return value.length < 10 ? false : true;
    };

    time = (value: string): boolean => {
        if (value.length !== 5 || value.indexOf(':') !== 2) {
            return false;
        }
        const split = value.split(':');
        if (Number(split[0]) > 23 || Number(split[1]) > 59) {
            return false;
        }
        return true;
    };

    zipcode = (value: string): boolean => {
        return value.length === 9 ? true : false;
    };
}

const validate = new Validate();

export default validate;
