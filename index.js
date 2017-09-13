$.validator.setDefaults({
	submitHandler: function(){
					var codigoExistente = false;
		      var codigo = $("#codigo").val();
		      var nombre = $("#nombre").val();
		      var nota = $("#nota").val();
		      var estudiante = {
		          codigo: codigo,
		          nombre: nombre,
		          nota: nota
		      };
					for (var i = 0; i < localStorage.length; i++) {
						var clave = localStorage.key(i);
						var revisarEstudiante = $.parseJSON(localStorage.getItem(clave));
						if (revisarEstudiante.codigo == codigo) {
							var codigoExistente = true;
							var respuesta = confirm("Ya existe un estudiante con ese codigo, desea cambiar la nota?")
							if (respuesta) {
								localStorage.setItem(codigo, JSON.stringify(estudiante));
								contador = localStorage.length + 1;
								alert('Estudiante se modifico exitosamente!!!');
							}else {
								alert("No se modifico ningun registro!!!")
							}
						}
					}
					if (!codigoExistente) {
						localStorage.setItem(codigo, JSON.stringify(estudiante));
						contador = localStorage.length + 1;
						alert('Estudiante agregado exitosamente!!!');
					}
		      listarEstudiantes();
					limpiarEstudiante();
	}
});
function editarEstudiante(codigo) {
	var estudiante;
	for (var i = 0; i < localStorage.length; i++) {
		var clave = localStorage.key(i);
		if (clave == codigo) {
			estudiante = $.parseJSON(localStorage.getItem(clave));
			$("#codigo").val(estudiante.codigo);
			$("#nombre").val(estudiante.nombre);
			$("#nota").val(estudiante.nota);
		}
	}
	listarEstudiantes();
}
function eliminarEstudiante(codigo) {
		localStorage.removeItem(codigo);
		listarEstudiantes();
}
function limpiarEstudiante() {
		$("#codigo").val("");
		$("#nombre").val("");
		$("#nota").val("");
}
function listarEstudiantes() {
				var tabla = "";
				var parrafo1 = $("#p1");
				var codigo = $("#codigo").val();
				tabla += '<table border="1">';
				tabla += '<tr>';
				tabla += '<th colspan="5">Registro de Notas</th>';
				tabla += '</tr>';
				tabla += '<tr>';
				tabla += '<th>Codigo</th>';
				tabla += '<th>Nombre</th>';
				tabla += '<th>Nota</th>';
				tabla += '<th>Editar</th>';
				tabla += '<th>Eliminar</th>';
				tabla += '</tr>';
				for (var i = 0; i < localStorage.length; i++) {
						var clave = localStorage.key(i);
						var estudiante = $.parseJSON(localStorage.getItem(clave));
						if (codigo == estudiante.codigo ) {
							tabla += '<tr>';
							tabla += '<td class="selectedRow">' + estudiante.codigo + '</td>';
							tabla += '<td class="selectedRow">' + estudiante.nombre + '</td>';
							tabla += '<td class="selectedRow">' + estudiante.nota + '</td>';
							tabla += '<td class="selectedRow"><button onclick="editarEstudiante(\'' + estudiante.codigo + '\');">Editar</button></td>';
							tabla += '<td class="selectedRow"><button onclick="eliminarEstudiante(\'' + estudiante.codigo + '\');">Eliminar</button></td>';
							tabla += '</tr>';
						} else {
							tabla += '<tr>';
							tabla += '<td>' + estudiante.codigo + '</td>';
							tabla += '<td>' + estudiante.nombre + '</td>';
							tabla += '<td>' + estudiante.nota + '</td>';
							tabla += '<td><button onclick="editarEstudiante(\'' + estudiante.codigo + '\');">Editar</button></td>';
							tabla += '<td><button onclick="eliminarEstudiante(\'' + estudiante.codigo + '\');">Eliminar</button></td>';
							tabla += '</tr>';
						}
				}
				tabla += '</table>';
				$(parrafo1).html(tabla);
		}
$(document).ready(function() {
	var validator = $("#miForm").validate({
		errorPlacement: function(error, element){
			// Append error within linked label
			$(element)
				.closest("form")
				.find("label[for='" + element.attr("id") + "']")
				.append(error);
		},
		errorElement: 'span',
		messages: {
			codigo: {
				required: "(Por favor ingrese su codigo de usuario)",
				min: "(Favor ingrese un codigo mayor a 1)",
				max: "(Favor ingrese un codigo menor a 9999)"
			},
			nombre: {
				required: "(Por favor ingrese su nombre de usuario)"
			},
			nota: {
				required: "(Por favor ingrese una nota de 0 a 100)",
				min: "(Favor ingrese un codigo mayor igual a 0)",
				max: "(Favor ingrese un codigo menor igual a 100)"
			}
		}
	});
  $("#boton2").click(function() {
      limpiarEstudiante();
  });
  $("#mostrarPromedio").click(function() {
      mostrarPromedio();
  });
  $("#mostrarMenor").click(function() {
      mostrarMenor();
  });
  $("#mostrarMayor").click(function() {
      mostrarMayor();
  });
  listarEstudiantes();
});

//Agrega el nuevo arreglo al JSON si no se repite ni el codigo ni el nombre
function validarEstudiante(arreglo){
	for (var i = 0; i < estudiantes.length; i++) {
		if (estudiantes[i].codigo==arreglo.codigo){
			alert("Existe un estudiante con el mismo codigo favor corregir.")
			return false
		} else if (estudiantes[i].nombre==arreglo.nombre) {
			alert("Existe un estudiante con el mismo nombre favor corregir.")
			return false
		}
	}
	return true
}

function mostrarPromedio(){
	tableOutput = 0
	for (var i = 0; i < localStorage.length; i++) {
	var clave = localStorage.key(i);
	var revisarEstudiante = $.parseJSON(localStorage.getItem(clave));
	tableOutput = tableOutput + parseFloat(revisarEstudiante.nota);
	}
	 var promedio = tableOutput / i
 alert("La nota promedio es de " +  promedio)
}
function mostrarMenor(){
  tableOutput = []
	for (var i = 0; i < localStorage.length; i++) {
	var clave = localStorage.key(i);
	var revisarEstudiante = $.parseJSON(localStorage.getItem(clave));
	tableOutput.push(parseFloat(revisarEstudiante.nota));
	}
	var minNota = Math.min.apply(null,tableOutput)
	alert("La nota menor es de " +  minNota)
}
function mostrarMayor(){
	tableOutput = []
	for (var i = 0; i < localStorage.length; i++) {
	var clave = localStorage.key(i);
	var revisarEstudiante = $.parseJSON(localStorage.getItem(clave));
	tableOutput.push(parseFloat(revisarEstudiante.nota));
	}
	var maximaNota = Math.max.apply(null,tableOutput)
	alert("La nota mayor es de " +  maximaNota)
}
