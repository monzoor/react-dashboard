import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
    Upload,
    Icon,
    Modal,
    message,
} from 'antd';
import config from './_config';
import { imgaeUpload } from '../_Actions/addProductDetailsActions';

const beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt = file.size / 1024 / 1024 < config.maxImageUploadSize;
    if (!isLt) {
        message.error(`Image must smaller than ${config.maxImageUploadSize}MB!`);
    }
    return isJPG && isLt;
};

class ImageUpload extends PureComponent {
    state = {
        // fileList: [{
        //     uid: '1544795020972_1kc1kesjjpo32iss',
        //     name: 'xxx.png',
        //     status: 200,
        //     url: 'api/img/demo.jpg',
        // }],
        fileList: [],
        previewVisible: false,
        previewImage: '',
        initBigUploader: true,
    }

    handleCancel = () => {
        this.setState({ previewVisible: false });
    }

    updateImageDataList = (imageList, type) => {
        const dataToSave = imageList.map(datas => datas.response);
        const { dispatch } = this.props;
        dispatch(imgaeUpload(dataToSave, type));
    }

    handleChange = (info) => {
        let fileQueueLength = 0;
        let { fileList } = info;
        if (info.file.status !== 'uploading') {
            fileQueueLength = info.fileList.length;
        }
        if (info.file.status === 'uploading') {
            if (fileList.length === 1) {
                this.setState({
                    initBigUploader: false,
                });
            }
        }
        if (info.file.status === 'removed') {
            const hasNoImage = (info.fileList.length === 0);
            this.updateImageDataList(info.fileList, hasNoImage);
            message.warning('File deleted successfully');
        }
        if (info.file.status === 'done') {
            message.success('File uploaded successfully');
            const filteredData = info.fileList.filter(uploadedData => typeof uploadedData.response !== 'undefined');
            if (filteredData.length === 1) {
                this.setState({
                    initBigUploader: false,
                });
            }
            if (filteredData.length === fileQueueLength) {
                this.updateImageDataList(filteredData);
            }
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-config.imageUploadLimit);

        // 2. Read from response and show file link
        fileList = fileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                // eslint-disable-next-line no-param-reassign
                file.url = file.response.url;
            }
            return file;
        });

        // 3. Filter successfully uploaded files according to response from server
        fileList = fileList.filter((file) => {
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
        const {
            previewVisible, previewImage, fileList, initBigUploader,
        } = this.state;

        const props = {
            action: '/api/upload',
            headers: {
                authorization: localStorage.token,
            },
            onChange: this.handleChange,
            multiple: true,
            listType: 'picture-card',
            onPreview: this.handlePreview,
            className: (initBigUploader) ? 'big-uploader' : '',
            beforeUpload(file) {
                return new Promise((resolve) => {
                    const isValidated = beforeUpload(file);
                    if (isValidated) {
                        resolve(file);
                    }
                });
            },
        };

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div>
                <Upload name="productImage" {...props} fileList={fileList}>
                    {fileList.length === config.imageUploadLimit ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
});

export default connect(mapStateToProps)(ImageUpload);

// export default ImageUpload;
