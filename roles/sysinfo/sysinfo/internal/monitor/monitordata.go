package monitor

type MonitorData struct {
	UnixTime    string
	System      System
	Memory      Memory
	Swap        Swap
	Disks       []Disk
	Processor   Processor
	ProcUsage   ProcessorUsage
	Networks    []Network
	MemoryUsage []Process
	CpuUsage    []Process
}
