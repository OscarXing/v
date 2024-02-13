import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Colours, Typography } from '../definitions';
import apiFetch from '../functions/apiFetch';
import { useDispatch, useSelector } from 'react-redux';


// Custom button component for Task, pass in:
// an id to identify the task
// a string for what text should be rendered and set a variant to control the colour scheme
          
const Task = ({id, text, status, functionPassed, type="button", isFullWidth=false, size="large", variant="primary", disabledVariant="neutral", disabled=false, ...otherProps}) => {
    const [isChanging, setIsChanging] = useState(false);

    return (
        <ButtonElement id={id} type={type} isFullWidth={isFullWidth} size={size} variant={variant} disabledVariant={disabledVariant} disabled={disabled} {...otherProps}>
            <span className="centerContent" style={{border: 'dotted', justifyContent: 'left'}} id={id}>
                {text}
            </span>
            <span id={id} status={status} style={{border: 'dotted', backgroundColor: status === 'In Progress' ? "yellow": "lightgreen"}} onClick={functionPassed}>
                Status: {status}
            </span>
        </ButtonElement>
    );
}

export default Task;

const ButtonElement = styled.button`
    align-items: center;
    border: dotted;
    border-radius: 2.75rem;
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
                    background-color: ${Colours.PRIMARY};
                    color: ${Colours.BLACK};
                `;
            }
            else if (props.variant === "secondary") {
                return `
                    background-color: ${Colours.BLACK};
                    color: ${Colours.WHITE};
                `;
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
        justify-content: center;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;