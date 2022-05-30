import React, { useState } from 'react';
import {
    Modal, Drawer, Button, Alert, notification, Col, Row
} from 'antd';
import { ExclamationCircleOutlined, StopOutlined } from '@ant-design/icons';
import { useTranslation, Trans } from 'react-i18next';
import './DrawerDemo.scss';
import '../../i18n/config';
// import { contentClient, ChromeMessage } from '../../chrome';

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
    };

    type = 'error';

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

    if (type === 'warning') {
        return (
            <Modal
                getContainer={getContainer()}
                visible={visible}
                title={(
                    <>
                        <ExclamationCircleOutlined style={{ color: '#faad14', marginRight: '8px' }} />
                        {t('drawer.warning')}
                    </>
                )}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button
                        key="link"
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                    >
                        {t('drawer.report_button')}
                    </Button>,
                    <Button key="back" onClick={handleCancel}>
                        {t('drawer.still_continue')}
                    </Button>
                ]}
            >
                <p>{t('drawer.you_are_authorizing')}</p>
                <p>{contractAddress}</p>
                <p>{verification.contract.Verified ? t('drawer.contract_verified') : t('drawer.contract_not_verified')}</p>
            </Modal>
        );
    }

    if (type === 'error') {
        return (
            <Modal
                getContainer={getContainer()}
                visible={visible}
                title={(
                    <>
                        <StopOutlined style={{ color: '#ff4d4f', marginRight: '8px' }} />
                        {t('drawer.error')}
                    </>
                )}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button
                        key="link"
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                    >
                        {t('drawer.still_continue')}
                    </Button>,
                    <Button key="back" onClick={handleCancel}>
                        {t('drawer.ok')}
                    </Button>
                ]}
            >
                <p>{t('drawer.you_are_authorizing')}</p>
                <p>{contractAddress}</p>
                <p>{verification.contract.Verified ? t('drawer.contract_verified') : t('drawer.contract_not_verified')}</p>
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
