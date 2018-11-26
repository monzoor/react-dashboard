import React from 'react';
import {
    Layout,
} from 'antd';

const {
    Header,
} = Layout;

const HeadBar = (user) => {
    const { name } = user;
    return (
        <Header style={{ background: '#fff', padding: 0 }}>
            <p>
                { name }
            </p>
        </Header>
    );
};

export default HeadBar;
