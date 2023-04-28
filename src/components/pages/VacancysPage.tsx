import React from 'react';
import VacancyLists from "../widgets/VacancyLists";

const VacncysPage = () => {
    return (
        <div className={'vacancys'}>
            <div className={'vacancys__items'}>
                <div className={'vacancys__lists'}>
                    <VacancyLists/>
                </div>
            </div>

        </div>
    );
};

export default VacncysPage;