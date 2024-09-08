package main

import (
	"net/http"

	"github.com/Martinnezsavemaiwai/config"
	"github.com/Martinnezsavemaiwai/controller"
	"github.com/gin-gonic/gin"
)

const PORT = "8000"

func main() {
	config.ConnectionDB()

	config.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())

	router := r.Group("")
	{
		// Product Routes
		router.GET("/products", controller.ListProducts)
		router.GET("/product/:id", controller.GetProduct)
		router.POST("/products", controller.CreateProduct)
		router.PATCH("/products", controller.UpdateProduct)
		router.PATCH("/product/:id", controller.DeleteProduct)

		// Brand Routes
		router.GET("/brands", controller.ListBrands)

		// Category Routes
		router.GET("/categories", controller.ListCategories)

		// Owner Routes
		router.GET("/owners", controller.ListOwner)

		// Image Routes
		// กำหนด endpoint สำหรับการอัปโหลดและแสดงรูปภาพ
		router.POST("/upload", controller.UploadImage)
		router.GET("/products/:id/images", controller.GetPictureByProductID)
		// ทำให้สามารถเข้าถึงไฟล์ที่อยู่ในโฟลเดอร์ uploads ผ่าน URL ได้โดยตรง
		router.Static("/uploads", "./uploads")

	}

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})

	// Run the server

	r.Run("localhost:" + PORT)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
