import React, { useEffect, useState } from 'react';
import {
    Form, Input, Button, Checkbox,
    Typography, Space
} from 'antd';
import { useTranslation, Trans } from 'react-i18next';
import i18n from 'i18next';
import './Popup.scss';
import { go, get, set } from '../chrome';
// import ModeSwitch from './ModeSwitch';
import NormalLogo from '../../public/images/LOGO-Normal.png';
import DarkMetaShield from '../../public/images/MetaShield-Dark.png';

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

    const [agreed, setAgreed] = useState(false);
    useEffect(() => {
        get('agreed_to_the_agreement').then((res) => {
            if (res) {
                setAgreed(res);
            } else {
                setAgreed(false);
            }
        });
    }, []);
    const handleStartProtection = () => {
        setAgreed(true);
        set('agreed_to_the_agreement', true);
    };

    const handleReportFishing = () => {

    };

    return (
        <div className={`${WRAPPER_CLASS_NAME}`}>
            <div className="popup-content">
                <img src={NormalLogo} alt="MetaShield Logo"></img>
                <img src={DarkMetaShield} alt="MetaShield"></img>
                <div>
                    <span>{t('popup.slogan_part1')}</span>
                    <span>{t('popup.slogan_part2')}</span>
                </div>
                {agreed ? (
                    <>
                        <div>{t('popup.how_dose_metashield_work')}</div>
                        <button className="start-protection-button" type="button" onClick={handleReportFishing}>{t('popup.report_fishing_website')}</button>
                    </>
                ) : (
                    <>
                        <button className="start-protection-button" type="button" onClick={handleStartProtection}>{t('popup.start_protection')}</button>
                        <div>{t('popup.agree_policy_part1')}</div>
                        <div>{t('popup.agree_policy_part2')}</div>
                    </>
                )}

            </div>
            <div aria="footer" style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <div>{t('popup.footer_builderDAO')}</div>
                <div>icons</div>
            </div>
        </div>
    );
};

{ /* <Title className="center-content" level={2}>Meta Shield</Title>
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
</Form> */ }

export default Popup;
