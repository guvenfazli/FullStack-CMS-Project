export default async function AuthCheck() {
  const response = await fetch('http://localhost:8080/auth/cookieCheck', {
    method: 'GET',
    credentials: 'include'
  })
  const resData = await response.json()
  return resData
}