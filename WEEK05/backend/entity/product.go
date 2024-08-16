package entity

import "gorm.io/gorm"

type Product struct {

   gorm.Model

   P_NAME string

   Description  string    

   PricePerPrice     float32   

   Stock       uint

   // CategoryID ทำหน้าที่เป็น Foreign Key
   CategoryID  *uint 
   Category Category `gorm:"foreignKey:CategoryID"`

   // BrandID ทำหน้าที่เป็น Foreign Key
   BrandID *uint 
   Brand Brand `gorm:"foreignKey:BrandID"`
}
