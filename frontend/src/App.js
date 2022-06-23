import "./App.css";
import { Container } from "react-bootstrap";
import { AddTaskForm } from "./Components/AddTaskForm";
import ListArea from "./Components/ListArea";
import { useState } from "react";

const wklyHr = 7 * 24;

function App() {
  const [taskList, setTaskList] = useState([]);

  const total = taskList.reduce((acc, item) => acc + +item.hr, 0);

  const addTask = (task) => {
    if (total + +task.hr > wklyHr) {
      return alert(
        "Sorry sir, you dont have enough time left to fit this task"
      );
    }
    setTaskList([...taskList, task]);
  };

  const switchTask = (id, type) => {
    console.log(id, type);

    const switchedArg = taskList.map((item, index) => {
      if (item.id === id) {
        item.type = type;
      }

      return item;
    });

    setTaskList(switchedArg);
  };

  return (
    <div className="wrapper ">
      <Container>
        <h1 className="text-center py-5">My Not To Do list</h1>
        {/* form comp */}
        <AddTaskForm addTask={addTask} />
        <hr className="mb-5" />
        {/* list component */}
        <ListArea taskList={taskList} switchTask={switchTask} total={total} />
      </Container>
    </div>
  );
}

export default App;
