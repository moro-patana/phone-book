import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import PhoneBookTable from './components/PhoneBookTable';
import { Button, TextField, InputAdornment } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormDialog from './components/FormDialog';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';



const PHONEBOOK_RECORDS_KEY = "phoneBookRecords-key"
function App() {
  const [open, setOpen] = useState(false);
  const [phoneBookRecords, setPhoneBookRecords] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredRecordsList, setFilteredRecordsList] = useState([])


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSearchTermChange = useCallback((e) => {
    const searchTerm = e.target.value
    setSearchTerm(searchTerm)
    const filteredRecords = phoneBookRecords.filter(filterRecordPredicate(searchTerm))
    setFilteredRecordsList(filteredRecords)
  }, [phoneBookRecords])

  const saveRecord = useCallback((firstName, lastName, phoneNumber) => {

    const newRecords = [...phoneBookRecords, { firstName, lastName, phoneNumber }]
    const records = localStorage.setItem(PHONEBOOK_RECORDS_KEY, JSON.stringify(newRecords))
    setPhoneBookRecords(newRecords)
    handleClose()
  }, [phoneBookRecords]
  )


  useEffect(() => {
    const records = JSON.parse(localStorage.getItem(PHONEBOOK_RECORDS_KEY)) || []
    setPhoneBookRecords(records)
    setFilteredRecordsList(records)
  }, [])

  return (
    <div className="App">
      <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={handleOpen} >
        Add
      </Button>
      <TextField
        id="input-with-icon-textfield"
        label="Search by name or number"
        value={searchTerm}

        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ManageSearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
        onChange={onSearchTermChange}
      />
      <PhoneBookTable rows={filteredRecordsList} />
      <FormDialog open={open} handleClose={handleClose} handleOpen={handleOpen} saveRecord={saveRecord} />
    </div>
  );
}

export default App;

const filterRecordPredicate = (searchTerm) => record => record.firstName.toLowerCase().includes(searchTerm) || record.lastName.toLowerCase().includes(searchTerm) || record.phoneNumber.includes(searchTerm)