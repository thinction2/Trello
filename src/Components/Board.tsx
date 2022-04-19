import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DragabbleCard";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Container = styled.div`
  padding-top: 10px;
  background-color: ${(p) => p.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  height: fit-content;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 18px;
`;

const DeleteBton = styled.button`
  position: absolute;
  font-size: 18px;
  right: 8px;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

/* eslint-disable */
const Area = styled.div<IAreaProps>`
  padding: 20px;
  background-color: ${(p) =>
    p.isDraggingOver
      ? "#dfe6e9"
      : p.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

interface IForm {
  toDo: string;
}

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
    padding: 4px 8px;
    font-size: 16px;
  }
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

const Board = ({ toDos, boardId }: IBoardProps) => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };
  const deleteBoard = () => {
    setToDos((allBoards): any => {
      const newBoards = { ...allBoards };
      delete newBoards[boardId];
      return newBoards;
    });
  };
  return (
    <Container>
      <Wrapper>
        <Title>{boardId}</Title>
        <DeleteBton onClick={deleteBoard}>⛔</DeleteBton>
      </Wrapper>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            ref={magic.innerRef}
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            {...magic.droppableProps}
          >
            {toDos?.map((item, index) => (
              <DraggableCard key={item.id} {...item} index={index} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Container>
  );
};

export default Board;
