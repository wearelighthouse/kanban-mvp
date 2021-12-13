import { useContext } from "react";
import { Context } from "../Context";
import Status from "./Status";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

function Budgets() {
    let { removeFromList, addToList, status, onChange, budgets, budget, elements, setElements } = useContext(Context);

    const onDragEnd = result => {
      
        if (!result.destination) {
            return;
        }

        let listCopy = { ...elements};

        let newList = listCopy[result.source.droppableId];
        let [removedElement, newSourceList] = removeFromList(newList,result.source.index); 

        listCopy[result.source.droppableId] = newSourceList;

        let removedElementCopy = {...removedElement};
        removedElementCopy.fields["Status"] = result.destination.droppableId;

        let destinationList = listCopy[result.destination.droppableId];

        listCopy[result.destination.droppableId] = addToList(
            destinationList,
            result.destination.index,
            removedElementCopy
        );
    
        setElements(listCopy);
    }
  
    return ( 
        <Container className="o-container">
            <Header className="App-header">
                <form>
                <SelectValue value={budget} onChange={e => onChange(e)}>
                    {budgets.map((budget, index) => {
                        return <option key={index} value={budget}>{budget}</option>
                    })}
                </SelectValue>
                </form>
            </Header>
           <DragDropContext onDragEnd={onDragEnd}>
               <div className="drag-able">
                    {status.map((listKey) => (
                        <Status 
                            elements={elements[listKey]}
                            key={listKey}
                            prefix={listKey}
                        />
                    ))}
            </div>
           </DragDropContext>
        </Container>
    );
}

export default Budgets;

const Header = styled.header`
    margin-bottom: 45px;
`;

const SelectValue = styled.select`
    width: 303px;
    padding-top: 12px;
    padding-left: 0.5rem;
    padding-bottom: 12px;
    outline: none;
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    box-sizing: border-box;
    border-radius: 2px;
`

const Container = styled.div`
    padding-top: 1rem;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 1rem;
`; 