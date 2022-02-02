import { useContext } from "react";
import { Context } from "../Context";
import Status from "./Status";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

function Budgets() {
  let { removeFromList, addToList, status, onChange, budgets, budget, elements, setElements, filterTasksByBudget, updateRecord } = useContext(Context);

  const onDragEnd = result => {

    if (!result.destination) {
      return;
    }

    let listCopy = { ...elements };

    let newList = listCopy[result.source.droppableId];
    let [removedElement, newSourceList] = removeFromList(newList, result.source.index);
    listCopy[result.source.droppableId] = newSourceList;

    let removedElementCopy = { ...removedElement };
    removedElementCopy.fields["Status"] = result.destination.droppableId;

    let destinationList = listCopy[result.destination.droppableId];

    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElementCopy
    );

    let fields = {
      'Status': `${result.destination.droppableId}`
    };
    
    updateRecord(removedElementCopy.id, fields);
    
    setElements(listCopy);
  }

  return (
    <Container>
      <Header>
        <SelectValue className="budgets-dropdown" value={budget} onChange={e => onChange(e)}>
          {budgets.map((budget, index) => {
            return <option key={index} value={budget}>{budget}</option>
          })}
        </SelectValue>
      </Header>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="dragdrop">
          {status.map((listKey) => (
            <Status
              elements={elements[listKey].filter(el => filterTasksByBudget(el))}
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
  padding: 12px 0.5rem;
  outline: none;
  background-color: #FFFFFF;
  border: 1px solid #E2E8F0;
  box-sizing: border-box;
  border-radius: 2px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
`

const Container = styled.div`
  padding-top: 1rem;
  max-width: 1212px;
  margin-left: 1rem;
  margin-right: auto;
  padding-bottom: 1rem;
`;