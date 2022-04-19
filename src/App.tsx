import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Bin from "./Components/Bin";
import Board from "./Components/Board";
import CreateBoard from "./Components/CreateBoard";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  padding-top: 150px;
  align-items: center;
  min-height: 100vh;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-content: center center;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEdn = (info: DropResult) => {
    console.log(info);
    const { destination, source } = info;

    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      //same board movement
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      if (destination?.droppableId === "bin") {
        setToDos((allBoards) => {
          const sourceBoard = [...allBoards[source.droppableId]];
          sourceBoard.splice(source.index, 1);
          return {
            ...allBoards,
            [source.droppableId]: sourceBoard,
          };
        });
      } else {
        setToDos((allBoards) => {
          const sourceBoard = [...allBoards[source.droppableId]];
          const taskObj = sourceBoard[source.index];
          const destinationBoard = [...allBoards[destination.droppableId]];
          sourceBoard.splice(source.index, 1);
          destinationBoard.splice(destination?.index, 0, taskObj);
          return {
            ...allBoards,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: destinationBoard,
          };
        });
      }
      //cross board movement
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEdn}>
      <Bin />
      <Layout>
        <CreateBoard />
        <Wrapper>
          <Boards>
            {Object?.keys(toDos).map((boardId) => (
              <Board boardId={boardId} toDos={toDos[boardId]} key={boardId} />
            ))}
          </Boards>
        </Wrapper>
      </Layout>
    </DragDropContext>
  );
}

export default App;
