import React from "react";
import { Col, Row } from "react-bootstrap";
import EntryList from "./EntryList";
import { TaskList } from "./TaskList";

const ListArea = ({ taskList, switchTask }) => {
  console.log(taskList);
  const entryList = taskList.filter(({ type }) => type === "entry");

  const badList = taskList.filter(({ type }) => type === "bad");

  const badHrs = badList.reduce((acc, item) => acc + +item.hr, 0);
  const total = taskList.reduce((acc, item) => acc + +item.hr, 0);

  return (
    <div className="List-Area">
      <Row>
        <Col>
          <TaskList
            title="EntryList"
            arrow="right"
            list={entryList}
            switchTask={switchTask}
          />
        </Col>
        <Col>
          <TaskList
            title="BadTaskList"
            switchTask={switchTask}
            list={badList}
          />

          <div className="text-end text-danger fw-bold">
            You could have saved {badHrs} hrs
          </div>
        </Col>
      </Row>

      <div className="fw-bold">Total time allocated is {total}hr/w </div>
    </div>
  );
};

export default ListArea;
