# Brand New Congress Website



Technical Background
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


Theming
=======

Anything can be customized, by adding a custom version of the file in your vhost by mimicing the exact file structure
of the content type ([vendor]/[bundle]/Resources/views/[file]).

Customize Shell
---------------

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

Customize Pages
---------------

Every page is a "View" which is assigned to a Content Type, e.g. Article, Profile, etc. To customize the look of all
Articles, just add a file called `/Sitetheory/ArticleBundle/Resources/views/Article.html.twig`. To customize one specific
Article, get the unique view ID of that article (from the admin url ?id=xxxx, or in the dev toolbar) and add a file
called `/Sitetheory/ArticleBundle/Resources/views/Article[ID].html.twig` where "[ID]" is the view ID.



Workflows
=========

Create New Custom Page
----------------------

1. Create New Page.** Create new "Article" in the Sitetheory Admin > [Content section](https://admin.sitetheory.io/Content)
2. Customize Design.** Create a custom template file for that specific Article (see example above).

