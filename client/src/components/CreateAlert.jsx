import React, {useState} from 'react'
import {
    FormControl, TextField, FormLabel, InputLabel, Select,
    RadioGroup, FormControlLabel, Radio, Button
} from '@material-ui/core'
import { addData } from '../redux/actions/userAction'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { AddRounded } from '@material-ui/icons'
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    rounded: {
        borderRadius: "15px",
    },
    boldFont: {
        fontWeight: "600",
    }
}));

const CreateAlert = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const reduxData = useSelector(store => store.userRoot)
    const {loader} = reduxData
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [value, setValue] = useState("")
    const [criteria, setCriteria] = useState("")
    const [priceSignal, setPriceSignal] = useState("")
    const [activeDay, setActiveDay] = useState("")


    const formHandler = (e) => {
        e.preventDefault()
        if (name && email && phoneNumber && value && criteria && priceSignal && activeDay) {
            dispatch(addData({name, email, phoneNumber, value, criteria, priceSignal, activeDay}))
        }
        else {
            alert("Field cannot be empty")
        }
    }

    return (
        <>
            <div className="bg-white p-3">
                <div className={`${classes.boldFont} h6`}>Create Alert</div>
                <form onSubmit={formHandler}>
                        <FormControl fullWidth>
                        <TextField value={name} type="text" onChange={(e)=>setName(e.target.value)} size="small" id="outlined-error-helper-text" variant="outlined"
                            placeholder="Name" />
                       </FormControl>
                        <FormControl fullWidth>
                            <TextField value={email} type="email" onChange={(e)=>setEmail(e.target.value)} size="small" id="outlined-error-helper-text" variant="outlined"
                                placeholder="Email" />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField value={phoneNumber} type="number" onChange={(e)=>setPhoneNumber(e.target.value)} size="small" id="outlined-error-helper-text" variant="outlined"
                                placeholder="Phone Number" />
                        </FormControl>
                        <FormControl fullWidth component="fieldset">
                            <FormLabel component="legend">Criteria</FormLabel>
                            <RadioGroup aria-label="criteria" value={criteria}  row onChange={(e)=>setCriteria(e.target.value)}>
                                <FormControlLabel value="Greater than" control={<Radio />} label="Greater than" />
                                <FormControlLabel value="Lesser than" control={<Radio />} label="Lesser than" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField value={value} onChange={(e)=>setValue(e.target.value)} size="small" id="outlined-error-helper-text" variant="outlined"
                                placeholder="Value" />
                        </FormControl>
                        <FormControl size="small" variant="outlined" fullWidth >
                            <InputLabel htmlFor="age-native-simple">Price Signal</InputLabel>
                            <Select
                                native
                                value={priceSignal}
                                onChange={(e)=>setPriceSignal(e.target.value)}
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
                    {loader ? <Loader /> : <Button type="submit" style={{ backgroundColor: "#1a163d" }} className="text-white px-4 mt-2">Submit</Button> }
                </form>
            </div>
        </>
    )
}


export default CreateAlert


// {/* <FormControl>
//                 <InputLabel htmlFor="my-input">Email address</InputLabel>
//                 <Input id="my-input" aria-describedby="my-helper-text" />
//                 <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
//             </FormControl> */}
