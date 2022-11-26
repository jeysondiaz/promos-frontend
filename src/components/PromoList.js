import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { getAllCategories } from "../api/category";
import { getAllCommerce } from "../api/commerce";
import {
  getAllProducts,
  getProductsByCategory,
  getProductsByCommerce,
} from "../api/product";

export default () => {
  const [productList, setProductList] = useState([]);
  const [commerceList, setCommerceList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const [productsByCategory, setProductsByCategory] = useState();
  const [productsByCommerce, setProductsByCommerce] = useState();

  useEffect(() => {
    onGetData();
  }, []);

  useEffect(() => {
    if (productsByCategory && !productsByCommerce) {
      setProductList(productsByCategory);
    } else if (!productsByCategory && productsByCommerce) {
      setProductList(productsByCommerce);
    } else if (productsByCategory && productsByCommerce) {
      const newProductsList = productsByCategory.reduce((acc, el) => {
        const product = productsByCommerce.find((b) => el._id === b._id);

        if (product) acc.push(product);

        return acc;
      }, []);

      setProductList(newProductsList);
    } else {
      getProductList();
    }
  }, [productsByCategory, productsByCommerce]);

  const getProductList = async () => {
    try {
      const allProductsList = await getAllProducts();
      setProductList(allProductsList.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onGetData = async () => {
    try {
      await getProductList();

      const allCommerceList = await getAllCommerce();
      setCommerceList(allCommerceList.data);

      const allCategoryList = await getAllCategories();
      setCategoryList(allCategoryList.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeCategory = async (e) => {
    e.preventDefault();

    try {
      if (e.target.value !== "null") {
        const newProductsByCategory = await getProductsByCategory(
          e.target.value
        );
        setProductsByCategory(newProductsByCategory.data);
      } else {
        setProductsByCategory(undefined);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeCommerce = async (e) => {
    e.preventDefault();

    try {
      if (e.target.value !== "null") {
        const newProductsByCommerce = await getProductsByCommerce(
          e.target.value
        );
        setProductsByCommerce(newProductsByCommerce.data);
      } else {
        setProductsByCommerce(undefined);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Row className="p-5">
        <Col>
          <FormGroup>
            <Label for="commerce">Categorías:</Label>
            <Input
              onChange={onChangeCategory}
              id="category"
              name="category"
              type="select"
            >
              <option value="null">-----</option>
              {categoryList.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.description}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="commerce">Comercios:</Label>
            <Input
              onChange={onChangeCommerce}
              id="commerce"
              name="commerce"
              type="select"
            >
              <option value="null">-----</option>
              {commerceList.map((commerce) => (
                <option key={commerce._id} value={commerce._id}>
                  {commerce.description}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row className="p-5">
        {productList.map((product) => (
          <Col xs={3}>
            <Card>
              <img alt="Card" src={product.image} />
              <CardBody>
                <CardTitle tag="h5">{product.name}</CardTitle>
                <CardText>{product.commerce.description}</CardText>
              </CardBody>
              <ListGroup flush>
                <ListGroupItem>Oferta: {product.currentValue}</ListGroupItem>
                <ListGroupItem>Descuento {product.discount}%</ListGroupItem>
                <ListGroupItem>
                  Precio anterior {product.previousValue}
                </ListGroupItem>
              </ListGroup>
              <CardBody>Categoría: {product.category.description}</CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
