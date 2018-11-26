import React from 'react';
import {
    Layout,
    Breadcrumb,
} from 'antd';

const {
    Content,
} = Layout;

const BreadCrumb = () => (
    <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
    </Content>
);

export default BreadCrumb;
