package structs

import (
	"strconv"
)

type StudentList struct {
	Head *StudentNode
	Tail *StudentNode
	Size int
}

func (list *StudentList) Add(student Student) {
	newNode := &StudentNode{Data: student}

	if list.Head == nil {
		list.Head = newNode
		list.Tail = newNode
	} else {
		// Add depending on the id

		aux := list.Head

		for aux.Next != nil && aux.Data.Id < student.Id {
			aux = aux.Next
		}

		if aux.Data.Id < student.Id {
			// Add at the end
			aux.Next = newNode
			newNode.Prev = aux
			list.Tail = newNode
		} else {
			// Add in the middle
			if aux.Prev != nil {
				aux.Prev.Next = newNode
				newNode.Prev = aux.Prev
			} else {
				// Add at the beginning
				list.Head = newNode
			}
			newNode.Next = aux
			aux.Prev = newNode
		}

	}
	list.Size++
}

func (list *StudentList) Delete(id int) {

	aux := list.Head

	// Find the node
	for aux != nil && aux.Data.Id != id {
		aux = aux.Next
	}

	if aux != nil {

		// Bridge the node with the next and previous nodes
		if aux.Prev != nil {
			aux.Prev.Next = aux.Next
		} else {
			list.Head = aux.Next
		}

		if aux.Next != nil {
			aux.Next.Prev = aux.Prev
		} else {
			list.Tail = aux.Prev
		}

		list.Size--
	}

}

func (list *StudentList) Search(id int) *Student {

	aux := list.Head

	for aux != nil && aux.Data.Id != id {
		aux = aux.Next
	}

	return &aux.Data

}

func (list *StudentList) Print() {

	aux := list.Head

	for aux != nil {

		println("Nombre: ", aux.Data.Name, "Apellido: ", aux.Data.LastName, "Carnet: ", aux.Data.Id)
		println("********************************")
		aux = aux.Next
	}

}

func (list *StudentList) AuthUser(id int, password string) *Student {

	aux := list.Head

	for aux != nil && aux.Data.Id != id {
		aux = aux.Next
	}

	if aux != nil && aux.Data.Password == password {
		return &aux.Data
	}
	return nil
}

func (list *StudentList) Graphviz() {

	aux := list.Head
	content := "digraph StudentList{ rankdir=RL; node [shape=record];"
	counter := 0

	// Null nodes

	content += "null_left [label=\"NULL\"];"
	content += "null_right [label=\"NULL\"];"

	// Student nodes
	for aux != nil {
		content += "student_" + strconv.Itoa(counter) + "[label = \"" + strconv.Itoa(aux.Data.Id) + " " + aux.Data.Name + " " + aux.Data.LastName + "\"];"
		aux = aux.Next
		counter++
	}

	// Edges

	aux = list.Head
	counter = 0

	for aux != nil {

		// List nodes
		if aux.Prev != nil {
			content += "student_" + strconv.Itoa(counter) + " -> student_" + strconv.Itoa(counter-1) + ";"
		} else {
			content += "null_left -> student_" + strconv.Itoa(counter) + ";"
		}

		if aux.Next != nil {
			content += "student_" + strconv.Itoa(counter) + " -> student_" + strconv.Itoa(counter+1) + ";"
		} else {
			content += "student_" + strconv.Itoa(counter) + " -> null_right;"
		}

		// binnacle

		if aux.Data.Binnacle.Size > 0 {
			content += "student_" + strconv.Itoa(counter) + " -> " + aux.Data.Binnacle.Graphviz(strconv.Itoa(aux.Data.Id)) + ";"
		}

		aux = aux.Next
		counter++
	}

	content += "}"

	GenerateImage("StudentList.dot", content, "StudentList.png")

}
