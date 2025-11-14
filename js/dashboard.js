/**
 * Pi-Star Dashboard JavaScript Module
 * Centralizes repeated JavaScript functionality that was previously embedded in PHP
 */

var PiStarDashboard = (function() {
    'use strict';
    
    /**
     * Setup auto-reload for a content section
     * @param {string} elementId - The ID of the element to reload
     * @param {string} loadUrl - The URL to load content from
     * @param {number} intervalMs - Reload interval in milliseconds
     */
    function setupAutoReload(elementId, loadUrl, intervalMs) {
        var reloadFunction = function() {
            $("#" + elementId).load(loadUrl, function() {
                setTimeout(reloadFunction, intervalMs);
            });
        };
        setTimeout(reloadFunction, intervalMs);
    }
    
    /**
     * Setup multiple auto-reload sections
     * @param {Array} configs - Array of config objects with {elementId, loadUrl, intervalMs}
     */
    function setupMultipleAutoReloads(configs) {
        configs.forEach(function(config) {
            setupAutoReload(config.elementId, config.loadUrl, config.intervalMs);
        });
        $(window).trigger('resize');
    }
    
    /**
     * Setup last heard list auto-reload
     */
    function setupLastHeard() {
        setupAutoReload('lastHerd', '/mmdvmhost/lh.php', 1500);
    }
    
    /**
     * Setup local TX list auto-reload
     */
    function setupLocalTx() {
        setupAutoReload('localTxs', '/mmdvmhost/localtx.php', 1500);
    }
    
    /**
     * Setup BM connections auto-reload
     */
    function setupBmConnections() {
        setupAutoReload('bmConnects', '/mmdvmhost/bm_links.php', 180000);
    }
    
    /**
     * Setup TGIF connections auto-reload
     */
    function setupTgifConnections() {
        setupAutoReload('tgifConnects', '/mmdvmhost/tgif_links.php', 180000);
    }
    
    /**
     * Setup POCSAG pages auto-reload
     */
    function setupPages() {
        setupAutoReload('Pages', '/mmdvmhost/pages.php', 5000);
    }
    
    /**
     * Setup reflector links auto-reload (D-Star)
     */
    function setupRefLinks() {
        setupAutoReload('refLinks', '/dstarrepeater/active_reflector_links.php', 15000);
    }
    
    /**
     * Setup CSS connections auto-reload (D-Star)
     */
    function setupCssConnections() {
        setupAutoReload('cssConnects', '/dstarrepeater/css_connections.php', 15000);
    }
    
    /**
     * Setup StarNet groups auto-reload (D-Star)
     */
    function setupStarNetGroups() {
        setupAutoReload('starNetGroups', '/dstarrepeater/active_starnet_groups.php', 15000);
    }
    
    /**
     * Setup last heard for D-Star
     */
    function setupDstarLastHerd() {
        setupAutoReload('lh', '/dstarrepeater/last_herd.php', 3000);
    }
    
    /**
     * Setup local TX for D-Star
     */
    function setupDstarLocalTx() {
        setupAutoReload('localTx', '/dstarrepeater/local_tx.php', 3000);
    }
    
    // Public API
    return {
        setupAutoReload: setupAutoReload,
        setupMultipleAutoReloads: setupMultipleAutoReloads,
        setupLastHeard: setupLastHeard,
        setupLocalTx: setupLocalTx,
        setupBmConnections: setupBmConnections,
        setupTgifConnections: setupTgifConnections,
        setupPages: setupPages,
        setupRefLinks: setupRefLinks,
        setupCssConnections: setupCssConnections,
        setupStarNetGroups: setupStarNetGroups,
        setupDstarLastHerd: setupDstarLastHerd,
        setupDstarLocalTx: setupDstarLocalTx
    };
})();
