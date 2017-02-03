

URL = 'https://api.nasa.gov/EPIC/api/natural/images?api_key=d5w4GVRBnCiPMTQiXrqrXCOkGPensyJpd2S1SEOa'

var rawRequest = []
var arr_images = []

function parseRequestObject(objectNumber, objectKey) {
    //console.log(rawRequest[objectNumber])
    return rawRequest[objectNumber][objectKey]
}

function getImageURL(objectNumber) {
    var urlChunk = parseRequestObject(objectNumber, 'image')
    var image = 'https://epic.gsfc.nasa.gov/archive/natural/2017/02/01/png/' + urlChunk + '.png'
    return image;
}

function getFormatedDate(objectNumber) {

    function getMonthString(numMonth) {
        var months = ["x", "January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        return months[numMonth]
    }

    function getDayString(numDay) {
        var days = ["x", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31st"]
        return days[numDay]
    }

    var rawDate = parseRequestObject(objectNumber, 'date')

    var year = rawDate.substring(0, 4)
    var month = rawDate.substring(5, 7)
    var day = rawDate.substring(8, 10)
    var time = rawDate.substring(11,18)

    dateString = getMonthString(Number(month)) + " " + getDayString(Number(day)) + ", " + year + " at " + time
    return dateString;
}

function getFormatedCaption(objectNumber) {
    caption = parseRequestObject(objectNumber, 'caption')
    return caption;
}


function drawResponse(objectNumber) {
    mv.imgSrc = getImageURL(objectNumber)
    var caption = getFormatedCaption(objectNumber)
    var date = getFormatedDate(objectNumber)
    mv.pannelTitle = caption + " on " + date
}


function getRequest(URL) {
    var proxy = "http://bcw-getter.herokuapp.com/?url=";

    s = function (response) {
        console.info("success:")
        var response_parsed = JSON.parse(response)

        for (var i = 0; i < response_parsed.length; i++) {
            object = response_parsed[i]
            rawRequest.push(object)
        }

        console.info("Objects have been loaded into the data array.")
        console.info("length of rawRequest: ", rawRequest.length)


//-------------------------------------------------------//
        //var x = getFormatedCaption(5)
        //console.log("x: ", x)
        drawResponse(1)
//-------------------------------------------------------//

    }

    f = function (response) {
        console.log("fail:")
        console.log(response)
    }

    URL = proxy + URL;
    $.get(URL).then(s, f)
}



URL = 'https://api.nasa.gov/EPIC/api/natural/images?api_key=d5w4GVRBnCiPMTQiXrqrXCOkGPensyJpd2S1SEOa'
getRequest(URL)


//Random Notes

// image = 'epic_1b_20170201002712_01'
// image = 'https://epic.gsfc.nasa.gov/archive/natural/2017/02/01/png/'+image
// image = image+'.png'
// https://epic.gsfc.nasa.gov/archive/natural/2017/02/01/png/epic_1b_20170201002712_01.png
// https://epic.gsfc.nasa.gov/archive/natural/2017/02/01/png/epic_1b_20170201002712_01.png
