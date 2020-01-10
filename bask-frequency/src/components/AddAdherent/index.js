import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import AddAdherentButton from './AddAdherentButton';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(0),
    padding: theme.spacing(2)
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
  },
  donation: {
    color: 'white',
    margin: theme.spacing(2)
  }
}));

const cancel = (history) => {
  history.goBack();
}

export default function AddAdherent(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const history = useHistory();
  const [isComplete, setIsComplete] = React.useState(true);
  const [form, setForm] = React.useState({
    firstnameInput: false,
    lastnameInput: false,
    emailInput: false,
    phoneInput: false,
    donationInput: false,
  })
  const [adherent, setAdherent] = React.useState({
    date: undefined,
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    donation: 5.00,
  });

  const updateFirstname = (event) => {
    updateAllForm();
    setForm({...form, firstnameInput: (event.length >= 3) ? false : true});
    setAdherent({...adherent, firstname: event});
    updateAllForm();
  }
  
  const updateLastname = (event) => {
    updateAllForm();
    setForm({...form, lastnameInput: (event.length >= 3) ? false : true})
    setAdherent({...adherent,lastname: event});
    updateAllForm();
  }
  
  const updateEmail = event => {
    updateAllForm();
    setForm({...form, emailInput: (event.length >= 3) ? false : true});
    setAdherent({...adherent, email: event});
    updateAllForm();
  }
  
  const updatePhone = event => {
    updateAllForm();
    setForm({...form, phoneInput: (event.length >= 3) ? false : true});
    setAdherent({...adherent, phone: event});
    updateAllForm();
  }

  const updateAllForm = () => {
    setIsComplete(((
      adherent.firstname.length >= 2 && adherent.lastname.length >= 2 && adherent.email.length >= 2 && adherent.phone.length >= 2)) ? false : true);
  }

  return (
    <Container component="main" maxWidth="xs">
    <Paper className={fixedHeightPaper}>
      <div className={classes.paper}>
      <Box
        display="flex"
        flexDirection="row"
      >
        <Box flexGrow={1}>
            <Button onClick={ () => {cancel(history)}}>
              Annuler
            </Button>
        </Box>
        <Box>
          <AddAdherentButton
            adherent={adherent}
            disabled={isComplete}
          />
        </Box>
      </Box>
        <form className={classes.form} noValidate>
        <Typography component="h1" variant="h5" className={classes.title}>
            Ajouter Membre
        </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <TextField
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Prénoms"
                autoFocus
                error={form.firstnameInput}
                onChange={ (event) => { updateFirstname(event.target.value)} }
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Nom"
                name="lastName"
                error={form.lastnameInput}
                onChange={ (event) => { updateLastname(event.target.value)} }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Addresse Email"
                name="email"
                error={form.emailInput}
                onChange={ (event) => { updateEmail(event.target.value)} }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="telephone"
                label="Téléphone"
                id="password"
                error={form.phoneInput}
                onChange={ (event) => { updatePhone(event.target.value)} }
              />
            </Grid>
            {/* <Grid item xs={12} className={classes.donation}>
            <Typography id="discrete-slider-always" gutterBottom>
                Donation
            </Typography>
            <Slider
                aria-label="Donation"
                aria-labelledby="discrete-slider-always"
                defaultValue={5}
                getAriaValueText={valuetext}
                step={5}
                min={0.00}
                max={100.00}
                marks={marks}
                valueLabelDisplay="auto"
                onChange={ (event) => { updateDonation(event.target.value)} }
            />
            </Grid> */}
          </Grid>
        </form>
      </div>
    </Paper>
    </Container>
  );
}