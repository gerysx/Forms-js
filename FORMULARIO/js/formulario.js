const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Correo
    telefono: /^\d{9}$/ // 7 a 14 numeros.
}

const campos = {
    usuario: false,
    nombre: false,
    password: false,
    correo: false,
    telefono: false,
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "usuario":
            validarCampo(expresiones.usuario, e.target, 'usuario');
            break;
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "password":
            validarCampo(expresiones.password, e.target, 'password');
            validarPassword2();
            break;
        case "password2":
            validarPassword2();
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
    const icono = document.querySelector(`#grupo__${campo} i`); // Se selecciona el ícono del campo

    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        
        // Cambiar el ícono a 'fa-check' para el éxito
        icono.classList.add( 'fa-check'); // Icono de check (validado)
        icono.classList.remove( 'fa-xmark'); // Elimina el triángulo de advertencia

        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        
        // Cambiar el ícono a 'fa-triangle-exclamation' para el error
        icono.classList.add( 'fa-xmark'); // Icono de advertencia (error)
        icono.classList.remove( 'fa-check'); // Elimina el check

        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

const validarPassword2 = () => {
    const inputPasword1 = document.getElementById('password');
    const inputPasword2 = document.getElementById('password2');
    const icono = document.querySelector('#grupo__password2 i'); // Seleccionamos el icono

    if (inputPasword1.value !== inputPasword2.value) {
        // Si las contraseñas no coinciden
        document.getElementById('grupo__password2').classList.add('formulario__grupo-incorrecto');
        document.getElementById('grupo__password2').classList.remove('formulario__grupo-correcto');
        
        // Cambiar el icono a 'fa-triangle-exclamation' para error
        icono.classList.add( 'fa-xmark');
        icono.classList.remove( 'fa-check');
        
        document.querySelector('#grupo__password2 .formulario__input-error').classList.add('formulario__input-error-activo');
        campos['password'] = false;
    } else {
        // Si las contraseñas coinciden
        document.getElementById('grupo__password2').classList.remove('formulario__grupo-incorrecto');
        document.getElementById('grupo__password2').classList.add('formulario__grupo-correcto');
        
        // Cambiar el icono a 'fa-check' para validación exitosa
        icono.classList.remove( 'fa-xmark');
        icono.classList.add( 'fa-check');
        
        document.querySelector('#grupo__password2 .formulario__input-error').classList.remove('formulario__input-error-activo');
        campos['password'] = true;
    }
}


inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const terminos = document.getElementById('terminos');
    if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked) {
        formulario.reset();
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 4000);
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        })
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});
