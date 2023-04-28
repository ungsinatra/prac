import React from 'react';
import {useAppSelector} from "../../hooks/redux";

const ResumePage = () => {
    const resume = useAppSelector(state => state.resumeSelectedReduser);
    return (
        <div className={'resume'}>
            <div className = 'resume__container'>
                <div className = 'resume__sideBar'>
                    <div className={'resume__bio'}>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumePage;