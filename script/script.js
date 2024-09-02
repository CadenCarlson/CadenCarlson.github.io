let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');
let nav = document.querySelector('.navbar');
let LastScrollY = window.scrollY;
var NavbarHome = document.getElementById("navbarHome");
var NavbarAbout = document.getElementById("navbarAbout");
var NavbarSkills = document.getElementById("navbarSkills");
var NavbarPortfolio = document.getElementById("navbarPortfolio");
var NavbarContact = document.getElementById("navbarContact");
let lastHighlight = NavbarHome;

// Handles Welcome Animation
function welcome() {
  setTimeout(()=>{
    logoSpan.forEach((span, idx) => {
        setTimeout(()=>{
            span.classList.add('active');
        }, (idx + 1) * 200)
    });

setTimeout(()=>{
    logoSpan.forEach((span, idx) => {
        setTimeout(()=>{
            span.classList.remove('active');
            span.classList.add('fade');
        }, (idx + 1) * 25)
       })
   }, 1000);

   setTimeout(()=>{
       intro.style.top = '-100vh';
   }, 1000)
})
}

// Handles Navbar Highlighting
function navbarHighlight() {
  LastScrollY = window.scrollY;
  let currentLocation = window.location.href;
  if (currentLocation.includes('index.html') || currentLocation.includes('#')){
      console.log(currentLocation.length);
      if (LastScrollY >= 0 && LastScrollY < 500){
      lastHighlight.classList.add('text-white');
      NavbarHome.classList.remove('text-white');
      lastHighlight = NavbarHome;
  } else if (LastScrollY >= 500 && LastScrollY < 1300){
      lastHighlight.classList.add('text-white');
      NavbarAbout.classList.remove('text-white');
      lastHighlight = NavbarAbout;
  } else if (LastScrollY >= 1300 && LastScrollY < 2200){
      lastHighlight.classList.add('text-white');
      NavbarSkills.classList.remove('text-white');
      lastHighlight = NavbarSkills;
  } else if (LastScrollY >= 2200 && LastScrollY < 2800){
      lastHighlight.classList.add('text-white');
      NavbarPortfolio.classList.remove('text-white');
      lastHighlight = NavbarPortfolio;
  } else if (LastScrollY >= 2800 && LastScrollY < 3000){
      lastHighlight.classList.add('text-white');
      NavbarContact.classList.remove('text-white');
      lastHighlight = NavbarContact;
  }
  }
}


// Event Listeners
window.addEventListener('DOMContentLoaded', welcome);
window.addEventListener('scroll', navbarHighlight);



// Karl Parks Pie Chart
var skillVar = document.getElementById('skillDiv');

//imported version using a csv
var data;
var allParents;
Plotly.d3.csv('./docs/Carlson-Skills.csv', function(err, rows){
  function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  };

  function addBreaks(manyStrings) {
    
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

var layout = {
  "margin": {"l": 0, "r": 0, "b": 0, "t": 0},
};

Plotly.plot(skillVar, data, layout, {responsive: true, displayModeBar: false})

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