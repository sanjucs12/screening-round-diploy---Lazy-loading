import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LazyLoadingComponent = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );

      setResults((prevResults) => [...prevResults, ...response.data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchData();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <div>
      {results.map((result) => (
        <div key={result.id}>
          <h3>{result.title}</h3>
          <p>{result.body}</p>
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default LazyLoadingComponent;