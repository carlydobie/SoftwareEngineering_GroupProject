import '../css/homepage.css';
import { Box, Paper, ButtonBase, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { Howl } from 'howler';
import horn from '../sounds/horn.wav';
import LoginForm from '../components/employeeLogin';

/*
 *  Home Page Component
 *  The landing page for the website where customers can 
 *  go to the online shopping platform, or employees can
 *  login to do their work
 *
 */

//hook for sound effect
var hornsound = new Howl({
  src: [horn],
  volume: 0.25,
  buffer: true,
  preload: true,
})

export default function HomePage() {

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
          <Grid item xs={6} lg={6} onMouseEnter={() => hornsound.play()} onMouseLeave={() => hornsound.stop()}>
            <ButtonBase to="/Customer" component={Link} style={{display: 'block'}}>
              <Paper className="home-grid-item">
                SHOP
              </Paper>
            </ButtonBase>
          </Grid>
          <Grid item xs={6} lg={6} onMouseEnter={() => hornsound.play()} onMouseLeave={() => hornsound.stop()}>
            <Paper className="home-grid-item">
              <LoginForm />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
