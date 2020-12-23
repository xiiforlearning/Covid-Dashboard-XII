import Chart from '../../node_modules/chart.js/dist/Chart'


export class Search {
    async compare() {

        let input, filter;
        let list = document.querySelectorAll('.list-block-item');
        let list2 = document.querySelectorAll('.death-list-item');
        let list3 = document.querySelectorAll('.recovery-list-item')
        input = document.querySelector('.use-keyboard-input');
        const text = document.querySelectorAll('.country_name')
        const text2 = document.querySelectorAll('.country_name2')
        const text3 = document.querySelectorAll('.country_name3')
        let length_of_list = 0;
        filter = input.value.toUpperCase();

        for (let i = 0; i < list.length; i++) {
            if (text[i].textContent.toUpperCase().indexOf(filter) > -1) {
                list[i].style.display = '';
            } else {
                list[i].style.display = 'none';
            }
            if (text2[i].textContent.toUpperCase().indexOf(filter) > -1) {
                list2[i].style.display = '';
            } else {
                list2[i].style.display = 'none';
            }
            if (text3[i].textContent.toUpperCase().indexOf(filter) > -1) {
                list3[i].style.display = '';
            } else {
                list3[i].style.display = 'none';
            }
            if (list[i].style.display === '') {
                length_of_list++;
            }

        }
        if (length_of_list === 1) {
            let country;
            for (let i = 0; i < list.length; i++) {
                if (list[i].style.display == '') {
                    country = text[i].textContent
                }
            }

            const url = `https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`;
    
            const res = await fetch(url);
            const data = await res.json();
            let country_cases = Object.values(data.timeline.cases);
            let country_deaths = Object.values(data.timeline.deaths);
            let country_recover = Object.values(data.timeline.recovered);
            let times = Object.keys(data.timeline.cases);
            chart_allfeaturs(times, country_cases, country_deaths, country_recover, country)
        }

    }
    async listen() {
        const url = `https://corona.lmao.ninja/v2/countries`;
        const res = await fetch(url);
        const data = await res.json();
        let that = this;
        const textarea = document.querySelector('.use-keyboard-input')
        const name_list1 = document.getElementsByClassName('list-block-item')
        const name_list2 = document.getElementsByClassName('death-list-item')
        const name_list3 = document.getElementsByClassName('recovery-list-item')
        for (let i = 0; i < name_list1.length; i++) {
            let textcontent = document.querySelectorAll('.country_name')[i].textContent;
            let textcontent2 = document.querySelectorAll('.country_name2')[i].textContent;
            let textcontent3 = document.querySelectorAll('.country_name3')[i].textContent;
            name_list1[i].addEventListener('click', () => {
                document.querySelector('.use-keyboard-input').value = textcontent
                that.compare()

            })
            name_list2[i].addEventListener('click', () => {
                document.querySelector('.use-keyboard-input').value = textcontent2
                that.compare()
            })
            name_list3[i].addEventListener('click', () => {
                document.querySelector('.use-keyboard-input').value = textcontent3
                that.compare()
            })
        }

        setTimeout(function () {
            const keyboard = document.querySelectorAll('.keyboard__key')
            for (let i = 0; i < keyboard.length; i++) {
                keyboard[i].addEventListener('click', () => {
                    that.compare()
                })
            }
        }, 0)

        textarea.addEventListener('keydown', () => {
            setTimeout(function () {
                that.compare()
            }, 0)
        })
        return data
    }
}

 export function chart_allfeaturs(data_name, data_value1, data_value2, data_value3, title) {
    document.querySelector('.chart-container').innerHTML = '';
    document.querySelector('.chart-container').innerHTML = '<canvas id="myChart-case"></canvas>'
    let case_graph = document.getElementById('myChart-case').getContext('2d');

    new Chart(case_graph, {
        // The type of chart we want to create
        type: 'line',


        data: {
            labels: data_name,
            datasets: [{
                    label: `Cases of ${title}`,
                    borderColor: `#8a9596`,
                    data: data_value1,
                },
                {
                    label: `Deathes of ${title}`,
                    borderColor: `red`,
                    data: data_value2,
                },
                {
                    label: `Recovered of ${title}`,
                    borderColor: `green`,
                    data: data_value3,
                },
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {

                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'quarter',
                        round: 'day',
                        displayFormats: {
                            quarter: 'MMM',
                        },
                    },
                }],
            }
        }

    });
}