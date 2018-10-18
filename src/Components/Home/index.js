import React, { PureComponent } from 'react';
import { message } from 'antd';

const success = () => {
    message.destroy();
    // Dismiss manually and asynchronously
    // setTimeout(hide, 2500);
};
class Home extends PureComponent {
    constructor(props) {
        super(props);
        success();
    }

    render() {
        return (
            <div>
                <div className="content mt-xl--m">
                    this is home
                </div>
            </div>
        );
    }
}

export default Home;
