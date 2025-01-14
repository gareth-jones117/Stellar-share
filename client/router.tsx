/* eslint-disable react/jsx-key */
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import App from './components/App'
import Home from './components/Home'
import SingleStuffPage from './components/SingleStuffPage'
import Users from './components/Users'
import { Profile } from './components/Profile'
import { AllStuff } from './components/AllStuff'
import AddStuffForm from './components/AddStuffForm'
import Register from './components/Register'
import { SingleUser } from './components/SingleUser'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="stuff" element={<AllStuff />} />
        <Route path="/stuff/:stuffId" element={<SingleStuffPage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId" element={<SingleUser />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addStuff" element={<AddStuffForm />} />
      </Route>

      <Route path="/register" element={<Register />} />
    </>,
  ),
)

export default router
