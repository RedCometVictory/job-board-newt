import { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Post from './components/Post';
import Footer from './components/Footer';
import Spinner from './components/Spinner';
import { MdOutlineClose } from 'react-icons/md';
import { useAppContext } from '../context/Store';
import Pagination from './components/Pagination';
let API_KEY = process.env.NEXT_PUBLIC_API_KEY

const Home = (props) => {
  let { state, dispatch } = useAppContext();
  const refScrollUp = useRef();
  let [jobs, setJobs] = useState(props.jobs.results);
  let [postNumber, setPostNumber] = useState(20); // per page
  let [btnDisabled, setBtnDisabled] = useState(true);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    handleScrollUp();
  }, [state.currentPage]);

  const indexOfLastPost = state.currentPage * postNumber;
  const indexOfFirstPost = indexOfLastPost - postNumber;

  let currentPosts;
  if (state.jobs.length > 0) {
    currentPosts = state.jobs.slice(indexOfFirstPost, indexOfLastPost);
  } else {
    currentPosts = jobs.slice(indexOfFirstPost, indexOfLastPost);
  }

  const handleScrollUp = () => {
    refScrollUp.current.scrollIntoView({ behavior: 'smooth' });
  };

  const paginate = pageNumber => {
    dispatch({ type: "SET_PAGE", payload: pageNumber});
  }

  const scrollToTop = () => {
    window.scrollTo(0,0);
  };

  const removeTags = (index) => {
    if (state?.tags.length <= 1) setBtnDisabled(true);
    dispatch({type: "REMOVE_TAG", payload: index})
  };

  const searchHandler = async (formData) => {
    dispatch({type: 'SET_SEARCH', payload: formData.search });
    dispatch({type: 'SET_SORT', payload: formData.sort });
    dispatch({type: 'SET_LOCATION', payload: formData.location });
    dispatch({type: 'SET_REMOTE', payload: formData.remote });
    dispatch({type: 'SET_EMP_TYPE', payload: formData.empType });
    setLoading(true);

    await fetch('/api', {
      method: 'POST',
      body: JSON.stringify({
        search: formData.search,
        sort: formData.sort,
        location: formData.location,
        remote: formData.remote,
        empType: formData.empType,
        // // page: currentPage
      })
    })
    .then(res => res.json())
    .then(data => {
      let newJobs = data;
      setJobs(jobs = []);
      paginate(1);
      dispatch({type: "SET_JOBS", payload: newJobs.results});
    })
    .then(() => setLoading(false))
    .catch(error => console.error(error))
  };

  return (
    <div className="container">
      <div className="" ref={refScrollUp} ></div>
      <Navbar />
      <main>
        <SearchBar
          onSearch={searchHandler}
          amount={state.jobs.length || jobs.length || 0}
          btnDisabled={btnDisabled}
          setBtnDisabled={setBtnDisabled}
          // selectedTags={selectedTags}
        />
        {loading ? (
          <Spinner />
        ) : (
          <div className="posts">
            <div className="search__tag-list">
              <div className="tag__tag-list-container">
                <ul className={`tag tag__tag-list ${state.tags.length > 0 ? 'active' : ''}`}>
                  {state.tags.map((tag, index) => (
                    <li className="tag__list-item" key={index}>
                      <span className="tag__name">{tag}</span>
                      <span className="tag__close" onClick={() => removeTags(index)}>
                        <span className="tag__close-btn">
                          <MdOutlineClose />
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {currentPosts.length > 1 ? (
              currentPosts.map((job) => (
                <Post job={job} key={job.id} />
              ))
            ) : (
              <div className="no-result">
                No results found. Try a different search term.
              </div>
            )}
          </div>
        )}
        <div className="pagin">
          <Pagination
            postsPerPage={postNumber}
            totalPosts={state.jobs.length ? state.jobs.length : jobs.length}
            paginate={paginate}
            scroll={handleScrollUp}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
};
export default Home;
export const getServerSideProps = async (context) => {
  try {
    let res = await fetch(`https://findwork.dev/api/jobs`, {
      headers: {
        "Authorization": `Token ${API_KEY}`
        }
    })
    res = await res.json();

    return {
      props: { jobs: res }
    }
  
  } catch (err) {
    return {
      props: { jobs: [] }
    }
  }
};