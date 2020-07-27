import React from 'react'
import SingleVideo from '../SingleVideo'
import LoadingBar from 'react-top-loading-bar'

import { Link } from 'react-router-dom'

export default class ViewProfile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: this.props.match.params.username,
            data_user: [],
            data_sclip: [],
            progress: 0,
        }
    }

    async LoadClipUser() {
        if(!!this.state.username) {
            let user_id = this.state.data_user.id
            let data = {
                'user_id': user_id
            }

            await axios
                .post(`/api/list_sclip`, data, {
                    onDownloadProgress: (progressEvent) => {
                        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        // this.setState({
                        //     progress: percentCompleted
                        // })
                    }
                })
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
    }

    async LoadDataUser() {
        if(!!this.state.username) {
            let user_name = this.state.username
            let data = {
                'username': user_name
            }

            await axios
                .post(`/api/view_profile`, data, {
                    onDownloadProgress: (progressEvent) => {
                        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        this.setState({
                            progress: percentCompleted
                        })
                    }
                })
                .then(response => {
                    if(typeof response.data.success === "undefined") {
                        console.log(response)
                    }
                    else {
                        this.setState({
                            data_user: response.data.success
                        })

                        this.LoadClipUser()
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    componentDidMount() {
        this.LoadDataUser()
    }

    onLoaderFinished() {
        this.setState({
            progress: 0,
        })
    }

    render() {
        return (
            <div>
                <LoadingBar
                    progress={this.state.progress}
                    height={1}
                    color="#ff3838"
                    onLoaderFinished={() => this.onLoaderFinished()}
                />
                <main id="main-body" className="bg-page bg-viewprofile">
                    <div className="container">
                        <div className="row">
                            <div className="content">
                                <div className="card">
                                    <div className="firstinfo"><img src={this.state.data_user.avatar}/>
                                        <div className="profileinfo">
                                            <h1>{this.state.data_user.fullname}</h1>
                                            <h3><Link to={`/member/${this.state.data_user.username}`}>#{this.state.data_user.username}</Link></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                </main>
            </div>
        )
    }
}