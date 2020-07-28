let cardUsers = null;
let cardStats = null;
let allUsers = [];
let allStats = [];
let countUsersResult = 0;
let input = 0;
// let numberFormat = null;

window.addEventListener('load', () => {

    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
    });

    cardUsers = document.querySelector('#usersList');
    cardStats = document.querySelector('#statsList');
    searcher = document.querySelector('#searcher');   
    input = document.querySelector('#search');
    countUsersResult = document.querySelector('#foundUsers');

    // numberFormat = Intl.NumberFormat('pt-BR');

    fetchUsers();
});

async function fetchUsers() {

    const response = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const data = await response.json();
    allUsers = data.results.map(user => {
    
       const { name, picture, gender, dob } = user;
       return {
            name: `${name.first} ${name.last}`,
            picture: picture.thumbnail,
            age: dob.age,
            gender
       }
    }); 

    render();  
}

const render = (inputName) => {
   
    renderUserList(inputName);
    renderSearchUsers();
    renderStats();
    clearInput();
}

const renderUserList = (inputName) => {

    let users = '<div>';

    let filterUsers = handleFilter(inputName).sort((a, b) => {
       return a.name.localeCompare(b.name);
    }); 

    if (filterUsers.length === 0){
        countUsersResult.textContent = 'No searched users'; 
        
    } else {

        countUsersResult.textContent = `${filterUsers.length} Users Found`;
        filterUsers.map( user => {

            const { name, picture, age} = user;
            const showData = `
                <div class="user">
                    <div>
                        <img src="${picture}" alt="${name}" />
                    </div>
                    <div class="nomes">
                        <p class="line">${name}, ${age}</p>
                    </div>
                </div>
            `;
    
            users += showData;
        });
    
        users += '</div>';
        cardUsers.innerHTML = users;
        // console.log(filterUsers.length); 
    
        allStats = filterUsers;
        // console.log(allStats, 'full');
    }
}

const handleFilter = (data) => {

    let filtering = allUsers.filter( user => {

        return user.name.toLowerCase().indexOf(data) !== -1;
    });

    return filtering;
}

const renderSearchUsers = () => {

    searcher.addEventListener('click', () => {

        let inputName = input.value.toLowerCase().trim();

        if (input.value === '' || input.value === null){       
            return;
        }

        render(inputName);
    });

    input.addEventListener('keyup', () => {

        let inputName = input.value.toLowerCase();

        if (inputName.key == 'Enter' && inputName.target.value === ''){
            searcher.disabled = true;
            render([]);
        } else if (inputName.key == 'Enter' && inputName.target.value != '') {
            searcher.classList.remove('disabled');
            searcher.disabled = false;
            render(inputName);
        }
    });
}

const renderStats = () => {

    // console.log('cheguei aqui tbm');

    cardStats.innerHTML = '';
    let statsElement = document.createElement('div');

    if (allStats.length === 0){
        let emptyStat = document.createElement('div');
        emptyStat.textContent = 'Nothing available yet.';
        statsElement.appendChild(emptyStat);
    } else {

        let femaleElement = document.createElement('div');
        const sumFemales = allStats.reduce((acc, cur) => {
            if (cur.gender === 'female'){
                acc += 1;
            }
            return acc;
        }, 0);
        // console.log(sumFemales, 'females');
        femaleElement.textContent = `Total female users: ${sumFemales}`;
        statsElement.appendChild(femaleElement);
        
        let maleElement = document.createElement('div');
        const sumMales = allStats.reduce((acc, cur) => {
            if (cur.gender === 'male'){
                acc += 1;
            } 
            return acc;
        }, 0);
        // console.log(sumMales, 'males');
        maleElement.textContent = `Total male users: ${sumMales}`;
        statsElement.appendChild(maleElement);

        let sumElement = document.createElement('div');
        const sumAges = allStats.reduce((acc, cur) => {
            return acc + cur.age;
        }, 0);
        // console.log(sumAges);
        sumElement.textContent = `Sum of ages: ${sumAges}`;
        statsElement.appendChild(sumElement);

        let averageElement = document.createElement('div');
        let averageAge = sumAges / allStats.length;
        // console.log(averageAge);
        averageElement.textContent = `Average age: ${averageAge}`;
        statsElement.appendChild(averageElement);

        let totalUsers = document.createElement('div');
        const people = sumFemales + sumMales;
        // console.log(people);
        totalUsers.textContent = `Total of people: ${people}`;
        statsElement.appendChild(totalUsers);
    }

    cardStats.appendChild(statsElement);
}

const clearInput = () => {
    input.value = '';
    input.focus();
}

const formatNumber = (number) => {
    return numberFormat.format(number);
}