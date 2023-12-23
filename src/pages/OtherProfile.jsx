import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../utils/config";
import Layout from "../components/Layout";

const OtherProfile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.id);

  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await axios.get(baseUrl + `/users/${params.id}`);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params.id == userId) {
      navigate("/profile");
    }
  }, [navigate, params.id, userId]);

  useEffect(() => {
    getUser();
  }, []);

  return <Layout>Other Profile</Layout>;
};

export default OtherProfile;
