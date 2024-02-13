import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Colours, Typography } from '../definitions';
import PageLayout from '../components/PageLayout';
import Task from '../components/Task';
import apiFetch from '../functions/apiFetch';

const ToDos = () => {
    const [asdf, setAsdf] = useState([]);
    
    // Load ToDos on page loading.
    useEffect(() => {
        getToDos();
        }, []);

    const [data, setData] = useState();

    const getToDos = async (event) => {
        const all = [];
        const todos = [];
        let response = await apiFetch("/todo/asdf", {
            method: "GET"
        });

        const result = response.body.map(function(obj) {
            return all.push([obj.name, obj.created, obj.todoID, obj.status]);
        });

        // Sort by creation date
        all.sort(function (a, b){
            return a[1].localeCompare(b[1]);
        })

        const populate = all.map(function(obj) {
            return todos.push(obj[0]);
        })
        
        setData(all);
    }

    const toggleDisplay = (e) => {
        if (e.target.style.backgroundColor === "yellow" & e.target.style.backgroundColor !== "inherit") {
            e.target.style.backgroundColor = "lightgreen"
        }
        else if (e.target.style.backgroundColor === "lightgreen" & e.target.style.backgroundColor !== "inherit") {
            e.target.style.backgroundColor = "yellow"
        }
    }
    
    // Clicking in the button on the text doesn't do what we want???
    function RenderData() {
        const stuff = data?.map((data) => {
            return (
                <li key={data[2]}>
                    <Task style={{borderStyle: 'dotted', height: '100px', width: '100%', 
                                    flexdirection: 'column', backgroundColor: 'lightgreen', 
                                    justifyContent: 'center', padding: '0px'}} id={data[2]} text={data[0]} status={data[3]}>
                    </Task>
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
        border: dotted;
        justify-content: center;
        text-align: left;
        transition: color 0ms;
        background-color: blue;
        width: 175px;
        height: 50px;
    }
`;