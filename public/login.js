    const loginForm=document.querySelector('#loginform')
    let loginError=document.querySelector('#loginerror')
   
loginForm.addEventListener('submit',(e)=>{
    e.preventDefault()
   let email= document.querySelector('.loginemail')
   let password=document.querySelector('.loginpassword')
   const details={
    useremail:email.value,
    userpassword:password.value
   }
   
   axios.post("http://localhost:3000/user/login",details).then((res)=>{

    alert(res.data.message)
    const token=res.data.token
    const isPremium=res.data.isPremium
    localStorage.setItem('token',token)
    window.location.href='expense.html'
    
   
     }).catch((err)=>{
    
        loginError.innerHTML = `Error: ${err.response.data.error}`


     })

   })

