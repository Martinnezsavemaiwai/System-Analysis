import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Upload, Layout, InputNumber, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { CategoryInterface } from '../../interfaces/ICategory';
import { ProductInterface } from '../../interfaces/IProduct';
import { CreateProduct, GetBrands, GetCategories } from '../../services/http';
import { BrandInterface } from '../../interfaces/IBrand';
import Header from '../../components/Header';
import { Content } from 'antd/es/layout/layout';
import { UploadOutlined } from '@ant-design/icons';
import '../../stylesheet/ProductFormPage.css';
import { ImageInterface } from '../../interfaces/IImage';

const { Option } = Select;

function ProductCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [brands, setBrands] = useState<BrandInterface[]>([]);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      // Convert uploaded files to ImageInterface
      const images: ImageInterface[] = values.Picture?.map((file: any) => ({
        FileName: file.name,
        FilePath: file.url, // Ensure you handle file URL properly
      })) || [];

      const dataProduct: ProductInterface = {
        ProductName: values.ProductName,
        Description: values.Description,
        PricePerPrice: values.PricePerPrice,
        Stock: values.Stock,
        BrandId: values.BrandId,
        CategoryId: values.CategoryId,
        // Add images to the product data
      };

      let res = await CreateProduct(dataProduct);

      if (res) {
        messageApi.open({
          type: 'success',
          content: 'บันทึกข้อมูลสำเร็จ',
        });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        messageApi.open({
          type: 'error',
          content: 'เกิดข้อผิดพลาด !',
        });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      messageApi.open({
        type: 'error',
        content: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์',
      });
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    getBrands();
    getCategories();
  }, []);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

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
                  name="PricePerPrice"
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
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={[
                    {
                      required: true,
                      message: 'Please upload the product images!',
                    },
                  ]}
                  style={{ flex: '0 0 100%' }}
                >
                  <Upload
                    name="file"
                    listType="picture"
                    multiple
                    maxCount={6}
                    beforeUpload={(file) => {
                      const isJpgOrPng =
                        file.type === 'image/jpeg' ||
                        file.type === 'image/png';
                      if (!isJpgOrPng) {
                        messageApi.open({
                          type: 'error',
                          content: 'You can only upload JPG/PNG files!',
                        });
                        return Upload.LIST_IGNORE;
                      }
                      const isLt2M = file.size / 1024 / 1024 < 2;
                      if (!isLt2M) {
                        messageApi.open({
                          type: 'error',
                          content: 'Image must smaller than 2MB!',
                        });
                        return Upload.LIST_IGNORE;
                      }
                      return false;
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
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
                    Submit
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

export default ProductCreate;
