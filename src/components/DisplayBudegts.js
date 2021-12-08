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
              <h3 className="card">{item.title}</h3>
            </div>
          );
        }}
      </Draggable>
    );
}

export default DisplayBudgets;