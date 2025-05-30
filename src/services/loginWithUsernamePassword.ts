export const loginWithUsernamePassword = async (
  username: string,
  password: string
) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };
  } catch (error: any) {
    console.error(error.statusText);
    return {
      accessToken: null,
      refreshToken: null,
      error: error.statusText,
    };
  }
};
