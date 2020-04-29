# whereami
Simple Node.js app to respond with the container host-name

## Preparing to build from a private repository on GitHub 
Create the SSH key using ```ssh-keygen -C "openshift-whereami/repo@github" -f whereami-repo-at-github -N ''```

Register the repository SSH key with your private repository on GitHub, go to the Settings for the repository. On GitHub the repository SSH key is referred to by the term Deploy key. Search down the settings page and find the Deploy keys section and select it. Click on the Add deploy key button. In this section, give the key a name and paste in the contents of the public key file from the SSH key pair. This is the file with the .pub extension.

## Building the application
First of all create a new project
```
oc create new-project marks-test
```

The next step is to create a secret in OpenShift to hold the private key of the SSH key pair. When using the command line, to create the secret run:
```
$ oc create secret generic whereami-repo-at-github \
     --from-file=ssh-privatekey=whereami-repo-at-github \
     --type=kubernetes.io/ssh-auth
```
Enable access to the secret from the builder service account:
```
$ oc secrets link builder whereami-repo-at-github
```

Create the application
```
oc new-app github.ibm.com:mark-taylor/whereami.git --source-secret whereami-repo-at-github --name whereami1
```
