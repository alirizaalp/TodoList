import React, { useEffect } from "react";
import { useState } from "react";
import { FormControl, Form } from "react-bootstrap";
import { ReactComponent as DeleteIcon } from "../DeleteIcon/DeleteIcon.svg";
import { ReactComponent as PlusIcon } from "../DeleteIcon/PlusIcon.svg";
import { ReactComponent as TobeVisible } from "../DeleteIcon/TobeVisible.svg";
import "../App.css";
import axios from "axios";
import { FormLabel, Button } from '@mui/material';
import UserSelect from "../components/UserSelect";
import { v4 as uuidv4 } from 'uuid'; //id için tanımladım benzersiz olsun diye.Öbür türlü console da hata aldım.


export default function AddUser() {
const [UserList, setUserList] = useState([]);
const [todo, setTodo] = useState("");


useEffect(() => {
axios.get(`http://localhost:3002/data`).then((response) => {
setUserList(response.data);
});
}, []);

useEffect(() => console.log(UserList), [UserList]);

useEffect(() => {
let UserListx = localStorage.getItem("UserList");
setUserList(JSON.parse(UserListx));
}, []);

useEffect(() => {
localStorage.setItem("UserList", JSON.stringify(UserList));
});

const addTodo = () => {
if (todo !== "") {
setUserList((prevUserList) => [
...UserList,
{ id: uuidv4(), todo: todo, isEdit: false, isCompleted: false },
]);

axios
.post("http://localhost:3002/data", {
id: uuidv4(),
name: todo,
isEdit: false,
isCompleted: false,
Date:
new Date().getDate() +
"/" +
new Date().getMonth() +
"/" +
new Date().getFullYear(),
time:
new Date().getHours() +
":" +
new Date().getMinutes() +
":" +
new Date().getSeconds(),
})
.then((response) => {
setUserList([...UserList, response.data]);
});


alert("User added successfully");
} else {
alert("Please do not leave blank.");
}

setTodo(""); //BURADA AMACIM EKLEME YAPTIKTAN SONRA BOŞ GÖZÜKSÜN İMPUTTA
// console.log(setTodo)
};




const deleteTodo = (id) => {
axios
.delete("http://localhost:3002/data/" + id)
.then((r) => {
console.log(r);
})
.catch((e) => {
console.log(e);
});
setUserList((prevUserList) =>
prevUserList.filter((todoItem) => todoItem.id !== id)
);
};

const editTodo = (id) => {
setUserList((prevUserList) =>
prevUserList.map((todoItem) =>
todoItem.id === id
? { ...todoItem, isEdit: !todoItem.isEdit }
: todoItem
)
);
};

const completeTodo = (id) => {
setUserList(prevUserList => prevUserList.map(todoItem => todoItem.id === id ? { ...todoItem, isCompleted: !todoItem.isCompleted } : todoItem))
}

return (
<div>
<h1 className="userpanel">TodoList</h1>
<UserSelect 
todo={todo}
setUserList={setUserList}
UserList={UserList}
kas="sadfasdf"

/>
<div className="userinput" >
<form className="form" onSubmit={addTodo} autoComplete="off">
<FormControl
maxLength={50}
className="logg"
placeholder="Enter Todo"
value={todo}
onChange={(event) => setTodo(event.target.value)}
/>
</form>
<Button
style={{ cursor: "pointer" }}
variant="contained"
color="success"
type="submit"
onClick={() => addTodo()}
>
Add Todo
</Button>
<div />
</div>

<div>
{UserList.map((todoItem) => (
<div
style={{
fontSize: "20px",
border: "2px solid ",
borderColor: "blue",
}}
key={todoItem.id}
>
<Form.Check
type="checkbox"
onChange={() => completeTodo(todoItem.id)}
variant="contained"
color="error"
onClick={() => editTodo(todoItem.id)}
startıcon={<TobeVisible />}
value={todoItem.isCompleted}
/>

<label className={{ textDecoration: todoItem.isCompleted ? "line-through" : 'none' }}>
{todoItem.name}
</label>



<div>
<FormLabel >{todoItem.todo}</FormLabel>
<FormLabel style={{ color: "white" }}>Date Added: {todoItem.Date}</FormLabel>
<br />
<FormLabel style={{ color: "white" }}>Added Hour: {todoItem.time}</FormLabel>
<br />
{!todoItem.isEdit ? (
<Button
style={{ cursor: "pointer" }}
onClick={() => editTodo(todoItem.id)}
variant="contained"
endIcon={<PlusIcon />}
>
Send
</Button>
) : (
<Button
onClick={() => deleteTodo(todoItem.id)}
variant="contained"
color="error"
startIcon={<DeleteIcon />}
>
Delete
</Button>
)}
</div>
</div>
))}
</div>
</div>
);
}
