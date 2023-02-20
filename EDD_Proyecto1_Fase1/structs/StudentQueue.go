package structs

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
