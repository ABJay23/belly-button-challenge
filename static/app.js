console.log("Hey there");

function DrawBargraph(sampleId)
{
    console.log(`DrawBargraph(${sampleId})`);
}

function DrawBubblechart(sampleId)
{
    console.log(`DrawBubblechart(${sampleId})`);
}

function ShowMetadata(sampleId)
{
    console.log(`ShowMetadata(${sampleId})`);
}

function DrawGauge(sampleId)
{
    console.log(`DrawGauge(${sampleId})`);
}


function optionChanged(sampleId)
{
    console.log(`optionChanged, new value: ${sampleId}`);

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
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    d3.json(url).then(data => {
        console.log("The data:", data);

        let sampleNames = data.names;
        console.log("the sameple names:", sampleNames);

        for (let i = 0; i < sampleNames.length; i++) {
            let sampleId = sampleNames[i];
            console.log(`sampleId = ${sampleId}`);
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