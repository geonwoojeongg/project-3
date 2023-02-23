// Assign the url as a constant
let url = 'http://127.0.0.1:5000/api/v1.0/health'


// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

// d3.json(url).then(function(data) {
//   let values = Object.values(data);
//   samples=values[1]
//   for (let i = 0; i < samples.length; i++) {
//     sample = samples[i];
//     console.log(sample)
//     let dropdownMenu = d3.select("#selDataset")
//     dropdownMenu.append("option").text(sample.id)
//   };
// });

// function optionChanged(value) {
//   plotter(value)
// };

// function init() {
//   plotter("940")
// }; 

// function plotter(sample_id) {
//   d3.json(url).then(function(data) {

//     let values = Object.values(data);
//     samples=values[2];
//     metadata=values[1];


//     for (let i = 0; i < samples.length; i++) {
      
//       sample=samples[i]
      
//       if (sample.id == sample_id) {
//         let barX_axis = sample.sample_values.slice(0, 10).reverse();
//         let barY_axis = sample.otu_ids.slice(0, 10).map(item => `OTU ${item}`).reverse();
//         let barLabels = sample.otu_labels.slice(0, 10).reverse();

//         console.log(barX_axis);
//         console.log(barY_axis);
//         console.log(barLabels);

//         let barTrace = {
//             x: barX_axis,
//             y: barY_axis,
//             mode: 'markers', 
//             text: barLabels,
//             type: 'bar',
//             orientation: 'h'
//         };

//         let barData = [barTrace]; 

//         let barLayout = {
//             title: "Top Ten OTUs for Individual ",
//         };
        
//         Plotly.newPlot('bar', barData, barLayout);

//         // Assign variables for the bubble plot
//         let bubbleX_axis = sample.otu_ids;
//         let bubbleY_axis  = sample.sample_values;
//         let bubbleLabels = sample.otu_labels;

//         console.log(bubbleX_axis);
//         console.log(bubbleY_axis);
//         console.log(bubbleLabels);

//         // plot data
//         let bubbleTrace = {
//             x: bubbleX_axis,
//             y: bubbleY_axis,
//             mode: 'markers',
//             text: bubbleLabels,
//             marker: {
//               color: bubbleX_axis,  
//               size: bubbleY_axis,
//               colorscale: "Electric"
//             }
//           };

//         let bubbleData = [bubbleTrace];
          
//         // Assign layout as a variable
//         let bubbleLayout = {
//           title: 'All OTUs for the Individual',
//           xaxis: {
//               title: "OTU ID"
//           },
//           showlegend: false,
//           height: 500,
//           width: 1000
//         };
        
//         Plotly.newPlot('bubble', bubbleData, bubbleLayout);
        
//         // Demographics info data
//         let demo_info = metadata.filter(item => item.id == sample_id);

//         console.log(demo_info);

//         let demographic_info = demo_info[0];

//         // parses out all demografic variables

//         let age = demographic_info.age;
//         let bbtype = demographic_info.bbtype;
//         let ethnicity = demographic_info.ethnicity;
//         let gender = demographic_info.gender;
//         let id = demographic_info.id;
//         let location = demographic_info.location;
//         let wfreq = demographic_info.wfreq;

//         // creates the readable formating
//         let demoinfo = ` id: ${id} <br> ethnicity: ${ethnicity} <br> gender: ${gender} <br> age: ${age} <br> location: ${location} <br> bbtype: ${bbtype} <br> wfreq: ${wfreq}`
//         d3.select("#sample-metadata").html(demoinfo); 
        
//         // Wash frequency 
//         var freqData = [
//           {
//             domain: { x: [0, 1], y: [0, 1] },
//             marker: {size: 28, color:'red'},
//             value: wfreq,
//             title: { text: "Belly Button Washing Frequency <br> Scrubs per Week"},
//             titlefont: {family: '"Arial, Helvetica, sans-serif'},
//             type: "indicator",
//             mode: "number+gauge",
//             gauge: {
//               axis: {
//                 range: [0, 9],
//                 visible: true,
//                 ticks: "outside"},
//               steps: [
//                 { range: [0, 1], color: "Beige" },
//                 { range: [1, 2], color: "Bisque", text: "1-2" },
//                 { range: [2, 3], color: "DarkSeaGreen" },
//                 { range: [3, 4], color: "DarkKhaki" },
//                 { range: [4, 5], color: "DarkOliveGreen" },
//                 { range: [5, 6], color: "green" },
//                 { range: [6, 7], color: "darkgreen" },
//                 { range: [7, 8], color: "DarkSlateGrey" },
//                 { range: [8, 9], color: "DarkSlateGray" }
//               ],
//               threshold: {
//                 line: { color: "darkred", width: 5 },
//                 thickness: 2,
//                 value: wfreq
//               }
//             }
//           }
//         ];
        
//         var freqLayout = {
//           width: 500,
//           height: 450,
//           margin: { t: 100, b: 100, r: 100, l: 100 },
//         font: {color: "black", family: "Ariel"}
//       };
//         Plotly.newPlot('gauge', freqData, freqLayout);
//   }
//   }
//   })
// }; 

// init();

