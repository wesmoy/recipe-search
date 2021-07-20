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
  image: {
    maxWidth: '480px',
    width: '100%',
  },
});

const RecipeView = () => {
  const { ID } = useParams();
  const [directions, setDirections] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [name, setName] = useState('');

  const classes = styles();

  useEffect(() => {
    getRecipe();
  }, []);

  const getIngredients = (recipe) => {
    const ingredients = [];
    const measurements = [];
    Object.keys(recipe).forEach(key => {
      if (key.startsWith('strIngredient')) {
        ingredients.push(recipe[key]);
      } else if (key.startsWith('strMeasure')) {
        measurements.push(recipe[key]);
      }
    });
    setIngredients(ingredients);
    setMeasurements(measurements);
  }

  const getRecipe = async () => {
    const responses = [];
    // synchronous requests to avoid getting same meal
    const request = 
      await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`
      );
    const {idMeal, strInstructions, strMeal, strMealThumb} = request.data.meals[0];
    getIngredients(request.data.meals[0]);
    setDirections(strInstructions)
    setImageSrc(strMealThumb);
    setName(strMeal);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.pageContainer} maxWidth={false}>
        <Box align="center" p={{xs: 3, md: 8, lg: 12}}>
          <Box mb={4} maxWidth="600px">
            <Typography 
              align="center" 
              component="h1"
              variant="h3">
              {name}
            </Typography>
          </Box>
          <Box display="inline-block">
            <img className={classes.image} src={imageSrc} />
          </Box>
          <Box align="left" maxWidth="480px" p={4}>
            <Typography>{directions}</Typography>
          </Box>
          <Typography variant="h2">Ingredients</Typography>
          <Box align="left" mt={4} maxWidth="480px">
            {
              ingredients.map((ingredient, idx) => {
                return (
                  <Typography>
                    {`${measurements[idx]} ${ingredient}`}
                  </Typography>
                );
              })
            }
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RecipeView;
