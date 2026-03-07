import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// /admin → redirect to dashboard if logged in, else to login
const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("admin_auth") === "true") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  return null;
};

export default Admin;
