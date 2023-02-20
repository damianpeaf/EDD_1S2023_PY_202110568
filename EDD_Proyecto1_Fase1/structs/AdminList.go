package structs

type AdminList struct {
	Head *AdminNode
	Tail *AdminNode
	Size int
}

func (list *AdminList) Add(admin Admin) {
	newNode := &AdminNode{Data: admin}

	if list.Head == nil {
		list.Head = newNode
		list.Tail = newNode
	} else {
		// Add depending on the id

		aux := list.Head

		for aux.Next != nil && aux.Data.Id < admin.Id {
			aux = aux.Next
		}

		if aux.Data.Id < admin.Id {
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

func (list *AdminList) Delete(id int) {

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

func (list *AdminList) Search(id int) *AdminNode {

	aux := list.Head

	for aux != nil && aux.Data.Id != id {
		aux = aux.Next
	}

	return aux

}

func (list *AdminList) Print() {

	aux := list.Head

	for aux != nil {
		println(aux.Data.Id)
		aux = aux.Next
	}

}
