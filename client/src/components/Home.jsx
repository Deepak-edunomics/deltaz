import React from 'react'
import { Grid, Badge } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { NotificationsActive } from '@material-ui/icons'
import CreateAlert from './CreateAlert'
import BottomTable from './BottomTable'
import ChartSection from './ChartSection'
import Sidebar from './Sidebar'
import Loader from './Loader'

const useStyles = makeStyles((theme) => ({
    homeSection: {
        borderRadius: "20px",
        backgroundColor: "#d9d6ce",
      },
      rounded: {
        borderRadius: "15px",
      },
      boldHeading: {
        fontWeight: "700",
      },
      root: {
        flexGrow: 1,
      },
      hr:{
        color: 'grey',
        width:'100%',
          }    
}))


const Home = () => {
  const classes = useStyles();

    return (
        <>
                    <Grid container  className={`${classes.homeSection} p-3`}>
                <Grid item container direction="row" justify="space-between" alignItems="center"           className={`${classes.boldHeading} h5 mb-3`} >
                    <Grid item> 
                        Peak Shaving & Alert
                    </Grid>
                    <Grid item>
                        <span> Carlsberg Group</span>
                        <Badge badgeContent={4} color="error" className="mx-3">
                            <NotificationsActive />
                        </Badge>
                    </Grid>
                </Grid>

                <hr className={`${classes.hr} mt-0`}  />

                <Grid item container 
          className={`${classes.boldHeading} ${classes.rounded}  bg-white`}
                >
                    {/* <ChartSection /> */}
                    <ChartSection />
                </Grid>

                <Grid item container xs={12}  className={classes.root}>
          <Grid item xs={4} className={`${classes.rounded} bg-white my-3`}>

                        {/* CREATE ALERT FORM */}
                        <CreateAlert />

                    </Grid>
                    <Grid item xs={8} className={`${classes.rounded} px-3`}>

                        {/* BOTTOM TABLE */}
                       <BottomTable />
                    </Grid>

                </Grid>
            </Grid>

        </>
    )
}

export default Home
