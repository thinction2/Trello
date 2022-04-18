import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  padding: 10px;
  background-color: ${(p) => (p.isDragging ? "#74b9ff" : p.theme.cardColor)};
  margin-bottom: 5px;
  box-shadow: ${(p) =>
    p.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : "none"};
`;

interface IDragabbleProps {
  id: number;
  text: string;
  index: number;
}

const DraggableCard = ({ id, text, index }: IDragabbleProps) => {
  return (
    <Draggable key={id} draggableId={id + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          ref={magic.innerRef}
          isDragging={snapshot.isDragging}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {text}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
