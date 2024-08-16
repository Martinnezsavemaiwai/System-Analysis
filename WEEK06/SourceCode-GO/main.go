package main

import (
	"github.com/Martinnezsavemaiwai/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {
	db, err := gorm.Open(sqlite.Open("ITShop.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(&entity.Product{}, &entity.Brand{}, &entity.Category{}, &entity.Owner{},&entity.Picture{})
}