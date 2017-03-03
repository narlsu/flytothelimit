function displayGallery(){
	var counter = 0;
	var allFigures = document.querySelectorAll("#gallery figure");
	var countFigures = allFigures.length;
	var prevButton = document.querySelector('.prev');
	console.log(prevButton);
	var nextButton = document.querySelector('.next');
	var pager = document.querySelector('.pager');

	prevButton.addEventListener("click", function(){
		counter--;
		if(counter < 0){
			counter = countFigures - 1;
		}
		showFigure();
	}, false);

	nextButton.addEventListener("click", function(){
		counter++;
		showFigure();
	}, false);

	pager.addEventListener("click", function(event){
		var child = event.target.innerText;
		showFigure(child);
	}, false);

	function showFigure(childItem){
		
		if (childItem){
			var displayedFigure = childItem - 1;
			counter = displayedFigure;
		} else {
			displayedFigure = Math.abs(counter % countFigures);
		}	

		for(var i=0; i < countFigures; i++){
			if(allFigures[i].classList.contains("show")){
				allFigures[i].classList.remove("show");
				break;
			}
		}
		allFigures[displayedFigure].classList.add('show');
	}

}








function formValidation(theForm){
	console.log(theForm);
		// turn off basic html validation
		theForm.noValidate = true;

		theForm.addEventListener('blur', function(evt) {
			evt.preventDefault();
			if(validateForm(theForm) === false){
	            evt.preventDefault();
	        } 
		}, true);

		theForm.addEventListener('submit', function(evt) {
			evt.preventDefault();
			if(validateForm(theForm) === false){
	            evt.preventDefault();
	        } 
		}, true);

	    function validateForm(theForm){
	    	// assume initially there are no errors
	        var isError = false;
	        // get elements from the form
	        var elements = theForm.elements;
	        // traverse through the array to get fields and check if it is valid
	         for (var i = 0; i < elements.length; i += 1) {
	            var isValid = isFieldValid(elements[i]);
	             if(isValid === false){
	                    isError = true;
	                }      
	         }
	         return ! isError;
	    }
		
	function isFieldValid(field){

		var errorMessage = "";

		// skip fields that need not be validated
		if(! needsToBeValidated(field)){
			return true;
		}
		if (field.type !== "radio"){
			// reset error messages and error fields

			field.classList.remove('invalid');
			var errorSpan = document.querySelector("#"+ field.id +"-error");
			errorSpan.innerHTML = "";
			errorSpan.classList.remove('warning');
		} 
		else {

				var errorSpan = document.querySelector("#"+ field.name +"-error");
				errorSpan.innerHTML = "";
				errorSpan.classList.remove('warning');
	
		}

		// radio button---------------------------------------------------------------------------------

		if((field.type === "radio") && ! radioButtonChecked(field)){
			errorMessage = "Please select one.";
		} else if((field.type === "radio") && radioButtonChecked(field)){
			var errorSpan = document.querySelector("#"+ field.name +"-error");
			errorSpan.innerHTML = "";
			errorSpan.classList.remove('warning');
		}

		// ============================================================== checkbox

		if(field.type === "checkbox" && ! field.checked){
			errorMessage = "This field must be checked."
		}

		// ============================================================== number checking

		if(field.type === "number" && field.min > 0 && field.value < parseInt(field.min)){
			errorMessage = "Must be atleast " + field.min + " or greater.";
		}

		if(field.type === "number" && field.max > 0 && field.value > parseInt(field.max)){
			errorMessage = "Must be " + field.max + " or less.";
		}

		// ============================================================== min value check

		if(field.minLength > 0 && field.value.length < field.minLength){
			errorMessage = "Must be atleast " + field.minLength +" or more characters long.";
		}

		//  ============================================================= check email

		if(field.type === "email" && ! isEmail(field.value)){			
			errorMessage = "Provide a proper email.";
		}

		// ============================================================== check if the form element is blank

		if(field.required && field.value.trim() === "" ){		
			errorMessage = "This field is required.";				
		}

		// check for error messages===================================

		if(errorMessage !== ""){
			// generate error field
			if(field.type === 'radio'){

				var errorSpan = document.querySelector("#"+ field.name +"-error");
				errorSpan.innerHTML = errorMessage;
				errorSpan.classList.add('warning');

			} else {

				field.classList.add('invalid');

				// display error message in form
				var errorSpan = document.querySelector("#"+ field.id +"-error");
				errorSpan.innerHTML = errorMessage;
				errorSpan.classList.add('warning');
			}
			return false;
		}
		return true;
	}
	function needsToBeValidated(field){
		var skipElements = ['button','submit'];
		if(skipElements.indexOf(field.type) === -1){
			return true;
		} else {
			return false;
		}
	}
	function isEmail(input){
		// console.log(input.match(/^([a-z0-9_.\-+]+)@([\da-z.\-]+).([a-z\.]{2,})$/));
		return input.match(/^([a-z0-9_.\-+]+)@([\da-z.\-]+)\.([a-z\.]{2,})$/);
	}
	function radioButtonChecked(field){
	    	
	    	var count = 0; 
	    	var inputName = field.name; 
	    	console.log(inputName);  		
			var radioButtons = document.querySelectorAll('input[type=radio]');
			for(var i=0; i < radioButtons.length ; i++){
				if((radioButtons[i].checked) && (radioButtons[i].name === inputName)) {	
					console.log(inputName);
					count ++;										
				} 
			}
			if(count > 0){
				return true;
			}

		} 
}	















		





