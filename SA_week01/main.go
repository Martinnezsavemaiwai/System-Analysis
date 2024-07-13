package main

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type StudentInformation struct {
	gorm.Model
	StudentID string
	Name      string
	Team      string
}

func main() {
	db, err := gorm.Open(sqlite.Open("Students.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(&StudentInformation{})

	// Create
	db.Create(&StudentInformation{StudentID: "B6525279", Name: "มาติน", Team: "G06"})

	// Read
	var st_in StudentInformation
	db.First(&st_in, 1) // find product with integer primary key
	db.First(&st_in, "student_id = ?", "B6525279")
}
