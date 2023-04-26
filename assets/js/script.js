//importa generador ID | en el script js de html se agrega type="module"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

//selecciona boton ingresar presupuesto / funcion click
let arrayObjetos = []; //guardar los objetos (gastos)
let presupuesto;

$('#btnCalcular').click(function (event) {
    event.preventDefault();
    presupuesto = capturar();
})

//boton añadir gastos
$('#btnAnadirGastos').click(function (event) {
    event.preventDefault();
    let conjuntoCapturarGastos = capturarGasto();  //guardamos en conjuntoGuardarDatos lo q retorna capturarGastos
    insertarDatos(conjuntoCapturarGastos);
    sumarGastos(presupuesto);
})


//boton para eliminar
$('#insertarDatos').on("click", "#basurero", function () {
    $(this).parent().remove(); //decimos q eliminar
    eliminar($(this).prev().text());
});


//funcion constructora objeto gastos
class Gastos {
    constructor(nombre, monto, id) {
        this.nombre = nombre
        this.monto = monto
        this.id = id
    }
}


//funcion capturar presupuesto / funcion flecha
const capturar = () => {
    $('#presupuesto').text($('#inputPresupuesto').val()); //dnd pondremos lo q capturamos | 
    //el valor q capturamos de inputPresupuesto se puede poner directo o se puede guardar en una variable
    $("#saldo").text($("#inputPresupuesto").val());
    let presupuesto = $("#inputPresupuesto").val();
    return presupuesto;
}

//funcion capturar valor del gasto
const capturarGasto = () => {
    let ids = uuidv4().slice(0, 6) //id = a 6 digitos
    let inputNombreGasto = $('#inputNombreGasto').val(); //ponemos la variable dentro para q sea de alcance local
    let inputCantGasto = $('#inputCantGasto').val();
    let objeto = new Gastos(inputNombreGasto, inputCantGasto, ids) //creamos un nuevo objeto 
    arrayObjetos.push(objeto);

    return (arrayObjetos[arrayObjetos.length - 1])
    //return objeto  //es lo mismo, tb funciona
}


//insertando lo q devuelve el boton añadirGastos
const insertarDatos = (gasto) => {

    //gasto.forEach(item => {
    $('#insertarDatos').append(  //append = innerHTML
        `<tr>
            <td>${gasto.nombre}</td>
            <td>${gasto.monto}</td>
            <td class="d-none">${gasto.id}</td>
            <td id="basurero"><img class="basurero" src="./assets/img/basurero.png" width="15px"></td>
        </tr>`
    )
}


//funcion sumar gastos
const sumarGastos = (presupuesto) => { //la declaramos en btn añadir gastos
    let totalGastos = [];
    let total;
    arrayObjetos.forEach(item => {
        totalGastos.push(item.monto)
        total = totalGastos.reduce((a, b) => {
            return parseInt(a) + parseInt(b);
        })
    })
    
    $("#gastos").text(total);
    //$("#saldo").text(presupuesto - total);
    let saldo = presupuesto - total;
    if (saldo < 0) {
        alert("Saldo insuficente!");
    }
    $("#saldo").text(saldo);
}


//funcion eliminar datos / creamos el la funcion click para basurero (linea 16)
const eliminar = (fila) => {    //elemento a eliminar
    arrayObjetos = arrayObjetos.filter(item => {
        if (item.id != fila) {
            return item
        }
    })

    let total;
    let totalGastos = [];

    arrayObjetos.forEach(item => {
        totalGastos.push(item.monto)
        total = totalGastos.reduce((a, b) => {
            return parseInt(a) + parseInt(b);
        })
    })

    $("#gastos").text(total);
    if (total >= 0) {
        $("#saldo").text(presupuesto - total);

    } else {
        $("#gastos").text(0);
        $("#saldo").text($("#presupuesto").text());
    }
}




