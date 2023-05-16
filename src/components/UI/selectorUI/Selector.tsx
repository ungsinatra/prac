import React, {FC} from 'react';
import {vacancy} from "../../../types/vacancy";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {SideBarSlice} from "../../../store/reducers/SideBarSlice";

type option = {
    title: string,
    value: string,
}
type SelecorProps = {
    title: string,
    options: option[],
    isSpeck: boolean,
    isQual: boolean

}
const Selector: FC<SelecorProps> = ({title, options, isQual, isSpeck}) => {
    const {spect, qualy, salary} = useAppSelector(state => state.sideBarReducer)
    const {onChangeSpec, onChangeQual} = SideBarSlice.actions;
    const dispatch = useAppDispatch()
    return (
        <select className={'selector'} value={isSpeck ? spect : qualy}
                onChange={e => isSpeck ? dispatch(onChangeSpec(e.target.value)) : dispatch(onChangeQual(e.target.value))}>
            {options.map(o => <option value={o.value}>{o.title}</option>)}
        </select>
    );
};

export default Selector;