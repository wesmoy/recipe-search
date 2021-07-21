import axios from 'axios';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import RecipeCard from '../components/RecipeCard';
import Typography from '@material-ui/core/Typography';
import Background from '../images/home-background.jpg';
import Logo from '../images/logo.png';
import { 
  createTheme, 
  makeStyles, 
  ThemeProvider,
} from '@material-ui/core/styles';
import { useEffect, useState } from 'react';

const styles = makeStyles({
  backgroundImage: {
    maxWidth: '800px',
    width: '100%',
  },
  logo: {
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  pageContainer: {
    backgroundColor: '#eee',
  },
});

const theme = createTheme({
  spacing: 8,
});

const HomeView = () => {
  const [recipes, setRecipes] = useState([]);
  
  const classes = styles();
  const currTimeInSec = Math.floor(Date.now() / 1000);
  const secondsInDay = 86400;

  useEffect(() => {
    // check local storage for daily recipes, otherwise request from db
    const storage = localStorage.getItem('recipe_search');
    if (storage != null) {
      const storageObj = JSON.parse(storage);
      if (secondsInDay > currTimeInSec - storageObj.time) {
        setRecipes(storageObj.data);
        return;
      }
    }
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const responses = [];
    // synchronous requests to avoid getting same meal
    while (responses.length < 5) {
      const request = 
        await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
      const {idMeal, strMeal, strMealThumb} = request.data.meals[0];
      responses.push({img: strMealThumb, ID: idMeal, title: strMeal});
    }
    localStorage.setItem(
      'recipe_search', 
      JSON.stringify({
        data: responses,
        time: currTimeInSec,
      }),
    );
    setRecipes(responses);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.pageContainer} maxWidth={false}>
        <Box align="center" position="relative">
          <img className={classes.backgroundImage} src={Background} />
          <Box className={classes.logo} position="absolute">
            <img src={Logo} />
          </Box>
        </Box>
        <Box align="center" py={{xs: 3, md: 8, lg: 12}}>
          <Box my={4}>
            <Typography 
              align="center" 
              component="h1"
              variant="h3">
              Recipes of the day
            </Typography>
          </Box>
          {recipes.map((recipe, idx) => {
            return (
              <RecipeCard key={idx} recipe={recipe} />
            )
          })}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default HomeView;
