/*
 * Last Updated: 01-09-2019
 * Author: Gerald Downey
 * To add new Courses: add an object with all properties to the "course_info" array
 */
function isInternetExplorer() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0) {
        return true;
    } else {
        return false;
    }

}

function lastUpdated() {
    if (!isInternetExplorer() || document.documentMode >= 11) {
        var x = new Date(document.lastModified);
        document.getElementById("last_edit").innerHTML = "Last Modified: " +  moment(x).format('MMMM Do YYYY');
    }
    if (isInternetExplorer() && document.documentMode < 11) {
         window.location.href = "https://nced.usps.gov/phonebook_emp.html"

    }

}

var screen_size = window.innerWidth