package controller

import (
	"net/http"

	"github.com/Martinnezsavemaiwai/config"
	"github.com/Martinnezsavemaiwai/entity"
	"github.com/gin-gonic/gin"
)

func ListOwner(c *gin.Context){
	var owners []entity.Owner

	db := config.DB()

	db.Find(&owners)

	c.JSON(http.StatusOK,&owners)

}