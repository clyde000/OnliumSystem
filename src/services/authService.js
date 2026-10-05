const API_BASE_URL = "http://localhost:5027/api";

export const authService = {
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/Auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Login failed");
    }

    const data = await response.json();
    return data;
  },

  async register(firstName, lastName, email, password) {
    const response = await fetch(`${API_BASE_URL}/Auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        fullName: `${firstName} ${lastName}`,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Registration failed");
    }

    return await response.json();
  },

  getAuthHeaders() {
    const token = this.getToken();
    return token
      ? {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        }
      : {
          "Content-Type": "application/json",
          Accept: "application/json",
        };
  },

  saveToken(token) {
    localStorage.setItem("onlium_token", token);
  },

  getToken() {
    return localStorage.getItem("onlium_token");
  },

  saveUserSession(userData) {
    localStorage.setItem("onlium_current_user", JSON.stringify(userData));
    if (userData.token) {
      this.saveToken(userData.token);
    }
  },

  getUserSession() {
    const user = localStorage.getItem("onlium_current_user");
    return user ? JSON.parse(user) : null;
  },

  clearUserSession() {
    localStorage.removeItem("onlium_current_user");
    localStorage.removeItem("onlium_admin");
  },

  isAuthenticated() {
    return !!this.getUserSession();
  },

  saveAdminSession() {
    localStorage.setItem("onlium_admin", "true");
  },

  isAdmin() {
    return localStorage.getItem("onlium_admin") === "true";
  }
};
