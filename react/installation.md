# Installation
This manual helps to set up a local development environment.
### Virtual Environment
We use the [Local](https://localwp.com/) development tool to quickly set up a clean WordPress instance.
You can install it:
- By downloading the distributive from the [website](https://localwp.com/)
- By using the [Homebrew](https://brew.sh/) via `brew install --cask local`
  After installation local will create folder with all your WordPress websites.
### Setting up the Local
1. Create a new site
2. **What's your site's name?**
   _Type its local name_
3. **Choose your environment**
    - Custom
        - PHP version: **7.4.30**
        - Web server: **nginx**
        - Database: **MySQL 8.0.6**
4. **Set up WordPress**
   _Just enter a default admin credentials that you will use later_
### Installing a plugin
**Note: Use terminal**
1. Navigate to your Local's website location and to the folder `plugins`. For example: `/Users/username/LocalSites/coursebuilder/app/public/wp-content/plugins`
2. Inside `plugins` folder need to clone the repo: `git clone git@bitbucket.org:stylemixthemes/masterstudy-lms-learning-management-system.git`
3. Go to the cloned repo folder / plugin's folder, which name is `masterstudy-lms-learning-management-system`
4. Run command `composer dumpautoload`, if you have not composer, install [Homebrew](https://brew.sh/) and then install composer by Homebrew run command `brew install composer`
5. Init submodules: `git submodule update --init`
6. Go to the `_core` folder
7. Install node requirements by `npm i`
8. Compile common assets by `npx gulp build` (if you haven't [npx](https://www.npmjs.com/package/npx) package - install it globally via `npm install -g npx`)
9. Go to `react` folder and install react environment via `npm i --legacy-peer-deps` _(`--legacy-peer-deps` flag is a temporary solution in reason of dependency conflicts. Will be fixed as soon as possible)_
10. Then need to build project via `npm run build`
11. After project was built need to go to plugin's root folder and run this scripts:
    - `mv react/build/static/js/main.js assets/course-builder/js/main.js`
    - `mv react/build/static/css/main.css assets/course-builder/css/main.css`
    - `sed -i -e "s/url(..\/..\/static\/media\//url(..\/fonts\//g" assets/course-builder/css/main.css`
    - `mv react/build/static/media/* assets/course-builder/fonts/`
12. Go to `http://your-local-wp:10005/wp-admin/` and authenticate via your WordPress admin credentials
13. Go to **Plugins** section and activate the free plugin (which you cloned from repo) and download pro plugin from [here](https://bitbucket.org/stylemixthemes/masterstudy-lms-learning-management-system-pro/downloads/) and install it to your local site and activate
14. Open folder `react` in **IDE**, copy all from `.env.example` file and create `.env.local` and paste, what you copied from `.env.example`
15. Then run `npm start` and do your best :)
