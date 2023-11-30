import React from "react";
import "./NoFound.scss";
import pagenotfoundImg from "../../assets/nofoundimg.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";

const NotFoundPage = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const listOfURL = pathname.split("/");
  const NameOfCategory = listOfURL[1];
  const NameOfCategoryToUpperCase =
    NameOfCategory.charAt(0).toUpperCase() + NameOfCategory.slice(1);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <>
      <div className="bgImageNotFound" style={{ textAlign: "center" }}>
        <img
          src={pagenotfoundImg}
          alt="notfoundpage"
          style={{ width: 600, height: 400 }}
        />
        <h1>{NameOfCategoryToUpperCase} Page Not Found</h1>
        <Button onClick={handleNavigate}>Go to Home</Button>
      </div>
    </>
  );
};

export default NotFoundPage;
