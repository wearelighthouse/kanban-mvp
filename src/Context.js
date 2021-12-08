import React, { createContext, useState, useEffect } from "react";
import budgetsArr from "./budgetsArr.json";

const Context = createContext();

const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
};

const addToList = (list, index, element) => {
    let elementCopy = {...element};
   
    const result = Array.from(list);
    const mapResult = result.map(res => {
        return element.status = res.status;
    })

    elementCopy.status = mapResult[0];

    result.splice(index, 0, elementCopy);
    return result;
};

const status = ["To Do", "In Progress", "In Review / Blocked", "Done"];

const budgets = ["AST: HKJ: UX/UI", "BB: Visit: Complete Build", "BB: Visit: Complete UI"];

function ContextProvider({children}) {
    const [allTasks, setAllTasks] = useState(budgetsArr);
    const [budget, setBudgets] = useState(budgets[0]);
    
    const getItems = (prefix) => {
    
        let mapBudget = allTasks.filter(budget => {
            if (prefix === budget.status) {
                return budget
            }
        });
        
       return mapBudget;
    }

    const generateLists = () => 
        status.reduce((acc, listKey) => ({ ...acc, [listKey]: getItems(listKey) }),
        {}
    );
    
    const [elements, setElements] = useState(generateLists());
    
    useEffect(() => {
        setElements(generateLists());
        setAllTasks(budgetsArr);
    }, []);

    const onChange = e => {
        const value = e.target.value;
        setBudgets(value);
    }
    
    return (
        <Context.Provider value={{ removeFromList, addToList, status, elements, setElements, onChange, budgets, budget }}>
            {children} 
        </Context.Provider>
    )
}

export {Context, ContextProvider};