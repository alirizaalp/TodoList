import React, { useEffect } from "react";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
import { ReactComponent as DeleteIcon } from "../DeleteIcon/DeleteIcon.svg";
import { ReactComponent as PlusIcon } from "../DeleteIcon/PlusIcon.svg";
import "../App.css";
import Button from "@mui/material/Button";
import axios from "axios"; 

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
let myId = UserList.length + 1;
if (todo !== "") {
setUserList((prevUserList) => [
...UserList,
{ id: myId, todo: todo, isEdit: false },
]);

axios
.post("http://localhost:3002/data", {
id: myId,
name: todo,
isEdit: false,
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

return (
<div>
<h1 className="userpanel">User Panel</h1>
<div className="userinput">
<form className="form" onSubmit={addTodo}>
<FormControl
maxLength={12}
className="logg"
placeholder="Enter Username"
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
Add User
</Button>
<div />
</div>

<div>
{UserList.map((todoItem) => (
<div
style={{
fontSize: "20px",
border: "1px solid ",
borderColor: "#000",
}}
key={todoItem.id}
>
{todoItem.name}

<div>
<label style={{ fontSize: "20px" }}> {todoItem.todo} </label>
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
