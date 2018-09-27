#!/usr/bin/env bash

# Get the username, password and host (optional)
DB_USER="$1";
DB_PASSWORD="$2";
DB_HOST="$3";
BACKUP="$4";
WIPE="$5";

set ERROR="";
set PWD=$(pwd);

if [ -z ${DB_USER} ]; then
    DB_USER="${MYSQL_USER}";
fi
if [ -z ${DB_PASSWORD} ]; then
    DB_PASSWORD="${MYSQL_PASSWORD}";
fi

# displays the usage of the procedure
function display_usage () {
    echo "";
    echo "Usage:        setup.sh [username] [password] (host) (backup) (wipe)";
    echo "";
    echo "username      -   the username of the database user. The user must have ability to create schemas, users, tables, and grant privileges";
    echo "password      -   the password for the specified database user";
    echo "host          -   (optional) the host to connect to. 'localhost' will be used if none is provided";
    echo "backup        -   (optional) if 'N', don't backup. If 'Y', backup all databases. Otherwise, backup database specified (can be comma delimited)";
    echo "wipe          -   (optional) if 'Y', wipe all devcentral databases before starting."
    echo "                  WARNING: this is meant for development purposes only. Think before you use this command";
}

# Exits the program with a specified error message
function exit_error() {
    echo "ERROR: $1";
    display_usage;
    exit 1;
}

# Executes a command safely, using the return code to determine whether or not to continue
function execute_safe_command() {

    typeset cmnd="$*"
    typeset ret_code

    ret_code=$?

    if [ ${ret_code} != 0 ]; then
        exit_error "Error : [%d] when executing command: '$cmnd'"
    fi

}

# Make sure that the username and password was set by the executor
if [ -z ${DB_USER} ]; then
    exit_error "No user is set";
elif [ -z ${DB_PASSWORD} ]; then
    exit_error "No password is set";
fi

# If the host has not been set, set it to localhost
if [ -z ${DB_HOST} ]; then
    DB_HOST="localhost";
fi

# Check that the setup.sql file is present
if [ ! -e ./setup.sql ]; then
    DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
    cd ${DIR};
    if [ ! -e ./setup.sql ]; then
     cd $PWD;
     exit_error "This script must be executed in the same directory as 'setup.sql'";
    fi
fi

while ! mysqladmin ping --silent; do
    echo "Waiting for database..."
    sleep 5
done

# Backup the specified databases (Y for all, N for none, otherwise specified)
if [[ ${BACKUP} = "Y" ]]; then
    printf "Backing up all databases to 'backup.sql'..."
    execute_safe_command "mysqldump -h $DB_HOST -u $DB_USER -p$DB_PASSWORD --all-databases --result-file=backup.sql"
    printf " Done.\n"
elif [ ! -z ${BACKUP} ] && [[ ${BACKUP} != "N" ]]; then
    printf "Backing up databases $BACKUP to 'backup.sql'..."
    execute_safe_command "mysqldump -h $DB_HOST -u $DB_USER -p$DB_PASSWORD --databases=$BACKUP --result-file=backup.sql"
    printf " Done.\n"
fi

# Wipe the devcentral databases if specified
if [[ ${WIPE} = "Y" ]]; then

    echo -n "Are you sure you want to wipe existing devcentral databases (Y/n)? ";
    read RESULT;

    if [[ ${RESULT} = "Y" ]]; then
        if [ ! -e ./wipe.sql ]; then
            exit_error "Cannot wipe database. 'wipe.sql' not present";
        else
            printf "Wiping devcentral databases...";
            mysql -h ${DB_HOST} -u ${DB_USER} -p${DB_PASSWORD} < ./wipe.sql
            printf " Done.\n"
        fi
    fi

fi

# Executes the database setup
printf "Setting up database(s)...";
mysql -h ${DB_HOST} -u ${DB_USER} -p${DB_PASSWORD} < ./setup.sql
printf " Done.\n"

cd $PWD;