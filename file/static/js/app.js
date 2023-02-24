const file = "/api/v1.0/health";
let d3Data = [];


// init
function init() {

  let dropdownMenu = d3.select("#selDataset");

  d3.json(file).then((data) => {

    console.log(data)
    // d3Data = data;
    for (let i=0; i<=data.length; i++){
    let gender = data[i].Gender;
    console.log(gender)
    }
  })

  // On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a letiable
  let dataset = dropdownMenu.property("value");
  console.log(dataset)
  // Initialize an empty array for the country's data
  // let data = [];
}

  // On change to the DOM, call getData()
  d3.selectAll("#selDataset2").on("change", getData);

  // Function called by DOM changes
  function getData() {
    let dropdownMenu = d3.select("#selDataset2");
    // Assign the value of the dropdown menu option to a letiable
    let dataset2 = dropdownMenu.property("value");
    console.log(dataset2)
    // Initialize an empty array for the country's data
    // let data = [];
  }

    // On change to the DOM, call getData()
    d3.selectAll("#selDataset3").on("change", getData);

    // Function called by DOM changes
    function getData() {
      let dropdownMenu = d3.select("#selDataset3");
      // Assign the value of the dropdown menu option to a letiable
      let dataset3 = dropdownMenu.property("value");
      console.log(dataset3)
      // Initialize an empty array for the country's data
      // let data = [];
    }

    // gender.forEach((id) => {
    //   dropdownMenu
    //     .append("option")
    //     .text(id)
    //     .property("value",id);
    // });

  //   let sample1 = names[0];

  //   Metadata(sample1);
  //   BarChart(sample1);
  //   BubbleChart(sample1);
  // });
};

// bar chart
// function BarChart(sample) {
//   let sampledata = d3Data.samples;
//   let value = sampledata.filter(info => info.id == sample);
//   let sampleinfo = value[0];

//   let otu_ids = sampleinfo.otu_ids;
//   let otu_labels = sampleinfo.otu_labels;
//   let sample_values = sampleinfo.sample_values;

//   let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
//   let xticks = sample_values.slice(0,10).reverse();
//   let labels = otu_labels.slice(0,10).reverse();
  
//   let trace1 = {
//       x: xticks,
//       y: yticks,
//       text: labels,
//       type: "bar",
//       orientation: "h"
//   };

//   let layout = {
//       title: "Top 10 OTUs Found"
//   };

//   Plotly.newPlot("bar", [trace1], layout)
// };

// // bubble chart
// function BubbleChart(sample) {
  
//   let sampledata = d3Data.samples;
//   let value = sampledata.filter(info => info.id == sample);
//   let sampleinfo = value[0];

//   let otu_ids = sampleinfo.otu_ids;
//   let otu_labels = sampleinfo.otu_labels;
//   let sample_values = sampleinfo.sample_values;

//   let trace2 = {
//       x: otu_ids,
//       y: sample_values,
//       text: otu_labels,
//       mode: "markers",
//       marker: {
//           size: sample_values,
//           color: otu_ids,
//           colorscale: "Earth"
//       }
//   };

//   let layout = {
//       hovermode: "closest",
//       xaxis: {title: "OTU ID"},
//   };

//   Plotly.newPlot("bubble", [trace2], layout)
// };

// // metadata
// function Metadata(sample) {

//   let metadata = d3Data.metadata;
//   debugger
//   let value = metadata.filter(info => info.id == sample);
//   let sampleinfo = value[0];

//   d3.select("#sample-metadata").html("");

//   Object.entries(sampleinfo).forEach(([key,value]) => {
//       d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
//   });
// };

// // call functions
// function optionChanged(value) { 
//   debugger
//   Metadata(value);
//   BarChart(value);
//   BubbleChart(value);
// };

init();
