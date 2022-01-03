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

function ContextProvider({children}) {
    const {tasks, allBudgets, isLoading} = useFetchFromAirtable();
    const [destintionStatus, setDestinationStatus] = useState('');

    let mapTasks = tasks.map(task => task.fields["Budget"] && task.fields["Budget"][0]);

    let newBudget = [];
    for (let task of mapTasks) {
        let newBudgets = allBudgets.filter(budget => {
            if (budget.id === task) {
                return budget;
            }
        });

       newBudgets.map(budget => {
            return newBudget.push(budget.fields["Name"]);
        })
    }

    let budgets = [...new Set(newBudget)]

    let lenghtIsO = budgets.length ? budgets : '';
    let findFirstIndex = lenghtIsO && lenghtIsO[0];

    const [budget, setBudgets] = useState();

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
        setBudgets(findFirstIndex);
    }, [tasks, findFirstIndex]);
    
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