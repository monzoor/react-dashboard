/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
    Layout,
    Menu, Dropdown, Icon,
    Avatar,
    Badge,
    Alert,
} from 'antd';
import { Link } from 'react-router-dom';

const {
    Header,
} = Layout;

const ProfileMenu = (
    <Menu>
        <Menu.Item>
            <Link to="/profile">
                <Icon className="mr-3" type="user" />
                Profile
            </Link>
        </Menu.Item>
        <Menu.Item>
            <Link to="/logout">
                <Icon className="mr-3" type="poweroff" />
                Logout
            </Link>
        </Menu.Item>
    </Menu>
);
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
const HeadBar = (user) => {
    const { name } = user;
    return (
        <Header className="bg-white row mx-0">
            <div className="col-auto ml-auto">
                <Dropdown className="mr-4" overlay={Notifications} placement="bottomRight" trigger={['click']}>
                    <a className="ant-dropdown-link" href="#">
                        <Badge dot>
                            <Icon className="text-size-regular" type="notification" />
                        </Badge>
                    </a>
                </Dropdown>
                <Avatar className="mr-2 lh-initial" style={{ backgroundColor: '#87d068' }} icon="user" size="small" />
                <Dropdown overlay={ProfileMenu} placement="bottomRight">
                    <a className="ant-dropdown-link text-dark" href="#">
                        <span className="small text-capitalize">
                            Hi,
                            { name }
                        </span>
                        <Icon className="ml-2" type="caret-down" theme="filled" />
                    </a>
                </Dropdown>
            </div>
        </Header>
    );
};

export default HeadBar;
