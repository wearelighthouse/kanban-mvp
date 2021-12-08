import { useContext } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Context } from "../Context";
import DisplayBudgets from "./DisplayBudegts";

const Status = ({ prefix, elements }) => {
    const {budget} = useContext(Context);

    const filterTasksByBudget = el => el.budget.toLowerCase().includes(budget.toLowerCase());

    return (
        <Container className="container">
        <Heading>{prefix}</Heading>
        <Droppable droppableId={`${prefix}`}>
            {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
                {elements.filter(el => filterTasksByBudget(el)).map((item, index) => (
                    <DisplayBudgets key={item.id} item={item} index={index} />
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
    padding-left: 1.5rem;
    padding-right: 1.5rem;
`;
