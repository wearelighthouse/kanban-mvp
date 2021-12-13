import { Draggable } from "react-beautiful-dnd";


function DisplayBudgets({ item, index }) {
    
    return ( 
      <Draggable draggableId={item.id.toString()} index={index}>
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              snapshot={snapshot}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <p className="card">{item.fields["Title"]}</p>
            </div>
          );
        }}
      </Draggable>
    );
}

export default DisplayBudgets;