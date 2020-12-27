import React, { useState, useEffect } from 'react'
import {
    FormControl, TextField, FormLabel, InputLabel, Select,
    RadioGroup, FormControlLabel, Radio, Button
} from '@material-ui/core'
import { updateData } from '../redux/actions/userAction'
import { Modal } from 'react-bootstrap'
import { useDispatch , useSelector} from 'react-redux'
import Loader from '../components/Loader'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    rounded: {
        borderRadius: "15px",
    },
    boldFont: {
        fontWeight: "600",
    }
}));

const UpdateDataModal = ({ showUpdateDataModal, setShowUpdateDataModal, data }) => {
    const reduxData = useSelector(store => store.userRoot)
    const classes = useStyles();
    const dispatch = useDispatch()
    const { loader, updateDataFlag} = reduxData
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [value, setValue] = useState("")
    const [criteria, setCriteria] = useState("")
    const [priceSignal, setPriceSignal] = useState("")
    const [activeDay, setActiveDay] = useState("")

    useEffect(() => {
        console.log("defwe",data)
        setName(data.name)
        setEmail(data.email)
        setValue(data.value)
        setCriteria(data.criteria)
        setPriceSignal(data.priceSignal)
        setActiveDay(data.activeDay)
      
    }, [data])

    const formHandler = (e) => {
        e.preventDefault()
        dispatch(updateData({ name, email, value, criteria, priceSignal, activeDay }, data._id))
    }

    useEffect(() => {
        if (updateDataFlag) {
            setShowUpdateDataModal(false)
        }
    }, [updateDataFlag])

    return (
        <div>
            <Modal show={showUpdateDataModal} onHide={() => setShowUpdateDataModal(false)}>
                <Modal.Header >
                    <Modal.Title>DATA UPDATE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formHandler}>
                        <FormControl fullWidth>
                            <TextField value={name} type="text" onChange={(e) => setName(e.target.value)} size="small" id="outlined-error-helper-text" variant="outlined"
                                placeholder="Name" />
                        </FormControl>
                        <FormControl fullWidth component="fieldset">
                            <FormLabel component="legend">Criteria</FormLabel>
                            <RadioGroup aria-label="criteria" value={criteria} row onChange={(e) => setCriteria(e.target.value)}>
                                <FormControlLabel value="Greater than" control={<Radio />} label="Greater than" />
                                <FormControlLabel value="Lesser than" control={<Radio />} label="Lesser than" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField value={value} onChange={(e) => setValue(e.target.value)} size="small" id="outlined-error-helper-text" variant="outlined"
                                placeholder="Value" />
                        </FormControl>
                        <FormControl size="small" variant="outlined" fullWidth >
                            <InputLabel htmlFor="age-native-simple">Price Signal</InputLabel>
                            <Select
                                native
                                value={priceSignal}
                                onChange={(e) => setPriceSignal(e.target.value)}
                            >
                                <option aria-label="None" value="" />
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
                            </Select>
                        </FormControl>
                        <FormControl size="small" variant="outlined" fullWidth >
                            <InputLabel htmlFor="age-native-simple">Active Day</InputLabel>
                            <Select
                                native
                                value={activeDay}
                                onChange={(e) => setActiveDay(e.target.value)}
                            >
                                <option aria-label="None" value="" />
                                <option value={"Monday"}>Monday</option>
                                <option value={"Tuesday"}>Tuesday</option>
                                <option value={"Wednesday"}>Wednesday</option>
                                <option value={"Thursday"}>Thursday</option>
                                <option value={"Friday"}>Friday</option>
                                <option value={"Saturday"}>Saturday</option>
                                <option value={"Sunday"}>Sunday</option>
                                <option value={"Everyday"}>Everyday</option>

                            </Select>
                        </FormControl>
                        {loader ? <Loader /> : <Button type="submit" style={{ backgroundColor: "#1a163d" }} className="text-white px-4 mt-2">Submit</Button>}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowUpdateDataModal(false)}>
                       Close
          </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UpdateDataModal
