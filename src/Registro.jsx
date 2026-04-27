import React, { useState, useEffect } from 'react';

const Registro = () =>
{
  const [formData, setFormData] = useState({
    nombreApellido: '',
    dni: '',
    diagnostico: '',
    obraSocial: '',
    fecha: ''
  });

  const [modal, setModal] = useState({
  visible: false,
  estado: "loading" // loading | success
});

  const [loading, setLoading] = useState(false);
  const [registros, setRegistros] = useState([]);

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxOPc4aynD9FAVHIYV_ixGtXQebysdR7-bbzFDtpfU3f0KnrbjHT8bhTwLyxsP9VxrpMQ/exec";

  // 🔄 TRAER DATOS
  const obtenerRegistros = async () =>
  {
    try
    {
      const res = await fetch(SCRIPT_URL);
      const data = await res.json();

      setRegistros(data.slice(1)); // sacamos headers
    }
    catch (error)
    {
      console.error("Error al obtener datos:", error);
    }
  };

  // 🚀 CARGA INICIAL
  useEffect(() =>
  {
    obtenerRegistros();
  }, []);

  // 📤 ENVIAR
  const handleSubmit = async (e) =>
{
  e.preventDefault();

  setModal({ visible: true, estado: "loading" });

  try
  {
    const formBody = new URLSearchParams(formData);

    await fetch(SCRIPT_URL, {
      method: 'POST',
      body: formBody
    });

    await obtenerRegistros();

    setModal({ visible: true, estado: "success" });

    setFormData({
      nombreApellido: '',
      dni: '',
      diagnostico: '',
      obraSocial: '',
      fecha: ''
    });

    setTimeout(() =>
    {
      setModal({ visible: false, estado: "loading" });
    }, 2000);
  }
  catch (error)
  {
    console.error(error);
    setModal({ visible: false, estado: "loading" });
    alert("Error al guardar");
  }
};

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">
          Sistema de Registro
        </h1>

        {/* FORM */}
        <div className="bg-white p-6 rounded-2xl shadow mb-8">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">

            <input
              placeholder="Nombre y Apellido"
              value={formData.nombreApellido}
              onChange={(e) => setFormData({...formData, nombreApellido: e.target.value})}
              className="p-3 border rounded"
            />

            <input
              placeholder="DNI"
              value={formData.dni}
              onChange={(e) => setFormData({...formData, dni: e.target.value})}
              className="p-3 border rounded"
            />

            <input
              placeholder="Diagnóstico"
              value={formData.diagnostico}
              onChange={(e) => setFormData({...formData, diagnostico: e.target.value})}
              className="p-3 border rounded"
            />

            <input
              placeholder="Obra Social"
              value={formData.obraSocial}
              onChange={(e) => setFormData({...formData, obraSocial: e.target.value})}
              className="p-3 border rounded"
            />

            <p>Fecha de hoy:</p>
            <input
              
              type="date"
              value={formData.fecha}
              onChange={(e) => setFormData({...formData, fecha: e.target.value})}
              className="p-3 border rounded md:col-span-2"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-3 rounded md:col-span-2"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>

          </form>
        </div>

        {/* TABLA */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold mb-4">
            Registros
          </h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th>Nombre</th>
                <th>DNI</th>
                <th>Diagnóstico</th>
                <th>Obra Social</th>
                <th>Fecha</th>
              </tr>
            </thead>

            <tbody>
              {registros.map((r, i) => (
                <tr key={i} className="text-center border-t">
                  <td>{r[0]}</td>
                  <td>{r[1]}</td>
                  <td>{r[2]}</td>
                  <td>{r[3]}</td>
                  <td>{r[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
      {modal.visible && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center gap-4 animate-fadeIn">

      {modal.estado === "loading" && (
        <>
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-slate-700">
            Aguarde un momento Dra. Pelc...
          </p>
        </>
      )}

      {modal.estado === "success" && (
        <>
          <div className="w-16 h-16 bg-green-500 text-white flex items-center justify-center rounded-full text-3xl">
            ✓
          </div>
          <p className="text-lg font-semibold text-green-600">
            Registro exitoso
          </p>
        </>
      )}

    </div>

  </div>
)}
    </div>
    
  );
};

export default Registro;