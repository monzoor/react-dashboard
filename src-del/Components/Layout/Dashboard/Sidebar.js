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

// eslint-disable-next-line prefer-destructuring
const SubMenu = Menu.SubMenu;

class Sidebar extends Component {
    state = {
        collapsed: true,
    };

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    toggle = () => {
        const { collapsed } = this.state;
        this.setState({
            collapsed: !collapsed,
        });
    }

    render() {
        const { location } = this.props;
        const { collapsed } = this.state;
        return (
            <Sider className="shadow bg-white" collapsible collapsed={collapsed} trigger={null}>
                <div className="text-center h4 text-primary py-3 mb-0">
                    <Icon
                      className="trigger pointer"
                      type={collapsed ? 'menu-unfold' : 'menu-fold'}
                      onClick={this.toggle}
                    />
                </div>
                <Menu className="border-0 " theme="light" selectedKeys={[location.pathname]} mode="inline">
                    <Menu.Item className="mt-0" key="/">
                        <Icon type="home" />
                        <span>Product</span>
                        <Link to="/" />
                    </Menu.Item>

                    <SubMenu
                      key="/product/list"
                      title={(
                          <span>
                              <Icon type="gift" />
                              <span>Product</span>
                          </span>
                        )}
                    >
                        <Menu.Item key="/product/list">
                            <span>List</span>
                            <Link to="/product/list" />
                        </Menu.Item>
                        <Menu.Item key="/product/add">
                            <span>Add</span>
                            <Link to="/product/add" />
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="/private">
                        <Icon type="desktop" />
                        <span>Private</span>
                        <Link to="/private" />
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default withRouter(Sidebar);
