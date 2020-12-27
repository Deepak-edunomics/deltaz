import React, {useState, useEffect} from 'react'
import { Refresh, Edit, DeleteOutline } from '@material-ui/icons'
import { useSelector, useDispatch } from 'react-redux';
import {getData} from '../redux/actions/userAction'
import {
    Grid, Paper, Button, TableContainer, TableRow, TableHead,
    TableBody, IconButton, Table, TableCell
} from '@material-ui/core'

//Components
import UpdateDataModal from './UpdateDataModal'
import DeleteModal from './DeleteModal'



const BottomTable = () => {
    const reduxData = useSelector(store => store.userRoot)
    const { data, user } = reduxData
    const dispatch = useDispatch()
    const [showUpdateDataModal, setShowUpdateDataModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [id, setId] = useState("")
    const [dataToUpdate, setDataToUpdate] = useState({})

    useEffect(() => {
        dispatch(getData())
    },[])


    const deleteHandleClick = (id) => {
        setShowDeleteModal(true)
        setId(id)
    }

    const updateClickHandler = (data) => {
        setShowUpdateDataModal(true)
        setDataToUpdate(data)
    }


    return (
        <>
            <UpdateDataModal data={dataToUpdate} showUpdateDataModal={showUpdateDataModal} setShowUpdateDataModal={setShowUpdateDataModal} /> 
           <DeleteModal id={id} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} /> 
            <Grid container direction="row" justify="space-between" alignItems="center" className="bg-white">
                <Grid item>
                    <Button style={{ backgroundColor: "#1a163d" }} className="ml-auto text-white px-4 mx-3">
                        Alters</Button>
                    <Button style={{ color: "#1a163d", borderColor: "#1a163d" }} className="border border-dark ml-auto bg-white px-4 mx-3">
                        Triggered Alters
                    </Button>
                </Grid>
                <Grid item><IconButton> <Refresh /></IconButton></Grid>
                <TableContainer component={Paper}>
                    <Table aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Price Signal</TableCell>
                                <TableCell>Criteria</TableCell>
                                <TableCell>Value</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Active Days</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length !== 0 ? data.map(data =>
                                <TableRow key={data._id}>
                                    <TableCell style={{ minWidth: "100px" }} >
                                        {data.name}
                                    </TableCell>
                                    <TableCell align="center">{data.priceSignal}</TableCell>
                                    <TableCell style={{ minWidth: "100px" }} align="center">{data.criteria }</TableCell>
                                    <TableCell align="center">{data.value}</TableCell>
                                    <TableCell align="center">{ data.email}</TableCell>
                                    <TableCell align="right">{data.activeDay }</TableCell>
                                    <TableCell style={{ minWidth: "130px" }} align="center">
                                        <IconButton> <Edit onClick={()=>updateClickHandler(data)} /> </IconButton>
                                        <IconButton>  <DeleteOutline onClick={()=>deleteHandleClick(data._id)} /> </IconButton>
                                    </TableCell>
                                </TableRow>
                            ): "Nothing to show"}

                        </TableBody>

                    </Table>
                </TableContainer>

            </Grid>
            

            </>
    )
}

export default BottomTable
