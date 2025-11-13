import{a as Z,b as ee,c as te,e as ie,f as ne,g as oe,h as re,i as se}from"./chunk-IB5HPKPK.js";import"./chunk-3CY4RGAW.js";import{a as le}from"./chunk-3S2IHX64.js";import{a as ae}from"./chunk-RGZFVPZW.js";import{Ga as z,N as U,Qa as x,Ra as h,S as N,Sa as G,Ta as T,Ua as D,Va as X,Wa as r,X as H,Xa as n,Y as L,Ya as f,ab as $,ca as b,cb as y,eb as _,jb as q,lb as s,mb as k,nb as R,ob as Y,pa as K,pb as J,qb as w,ra as c,rb as S,sb as I,vb as Q,zb as P}from"./chunk-HPYFT727.js";var v=class v{exportToCSV(t){if(t.length===0){alert("No hay datos para exportar");return}let o=[["Fecha Sesi\xF3n","Montacarga","Modelo","Inspector","Turno","Cuadrilla","Ubicaci\xF3n","Od\xF3metro","Estado General","Total \xCDtems","\xCDtems OK","\xCDtems con Incidencia","\xCDtems Pendientes","Problemas Encontrados"]];t.forEach(i=>{i.inspections.forEach(d=>{let l=d.checklist.filter(u=>u.status==="ok").length,p=d.checklist.filter(u=>u.status==="issue").length,C=d.checklist.filter(u=>u.status==="pending").length,E=d.checklist.length,M=d.checklist.filter(u=>u.status==="issue").map(u=>`${u.label}${u.comment?": "+u.comment:""}`).join("; "),O=p>0?"Con Incidencias":"OK",W=[new Date(i.id).toLocaleString("es-MX"),d.forkliftName,d.forkliftId,d.inspector,this.getShiftName(d.shift),d.crew,d.location,d.odometer,O,E.toString(),l.toString(),p.toString(),C.toString(),M||"Ninguno"];o.push(W)})});let m=o.map(i=>i.map(d=>`"${d.replace(/"/g,'""')}"`).join(",")).join(`
`);this.downloadFile(m,"inspecciones_montacargas.csv","text/csv;charset=utf-8;")}exportStatsToCSV(t){if(t.length===0){alert("No hay datos para exportar");return}let e={};t.forEach(d=>{d.inspections.forEach(l=>{e[l.forkliftName]||(e[l.forkliftName]={total:0,ok:0,issues:0}),e[l.forkliftName].total++,l.checklist.some(C=>C.status==="issue")?e[l.forkliftName].issues++:e[l.forkliftName].ok++})});let m=[["Montacarga","Total Inspecciones","OK","Con Incidencias","% Aprobaci\xF3n"]];Object.entries(e).forEach(([d,l])=>{let p=(l.ok/l.total*100).toFixed(1);m.push([d,l.total.toString(),l.ok.toString(),l.issues.toString(),`${p}%`])});let i=m.map(d=>d.map(l=>`"${l}"`).join(",")).join(`
`);this.downloadFile(i,"estadisticas_montacargas.csv","text/csv;charset=utf-8;")}downloadFile(t,e,o){let m=new Blob(["\uFEFF"+t],{type:o}),i=window.URL.createObjectURL(m),d=document.createElement("a");d.href=i,d.download=e,d.click(),window.URL.revokeObjectURL(i)}getShiftName(t){return{1:"Matutino (06:00 - 14:00)",2:"Vespertino (14:00 - 22:00)",3:"Nocturno (22:00 - 06:00)"}[t]||t}};v.\u0275fac=function(e){return new(e||v)},v.\u0275prov=U({token:v,factory:v.\u0275fac,providedIn:"root"});var j=v;var ge=()=>[1,2,3],ce=(a,t)=>t.id,ue=(a,t)=>t.forkliftId;function fe(a,t){if(a&1&&(r(0,"div",4)(1,"p",28),s(2),n()()),a&2){let e=_();c(2),k(e.storageWarning())}}function _e(a,t){a&1&&(r(0,"div",29)(1,"div",30)(2,"div"),f(3,"div",31)(4,"div",32),n(),f(5,"div",33),n()())}function be(a,t){a&1&&(r(0,"div",27),T(1,_e,6,0,"div",29,G),n()),a&2&&(c(),D(Q(0,ge)))}function xe(a,t){if(a&1){let e=$();r(0,"div",34),f(1,"i",35),r(2,"p",36),s(3,"No se encontraron resultados con los filtros actuales."),n(),r(4,"button",37),y("click",function(){H(e);let m=_(2);return L(m.clearFilters())}),s(5," Limpiar Filtros "),n()()}}function he(a,t){a&1&&(r(0,"span",51),s(1,"OK"),n())}function Ce(a,t){a&1&&(r(0,"span",52),s(1,"INCIDENCIA"),n())}function ye(a,t){a&1&&f(0,"i",59)}function ve(a,t){if(a&1&&f(0,"img",60),a&2){let e=_(2).$implicit;X("src",e.photo,K)}}function ke(a,t){if(a&1&&(r(0,"div",54),f(1,"i",55),r(2,"div")(3,"div",56)(4,"p",57),s(5),r(6,"span",58),s(7),n()(),x(8,ye,1,0,"i",59),n(),x(9,ve,1,1,"img",60),n()()),a&2){let e=_().$implicit;c(5),R("",e.label,": "),c(2),k(e.comment),c(),h(e.photo?8:-1),c(),h(e.photo?9:-1)}}function we(a,t){if(a&1&&x(0,ke,10,4,"div",54),a&2){let e=t.$implicit;h(e.status==="issue"?0:-1)}}function Se(a,t){if(a&1&&(r(0,"div",44)(1,"div",48)(2,"div")(3,"p",49),s(4),n(),r(5,"p",50),s(6),n()(),x(7,he,2,0,"span",51)(8,Ce,2,0,"span",52),n(),r(9,"div",53),T(10,we,1,1,null,null,ce),n()()),a&2){let e=t.$implicit,o=_(5);c(4),Y("",e.forkliftName," (",e.forkliftId,")"),c(2),J(" Inspector: ",e.inspector," | Tripulaci\xF3n: ",e.crew," | Turno: ",e.shift," | Ubicaci\xF3n: ",e.location," "),c(),h(o.getInspectionStatus(e)==="ok"?7:8),c(3),D(e.checklist)}}function Ie(a,t){if(a&1){let e=$();r(0,"div",43),T(1,Se,12,7,"div",44,ue),r(3,"div",45)(4,"button",46),y("click",function(){H(e);let m=_().$implicit,i=_(3);return L(i.generateReport(m))}),f(5,"i",47),s(6,"Generar Reporte "),n()()()}if(a&2){let e=_().$implicit;c(),D(e.inspections)}}function Fe(a,t){if(a&1){let e=$();r(0,"div",38)(1,"button",39),y("click",function(){let m=H(e).$implicit,i=_(3);return L(i.toggleSession(m.id))}),r(2,"div")(3,"p",40),s(4),n(),r(5,"p",41),s(6),n()(),f(7,"i",42),n(),x(8,Ie,7,0,"div",43),n()}if(a&2){let e=t.$implicit,o=_(3);c(4),k(o.formatDate(e.id)),c(2),R("",e.inspections.length," inspecciones"),c(),q("rotate-180",o.expandedSessionId()===e.id),c(),h(o.expandedSessionId()===e.id?8:-1)}}function Ee(a,t){if(a&1&&(r(0,"div",27),T(1,Fe,9,5,"div",38,ce),n()),a&2){let e=_(2);c(),D(e.filteredSessions())}}function Te(a,t){if(a&1&&x(0,xe,6,0,"div",34)(1,Ee,3,0,"div",27),a&2){let e=_();h(e.filteredSessions().length===0?0:1)}}var F=class F{constructor(){this.dbService=N(ae);this.exportService=N(j);this.storageService=N(le);this.sessions=b([]);this.isLoading=b(!0);this.expandedSessionId=b(null);this.filterDateFrom=b("");this.filterDateTo=b("");this.filterInspector=b("");this.filterStatus=b("all");this.filterForklift=b("");this.filteredSessions=P(()=>{let t=this.sessions(),e=this.filterDateFrom();if(e){let l=new Date(e).getTime();t=t.filter(p=>p.id>=l)}let o=this.filterDateTo();if(o){let l=new Date(o).setHours(23,59,59,999);t=t.filter(p=>p.id<=l)}let m=this.filterInspector().toLowerCase();m&&(t=t.filter(l=>l.inspections.some(p=>p.inspector.toLowerCase().includes(m))));let i=this.filterForklift().toLowerCase();i&&(t=t.filter(l=>l.inspections.some(p=>p.forkliftName.toLowerCase().includes(i)||p.forkliftId.toLowerCase().includes(i))));let d=this.filterStatus();return d!=="all"&&(t=t.filter(l=>l.inspections.some(p=>{let C=p.checklist.some(E=>E.status==="issue");return d==="issue"?C:!C}))),t});this.storageWarning=P(()=>this.storageService.getStorageWarning())}ngOnInit(){this.loadHistory(),this.storageService.checkStorage()}async loadHistory(){this.isLoading.set(!0);try{let t=await this.dbService.getAllSessions();this.sessions.set(t.sort((e,o)=>o.id-e.id))}catch(t){console.error("Failed to load history:",t)}finally{this.isLoading.set(!1)}}toggleSession(t){this.expandedSessionId.update(e=>e===t?null:t)}getInspectionStatus(t){return t.checklist.some(e=>e.status==="issue")?"issue":"ok"}formatDate(t){return new Date(t).toLocaleString()}clearFilters(){this.filterDateFrom.set(""),this.filterDateTo.set(""),this.filterInspector.set(""),this.filterStatus.set("all"),this.filterForklift.set("")}exportCurrentData(){let t=this.filteredSessions();if(t.length===0){alert("No hay datos para exportar con los filtros actuales");return}this.exportService.exportToCSV(t)}exportStats(){let t=this.sessions();if(t.length===0){alert("No hay datos para exportar");return}this.exportService.exportStatsToCSV(t)}generateReport(t){let e=window.open("","_blank");if(e){let m=`
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <title>Check list Montacargas - ${new Date(t.id).toLocaleDateString()}</title>
          <script src="https://cdn.tailwindcss.com"><\/script>
          <style>
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              .no-print { display: none !important; }
              .page-break { page-break-before: always; }
            }
            body { font-family: sans-serif; }
            .bordered { border: 1px solid #000; }
            .report-table { border-collapse: collapse; width: 100%; font-size: 10px; }
            .report-table td, .report-table th { border: 1px solid #000; padding: 4px 8px; vertical-align: middle; }
            .check-box {
              width: 16px;
              height: 16px;
              border: 1px solid #000;
              display: inline-block;
              text-align: center;
              line-height: 14px;
              font-weight: bold;
            }
            .header-table td { padding: 2px 8px; }
          </style>
        </head>
        <body class="p-4 bg-white text-xs">
          ${t.inspections.map((i,d)=>{let l=i.checklist.reduce((g,V)=>((g[V.category]=g[V.category]||[]).push(V),g),{}),p=l["Revisi\xF3n General"]||[],C=l["Dispositivos de Seguridad"]||[],E=l["Inventario de Vidrio y Pl\xE1stico R\xEDgido"]||[],M=Math.ceil(p.length/2),O=p.slice(0,M),W=p.slice(M),u=g=>g?'<div class="check-box">X</div>':'<div class="check-box">&nbsp;</div>',B=g=>`
                <tr>
                  <td class="w-3/5">${g.label}</td>
                  <td class="text-center">${u(g.status==="ok")}</td>
                  <td>Cumple</td>
                  <td class="text-center">${u(g.status==="issue")}</td>
                  <td>No Cumple</td>
                </tr>
                <tr>
                  <td colspan="5"><strong>Obs:</strong> ${g.comment||""}</td>
                </tr>
              `,A=g=>`
                <tr>
                  <td class="w-3/5">${g.label}</td>
                  <td class="text-center">${u(g.status==="ok")}</td>
                  <td>Si</td>
                  <td class="text-center">${u(g.status==="issue")}</td>
                  <td>No</td>
                </tr>
              `,me=i.signature?`<img src="${i.signature}" alt="Firma" style="height: 40px; display: block; margin: 0 auto;"/>`:'<div style="height: 40px;"></div>';return`
            <div class="${d>0?"page-break":""}">
              <table class="w-full mb-2 report-table">
                <tr>
                  <td rowspan="3" class="w-1/5 text-center align-middle">
                    <img src="${se}" alt="Logo" class="h-12 mx-auto">
                  </td>
                  <td rowspan="2" class="w-3/5 text-center font-bold text-base align-middle">Check list Montacargas</td>
                  <td class="text-xs">C\xF3digo: CUA-FR-FLE-010</td>
                </tr>
                <tr>
                  <td class="text-xs">Versi\xF3n: 09</td>
                </tr>
                <tr>
                  <td class="text-center"><strong>Tipo de Documento:</strong> Formato</td>
                  <td class="text-xs"><strong>Fecha de Emisi\xF3n:</strong> 2024-07-15</td>
                </tr>
              </table>

              <table class="w-full mb-2 report-table header-table">
                 <tr>
                    <td><strong>Fecha:</strong> ${new Date(i.inspectionDate).toLocaleDateString("es-MX")}</td>
                    <td><strong>Od\xF3metro:</strong> ${i.odometer}</td>
                    <td><strong>Montacargas N\xB0:</strong> ${i.forkliftId}</td>
                 </tr>
                 <tr>
                    <td colspan="2"><strong>Nombre completo del operador:</strong> ${i.inspector}</td>
                    <td><strong>Turno de Trabajo:</strong> ${i.shift}</td>
                 </tr>
              </table>

              <p class="text-justify p-2 bordered mb-2" style="font-size: 9px;">
                "La revisi\xF3n del montacargas debe realizarse diariamente antes del inicio del turno por el operador. Durante la revisi\xF3n, el operador marcar\xE1 el recuadro de 'Cumple' si la parte revisada est\xE1 en buen estado y funcionando correctamente, y el recuadro de 'No Cumple' si se detecta un mal funcionamiento o no cumple con los requisitos m\xEDnimos para su operaci\xF3n. En caso de marcar 'No Cumple', el operador registrar\xE1 la falla detectada, avisar\xE1 al facilitador responsable para generar el aviso de mantenimiento y llevar\xE1 el montacargas al taller para su reparaci\xF3n."
              </p>

              <div class="flex gap-4">
                <div class="w-1/2">
                  <table class="w-full report-table">
                    ${O.map(B).join("")}
                  </table>
                </div>
                <div class="w-1/2">
                  <table class="w-full report-table">
                    ${W.map(B).join("")}
                  </table>
                </div>
              </div>
              
              <div class="flex gap-4 mt-2">
                <div class="w-1/2">
                  <table class="w-full report-table">
                    <thead><tr><th colspan="5" class="text-center">Dispositivos de Seguridad</th></tr></thead>
                    ${C.map(A).join("")}
                  </table>
                </div>
                <div class="w-1/2">
                  <table class="w-full report-table">
                    <thead><tr><th colspan="5" class="text-center">Inventario de Vidrio y Pl\xE1stico R\xEDgido</th></tr></thead>
                    ${E.map(A).join("")}
                  </table>
                </div>
              </div>
              
              <div class="mt-4">
                <strong class="block mb-1">Observaciones:</strong>
                <div class="w-full h-24 p-1 bordered">
                  ${i.checklist.filter(g=>g.comment).map(g=>`<div><strong>${g.label}:</strong> ${g.comment}</div>`).join("")}
                </div>
              </div>

              <div class="mt-8 flex justify-between items-end" style="padding-top: 30px;">
                <div class="w-2/5">
                  ${me}
                  <hr class="border-black"/>
                  <p class="text-center">Nombre y Firma del OP</p>
                </div>
                <div class="w-2/5">
                  <div style="height: 40px;"></div>
                  <hr class="border-black"/>
                  <p class="text-center">Nombre y Firma del Coordinador en Turno</p>
                </div>
              </div>
            </div>
            `}).join("")}
          <footer class="mt-8 text-center no-print">
              <button onclick="window.print()" class="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition-colors">Imprimir Reporte</button>
              <button onclick="window.close()" class="ml-4 px-6 py-2 bg-gray-500 text-white font-bold rounded-lg shadow hover:bg-gray-600 transition-colors">Cerrar</button>
          </footer>
        </body>
        </html>
      `;e.document.write(m),e.document.close(),e.focus()}}};F.\u0275fac=function(e){return new(e||F)},F.\u0275cmp=z({type:F,selectors:[["app-history"]],decls:60,vars:9,consts:[[1,"container","mx-auto","p-4","max-w-2xl"],[1,"mb-6"],[1,"text-3xl","font-bold","text-gray-800","dark:text-white"],[1,"text-gray-600","dark:text-gray-400"],[1,"mb-4","p-4","bg-yellow-50","dark:bg-yellow-900/20","border","border-yellow-400","dark:border-yellow-600","rounded-lg"],[1,"mb-6","bg-white","dark:bg-dark-card","rounded-lg","shadow","p-4"],[1,"flex","justify-between","items-center","mb-4"],[1,"text-lg","font-semibold","text-gray-800","dark:text-white"],[1,"fas","fa-filter","mr-2"],[1,"flex","gap-2"],[1,"px-4","py-2","bg-green-600","hover:bg-green-700","text-white","text-sm","font-medium","rounded-lg","transition-colors","flex","items-center","gap-2",3,"click"],[1,"fas","fa-file-csv"],[1,"px-4","py-2","bg-blue-600","hover:bg-blue-700","text-white","text-sm","font-medium","rounded-lg","transition-colors","flex","items-center","gap-2",3,"click"],[1,"fas","fa-chart-bar"],[1,"grid","grid-cols-1","md:grid-cols-2","lg:grid-cols-3","gap-3"],[1,"block","text-sm","font-medium","text-gray-700","dark:text-gray-300","mb-1"],["type","date",1,"w-full","px-3","py-2","border","border-gray-300","dark:border-gray-600","rounded-lg","focus:ring-2","focus:ring-blue-500","dark:bg-dark-accent","dark:text-white",3,"ngModelChange","ngModel"],["type","text","placeholder","Buscar por nombre...",1,"w-full","px-3","py-2","border","border-gray-300","dark:border-gray-600","rounded-lg","focus:ring-2","focus:ring-blue-500","dark:bg-dark-accent","dark:text-white",3,"ngModelChange","ngModel"],["type","text","placeholder","Buscar montacarga...",1,"w-full","px-3","py-2","border","border-gray-300","dark:border-gray-600","rounded-lg","focus:ring-2","focus:ring-blue-500","dark:bg-dark-accent","dark:text-white",3,"ngModelChange","ngModel"],[1,"w-full","px-3","py-2","border","border-gray-300","dark:border-gray-600","rounded-lg","focus:ring-2","focus:ring-blue-500","dark:bg-dark-accent","dark:text-white",3,"ngModelChange","ngModel"],["value","all"],["value","ok"],["value","issue"],[1,"flex","items-end"],[1,"w-full","px-4","py-2","bg-gray-500","hover:bg-gray-600","text-white","font-medium","rounded-lg","transition-colors",3,"click"],[1,"fas","fa-times","mr-2"],[1,"mt-3","text-sm","text-gray-600","dark:text-gray-400"],[1,"space-y-4"],[1,"text-sm","text-yellow-800","dark:text-yellow-200"],[1,"bg-white","dark:bg-dark-card","rounded-lg","shadow","p-4","animate-pulse"],[1,"flex","justify-between","items-center"],[1,"h-5","bg-gray-300","dark:bg-gray-700","rounded","w-48","mb-2"],[1,"h-4","bg-gray-300","dark:bg-gray-700","rounded","w-32"],[1,"h-5","w-5","bg-gray-300","dark:bg-gray-700","rounded-full"],[1,"text-center","py-10","bg-white","dark:bg-dark-card","rounded-lg","shadow"],[1,"fas","fa-box-open","text-4xl","text-gray-400","mb-4"],[1,"text-gray-500","dark:text-gray-400"],[1,"mt-4","px-4","py-2","bg-blue-600","hover:bg-blue-700","text-white","rounded-lg",3,"click"],[1,"bg-white","dark:bg-dark-card","rounded-lg","shadow","overflow-hidden"],[1,"w-full","text-left","p-4","flex","justify-between","items-center","hover:bg-gray-50","dark:hover:bg-dark-accent","transition-colors",3,"click"],[1,"font-semibold","text-lg","text-gray-800","dark:text-white"],[1,"text-sm","text-gray-500","dark:text-gray-400"],[1,"fas","fa-chevron-down","transition-transform"],[1,"p-4","border-t","dark:border-dark-accent","bg-gray-50","dark:bg-dark-accent/50"],[1,"mb-3","p-3","rounded-md","bg-white","dark:bg-dark-card","shadow-sm"],[1,"mt-4","pt-4","border-t","dark:border-dark-accent","text-right"],[1,"bg-blue-600","text-white","px-4","py-2","rounded-lg","shadow","hover:bg-blue-700","transition-colors",3,"click"],[1,"fas","fa-print","mr-2"],[1,"flex","justify-between","items-start"],[1,"font-bold"],[1,"text-xs","text-gray-500","dark:text-gray-400"],[1,"text-green-600","dark:text-green-400","font-bold","text-sm"],[1,"text-red-600","dark:text-red-400","font-bold","text-sm"],[1,"mt-2","text-sm","space-y-1"],[1,"flex","items-start","gap-2","p-1","bg-red-50","dark:bg-red-900/20","rounded"],[1,"fas","fa-exclamation-triangle","text-red-500","mt-1"],[1,"flex","items-center","gap-2"],[1,"font-semibold"],[1,"font-normal"],["title","Contiene evidencia fotogr\xE1fica",1,"fas","fa-camera","text-coca-cola-red","text-lg"],["alt","Evidencia",1,"mt-1","w-24","h-24","object-cover","rounded",3,"src"]],template:function(e,o){e&1&&(r(0,"div",0)(1,"header",1)(2,"h1",2),s(3,"Historial de Inspecciones"),n(),r(4,"p",3),s(5,"Revise las sesiones de inspecci\xF3n pasadas."),n()(),x(6,fe,3,1,"div",4),r(7,"div",5)(8,"div",6)(9,"h2",7),f(10,"i",8),s(11,"Filtros "),n(),r(12,"div",9)(13,"button",10),y("click",function(){return o.exportCurrentData()}),f(14,"i",11),s(15," Exportar CSV "),n(),r(16,"button",12),y("click",function(){return o.exportStats()}),f(17,"i",13),s(18," Estad\xEDsticas "),n()()(),r(19,"div",14)(20,"div")(21,"label",15),s(22,"Desde"),n(),r(23,"input",16),I("ngModelChange",function(i){return S(o.filterDateFrom,i)||(o.filterDateFrom=i),i}),n()(),r(24,"div")(25,"label",15),s(26,"Hasta"),n(),r(27,"input",16),I("ngModelChange",function(i){return S(o.filterDateTo,i)||(o.filterDateTo=i),i}),n()(),r(28,"div")(29,"label",15),s(30,"Inspector"),n(),r(31,"input",17),I("ngModelChange",function(i){return S(o.filterInspector,i)||(o.filterInspector=i),i}),n()(),r(32,"div")(33,"label",15),s(34,"Montacarga"),n(),r(35,"input",18),I("ngModelChange",function(i){return S(o.filterForklift,i)||(o.filterForklift=i),i}),n()(),r(36,"div")(37,"label",15),s(38,"Estado"),n(),r(39,"select",19),I("ngModelChange",function(i){return S(o.filterStatus,i)||(o.filterStatus=i),i}),r(40,"option",20),s(41,"Todos"),n(),r(42,"option",21),s(43,"Solo OK"),n(),r(44,"option",22),s(45,"Solo con Incidencias"),n()()(),r(46,"div",23)(47,"button",24),y("click",function(){return o.clearFilters()}),f(48,"i",25),s(49,"Limpiar "),n()()(),r(50,"div",26),s(51," Mostrando "),r(52,"strong"),s(53),n(),s(54," de "),r(55,"strong"),s(56),n(),s(57," sesiones "),n()(),x(58,be,3,1,"div",27)(59,Te,2,1),n()),e&2&&(c(6),h(o.storageWarning()?6:-1),c(17),w("ngModel",o.filterDateFrom),c(4),w("ngModel",o.filterDateTo),c(4),w("ngModel",o.filterInspector),c(4),w("ngModel",o.filterForklift),c(4),w("ngModel",o.filterStatus),c(14),k(o.filteredSessions().length),c(3),k(o.sessions().length),c(2),h(o.isLoading()?58:59))},dependencies:[re,ne,oe,Z,ie,ee,te],encapsulation:2,changeDetection:0});var de=F;export{de as HistoryComponent};
