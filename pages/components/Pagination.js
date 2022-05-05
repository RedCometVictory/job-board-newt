import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/Store';
const Pagination = ({ postsPerPage, totalPosts, paginate, scroll }) => {
  let { state, dispatch } = useAppContext();
  let [activePage, setActivePage] = useState(state.currentPage - 1); // index = 0

  useEffect(() => {
    setActivePage(state.currentPage - 1)
  }, [state.currentPage])

  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }
  const paginateHandler = (number, index) => {
    paginate(number);
    // setActivePage(activePage = index);
  };

  return (
    <div className="pagin__bar box-shadow">
      <nav className="pagin__container">
        <ul className="pagin__item-list">
          {pageNumber.map((number, index) => (
            <li key={index} className={`pagin__list-item ${index === activePage ? 'active' : ''} `}>
              <div onClick={() => paginateHandler(number, index)} className="pagin__page-link">{number}</div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
export default Pagination;