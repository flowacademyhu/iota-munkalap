import useToken from './useToken'
import jwt from 'jwt-simple'

export default function useCurrentEmployee() {
  const { token, setToken } = useToken()
  try {
    const decodedToken = jwt.decode(token, false, 'RS256')

    const name = decodedToken?.family_name + ' ' + decodedToken?.given_name
    const email = decodedToken?.email
    const isAdmin = decodedToken?.resource_access.worksheetclient.roles.includes(
      'admin'
    )
    return {
      name,
      email,
      isAdmin,
    }
  } catch (error) {
    setToken('')
    window.location.reload()
  }
}
