export class List {
    constructor(cases) {
        this.counter = 0;
        this.hunderedthousand = 100000;
        this.cases = cases;
        this.per_thousand = false;
        this.title_case = document.querySelector('.global-cases-title');
    }
    async list_create() {
        document.querySelector('.global-deathes-title').textContent = 'Global Deathes'
        document.querySelector('.global-recovery-title').textContent = 'Global Recovery'
        document.querySelector('.list-block').innerHTML = ''
        const url = `https://corona.lmao.ninja/v2/countries`;
        const res = await fetch(url);
        const data = await res.json();
        this.data = data;
        let sum_cases = 0;
        let sum_recovery = 0;
        if (this.cases === 'case') {
            data.sort((a, b) => {
                return b.cases - a.cases
            })
            this.title_case.textContent = 'Global Cases'
        } else if (this.cases == 'deaths') {
            data.sort((a, b) => {
                return b.deaths - a.deaths
            })
            this.title_case.textContent = 'Global Deaths'
        } else if (this.cases == 'recovered') {
            data.sort((a, b) => {
                return b.recovered - a.recovered
            })
            this.title_case.textContent = 'Amount of recovered'
        }
        let sum_deathes = 0;
        for (let i = 0; i < data.length; i++) {
            let country = document.createElement('div');
            country.className = 'list-block-item';
            document.querySelector('.list-block').appendChild(country);
            if (this.cases == 'case' && this.per_thousand === false) {
                sum_cases += data[i].cases;
                country.innerHTML = `<i class = "cases">${data[i].cases}</i> <i class = "flag"></i><i class = "country_name">${data[i].country}</i>`
            } else if (this.cases == 'deaths' && this.per_thousand === false) {
                sum_cases += data[i].deaths;
                country.innerHTML = `<i class = "cases">${data[i].deaths}</i> <i class = "flag"></i><i class = "country_name">${data[i].country}</i>`
            } else if (this.cases == 'recovered' && this.per_thousand === false) {
                sum_cases += data[i].recovered;
                country.innerHTML = `<i class = "cases">${data[i].recovered}</i> <i class = "flag"></i><i class = "country_name">${data[i].country}</i>`
            }
            if (this.cases == 'case' && this.per_thousand) {
                sum_cases += data[i].cases;
               
                country.innerHTML = `<i class = "cases">${Math.floor(data[i].casesPerOneMillion/100)}</i> <i class = "flag"></i><i class = "country_name">${data[i].country}</i>`
            }
            document.querySelectorAll('.flag')[i].style.backgroundImage = `url(${data[i].countryInfo.flag})`
            sum_deathes += data[i].deaths;
            sum_recovery += data[i].recovered;
        }
        document.querySelector('.global-cases').textContent = sum_cases;
        document.querySelector('.global-deathes').textContent = sum_deathes;
        document.querySelector('.global-recovery').textContent = sum_recovery;
        if(this.per_thousand===true){
            let allpopulation=7.3*(10**9);
            document.querySelector('.global-cases').textContent = (sum_cases/allpopulation).toFixed(3); 
            document.querySelector('.global-deathes').textContent =  (sum_deathes/allpopulation).toFixed(4);
            document.querySelector('.global-recovery').textContent = (sum_recovery/allpopulation).toFixed(3);
            document.querySelector('.global-cases-title').textContent = 'Cases per 100 thousands poulation'; 
            document.querySelector('.global-deathes-title').textContent = 'Deaths per 100 thousands poulation'; 
            document.querySelector('.global-recovery-title').textContent = 'Recovery per 100 thousands poulation'; 
        }
        this.per_thousand = false
        return data
    }
    sort_by_date() {
        document.querySelector('.global-deathes-title').textContent = 'Deathes of today'
        document.querySelector('.global-recovery-title').textContent = 'Recover of today'
        document.querySelector('.list-block').innerHTML = ''
        let sum_cases = 0;
        let sum_deathes = 0;
        let sum_recovery = 0;
        if (this.cases === 'case' && this.per_thousand === false) {
            this.data.sort((a, b) => {
                return b.todayCases - a.todayCases
            })
            document.querySelector('.global-cases-title').textContent = 'Cases of today'
        }
        if (this.cases === 'deaths' && this.per_thousand === false) {
            this.data.sort((a, b) => {
                return b.todayDeaths - a.todayDeaths
            })
            document.querySelector('.global-cases-title').textContent = 'Deathes of today'
        }
        if (this.cases === 'recovered' && this.per_thousand === false) {
            this.data.sort((a, b) => {
                return b.todayRecovered - a.todayRecovered
            })
            document.querySelector('.global-cases-title').textContent = 'Recover of today'
        }
        if (this.cases === 'case' && this.per_thousand) {
            this.data.sort((a, b) => {
                return b.todayCases / b.population * (this.hunderedthousand) - a.todayCases / a.population * this.hunderedthousand
            })
            document.querySelector('.global-cases-title').textContent = 'Cases of today'
        }
    
      
        for (let i = 0; i < this.data.length; i++) {
            let country = document.createElement('div');
            country.className = 'list-block-item';
            document.querySelector('.list-block').appendChild(country);
            if (this.cases === 'case' && this.per_thousand === false) {
                sum_cases += this.data[i].todayCases;
                sum_deathes += this.data[i].todayDeaths;
                sum_recovery += this.data[i].todayRecovered;
                country.innerHTML = `<i class = "cases">${this.data[i].todayCases}</i> <i class = "flag"></i><i class = "country_name">${this.data[i].country}</i>`;
                document.querySelectorAll('.flag')[i].style.backgroundImage = `url(${this.data[i].countryInfo.flag})`
            }
            if (this.cases === 'case' && this.per_thousand) {
                sum_cases += this.data[i].todayCases;
                sum_deathes += this.data[i].todayDeaths;
                sum_recovery += this.data[i].todayRecovered;
                country.innerHTML = `<i class = "cases">${(this.data[i].todayCases/this.data[i].population*100000).toFixed(0)}</i> <i class = "flag"></i><i class = "country_name">${this.data[i].country}</i>`;
                document.querySelectorAll('.flag')[i].style.backgroundImage = `url(${this.data[i].countryInfo.flag})`
            }
            if (this.cases === 'deaths' && this.per_thousand === false) {
                sum_cases += this.data[i].todayDeaths;
                sum_deathes += this.data[i].todayDeaths;
                sum_recovery += this.data[i].todayRecovered;
                country.innerHTML = `<i class = "cases">${this.data[i].todayDeaths}</i> <i class = "flag"></i><i class = "country_name">${this.data[i].country}</i>`;
                document.querySelectorAll('.flag')[i].style.backgroundImage = `url(${this.data[i].countryInfo.flag})`
            }
            if (this.cases === 'recovered' && this.per_thousand === false) {
                sum_cases += this.data[i].todayRecovered;
                sum_deathes += this.data[i].todayDeaths;
                sum_recovery += this.data[i].todayRecovered;
                country.innerHTML = `<i class = "cases">${this.data[i].todayRecovered}</i> <i class = "flag"></i><i class = "country_name">${this.data[i].country}</i>`;
                document.querySelectorAll('.flag')[i].style.backgroundImage = `url(${this.data[i].countryInfo.flag})`
            }
       

            document.querySelector('.global-cases').textContent = sum_cases;
            document.querySelector('.global-deathes').textContent = sum_deathes;
            document.querySelector('.global-recovery').textContent = sum_recovery;
        }
        this.per_thousand = false
    }
}

export class List_const {
    constructor() {
        this.block1 = document.querySelector('.death-list');
        this.per_thousand = false;
        this.block2 = document.querySelector('.recovery-list');
    }
    async list_const() {
        this.block1.innerHTML = ''
        this.block2.innerHTML = ''
        const url = `https://corona.lmao.ninja/v2/countries`;
        const res = await fetch(url);
        this.data = await res.json();
        this.data_recover = [...this.data]
        if (this.per_thousand == false) {
            this.data_recover.sort((a, b) => {
                return b.recovered - a.recovered
            })
            this.data.sort((a, b) => {
                return b.deaths - a.deaths
            })
        } else {
            this.data_recover.sort((a, b) => {
                return b.recoveredPerOneMillion - a.recoveredPerOneMillion
            })
            this.data.sort((a, b) => {
                return b.deathsPerOneMillion - a.deathsPerOneMillion
            })
        }
        if (this.per_thousand == false) {
            for (let i = 0; i < this.data.length; i++) {
                let item = document.createElement('div');
                let item_recover = document.createElement('div');
                item.className = 'death-list-item';
                document.querySelector('.death-list').appendChild(item);
                item_recover.className = 'recovery-list-item';
                document.querySelector('.recovery-list').appendChild(item_recover);
                item.innerHTML = `<i class = "cases">${this.data[i].deaths}</i> <i class = "flag2"></i><i class = "country_name2">${this.data[i].country}</i>`
                item_recover.innerHTML = `<i class = "cases">${this.data_recover[i].recovered}</i> <i class = "flag3"></i><i class = "country_name3">${this.data_recover[i].country}</i>`
                document.querySelectorAll('.flag2')[i].style.backgroundImage = `url(${this.data[i].countryInfo.flag})`
                document.querySelectorAll('.flag3')[i].style.backgroundImage = `url(${this.data_recover[i].countryInfo.flag})`
            }
        } else {
            for (let i = 0; i < this.data.length; i++) {
                let item = document.createElement('div');
                let item_recover = document.createElement('div');
                item.className = 'death-list-item';
                document.querySelector('.death-list').appendChild(item);
                item_recover.className = 'recovery-list-item';
                document.querySelector('.recovery-list').appendChild(item_recover);
              
                item.innerHTML = `<i class = "cases">${Math.floor(this.data[i].deathsPerOneMillion/100)}</i> <i class = "flag2"></i><i class = "country_name2">${this.data[i].country}</i>`
                item_recover.innerHTML = `<i class = "cases">${Math.floor(this.data_recover[i].recoveredPerOneMillion/100)}</i> <i class = "flag3"></i><i class = "country_name3">${this.data_recover[i].country}</i>`
                document.querySelectorAll('.flag2')[i].style.backgroundImage = `url(${this.data[i].countryInfo.flag})`
                document.querySelectorAll('.flag3')[i].style.backgroundImage = `url(${this.data_recover[i].countryInfo.flag})`
            
            }
            this.per_thousand = false
        }

    }
    sort_by_date() {
        this.block1.innerHTML = ''
        this.block2.innerHTML = ''
        if (this.per_thousand === false) {
            this.data.sort((a, b) => {
                return b.todayDeaths - a.todayDeaths
            })
            this.data_recover.sort((a, b) => {
                return b.todayRecovered - a.todayRecovered
            })
        } else {
            this.data.sort((a, b) => {
                return b.todayDeaths / b.population * 100000 - a.todayDeaths / a.population * 100000;
            })
            this.data_recover.sort((a, b) => {
                return b.todayRecovered / b.population * 100000 - a.todayRecovered / a.population * 100000
            })
        }
        if (this.per_thousand === false) {
            for (let i = 0; i < this.data.length; i++) {
                let item = document.createElement('div');
                let item_recover = document.createElement('div');
                item.className = 'death-list-item';
                document.querySelector('.death-list').appendChild(item);
                item_recover.className = 'recovery-list-item';
                document.querySelector('.recovery-list').appendChild(item_recover);
                item.innerHTML = `<i class = "cases">${this.data[i].todayDeaths}</i> <i class = "flag2"></i><i class = "country_name2">${this.data[i].country}</i>`
                item_recover.innerHTML = `<i class = "cases">${this.data_recover[i].todayRecovered}</i> <i class = "flag3"></i><i class = "country_name3">${this.data_recover[i].country}</i>`
                document.querySelectorAll('.flag2')[i].style.backgroundImage = `url(${this.data[i].countryInfo.flag})`
                document.querySelectorAll('.flag3')[i].style.backgroundImage = `url(${this.data_recover[i].countryInfo.flag})`
            }
        } else {
            for (let i = 0; i < this.data.length; i++) {
                let item = document.createElement('div');
                let item_recover = document.createElement('div');
                item.className = 'death-list-item';
                document.querySelector('.death-list').appendChild(item);
                item_recover.className = 'recovery-list-item';
                document.querySelector('.recovery-list').appendChild(item_recover);
                item.innerHTML = `<i class = "cases">${(this.data[i].todayDeaths/this.data[i].population*100000).toFixed(3)}</i> <i class = "flag2"></i><i class = "country_name2">${this.data[i].country}</i>`
                item_recover.innerHTML = `<i class = "cases">${(this.data_recover[i].todayRecovered/this.data_recover[i].population*100000).toFixed(0)}</i> <i class = "flag3"></i><i class = "country_name3">${this.data_recover[i].country}</i>`
                document.querySelectorAll('.flag2')[i].style.backgroundImage = `url(${this.data[i].countryInfo.flag})`
                document.querySelectorAll('.flag3')[i].style.backgroundImage = `url(${this.data_recover[i].countryInfo.flag})`
            }
        }
        this.per_thousand = false
    }
}