import React, { Component } from 'react';
import {
    Upload,
    // Button,
    Icon,
    Modal,
} from 'antd';

class MyUpload extends Component {
    state = {
        // fileList: [{
        //     uid: '-1',
        //     name: 'xxx.png',
        //     status: 'done',
        //     url: 'http://www.baidu.com/xxx.jpg',
        // }],
        fileList: [],
        previewVisible: false,
        previewImage: '',
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handleChange = (info) => {
        let { fileList } = info;
        //   console.log('----', fileList);
        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-3);

        // 2. Read from response and show file link
        fileList = fileList.map((file) => {
            //   console.log('-----1---', file);
            if (file.response) {
                // Component will show file.url as link
                // eslint-disable-next-line no-param-reassign
                file.url = file.response.url;
            }
            // console.log(file);
            return file;
        });

        // 3. Filter successfully uploaded files according to response from server
        fileList = fileList.filter((file) => {
            //   console.log('-----2---', file);
            if (file.response) {
                return file.response.status === 200;
            }
            return true;
        });

        this.setState({ fileList });
    }

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }


    render() {
        const props = {
            action: '//localhost:5555/upload',
            onChange: this.handleChange,
            multiple: true,
            listType: 'picture-card',
            onPreview: this.handlePreview,
        };
        // const { fileList } = this.state;
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div>
                <Upload {...props} fileList={fileList} name="productImage">
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}


export default MyUpload;
