import { promises as fs } from 'fs';
import readLine from 'readline';

let listStateCities = [];

//init();
async function init(){

    try {

        const states = JSON.parse(await fs.readFile('./Estados.json'));
        const cities = JSON.parse(await fs.readFile('./Cidades.json'));

        states.forEach((state) => {
            cities.forEach((city) => {

                if(state.ID === city.Estado){
                    listStateCities.push({...city, Sigla: state.Sigla});
                    fs.writeFile(`./States/${state.Sigla}.json`, JSON.stringify(listStateCities, null, 2));             
                }
            });
            listStateCities = [];
        });

    } catch (err) {
        console.log(err);
    }
}

/* How many cities each Brazilian state has accordingly to the JSON files? */
const readInput = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

let bigCities = [];

// numberCities();
function numberCities(){

    readInput.question("Qual o UF? ", sigla => {

        init(sigla);
        async function init(sigla){

            const request = JSON.parse(await fs.readFile(`./States/${sigla}.json`));             
            const organize = request.length;
            console.log(organize);

            bigCities.push({ UF: sigla, number: organize});
            const biggest = bigCities.sort((a, b) => {
                return b.number - a.number;
            });

            console.log(biggest);   
            console.log(biggest.slice(0,5));

            numberCities();
        }
    });
}

const longestName = [];

cityNames();
function cityNames(){

    readInput.question("Qual o UF? ", sigla => {

        init(sigla);
        async function init(sigla){

            const request = JSON.parse(await fs.readFile(`./States/${sigla}.json`));             
            const organize = request.length;
    
            if(request.Nome)

            // cityNames.push({ Nome: request.Nome, UF: request.Sigla});
            console.log(cityNames);

        }

    });
}