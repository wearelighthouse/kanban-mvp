import { useContext } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Context } from "../Context";
import DisplayBudgets from "./DisplayBudegts";

const Status = ({ prefix, elements }) => {
    const {budget, allBudgets} = useContext(Context);

    const filterTasksByBudget = el => {

        let budgetName;
        let taskBudgetId = el.fields["Budget"] && el.fields["Budget"][0];
        let filterBudget = allBudgets.filter(budget => taskBudgetId === budget.id);
        filterBudget.map(name => {
            return budgetName = name.fields["Name"];
        });
        if (budgetName !== undefined) {
            return budgetName.toLowerCase().includes(budget.toLowerCase());
        }
        
    };

    return (
        <Container className="container">
        <Heading>{prefix}</Heading>
        <Droppable droppableId={`${prefix}`}>
            {(provided) => (
            <div className="drop-able" {...provided.droppableProps} ref={provided.innerRef}>
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
    font-family: 'Inter';
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    line-height: 27px;
    color: #000000;
    padding-top: 1rem;
    margin: 0;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-bottom: 1rem;
`;
