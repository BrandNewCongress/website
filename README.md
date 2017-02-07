# Brand New Congress Website



## Technical Background
====================

The current website is built on the Sitetheory.io platform, and implements Angular as a javascript framework to
handle model management and interact with the Sitetheory API. Sitetheory is built using PHP on the Symfony framework and
utilizes Doctrine for database and entity management. Sitetheory is a CMS and framework that manages page requests on
the server side. The current URL determines the correct View (page) to load. Each view is associated with a specific
Content Type, e.g. Article, Profile, Landing Page Stream, etc. Sitetheory will load the correct controller for the
current Content Type, as well as the correct Twig template. As a designer, you don't need to worry about most of that,
you can just customize the template for a given page. You'll have access to do fancy stuff through Angular if you need
to create lists or inputs. And if you need to get more fancy, you can code custom javascript or load third party
libraries directly from the template.

See the [Sitetheory Docs](http://docs.sitetheory.io/index.html) for more details, and from there access specifics about the API
and the Stratus javascript framework. Sitetheory is a private SaaS platform for building simple or complex websites. The platform is still in development, so documentation is incomplete, but we're working to improve it every day.


## CMS Access
==========
- Admin Login: https://admin.sitetheory.io
- The CMS will allow you to create new pages, and also validates you as a developer with permission to view the dev mode of the site.


## Development Preview Site
========================
- URL: https://bnc.sitetheory.net?env=dev
- Modes: (trigger different modes of viewing the site)
    - Dev Environment: ?env=dev (or env=prd)
        - This turns off file caching and minification, displays the Symfony developer toolbar which is useful for debugging, and makes the CMS use your custom development files (instead of the vhost or core files).
        - You must be logged into the CMS Admin (and be assigned to the developer role) in order to have permissions to enter into dev mode for the site.
        - There is no valid certificate for the preview domain on the development site, so just proceed "unsafely" (obviously not a problem). Since the main site account is set to require a certificate on their main domain it requires it here as well.
    - Preview Mode: ?mode=preview (or mode=live)
        - This allows you to see the non-published versions of pages that were created or edited in the admin. On a live site, only the published versions of a page will display, but for preview purposes, you may want to see the “latest version” of a page. 
        - This also add a preview bar at the top of the site that lets you do live editing (still in development).


## Development Access
==================

- Type: FTPS (not SFTP because this is a node service not SSH account)
- Host: beta001.sitetheory.io
- Username/Password: Same as your CMS Account (if you are granted developer role).
- Path: custom files are locating in src/Sitetheory/


## Workflows
============

### Create New Custom Page

**1. Create New Page.** Create new "Article" in the Sitetheory Admin > [Content section](https://admin.sitetheory.io/Content)

**2. Customize Design.** Create a custom template file for that specific Article (see example above).


### No Local Dev Environment

Because the Sitetheory CMS is a complex, database driven hosted platform, there isn’t (yet) a good way to setup a local development environment (this isn’t just a simple static website). So you will be required to upload your code for testing on a shared development server. Your work will be sandboxed so it does not affect anyone else. And although this may seem annoying, if you setup a shortcut in your IDE to publish via FTP (e.g. cmd+enter) it’s just as easy to hit that key combination instead of cmd+S to save.

The FTPS system is a Node Service that actually checks your credentials based on your CMS account. If you are assigned to the developer role, you are granted access to login to the FTP and it will show you all the websites you have permission to edit. 


### Determining What File to Edit

In Dev mod, browse to the page that you need to update, e.g. the support page. and then in the Symfony dev toolbar at the bottom of the browser window you can mouse over the little stack on the right, and actually see what template is used on this page. This tells you the file being used to generate this page is located in @SitetheoryArticle/Article35617.html.twig
Which is a Symfony alias to /src/Sitetheory/ArticleBundle/Resources/views/Article35617.html.twig


### Customizing CMS Files

The CMS will uses the default Vendor files that determine the look/functionality of pages based on the content type of the page, e.g. Article, Profile, etc. would be determined by `/var/www/core/v/1/0/Sitetheory/ArticleBundle/Resources/views/Article.html.twig`

But each website can customize those files by putting a custom version in their vhost repo:
`/var/www/vhosts/24/src/Sitetheory/ArticleBundle/Resources/views/Article.html.twig` This would control the look of all article layouts.

Individual pages can be customized by targeting the ID of the CMS view record, e.g. for a specific Article 35612, you can customize  `/var/www/vhosts/24/src/Sitetheory/ArticleBundle/Resources/views/Article35612.html.twig`

But when you as a developer upload files via your developer account, we actually store your user's custom files in a subfolder, e.g. `/var/www/vhosts/24/user/166/Sitetheory/ArticleBundle/Resources/views/Article35612.html.twig`


### Previewing Custom Development

When you are logged in to the CMS Admin (admin.sitetheory.io) and you are browsing a site that you have been granted developer access to, the CMS will first look for your user’s custom files. If they don't exist it will find the best version in the vhost or core. That way, the work you do, won't be seen by anyone else (multiple people can work on the same files).


### Pushing Work to Live Server

When you are complete with your development, you can push your feature upstream to the master repository. And then notify Chad and he can pull the latest repo on the development server so that everyone can see your work and review. If it looks good, we can then pull the latest repo on the production server to make it live for the world. This process will be automated in the near future.


### Theming
===========

Anything can be customized, by adding a custom version of the file in your vhost by replicating the exact file structure
of the content type ([vendor]/[bundle]/Resources/views/[file]).


### Customize Shell

The site is assigned to a specific theme, which in this case is the Custom theme (which is a blank slate that allows
easy customization). By default every page is assigned to a basic shell design (`shell.html.twig`) which determines the
look/feel of the theme. But you can edit any given page (from the CMS Admin > Content > Edit > Settings) and select an
alternative shell that is available for this theme (You can customize existing shells or create new shells for a theme
as well).

If you are assigned to the Custom theme, you can create a customize version of the `shell.html.twig` inside the
`TemplateCustomBundle`, which is located in `Sitetheory/TemplateCustomBundle/Resources/views/shell/shell.html.twig`.
This extends Sitetheory's base shell template
[`Sitetheory/TemplateBundle/Resources/views/shell.html.twig`](https://github.com/gutensite/Sitetheory/blob/1.0/src/Sitetheory/TemplateBundle/Resources/views/shell.html.twig) which already establishes the main structure of a
template. This core shell template in turn that extends the HTML base template
[`Sitetheory/CoreBundle/Resources/views/base.html.twig`](https://github.com/gutensite/Sitetheory/blob/1.0/src/Sitetheory/CoreBundle/Resources/views/base.html.twig). Reviewing the parent templates will show you which Twig blocks can be extended.


### Customize Pages

Every page is a "View" which is assigned to a Content Type, e.g. Article, Profile, etc. To customize the look of all Articles, just add a file called `/Sitetheory/ArticleBundle/Resources/views/Article.html.twig`. To customize one specific
Article, get the unique view ID of that article (from the admin url ?id=xxxx, or in the dev toolbar) and add a file
called `/Sitetheory/ArticleBundle/Resources/views/Article[ID].html.twig` where "[ID]" is the view ID.