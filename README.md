## Dev, Build and Test
Project uses SFDX CLI and bash script for deployment.

- make sure you have SFDX CLI installed

- to authorize dev org run 
`sfdx force:auth:web:login -a contact-list`

- create an empty `ContactList` package in your dev org

- to build angular application and copy it to the static resource run
`.build.sh build`

- or, to build and deploy source run 
`./build.sh deploy`

-to retrieve run 
`./build.sh retrieve`

To develop Angular app locally, run it as described in [app readme](/frontend-apps/contact-list/README.md) and serve VF page resources from localhost (you can use something like [Resource override extension](https://chrome.google.com/webstore/detail/resource-override/pkoacgokdfckfpndoffpifphamojphii) for this)

## Resources


## Description of Files and Directories


## Issues


