package entity

import "gorm.io/gorm"

type Picture struct {
	gorm.Model

	File  []byte
	
	//FK
	ProductID *uint `gorm:"type:varchar(255)"`
	Product   Product `gorm:"foreignKey:ProductID"` 
}
