import React, { useEffect, useState } from 'react';
import {
    Modal, Drawer, Button, Alert, notification, Col, Row,
    Typography
} from 'antd';
import { ExclamationOutlined, StopOutlined, LinkOutlined } from '@ant-design/icons';
import { useTranslation, Trans } from 'react-i18next';
import { proxyClient } from '../message';
import './DrawerDemo.scss';
import '../../i18n/config';
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

    const getModalContent = (renderType) => {
        if (renderType === 'warning') {
            return (
                <>
                    <Title style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }} level={3}>
                        <b>
                            {t('drawer.please_authorize_carefully')}
                            &nbsp;
                            {t('exclamation_mark')}
                        </b>
                    </Title>
                    <p style={{ marginBottom: '4px' }}>{t('drawer.you_are_authorizing')}</p>
                    <p style={{ marginBottom: '12px' }}>
                        <a href={`https://etherscan.io/address/${contractAddress}`} target="_blank" rel="noreferrer">
                            <Text type="secondary">{contractAddress}</Text>
                            <Text type="secondary"><LinkOutlined /></Text>
                        </a>
                    </p>
                    <p>
                        {t('drawer.website_unknown')}
                        {t('comma')}
                        {verification.contract.Verified ? t('drawer.contract_verified') : t('drawer.contract_not_verified')}
                        {t('dot')}
                        {t('drawer.transfer_remind')}
                    </p>
                </>
            );
        }
        return (
            <>
                <Title style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }} level={3}>
                    <b>
                        {t('drawer.please_authorize_carefully')}
                        &nbsp;
                        {t('exclamation_mark')}
                    </b>
                </Title>
                <p style={{ marginBottom: '4px' }}>{t('drawer.you_are_authorizing')}</p>
                <p style={{ marginBottom: '12px' }}>
                    <a href={`https://etherscan.io/address/${contractAddress}`} target="_blank" rel="noreferrer">
                        <Text type="secondary">
                            {contractAddress}
                        </Text>
                        <span style={{ transform: 'translate(0,12px)' }}>
                            <LinkOutlined />
                        </span>
                    </a>
                </p>
                <p>
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

    type = 'danger';

    if (type === 'success') {
        return (
            <div style={{
                display: 'flex', justifyContent: 'center', height: '60%', marginTop: '20px'
            }}
            >
                <Alert
                    message={t('drawer.completed_scan')}
                    type="success"
                    showIcon
                    closable
                    getContainer={document.querySelector('#chrome-extension-content-base-element-ethereum')}
                />
            </div>
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
            >
                <Row justify="space-between" style={{ backgroundColor: primaryColor, height: '52px', margin: '-24px -24px 24px -24px' }}>
                    <Col
                        span={6}
                        style={{
                            display: 'flex', justifyContent: 'left', alignItems: 'center', marginLeft: '47px'
                        }}
                    >
                        <p><b><ExclamationOutlined style={{ color: '#ffffff', fontSize: '20px' }} /></b></p>
                    </Col>
                    <Col
                        span={6}
                        style={{
                            display: 'flex', justifyContent: 'right', alignItems: 'center', color: '#ffffff', marginRight: '47px'
                        }}
                    >
                        MetaShield
                    </Col>
                </Row>
                <div style={{ margin: '0px 12px' }}>
                    {getModalContent(type)}
                </div>
                <Row justify="space-between" style={{ height: '80px' }}>
                    <Col
                        span={12}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
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
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
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
