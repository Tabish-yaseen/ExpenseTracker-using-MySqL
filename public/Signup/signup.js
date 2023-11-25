
    const signUpForm=document.querySelector('#signupform')
    const signUpErrordiv=document.querySelector('#signuperror')
    
    
    signUpForm.addEventListener('submit',(e)=>{
        e.preventDefault()
     const username=document.querySelector('.username')
    const useremail=document.querySelector('.useremail')
    const userpassword=document.querySelector('.userpassword')
    
        const details={
            name:username.value,
            email:useremail.value,
            password:userpassword.value
    
        }
        axios.post('http://localhost:3000/user/signup',details).then((res)=>{
    
            window.location.href = '../Login/login.html';
            
            
        }).catch((err)=>{
            console.log(err)
            alert("An account with this email already exists")
            // signUpErrordiv.innerHTML=err.message
        })
    })
    
    