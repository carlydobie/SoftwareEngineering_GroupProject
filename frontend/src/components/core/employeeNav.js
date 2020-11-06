import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

//import App from '../../App';
import { Link } from 'react-router-dom';
//import { Autorenew } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    link: {
      //marginLeft: 'auto',
      flexGrow: 1,
    },
    login: {
      //maginLeft: 'auto',
      //marginRight: 1,
      flexGrow: 1,
    }
  }));

  export default function ButtonAppBar() {
    const classes = useStyles();
  
    return (
      <div>
        <AppBar color="white" position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <div className={classes.link}>
            <Button to="/" component={ Link }>
              <Typography>
                Home
              </Typography>
            </Button>
            <Button to="/Warehouse" component={ Link }>
            <Typography>
                Warehouse
              </Typography>
            </Button>
            <Button to="/ReceivingDesk" component={ Link }>
            <Typography>
                Receiving
              </Typography>
            </Button>
            <Button to="/Admin" component={ Link }>
            <Typography>
                Admin
              </Typography>
            </Button>
            </div>
            <div >
            <Button >
              <Typography>
                Login
              </Typography>
            </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  
