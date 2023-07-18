import { Select, SelectProps } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import React, { useEffect, useState } from 'react';

const server = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

type FetchProps = { key: string; value: string; label: string }[];

type Props = Omit<SelectProps, 'options'>;

const State: React.FC<Props> = ({ ...props }) => {
    const [options, setOptions] = useState<DefaultOptionType[]>([]);

    const getStates = () => {
        fetch(`${server}?orderBy=nome`, { method: 'GET', redirect: 'follow' })
            .then((response) => response.json())
            .then((result: { id: string; sigla: string; nome: string }[]) => {
                const data = [] as FetchProps;
                if (result) {
                    result?.map(({ id, sigla, nome }) =>
                        data.push({ key: id, value: sigla, label: nome }),
                    );
                }
                setOptions(data);
            });
    };

    useEffect(() => {
        getStates();
    }, []);

    return <Select options={options} {...props} />;
};

export default State;
export { server };
