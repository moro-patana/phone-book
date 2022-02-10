import React, { useCallback, useEffect, useState } from 'react';
import PhoneBookTable from './components/PhoneBookTable';
import { Button, TextField, InputAdornment, Grid, Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormDialog from './components/FormDialog';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import CloseIcon from '@mui/icons-material/Close';
import { saveRecords, getRecords } from './api/records';



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

  const saveRecord = useCallback(async (firstName, lastName, phoneNumber) => {
    const newRecords = [...phoneBookRecords, { firstName, lastName, phoneNumber }]
    const updatedRecords = await saveRecords(newRecords)
    setPhoneBookRecords(updatedRecords)
    clearSearch()
    setFilteredRecordsList(updatedRecords)
    handleClose()

  }, [phoneBookRecords]
  )

  const clearSearch = useCallback(() => {
    setSearchTerm('')
    setFilteredRecordsList(phoneBookRecords)

  }, [phoneBookRecords])

  useEffect(async () => {
    const records = await getRecords()
    setPhoneBookRecords(records)
    setFilteredRecordsList(records)
  }, [])

  return (
    <Grid container spacing={2} justifyContent="space-between">
      <Grid item md={10} xs={12}>
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
            endAdornment: (
              <InputAdornment position="end" onClick={clearSearch} style={{cursor:"pointer"}}>
                <CloseIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
          onChange={onSearchTermChange}
        />
      </Grid>

      <Grid item md={2} xs={12}>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={handleOpen} >
            Add
          </Button>
        </Box>

      </Grid>
      <Grid item xs={12}>
        <PhoneBookTable rows={filteredRecordsList} />

      </Grid>
      <FormDialog open={open} handleClose={handleClose} handleOpen={handleOpen} saveRecord={saveRecord} />
    </Grid>
  );
}

export default App;

const filterRecordPredicate = (searchTerm) => record => record.firstName.toLowerCase().includes(searchTerm) || record.lastName.toLowerCase().includes(searchTerm) || record.phoneNumber.includes(searchTerm)