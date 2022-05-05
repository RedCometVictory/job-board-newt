import { useState } from 'react';
import { createInitials } from '../../util/imageSet';
import { useAppContext } from '../../context/Store';
import ReactTimeAgo from 'react-time-ago';
// import Image from "next/image";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
// import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
// TimeAgo.addLocale(ru)
const Post = ({job}) => {
  let [initials, setIntitials] = useState(false);
  let { state, dispatch } = useAppContext();

  const imgOnErrHandler = (e) => {
    setIntitials(true);
    e.target.style.display = 'none';
    if (e.target.src === '' || !e.target.src) {
      e.target.style.display = 'none';
    }
  };

  let addTag = (value) => {
    dispatch({type: "SET_TAG", payload: value});
  };

  return (
    <div className="post box-shadow">
      <div className="post__color-label"></div>
      <div className="post__container">
        <div className="post__header">
          <div className="post__avatar">
            {job?.logo ? (
              <>
              <img
                src={job?.logo ? job.logo : ''}
                alt="company logo" className="image"
                onError={e => imgOnErrHandler(e)} 
              />
              <div className={`initials ${initials ? 'active' : ''}`}>
                <p>{createInitials(job?.company_name)}</p>
              </div>
              </>
            ) : (
              <div className={`initials active`}>
                <p>{createInitials(job?.company_name)}</p>
              </div>
            )}
          </div>
        </div>
        <div className="post__description">
          <div className="post__desc-main">
            <div className="post__emp-name">
              <h5 className="name">{job?.company_name}</h5>
            </div>
            <div className="post__position">
              <div>
                <h3 className="title">
                  <a href={job?.url}>{job?.role}</a>
                </h3>
              </div>
            </div>
            <div className="post__stats">
              <div>
                <p><ReactTimeAgo date={Date.parse(job?.date_posted)} locale="en-US"/></p>
                <p className="bullet">&bull;</p>
                <p>{job?.remote ? "Remote" : "Non-Remote"}</p>
                <p className="bullet">&bull;</p>
                <p className='location'>{job?.location}</p>
              </div>
            </div>
          </div>
          <div className="post__desc-tags">
            <div className="tags">
              {job?.keywords.map((keyword, index) => (
                <p onClick={() => addTag(keyword)} key={index}>{keyword}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;