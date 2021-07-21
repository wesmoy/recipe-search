import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { 
  createTheme, 
  ThemeProvider,
} from '@material-ui/core/styles';
import HomeView from './views/HomeView';
import RecipeView from './views/RecipeView';
import SearchModal from './components/SearchModal';

const theme = createTheme({
  spacing: 8,
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/recipe/:ID">
            <RecipeView />
          </Route>
          <Route path="/">
            <HomeView />
          </Route>
        </Switch>
        <SearchModal />
      </Router>
    </ThemeProvider>
  );
}

export default App;
