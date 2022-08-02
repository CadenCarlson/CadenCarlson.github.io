let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');
let nav = document.querySelector('.navbar');
let LastScrollY = window.scrollY;


window.addEventListener('DOMContentLoaded', ()=>{

    setTimeout(()=>{
        logoSpan.forEach((span, idx) => {
            setTimeout(()=>{
                span.classList.add('active');
            }, (idx + 1) * 400)
        });
    
    setTimeout(()=>{
        logoSpan.forEach((span, idx) => {
            setTimeout(()=>{
                span.classList.remove('active');
                span.classList.add('fade');
            }, (idx + 1) * 50)
           })
       }, 1250);

       setTimeout(()=>{
           intro.style.top = '-100vh';
       }, 2000)
    })
})

// Karl Parks Pie Chart
var skillVar = document.getElementById('skillDiv');

//hover events:
//https://plot.ly/javascript/hover-events/
//https://community.plot.ly/t/how-to-customize-plotly-tooltip/332/24

//imported version using a csv
var data;
var allParents;
Plotly.d3.csv(/resources/Carlson-Skills.csv, function(err, rows){
  function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  };

  function addBreaks(manyStrings) {
    //test code
    // console.log(manyStrings.length);
    // stringNum = 8;
    // numOfWords = manyStrings[stringNum].split(' ').length;
    // console.log("# Words:" + numOfWords);
    // console.log(manyStrings[stringNum].replace(/((\w+\W+){5})/, '$1<br/>'));

    //looping and resave
    var skipWords = 4;
    var re = new RegExp('((\\w+\\W+){' + skipWords +'})','g');
    var i;
    for (i = 0; i < manyStrings.length; i++) {
      //console.log(manyStrings[i].replace(re, '$1<br>'));
      manyStrings[i] = manyStrings[i].replace(re, '$1<br>');
    }

    return manyStrings;
  }

  data = [
      {
        type: "sunburst",
        labels: unpack(rows, 'labels'),
        parents: (allParents = unpack(rows, 'parents')),
        textfont: {"color": "black"},
        insidetextfont: {"color": "white"},
        // meta: unpack(rows, 'short'),
        hovertext: addBreaks(unpack(rows, 'short')),
        hovertemplate: "%{label}<extra>%{hovertext}</extra>",
        leaf: {"opacity": 0.75},
        marker: {"line": {"width": 3}},
        insidetextorientation: 'radial',
        branchvalues: 'total',
        hoverlabel: {"align": "left"},
      }
  ];

// var data = [
// {
//   type: "sunburst",
//   labels: dataImported[0].labels, //combinedLabels
//   parents: dataImported[0].parents, //combinedParents
//   // "values":  [65, 14, 12, 10, 2, 6, 6, 4, 4],
//   leaf: {"opacity": 0.75},
//   marker: {"line": {"width": 3}},
//   insidetextorientation: 'radial',
//   branchvalues: 'total',
//   // hovertext: ["This is a whoe bunch of useless text that you will never use in your life because this is just a test so ignore the test text if you get what I mean ya know fool? Like don't bother me when I'm testing this shit out okay? I feel like you are all up in my stuff here and I just don't like it okay."],
//   // hovertemplate:
//   //   "<b>%{label}</b><br><br>" +
//   //   "<extra><b>Description:</b>%{hovertext}</extra>",
//   showlegend: false,
//   // meta: ["", "", "", "", "", "", "", "MATLAB is the only language taught in the SDSU Aerospace<br> Department and is widely used in several of our lab<br> courses. I am extremely proficient with the MATLAB language and<br> IDE and have developed code in my professional job."],
//   // hovertemplate: "%{label}<extra>%{meta}</extra>",
//   // "hoverlabel": {"align": "center"},
// }];

var layout = {
  "margin": {"l": 0, "r": 0, "b": 0, "t": 0},
};

Plotly.plot(skillVar, data, layout, {responsive: true, displayModeBar: false})

//Hover interaction
// var hoverInfo = document.getElementById('hoverinfo');
// skillVar.on('plotly_hover', function(data){
//   var xaxis = data.points[0].xaxis,
//       yaxis = data.points[0].yaxis;
//
//   var infotext = data.points.map(function(d){
//     console.log("Hovering Over: " + d.label);
//     // hoverInfo.innerHTML = d.meta + "<br>";
//   });
// })
// .on('plotly_unhover', function(data){
//    // hoverInfo.innerHTML = '';
// });

//Click interaction
skillVar.on('plotly_click', function(data){
  var xaxis = data.points[0].xaxis,
      yaxis = data.points[0].yaxis;
  var infotext = data.points.map(function(d){
    console.log('Clicked: ' + d.label);
    if (allParents.indexOf(d.label) > -1) {
      changePlotLabel(d.label);
    }
    // else {
    //   if (hoverInfo.innerHTML === undefined) {
    //     (hoverInfo.innerHTML) = d.meta;
    //     window.location = (""+window.location).replace(/#[A-Za-z0-9_]*$/,'')+"#mySkills";
    //   }
    // }
  });
});

var prevParent = "";
function changePlotLabel(clickedLabel){
  if (clickedLabel != prevParent) {
    data[0].insidetextorientation = 'horizontal';
    prevParent = clickedLabel;
  }
  else { //need to fix if user clicks to many times
    data[0].insidetextorientation = 'radial';
    prevParent = "";
  }
};

});
