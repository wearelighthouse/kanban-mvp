import React, { createContext, useState, useEffect, useCallback } from "react";
import useFetchFromAirtable from "./useFetchFromAirtable";
const Context = createContext();

const API_KEY = process.env.REACT_APP_API_KEY;  
const AT_API_BASE = process.env.REACT_APP_API_BASE;
const Airtable = require('airtable');
const base = new Airtable({apiKey: API_KEY }).base(AT_API_BASE);
const table = base('Tasks');

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

function ContextProvider({ children }) {
  const { tasks, allBudgets, isLoading } = useFetchFromAirtable();
  const [destintionStatus, setDestinationStatus] = useState('');

  let mapTasks = tasks.map(task => task.fields["Budget"] && task.fields["Budget"][0]);

  let newBudget = [];

  for (let task of mapTasks) {
    let newBudgets = allBudgets.filter(budget => budget.id === task);

    newBudgets.map(budget => {
      return newBudget.push(budget.fields["Name"]);
    })
  }

  let budgets = [...new Set(newBudget)]

  let lenghtIsO = budgets.length ? budgets : '';
  let findFirstIndex = lenghtIsO && lenghtIsO[0];

  const [budget, setBudgets] = useState();

  const getItems = useCallback(
    (prefix) => tasks && tasks.filter(task => prefix === task.fields["Status"]), [tasks]
  );

  const generateLists = useCallback(
    () => status.reduce((acc, listKey) => ({ ...acc, [listKey]: getItems(listKey) }), {}), [getItems]
  );

  const [elements, setElements] = useState(generateLists());

  useEffect(() => {
    setElements(generateLists());
    setBudgets(findFirstIndex);
  }, [tasks, findFirstIndex, generateLists]);

  const onChange = e => {
    const value = e.target.value;
    setBudgets(value);
  }

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

  const updateRecord = async (id, fields) => {
    await table.update(id, fields);
  };

  return (
    <Context.Provider value={{ 
      removeFromList, 
      addToList, 
      status, 
      onChange, 
      budgets, 
      budget, 
      elements, 
      setElements, 
      destintionStatus, 
      setDestinationStatus, 
      allBudgets, 
      isLoading,
      updateRecord,
      filterTasksByBudget
      }}>
      {children}
    </Context.Provider>
  )
}

export { Context, ContextProvider };