import React from 'react';
import './App.css';
import PhoneBookTable from './components/PhoneBookTable';
import {Button} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormDialog from './components/FormDialog';


function App() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // function createData(name, calories, fat, carbs, protein) {
  //   return { name, calories, fat, carbs, protein };
  // }

  const rows = [
    {
      firstName: "Manjaka",
      lastName: "Randrianirina",
      phoneNumber:345134581
    },
    {
      firstName: "Noeline",
      lastName: "Marie",
      phoneNumber:345134583
    },
    {
      firstName: "Tantely",
      lastName: "Andrianarivola",
      phoneNumber:345134586
    }



    // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    // createData('Eclair', 262, 16.0, 24, 6.0),
    // createData('Cupcake', 305, 3.7, 67, 4.3),
    // createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  
  return (
    <div className="App">
      <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={handleOpen} >
        Add
      </Button>
      <PhoneBookTable rows={rows} />
      <FormDialog open={open} handleClose={handleClose} handleOpen={handleOpen}/>
    </div>
  );
}

export default App;
