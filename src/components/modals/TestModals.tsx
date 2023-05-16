import React, {FC} from 'react';
interface  ITestModelsProps {
    type:string,
    onClose():void,
    onSubmit?():void
}
const TestModals:FC<ITestModelsProps> = ({type,onClose,onSubmit}) => {

    let popupContent;
    switch (type) {
        case 'confirm':
            popupContent = (
                <div>
                    <h3>Вы уверены, что хотите продолжить?</h3>
                    <button onClick={e => onSubmit?onSubmit():null}>Да</button>
                    <button onClick={onClose}>Отмена</button>
                </div>
            )
            break;
        case 'test':
            popupContent = (
                <div>
                    <h3>Вы точно хотите перестать проходить тест?</h3>
                    <button onClick={e => onSubmit?onSubmit():null}>Да</button>
                    <button onClick={onClose}>Отмена</button>
                </div>
            )
            break;
        case 'submit':
            popupContent = (
                <div>
                    <h3>Отправка ответов. Вы уверены?</h3>
                    <button onClick={e => onSubmit?onSubmit():null}>Да</button>
                    <button onClick={onClose}>Отмена</button>
                </div>
            )
            break;
        default:
            console.log('не передан попап')
    }

    return (
        <div>
            {popupContent}
        </div>
    );
};

export default TestModals;