import { useEffect,useState } from "react";
import React from "react";
import { OutlinedInput,Select, ListItemText, FormControl, MenuItem, InputLabel } from '@mui/material';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';





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





export default function MultipleSelectCheckmarks({todo,UserList,setUserList,setTodo}) {
  const [personName, setPersonName] = useState([]);
 
  const names = [
   todo
  ];
 
  // useEffect(() => {
  //   axios.get(`http://localhost:3002/data`).then((response) => {
  //     setPersonName(response.data);
  //   });
  // }, []);

  useEffect(() => console.log(personName), [personName]);



  const handleChange = (event) => {
    if (todo !== "") {
      setUserList((prevUserList) => [
      ...UserList,
      { id: uuidv4(), todo: todo, names:names},
      ]);
      axios
.post("http://localhost:3002/data", {
id: uuidv4(),
name: todo,
names:names
})
.then((response) => {
setUserList([...UserList, response.data]);
});

setTodo(""); //BURADA AMACIM EKLEME YAPTIKTAN SONRA BOŞ GÖZÜKSÜN İMPUTTA
// console.log(setTodo)
};
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
          input={<OutlinedInput id="uuidv4()" label="Select" />}
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