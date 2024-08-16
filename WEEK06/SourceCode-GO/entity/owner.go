package entity

import "gorm.io/gorm"

type Owner struct {
   
   gorm.Model

   FirstName string   

   LastName  string  

   AdminRole string

   Email     string

   Password  string

  
   // 1 Owner สามารถมีหลาย Category
   Categories []Category `gorm:"foreignKey:OwnerID"`
}
