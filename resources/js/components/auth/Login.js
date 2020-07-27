import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { authenticationService } from '../../_helpers/authentication'

import SuccessAlert from '../alert/SuccessAlert'
import LoadingBar from 'react-top-loading-bar'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            errors: [],
            isPassword: false,
            errorAlert: '',
            progress: 0,
            isLogged: false,
        }

        this._isMounted = false
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleSignIn = this.handleSignIn.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // setTokenToUser = (token, id) => {
    //     let data = {
    //         'token': token,
    //         'id': id,
    //     }

    //     axios
    //         .post(`/api/setToken`, data)
    //         .then(response => {
    //             console.log(response)
    //             if(response.data.status === 'success') {
    //                 this.setState({
    //                     isLogged: true,
    //                 })
    //             }
    //             else {
    //                 this.setState({
    //                     isLogged: false,
    //                 })
    //             }
    //         })
    //         .catch(error => {
    //             this.setState({
    //                 isLogged: false,
    //             })
    //         })
    // }

    async handleSignIn(e) {
        e.preventDefault()

        // let username = this.state.username
        // let password = this.state.password

        // const auth = authenticationService.login(username, password)
        // auth.then(response => {
        //     console.log(response)
        //     if(response.status === 'error') {
        //         this.setState({
        //             errors: response.message
        //         })
        //     }
        //     else if(response.status === 'wrongpass') {
        //         this.setState({
        //             errors: response.message,
        //             isPassword: true,
        //         })
        //     }
        //     else {
        //         authenticationService.setToken(response)
        //         window.location.href = '/'
        //     }
        // })
        
        const users = {
            username: this.state.username,
            password: this.state.password,
        }

        await axios.post('/api/login', users,
                {
                    onUploadProgress: (progressEvent) => {
                        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        this.setState({
                            progress: percentCompleted
                        })
                    }
                }
            )
            .then(response => {
                if (response.data.status === 'success') {
                    let token = response.data
                    if(!!token) {
                        this.setState({
                            errorAlert: 'success'
                        })
                        authenticationService.setToken(token)
                        window.location.href = '/'
                    }
                }
                else if (response.data.status === 'error') {
                    this.setState({
                        errors: response.data.message,
                    })
                }
                else if (response.data.status === 'wrongpass') {
                    this.setState({
                        errors: response.data.message,
                        isPassword: true,
                    })
                }
                else {
                    console.log(response.data)
                }
            })
            .catch(error => {
                console.log(error)
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

    renderErrorPassword() {
        if(!!this.state.isPassword) {
            return (
                <span className='width_common mess_error'>
                    <strong>{this.state.errors}</strong>
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
        document.title = "Đăng nhập | SClip"

        if(!!authenticationService.loggedIn()) {
            this.props.history.replace('/')
        }
    }

    componentWillUnmount() {
        this._isMounted = false
        this.setState({
            progress: 0
        })
    }

    render() {

        const { progress, errorAlert } = this.state

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
                                <Link className="tab_log tab_login active" to='/login'>Đăng nhập</Link>
                                <Link className="tab_log tab_res" to="/register">Tạo tài khoản</Link>
                            </div>
                            <div className="content_poup_sclip width_common content_log">
                                <div className="width_common block_log">
                                    <div className="inner_block_log width_common flex">
                                        <div className="box_log box_left">
                                            <div className="width_common tit_box"><p>Đăng nhập vào SClip</p></div>
                                            <form onSubmit={this.handleSignIn}>
                                                <div className="width_common form_log">
                                                    <div className="item_input_log">
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
                                                    <div className="item_input_log">
                                                        <input
                                                            type="password"
                                                            className="input_form has_transition"
                                                            name="password"
                                                            id="password"
                                                            placeholder="Mật khẩu"
                                                            onChange={this.handleFieldChange}
                                                        />
                                                        {this.renderErrorFor('password')}
                                                        {this.renderErrorPassword()}
                                                    </div>
                                                    <div className="item_input_log item_button_act">
                                                        <button className="pri_button btn_log has_transition">Đăng nhập</button>
                                                    </div>
                                                </div>
                                            </form>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}

export default Login
