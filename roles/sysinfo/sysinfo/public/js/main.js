document.addEventListener('DOMContentLoaded', function() {
    const systemTable = document.getElementById('system-table');
    const cpuTable = document.getElementById('cpu-table');
    const memoryTable = document.getElementById('memory-table');
    const swapTable = document.getElementById('swap-table');
    const cpuUsageTable = document.getElementById('cpu-usage-table');
    const memoryUsageTable = document.getElementById('memory-usage-table');
    const procHeaders = ['User', 'PID', 'CPU %', 'Memory %', 'Command'];

    let loadSysInfo = () => {
        axios.get('/api').then((response) => {
            handleResponse(response.data);
        }, (error) => {
            console.log(error);
        }); 
    }

    let clearTable = async(table) => {
        while (table.firstChild) {
            table.removeChild(table.lastChild);
        }
    }

    let populateTable = (table, data) => {
        if (data) {
            clearTable(table).then(() => {
                for (let key in data) {
                    if (data.hasOwnProperty(key) && key !== 'Time') {
                        let row = table.insertRow(-1);
                        let cell1 = row.insertCell(-1);
                        cell1.innerHTML = key;
                        let cell2 = row.insertCell(-1);
                        cell2.innerHTML = data[key];
                    }
                }
            });
        }
    }

    let handleSystem = (system) => {
        populateTable(systemTable, system);
    }

    let handleCPU = (cpu) => {
        populateTable(cpuTable, cpu);
    }

    let handleMemory = (memory) => {
        populateTable(memoryTable, memory);
    }

    let handleSwap = (swap) => {
        populateTable(swapTable, swap);
    }

    let handleCPUUsage = (cpuUsage) => {
        if (cpuUsage) {
            clearTable(cpuUsageTable).then(() => {
                cpuUsageTable.createTHead();
                let tr = document.createElement('tr');
                procHeaders.forEach(element => {
                    th = document.createElement('th');
                    th.innerHTML = element;
                    tr.appendChild(th);
                });
                cpuUsageTable.tHead.appendChild(tr);
                cpuUsage.forEach(row => {
                    let tableRow = cpuUsageTable.insertRow(-1);
                    for (let key in row) {
                        if (row.hasOwnProperty(key) && key !== 'Time') {
                            let cell = tableRow.insertCell(-1);
                            cell.innerHTML = row[key];
                        }
                    }
                });
            });
        }
    }

    let handleMemUsage = (memUsage) => {
        if (memUsage) {
            clearTable(memoryUsageTable).then(() => {
                memoryUsageTable.createTHead();
                let tr = document.createElement('tr');
                procHeaders.forEach(element => {
                    th = document.createElement('th');
                    th.innerHTML = element;
                    tr.appendChild(th);
                });
                memoryUsageTable.tHead.appendChild(tr);
                memUsage.forEach(row => {
                    let tableRow = memoryUsageTable.insertRow(-1);
                    for (let key in row) {
                        if (row.hasOwnProperty(key) && key !== 'Time') {
                            let cell = tableRow.insertCell(-1);
                            cell.innerHTML = row[key];
                        }
                    }
                });
            });
        }
    }

    let handleResponse = (data) => {
        console.log(data);
        handleSystem(data.System);
        handleCPU(data.Processor);
        handleMemory(data.Memory);
        handleSwap(data.Swap);
        handleCPUUsage(data.CpuUsage);
        handleMemUsage(data.MemoryUsage);
    }
    
    loadSysInfo();
    setInterval(() => {
        loadSysInfo();
    }, 30000);
});