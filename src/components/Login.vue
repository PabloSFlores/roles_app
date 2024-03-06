<template>
  <div>
    <h1>Login</h1>
    <button @click="login('admin')">Login as Admin</button>
    <button @click="login('editor')">Login as Editor</button>
    <button @click="login('viewer')">Login as Viewer</button>
  </div>
</template>

<script>
import { jwtDecode } from "jwt-decode";
export default {
  name: "Login",
  methods: {
    login(role) {
      let token;

      switch (role) {
        case "admin":
          token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJyb2xlcyI6WyJSb2xlIDEiLCJSb2xlIDIiXX0.ujFqVXI7udbnBYYgVKFKtO09f3SaTOXeYBbdwG4S_mo";
          break;
        case "editor":
          token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZWRpdG9yIiwicm9sZXMiOlsiUm9sZSAxIiwiUm9sZSAyIl19.FT2rs3xp9J7L39RmKC3ODvdTI8fTFCI3mo-YuiDoRlY";
          break;
        case "viewer":
          token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidmlld2VyIiwicm9sZXMiOlsiUm9sZSAxIiwiUm9sZSAyIl19.D5Mnu61UWxyG6atU7yg8mJkTWEOFUTWFOMKmg0RAUHc";
          break;
      }

      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      this.redirectUser(decoded.role);
    },
    redirectUser(role) {
      if (role === "admin") {
        this.$router.push("/admin");
      } else if (role === "editor") {
        this.$router.push("/editor");
      } else if (role === "viewer") {
        this.$router.push("/viewer");
      }
    },
  },
};
</script>

<style>
</style>