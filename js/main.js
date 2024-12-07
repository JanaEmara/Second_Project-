var sitenameInput = document.getElementById("sitename");
var siteurlInput = document.getElementById("siteurl");

// List to store the sites
var siteList = [];

// Check if there are any saved sites in localStorage and load them
(function() {
    if (JSON.parse(localStorage.getItem("allSites"))) {
        siteList = JSON.parse(localStorage.getItem("allSites"));
        displaysite(siteList);
    }
})();

// Add new site to the list
function addsite() {
    var sitename = sitenameInput.value;
    var siteurl = siteurlInput.value;

    // If both inputs are valid, proceed to add the site
    if (ValidateForm(sitenameInput) && ValidateForm(siteurlInput)) {
        var siteinfo = {
            name: sitename,
            url: siteurl
        };

        siteList.push(siteinfo);
        localStorage.setItem("allSites", JSON.stringify(siteList));
        displaysite(siteList);
        clearForm();
    }
}

// Clear the form after adding the site also removing the error after being inputted correctly 
function clearForm() {
    sitenameInput.value = "";
    siteurlInput.value = "";
    sitenameInput.classList.remove("is-invalid", "is-valid");
    siteurlInput.classList.remove("is-invalid", "is-valid");
    document.getElementById("sitename-error").classList.add("d-none");
    document.getElementById("siteurl-error").classList.add("d-none");
}

// Display the site list in the table,blackbox variable is a string containing all the HTML code generated in the displaysite() which is the table content 
function displaysite(list) {
    var blackbox = "";

    for (var i = 0; i < list.length; i++) {
        blackbox += `
            <tr>
                <td>${i + 1}</td>
                <td>${list[i].name}</td>
                <td><button type="button" class="btn btn-success" onclick="window.open('${list[i].url}')"><i class="fa-solid fa-eye"></i> Visit</button></td>
                <td><button onclick="deleteSite(${i})" type="button" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
            </tr>`;
    }

    document.getElementById("bookmarkTable").innerHTML = blackbox;
}

// Delete a site from the list then updating the localstorage then refreshing the display
function deleteSite(deletebyindex) {
    siteList.splice(deletebyindex, 1);
    localStorage.setItem("allSites", JSON.stringify(siteList));
    displaysite(siteList);
}

function ValidateForm(input) {
    var regex = {
        sitename: /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*$/, // First letter uppercase, followed by any combination of uppercase or lowercase letters, with spaces allowed
        siteurl: /^https:/
    };

    var isValid = regex[input.id].test(input.value);

    if (isValid) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        input.nextElementSibling.classList.replace("d-block", "d-none");
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        input.nextElementSibling.classList.replace("d-none", "d-block");
    }

    return isValid;
}


