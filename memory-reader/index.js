const memoryjs = require("@luchanso/memoryjs");
const processName = "dota2.exe";
const fs = require("fs");

function findProcessByName(name) {
  return new Promise((res) => {
    memoryjs.getProcesses((error, processes) => {
      res(processes.find(({ szExeFile }) => szExeFile === name));
    });
  });
}

function findModule(modules, name) {
  return modules.find(({ szModule }) => szModule === name);
}

async function readDota2Memory() {
  const processObject = memoryjs.openProcess(processName);
  const modules = memoryjs.getModules(processObject.th32ProcessID);

  console.log(modules);

  const module = findModule(modules, "client.dll");
  console.log(module.modBaseAddr);

  // const readBuffer = memoryjs.readBuffer(
  //   processObject.handle,
  //   module.modBaseAddr + 0xa0ee80,
  //   1024
  // );

  // fs.writeFileSync("./data.bin", readBuffer);

  // fs.writeFileSync(
  //   "./data.json",
  //   JSON.stringify(

  //       .filter((i) => i && i.szExePath && i.szExePath.indexOf("steam") !== -1),
  //     null,
  //     4
  //   )
  // );
}

readDota2Memory();
