import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';

const styles = makeStyles({
  image: {
    width: '100%',
  },
  viewRecipe: {
    backgroundColor: '#012633',
    color: 'white',
  },
});

const RecipeCard = ({recipe: {img, ID, title}}) => {
  const classes = styles();

  return (
    <Box>
      <Box 
        border={1} 
        boxShadow={3} 
        display="flex" 
        flexDirection="column" 
        m={4}
        maxWidth="480px"
        p={3}>
        <img 
          alt={`Recipe of the day: ${title}`} 
          className={classes.image} 
          src={img} 
        />
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Button 
          component={Link}
          className={classes.viewRecipe} 
          p={1} 
          size="small"
          to={`/recipe/${ID}`}>
          View Recipe
        </Button> 
      </Box>
    </Box>
  );
}

export default RecipeCard;
