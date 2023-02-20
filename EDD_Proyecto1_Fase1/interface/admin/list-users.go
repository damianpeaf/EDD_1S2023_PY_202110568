package admin

import (
	"fmt"
)

func ListUsersView() {
	fmt.Println("*** Estudiantes del sistema: ***")
	students.Print()
}
