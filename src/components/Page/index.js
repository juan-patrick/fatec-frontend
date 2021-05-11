import DrawerBar from '../../components/DrawerBar';

import { makeStyles } from '@material-ui/core/styles';

function Page({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <DrawerBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4)
  },
  toolbar: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: theme.spacing(1, 0),
    ...theme.mixins.toolbar,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: theme.spacing(2, 10, 2, 12),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 0, 2, 6)
    }
  }
}));

export default Page;
