// Loader for Components
// Location: @bncCoreBundle/Resources/public/js/components/load.js
// Embed this script on any page in order to load Stratus. Based on the require config, Stratus will scan for supported
// components and load them on the page of any website.
/*
 Example:

 <script src="https://brandnewcongress.org/assets/1/0/bundles/sitetheorycore/js/components/load.js">
 <stratus-form-nominate></stratus-form-nominate>

 */

(function (root, factory) {
    if (typeof require === 'function') {
        require(['stratus'], factory);
    } else {
        factory(root.Stratus);
    }
}(this, function (Stratus) {

    var componentLoader = {
        src: {
            'require': 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.3/require.min.js',
            'config': 'https://bnc.sitetheory.net/assets/1/0/bundles/sitetheorycore/js/components/config.js'
        },
        loaded: []
    };

    function loadScript(src, callback) {
        if (componentLoader.loaded.indexOf(src) !== -1) {
            callback();
        } else {
            componentLoader.loaded.push(src);
            var script = document.createElement('script');
            script.src = src;
            if (typeof callback === 'function') script.onload = callback;
            document.head.appendChild(script);
        }
    }


    // Load require.js with custom config.js, and then load Stratus
    if (typeof require !== 'object') {
        // Load Require
        loadScript(componentLoader.src.require, function () {
            // Load Config
            loadScript(componentLoader.src.config, function () {
                // TODO: this needs to load stratus-lite once that's created
                require(['stratus']);
            });
        });

    // TODO: In order for this to work on the local site, it needs to merge in the config and add the custom components
    // TODO: This will need to append the config keys to require's deployed config (merge), if require is loaded (whether or not Stratus is loaded)
    } else if (!Stratus) {
        loadScript(componentLoader.src.config, function () {
            // TODO: this needs to load stratus-lite once that's created
            require(['stratus']);
        });
    }

}));



