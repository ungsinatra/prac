import React, {useEffect} from 'react';
import {useAppSelector} from "../../hooks/redux";
import VacancyPreview from "../widgets/VacancyPreview";
import {useParams} from "react-router";

const VacanciesPage = () => {
    const currentVacancy = useAppSelector(state => state.vacancySelectReducer);
    useEffect(() => {
        console.log('ss')
    })
    const {id} = useParams()
    return (
        <div className={'vacancy'}>
            <div className='vacancy__main'>

            </div>
            <div className={'vacancy__ditails'}>
                <p>{currentVacancy.schedule}</p>
                <p>{currentVacancy.experience}</p>
                <p>{currentVacancy.qualifications}</p>
                <p>{currentVacancy.responsibilities}</p>
                <p>{currentVacancy.benefits}</p>
                <p>{currentVacancy.logo}</p>
            </div>
        </div>
    );
};

export default VacanciesPage;