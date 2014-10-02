$.ajax({
    dataType: "json",
    url: 'http://poi.colombiajoven.gov.co/api/oferta',
}).done(function (data) {

    var info = [];
    var user = 0, edu = 0, emp = 0, pre = 0, rec = 0, vol = 0, des = 0, all = 0;

    $.each(data, function (key, val) {

        var img = '/img/ico/ico_300.png'

        switch (val.FkSeccion) {
            case '_***_': user++;
                break;
            case 1: edu++;
                break;
            case 2: emp++;
                break;
            case 3: pre++;
                break;
            case 4: rec++;
                break;
            case 5: vol++;
                break;
            case 6: des++;
                break;
        }
        all = edu + emp + pre + rec + vol + des;
    });

    $("#CountUser").text(user);
    $("#CountAll").text(all);
    $("#CountEdu").text(edu);
    $("#CountEmp").text(emp);
    $("#CountPre").text(pre);
    $("#CountRec").text(rec);
    $("#CountVol").text(vol);
    $("#CountDes").text(des);
});
 
window.plugin.statusbarOverlay.show();

function _popup(id) {
    if (confirm(this.id)) {
        localStorage.setItem("id", id);
    }
}

function sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function seccionIMG(seccion) {

    switch (seccion) {
        case 1: img = '1ico_edu.png';
            break;
        case 2: img = '2ico_emp.png';
            break;
        case 3: img = '3ico_pre.png';
            break;
        case 4: img = '4ico_rec.png';
            break;
        case 5: img = '5ico_vol.png';
            break;
        case 6: img = '6ico_des.png';
            break;
    }



    return img;
}

//Lista Todo
function allResults(elemento) {
    $.ajax({
        dataType: "json",
        url: 'http://poi.colombiajoven.gov.co/api/oferta',
    }).done(function (data) {
        var items = [];
        $.each(data, function (key, val) {
            var img = seccionIMG(val.FkSeccion);
			
			var npais = convertirNPais(val.FkPais);
			var nreg = convertirNReg(val.FkPais,val.FkRegion);
			var ncity = convertirNCity(val.FkPais, val.FkRegion, val.FkCiudad);

            if (val.Oportunidad.length > 0) {

                items.push("<li data-icon='plus' class='ui-nodisc-icon ui-alt-icon' ><a href='#" + val.PkOferta + "_' value =" + val.PkOferta + " data-rel='popup' ><img src='img/ico/" + img + "' style='margin:10px; height: 60px; width: 60px;' /> <h1>" + val.Oportunidad + "</h1> <p>" + val.EntidadNombre + " </p></a></li>");

                items.push("<div data-role='popup' id='" + val.PkOferta + "_' data-theme='b' style='top: 5%; left: 5%; right: 5%; width: 90%; height: 90%; position: fixed; overflow-y:auto; overflow-x:hidden; background-color:rgba(0, 0, 0, 0.80);'>");
                items.push("<center><img src='img/ico/" + img + "' style='max-width:25%; margin:5% 1px; ' /></center>");
                items.push("<h2 style='text-wrap:normal; text-align:center'>" + val.Oportunidad + "</h2>");
                items.push("<div data-role='collapsible-set' id='" + val.PkOferta + "_CSet' data-mini='true' class='ui-nodisc-icon ui-alt-icon' data-theme='a' style='width: 90%; margin-left:5%; margin-right:5%;'>");
                items.push("<div data-role='collapsible' data-collapsed='false'>");
                items.push("<h3>Información</h3>");
                items.push("<p style='text-wrap:normal; text-align:center'><b>" + val.Seccion + "</b></p>");
                items.push("<p style='text-wrap:normal; text-align:justify'>" + val.Informacion + "</p>");
                items.push("</div>");
                items.push("<div data-role='collapsible'>");
                items.push("<h3>Entidad</h3>");
                items.push("<p style='text-wrap:normal'><b>Nombre: </b>" + val.EntidadNombre + "</p>");
                items.push("<p style='text-wrap:normal'><b>Contacto: </b><a href='" + val.Contacto + "' data-rel='external' >" + val.Contacto + "</a></p>");
                items.push("<p style='text-wrap:normal'><b>Web: </b><a href='" + val.EntidadUrl + "' data-rel='external' >" + val.EntidadUrl + "</a></p>");
                items.push("</div>");
                items.push("<div data-role='collapsible'>");
                items.push("<h3>Requisitos</h3>");
                items.push("<p style='text-wrap:normal; text-align:justify'>" + val.Requisitos + "</p>");
                items.push("<p style='text-wrap:normal'><b>Población Objetivo: </b>" + val.Requisitos + "</p>");
                items.push("<p style='text-wrap:normal'><b>Edad: </b>" + val.EdadMinima + " - " + val.EdadMaxima + "</p>");
                items.push("<p style='text-wrap:normal'><b>Fecha Inicio - jugo1: </b>" + val.FechaInicio + "</p>");
                items.push("<p style='text-wrap:normal'><b>Fecha Fin: </b>" + val.FechaFin + "</p>");
                items.push("</div>");
                items.push("<div data-role='collapsible'>");
                items.push("<h3>Ubicación</h3>");
                items.push("<p style='text-wrap:normal'><b>País: </b>" + npais + "</p>");
                items.push("<p style='text-wrap:normal'><b>Región: </b>" + nreg + "</p>");
                items.push("<p style='text-wrap:normal'><b>Ciudad: </b>" + ncity + "</p>");
                items.push("</div>");
                items.push("</div>");
                items.push("<div data-role='navbar' id='" + val.PkOferta + "_Nbar' class='ui-nodisc-icon' style='margin:1% 5%;'>");
                items.push("<ul data-mini='true'>");
                items.push("<li><a href='" + val.UrlFuente + "'data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(0, 128, 0, 0.80); ' data-icon='check'>Ver más</a></li>");
                items.push("<li><a href='#' data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(0, 148, 255, 0.80); ' data-icon='comment' onclick='window.plugins.socialsharing.share('#SíJovenApp " + val.Oportunidad + "', null, null, '" + val.UrlFuente + "')'>Compartir</a></li>");
                items.push("<li><a href='#' data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(139, 0, 0, 0.80); ' data-icon='delete' data-rel='back'>Cerrar</a></li>");
                items.push("</ul>");
                items.push("</div>");
                items.push("</div>");
            }
        });
        var container = document.getElementById(elemento);
        $("<ul/>", {
            "id": "eventList" + elemento, "data-role": "listview", "data-inset": "true", "data-filter-placeholder":"Buscar Oportunidades...", "data-filter": "true", "class": "'ui-nodisc-icon ui-alt-icon'",
            html: items.join("")
        }).appendTo(container);
		
		$("#eventList"+elemento).listview();
		$("div[id$='_']").popup(); 
		$("div[id$='_CSet']").collapsibleset();
		$("div[id$='_Nbar']").navbar();
    });
}

//Lista Filtro
function filterResults(categoria, elemento) {
    $.ajax({
        dataType: "json",
        url: 'http://poi.colombiajoven.gov.co/api/oferta',
    }).done(function (data) {
        var items = [];
        $.each(data, function (key, val) {
            if (val.FkSeccion == categoria) {
                var img = seccionIMG(val.FkSeccion);
				
				var npais = convertirNPais(val.FkPais);
				var nreg = convertirNReg(val.FkPais,val.FkRegion);
				var ncity = convertirNCity(val.FkPais, val.FkRegion, val.FkCiudad);

				if (val.Oportunidad.length > 0) {
                                    var dIni = new Date(val.FechaInicio);

				    items.push("<li data-icon='plus' class='ui-nodisc-icon ui-alt-icon' ><a href='#" + val.PkOferta + "_' value =" + val.PkOferta + " data-rel='popup' ><img src='img/ico/" + img + "' style='margin:10px; height: 60px; width: 60px;' /> <h1>" + val.Oportunidad + "</h1> <p>" + val.EntidadNombre + " </p></a></li>");

				    items.push("<div data-role='popup' id='" + val.PkOferta + "_' data-theme='b' style='top: 5%; left: 5%; right: 5%; width: 90%; height: 90%; position: fixed; overflow-y:auto; overflow-x:hidden; background-color:rgba(0, 0, 0, 0.80);'>");
				    items.push("<center><img src='img/ico/" + img + "' style='max-width:25%; margin:5% 1px; ' /></center>");
				    items.push("<h2 style='text-wrap:normal; text-align:center'>" + val.Oportunidad + "</h2>");
				    items.push("<div data-role='collapsible-set' id='" + val.PkOferta + "_CSet' data-mini='true' class='ui-nodisc-icon ui-alt-icon' data-theme='a' style='width: 90%; margin-left:5%; margin-right:5%;'>");
				    items.push("<div data-role='collapsible' data-collapsed='false'>");
				    items.push("<h3>Información</h3>");
				    items.push("<p style='text-wrap:normal; text-align:center'><b>" + val.Seccion + "</b></p>");
				    items.push("<p style='text-wrap:normal; text-align:justify'>" + val.Informacion + "</p>");
				    items.push("</div>");
				    items.push("<div data-role='collapsible'>");
				    items.push("<h3>Entidad</h3>");
				    items.push("<p style='text-wrap:normal'><b>Nombre: </b>" + val.EntidadNombre + "</p>");
				    items.push("<p style='text-wrap:normal'><b>Contacto: </b><a href='" + val.Contacto + "' data-rel='external' >" + val.Contacto + "</a></p>");
				    items.push("<p style='text-wrap:normal'><b>Web: </b><a href='" + val.EntidadUrl + "' data-rel='external' >" + val.EntidadUrl + "</a></p>");
				    items.push("</div>");
				    items.push("<div data-role='collapsible'>");
				    items.push("<h3>Requisitos</h3>");
				    items.push("<p style='text-wrap:normal; text-align:justify'>" + val.Requisitos + "</p>");
				    items.push("<p style='text-wrap:normal'><b>Población Objetivo: </b>" + val.Requisitos + "</p>");
				    items.push("<p style='text-wrap:normal'><b>Edad: </b>" + val.EdadMinima + " - " + val.EdadMaxima + "</p>");
				    items.push("<p style='text-wrap:normal'><b>Fecha Inicio (D/M/A): </b>"+val.FechaInicio.slice(9, 10) +"/"+ val.FechaInicio.slice(6, 7)+ "/" + val.FechaInicio.slice(0, 4) + "</p>");
				    items.push("<p style='text-wrap:normal'><b>Fecha Fin (D/M/A): </b>" +val.FechaInicio.slice(9, 10) +"/"+ val.FechaInicio.slice(6, 7)+ "/" + val.FechaInicio.slice(0, 4) + "</p>");
				    items.push("</div>");
				    items.push("<div data-role='collapsible'>");
				    items.push("<h3>Ubicación</h3>");
				    items.push("<p style='text-wrap:normal'><b>País: </b>" + npais + "</p>");
				    items.push("<p style='text-wrap:normal'><b>Región: </b>" + nreg + "</p>");
				    items.push("<p style='text-wrap:normal'><b>Ciudad: </b>" + ncity + "</p>");
				    items.push("</div>");
				    items.push("</div>");
				    items.push("<div data-role='navbar' id='" + val.PkOferta + "_Nbar' class='ui-nodisc-icon' style='margin:1% 5%;'>");
				    items.push("<ul data-mini='true'>");
				    items.push("<li><a href='" + val.UrlFuente + "'data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(0, 128, 0, 0.80); ' data-icon='check'>Ver más</a></li>");
				    items.push("<li><a href='#' data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(0, 148, 255, 0.80); ' data-icon='comment' onclick='window.plugins.socialsharing.share('#SíJovenApp " + val.Oportunidad + "', null, null, '" + val.UrlFuente + "')'>Compartir</a></li>");
				    items.push("<li><a href='#' data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(139, 0, 0, 0.80); ' data-icon='delete' data-rel='back'>Cerrar</a></li>");
				    items.push("</ul>");
				    items.push("</div>");
				    items.push("</div>");
                }
            }



        });
        var container = document.getElementById(elemento)
        $("<ul/>", {
            "id": "eventList" + elemento, "data-role": "listview", "data-inset": "true", "data-filter-placeholder": "Buscar Oportunidades...", "data-filter": "true", "class": "'ui-nodisc-icon ui-alt-icon'",
            html: items.join("")
        }).appendTo(container);
		
		$("#eventList"+elemento).listview();
		$("div[id$='filtro']").popup(); 
		$("div[id$='filtroCSet']").collapsibleset();
		$("div[id$='filtroNbar']").navbar();
    });
}

//EventosPermanentes Todo
function AllResultsP(elemento) {
    $.ajax({
        dataType: "json",
        url: 'http://poi.colombiajoven.gov.co/api/oferta',
    }).done(function (data) {
        var items = [];
        $.each(data, function (key, val) {
                if (val.FechaInicio == '1900-01-01T00:00:00') {
                    var img = seccionIMG(val.FkSeccion);
					
					var npais = convertirNPais(val.FkPais);
					var nreg = convertirNReg(val.FkPais,val.FkRegion);
					var ncity = convertirNCity(val.FkPais, val.FkRegion, val.FkCiudad);

                    if (val.Oportunidad.length > 0) {

                        items.push("<li data-icon='plus' class='ui-nodisc-icon ui-alt-icon' ><a href='#" + val.PkOferta + "_' value =" + val.PkOferta + " data-rel='popup' ><img src='img/ico/" + img + "' style='margin:10px; height: 60px; width: 60px;' /> <h1>" + val.Oportunidad + "</h1> <p>" + val.EntidadNombre + " </p></a></li>");

                        items.push("<div data-role='popup' id='" + val.PkOferta + "_' data-theme='b' style='top: 5%; left: 5%; right: 5%; width: 90%; height: 90%; position: fixed; overflow-y:auto; overflow-x:hidden; background-color:rgba(0, 0, 0, 0.80);'>");
                        items.push("<center><img src='img/ico/" + img + "' style='max-width:25%; margin:5% 1px; ' /></center>");
                        items.push("<h2 style='text-wrap:normal; text-align:center'>" + val.Oportunidad + "</h2>");
                        items.push("<div data-role='collapsible-set' id='" + val.PkOferta + "_CSet' data-mini='true' class='ui-nodisc-icon ui-alt-icon' data-theme='a' style='width: 90%; margin-left:5%; margin-right:5%;'>");
                        items.push("<div data-role='collapsible' data-collapsed='false'>");
                        items.push("<h3>Información</h3>");
                        items.push("<p style='text-wrap:normal; text-align:center'><b>" + val.Seccion + "</b></p>");
                        items.push("<p style='text-wrap:normal; text-align:justify'>" + val.Informacion + "</p>");
                        items.push("</div>");
                        items.push("<div data-role='collapsible'>");
                        items.push("<h3>Entidad</h3>");
                        items.push("<p style='text-wrap:normal'><b>Nombre: </b>" + val.EntidadNombre + "</p>");
                        items.push("<p style='text-wrap:normal'><b>Contacto: </b><a href='" + val.Contacto + "' data-rel='external' >" + val.Contacto + "</a></p>");
                        items.push("<p style='text-wrap:normal'><b>Web: </b><a href='" + val.EntidadUrl + "' data-rel='external' >" + val.EntidadUrl + "</a></p>");
                        items.push("</div>");
                        items.push("<div data-role='collapsible'>");
                        items.push("<h3>Requisitos</h3>");
                        items.push("<p style='text-wrap:normal; text-align:justify'>" + val.Requisitos + "</p>");
                        items.push("<p style='text-wrap:normal'><b>Población Objetivo: </b>" + val.Requisitos + "</p>");
                        items.push("<p style='text-wrap:normal'><b>Edad: </b>" + val.EdadMinima + " - " + val.EdadMaxima + "</p>");
                        items.push("<p style='text-wrap:normal'><b>Fecha Inicio - jugo3: </b>" + val.FechaInicio + "</p>");
                        items.push("<p style='text-wrap:normal'><b>Fecha Fin: </b>" + val.FechaFin + "</p>");
                        items.push("</div>");
                        items.push("<div data-role='collapsible'>");
                        items.push("<h3>Ubicación</h3>");
                        items.push("<p style='text-wrap:normal'><b>País: </b>" + npais + "</p>");
                        items.push("<p style='text-wrap:normal'><b>Región: </b>" + nreg + "</p>");
                        items.push("<p style='text-wrap:normal'><b>Ciudad: </b>" + ncity + "</p>");
                        items.push("</div>");
                        items.push("</div>");
                        items.push("<div data-role='navbar' id='" + val.PkOferta + "_Nbar' class='ui-nodisc-icon' style='margin:1% 5%;'>");
                        items.push("<ul data-mini='true'>");
                        items.push("<li><a href='" + val.UrlFuente + "'data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(0, 128, 0, 0.80); ' data-icon='check'>Ver más</a></li>");
                        items.push("<li><a href='#' data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(0, 148, 255, 0.80); ' data-icon='comment' onclick='window.plugins.socialsharing.share('#SíJovenApp " + val.Oportunidad + "', null, null, '" + val.UrlFuente + "')'>Compartir</a></li>");
                        items.push("<li><a href='#' data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(139, 0, 0, 0.80); ' data-icon='delete' data-rel='back'>Cerrar</a></li>");
                        items.push("</ul>");
                        items.push("</div>");
                        items.push("</div>");
                }
            }



        });
        var container = document.getElementById(elemento)
        $("<ul/>", {
            "id": "eventList" + elemento, "data-role": "listview", "data-inset": "false", "class": "'ui-nodisc-icon ui-alt-icon'",
            html: items.join("")
        }).appendTo(container);
		
		$("#eventList"+elemento).listview();
		$("div[id$='Permanent']").popup(); 
		$("div[id$='PermanentCSet']").collapsibleset();
		$("div[id$='PermanentNbar']").navbar();
    });
}

//EventosPermanentes Filtro
function filterResultsP(categoria, elemento) {
    $.ajax({
        dataType: "json",
        url: 'http://poi.colombiajoven.gov.co/api/oferta',
    }).done(function (data) {
        var items = [];
        $.each(data, function (key, val) {
            if (val.FkSeccion == categoria) {
                if (val.FechaInicio == '1900-01-01T00:00:00') {
                var img = seccionIMG(val.FkSeccion);
				
				var npais = convertirNPais(val.FkPais);
				var nreg = convertirNReg(val.FkPais,val.FkRegion);
				var ncity = convertirNCity(val.FkPais, val.FkRegion, val.FkCiudad);

                if (val.Oportunidad.length > 0) {

                    items.push("<li data-icon='plus' class='ui-nodisc-icon ui-alt-icon' ><a href='#" + val.PkOferta + "_' value =" + val.PkOferta + " data-rel='popup' ><img src='img/ico/" + img + "' style='margin:10px; height: 60px; width: 60px;' /> <h1>" + val.Oportunidad + "</h1> <p>" + val.EntidadNombre + " </p></a></li>");

                    items.push("<div data-role='popup' id='" + val.PkOferta + "_' data-theme='b' style='top: 5%; left: 5%; right: 5%; width: 90%; height: 90%; position: fixed; overflow-y:auto; overflow-x:hidden; background-color:rgba(0, 0, 0, 0.80);'>");
                    items.push("<center><img src='img/ico/" + img + "' style='max-width:25%; margin:5% 1px; ' /></center>");
                    items.push("<h2 style='text-wrap:normal; text-align:center'>" + val.Oportunidad + "</h2>");
                    items.push("<div data-role='collapsible-set' id='" + val.PkOferta + "_CSet' data-mini='true' class='ui-nodisc-icon ui-alt-icon' data-theme='a' style='width: 90%; margin-left:5%; margin-right:5%;'>");
                    items.push("<div data-role='collapsible' data-collapsed='false'>");
                    items.push("<h3>Información</h3>");
                    items.push("<p style='text-wrap:normal; text-align:center'><b>" + val.Seccion + "</b></p>");
                    items.push("<p style='text-wrap:normal; text-align:justify'>" + val.Informacion + "</p>");
                    items.push("</div>");
                    items.push("<div data-role='collapsible'>");
                    items.push("<h3>Entidad</h3>");
                    items.push("<p style='text-wrap:normal'><b>Nombre: </b>" + val.EntidadNombre + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Contacto: </b><a href='" + val.Contacto + "' data-rel='external' >" + val.Contacto + "</a></p>");
                    items.push("<p style='text-wrap:normal'><b>Web: </b><a href='" + val.EntidadUrl + "' data-rel='external' >" + val.EntidadUrl + "</a></p>");
                    items.push("</div>");
                    items.push("<div data-role='collapsible'>");
                    items.push("<h3>Requisitos</h3>");
                    items.push("<p style='text-wrap:normal; text-align:justify'>" + val.Requisitos + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Población Objetivo: </b>" + val.Requisitos + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Edad: </b>" + val.EdadMinima + " - " + val.EdadMaxima + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Fecha Inicio-jugo4: </b>" + val.FechaInicio + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Fecha Fin: </b>" + val.FechaFin + "</p>");
                    items.push("</div>");
                    items.push("<div data-role='collapsible'>");
                    items.push("<h3>Ubicación</h3>");
                    items.push("<p style='text-wrap:normal'><b>País: </b>" + npais + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Región: </b>" + nreg + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Ciudad: </b>" + ncity + "</p>");
                    items.push("</div>");
                    items.push("</div>");
                    items.push("<div data-role='navbar' id='" + val.PkOferta + "_Nbar' class='ui-nodisc-icon' style='margin:1% 5%;'>");
                    items.push("<ul data-mini='true'>");
                    items.push("<li><a href='" + val.UrlFuente + "'data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(0, 128, 0, 0.80); ' data-icon='check'>Ver más</a></li>");
                    items.push("<li><a href='#' data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(0, 148, 255, 0.80); ' data-icon='comment' onclick='window.plugins.socialsharing.share('#SíJovenApp " + val.Oportunidad + "', null, null, '" + val.UrlFuente + "')'>Compartir</a></li>");
                    items.push("<li><a href='#' data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(139, 0, 0, 0.80); ' data-icon='delete' data-rel='back'>Cerrar</a></li>");
                    items.push("</ul>");
                    items.push("</div>");
                    items.push("</div>");
                }
            }
        }



        });
        var container = document.getElementById(elemento)
        $("<ul/>", {
            "id": "eventList" + elemento, "data-role": "listview", "data-inset": "false", "class": "'ui-nodisc-icon ui-alt-icon'",
            html: items.join("")
        }).appendTo(container);
		
		$("#eventList"+elemento).listview();
		$("div[id$='Fpermanent']").popup(); 
		$("div[id$='FpermanentCSet']").collapsibleset();
		$("div[id$='FpermanentNbar']").navbar();		
		
    });
}

//Calendario Todos
function AllResultsCal(fechaSel, elemento) {
    $.ajax({
        dataType: "json",
        url: 'http://poi.colombiajoven.gov.co/api/oferta',
    }).done(function (data) {
        var items = [];
        $.each(data, function (key, val) {

            var fechaIni = convertirFecha(val.FechaInicio);
            var fechaFin = convertirFecha(val.FechaFin);
            var fechaSelec = convertirFecha(fechaSel);

            if (fechaSelec >= fechaIni && fechaSelec <= fechaFin) {
                var img = seccionIMG(val.FkSeccion);

                var npais = convertirNPais(val.FkPais);
                var nreg = convertirNReg(val.FkPais, val.FkRegion);
                var ncity = convertirNCity(val.FkPais, val.FkRegion, val.FkCiudad);


                if (val.Oportunidad.length > 0) {

                    items.push("<li data-icon='plus' class='ui-nodisc-icon ui-alt-icon' ><a href='#" + val.PkOferta + "_' value =" + val.PkOferta + " data-rel='popup' ><img src='img/ico/" + img + "' style='margin:10px; height: 60px; width: 60px;' /> <h1>" + val.Oportunidad + "</h1> <p>" + val.EntidadNombre + " </p></a></li>");

                    items.push("<div data-role='popup' id='" + val.PkOferta + "_' data-theme='b' style='top: 5%; left: 5%; right: 5%; width: 90%; height: 90%; position: fixed; overflow-y:auto; overflow-x:hidden; background-color:rgba(0, 0, 0, 0.80);'>");
                    items.push("<center><img src='img/ico/" + img + "' style='max-width:25%; margin:5% 1px; ' /></center>");
                    items.push("<h2 style='text-wrap:normal; text-align:center'>" + val.Oportunidad + "</h2>");
                    items.push("<div data-role='collapsible-set' id='" + val.PkOferta + "_CSet' data-mini='true' class='ui-nodisc-icon ui-alt-icon' data-theme='a' style='width: 90%; margin-left:5%; margin-right:5%;'>");
                    items.push("<div data-role='collapsible' data-collapsed='false'>");
                    items.push("<h3>Información</h3>");
                    items.push("<p style='text-wrap:normal; text-align:center'><b>" + val.Seccion + "</b></p>");
                    items.push("<p style='text-wrap:normal; text-align:justify'>" + val.Informacion + "</p>");
                    items.push("</div>");
                    items.push("<div data-role='collapsible'>");
                    items.push("<h3>Entidad</h3>");
                    items.push("<p style='text-wrap:normal'><b>Nombre: </b>" + val.EntidadNombre + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Contacto: </b><a href='" + val.Contacto + "' data-rel='external' >" + val.Contacto + "</a></p>");
                    items.push("<p style='text-wrap:normal'><b>Web: </b><a href='" + val.EntidadUrl + "' data-rel='external' >" + val.EntidadUrl + "</a></p>");
                    items.push("</div>");
                    items.push("<div data-role='collapsible'>");
                    items.push("<h3>Requisitos</h3>");
                    items.push("<p style='text-wrap:normal; text-align:justify'>" + val.Requisitos + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Población Objetivo: </b>" + val.Requisitos + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Edad: </b>" + val.EdadMinima + " - " + val.EdadMaxima + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Fecha Inicio-jugo5: </b>" + val.FechaInicio + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Fecha Fin: </b>" + val.FechaFin + "</p>");
                    items.push("</div>");
                    items.push("<div data-role='collapsible'>");
                    items.push("<h3>Ubicación</h3>");
                    items.push("<p style='text-wrap:normal'><b>País: </b>" + npais + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Región: </b>" + nreg + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Ciudad: </b>" + ncity + "</p>");
                    items.push("</div>");
                    items.push("</div>");
                    items.push("<div data-role='navbar' id='" + val.PkOferta + "_Nbar' class='ui-nodisc-icon' style='margin:1% 5%;'>");
                    items.push("<ul data-mini='true'>");
                    items.push("<li><a href='" + val.UrlFuente + "'data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(0, 128, 0, 0.80); ' data-icon='check'>Ver más</a></li>");
                    items.push("<li><a href='#' data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(0, 148, 255, 0.80); ' data-icon='comment' onclick='window.plugins.socialsharing.share('#SíJovenApp " + val.Oportunidad + "', null, null, '" + val.UrlFuente + "')'>Compartir</a></li>");
                    items.push("<li><a href='#' data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(139, 0, 0, 0.80); ' data-icon='delete' data-rel='back'>Cerrar</a></li>");
                    items.push("</ul>");
                    items.push("</div>");
                    items.push("</div>");
                }
            }



        });
        var container = document.getElementById(elemento)
        $("<ul/>", {
            "id": "eventList" + elemento, "data-role": "listview", "data-inset": "true", "class": "'ui-nodisc-icon ui-alt-icon'",
            html: items.join("")
        }).appendTo(container);

        $("#eventList" + elemento).listview();
        $("div[id$='CalGen']").popup();
        $("div[id$='CalGenCSet']").collapsibleset();
        $("div[id$='CalGenNbar']").navbar();
    });
}

//Calendario Filtro
function FilterResultsCal(cat, fechaSel, elemento) {
    $.ajax({
        dataType: "json",
        url: 'http://poi.colombiajoven.gov.co/api/oferta',
    }).done(function (data) {
        var items = [];
        $.each(data, function (key, val) {

            if (val.FkSeccion == cat) {

                var fechaIni = convertirFecha(val.FechaInicio);
                var fechaFin = convertirFecha(val.FechaFin);
                var fechaSelec = convertirFecha(fechaSel);

                if (fechaSelec >= fechaIni && fechaSelec <= fechaFin) {
                    var img = seccionIMG(val.FkSeccion);

                    var npais = convertirNPais(val.FkPais);
                    var nreg = convertirNReg(val.FkPais, val.FkRegion);
                    var ncity = convertirNCity(val.FkPais, val.FkRegion, val.FkCiudad);

                    if (val.Oportunidad.length > 0) {

                        items.push("<li data-icon='plus' class='ui-nodisc-icon ui-alt-icon' ><a href='#" + val.PkOferta + "_' value =" + val.PkOferta + " data-rel='popup' ><img src='img/ico/" + img + "' style='margin:10px; height: 60px; width: 60px;' /> <h1>" + val.Oportunidad + "</h1> <p>" + val.EntidadNombre + " </p></a></li>");

                        items.push("<div data-role='popup' id='" + val.PkOferta + "_' data-theme='b' style='top: 5%; left: 5%; right: 5%; width: 90%; height: 90%; position: fixed; overflow-y:auto; overflow-x:hidden; background-color:rgba(0, 0, 0, 0.80);'>");
                        items.push("<center><img src='img/ico/" + img + "' style='max-width:25%; margin:5% 1px; ' /></center>");
                        items.push("<h2 style='text-wrap:normal; text-align:center'>" + val.Oportunidad + "</h2>");
                        items.push("<div data-role='collapsible-set' id='" + val.PkOferta + "_CSet' data-mini='true' class='ui-nodisc-icon ui-alt-icon' data-theme='a' style='width: 90%; margin-left:5%; margin-right:5%;'>");
                        items.push("<div data-role='collapsible' data-collapsed='false'>");
                        items.push("<h3>Información</h3>");
                        items.push("<p style='text-wrap:normal; text-align:center'><b>" + val.Seccion + "</b></p>");
                        items.push("<p style='text-wrap:normal; text-align:justify'>" + val.Informacion + "</p>");
                        items.push("</div>");
                        items.push("<div data-role='collapsible'>");
                        items.push("<h3>Entidad</h3>");
                        items.push("<p style='text-wrap:normal'><b>Nombre: </b>" + val.EntidadNombre + "</p>");
                        items.push("<p style='text-wrap:normal'><b>Contacto: </b><a href='" + val.Contacto + "' data-rel='external' >" + val.Contacto + "</a></p>");
                        items.push("<p style='text-wrap:normal'><b>Web: </b><a href='" + val.EntidadUrl + "' data-rel='external' >" + val.EntidadUrl + "</a></p>");
                        items.push("</div>");
                        items.push("<div data-role='collapsible'>");
                        items.push("<h3>Requisitos</h3>");
                        items.push("<p style='text-wrap:normal; text-align:justify'>" + val.Requisitos + "</p>");
                        items.push("<p style='text-wrap:normal'><b>Población Objetivo: </b>" + val.Requisitos + "</p>");
                        items.push("<p style='text-wrap:normal'><b>Edad: </b>" + val.EdadMinima + " - " + val.EdadMaxima + "</p>");
                        items.push("<p style='text-wrap:normal'><b>Fecha Inicio-jugo6: </b>" + val.FechaInicio + "</p>");
                        items.push("<p style='text-wrap:normal'><b>Fecha Fin: </b>" + val.FechaFin + "</p>");
                        items.push("</div>");
                        items.push("<div data-role='collapsible'>");
                        items.push("<h3>Ubicación</h3>");
                        items.push("<p style='text-wrap:normal'><b>País: </b>" + npais + "</p>");
                        items.push("<p style='text-wrap:normal'><b>Región: </b>" + nreg + "</p>");
                        items.push("<p style='text-wrap:normal'><b>Ciudad: </b>" + ncity + "</p>");
                        items.push("</div>");
                        items.push("</div>");
                        items.push("<div data-role='navbar' id='" + val.PkOferta + "_Nbar' class='ui-nodisc-icon' style='margin:1% 5%;'>");
                        items.push("<ul data-mini='true'>");
                        items.push("<li><a href='" + val.UrlFuente + "'data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(0, 128, 0, 0.80); ' data-icon='check'>Ir A</a></li>");
                        items.push("<li><a href='#' data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(0, 148, 255, 0.80); ' data-icon='comment' onclick='window.plugins.socialsharing.share('#SíJovenApp " + val.Oportunidad + "', null, null, '" + val.UrlFuente + "')'>Compartir</a></li>");
                        items.push("<li><a href='#' data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(139, 0, 0, 0.80); ' data-icon='delete' data-rel='back'>Cerrar</a></li>");
                        items.push("</ul>");
                        items.push("</div>");
                        items.push("</div>");
                    }
                }

            }

        });
        var container = document.getElementById(elemento)
        $("<ul/>", {
            "id": "eventList" + elemento, "data-role": "listview", "data-inset": "true", "class": "'ui-nodisc-icon ui-alt-icon'",
            html: items.join("")
        }).appendTo(container);

        $("#eventList" + elemento).listview();
        $("div[id$='FCalGen']").popup();
        $("div[id$='FCalGenCSet']").collapsibleset();
        $("div[id$='FCalGenNbar']").navbar();
    });
}
//Ubicacaion Todas Ofertas

function AllResultsUJG(pais, depto, ciudad, elemento){
    
    
    $.ajax({
        dataType: "json",
        url: 'http://poi.colombiajoven.gov.co/api/oferta',
    }).done(function (data) {
        var items = [];

        $.each(data, function (key, val) {
            if(pais != '3686110'){ //No es Colombia
                var img = seccionIMG(val.FkSeccion);
                var npais = convertirNPais(val.FkPais);
                var nreg = convertirNReg(val.FkPais, val.FkRegion);
                var ncity = convertirNCity(val.FkPais, val.FkRegion, val.FkCiudad);
                    
                if (val.Oportunidad.length > 0) {
                      
                    items.push("<li data-icon='plus' class='ui-nodisc-icon ui-alt-icon' ><a href='#" + val.PkOferta + "_' value =" + val.PkOferta + " data-rel='popup' ><img src='img/ico/" + img + "' style='margin:10px; height: 60px; width: 60px;' /> <h1>" + val.Oportunidad + "</h1> <p>" + val.EntidadNombre + " </p></a></li>");                    
                    items.push("<div data-role='popup' id='" + val.PkOferta + "_' data-theme='b' style='top: 5%; left: 5%; right: 5%; width: 90%; height: 90%; position: fixed; overflow-y:auto; overflow-x:hidden; background-color:rgba(0, 0, 0, 0.80);'>");
                    items.push("<center><img src='img/ico/" + img + "' style='max-width:25%; margin:5% 1px; ' /></center>");
                    items.push("<h2 style='text-wrap:normal; text-align:center'>" + val.Oportunidad + "</h2>");
                    items.push("<div data-role='collapsible-set' id='" + val.PkOferta + "_CSet' data-mini='true' class='ui-nodisc-icon ui-alt-icon' data-theme='a' style='width: 90%; margin-left:5%; margin-right:5%;'>");
                    items.push("<div data-role='collapsible' data-collapsed='false'>");
                    items.push("<h3>Información</h3>");
                    items.push("<p style='text-wrap:normal; text-align:center'><b>" + val.Seccion + "</b></p>");
                    items.push("<p style='text-wrap:normal; text-align:justify'>" + val.Informacion + "</p>");
                    items.push("</div>");
                    items.push("<div data-role='collapsible'>");
                    items.push("<h3>Entidad</h3>");
                    items.push("<p style='text-wrap:normal'><b>Nombre: </b>" + val.EntidadNombre + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Contacto: </b><a href='" + val.Contacto + "' data-rel='external' >" + val.Contacto + "</a></p>");
                    items.push("<p style='text-wrap:normal'><b>Web: </b><a href='" + val.EntidadUrl + "' data-rel='external' >" + val.EntidadUrl + "</a></p>");
                    items.push("</div>");
                    items.push("<div data-role='collapsible'>");
                    items.push("<h3>Requisitos</h3>");
                    items.push("<p style='text-wrap:normal; text-align:justify'>" + val.Requisitos + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Población Objetivo: </b>" + val.Requisitos + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Edad: </b>" + val.EdadMinima + " - " + val.EdadMaxima + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Fecha Inicio - jugo7: </b>" + val.FechaInicio + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Fecha Fin: </b>" + val.FechaFin + "</p>");
                    items.push("</div>");
                    items.push("<div data-role='collapsible'>");
                    items.push("<h3>Ubicación</h3>");
                    items.push("<p style='text-wrap:normal'><b>País: </b>" + npais + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Región: </b>" + nreg + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Ciudad: </b>" + ncity + "</p>");
                    items.push("</div>");
                    items.push("</div>");
                    items.push("<div data-role='navbar' id='" + val.PkOferta + "_Nbar' class='ui-nodisc-icon' style='margin:1% 5%;'>");
                    items.push("<ul data-mini='true'>");
                    items.push("<li><a href='" + val.UrlFuente + "'data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(0, 128, 0, 0.80); ' data-icon='check'>Ir A</a></li>");
                    items.push("<li><a href='#' data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(0, 148, 255, 0.80); ' data-icon='comment' onclick='window.plugins.socialsharing.share('#SíJovenApp " + val.Oportunidad + "', null, null, '" + val.UrlFuente + "')'>Compartir</a></li>");
                    items.push("<li><a href='#' data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(139, 0, 0, 0.80); ' data-icon='delete' data-rel='back'>Cerrar</a></li>");
                    items.push("</ul>");
                    items.push("</div>");
                    items.push("</div>");           
                }
            }else if (val.FkPais=="3686110" && (val.FkCiudad == ciudad || val.FkRegion == depto)){  //Es Colombia
                var img = seccionIMG(val.FkSeccion);
                var npais = convertirNPais(val.FkPais);
                var nreg = convertirNReg(val.FkPais, val.FkRegion);
                var ncity = convertirNCity(val.FkPais, val.FkRegion, val.FkCiudad);
                    
                if (val.Oportunidad.length > 0) {
                      
                    items.push("<li data-icon='plus' class='ui-nodisc-icon ui-alt-icon' ><a href='#" + val.PkOferta + "_' value =" + val.PkOferta + " data-rel='popup' ><img src='img/ico/" + img + "' style='margin:10px; height: 60px; width: 60px;' /> <h1>" + val.Oportunidad + "</h1> <p>" + val.EntidadNombre + " </p></a></li>");                    
                    items.push("<div data-role='popup' id='" + val.PkOferta + "_' data-theme='b' style='top: 5%; left: 5%; right: 5%; width: 90%; height: 90%; position: fixed; overflow-y:auto; overflow-x:hidden; background-color:rgba(0, 0, 0, 0.80);'>");
                    items.push("<center><img src='img/ico/" + img + "' style='max-width:25%; margin:5% 1px; ' /></center>");
                    items.push("<h2 style='text-wrap:normal; text-align:center'>" + val.Oportunidad + "</h2>");
                    items.push("<div data-role='collapsible-set' id='" + val.PkOferta + "_CSet' data-mini='true' class='ui-nodisc-icon ui-alt-icon' data-theme='a' style='width: 90%; margin-left:5%; margin-right:5%;'>");
                    items.push("<div data-role='collapsible' data-collapsed='false'>");
                    items.push("<h3>Información</h3>");
                    items.push("<p style='text-wrap:normal; text-align:center'><b>" + val.Seccion + "</b></p>");
                    items.push("<p style='text-wrap:normal; text-align:justify'>" + val.Informacion + "</p>");
                    items.push("</div>");
                    items.push("<div data-role='collapsible'>");
                    items.push("<h3>Entidad</h3>");
                    items.push("<p style='text-wrap:normal'><b>Nombre: </b>" + val.EntidadNombre + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Contacto: </b><a href='" + val.Contacto + "' data-rel='external' >" + val.Contacto + "</a></p>");
                    items.push("<p style='text-wrap:normal'><b>Web: </b><a href='" + val.EntidadUrl + "' data-rel='external' >" + val.EntidadUrl + "</a></p>");
                    items.push("</div>");
                    items.push("<div data-role='collapsible'>");
                    items.push("<h3>Requisitos</h3>");
                    items.push("<p style='text-wrap:normal; text-align:justify'>" + val.Requisitos + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Población Objetivo: </b>" + val.Requisitos + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Edad: </b>" + val.EdadMinima + " - " + val.EdadMaxima + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Fecha Inicio - jugo8: </b>" + val.FechaInicio + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Fecha Fin: </b>" + val.FechaFin + "</p>");
                    items.push("</div>");
                    items.push("<div data-role='collapsible'>");
                    items.push("<h3>Ubicación</h3>");
                    items.push("<p style='text-wrap:normal'><b>País: </b>" + npais + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Región: </b>" + nreg + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Ciudad: </b>" + ncity + "</p>");
                    items.push("</div>");
                    items.push("</div>");
                    items.push("<div data-role='navbar' id='" + val.PkOferta + "_Nbar' class='ui-nodisc-icon' style='margin:1% 5%;'>");
                    items.push("<ul data-mini='true'>");
                    items.push("<li><a href='" + val.UrlFuente + "'data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(0, 128, 0, 0.80); ' data-icon='check'>Ir A</a></li>");
                    items.push("<li><a href='#' data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(0, 148, 255, 0.80); ' data-icon='comment' onclick='window.plugins.socialsharing.share('#SíJovenApp " + val.Oportunidad + "', null, null, '" + val.UrlFuente + "')'>Compartir</a></li>");
                    items.push("<li><a href='#' data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(139, 0, 0, 0.80); ' data-icon='delete' data-rel='back'>Cerrar</a></li>");
                    items.push("</ul>");
                    items.push("</div>");
                    items.push("</div>");                
               }
           }
        });
        var container = document.getElementById(elemento)
        $("<ul/>", {
            "id": "eventList" + elemento, "data-role": "listview", "data-inset": "true", "class": "'ui-nodisc-icon ui-alt-icon'",
            html: items.join("")
        }).appendTo(container);

        $("#eventList" + elemento).listview();
        $("div[id$='Ubi']").popup();
        $("div[id$='UbiCSet']").collapsibleset();
        $("div[id$='UbiNbar']").navbar();

    });
    
    
    
}

//Ubicacion Todo
function AllResultsU(dep, elemento) {
    $.ajax({
        dataType: "json",
        url: 'http://poi.colombiajoven.gov.co/api/oferta',
    }).done(function (data) {
        var items = [];

        $.each(data, function (key, val) {

            if (val.FkRegion == dep) {
                var img = seccionIMG(val.FkSeccion);

                var npais = convertirNPais(val.FkPais);
                var nreg = convertirNReg(val.FkPais, val.FkRegion);
                var ncity = convertirNCity(val.FkPais, val.FkRegion, val.FkCiudad);

                if (val.Oportunidad.length > 0) {

                    items.push("<li data-icon='plus' class='ui-nodisc-icon ui-alt-icon' ><a href='#" + val.PkOferta + "_' value =" + val.PkOferta + " data-rel='popup' ><img src='img/ico/" + img + "' style='margin:10px; height: 60px; width: 60px;' /> <h1>" + val.Oportunidad + "</h1> <p>" + val.EntidadNombre + " </p></a></li>");

                    items.push("<div data-role='popup' id='" + val.PkOferta + "_' data-theme='b' style='top: 5%; left: 5%; right: 5%; width: 90%; height: 90%; position: fixed; overflow-y:auto; overflow-x:hidden; background-color:rgba(0, 0, 0, 0.80);'>");
                    items.push("<center><img src='img/ico/" + img + "' style='max-width:25%; margin:5% 1px; ' /></center>");
                    items.push("<h2 style='text-wrap:normal; text-align:center'>" + val.Oportunidad + "</h2>");
                    items.push("<div data-role='collapsible-set' id='" + val.PkOferta + "_CSet' data-mini='true' class='ui-nodisc-icon ui-alt-icon' data-theme='a' style='width: 90%; margin-left:5%; margin-right:5%;'>");
                    items.push("<div data-role='collapsible' data-collapsed='false'>");
                    items.push("<h3>Información</h3>");
                    items.push("<p style='text-wrap:normal; text-align:center'><b>" + val.Seccion + "</b></p>");
                    items.push("<p style='text-wrap:normal; text-align:justify'>" + val.Informacion + "</p>");
                    items.push("</div>");
                    items.push("<div data-role='collapsible'>");
                    items.push("<h3>Entidad</h3>");
                    items.push("<p style='text-wrap:normal'><b>Nombre: </b>" + val.EntidadNombre + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Contacto: </b><a href='" + val.Contacto + "' data-rel='external' >" + val.Contacto + "</a></p>");
                    items.push("<p style='text-wrap:normal'><b>Web: </b><a href='" + val.EntidadUrl + "' data-rel='external' >" + val.EntidadUrl + "</a></p>");
                    items.push("</div>");
                    items.push("<div data-role='collapsible'>");
                    items.push("<h3>Requisitos</h3>");
                    items.push("<p style='text-wrap:normal; text-align:justify'>" + val.Requisitos + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Población Objetivo: </b>" + val.Requisitos + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Edad: </b>" + val.EdadMinima + " - " + val.EdadMaxima + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Fecha Inicio-jugo9: </b>" + val.FechaInicio + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Fecha Fin: </b>" + val.FechaFin + "</p>");
                    items.push("</div>");
                    items.push("<div data-role='collapsible'>");
                    items.push("<h3>Ubicación</h3>");
                    items.push("<p style='text-wrap:normal'><b>País: </b>" + npais + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Región: </b>" + nreg + "</p>");
                    items.push("<p style='text-wrap:normal'><b>Ciudad: </b>" + ncity + "</p>");
                    items.push("</div>");
                    items.push("</div>");
                    items.push("<div data-role='navbar' id='" + val.PkOferta + "_Nbar' class='ui-nodisc-icon' style='margin:1% 5%;'>");
                    items.push("<ul data-mini='true'>");
                    items.push("<li><a href='" + val.UrlFuente + "'data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(0, 128, 0, 0.80); ' data-icon='check'>Ir A</a></li>");
                    items.push("<li><a href='#' data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(0, 148, 255, 0.80); ' data-icon='comment' onclick='window.plugins.socialsharing.share('#SíJovenApp " + val.Oportunidad + "', null, null, '" + val.UrlFuente + "')'>Compartir</a></li>");
                    items.push("<li><a href='#' data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(139, 0, 0, 0.80); ' data-icon='delete' data-rel='back'>Cerrar</a></li>");
                    items.push("</ul>");
                    items.push("</div>");
                    items.push("</div>");
                }
            }

        });
        var container = document.getElementById(elemento)
        $("<ul/>", {
            "id": "eventList" + elemento, "data-role": "listview", "data-inset": "true", "class": "'ui-nodisc-icon ui-alt-icon'",
            html: items.join("")
        }).appendTo(container);

        $("#eventList" + elemento).listview();
        $("div[id$='Ubi']").popup();
        $("div[id$='UbiCSet']").collapsibleset();
        $("div[id$='UbiNbar']").navbar();

    });
}

//Ubicacion Filtro
function filterResultsU(cat, dep, elemento ) {
    $.ajax({
        dataType: "json",
        url: 'http://poi.colombiajoven.gov.co/api/oferta',
    }).done(function (data) {
        var items = [];

        $.each(data, function (key, val) {
			if (val.FkSeccion == cat) {
				if (val.FkRegion == dep) {
						var img = seccionIMG(val.FkSeccion);
						
						var npais = convertirNPais(val.FkPais);
						var nreg = convertirNReg(val.FkPais,val.FkRegion);
						var ncity = convertirNCity(val.FkPais, val.FkRegion, val.FkCiudad);
                                                
						
						if (val.Oportunidad.length > 0) {
                                                    var dIni = date(val.FechaInicio);
                                                    var dFin = date(val.FechaFin);

						    items.push("<li data-icon='plus' class='ui-nodisc-icon ui-alt-icon' ><a href='#" + val.PkOferta + "_' value =" + val.PkOferta + " data-rel='popup' ><img src='img/ico/" + img + "' style='margin:10px; height: 60px; width: 60px;' /> <h1>" + val.Oportunidad + "</h1> <p>" + val.EntidadNombre + " </p></a></li>");

						    items.push("<div data-role='popup' id='" + val.PkOferta + "_' data-theme='b' style='top: 5%; left: 5%; right: 5%; width: 90%; height: 90%; position: fixed; overflow-y:auto; overflow-x:hidden; background-color:rgba(0, 0, 0, 0.80);'>");
						    items.push("<center><img src='img/ico/" + img + "' style='max-width:25%; margin:5% 1px; ' /></center>");
						    items.push("<h2 style='text-wrap:normal; text-align:center'>" + val.Oportunidad + "</h2>");
						    items.push("<div data-role='collapsible-set' id='" + val.PkOferta + "_CSet' data-mini='true' class='ui-nodisc-icon ui-alt-icon' data-theme='a' style='width: 90%; margin-left:5%; margin-right:5%;'>");
						    items.push("<div data-role='collapsible' data-collapsed='false'>");
						    items.push("<h3>Información</h3>");
						    items.push("<p style='text-wrap:normal; text-align:center'><b>" + val.Seccion + "</b></p>");
						    items.push("<p style='text-wrap:normal; text-align:justify'>" + val.Informacion + "</p>");
						    items.push("</div>");
						    items.push("<div data-role='collapsible'>");
						    items.push("<h3>Entidad</h3>");
						    items.push("<p style='text-wrap:normal'><b>Nombre: </b>" + val.EntidadNombre + "</p>");
						    items.push("<p style='text-wrap:normal'><b>Contacto: </b><a href='" + val.Contacto + "' data-rel='external' >" + val.Contacto + "</a></p>");
						    items.push("<p style='text-wrap:normal'><b>Web: </b><a href='" + val.EntidadUrl + "' data-rel='external' >" + val.EntidadUrl + "</a></p>");
						    items.push("</div>");
						    items.push("<div data-role='collapsible'>");
						    items.push("<h3>Requisitos</h3>");
						    items.push("<p style='text-wrap:normal; text-align:justify'>" + val.Requisitos + "</p>");
						    items.push("<p style='text-wrap:normal'><b>Población Objetivo: </b>" + val.Requisitos + "</p>");
						    items.push("<p style='text-wrap:normal'><b>Edad: </b>" + val.EdadMinima + " - " + val.EdadMaxima + "</p>");
                                                    items.push("<p style='text-wrap:normal'><b>Fecha Inicio-jugo10: </b>" + dIni.getDate() + "</p>");
						    //items.push("<p style='text-wrap:normal'><b>Fecha Inicio: </b>" + val.FechaInicio + "</p>");
						    items.push("<p style='text-wrap:normal'><b>Fecha Fin: </b>" + val.FechaFin + "</p>");
						    items.push("</div>");
						    items.push("<div data-role='collapsible'>");
						    items.push("<h3>Ubicación</h3>");
						    items.push("<p style='text-wrap:normal'><b>País: </b>" + npais + "</p>");
						    items.push("<p style='text-wrap:normal'><b>Región: </b>" + nreg + "</p>");
						    items.push("<p style='text-wrap:normal'><b>Ciudad: </b>" + ncity + "</p>");
						    items.push("</div>");
						    items.push("</div>");
						    items.push("<div data-role='navbar' id='" + val.PkOferta + "_Nbar' class='ui-nodisc-icon' style='margin:1% 5%;'>");
						    items.push("<ul data-mini='true'>");
						    items.push("<li><a href='" + val.UrlFuente + "'data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(0, 128, 0, 0.80); ' data-icon='check'>Ir A</a></li>");
						    items.push("<li><a href='#' data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(0, 148, 255, 0.80); ' data-icon='comment' onclick='window.plugins.socialsharing.share('#SíJovenApp " + val.Oportunidad + "', null, null, '" + val.UrlFuente + "')'>Compartir</a></li>");
						    items.push("<li><a href='#' data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(139, 0, 0, 0.80); ' data-icon='delete' data-rel='back'>Cerrar</a></li>");
						    items.push("</ul>");
						    items.push("</div>");
						    items.push("</div>");
					}
				}            
			}
		});
        var container = document.getElementById(elemento)
        $("<ul/>", {
            "id": "eventList" + elemento, "data-role": "listview", "data-inset": "true", "class": "'ui-nodisc-icon ui-alt-icon'",
            html: items.join("")
        }).appendTo(container);
		
		$("#eventList"+elemento).listview();
		$("div[id$='FUbi']").popup(); 
		$("div[id$='FUbiCSet']").collapsibleset();
		$("div[id$='FUbiNbar']").navbar();
		
    });
}

// Lista MiSíJoven
function allResultsSiJoven(elemento) {
    $.ajax({
        dataType: "json",
        url: 'http://poi.colombiajoven.gov.co/api/oferta',
    }).done(function (data) {
        var items = [];

        var jsonfile = "";

        if (localStorage.getItem('prefSiJoven')) {
            jsonfile = 1;
        } else {
            jsonfile = 0;

        }

        var verif = "";

        $.each(data, function (key, val) {
            var img = seccionIMG(val.FkSeccion);

            verif = 0;

            if (jsonfile == 0) { verif = 1; }
            else {
                verif = validarPSiJoven(val.FkSeccion, val.EdadMaxima, val.EdadMinima, val.FkPais, val.FkRegion);
            }

            var npais = convertirNPais(val.FkPais);
            var nreg = convertirNReg(val.FkPais, val.FkRegion);
            var ncity = convertirNCity(val.FkPais, val.FkRegion, val.FkCiudad);

            if (val.Oportunidad.length > 0 && verif == 1) {

                items.push("<li data-icon='plus' class='ui-nodisc-icon ui-alt-icon' ><a href='#" + val.PkOferta + "_' value =" + val.PkOferta + " data-rel='popup' ><img src='img/ico/" + img + "' style='margin:10px; height: 60px; width: 60px;' /> <h1>" + val.Oportunidad + "</h1> <p>" + val.EntidadNombre + " </p></a></li>");

                items.push("<div data-role='popup' id='" + val.PkOferta + "_' data-theme='b' style='top: 5%; left: 5%; right: 5%; width: 90%; height: 90%; position: fixed; overflow-y:auto; overflow-x:hidden; background-color:rgba(0, 0, 0, 0.80);'>");
                items.push("<center><img src='img/ico/" + img + "' style='max-width:25%; margin:5% 1px; ' /></center>");
                items.push("<h2 style='text-wrap:normal; text-align:center'>" + val.Oportunidad + "</h2>");
                items.push("<div data-role='collapsible-set' id='" + val.PkOferta + "_CSet' data-mini='true' class='ui-nodisc-icon ui-alt-icon' data-theme='a' style='width: 90%; margin-left:5%; margin-right:5%;'>");
                items.push("<div data-role='collapsible' data-collapsed='false'>");
                items.push("<h3>Información</h3>");
                items.push("<p style='text-wrap:normal; text-align:center'><b>" + val.Seccion + "</b></p>");
                items.push("<p style='text-wrap:normal; text-align:justify'>" + val.Informacion + "</p>");
                items.push("</div>");
                items.push("<div data-role='collapsible'>");
                items.push("<h3>Entidad</h3>");
                items.push("<p style='text-wrap:normal'><b>Nombre: </b>" + val.EntidadNombre + "</p>");
                items.push("<p style='text-wrap:normal'><b>Contacto: </b><a href='" + val.Contacto + "' data-rel='external' >" + val.Contacto + "</a></p>");
                items.push("<p style='text-wrap:normal'><b>Web: </b><a href='" + val.EntidadUrl + "' data-rel='external' >" + val.EntidadUrl + "</a></p>");
                items.push("</div>");
                items.push("<div data-role='collapsible'>");
                items.push("<h3>Requisitos</h3>");
                items.push("<p style='text-wrap:normal; text-align:justify'>" + val.Requisitos + "</p>");
                items.push("<p style='text-wrap:normal'><b>Población Objetivo: </b>" + val.Requisitos + "</p>");
                items.push("<p style='text-wrap:normal'><b>Edad: </b>" + val.EdadMinima + " - " + val.EdadMaxima + "</p>");
                items.push("<p style='text-wrap:normal'><b>Fecha Inicio - jugo11: </b>" + val.FechaInicio + "</p>");
                items.push("<p style='text-wrap:normal'><b>Fecha Fin: </b>" + val.FechaFin + "</p>");
                items.push("</div>");
                items.push("<div data-role='collapsible'>");
                items.push("<h3>Ubicación</h3>");
                items.push("<p style='text-wrap:normal'><b>País: </b>" + npais + "</p>");
                items.push("<p style='text-wrap:normal'><b>Región: </b>" + nreg + "</p>");
                items.push("<p style='text-wrap:normal'><b>Ciudad: </b>" + ncity + "</p>");
                items.push("</div>");
                items.push("</div>");
                items.push("<div data-role='navbar' id='" + val.PkOferta + "_Nbar' class='ui-nodisc-icon' style='margin:1% 5%;'>");
                items.push("<ul data-mini='true'>");
                items.push("<li><a href='" + val.UrlFuente + "'data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(0, 128, 0, 0.80); ' data-icon='check'>Ir A</a></li>");
                items.push("<li><a href='#' data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(0, 148, 255, 0.80); ' data-icon='comment' onclick='window.plugins.socialsharing.share('#SíJovenApp " + val.Oportunidad + "', null, null, '" + val.UrlFuente + "')'>Compartir</a></li>");
                items.push("<li><a href='#' data-theme='b' style='border: none; margin: 1px 5%; background-color: rgba(139, 0, 0, 0.80); ' data-icon='delete' data-rel='back'>Cerrar</a></li>");
                items.push("</ul>");
                items.push("</div>");
                items.push("</div>");
            }




        });
        var container = document.getElementById(elemento)
        $("<ul/>", {
            "id": "eventList" + elemento, "data-role": "listview", "data-inset": "true", "data-filter-placeholder": "Buscar Oportunidades...", "data-filter": "true", "class": "'ui-nodisc-icon ui-alt-icon'",
            html: items.join("")
        }).appendTo(container);
        $("#eventList" + elemento).listview();
        $("div[id$='Pref']").popup();
        $("div[id$='PrefCSet']").collapsibleset();
        $("div[id$='PrefNbar']").navbar();
    });
}

// valida si cumple las preferencias
function validarPSiJoven(cat, edadMax, edadMin, pais, region) {
	
	var control = 0;
	
	var val1 = 0;
	var val2 = 0;
	var val3 = 0;
	var val4 = 0;
	var npais = "";
	
	if(pais == '3686110'){ npais = "CO"; }
	else{ npais = "otros"; }
		
	var jsonString = localStorage.getItem('prefSiJoven');
	
	var obj = jQuery.parseJSON(jsonString);
	
	if(cat == 1){ if(obj[0].AC == 1){ val1 = 1;} }
	if(cat == 2){ if(obj[0].DT == 1){ val1 = 1;} }
	if(cat == 3){ if(obj[0].CD == 1){ val1 = 1;} }
	if(cat == 4){ if(obj[0].DD == 1){ val1 = 1;} }
	if(cat == 5){ if(obj[0].IA == 1){ val1 = 1;} }
	if(cat == 6){ if(obj[0].AP == 1){ val1 = 1;} }
	
	var edadPref = obj[0].edad;
	
	if(edadPref >= edadMin && edadPref <= edadMax){ val2 = 1; }
	
	if(obj[0].ubica == "off"){val3 = 1; val4 = 1;}
	else{
		if(npais == obj[0].pais){
			val3 = 1;
			if(npais == 'otros'){val4 = 1;}
			else{
				if(region == obj[0].dep){
					val4 = 1;
				}
			}
			
		}
	}
	
	if(val1 == 1 && val2 == 1 && val3 == 1 && val4 == 1){ control = 1; }	
	
	return control;
}

// convierte fecha a timestamp de 2014-08-24T00:00:00 a 1408856400
function convertirFecha(fecha) {
    fecha = fecha.split("T");
    var fechap1 = fecha[0];
    fechap1 = fechap1.split("-");
    var nuevaF = fechap1[1] + "/" + fechap1[2] + "/" + fechap1[0];
    var nuevaF1 = new Date(nuevaF).getTime();

    return nuevaF1;
}

// convierte el código del pais por Colombia o Extranjero
function convertirNPais(pais) {
	
	var nombre = "Extranjero";
	
	if(pais == '3686110'){ nombre = "Colombia"; }
	
	return nombre;
}

// convierte el código de la región si el país es Colombia, si es extranjero no muestra ningún nombre
function convertirNReg(pais,reg) {
	
	var nombre = " ";
	
	if(pais == '3686110'){ 
		
		switch (reg) {
			case 3689982:
				nombre = "Amazonas";
				break;
			case 3689815:
				nombre = "Antioquia";
				break;
			case 3689717:
				nombre = "Arauca";
				break;
			case 3670205:
				nombre = "Archipiélago de San Andrés, Providencia y Santa Catalina";
				break;
			case 3689436:
				nombre = "Atlántico";
				break;
			case 3688685:
				nombre = "Bogota D.C.";
				break;
			case 3688650:
				nombre = "Bolívar";
				break;
			case 3688536:
				nombre = "Boyacá";
				break;
			case 3687951:
				nombre = "Caldas";
				break;
			case 3687479:
				nombre = "Caquetá";
				break;
			case 3687173:
				nombre = "Casanare";
				break;
			case 3687029:
				nombre = "Cauca";
				break;
			case 3686880:
				nombre = "Cesar";
				break;
			case 3686431:
				nombre = "Chocó";
				break;
			case 3685889:
				nombre = "Córdoba";
				break;
			case 3685413:
				nombre = "Cundinamarca";
				break;
			case 3681652:
				nombre = "Guainía";
				break;
			case 3681344:
				nombre = "Guaviare";
				break;
			case 3680692:
				nombre = "Huila";
				break;
			case 3678847:
				nombre = "La Guajira";
				break;
			case 3675686:
				nombre = "Magdalena";
				break;
			case 3674810:
				nombre = "Meta";
				break;
			case 3674021:
				nombre = "Nariño";
				break;
			case 3673798:
				nombre = "Norte de Santander";
				break;
			case 3671178:
				nombre = "Putumayo";
				break;
			case 3671087:
				nombre = "Quindío";
				break;
			case 3670698:
				nombre = "Risaralda";
				break;
			case 3668578:
				nombre = "Santander";
				break;
			case 3667725:
				nombre = "Sucre";
				break;
			case 3666951:
				nombre = "Tolima";
				break;
			case 3666313:
				nombre = "Valle del Cauca";
				break;
			case 3666254:
				nombre = "Vaupés";
				break;
			case 3666082:
				nombre = "Vichada";
				break;		
		}
	
	}
	
	return nombre;
}

// Esta sirve de maqueta para que creen la de ciudad
function convertirNCity(pais, reg, city) {
	
	var nombre = " ";
	
	if(pais == '3686110'){ nombre = " "; }
	
	return nombre;
}
