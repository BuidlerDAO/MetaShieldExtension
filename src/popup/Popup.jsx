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
        // body.style.fontFamily = 'Open Sans';
        // console.log('navigator.userLanguage :>> ', navigator.language);
        // console.log('i18n.language :>> ', i18n.language);
        // if (i18n.language === 'zh') {
        //     body.style.fontFamily = 'Noto Sans SC';
        // }
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

    const handleReportPhishing = () => {
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSf-hDJPCfkAfSlSFFmKAGeFDGtEQ1tyKhxtkDE8sU5uQ1BrMA/viewform?usp=sf_link', '_blank');
    };

    return (
        <div id="popup-root" className={`${WRAPPER_CLASS_NAME}`} style={{ margin: '0' }}>
            <div className={`popup-body popup-${i18n.language}`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="popup-content">
                    <img width="68px" src={NormalLogo} alt="MetaShield Logo"></img>
                    <img src={DarkMetaShield} alt="MetaShield"></img>
                    {/* <div className='metashield-logo'>MetaShield</div> */}
                    <div className={i18n.language === 'zh' ? 'popup-slogan' : 'popup-slogan-en'}>
                        <span>{t('popup.slogan_part1')}</span>
                        {i18n.language === 'zh' ? ' ' : ', '}
                        <span>{t('popup.slogan_part2')}</span>
                    </div>
                    {agreed ? (
                        <>
                            <div style={{ display: 'flex', marginTop: '52px' }}>
                                <div>
                                    {t('popup.how_dose_metashield_work')}
                                </div>
                                <div style={{ paddingTop: '1px' }}>
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
                                        <QuestionCircleOutlined style={{ fontSize: '11px', marginLeft: '4px' }} />
                                    </Tooltip>
                                </div>
                            </div>
                            <button className={`report-phishing-button is-${i18n.language}-button`} style={{ marginTop: '16px' }} type="button" onClick={handleReportPhishing}>{t('popup.report_phishing_website')}</button>
                        </>
                    ) : (
                        <>
                            <button className="start-protection-button" type="button" onClick={handleStartProtection}>{t('popup.start_protection')}</button>
                            <div className={`popup-policy-${i18n.language}`} style={{ marginTop: '15.79px' }}>{t('popup.agree_policy_part1')}</div>
                            <div className={`popup-policy-${i18n.language}`}><Text underline>{t('popup.agree_policy_part2')}</Text></div>
                        </>
                    )}
                </div>
                <div
                    className="popup-footer"
                    style={{
                        opacity: '0.5', width: '100%', display: 'flex', justifyContent: 'space-between'
                    }}
                >
                    <div>{t('popup.footer_builderDAO')}</div>
                    <div style={{ width: 'auto', display: 'flex', justifyContent: 'end' }}>
                        <a href=""><img src={WebsiteLogo} alt="Website Logo" /></a>
                        <a href=""><img src={TwitterLogo} style={{ marginLeft: '12.2px' }} alt="Twitter Logo" /></a>
                        <a href=""><img src={DiscordLogo} style={{ marginLeft: '12.2px', width: '16px' }} alt="Discord Logo" /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
