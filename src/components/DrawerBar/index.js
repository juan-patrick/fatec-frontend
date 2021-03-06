import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Menu,
  MenuItem,
  Button,
  Box,
  Paper,
  Avatar,
} from "@material-ui/core";

import {
  ChevronRightRounded,
  ChevronLeftRounded,
  HomeRounded,
  MenuBook,
  Folder,
  Extension,
  AccessTime,
  School,
  SupervisedUserCircle,
  WorkOff,
  HowToReg,
  CalendarViewDayOutlined,
  AccessAlarm,
  PowerSettingsNewRounded
} from "@material-ui/icons";

import MenuIcon from '@material-ui/icons/Menu';

import clsx from "clsx";
import { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router";

import { logout } from '../../services/auth';

export default function DrawerBar() {
  const history = useHistory();
  const classes = useStyles();

  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [anchorEl] = useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            FATEC
          </Typography>
          <Box className={classes.accountBox}>
            <Button aria-controls="simple-menu" aria-haspopup="true">
              <Tooltip title="Juan Patrick">
                <Avatar>JS</Avatar>
              </Tooltip>
            </Button>
            <Paper>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                open={Boolean(anchorEl)}
              >
                <MenuItem>Minha Conta</MenuItem>
                <Divider />
                <MenuItem>Logout</MenuItem>
              </Menu>
            </Paper>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightRounded />
            ) : (
              <ChevronLeftRounded />
            )}
          </IconButton>
        </div>
        <List>
          <ListItem button key="home" onClick={(e) => history.push("/")}>
            <ListItemIcon>
              <HomeRounded />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button key="curso" onClick={(e) => history.push("/curso")}>
            <ListItemIcon>
              <MenuBook />
            </ListItemIcon>
            <ListItemText primary="Curso" />
          </ListItem>
          <ListItem
            button
            key="projeto"
            onClick={(e) => history.push("/projeto")}
          >
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="Projetos" />
          </ListItem>
          <ListItem
            button
            key="disciplina"
            onClick={(e) => history.push("/disciplina")}
          >
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="Disciplina" />
          </ListItem>
          <ListItem
            button
            key="cursoExtensao"
            onClick={(e) => history.push("/cursoExtensao")}
          >
            <ListItemIcon>
              <Extension />
            </ListItemIcon>
            <ListItemText primary="Cursos de Extens??o" />
          </ListItem>
          <ListItem
            button
            key="Horario"
            onClick={(e) => history.push("/horario")}
          >
            <ListItemIcon>
              <AccessTime />
            </ListItemIcon>
            <ListItemText primary="Horario" />
          </ListItem>
          <ListItem button key="Turma" onClick={(e) => history.push("/turma")}>
            <ListItemIcon>
              <School />
            </ListItemIcon>
            <ListItemText primary="Turma" />
          </ListItem>
          <ListItem button key="Professor" onClick={(e) => history.push('/professores')}>
            <ListItemIcon>
              <HowToReg />
            </ListItemIcon>
            <ListItemText primary="Professor" />
          </ListItem>
          <ListItem button key="Inatividade" onClick={(e) => history.push('/inatividades')}>
            <ListItemIcon>
              <WorkOff />
            </ListItemIcon>
            <ListItemText primary="Inatividade" />
          </ListItem>
          <ListItem button key="Vinculo" onClick={(e) => history.push('/vinculos')}>
            <ListItemIcon>
              <SupervisedUserCircle />
            </ListItemIcon>
            <ListItemText primary="Vinculo" />
          </ListItem>
        </List>

        <ListItem button key="Semana" onClick={(e) => history.push('/semana')}>
          <ListItemIcon>
            <CalendarViewDayOutlined />
          </ListItemIcon>
          <ListItemText primary="Semana" />
        </ListItem>

        <ListItem button key="Periodo" onClick={(e) => history.push('/periodo')}>
          <ListItemIcon>
            <AccessAlarm />
          </ListItemIcon>
          <ListItemText primary="Periodo" />
        </ListItem>


        <ListItem button key="EmpregoPublico" onClick={(e) => history.push('/empregoPublico')}>
          <ListItemIcon>
            <AccessAlarm />
          </ListItemIcon>
          <ListItemText primary="empregoPublico" />
        </ListItem>

        <ListItem button key="Titulacao" onClick={(e) => history.push('/titulacao')}>
          <ListItemIcon>
            <AccessAlarm />
          </ListItemIcon>
          <ListItemText primary="titulacao" />
        </ListItem>

        <ListItem button key="TipoContrato" onClick={(e) => history.push('/tipoContrato')}>
          <ListItemIcon>
            <AccessAlarm />
          </ListItemIcon>
          <ListItemText primary="tipoContrato" />
        </ListItem>

        <List className={classes.last}>
          <ListItem button key="logout" onClick={handleLogout}>
            <ListItemIcon>
              <PowerSettingsNewRounded />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  accountBox: {
    marginLeft: "auto",
  },
  account: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.dark,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  themeSwitch: {
    padding: theme.spacing(0, 5),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  last: {
    marginTop: "auto",
  },
}));
