import React, { Component } from 'react'
import { authenticationService } from '../../_helpers/authentication'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'
import ErrorAlert from '../alert/ErrorAlert'
import SingleVideo from '../SingleVideo'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data_user: [],
        }
    }

    componentDidMount() {
        let data = authenticationService.getToken()
        if(!!data && !!authenticationService.isTokenExpired(data.token)) {
            this.setState({
                data_user: data.user,
            })
        }
    }

    render() {
        return (
            <section className="after-loop">
                <div className="mar-top-30">
                    <div className="sclip-float-header clearfix">
                        <Link className="sclip-box-title" to="/profile">Thông tin <i className="icon ic-go-right"></i></Link>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="after-loop-item item border-0 card-themes shadow-lg">
                                    <div className="card-body d-flex align-items-end flex-column text-right">
                                        <h4>#{this.state.data_user.username}</h4>
                                        <p className="w-75">{this.state.data_user.fullname}</p>
                                        <i className="fas fa-smile"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="after-loop-item item border-0 card-templates shadow-lg">
                                    <div className="card-body d-flex align-items-end flex-column text-right">
                                        <h4>{this.state.data_user.email}</h4>
                                        <p className="w-75"></p>
                                        <i className="far fa-envelope-open"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="after-loop-item item border-0 card-guides shadow-lg">
                                    <div className="card-body d-flex align-items-end flex-column text-right">
                                        <h4>{this.state.data_user.created_at}</h4>
                                        <p className="w-75"></p>
                                        <i className="fas fa-calendar-times"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            old_password: '',
            new_password: '',
            re_new_password: '',
            errors: [],
            data_user: authenticationService.getToken(),
            progress: 0,
        }

        this._handleOnSubmit = this._handleOnSubmit.bind(this)
        this._handleFieldChange = this._handleFieldChange.bind(this)
        this._hasErrorFor = this._hasErrorFor.bind(this)
        this._renderErrorFor = this._renderErrorFor.bind(this)
    }

    _handleOnSubmit = async event => {
        event.preventDefault()

        let data = {
            'old_password': this.state.old_password,
            'new_password': this.state.new_password,
            're_new_password': this.state.re_new_password,
            'user_id': this.state.data_user.user.id,
        }

        let config = {
            headers: {
                'Authorization' :`Bearer ${this.state.data_user.token}`,
                'Content-Type': 'application/json',
            }
        }

        await axios
            .post(`/api/change_password`, data, config, {
                onUploadProgress: progressEvent => {
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    this.setState({
                        progress: percentCompleted,
                    })
                }
            })
            .then(response => {
                console.log(response.data)
                if (response.data.status == 'error' || typeof response.data === 'undefined') {
                    this.setState({
                        errors: response.data.msg,
                    })
                }
                else {
                    this.setState({
                        errors: [],
                    })

                    authenticationService.logout()
                    window.location.href = '/'
                }
            })
            .catch(error => {
                console.log(error.response)
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

    render() {
        return (
            <section className="after-loop">
                <div className="mar-top-30">
                    <div className="sclip-float-header clearfix">
                        <Link className="sclip-box-title" to="/profile/change-password">Đổi mật khẩu <i className="icon ic-go-right"></i></Link>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <form onSubmit={this._handleOnSubmit}>
                                    <div className="sclip-property">
                                        <div className="sclip-form">
                                            <p className="label-txt">Mật khẩu cũ</p>
                                            <input
                                                type="password"
                                                className="sclip-input"
                                                name="old_password"
                                                id="old_password"
                                                value={this.state.old_password}
                                                onChange={this._handleFieldChange}
                                            />
                                            {this._renderErrorFor('old_password')}
                                            <div className="line-box">
                                                <div className="line"></div>
                                            </div>
                                        </div>
                                        <div className="sclip-form">
                                            <p className="label-txt">Mật khẩu mới</p>
                                            <input
                                                type="password"
                                                className="sclip-input"
                                                name="new_password"
                                                id="new_password"
                                                value={this.state.new_password}
                                                onChange={this._handleFieldChange}
                                            />
                                            {this._renderErrorFor('new_password')}
                                            <div className="line-box">
                                                <div className="line"></div>
                                            </div>
                                        </div>
                                        <div className="sclip-form">
                                            <p className="label-txt">Nhập lại mật khẩu</p>
                                            <input
                                                type="password"
                                                className="sclip-input"
                                                name="re_new_password"
                                                id="re_new_password"
                                                value={this.state.re_new_password}
                                                onChange={this._handleFieldChange}
                                            />
                                            {this._renderErrorFor('re_new_password')}
                                            <div className="line-box">
                                                <div className="line"></div>
                                            </div>
                                        </div>
                                        <button className={`sclip-upload-btn`}>Đổi mật khẩu</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

class Statistic extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data_sclip: [],
            data_user: authenticationService.getToken(),
        }
    }

    async _loadSclip() {

        let user_id = this.state.data_user.user.id
        let data = {
            'user_id': user_id
        }
        await axios
            .post(`/api/list_sclip`, data)
            .then(response => {
                if(typeof response.data.success[0] === "undefined") {
                    console.log(response)
                }
                else {
                    this.setState({
                        data_sclip: [...response.data.success],
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount() {
        this._loadSclip()
    }

    render() {
        return (
            <section className="after-loop">
                <div className="mar-top-30">
                    <div className="sclip-float-header clearfix">
                        <Link className="sclip-box-title" to="/profile/change-password">SCLIP <i className="icon ic-go-right"></i></Link>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="_base_layout_content">
                                    <div className="_base_layout_main">
                                        {this.state.data_sclip.map(item => (
                                            <SingleVideo
                                                key={item.id}
                                                sclip_id={item.sclip_id}
                                                thumbnail={item.thumbnail}
                                                view={item.view}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

class Avatar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data_user: authenticationService.getToken(),
            errors: [],

            onSelected: true,
            onUploaded: false,
            progress: 0,

            image_file: null,
            image_preview: '',

            supported_mime_image: [
                'image/x-png',
                'image/gif',
                'image/jpeg',
            ],
        }

        this._fileUploadHandler = this._fileUploadHandler.bind(this)
        this._imageSelectedHandler = this._imageSelectedHandler.bind(this)
    }

    _imageSelectedHandler = event => {
        event.preventDefault()

        let reader = new FileReader()
        let file = event.target.files[0]
    
        reader.onloadend = () => {
            this.setState({
                image_file: file,
                image_preview: reader.result,
                onSelected: true,
            })
        }
    
        reader.readAsDataURL(file)
    }

    _fileUploadHandler = async e => {
        e.preventDefault()

        if(!!this.state.image_file) {
            this.setState({
                onSelected: true,
            })
            
            let formData = new FormData()
            formData.append('avatar', this.state.image_file)
            formData.append('username', this.state.data_user.user.username);
            formData.append('user_id', this.state.data_user.user.id)
            
            await axios({
                method: 'POST',
                url: '/api/avatar',
                data: formData,
                headers: {
                    'Authorization' :`Bearer ${this.state.data_user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: progressEvent => {
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    this.setState({
                        progress: percentCompleted,
                    })
                }
            })
            .then(response => {
                console.log(response.data)
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

    _showAvatar = (link) => {
        return (
            <img src={link}></img>
        )
    }

    render() {
        return (
            <section className="after-loop">
                <div className="mar-top-30">
                    <div className="sclip-float-header clearfix">
                        <Link className="sclip-box-title" to="/profile/avatar">Avatar <i className="icon ic-go-right"></i></Link>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="sclip-upload">
                                <form onSubmit={this._fileUploadHandler}>
                                    <div className="image-upload-wrap">
                                        <input
                                            className="file-upload-input"
                                            type="file"
                                            onChange={this._imageSelectedHandler}
                                            accept={this.state.supported_mime_image}
                                        />
                                        <div className="drag-text">
                                            {this.state.image_preview ? this._showAvatar(this.state.image_preview) : null}
                                            <i className={`icon ic-upload-sclip-lg ${!this.state.image_preview ? null : "hidden"}`}></i>
                                        </div>
                                    </div>
                                    <div className="sclip-avatar">
                                        <button className={`sclip-upload-btn`}>Tải lên</button>
                                    </div>
                                </form>
                                {this.state.onSelected ? null : <ErrorAlert content="Bạn chưa chọn ảnh đại diện"/>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data_user: [],
        }
    }

    componentDidMount() {
        let data = authenticationService.getToken()
        if(!!data && !!authenticationService.isTokenExpired(data.token)) {
            this.setState({
                data_user: data.user,
            })
        }
    }

    render() {
        return (
            <BrowserRouter>
                <main id="main-body" className="bg-page bg-profile">
                    <div className="bg-border">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-3">
                                    <ul className="sclip-nav sclip-nav-vertical">
                                        <li>
                                            <NavLink className="sclip-hor-link" activeClassName="active" title="Thông tin" to="/profile" exact>Thông tin</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="sclip-hor-link" activeClassName="active" title="Đổi mật khẩu" to="/profile/change-password">Mật khẩu</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="sclip-hor-link" activeClassName="active" title="Ảnh đại diện" to="/profile/avatar">Ảnh đại diện</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="sclip-hor-link" activeClassName="active" title="Sclip của tôi" to="/profile/my-sclip">SCLIP</NavLink>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-9">
                                    <Switch>
                                        <Route exact path='/profile' component={Home} />
                                        <Route exact path='/profile/change-password' component={ChangePassword} />
                                        <Route exact path='/profile/my-sclip' component={Statistic} />
                                        <Route exact path='/profile/avatar' component={Avatar} />
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </BrowserRouter>
        )
    }
}