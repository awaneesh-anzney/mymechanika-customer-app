import api from "./axios.config";

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("mymechanika-auth-context");

      if (auth) {
        const parsed = JSON.parse(auth);
        if (parsed?.accessToken) {
          config.headers.Authorization = `Bearer ${parsed.accessToken}`;
        }
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      console.warn("Unauthorized – logout required ⚠️");
      // yaha future me logout / refresh token logic aa sakta hai
    }

    return Promise.reject(error);
  }
);
