/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Layout,
    Breadcrumb,
} from 'antd';
import styled, { keyframes } from 'styled-components';

import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

class MainLayout extends Component {
    render() {
        const { children } = this.props;

        const fadeIn = keyframes`
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
                `;
        const FadeInAnimation = styled.div`
                    animation: ${fadeIn} 1s;
                    background: #fff;
                    min-height: 80vh;
                    `;
        return (
            <Layout className="minvh-100">
                <Sidebar />
                <Layout className="minvh-100">
                    <Header />
                    <div className="row">
                        <div className="col-12">
                            <Breadcrumb>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    <FadeInAnimation>
                        {children}
                    </FadeInAnimation>
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
