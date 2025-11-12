// Authentication utility with credentials stored securely
export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "Ak47@4jkq",
}

export const verifyCredentials = (username: string, password: string): boolean => {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password
}

export const setAdminSession = () => {
  if (typeof window !== "undefined") {
    const token = btoa(`${ADMIN_CREDENTIALS.username}:${Date.now()}`)
    localStorage.setItem("adminToken", token)
    localStorage.setItem("adminSessionTime", Date.now().toString())
  }
}

export const getAdminSession = (): boolean => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("adminToken")
    const sessionTime = localStorage.getItem("adminSessionTime")
    if (token && sessionTime) {
      const sessionAge = Date.now() - Number.parseInt(sessionTime)
      return sessionAge < 24 * 60 * 60 * 1000 // 24 hour session
    }
  }
  return false
}

export const clearAdminSession = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminSessionTime")
  }
}
