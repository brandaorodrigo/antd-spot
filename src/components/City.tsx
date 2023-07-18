import { Select, SelectProps } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import React, { useEffect, useState } from 'react';

import { server } from './State';

type FetchProps = { key: string; value: string; label: string }[];

type Props = Omit<SelectProps, 'options'> & { state: string | undefined };

const City: React.FC<Props> = ({ state, ...props }) => {
    const [options, setOptions] = useState<DefaultOptionType[]>([]);

    const getCities = (state: string) => {
        fetch(`${server}/${state}/municipios?orderBy=nome`, { method: 'GET', redirect: 'follow' })
            .then((response) => response.json())
            .then((result: { id: string; nome: string }[]) => {
                const data = [] as FetchProps;
                if (result) {
                    result?.map(({ id, nome }) => data.push({ key: id, value: nome, label: nome }));
                }
                setOptions(data);
            });
    };

    useEffect(() => {
        if (!state) {
            return;
        }
        getCities(state);
    }, [state]);

    return <Select options={options} {...props} />;
};

export default City;
