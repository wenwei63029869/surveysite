$("document").ready(function(){
  $("#add-answer-button").on('click', function(){
    $("<input type='text' placeholder='Option' required/>")
     .attr("class", "form-control")
     .attr("name", "answers")
     .appendTo("#answer-fields");
  });
});