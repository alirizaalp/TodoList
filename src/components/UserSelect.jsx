import { useEffect,useState } from "react";
import React from "react";
import { OutlinedInput,Select, ListItemText, FormControl, MenuItem, InputLabel } from '@mui/material';
import axios from "axios";




const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "ALİRIZA ALP",
  "TALHA ARSLAN",
  "HÜSEYİN ALP",
  "İREM GÜNDÜZ",
  "EYLÜL ALP"
];



export default function MultipleSelectCheckmarks() {
  const [personName, setPersonName] = useState([]);

   useEffect(() => {
    axios.get(`http://localhost:3002/user`).then((response) => {
      setPersonName(response.data);
    });
  }, []);

  useEffect(() => console.log(personName), [personName]);



  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };



  return (
    <div >
      <FormControl className="hi" sx={{ m: 1, width: 300 }}>
        <InputLabel sx={{ color: "black" }} id="demo-multiple-checkbox-label">TODO SELECT</InputLabel>
        <Select
          sx={{ color: "black" }}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Select" />}
          renderValue={(selected) => selected.join(',')}
          MenuProps={MenuProps}
        >
          {names.map((name,i) => (
            <MenuItem key={i} value={name}>
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}