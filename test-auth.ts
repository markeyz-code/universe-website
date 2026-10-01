import axios from "axios";

const test = async () => {
  try {
    const res = await axios.post("http://localhost:4000/api/v1/auth/login", {
      email: "test@example.com",
      password: "Password123!",
      source: "universe"
    });
    console.log("Login OK:", res.data);
  } catch (err: any) {
    console.log("Login Error:", err.response?.data || err.message);
  }

  try {
    const res = await axios.post("http://localhost:4000/api/v1/auth/send-otp", {
      email: "test@example.com",
      firstName: "Test",
      source: "universe"
    });
    console.log("SendOTP OK:", res.data);
  } catch (err: any) {
    console.log("SendOTP Error:", err.response?.data || err.message);
  }
}
test();
