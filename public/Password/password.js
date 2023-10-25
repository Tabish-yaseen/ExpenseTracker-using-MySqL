const forgotPasswordForm=document.querySelector("#forgotpasswordform")
const message=document.querySelector("#message")
 forgotPasswordForm.addEventListener('submit',(e)=>{
     e.preventDefault()
     const email=document.querySelector('.email').value
     console.log(email)
    axios.get(`http://13.48.13.224:3000/password/forgotpassword/${email}`).then((res)=>{
        forgotPasswordForm.reset()
        message.innerHTML=res.data.message
    })


        })