import { useEffect, useState } from "react";
import "./App.css";
import { Button, Container } from "react-bootstrap";
import { AddTaskForm } from "./Components/AddTaskForm";
import ListArea from "./Components/ListArea";
import {
  deleteServerTask,
  fetchTasks,
  postTask,
  switchServerTask,
} from "./helpers/axiosHelper";

const wklyHr = 7 * 24;

function App() {
  const [taskList, setTaskList] = useState([]);

  const [ids, setIds] = useState([]);

  useEffect(() => {
    getTaskFromServer();
  }, []);

  const getTaskFromServer = async () => {
    const data = await fetchTasks();
    data.status === "success" && setTaskList(data.result);
  };

  const total = taskList.reduce((acc, item) => acc + +item.hr, 0);

  const addTask = async (task) => {
    if (total + +task.hr > wklyHr) {
      return alert(
        "Sorry sir, you dont have enough time left to fit this task"
      );
    }
    const result = await postTask(task);
  console.log(result)
    
    result.status === "success" && getTaskFromServer()
  };

  const switchTask = async (_id, type) => {
    const data = await switchServerTask({ _id, type });

    data.status === "success" && getTaskFromServer();
  };

  const handleOnCheck = (e) => {
    const { checked, value, name } = e.target;

    console.log(checked, value, name);

    if (value === "entry" || value === "bad") {
      // if ticked and all ids in ids otherwise take them out

      let toDeleteIds = [];
      taskList.forEach((item) => {
        if (item.type === value) {
          toDeleteIds.push(item.id);
        }
      });

      if (checked) {
        // add all entry list ids

        console.log(taskList);

        setIds([...ids, ...toDeleteIds]);
      } else {
        // remove all entry list ids

        const tempArgs = ids.filter((id) => !toDeleteIds.includes(id));
        setIds(tempArgs);
      }
      return;
    }

    if (checked) {
      // add individual item id

      setIds([...ids, value]);
    } else {
      // remove individual item id

      const filteredArg = ids.filter((id) => id !== value);
      setIds(filteredArg);
    }
  };

  const handleOnDelete = async () => {
    if (
      !window.confirm("Are you sure you want to delete the selected items?")
    ) {
      return;
    }
    const data = await deleteServerTask(ids);

    if (data.status === "success") {
      getTaskFromServer();
      setIds([]);
    }
  };

  console.log(ids);

  return (
    <div className="wrapper ">
      <Container>
        <h1 className="text-center py-5">My Not To Do list</h1>
        {/* form comp */}
        <AddTaskForm addTask={addTask} />
        <hr className="mb-5" />
        {/* list component */}
        <ListArea
          taskList={taskList}
          switchTask={switchTask}
          total={total}
          handleOnCheck={handleOnCheck}
          ids={ids}
        />
        <div className="mt-2"></div>
        {ids.length > 0 && (
          <Button variant="danger" onClick={handleOnDelete}>
            Delete selected Tasks
          </Button>
        )}
      </Container>
    </div>
  );
}

export default App;
