package structs

import (
	"strconv"
	"time"
)

type BinnacleRecord struct {
	Action string
	Time   time.Time
	Next   *BinnacleRecord
}

// Stack
type Binnacle struct {
	Top    *BinnacleRecord
	Bottom *BinnacleRecord
	Size   int
}

func (binnacle *Binnacle) Push(action string) {
	newNode := &BinnacleRecord{Action: action, Time: time.Now()}

	if binnacle.Top == nil {
		binnacle.Top = newNode
		binnacle.Bottom = newNode
	} else {
		newNode.Next = binnacle.Top
		binnacle.Top = newNode
	}
	binnacle.Size++
}

func (binnacle *Binnacle) Pop() BinnacleRecord {
	if binnacle.Top == nil {
		return BinnacleRecord{}
	}

	record := binnacle.Top

	binnacle.Top = binnacle.Top.Next
	binnacle.Size--

	return *record
}

func (record *BinnacleRecord) GetNodeName(userId string, counter int) string {
	return "binnacle_" + userId + "_" + strconv.Itoa(counter)
}

func (record *BinnacleRecord) GetNodeLabel() string {
	return " \"" + record.Action + "\n\"" + record.Time.Format("02/01/2006 15:04:05")
}

func (binnacle *Binnacle) Graphviz(userId string) string {

	// Declare nodes

	aux := binnacle.Top
	content := "{ rankdir=TB; node [shape=record];"
	counter := 0

	for aux != nil {
		content += aux.GetNodeName(userId, counter) + " [label=" + aux.GetNodeLabel() + "];\n"
		counter++
	}
	// Declare edges

	aux = binnacle.Top
	counter = 0

	for aux.Next != nil {
		content += aux.GetNodeName(userId, counter) + " -> " + aux.GetNodeName(userId, counter+1) + ";\n"
		counter++
	}

	content += "}"
	return content
}
