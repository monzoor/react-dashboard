import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    Layout,
    Menu,
    Icon,
} from 'antd';

const {
    Sider,
} = Layout;

const { SubMenu } = Menu;
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    render() {
        const { location } = this.props;
        const { collapsed } = this.state;
        return (
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                <div className="logo">
                    <h1>asdasd</h1>
                </div>
                <Menu theme="dark" selectedKeys={[location.pathname]} mode="inline">
                    <Menu.Item key="/">
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
