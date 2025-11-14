<?php
/**
 * Common Configuration Loader
 * Centralizes repeated configuration loading patterns across the codebase
 */

/**
 * Load Pi-Star CSS configuration
 * @return array Configuration array with css settings
 */
function loadPiStarCssConfig() {
    $piStarCss = array();
    
    if (file_exists('/etc/pistar-css.ini')) {
        $piStarCssFile = '/etc/pistar-css.ini';
        if (fopen($piStarCssFile, 'r')) {
            $piStarCss = parse_ini_file($piStarCssFile, true);
        }
    }
    
    return $piStarCss;
}

/**
 * Get callsign lookup service configuration
 * @return string Service name ("RadioID" or "QRZ")
 */
function getCallsignLookupService() {
    $piStarCss = loadPiStarCssConfig();
    $callsignLookupSvc = "RadioID"; // Default
    
    if (isset($piStarCss['Lookup']['Service'])) {
        $callsignLookupSvc = $piStarCss['Lookup']['Service'];
    }
    
    // Safety net
    if (($callsignLookupSvc != "RadioID") && ($callsignLookupSvc != "QRZ")) {
        $callsignLookupSvc = "RadioID";
    }
    
    return $callsignLookupSvc;
}

/**
 * Get lookup URLs for callsigns and IDs
 * @return array Array with 'id' and 'callsign' lookup URLs
 */
function getLookupUrls() {
    $callsignLookupSvc = getCallsignLookupService();
    
    $urls = array(
        'id' => "https://database.radioid.net/database/view?id=",
        'callsign' => ""
    );
    
    if ($callsignLookupSvc == "RadioID") {
        $urls['callsign'] = "https://database.radioid.net/database/view?callsign=";
    } elseif ($callsignLookupSvc == "QRZ") {
        $urls['callsign'] = "https://www.qrz.com/db/";
    }
    
    return $urls;
}

/**
 * Load Pi-Star Release configuration
 * @return array Configuration array with release info
 */
function loadPiStarReleaseConfig() {
    $pistarReleaseConfig = '/etc/pistar-release';
    $configPistarRelease = array();
    
    if (file_exists($pistarReleaseConfig)) {
        $configPistarRelease = parse_ini_file($pistarReleaseConfig, true);
    }
    
    return $configPistarRelease;
}

/**
 * Get banner configuration from Pi-Star CSS
 * @return array Array with banner H1 and ExtText settings
 */
function getBannerConfig() {
    $piStarCss = loadPiStarCssConfig();
    $banner = array(
        'h1' => '',
        'extText' => ''
    );
    
    if (isset($piStarCss['BannerH1']['Enabled']) && $piStarCss['BannerH1']['Enabled']) {
        $banner['h1'] = $piStarCss['BannerH1']['Text'];
    }
    
    if (isset($piStarCss['BannerExtText']['Enabled']) && $piStarCss['BannerExtText']['Enabled']) {
        $banner['extText'] = $piStarCss['BannerExtText']['Text'];
    }
    
    return $banner;
}
?>
