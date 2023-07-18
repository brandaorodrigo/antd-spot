import { css } from '@emotion/css';
import { DefaultOptionType } from 'antd/es/select';
import dayjs, { Dayjs } from 'dayjs';
import { Rule } from 'rc-field-form/lib/interface';
import { FilterFunc } from 'rc-select/lib/Select';

import normalize from './normalize';
import validate from './validate';

type ruleProps = (
    name:
        | 'cnpj'
        | 'cpf'
        | 'currency'
        | 'date'
        | 'email'
        | 'fullname'
        | 'password'
        | 'phone'
        | 'time'
        | 'zipcode',
    message?: string,
) => Rule;

/**
 * Predefined rules to validate typed inputs.
 */
const rule: ruleProps = (name, message) => ({
    validator: (_, value) => {
        if (value !== undefined && String(value).trim() !== '') {
            const check = validate[name](value);
            if (check === true) {
                return Promise.resolve();
            }
            if (!message && typeof check === 'string') {
                return Promise.reject(new Error(check));
            }
            return Promise.reject(new Error(message ?? '${label} é inválido.'));
        }
        return Promise.resolve();
    },
});

/**
 * Compares typed value with entered value to be tested.
 */
const equal: ruleProps = (name, message) => ({
    validator: (_, value) => {
        if (value !== name) {
            return Promise.reject(new Error(message ?? '${label} é inválido.'));
        }
        return Promise.resolve();
    },
});

/**
 * Improved search in Select to ignore accents and capital letters.
 */
const filterOption: FilterFunc<DefaultOptionType> = (value, item) => {
    const input = normalize.tag(String(value));
    const label = normalize.tag(String(item?.label));
    return label.indexOf(input) !== -1 ? true : false;
};

/**
 * Combines a date, time, and zero seconds and milliseconds into a Dayjs object.
 */
const joinDateTime = (date: string | Dayjs, time: string) => {
    return dayjs(date)
        .hour(Number(time.split(':')[0]))
        .minute(Number(time.split(':')[1]))
        .second(0)
        .millisecond(0);
};

/**
 * style css fixed
 *
 */
const style = css`
    img {
        -webkit-user-select: none;
        user-select: none;
    }
    .ant-layout {
        min-height: 100vh;
    }
    .ant-table {
        thead > tr > th::before,
        thead > tr > td::before {
            display: none;
        }

        thead > tr > th::after,
        thead > tr > td::after {
            display: none;
        }

        td.ant-table-column-sort {
            background: none;
        }

        .ant-table-thead th,
        .ant-table-thead td {
            background: inherit !important;
        }

        .ant-btn {
            display: flex !important;
            height: auto !important;
            width: auto !important;
            margin: 0 auto !important;
            padding: 0 !important;
        }
    }
    .ant-table-pagination.ant-pagination {
        margin: 16px 0 0 0;
    }
`;

export { equal, filterOption, joinDateTime, rule, style };
