export const login = async (email, password) => {
  try {
    const response = await fetch("http://localhost:3030/expert/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // ✅ Send cookies with request
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Invalid credentials");

    return data; // ✅ Return full response
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

export const logout = async () => {
  try {
    const response = await fetch("http://localhost:3030/expert/logout", {
      method: "POST",
      credentials: "include", // ✅ Ensure cookies are included
    });

    if (!response.ok) throw new Error("Logout failed");

    return true;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
};
