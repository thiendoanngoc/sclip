import React, { Component } from 'react'
import SingleVideo from './SingleVideo'
import { Link } from 'react-router-dom'

import LoadingBar from 'react-top-loading-bar'
import LoadingScreen from 'react-loading-screen'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            progress: 0,
            onLoading: true,
        }

        this._isMounted = false
    }

    async getData() {
        await axios
            .get(`/api/scliplist`, {
                onDownloadProgress: (progressEvent) => {
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    this.setState({
                        progress: percentCompleted
                    })
                }
            })
            .then(response => {
                this.setState({
                    data: [...response.data],
                    progress: 100,
                    onLoading: false,
                })
            })
    }

    onLoaderFinished() {
        this._isMounted = false
        this.setState({
            progress: 100
        })
    }

    componentDidMount() {
        document.title = "Mạng xã hội chia sẽ Video | SClip"
        this._isMounted = true
        if(!!this._isMounted) {
            this.getData()
        }
    }

    componentWillUnmount() {
        this._isMounted = false
        this.setState({
            progress: 0,
            onLoading: true,
        })
    }

    render() {
        const { data, progress, onLoading } = this.state

        return (
            <div>
                <LoadingBar
                    progress={progress}
                    height={1}
                    color="#ff3838"
                />
                <main id="main-body" className="bg-page bg-padding">
                    <div className="container">
                        <div className="_base_layout_header">
                            <h1 className="_trending_page_title">Video đang thịnh hành</h1>
                        </div>
                        <div className="_base_layout_content">
                            <div className="_base_layout_main">
                                <LoadingScreen
                                    loading={onLoading}
                                    bgColor='#4b4b4b'
                                    spinnerColor='#33d9b2'
                                    textColor='#f7f1e3'
                                    logoSrc='/images/s-logo.png'
                                    text='Đang tải nội dung ...'
                                >
                                    {data.map(item => (
                                        <SingleVideo
                                            key={item.id}
                                            sclip_id={item.sclip_id}
                                            thumbnail={item.thumbnail}
                                            view={item.view}
                                        />
                                    ))}
                                </LoadingScreen>
                            </div>
                            <aside className="_base_layout_aside">
                                <div className="_base_layout_aside_sticky">
                                    <div className="_base_layout_aside_wrapper">
                                        <div className="_list_component_">
                                            <h1 className="_list_component_title">Trending Hashtags</h1>
                                            <div className="_list_component_content">
                                                <div className="_list_item_">
                                                    <div className="_list_item_content">
                                                        <p className="_list_item_title">
                                                            <Link to=''>#truong</Link>
                                                        </p>
                                                        <p className="_list_item_description">35.9m views</p>
                                                    </div>
                                                </div>
                                                <div className="_list_item_">
                                                    <div className="_list_item_content">
                                                        <p className="_list_item_title">
                                                            <Link to=''>#stuckinmyhead</Link>
                                                        </p>
                                                        <p className="_list_item_description">36.6m views</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}