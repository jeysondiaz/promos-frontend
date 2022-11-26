import React, { useEffect, useState } from "react";
import {
  Form,
  Label,
  Input,
  FormGroup,
  Row,
  Col,
  Button,
  ButtonGroup,
} from "reactstrap";
import { createCommerce, getAllCommerce } from "../api/commerce";
import { createCategory, getAllCategories } from "../api/category";
import { createProduct } from "../api/product";
import { useNavigate } from "react-router-dom";

export default () => {
  const [commerceList, setCommerceList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const [isNewCommerce, setIsNewCommerce] = useState(false);
  const [newCommerce, setNewCommerce] = useState("");

  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    onGetData();
  }, []);

  const onGetData = async () => {
    try {
      const allCommerceList = await getAllCommerce();
      setCommerceList(allCommerceList.data);

      const allCategoryList = await getAllCategories();
      setCategoryList(allCategoryList.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onCreateCategory = () => {
    setIsNewCategory(!isNewCategory);
    setNewCategory("");
  };
  const onCreateNewCategory = async () => {
    try {
      if (newCategory.trim().length) {
        await createCategory(newCategory);
        onCreateCategory();
        onGetData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onCreateCommerce = () => {
    setIsNewCommerce(!isNewCommerce);
    setNewCommerce("");
  };

  const onCreateNewCommerce = async () => {
    try {
      if (newCommerce.trim().length) {
        await createCommerce(newCommerce);
        onCreateCommerce();
        onGetData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onSubmitProduct = async (e) => {
    e.preventDefault();

    try {
      const name = e.target.name.value;
      const previousValue = Number(e.target.previousValue.value);
      const discount = Number(e.target.discount.value);
      const category = e.target.category.value;
      const commerce = e.target.commerce.value;
      const finalDate = e.target.finalDate.value;

      const file = document.getElementById("image").files[0];
      const image = await toBase64(file);

      await createProduct({
        name,
        previousValue,
        currentValue: (1 - discount / 100) * previousValue,
        discount,
        category,
        commerce,
        finalDate,
        image,
      });

      navigate("/listadopromos");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="col-md-8 offset-md-2 mt-4">
      <div className="card card-body">
        <h4>Agrega Productos</h4>
        <p>Ingresa los datos del producto para añadirlo a encuentra promos</p>
        <Form onSubmit={onSubmitProduct}>
          <FormGroup>
            <Label for="name">Nombre del producto</Label>
            <Input required id="name" name="name" type="text" />
          </FormGroup>
          <Row>
            <Col md={5}>
              <FormGroup>
                <Label for="previousValue">Precio Anterior</Label>
                <Input
                  required
                  id="previousValue"
                  name="previousValue"
                  type="number"
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="discount">% Descuento</Label>
                <Input required id="discount" name="discount" type="number" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Label for="category">Categorías</Label>
              {!isNewCategory && (
                <FormGroup className="d-flex">
                  <Input required id="category" name="category" type="select">
                    {categoryList.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.description}
                      </option>
                    ))}
                  </Input>
                  <Button className="w-50" onClick={onCreateCategory}>
                    Crear categoría
                  </Button>
                </FormGroup>
              )}
              {isNewCategory && (
                <FormGroup className="d-flex">
                  <Input
                    onChange={(e) => setNewCategory(e.target.value)}
                    required
                    id="category"
                    type="text"
                  />
                  <ButtonGroup>
                    <Button onClick={onCreateNewCategory}>Crear</Button>
                    <Button color="danger" onClick={onCreateCategory}>
                      X
                    </Button>
                  </ButtonGroup>
                </FormGroup>
              )}
            </Col>
            <Col sm={6}>
              <Label for="commerce">Tienda</Label>
              {!isNewCommerce && (
                <FormGroup className="d-flex">
                  <Input required id="commerce" name="commerce" type="select">
                    {commerceList.map((commerce) => (
                      <option key={commerce._id} value={commerce._id}>
                        {commerce.description}
                      </option>
                    ))}
                  </Input>
                  <Button className="w-50" onClick={onCreateCommerce}>
                    Crear tienda
                  </Button>
                </FormGroup>
              )}
              {isNewCommerce && (
                <FormGroup className="d-flex">
                  <Input
                    onChange={(e) => setNewCommerce(e.target.value)}
                    required
                    id="commerce"
                    type="text"
                  />
                  <ButtonGroup>
                    <Button onClick={onCreateNewCommerce}>Crear</Button>
                    <Button color="danger" onClick={onCreateCommerce}>
                      X
                    </Button>
                  </ButtonGroup>
                </FormGroup>
              )}
            </Col>
          </Row>
          <FormGroup>
            <Label for="finalDate">Fecha de final del descuento</Label>
            <Input
              id="finalDate"
              name="finalDate"
              placeholder="Fecha final"
              type="date"
            />
          </FormGroup>
          <FormGroup>
            <Label for="image">Foto</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/png, image/gif, image/jpeg"
            />
          </FormGroup>{" "}
          <Button type="submit">Publicar Producto</Button>
        </Form>
      </div>
    </div>
  );
};
