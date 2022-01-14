import jwt_decode from 'jwt-decode'

export const DecodeJWT = async header => {
  if (!header) return

  const token = header.split(' ')[1]

  const decodedToken = jwt_decode(token)

  return decodedToken
}
