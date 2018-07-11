function retrieve {
  sfdx force:mdapi:retrieve -w 10 -u contact-list -p "ContactList" -r ./src
  unzip -q -o ./src/unpackaged.zip -d ./src
  rm ./src/unpackaged.zip
}

function build {
  #build angular app
  (cd frontend-apps/contact-list && ng build)
  #remove static resource
  rm src/ContactList/staticresources/contactList.resource
  #zip new build into static resource
  (cd frontend-apps/contact-list/dist/contact-list && zip -r -X ../../../../src/ContactList/staticresources/contactList.resource *)
}

function deploy {
  build && sfdx force:mdapi:deploy -d ./src/ContactList -w 10 -u contact-list
}

function deploy-fast {
  sfdx force:mdapi:deploy -d ./src/ContactList -w 10 -u contact-list
}

"$@"