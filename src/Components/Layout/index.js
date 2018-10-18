import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {
    Layout,
    Breadcrumb,
} from 'antd';

import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const {
    Content,
} = Layout;


class MainLayout extends Component {
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(nextProps, this.props, nextState);
    //     return false;
    //     // return !equals(nextProps, this.props); // equals() is your implementation
    // }

    render() {
        const { children } = this.props;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout style={{ minHeight: '100vh' }}>
                    <Header />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                    </Content>
                    <div style={{ padding: 24, background: '#fff', minHeight: '80vh' }}>
                        asdasd
                        {children}
                    </div>
                    <Footer />
                </Layout>
            </Layout>
        );
    }
}
MainLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
};

export default MainLayout;
