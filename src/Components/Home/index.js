import React, { PureComponent } from 'react';
import { Button, Pagination } from 'antd';
// import Header from './Header';
// import Footer from './Footer';

class Home extends PureComponent {
    render() {
        return (
            <div>
                <div className="content mt-xl--m">
                    qweqw sdsd sdeqwe
                    <Button type="primary">Primary</Button>
                    <Pagination defaultCurrent={1} total={50} showSizeChanger />
                </div>
            </div>
        );
    }
}

export default Home;
