package user

import (
	"EDD_Proyecto1_Fase1/structs"
	"fmt"
)

func UserDasboard(student *structs.Student) {

	fmt.Println("\nBienvenido", student.Name, student.LastName, "!")

}
