const fs=require("fs");

if(process.argv[2] === undefined){
    console.error('run: node csv2json.js <file.csv>');
    process.exit(1);
}

const filename = process.argv[2];
console.log(filename);

const fileText = fs.readFileSync(filename).toString();
const allLines = fileText.split(';/n');
console.log(allLines.length);

let objList = []
for(let i=0;i<allLines.length;i++){
    const line = allLines[i];
    const values = line.split(';');
    const obj = {};

    for(let j=0;j<values.length;j++){
        if (j%2===0){
            const value1 = values[j];
            const value2 = values[j+1];
            obj[value2] = value1;
        }
    }
    objList.push(obj); 
}


const jsonText = JSON.stringify(objList);
const outFilename = filename.replace('.csv','.json');
fs.writeFileSync(outFilename,jsonText);