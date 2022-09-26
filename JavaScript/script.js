$(document).ready(function () { // Only gonna execute the code when page is done loading
    fetch('./JavaScript/Pointsystem.json') // We fetch the data from the JSON file
        .then(function (responce) {
            return responce.json();
        })
        .then(function (points) {
            let placeholder = document.querySelector("#point-output");
            let point_output = "";
            console.log(points)
            for (let point in points) { // We loop through the JSON
                point_output += `
                    <tr>
                        <td>${points[point].Place}</td>
                        <td>${points[point].Points}</td>
                    </tr>
                `;
            }

            placeholder.innerHTML = point_output;
        });

    fetch('./JavaScript/team.json') // We fetch the data from the JSON file
        .then(function (responce) {
            return responce.json();
        })
        .then(function (teams) {
            let teamsplaceholder = document.querySelector("#team-output");
            let team_output = "";
            console.log(teams)
            for (let team in teams) { // We loop through the JSON
                team_output += `
                    <tr>
                        <td>${teams[team].name}</td>
                        <td>${teams[team].points}</td>
                    </tr>
                `;
            }

            teamsplaceholder.innerHTML = team_output;

            let driverplaceholder = document.querySelector("#driver-output");
            let driver_output = "";
            console.log(teams)

            let totalRace = teams[0].driver_1_points;
            for (let team in teams) { // We loop through the JSON
                let driverpoint1 = (teams[team].driver_1_points / totalRace) * 100;
                console.log(driverpoint1)
                let driverpoint2 = (teams[team].driver_2_points / totalRace) * 100;
                driver_output += `
                        <tr>
                            <td>${teams[team].driver_1}</td>
                            <td>${teams[team].name}</td>
                            <td data-sort-value='${teams[team].driver_1_points}'>${teams[team].driver_1_points}</td>
                            <td>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: ${driverpoint1}%" aria-valuenow="${driverpoint1}%" aria-valuemin="0" aria-valuemax="${totalRace}">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>${teams[team].driver_2}</td>
                            <td>${teams[team].name}</td>
                            <td data-sort-value='${teams[team].driver_2_points}'>${teams[team].driver_2_points}</td>
                            <td>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: ${driverpoint2}%" aria-valuenow="${driverpoint2}%" aria-valuemin="0" aria-valuemax="${totalRace}">
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </td>
                </tr>
            `;
            }

            driverplaceholder.innerHTML = driver_output;

            let driverUpdate = document.querySelector("#update");
            let driverUpdate_output = "";
            console.log(teams);

            for (let team in teams) { // We loop through the JSON
                driverUpdate_output += `
                    <p>${teams[team].driver_1}</p>
                    <p>${teams[team].driver_2}</p>
                `;
            }

            driverUpdate.innerHTML = driverUpdate_output;

        });


    for (let i = 0; i < 1; i++) {
        document.getElementById("driverOrder").click();
    }

});

// The login function, it checks if the password and username is correct 
// and sends you to the admin page if true
function loginBtn() {
    let username = "admin";
    let password = "admin";

    let usernameInput = document.getElementById('floatingInput').value;
    let passwordInput = document.getElementById('floatingPassword').value;

    if (usernameInput == username && passwordInput == password) {

        window.location = "./adminpage.html";
    } else {
        alert("Did not work");
    }

    console.log("return:" + usernameInput, passwordInput);
}


// This was a try to make a counter of visitors on the site, and is not implementet
const COUNT_URL = `./JavaScript/counter.json`;

const counter = document.getElementById('counter');

const getCount = async () => {
    const response = await fetch(`${COUNT_URL}`);
    const data = await response.json();
    setValue(data.value);
};

const incrementCount = async () => {
    const response = await fetch(`${COUNT_URL}`);
    const data = await response.json();
    setValue(data.value);
};

const setValue = (num) => {
    var str = num.toString().padStart(6, "0");
    for (let index = 0; index < str.length; index++) {
        const element = str[index];
        counter[index].innerHTML = element;
    }
};

if (localStorage.getItem("hasVisited") == null) {
    incrementCount()
        .then(() => {
            localStorage.setItem("hasVisited", "true");
        })
        .catch((err) => console.log(err));
} else {
    getCount()
        .catch((err) => console.log(err));
}