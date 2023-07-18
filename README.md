# antd-spot

![antd-spot](logo.png "antd-spot")

[![Version](https://img.shields.io/npm/v/antd-spot.svg)](https://www.npmjs.com/package/antd-spot)

## install

```sh
npm i antd-spot

```

## normalize

### normalize: how to use in javascript

```javascript

const value = '18137944133';
const fix = normalize.cpf(value);
// output fix = 181.379.441-33

```

### normalize: how to use in form

```javascript
<Form.Item label="Phone" name="phone" normalize={normalize.phone}>
    <Input placeholder="Phonenumber..." />
</Form.Item>
```

### normalize: types

#### used on form and javascript

-   `capitalize` _capitalizes the first letter of a string and lowercases the remaining letters._
-   `cnpj` _normalize a brazilian cnpj number._
-   `cpf` _normalize a brazilian cpf number._
-   `currency` _normalize a currency value in the international format._
-   `date` _normalize a date in the format of "dd/mm/yyyy"._
-   `email` _normalize an email address._
-   `fullname` _normalize a fullname._
-   `lowercase` _converts a string to lowercase._
-   `numeric` _removes all non-numeric characters from a string._
-   `phone` _normalize a phone number._
-   `time` _normalize a time in the format of "hh:mm"._
-   `titlecase` _capitalizes the first letter of each word in a string._
-   `uppercase` _converts a string to uppercase._
-   `zipcode` _normalize a brazilian zip code._

#### used only in javascript

-   `dateToIso` _convert a data to the iso format._
-   `currencyToNumber` _convert currency to float value._
-   `phoneToInternational` _convert a phone to the international format._

### normalize: example

```javascript
import React, { useEffect } from 'react';

import { Button, Form, Input } from 'antd';

import { normalize } from '../utils/antd';

const App: React.FC = () => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            cpf: normalize.cpf('18137944133'),
        });
    }, []);

    return (
        <Form
            form={form}
            onFinish={(data: any) => console.log(data)}
            validateTrigger="onBlur"
        >
            <Form.Item label="CPF" name="cpf" normalize={normalize.cpf}>
                <Input />
            </Form.Item>
            <Button htmlType="submit">Send</Button>
        </Form>
    );
};

export default App;
```

## rules


### rules: how to use

```javascript
<Form.Item
    label="CPF"
    name="cpf"
    normalize={normalize.cpf}
    required
    rules={[{ required: true }, rule('cpf', '${label} is invalid.')]}
>
    <Input />
</Form.Item>
```

### rules: types

-   `cnpj` _validates a brazilian cnpj number._
-   `cpf` _validates a brazilian cpf number._
-   `currency` _validates a currency value in the international format._
-   `date` _validates a date in the format of "dd/mm/yyyy"._
-   `email` _validates an email address._
-   `fullname` _validates a fullname._
-   `password` _validates a password._
-   `phone` _validates a phone number, ensuring that it has at least 10 digits._
-   `time` _validates a time in the format of "hh:mm"._
-   `zipcode` _validates a brazilian zip code._

### rules: example

```javascript
import React, { useEffect } from 'react';

import { Button, Form, Input } from 'antd';

import { normalize, rule } from 'antd-normalize-validate';

const App: React.FC = () => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            cpf: normalize.cpf('18137944133'),
        });
    }, []);

    return (
        <Form
            form={form}
            onFinish={(data: any) => console.log(data)}
            validateTrigger="onBlur"
        >
            <Form.Item
                label="CPF"
                name="cpf"
                normalize={normalize.cpf}
                required
                rules={[
                    { required: true },
                    rule('cpf', '${label} is invalid.'),
                ]}
            >
                <Input />
            </Form.Item>
            <Button htmlType="submit">Send</Button>
        </Form>
    );
};

export default App;
```

## filter option

### filter option: how to use

```javascript
import React from 'react';

import { filterOption } from 'antd-normalize-validate';

const App: React.FC = () => {
    return (
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
    );
};

export default App;
```

## select state and city

```javascript
import React, {useState} from 'react';

import { Button, Form, Input } from 'antd';

import { filterOption, City, State } from 'antd-normalize-validate';

const App: React.FC = () => {
    const [state, setState] = useState<string>();
    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            layout="vertical"
            validateTrigger="onBlur"
        >
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
    );
};

export default App;
```

## author

[rodrigo brandão](https://www.linkedin.com/in/brandaorodrigo)
[jonas batista](https://www.linkedin.com/in/jonas-batista-1ba7bb187)
[thayná muller](https://www.linkedin.com/in/thaynamuller)

## license

[mit licensed](LICENSE)
