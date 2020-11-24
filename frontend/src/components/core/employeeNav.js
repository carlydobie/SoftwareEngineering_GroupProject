import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
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

  export default function ButtonAppBar() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <AppBar color='#000000' position="static" className={classes.barBackgroundEmp}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} aria-label="menu" className={classes.button}>
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
            <div >
            <Button className={classes.button}>
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
  
