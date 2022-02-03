import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DisplayTasks from "./DisplayTasks";

const Status = ({ prefix, elements }) => {
  
  return (
    <Container>
      <Heading className="lg-font">{prefix}</Heading>
      <Droppable droppableId={`${prefix}`}>
        {(provided) => (
          <div className="droppable" {...provided.droppableProps} ref={provided.innerRef}>
            {elements.map((item, index) => (
              <DisplayTasks key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Container>
  )
};

export default Status;

const Container = styled.div`
  background: rgba(203, 213, 225, 0.3);
`;

const Heading = styled.h2`
	padding-top: 1rem;
	margin: 0;
	padding-left: 1.5rem;
	padding-right: 1.5rem;
	padding-bottom: 1rem;
`;
