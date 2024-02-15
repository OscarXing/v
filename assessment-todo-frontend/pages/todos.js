import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Colours, Typography } from '../definitions';
import PageLayout from '../components/PageLayout';
import Task from '../components/Task';
import apiFetch from '../functions/apiFetch';


const ToDos = () => {
    // Get ToDos on page loading.
    const [data, setData] = useState();
    const [filter, setFilter] = useState("All");
    const [updater, setUpdater] = useState(false);

    useEffect(() => {
        getToDos();
        }, [updater]);
    
    const getToDos = async (event) => {
        const allToDos = [];
        
        let response = await apiFetch("/todo/all", {
            method: "GET"
        });

        const result = response.body.map(function(obj) {
            return allToDos.push([obj.name, obj.created, obj.todoID, obj.status]);
        });

        // Sort todos by creation date
        allToDos.sort(function (a, b){
            return a[1].localeCompare(b[1]);
        })
        setData(allToDos);
    }


    const updateStatus = async (e) => {
        if (e.target.style.backgroundColor === "yellow"){
            e.target.style.backgroundColor = "lightgreen";
        }
        else {
            e.target.style.backgroundColor = "yellow";
        }

        if (updater == false) {
            setUpdater(true);
        }
        else {
            setUpdater(false);
        }
        
        const todoID = {"todoID":e.target.id};
        let response = await apiFetch("/todo/id", {
            body: todoID,
            method: "PATCH"
        });

    }

    const changeFunc = () => {
        const selectBox = document.getElementById("Options");
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;
        setFilter(selectedValue);
    };
    
    function RenderData() {
        const stuff = data?.map((data) => {
            // Conditionally render based on filter selection
            return (
                <li key={data[2]}>
                    {(data[3] == filter || filter == "All") &&
                    <Task className="taskButton" functionPassed={updateStatus} id={data[2]} text={data[0]} status={data[3]}>
                    </Task>
                    } 
                </li>
            )
        });
        return <ul> {stuff} </ul>
    };

    return (
        <PageLayout title="To Dos List">
            <Container>
                <div className="content">
                    <h1>Your To Dos:</h1>
                    <select name="Options" id="Options" onChange={changeFunc}>
                        <option value="All">All</option>
                        <option value="Complete">Complete</option>
                        <option value="In Progress">In Progress</option>
                    </select>
                    <RenderData/>
                </div>
            </Container>
        </PageLayout>
           
    );
};

export default ToDos;

const Container = styled.div`
    width: 100%;

    h1 {
        color: ${Colours.BLACK};
        font-size: ${Typography.HEADING_SIZES.M};
        font-weight: ${Typography.WEIGHTS.LIGHT};
        line-height: 2.625rem;
        margin-bottom: 2rem;
        margin-top: 1rem;
    }

    .input {
        margin-bottom: 0.5rem;
    }

    .loginButton {
        margin-bottom: 2.0625rem;
    }

    .signUpOptions {
        margin-bottom: 2rem;

        .signUpOption {
            margin-bottom: 0.5rem;
        }
    }

    .taskButton {
        height: 80px;
        width: 75%;
        justify-content: center;
        text-align: left;
        transition: color 0ms;
    }
`;
