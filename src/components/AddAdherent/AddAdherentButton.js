import React from 'react';
import { connect } from 'react-redux';
import * as adherents from '../../redux/actions/adherents';
import Button from '@material-ui/core/Button';
import nextId from 'react-id-generator';
import { months, days } from '../../models/Date'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

class AddAdherentButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    Alert = (props) => (<MuiAlert eleveation={6} variant="filled" {...props} />);

    openSnackbar = () => {
        this.setState({open: true});
    }

    closeSnackbar = () => {
        this.setState({open: false});
    }

    makeDate = () => {
        const date = new Date();
        let today = days[date.getDay() - 1] + ' ' + date.getDate() + ' ' + months[date.getMonth()];
        this.props.adherent.date = today;
    }

    makeId = () => {
        this.props.adherent.id = nextId(new Date().getUTCMilliseconds);
    }

    addAdherent = () => {
        this.makeDate();
        this.props.post(this.props.adherent);
        this.setState({open: true});
    }

    render() {
          return(
              <div>
            <Button
                color="primary"
                disabled={this.props.disabled}
                onClick={ () => {this.addAdherent()}}
            >
                Ajouter
            </Button>
            <Snackbar
                message = "Adhérent ajouté"
                color="success"
                autoHideDuration={2000}
                open={this.state.open}
                onClose={this.closeSnackbar}
            >
                <this.Alert
                    onClose={this.handleClose} 
                    color="success">
                        Adhérent ajouté.
                </this.Alert>
            </Snackbar>
            </div>
        )
    }
}

export default connect(
    null,
    adherents
)(AddAdherentButton);