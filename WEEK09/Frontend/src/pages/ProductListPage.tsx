// import React, { useState, useEffect } from 'react';
// import { Table, Layout, message, Spin, Button, Modal } from 'antd';
// import { ColumnType } from 'antd/es/table';
// import { Link } from 'react-router-dom';
// import Header from "../components/Header";
// import NavBar from "../components/NavBar";
// import Bottom from "../components/Bottom";
// import '../stylesheet/ProductListPage.css';
// import { ProductInterface } from "../interfaces/IProduct";
// import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
// import {
//     GetProducts,
//     DeleteProductByID,
//     GetImageByProductID
// } from '../services/http/index';
// import { ImageInterface } from '../interfaces/IImage';

// const { Content } = Layout;



// const ProductListPage: React.FC = () => {
//     const [products, setProducts] = useState<ProductInterface[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [pageSize] = useState<number>(10);
//     const [totalProducts, setTotalProducts] = useState<number>(0);
//     const [images, setImages] = useState<ImageInterface[]>([]);

//     useEffect(() => {
//         fetchProducts();
//     }, [currentPage]);

//     const fetchProducts = async () => {
//         try {
//             setLoading(true);
//             const response = await GetProducts();
//             console.log('API Response:', response); // Log the response
//             if (response) {
//                 const productsWithKeys = response.products.map((product: { ID: any; }) => ({
//                     ...product,
//                     key: product.ID,
//                 }));
//                 setProducts(productsWithKeys);
//                 setTotalProducts(response.total);
//             } else {
//                 message.error('Failed to load products. Please try again later.');
//             }
//         } catch (error) {
//             console.error('Failed to fetch products:', error); // Log the error
//             message.error('Failed to load products. Please try again later.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handlePageChange = (page: number) => {
//         setCurrentPage(page);
//     };

//     const formatPrice = (price: number) => {
//         return new Intl.NumberFormat('th-TH').format(price) + ' ฿';
//     };

//     const columns: ColumnType<ProductInterface>[] = [
//         {
//             title: 'Product',
//             dataIndex: 'ID',
//             key: 'ID',
//             align: 'center',
//         },
//         {
//             title: 'Image',
//             dataIndex: 'ID',
//             key: 'Image',
//             align: 'center',
//             render: (id: number) => {
//               // Find the first picture with a matching ProductID
//               const productImage = images.find((image) => image.ProductID === id);          
//               return (
//                 <div style={{ display: 'flex', justifyContent: 'center' }}>
//                   {productImage ? (
//                     <img
//                       src={productImage.FilePath} 
//                       alt="Product"
//                       style={{ maxWidth: '100px', width: '100%' }}
//                       onError={(e) => {
//                         e.currentTarget.src = '/path/to/default-image.png';
//                       }}
//                     />
//                   ) : (
//                     <img
//                       src="/path/to/default-image.png"
//                       alt="Default"
//                       style={{ maxWidth: '100px', width: '100%' }}
//                     />
//                   )}
//                 </div>
//               );
//             },
//           },
          
          
//         {
//             title: 'Name',
//             dataIndex: 'ProductName',
//             key: 'Name',
//             align: 'center',
//         },
//         {
//             title: 'Price',
//             dataIndex: 'PricePerPrice',
//             key: 'Price',
//             render: (price: number) => formatPrice(price),
//             align: 'center',
//         },
//         {
//             title: 'Category',
//             dataIndex: 'Category',
//             key: 'Category',
//             render: (category) => category?.CategoryName || 'N/A',
//             align: 'center',
//         },
//         {
//             title: 'Brand',
//             dataIndex: 'Brand',
//             key: 'Brand',
//             render: (brand) => brand?.BrandName || 'N/A',
//             align: 'center',
//         },
//         {
//             title: 'Stock',
//             dataIndex: 'Stock',
//             key: 'Stock',
//             align: 'center',
//         },
//         {
//             title: 'Action',
//             key: 'action',
//             align: 'center',
//             render: (_, record: ProductInterface) => (
//                 <div>
//                     <Link to={`/Product/Edit/${record.ID}`}>
//                         <Button
//                             icon={<EditOutlined />}
//                             size={"large"}
//                             shape="circle"
//                             style={{ marginRight: 8 }}
//                         />
//                     </Link>

//                     <Button
//                         onClick={() => showModal(record)}
//                         style={{ marginLeft: 10 }}
//                         shape="circle"
//                         icon={<DeleteOutlined />}
//                         size={"large"}
//                         danger
//                     />
//                 </div>
//             ),
//         },
//     ];

//     const [messageApi, contextHolder] = message.useMessage();
//     const [open, setOpen] = useState<boolean>(false);
//     const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
//     const [modalText, setModalText] = useState<string>();
//     const [deleteId, setDeleteId] = useState<number | undefined>(undefined);

//     const showModal = (val: ProductInterface) => {
//         setModalText(
//             `คุณต้องการลบสินค้าที่มีชื่อว่า "${val.ProductName}" หรือไม่ ?`
//         );
//         setDeleteId(val.ID);
//         setOpen(true);
//     };

//     const handleOk = async () => {
//         if (deleteId === undefined) {
//             messageApi.open({
//                 type: "error",
//                 content: "ไม่สามารถลบสินค้าได้ กรุณาลองอีกครั้ง",
//             });
//             setOpen(false);
//             return;
//         }
//         setConfirmLoading(true);
//         try {
//             const res = await DeleteProductByID(deleteId);
//             if (res) {
//                 setOpen(false);
//                 messageApi.open({
//                     type: "success",
//                     content: "ลบข้อมูลสำเร็จ",
//                 });
//                 fetchProducts(); // Refresh the product list
//             } else {
//                 throw new Error("Failed to delete product");
//             }
//         } catch (error) {
//             console.error('Failed to delete product:', error);
//             messageApi.open({
//                 type: "error",
//                 content: "เกิดข้อผิดพลาดในการลบสินค้า กรุณาลองอีกครั้ง",
//             });
//         } finally {
//             setConfirmLoading(false);
//         }
//     };

//     const handleCancel = () => {
//         setOpen(false);
//     };

//     return (
//         <>
//             {contextHolder}
//             <Header />
//             <div className="my-layout" style={{ color: "#F6F9FC" }}>
//                 <Layout>
//                     <NavBar />
//                     <Content style={{ padding: '0 20px', marginTop: '20px' }}>
//                         <Spin spinning={loading}>
//                             <Table
//                                 dataSource={products}
//                                 columns={columns}
//                                 pagination={false}
//                                 bordered
//                                 style={{ textAlign: 'center', overflowX: 'auto' }}
//                             />
//                         </Spin>
//                         <Bottom
//                             currentPage={currentPage}
//                             totalProducts={totalProducts}
//                             pageSize={pageSize}
//                             onPageChange={handlePageChange}
//                         />
//                     </Content>
//                 </Layout>
//             </div>
//             <Modal
//                 title="ลบสินค้า ?"
//                 open={open}
//                 onOk={handleOk}
//                 confirmLoading={confirmLoading}
//                 onCancel={handleCancel}
//             >
//                 <p>{modalText}</p>
//             </Modal>
//         </>
//     );
// };

// export default ProductListPage;
