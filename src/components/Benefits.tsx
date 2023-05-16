import React, { FC } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { createVacancySlice } from '../store/reducers/createVacancySlice';


const Benefits:FC<{benefit:string,index:number}> = ({benefit,index}) => {
    const dispatch = useAppDispatch();
    const {removeInArray} = createVacancySlice.actions;

    const removeBenefitHandle = () => {
        dispatch(removeInArray({field:'benefits',index}))
    }

    return (
        <div className='benefit'>
            <p>{benefit}</p>
            <button onClick={removeBenefitHandle} type='button'>Удалить</button>
        </div>
    );
};

export default Benefits;