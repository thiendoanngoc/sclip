import React from 'react'

import ErrorAlert from '../alert/ErrorAlert'
import LoadingBar from 'react-top-loading-bar'

import { authenticationService } from '../../_helpers/authentication'

export default class Upload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data_user: authenticationService.getToken(),

            title: '',
            content: '',
            errors: [],

            selectedFile: null,
            image_file: null,
            image_preview: '',

            supported_mime_video: [
                'video/mp4',
                'video/x-m4v',
                'video/*',
            ],
            supported_mime_image: [
                'image/x-png',
                'image/gif',
                'image/jpeg',
            ],

            progress: 0,
            onUploaded: false,
            onSelected: true,
        }
        
        this._imageSelectedHandler = this._imageSelectedHandler.bind(this)
        this._fileSelectedHandler = this._fileSelectedHandler.bind(this)
        this._handleFieldChange = this._handleFieldChange.bind(this)
        this._hasErrorFor = this._hasErrorFor.bind(this)
        this._renderErrorFor = this._renderErrorFor.bind(this)
        this._fileUploadHandler = this._fileUploadHandler.bind(this)
    }

    _imageSelectedHandler = event => {
        event.preventDefault()

        let reader = new FileReader()
        let file = event.target.files[0]
    
        reader.onloadend = () => {
            this.setState({
                image_file: file,
                image_preview: reader.result,
            })
        }
    
        reader.readAsDataURL(file)
    }
    
    _fileSelectedHandler = event => {
        event.preventDefault()
        
        this.setState({
            selectedFile: event.target.files[0],
            progress: 0,
            onUploaded: true,
        })
    }

    _handleFieldChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    _hasErrorFor = field => {
        return !!this.state.errors[field]
    }

    _renderErrorFor = field => {
        if (this._hasErrorFor(field)) {
            return (
                <span className='width_common mess_error'>
                    <strong>{this.state.errors[field]}</strong>
                </span>
            )
        }
    }

    _fileUploadHandler = async e => {
        e.preventDefault()

        if(!!this.state.image_file && !!this.state.selectedFile) {
            this.setState({
                onSelected: true,
            })
            
            let formData = new FormData()
            formData.append('sclip', this.state.selectedFile)
            formData.append('title', this.state.title)
            formData.append('content', this.state.content)
            formData.append('thumbnail', this.state.image_file)
            formData.append('username', this.state.data_user.user.username)
            formData.append('user_id', this.state.data_user.user.id)
            
            await axios({
                method: 'POST',
                url: '/api/upload',
                data: formData,
                headers: {
                    'Authorization' :`Bearer ${this.state.data_user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: progressEvent => {
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    this.setState({
                        progress: percentCompleted,
                        onUploaded: true,
                    })
                }
            })
            .then(response => {
                if(response.data.status === 'error') {
                    this.setState({
                        errors: response.data.msg,
                    })
                }
                else {
                    this.setState({
                        errors: [],
                        onUploaded: false,
                    })

                    window.location.href = '/profile/my-sclip'
                }
            })
            .catch(err => {
                console.log(err.response)
            })
        }
        else {
            this.setState({
                onSelected: false,
            })
        }
    }

    componentDidMount() {
        document.title = "Tải lên | SCLIP"        
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <div>
                <LoadingBar
                    progress={this.state.progress}
                    height={1}
                    color="#ff3838"
                />
                <main id="main-body" className="bg-page bg-page bg-profile">
                    <div className="container">
                        <div className="sub-container-upload">
                            <div className="row">
                                <div className="col-md-12">
                                    <form onSubmit={this._fileUploadHandler}>
                                        <div className="sclip-upload col-md-12">
                                            <div className="sclip-upload-btn">
                                                <input
                                                    className="thumbnail-upload-input"
                                                    type="file"
                                                    onChange={this._imageSelectedHandler}
                                                    accept={this.state.supported_mime_image}
                                                />
                                                <h4 className="text-center">Tải ảnh đại diện</h4>
                                            </div>
                                            <div className={`file-upload-content ${this.state.image_preview ? null : "hidden"}`}>
                                                <img
                                                    className="file-upload-image"
                                                    src={this.state.image_preview}
                                                />
                                            </div>
                                            <div className="image-upload-wrap">
                                                <input
                                                    className="file-upload-input"
                                                    type="file"
                                                    onChange={this._fileSelectedHandler}
                                                    accept={this.state.supported_mime_video}
                                                />
                                                <div className="drag-text">
                                                    <h2>{this.state.onUploaded ? this.state.selectedFile.name : null}</h2>
                                                    <i className={`icon ic-upload-sclip-lg ${!this.state.onUploaded ? null : "hidden"}`}></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sclip-property">
                                            <div className="sclip-form">
                                                <p className="label-txt">Tiêu đề</p>
                                                <input
                                                    type="text"
                                                    className="sclip-input"
                                                    name="title"
                                                    id="title"
                                                    value={this.state.title}
                                                    onChange={this._handleFieldChange}
                                                />
                                                {this._renderErrorFor('title')}
                                                <div className="line-box">
                                                    <div className="line"></div>
                                                </div>
                                            </div>
                                            <div className="sclip-form">
                                                <p className="label-txt">Nội dung</p>
                                                <input
                                                    type="text"
                                                    className="sclip-input"
                                                    name="content"
                                                    id="content"
                                                    onChange={this._handleFieldChange}
                                                />
                                                {this._renderErrorFor('content')}
                                                <div className="line-box">
                                                    <div className="line"></div>
                                                </div>
                                            </div>
                                            <button className={`sclip-upload-btn`}>Tải lên</button>
                                        </div>
                                    </form>
                                    {this.state.onSelected ? null : <ErrorAlert content="Bạn chưa chọn ảnh đại diện hoặc sclip"/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}