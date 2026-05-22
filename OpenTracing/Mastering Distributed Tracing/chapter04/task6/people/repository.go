package people

import (
	"chapter04/lib/model"
	"context"
	"database/sql"
	"log"

	opentracing "github.com/opentracing/opentracing-go"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

const dsn = "host=localhost user=postgres password=130924 dbname=postgres port=1987 sslmode=disable TimeZone=Asia/Shanghai"

type Repository struct {
	db *sql.DB
}

func NewRepository() *Repository {
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}
	db.AutoMigrate(&model.Person{})

	db.Create(&model.Person{
		Name:        "Temirlan",
		Title:       "Sapargali",
		Description: "Serikuly",
	})

	sqlDb, err := db.DB()
	if err != nil {
		log.Fatal(err)
	}

	return &Repository{
		db: sqlDb,
	}
}

func (r *Repository) GetPerson(
	ctx context.Context,
	name string,
) (model.Person, error) {
	query := "select title, description from people where name = $1"

	span, ctx := opentracing.StartSpanFromContext(
		ctx,
		"get-person",
		opentracing.Tag{Key: "db.statement", Value: query},
	)
	defer span.Finish()

	rows, err := r.db.QueryContext(ctx, query, name)
	if err != nil {

		return model.Person{}, err
	}
	defer rows.Close()

	for rows.Next() {
		var title, descr string
		err := rows.Scan(&title, &descr)
		if err != nil {

			return model.Person{}, err
		}

		return model.Person{
			Name:        name,
			Title:       title,
			Description: descr,
		}, nil
	}

	return model.Person{
		Name: name,
	}, nil
}

func (r *Repository) Close() {
	r.db.Close()
}
