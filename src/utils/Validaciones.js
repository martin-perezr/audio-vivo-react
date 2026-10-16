const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export function validarCorreo(texto){
    const correo = texto.trim()

    if(correo === ''){
        return 'Ingresa tu correo electronico.'
    }

    if(!patronCorreo.test(correo)){
        return 'Ingresa un correo válido, por ejemplo ejemplo@correo.cl.'
    }
    return ''
}

export function validarPassword(texto){
    const password = texto.trim()

    if(password === ''){
        return 'Ingresa tu contraseña.'
    }

    if(password.length < 12){
        return 'La contraseña debe tener al menos 12 caracteres.'
    }
    return ''
}

export function validarNombre(texto) {
  const nombre = texto.trim()

  if (nombre === '') {
    return 'Ingresa tu nombre.'
  }

  if (nombre.length < 3) {
    return 'El nombre debe tener al menos 3 letras.'
  }
  return ''
}

export function validarConfirmacion(password, confirmacion) {
  if (confirmacion === '') {
    return 'Repite tu contraseña.'
  }

  if (password !== confirmacion) {
    return 'Las contraseñas no coinciden.'
  }
  return ''
}