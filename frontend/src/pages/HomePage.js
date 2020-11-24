import '../css/homepage.css'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import ButtonBase from '@material-ui/core/ButtonBase'
import { Link } from 'react-router-dom'
import useSound from 'use-sound';
import engineSound from '../sounds/engine-starting.mp3';
import horn from '../sounds/horn.wav';
import motorBike from '../sounds/motorbike-start.wav';


export default function HomePage() {

  // let audio = document.createElement("audio");
  // audio.src = "../sounds/engine-starting.mp3";
  // document.body.appendChild(audio);

  const [playHorn, {stop}] = useSound(horn);
  // const [playMotorBike] = useSound(motorBike);

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
