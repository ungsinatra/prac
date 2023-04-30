import React, { FC } from 'react';
import { arrayProps } from '../store/reducers/createVacancySlice';
import ArrayInput from './UI/ArrayInput';
import { createVacancySlice } from '../store/reducers/createVacancySlice';
import { useAppDispatch } from '../hooks/redux';
interface CandidateRequirementsProps {
    title:string,
    arrayType: keyof arrayProps,
    list:string[],
}



    

    

const CandidateRequirements:FC<CandidateRequirementsProps> = ({title,arrayType,list}) => {
    const dispatch = useAppDispatch();
    const {removeInArray} = createVacancySlice.actions;
    const removeBenefitHandle = (index:number) => {
        dispatch(removeInArray({field:arrayType,index}))
    }

    return (
        <div>
            <p>{title}</p>
            <ul>
                {
                    list.map((l,i) => {
                        return <li key={i}>
                            <div>
                                <p>{l}</p>
                                <button type='button' onClick={e => removeBenefitHandle(i)}>Удалить</button>
                            </div>

                        </li>
                    })
                }
            </ul>
            <ArrayInput type={arrayType} />
        </div>
    );
};

export default CandidateRequirements;