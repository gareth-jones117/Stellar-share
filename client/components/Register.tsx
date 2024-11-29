import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth0 } from '@auth0/auth0-react'
import { useUser } from '../hooks/useUser.ts'
// import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

function Register() {
  const [errorMsg, setErrorMsg] = useState('')
  const { user: userAuth0, getAccessTokenSilently, isAuthenticated } = useAuth0()
  const userFromHook = useUser()

  const handleMutationSuccess = () => {
    setErrorMsg('')
  }

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setErrorMsg(error.message)
    } else {
      setErrorMsg('Unknown error')
    }
  }

  const mutationOptions = {
    onSuccess: handleMutationSuccess,
    onError: handleError,
  }

  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
  })

  useEffect(() => {
    if (userFromHook.data) navigate('/')
  }, [userFromHook.data, navigate])

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    const token = await getAccessTokenSilently()
    evt.preventDefault()


    // Both of these should exist at this point, I'm just doing this to keep typescript happy
    if(!userAuth0){
      console.log('Could not find current auth0 user')
      return
    }
    if(!userAuth0.email){
      console.log('Could not get current auth0 user email')
      return
    }
    //

    userFromHook.add.mutate({ newUser: {'name': form.name, 'email': userAuth0.email, 'picture': userAuth0.picture || ''}, token }, mutationOptions)
    navigate('/')
  }

  const hideError = () => {
    setErrorMsg('')
  }

  return (
    <div>
      <div>
        {isAuthenticated && <div>
          <h1>You don&apos;t have an account yet!</h1>
          <h2>Pick a user name to sign up</h2>
          {errorMsg && (
            <div>
              Error: {errorMsg}
              <button onClick={hideError}>Okay</button>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <button disabled={!form.name}>Register</button>
            </div>
          </form>
        </div>}


        {!isAuthenticated && <div>
          <h1>Please sign in</h1>
        </div>}
      </div>
    </div>
  )
}

export default Register
