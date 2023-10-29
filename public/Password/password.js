const forgotPasswordForm=document.querySelector("#forgotpasswordform")
const message=document.querySelector("#message")
 forgotPasswordForm.addEventListener('submit',(e)=>{
     e.preventDefault()
     const email=document.querySelector('.email').value
     console.log(email)
    axios.get(`http://51.20.75.252:3000/password/forgotpassword/${email}`).then((res)=>{
        forgotPasswordForm.reset()
        alert(res.data.message)
        window.location.href='../Login/login.html'
    })
        })