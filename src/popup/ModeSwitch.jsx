import React from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch, Row, Col } from 'antd';
// import { ReactComponent as WhitelistIcon } from '../../public/images/whitelist.svg';
// import { ReactComponent as BlacklistIcon } from '../../public/images/blacklist.svg';
import WhitelistIcon from '../../public/images/whitelist.svg';
import BlacklistIcon from '../../public/images/blacklist.svg';

const ModeSwitch = ({ safeMode, setSafeMode }) => (
    <>
        <Row justify="center" gutter={[0, 16]}>
            <Col
                justify="center"
                span={24}
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                {safeMode ? (
                    <img src={WhitelistIcon} alt="WhitelistIcon" />
                ) : (
                    <img src={BlacklistIcon} alt="BlacklistIcon" />
                )}
            </Col>
            <Col
                justify="center"
                span={24}
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                <Switch
                    checkedChildren="WhiteList"
                    unCheckedChildren="BlackList"
                    defaultChecked={safeMode}
                    onChange={(checked) => {
                        console.log('checked :>> ', checked);
                        setSafeMode(checked);
                    }}
                />
            </Col>
        </Row>
        <br />
    </>
);

export default ModeSwitch;
