import React from 'react'
import PropTypes from 'prop-types'

export default class ErrorAlert extends React.Component {
    render() {
        return (
            <div className="alert-ow">
                <div className="alert alert-danger" role="alert">
                    {this.props.content}
                </div>
            </div>
        )
    }
}

ErrorAlert.propTypes = {
    content: PropTypes.string.isRequired
}