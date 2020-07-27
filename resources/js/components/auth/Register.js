import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { authenticationService } from '../../_helpers/authentication'
import LoadingBar from 'react-top-loading-bar'

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            re_password: '',
            fullname: '',
            errors: [],
            progress: 0,
        }

        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateUser = this.handleCreateUser.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async handleCreateUser(event) {
        event.preventDefault()

        const { history } = this.props

        const users = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            re_password: this.state.re_password,
            fullname: this.state.fullname,
        }

        await axios
            .post('/api/register', users, {
                onUploadProgress: (progressEvent) => {
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    this.setState({
                        progress: percentCompleted
                    })
                }
            })
            .then(response => {
                if (response.data.success) {
                    history.push('/login')
                }
                else {
                    this.setState({
                        errors: response.data.errors,
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            })
    }

    hasErrorFor(field) {
        return !!this.state.errors[field]
    }

    renderErrorFor(field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='width_common mess_error'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    onLoaderFinished() {
        this.setState({
            progress: 0
        })
    }

    componentDidMount() {
        document.title = "Đăng ký | SClip"

        if(!!authenticationService.loggedIn()) {
            this.props.history.replace('/')
        }
    }

    render() {
        const { progress } = this.state

        return (
            <main id="main-body" className="bg-padding">
                <LoadingBar
                    progress={progress}
                    height={1}
                    color="#ff3838"
                    onLoaderFinished={() => this.onLoaderFinished()}
                />
                <section className="wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="title_popup_sclip width_common flex">
                                <Link className="tab_log tab_login" to='/login'>Đăng nhập</Link>
                                <Link to="/register" className="tab_log tab_res active">Tạo tài khoản</Link>
                            </div>
                            <div className="content_poup_sclip width_common content_log">
                                <div className="width_common block_log">
                                    <div className="inner_block_log width_common flex">
                                        <div className="box_log box_left">
                                            <div className="width_common tit_box"><p>Đăng ký tài khoản SClip</p></div>
                                            <div className="width_common form_log">
                                                <form onSubmit={this.handleCreateUser}>
                                                    <div className="item_input_log" id="sclip_name_check">
                                                        <input
                                                            type="text"
                                                            className="input_form has_transition"
                                                            name="username"
                                                            id="username"
                                                            placeholder="Tên đăng nhập"
                                                            onChange={this.handleFieldChange}
                                                        />
                                                        {this.renderErrorFor('username')}
                                                    </div>
                                                    <div className="item_input_log" id="sclip_email_check">
                                                        <input
                                                            type="text"
                                                            className="input_form has_transition"
                                                            name="email"
                                                            id="email"
                                                            placeholder="Email"
                                                            onChange={this.handleFieldChange}
                                                        />
                                                        {this.renderErrorFor('email')}
                                                    </div>
                                                    <div className="item_input_log" id="sclip_password_check">
                                                        <input
                                                            type="password"
                                                            className="input_form has_transition input_pass"
                                                            name="password"
                                                            id="password"
                                                            placeholder="Mật khẩu"
                                                            onChange={this.handleFieldChange}
                                                        />
                                                        {this.renderErrorFor('password')}
                                                    </div>
                                                    <div className="item_input_log" id="sclip_password_check">
                                                        <input
                                                            type="password"
                                                            className="input_form has_transition input_pass"
                                                            name="re_password"
                                                            id="re_password"
                                                            placeholder="Xác nhận mật khẩu"
                                                            onChange={this.handleFieldChange}
                                                        />
                                                        {this.renderErrorFor('re_password')}
                                                    </div>
                                                    <div className="item_input_log" id="sclip_fullname_check">
                                                        <input
                                                            type="text"
                                                            className="input_form has_transition"
                                                            name="fullname"
                                                            id="fullname"
                                                            placeholder="Tên đầy đủ"
                                                            onChange={this.handleFieldChange}
                                                        />
                                                        {this.renderErrorFor('fullname')}
                                                    </div>
                                                    <div className="item_input_log item_button_act">
                                                        <button className="pri_button btn_log has_transition">Đăng ký</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="box_log box_right">
                                            <div className="width_common tit_box"><p>Đăng ký một tài khoản mới</p></div>
                                            <div className="width_common form_log">
                                                <div className="item_input_log">
                                                    <Link className="sclip_extend_form __register_form" to='/register'>
                                                        <span>Đăng ký</span>
                                                    </Link>
                                                </div>
                                                <div className="item_input_log">
                                                    <Link className="sclip_extend_form __register_form" to='/forgotpassword'>
                                                        <span>Quên mật khẩu</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="width_common note_pass note_qd mt25">Khi bấm tạo tài khoản bạn đã đồng ý với quy định của chúng tôi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}