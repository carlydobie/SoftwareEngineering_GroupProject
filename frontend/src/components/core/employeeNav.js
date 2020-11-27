import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, createMuiTheme, ThemeProvider } from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import Cardboard from '../../graphics/cardboard-texture.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: '20px',
    },
    barBackgroundEmp: {
      backgroundImage: `url(${Cardboard})`
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: 'white'
    },
    link: {
      flexGrow: 1,
    },
    button: {
      color: 'white',
    },
    login: {
      flexGrow: 1,
    }
  }));

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#FFF',
      }
    }
  })

  export default function ButtonAppBar() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <ThemeProvider theme={theme}>
        <AppBar color="primary" position="static" className={classes.barBackgroundEmp}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <div className={classes.link}>
            <Button to="/" component={ Link } className={classes.button}>
              <Typography>
                Home
              </Typography>
            </Button>
            <Button to="/Warehouse" component={ Link } className={classes.button}>
            <Typography>
                Warehouse
              </Typography>
            </Button>
            <Button to="/ReceivingDesk" component={ Link } className={classes.button}>
            <Typography>
                Receiving
              </Typography>
            </Button>
            <Button to="/Admin" component={ Link } className={classes.button}>
            <Typography>
                Admin
              </Typography>
            </Button>
            </div>
          </Toolbar>
        </AppBar>
        </ThemeProvider>
      </div>
    );
  }
  
