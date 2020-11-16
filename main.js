document.getElementById('main_container').style.display = "block";


var letters = 500;
var totalLetters = 0;
var logisticResult = 1;
var result = 0;

var isStarted = false;
var isStoped = true;
let center = [];
let centerLetters = 0;


let northwest = [];
let northwestLetters = 0;

let south = [];
let southLetters = 0;

let northkavkaz = [];
let northkavkazLetters = 0;

let privolj = [];
let privoljLetters = 0;

let ural = [];
let uralLetters = 0;

let sibiria = [];
let sibiriaLetters = 0;

let far_eastern = [];
let far_easternLetters = 0;

var speed = 1;

let graphData = {
    labels: [],
    speed: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
}

let econimcData = {
    labels: ['Затраты на письма', 'Затраты на логистику', 'Общая сумма затрат'],
    order: [100, 100, 100]
}

const now = new Date();

for (let i = 1; i < 10; i++) {
    graphData.labels[i] = now.getHours() + ":" + (now.getMinutes()) + ":" + (now.getSeconds() - i);
}


const sessionTime = () => {

    {
        var tm = new Date();
        var h = tm.getHours();
        var m = tm.getMinutes();
        var s = tm.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        document.getElementById('time_session').innerHTML = "Время: " + h + ":" + m + ":" + s;
    }
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

const sendLetters = (x) => {
    switch (x) {
        case 1:
            center.push(centerLetters += speed);

            for (var i = 0; i < center.length; i++) {
                document.getElementById('center').innerHTML = center[i] + 'шт.';
            }
            break

        case 2:
            northwest.push(northwestLetters += speed);

            for (var i = 0; i < northwest.length; i++) {
                document.getElementById('northwest').innerHTML = northwest[i] + 'шт.';
            }
            break
        case 3:
            south.push(southLetters += speed);

            for (var i = 0; i < south.length; i++) {
                document.getElementById('south').innerHTML = south[i] + 'шт.';
            }
            break
        case 4:
            northkavkaz.push(northkavkazLetters += speed);

            for (var i = 0; i < northkavkaz.length; i++) {
                document.getElementById('northkavkaz').innerHTML = northkavkaz[i] + 'шт.';
            }
            break
        case 5:
            privolj.push(privoljLetters += speed);

            for (var i = 0; i < privoljLetters.length; i++) {
                document.getElementById('privolj').innerHTML = privolj[i] + 'шт.';
            }
            break
        case 6:
            ural.push(uralLetters += speed);

            for (var i = 0; i < ural.length; i++) {
                document.getElementById('ural').innerHTML = ural[i] + 'шт.';
            }
            break
        case 7:
            sibiria.push(sibiriaLetters += speed);

            for (var i = 0; i < sibiria.length; i++) {
                document.getElementById('sibiria').innerHTML = sibiria[i] + 'шт.';
            }
            break
        case 8:
            far_eastern.push(far_easternLetters += speed);

            for (var i = 0; i < far_eastern.length; i++) {
                document.getElementById('far_eastern').innerHTML = far_eastern[i] + 'шт.';
            }
            break

        default:

            break
    }

}

setInterval(() => {
    if (isStarted === true) {
        let randomResult = getRandomIntInclusive(1, 9)
        let tempArray = graphData.labels.slice(1)
        tempArray.push(getCurrentTime().time)
        graphData.labels = tempArray
        graphData.speed.push(speed)
        graphData.speed.shift()


        createGraphic(graphData);
        createEconomicGraphic(econimcData);
        sendLetters(randomResult);

        document.getElementById('letters').innerHTML = "Количество писем " + letters + 'шт.';
        letters = letters - speed;
        totalLetters++;
        logisticResult = logisticResult + (randomResult * 25)

        result = logisticResult + totalLetters * 25;
        econimcData.order[0] = totalLetters * 25
        econimcData.order[1] = logisticResult
        econimcData.order[2] = result

        document.getElementById('sortedResult').innerHTML = "Количество отсортированных писем " + totalLetters + 'шт.';
        document.getElementById('amountResult').innerHTML = "Затраты " + totalLetters * 25 + 'руб.';
        document.getElementById('logisticResult').innerHTML = "Затраты на логистику " + logisticResult + 'руб.';
        document.getElementById('result').innerHTML = "Суммарные затраты " + result + 'руб.';
    }

    sessionTime();

    if (letters <= 0) {
        if (confirm("Внимание. Все письма отсортированы, добавить новые письма?")) {
            letters = prompt("Введите количество писем для сортировки", "")
        } else {
            document.location.reload()
        }
    }


}, 1000)

const createGraphic = (grdata) => {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: grdata.labels,
            datasets: [{
                label: 'Скорость отправки писем',
                backgroundColor: 'rgba(255, 255, 255, 0)',
                borderColor: 'rgb(255, 99, 132)',
                data: grdata.speed
            }]

        },
        options: {
            scales: {
                animation: {
                    duration: 0
                }
            }
        }
    });

}

const createEconomicGraphic = (grdata) => {
    var ctx = document.getElementById('myEconomicChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: grdata.labels,

            datasets: [{

                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                label: 'Экономический показатель',
                backgroundColor: 'rgba(255, 255, 255, 0)',
                borderColor: 'rgb(255, 99, 132)',
                data: grdata.order,
                borderWidth: 1
            }]

        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}



document.querySelector('.restart').onclick = () => {
    document.location.reload();
    alert('Перезагрузка системы')
}

document.querySelector('.button_start').onclick = () => {
    isStarted = true;
    alert('Система запущена')
}

document.querySelector('.button_stop').onclick = () => {
    isStarted = false;
    alert('Система приостановлена')
}

document.querySelector('.button_increase_speed').onclick = () => {
    speed += 1;
    alert('Скорость сортировки писем увеличена')
}

document.querySelector('.button_decrease_speed').onclick = () => {
    if (speed > 1) {
        speed -= 1
        alert('Скорость сортировки писем уменьшена')
    };
}


function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

function getCurrentTime() {
    const now = new Date();
    let time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    let date = `${now.getDate()}-${(now.getMonth() + 1)}-${now.getFullYear()}`;
    return {
        time,
        date
    }
}


setInterval(() => {
    if (isStarted) {
        isStarted = false;

        alert('Возникла аварийная ситуация, найдено письмо без индекса')
        isStarted = true;
    }
}, 40000)

setInterval(() => {
    if (isStarted) {
        isStarted = false;

        alert('Возникла аварийная ситуация, письмо является открытым и пустым')
        isStarted = true;
    }
}, 60000)