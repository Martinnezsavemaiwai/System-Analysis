package entity

import (
	"time"

	"gorm.io/gorm"
)


type Product struct {

   ID        string           `gorm:"primaryKey"`
   CreatedAt time.Time
   UpdatedAt time.Time
   DeletedAt gorm.DeletedAt `gorm:"index"`

   ProductName string

   Description  string    

   PricePerPrice     float32   

   Stock       uint


   // 1 Owner สามารถมีหลาย Category
   Pictures []Picture `gorm:"foreignKey:ProductID"`

   // CategoryID ทำหน้าที่เป็น Foreign Key
   CategoryID  *uint 
   Category Category `gorm:"foreignKey:CategoryID"`

   // BrandID ทำหน้าที่เป็น Foreign Key
   BrandID *uint 
   Brand Brand `gorm:"foreignKey:BrandID"`

}
