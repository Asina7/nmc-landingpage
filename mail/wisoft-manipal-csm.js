$(function() {
    $("#contactForm").find("input,select").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            $("#btnSubmit").attr("disabled", false);
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
			$("#btnSubmit").attr("disabled", true);
            var cfname = $("input#fname").val();
			var clname = $("input#lname").val();
            var cemail = $("input#email").val();
            var cphone = $("input#phone").val();
			var ccompany = $("input#company").val();
			var cposition = $("input#position").val();
			var cmessage = $("input#message").val();
			var cphonecode = $("select#CountryList").val();
			var cgcountry = $("#CountryList option:selected").text();
			var arr = cgcountry.split('(');
			var ccountry=arr[0];
			var cservicecode = $("select#Services").val();
			// var cgservices = $("#Services option:selected").text();
			// var arr = cgservices.split('(');
			// var cgservices=arr[0];
			var cintake = $("select#intake").val();
			var pages = $("input#page").val();
			var sources = $("input#source").val();
			var campaigns = $("input#campaign").val();
			var mediums = $("input#medium").val();
			var terms = $("input#term").val();
			var campaignId = $("input#campaignId").val();
			// /*alert(messagess);*/
			var clocation = $("input#clocation").val();
            /*alert(cname);*/
			var firstName = cfname; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
           $.ajax({
                url: "https://wisoftsolutions.info/postLP/postLead.php",
                type: "POST",
				crossDomain : true,
                data: {
                    fname: cfname,
					lname: clname,
                    email: cemail,
                    phone: cphonecode+' '+cphone,
					country:ccountry,
					company:ccompany,
					services:cservicecode,
					// services:cservices,
					position:cposition,
					message:cmessage,
					page:pages,
					source:sources,
					campaign:campaigns,
					medium:mediums,
					term:terms,
					campaignId:campaignId

                },
                cache: false,
                success: function(data) {  
						//alert(data);
                	if(data=='error'){
	                    // Fail message
	                    $('#success').html("<div class='alert alert-danger'>");
	                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
	                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", Something is not right. Please try again.");
	                    $('#success > .alert-danger').append('</div>');
	                    //clear all fields
	                    $('#contactForm').trigger("reset");
                	}					
					else if(data=='E-already'){
						$('#success').html("<div class='alert alert-danger'>");
	                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
	                    $('#success > .alert-danger').append("<strong>Email already registered.");
	                    $('#success > .alert-danger').append('</div>');
	                    //clear all fields
	                    $('#contactForm').trigger("reset");
						$("#btnSubmit").attr("disabled", false);
					}
					else if(data=='P-already'){
						$('#success').html("<div class='alert alert-danger'>");
	                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
	                    $('#success > .alert-danger').append("<strong>Phone already registered.");
	                    $('#success > .alert-danger').append('</div>');
	                    //clear all fields
	                    $('#contactForm').trigger("reset");
						$("#btnSubmit").attr("disabled", false);
					}
                	else{	                   
						window.location.href="thankyou.html";
						// window.location.href="https://dncae.com/accounting-service/thankyou.html";
					}
                }
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });


});
		


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
function checkNumber(textBox)
{
	while (textBox.value.length > 0 && isNaN(textBox.value)) {
		textBox.value = textBox.value.substring(0, textBox.value.length - 1)
	}	
	textBox.value = (textBox.value);
}
function InvalidMsg(textbox) {
    
     if(textbox.validity.patternMismatch){
        textbox.setCustomValidity('Please enter valid phone number.');
    }    
    else {
        textbox.setCustomValidity('');
    }
    return true;
}
function EmailInvalidMsg(textbox) {
    
     if(textbox.validity.patternMismatch){
        textbox.setCustomValidity('Please enter a valid Email.');
    }    
    else {
        textbox.setCustomValidity('');
    }
    return true;
}
function myTrim(x) {
  //return x.replace(/^\s+|\s+$/gm,'');
  return x.replace(/^\s+/gm,'');
}
function FNameInvalidMsg(textbox) 
{
	var x = document.getElementById("fname").value;
	var str = myTrim(x);
	document.getElementById("fname").value=str;

	if(textbox.validity.patternMismatch){
        textbox.setCustomValidity('Must only contain letters and whitespace.');
    }    
    else {
        textbox.setCustomValidity('');
    }
    return true;
}
function LNameInvalidMsg(textbox) 
{
	var x = document.getElementById("lname").value;
	var str = myTrim(x);
	document.getElementById("lname").value=str;

	if(textbox.validity.patternMismatch){
        textbox.setCustomValidity('Must only contain letters and whitespace.');
    }    
    else {
        textbox.setCustomValidity('');
    }
    return true;
}


function pFNameInvalidMsg(textbox) 
{
	var x = document.getElementById("pfname").value;
	var str = myTrim(x);
	document.getElementById("pfname").value=str;

	if(textbox.validity.patternMismatch){
        textbox.setCustomValidity('Must only contain letters and whitespace.');
    }    
    else {
        textbox.setCustomValidity('');
    }
    return true;
}
function pLNameInvalidMsg(textbox) 
{
	var x = document.getElementById("plname").value;
	var str = myTrim(x);
	document.getElementById("plname").value=str;

	if(textbox.validity.patternMismatch){
        textbox.setCustomValidity('Must only contain letters and whitespace.');
    }    
    else {
        textbox.setCustomValidity('');
    }
    return true;
}

function CompanyInvalidMsg(textbox) 
{
	var x = document.getElementById("company").value;
	var str = myTrim(x);
	document.getElementById("company").value=str;

	if(textbox.validity.patternMismatch){
        textbox.setCustomValidity('Must only contain letters and whitespace.');
    }    
    else {
        textbox.setCustomValidity('');
    }
    return true;
}

function PositionInvalidMsg(textbox) 
{
	var x = document.getElementById("position").value;
	var str = myTrim(x);
	document.getElementById("position").value=str;

	if(textbox.validity.patternMismatch){
        textbox.setCustomValidity('Must only contain letters and whitespace.');
    }    
    else {
        textbox.setCustomValidity('');
    }
    return true;
}

