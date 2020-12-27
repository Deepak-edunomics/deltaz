import React, { useEffect} from 'react'
import { Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { deleteData } from '../redux/actions/userAction'


const DeleteModal = ({ showDeleteModal, setShowDeleteModal, id }) => {
    
    const dispatch = useDispatch()
    
    const clickHandler = () => {
        dispatch(deleteData(id))
        setShowDeleteModal(false)
    }
    return (
        <div>
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header >
                    <Modal.Title>USER LOGOUT</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure want to Delete ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={clickHandler} >
                        Yes
          </Button>
                    <Button variant="primary" onClick={() => setShowDeleteModal(false)}>
                        No
          </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DeleteModal
