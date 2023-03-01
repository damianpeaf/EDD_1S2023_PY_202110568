package structs

import (
	"strconv"
)

type StudentQueue struct {
	Head *StudentNode
	Tail *StudentNode
	Size int
}

func (queue *StudentQueue) Enqueue(student Student) {
	newNode := &StudentNode{Data: student}

	if queue.Head == nil {
		queue.Head = newNode
		queue.Tail = newNode
	} else {
		// Verify if the student is already in the queue

		aux := queue.Head

		for aux != nil && aux.Data.Id != student.Id {
			aux = aux.Next
		}

		if aux != nil {
			return
		}

		queue.Tail.Next = newNode
		queue.Tail = newNode
	}
	queue.Size++
}

func (queue *StudentQueue) Dequeue() Student {
	if queue.Head == nil {
		return Student{}
	}

	student := queue.Head.Data

	queue.Head = queue.Head.Next
	queue.Size--

	return student
}

func (queue *StudentQueue) Print() {
	aux := queue.Head

	for aux != nil {
		println(aux.Data.Name)
		aux = aux.Next
	}
}

func (queue *StudentQueue) Graphviz() {

	aux := queue.Head
	content := "digraph G {\n node [shape=box];\nrankdir=RL;\n"

	// Declaring nodes

	for aux != nil {
		content += "student_" + strconv.Itoa(aux.Data.Id) + "[label=\"" + strconv.Itoa(aux.Data.Id) + "\\n" + aux.Data.Name + " " + aux.Data.LastName + "\"];\n"
		aux = aux.Next
	}

	// Declaring edges

	aux = queue.Head

	for aux != nil && aux.Next != nil {
		if aux.Next != nil {
			content += "student_" + strconv.Itoa(aux.Next.Data.Id) + " -> student_" + strconv.Itoa(aux.Data.Id) + ";\n"
		}
		aux = aux.Next
	}

	content += "}"

	GenerateImage("StudentQueue", content)
}
