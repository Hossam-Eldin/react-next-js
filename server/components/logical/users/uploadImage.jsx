import React, { Component } from 'react';
import TagsInput from 'react-tagsinput'
import tagStyle from '../../../assets/cp/components/tags.scss'




import { Upload, Icon, message } from 'antd';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    console.log(file)
    const isJPG = file.type === 'image/jpeg';
    const isPng = file.type === 'image/png';


    let isImage = file.type === 'image/gif' || file.type === 'image/png' || file.type === 'image/jpeg';

   if (!isImage) {
        message.error('image file only');
    } 

    
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isImage && isLt2M;
}


class uploadImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            pictures: '',
            loading: false,

        };
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
                console.log(this.state.imageUrl);
        }
    };

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <div>
                <form className="row">
                    <div className="col-5">
                        <Upload
                            name="avatar"
                            listType="picture-card"
/*                             className="avatar-uploader"
 */                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} className="img-fluid" alt="avatar" /> : uploadButton}
                        </Upload>
                    </div>
                    <div className="col-7">
                        <div className="form-group">
                            <input type="text" className="form-control input-o" placeholder="Title" />
                        </div>

                        <div className="form-group">
                            <textarea className="form-control input-o" >Description</textarea>
                        </div>
                        {/*  tags */}
                        <div className="form-group" style={tagStyle}>
                            <TagsInput value={this.state.tags} onChange={this.handleTags} />
                        </div>
                        <button className="btn  btn-block btn-o text-c"> Post </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default uploadImage;