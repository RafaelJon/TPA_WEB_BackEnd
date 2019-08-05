package main

import(
	"fmt"
	"github.com/gorilla/mux"
	"github.com/gorilla/handlers"
	"net/http"
	"log"
	"encoding/json"
	"io/ioutil"
)

func SelectAccount(w http.ResponseWriter,r *http.Request){
	requestBody, _ := ioutil.ReadAll(r.Body)

	var user User

	err := json.Unmarshal(requestBody, &user)
	if err != nil {
		fmt.Fprintln(w,err)
	}

	db := new(DbHandler)
	rows,_ := db.Query(fmt.Sprintf("SELECT * FROM user WHERE email='%s' AND password='%s'",
		user.Email,
		user.Password,
	))

	var users User
	users.Name = ""

	for rows.Next(){
		var temp User 

		rows.Scan(&temp.Id,&temp.Name,&temp.Email,&temp.Password,&temp.Dob,&temp.Marketingstatus,&temp.Description,&temp.Date,&temp.Gender,&temp.Phone,&temp.Preferredlang,&temp.Preferredcurr,&temp.Spokenlang,&temp.Picture,&temp.Restime,&temp.Resrate,&temp.Location)
		users = temp
	}

	bytes, err := json.Marshal(users)
	if err!=nil{
		fmt.Println(err)
	}
	fmt.Fprintf(w,string(bytes))
	fmt.Println(string(bytes))
	
}

// func RecommendStay(w http.ResponseWriter,r *http.Request){
// 	// queryStringParams := mux.Vars(r)
// 	// id := queryStringParams["id"]
	
// 	db := new(DbHandler)
// 	rows,_ := db.Query("SELECT * FROM stay WHERE id BETWEEN 1 AND 8")

// 	var stay []Stay

// 	for rows.Next(){
// 		var temp Stay 

// 		rows.Scan(&temp.Id,&temp.Picture,&temp.Type,&temp.Location,&temp.Title,&temp.Price,&temp.TotalReview,&temp.Star)
// 		stay = append(stay,temp)
// 		// fmt.Fprintf(w,"%+v",temp)
// 	}

// 	bytes, _ := json.Marshal(stay)
// 	fmt.Fprintf(w,string(bytes))
// }

// func RecommendExpe(w http.ResponseWriter,r *http.Request){
// 	// queryStringParams := mux.Vars(r)
// 	// id := queryStringParams["id"]
	
// 	db := new(DbHandler)
// 	rows,_ := db.Query("SELECT * FROM experience WHERE id BETWEEN 1 AND 6")

// 	var expe []Experience

// 	for rows.Next(){
// 		var temp Experience 

// 		rows.Scan(&temp.Id,&temp.Picture,&temp.Type,&temp.Location,&temp.Title,&temp.Price,&temp.TotalReview,&temp.Star)
// 		expe = append(expe,temp)
// 		// fmt.Fprintf(w,"%+v",temp)
// 	}

// 	bytes, _ := json.Marshal(expe)
// 	fmt.Fprintf(w,string(bytes))
// }

func StoreUser(w http.ResponseWriter, r *http.Request){
	requestBody, _ := ioutil.ReadAll(r.Body)

	var user User

	err := json.Unmarshal(requestBody, &user)
	if err != nil {
		fmt.Fprintln(w,err)
	}

	fmt.Fprintf(w,"%+v",user)

	db := new(DbHandler)

	db.Query(fmt.Sprintf("INSERT INTO user (name,email,password,dob,marketingstatus,description,date,gender,phone,preferred_lang,preferred_curr,spoken_lang) VALUES('%s','%s','%s','%s','%s','','%s','','','','','')",
		user.Name,
		user.Email,
		user.Password,
		user.Dob,
		user.Marketingstatus,
		user.Date,
	))
}

func GetUserById(w http.ResponseWriter, r *http.Request){
	queryStringParams := mux.Vars(r)
	id := queryStringParams["id"]
	
	db := new(DbHandler)
	rows,_ := db.Query(fmt.Sprintf("SELECT * FROM user WHERE id = '%s'",id))

	var user []User

	for rows.Next(){
		var temp User 

		rows.Scan(&temp.Id,&temp.Name,&temp.Email,&temp.Password,&temp.Dob,&temp.Marketingstatus,&temp.Description,&temp.Date,&temp.Gender,&temp.Phone,&temp.Preferredlang,&temp.Preferredcurr,&temp.Spokenlang,&temp.Picture,&temp.Restime,&temp.Resrate,&temp.Location)
		user = append(user,temp)
		// fmt.Fprintf(w,"%+v",temp)
	}

	bytes, _ := json.Marshal(user)
	fmt.Fprintf(w,string(bytes))
}

// func Update(w http.ResponseWriter,r *http.Request){
// 	queryStringParams := mux.Vars(r)
// 	id := queryStringParams["id"]

// 	requestBody, _ := ioutil.ReadAll(r.Body)

// 	var user User 
// 	json.Unmarshal(requestBody,&user)

// 	db := new(DbHandler)
// 	db.Query(fmt.Sprintf("UPDATE user SET initial='%s', name='%s' WHERE id = '%s'",
// 		user.initial,
// 		user.name,
// 		id,
// 	))
// }

func Delete(w http.ResponseWriter,r *http.Request){
	queryStringParams := mux.Vars(r)
	id := queryStringParams["id"]

	db := new(DbHandler)

	db.Query(fmt.Sprintf("DELETE FROM user WHERE id='%s'",
		id,
	))
}

func ChangePassword(w http.ResponseWriter,r *http.Request){
	requestBody, _ := ioutil.ReadAll(r.Body)

	var user User

	err := json.Unmarshal(requestBody, &user)
	if err != nil {
		fmt.Fprintln(w,err)
	}

	db := new(DbHandler)
	db.Query(fmt.Sprintf("UPDATE user SET password = '%s' WHERE id = %d",
		user.Password,
		user.Id,
	))
}

func UpdateAllData(w http.ResponseWriter,r *http.Request){
	requestBody, _ := ioutil.ReadAll(r.Body)

	var user User

	err := json.Unmarshal(requestBody, &user)
	if err != nil {
		fmt.Fprintln(w,err)
	}
	fmt.Println(user.Name)

	db := new(DbHandler)
	db.Query(fmt.Sprintf("UPDATE user SET name = '%s', gender = '%s', email = '%s', phone = '%s', description = '%s', spoken_lang = '%s', dob = '%s', restime = '%s', resrate = '%s', location = '%s' WHERE id = %d",
		user.Name,
		user.Gender,
		user.Email,
		user.Phone,
		user.Description,
		user.Spokenlang,
		user.Dob,
		user.Restime,
		user.Resrate,
		user.Location,
		user.Id,
	))
}

func handleRequest(){
	router := mux.NewRouter().StrictSlash(true)

	headers:= handlers.AllowedHeaders([]string{"X-Requested-With","Content-Type","Authorization"})
	methods:= handlers.AllowedMethods([]string{"GET","POST","PUT","DELETE"})
	origin := handlers.AllowedOrigins([]string{"*"})
	
	router.HandleFunc("/api/users/register",StoreUser).Methods("POST")
	router.HandleFunc("/api/users/login",SelectAccount).Methods("POST")
	// router.HandleFunc("/api/stay",RecommendStay).Methods("GET")
	// router.HandleFunc("/api/expe",RecommendExpe).Methods("GET")
	router.HandleFunc("/api/users/{id}",GetUserById).Methods("GET")
	router.HandleFunc("/api/users/change_password",ChangePassword).Methods("POST")
	router.HandleFunc("/api/users/update_all",UpdateAllData).Methods("POST")
	// router.HandleFunc("/api/users/{id}",Update).Methods("PATCH")
	// router.HandleFunc("/api/users/{id}",Delete).Methods("DELETE")

	log.Panic(http.ListenAndServe(":1919",handlers.CORS(headers,methods,origin)(router)))
	
}

func main() {
	handleRequest()
}