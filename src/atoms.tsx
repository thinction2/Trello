import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

const todoStoreKey = "storage";
const savedValue = localStorage.getItem(todoStoreKey);

/* eslint-disable */
export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: savedValue
    ? JSON.parse(savedValue)
    : {
        "To Do": [],
        "Doing": [],
        "Done": [],
      },
  effects: [
    ({ onSet }) => {
      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(todoStoreKey)
          : localStorage.setItem(todoStoreKey, JSON.stringify(newValue));
      });
    },
  ],
});

// interface IBoardState {
//   board: string;
// }

export const boardState = atom({
  key: "board",
  default: [],
});
