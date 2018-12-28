/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
    Layout,
    Menu, Dropdown, Icon,
    Avatar,
} from 'antd';
import { Link } from 'react-router-dom';
import Notification from './Notification';
import logo from '../../../assets/images/cc.svg';

const {
    Header,
} = Layout;

const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
};
const ProfileMenu = (
    <Menu>
        <Menu.Item>
            <Link to="/profile">
                <Icon className="mr-3" type="user" />
                Profile
            </Link>
        </Menu.Item>
        <Menu.Item>
            <button className="btn bg-transparent p-0 btn-sm" type="button" onClick={logout}>
                <Icon className="mr-3" type="poweroff" />
                Logout
            </button>
        </Menu.Item>
    </Menu>
);

const HeadBar = (user) => {
    const { name } = user;
    return (
        <Header className="bg-transparent row mx-0">
            <div className="col-auto mx-auto py-3">
                <img src={logo} alt="" className="mr-2 float-left" width="20px" />
                <span className="h5 float-left" style={{ fontWeight: 300, margin: '2px 0' }}>CodeCave</span>
                <div className="clearfix">&nbsp;</div>
            </div>
            <div className="col-auto float-right">
                <Notification />
                <Avatar className="mr-2 lh-initial" style={{ backgroundColor: '#87d068' }} icon="user" size="small" />
                <Dropdown overlay={ProfileMenu} placement="bottomRight">
                    <a className="ant-dropdown-link text-dark">
                        <span className="small text-capitalize font-weight-light">
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
