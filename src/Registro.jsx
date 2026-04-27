import React, { useState, useEffect } from 'react';
import { Search, Plus, Calendar, CreditCard, ClipboardList, User, ChevronLeft, ChevronRight, CheckCircle2, Loader2 } from 'lucide-react';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombreApellido: '',
    dni: '',
    diagnostico: '',
    obraSocial: '',
    fecha: ''
  });

  const [modal, setModal] = useState({ visible: false, estado: "loading" });
  const [registros, setRegistros] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);

  const registrosPorPagina = 8;
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwwXfGUnslJwwCKQ607gq-eSbfkMDzVznxQ-R18iPIOtDN0_q8ioqdE_6siRbRsmcwiWw/exec";

  const obtenerRegistros = async () => {
    try {
      const res = await fetch(SCRIPT_URL);
      const data = await res.json();
      setRegistros(data.slice(1).reverse());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    obtenerRegistros();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModal({ visible: true, estado: "loading" });

    const fechaFormateada = new Date(formData.fecha).toLocaleDateString("es-AR");
    const formBody = new URLSearchParams({ ...formData, fecha: fechaFormateada });

    try {
      await fetch(SCRIPT_URL, { method: 'POST', body: formBody });
      await obtenerRegistros();
      setModal({ visible: true, estado: "success" });
      setFormData({ nombreApellido: '', dni: '', diagnostico: '', obraSocial: '', fecha: '' });
      setTimeout(() => setModal({ visible: false, estado: "loading" }), 2000);
    } catch (error) {
      console.error(error);
      setModal({ visible: false, estado: "loading" });
    }
  };

  const filtrados = registros.filter(r => {
    const nombre = (r[0] || "").toString().toLowerCase();
    const dni = (r[1] || "").toString();
    return nombre.includes(busqueda.toLowerCase()) || dni.includes(busqueda);
  });

  const totalPaginas = Math.ceil(filtrados.length / registrosPorPagina);
  const registrosPaginados = filtrados.slice((pagina - 1) * registrosPorPagina, pagina * registrosPorPagina);

  useEffect(() => { setPagina(1); }, [busqueda]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <ClipboardList className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">Panel Médico</h1>
          </div>
          <div className="text-sm text-slate-500 font-medium">
            {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Columna Izquierda: Formulario */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 sticky top-24">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-600" /> Nuevo Registro
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Paciente</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      required
                      placeholder="Nombre completo"
                      value={formData.nombreApellido}
                      onChange={(e) => setFormData({...formData, nombreApellido: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Identificación</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      required
                      placeholder="DNI"
                      value={formData.dni}
                      onChange={(e) => setFormData({...formData, dni: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Detalles Médicos</label>
                  <input
                    required
                    placeholder="Diagnóstico"
                    value={formData.diagnostico}
                    onChange={(e) => setFormData({...formData, diagnostico: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                  <input
                    required
                    placeholder="Obra Social"
                    value={formData.obraSocial}
                    onChange={(e) => setFormData({...formData, obraSocial: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Fecha de Atención</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      required
                      type="date"
                      value={formData.fecha}
                      onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] mt-4"
                >
                  Confirmar Registro
                </button>
              </form>
            </div>
          </div>

          {/* Columna Derecha: Listado */}
          <div className="lg:col-span-2 space-y-6">
            {/* Buscador */}
            <div className="relative group">
              <Search className="absolute left-4 top-4 w-6 h-6 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                placeholder="Buscar por nombre, apellido o DNI..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-3xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-lg"
              />
            </div>

            {/* Tabla de Registros */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-slate-700">Historial de Pacientes</h3>
                <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full uppercase">
                  {filtrados.length} Registros
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                      <th className="px-6 py-4">Paciente</th>
                      <th className="px-6 py-4">DNI / Obra Social</th>
                      <th className="px-6 py-4">Diagnóstico</th>
                      <th className="px-6 py-4 text-right">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {registrosPaginados.length > 0 ? (
                      registrosPaginados.map((r, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-6 py-4">
                            <p className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{r[0]}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-slate-600 font-medium">{r[1]}</p>
                            <p className="text-xs text-slate-400">{r[3]}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium italic">
                              {r[2]}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <p className="text-sm font-bold text-slate-700">{r[4]}</p>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-20 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <Search className="w-12 h-12 text-slate-200" />
                            <p className="text-slate-400 font-medium">No se encontraron registros que coincidan.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
              {totalPaginas > 1 && (
                <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-center items-center gap-4">
                  <button
                    disabled={pagina === 1}
                    onClick={() => setPagina(pagina - 1)}
                    className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-30 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm font-bold text-slate-600">
                    Página {pagina} de {totalPaginas}
                  </span>
                  <button
                    disabled={pagina === totalPaginas}
                    onClick={() => setPagina(pagina + 1)}
                    className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-30 transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal Modernizado */}
      {modal.visible && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-6 max-w-sm w-full animate-in fade-in zoom-in duration-300">
            {modal.estado === "loading" ? (
              <>
                <div className="relative">
                   <div className="w-20 h-20 border-4 border-slate-100 rounded-full"></div>
                   <Loader2 className="w-20 h-20 text-indigo-600 animate-spin absolute top-0 left-0" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-800">Procesando</h3>
                  <p className="text-slate-500 mt-2">Guardando la información de manera segura...</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-full">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-800">¡Registro Exitoso!</h3>
                  <p className="text-slate-500 mt-2">La base de datos ha sido actualizada correctamente.</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Registro;