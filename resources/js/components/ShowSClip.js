import React, { Component } from 'react'
import ReactJWPlayer from 'react-jw-player'

import LoadingBar from 'react-top-loading-bar'
import LoadingScreen from 'react-loading-screen'

import { authenticationService } from '../_helpers/authentication'

import { Link } from 'react-router-dom'

export default class ShowSClip extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatar: '',
            username: '',
            link: '',
            thumbnail: '',
            comment: '',
            error: '',
            success: '',

            onComment: false,
            loadingCommentProgress: 0,
            listComment: [],

            sclip_id: this.props.match.params.id,
            data_user: authenticationService.getToken(),

            isLoading: true,
            progress: 0,
            onLoading: true,

            view_count: 0,
            love_count: 0,
        }

        this._isMounted = false
        this._handleSubmitComment = this._handleSubmitComment.bind(this)
        this._handleFieldChange = this._handleFieldChange.bind(this)
        this._renderErrorFor = this._renderErrorFor.bind(this)
    }

    _handleFieldChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    _handleSubmitComment = async event => {
        event.preventDefault()
        let comment = this.state.comment
        
        this.setState({
            comment: '',
            success: '',
            error: '',
        })

        if(!!comment) {
            this.setState({
                error: '',
            })

            let data = {
                'sclip_id': this.state.sclip_id,
                'user_id': this.state.data_user.user.id,
                'comment': comment,
            }

            let config = {
                headers: {
                    'Authorization' :`Bearer ${this.state.data_user.token}`,
                    'Content-Type': 'application/json',
                }
            }

            await axios
                .post(`/api/post_comment`, data, config)
                .then(response => {
                    this.setState({
                        success: response.data.success,
                    })
                    this.LoadComment()
                })
                .catch(error => {
                    console.log(error.response)
                })
        }
        else {
            this.setState({
                error: 'Chưa nhập nội dung'
            })
        }
    }

    _renderErrorFor = () => {
        return (
            <span className='width_common mess_error'>
                <strong>{this.state.error}</strong>
            </span>
        )
    }

    _renderSuccessFor = () => {
        return (
            <span className='width_common mess_success'>
                <strong>{this.state.success}</strong>
            </span>
        )
    }

    async LoadViewLove() {
        let data = {
            'sclip_id': this.state.sclip_id
        }

        await axios
            .post(`/api/view_count`, data)
            .then(response => {
                console.log(response.data)
                if(response.data.status == 'success') {
                    this.setState({
                        view_count: response.data.view,
                        love_count: response.data.love,
                    })
                }
                else {
                    this.setState({
                        view_count: 0,
                        love_count: 0,
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    async LoadData() {
        await axios
            .get(`/api/sclip/${this.state.sclip_id}`, {
                onDownloadProgress: (progressEvent) => {
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    this.setState({
                        progress: percentCompleted
                    })
                }
            })
            .then(response => {
                if(this._isMounted) {
                    this.setState({
                        avatar: response.data.success.user.avatar,
                        username: response.data.success.user.username,
                        link: response.data.success.link,
                        thumbnail: response.data.success.thumbnail,
                        isLoading: false,
                        progress: 0,
                        onLoading: false,
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            })
    }

    async LoadComment() {
        let data = {
            'sclip_id': this.state.sclip_id
        }

        await axios
            .post(`/api/comment/`, data, {
                onDownloadProgress: (progressEvent) => {
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    this.setState({
                        loadingCommentProgress: percentCompleted,
                    })
                }
            })
            .then(response => {
                if(response.data.success) {
                    let data = response.data.success
                    this.setState({
                        listComment: data,
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    onLoaderFinished() {
        this._isMounted = false
        this.setState({
            progress: 0,
        })
    }

    showCommentArea() {
        return (
            <div className="comment_area">
                <form onSubmit={this._handleSubmitComment} className="form-inline" role="form">
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            id="comment"
                            name="comment"
                            placeholder="Để lại bình luận của bạn..."
                            value={this.state.comment}
                            onChange={this._handleFieldChange}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-outline-light">Bình luận</button>
                    </div>
                    {this._renderErrorFor()}
                    {this._renderSuccessFor()}
                </form>
            </div>
        )
    }

    _showReaction = () => {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="cardbox">
                        <div className="left-icon">
                            <i className="far fa-heart"></i> {this.state.love_count}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this._isMounted = true
        this._isMounted && this.LoadData() && this.LoadComment() && this.LoadViewLove()
        
        let data = authenticationService.getToken()
        if(!!data && !!authenticationService.isTokenExpired(data.token)) {
            this.setState({
                data_user: data,
                onComment: true,
            })
        }
        else {
            this.setState({
                data_user: [],
                onComment: false,
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false
        this.setState({
            onLoading: true,
        })
    }

    componentDidUpdate() {
        
    }

    render() {
        const { avatar, username, link, thumbnail, progress, sclip_id, onLoading, listComment, onComment } = this.state

        return (
            <div>
                <LoadingBar
                    progress={progress}
                    height={1}
                    color="#ff3838"
                    onLoaderFinished={() => this.onLoaderFinished()}
                />
                <main id="main-body" className="bg-page bg-show">
                    <div className="container">
                        <LoadingScreen
                            loading={onLoading}
                            bgColor='#4b4b4b'
                            spinnerColor='#33d9b2'
                            textColor='#f7f1e3'
                            logoSrc='/images/s-logo.png'
                            text='Đang tải nội dung ...'
                        >
                            <ReactJWPlayer
                                key={sclip_id}
                                playerId='sclip_player'
                                playerScript='https://cdn.jwplayer.com/libraries/VvDLH2vm.js'
                                file={link}
                                isAutoPlay={true}
                                image={thumbnail}
                                isMuted={false}
                                customProps={{
                                    repeat: true,
                                    preload: 'auto',
                                }}
                            />
                        </LoadingScreen>
                        {this._showReaction()}
                        <div className="row">
                            <div className="col-md-4">
                                <div className="profile-header-container">   
                                    <div className="profile-header-img">
                                        <Link to={`/member/${username}`}>
                                            <img className="img-circle" src={avatar} />
                                            <div className="rank-label-container">
                                                <span className="label label-default rank-label">{username}</span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="detailBox">
                                    <div className="titleBox">
                                    <label>Bình luận</label>
                                        <button type="button" className="close" aria-hidden="true">&times;</button>
                                    </div>
                                    <div className="actionBox">
                                        <ul className="commentList">
                                            {listComment.map(item =>(
                                                <li key={item.id}>
                                                    <div className="commenterImage">
                                                    <Link to={`/member/${item.user.username}`}><img src={item.user.avatar} /></Link>
                                                    </div>
                                                    <div className="commentText">
                                                        <p className="">{item.body}</p> <span className="date sub-text">{item.created_at}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {onComment ? this.showCommentArea() : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}