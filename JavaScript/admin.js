fetch('./JavaScript/team.json') // We fetch the data from the JSON file
    .then(function (responce) {
        return responce.json();
    })
    .then(function (teams) {
        let driverplaceholder = document.querySelector("#driver-output");
        let driver_output = "";
        console.log(teams)
        for (let team in teams) { // We loop through the JSON
            driver_output += `
                        <tr>
                            <td>${teams[team].driver_1}</td>
                            <td>${teams[team].name}</td>
                            <td data-sort-value='${teams[team].driver_1_points}'>${teams[team].driver_1_points}</td>
                            <td><input /></td>
                            <td><button>Update</button></td>
                        </tr>
                        <tr>
                            <td>${teams[team].driver_2}</td>
                            <td>${teams[team].name}</td>
                            <td data-sort-value='${teams[team].driver_2_points}'>${teams[team].driver_2_points}</td>
                            <td><input /></td>
                            <td><button>Update</button></td>
                        </tr>
                    </td>
                </tr>
            `;
        }

        driverplaceholder.innerHTML = driver_output; // Displaying the data from the Json

    });

// This was me trying to find out how to update data in my JSON file and I did not finish this.
const fs = require('fs');
const fileName = './team.json';
const file = require(fileName);

file.key = "driver_1_points";

fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
    if (err) return console.log(err);
    console.log(JSON.stringify(file));
    console.log('writing to ' + fileName);
});