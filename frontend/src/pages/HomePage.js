import '../css/homepage.css'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import ButtonBase from '@material-ui/core/ButtonBase'
import useSound from 'use-sound';
import horn from '../sounds/horn.wav';
import { Link } from 'react-router-dom'

/*
 *  Home Page Component
 *  The landing page for the website where customers can 
 *  go to the online shopping platform, or employees can
 *  login to do their work
 *
 */

export default function HomePage() {
  
  //hook for sound effect
  const [playHorn, {stop}] = useSound(
    horn,
    {volume: 0.25}
  );

  //render the title and buttons to navigate to the
  //customer and employee sides of the app
  return (
    <div className="home-bg">
      <Box className="home-menu-box"> 
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Paper className="home-grid-item-title">
              <h2 style={{fontFamily: "Impact", fontSize: "50px"}}>Amazing Auto Parts Galore</h2>
            </Paper>
          </Grid>
          <Grid item xs={6} lg={6} onMouseEnter={playHorn} onMouseLeave={() => {stop()}}>
            <ButtonBase to="/Customer" component={Link} style={{display: 'block'}}>
              <Paper className="home-grid-item">
                SHOP
              </Paper>
            </ButtonBase>
          </Grid>
          <Grid item xs={6} lg={6} onMouseEnter={playHorn} onMouseLeave={() => {stop()}}>
            <ButtonBase to="/Warehouse" component={Link} style={{display: 'block'}}>
              <Paper className="home-grid-item">
                EMPLOYEE
              </Paper>
            </ButtonBase>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
