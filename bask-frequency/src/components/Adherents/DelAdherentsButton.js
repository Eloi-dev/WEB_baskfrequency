import React from 'react';
import { connect } from 'react-redux';
import * as adherents from '../../redux/actions/adherents';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

class DelAdherentsButton extends React.Component {

    constructor(props) {
        super(props);
        this.deleteAdherents = this.deleteAdherents.bind(this);
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

    deleteAdherents = () => {
        while (this.props.trash.length !== 0) {
            for (var i=0; i < this.props.trash.length; i++) {
                const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg0ODA1NTR9.RtSw6AAv8zGM47XhiYWVP4uGI1oA91ZEzUeOM2irHCY";
                this.props.del(token, this.props.trash[i]);
                this.props.trash.splice(i, 1);
                this.setState({open: true});
            }
        }
    }

    render() {
          return(
              <div>
            <Button
                color="secondary"
                disabled={this.props.disabled}
                onClick={ () => {this.deleteAdherents()}}
            >
                Supprimer
            </Button>
            <Snackbar
                message = "Adhérent supprimé"
                color="error"
                autoHideDuration={1000}
                open={this.state.open}
                onClose={this.closeSnackbar}
            >
                <this.Alert
                    onClose={this.handleClose} 
                    color="error">
                        Adhérent supprimé.
                </this.Alert>
            </Snackbar>
            </div>
        )
    }
}

export default connect(
    null,
    adherents
)(DelAdherentsButton);