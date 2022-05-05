import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useAppContext } from '../../context/Store';

const initialState = {
  search: '',
  sort: 'relevance',
  location: '',
  remote: '',
  empType: ''
}

const SearchBar = ({onSearch, amount, btnDisabled, setBtnDisabled}) => {
  let { state, dispatch } = useAppContext();
  let [formData, setFormData] = useState(initialState);
  let { search, sort, location, remote, empType } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const addTags = e => {
    if (e.key === 'Enter' &&  e.target.value !== "") {
      let tag = e.target.value;
      tag = tag.trim();
      dispatch({type: 'SET_TAG', payload: tag});
      if (setBtnDisabled) setBtnDisabled(false);
      e.target.value = "";
    };
  };

  const searchSubmitHandler = async (e) => {
    e.preventDefault();
    let searchTerms = state.tags;
    searchTerms = searchTerms.map(idx => idx.trim());
    searchTerms = searchTerms.join("+");
    searchTerms = searchTerms.replace(/\s/g, "+");
    formData.search = searchTerms;
    await onSearch(formData);
  };

  return (
    <section className="search">
      <div className="search__container box-shadow">
        <div className="">
          <div className="search__input-container">
            <div className="tag__container">
              <input
                className="tag__input"
                type="text"
                placeholder='Search...'
                onKeyUp={e => addTags(e)}
              />
            </div>
            <input className="search__input" type="text" id="search-box" name="location" value={location} placeholder="Location... Dallas, TX, (US only)" onChange={e => onChange(e)}/>
          </div>
          <div className="search__menus">
            <div className="search__select-set">
              <select className="search__select-menu" name="sort" value={sort} onChange={e => onChange(e)}>
                <option value="relevance">Relevance</option>
                <option value="date">Date</option>
              </select>
              <select className="search__select-menu" name="remote" value={remote} onChange={e => onChange(e)}>
                <option value="">Remote Work</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="search__select-set">
              <select className="search__select-menu" name="empType" value={empType} onChange={e => onChange(e)}>
                <option value="">Employment Type</option>
                <option value="full+time">Full Time</option>
                <option value="contract">Part Time / Contract</option>
              </select>
              <button
                type='submit'
                onClick={e => searchSubmitHandler(e)}
                className="search__btn"
                // disabled={btnDisabled}
              >
                <span>Find Jobs</span>
                <span className="search__logo">
                  <FaSearch />
                </span>
              </button>
            </div>
          </div>
          <div className="search__amount">
            <em>Results: {amount ? amount : 0}. Tags scrollable.</em>
          </div>
          <div className="search__amount">
            <em>Press Enter to add tags.</em>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SearchBar;