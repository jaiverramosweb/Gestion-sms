// Script para actualizar el formulario de vuelo
const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Actualizar el formulario HTML
const oldForm = `                <form onsubmit="saveFlight(event)">
                    <div class="form-grid">
                        <div><label>Fecha</label><input type="date" id="fFecha" required></div>
                        <div><label>Matrícula / Equipo</label><input type="text" id="fMatricula" placeholder="HK-XXXX" required></div>
                        <div><label>Piloto al Mando</label><input type="text" id="fPiloto" required></div>
                    </div>
                    <div class="form-grid">
                        <div><label>Origen</label><input type="text" id="fOrigen" required></div>
                        <div><label>Destino</label><input type="text" id="fDestino" required></div>
                        <div><label>Horas Vuelo</label><input type="number" step="0.1" id="fHoras" required></div>
                    </div>
                    <div class="form-grid">
                        <div><label>Pasajeros (Pax)</label><input type="number" id="fPax" value="0"></div>
                        <div><label>Carga (Kg)</label><input type="number" id="fCarga" value="0"></div>
                        <div><label>Ciclos/Aterrizajes</label><input type="number" id="fCiclos" value="1"></div>
                    </div>
                    <button type="submit" class="btn-stats">Registrar Vuelo</button>
                </form>`;

const newForm = `                <form onsubmit="saveFlight(event)">
                    <!-- Fila 1: Datos Generales -->
                    <div class="form-grid">
                        <div><label>Empresa</label><input type="text" id="fEmpresa" value="IVA"></div>
                        <div><label>Fecha</label><input type="date" id="fFecha" required></div>
                        <div><label>Clasificación Servicio</label><input type="text" id="fClasificacion" value="1"></div>
                        <div><label>Modelo Aeronave</label><input type="text" id="fModelo" placeholder="C206"></div>
                    </div>

                    <!-- Fila 2: Aeronave y Combustible -->
                    <div class="form-grid">
                        <div><label>Matrícula</label><input type="text" id="fMatricula" placeholder="YV1234" required></div>
                        <div><label>Asientos Pax</label><input type="number" id="fAsientos" value="5"></div>
                        <div><label>Tipo Combustible</label><input type="text" id="fTipoComb" value="AV-GAS"></div>
                        <div><label>Combustible (Lts)</label><input type="number" id="fCombustible" value="0"></div>
                    </div>

                    <!-- Fila 3: Ruta y Tripulación -->
                    <div class="form-grid">
                        <div><label>Ruta</label><input type="text" id="fRuta" placeholder="SVCB-SVAB"></div>
                        <div><label>Origen</label><input type="text" id="fOrigen" required></div>
                        <div><label>Destino</label><input type="text" id="fDestino" required></div>
                        <div><label>Piloto</label><input type="text" id="fPiloto" required></div>
                    </div>

                    <!-- Fila 4: Pasajeros -->
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                        <label style="margin-bottom: 10px; color: var(--primary); font-weight: 600;">Pasajeros</label>
                        <div class="form-grid">
                            <div><label>Embarcados</label><input type="number" id="fPaxEmb" value="0"></div>
                            <div><label>Desembarcados</label><input type="number" id="fPaxDes" value="0"></div>
                        </div>
                    </div>

                    <!-- Fila 5: Carga y Correo -->
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                        <label style="margin-bottom: 10px; color: var(--primary); font-weight: 600;">Carga y Correo (Kg)</label>
                        <div class="form-grid">
                            <div><label>Carga Emb.</label><input type="number" id="fCargaEmb" value="0"></div>
                            <div><label>Carga Des.</label><input type="number" id="fCargaDes" value="0"></div>
                            <div><label>Correo Emb.</label><input type="number" id="fCorreoEmb" value="0"></div>
                            <div><label>Correo Des.</label><input type="number" id="fCorreoDes" value="0"></div>
                        </div>
                    </div>

                    <!-- Fila 6: Observaciones -->
                    <div style="margin-bottom: 20px;">
                        <label>Observaciones</label>
                        <textarea id="fObs" rows="2" placeholder="Notas adicionales sobre el vuelo..."></textarea>
                    </div>

                    <!-- Fila 7: KPIs Internos -->
                    <div class="form-grid">
                        <div><label>Horas Vuelo (KPI)</label><input type="number" step="0.1" id="fHoras" required></div>
                        <div><label>Ciclos</label><input type="number" id="fCiclos" value="1"></div>
                    </div>

                    <button type="submit" class="btn-stats">Registrar Vuelo</button>
                </form>`;

html = html.replace(oldForm, newForm);

// 2. Actualizar saveFlight function
const oldSaveFlight = `        function saveFlight(e) {
            e.preventDefault();
            db.flights.push({
                fecha: document.getElementById('fFecha').value,
                matricula: document.getElementById('fMatricula').value,
                piloto: document.getElementById('fPiloto').value,
                origen: document.getElementById('fOrigen').value,
                destino: document.getElementById('fDestino').value,
                horas: parseFloat(document.getElementById('fHoras').value),
                pax: parseInt(document.getElementById('fPax').value),
                carga: parseFloat(document.getElementById('fCarga').value),
                ciclos: parseInt(document.getElementById('fCiclos').value)
            });
            saveDB();
            alert('Vuelo Registrado');
            e.target.reset();
        }`;

const newSaveFlight = `        function saveFlight(e) {
            e.preventDefault();
            db.flights.push({
                // Campos Reporte INAC
                empresa: document.getElementById('fEmpresa').value,
                fecha: document.getElementById('fFecha').value,
                clasificacion: document.getElementById('fClasificacion').value,
                modelo: document.getElementById('fModelo').value,
                matricula: document.getElementById('fMatricula').value,
                asientos: parseInt(document.getElementById('fAsientos').value) || 0,
                tipoComb: document.getElementById('fTipoComb').value,
                combustible: parseFloat(document.getElementById('fCombustible').value) || 0,
                ruta: document.getElementById('fRuta').value,
                origen: document.getElementById('fOrigen').value,
                destino: document.getElementById('fDestino').value,
                paxEmb: parseInt(document.getElementById('fPaxEmb').value) || 0,
                paxDes: parseInt(document.getElementById('fPaxDes').value) || 0,
                cargaEmb: parseFloat(document.getElementById('fCargaEmb').value) || 0,
                cargaDes: parseFloat(document.getElementById('fCargaDes').value) || 0,
                correoEmb: parseFloat(document.getElementById('fCorreoEmb').value) || 0,
                correoDes: parseFloat(document.getElementById('fCorreoDes').value) || 0,
                obs: document.getElementById('fObs').value,
                // Campos Sistema Interno
                piloto: document.getElementById('fPiloto').value,
                horas: parseFloat(document.getElementById('fHoras').value) || 0,
                ciclos: parseInt(document.getElementById('fCiclos').value) || 1
            });
            saveDB();
            alert('Vuelo Registrado');
            e.target.reset();
            // Restaurar valores por defecto
            document.getElementById('fEmpresa').value = "IVA";
            document.getElementById('fClasificacion').value = "1";
            document.getElementById('fAsientos').value = "5";
            document.getElementById('fTipoComb').value = "AV-GAS";
        }`;

html = html.replace(oldSaveFlight, newSaveFlight);

// 3. Actualizar renderTable para flights
const oldRenderTable = `            renderTable('tableFlights', db.flights, (r) => \`
                <td>\${r.fecha}</td><td>\${r.matricula}</td><td>\${r.origen}-\${r.destino}</td>
                <td>\${r.horas}</td><td>\${r.pax}</td><td>\${r.carga}</td>
            \`);`;

const newRenderTable = `            renderTable('tableFlights', db.flights, (r) => \`
                <td>\${r.fecha}</td><td>\${r.matricula}</td><td>\${r.ruta || r.origen+'-'+r.destino}</td>
                <td>\${r.horas}</td><td>\${(r.paxEmb||0)+'/'+(r.paxDes||0)}</td><td>\${(r.cargaEmb||0)+'/'+(r.cargaDes||0)}</td>
            \`);`;

html = html.replace(oldRenderTable, newRenderTable);

// 4. Actualizar downloadStatsOnly
const oldDownload = `            const flightData = db.flights.map(f => ({
                "Fecha": f.fecha,
                "Matrícula": f.matricula,
                "Piloto": f.piloto,
                "Origen": f.origen,
                "Destino": f.destino,
                "Horas de Vuelo": f.horas,
                "Pax": f.pax,
                "Carga (Kg)": f.carga,
                "Ciclos": f.ciclos
            }));`;

const newDownload = `            const flightData = db.flights.map(f => ({
                "Empresa": f.empresa || "IVA",
                "Fecha": f.fecha,
                "Clasificación del servicio": f.clasificacion || "1",
                "Modelo de aeronave": f.modelo || "",
                "Matrícula de aeronave": f.matricula,
                "Asientos para pasajeros": f.asientos || 0,
                "Tipo de combustible": f.tipoComb || "AV-GAS",
                "Combustible (litros)": f.combustible || 0,
                "Ruta": f.ruta || (f.origen + "-" + f.destino),
                "Origen": f.origen,
                "Destino": f.destino,
                "Pasajeros Embarcada": f.paxEmb || 0,
                "Pasajeros Desembarcada": f.paxDes || 0,
                "Carga (Kg.) Embarcada": f.cargaEmb || 0,
                "Carga (Kg.) Desembarcada": f.cargaDes || 0,
                "Correo (Kg.) Embarcado": f.correoEmb || 0,
                "Correo (Kg.) Desembarcado": f.correoDes || 0,
                "Observaciones": f.obs || ""
            }));`;

html = html.replace(oldDownload, newDownload);

fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ Archivo actualizado exitosamente');
