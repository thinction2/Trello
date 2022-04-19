import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Area = styled.div`
  padding: 20px;
  position: absolute;
  top: 100px;
  right: 100px;
  border-radius: 5px;
  background-color: aqua;
`;

const Bin = () => {
  return (
    <Droppable droppableId="bin">
      {(magic) => (
        <Area ref={magic.innerRef} {...magic.droppableProps}>
          Delete Task ⛔{magic.placeholder}
        </Area>
      )}
    </Droppable>
  );
};

export default Bin;
