import React, { useEffect, useState } from "react"
import axios from 'axios';
import GridList from "@material-ui/core/GridList";
import MovieCard from "../../Components/MovieCard/MovieCard";
import Pagination from '@mui/material/Pagination';
import SearchBar from "material-ui-search-bar";
import { useNavigate } from 'react-router-dom';

import './styles.scss'
import { appConstants } from "../../Utils/constants";

const ListPage = () => {
  const [moviesData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);
  const [searched, setSearched] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(searched.length === 0)
    {const options = {
      method: 'GET',
      url: `${appConstants.baseURL}/upcoming?language=en-US&page=${page}`,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${appConstants.authorizationHeader}`
      }
    };

    axios
      .request(options)
      .then(function (response) {
        setMovieData(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });}
  }, [page, searched])

  const handlePageChange = (e, p) => {
    setPage(p);
  };

  const handleMovieDetails = (id) => {
    navigate(`/${id}`);
  }


  const requestSearch = (searchedVal) => {
    setSearched(searchedVal);
    const options = {
      method: 'GET',
      url: `${appConstants.searchURL}?query=${searchedVal}`,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${appConstants.authorizationHeader}`
      }
    };

    axios
      .request(options)
      .then(function (response) {
        setMovieData(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return <>
  <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
    <GridList cellHeight={"auto"} className='grid-list'>
      {moviesData.map((item, index) => (
        <MovieCard onClick={() => {
          handleMovieDetails(item.id);
        }} title={item.title} description={item.overview} imgSrc={`https://image.tmdb.org/t/p/w500/${item.poster_path
          }`} rating={item.vote_average} />
      ))}
    </GridList>
    {searched.length === 0 ? (
    <Pagination
      count={10}
      size="large"
      page={page}
      variant="outlined"
      shape="rounded"
      onChange={handlePageChange}
    />) : ''}
  </>
}

export default ListPage;

