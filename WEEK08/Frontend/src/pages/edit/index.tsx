import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Upload, Layout, InputNumber, message } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CategoryInterface } from '../../interfaces/ICategory';
import { ProductInterface } from '../../interfaces/IProduct';
import { UpdateProduct, GetProductByID, GetBrands, GetCategories } from '../../services/http';
import { BrandInterface } from '../../interfaces/IBrand';
import Header from '../../components/Header';
import { Content } from 'antd/es/layout/layout';
import { UploadOutlined } from '@ant-design/icons';
import '../../stylesheet/ProductFormPage.css';

const { Option } = Select;

function ProductEdit() {
    const { id } = useParams(); // Get the product ID from URL parameters
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [categories, setCategories] = useState<CategoryInterface[]>([]);
    const [brands, setBrands] = useState<BrandInterface[]>([]);
    const [product, setProduct] = useState<ProductInterface | null>(null);
    const [form] = Form.useForm();

    const fetchProductData = async () => {
        if (id) {
            const productID = parseInt(id); // Convert id to number
            const res = await GetProductByID(productID);
            if (res) {
                setProduct(res);
                form.setFieldsValue(res);
            }
        }
    };

    const onFinish = async (values: ProductInterface) => {
        if (id) {
            const updatedProduct: ProductInterface = {
                ...values,
                ID: parseInt(id), // Make sure 'id' is included in the ProductInterface
            };
    
            const res = await UpdateProduct(updatedProduct);
            console.log(res);
            if (res) {
                messageApi.open({
                    type: "success",
                    content: "บันทึกข้อมูลสำเร็จ",
                });
                setTimeout(() => {
                    navigate("/customer");
                }, 2000);
            } else {
                messageApi.open({
                    type: "error",
                    content: "เกิดข้อผิดพลาด !",
                });
            }
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
        fetchProductData();
        getBrands();
        getCategories();
    }, [id]);

    const normFile = (e: any) => {
        console.log('Upload event:', e);
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
                <Layout style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Content style={{ padding: '20px', maxWidth: '800px', width: '100%' }}>
                        <div className="form-container" style={{ background: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                                autoComplete="off"
                                style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
                            >
                                <Form.Item
                                    name="productID"
                                    label="Product ID"
                                    rules={[{ required: true, message: 'Please input the Product ID!' }]}
                                    style={{ flex: '0 0 48%' }}
                                >
                                    <Input placeholder="Enter Product ID" disabled />
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
                                        min={0}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="quantity"
                                    label="Quantity"
                                    rules={[{ required: true, message: 'Please input the Quantity!' }]}
                                    style={{ flex: '0 0 48%' }}
                                >
                                    <InputNumber
                                        placeholder="Enter Product Quantity"
                                        style={{ width: '100%' }}
                                        min={0}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="BrandID"
                                    label="Brand"
                                    rules={[{ required: true, message: 'Please select the Brand!' }]}
                                    style={{ flex: '0 0 48%' }}
                                >
                                    <Select allowClear placeholder="Select Product Brand">
                                        {brands.map((item) => (
                                            <Option value={item.ID} key={item.ID}>
                                                {item.BrandName}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="CategoryID"
                                    label="Category"
                                    rules={[{ required: true, message: 'Please select the Category!' }]}
                                    style={{ flex: '0 0 48%' }}
                                >
                                    <Select allowClear placeholder="Select Category">
                                        {categories.map((item) => (
                                            <Option value={item.ID} key={item.ID}>
                                                {item.CategoryName}
                                            </Option>
                                        ))}
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
                                    <Link to='/'>
                                        <Button id='cancel-bt' type="default">
                                            Cancel
                                        </Button>
                                    </Link>
                                    <Button id='submit-bt' type="primary" htmlType="submit">
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

export default ProductEdit;
