import { promises as fs } from 'fs';
import readLine from 'readline';

let listStateCities = [];

// init();
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

const readInput = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

let bigCities = [];
let smallestCities = [];

/* How many cities each Brazilian state has accordingly to the JSON files? */
numberCities();
function numberCities(){

    readInput.question("Qual o UF? ", sigla => {

        init(sigla);
        async function init(sigla){

            try{

                const request = JSON.parse(await fs.readFile(`./States/${sigla}.json`));             
                const organize = request.length;
                console.log(organize);

                bigCities.push({ UF: sigla, number: organize});
                const biggest = bigCities.sort((a, b) => {
                    return b.number - a.number;
                });

                // console.log(biggest);   
                // console.log(biggest.slice(0,5));

                smallestCities.push({ UF: sigla, number: organize});
                const small = smallestCities.sort((a, b) => {
                    return a.number - b.number;
                });

                console.log(small);   
                console.log(small.slice(0,5));

                numberCities();

            } catch(err){
                console.log(err);
            }
        }
    });
}

/* Biggest city names */

let biggestName = [];
let smallNames = [];

// cityNames();  
function cityNames(){

    readInput.question("Qual o UF? ", sigla => {

        try{

            init(sigla);
            async function init(sigla){
    
                const request = JSON.parse(await fs.readFile(`./States/${sigla}.json`));
    
                request.forEach((city) => {
    
                    const organize = city.Nome.length;
        
                    // biggestName.push({UF: sigla, Nome: city.Nome, number: organize});
                    // const order = biggestName.sort((a,b) => {
                    //    return b.number - a.number;
                    // });
        
                    // const names = order.slice(0,1);
                    // console.log(names);
    
                    smallNames.push({UF: sigla, Nome: city.Nome, number: organize});
                    const small = smallNames.sort((a,b) => {
                        return a.number - b.number;
                    });
    
                    const snames = small.slice(0,5);
                    console.log(snames);
    
                    cityNames();
                });
            }

        } catch(err){
            console.log(err);
        }

    });
}

const biggestNameOfAll = [];
const smallestNameOfAll = [];

// big();
async function big(){

    try{

        const read = JSON.parse(await fs.readFile('./Cidades.json'));

        read.map((city) => {

            const organize = city.Nome.length;
            
            // biggestNameOfAll.push({Nome: city.Nome, UF: city.Estado , Number: organize}); 
            // const biggest = biggestNameOfAll.sort((a,b) => {
            //    return b.number - a.number;
            // });
            // const order = biggest.slice(0,5);
            // console.log(order);

            smallestNameOfAll.push({Nome: city.Nome, UF: city.Estado, Number: organize});            
            const small = smallestNameOfAll.sort((a,b) => {
                return a.Number - b.Number;
            });

            const sorder = small.slice(0,10);
            console.log(sorder);

        });


    }catch(err){
        console.log(err);
    }
}
