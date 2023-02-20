package structs

import "time"

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
