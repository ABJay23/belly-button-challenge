// WAs helped by Dom
console.log("Welcome");
// variable to hold url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function DrawBargraph(sampleId)
{
    console.log(`DrawBargraph(${sampleId})`);
    d3.json(url).then(data => {
        console.log(data);
        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];
        // console.log(`result = ${result}`);

    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;


    let yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`);
    // create trace object
    let barData = {
        x: sample_values.slice(0, 10),
        y: yticks,
        type: "bar",
        text: otu_labels.slice(0, 10),
        orientation: "h"
    };


    // put trace object into an array
    let barArray = [barData];

    // layout object
    let barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: {t: 30},
    }
    // call plotly function
    Plotly.newPlot("bar", barArray, barLayout);
    
 });
}

function DrawBubblechart(sampleId)
{
    console.log(`DrawBubblechart(${sampleId})`);
    d3.json(url).then(data => {

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        // create a trace
        let bubbleData = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"


            }

        };
        // put the trace into an array
        let bubbleArray = [bubbleData];

        // create a layout object
        let  bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: {t: 30},
            hovermode: "closest", 
            xaxis: {title: "OTU ID"}
        };

        //  call plotly
        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
    });
}

function ShowMetadata(sampleId)
{
    console.log(`ShowMetadata(${sampleId})`);
}


function optionChanged(sampleId)
{
    console.log(`optionChanged, new value: ${sampleId}`);


function DrawGauge(sampleId)
{
    console.log(`DrawGauge(${sampleId})`);
}















    DrawBargraph(sampleId);
    DrawBubblechart(sampleId);
    ShowMetadata(sampleId);
    DrawGauge(sampleId);
}

function InitDashboard()
{
    console.log('InitDashboard()');
    // get a handle to the dropdown
    let selector = d3.select("#selDataset");
    
    d3.json(url).then(data => {
        console.log("The data:", data);

        let sampleNames = data.names;
        console.log("the sample names:", sampleNames);

        for (let i = 0; i < sampleNames.length; i++) {

            let sampleId = sampleNames[i];
            // console.log(`sampleId = ${sampleID}`);
            selector.append("option").text(sampleId).property("value, sampleId");
        };

        // Read current value from dropdown
        let initialId = selector.property("value");
        console.log(`initialId = ${initialId}`);

        // Bargraph for the selected sample id
        DrawBargraph(initialId)
        // Bubble chart for selected sample id
        DrawBubblechart(initialId);
        // metadata for the selected sample id
        ShowMetadata(initialId);
        // DrawGauge for selected sample id
        DrawGauge(initialId);
    });
}

InitDashboard();