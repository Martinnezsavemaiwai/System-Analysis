package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/Martinnezsavemaiwai/config"
	"github.com/Martinnezsavemaiwai/entity"
)


//  สร้างสินค้า POST /product
func CreateProduct(c *gin.Context) {
	db := config.DB()

	var product entity.Product

	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := db.Create(&product).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": product})
}


//  แสดงรายการสินค้าทั้งหมด GET /products
func ListProducts(c *gin.Context) {
	var products []entity.Product

	db := config.DB()
	if err := db.Preload("Category").Preload("Brand").Preload("Images").Find(&products).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, products)
}

//  แสดงสินค้าตาม ID GET /Product/:id
func GetProductByID(c *gin.Context) {
	var product entity.Product
    id := c.Param("id") // รับค่า id จาก URL

    db := config.DB()
    
    // เพิ่มเงื่อนไขการค้นหา "id = ?" เพื่อค้นหาสินค้าที่มี id ที่ตรงกัน
    if err := db.Preload("Category").Preload("Brand").Preload("Images").First(&product, "id = ?", id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
        return
    }

    c.JSON(http.StatusOK, product)
}

//  อัปเดตข้อมูลสินค้า PATCH /product/:id
func UpdateProduct(c *gin.Context) {
	var product entity.Product
	id := c.Param("id")
	db := config.DB()

	// ค้นหาสินค้า
	if err := db.First(&product, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ID not found"})
		return
	}

	// ผูกข้อมูลที่อัปเดตกับ struct ของสินค้า
	var updatedProduct entity.Product
	if err := c.ShouldBindJSON(&updatedProduct); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// อัปเดตสินค้า
	if err := db.Model(&product).Updates(updatedProduct).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successfully"})
}


// ลบสินค้าตาม ID PATCH /product/:id
func DeleteProduct(c *gin.Context) {
    id := c.Param("id") // รับค่า id จาก URL
    
    db := config.DB()

    // ลบสินค้าที่มี ID ตรงกับค่า id ที่ได้รับ
    if tx := db.Where("id = ?", id).Delete(&entity.Product{}); tx.RowsAffected == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Product not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Deleted successfully"})
}



