import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea
} from "@material-ui/core";

import './styles.scss'



const MovieCard = ({ title, description, imgSrc, onClick, rating }) => {

  return (<>
    <Card className='card' onClick={onClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          image={imgSrc}
          title="Contemplative Reptile"
          className='card-image'
        />
      </CardActionArea>
      <CardContent>
        <div className='movie-title-rating'>
          <div className='movie-title'>{title}</div>
          <div className='movie-rating'>({rating})</div>
        </div>
        <div className='movie-description'>{description}</div>
      </CardContent>
    </Card>
  </>)
}

export default MovieCard;