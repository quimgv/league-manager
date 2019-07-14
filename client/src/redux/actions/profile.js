import axios from "axios";
import { loadUser } from "./auth";

export const uploadUserImage = imageData => async dispatch => {
  try {
    await axios.post("/users/me/avatar", imageData);
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
  }
};

export const deleteUserImage = () => async dispatch => {
  try {
    await axios.delete("/users/me/avatar");
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = update => async dispatch => {
    try {
        await axios.patch('/users/me', update);
        dispatch(loadUser());
        return 'Updated!'
    }  catch(err) {
        console.log(err);
    }
}
