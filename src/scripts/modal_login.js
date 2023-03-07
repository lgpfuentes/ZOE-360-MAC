const exec = require('child_process').exec;
const openEls = document.querySelectorAll("[data-open]");
const closeEls = document.querySelectorAll("[data-close]");
const isVisible = "is-visible";
var eye = document.getElementById("eye");
var eye_anexo24 = document.getElementById("eye_anexo24");
var eye_anexo30 = document.getElementById("eye_anexo30");
var eye_exp = document.getElementById("eye_exp");
var input_pass = document.getElementById("password_user_data");
var input_pass_anexo24 = document.getElementById("password_anexo24");
var input_pass_anexo30 = document.getElementById("password_anexo30");
var input_pass_exp = document.getElementById("password_exp");
const swal = require('sweetalert');
const nodemailer = require("nodemailer");
var lenguage = localStorage.getItem('lang');
const fs2 = require('fs');
const { promisify } = require('util');
var handlebars = require('handlebars');
const { replace } = require('lodash');
const readFile = promisify(fs2.readFile);
const fs3 = require('fs').promises;
const path2 = require("path");
const sql = require('mssql');
  //administrador
  //PPv"*k83?<pM7k,$
  /*
    CVG
    User: SUPERVISOR
    Password: Pa$$w0rd$1
    */
    if(eye){
      eye.addEventListener("click", function(){
        if(input_pass.type == "password"){
          input_pass.type = "text";
          eye.style.opacity = 0.8;
          eye.title = "Ocultar contraseña";
        }else{
          input_pass.type = "password";
          eye.style.opacity = 0.2;
          eye.title = "Mostrar contraseña";
        }
      });
    }
    
    if(eye_anexo24){
      eye_anexo24.addEventListener("click", function(){
        if(input_pass_anexo24.type == "password"){
          input_pass_anexo24.type = "text";
          eye_anexo24.style.opacity = 0.8;
          eye_anexo24.title = "Ocultar contraseña";
        }else{
          input_pass_anexo24.type = "password";
          eye_anexo24.style.opacity = 0.2;
          eye_anexo24.title = "Mostrar contraseña";
        }
      });
    }
    
    if(eye_anexo30){
      eye_anexo30.addEventListener("click", function(){
        if(input_pass_anexo30.type == "password"){
          input_pass_anexo30.type = "text";
          eye_anexo30.style.opacity = 0.8;
          eye_anexo30.title = "Ocultar contraseña";
        }else{
          input_pass_anexo30.type = "password";
          eye_anexo30.style.opacity = 0.2;
          eye_anexo30.title = "Mostrar contraseña";
        }
      });
    }
    
    if (eye_exp) {
      eye_exp.addEventListener("click", function(){
        if(input_pass_exp.type == "password"){
          input_pass_exp.type = "text";
          eye_exp.style.opacity = 0.8;
          eye_exp.title = "Ocultar contraseña";
        }else{
          input_pass_exp.type = "password";
          eye_exp.style.opacity = 0.2;
          eye_exp.title = "Mostrar contraseña";
        }
      });
    }
    

for (const el of openEls) {

  el.addEventListener("click", function() {
    
    const modalId = this.dataset.open;
    const url = $(this).attr("data");
    const serverip = $(this).attr("data-ip");
    //document.getElementById("submit_exp").style = 'display: block;';
    //document.getElementById("loader_exp").style = 'display:none;'; 
    //document.getElementById(modalId).classList.add(isVisible);
    if(modalId == "modal_anexo_30"){
      document.getElementById("loader_anexo").style = 'display:block;';
      document.getElementById("overlay-a30").classList.add('blur');
      $("#user_anexo30").val(localStorage.user);
      $("#password_anexo30").val(localStorage.password);
      $("#url_anexo30").val(url);
      $("#modal_name_a30").val(modalId);
      $("#login__form_anexo_30").submit();
    }
    if(modalId == "modal_expedientes"){
      document.getElementById("loader_exp").style = 'display:block;';
      document.getElementById("overlay-exp").classList.add('blur');
      $("#user_exp").val(localStorage.user);
      $("#password_exp").val(localStorage.password);
      $("#url_exp").val(url);
      $("#modal_name_exp").val(modalId);
      $("#login__form_expedientes").submit();
    }
    if(modalId == "modal_anexo_24"){
      document.getElementById("submit_exp").style = 'display: block;';
      document.getElementById("loader_exp").style = 'display:none;'; 
      //document.getElementById(modalId).classList.add(isVisible);
      var empresaSelected = $(this)[0].outerText;
      $("#serverip_anexo24").val(serverip);
      $("#user_anexo24").val(localStorage.user);
      $("#password_anexo24").val(localStorage.password);
      $("#url_anexo24").val(url);
      $("#modal_name_a24").val(modalId);
      $("#empresa_anexo24").val(empresaSelected);
      $("#contador_anexo24").html(localStorage.contador ? localStorage.contador : '0');
      if(!localStorage.contador || localStorage.contador < 3){
        $("#login__form_anexo24").submit();
      }else{
        $("#message_limite_intentos").text(lenguage == 'en' ? "You have reached the limit of attempts. Close the 360 ​​menu and try again." : "Alcanzaste el límite de intentos. Cierra el menú 360 y vuelve a intentarlo.").css("color", "red");
        $("#submit_anexo_24").prop('disabled', true);
      }
    }
    if(modalId == "modal_usuario"){
      document.getElementById(modalId).classList.add(isVisible);
      localStorage.user ? $("#user_data").val(localStorage.user) : $("#user_data").val("");
      localStorage.password ? $("#password_user_data").val(localStorage.password) : $("#password_user_data").val("");
      localStorage.password ? $("#password").val(localStorage.password) : $("#password").val("");
      localStorage.name ? $("#name_user_data").val(localStorage.name) : $("#name_user_data").val("");
      localStorage.lastName ? $("#last_name_user_data").val(localStorage.lastName) : $("#last_name_user_data").val("");
      localStorage.phone ? $("#phone_user_data").val(localStorage.phone) : $("#phone_user_data").val("");
      localStorage.email ? $("#email_user_data").val(localStorage.email) : $("#email_user_data").val("");
      localStorage.Company ? $("#Company").val(localStorage.Company) : $("#Company").val("");
    }
    if(modalId == "modal_contrasena"){
      localStorage.name ? $("#name_recupera_password").val(localStorage.name) : $("#name_recupera_password").val("");
      localStorage.lastName ? $("#last_name_recupera_password").val(localStorage.lastName) : $("#last_name_recupera_password").val("");
      localStorage.phone ? $("#phone_recupera_password").val(localStorage.phone) : $("#phone_recupera_password").val("");
      localStorage.email ? $("#email_recupera_password").val(localStorage.email) : $("#email_recupera_password").val("");
    }
  });
}

for (const el of closeEls) {
  el.addEventListener("click", function() {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
    $("#message_error_anexo30").text("");
    $("#message_error_exp").text("");
  });
}

document.addEventListener("click", e => {
  if (e.target == document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
    $("#message_error_anexo30").text("");
    $("#message_error_exp").text("");
  }
});

document.addEventListener("keyup", e => {
  // if we press the ESC
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
    $("#message_error_anexo30").text("");
    $("#message_error_exp").text("");
  }
});

function closeModal(){
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
    $("#message_error_anexo30").text("");
    $("#message_error_exp").text("");
};

$("#login__form_expedientes").on( "submit", function( event ) {
  event.preventDefault();
  document.getElementById("submit_exp").style = 'display: none;';
  document.getElementById("loader_exp").style = 'display:block;';
  
  var modalId = $("#modal_name_exp").val();
  console.log(modalId)
  var user = $("#user_exp").val();
  var password = $("#password_exp").val();
  var urlSelected = $("#url_exp").val();
  let url = `${urlSelected}/api/Usuario/Login2/?USER=${user}&PASS=${password}`;
  let urlAnya = `${urlSelected}/api/Usuario/Login360/?USER=${user}&PASS=${password}`;

  var submit = document.getElementById("submit_exp");

  const api = new XMLHttpRequest();
  api.open('GET', url, true);
  api.send();

  api.onreadystatechange = function(){
      if(this.status == 200 && this.readyState == 4){
          let datos = JSON.parse(this.response) 
          if(datos[13] === "f"){
              $("#message_error_exp").text(lenguage == 'en' ? "INCORRECT ACCESS DATA" : "DATOS DE ACCESO INCORRECTOS").css("color", "red");               
              submit.style = 'display: block;';
              document.getElementById("loader_exp").style = 'display:none;'; 
              document.getElementById("overlay-exp").classList.remove('blur');
              document.getElementById(modalId).classList.add(isVisible); 
          }else if(datos[13] === "t"){
              $("#message_error_exp").text("");
              api.open('GET', urlAnya, true);
                api.send();
                api.onreadystatechange = function(){
                    if(this.status == 200 && this.readyState == 4){
                      window.open(urlAnya, '_blank');
                      document.getElementById("submit_exp").style = 'display: block;';
                      document.getElementById("loader_exp").style = 'display:none;'; 
                      document.getElementById("overlay-exp").classList.remove('blur');
                      //closeModal();
                      localStorage.user = user;
                      localStorage.password = password;
                    }
                }
          }
          $("#login__form_expedientes").trigger("reset");
      }
  }
});

$("#login__form_anexo_30").on( "submit", {}, function( event ) {
  event.preventDefault();
  document.getElementById("submit_anexo").style = 'display: none;';
  document.getElementById("loader_anexo").style = 'display:block;';
  var modalIda30 = $("#modal_name_a30").val();
  console.log(modalIda30)
  var user = $("#user_anexo30").val();
  var password = $("#password_anexo30").val();
  var urlSelected = $("#url_anexo30").val();
  let url = `${urlSelected}/api/Usuario/Login2/?USER=${user}&PASS=${password}`;
  let urlmysccyg = `${urlSelected}/api/Usuario/Login360/?USER=${user}&PASS=${password}`;

  const api = new XMLHttpRequest();
  api.open('GET', url, true);
  api.send();

  api.onreadystatechange = function(){
      if(this.status == 200 && this.readyState == 4){
          let datos = JSON.parse(this.response);
          if(datos[13] === "f"){ 
            $("#message_error_anexo30").text(lenguage == 'en' ? "INCORRECT ACCESS DATA" : "DATOS DE ACCESO INCORRECTOS").css("color", "red"); 
            document.getElementById("submit_anexo").style = 'display: block;';
            document.getElementById("loader_anexo").style = 'display:none;'; 
            document.getElementById("overlay-a30").classList.remove('blur');
            document.getElementById(modalIda30).classList.add(isVisible);                
          }else if(datos[13] === "t"){
              $("#message_error_anexo30").text("");
              api.open('GET', urlmysccyg, true);
              api.send();
              api.onreadystatechange = function(){
                  if(this.status == 200 && this.readyState == 4){
                    window.open(urlmysccyg, '_blank');
                    document.getElementById("submit_anexo").style = 'display: block;';
                    document.getElementById("loader_anexo").style = 'display:none;'; 
                    document.getElementById("overlay-a30").classList.remove('blur');
                    closeModal(); 
                    localStorage.user = user;
                    localStorage.password = password;
                  }
              }
          }
          $("#login__form_anexo_30").trigger("reset");
      }
  }

});

$("#login__form_anexo24").on( "submit", function( event ) {
  event.preventDefault();
  document.getElementById("submit_anexo_24").style = 'display: none;';
  document.getElementById("loader_anexo24").style = 'display:block;';
  var user = $("#user_anexo24").val();
  var password = $("#password_anexo24").val();
  var path = $("#url_anexo24").val();
  var empresa = $("#empresa_anexo24").val();
  var server = $("#serverip_anexo24").val();

  /* ---- Para leer el ini del Anexo 24 ----*/
  fs3.readFile(path2.resolve(__dirname, path + "integra.ini"), 'utf-8').then((txt) => {
      var a24conf = jsini.parse(txt);
      var empresas = a24conf[empresa];
      var dbParm = empresas.DBParm;
      var split = dbParm.split(',')[0].split("'")[1].split(";");
      var dsn = split[0].split('=')[1];
      var uid = split[1].split('=')[1];
      var pwd = split[2].split('=')[1];
      var ejecutable = `integra.exe "ZOE360|${user}|${password}|${empresa}| | | |ZOE360|"`;
      
      const sqlConfig = {
        user: uid,
        password: pwd,
        database: dsn,
        server: server,
        pool: {
          max: 10,
          min: 0,
          idleTimeoutMillis: 30000
        },
        options: {
          encrypt: true, // for azure
          trustServerCertificate: true, // change to true for local dev / self-signed certs
          cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
          }
        }
      }
      getUsers();
      async function getUsers () {
       try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * FROM Usuarios WHERE activo = 1 AND login = '${user}' AND passWord = '${password}'`);
        console.log("result",result.recordset[0]);
       } catch (err) {
          console.log("err",err);
       }
      }
      /*exec(ejecutable, {cwd: path}, (error, stdout, stderr) => {
        if (error) {
          console.error(`error: ${error.message}`);
          return;
        }  
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }  
        console.log(`stdout:\n${stdout}`);
      });*/
  });
});

$("#login__form_user_data").on( "submit", function( event ) {
  event.preventDefault();
  localStorage.user = $("#user_data").val();
  localStorage.password = $("#password_user_data").val();
  localStorage.name = $("#name_user_data").val();
  localStorage.lastName = $("#last_name_user_data").val();
  localStorage.Company = $("#Company").val();
  localStorage.phone = $("#phone_user_data").val();
  localStorage.email = $("#email_user_data").val();
  if(lenguage == 'en'){
    swal("", "Information Saved Successfully", "success");
  }
  if(lenguage == 'es'){
    swal("", "Información guardada con éxito", "success");
  }
    
});

/*Forgot your password, send mail */
$("#modal_contrasena").on( "submit", function( event ) {
  event.preventDefault();
  sendMail();
});

/*var emailUser = document.getElementById('email__user');
var emailPhone = document.getElementById('email__phone');
var emailMail = document.getElementById('email__email');

emailUser.innerHTML = localStorage.name;
emailPhone.innerHTML = localStorage.phone;
emailMail.innerHTML = localStorage.email;*/

async function sendMail() {
  localStorage.name = $("#name_recupera_password").val();
  localStorage.lastName = $("#last_name_recupera_password").val();
  localStorage.phone = $("#phone_recupera_password").val();
  localStorage.email = $("#email_recupera_password").val();
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "avisos.esupplier@gmail.com", // generated ethereal user
      pass: "jnfnjoefgjpbaqjz", // generated ethereal password
    },
  });

  var html = await readFile('src/mail.html', 'utf8');
  
  var template = handlebars.compile(html);

  var replacements = {
    name: localStorage.name + " " + localStorage.lastName,
    phone: localStorage.phone,
    email: localStorage.email
  }

  var htmlToSend = template(replacements);
  //console.log(htmlToSend);

  const mailOptions = {
    from: "avisos.esupplier@gmail.com",
    cc:"2019030180@upmys.edu.mx", // copia
    to: "aaron19couret@gmail.com", // destinatario
    subject: "zoe360",
    html: htmlToSend
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err){
      if(lenguage == 'en'){
        swal("", "Error sending mail", "error");
      }
      if(lenguage == 'es'){
        swal("", "Error al enviar el correo", "error");
      }
    } 
    else {
      if(lenguage == 'en'){
        swal("", "Mail sent successfully", "success");
      }
      if(lenguage == 'es'){
        swal("", "Correo enviado correctamente", "success");
      }
    }
  });
}