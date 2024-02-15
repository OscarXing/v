import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Colours, Typography } from '../definitions';
import apiFetch from '../functions/apiFetch';
import { useDispatch, useSelector } from 'react-redux';


// Custom button component for Task, pass in:
//  an id to identify the task
//  a string for what text should be rendered and set a variant to control the colour scheme
//  a string for what status should be displayed
//  a function to be called onClick
          
const Task = ({id, text, status, functionPassed, type="button", isFullWidth=false, size="large", variant="primary", disabledVariant="neutral", disabled=false, ...otherProps}) => {
    return (
        <div style={{display: 'inline-flex', width: '100%'}}>
        <ButtonElement id={id} type={type} isFullWidth={isFullWidth} size={size} variant={variant} disabledVariant={disabledVariant} disabled={disabled} {...otherProps}>
            <span className="centerContent" id={id}>
                {text}
            </span>
        </ButtonElement>
        <ButtonElement variant="tertiary">
            <span className="statusContent" id={id} status={status} style={{backgroundColor: status === 'In Progress' ? "yellow": "lightgreen"}} onClick={functionPassed}>
                Status: {status}
            </span>
        </ButtonElement>
        </div>
    );
}

export default Task;

const ButtonElement = styled.button`
    align-items: center;
    border-top-left-radius: 2.75rem;
    border-bottom-left-radius: 2.75rem;
    border-right: 0px;
    display: flex;
    font-family: ${Typography.FONTS.BODY};
    font-weight: ${Typography.WEIGHTS.REGULAR};
    justify-content: center;
    transition: background-color 0.4s;
    ${(props) => {
            if (props.size === "large") {
                return `
                    font-size: ${Typography.BODY_SIZES.L};
                    height: 2.75rem;
                    padding: 0rem 1.25rem;
                `;
            }
            else if (props.size === "medium") {
                return `
                    font-size: ${Typography.BODY_SIZES.S};
                    height: 2.25rem;
                    padding: 0rem 0.875rem;
                `;
            }
            else if (props.size === "small") {
                return `
                    font-size: ${Typography.BODY_SIZES.S};
                    height: 2rem;
                    padding: 0rem 0.875rem;
                `;
            }
        }
    }
    ${props => props.isFullWidth && `
        width: 100%;
    `}
    ${(props) => {
            if (props.disabled) {
                return `
                    background-color: ${Colours.TRANSPARENT};
                    border: 1px solid ${Colours.GRAY_LIGHT};
                    color: ${Colours.BLACK_LIGHTEST_2};
                `;
            }
            else if (props.variant === "primary") {
                return `
                    background-color: #c9ecf2;
                    color: ${Colours.BLACK};
                `;
            }
            else if (props.variant === "secondary") {
                return `
                    background-color: ${Colours.BLACK};
                    color: ${Colours.WHITE};
                `;
            }
            // Added third category
            else if (props.variant === "tertiary") {
                return `
                    background-color: #c9ecf2;
                    width: 30%;
                    border-top-left-radius: 0rem;
                    border-bottom-left-radius: 0rem;
                    border-top-right-radius: 2.75rem;
                    border-bottom-right-radius: 2.75rem;
                    border-left: 0px;
                `
            }
            else if (props.variant === "neutral-light") {
                return `
                    background-color: ${Colours.BLACK_LIGHTEST_0};
                    color: ${Colours.BLACK};
                    
                `;
            }
        }
    }


    :hover {
        cursor: pointer;
        transition: background-color 0.4s;
        ${(props) => {
                if (props.disabled) {
                    return `
                        cursor: initial;
                    `;
                }
                else if (props.variant === "primary") {
                    return `
                        background-color: ${Colours.PRIMARY_DARK};
                    `;
                }
                else if (props.variant === "secondary") {
                    return `
                        background-color: ${Colours.BLACK_LIGHT};
                    `;
                }
                else if (props.variant === "tertiary") {
                    return `
                        background-color: ${Colours.PRIMARY_DARK};
                    `
                }
                else if (props.variant === "neutral-light") {
                    return `
                        background-color: ${Colours.BLACK_LIGHTEST_1};
                    `;
                }
            }
        }
    }

    :active {
        ${(props) => {
                if (props.disabled) {
                    return `
                        cursor: initial;
                    `;
                }
                else if (props.variant === "primary") {
                    return `
                        background-color: ${Colours.PRIMARY_DARK};
                    `;
                }
                else if (props.variant === "secondary") {
                    return `
                        background-color: ${Colours.BLACK_LIGHT};
                    `;
                }
                else if (props.variant === "neutral-light") {
                    return `
                        background-color: ${Colours.BLACK_LIGHTEST_1};
                    `;
                }
            }
        }
    }

    span.centerContent {
        align-items: center;
        display: flex;
        flex-grow: 1;
        justify-content: left;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 25px;
    }

    span.statusContent {
        border-radius: 2.75rem;
        width: 50%;
    }
`;