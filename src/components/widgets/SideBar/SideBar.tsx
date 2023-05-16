import React from "react";
import Selector from "../../UI/selectorUI/Selector";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { SideBarSlice } from "../../../store/reducers/SideBarSlice";
import { Input, Select } from "antd";
import { qualyOptions, directionOptions } from "../../../utils/constants";
import "./SideBar.css";
const { Option } = Select;

const SideBar = () => {
  const { onChangeSalaries, onChangeSpec, onChangeQual } = SideBarSlice.actions;
  const dispatch = useAppDispatch();

  return (
    <aside className="sideBar">
      <div className="sideBar__container">
        <div className="select__wrapper">
          <p>Выберите специализацию</p>
          <Select
            className="sideBar__select"
            defaultValue="any"
            onChange={(value) => dispatch(onChangeSpec(value))}
          >
            {directionOptions.map((direction) => {
              return (
                <Option value={direction.value}>{direction.textContent}</Option>
              );
            })}
          </Select>
        </div>
        <div className="select__wrapper">
          <p>Квалификация</p>
          <Select
            style={{ padding: "0" }}
            className="sideBar__select"
            defaultValue="any"
            onChange={(value) => dispatch(onChangeQual(value))}
          >
            {qualyOptions.map((qualy) => {
              return <Option value={qualy.value}>{qualy.textContent}</Option>;
            })}
          </Select>
        </div>

        <div className="select__wrapper">
          <p>Зарплата</p>
          <Input
            className="sideBar__input"
            type="number"
            placeholder="От"
            onChange={(e) => dispatch(onChangeSalaries(e.target.value))}
          />
        </div>
      </div>
    </aside>
  );
};

export default SideBar;

{
  /* <aside className={'sideBar'}>
            <div className='sideBar__container'>
                <p>Выберите специализацию</p>
                <Selector title='Разработка' options={[{title: 'Любая', value: 'any'}, {
                    title: 'Frontend-developer',
                    value: 'fronted'
                }, {title: 'DevOps', value: 'DevOps'}, {
                    title: 'Backend-developer',
                    value: 'backend'
                }]} isQual={false} isSpeck={true}/>
                <p>Квалификация</p>

                <Selector title={'Квалификация'} options={[
                    {
                        title: "Любая",
                        value: 'any'
                    },
                    {
                        title: "Стажер(Intern)",
                        value: 'intern'
                    },
                    {
                        title: "Младший(Junior)",
                        value: 'junior'
                    },
                    {
                        title: "Средний(Middle)",
                        value: 'middle'
                    },
                    {
                        title: "Старший(Senior)",
                        value: 'senior'
                    },
                    {
                        title: "Ведущий(Lead)",
                        value: 'Lead'
                    }

                ]} isQual={true} isSpeck={false}/>
                <p>Заплата</p>
                <input type="number" placeholder={'От'} onChange={e => dispatch(onChangeSalaries(e.target.value))}/>
            </div>
        </aside> */
}
