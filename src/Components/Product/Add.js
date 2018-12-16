import React, { Component } from 'react';
import ProgressSteps from './Add/Steps';
import ImageUpload from './Add/Images';
import ProductDetails from './Add/Details';

class ProductAdd extends Component {
    state = {
        currentSteps: {
            item: 0,
            status: 'wait',
        },
        images: '',
    }

    componentDidUpdate(prevProps, prevState) {
        const { images } = this.state;
        if (images !== prevState.images) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                currentSteps: {
                    item: 0,
                    status: 'finish',
                },
            });
        }
    }

    imageUploaded = (filelists) => {
        this.setState({
            images: filelists,
        });
    }

    render() {
        const { currentSteps } = this.state;

        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <h2 className="font-weight-light">Product Add</h2>
                    {/* <p className="text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, delectus!</p> */}
                </div>
                <div className="col-12 mb-5">
                    <ProgressSteps current={currentSteps.item} status={currentSteps.status} />
                </div>
                <div className="col-5 mb-5">
                    <p className="h3 font-weight-light text-primary float-left mb-4">Images</p>
                    <span className="text-muted font-weight-light small mt-2 pt-1 mb-4 ml-3 float-left">Upload at least 1 image</span>
                    <div className="clearfix">&nbsp;</div>
                    <ImageUpload onUpdate={this.imageUploaded} />
                </div>
                <div className="col-7">
                    <p className="h3 font-weight-light text-primary float-left mb-3">Product Details</p>
                    {/* <span className="text-muted font-weight-light small mt-2 pt-1 mb-4 ml-3 float-left">Upload at least 1 image</span> */}
                    <div className="clearfix">&nbsp;</div>
                    <ProductDetails />
                </div>
            </div>
        );
    }
}

export default ProductAdd;
