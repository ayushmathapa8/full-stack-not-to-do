import axios from "axios";

const apiEp = "http://localhost:8000/api/v1/task";

export const fetchTasks = async () => {
  try {
    const { data } = await axios.get(apiEp);

    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const postTask = async (obj) => {
  try {
    const { data } = await axios.post(apiEp, obj);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.messsage,
    };
  }
};

export const switchServerTask = async (obj) => {
  try {
    const { data } = await axios.patch(apiEp, obj);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.messsage,
    };
  }
};

export const deleteServerTask = async (obj) => {
  try {
    const { data } = await axios.delete(apiEp, { data: obj });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.messsage,
    };
  }
};
