export const loginWithUsernamePassword = async (
  username: string,
  password: string
) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });

  return response;
};
