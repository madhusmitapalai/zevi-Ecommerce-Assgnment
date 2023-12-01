import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeartFilled, StarFilled, FilterOutlined } from "@ant-design/icons";
import { Card, Empty, Radio, Spin } from "antd";
import "./Product.scss";
import { useLocation } from "react-router-dom";
import { websiteServices } from "../../Services/Website";
import Items from "./Items";
const Products = () => {
  const location = useLocation();
  const data = location.state?.data;
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilterProducts] = useState([]);
  const [initialProducts, setInitialProducts] = useState([]);
  const [showSingleProduct, setSingleProduct] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const getAllProducts = () => {
    websiteServices.getAllProducts().then((res) => {
      setInitialProducts(res);
      const filteredProducts = res.filter(
        (product) => product.category === data
      );
      setFilterProducts(filteredProducts);
      setLoading(false);
    });
  };

  const [hoveredProduct, setHoveredProduct] = useState(null);
  const filterProductsByPrice = (priceValue) => {
    let filteredByPrice = [];
    switch (priceValue) {
      case "price1":
        filteredByPrice = initialProducts.filter(
          (product) => product.price < 500
        );
        break;
      case "price2":
        filteredByPrice = initialProducts.filter(
          (product) => product.price >= 500 && product.price < 1000
        );
        break;
      case "price3":
        filteredByPrice = initialProducts.filter(
          (product) => product.price >= 1000 && product.price < 2000
        );
        break;

      default:
        filteredByPrice = initialProducts;
        break;
    }

    setSelectedPrice(priceValue);
    setSelectedRating(null);
    setFilterProducts(filteredByPrice);
  };

  const filterProductsByRating = (rating) => {
    const filteredByRating = initialProducts.filter(
      (product) => Math.round(product.rating.rate) === rating
    );

    setSelectedRating(rating);
    setSelectedPrice(null);
    setFilterProducts(filteredByRating);
  };

  const handlePriceChange = (e) => {
    const priceValue = e.target.value;
    filterProductsByPrice(priceValue);
    setFilterActive(false);
  };

  const handleRatingsChange = (e) => {
    const selected = parseInt(e.target.value);
    filterProductsByRating(selected);
    setFilterActive(false);
  };

  const handleButtonClick = (productId) => {
    setSingleProduct(true);

    navigate(`/items`, { state: { data: productId } });
    setSelectedProductId(productId);
  };
  const [filterActive, setFilterActive] = useState(false);

  const toggleFilter = () => {
    setFilterActive(!filterActive);
  };
  return (
    <div className="product-container">
      <div className={`filter-container ${filterActive ? "active" : ""}`}>
        <h3>Show Result</h3>
        <div className="brands-container">
          <h4>Price</h4>
          <Radio.Group onChange={handlePriceChange} value={selectedPrice}>
            <Radio className="radios" value="price1">
              Below 500
            </Radio>
            <Radio className="radios" value="price2">
              Between 500 - 1000
            </Radio>
            <Radio className="radios" value="price3">
              Between 1000 - 2000
            </Radio>
          </Radio.Group>
          <h4>Ratings</h4>
          <Radio.Group onChange={handleRatingsChange} value={selectedRating}>
            <Radio className="radios" value={5}>
              <StarFilled /> <StarFilled /> <StarFilled /> <StarFilled />{" "}
              <StarFilled />
            </Radio>
            <Radio className="radios" value={4}>
              <StarFilled /> <StarFilled /> <StarFilled /> <StarFilled />
            </Radio>
            <Radio className="radios" value={3}>
              <StarFilled /> <StarFilled /> <StarFilled />
            </Radio>
            <Radio className="radios" value={2}>
              <StarFilled /> <StarFilled />
            </Radio>
            <Radio className="radios" value={1}>
              <StarFilled />
            </Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="filter-icon" onClick={toggleFilter}>
        <FilterOutlined />
      </div>
      <div className="products-data-container">
        <h3>Products for category</h3>
        {loading ? (
          <div className="spin">
            {" "}
            <Spin size="larger" />
          </div>
        ) : filteredProducts.length > 0 ? (
          <section className="flex-container">
            {filteredProducts.map((product) => (
              <div className="grig-card" key={product.id}>
                <div className="cards">
                  <Card
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    cover={
                      <img
                        alt="example"
                        src={product.image}
                        className="card-img"
                      />
                    }
                  >
                    <HeartFilled className="heart-icon" />
                    <div className="hover-button">
                      <div
                        onClick={() => handleButtonClick(product)}
                        className="view-product"
                        style={{
                          display:
                            hoveredProduct === product.id ? "block" : "none",
                        }}
                      >
                        View Product
                      </div>
                    </div>
                  </Card>
                  <div className="card-text">
                    <span className="name">
                      {product.title.length > 35
                        ? `${product.title.slice(0, 25)}...`
                        : product.title}
                    </span>
                    <span className="price">Rs.{product.price}</span>
                    <div className="rating">
                      <span>
                        {Array.from(
                          { length: Math.round(product.rating.rate) },
                          (_, index) => (
                            <StarFilled key={index} />
                          )
                        )}
                      </span>
                      <span className="rating">({product.rating.count})</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        ) : (
          <div className="empty-card">
            <Empty />
          </div>
        )}
      </div>
      {showSingleProduct && <Items selectedProductId={selectedProductId} />}
    </div>
  );
};

export default Products;
