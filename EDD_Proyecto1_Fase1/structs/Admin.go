package structs

type Admin struct {
	Id       int
	Name     string
	LastName string
	Password string
	Binnacle *Binnacle
}

type AdminNode struct {
	Next *AdminNode
	Prev *AdminNode
	Data Admin
}
