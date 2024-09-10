import Table, { ColumnsType } from "antd/es/table";
import { ProductInterface } from "../interfaces/IProduct";
import { Layout, message, Modal, Space } from "antd";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { apiUrl, DeleteProductByID, ListProducts, ListImages, } from "../services/http";
import '../stylesheet/ProductListPage.css';
import { ImageInterface } from "../interfaces/IImage";


function ProductList() {
    const navigate = useNavigate();
    const [images, setImage] = useState<ImageInterface[]>([]);
    
    const imageUrl = images.length>0 ? `${apiUrl}/${images[0].FilePath}` : ""

    console.log(imageUrl)
    
    const columns: ColumnsType<ProductInterface> = [

        {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
            align: 'center',

        },

        // {
        //     title: 'Image',
        //     dataIndex: 'Image',
        //     key: 'Image',
        //     render: (image) => <img src={`${apiUrl}/${image?.FilePath}`} alt="image" width={100} height={100} />,
        //     align: 'center',

        // },

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
            render: (price: number | undefined) => price ? formatPrice(price) : 'N/A',            
            align: 'center',

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
            render: (brand) => brand?.BrandName || 'N/A',
            align: 'center',
        },
        {
            title: 'Category',
            dataIndex: 'Category',
            key: 'Category',
            render: (category) => category?.CategoryName || 'N/A',
            align: 'center',

        },
        {
            title: 'Action',
            key: 'action',
            render: (record: ProductInterface) => (
                <Space size="middle">
                    <a onClick={() => navigate(`/Product/Edit/${record.ID}`)}>Edit</a>
                    <a onClick={() => showModal(record)}>Delete</a> 
                </Space>
            ),
            align: 'center',
        },
    ];

    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [messageApi, contextHolder] = message.useMessage();

    // Modal state
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState<string>("");
    const [deleteId, setDeleteId] = useState<number>();

    const getProducts = async () => {
        let resProduct = await ListProducts();
        if (resProduct) {
            setProducts(resProduct);
        }

        let resImage = await ListImages();
        if (resImage) {
            setImage(resImage);
        }
    };



    const showModal = (val: ProductInterface) => {
        setModalText(`คุณต้องการลบสินค้าชื่อ "${val.ProductName}" หรือไม่ ?`);
        setDeleteId(val.ID);
        setOpen(true);
    };

     const handleOk = async () => {
        if (deleteId === undefined) {
            messageApi.open({
                type: "error",
                content: "Invalid product ID.",
            });
            return;
        }
        
        setConfirmLoading(true);
        try {
            let res = await DeleteProductByID(deleteId);
            if (res) {
                setOpen(false);
                messageApi.open({
                    type: "success",
                    content: "ลบข้อมูลสำเร็จ",
                });
                getProducts();
            } else {
                messageApi.open({
                    type: "error",
                    content: "เกิดข้อผิดพลาด !",
                });
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            messageApi.open({
                type: "error",
                content: "Error deleting product.",
            });
        }
        setConfirmLoading(false);
    };


    const handleCancel = () => {
        setOpen(false);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('th-TH').format(price) + ' ฿';
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>       
            {contextHolder}
            <Header />
            <div className="my-layout" style={{ color: "#F6F9FC" }}>
                <Layout>
                    <NavBar />
                    <Content style={{ padding: '0 20px', marginTop: '20px' }}>
                        <Table
                            dataSource={products}
                            columns={columns}
                            pagination={false}
                            bordered
                            style={{ textAlign: 'center', overflowX: 'auto' }}
                            rowKey="ID" 
                        />
                    </Content>
                </Layout>
                <Modal
                    title="ยืนยันการลบสินค้า"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <p>{modalText}</p>
                </Modal>
            </div>
            <img src="http://localhost:8000/images\product\product9\proDUCK1.jpg" alt="" />
        </>
    );
}

export default ProductList;
