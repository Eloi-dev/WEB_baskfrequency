import React from 'react';
// import clsx from 'clsx';
// import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Toolbox from './Toolbox'


const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(4),
  },
  title: {
    textAlign: "Left",
  },
}));

// const cancel = (history) => {
//   history.goBack();
// }

const EmailContent = (props) => {
  const classes = useStyles();
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  // const history = useHistory();
  // const [isComplete, setIsComplete] = React.useState(true);
  // const [form, setForm] = React.useState({
  //   firstnameInput: false,
  //   lastnameInput: false,
  //   emailInput: false,
  //   phoneInput: false,
  //   donationInput: false,
  // })
  // const [adherent, setAdherent] = React.useState({
  //   date: undefined,
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   phone: "",
  //   donation: 5.00,
  // });

  // const updateFirstname = (event) => {
  //   updateAllForm();
  //   setForm({...form, firstnameInput: (event.length >= 3) ? false : true});
  //   setAdherent({...adherent, firstname: event});
  //   updateAllForm();
  // }
  
  // const updateLastname = (event) => {
  //   updateAllForm();
  //   setForm({...form, lastnameInput: (event.length >= 3) ? false : true})
  //   setAdherent({...adherent,lastname: event});
  //   updateAllForm();
  // }
  
  // const updateEmail = event => {
  //   updateAllForm();
  //   setForm({...form, emailInput: (event.length >= 3) ? false : true});
  //   setAdherent({...adherent, email: event});
  //   updateAllForm();
  // }
  
  // const updatePhone = event => {
  //   updateAllForm();
  //   setForm({...form, phoneInput: (event.length >= 3) ? false : true});
  //   setAdherent({...adherent, phone: event});
  //   updateAllForm();
  // }

  // const updateAllForm = () => {
  //   setIsComplete(((
  //     adherent.firstname.length >= 2 && adherent.lastname.length >= 2 && adherent.email.length >= 2 && adherent.phone.length >= 2)) ? false : true);
  // }

  return (
    <div>
        <Grid container>
            <Grid item  xs={12} sm={4}>
                <Typography component="h1" variant="h5" className={classes.title} color="primary">
                    Envoyer Email
                </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
                <Toolbox/>
            </Grid>
        </Grid>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="reciever"
                label="Destinataire(s)"
                autoFocus
                // error={form.firstnameInput}
                // onChange={ (event) => { updateFirstname(event.target.value)} }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="object"
                label="Objet"
                name="object"
                // error={form.lastnameInput}
                // onChange={ (event) => { updateLastname(event.target.value)} }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="content"
                label="Contenu"
                name="content"
                multiline={true}
                rows={4}
                maxRows={10}
                // error={form.emailInput}
                // onChange={ (event) => { updateEmail(event.target.value)} }
              />
            </Grid>
          </Grid>
        </form>
    </div>
  );
}

export default EmailContent;