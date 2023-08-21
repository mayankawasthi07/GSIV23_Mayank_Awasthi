import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

import './styles.scss';
import { appConstants } from "../../Utils/constants";

const DetailsPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState();
    const [year, setYear] = useState('')
    const navigate = useNavigate();

    const handleHomeButtonClick = () => {
        navigate(-1);
    }

    useEffect(() => {
        const options = {
            method: 'GET',
            url: `${appConstants.baseURL}/${id}?language=en-US`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${appConstants.authorizationHeader}`
            }
        };

        axios
            .request(options)
            .then(function (response) {
                setMovie(response.data);
                const date = response.data.release_date;
                const releaseYear = date.substring(0, 4);
                setYear(releaseYear);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    return (<div>
        <AppBar className='appbar' component="nav">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Movie Details
                </Typography>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleHomeButtonClick}
                >
                    <HomeIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
        <Box component="main" sx={{ p: 3 }}>
            <Toolbar />
            <div className='movie-detail'>
                <div>
                    <img alt="movie-detail" className='movie-image' src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path
                        }`} />
                </div>
                <div className='movie-text'>
                    <div className='movie-title' >{movie?.title}<span className='movie-rating'>({movie?.vote_average})</span></div>
                    <div className='movie-year'>{year} | {movie?.runtime} mins</div>
                    <div >{movie?.overview}</div>
                </div>
            </div>
        </Box>
    </div>)

}

export default DetailsPage;