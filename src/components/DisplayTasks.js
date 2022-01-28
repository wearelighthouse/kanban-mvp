import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";


function DisplayTasks({ item, index }) {

  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided, snapshot) => {
        return (
          <TaskCard
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <TaskTitle className="lg-font">{item.fields["Title"]}</TaskTitle>
            <p>Status: {item.fields["Status"]}</p>
          </TaskCard>
        );
      }}
    </Draggable>
  );
}

export default DisplayTasks;

const TaskCard = styled.div`
  background-color: #FFFFFF;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  padding: 1rem;
  border: 1px solid #0F172A;
  box-sizing: border-box;
  box-shadow: 0px 0px 1px rgba(15, 23, 42, 0.06), 0px 20px 25px -5px rgba(15, 23, 42, 0.1), 0px 10px 10px -5px rgba(15, 23, 42, 0.04);
  border-radius: 4px;
`;

const TaskTitle = styled.p`
  margin: 0;
`;