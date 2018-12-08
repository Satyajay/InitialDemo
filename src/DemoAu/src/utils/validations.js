/* To handle first name validation*/

 export function validateFirstName(name){
    var nameRegex = /([A-z][\s\.]|[A-z])+$/;
    
    name=name.trim();

    if(name=="" || name==undefined || name==null ){
      return {status:false,error:'Please enter first name'};
    }
    else if(!nameRegex.test(name)){
      return {status:false,error:'Please enter valid first name'};
    }
    else{
      return {status:true,error:''};
    }
  }

    /* To handle last name validation*/


  export function validateLastName(name){
    var nameRegex = /^[a-zA-Z ]+$/;

    name=name.trim();

    if(name=="" || name==undefined || name==null ){
      return {status:false,error:'Please enter last name'};
    }
    else if(!nameRegex.test(name)){
      return {status:false,error:'Please enter valid last name'};
    }
    else{
      return {status:true,error:''};
    }
  }

    /* To handle last name validation*/


    export function validateUserId(userId){
      var nameRegex = /^[a-zA-Z ]+$/;
  
      userId=userId.trim();
  
      if(userId=="" || userId==undefined || userId==null ){
        return {status:false,error:'Please enter user id'};
      }
      else{
        return {status:true,error:''};
      }
    }

/* To handle email validation */

export function validateEmail(email){
  
     var emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
  
      email=email.trim();
  
      if(email=="" || email==undefined || email==null ){
        return {status: false ,error:'Please enter email'};
      }
      else if(!emailRegex.test(email)){
        return {status: false,error:'Please enter valid email id'};
      }
      else{
        return {status:true,error:''};
      }
    }


  /* To validate password */

  export function validatePassword(password){
    
    // Minimum six characters, at least one letter and one number

   // var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
          password = password.trim();    
    
          if(password=="" || password==undefined || password==null ){
            return {status:false,error:'Please enter password'}
          }
          else if(password.length<6){
            return {status:false,error:'Password should contain at-least 6 characters'};
          }
          else{
            return {status:true,error:''} 
          }
      }


    /* To validate country */

  export function validateLocation(country){
    country = country.trim();    

      if(country=="Location"){
        return {status:false,error:'Please enter location'}
      }
      else{
        return {status:true,error:''} 
      }

  }
