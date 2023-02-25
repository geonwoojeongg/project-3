const file = "/api/v1.0/health";
const NOT_SATISFIED_VALUE = 1;

let dropdown_gender = d3.select("#selDataset");
let dataset_gender = dropdown_gender.property("value");

let dropdown_marital = d3.select("#selDataset2");
let dataset_marital = dropdown_marital.property("value");

let dropdown_department = d3.select("#selDataset3");
let dataset_department = dropdown_department.property("value");

let dropdown_job = d3.select("#selDataset4");
let dataset_job = dropdown_job.property("value");

function init() {
    buildgenderpieChart("Male");
    buildbarChart("Married");
    buildDepartmentBarChart("Cardiology");
    buildJobSatisfactionpieChart(NOT_SATISFIED_VALUE);
};

function optionChangedGender(x) {
    buildgenderpieChart(x);
};

function optionChangedmarital(x) {
    buildbarChart(x);
};

function optionChangedDepartment(x) {
    buildDepartmentBarChart(x);
};

function optionChangedJobSatisfaction(x) {
    buildJobSatisfactionpieChart(x);
};

function buildgenderpieChart(x){
    d3.json(file).then((data) => {
      console.log(data)
    var resultArray = data.filter(sampleObj => sampleObj.Gender== x);
    console.log(resultArray)
    var totalGenderEmployee = resultArray.length;
    var yesArray = resultArray.filter(sampleObj => sampleObj.Attrition== "Yes");
    var noArray = resultArray.filter(sampleObj => sampleObj.Attrition== "No");
    let yes_att = yesArray.length;
    let no_att = noArray.length;
    let AttritionRate = yes_att / totalGenderEmployee;
    console.log(yes_att, no_att);

    const gendertrace = [{
        values: [AttritionRate, 1 - AttritionRate],
        labels: ['Attrition', 'No Attrition'],
        type: 'pie'
    }];

    const genderlayout = {
        title: 'Employee Gender vs. Attrition Rates'
    };

    Plotly.newPlot('gender_pie', gendertrace, genderlayout);
    });
};

function buildbarChart(x){
    d3.json(file).then((data) => {
      console.log(data)
      var resultArray = data.filter(sampleObj => sampleObj.MaritalStatus== x);
      console.log(resultArray)
      var yesArray = resultArray.filter(sampleObj => sampleObj.Attrition== "Yes");
      var noArray = resultArray.filter(sampleObj => sampleObj.Attrition== "No");
      let yes_att = yesArray.length;
      let no_att = noArray.length;
      console.log(yes_att, no_att)
      var bartrace = [{
        x: ['Yes', 'No'],
        y: [yes_att, no_att],
        name: 'Marital Status',
        type: 'bar',
        marker: {color:["green", "red"]}
      }];
      var barlayout = {title: 'Marital Status vs Attrition'};
      Plotly.newPlot('marital_bar', bartrace, barlayout);
    });
};

function buildDepartmentBarChart(x){
    d3.json(file).then((data) => {
      console.log(data)
      var resultArray = data.filter(sampleObj => sampleObj.Department== x);
      console.log(resultArray)
      var yesArray = resultArray.filter(sampleObj => sampleObj.Attrition== "Yes");
      var noArray = resultArray.filter(sampleObj => sampleObj.Attrition== "No");
      let yes_att = yesArray.length;
      let no_att = noArray.length;
      console.log(yes_att, no_att)
      var bartrace = [{
        x: [yes_att, no_att],
        y: ['Yes', 'No'],
        name: 'Department',
        type: 'bar',
        orientation: 'h',
        marker: {color:["green", "yellow"]}
      }];
      var barlayout = {
        title: 'Department vs Attrition'};
      Plotly.newPlot('department_bar', bartrace, barlayout);
    });
};

function buildJobSatisfactionpieChart(x){
    d3.json(file).then((data) => {
      console.log(data)
    var resultArray = data.filter(sampleObj => sampleObj.JobSatisfaction== x);
    console.log(resultArray)
    var totalJobSatisfaction = resultArray.length;
    var yesArray = resultArray.filter(sampleObj => sampleObj.Attrition== "Yes");
    var noArray = resultArray.filter(sampleObj => sampleObj.Attrition== "No");
    let yes_att = yesArray.length;
    let no_att = noArray.length;
    let AttritionRate = yes_att / totalJobSatisfaction;
    console.log(yes_att, no_att);
    const jobtrace = [{
        values: [AttritionRate, 1 - AttritionRate],
        labels: ["Attrition", "No Attrition"],
        type: "pie",
        hole: .4,
        marker: {
            colors:["yellow", "blue"]}
    }];
    const joblayout = {
        title: "Job Satisfaction Attrition Rates"
    };
    Plotly.newPlot("JobSatisfaction_pie", jobtrace, joblayout);
    });
};

init();