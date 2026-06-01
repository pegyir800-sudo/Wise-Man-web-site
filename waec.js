let chart;

/* THEME TOGGLE */

function toggleTheme(){

document.body.classList.toggle("light-mode");

localStorage.setItem(
"waecTheme",
document.body.classList.contains("light-mode")
? "light"
: "dark"
);

}

/* LOAD SAVED THEME */

window.addEventListener("load",()=>{

if(localStorage.getItem("waecTheme")==="light"){

document.body.classList.add("light-mode");

}

loadSavedResults();

});

/* GRADE SYSTEM */

function getGrade(score){

if(score>=75){

return{
grade:"A1",
remark:"Excellent"
};

}

else if(score>=70){

return{
grade:"B2",
remark:"Very Good"
};

}

else if(score>=65){

return{
grade:"B3",
remark:"Good"
};

}

else if(score>=60){

return{
grade:"C4",
remark:"Credit"
};

}

else if(score>=55){

return{
grade:"C5",
remark:"Credit"
};

}

else if(score>=50){

return{
grade:"C6",
remark:"Credit"
};

}

else if(score>=45){

return{
grade:"D7",
remark:"Pass"
};

}

else if(score>=40){

return{
grade:"E8",
remark:"Pass"
};

}

else{

return{
grade:"F9",
remark:"Fail"
};

}

}

/* MAIN CALCULATOR */

function calculateResults(){

const subjects=[

["Mathematics","mathematics"],
["English Language","english"],
["Biology","biology"],
["Chemistry","chemistry"],
["Physics","physics"],
["ICT","ict"],
["Economics","economics"],
["Government","government"],
["Literature","literature"]

];

let total=0;
let passCount=0;
let a1Count=0;

let resultHTML="";

let chartLabels=[];
let chartScores=[];

subjects.forEach(subject=>{

let score=parseInt(
document.getElementById(subject[1]).value
);

if(isNaN(score)){

score=0;

}

if(score<0 || score>100){

alert(
subject[0] +
" must be between 0 and 100"
);

throw new Error();

}

const result=getGrade(score);

total+=score;

if(score>=40){

passCount++;

}

if(result.grade==="A1"){

a1Count++;

}

let gradeClass="grade-f";

if(result.grade==="A1"){

gradeClass="grade-a1";

}
else if(
result.grade.startsWith("B")
){

gradeClass="grade-b";

}
else if(
result.grade.startsWith("C")
){

gradeClass="grade-c";

}
else if(
result.grade.startsWith("D") ||
result.grade.startsWith("E")
){

gradeClass="grade-d";

}

resultHTML+=`

<tr>

<td>${subject[0]}</td>

<td>${score}</td>

<td class="${gradeClass}">
${result.grade}
</td>

<td>${result.remark}</td>

</tr>

`;

chartLabels.push(subject[0]);
chartScores.push(score);

});

document.getElementById(
"resultTable"
).innerHTML=resultHTML;

/* DASHBOARD */

const average=
(total/subjects.length).toFixed(1);

const passRate=
((passCount/subjects.length)*100)
.toFixed(1);

document.getElementById(
"aggregateScore"
).innerHTML=total;

document.getElementById(
"averageScore"
).innerHTML=average+"%";

document.getElementById(
"a1Count"
).innerHTML=a1Count;

document.getElementById(
"passRate"
).innerHTML=passRate+"%";

/* PERFORMANCE */

let performance="";

if(average>=75){

performance=
"🏆 Excellent Performance";

}

else if(average>=65){

performance=
"⭐ Very Good Performance";

}

else if(average>=50){

performance=
"👍 Good Performance";

}

else if(average>=40){

performance=
"⚠ Average Performance";

}

else{

performance=
"❌ Needs Improvement";

}

document.getElementById(
"performanceBadge"
).innerHTML=performance;

/* CHART */

createChart(
chartLabels,
chartScores
);

}

/* CHART CREATOR */

function createChart(
labels,
scores
){

const ctx=
document.getElementById(
"waecChart"
);

if(chart){

chart.destroy();

}

chart=new Chart(ctx,{

type:"bar",

data:{

labels:labels,

datasets:[{

label:"WAEC Scores",

data:scores,

borderWidth:1

}]

},

options:{

responsive:true,

plugins:{

legend:{
display:true
}

},

scales:{

y:{

beginAtZero:true,

max:100

}

}

}

});

}

/* SAVE RESULTS */

function saveResults(){

const data={

studentName:
document.getElementById(
"studentName"
).value,

schoolName:
document.getElementById(
"schoolName"
).value,

examYear:
document.getElementById(
"examYear"
).value,

mathematics:
document.getElementById(
"mathematics"
).value,

english:
document.getElementById(
"english"
).value,

biology:
document.getElementById(
"biology"
).value,

chemistry:
document.getElementById(
"chemistry"
).value,

physics:
document.getElementById(
"physics"
).value,

ict:
document.getElementById(
"ict"
).value,

economics:
document.getElementById(
"economics"
).value,

government:
document.getElementById(
"government"
).value,

literature:
document.getElementById(
"literature"
).value

};

localStorage.setItem(
"waecAnalyzer",
JSON.stringify(data)
);

alert(
"Results Saved Successfully"
);

}



localStorage.setItem(
"averageScore",
average
);

localStorage.setItem(
"aggregateScore",
aggregate
);

localStorage.setItem(
"performanceLevel",
performance
);



/* LOAD SAVED DATA */

function loadSavedResults(){

const saved=
localStorage.getItem(
"waecAnalyzer"
);

if(!saved){

return;

}

const data=
JSON.parse(saved);

Object.keys(data)
.forEach(key=>{

const el=
document.getElementById(key);

if(el){

el.value=data[key];

}

});

}

/* PRINT REPORT */

function printReport(){

window.print();

}