import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

const Form = styled.form`
  display: flex;
  margin-bottom: 100px;
  input {
    padding: 10px;
    border-radius: 8px;
  }
`;

interface IFrom {
  board: string;
}

const CreateBoard = () => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IFrom>();
  const onValid = ({ board }: IFrom) => {
    const newBoard = { [board]: [] };
    console.log(newBoard);
    setToDos((allBoards) => {
      return { ...allBoards, ...newBoard };
    });
    setValue("board", "");
  };
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("board", { required: true })}
        type="text"
        placeholder="Add your Board!"
      />
    </Form>
  );
};

export default CreateBoard;
