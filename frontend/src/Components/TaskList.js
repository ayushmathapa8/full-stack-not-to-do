import React from "react";
import { Button, Form, Table } from "react-bootstrap";
import ListArea from "./ListArea";

export const TaskList = ({
  title,
  arrow,
  list = [],
  switchTask,
  handleOnCheck,
  name,
  ids,
}) => {
  return (
    <div>
      <h2 className="text-center">{title}</h2>

      <div className="table mt-4">
        <Table striped>
          <thead>
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  value={name}
                  onChange={handleOnCheck}
                />
              </th>
              <th>Task</th>
              <th>Hours</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, i) => (
              <tr>
                <td>
                  <Form.Check
                    type="checkbox"
                    value={item._id}
                    checked={ids.includes(item._id)}
                    onChange={handleOnCheck}
                  />
                </td>
                <td>{item.task}</td>
                <td>{item.hr}</td>
                <td>
                  {arrow === "right" ? (
                    <Button
                      variant="success"
                      onClick={() => switchTask(item._id, "bad")}
                    >
                      <i class="fa-solid fa-arrow-right"></i>
                    </Button>
                  ) : (
                    <Button
                      variant="danger"
                      onClick={() => switchTask(item._id, "entry")}
                    >
                      <i class="fa-solid fa-arrow-left-long"></i>
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
