import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";

// import products from "../products";

const HomeScreen = () => {
  let { keyword } = useParams();

  const dispatch = useDispatch(); // used to dispatch an action
  const productList = useSelector((state) => state.productList); // used to retireve the needed state
  const { loading, error, products } = productList; // loading, error, products are the possible things that could be sent down

  // This will run as soon as the component is mounted
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
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
