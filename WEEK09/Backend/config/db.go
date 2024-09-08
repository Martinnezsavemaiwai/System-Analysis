package config

import (
	"fmt"
	"io/ioutil"

	"github.com/Martinnezsavemaiwai/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("ITShop.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect to database")
	}
	fmt.Println("connected database")
	db = database
}

func SetupDatabase() {

	db.AutoMigrate(
		&entity.Product{},
		&entity.Brand{},
		&entity.Category{},
		&entity.Owner{},
		&entity.Image{},
	)

	hashedPassword, _ := HashPassword("123456")
	owner := &entity.Owner{
		Prefix:    "Mr.",
		FirstName: "Martin",
		LastName:  "Panchiangsri",
		AdminRole: "Owner",
		Email:     "martin@gmail.com",
		Password:  hashedPassword,
	}

	db.FirstOrCreate(owner, &entity.Owner{
		Email: owner.Email,
	})

	ownerID := uint(1)
	categories := []*entity.Category{
		{
			CategoryName: "NoteBook",
			OwnerID:      ownerID,
		},
		{
			CategoryName: "SmartTV",
			OwnerID:      ownerID,
		},
		{
			CategoryName: "Smartphone",
			OwnerID:      ownerID,
		},
	}
	for _, category := range categories {
		db.FirstOrCreate(category, &entity.Category{
			CategoryName: category.CategoryName,
		})
	}

	brands := []*entity.Brand{
		{
			BrandName: "ASUS",
		},
		{
			BrandName: "LENOVO",
		},
		{
			BrandName: "DELL",
		},
		{
			BrandName: "ACER",
		},
		{
			BrandName: "SUMSUNG",
		},
	}
	for _, brand := range brands {
		db.FirstOrCreate(brand, &entity.Brand{
			BrandName: brand.BrandName,
		})
	}

	categoryID := uint(1)
	brandID := uint(1)
	Product := entity.Product{
		ProductName:   "NOTEBOOK (โน้ตบุ๊ค) ASUS TUF GAMING F15 FX507ZC4-HN087W",
		Description:   "แบรนด์:ASUS|รหัสสินค้า:SKU-16696",
		PricePerPrice: 28990.00,
		Stock:         10,
		CategoryID:    categoryID,
		BrandID:       brandID,
	}

	db.FirstOrCreate(&Product, &entity.Product{
		ProductName: "NOTEBOOK (โน้ตบุ๊ค) ASUS TUF GAMING F15 FX507ZC4-HN087W",
	})

	// Create Image Product
	for i:=uint(1); i<=7 ;i++{
		dir := fmt.Sprintf("images/product/product%d", i)
		count := countFilesInDir(dir)
		for j:=1 ; j<=count ; j++ {
			filePath := fmt.Sprintf("images/product/product%d/p0%d.jpg", i, j)
			err := createImage(filePath, i)
			if err != nil {
				panic(err)
			}
		}
	}

}

func createImage(filePath string, id uint) error {

    image := entity.Image{FilePath: filePath, ProductID: id}

	if err := db.Where("file_path = ?", &image.FilePath).FirstOrCreate(&image).Error; err != nil {
        return err
    }
    return nil
}


func countFilesInDir(dir string) (int) {
    files, err := ioutil.ReadDir(dir)
    if err != nil {
        return 0
    }

    fileCount := 0
    for _, file := range files {
        if !file.IsDir() {
            fileCount++
        }
    }

    return fileCount
}

