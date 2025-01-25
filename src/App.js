import { Route, Routes } from 'react-router-dom';
import './App.css';
import MyAppBar from './Components/MyAppBar';
import React, { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';


const LazyHome=React.lazy(()=>import('./Components/Home'))
const LazyRecipeList=React.lazy(()=>import('./Components/RecipeList'))
const LazyRecipeDetails=React.lazy(()=>import('./Components/RecipeDetails'))
const LazyLogin=React.lazy(()=>import('./Components/Login'))
const LazyAddRecipe=React.lazy(()=>import('./Components/AddRecipe'))
const LazyFavorite=React.lazy(()=>import('./Components/Favorite'))



function App() {
  return (

    <>
    <MyAppBar/>
    <Routes>
      <Route path='/' element={<Suspense fallback={<CircularProgress color="secondary" />}><LazyHome /></Suspense>} />
      <Route path='/RecipeList' element={<Suspense fallback={<CircularProgress color="secondary" />}><LazyRecipeList /></Suspense>} />
      <Route path='/RecipeList/:id' element={<Suspense fallback={<CircularProgress color="secondary" />}><LazyRecipeDetails /></Suspense>} />
      <Route path='/Login' element={<Suspense fallback={<CircularProgress color="secondary" />}><LazyLogin /></Suspense>} />
      <Route path='/AddRecipe' element={<Suspense fallback={<CircularProgress color="secondary" />}><LazyAddRecipe /></Suspense>} />
      <Route path='/Favorite' element={<Suspense fallback={<CircularProgress color="secondary" />}><LazyFavorite /></Suspense>} />

    </Routes>
    </>
  );
}

export default App;
