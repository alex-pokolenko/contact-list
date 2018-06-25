function retrieve {
  sfdx force:mdapi:retrieve -w 10 -u contact-list -p "ContactList" -r ./src
  unzip -q -o ./src/unpackaged.zip -d ./src
  rm ./src/unpackaged.zip
}

function deploy {
  sfdx force:mdapi:deploy -d ./src/ContactList -w 10 -u contact-list
}

"$@"