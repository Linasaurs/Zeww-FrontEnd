import React from 'react'
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
const EditProfile = props => { 
    return (
        <div>
            <Modal
                isOpen={props.editProfileVisible}
                toggle={props.toggle}
                className="Modal"
                size="lg"
            >
                <ModalHeader toggle={props.toggle} className="ModalHeader">
                    <p className="modal-title">Create new channel</p>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={props.onsubmit}>
                        <div className="textboxes-area">
                            <div className="text-entry-area">
                                <label>
                                    Username <br />
                                    <input
                                        name="userName"
                                        type="text"
                                        className="form-control"
                                        onChange={props.onchange}
                                    />
                                </label>
                            </div>
                            <div className="text-entry-area">
                                <label>
                                    Email <br />
                                    <input
                                        name="email"
                                        type="text"
                                        className="form-control"
                                        onChange={props.onchange}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="submit-area">
                            <Button className="submit-btn" size="lg">
                              Update Profile
                            </Button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default EditProfile