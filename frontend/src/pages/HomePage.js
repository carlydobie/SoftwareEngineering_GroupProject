import '../css/homepage.css'
import { BrowserRouter } from 'react-router-dom'
import Background from '../graphics/AProj-BG.png'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

function HomePage() {
  
  return (
    <div>
      <div style={{ backgroundImage: `url(${Background})`, backgroundRepeat: 'no-repeat', width: 'auto', height: 'auto', color: `#c3c3c3` }}>
        <div>
          <Grid className="home-main" container spacing={3}>
            <Grid item xs={1} sm={1} lg={1}>
              <Paper>
                <h2>Hello World!</h2>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>

    </div>
  );
}

export default HomePage;