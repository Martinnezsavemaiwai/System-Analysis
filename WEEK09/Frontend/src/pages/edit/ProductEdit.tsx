import { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Layout, InputNumber, message } from 'antd';
import { useParams, Link } from 'react-router-dom';
import { CategoryInterface } from '../../interfaces/ICategory';
import { ProductInterface } from '../../interfaces/IProduct';
import { GetProductByID, UpdateProduct, GetBrands, GetCategories, UpdateImage } from '../../services/http';
import { BrandInterface } from '../../interfaces/IBrand';
import Header from '../../components/Header';
import { Content } from 'antd/es/layout/layout';
import '../../stylesheet/ProductFormPage.css';

const { Option } = Select;

function ProductEdit() {
  const { id } = useParams<{ id: string }>(); // Get product ID from the route
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [brands, setBrands] = useState<BrandInterface[]>([]);
  const [product, setProduct] = useState<ProductInterface | null>(null);
  const [form] = Form.useForm();

  // Fetch product data by ID
  const fetchProduct = async () => {
    const res = await GetProductByID(Number(id));
    if (res) {
      setProduct(res);
      form.setFieldsValue(res); // Populate form with product data
    }
  };

  // Fetch brands and categories
  const getBrands = async () => {
    const res = await GetBrands();
    if (res) {
      setBrands(res);
    }
  };

  const getCategories = async () => {
    const res = await GetCategories();
    if (res) {
      setCategories(res);
    }
  };

  // Handle image change
  const handleImageChange = (e: any) => {
    const file = e.target.files;
    setImages(file);
  };

  // Handle form submit
  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      const updatedProduct: ProductInterface = {
        ...product,
        ProductName: values.ProductName,
        Description: values.Description,
        PricePerPiece: values.PricePerPiece,
        Stock: values.Stock,
        BrandId: values.BrandId,
        CategoryId: values.CategoryId,
      };

      const res = await UpdateProduct(Number(id), updatedProduct);
      console.log('Product update response:', res);


      if (images.length > 0) {
        const formData = new FormData();
        for (const image of images) {
          formData.append('image', image);
        }
        await UpdateImage(formData, Number(id));
      }

      if (res) {
        messageApi.open({
          type: 'success',
          content: 'Product updated successfully',
        });
      } else {
        messageApi.open({
          type: 'error',
          content: 'Error occurred while updating product!',
        });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      messageApi.open({
        type: 'error',
        content: 'Server connection error!',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBrands();
    getCategories();
    fetchProduct();
  }, [id]);

  return (
    <>
      {contextHolder}
      <Header />
      <div className="my-layout1">
        <Layout
          style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Content
            style={{
              padding: '20px',
              maxWidth: '800px',
              width: '100%',
            }}
          >
            <div
              className="form-container"
              style={{
                background: '#fff',
                padding: '40px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}
              >
                <Form.Item
                  name="ProductName"
                  label="Product Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the Product Name!',
                    },
                  ]}
                  style={{ flex: '0 0 48%' }}
                >
                  <Input placeholder="Enter Product Name" />
                </Form.Item>

                <Form.Item
                  name="Description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the Description!',
                    },
                  ]}
                  style={{ flex: '0 0 100%' }}
                >
                  <Input.TextArea placeholder="Enter Product Description" />
                </Form.Item>

                <Form.Item
                  name="PricePerPiece"
                  label="Price"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the Price!',
                    },
                  ]}
                  style={{ flex: '0 0 48%' }}
                >
                  <InputNumber
                    placeholder="Enter Product Price"
                    style={{ width: '100%' }}
                    min={0}
                  />
                </Form.Item>

                <Form.Item
                  name="Stock"
                  label="Quantity"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the Quantity!',
                    },
                  ]}
                  style={{ flex: '0 0 48%' }}
                >
                  <InputNumber
                    placeholder="Enter Product Quantity"
                    style={{ width: '100%' }}
                    min={0}
                  />
                </Form.Item>

                <Form.Item
                  name="BrandId"
                  label="Brand"
                  rules={[
                    {
                      required: true,
                      message: 'Please select the Brand!',
                    },
                  ]}
                  style={{ flex: '0 0 48%' }}
                >
                  <Select allowClear placeholder="Select Product Brand">
                    {brands.map((item) => (
                      <Option value={item.ID} key={item.BrandName}>
                        {item.BrandName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="CategoryId"
                  label="Category"
                  rules={[
                    {
                      required: true,
                      message: 'Please select the Category!',
                    },
                  ]}
                  style={{ flex: '0 0 48%' }}
                >
                  <Select allowClear placeholder="Select Category">
                    {categories.map((item) => (
                      <Option value={item.ID} key={item.CategoryName}>
                        {item.CategoryName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="Picture"
                  label="Images"
                  style={{ flex: '0 0 100%' }}
                >
                  <input type="file" className="input-file" multiple onChange={handleImageChange} />
                </Form.Item>

                <Form.Item
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  <Link to="/">
                    <Button id="cancel-bt" type="default">
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    id="submit-bt"
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                  >
                    Update
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Content>
        </Layout>
      </div>
    </>
  );
}

export default ProductEdit;
