import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { LoginButton } from './LoginButton'
import { LogoutButton } from './LogoutButton'
import { Profile } from './Profile'
import { Link } from 'react-router-dom'

export function Nav() {
  const { user, logout, loginWithRedirect, isAuthenticated, isLoading } =
    useAuth0()

  useEffect(() => {
    if (!isLoading) {
      // If the user is authenticated, we want to redirect them to the home page
      if (isAuthenticated) {
        console.log('Logged in as:', user)
      }
    }
  }, [isAuthenticated, isLoading])

  return (
    <nav>
      <IfAuthenticated>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <ul className="">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <LoginButton />
          </li>
        </ul>
      </IfNotAuthenticated>
    </nav>
  )
}
