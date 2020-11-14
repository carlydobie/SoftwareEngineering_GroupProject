import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import SearchBar from './searchbar.js';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: '20px',
    },
    appbar: {
      background: '#1F404F',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    button: {
      color: 'white',
    },
    shoppingCart: {
      color: 'white',
    },

  }));

  export default function ButtonAppBar() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Button to="/" component={Link} className={classes.button}>
                <Typography>
                    Home
                </Typography>
            </Button>
            <Button to="/Customer" component={Link} className={classes.button}>
                <Typography>
                    Shop
                </Typography>
            </Button>
              <SearchBar />
            <IconButton className={classes.shoppingCart}>
                <ShoppingCartIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

