import React from 'react';
import './Profile.css';

const Profile = ({isProfileOpen, toggleModal}) => {
    return (
        <div className="profile-modal">
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                <main className="pa4 black-80 w-80">
                    <img
                        src="https://avatars1.githubusercontent.com/u/8987819"
                        className="h3 w3 dib" alt="avatar"/>
                    <h1>Dajana Stojchevska</h1>
                    <h4>Images submitted: 5</h4>
                    <p>Member since: January</p>
                    <hr/>
                    <label className="mt2 fw6" htmlFor="username">Name:</label>
                    <input
                        className="pa2 ba w-100"
                        placeholder="Dajana"
                        type="text"
                        name="username"
                        id="name"
                    />
                    <label className="mt2 fw6" htmlFor="userAge">Age:</label>
                    <input
                        className="pa2 ba w-100"
                        placeholder="22"
                        type="text"
                        name="userAge"
                        id="age"
                    />
                    <label className="mt2 fw6" htmlFor="userPet">Pet:</label>
                    <input
                        className="pa2 ba w-100"
                        placeholder="Cat"
                        type="text"
                        name="userPet"
                        id="pet"
                    />
                    <div className="mt4" style={{display: 'flex', justifyContent: 'space-evenly'}}>
                        <button className="b pa2 grow pointer hover-white w-40 bg-green b--black-20">
                            Save
                        </button>
                        <button className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                                onClick={toggleModal}>
                            Cancel
                        </button>
                    </div>
                </main>
                <div className="modal-close" onClick={toggleModal}>&times;</div>
            </article>
        </div>
    );
};

export default Profile;