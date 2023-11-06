$(document).ready(function(){
   
var dis_date = new Date()
// var on line no 3 to be used on line no 4 
let date = "Date: " + dis_date.toLocaleDateString() 

$('#date').text( date)



//$(function(){
    //  write an event, when Submit button is clicked
    $('#button').click(function(){
// line 15 val() won't have any parameter in it.
        let predicted_review = $("#text").val()

        //  get the text value from the textarea using the 'val()' method
        let input_text = { 
            'customer_review' : predicted_review
        }

        //  ajax request
        $.ajax({

            //  type of web request
            type : 'POST',  

            //  url of the emoticon
            url : '/predict-review',

            //  Data to be sent in JSON format
            data : JSON.stringify(input_text),

            //  type of response expected is json
            dataType : 'json',

            //  contentType
            contentType : 'application/json',

            //  if everything is successful, run this function
            success : function(result){

                // extract prediction and emoticon url from result
                predicted_review = result.predict_review
                review_url = result.predict_sentiment_url

                //  update the DOM elements
                $('#sentiment').text(predicted_review)
                $('#sentiment').show()

                //  show them
                $('#emoji').attr('src', review_url)
                $('#emoji').show()
            },

            //  if any error, run this function
            error : function(result){
                alert(result.responseJSON.message)
            }
        })
        $("#text").val('')
    })
})