import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ open, handleClose, saveRecord }) {

    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [phoneNumber, setPhoneNumber] = React.useState('')

    const handleSave = React.useCallback(() => {
        saveRecord(firstName, lastName, phoneNumber)
    }, [firstName, lastName, phoneNumber])

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a Phone Book</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="firstName"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="lastName"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setLastName(e.target.value)}

                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phoneNumber"
                        label="Phone Number"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setPhoneNumber(e.target.value)}

                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
