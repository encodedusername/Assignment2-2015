//Create tooltip
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>" + d.name +":</strong> <span style='color:red'>"+ d.value+ " likes</span>";
  });

d3.json('/igMyLikes', function(error, resp_data) {
console.log(resp_data);
var userTable = {};

resp_data.media.map(function(item) {
    if (userTable[item.user.username]) {
        userTable[item.user.username]++;
    }
    else {
        userTable[item.user.username] = 1;
    }
});
var data = {children: []};
for (var ind in userTable) {
    data.children.push({
        name: ind,
        value: userTable[ind]
    });
}
/*
var data = {
  children: [
    {name: "jolo", value: 1.94},
    {name: "kk", value: 0.42}
  ]
};
/*var data = {
    children: mediaArr
}*/

    var width = 960,
        height = 500;

    var pack = d3.layout.pack()
        .size([width, height]);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.call(tip);

    svg.data([data]).selectAll(".node")
        .data(pack.nodes)
      .enter().append("circle")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .attr("r", function(d) { return d.r; })
        .on('mouseover',tip.show)
        .on('mouseout', tip.hide)
});