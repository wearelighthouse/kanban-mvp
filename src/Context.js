import React, { createContext, useState, useEffect } from "react";
import useFetchFromAirtable from "./useFetchFromAirtable";
const Context = createContext();

const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
};

const addToList = (list, index, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
};

const status = ["To Do", "In Progress", "In Review / Blocked", "Done"];

let budgets = [];

function ContextProvider({children}) {
    const {tasks, allBudgets, isLoading} = useFetchFromAirtable();
    const [destintionStatus, setDestinationStatus] = useState('');

    let mapTasks = tasks.map(task => task.fields["Budget"] && task.fields["Budget"][0]);

    for (let task of mapTasks) {
        allBudgets.map(budget => {
            if (budget.id === task) {
                budgets = [budget.fields["Name"]];
                return budget
            }
        });
       
    }

    let lenghtIsO = budgets.length ? budgets : '';
    let findFirstIndex = lenghtIsO && lenghtIsO[0];

    const [budget, setBudgets] = useState(findFirstIndex);

    const getItems = (prefix) => {
    
        let mapBudget = tasks && tasks.filter(task => {
            if (prefix === task.fields["Status"]) {
                return task;
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
    }, [tasks])
    
    const onChange = e => {
        const value = e.target.value;
        setBudgets(value);
    }
    
    return (
        <Context.Provider value={{ removeFromList, addToList, status, onChange, budgets, budget, elements, setElements, destintionStatus, setDestinationStatus, allBudgets, isLoading }}>
            {children} 
        </Context.Provider>
    )
}

export {Context, ContextProvider};