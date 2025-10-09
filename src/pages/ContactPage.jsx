// Importación de React y hook useState para manejar el estado del formulario
import React, { useState } from 'react';

/**
 * Componente de la página de contacto
 * Muestra un formulario validado para que los usuarios se comuniquen con la tienda
 * Incluye validación en tiempo real y mensajes de error específicos
 * 
 * @returns {JSX.Element} Página de contacto con formulario validado
 */
export default function ContactPage() {
    // ========== ESTADOS DEL COMPONENTE ==========
    
    /**
     * Estado que almacena los datos del formulario
     * Es un objeto con 4 campos que se actualizan conforme el usuario escribe
     * @type {Object}
     */
    const [formData, setFormData] = useState({
        nombre: '',    // Nombre completo del usuario
        email: '',     // Correo electrónico
        asunto: '',    // Asunto seleccionado del dropdown
        mensaje: ''    // Mensaje del usuario
    });
    
    /**
     * Estado que almacena los errores de validación
     * Es un objeto donde las keys son los nombres de campos y los values son mensajes de error
     * @type {Object}
     */
    const [errors, setErrors] = useState({});
    
    /**
     * Estado que indica si el formulario fue enviado exitosamente
     * Se usa para mostrar un mensaje de confirmación
     * @type {boolean}
     */
    const [isSubmitted, setIsSubmitted] = useState(false);

    // ========== FUNCIONES DE MANEJO DEL FORMULARIO ==========
    
    /**
     * Maneja los cambios en los campos del formulario
     * Se ejecuta cada vez que el usuario escribe en un input
     * 
     * @param {Event} e - Evento del input que cambió
     */
    const handleChange = (e) => {
        // Desestructuración: extrae name y value del input que disparó el evento
        const { name, value } = e.target;
        
        // Actualiza el estado de formData
        // prev: valor anterior del estado
        // ...prev: copia todas las propiedades del objeto anterior
        // [name]: value: actualiza solo el campo que cambió (notación de propiedad computada)
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Limpia el error del campo actual cuando el usuario empieza a escribir
        // Esto mejora la UX al dar feedback inmediato
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''  // Borra el mensaje de error de este campo
            }));
        }
    };

    /**
     * Valida todos los campos del formulario
     * Retorna un objeto con los errores encontrados (vacío si todo está bien)
     * 
     * @returns {Object} Objeto con mensajes de error por cada campo inválido
     */
    const validateForm = () => {
        // Objeto que acumulará los errores encontrados
        const newErrors = {};

        // ===== Validación del campo NOMBRE =====
        // trim(): elimina espacios al inicio y final del string
        if (!formData.nombre.trim()) {
            // Si está vacío, es obligatorio
            newErrors.nombre = 'El nombre es obligatorio';
        } else if (formData.nombre.trim().length < 2) {
            // Si tiene menos de 2 caracteres, es muy corto
            newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
        }

        // ===== Validación del campo EMAIL =====
        // Expresión regular (regex) para validar formato de email
        // ^: inicio del string, $: fin del string
        // [^\s@]+: uno o más caracteres que no sean espacio ni @
        // @: el símbolo arroba literal
        // \.: el punto literal (escapado porque . tiene significado especial en regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'El correo electrónico es obligatorio';
        } else if (!emailRegex.test(formData.email)) {
            // test(): método de regex que retorna true si coincide con el patrón
            newErrors.email = 'Ingresa un correo electrónico válido';
        }

        // ===== Validación del campo ASUNTO =====
        if (!formData.asunto) {
            // Si no se ha seleccionado ninguna opción del select
            newErrors.asunto = 'Selecciona un asunto';
        }

        // ===== Validación del campo MENSAJE =====
        if (!formData.mensaje.trim()) {
            newErrors.mensaje = 'El mensaje es obligatorio';
        } else if (formData.mensaje.trim().length < 10) {
            // El mensaje debe tener al menos 10 caracteres
            newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
        }

        // Retorna el objeto con todos los errores encontrados
        return newErrors;
    };

    /**
     * Maneja el envío del formulario
     * Valida los datos y muestra errores o mensaje de éxito según corresponda
     * 
     * @param {Event} e - Evento del submit del formulario
     */
    const handleSubmit = (e) => {
        // preventDefault(): evita que el formulario recargue la página (comportamiento por defecto)
        e.preventDefault();
        
        // Ejecuta la validación y obtiene los errores
        const formErrors = validateForm();
        
        // Object.keys(): retorna un array con las keys del objeto
        // Si length === 0, significa que no hay errores
        if (Object.keys(formErrors).length === 0) {
            // ===== FORMULARIO VÁLIDO =====
            console.log('Formulario enviado:', formData);
            // Marca el formulario como enviado para mostrar mensaje de éxito
            setIsSubmitted(true);
            
            // setTimeout: ejecuta una función después de X milisegundos
            // Simula el envío del formulario y resetea después de 3 segundos
            setTimeout(() => {
                setIsSubmitted(false);
                // Resetea todos los campos del formulario a valores vacíos
                setFormData({
                    nombre: '',
                    email: '',
                    asunto: '',
                    mensaje: ''
                });
            }, 3000);  // 3000 ms = 3 segundos
        } else {
            // ===== FORMULARIO INVÁLIDO =====
            // Actualiza el estado de errores para mostrarlos en la UI
            setErrors(formErrors);
        }
    };

    /**
     * Maneja el botón de reset/limpiar del formulario
     * Resetea todos los campos y errores a su estado inicial
     */
    const handleReset = () => {
        // Limpia todos los campos del formulario
        setFormData({
            nombre: '',
            email: '',
            asunto: '',
            mensaje: ''
        });
        // Limpia todos los mensajes de error
        setErrors({});
        // Oculta el mensaje de éxito si estaba visible
        setIsSubmitted(false);
    };

    if (isSubmitted) {
        return (
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="alert alert-success text-center">
                            <h4>¡Mensaje enviado exitosamente!</h4>
                            <p>Gracias por contactarnos. Te responderemos pronto.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-5">
            {/* Header */}
            <section className="text-center mb-4">
                <h2 className="display-5 fw-bold mb-3">Formulario de contacto</h2>
                <p className="lead text-muted">
                    Formulario de contacto para <strong>Play & Fun</strong>
                </p>
            </section>

            {/* Grid Layout para Formulario e Información */}
            <div className="row">
                {/* Formulario de contacto */}
                <div className="col-lg-8 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Envíanos un mensaje</h5>
                            <form onSubmit={handleSubmit} noValidate>
                                {/* Campo Nombre */}
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">
                                        Nombre completo *
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        placeholder="Escribe tu nombre"
                                    />
                                    {errors.nombre && (
                                        <div className="invalid-feedback">
                                            {errors.nombre}
                                        </div>
                                    )}
                                </div>

                                {/* Campo Email */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Correo electrónico *
                                    </label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="ejemplo@correo.com"
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>

                                {/* Campo Asunto */}
                                <div className="mb-3">
                                    <label htmlFor="asunto" className="form-label">
                                        Asunto *
                                    </label>
                                    <select
                                        className={`form-select ${errors.asunto ? 'is-invalid' : ''}`}
                                        id="asunto"
                                        name="asunto"
                                        value={formData.asunto}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecciona un asunto</option>
                                        <option value="consulta-producto">Consulta sobre producto</option>
                                        <option value="pedido">Consulta sobre pedido</option>
                                        <option value="devolucion">Devolución</option>
                                        <option value="soporte">Soporte técnico</option>
                                        <option value="otro">Otro</option>
                                    </select>
                                    {errors.asunto && (
                                        <div className="invalid-feedback">
                                            {errors.asunto}
                                        </div>
                                    )}
                                </div>

                                {/* Campo Mensaje */}
                                <div className="mb-4">
                                    <label htmlFor="mensaje" className="form-label">
                                        Mensaje *
                                    </label>
                                    <textarea
                                        className={`form-control ${errors.mensaje ? 'is-invalid' : ''}`}
                                        id="mensaje"
                                        name="mensaje"
                                        rows="5"
                                        value={formData.mensaje}
                                        onChange={handleChange}
                                        placeholder="Escribe tu mensaje…"
                                    ></textarea>
                                    {errors.mensaje && (
                                        <div className="invalid-feedback">
                                            {errors.mensaje}
                                        </div>
                                    )}
                                </div>

                                {/* Botones */}
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-secondary me-md-2"
                                        onClick={handleReset}
                                    >
                                        Limpiar
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Enviar mensaje
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Información de contacto */}
                <div className="col-lg-4 mb-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Información de contacto</h5>
                            
                            <div className="mb-3">
                                <h6 className="fw-bold">📞 Teléfono</h6>
                                <p className="text-muted mb-0">+123 456 798</p>
                            </div>

                            <div className="mb-3">
                                <h6 className="fw-bold">📧 Email</h6>
                                <p className="text-muted mb-0">contacto@playfun.cl</p>
                            </div>

                            <div className="mb-3">
                                <h6 className="fw-bold">📍 Dirección</h6>
                                <p className="text-muted mb-0">
                                    Avenida Valparaíso 456<br />
                                    Viña del Mar, Chile
                                </p>
                            </div>

                            <div className="mb-3">
                                <h6 className="fw-bold">🕒 Horarios</h6>
                                <p className="text-muted mb-0">
                                    Lunes a Viernes: 9:00 - 18:00<br />
                                    Sábados: 10:00 - 14:00
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
