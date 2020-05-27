import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';



function Table(props) {
   
    let [columns, setColumns] = useState([]);
    const employees = useSelector(state => state.employees);

    useEffect(() => {
        let clmns = [];
        employees.forEach((item) => {
            var row = item;
            for (let x in row) {
                if (clmns.indexOf(x) == -1) {
                    clmns.push(x);

                }
            }
        });

        setColumns(clmns);
    }, [employees])



    return (
        <>
            {columns.length ?
                <table id="students">
                    <thead>
                        <tr>
                            {columns.map((items,index) => {
                                return <th key={index+"th"}>{items}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((items,index) => {
                            let object = items;
                            let keyindex=index;
                            return (<tr key={index+"tr"}>
                                {columns.map((items,index) => {
                                    let value = object[items];
                                    if (value == null) { value = ""; }
                                    return <td key={keyindex+index+"td"}>{value}</td>
                                })}
                            </tr>)

                        })
                        }
                    </tbody>
                </table>
                : <span>data is loading....</span>}

        </>
    );
}

export default Table;