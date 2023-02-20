package structs

type Student struct {
	Id       int
	Name     string
	LastName string
	Password string
	Binnacle *Binnacle
}

type StudentNode struct {
	Next *StudentNode
	Prev *StudentNode
	Data Student
}
