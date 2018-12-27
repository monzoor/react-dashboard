import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressSteps from './Add/Steps';
import ImageUpload from './Add/Images';
import ProductDetails from './Add/Details';

class ProductAdd extends Component {
    constructor(props) {
        super(props);

        this.details = React.createRef();
    }

    state = {
        addProductDetails: {
            currentSteps: {
                item: 0,
                status: 'wait',
            },
        },
    }

    static getDerivedStateFromProps(props, state) {
        if (props.addProductDetails !== state.addProductDetails) {
            return {
                addProductDetails: props.addProductDetails,
            };
        }
        return null;
    }

    // componentDidMount() {
    //     // console.log(this.refs);
    //     // this.node.scrollIntoView();
    //     // const node = ReactDOM.findDOMNode(this.refs.btn);
    //     // node.classList.toggle('btn-menu-open');
    // }

    // const { addProductDetails } = this.state;
    //     if (addProductDetails !== prevState.addProductDetails) {
    //         this.inputRef.current.classList.remove('d-none');
    //     }

    componentDidUpdate(prevProps, prevState) {
        const { addProductDetails } = this.state;
        const { images } = addProductDetails;
        if (images !== prevState.images) {
            if (images.length === 0) {
                this.details.current.classList.remove('op-1');
                return;
            }
            this.details.current.classList.add('op-1');
        }
    //     if (details !== prevState.details) {
    //         const totalLenth = Object.keys(details).length;
    //         const hasAllValues = !!(Object.keys(details).filter(values => (typeof details[values] === 'undefined') || details[values].length !== 0).length === totalLenth);
    //         if (!hasAllValues) return;
    //         this.setState({
    //             currentSteps: {
    //                 item: 1,
    //                 status: 'finish',
    //             },
    //         });
    //     }
    }

    render() {
        const { addProductDetails } = this.state;
        const { currentSteps } = addProductDetails;
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
                    <ImageUpload />
                </div>
                <div ref={this.details} className="col-7 op-0">
                    <p className="h3 font-weight-light text-primary float-left mb-3">Product Details</p>
                    <div className="clearfix">&nbsp;</div>
                    <ProductDetails />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    addProductDetails: state.addProductDetails,
});

export default connect(mapStateToProps)(ProductAdd);
// export default ProductAdd;
