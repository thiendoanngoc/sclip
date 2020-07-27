import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { authenticationService } from '../../_helpers/authentication'

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataUser: [],
            isLogging: false,
            dropdown: false,
            switch_background: true,
            theme: 'http://127.0.0.1:8000/css/sclip.css',
        }

        this.handleLogout = this.handleLogout.bind(this)
        this.handleShowDropdownMenu = this.handleShowDropdownMenu.bind(this)
        this.handleHideDropdownMenu = this.handleHideDropdownMenu.bind(this)
        this.handleSwitchBackground = this.handleSwitchBackground.bind(this)
    }

    handleLogout(e) {
        e.preventDefault()
        this.logout()
        window.location.href = '/'
    }

    handleShowDropdownMenu(e) {
        e.preventDefault()
        this.setState({
            dropdown: !this.state.dropdown,
        })
    }

    handleHideDropdownMenu(e) {
        if (e && e.relatedTarget) {
            e.relatedTarget.click()
        }
        this.setState({
            dropdown: false,
        })
    }

    handleSwitchBackground(e) {
        e.preventDefault()
        this.setState({
            switch_background: !this.state.switch_background,
        })
    }

    bgWhite(e) {
        e.preventDefault()
    }

    bgDark(e) {
        e.preventDefault()
    }

    logout() {
        this.setState({
            isLogging: false
        })
        authenticationService.logout()
    }

    checkLogin(data) {
        if (!!data && !!authenticationService.isTokenExpired(data.token)) {
            let checkToken = authenticationService.checkToken(data.token, data.user.id)
            checkToken.then(response => {
                if (response.status === 'success') {
                    this.setState({
                        dataUser: data.user,
                        isLogging: true,
                    })
                }
                else {
                    this.logout()
                }
            })
        }
        else {
            this.logout()
        }
    }

    componentDidMount() {
        document.getElementById('SCLIP_THEME').href = this.state.theme
        const data = authenticationService.getToken()
        this.checkLogin(data)
    }

    componentDidUpdate() {

    }

    render() {
        const { dataUser, isLogging, dropdown, switch_background } = this.state
        return (
            <div className="sclip-top-bar">
                <div className="sclip--top-bar-inner">
                    <Link className='sclip-logo' to='/'>SClip</Link>
                    <div className="sclip-menu-bar">
                        <div className="--sclip--menu-bar-inner">
                            <ul className="sclip-nav pri">
                                <li>
                                    <NavLink className="nav-link text-upper" activeClassName='active' to='/' exact>Trang chủ</NavLink>
                                </li>
                                <li>
                                    <NavLink className="nav-link text-upper" activeClassName='active' to='/hashtags'>#hashtags</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="user-profile-container">
                        {!isLogging ?
                            (
                                <div className="sclip-login-wrap pull-right">
                                    <div className="sclip-card card-40">
                                        <div className="thumb-40">
                                            <img src="/images/user.svg" alt="Đăng nhập" />
                                        </div>
                                        <div className="card-info">
                                            <div className="title mar-top-10">
                                                <Link to='/login'>Đăng nhập</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div className="sclip-login-wrap pull-right">
                                    <div className="sclip-card card-40">
                                        <Link to='/profile' className="thumb-40">
                                            <img src={dataUser.avatar} alt={dataUser.username} />
                                        </Link>
                                        <div className="card-info">
                                            <div className="title">
                                                <Link to='/profile'>{dataUser.fullname}</Link>
                                                <div className="artist disabled">
                                                    {dataUser.username}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="extension">
                                            <div className="list-buttons">
                                                <div className="normal-view">
                                                    <Link to="" onClick={(e) => this.handleShowDropdownMenu(e)} onBlur={this.handleHideDropdownMenu}>
                                                        <i className={`icon ${dropdown ? 'ic-go-up' : 'ic-go-down'}`}></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`sclip-user-dropdown-menu ${dropdown ? ' sclip-show' : 'sclip-hide'}`}>
                                        <ul className="sclip-user-menu-list bor-top">
                                            <li>
                                                <Link to="/profile">
                                                    <i className="icon ic-artist"></i> <span>Trang cá nhân</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#" onClick={(e) => this.handleLogout(e)}>
                                                    <i className="icon ic-log-out"></i> <span>Đăng xuất</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#" onClick={(e) => this.handleSwitchBackground(e)}>
                                                    <i className="icon ic-brightness"></i> <span>Nền Tối</span> <i className={`icon ic-svg-switch ${switch_background ? null : 'sclip-switch-off'}`}></i>
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="sclip-vip-area bor-top">
                                            <div className="text-center">
                                                <Link to="/upload" className="sclip-btn sclip-btn-green sclip-btn-shadow">
                                                    <i className="icon ic-upload-sclip"></i> Tải lên Clip
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

