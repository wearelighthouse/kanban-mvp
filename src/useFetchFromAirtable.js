import { useEffect, useState } from "react";

const API_KEY = 'keyKi02SLEWcaD9um'
const AT_API_BASE = 'app20NrsCw1ekosq8'
const AIRTABLE_API= 'https://api.airtable.com/v0/';
const headers = {
    'Authorization': "Bearer " + API_KEY,
    'Content-Type': "application/json"
};

const tablesArray = [
    {id: 0, table: 'Tasks', view: '📖 All Tasks'},
    {id: 1, table: 'Budgets'},
]

function useFetchFromAirtable() {
    const [tasks, setTasks] = useState([])
    const [allBudgets, setAllBudgets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchTasksFromAirtable = async () => {
        let budgetsArray = [];

        for (let table of tablesArray) {
            const haveView = table.view ? table.view : '';
            let offset = '';

            try {
                setIsLoading(true);
                setError(false);
                do {
                    let url = `${AIRTABLE_API}${AT_API_BASE}/${table.table}?api_key=${API_KEY}&view=${haveView}&offset=${offset}`;
                    const response = await fetch(url, { headers: headers });
                    const data = await response.json();
        
                    if (table.table === 'Tasks') {
                        let filterTasksArray = data.records.filter(task => task.fields["Type"] === "Task");
                        setTasks(filterTasksArray);
                    } else if (table.table === 'Budgets') {
                        budgetsArray.push(...data.records);
                        setAllBudgets(budgetsArray);
                    } else {
                        return data.records
                    }
                    
                    if (data.offset) {
                        offset = data.offset;
                    } else {
                        offset = '';
                    }
                } while (offset !== '');
                setIsLoading(false);
            } catch (err) {
                setError(true);
                setIsLoading(false);
            }
        }                

    };

    useEffect(() => {
        setTimeout(() => {
            fetchTasksFromAirtable();
        }, 1000);
    }, [])

    return { tasks, allBudgets, isLoading, error };
}

export default useFetchFromAirtable;