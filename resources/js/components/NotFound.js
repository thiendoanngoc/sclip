import React, { Component } from 'react'

export default class NotFound extends Component {
    componentDidMount() {
        document.title = "Trang không tồn tại"
    }

    render() {
        return (
            <main id="main-body" className="bg-page bg-padding">
                <div className="container">
                    <div className="row">
                        <p>Trang không tồn tại</p>
                    </div>
                </div>
            </main>
        )
    }
}