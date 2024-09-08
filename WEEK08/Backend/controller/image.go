package controller

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"github.com/Martinnezsavemaiwai/config"
	"github.com/Martinnezsavemaiwai/entity"
	"github.com/gin-gonic/gin"
)

// ฟังก์ชันสำหรับอัปโหลดรูปภาพ
func UploadImage(c *gin.Context) {
	// รับค่า ProductID จาก form
	productID := c.PostForm("product_id")

	// ตรวจสอบและดึงไฟล์จากฟอร์ม
	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้างโฟลเดอร์อัปโหลดถ้ายังไม่มี
	uploadDir := "./uploads"
	if err := os.MkdirAll(uploadDir, os.ModePerm); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create upload directory"})
		return
	}

	// บันทึกไฟล์
	filename := filepath.Base(file.Filename)
	savePath := filepath.Join(uploadDir, filename)
	if err := c.SaveUploadedFile(file, savePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา Product จาก ID ที่ให้มา
	var product entity.Product
	result := config.DB().First(&product, productID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		return
	}

	// สร้างข้อมูลรูปภาพและบันทึกลงฐานข้อมูล
	var image entity.Image
	config.DB().Create(&image)

	c.JSON(http.StatusOK, gin.H{"message": "Image uploaded successfully"})
}

// ฟังก์ชันสำหรับดึงรูปภาพของสินค้า
func GetPictureByProductID(c *gin.Context) {
	productID := c.Param("id")

	// ค้นหารูปภาพที่เชื่อมกับ ProductID
	var images []entity.Image
	result := config.DB().Where("product_id = ?", productID).Find(&images)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	// สร้าง URL ของรูปภาพสำหรับแสดงผล
	for i := range images {
		images[i].FilePath = fmt.Sprintf("http://localhost:8000/uploads/%s", images[i].FileName)
	}

	c.JSON(http.StatusOK, images)
}