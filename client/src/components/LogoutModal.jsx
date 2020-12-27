import React from 'react'
import { Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { userLogout } from '../redux/actions/userAction'
import {useHistory} from 'react-router-dom'




const LogoutModal = ({showLogoutModal, setShowLogoutModal}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    return (
            <Modal show={showLogoutModal} onHide={()=>setShowLogoutModal(false)}>
                <Modal.Header >
                    <Modal.Title>USER LOGOUT</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure want to logout ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>dispatch(userLogout(history))} >
                        Yes
          </Button>
                    <Button variant="primary" onClick={()=>setShowLogoutModal(false)}>
                        No
          </Button>
                </Modal.Footer>
            </Modal>
    )
}

export default LogoutModal
