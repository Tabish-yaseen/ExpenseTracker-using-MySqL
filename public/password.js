const forgotPasswordForm=document.querySelector("#forgotpasswordform")
 forgotPasswordForm.addEventListener('submit',(e)=>{
     e.preventDefault()
     const email=document.querySelector('.email').value
     console.log(email)
    axios.get(`http://localhost:3000/password/forgotpassword/${email}`).then((res)=>{
        console.log(res.data.message)
    })


        })