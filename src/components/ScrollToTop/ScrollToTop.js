import React from 'react'
import {withRouter} from 'react-router-dom'


export class ScrollToTop extends React.Component {

    // In our componentDidUpdate lifecycle method, we check if the location has changed.
    //  If yes then we use the window.scrollTo function to scroll to the very top of the page.
    componentDidUpdate(prevProps) {
        if ( this.props.location !== prevProps.location && window) {
            window.scrollTo(0, 0);
        }
    }
    render() {
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);
