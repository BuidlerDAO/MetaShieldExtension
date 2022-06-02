import React, { useEffect, useState } from 'react';
import {
    Form, Input, Button, Checkbox,
    Typography, Space, Tooltip
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useTranslation, Trans } from 'react-i18next';
import i18n from 'i18next';
import './Popup.scss';
import { go, get, set } from '../chrome';
// import ModeSwitch from './ModeSwitch';
import NormalLogo from '../../public/images/LOGO-Normal.svg';
import DarkMetaShield from '../../public/images/MetaShield-Dark.svg';
import DiscordLogo from '../../public/images/socialmedia-discord.png';
import TwitterLogo from '../../public/images/socialmedia-twitter.png';
import WebsiteLogo from '../../public/images/socialmedia-website.png';

const { Title, Paragraph, Text } = Typography;

const Popup = () => {
    const { t } = useTranslation();
    const [safeMode, setSafeMode] = useState(false);
    // const name = WRAPPER_CLASS_NAME;
    const [form] = Form.useForm();
    const { getFieldsValue } = form;

    const getPopupContainer = () => document.getElementById('popup-root');

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
        const body = document.querySelector('body');
        body.style.margin = '0px';
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
    const handleStopProtection = () => {
        setAgreed(false);
        set('agreed_to_the_agreement', false);
    };

    const handleReportFishing = () => {

    };

    return (
        <div id="popup-root" className={`${WRAPPER_CLASS_NAME}`} style={{ margin: '0' }}>
            <div className="popup-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="popup-content">
                    <img width="68px" src={NormalLogo} alt="MetaShield Logo"></img>
                    <img width="198px" src={DarkMetaShield} alt="MetaShield"></img>
                    {/* <div className='metashield-logo'>MetaShield</div> */}
                    <div className="popup-slogan">
                        <span>{t('popup.slogan_part1')}</span>
&nbsp;
                        <span>{t('popup.slogan_part2')}</span>
                    </div>
                    {agreed ? (
                        <>
                            <div style={{ marginTop: '52px' }}>
                                {t('popup.how_dose_metashield_work')}
                                <Tooltip
                                    getPopupContainer={() => getPopupContainer()}
                                    title={(
                                        <div style={{ fontSize: '8px', color: '#767676' }}>
                                            <p>{t('popup.metashield_explanation_part1')}</p>
                                            <p>{t('popup.metashield_explanation_part2')}</p>
                                        </div>
                                    )}
                                    color="#ffffff"
                                >
                                    <QuestionCircleOutlined style={{ fontSize: '11px', marginLeft: '6px' }} />
                                </Tooltip>
                            </div>
                            <button className="report-phishing-button" style={{ marginTop: '16px' }} type="button" onClick={handleStopProtection}>{t('popup.report_fishing_website')}</button>
                        </>
                    ) : (
                        <>
                            <button className="start-protection-button" type="button" onClick={handleStartProtection}>{t('popup.start_protection')}</button>
                            <div style={{ marginTop: '15.79px' }}>{t('popup.agree_policy_part1')}</div>
                            <div><Text underline>{t('popup.agree_policy_part2')}</Text></div>
                        </>
                    )}
                </div>
                <div
                    aria="footer"
                    className="popup-footer"
                    style={{
                        opacity: '0.5', width: '100%', display: 'flex', justifyContent: 'space-between'
                    }}
                >
                    <div>{t('popup.footer_builderDAO')}</div>
                    <div style={{ width: 'auto', display: 'flex', justifyContent: 'end' }} aria="social media icons">
                        <img src={WebsiteLogo} alt="Website Logo" />
                        <img src={TwitterLogo} style={{ marginLeft: '12.2px' }} alt="Twitter Logo" />
                        <img src={DiscordLogo} style={{ marginLeft: '12.2px' }} alt="Discord Logo" />
                    </div>
                </div>
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
