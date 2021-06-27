## Get your environment ready
1. Make sure you have python 3.x installed.
1. Install pyyaml. Requried by Ansible (pip install pyyaml)
1. Install Ansible (> version 2.9).
1. Install Vagrant.
1. Install VirtualBox.
1. Run `vagrant up base --provision` and make sure you can ssh into the machine using `vagrant ssh base`.

## SysInfo
SysInfo is a service written in golang to monitor system usage stats and present them in through a webpage and as an API. You can access the service from `localhost:6661` and the API from `localhost:6661/api`.

## SQLite Online
This is a NodeJS service to practice your SQLite skills online. Service can be accessed through `localhost:6660`. 

## Upgrading services
The two services can be upgraded just by running `vagrant provision`. It will sync the changed files, install dependencies if required, build if required, and it will up the services once the upgrade is compeleted. 
