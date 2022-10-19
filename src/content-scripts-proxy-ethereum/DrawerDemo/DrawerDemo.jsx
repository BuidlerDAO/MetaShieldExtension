import React, { useEffect, useState } from 'react';
import {
    Modal, Drawer, Button, Alert, Col, Row,
    Typography, Tooltip
} from 'antd';
import {
    QuestionCircleOutlined, LinkOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { proxyClient } from '../postMessage.js';
import 'animate.css';
import './DrawerDemo.scss';
import MetaShieldWhite from '../../../public/images/MetaShield-White.png';
import ExclamationBold from '../../../public/images/ExclamationBold.png';
import i18n from '../../i18n/config';

// import { contentClient, ChromeMessage } from '../../chrome';
const { Text } = Typography;

const DrawerDemo = ({
    type, message, verification, contractAddress, domain, method, params, actionName, assetValue
}) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(true);

    const getContainer = () => document.querySelector('#chrome-extension-content-base-element-ethereum');
    const getModalContainer = () => document.querySelector('#chrome-extension-content-base-element-ethereum-notification-content');

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
                    <p style={{ marginBottom: '12px' }}>
                        <a href={`https://etherscan.io/address/${contractAddress}`} style={{ color: '#8c8c8c' }} target="_blank" rel="noreferrer">
                            <Text type="secondary">{contractAddress}</Text>
                            <Text type="secondary"><LinkOutlined color="#8c8c8c" className="svg-control" /></Text>
                        </a>
                    </p>
                    <p style={{ color: 'rgba(52, 48, 46, 1)' }}>
                        {t('drawer.website_unknown')}
                        {t('comma')}
                        {contractInfo[verification.contract.verified]}
                        {t('dot')}
                        {t('drawer.transfer_remind')}
                    </p>
                </>
            );
        }
        return (
            <>
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
                    {/* {verification.contract.verified ? t('drawer.contract_verified') : t('drawer.contract_not_verified')} */}
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
        // const tryingFontColor = type === 'warning' ? 'rgba(52, 48, 46, 1)' : '#fe5200';
        const isTransferAction = actionName === 'transfer' || actionName === 'safeTransferFrom' || actionName === 'safeTransferFrom1';
        const assetVal = isTransferAction ? <Text code>{assetValue}</Text> : t('drawer.assets');
        const action = isTransferAction ? t('drawer.transfer') : t('drawer.authorize');
        const explanation = isTransferAction ? t('drawer.transfer_explanation') : t('drawer.authorize_explanation');
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
                <div id="chrome-extension-content-base-element-ethereum-notification-content">
                    <Row justify="space-between" style={{ backgroundColor: primaryColor, height: '52px', margin: '-24px -24px 24px -24px' }}>
                        <Col
                            span={6}
                            style={{
                                display: 'flex', justifyContent: 'left', alignItems: 'center', marginLeft: '36px'
                            }}
                        >
                            {/* <p><b><ExclamationOutlined style={{ color: '#ffffff', fontSize: '20px' }} /></b></p> */}
                            <img src={ExclamationBold} style={{ width: '3px' }} alt=""></img>
                        </Col>
                        <Col
                            span={12}
                            style={{
                                display: 'flex', justifyContent: 'right', alignItems: 'center', color: '#ffffff', marginRight: '36px'
                            }}
                        >
                            <img src={MetaShieldWhite} style={{ width: '100px' }} alt=""></img>
                        </Col>
                    </Row>
                    <div style={{ margin: '0px 13px 32px 13px' }}>
                        <div
                            className={`careful-auth-${i18n.language}`}
                            style={{
                                color: type === 'warning' ? '' : primaryColor, display: 'flex', justifyContent: 'center', marginTop: '30px', marginBottom: '36px'
                            }}
                        >
                            {type === 'warning' ? t('drawer.please_authorize_carefully') : t('drawer.high_risk_transaction')}
                            {t('exclamation_mark')}
                        </div>
                        {/* 您正在试图…… */}
                        <b>
                            <p style={{ marginBottom: '4px', color: 'rgba(52, 48, 46, 1)' }}>
                                {t('drawer.you_are_trying_to')}
                                {i18n.language === 'zh' ? assetVal : ''}
                                {i18n.language === 'zh' ? '' : ' '}
                                <Tooltip
                                    getPopupContainer={() => getModalContainer()}
                                    title={(
                                        <div style={{ margin: '12px', fontSize: '8px', color: '#767676' }}>
                                            <p>{explanation}</p>
                                        </div>
                                    )}
                                    color="#ffffff"
                                >
                                    <Text>{action}</Text>
                                    <QuestionCircleOutlined style={{
                                        display: 'inlineBlock', verticalAlign: 'baseline', fontSize: '14px', padding: '0 2px 0px 2px'
                                    }}
                                    />
                                </Tooltip>
                                {i18n.language === 'zh' ? '' : ' '}
                                {i18n.language !== 'zh' ? assetVal : ''}
                                {t('drawer.to_address')}
                            </p>
                        </b>
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
                </div>
            </Modal>
        );
    }

    if (type === 'signDanger') {
        const primaryColor = '#fe5200';
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
                <div id="chrome-extension-content-base-element-ethereum-notification-content">
                    <Row justify="space-between" style={{ backgroundColor: primaryColor, height: '52px', margin: '-24px -24px 24px -24px' }}>
                        <Col
                            span={6}
                            style={{
                                display: 'flex', justifyContent: 'left', alignItems: 'center', marginLeft: '36px'
                            }}
                        >
                            <img src={ExclamationBold} style={{ width: '3px' }} alt=""></img>
                        </Col>
                        <Col
                            span={12}
                            style={{
                                display: 'flex', justifyContent: 'right', alignItems: 'center', color: '#ffffff', marginRight: '36px'
                            }}
                        >
                            <img src={MetaShieldWhite} style={{ width: '100px' }} alt=""></img>
                        </Col>
                    </Row>
                    <div style={{ margin: '0px 13px 32px 13px' }}>
                        <div
                            className={`careful-auth-${i18n.language}`}
                            style={{
                                color: primaryColor, display: 'flex', justifyContent: 'center', marginTop: '30px', marginBottom: '36px'
                            }}
                        >
                            {t('drawer.high_risk_transaction')}
                            {t('exclamation_mark')}
                        </div>
                        {/* 您正在试图…… */}
                        <b>
                            <p style={{ marginBottom: '4px', color: 'rgba(52, 48, 46, 1)' }}>
                                {t('drawer.you_are_trying_to')}
                                {' '}
                                <Tooltip
                                    getPopupContainer={() => getModalContainer()}
                                    title={(
                                        <div style={{ margin: '12px', fontSize: '8px', color: '#767676' }}>
                                            <p>{t('drawer.authorize_explanation')}</p>
                                        </div>
                                    )}
                                    color="#ffffff"
                                >
                                    <Text>{t('drawer.eth_sign')}</Text>
                                    <QuestionCircleOutlined style={{
                                        display: 'inlineBlock', verticalAlign: 'baseline', fontSize: '14px', padding: '0 2px 0px 2px'
                                    }}
                                    />
                                </Tooltip>
                            </p>
                        </b>
                        <p style={{ color: 'rgba(52, 48, 46, 1)' }}>
                            {t('drawer.website_unknown')}
                            {t('comma')}
                            {domain}
                            {t('dot')}
                            {t('drawer.transfer_remind')}
                        </p>
                    </div>
                    <Row justify="space-between" style={{ height: '80px', margin: '0px 12px' }}>
                        <Col
                            span={12}
                            style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}
                        >
                            <button
                                className="danger-button"
                                onClick={() => {
                                    postMessageToCurrentPage('block');
                                    handleCancel();
                                }}
                                type="button"
                            >
                                {t('drawer.i_got_it')}
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
                </div>
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
