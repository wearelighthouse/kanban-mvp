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
        <h2>{prefix}</h2>
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
    height: 100vh;
    background: rgba(203, 213, 225, 0.3);
`;
