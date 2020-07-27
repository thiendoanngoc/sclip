import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SingleVideo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Link to={`/video/${this.props.sclip_id}`}>
                <div className="_video_feed_item">
                    <div className="_ratio_">
                        <div className="_padding_top_">
                            <div className="_ratio_wrapper">
                                <div className="_image_card_" style={{ backgroundImage: 'url(' + this.props.thumbnail + ')' }}>
                                    <div className="_video_card_play_btn_ _video_card_play_btn_dark _image_card_playbtn_wraaper"></div>
                                    <div className="_video_card_footer_ _video_card_footer_respond _image_card_footer_wraaper">
                                        <span className="_avatar_ _avatar_respond"></span>
                                        <span className="_video_card_footer_likes"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTguMDA5IDE0YS4zMzQuMzM0IDAgMCAxLS4yMTMtLjA2M2MtLjE4Ny0uMTM0LTQuNjA2LTMuMzEyLTYuMjM0LTUuOTkzbC0uMDA3LS4wMUEzLjkzMyAzLjkzMyAwIDAgMSAxIDUuOTE0QzEgMy43NTcgMi43NDIgMiA0Ljg4MyAyYzEuMjQgMCAyLjM5LjU5NCAzLjExNyAxLjU4QTMuODcxIDMuODcxIDAgMCAxIDExLjExNyAyQzEzLjI1OCAyIDE1IDMuNzU2IDE1IDUuOTE1YTMuOTMzIDMuOTMzIDAgMCAxLS41NjIgMi4wM2MtMS42MjggMi42OC02LjA0NyA1Ljg1OC02LjIzNCA1Ljk5MmEuMzMyLjMzMiAwIDAgMS0uMTk1LjA2M3oiLz4KPC9zdmc+Cg==" alt="likes" /> {this.props.view}k</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}
