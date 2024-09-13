import axios from 'axios';


export default function AuthService(){

  const API_URL = 'http://your-laravel-api-url';

 // Krijojmë funksionin për login
 async login(email: string, password: string) {
  try {
    // Step 1: Merrni cookie-n CSRF
    await axios.get(`${API_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });

    // Step 2: Kryeni login
    const response = await axios.post(
      `${API_URL}/login`,
      { email, password },
      { withCredentials: true }
    );

    return response.data;  // Kthejmë të dhënat e login-it
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

// Krijojmë funksionin për regjistrim
async register(name: string, email: string, password: string, password_confirmation: string) {
  try {
    // Step 1: Merrni cookie-n CSRF
    await axios.get(`${API_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });

    // Step 2: Kryeni regjistrimin
    const response = await axios.post(
      `${API_URL}/register`,
      { name, email, password, password_confirmation },
      { withCredentials: true }
    );

    return response.data;  // Kthejmë të dhënat e regjistrimit
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
}

// Funksion për logout
async logout() {
  try {
    const response = await axios.post(`${API_URL}/logout`, {}, {
      withCredentials: true,
    });

    return response.data;  // Ktheni rezultatet e logout-it
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
}
}