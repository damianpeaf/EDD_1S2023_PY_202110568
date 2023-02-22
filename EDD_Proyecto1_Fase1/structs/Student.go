package structs

import (
	"strconv"
)

type Student struct {
	Id       int
	Name     string
	LastName string
	Password string
	Binnacle *Binnacle
}

func (student *Student) Json() string {

	return "{\"nombre\":\"" + student.Name + " " + student.LastName + "\",\"carnet\":" + strconv.Itoa(student.Id) + ",\"password\":\"" + student.Password + "\",\"Carpeta_Raiz\":\"/\" }"
}

type StudentNode struct {
	Next *StudentNode
	Prev *StudentNode
	Data Student
}
