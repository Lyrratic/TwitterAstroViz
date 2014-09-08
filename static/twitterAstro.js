// ----------------------------------   pages   ----------------------------------

function home() {
	changeNav("about");
	console.log("Ready.");
}

function stats() {
	changeNav("stats");
	console.log("Ready.");
}

function organizationsInit(dataType) {
	changeNav("orgs");
	//might need to erase the graph first and then fade in.
	followVerb = "follow"
	retweetVerb = "reply to or retweet"

	followDataFile = "static/chord-data/friends-chord1.csv"
	retweetDataFile = "static/chord-data/repliesAndRetweets-chord1.csv"

	//default
	drawChord1(retweetDataFile, retweetVerb);

	// drawChord2("static/chord-data/repliesAndRetweets-chord2.json");
	// if (dataType) {
	// 	drawChord1("static/chord-data/" + dataType + ".csv");
	// }
	// else {
	// 	drawChord2("static/chord-data/repliesAndRetweets-chord2.json");
	// }
}

function individualsInit(dataType) {
	changeNav("individuals");
	drawChord2("static/chord-data/repliesAndRetweets-chord2.json");
}

function hashtagsInit(orgName){
	changeNav("hashtags");
	hashtags(orgName);
}

function mapInit(){
	changeNav("maps");
	map();
}

// ----------------------------------   helpers   ----------------------------------

function changeNav(id) {
	var d = document.getElementById(id);
	d.className = d.className + " selected";
}

//----------------------------------   graphs   ----------------------------------

function map() {
	 // sample data array
	var sample_data = [{"country": "afken", "name": "Kenya", "value": 1}, {"country": "euhun", "name": "Hungary", "value": 1}, {"country": "euswe", "name": "Sweden", "value": 1}, {"country": "aflbr", "name": "Liberia", "value": 1}, {"country": "eublr", "name": "Belarus", "value": 1}, {"country": "aschn", "name": "China", "value": 1}, {"country": "asafg", "name": "Afghanistan", "value": 1}, {"country": "sabol", "name": "Bolivia", "value": 1}, {"country": "eucze", "name": "Czech Republic", "value": 1}, {"country": "asbgd", "name": "Bangladesh", "value": 1}, {"country": "saper", "name": "Peru", "value": 2}, {"country": "afzwe", "name": "Zimbabwe", "value": 2}, {"country": "asomn", "name": "Oman", "value": 3}, {"country": "asind", "name": "India", "value": 3}, {"country": "aspak", "name": "Pakistan", "value": 3}, {"country": "euhrv", "name": "Croatia (Local Name: Hrvatska)", "value": 3}, {"country": "eusvk", "name": "Slovakia (Slovak Republic)", "value": 3}, {"country": "askaz", "name": "Kazakhstan", "value": 3}, {"country": "asisr", "name": "Israel", "value": 3}, {"country": "eusvn", "name": "Slovenia", "value": 3}, {"country": "asirn", "name": "Iran (Islamic Republic Of)", "value": 3}, {"country": "euaut", "name": "Austria", "value": 3}, {"country": "eupol", "name": "Poland", "value": 4}, {"country": "asnpl", "name": "Nepal", "value": 4}, {"country": "assgp", "name": "Singapore", "value": 4}, {"country": "ocnzl", "name": "New Zealand", "value": 5}, {"country": "eufin", "name": "Finland", "value": 5}, {"country": "eudnk", "name": "Denmark", "value": 5}, {"country": "assau", "name": "Saudi Arabia", "value": 7}, {"country": "afegy", "name": "Egypt", "value": 7}, {"country": "asmys", "name": "Malaysia", "value": 7}, {"country": "ashkg", "name": "Hong Kong", "value": 8}, {"country": "euprt", "name": "Portugal", "value": 10}, {"country": "asidn", "name": "Indonesia", "value": 13}, {"country": "sacol", "name": "Colombia", "value": 14}, {"country": "saven", "name": "Venezuela", "value": 16}, {"country": "astha", "name": "Thailand", "value": 17}, {"country": "euirl", "name": "Ireland", "value": 19}, {"country": "asirq", "name": "Iraq", "value": 28}, {"country": "saarg", "name": "Argentina", "value": 28}, {"country": "astur", "name": "Turkey", "value": 29}, {"country": "ocaus", "name": "Australia", "value": 30}, {"country": "sachl", "name": "Chile", "value": 31}, {"country": "asrus", "name": "Russian Federation", "value": 32}, {"country": "euesp", "name": "Spain", "value": 32}, {"country": "afmar", "name": "Morocco", "value": 35}, {"country": "eubel", "name": "Belgium", "value": 38}, {"country": "namex", "name": "Mexico", "value": 40}, {"country": "euita", "name": "Italy", "value": 40}, {"country": "asjpn", "name": "Japan", "value": 47}, {"country": "eudeu", "name": "Germany", "value": 50}, {"country": "nacan", "name": "Canada", "value": 73}, {"country": "nagrl", "name": "Greenland", "value": 83}, {"country": "eugbr", "name": "United Kingdom", "value": 173}, {"country": "eunld", "name": "Netherlands", "value": 178}, {"country": "eugrc", "name": "Greece", "value": 190}, {"country": "eufra", "name": "France", "value": 386}, {"country": "nausa", "name": "United States", "value": 690}]
	 
	// instantiate d3plus
	var visualization = d3plus.viz()
	    .container(".main-viz")    // container DIV to hold the visualization
	    .data(sample_data)        // data to use with the visualization
	    .coords("https://gist.githubusercontent.com/davelandry/9042807/raw/countries.json") // pass topojson coordinates
	    .type("geo_map")          // visualization type
	    .id("country")            // key for which our data is unique on
	    .text("name")             // key to use for display text
	    .color("value")           // key for coloring countries
	    .tooltip("value")         // keys to place in tooltip
	    .draw()                   // finally, draw the visualization!
	 
}

function hashtags(orgName) {
	var getOrg = function (orgName) {
		switch (orgName) {
		    case "CSA":
		        return CSA;
		    case "NASA":
		        return NASA;
		    case "ESA":
		        return ESA;
		    case "JAXA":
		        return JAXA;
		    case "Roscosmos":
		        return Roscosmos;
		    default:
		    	return ESA;
		}
	}

	org = getOrg(orgName);

	var getRandColor = function () {
	    colors = [
	      "rgb(224, 99, 99)",
	      "rgb(132, 48, 18)",
	      "rgb(175, 53, 0)",
	      "rgb(215, 75, 3)",
	      "rgb(179, 92, 30)",
	      "rgb(154, 68, 0)",
	      "rgb(201, 133, 58)",
	      "rgb(228, 186, 121)",
	      "rgb(245, 221, 158)",
	      "rgb(243, 210, 97)",
	      "rgb(196, 179, 70)",
	      "rgb(148, 177, 83)",
	      "rgb(37, 67, 34)",
	      "rgb(117, 158, 128)",
	      "rgb(79, 100, 86)",
	      "rgb(158, 211, 227)",
	      "rgb(123, 145, 211)",
	      "rgb(39, 54, 108)",
	      "rgb(198, 203, 247)",
	      "rgb(213, 157, 194)",
	      "rgb(229, 179, 187)"
	    ]
	    c = colors[Math.floor(Math.random() * colors.length)];
	    return c
	  }


	var width = screen.width,
	  height =screen.height/1.5,
	  articleFill = "black",
	  categoryFill = "black",
	  keywordFill = "gold",
	  circleStroke = "white",
	  linkColor = "gray",
	  textFill = "white",
	  textStroke = "black";

	var force=d3.layout.force()
	  .gravity(.09)
	  .charge(-100)
	  .linkDistance(function(d,i){
	    return 50;
	  })
	  .linkStrength(1)
	  .size([width, height]);

	var svg = d3.select("div.main-viz")
	  .append("svg")
	  .attr("width", width)
	  .attr("height", height);

	var nodes = org; ///////HERE*****************************
	nodes.sort(function(a,b) {
	  return parseInt(a.count,10) - parseInt(b.count,10);
	});
	console.log(nodes);

	// Create a hash that allows access to each node by its id
	var node_hash = [];
	var type_hash = [];
	var nodeSet = nodes;
	nodeSet.forEach(function(d, i) {
	  node_hash[d.id] = d;
	});

	force.nodes(nodeSet).start();
	    
	// Append the source object node and the target object node to each link records...
	var node =svg.selectAll(".node")
	  .data(nodes)
	  .enter().append("g")
	  .attr("class",function(d){
	    return "node";
	      })
	  .attr("id",function(d){ return d.id;});
	        
	node.append("circle")
	  .attr("class","circle")
	  .style("fill",function(d){
	      return getRandColor();
	  })
	  .style("stroke-width","1px")
	  .style("opacity", .75)
	  .style("stroke","none")
	  .attr("r",function(d,i){
	  		if (org == CSA) {
	  			return d.count/1.5;
	  		}
	  		if (org == NASA) {
	  			return d.count/3;
	  		}
	  		if (org == ESA) {
	  			return d.count/2;
	  		}
	  		if (org == JAXA) {
	  			return d.count/1.5;
	  		}
	  		if (org == Roscosmos) {
	  			return d.count*1.5;
	  		}
	  });

	node.call(force.drag());

	node.append("text").attr("class","hovertext").text(function(d,i){
	  return "#" + d.word;  
	})
	  .style('font-size',"18px")
	  .style('font-weight',"200")
	  .style('fill','rgba(265,265,265,.85)')
	  .style("text-anchor", "middle");

	node.on('click',function(d){ 
	  //click on a node, do this
	});

	force.on("tick",tick);
	function tick() {
	   node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	};
}

function drawChord1(dataFile, verb) {
  //*******************************************************************
  //  CREATE MATRIX AND MAP
  //*******************************************************************

  d3.csv(dataFile, function (error, data) {
    var mpr = chordMpr(data);

    mpr
      .addValuesToMap('has')
      .setFilter(function (row, a, b) {
        return (row.has === a.name && row.prefers === b.name)
      })
      .setAccessor(function (recs, a, b) {
        if (!recs[0]) return 0;
        return +recs[0].count;
      });
    drawChords(mpr.getMatrix(), mpr.getMap());
  });
  //*******************************************************************
  //  DRAW THE CHORD DIAGRAM
  //*******************************************************************
  function drawChords (matrix, mmap) {
    var w = 980, h = 800, r1 = h / 2, r0 = r1 - 100;

    var fill = d3.scale.ordinal()
        .domain(d3.range(4))
        .range(["#3498db", "#1abc9c", "#9b59b6", "#f1c40f", "#e74c3c"]);  ///colors

    var chord = d3.layout.chord()
        .padding(.02)
        .sortSubgroups(d3.descending)
        .sortChords(d3.descending);

    var arc = d3.svg.arc()
        .innerRadius(r0)
        .outerRadius(r0 + 20);

    var svg = d3.select(".main-viz").append("svg:svg")
        .attr("width", w)
        .attr("height", h)
      .append("svg:g")
        .attr("id", "circle")
        .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

        svg.append("circle")
            .attr("r", r0 + 20);

    var rdr = chordRdr(matrix, mmap);
    chord.matrix(matrix);

    var g = svg.selectAll("g.group")
        .data(chord.groups())
      .enter().append("svg:g")
        .attr("class", "group")
        .on("mouseover", mouseover)
        .on("mouseout", function (d) { d3.select("#tooltip").style("opacity", "0") });

    g.append("svg:path")
        .style("stroke", function(d) { d3.rgb(fill(d.index)).darker(); })
        .style("fill", function(d) { return fill(d.index); })
        .attr("d", arc);

    g.append("svg:text")
        .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
        .attr("dy", ".35em")
        .attr("class", "lightgray-text")
        .style("font-family", "helvetica, arial, sans-serif")
        .style("font-size", "14px")
        .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
        .attr("transform", function(d) {
          return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
              + "translate(" + (r0 + 26) + ")"
              + (d.angle > Math.PI ? "rotate(180)" : "");
        })
        .text(function(d) { return rdr(d).gname; });

      var chordPaths = svg.selectAll("path.chord")
            .data(chord.chords())
          .enter().append("svg:path")
            .attr("class", "chord")
            .style("stroke", function(d) { 
            	console.log(d);
            	return d3.rgb(fill(d.target.subindex)).darker(); 
            	// if (d.target.value > d.source.value){
            	// 	return d3.rgb(fill(d.target.subindex)).darker(); 
            	// }
            	// else {
            	// 	return d3.rgb(fill(d.target.index)).darker(); 
            	// } 
            	
            })
            .style("fill", function(d) { 
            	return fill(d.target.subindex); 
            	// if (d.target.value > d.source.value){
            	// 	return fill(d.target.subindex);
            	// }
            	// else {
            	// 	return fill(d.target.index); 
            	// }
            })
            .attr("d", d3.svg.chord().radius(r0))
            .on("mouseover", function (d) {
              d3.select("#tooltip")
                .style("opacity", "1")
                .html(chordTip(rdr(d)))
                .style("top", function () { return (d3.event.pageY - 100)+"px"})
                .style("left", function () { return (d3.event.pageX - 100)+"px";})
            })
            .on("mouseout", function (d) { d3.select("#tooltip").style("opacity", "0") });

      function chordTip (d) {
        var p = d3.format(".2%"), q = d3.format(",.3r")
        return p(d.svalue/d.stotal) + " (" + q(d.svalue) + ") of accounts in "
          + d.sname + " "+verb+" other accounts in " + d.tname
          + (d.sname === d.tname ? "": (" <br/>while "
          + p(d.tvalue/d.ttotal) + " (" + q(d.tvalue) + ") of accounts in "
          + d.tname + " "+verb+" others in " + d.sname))
      }

      function groupTip (d) {
        var p = d3.format(".1%"), q = d3.format(",.3r")
        return "Organization: "
            + d.gname + "<br/>" + q(d.gvalue) + " accounts<br/>"
            + p(d.gvalue/d.mtotal) + " of Total Interactions (" + q(d.mtotal) + ")"
      }

      function mouseover(d, i) {
        d3.select("#tooltip")
          .style("opacity", "1")
          .html(groupTip(rdr(d)))
          .style("top", function () { return (d3.event.pageY - 80)+"px"})
          .style("left", function () { return (d3.event.pageX - 130)+"px";})

        chordPaths.classed("fade", function(p) {
          return p.source.index != i
              && p.target.index != i;
        });
      }
  }
}

function drawChord2 (dataFile) {
	var w = 1280,
	    h = 800,
	    rx = w / 2,
	    ry = h / 2,
	    m0,
	    rotate = 0;

	var splines = [];

	var cluster = d3.layout.cluster()
	    .size([360, ry - 120])
	    .sort(function(a, b) { return d3.ascending(a.key, b.key); });

	var bundle = d3.layout.bundle();

	var line = d3.svg.line.radial()
	    .interpolate("bundle")
	    .tension(.75)
	    .radius(function(d) { return d.y; })
	    .angle(function(d) { return d.x / 180 * Math.PI; });

	// Chrome 15 bug: <http://code.google.com/p/chromium/issues/detail?id=98951>
	var div = d3.select(".main-viz").insert("div")
	    // .style("top", "-80px")
	    // .style("left", "-160px")
	    // .style("width", w + "px")
	    // .style("height", w + "px")
	    .style("-webkit-backface-visibility", "hidden");

	var svg = div.append("svg:svg")
	    .attr("width", w)
	    .attr("height", h)
	  .append("svg:g")
	    .attr("transform", "translate(" + rx + "," + ry + ")");

	svg.append("svg:path")
	    .attr("class", "arc")
	    .attr("d", d3.svg.arc().outerRadius(ry - 120).innerRadius(0).startAngle(0).endAngle(2 * Math.PI))
	    .on("mousedown", mousedown);

	d3.json(dataFile, function(classes) {
	  var nodes = cluster.nodes(packages.root(classes)),
	      links = packages.imports(nodes),
	      splines = bundle(links);

	  var path = svg.selectAll("path.link")
	      .data(links)
	    .enter().append("svg:path")
	      .attr("class", function(d) { return "link source-" + d.source.key + " target-" + d.target.key; })
	      .attr("d", function(d, i) { return line(splines[i]); });

	  svg.selectAll("g.node")
	      .data(nodes.filter(function(n) { return !n.children; }))
	    .enter().append("svg:g")
	      .attr("class", "node")
	      .attr("id", function(d) { return "node-" + d.key; })
	      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
	    .append("svg:text")
	      .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
	      .attr("dy", ".31em")
	      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
	      .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
	      .text(function(d) { return d.key; })
	      .on("mouseover", mouseover)
	      .on("mouseout", mouseout);

	  // d3.select("input[type=range]").on("change", function() {
	  //   line.tension(this.value / 100);
	  //   path.attr("d", function(d, i) { return line(splines[i]); });
	  // });
	});

	d3.select(window)
	    .on("mousemove", mousemove)
	    .on("mouseup", mouseup);

	function mouse(e) {
	  return [e.pageX - rx, e.pageY - ry];
	}

	function mousedown() {
	  m0 = mouse(d3.event);
	  d3.event.preventDefault();
	}

	function mousemove() {
	  if (m0) {
	    var m1 = mouse(d3.event),
	        dm = Math.atan2(cross(m0, m1), dot(m0, m1)) * 180 / Math.PI;
	    div.style("-webkit-transform", "translateY(" + (ry - rx) + "px)rotateZ(" + dm + "deg)translateY(" + (rx - ry) + "px)");
	  }
	}

	function mouseup() {
	  if (m0) {
	    var m1 = mouse(d3.event),
	        dm = Math.atan2(cross(m0, m1), dot(m0, m1)) * 180 / Math.PI;

	    rotate += dm;
	    if (rotate > 360) rotate -= 360;
	    else if (rotate < 0) rotate += 360;
	    m0 = null;

	    div.style("-webkit-transform", null);

	    svg
	        .attr("transform", "translate(" + rx + "," + ry + ")rotate(" + rotate + ")")
	      .selectAll("g.node text")
	        .attr("dx", function(d) { return (d.x + rotate) % 360 < 180 ? 8 : -8; })
	        .attr("text-anchor", function(d) { return (d.x + rotate) % 360 < 180 ? "start" : "end"; })
	        .attr("transform", function(d) { return (d.x + rotate) % 360 < 180 ? null : "rotate(180)"; });
	  }
	}

	function mouseover(d) {
	  svg.selectAll("path.link.target-" + d.key)
	      .classed("target", true)
	      .each(updateNodes("source", true));

	  svg.selectAll("path.link.source-" + d.key)
	      .classed("source", true)
	      .each(updateNodes("target", true));
	}

	function mouseout(d) {
	  svg.selectAll("path.link.source-" + d.key)
	      .classed("source", false)
	      .each(updateNodes("target", false));

	  svg.selectAll("path.link.target-" + d.key)
	      .classed("target", false)
	      .each(updateNodes("source", false));
	}

	function updateNodes(name, value) {
	  return function(d) {
	    if (value) this.parentNode.appendChild(this);
	    svg.select("#node-" + d[name].key).classed(name, value);
	  };
	}

	function cross(a, b) {
	  return a[0] * b[1] - a[1] * b[0];
	}

	function dot(a, b) {
	  return a[0] * b[0] + a[1] * b[1];
	}
}