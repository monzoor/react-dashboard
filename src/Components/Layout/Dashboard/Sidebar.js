import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    Layout,
    Menu,
    Icon,
} from 'antd';
import logo from '../../../assets/images/cc.svg';

const {
    Sider,
} = Layout;

const { SubMenu } = Menu;
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
        };
    }

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    render() {
        const { location } = this.props;
        const { collapsed } = this.state;
        return (
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} style={{ background: '#fff' }}>
                <div className="logo text-center">
                    <p className="text-black h4 my-2" style={{ fontWeight: 100, margin: '20px 0' }}>
                        <img src={logo} alt="" className={collapsed || 'mr-2'} width="30px" />
                        {collapsed || 'CodeCave' }
                    </p>
                </div>
                <Menu theme="light" selectedKeys={[location.pathname]} mode="inline" style={{ height: '100%' }}>
                    <Menu.Item className="mt-0" key="/">
                        <Icon type="pie-chart" />
                        <span>Home</span>
                        <Link to="/" />
                    </Menu.Item>
                    <Menu.Item key="/private">
                        <Icon type="desktop" />
                        <span>Private</span>
                        <Link to="/private" />
                    </Menu.Item>
                    <SubMenu
                      key="sub1"
                      title={(
                          <span>
                              <Icon type="user" />
                              <span>User</span>
                          </span>)}
                    >
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

export default withRouter(Sidebar);
