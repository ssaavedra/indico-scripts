
var indico_url = "https://www.gpul.org/indico"
var modif_status = indico_url + "/confModifRegistrants.py/performModifyStatuses?"
var conference_id = 0

var field_volunteer = "statuses-2"
var field_baja = "statuses-3"


function set_value(registrant_id, fieldname, fieldvalue)
{
	var pattern = "modify=modify&F=V&registrantId=R&confId=C"
	var url = modif_status + pattern.replace('F', fieldname)
		.replace('V', fieldvalue)
		.replace('R', registrant_id)
		.replace('C', conference_id)
	
	console.log(url)

	/*
	var settings = {
		async: true,
		complete: function(xhr, textstatus) {
			console.log(url, xhr, textstatus)
			},
		success: function(data, textStatus, xhr) {
			console.log(url, xhr, data, textStatus)
			},
	}
	$.ajax(url, settings)
	*/
	var iframe = document.createElement('iframe')
	$('#debug').append(iframe)
	iframe.src = url
}

Array.prototype.unique =
  function() {
    var a = [];
    var l = this.length;
    for(var i=0; i<l; i++) {
      for(var j=i+1; j<l; j++) {
        // If this[i] is found later in the array
        if (this[i] === this[j])
          j = ++i;
      }
      a.push(this[i]);
    }
    return a;
  };

function process_inputfield(object_id, fieldname, fieldvalue)
{
	var object = document.getElementById(object_id)
	var val = null;
	try {
		val = object.value;
	} catch(e) { val = object.innerHTML; }
	console.log("GOT", val)
	
	var ids = val.replace(/\s+$/, '').replace(/^\s+/, '').split(/\s+/)
	ids = ids.map(function(e) { return parseInt(e) }).unique()

	console.log(ids)
	for(var i = 0; i < ids.length; i++)
	{
		set_value(ids[i], fieldname, fieldvalue)
	}
}

function onbuttonclick()
{
	var objid = "indico_ids"
	var field = $('#fieldname').val()
	var set_value = $('#fieldvalue').val()
	process_inputfield(objid, field, set_value)
}

$(document).ready(function() {
	console.log("document loaded")
	$('#submit_btn').click(onbuttonclick)
})
