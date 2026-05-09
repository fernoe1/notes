package model

type Person struct {
	Name        string `gorm:"primaryKey"`
	Title       string
	Description string
}
