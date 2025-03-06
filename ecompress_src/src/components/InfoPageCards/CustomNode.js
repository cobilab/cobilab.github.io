import React from 'react';
import { MathJax } from 'better-react-mathjax';


const CustomNode = (props) => {
    const { children } = props;
    return (
        <MathJax inline>{'\\(' + children + '\\)'}</MathJax>
    );
}

export default CustomNode;