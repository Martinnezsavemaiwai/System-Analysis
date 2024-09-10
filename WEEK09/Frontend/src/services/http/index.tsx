import { ImageInterface } from "../../interfaces/IImage";
import { ProductInterface } from "../../interfaces/IProduct";

export const apiUrl = "http://localhost:8000";

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

async function ListProducts() {
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


async function UpdateProduct(id: number | undefined, data: ProductInterface) {
    if (id === undefined) {
        throw new Error("Product ID is required");
    }

    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };


        const response = await fetch(`${apiUrl}/products/${id}`, requestOptions);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
        }

        return await response.json();
}


async function DeleteProductByID(id: Number | undefined) {
    const requestOptions = {
        method: "DELETE"
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

async function ListImages() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/images`, requestOptions)
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

async function CreateImage(formData: FormData,id: Number | undefined) {
    const requestOptions = {
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      body: formData,
    };
  
    let res = await fetch(`${apiUrl}/product-image/${id}`, requestOptions).then(
      (res) => {
        if (res.status == 201) {
          return res.json();
        } else {
          return false;
        }
      }
    );
  
    return res;
  }

async function UpdateImage(formData: FormData,id: Number | undefined) {
    const requestOptions = {
      method: "PATCH",
      // headers: { "Content-Type": "application/json" },
      body: formData,
    };
  
    let res = await fetch(`${apiUrl}/product-image/${id}`, requestOptions).then(
      (res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          return false;
        }
      }
    );
  
    return res;
  }


  

export {
    CreateProduct,
    ListProducts,
    GetProductByID,
    UpdateProduct,
    DeleteProductByID,

    GetBrands,

    GetCategories,

    GetOwner,
    GetOwnerById,
    
    ListImages,
    GetImageByProductID,   
    CreateImage,
    UpdateImage
}