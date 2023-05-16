import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { SearchTemplateSlice } from "../../store/reducers/searchTemplateSlice";
import { Input, Select } from "antd";
import { qualyOptions } from "../../utils/constants";
import "./SearchTemplate.css";
const { Option } = Select;
const SearchTemplate = () => {
  const { select, input } = useAppSelector(
    (state) => state.SearchTemplateReducer
  );
  const dispatch = useAppDispatch();
  const { onSelectChange, onInputChange } = SearchTemplateSlice.actions;

  return (
    <div className="search">
      <div className="search__container">
        <Input
          className="search__input"
          type="text"
          placeholder="Поиск"
          value={input}
          onChange={(e) => dispatch(onInputChange(e.target.value))}
        />
        <Select
          className="seach__select"
          value={select}
          onChange={(value) => dispatch(onSelectChange(value))}
        >
          <Option value="relevance">По соответствию</Option>
          <Option value="date">По дате размещения</Option>
          <Option value="salary_desc">По убыванию зарплаты</Option>
          <Option value="salary_asc">По возрастанию зарплаты</Option>
        </Select>
      </div>
    </div>
  );
};

export default SearchTemplate;

{
  /* <div className={'search'}>
<div className={'search__container'}>
    <input type="text" placeholder={'Поиск'} value={input}
           onChange={e => dispatch(onInputChange(e.target.value))}/>
    <select className={'seach__select'} name="" id="" value={select}
            onChange={e => dispatch(onSelectChange(e.target.value))}>
        <option value='relevance'>По соответствию</option>
        <option value={'date'}>По дате размещения</option>
        <option value={'salary_desc'}>По убыванию зарплаты</option>
        <option value={'salary_asc'}>По возрастанию зарплаты</option>
    </select>
</div>
</div> */
}
