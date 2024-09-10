import  { useEffect, useState } from 'react';
import { Table, Button, Modal, message, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { ProductInterFace } from '../../Interfaces/IProduct';
import { ImageInterface } from '../../Interfaces/IImage';
import { apiUrl, DeleteProductByID, GetProduct, ListImages } from '../../services/http';
import '../../components/ProductMangement/ProductFormPage.css';
import Header from '../../components/ProductMangement/Header';
import Layout, { Content } from 'antd/es/layout/layout';
import NavBar from '../../components/ProductMangement/NavBar';
function ProductList() {
    const navigate = useNavigate();
    const [products, setProducts] = useState<ProductInterFace[]>([]);
    const [images, setImages] = useState<ImageInterface[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState<string>("");
    const [deleteId, setDeleteId] = useState<number | undefined>();

    const getProducts = async () => {
        const resProduct = await GetProduct();
        if (resProduct) {
            setProducts(resProduct);
        }

        const resImage = await ListImages();
        if (resImage) {
            setImages(resImage);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('th-TH').format(price) + ' ฿';
    };

    const handleEdit = (id: number) => {
        navigate(`/Product/Edit/${id}`);
    };

    const handleDelete = (id: number) => {
        const product = products.find(p => p.ID === id);
        setModalText(`คุณต้องการลบสินค้าชื่อ "${product?.ProductName}" หรือไม่ ?`);
        setDeleteId(id);
        setModalVisible(true);
    };

    const handleOk = async () => {
        if (deleteId === undefined) {
            message.error("Invalid product ID.");
            return;
        }

        setConfirmLoading(true);
        try {
            const res = await DeleteProductByID(deleteId);
            if (res) {
                setModalVisible(false);
                message.success("ลบข้อมูลสำเร็จ");
                getProducts();
            } else {
                message.error("เกิดข้อผิดพลาด !");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            message.error("Error deleting product.");
        }
        setConfirmLoading(false);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const columns: ColumnsType<ProductInterFace> = [
        {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
            align: 'center',
        },
        {
            title: 'Image',
            dataIndex: 'Image',
            key: 'Image',
            align: 'center',
            render: (image: ImageInterface) => (
                <img src={`${apiUrl}/${image?.FilePath}`} alt="Product" style={{ maxWidth: '100px', height: 'auto' }} />
            ),
        },
        {
            title: 'Product Name',
            dataIndex: 'ProductName',
            key: 'ProductName',
            align: 'center',
        },
        {
            title: 'Price',
            dataIndex: 'PricePerPiece',
            key: 'Price',
            align: 'center',
            render: (price: number) => formatPrice(price),
        },
        {
            title: 'Stock',
            dataIndex: 'Stock',
            key: 'Stock',
            align: 'center',
        },
        {
            title: 'Brand',
            dataIndex: 'Brand',
            key: 'Brand',
            align: 'center',
            render: (brand) => brand?.BrandName || 'N/A',
        },
        {
            title: 'Category',
            dataIndex: 'Category',
            key: 'Category',
            align: 'center',
            render: (category) => category?.CategoryName || 'N/A',
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (text, record: ProductInterFace) => (
                <Space size="middle">
                    <Button onClick={() => handleEdit(record?.ID ?? 0)} type="primary">Edit</Button>
                    <Button onClick={() => handleDelete(record?.ID ?? 0)} type="default">Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <>
        <Header />
        <Layout className="my-layout1">
            <NavBar />
            <Content style={{ padding: '0 20px', marginTop: '20px' }}>
                <Table
                    dataSource={products}
                    columns={columns}
                    pagination={false}
                    bordered
                    rowKey="ID"
                    className="product-table"
                />
            </Content>
        </Layout>
        <Modal
            title="ยืนยันการลบสินค้า"
            open={modalVisible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <p>{modalText}</p>
        </Modal>
    </>
    );
}

export default ProductList;
