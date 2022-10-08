let mainDiv = document.getElementById("main-div");

let foot = document.getElementById("foot");
let date = new Date().getFullYear();
foot.innerHTML = `&copy; ${date} |&ThickSpace;<a href="https://www.linkedin.com/in/mohit-kumar-patel/" target="_blank">Mohit Kumar Patel</a>`;


fetch("https://www.kontests.net/api/v1/all")
    .then(res => res.json())
    .then(data => data.forEach(element => {
        //When we fetch the data from API

        //Creating Elements
        let subDiv = document.createElement("details");
        let name = document.createElement("summary");
        let table = document.createElement("table")
        name.innerHTML = element.name;
        //Calculating Date
        let arrOfDate = DateCalc(element.start_time , element.end_time);

        let temp1 = element.status === "CODING" ? "Yes" : "No";
        let temp2 = durationCalc(element.duration);

        //Row1 Making
        let row1ValArr = ["Website ","Opens At ","Timing ","Closes At ","Timing ","Duration ","URL ","is Live "]
        
        //Row2 Making
        let row2ValArr = [element.site,arrOfDate[0],arrOfDate[2],arrOfDate[1],arrOfDate[3],`Approx.  ${temp2}`,` <a href="${element.url}" target="_blank">Click Here To Visit Site </a>`,temp1]

        for (let index = 0; index < row2ValArr.length; index++) {
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            
            td1.innerHTML =`&MediumSpace; <b>${row1ValArr[index]}</b>`;
            td2.innerHTML = "<b>&MediumSpace; : &MediumSpace;</b>"
            td3.innerHTML = `&MediumSpace; ${row2ValArr[index]}`;

            tr.append(td1 , td2 , td3);
            table.append(tr);
        }

        //Giving them class name
        subDiv.classList.add("sub-div")
        name.classList.add("name");

        //Appending the elements
        subDiv.append(name , table);
        mainDiv.append(subDiv);

    })).catch(e => {
        //When we are unable to fetch data from API
        mainDiv.innerHTML = `<div class="error">${e}</div>`;
    })

const DateCalc = function(stDate , endDate){
    let sdt = stDate.substring(0 , 10);
    let edt = endDate.substring(0 , 10);
    let stm = stDate.substring(11 , 19);
    let etm = endDate.substring(11 , 19);

    let finStartDate = sdt.substring(8,10) + sdt.substring(4,7) + "-" + sdt.substring(0,4); 
    let finEndDate = edt.substring(8,10) + edt.substring(4,7) + "-" + edt.substring(0,4);
    let finStartTime;
    let finEndTime;
    let hour = stm.substring(0 , 2);
    if(hour === "00"){
        finStartTime = "12" + stm.substring(2 , 5) + " AM";  
    }
    else if(hour === "12"){
        finStartTime = "12" + stm.substring(2 , 5) + " PM";
    }
    else if(hour > 12){
        hour -= 12;
        if(hour > 9){
            finStartTime =  hour + stm.substring(2 , 5) + " PM";
        }  
        else{
            finStartTime = "0" + hour + stm.substring(2 , 5) + " PM";
        }
    }
    else{
        finStartTime = stm.substring(0 , 5) + " AM";
    }

    hour = etm.substring(0 , 2);
    if(hour === "00"){
        finEndTime = "12" + etm.substring(2 , 5) + " AM";  
    }
    else if(hour === "12"){
        finEndTime = "12" + etm.substring(2 , 5) + " PM";  
    }
    else if(hour > 12){
        hour -= 12;
        if(hour > 9){
            finEndTime =  hour + etm.substring(2 , 5) + " PM";
        }  
        else{
            finEndTime = "0" + hour + etm.substring(2 , 5) + " PM";
        }  
    }
    else{
        finEndTime = etm.substring(0 , 5) + " AM";
    }

    let answerArr = [finStartDate , finEndDate , finStartTime , finEndTime];
    return answerArr;
}

const durationCalc = function(dura){
    dura = Math.floor(dura);
    if(dura > 31536000){
        return Math.floor(dura/31536000) + " Years";
    }
    if(dura > 2592000){
        return Math.floor(dura/2592000) + " Months";
    }
    if(dura > 604800){
        return Math.floor(dura/604800) + " Weeks";
    }
    if(dura > 86400){
        return Math.floor(dura/86400) + " Days";
    }
    if(dura > 3600){
        return Math.floor(dura/3600) + " Hours";
    }
    else{
        return Math.floor(dura/60) + " Minutes";
    }
}