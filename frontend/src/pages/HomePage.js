import '../css/homepage.css'
// import { BrowserRouter } from 'react-router-dom'
// import Background from '../graphics/AProj-BG.png'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'


export default function HomePage() {

  return (
    <body className="home-bg">
          <Box className="home-menu-box"> 
          <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
                <Paper className="home-grid-item">
                  <h2>Amazing Auto Parts Galore</h2>
                </Paper>
              </Grid>
              <Grid item xs={6} lg={6}>
              <Paper className="home-grid-item">
              <Button to="/Customer" component={Link}>
                    <Typography>
                      SHOP
                    </Typography>
                    </Button>
                </Paper>
              </Grid>
              <Grid item xs={6} lg={6}>
                <Paper className="home-grid-item">
                <Button to="/Warehouse" component={Link}>
                    <Typography>
                      EMPLOYEE
                    </Typography>
                    </Button>
                </Paper>
              </Grid>
          </Grid>
          </Box>
    </body>
  );
}
