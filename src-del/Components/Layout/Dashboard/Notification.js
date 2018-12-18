/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
    Dropdown, Icon,
    Badge,
    Alert,
} from 'antd';


const Notifications = (
    <div className="row">
        <div className="col-auto bg-white py-2 shadow-sm">
            <Alert className="mb-2" message="Success Tips" type="success" showIcon />
            <Alert className="mb-2" message="Informational Notes" type="info" showIcon />
            <Alert className="mb-2" message="Warning" type="warning" showIcon />
            <Alert className="mb-2" message="Error" type="error" showIcon />
        </div>
    </div>
);

const HeadBar = () => (
    <Dropdown className="mr-4" overlay={Notifications} placement="bottomRight" trigger={['click']}>
        <a className="ant-dropdown-link" href="#">
            <Badge dot>
                <Icon className="text-size-regular" type="notification" />
            </Badge>
        </a>
    </Dropdown>
);

export default HeadBar;
