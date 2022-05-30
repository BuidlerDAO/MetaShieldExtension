import React, { useState } from 'react';
import {
    Form, Input, Button, Checkbox,
    Typography, Space
} from 'antd';

import { useTranslation, Trans } from 'react-i18next';
import i18n from 'i18next';

import './Popup.scss';
import { go } from '../chrome';
import ModeSwitch from './ModeSwitch';

const { Title, Paragraph, Text } = Typography;

const Popup = () => {
    const { t } = useTranslation();
    const [safeMode, setSafeMode] = useState(false);
    // const name = WRAPPER_CLASS_NAME;
    const [form] = Form.useForm();
    const { getFieldsValue } = form;

    const changeLanguage = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en'); // val入参值为'en'或'zh'
    };

    const gotoPage = (pageUrl) => {
        if (!pageUrl) {
            go('../html/view.html');
        }
        go(pageUrl);
    };

    const handleMask2Click = () => {
        const value = getFieldsValue();
        console.log('value :>> ', value);
        const address = document.getElementById('Address').value;
        gotoPage(`https://mask2-web.vercel.app/network=ethereum&address=${address}`);
    };

    const onFinish = (values) => {
        // console.log(form);
    };

    return (
        <div className={`${WRAPPER_CLASS_NAME}`}>
            <Title className="center-content" level={2}>Meta Shield</Title>
            <Paragraph className="center-content">
                Keep you
                {'  '}
                <Text strong style={{ color: '#1da57a' }}>
            &nbsp;safe&nbsp;
                </Text>
                {' '}
                in
                {' '}
                <Text code>Web3</Text>
                .
            </Paragraph>
            <Button onClick={changeLanguage}>{t('popup.switch_language')}</Button>
            <Form
                form={form}
                onFinish={onFinish}
                layout="Vertical"
                name="basic"
                className="basic-table"
                initialValues={{ remember: true }}
            >
                <ModeSwitch
                    safeMode={safeMode}
                    setSafeMode={(checked) => {
                        setSafeMode(checked);
                    }}
                ></ModeSwitch>

                <Form.Item
                    label="Address"
                    name="Address"
                    rules={[{ required: true, message: 'Please input your Address!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        onClick={() => {
                            handleMask2Click();
                        }}
                        className="form-button"
                    >
                        Mask^2
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Popup;
