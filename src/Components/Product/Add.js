import React, { Component } from 'react';
import ProgressSteps from './Add/Steps';

class ProductAdd extends Component {
    state = {
        currentSteps: -1,
    }

    render() {
        const { currentSteps } = this.state;
        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <h2 className="font-weight-light">Product Add</h2>
                    {/* <p className="text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, delectus!</p> */}
                </div>
                <div className="col-12">
                    <ProgressSteps current={currentSteps} />
                </div>
            </div>
        );
    }
}

export default ProductAdd;
