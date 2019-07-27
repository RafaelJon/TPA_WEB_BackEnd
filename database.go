package main

import(
	f "fmt"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"log"
)

const DbUsername = "root"
const DbPassword = ""
const DbServerAddress = "127.0.0.1"
const DbServerPort = "3306"
const DbName = "aivbnb"

type DbHandler struct {
	ConnectionString string
}

func (db *DbHandler) connect() *sql.DB{
	db.ConnectionString = f.Sprintf("%s:%s@tcp(%s:%s)/%s",
		DbUsername,
		DbPassword,
		DbServerAddress,
		DbServerPort,
		DbName,
	)

	conn, err := sql.Open("mysql",db.ConnectionString)

	if err!=nil{
		log.Panic(err)
	}

	return conn
}

func(db *DbHandler) Query(sql string) (*sql.Rows, error) {
	conn := db.connect()
	return conn.Query(sql)
}