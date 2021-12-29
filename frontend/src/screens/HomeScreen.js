import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
// import axios from "axios";

// import products from "../products";

const HomeScreen = () => {
  const dispatch = useDispatch(); // used to dispatch an action
  const productList = useSelector((state) => state.productList); // used to retireve the needed state
  const { loading, error, products } = productList; // loading, error, products are the possible things that could be sent down

  // This will run as soon as the component is mounted
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <h2>Loading ...</h2>
      ) : error ? (
        <h3> {error} </h3>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
