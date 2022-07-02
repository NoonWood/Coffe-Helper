import React from 'react'
import './App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import RequireAuth from './hoc/RequireAuth'
import { Provider } from 'react-redux'
import store from './stor/configurateStore'

import theme from './theme/theme'
import Recipes from './pages/Recipes'
import Recipe from './pages/Recipe'
import CreateRecipe from './pages/CreateRecipe'
import EditRecipe from './pages/EditRecipe'

import Sections from './pages/Sections'
import CreateSection from './pages/CreateSection'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Layout from './components/Layout/Layout'
import Section from './pages/Section'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

import { StateProvider } from './contexts/stateProvider'

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <StateProvider>
          <div className="App"></div>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="recipes" element={<Recipes />} />
              <Route path="recipes/:name" element={<Recipe />} />
              <Route
                path="recipes/:name/edit"
                element={
                  <RequireAuth>
                    <EditRecipe />
                  </RequireAuth>
                }
              />
              <Route
                path="recipes/new"
                element={
                  <RequireAuth>
                    <CreateRecipe />
                  </RequireAuth>
                }
              />

              <Route path="sections" element={<Sections />} />
              <Route path="sections/:name" element={<Section />} />
              <Route
                path="sections/new"
                element={
                  <RequireAuth>
                    <CreateSection />
                  </RequireAuth>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </StateProvider>
      </ChakraProvider>
    </Provider>
  )
}

export default App
