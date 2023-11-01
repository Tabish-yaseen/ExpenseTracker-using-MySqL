const forgotPasswordForm=document.querySelector("#forgotpasswordform")
 forgotPasswordForm.addEventListener('submit',(e)=>{
     e.preventDefault()
     const email=document.querySelector('.email').value
     
    axios.get(`http://51.20.75.252:3000/password/forgotpassword/${email}`).then((res)=>{
        forgotPasswordForm.reset()
        alert(res.data.message)
        window.location.href='../Login/login.html'
    }).catch((error) => {
        if ( error.response.data) {
            alert(error.response.data.error);
        } else {
            alert('An error occurred. Please try again later.');
        }
    })
        })