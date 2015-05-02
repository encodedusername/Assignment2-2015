(function() {
  $.getJSON( '/igMediaLikes')
    .done(function( data ) {
      var yCounts = data.media.map(function(item){
        return item.likes.count;
      });
      
      yCounts.unshift('Media Count');

      var chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: [
            yCounts 
          ]
        }
      });
    });
})();
