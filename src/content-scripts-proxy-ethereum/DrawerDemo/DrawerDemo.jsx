import React, { useEffect, useState } from 'react';
import {
    Modal, Drawer, Button, Alert, notification, Col, Row,
    Typography
} from 'antd';
import { ExclamationOutlined, StopOutlined, LinkOutlined } from '@ant-design/icons';
import { useTranslation, Trans } from 'react-i18next';
import { proxyClient } from '../message';
import 'animate.css';
import './DrawerDemo.scss';
import MetaShieldWhite from '../../../public/images/MetaShield-White.png';
import ExclamationBold from '../../../public/images/ExclamationBold.png';
import i18n from '../../i18n/config';

// import { contentClient, ChromeMessage } from '../../chrome';
const { Title, Link, Text } = Typography;

const DrawerDemo = ({
    type, message, verification, contractAddress, domain, method, params
}) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(true);

    const getContainer = () => document.querySelector('#chrome-extension-content-base-element-ethereum');

    const hideContainer = () => {
        document.querySelector('#chrome-extension-content-base-element-ethereum').setAttribute('style', 'display: none');
    };

    const postMessageToCurrentPage = (decision) => {
        console.log('start posting message');
        const msg = { msg_key: 'user_decision', value: decision };
        proxyClient.postMsg(msg);
    };

    // showContainer() {
    //     document.querySelector('#chrome-extension-content-base-element-ethereum').setAttribute('style', 'display: block');
    // }

    // Background 通讯
    // async sendMsgToBackground() {
    //     const res = await contentClient.seedMessage(new ChromeMessage('test connect'));

    //     this.setState({
    //         messageFromBg: res.msg
    //     });
    // }

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setVisible(false);
        }, 3000);
    };

    const handleCancel = () => {
        setVisible(false);
        hideContainer();
        setTimeout(() => {
            setVisible(true);
        }, 300);
    };

    useEffect(() => {
        setVisible(true);
        if (type === 'success') {
            setTimeout(() => {
                setVisible(false);
            }, 3000);
        }
    }, []);

    const getModalContent = (renderType) => {
        const contractInfo = {
            true: t('drawer.contract_verified'),
            false: t('drawer.contract_not_verified'),
            unknown: t('drawer.contract_unknown')
        };

        if (renderType === 'warning') {
            return (
                <>
                    <p style={{ marginBottom: '4px', color: 'rgba(52, 48, 46, 1)' }}>{t('drawer.you_are_authorizing')}</p>
                    <p style={{ marginBottom: '12px' }}>
                        <a href={`https://etherscan.io/address/${contractAddress}`} style={{ color: '#8c8c8c' }} target="_blank" rel="noreferrer">
                            <Text type="secondary">{contractAddress}</Text>
                            <Text type="secondary"><LinkOutlined color="#8c8c8c" className="svg-control" /></Text>
                        </a>
                    </p>
                    <p style={{ color: 'rgba(52, 48, 46, 1)' }}>
                        {t('drawer.website_unknown')}
                        {t('comma')}
                        {contractInfo[verification.contract.Verified]}
                        {t('dot')}
                        {t('drawer.transfer_remind')}
                    </p>
                </>
            );
        }
        return (
            <>
                <p style={{ marginBottom: '0px', color: 'rgba(52, 48, 46, 1)' }}>{t('drawer.you_are_authorizing')}</p>
                <p style={{ marginBottom: '12px', color: 'rgba(52, 48, 46, 1)' }}>
                    <a href={`https://etherscan.io/address/${contractAddress}`} style={{ color: '#8c8c8c' }} target="_blank" rel="noreferrer">
                        <Text type="secondary">
                            {contractAddress}
                        </Text>
                        <span style={{ transform: 'translate(0,12px)' }}>
                            <LinkOutlined />
                        </span>
                    </a>
                </p>
                <p style={{ color: 'rgba(52, 48, 46, 1)' }}>
                    <span style={{ color: '#fe5200' }}>
                        <b>{t('drawer.website_on_blacklist')}</b>
                    </span>
                    {t('comma')}
                    {/* {verification.contract.Verified ? t('drawer.contract_verified') : t('drawer.contract_not_verified')} */}
                    {t('drawer.auto_block')}
                    {t('dot')}
                    {t('drawer.continue_auth_remind')}
                </p>
            </>
        );
    };

    if (type === 'success' || type === 'error') {
        return (
            <>
                {visible
                    ? (
                        <div
                            className={`notification-${i18n.language}`}
                            style={{
                                display: 'flex', justifyContent: 'center', height: '60%', marginTop: '20px'
                            }}
                        >
                            <Alert
                                // className="animate__animated animate__fadeOutDown"
                                style={{ backgroundColor: '#FFFFFF', border: 'none', boxShadow: '0px 2px 6px 0px rgba(52, 48, 46, 0.3)' }}
                                message={t('drawer.completed_scan')}
                                type={type}
                                showIcon
                                closable={false}
                                getContainer={document.querySelector('#chrome-extension-content-base-element-ethereum')}
                            />
                        </div>
                    )
                    : null}
            </>
        );
    }

    if (type === 'warning' || type === 'danger') {
        const primaryColor = type === 'warning' ? '#ffd600' : '#fe5200';
        return (
            <Modal
                closable={false}
                width={460}
                getContainer={getContainer()}
                visible={visible}
                onOk={handleOk}
                footer={null}
                className={`notification-${i18n.language}`}
            >
                <Row justify="space-between" style={{ backgroundColor: primaryColor, height: '52px', margin: '-24px -24px 24px -24px' }}>
                    <Col
                        span={4}
                        style={{
                            display: 'flex', justifyContent: 'left', alignItems: 'center', marginLeft: '47px'
                        }}
                    >
                        {/* <p><b><ExclamationOutlined style={{ color: '#ffffff', fontSize: '20px' }} /></b></p> */}
                        <img src={ExclamationBold} style={{ width: '3px' }} alt=""></img>
                    </Col>
                    <Col
                        span={7}
                        style={{
                            display: 'flex', justifyContent: 'right', alignItems: 'center', color: '#ffffff', marginRight: '47px'
                        }}
                    >
                        <img src={MetaShieldWhite} style={{ width: '100px' }} alt=""></img>
                    </Col>
                </Row>
                <div style={{ margin: '0px 12px 32px 12px' }}>
                    <div
                        className={`careful-auth-${i18n.language}`}
                        style={{
                            color: type === 'warning' ? '' : primaryColor, display: 'flex', justifyContent: 'center', marginTop: '30px', marginBottom: '36px'
                        }}
                    >
                        {type === 'warning' ? t('drawer.please_authorize_carefully') : t('drawer.high_risk_transaction')}
                            &nbsp;
                        {t('exclamation_mark')}
                    </div>
                    {getModalContent(type)}
                </div>
                <Row justify="space-between" style={{ height: '80px', margin: '0px 12px' }}>
                    <Col
                        span={12}
                        style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}
                    >
                        <button
                            className={`${type}-button`}
                            onClick={() => {
                                postMessageToCurrentPage('block');
                                handleCancel();
                            }}
                            type="button"
                        >
                            {type === 'warning'
                                ? t('drawer.cancel_authorization')
                                : t('drawer.i_got_it')}
                        </button>
                    </Col>
                    <Col
                        span={12}
                        style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}
                    >
                        <button
                            className="secondary-button"
                            type="button"
                            onClick={() => {
                                postMessageToCurrentPage('continue');
                                handleCancel();
                            }}
                        >
                            {t('drawer.continue_authorization')}
                        </button>
                    </Col>
                </Row>
            </Modal>
        );
    }

    return (
        <Drawer
            title="Risk Warning"
            getContainer={document.querySelector('#chrome-extension-content-base-element-ethereum')}
            placement="left"
            closable={false}
            onClose={() => { hideContainer(); }}
            visible
        >
            <p>{message}</p>
            <p>
                Method:
                {' '}
                {JSON.stringify(method)}
            </p>
            <p>
                Params:
                {' '}
                {JSON.stringify(params)}
            </p>
            <Button type="primary" onClick={() => hideContainer()}>
                Close
            </Button>
        </Drawer>
    );
};

export default DrawerDemo;
