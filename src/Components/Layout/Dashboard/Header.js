/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
    Layout,
    Menu, Dropdown, Icon,
    Avatar,
} from 'antd';
import { Link } from 'react-router-dom';
import Notification from './Notification';

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

const HeadBar = (user) => {
    const { name } = user;
    return (
        <Header className="bg-white row mx-0">
            <div className="col-auto ml-auto">
                <Notification />
                <Avatar className="mr-2 lh-initial" style={{ backgroundColor: '#87d068' }} icon="user" size="small" />
                <Dropdown overlay={ProfileMenu} placement="bottomRight">
                    <a className="ant-dropdown-link text-dark">
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
