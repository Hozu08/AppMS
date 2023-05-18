let modificar = () => { };
let eliminar = () => { };
let start = () => { };

$(document).ready(start = function(){
    $.ajax({
        method: 'get',
        url: 'http://localhost:8000/usuarios'
    }).done((response)=>{
        const dataJson= JSON.parse(response);
        const usuarios =dataJson.data;
        const table = document.getElementById('usuariosTb');
        const tbody= table.getElementsByTagName('tbody')[0];
        let html ='';
        usuarios.forEach(usuario => {
           html+='<tr>'
           html+='      <td>' + usuario.name+'</td>';
           html+='      <td>'+ usuario.username+'</td>';
           html+='      <td>';
           html+='          <button onclick="modificar('+ usuario.id +')" type="button" name="modificar">Modificar</button>';
           html+='      </td>';
           html+='      <td>';
           html+='          <button onclick="eliminar('+ usuario.id +')" type="button" name="eliminar">Eliminar</button>';
           html+='      </td>'; 
           html+='</tr>';
           
        });
        tbody.innerHTML= html;
    }).fail((error)=>{
        console.error(error);
    });
});

/*
* Funcionalidad para registrar un usuario
*/

// $.ajax({
//     url: 'http://localhost:8000/usuarios',
//     method: 'post',
//     data:{
//         name: 'Admin 1',
//         username: 'admin 1',
//         password: '3210'
//     }
// }).done(response=>{
//     const dataJson = JSON.parse(response);
//     const msg = dataJson.data; 
//     alert(msg);
// });

//  $.ajax({
//      url: 'http://localhost:8000/usuarios/2',
//      method: 'put',
//      data:{
//          name: 'Admin 1',
//          username: 'admin 1',
//          password: '3210'
//      }
//  }).done(response=>{
//      const dataJson = JSON.parse(response);
//      const msg = dataJson.data; 
//      alert(msg);
//  });

//   $.ajax({
//       url: 'http://localhost:8000/usuarios/7',
//       method: 'delete',
//   }).done(response=>{
//       const dataJson = JSON.parse(response);
//       const msg = dataJson.data; 
//       alert(msg);
//   }).fail(error=>{
//       const dataJson = JSON.parse(response);
//       const msg = dataJson.data; 
//       alert(msg);
//   });

// $.ajax({
//     url: 'http://localhost:8000/usuarios/2',
//     method: 'get',
// }).done(response=>{
//     const dataJson = JSON.parse(response);
//     const usuario = dataJson.data; 
//     console.log(usuario);
// });

/* idSave = 1
    idModify = 2*/

let idIdentify = 0; //Variable identificadora de acción
let idUs = 0; //Variable identificador de usuario

//Asignar ID Registrar Usuario (1)

$('#registrarBtn').click(function() {
    idIdentify = 1;
});

//Asignar ID Modificar Usuario (2)

modificar = function(id){

    idIdentify = 2;
    idUs = id;

    $.ajax({
        method: 'get',
        url: 'http://localhost:8000/usuarios/' + id 
    }).done((response) => {
        const dataJson = JSON.parse(response);
        const usuario = dataJson.data;
        $("#name").val(usuario.name);
        $("#username").val(usuario.username);
        $("#password").val(usuario.password);
});

}
//Eliminar registro

eliminar = function(id){

    $.ajax({
        url: 'http://localhost:8000/usuarios/' + id,
        method: 'delete',
    }).done(response=>{
        const dataJson = JSON.parse(response);
        const msg = dataJson.data; 
        start();
        alert(msg);
    });
    
}

//Acción Guardar modificación y registro

$('#guardarBtn').click(function(){

    if(idIdentify == 1){ //registro
        $name = $('#name').val();
        $userName = $('#username').val();
        $passWord = $('#password').val();    
        $.ajax({
            url: 'http://localhost:8000/usuarios',
            method: 'post',
            data:{
                name: $name,
                username: $userName,
                password: $passWord
            }
        }).done(response=>{
            const dataJson = JSON.parse(response);
            const msg = dataJson.data; 
            alert(msg);
        })
    }else if(idIdentify == 2){ //modificación
        $name = $('#name').val();
        $userName = $('#username').val();
        $passWord = $('#password').val();
        $.ajax({
            url: 'http://localhost:8000/usuarios/' + idUs,
            method: 'put',
            data:{
                name: $name,
                username: $userName,
                password: $passWord
            }
        }).done(response=>{
            const dataJson = JSON.parse(response);
            const msg = dataJson.data; 
            start();
            alert(msg);
        })
    }else{
        alert('Señor/a usuari@ elija una acción para guardar.');
    }

    start();

});
      
