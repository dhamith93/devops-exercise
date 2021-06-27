package monitor

import (
	"encoding/json"
	"strconv"
	"time"

	"sysinfo/internal/logger"
)

// MonitorAsJSON returns stats as a json string
func MonitorAsJSON() string {
	monitorData := Monitor()
	jsonData, err := json.Marshal(&monitorData)
	if err != nil {
		logger.Log("Error", err.Error())
		return ""
	}
	return string(jsonData)
}

// Monitor returns stats as Struct
func Monitor() MonitorData {
	unixTime := strconv.FormatInt(time.Now().Unix(), 10)
	system := GetSystem()
	system.Time = unixTime
	memory := GetMemory()
	memory.Time = unixTime
	swap := GetSwap()
	swap.Time = unixTime
	disks := GetDisks(unixTime)
	proc := GetProcessor()
	procUsage := GetProcessorUsage()
	proc.Time = unixTime
	network := GetNetwork(unixTime)
	memUsage := GetProcessesSortedByMem(unixTime)
	cpuUsage := GetProcessesSortedByCPU(unixTime)

	return MonitorData{
		UnixTime:    unixTime,
		System:      system,
		Memory:      memory,
		Swap:        swap,
		Disks:       disks,
		Processor:   proc,
		ProcUsage:   procUsage,
		Networks:    network,
		MemoryUsage: memUsage,
		CpuUsage:    cpuUsage,
	}
}
