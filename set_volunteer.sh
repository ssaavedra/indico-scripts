#!/bin/bash
## INDICO StatusField setter.
##
## Custom made for GPUL's INDICO.
## Author: Santiago Saavedra <ssaavedra@users.sf.net>
## License: GPL v3.0

## Currently configured for GPUL's Volunteer status (statuses-2).

usage ()
{
	echo "$0 1|0 [id [id [ ... ] ] ]"
	echo "	1|0: The status volunteer. 'novalue' can be used to set it to No value."
	echo "	1 means NO. 0 means YES."
	echo "	id: Id of each volunteer"
}

send_form ()
{
	cookies_s=$(for i in ${COOKIE[*]}; do echo "-b $i"; done)
	data_s="-d $fieldname=$fieldvalue -d modify=modify"
	url="$INDICO_MODIF_STATUS?registrantId=$2&confid=$CONFERENCE_ID"
	curl -v $cookies_s $data_s $url
}

. common.sh
load_config

fieldvalue=-1
fieldvalue="$1"
fieldname="statuses-2" # Volunteer
unchanged="novalue"

if [ $fieldvalue = "-1" ]; then
	usage
	echo "You did not say either 1 or 0 as $fieldname status" >&2
	exit 1
fi

# Drop the first two parameters (already saved)
shift

for id in $@; do
	send_form "$fieldvalue" "$id"
done

