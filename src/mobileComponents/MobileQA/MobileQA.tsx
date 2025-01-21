import React from "react";
import "./MobileQA.css";

interface QAProps {
    currentLanguage: string;
    question: React.ReactNode; // can be string or JSX
    answer: React.ReactNode; // can be string or JSX
}

function MobileQA({ currentLanguage, question, answer }: QAProps) {
    const Q =
        currentLanguage === "en" ? "Q" : currentLanguage === "es" ? "P" : "K";
    const A =
        currentLanguage === "en" ? "A" : currentLanguage === "es" ? "R" : "R";

    return (
        <div className='Q-and-A'>
            <div className='question'>
                <div className='question-content'>
                    <span className='QA-key'>{Q}:</span> {question}
                </div>
            </div>
            <div className='answer'>
                <div className='answer-content'>
                    <span className='QA-key'>{A}:</span> {answer}
                </div>
            </div>
        </div>
    );
}

export default MobileQA;
