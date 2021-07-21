import axios from 'axios';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';

const styles = makeStyles({
  searchContainer: {
    backgroundColor: '#fff',
    bottom: '36px',
    right: '36px',
  },
  searchButton: {
    backgroundColor: '#012633',
  },
});

const SearchModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const classes = styles();

  useEffect(() => {
    genResults();
  }, [query]);

  const genResults = async () => {
    if (query == null || query.length === 0) {
      return;
    }
    const request = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const response = request.data.meals || [];
    const recipes = response.slice(0, 5).map(recipe => {
      return {ID: recipe.idMeal, name: recipe.strMeal};
    })
    setResults(recipes);
  }

  const renderResults = () => {
    return results.map((recipe) => {
      return (
        <Box>
          <Button 
            component={Link} 
            to={`/recipe/${recipe.ID}`}>
            {recipe.name}
          </Button>
        </Box>
      );
    });
  }

  return (
    <Box className={classes.searchContainer} position="fixed">
      <Button onClick={() => {setOpenModal(!openModal)}}>
        <SearchIcon />
      </Button>
      {
        openModal && 
        <Box p={1} display="inline">
          <TextField 
            onChange={(e) => {setQuery(e.target.value)}}
            value={query}
          />
          {renderResults()}
        </Box>
      }
    </Box>
  );
}

export default SearchModal;