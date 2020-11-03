import '../css/homepage.css'
// import { BrowserRouter } from 'react-router-dom'
import Background from '../graphics/AProj-BG.png'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

function HomePage() {

  return (
      <div>
      <body>
          <Container className="home-menu-box"> 
          <Grid container spacing={2}>
              <Grid item xs={12} lg={12}>
                <Paper>
                  <h2>Welcome to hell!</h2>
                </Paper>
              </Grid>
              <Grid item xs={6} lg={6}>
                <Paper>
                  <h2>Hello World!</h2>
                  <Button to="/Customer" component={Link}>
                    <Typography>
                      Customer Link
                    </Typography>
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={6} lg={6}>
                <Paper>
                  <h2>Hello World!</h2>
                  <Button to="/Warehouse" component={Link}>
                    <Typography>
                      Employee Link
                    </Typography>
                  </Button>
                </Paper>
              </Grid>
          </Grid>
          </Container>
          </body>
        </div>
  );
}

export default HomePage;