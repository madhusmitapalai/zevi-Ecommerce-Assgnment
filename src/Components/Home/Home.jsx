import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Col, Empty, Input, Popover, Row } from "antd";
import "./Home.scss";
import { websiteServices } from "../../Services/Website";

const Home = () => {
  const [productList, setProductList] = useState([]);
  const [showHome, setShowHome] = useState(true);
  const [showProducts, setShowProducts] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = () => {
    const filteredProducts = productList.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProductList(filteredProducts);
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  const getAllProducts = () => {
    websiteServices
      .getAllProducts()
      .then((res) => {
        setProductList(res);
      })
      .catch((err) => console.log(err));
  };
  const navigate = useNavigate();

  const handlePopularSuggestionClick = (product) => {
    setShowHome(false);
    setShowProducts(true);
    setSelectedCategory(product);
    navigate("/products", { state: { data: product } });
  };

  const content = (
    <div className="pophover-conatienr">
      <h2>Latest Trends</h2>
      {productList.length > 0 ? (
        <div className="grig-cards" gutter={8}>
          {productList?.slice(0, 4)?.map((product) => {
            return (
              <div
                className="home-card"
                key={product.id}
                style={{ marginBottom: "10px" }}
              >
                <div
                  className="cards"
                  onClick={() => handlePopularSuggestionClick(product.category)}
                >
                  <Card
                    hoverable
                    cover={
                      <img
                        alt="example"
                        src={product?.image}
                        className="card-img"
                      />
                    }
                  ></Card>
                  <div className="card-text">
                    <span className="card-text-1">{product?.title}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Empty />
      )}
      <div className="popular-sugesion-container">
        <h2>Polupar Suggesions</h2>
        <p onClick={() => handlePopularSuggestionClick("jewelery")}>Jewelry</p>
        <p onClick={() => handlePopularSuggestionClick("electronics")}>
          Electronics
        </p>
        <p onClick={() => handlePopularSuggestionClick("women's clothing")}>
          Women's clothing
        </p>
        <p onClick={() => handlePopularSuggestionClick("men's clothing")}>
          Men's clothing
        </p>
      </div>
    </div>
  );

  return (
    <>
      <div>
        {showHome && (
          <div className="home-container">
            <Popover content={content}>
              <div className="searchar">
                <Input
                  placeholder="Search..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button className="search-button" onClick={handleSearch}>
                  Search
                </Button>
              </div>
            </Popover>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
