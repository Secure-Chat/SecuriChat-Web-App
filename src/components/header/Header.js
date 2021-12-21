//Imports

import { Button, FormControl, MenuItem, Select } from '@mui/material';

// Components

export default function Header(props) {
  const handleClick = () => {
    console.log('Needs a handle click // use state setter');
  };

  return (
    <>
      <img src="../image" alt="SecuriChat" />
      <FormControl>
        <Select>
          <MenuItem></MenuItem>
          <Button variant="outlined" onClick={handleClick}>
            Sign Out
          </Button>
        </Select>
      </FormControl>
    </>
  );
}
