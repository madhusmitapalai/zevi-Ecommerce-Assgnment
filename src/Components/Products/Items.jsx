import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import "./Items.scss";
import { Button, Spin } from "antd";

const Items = () => {
  const location = useLocation();
  const product = location.state?.data;
  const [item, setItem] = useState(product);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(() => {
          setItem(product);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [product]);

  return (
    <section className="section">
      <div className="item-container">
        {loading ? (
          <Spin size="large" />
        ) : item ? (
          <div className="item-details">
            <div className="item-img-div">
              <img src={item.image} alt={item.title} className="item-image" />
            </div>
            <div className="item-info">
              <h2>{item.title}</h2>
              <p className="dec">{item.description}</p>
              <p className="price">Price: ${item.price}</p>
              <span>
                Rating:
                {Array.from(
                  { length: Math.round(item.rating.rate) },
                  (_, index) => (
                    <StarFilled key={index} />
                  )
                )}
              </span>
              <div className="button-div">
                <Button className="but-btn">Buy Now</Button>
                <Button className="whishlist-btn">Wishlist</Button>
              </div>
            </div>
          </div>
        ) : (
          <p>No item available</p>
        )}
      </div>
    </section>
  );
};

export default Items;
