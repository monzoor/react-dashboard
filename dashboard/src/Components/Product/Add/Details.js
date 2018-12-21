import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Editable from 'react-x-editable';
import { addProductDetails } from '../../../Actions/addProductDetailsActions';
import CategoryDrawer from './CategoryDrawer';

class ProductDetails extends PureComponent {
    state = {
        title: '',
        categories: [],
        description: '',
    }

    componentDidUpdate(prevProps, prevState) {
        const { dispatch } = this.props;
        if (this.state !== prevState) {
            dispatch(addProductDetails(this.state));
        }
    }

    addCategories = (data) => {
        // console.log(data);
        this.setState({
            categories: data,
        });
    }

    render() {
        const { title, description } = this.state;
        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <div className="form-group mb-0">
                        <Editable
                          name="username"
                          dataType="text"
                          value={title}
                          emptyValueText={(
                              <h2 className="mb-0">
                                  Add Title
                              </h2>
                            )}
                          showButtons={false}
                          placeholder="Add product title"
                          display={value => (<h2 className="mb-0">{value}</h2>)}
                          validate={(value) => {
                            if (!value) {
                                return (<div className="ant-form-explain small">Title cant not be blank.</div>);
                            }
                            this.setState({
                                title: value,
                            });
                            return null;
                        }}
                        />
                    </div>
                </div>
                <div className="col-12 mb-4">
                    <CategoryDrawer onUpdate={this.addCategories} />
                </div>
                <div className="col-12">
                    <Editable
                      name="description"
                      dataType="textarea"
                      title="Enter description"
                      placement="right"
                      value={description}
                      emptyValueText={(
                          <div>
                              Add Description
                          </div>
                      )}
                      placeholder="Enter text in textarea"
                      showButtons={false}
                      validate={(value) => {
                        if (!value) {
                            return (<div className="ant-form-explain small">Title cant not be blank.</div>);
                        }
                        this.setState({
                            description: value,
                        });
                        return null;
                    }}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
});

export default connect(mapStateToProps)(ProductDetails);
// export default ProductDetails;
