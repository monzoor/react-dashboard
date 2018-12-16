import React, { PureComponent } from 'react';
import Editable from 'react-x-editable';
import { Icon } from 'antd';
import CategoryDrawer from './CategoryDrawer';

class ProductDetails extends PureComponent {
    render() {
        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <div className="form-group mb-0">
                        <Editable
                          name="username"
                          dataType="text"
                          emptyValueText={(
                              <h2 className="mb-0">
                                  <Icon className="mr-2" type="edit" />
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
                            return null;
                        }}
                        />
                    </div>
                </div>
                <div className="col-12 mb-4">
                    <CategoryDrawer />
                </div>
                <div className="col-12">
                    <Editable
                      name="description"
                      dataType="textarea"
                      title="Enter description"
                      placement="right"
                      emptyValueText={(
                          <div>
                              <Icon className="mr-2" type="edit" />
                              Add Description
                          </div>
                      )}
                      placeholder="Enter text in textarea"
                      showButtons={false}
                    />
                </div>
            </div>
        );
    }
}


export default ProductDetails;
