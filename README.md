# Run the project

If the local PHP server is not installed, then install WAMP, LAMP, etc. [https://www.php.net/manual/en/install.php](https://www.php.net/manual/en/install.php).

Run the project folder on the local PHP server.

If not installed, install NodeJs and NPM [https://nodejs.org/en/](https://nodejs.org/en/).

Go to the project folder and open the terminal.
When you first run the project in the terminal, to install Gulp globally, run:
```
npm install --global gulp-cli
```
When you first run the project in the terminal, to install dependciies, run:
```
npm install
```

In the gulpfile.js on line 270, specify the URL of the local PHP server in the proxy parameter.

BrowserSync will run a proxy server that broadcasts the local PHP server at [http://localhost:3000/](http://localhost:3000/) and on the IP address of the device with port :3000, for example 192.168.1.2:3000.

The IP address of the device with port :3000 can be used to access the proxy server from other devices on the local WiFi network.

In the terminal, run:
```
gulp
```
When files are changed, the proxy server will reload.
To avoid caching files in the browser, you need to templates/header.php on line 2, set time() to the VAR constant.

Due to domain differences, something may not work through the proxy server.
You can disable the proxy server in the gulpfile file.js on 270 lines by commenting out the proxy parameter.
In the terminal, run:
```
gulp
```
The BrowserSync script will be offered in the terminal to restart the local PHP server when files are changed, it must be inserted before the closing &lt;/body&gt;
But if the proxy server is disabled, access from other devices on the local Wi-Fi network will not work.

Before uploading to the hosting in the file templates/header.php on line 2, set any numeric value to the VAR constant.
If the proxy server was disabled and the Browser Sync script was added before the closing &lt;/body&gt; to reload the local PHP server, then delete the added script.
To create an optimized version of the /public/ folder, run:
```
gulp minify
```

## Uploading files to the hosting

The listed folders and files should not be uploaded to the hosting, they are only needed for local development:
- /node_modules
- /resources
- gulpfile.js
- package.json
- package-lock.json
- composer.json
- composer.lock 
- README.md

## File structure:

/templates/ - contains duplicate HTML blocks<br>
/public/ - Contains frontend files to upload to the hosting (FILES IN THE /public/ FOLDER SHOULD NOT BE EDITED!)<br>
/public/fonts/ - Contains TTF and WOFF fonts<br>
/public/img/ - Contains compressed PNG, JPG, SVG images, PNG sprite and SVG sprite<br>
/public/css/main.css - Contains all compiled SCSS files from the /resources/components folder/<br>
/public/js/main.js - Contains all JS files from the /resources/components folder/<br>
/resources/ - Contains frontend files for development (FILES IN THIS FOLDER ARE BEING EDITED!)<br>
/resources/components/ - Contains folders of BEM blocks with SCSS and JS files<br>
/resources/fonts/ - Contains TTF fonts, WOFF are created automatically<br>
/resources/img/<br />
/resources/img/sprite-png/ - Contains images for a PNG sprite<br>
/resources/img/sprite-svg/ - Contains images for the SVG sprite<br>
/resources/img/main/ - Contains images of the content<br>
/resources/img/scss/main.js - A file for connecting JS files of plug-ins and BEM blocks<br>
/resources/img/js/main.scss - A file for connecting CSS plugin files and CSS BEM blocks<br>

## Gulp tasks

Running a proxy server, with an uncompressed assembly of PNG, JPG, SVG images, CSS and JS files:
```
gulp
```

Build with compression of PNG, JPG, SVG images, CSS and JS files:
```
gulp minify
```
