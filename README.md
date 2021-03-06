# Telepresence Deploy XML APP

Simple app to deploy packages to Cisco Telepresence apps. 
Branding for CE9.2.1+ and backup bundles for CE9.3+ devices is supported. Backup bundles is a new features for CE9.3+ firmware.

Currently capable of deploying:
* Custom Branding with little fuss. Checks the endpoint if its branding capable via firmware version. Takes care of reading CSV files for endpoints and also base64 encoding of image files.
* Using the branding option the script will check your endpoint version and deploy branding to endpoints capable or wallpaper for non-branding capable devices. SX10 check is supported. SX10 has no branding option even if Firmware is CE9.3.
* Deploy wallpaper images (also disables branding)to all your endpoints instead of using the branding option.
* Backup bundle to multiple endpoints. Will create the backup bundle checksum for deployment and acts as http server for package delivery.

## Getting Started

The following applications and hardware are required:


* Cisco Video endpoint
* Nodejs
* CSV file with IP addresses for endpoints placed in the Endpoint directory
* Image files to be deployed placed in branding and wallpaper directories
    * Branding image 272x272 preferred
    * Background Image 1920x1080 preferred
* Backup bundle created using CE9.3 device
### Prerequisites

Configuration required:

* Video endpoint 


### Installing

#### Via Git
```bash
mkdir myproj
cd myproj
git clone https://github.com/voipnorm/CiscoTPCustomXML.git
npm install

```

Set the following environment variables in a .env file...

```
PORT=<desired port for http server, default is 9000 if not defined>
TPADMIN=<admin Username>
TPADMINPWD=<your password>

```
## Running Script
To run the script use one of the following commands:
```
node server.js branding
```
or
```
node server.js bundle
```
To use the bundle command ensure you have created a backup bundle from your CE device and placed the zip file into:
```
./xmlFiles/backupBundle
```
To deploy wallpaper:
```
node server.js wallpaper
```
Ensure wallpaper image is available in ./img/wallpaper directory.
## Built With

* Nodejs

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Me

