# 🏥 Sistema de Registro de Pacientes

Este proyecto consiste en una aplicación web desarrollada con React que permite registrar pacientes y almacenar sus datos en una hoja de cálculo en la nube, utilizada como base de datos.

---

## 🚀 Funcionalidades

* Registro de pacientes con los siguientes datos:

  * Nombre y Apellido
  * DNI
  * Diagnóstico
  * Obra Social
  * Fecha

* Visualización en tiempo real de los registros guardados

* Interfaz moderna y responsive

* Feedback visual al guardar (modal tipo confirmación estilo apps de pago)

---

## 🛠️ Tecnologías utilizadas

* **React** → desarrollo del frontend
* **Tailwind CSS** → estilos y diseño responsive
* **Google Sheets** → almacenamiento de datos (base de datos)
* **Google Apps Script** → API para conectar el frontend con la hoja de cálculo

---

## 🧠 ¿Cómo funciona?

La aplicación utiliza una hoja de Google Sheets como base de datos. Para interactuar con ella, se implementó un script en Google Apps Script que actúa como una API REST sencilla.

### Flujo:

1. El usuario completa el formulario
2. React envía los datos mediante un `POST` al Apps Script
3. El script guarda los datos en la hoja de cálculo
4. Luego, la app realiza un `GET` para obtener todos los registros actualizados
5. Los datos se muestran en una tabla en pantalla

---

## ⚠️ Consideraciones técnicas

* Se utiliza `application/x-www-form-urlencoded` para evitar problemas de CORS al enviar datos
* La API de Apps Script está desplegada como aplicación web con acceso público
* No se utiliza una base de datos tradicional (SQL o NoSQL), sino Google Sheets como solución simple y efectiva

---

## 📊 Base de datos

La “base de datos” del sistema es una hoja de cálculo en Google Sheets, donde cada fila representa un paciente y cada columna un campo:

| Nombre | DNI | Diagnóstico | Obra Social | Fecha |

Este enfoque permite:

* Fácil acceso y edición manual
* Sin necesidad de servidores o configuraciones complejas
* Rápida implementación para proyectos pequeños

---

## 💡 Posibles mejoras

* Implementar autenticación de usuarios
* Agregar edición y eliminación de registros
* Incorporar buscador por DNI
* Migrar a backend propio (Node.js + base de datos real)

---

## 👨‍💻 Autor

Proyecto desarrollado por Maxi como práctica de integración entre frontend y servicios externos.
