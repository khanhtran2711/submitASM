$(function(){
    $("#loader").hide();
    // Set the date we're counting down to
    var countDownDate = new Date("July 10, 2022 00:00:00").getTime();
  
    // Update the count down every 1 second
    var x = setInterval(function() {
  
      // Get today's date and time
      var now = new Date().getTime();
        
      // Find the distance between now and the count down date
      var distance = countDownDate - now;
        
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    
      // Output the result in an element with id="demo"
      document.getElementById("demo").innerHTML = '<button type="button" class="btn btn-outline-primary">Countdown Timer  <span class="badge bg-secondary">'+days + 'd ' + hours + 'h '+ minutes + 'm '+ seconds + 's</span></button>';
        
      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = '<span class="badge bg-danger">EXPIRED</span>';
        $("#result").html('<div class="alert alert-danger" role="alert">You are out of time!</div>');
        $("#subBtn").attr( "disabled", "disabled" );
      }
    }, 1000);
    if(countDownDate > new Date().getTime()){
      loadajax();
      $("#submitForm").on('submit', function(e){
          e.preventDefault();
          // var inputFile = document.getElementById('docFile');
          // var file = inputFile.files[0];
          var formData = new FormData(this);
          var files = $('#docFile')[0].files;
          if(files.length>0){
            console.log(files);
            formData.append('file',files[0]);
            // formData.append('file', file, file.name);
          }
          $.ajax({
              type: 'POST',
              url: "/submit",
              data: formData,
              dataType: 'json',
              contentType: false,
              cache: false,
              processData:false,
              beforeSend: function(){
                    $("#loader").show();
                },
                complete: function () {
                    $("#loader").hide();
                },
              success: function (res) {
                  $("#loader").hide();
                  if(res.status == true){
                      $("#result").html('<div class="alert alert-success" role="alert">Congrats! Your information has been submitted.! Keep calm and have good luck on your defense</div>');
                  }
                  else{
                      $("#result").html('<div class="alert alert-warning" role="alert">'+res.statusMsg+'</div>');
                  }
                  //  console.log(res);
              },
              error: function () {
                  $("#loader").hide();
                  $("#result").html('<div class="alert alert-danger" role="alert">Error!</div>');
              }
          });
      
      });
    }
  });
  
  function loadajax(){
  var availableTags = function () {
   var tmp = null;
   $.ajax({
       'async': false,
       'type': "GET",
       'dataType': 'json',
       'url': "/student",
       'success': function (data) {
           tmp = data.slice();
           $(".container").show();
       }
   });
   return tmp;
  }();
  Object.values = function(object) {
   var values = [];
   for(var property in object) {
     values.push(object[property].code);
   }
   return values;
  }
  //console.log(Object.values(availableTags));
  $( "#code" ).autocomplete({
   source: Object.values(availableTags)
  });
  }