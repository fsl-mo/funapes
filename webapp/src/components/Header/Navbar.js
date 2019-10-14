/* -- libs -- */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'react-router-dom/Link';

/* -- actions -- */
import { logout } from '../../actions/userActions';

/* -- components -- */
import Logo from '../UI/Logo';
import UserMenu from './UserMenu';

/* -- mui -- */
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.colors.black,
  },
  grow: {
    flexGrow: 1,
  },
  navMenu: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(3),
  },
  navLink: {
    margin: theme.spacing(1),
    color: theme.palette.colors.greylight,
  },
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.credentials);
  const classes = useStyles();

  const { isAuthenticated } = useSelector(state => state.user);
  return (
    <AppBar className={classes.appBar}>
      <Toolbar variant="dense">
        <Logo variant="white" />
        <div className={classes.grow} />
        <nav className={classes.navMenu}>
          {isAuthenticated && (
            <UserMenu user={user} onLogout={() => dispatch(logout())} />
          )}
          {!isAuthenticated && (
            <React.Fragment>
              <Button
                component={Link}
                to="/auth/login"
                size="small"
                className={classes.navLink}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/auth/signup"
                variant="contained"
                color="primary"
                size="small"
                className={classes.navLink}
              >
                Sign Up
              </Button>
            </React.Fragment>
          )}
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
