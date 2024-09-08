import { ImageInterface } from "../../interfaces/IImage";
import { ProductInterface } from "../../interfaces/IProduct";

const apiUrl = "http://localhost:8000";

async function CreateProduct(data: ProductInterface) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/products`, requestOptions)
        .then((res) => {
            if (res.status == 201) {
                return res.json();
            } else {
                return false;
            }
        });

    return res;
}

async function GetProducts() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/products`, requestOptions)
        .then((res) => {
            if (res.status == 200) {
                return res.json();
            } else {
                return false;
            }
        });

    return res;
}

async function GetProductByID(productID: number): Promise<ProductInterface | false> {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${apiUrl}/products/${productID}`, requestOptions);
        
        if (response.status === 200) {
            const productData: ProductInterface = await response.json();
            return productData;
        } else {
            console.error(`Failed to fetch product. Status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.error('An error occurred while fetching the product:', error);
        return false;
    }
}


async function UpdateProduct(data: ProductInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/products`, requestOptions)
        .then((res) => {
            if (res.status == 200) {
                return res.json();
            } else {
                return false;
            }
        });

    return res;
}


async function DeleteProductByID(id: Number | undefined) {
    const requestOptions = {
        method: "PATH"
    };

    let res = await fetch(`${apiUrl}/products/${id}`, requestOptions)
        .then((res) => {
            if (res.status == 200) {
                return true;
            } else {
                return false;
            }
        });

    return res;
}


async function GetBrands() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/brands`, requestOptions)
        .then((res) => {
            if (res.status == 200) {
                return res.json();
            } else {
                return false;
            }
        });

    return res;
}


async function GetCategories() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/categories`, requestOptions)
        .then((res) => {
            if (res.status == 200) {
                return res.json();
            } else {
                return false;
            }
        });

    return res;
}

async function GetOwner() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/owners`, requestOptions)
        .then((res) => {
            if (res.status == 200) {
                return res.json();
            } else {
                return false;
            }
        });     

    return res; 
}   

async function GetOwnerById(id: Number | undefined) {
    const requestOptions = {
        method: "GET"
    };

    let res = await fetch(`${apiUrl}/owners/${id}`, requestOptions)
        .then((res) => {
            if (res.status == 200) {
                return res.json();
            } else {
                return false;
            }
        });

    return res;
}

async function GetImageByProductID(id: Number | undefined) {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/images/${id}`, requestOptions)
        .then((res) => {
            if (res.status == 200) {
                return res.json();
            } else {
                return false;
            }
        });

    return res;
}

async function CreateImage(data: ImageInterface, productId: number) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };  

    let res = await fetch(`${apiUrl}/images/${productId}`, requestOptions)
        .then((res) => {
            if (res.status == 201) {
                return res.json();
            } else {
                return false;
            }
        });

    return res; 
}


  

export {
    CreateProduct,
    GetProducts,
    GetProductByID,
    UpdateProduct,
    DeleteProductByID,

    GetBrands,

    GetCategories,

    GetOwner,
    GetOwnerById,
    
    GetImageByProductID,   
    CreateImage
}