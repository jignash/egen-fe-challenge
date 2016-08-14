
//returning the class name which in turn change the card type image
(function(){


angular.module('ccLogoFilter', []).filter('ccLogo', [function () 
{
    return function (cardNumber) 
    {
	//checking for empty value
      if (!cardNumber) 
	  {
	  return "defaultIcon";
	  }
	  
        //Function to execute Luhn Check
          function validCreditCard(value) {
          // accept only digits, dashes or spaces
            if (/[^0-9-\s]+/.test(value)) return false;

            // The Luhn Algorithm.
            var nCheck = 0, nDigit = 0, bEven = false;
            value = value.replace(/\D/g, "");

            for (var n = value.length - 1; n >= 0; n--) {
                var cDigit = value.charAt(n),
                      nDigit = parseInt(cDigit, 10);

                if (bEven) {
                    if ((nDigit *= 2) > 9) nDigit -= 9;
                }

                nCheck += nDigit;
                bEven = !bEven;
            }

            return (nCheck % 10) == 0;
        }

        
    if(cardNumber.length >= 14)
        var result = validCreditCard(cardNumber);
     
        //check for credit card type
     if(result) 
     {
          if(/^(34)|^(37)/.test(cardNumber)) 
          {
            cardNetwork = "americanExpress";
          }

          if(/^(6011)|^(622(1(2[6-9]|[3-9][0-9])|[2-8][0-9]{2}|9([01][0-9]|2[0-5])))|^(64[4-9])|^65/.test(cardNumber)) 
          {
            cardNetwork = "discoverCard";
          }
          if(/^(5018)|^(5020)|^(5038)|^(5893)|^(6304)|^(6759)|^(6761)|^(6762)|^(6763)|^(0604)/.test(cardNumber)) 
          {
            cardNetwork = "maestro";
          }
          if(/^5[1-5]/.test(cardNumber)) 
          {
            cardNetwork = "masterCard";
          }
          if (/^4/.test(cardNumber)) 
          {
            cardNetwork = "visa";
          }
          
        return cardNetwork;
     }
        
     else
     {
         return "defaultIcon";
            
     }
     
    };
}]);
    
    
})();