import React from 'react';
import MUIButton from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  button: {
    margin: '1em',
  },
});

const Button = (props) => {
  const { classes, className, ...other } = props;
  return <MUIButton {...other} className={props.classes.button}/>;
};

export default withStyles(styles)(Button);
