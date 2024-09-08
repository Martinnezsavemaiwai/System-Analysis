package entity

import "gorm.io/gorm"

type Image struct {
	gorm.Model

	FileName	string
	FilePath	string
	
	//FK
	ProductID *uint
	Product   Product `gorm:"foreignKey:ProductID"` 
}
