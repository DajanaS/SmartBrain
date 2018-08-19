import React, {Component} from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

class ProfileIcon extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    };

    render() {
        return (
            <div className="pa4 tc">
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="pointer">
                    <DropdownToggle
                        tag="span"
                        data-toggle="dropdown"
                        aria-expanded={this.state.dropdownOpen}>
                        <img
                            src="https://avatars1.githubusercontent.com/u/8987819"
                            className="br4 h3 w3 dib" alt="avatar"/>
                    </DropdownToggle>
                    <DropdownMenu
                        right
                        className="b--transparent shadow-5 pointer"
                        style={{
                            marginTop: '20px',
                            backgroundColor: 'rgba(225, 225, 225, 0.5)'
                        }}>
                        <DropdownItem onClick={this.props.toggleModal}>My profile</DropdownItem>
                        <DropdownItem onClick={() => this.props.onRouteChange('signout')}>Sign out</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}

export default ProfileIcon;
