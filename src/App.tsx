import 'antd/dist/reset.css';

import { css } from '@emotion/css';
import { Button, ConfigProvider, Form, Input, Select, Table } from 'antd';
import ptBR from 'antd/es/locale/pt_BR';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import {
    City,
    fetchJson,
    filterOption,
    googleFonts,
    normalize,
    rule,
    State,
    storage,
    style,
} from './';

dayjs.locale('pt-br');

const App: React.FC = () => {
    const [state, setState] = useState<string>();
    const [fullname, setFullname] = useState<string>();

    const [form] = Form.useForm();

    const onFinish = (submit: any) => {
        storage.set('fullname', submit.fullname);
        fetchJson('http://www.api', {
            body: JSON.stringify(submit),
        });
    };

    useEffect(() => {
        googleFonts(['Readex Pro']);
        const fullname = storage.get('fullname');
        setFullname(fullname);
    }, []);

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Age', dataIndex: 'age', key: 'age' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
    ] as any;

    const dataSource = [
        { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
        { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
        { key: '3', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park' },
    ];

    return (
        <ConfigProvider
            form={{
                validateMessages: {
                    required: '${label} é obrigatório.',
                },
                scrollToFirstError: true,
            }}
            locale={ptBR}
            theme={{ token: { fontFamily: 'Readex Pro' } }}
        >
            <div
                className={css`
                    width: 100%;
                    background-color: #fff;
                    ${style}
                `}
            >
                <div
                    className={css`
                        width: 400px;
                        margin: 0 auto;
                        padding: 40px 0;
                    `}
                >
                    <h1>{fullname}</h1>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        validateTrigger="onBlur"
                    >
                        <Form.Item
                            label="CNPJ"
                            name="cnpj"
                            normalize={normalize.cnpj}
                            required
                            rules={[{ required: true }, rule('cnpj')]}
                        >
                            <Input placeholder="CNPJ..." />
                        </Form.Item>

                        <Form.Item
                            label="CPF"
                            name="cpf"
                            normalize={normalize.cpf}
                            required
                            rules={[{ required: true }, rule('cpf')]}
                        >
                            <Input placeholder="CPF..." />
                        </Form.Item>

                        <Form.Item
                            label="Currency"
                            name="currency"
                            normalize={normalize.currency}
                            required
                            rules={[{ required: true }, rule('currency')]}
                        >
                            <Input placeholder="Currency..." prefix="R$" />
                        </Form.Item>

                        <Form.Item
                            label="Date"
                            name="date"
                            normalize={normalize.date}
                            required
                            rules={[{ required: true }, rule('date')]}
                        >
                            <Input placeholder="Date..." />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            normalize={normalize.email}
                            required
                            rules={[{ required: true }, rule('email')]}
                        >
                            <Input placeholder="Email..." />
                        </Form.Item>

                        <Form.Item
                            label="Fullname"
                            name="fullname"
                            normalize={normalize.fullname}
                            required
                            rules={[{ required: true }, rule('fullname')]}
                        >
                            <Input placeholder="Fullname..." />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            required
                            rules={[{ required: true }, rule('password')]}
                        >
                            <Input placeholder="Password..." />
                        </Form.Item>

                        <Form.Item
                            label="Phone"
                            name="phone"
                            normalize={normalize.phone}
                            required
                            rules={[{ required: true }, rule('phone')]}
                        >
                            <Input placeholder="Phone..." />
                        </Form.Item>

                        <Form.Item
                            label="Time"
                            name="time"
                            normalize={normalize.time}
                            required
                            rules={[{ required: true }, rule('time')]}
                        >
                            <Input placeholder="Time..." />
                        </Form.Item>

                        <Form.Item
                            label="Zipcode"
                            name="zipcode"
                            normalize={normalize.zipcode}
                            required
                            rules={[{ required: true }, rule('zipcode')]}
                        >
                            <Input placeholder="Zipcode..." />
                        </Form.Item>

                        <Form.Item
                            label="Capitalize"
                            name="capitalize"
                            normalize={normalize.capitalize}
                            required
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Capitalize..." />
                        </Form.Item>

                        <Form.Item
                            label="Lowercase"
                            name="lowercase"
                            normalize={normalize.lowercase}
                            required
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Lowercase..." />
                        </Form.Item>

                        <Form.Item
                            label="Numeric"
                            name="numeric"
                            normalize={normalize.numeric}
                            required
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Numeric..." />
                        </Form.Item>

                        <Form.Item
                            label="Tag"
                            name="tag"
                            normalize={normalize.tag}
                            required
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Tag..." />
                        </Form.Item>

                        <Form.Item
                            label="Titlecase"
                            name="titlecase"
                            normalize={normalize.titlecase}
                            required
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Titlecase..." />
                        </Form.Item>

                        <Form.Item
                            label="Uppercase"
                            name="uppercase"
                            normalize={normalize.uppercase}
                            required
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Uppercase..." />
                        </Form.Item>

                        <Form.Item
                            label="Select"
                            name="select"
                            required
                            rules={[{ required: true }]}
                        >
                            <Select
                                filterOption={filterOption}
                                options={[
                                    { value: 1, label: 'First' },
                                    { value: 2, label: 'Second' },
                                    { value: 3, label: 'Third' },
                                ]}
                                placeholder="Select..."
                                showSearch
                            />
                        </Form.Item>

                        <Form.Item label="State" name="state" required rules={[{ required: true }]}>
                            <State
                                filterOption={filterOption}
                                onChange={(value) => {
                                    setState(value);
                                    form.setFieldValue('city', undefined);
                                }}
                                placeholder="State..."
                                showSearch
                            />
                        </Form.Item>

                        <Form.Item label="City" name="city" required rules={[{ required: true }]}>
                            <City
                                disabled={!state}
                                filterOption={filterOption}
                                placeholder="City..."
                                showSearch
                                state={state}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button block htmlType="submit" type="primary">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <Table columns={columns} dataSource={dataSource} pagination={false} />
                </div>
            </div>
        </ConfigProvider>
    );
};

export default App;
