import React from 'react';
import { Form, Input, Button, Select, Upload, Layout, InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import './ProductFormPage.css'
import { Link } from 'react-router-dom';


const { Content } = Layout;
const { Option } = Select;

const ProductFormPage: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values:', values);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
      <Header />
      <div className="my-layout1">
        <Layout style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Content style={{ padding: '20px', maxWidth: '800px', width: '100%' }}>
            <div className="form-container" style={{ background: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{ category: 'notebook' }}
                style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
              >
                <Form.Item
                  name="productID"
                  label="Product ID"
                  rules={[{ required: true, message: 'Please input the Product ID!' }]}
                  style={{ flex: '0 0 48%' }}
                >
                  <Input placeholder="Enter Product ID" />
                </Form.Item>

                <Form.Item
                  name="productName"
                  label="Product Name"
                  rules={[{ required: true, message: 'Please input the Product Name!' }]}
                  style={{ flex: '0 0 48%' }}
                >
                  <Input placeholder="Enter Product Name" />
                </Form.Item>

                <Form.Item
                  name="description"
                  label="Description"
                  rules={[{ required: true, message: 'Please input the Description!' }]}
                  style={{ flex: '0 0 100%' }}
                >
                  <Input.TextArea placeholder="Enter Product Description" />
                </Form.Item>

                <Form.Item
                  name="price"
                  label="Price"
                  rules={[{ required: true, message: 'Please input the Price!' }]}
                  style={{ flex: '0 0 48%' }}
                >
                  <InputNumber 
                    placeholder="Enter Product Price" 
                    style={{ width: '100%' }} 
                    min={0} // 
                  />
                </Form.Item>

                <Form.Item
                  name="quality"
                  label="Quality"
                  rules={[{ required: true, message: 'Please input the Quality!' }]}
                  style={{ flex: '0 0 48%' }}
                >
                  <InputNumber
                   placeholder="Enter Product Quality" 
                   style={{ width: '100%' }} 
                    min={0}/>
                </Form.Item>

                <Form.Item
                  name="brand"
                  label="Brand"
                  rules={[{ required: true, message: 'Please select the Brand!' }]}
                  style={{ flex: '0 0 48%' }}
                >
                  <Select placeholder="Select Product Brand">
                    <Option value="asus">ASUS</Option>
                    <Option value="acer">ACER</Option>
                    <Option value="dell">DELL</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="category"
                  label="Category"
                  rules={[{ required: true, message: 'Please select the Category!' }]}
                  style={{ flex: '0 0 48%' }}
                >
                  <Select placeholder="Select Category">
                    <Option value="notebook">Notebook</Option>
                    <Option value="keyboard">Keyboard</Option>
                    <Option value="desktop">Desktop</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="images"
                  label="Images"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={[{ required: true, message: 'Please upload the product images!' }]}
                  style={{ flex: '0 0 100%' }}
                >
                  <Upload
                    name="images"
                    action="/upload.do"
                    listType="picture"
                    multiple
                    maxCount={6} 
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </Form.Item>
        
                <Form.Item style={{ width: '100%', textAlign: 'center' }}>
                  <Link to = '/'>
                  <button id='cancel-bt'>
                    Cancel
                  </button>
                  </Link>

                    <button id='submit-bt'>
                      Submit
                    </button>
       
                </Form.Item>
              </Form>
            </div>
          </Content>
        </Layout>
      </div>
    </>
  );
};

export default ProductFormPage;
