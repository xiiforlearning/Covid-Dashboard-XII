import Chart from '../../node_modules/chart.js/dist/Chart'
import {
    chart_allfeaturs
} from './search'
export async function create_chart(data_value, data_name, color, title) {
    let case_graph = document.getElementById('myChart-case').getContext('2d');
    data_name = data_name.map((a) => {
        return a.toString().split('/').join('-')
    })
    new Chart(case_graph, {
        // The type of chart we want to create
        type: 'line',
        data: {
            labels: data_name,
            datasets: [{
                label: title,
                borderColor: color,
                data: data_value,
            }, ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {

                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'month',
                        round: 'day',
                        displayFormats: {
                            quarter: 'MMM YYYY',
                        },
                    },
                }],
            }
        }

    });
}

export async function give_data() {
    let url = `https://disease.sh/v3/covid-19/historical/all?lastdays=all`;
    let res = await fetch(url);
    let data = await res.json();
    let global_cases = Object.values(data.cases);
    let propertyNames = Object.keys(data.cases);
    let global_deaths = Object.values(data.deaths);
    let global_recover = Object.values(data.recovered);
    let population_world = 7 * 10 ** 9;
    let per_100thousand = 100000;
    let cases = [...global_cases];
    for (let i = 0; i < global_cases.length; i++) {
        if (cases[i + 1] == undefined) {
            break
        }
        cases[i + 1] = cases[i + 1] - global_cases[i];
    }
    create_chart(global_cases, propertyNames, '#8a9596', 'Global case');
    document.querySelector('.cases-btn').addEventListener('click', () => {
        document.querySelector('.chart-container').innerHTML = '';
        document.querySelector('.chart-container').innerHTML = '<canvas id="myChart-case"></canvas>'
        create_chart(global_cases, propertyNames, '#8a9596', 'Global case');
    })
    document.querySelector('.deathes-btn').addEventListener('click', () => {
        document.querySelector('.chart-container').innerHTML = '';
        document.querySelector('.chart-container').innerHTML = '<canvas id="myChart-case"></canvas>'

        create_chart(global_deaths, propertyNames, 'red', 'Global deaths');
    })
    document.querySelector('.recover-btn').addEventListener('click', () => {
        document.querySelector('.chart-container').innerHTML = '';
        document.querySelector('.chart-container').innerHTML = '<canvas id="myChart-case"></canvas>'
        create_chart(global_recover, propertyNames, 'green', 'Global recovery');

    })
    document.querySelector('.sort-amount').addEventListener('click', () => {
        document.querySelector('.chart-container').innerHTML = '';
        document.querySelector('.chart-container').innerHTML = '<canvas id="myChart-case"></canvas>'
        let sorted_case = Object.values(global_cases);
        let sorted_death = Object.values(global_deaths);
        let sorted_recover = Object.values(global_recover);


        for (let i = 0; i < sorted_case.length; i++) {
            sorted_case[i] = sorted_case[i] / population_world * per_100thousand;
            sorted_death[i] = sorted_death[i] / population_world * per_100thousand;
            sorted_recover[i] = sorted_recover[i] / population_world * per_100thousand;
        }
        chart_allfeaturs(propertyNames, sorted_case, sorted_death, sorted_recover, )

    })
    document.querySelector('.default').addEventListener('click', () => {
        document.querySelector('.chart-container').innerHTML = '';
        document.querySelector('.chart-container').innerHTML = '<canvas id="myChart-case"></canvas>'
        create_chart(global_cases, propertyNames, '#8a9596', 'Global case');

    })

    document.querySelector('.sort-time').addEventListener('click', () => {

        document.querySelector('.chart-container').innerHTML = '';
        document.querySelector('.chart-container').innerHTML = '<canvas id="myChart-case"></canvas>'

        create_chart(cases, propertyNames, '#8a9596', 'Global case');
    })
    document.querySelector('.sort-both').addEventListener('click', () => {

        document.querySelector('.chart-container').innerHTML = '';
        document.querySelector('.chart-container').innerHTML = '<canvas id="myChart-case"></canvas>'
        let sorted_case = [...cases]

        for (let i = 0; i < sorted_case.length; i++) {
            sorted_case[i] = Math.floor(sorted_case[i] / population_world * per_100thousand);
        }
        create_chart(sorted_case, propertyNames, '#8a9596', 'Daily cases per100k');
    })

}