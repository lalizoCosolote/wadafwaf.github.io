import { edit, getAll, remove, save, selectOne } from "./firebase.js"
let id = 0
document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        const persona = {
            run: document.getElementById('run').value,
            nom: document.getElementById('nombre').value.trim(),
            ape: document.getElementById('apellido').value.trim(),
            fecha: document.getElementById('fecha').value,
            email: document.getElementById('email').value,   
            fono: document.getElementById('fono').value,
        }
        if (document.getElementById('btnGuardar').value == 'Guardar') {
            save(persona)
        } else {
            edit(id, persona)
            id = 0
        }
        limpiar()
    }
})

window.addEventListener('DOMContentLoaded', () => {
    getAll(persona => {
        let tabla = ''
        persona.forEach(doc => {
            const item = doc.data()

            tabla += `<tr>
                <td>${item.run}</td>
                <td>${item.nom}</td>
                <td>${item.ape}</td>
                <td>${item.fecha}</td>
                <td>${item.email}</td>
                <td>${item.fono}</td>
                <td nowrap>
                    <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
                    <button class="btn btn-warning" id="${doc.id}">Editar</button>
                </td>
            </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Está seguro que desea eliminar el registro?",
                    text: "No prodrá revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        remove(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado.",
                            icon: "success"
                        });
                    }
                });
            })
        })
        document.querySelectorAll('.btn-warning').forEach(btn => {

            btn.addEventListener('click', async () => {
               
                const cit = await selectOne(btn.id)
                const item = cit.data()
                document.getElementById('run').value = item.run
                document.getElementById('nombre').value = item.nom
                document.getElementById('apellido').value = item.ape
                document.getElementById('fecha').value = item.fecha
                document.getElementById('email').value = item.email
                document.getElementById('fono').value = item.fono
                document.getElementById('btnGuardar').value = 'Editar'
                document.getElementById('run').readOnly = true
                id = btn.id
            })
        })

    })
})