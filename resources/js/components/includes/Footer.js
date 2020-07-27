import React from 'react'

export default class Footer extends React.Component {
    render() {
        return(
            <footer id="footer" className="bg-footer">
                <div className="container">
                    <div className="sub-container pad-top-bot">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <div className="sclip-license-logo clearfix">
                                    <div className="sclip-license-info">
                                        <span className="sclip-logo"></span>
                                        <div className="sclip-copyright">Một sản phẩm của NoobTeam</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}