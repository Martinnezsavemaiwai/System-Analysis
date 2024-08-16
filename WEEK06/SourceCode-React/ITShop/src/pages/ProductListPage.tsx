import Header from "../components/Header";
import './ProductListPage.css'
import React from 'react';
import { Table, Layout} from 'antd';
import {MoreOutlined} from '@ant-design/icons';
import { ColumnType } from 'antd/es/table';
import NavBar from "../components/NavBar";
import Bottom from "../components/Bottom";

const {Content } = Layout;

interface Product {
    key: string;
    id: string;
    name: string;
    price: string;
    category: string;
    brand: string;
    stock: number;
    image: string;
}


const ProductListPage: React.FC = () => {
    const dataSource: Product[] = [
        {
            key: '1',
            id: 'P4001',
            name: 'NOTEBOOK (โน้ตบุ๊ค) ASUS TUF GAMING F15 FX507ZC4-HN072W (MECHA GRAY) (2Y)',
            price: '23,999.00',
            category: 'NOTEBOOK',
            brand: 'ASUS',
            stock: 9,
            image: './images/product/p01.jpg',
        },
        {
            key: '2',
            id: 'P4002',
            name: 'NOTEBOOK (โน้ตบุ๊ค) HP 15-FC0055AU (NATURAL SILVER) (2Y)',
            price: '11,490.00',
            category: 'NOTEBOOK',
            brand: 'HP',
            stock: 32,
            image: './images/product/p-02.jpg',
        },
        {
            key: '3',
            id: 'P4003',
            name: 'NOTEBOOK (โน้ตบุ๊ค) ACER NITRO V 15 ANV15-51-578S (OBSIDIAN BLACK)',
            price: '22,990.00',
            category: 'NOTEBOOK',
            brand: 'ACER',
            stock: 50,
            image: './images/product/p-03.jpg',
        },
        {
            key: '4',
            id: 'P4004',
            name: 'NOTEBOOK (โน้ตบุ๊ค) DELL INSPIRON G15-OGN553550001GTH-G15-DS-W (DARK SHADOW GRAY) (2Y)',
            price: '28,990.00',
            category: 'NOTEBOOK',
            brand: 'DELL',
            stock: 16,
            image: './images/product/p-04.jpg',
        },
        {
            key: '5',
            id: 'P4005',
            name: 'NOTEBOOK (โน้ตบุ๊ค) LENOVO LOQ 15IAX9 83GS00CPTA (LUNA GREY) (3Y)',
            price: '26,990.00',
            category: 'NOTEBOOK',
            brand: 'LENOVO',
            stock: 24,
            image: './images/product/p-05.jpg',
        },

        {
            key: '1',
            id: 'P4001',
            name: 'NOTEBOOK (โน้ตบุ๊ค) ASUS TUF GAMING F15 FX507ZC4-HN072W (MECHA GRAY) (2Y)',
            price: '23,999.00',
            category: 'NOTEBOOK',
            brand: 'ASUS',
            stock: 9,
            image: './images/product/p01.jpg',
        },
        {
            key: '2',
            id: 'P4002',
            name: 'NOTEBOOK (โน้ตบุ๊ค) HP 15-FC0055AU (NATURAL SILVER) (2Y)',
            price: '11,490.00',
            category: 'NOTEBOOK',
            brand: 'HP',
            stock: 32,
            image: './images/product/p-02.jpg',
        },
        {
            key: '3',
            id: 'P4003',
            name: 'NOTEBOOK (โน้ตบุ๊ค) ACER NITRO V 15 ANV15-51-578S (OBSIDIAN BLACK)',
            price: '22,990.00',
            category: 'NOTEBOOK',
            brand: 'ACER',
            stock: 50,
            image: './images/product/p-03.jpg',
        },
        {
            key: '4',
            id: 'P4004',
            name: 'NOTEBOOK (โน้ตบุ๊ค) DELL INSPIRON G15-OGN553550001GTH-G15-DS-W (DARK SHADOW GRAY) (2Y)',
            price: '28,990.00',
            category: 'NOTEBOOK',
            brand: 'DELL',
            stock: 16,
            image: './images/product/p-04.jpg',
        },
        {
            key: '5',
            id: 'P4005',
            name: 'NOTEBOOK (โน้ตบุ๊ค) LENOVO LOQ 15IAX9 83GS00CPTA (LUNA GREY) (3Y)',
            price: '26,990.00',
            category: 'NOTEBOOK',
            brand: 'LENOVO',
            stock: 24,
            image: './images/product/p-05.jpg',
        },
    ];

    const columns: ColumnType<Product>[] = [
        {
            title: 'Product',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            align: 'center',
            render: (image: string) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={image} alt="Product" style={{ maxWidth: '100px', width: '100%' }} />
                </div>
            ),
            responsive: ['sm', 'md', 'lg'],
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            responsive: ['md', 'lg'],
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            responsive: ['md', 'lg'],
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            align: 'center',
            responsive: ['md', 'lg'],
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
            align: 'center',
            responsive: ['md', 'lg'],
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
            align: 'center',
            responsive: ['md', 'lg'],
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: () => (
                <>
                    <MoreOutlined />
                </>
            ),
            responsive: ['xs', 'sm', 'md', 'lg'],
        },
    ];

    return (
        <>
        <Header />
        <div className="my-layout" style={{color:"#F6F9FC"}}>
            <Layout>
                <NavBar />  
                <Content style={{ padding: '0 20px', marginTop: '20px' }}>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        bordered
                        style={{ textAlign: 'center', overflowX: 'auto' }}
                    />
                    <Bottom />
                    
                </Content>
            </Layout>
        </div>
        
        </>
        
    );
};

export default ProductListPage;
