import '../css/homepage.css'
import { BrowserRouter } from 'react-router-dom'
import Background from '../graphics/AProj-BG.png'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

function HomePage() {

  return (
    <div>
      <div style={{ backgroundImage: `url(${Background})`, backgroundRepeat: 'no-repeat', width: 'auto', height: 'auto', color: `#c3c3c3` }}>
        <div>
          <Grid className="home-menu-box" container spacing={3}>
            <div className="home-grid-item">
              <Grid item xs={12}>
                <Paper>
                  <h2>Welcome to hell!</h2>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>
                  <h2>Hello World!</h2>
                  <Button to="/Customer" component={Link}>
                    <Typography>
                      Customer Link
                    </Typography>
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>
                  <h2>Hello World!</h2>
                  <Button to="/Warehouse" component={Link}>
                    <Typography>
                      Employee Link
                    </Typography>
                  </Button>
                </Paper>
              </Grid>
            </div>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default HomePage;