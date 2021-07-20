import axios from 'axios';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useParams } from "react-router-dom";
import { 
  createTheme, 
  makeStyles, 
  ThemeProvider,
} from '@material-ui/core/styles';
import { useEffect, useState } from 'react';

const theme = createTheme({
  spacing: 8,
});

const styles = makeStyles({
  pageContainer: {
    backgroundColor: '#eee',
  },
});

const RecipeView = () => {
  const { ID } = useParams();
  const [name, setName] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  const classes = styles();

  useEffect(() => {
    getRecipe();
  }, []);

  const getRecipe = async () => {
    const responses = [];
    // synchronous requests to avoid getting same meal
    const request = 
      await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`
      );
    console.log(request.data.meals[0]);
    const {idMeal, strMeal, strMealThumb} = request.data.meals[0];
    setName(strMeal);
    setImageSrc(strMealThumb);
  }

  return (
    <Container className={classes.pageContainer} maxWidth={false}>
      <Box align="center" p={{xs: 3, md: 8, lg: 12}}>
        <Typography 
          align="center" 
          component="h1"
          m={2}
          variant="h3">
          {name}
        </Typography>
        <img src={imageSrc} />
      </Box>
    </Container>
  );
}

export default RecipeView;
