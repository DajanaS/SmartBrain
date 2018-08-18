import React, {Component} from 'react';

class ProfileIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        }
    }

    render() {
        return (
            <div className="pa4 tc">
                <img
                    src="https://avatars1.githubusercontent.com/u/8987819"
                    className="br4 h3 w3 dib" alt="avatar"/>
            </div>
        );
    }
}

export default ProfileIcon;
