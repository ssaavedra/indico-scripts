#!/bin/bash
CONFIG_FILE="indico.conf"

load_config ()
{
	if [ ! -f $CONFIG_FILE ]; then
		echo "Configuration file not found. Exitting..."
		exit 1
	fi
	. $CONFIG_FILE
}


