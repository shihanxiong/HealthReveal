# functions
printMsg() {
  msg=$1

  echo "=================================="
  echo "${msg}"
  echo "=================================="
}

# setup database
printMsg "configuring database"
./db/start.sh
printMsg "database configuration complete"
