import React from 'react';
import {
    Layout,
} from 'antd';

const {
    Footer,
} = Layout;

const year = new Date().getFullYear();
const footerCopy = `Ant Design © ${year} Created by Monzoor`;

const FooterBar = () => (
    <Footer style={{ textAlign: 'center' }}>
        {footerCopy}
    </Footer>
);

export default FooterBar;
